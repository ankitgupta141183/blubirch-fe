<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="RCFileUploadpopup" max-width="400px">
        <v-card  class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>File Upload</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text class="pa-0">
            
            <form>
              <v-card-title style="display: flow-root;"> 
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-file-input
                  v-model="file"
                  :accept="acceptedFormats"
                  label="Attach the CSV file"
                  @change="changeFile"
                ></v-file-input>
                <span class="red_text">{{ requiredFiles }}</span>
                <div v-if="uploading">
                  Uploading file ({{ uploadPercentage }}%)
                  <v-progress-linear
                  :value="uploadPercentage"
                  color="blue"
                  height="10"
                  ></v-progress-linear>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions center>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mb-3" v-if="this.confirmButton != 'FINISH'" @click="uploadFile" :disabled="number > 0 || !file">Confirm</v-btn>
              <v-btn color="primary" class="mb-3" v-if="this.confirmButton == 'FINISH'" @click="fileUploadSubmit" :disabled="number > 0 || !file">Finish</v-btn>
              <v-btn outlined class="cancel-color mb-3" @click="closePopup()">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
      </v-dialog>
    </v-row>
    <!-- remarks field Remarks -->
    <v-row justify="center">
        <v-dialog v-model="logDialog" max-width="750px">
          <v-card class="v-card-100">
            <v-card-title>
              <span class="inc-title">Remarks</span>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-container>
                <v-card height="400px" style="overflow-y: scroll;">
                  <v-card-text height="400px">
                    <div v-for="(remarks, index) in selectedRemarks" :key="index">
                      {{ remarks }}
                      <hr v-if="index < selectedRemarks.length - 1" />
                    </div>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-layout align-end>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-2" small color="primary" @click="logDialog = false" >CLOSE</v-btn>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="sussesspopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="sussesspopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ successmessage }}</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- ============== Main page ==================== -->
    <v-card class="overflow-hidden v-card v-sheet theme--light">
      <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition" >{{ alert_message }}</v-alert>
      </div>
       <div><HeaderComponent :headerTitle="headerText" :router-link="{ name: 'RetunrCreation' }"
          :router-link-text="'Return / Claim Requests'" :return-condition="true" :component-name="'File Upload'"/>
      </div>
      <v-card class="v-card-100">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-card-actions >
            <v-flex xs12 d-flex>
              <v-autocomplete 
                v-model="uploadRequest"
                :items="filteredReturnTypeList"
                item-text="original_code"
                item-value="id"
                label="UPLOAD REQUEST"
                solo
                class="ma-2 field"
                color="primary"
                return-object
                style="max-width: 177px;"
                @change="rcFileUploadPopup" 
              ></v-autocomplete>
            </v-flex>
          </v-card-actions>
        </v-card-title>
      </v-card>
      <v-layout column>
        <v-flex md6 style="overflow: auto">
          <v-data-table 
            :dense="true" 
            :search="search"
            disable-pagination 
            :hide-default-footer="true"
            :headers="headers" 
            :items="table_data" 
            :loading="loading" 
            loading-text="Loading Data... Please wait"
            class="elevation-1">
            <template v-slot:item.created_at="{ item }">
              {{ formatTimestamp(item.created_at) }}
            </template>
            <template v-slot:item.remarks="{ item }">
                <img @click="logsDialogOpen(item.remarks)" src="@/assets/images/job_sheet.png" title="File Logs" />
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <div class="float-right">
        <v-row class="ml-2">
          <v-col cols="4" sm="3">
            <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
              @change="handlePageSizeChange"></v-select>
          </v-col>
          <v-col cols="12" sm="9">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
  import HeaderComponent from "../../../commoncomponents/HeaderComponent";
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default {
    props: {
      type: {
        type: String,
        validator: function (value) {
          return ['info', 'warning', 'error'].includes(value);
        }
      }
    },
    data(){
      return {
        headerText: "Return Creation",
        returnCondition:true,
        number: 0,
        menu: false,
        logDialog: false,
        returnFile:'test',
        loading: true,
        alert: false,
        search: "",
        file: '',
        file_required: false,
        disable: false,
        RCFileUploadpopup: false,
        alert_type: "success",
        alert_message: "success",
        headers: [
          { text: "File Name", value: "file_name" },
          { text: "Upload Date", value: "created_at" },
          { text: "Status", value: "status" },
          { text: "Remarks", value: "remarks" },
        ],
        table_data: [],
        page: 1,
        totalPages: 1,
        pageSize : 100,
        pageSizes : [100, 200, 300],
        logs: "",
        inv_file_upload_id: null,
        inward: 'Edit Grade',
        uploadRequest:'',
        uploading: false,
        uploadPercentage: 0,
        confirmButton:'CONFIRM',
        sussesspopup: false,
        successmessage:'',
        upload_request_item: [ ],
        remarks: '',
        secretKey: "YourSecretKey",
        showPartial: true,
        selectedRemarks: '',
        acceptedFormats: ".csv,.xlsx,.xls",
        requiredFiles: ''
      }
    },
    components: {
      HeaderComponent
    },
    validations: {
      file: {required }
    },
    async created() {
      this.getFileList();
      this.getrequestTypes();
    },
    loadData() {
      this.loading = true;
      this.selected = []
      this.table_data = []
      this.page = 1
      this.totalPages = []
      this.pageSize = 100
    },
    computed: {
      filteredReturnTypeList() {
        return this.upload_request_item.map(item => {
          if (item.original_code === 'Pullback Return') {
            return { ...item, disabled: true };
          } else {
            return item;
          }
        });
      },
    },
    methods: {
      getFileList() {
        const params = this.getRequestParams(this.page, this.pageSize);
        this.loading = true;
        this.$http.secured
        .get("/api/v1/warehouse/return_initiation/return_creation_file_uploads", { params: { page: params['page'], per_page: params['size']} })
        .then((response) => {
          if (response) {
            this.table_data = response.data.return_file_uploads.map((item) => {
              const fileName = item.return_file_url
                ? item.return_file_url.split('/').pop()
                : 'N/A'; 
              return { ...item, file_name: fileName };
            });
            this.totalPages = response.data.meta.total_pages
            this.loading    = false;
          } else {
            this.showAlert("error", "No Data Found");
            this.loading    = false;
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },
      getrequestTypes() {
      this.$http.secured
        .get("/api/v1/warehouse/return_initiation/master_values/return_types")
        .then(response => {
          if (response.data) {
            this.upload_request_item = response.data.lookup_values;
            this.totalPages = 1;
            this.loading = false;
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },
      logsDialogOpen(remarks) {
        this.selectedRemarks = remarks.split(',');
        this.logDialog = true;
      },
      selectFile(){
        this.file = this.$refs.file.files[0];
        if (this.$v.file.$invalid) {
          this.file_required = true;
          return;
        }else{
          this.file_required = false;
        } 
      },

      closePopup(){
        this.RCFileUploadpopup = false
        this.file = ''
        this.uploadRequest =''
      },

      rcFileUploadPopup(){
        this.RCFileUploadpopup = true
        this.number = 0;
        this.file = '';
        this.requiredFiles = '';
        this.confirmButton = 'CONFIRM';
      },

      alertTimeOut() {
        setTimeout(() => { this.alert = false;}, 3000);
      },
      showAlert(alert_type, alert_message) {
        this.alert         = true;
        this.alert_type    = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      importFile () {
        this.number++;
        const params = {file: this.file}
        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )
        this.show  = true
        this.$http.secured.post('/api/v1/warehouse/inventory_file_uploads', formData)
        .then(response => {
          this.show   = false
          this.file = ""
          this.RCFileUploadpopup = false
          this.$toast.success('File uploaded successfully');
        })
        .catch(error =>{ 
          this.number = 0;
          this.show   = false
          this.$toast.error('Please Enter Valid File')}          
        )
      },

      // ====== utility ==================
      getFileName(file_url){
        var arr = file_url.split('/')
        return  arr[arr.length - 1]
      },
      dateTimeform(d){
        // 15/02/2021 08:32 AM
        var date    = new Date(d)
        var hours   = date.getHours();
        var minutes = date.getMinutes();
        var ampm    = hours >= 12 ? 'PM' : 'AM';
        hours       = hours % 12;
        hours       = hours ? hours : 12; 
        minutes     = minutes < 10 ? '0'+minutes : minutes;
        var strTime = date.toLocaleDateString("en-US") + ' ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
      },
      inputChanged(e){
        if(this.file.type.match('application/vnd.ms-excel')){
            console.log('csv matched');
        }else{
            console.log('not matched')
            this.$toast.success('this is not a csv file');
        }
      },
      uploadFile() {
      this.uploading = true;
      const reader = new FileReader();
      reader.onloadend = (event) => {
        setTimeout(() => {
          this.uploading = false;
          this.uploadPercentage = 0;
        }, 2000);
      };
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          this.uploadPercentage = percentage;
          this.confirmButton = 'FINISH'
        }
      };
      reader.readAsDataURL(this.file);
    },
    changeFile() {
      if (this.file) {
        const allowedFormats = this.acceptedFormats.split(",");
        const fileExtension = this.file.name.split(".").pop();

        if (allowedFormats.includes("." + fileExtension)) {
          this.confirmButton = 'CONFIRM';
          return
        } else {
          this.requiredFiles = "Select only csv or excel files";
          this.file = null;

          setTimeout(() => {
            this.requiredFiles = "";
          }, 5000);
        }
      }
    },
    fileUploadSubmit() {
      this.selected_type = this.uploadRequest.original_code
       this.number++;
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('return_type', this.selected_type )
      this.$http.secured.post(`api/v1/warehouse/return_initiation/return_creation_file_uploads`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
             }
         } )
        .then(response => {
          if (response.data) {
            this.RCFileUploadpopup = false
            this.successmessage = response.data.message;
            this.sussesspopup = true
            this.file = '';
            this.showAlert("success", "Successfully updated");
            
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
      },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      let hour = date.getHours();
      const minute = date.getMinutes();
      const amPM = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      const formattedTime = `${hour}:${minute.toString().padStart(2, '0')} ${amPM}`;
      return `${day}/${month}/${year}, ${formattedTime}`;
    },
    afterClickOkLoadData(){
      this.sussesspopup = false;
      this.uploadRequest = '';
      this.getFileList();
    },
    handlePageChange(value) {
        this.page = value;
        this.getFileList();
      },
      handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getFileList();
      },
      getRequestParams(page, pageSize) {
        let params = {};

        if (page) {
          params["page"] = page;
        }
        if (pageSize) {
          params["size"] = pageSize;
        }
        return params;
      },
    },
  }
</script>
<style>
  .returnmb {
    margin-bottom: -40px;
  }
  .border-top{
    border-top: 18px solid #e5e5e5 !important;
  }
  .inputfield {
    height: 15px;
    width: 15px;
    margin-right: 10px;
  }
  .titles {
    margin-bottom: 10px !important;
  }

  .return-class{
    position: absolute;
    left: 25px;
  }
  .time .v-input {
    max-width: 96%;
  }

  .rule-type_option {
    border: 1px solid #000000;
    padding: 4px 8px;
    border-radius: 5px;
    margin: 1px 2px;
  }
    .my-autocomplete {
        background-color: blue;
        color: white;
      }
    /* .theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
      background-color: #1867c0 !important;
      color: #fff !important;
      margin-bottom: -35px !important;
    } */
    .field > .v-input__control > .v-input__slot {
      background-color: #0357D0 !important;
      min-height: 36px;
    } 
    .field > .v-input__control > .v-input__slot .v-label {
      color: #fff !important;
    }
    .field > .v-input__control > .v-input__slot input{
      color: #fff;
    }
    .field > .v-input__control > .v-input__slot .v-input__append-inner .v-icon {
      color: #fff !important;
    }
    .field > .v-input__control > .v-input__slot > .v-input__icon .mdi-menu-down::before{
      color: #fff !important;
    }
    .arrow {
      cursor: pointer;
    }
    .red_text {
      color: red;
    }
</style>