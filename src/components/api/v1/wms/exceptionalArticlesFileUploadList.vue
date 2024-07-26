<template>
  <div>
    <!-- Log Dialog -->
    <v-row justify="center">
      <v-dialog v-model="logDialog" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Logs</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-card height="400px" style="overflow-y: scroll;">
                <v-card-text height="400px">
                  {{logs}}
                  <!-- <v-list>
                   <template v-for="(item, i) in logs">
                      <v-list-tile>
                        <v-list-tile-content>
                          <div>{{i + 1}} . {{ item }}</div>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list> -->
                </v-card-text>
              </v-card>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  small
                  color="primary"
                  @click="closeLogsDialog()"
                >CLOSE</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="fileUploadPopup" max-width="750px">
        <v-card  class="v-card-100">
          <v-card-title>
            <span class="inc-title">Exceptional Article Scan Indcator Mapping File Upload</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <form @submit.prevent="importFile" enctype="multipart/form-data" ref="inv_file_upload_form">
              <v-card-title style="display: flow-root;"> 
              </v-card-title>
              <v-card-text>
                <v-container>
                  <div>
                    <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
                    <div v-if="file_required">
                      <div class="warning_img">
                        <div class="warnig_imgw">
                          <img src="@/assets/images/icons/warning.svg">File is required 
                        </div>
                      </div>
                    </div>
                  </div>
                </v-container>
              </v-card-text>
              <v-card-actions center>
                <v-spacer></v-spacer>
                  <button class="main_button mr-2">Confirm</button>
                  <button small type="button" color="normal" @click="closePopup()">Cancel</button>
                <v-spacer></v-spacer>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- ============== Main page ==================== -->
      <v-card class="overflow-hidden v-card v-sheet theme--light">
        <div>
          <v-alert
            :type="alert_type"
            :value="alert"
            transition="scale-transition"
            >{{ alert_message }}</v-alert
          >
        </div>
        <div><HeaderComponent :headerTitle="headerText"/></div>
        <v-card-title>          
          <v-spacer></v-spacer>
            <v-card-actions >
            <v-flex xs12 d-flex>
              <v-btn color="primary" dense class="mr-4 mt-1" @click="articleFileUploadPopup()">Exceptional Article Scan Indicator Mapping File Upload</v-btn>
              <v-btn color="primary" dense class="mr-4 mt-1" to="/api/v1/exceptionalArticles">Article Scan Indicator Mapping List</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card-title>
        <v-layout column>
          <v-flex md6 style="overflow: auto">
            <v-data-table
              :dense="true"
              :headers="headers"
              :items="table_data"
              :search="search"
              item-key="id"
              class="elevation-1"
              :loading="loading"
              loading-text="Loading Data... Please wait">
               <template v-slot:item.inventory_file="{item}">
                <p>{{getFileName(item.inventory_file['url'])}}</p>
              </template>
              <template v-slot:item.created_at="{ item }">{{ dateTimeform(item.created_at) }}</template>
              <template v-slot:item.logs="{item}">
                <img @click="logsDialogOpen(item)"
                  src="@/assets/images/job_sheet.png"
                  title="File Logs"
                />
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card>
  </div>  
</template>

<script>
  import HeaderComponent from "../../../commoncomponents/HeaderComponent";
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        menu: false,
        logDialog: false,
        headerText: "Exceptional Articles Scan Indicator Mapping",
        loading: true,
        alert: false,
        search: "",
        file: "",
        file_required: false,
        disable: false,
        fileUploadPopup: false,
        alert_type: "success",
        alert_message: "success",
        headers: [
          { text: "File Name", value: "filename"},
          { text: "Upload Date", value: "created_at" },
          { text: "Status", value: "status" },
          { text: "Logs", value: "logs" }
        ],
        table_data: [],
        logs: "",      
        inv_file_upload_id: null
      };
    },
    components: {
      HeaderComponent
    },

    validations: {
      file: {required }
    },
    async created() {
      this.getFileList();
    },
    methods: {
      getFileList() {
        this.loading = true;
        this.$http.secured
        .get("/api/v1/exp_articles_file_upload?file_type=Exceptional Article")
        .then((response) => {
          if (response) {
            this.table_data = response.data.master_file_uploads
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
        this.fileUploadPopup = false
        this.file = ""
      },

      articleFileUploadPopup(){
        this.fileUploadPopup = true
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
        if (this.$v.file.$invalid) {
          this.file_required = true;
          return;
        }else{
           this.file_required = false;
        }  
        let formData = new FormData()

        if (this.file.name.split(".").pop() != 'csv'){
          this.$toast.error('Only CSV files can be imported');
          return;
        }
        const params = {master_file: this.file,master_file_type: 'Exceptional Article', 
                        user_id: this.$store.state.currentUser.id,
                        client_id:  "" ,
                        grading_type: ''}
        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )
        this.show  = true
        this.$http.secured.post('/admin/master_file_uploads', formData)
        .then(response => {
          this.show   = false
          this.file = ""
          this.fileUploadPopup = false
          this.$router.replace("/api/v1/exceptionalArticlesFileUploadList");
          this.$toast.success('File uploaded successfully. Please check after some time for status');
        })
        .catch(error =>{ 
          this.show   = false
          this.$toast.error('Please Enter Valid File')}
        )
      },

      // ========== Logs ==============
      logsDialogOpen (item){
        this.logDialog = true;
        this.logs       = item.remarks        
      },
      closeLogsDialog(){
        this.logDialog = false;
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
        hours       = hours ? hours : 12; // the hour '0' should be '12'
        minutes     = minutes < 10 ? '0'+minutes : minutes;
        var strTime = date.toLocaleDateString("en-US") + ' ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
      },
    },
  };
</script>
