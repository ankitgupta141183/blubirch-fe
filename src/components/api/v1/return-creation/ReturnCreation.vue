<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- main content -->
    <!-- Header Component -->
    <div> <HeaderComponent :headerTitle="headerText" /></div>
    <!-- Approve confirm popup -->
      <v-row justify="center">
        <v-dialog v-model="approveconfirmpopup" persistent max-width="424px">
          <v-card class="v-card-100">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="approveconfirmpopup = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="text-center" >
                <span> Are you sure you want to Approve?</span>
              </v-card-text>
            <v-card-actions center>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mb-3" @click="adminApproveItem">Yes</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- reject conform popup -->
      <v-row justify="center">
          <v-dialog v-model="rejectconfirmpopup" persistent max-width="424px">
            <v-card class="v-card-100">
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="rejectconfirmpopup = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text class="text-center" >
                  <span> Are you sure you want to Reject?</span>
                </v-card-text>
              <v-card-actions center>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="mb-3" @click="adminRejectItem">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      <!--  Success messeage popup -->
      <v-row justify="center">
        <v-dialog v-model="successpopup" persistent max-width="424px">
          <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="successpopup = false">
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
      <!-- delete lot -->
      <v-row justify="center">
        <v-dialog v-model="deletelotDilog" persistent max-width="450px">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Confirmation</span><br>                 
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                <span>  Are you sure want delete the lot? </span><br>  
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small text color="normal" @click="deletelotDilog = false">Cancel</v-btn>
              <v-btn small color="primary" @click="deletelotconfirm">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- data detail popup  -->
       <v-row justify="center">
        <v-dialog v-model="datadetailpopupdisposition" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Request ID "{{ return_request_id }}"</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="datadetailpopupdisposition = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
              <v-card-text>
                <v-container>
                  <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Return Request ID</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        {{ return_request_id }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Return Request Sub-ID</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        {{ return_sub_request_id }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Request Type</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        {{ request_type }}
                      </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" sm="6" md="6">
                          <span style="font-weight: 500;">Creation Date</span>
                        </v-col>
                        <v-col cols="6" sm="6" md="6">
                          {{ created_at }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" sm="6" md="6">
                          <span style="font-weight: 500;">Status</span>
                        </v-col>
                        <v-col cols="6" sm="6" md="6">
                          {{ status }}
                        </v-col>
                      </v-row>
                  </div>
                </v-container>
              </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-insurance" v-model="filteWithSubPopup" persistent max-width="1224px" style="max-width: auto;">
        <v-card>
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify"  v-model="request_sub_id" label="Return Request Sub-ID"  class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)" v-if="active_tab == 'Return / Claim Requests'|| active_tab == 'Pending Eligibility Validation' || active_tab == 'Pending Manual Disposition'"></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify"  v-model="request_id" label="Return Request ID"  class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)" v-if="active_tab == 'Return / Claim Requests' || active_tab == 'Pending Eligibility Validation' || active_tab == 'Pending Manual Disposition'"></v-text-field>
            <v-combobox v-model="request_type" :items="request_type_items" item-text="" item-value="" label="Request Type" multiple outlined class="ma-2"  v-if="active_tab == 'Return / Claim Requests' || active_tab == 'Pending Manual Disposition'"> </v-combobox>
            <v-combobox v-model="status" :items="status_items" item-text="" item-value="" label="Status" multiple outlined class="ma-2"  v-if="active_tab == 'Return / Claim Requests' "> </v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc" :disabled="number > 0">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Action and search -->
    <v-card class="v-card-100">
      <v-tabs v-model="tab_index">
        <v-tab style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')" v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title>
      <!-- search -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="return_search" label="Search" style="max-width: 300px;" outlined @keyup.enter="searchData"></v-text-field>
        </v-col>
      </v-row>
      <!-- Actions buttons -->
      <v-actions style="display: flex;" v-if="active_tab == 'Return / Claim Requests'">
        <v-btn class="ma-2" color="primary" to="/api/v2/return-creation/file_upload">FILE UPLOAD</v-btn>            
        <v-autocomplete 
          v-model="createRequest"
          :items="filteredReturnTypeList"
          item-text="original_code"
          label="CREATE REQUEST"
          solo
          class="ma-2 field"
          color="primary"
          return-object
          style="max-width: 177px;"
          @change="navigateToComponent">
        </v-autocomplete>
        <v-btn class="ma-2" color="primary" to="/api/v2/return-creation/invitepullback" style="color: #FFFFFF;"  v-if="(active_tab == 'Return / Claim Requests') && currentUser.roles.includes('central_admin')" :disabled="isButtonDisabled">Invite Pullback</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="!canDeleteItems" @click="deletelot">DELETE</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending Eligibility Validation'">
        <v-btn class="ma-2" color="#19B100" style="color: #FFFFFF;" :disabled="(this.selected.length == 0)"  v-if="(active_tab == 'Pending Eligibility Validation') && currentUser.roles.includes('central_admin')" @click="approveConfirmPopup">APPROVE</v-btn>
        <v-btn class="ma-2" color="primary" style="color: #FFFFFF;" :disabled="(this.selected.length == 0)"  v-if="(active_tab == 'Pending Eligibility Validation') && currentUser.roles.includes('central_admin')" @click="adminrejectpopup">REJECT</v-btn>
      </v-actions>
      <v-actions style=" margin-right: 10px; margin-bottom: 28px;" v-if="active_tab == 'Pending Manual Disposition'">      
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-on="on" v-bind="attrs" :disabled="selected.length == 0">
              ASSIGN DISPOSITION
              <v-icon dark>
              mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list >
            <v-list-item v-for="(item, index) in assigndispositionItems" :key="index" @click="setdisposition(item)">
              <v-list-item-title>{{ item.original_code }}</v-list-item-title>
              </v-list-item>
          </v-list>
        </v-menu>
      </v-actions>
      <!-- Filter -->
      <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
        <v-expansion-panel outlined @click="filterListOfButtons" >
          <v-expansion-panel-header>Filter
            <template v-slot:actions>
              <v-icon color="primary">
                mdi-menu-down
              </v-icon>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-title>
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table 
          :dense="true"  
          v-model="selected" 
          show-select
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
          <template #[`item.return_request_id`]="{ item }" v-if="(active_tab == 'Pending Eligibility Validation')" >
            <a @click="linkPopupInReqTracker(item)" style="color: #1976d2;">
              <u> {{ item.return_request_id }}</u>
            </a>
          </template>
          <template #[`item.return_sub_request_id`]="{ item }" v-if="(active_tab == 'Pending Eligibility Validation' || active_tab == 'Pending Manual Disposition')" >
            <a  style="color: #1976d2;">
              <u> {{ item.return_sub_request_id }}</u>
            </a>
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
</template>
<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
  import { strict } from 'assert';
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default{
    data(){
      return{
        headerText: "Return Creation",
        alert_type:'',
        alert_message:'',
        return_search:'',
        alert: false,
        selected:[],
        filteWithSubPopup:false,
        request_sub_id:[],
        request_id:'',
        request_type:[],
        status:[],
        request_type_items:[],
        status_items: '',
        returnTypeList: [],
        assigndispositionItems:[],
        active_tab: "Return / Claim Requests",
        currentUser: {},
        tabs: [
        "Return / Claim Requests",
        "Pending Eligibility Validation",
        "Pending Manual Disposition",],
        headers: [
          { text: "Return test", value: "return_sub_request_id",  sortable: false },
          {text: "Return Request ID", value: "return_request_id"},
          { text: "Request Type", value: "return_type" },
          { text: "Creation Date", value: "created_at" },
          { text: "Status", value: "status" }
        ],
        table_data: [],
        deletelotDilog: false,
        successpopup: false,
        successmessage: '',
        errorpopup: false,
        errormessage: '',
        search_type: '',
        tab_index: '',
        createRequest: '',
        assignDisposition: '',
        approveconfirmpopup: false,
        rejectconfirmpopup: false,
        datadetailpopupdisposition: false,
        loading: false,
        return_request_id: [],
        return_sub_request_id: [],
        request_type: '',
        item_details: [],
        req_id : '',
        created_at: [],
        number: 0,
        isButtonDisabled: true,
        page : 1 ,
        totalPages : 1,
        pageSize :  100,
        pageSizes : [50 , 100, 150], 
      }
    },
    components: {
      HeaderComponent
    },
    async created() {
      this.currentUser = this.$store.state.currentUser;
      this.loadData('Return / Claim Requests')
      this.scrollToTop();
    },
    computed: {
      canDeleteItems() {
        // return this.selected.some(item => item.status === "Pending Eligibility Validation");
        return this.selected.length > 0 && this.selected.every(item => item.status === "Pending Eligibility Validation");
      },
      filteredReturnTypeList() {
        return this.returnTypeList.map(item => {
          if (item.original_code === 'Pullback Return') {
            return { ...item, disabled: true };
          } else {
            return item;
          }
        });
      },
    },
    methods:{
      loadData(tab) {
        this.loading = true;
        this.selected = []
        this.table_data = []
        this.active_tab = tab
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if (tab == "Return / Claim Requests") {
          (this.headers = [
            { text: "Return Request Sub-ID", value: "return_sub_request_id", sortable: false },
            { text: "Return Request ID", value: "return_request_id" },
            { text: "Request Type", value: "return_type" },
            { text: "Creation Date", value: "created_at" },
            { text: "Status", value: "status" }
          ]);
          this.maindata();
          this.getrequestTypes();
        }
        if (tab == "Pending Eligibility Validation") {
          (this.headers = [
            { text: "Return Request ID", value: "return_request_id" },
            { text: "Return Request Sub-ID", value: "return_sub_request_id", sortable: false },
          ]);
          this.pendingEligibilityData();
        }
        if (tab == "Pending Manual Disposition") {
          (this.headers = [
            { text: "Return Sub-Request ID", value: "return_sub_request_id", sortable: false },
            { text: "Request Type", value: "return_type" },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "sku_description" },
            { text: "Category", value: "category" },
            { text: "Price (₹)", value: "price" }
          ]);
          this.pendingManualData();
          
          this.$http.secured
          .get("/api/v1/warehouse/return_initiation/master_values/return_initiation_dispostions")
          .then(response => {
            if (response.data) {
              this.assigndispositionItems = response.data.lookup_values;
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
        }
      },
      maindata() {
        this.return_search = ''
        const params = this.getRequestParams(this.page, this.pageSize);
          this.$http.secured
          .get("/api/v1/warehouse/return_initiation/return_items", { params: { page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.return_items;
              this.totalPages = response.data.meta.total_pages;
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
      pendingEligibilityData() {
        this.return_search = ''
        const params = this.getRequestParams(this.page, this.pageSize);
        this.$http.secured
        .get("/api/v1/warehouse/return_initiation/return_eligibility_validations", { params: { page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.return_items;
            this.totalPages = response.data.meta.total_pages;
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
      pendingManualData() {
        this.return_search = ''
        const params = this.getRequestParams(this.page, this.pageSize);
        this.$http.secured
          .get("/api/v1/warehouse/return_initiation/return_manual_dispositions", { params: { page: params['page'], per_page: params['size'] } })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.return_items;
                this.totalPages = response.data.meta.total_pages;
                this.loading = false;
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
            }
          ) .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },
      getrequestTypes() {
        const params = this.getRequestParams(this.page, this.pageSize);
        this.$http.secured
          .get("/api/v1/warehouse/return_initiation/master_values/return_types")
          .then(response => {
            if (response.data) {
              this.returnTypeList = response.data.lookup_values;
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
      navigateToComponent() {
        const return_type = this.createRequest.original_code;
        const return_id = this.createRequest.id;
        const return_value = this.createRequest.original_code;
        if (return_type) {
          switch (return_type) {
            case "Sales Return":
              this.$router.push({ name: "SalesReturnCreation", params: { return_id: return_id, return_value: return_value } });
              break;
            case "Internal Return":
              this.$router.push({ name: "InternalReturnRequest", params: { return_id: return_id, return_value: return_value } });
              break;
            case "Exchange Return":
              this.$router.push({ name: "ExchangeReturnRequest", params: { return_id: return_id, return_value: return_value } });
              break;
            case "Warranty Claim Return":
              this.$router.push({ name: "warentyClaim", params: { return_id: return_id, return_value: return_value } });
              break;
            case "Lease Return":
              this.$router.push({ name: "LeaseReturnRequest", params: { return_id: return_id, return_value: return_value } });
              break;
            case "Pullback Return":
              this.$router.push({ name: "pickupReturnRequest", params: { return_id: return_id, return_value: return_value } });
              break;
            default:
              break;
          }
      }
      },
    disableItem(item) {
      return item.original_code === 'Pullback Return';
    },
    searchData() {
      const params = this.getRequestParams(this.page, this.pageSize);

      const formData = new FormData();
      formData.append('search', this.return_search);
      formData.append('page', params['page']);
      formData.append('per_page', params['size']);

      this.loading = true;

      this.$http.secured
        .post(`/api/v1/warehouse/return_initiation/return_manual_dispositions/search`, formData)
        .then(response => {
          if (response.data) {
            this.table_data = response.data.return_items;
            this.totalPages = response.data.meta.total_pages;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
      approveConfirmPopup() {
        this.approveconfirmpopup = true;
      },
      adminApproveItem() {
        this.return_id = this.selected.map(return_items => return_items.id);
        const formData = new FormData();
        formData.append('return_ids', this.return_id)
        this.$http.secured
          .post(`/api/v1/warehouse/return_initiation/return_eligibility_validations/approve`, formData)
          .then((response) => {

            if (response.data) {
              this.approveconfirmpopup = false
              this.successpopup = true;
              this.successmessage = response.data.message;
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
        .catch((error) => {
          console.error("API Error:", error);
          if (error.response) {
            this.showAlert("error", error.response.data.error);
          } else {
            this.showAlert("error", "An unexpected error occurred.");
          }
          this.loading = false;
        });
      },
      adminrejectpopup() {
      this.rejectconfirmpopup = true;
      },
      adminRejectItem() {
        this.return_id = this.selected.map(return_items => return_items.id);
        const formData = new FormData();
        formData.append('return_ids', this.return_id)
        this.$http.secured
          .post(`/api/v1/warehouse/return_initiation/return_eligibility_validations/reject`, formData)
          .then((response) => {
            if (response.data) {
              this.successpopup = true
              this.successmessage = response.data.message;
              this.rejectconfirmpopup = false;
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
        .catch((error) => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
        });
      },
      setdisposition(item) {
        this.selected.push(item); 
        this.assignDispositionTo();
      },
      assignDispositionTo() {
        this.return_id = this.selected.map(return_items => return_items.id);
        const disposition_id = this.selected[this.selected.length - 1].id;

        const formData = new FormData();
        formData.append('return_ids', this.return_id);
        formData.append('disposition_id', disposition_id);

        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_manual_dispositions/assign_disposition', formData)
        .then(response => {
          if (response.data) {
            this.successmessage = response.data.message
            this.successpopup = true
            this.assignDisposition = '';
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("warning", "Please select the insurance ids");
          this.assignDisposition = '';
          this.loading = false;

        });
      },
      filterListOfButtons(ev) {
        this.filterDropdowndata();
        this.request_id = '';
        this.request_sub_id = '';
        this.status = '';
        this.request_type = '';
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filteWithSubPopup = true;
      },
      filterDropdowndata() {
        Promise.all([
          this.$http.secured.get(`/api/v1/warehouse/return_initiation/master_values/return_request_creation_status`),
          this.$http.secured.get(`/api/v1/warehouse/return_initiation/master_values/return_types`),
        ])
          .then(([response, responseLocation,]) => {
            this.status_items = response.data.lookup_values.map(item => item.original_code);
            this.request_type_items = responseLocation.data.lookup_values.map(item => item.original_code);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
      closeFilterpopup(){
        this.filteWithSubPopup = false;
        this.request_sub_id = '';
	      this.request_id = '';
	      this.request_type = '';
	      this.status = '';
      },
      applyFilterFunc() {
        this.return_search = '';
        const params = this.getRequestParams(this.page, this.pageSize);
        const formData = new FormData();
        formData.append('page', params['page']);
        formData.append('per_page', params['size']);
        formData.append('search_type[status]', this.status);
        formData.append('search_type[return_type]', this.request_type);
        formData.append('search_type[return_sub_request_id]',this.request_sub_id);
        formData.append('search_type[return_request_id]', this.request_id);
        
        this.$http.secured
          .post('/api/v1/warehouse/return_initiation/return_creations/search', formData)
          .then(response => {
            if (response.data) {
              this.table_data = response.data.return_items;
              this.totalPages = response.data.meta.total_pages;
              this.filteWithSubPopup = false;
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
            this.filteWithSubPopup = false;
          });
      },
      deletelot() {
        this.return_id = this.selected.map(lookup_values => lookup_values.id);
        this.deletelotDilog = true;
      },
      deletelotconfirm() {
        this.$http.secured
          .post("/api/v1/warehouse/return_initiation/return_creations/delete_return_items",{ return_item_ids : this.return_id })
          .then(response => {
            if (response.data) {
              // this.showAlert("success", "item deleted succusfully");
              this.deletelotDilog = false;
              this.successmessage = response.data.message
              this.successpopup = true
            } else {
              this.showAlert("error", "No Data Found");
              this.errormessage = response.data.error
              this.errorpopup = true
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
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
      linkPopupInReqTracker(item) {
        if (this.active_tab == 'Pending Eligibility Validation') {
          this.datadetailpopupdisposition = true
          this.return_request_id = item.return_request_id
          this.return_sub_request_id = item.return_sub_request_id;
          this.request_type = item.return_type;
          this.created_at =  this.formatTimestamp(item.created_at);;
          this.status = item.status;
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/return_eligibility_validations`)
          .then(response => {
            if (response.data) {
              this.item_details = response.data.return_items
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
        }
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      afterClickOkLoadData() {
        this.successpopup = false;
        this.successmessage = ''
        this.selected = [];
        this.loadData(this.active_tab);
      },
      handlePageChange(value) {
        this.page = value;
        this.maindata();
      },
      handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.maindata();
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
    }
}
</script>
<style>
.v-dialog>.v-card>:has(.v-card__title){
  overflow-wrap: break-word !important;
}
.custom-control_outlined .v-expansion-panel:before {
    box-shadow: none;
  }
  .custom-control_outlined button {
    min-height: 56px;
    border-width: 1px;
    border-color: rgba(0,0,0,.42);
    border-style: solid;
  }
  .custom-control_outlined button:focus {
    outline: none;
  }
  .v-dialog__content:has(.filter-insurance){
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
}
.my-autocomplete {
    background-color: #1976d2;
    color: white;
  }
/* .theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
  background-color: #1867c0 !important;
  color: #fff !important;
  margin-bottom: -35px !important;
} */
.field > .v-input__control > .v-input__slot {
  background-color: #1976d2 !important;
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
</style>