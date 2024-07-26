<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>

    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <v-row justify="center">
      <v-dialog v-model="distributionModel" persistent fullscreen hide-overlay transition="dialog-bottom-transition"
        scrollable>
        <v-card tile>
          <v-toolbar dark color="primary" style="max-height: 100px;">
            <v-toolbar-title>Distribution Center List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="distributionModel = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-row class="ma-5 pa-0" style="max-height: 15px;">
            <v-col :cols="4" md="4" sm="4">
              <span> Vendor Code: {{ current_vendor.vendor_code }}</span>
            </v-col>
            <v-col :cols="4" md="4" sm="4">
              <span> Vendor Name: {{ current_vendor.vendor_name }}</span>
            </v-col>
            <v-col :cols="4" md="4" sm="4">
              <span> Vendor Type: {{ current_vendor.vendor_type }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" sm="8" md="6">
              <v-text-field class="ml-2" prepend-inner-icon="mdi-magnify" v-model="quotation_search" label="Search"
                single-line v-on:keyup.enter="downloadRateCardPopup()"></v-text-field>
            </v-col>
           <v-actions style="margin-bottom: 28px;">            
              <v-btn v-if="current_vendor.is_contracted_vendor" medium
                class="mt-5 ml-2" color="primary"><a href="https://beam-saas-dev.s3.ap-south-1.amazonaws.com/uploads/lot_inventory_report/new_vendor_rate_card_sample.csv"
              download style="color: #fff" 
              >Download Sample File</a></v-btn>
           
            
              <v-btn v-if="current_vendor.is_contracted_vendor" class="mt-5 ml-2" @click="rateCardFilePopup"
                color="primary">Update rate card</v-btn>
           
           
              <v-btn v-if="current_vendor.is_contracted_vendor" class="mt-5 ml-2" @click="downloadRateCardFile"
                color="primary">Download rate card</v-btn>
            
           </v-actions>
          </v-row>
          <!-- <v-card-title>
              <v-text-field class="flex" prepend-inner-icon="mdi-magnify" v-model="quotation_search" label="Search" single-line></v-text-field>
              <v-spacer></v-spacer>
              <div> <v-btn  @click="openVendorListModal" class="ma-2" color="primary">EMAIL VENDOR</v-btn>
                  <v-btn  @click="PublishGlobalLot"  color="primary" class="ma-2">Publish Lots</v-btn> </div>                
            </v-card-title> -->

          <!-- update card popup -->
          <v-row justify="center">
            <v-dialog v-model="rateCardpopup" max-width="750px">
              <v-card class="v-card-100">
                <v-card-title>
                  <span class="inc-tile">
                    Upload Rate card file
                  </span>
                </v-card-title>
                <v-card-text class="pa-0">
                  <form @submit.prevent="uploadFile" enctype="multipart/form-data" ref="inv_file_upload_form">
                    <v-card-title style="display:flow-root;">
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <div>
                          <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }" />
                          <div v-if="file_required">
                            <div class="warning_img">
                              <div class="warning_imgw">
                                <img src="@/assets/images/icons/warning.svg">  <span class="file-text">File is required</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </v-container>
                    </v-card-text>
                    <v-card-actions center>
                      <v-spacer></v-spacer>
                      <button small class="main_button mr-2"  :disabled="number > 0">Submit</button>
                      <button small type="button" color="normal" @click="closePopup()">Cancel</button>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
          <!--  Download rate card popup -->
          <!-- <v-row justify="center">
            <v-dialog v-model="downloadratecard" max-width="1000px">
              <v-card class="v-card-100">
                <v-card-title class="pl-4">
                  <span>Download rate card files</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="downloadratecard = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-dialog>
          </v-row> -->
          <v-card-text v-if="!current_vendor.is_contracted_vendor">

            <v-data-table :dense="true" :headers="distribution_headers" :items="distributions" class="elevation-1">
              <template v-slot:item.action="{ item }">
                <img @click="openConfirmation(item)" src="@/assets/images/Delete_Icon.png"
                  title="Delete Distribution Center" />
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-text v-if="current_vendor.is_contracted_vendor">

            <v-data-table :dense="true" :headers="download_cards_headers" :items="table_data1" class="elevation-1"
                  item-key="id" :loading="loading">
                  <template v-slot:item.master_file="{ item }">
                    <p>{{ getFileName(item.master_file['url']) }}</p>
                  </template>
                  <template v-slot:item.created_at="{ item }">{{ dateTimeform(item.created_at) }}</template>
                  <template v-slot:item.download_file="{ item }" align="center" justify="center">
                    <img @click="downloadFileRate(item)" class="mt-3" src="@/assets/images/icons/inward_visibility.svg"
                      width="40" height="30" />
                  </template>
                   <template v-slot:item.logs="{item}">
                    <img @click="logsDialogOpen(item)"
                      src="@/assets/images/job_sheet.png"
                      title="File Logs"
                    />
                  </template>
                </v-data-table>
                <v-row justify="center">
            <!-- Log Dialog -->
      <v-dialog v-model="logDialog" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="quotation_search" label="Search" single-line></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-card height="300px" style="overflow-y: scroll;">
                <v-card-text height="400px">
                  <!-- {{logs}} -->
                  {{ this.logs }}
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
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="confirmationModelDelete" persistent max-width="350px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Confirmation</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <span>Are You Sure You want to Delete Vendor?</span>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn class="mr-2" small text color="blue" @click="confirmationModelDelete = false">CLOSE</v-btn>
                <v-btn class="mr-2" small text color="blue" @click="deleteVendor">CONFIRM</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card-title>
      <v-row>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search By Vendor Code" single-line
            v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions>
        <span class="pull-right">
          <v-btn color="success">
            <a href="https://beam-saas-dev.s3.ap-south-1.amazonaws.com/uploads/lot_inventory_report/vendor_master_sample_file.csv"
              download>Download Sample File</a>
          </v-btn>
        </span>
        <div class="p-2">
          <router-link :to="{ name: 'VendorMasterUpload' }">Add New Upload</router-link>
        </div>
      </v-card-actions>
    </v-card-title>
    <v-flex style="overflow: auto">
      <v-data-table :dense="true" :headers="headers" :items="table_data" disable-pagination :hide-default-footer="true"
        class="elevation-1">
        <template v-slot:item.view="{ item }">
          <img @click="openDistributionCenter(item)" src="@/assets/images/job_sheet.png" title="View Distributions">
        </template>
      </v-data-table>
    </v-flex>
    <div class="float-right">
      <v-row class="ml-2">
        <v-col cols="4" sm="3">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per Page"
            @change="handlePageSizeChange"></v-select>
        </v-col>

        <v-col cols="12" sm="9">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>
</v-card>
</template>

<script>
import HeaderComponent from "../../../commoncomponents/HeaderComponent";
import { required, minLength, helpers } from 'vuelidate/lib/validators';
import { mapState } from "vuex";
import axios from 'axios'
export default {
  
  data () {
    return {
      headerText: "Vendor Master List",
      number:0,
      uploads: [],
      search: '',
      distributions: [],
      alert: false,
      alert_type: '',
      alert_message: '',
      quotation_search: '',
      distribution_headers: [
        {
          text: "Site Name",
          align: "start",
          value: "name"
        },
        { text: 'Site Code', value: 'code' },
        { text: 'Delete', value: 'action' }
      ],
      headers: [
        {
          text: "Vendor Name",
          align: "start",
          value: "vendor_name"
        },
        { text: "Vendor Email", value: "vendor_email"},
        { text: "Vendor Code", value: "vendor_code"  },
        { text: "Vendor Type", value: "vendor_type" },
        { text: "Action" , value: "view"}
      ],
      download_cards_headers: [
        { text: "File Name", value: "master_file" },
        { text: "Upload Date", value: "created_at" },
        { text: "Status", value: "status" },
        { text: "Download", value: "download_file" },
        { text: "Log", value: "logs" },
      ],
      table_data: [],
      table_data1: [],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      confirmationModelDelete: false,
      current_vendor: '',
      distributionModel: false,
      selected_dc: '',
      is_validated: true,
      selected_dc: '',
      rateCardpopup: false,
      downloadratecard: false,
      file: "",
      file_required: false,
      vendor_master_id: '',
      download_file: "",
      logs: "",
      logDialog: false
    }
  },
  created() {
    this.getVendors()
  },
  components: {
    HeaderComponent
  },
  validations: {
      file: {required }
    },
  computed: {
    sortedUploads() {
      return this.uploads.slice().sort((a, b) => {
        return a.id - b.id
      })
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    getVendors() {
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      this.$http.secured.get('/admin/vendor_masters', { params: { page: params['page'], per_page: params['size'] } })
        .then(response => {
          this.table_data = response.data.vendor_masters
          this.totalPages = response.data.meta.total_pages
          this.loading = false;
        })
        .catch(error => this.$toast.error('Error in fetching Vendor Master'))
    },

    searchItem() {
      this.loading = true
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      if (this.search.length != 0) {
        this.$http.secured.get('/admin/vendor_masters', { params: { page: 1, per_page: params['size'], search: this.search } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.vendor_masters
              this.totalPages = response.data.meta.total_pages
              this.loading = false;
            } else {
              this.showAlert("error", "No Records Found for given value");
            }
          })
          .catch(error => this.showAlert("error", "Error in fetching Filter Record"))
      } else {
        this.loading = false;
        this.getVendors()
      }

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

    handlePageChange(value) {
      this.page = value;
      this.getVendors();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getVendors();
    },

   // rate card upload file
    uploadFile() {
      this.number++;
      if (this.$v.file.$invalid) {
          this.file_required = true;
          this.number = 0;
          return;
        }else{
           this.file_required = false;
        }  
      let formData = new FormData()

      if (this.file.name.split(".").pop() != 'csv') {
        this.$toast.error('Only CSV files can be imported');
        this.number = 0;
        return;
      }
      const params = {
        master_file: this.file,
        master_file_type: 'Vendor Rate Card',
        vendor_master_id: this.current_vendor.id,
        user_id: this.$store.state.currentUser.id
      }
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )
      this.$http.secured.post('/admin/master_file_uploads', formData)
        .then(response => {
          this.table_data1 = response.data.master_file_upload
          this.show = false
          this.$refs.file.type='text';    
          this.$refs.file.type='file';
          this.rateCardpopup = false
          this.$toast.success('File uploaded successfully');
        })
        .catch(error => {
          this.number = 0;
          this.show = false
          this.$toast.error('Please Enter Valid File')
        }
        )
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      if (this.$v.file.$invalid) {
        this.file_required = true;
        return;
      } else {
        this.file_required = false;
      }
    },
    rateCardFilePopup() {
      this.rateCardpopup = true
      this.number = 0;
      this.$refs.file.type='text';    
      this.$refs.file.type='file'; 

    },
    // ====== utility ==================
    getFileName(file_url) {
      var arr = file_url.split('/')
      return arr[arr.length - 1]
    },
    dateTimeform(d) {
      // 15/02/2021 08:32 AM
      var date = new Date(d)
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = date.toLocaleDateString("en-US") + ' ' + hours + ':' + minutes + ' ' + ampm;
      return strTime;
    },
    downloadFileRate(item) {
      this.download_file = item.master_file.url
      let url = item.master_file.url
      window.location.href = url;
    },
    downloadRateCardPopup() {
      this.downloadratecard = true
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get("/admin/vendor_masters/" + this.current_vendor.id + "/uploaded_rate_cards", { params: { file_name: this.quotation_search, page: params['page'], per_page: params['size'] } })
        .then((response) => {
          if (response) {
            this.table_data1 = response.data.uploaded_rate_cards
            // const urls = response.data.uploaded_rate_cards.map(upload => upload.inventory_file.url);
            this.loading = false;
          } else {
            this.showAlert("error", "No Data Found");
            this.loading = false;
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },
    closePopup() {
      this.rateCardpopup = false
      this.file = ""
    },

    logsDialogOpen (item){
        this.logDialog = true;
        this.logs       = item.remarks
        console.log(this.logs)
        // this.$http.secured
        // .get("/api/v1/inventory_file_uploads/" + item.id)
        // .then((response) => {
        //   if (response) {
        //     this.logs       = response.data.reason
        //     this.loading    = false;
        //   } else {
        //     this.loading    = false;
        //     this.showAlert("error", "No Logs Found");
        //   }
        // })
        // .catch((error) => {
        //   this.showAlert("error", "Something went wrong from Network" + error);
        //   this.loading = false;
        // });
      },
      closeLogsDialog(){
        this.logDialog = false;
      },
    // rate card file end

    openConfirmation(item) {
      this.selected_dc = this.current_vendor.vendor_distributions.filter(x => x.distribution_center_id == item.id)[0]
      this.confirmationModelDelete = true
    },

    openDistributionCenter(item){
      this.current_vendor = item
      this.distributions = item.distribution_centers
      this.distributionModel = true
      this.downloadRateCardPopup();
    },

    deleteVendor(){
      const formData = new FormData();
      formData.append('vendor_master_id', this.current_vendor.id)
      formData.append('id', this.selected_dc.id)
      formData.append('distribution_center_id', this.selected_dc.distribution_center_id)
      this.loading = true;
      this.$http.secured
        .post("/admin/vendor_masters/delete_vendor", formData)
        .then(response => {
          if (response.data) {
            this.confirmationModelDelete = false
            this.distributionModel = false
            this.showAlert("success", 'Item Deleted Successfully');
            this.getVendors()
            this.loading = false;
            this.current_vendor = ''
            this.selected_dc = ''
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    downloadRateCardFile(){
      this.$http.secured
        .get(`admin/vendor_masters/${this.current_vendor.id}/export_rate_cards`)
        .then((response) => {
          if (response) {
            this.$toast.success(response.data);
            this.loading = false;
          } else {
            this.showAlert("error", "No Data Found");
            this.loading = false;
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    }

  }

}

</script>
<style >
  .theme--light.v-icon {
    color: #1867c0 !important;
  }

  .v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
  .v-data-table>.v-data-table__wrapper>table>thead>tr>th,
  .v-data-table>.v-data-table__wrapper>table>tfoot>tr>th {
    font-size: 14px !important;
  }

  .v-card {
    max-width: 97% !important;
  }

  .v-card-100 {
    max-width: 100% !important;
  }

  .inc-title {
    color: #172B4D;
    font-size: 20px;
  }

  .insurance-submission-table {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .v-data-table>.v-data-table__wrapper>table {
    width: 100%;
    border-spacing: 0;
  }

  .margin {
    margin-left: -20px !important;
  }

  .margin1 {
    margin-left: 60px;
  }

  .v-btn_content {
    font-size: 11px !important;
  }

  .main_button {
    min-width: 120px;
    height: 30px;
  }

  .v-application .mt-3 {
    margin-top: 0px !important;
  }
  .col-md-bottom{
    bottom: -5px !important;
  }
  .file-text{
    position: relative;
    left: 22px;
    top: -5px;
  }
  
</style>