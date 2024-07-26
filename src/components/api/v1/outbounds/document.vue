<template>
  
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>



    <div> <HeaderComponent :headerTitle="headerText" /></div>
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab
          ripple :href="'#'+tab.replace(/ /g,'_').toLowerCase()"
          style="text-transform:none!important;"
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>

       <!--Success Submit confirm popup -->
       <v-row justify="center">
      <v-dialog v-model="submitPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="submitConfirmationCancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span > {{message}} </span>
          </v-card-text>
         <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterSubmitLoadData">Ok</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Edit Document Popup -->
      <v-row justify="center">
                <v-dialog v-model="editPopup" persistent max-width="700px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Outbound Documents</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="closeEditPopup">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                      </v-card>
                <v-card-text style="padding-bottom: 0px !important;">
                  <v-container>
                    <v-row>
                            <v-col cols="12" sm="5" md="6">
                              <v-text-field outlined label="Document Number" v-model="doc_number" :error-messages="isDocNotExsit ?[ErrorMessages1]:[]">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field outlined label="Article ID" v-model="articleId" :error-messages="isNotMatch ?[ErrorMessages2]:[]">
                                </v-text-field>
                            </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                <v-card-actions center>
                    <v-spacer></v-spacer>
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="closeEditPopup">Cancel</v-btn> 
                        <v-btn color="primary" :disabled = "doc_number == '' || articleId == ''" class="mb-3" @click="proceedEditPopup">Proceed</v-btn>  
                    <v-spacer></v-spacer>
                </v-card-actions>
                </v-card>
                </v-dialog>
      </v-row>

      <!-- Edit Document  Proceed Popup -->
      <v-row justify="center">
                <v-dialog v-model="proceedPopup" persistent max-width="700px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Outbound Documents</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="closeProceedPopup">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                      </v-card>
                <v-card-text style="padding-bottom: 0px !important;">
                  <v-container>
                    <v-row>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field disabled outlined label="Document Number" v-model="doc_number">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field outlined disabled label="Article ID" v-model="articleId">
                                </v-text-field>
                            </v-col>
                      </v-row>
                    <v-row>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field disabled outlined label="Article Description" v-model="article_descip">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="6">
                                <v-autocomplete outlined label="Scan Indicator" v-model="scanIndicator" :items="yesNoList" @change="makeDisableImeiAndSerial">
                                </v-autocomplete>
                            </v-col>
                      </v-row>
                    <v-row>
                            <v-col cols="12" sm="5" md="6">
                                <v-combobox :disabled="scanIndicator=='No'" outlined label="IMEI Flag" v-model="imeiFlag" :items="imeiList" @change="updateSerialNumber">
                                </v-combobox>
                            </v-col>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field :disabled="scanIndicator=='No' || imeiFlag != '0'" outlined label="Serial Number Length" v-model="serialNumbLength">
                                </v-text-field>
                            </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                <v-card-actions center>
                    <v-spacer></v-spacer>
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="closeProceedPopup">Cancel</v-btn> 
                        <v-btn color="primary" class="mb-3" @click="submitProceedPopup">Submit</v-btn>  
                    <v-spacer></v-spacer>
                </v-card-actions>
                </v-card>
                </v-dialog>
      </v-row>

    <v-card-title>
      <v-row>
        <v-col cols="3" sm="3">
          <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Document Number, Source, Destination Code, Assigned Username" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col cols="3" sm="3">
          <div class="editDocument1">
          <v-btn color="primary" @click="openEditPopup">Edit Document</v-btn>
        </div>
        </v-col>
      </v-row>     
    </v-card-title>

    <!-- Document Detail popup Start-->
		<v-row justify="center">
		  <v-dialog v-model="documentDetailDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
		  <v-card >
		    <v-toolbar dark color="primary">
		      <v-toolbar-title>Document Details</v-toolbar-title>
		      <v-spacer></v-spacer> 
		      <v-card-actions>
            <v-btn icon dark @click="closeDocumentInformationDialog"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>         
		    </v-toolbar>    

		    <v-list-item-content class="pa-0">
		      <v-toolbar color="#EDF3FA" height="53">
		        <v-tabs v-model="tab_link_index">
		          <v-tab
		            @click="loadDetails(tab_link)"
		            v-for="(tab_link, index) in DocumentInformationTabs"
		            :key="index"
		          >{{tab_link}}</v-tab>
		        </v-tabs>
		      </v-toolbar>
		    </v-list-item-content>

		    <v-list-item-content  class="pl-4" v-if="active_details_tab === 'Item List'">
		      <v-card>
		        <div>
		          <v-data-table style="overflow-x:auto;"
		            :dense="false"
		            :headers="item_information_header"
		            :items="selected_document_data"
		            class="elevation-1">              
		          </v-data-table>
		        </div> 
		      </v-card>
		    </v-list-item-content> 

        <v-list-item-content  class="pl-4" v-if="active_details_tab === 'Unassign User'">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>                              
                  <v-col cols="12" class="pa-0 pb-3">
                    <v-autocomplete v-model="user" :items="users" item-text="username" item-value="id" placeholder="Select User" prepend-icon="mdi-magnify"></v-autocomplete>
                  </v-col>                
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="primary" @click="assignUser()">Assign User</v-btn>
          </v-card-actions>
          </v-card>
        </v-list-item-content>  
		    
		  </v-card>
		  </v-dialog>
		</v-row>
		<!-- Document Detail popup Ends -->


    <v-layout column>

    <v-flex md6 style="overflow: auto"> 
      <v-data-table
        :dense="true"
        v-model="selected"
        :headers="headers"
        :items="table_data"
        show-select
        class="elevation-1"
        :loading="loading"
        :custom-sort="customSort"
        disable-pagination
        :hide-default-footer="true"
        loading-text="Loading Data... Please wait"
      >

        <template v-slot:item.dispatch_date="{ item }">
           {{ format_date(item.document_date) }}
        </template>

        <template v-slot:item.document_submitted_time="{ item }">
           {{ format_date(item.document_submitted_time) }}
        </template>

        <template v-slot:item.view_items="{item}">
		      <img @click="viewDocumentDetails(item)"
		        src="@/assets/images/job_sheet.png" title="View Items"/>
		    </template>


      </v-data-table>
    </v-flex>
  </v-layout>
  <div class="float-right">
    <v-row class="ml-2">
      <v-col cols="4" sm="3">
        <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Items per Page"
          @change="handlePageSizeChange"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="9">
        <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @input="handlePageChange"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
  </v-card>
</template>

<style >
.theme--light.v-icon {
  color: #1867c0!important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 14px !important;
}
.v-card {
  max-width: 97% !important;
}

.v-card-100 {
  max-width: 100% !important;
}
.editDocument1{
  display: flex;
  justify-content: right; 
  margin-top: 8px;
}
</style>

<script>
import $ from 'jquery'
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import moment from 'moment'
export default {
  data() {
    return {
      headerText: "Outbound Documents",      
      loading: true,
      alert: false,
      alert_type: "success",
      alert_message: "success",
      active_tab: "Pickslip",
      selected_document_data: [],
      DocumentInformationTabs: ["Item List" , "Unassign User"],
      item_information_header: [],
      documentDetailDialog: false,
      user: "",
      active_details_tab: "Item List",
      tab_link_index: 0,
      selected_row : [],
      users: [],
      tabs: [
        "Pickslip",
        "RTN"
      ],
      singleSelect: false,
      selected: [],
      search: "",
      menu_items: [],
      dialog: false,
      headers: [
        {
          text: "Document Number",
          align: "start",
          value: "client_gatepass_number"
        },
        { text: "Document Date", value: "document_date" },
        { text: "Source Code", value: "source_code" },
        { text: "Destination Code", value: "destination_code" },
        { text: "Assigned Username", value: "assigned_username", width: '10%' },
        { text: "Status", value: "status", width: '10%' },
        { text: "Is Scanned", value: "is_scanned" },
        { text: "Pushed to SAP", value: "is_scanned"},
        { text: "Is Error", value: "is_error" },
        { text: "Action", value: "view_items" }
      ],
      inventory_details_header: [
        { text: "Item Number", value: "item_number", width: '6%' },
        { text: "Article", value: "sku_code" },
        { text: "Article Description", value: "sku_description", width: '10%' },
        { text: "Category", value: "category_code", width: '6%' },
        { text: "EAN", value: "ean" },
        { text: "Serial Number", value: 'serial_number' },
        { text: "IMEI1", value: "imei1" },
        { text: "IMEI2", value: "imei2" },
        { text: "Expected Qyy", value: "quantity", width: '4%' },
        { text: "Scan Qty", value: "outwarded_quantity", width: '4%' },
        { text: "Scan Ind", value: "scan_id", width: '4%' },
        { text: "Short Qty", value: "short_quantity", width: '4%' },
        { text: "Short Reason", value: "short_reason" },
        { text: "Scanned Time", value: "scanned_time" },
        { text: "Synced Time", value: "synced_time" },
        { text: "BB Document Received Time", value: "document_submitted_time" },
        { text: "SAP Document Pushed Time", value: "pushed_at" }
      ],
      table_data: [],      
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      field_item: [{name: 'Document Number', value: "client_gatepass_number"}, {name: 'Source Code', value: "source_code"}, {name: 'Destination Code', value: "destination_code"}, {name: 'Assigned Username', value: "assigned_username"}],
      field_type: '',
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}],
      proceedPopup: false,
      editPopup: false,
      articleId: '',
      doc_number : '',
      article_descip : '',
      scanIndicator : '',
      yesNoList : ['Yes','No'],
      imeiList : [0,1,2],
      imeiFlag : '',
      serialNumbLength : '',
      isPresent : false,
      ErrorMessages2 : "Article ID doesn't matched",
      ErrorMessages1 : "Document Number not exist!",
      isNotMatch : false,
      isDocNotExsit : false,
      submitPopup : false,
      message : '',
    };
  },
  created() {
    this.getDocumentData('Pickslip');
    this.getUserList();
  },
  components: {
    HeaderComponent
  },
  watch: {
    dispatchDialog() {
      this.$refs.dispatchForm.reset()
    }
  },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },

    format_date(value){
      if (value) {
      	return moment(String(value)).format('DD-MM-YYYY')
      }
    },

    assignUser(){
      this.$http.secured
        .get("/api/v1/warehouse/wms/documents/assign_outbound_user", {params: {id: this.user, document_id: this.selected[0].id}})
        .then(response => {
          if ((response) && (response.data)) {
            this.selected[0].assigned_username = response.data.outboud_document.assigned_username
            this.selected[0].assigned_user_id = response.data.outboud_document.assigned_user_id
            this.user = response.data.outboud_document.assigned_user_id
            this.closeDocumentInformationDialog();
            this.showAlert('success', "User for this document assigned successfully");
          }
          else{
            this.showAlert('error', "Error in assigning user");
          }
        })
        .catch(error => {
          this.showAlert('error', "Something went wrong from Network" + error);
        });
    },

    getUserList(){
      this.$http.secured
        .get("/api/v1/warehouse/wms/documents/users_list")
        .then(response => {
          if ((response) && (response.data)) {
            this.users = response.data.users
          }
          else{
            this.showAlert('error', "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert('error', "Something went wrong from Network" + error);
        });
    },

    getRequestParams( page, pageSize) {
      let params = {};


      if (page) {
        params["page"] = page;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    closeDocumentInformationDialog(){
      this.documentDetailDialog = false;
      this.selected             = []
      this.selected_document_data = []
      this.user = ""
    },

    viewDocumentDetails(item){
      this.selected_document_data = []
    	this.tab_link_index      = 0
      this.active_details_tab   = "Item List"
      this.item_information_header = this.inventory_details_header
    	this.documentDetailDialog = true
      this.selected.push(item)
    	this.$http.secured
        .get("/api/v1/warehouse/wms/documents/get_outbound_item_list", {params: {id: item.id}})
        .then(response => {
          if ((response) && (response.data.outbound_document_articles != undefined)) {
    				this.selected_document_data = response.data.outbound_document_articles;
            this.user =  item.assigned_user_id
    			}
          else if ((response) && (response.data.outbound_inventories != undefined)) {
            this.selected_document_data = response.data.outbound_inventories
            this.user =  item.assigned_user_id
          }
    			else{
    				this.showAlert('error', "No Data Found");
    			}
    		})
    		.catch(error => {
          this.showAlert('error', "Something went wrong from Network" + error);
        });
    },

    loadDetails(tab_link){
      this.active_details_tab = tab_link;
      if (tab_link == 'Inventory Details'){
        this.lot_information_header = this.inventory_details_header
        this.selected_lot_data      = this.selected_lot_inventories
       }
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    handlePageChange(value) {
      this.page = value;
      this.getDocumentData(this.active_tab);
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getDocumentData(this.active_tab);
    },

    getDocumentData(tab) {
    	if (this.active_tab == "Pickslip"){
        var document_type = "PCKSLP"
      }
      else if(tab == "RTN"){
        var document_type = "ZRTN"
      }
    	
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      var status = this.getStatus(tab)
      this.$http.secured
        .get("/api/v1/warehouse/wms/documents/list_outbound_documents", {params: {page: params['page'], per_page: params['size'], status: status, document_type: document_type}})
        .then(response => {
          if (response.data) {
            this.original_table_data = response.data.outbound_documents;
            this.totalPages =  response.data.meta.total_pages
            this.table_data = this.original_table_data
            // this.table_data = this.original_table_data.filter(
            //   x => x.status == status
            // ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
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

    getStatus(tab) {
      var status = "";
      if (tab == "Pending Call Log") {
        status = "Pending Claim";
      } else if (tab == "Update Call Log") {
        status = "Pending Call Log";
      } else if (tab == "Pending Inspection"){
        status = "Pending Brand Inspection"
      }else  if (tab == "Pending Brand Resolution"){
        status = "Pending Brand Approval"
      }else {
        status = tab
      }
      return status;
    },

    loadData(tab) {
      this.selected = [];
      this.active_tab = tab;
      this.table_data = [];
      this.search = '';
      this.page =  1
      this.totalPages =  1
      this.pageSize = 100
      this.field_type = ''
      var status = this.getStatus(tab)

      this.getDocumentData(tab)

      this.table_data = this.original_table_data.filter(
        x =>
          x.status == status
      ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});

      if (tab == "Pickslip") {
        (this.headers = [
          {
            text: "Document Number",
            align: "start",
            sortable: false,
            value: "client_gatepass_number"
          },
          { text: "Document Date", value: "document_date" },
          { text: "Source Code", value: "source_code" },
          { text: "Destination Code", value: "destination_code" },
          { text: "Assigned Username", value: "assigned_username", width: '10%' },
          { text: "Status", value: "status", width: '10%' },
          { text: "Is Scanned", value: "is_scanned" },
          { text: "Pushed to SAP", value: "is_scanned"},
          { text: "Is Error", value: "is_error" },
          { text: "Action", value: "view_items" }
        ]);
      }

      if (tab == "RTN") {
        (this.headers = [
          {
            text: "Document Number",
            align: "start",
            sortable: false,
            value: "client_gatepass_number"
          },
          { text: "Document Date", value: "document_date" },
          { text: "Source Code", value: "source_code" },
          { text: "Destination Code", value: "vendor_code" },
          { text: "Assigned Username", value: "assigned_username", width: '10%' },
          { text: "Status", value: "status", width: '10%' },
          { text: "Is Scanned", value: "is_scanned" },
          { text: "Pushed to SAP", value: "is_scanned"},
          { text: "Is Error", value: "is_error" },
          { text: "Action", value: "view_items" }
        ]);
      }

    },

    searchItem(){
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      if (this.field_type == ''){
        this.showAlert("error", "Please Select Field to search in");
        return
      }

      var status = this.getStatus(this.active_tab)

      if (this.active_tab == "Pickslip"){
    		var document_type = "PCKSLP"
    	}

      if (this.active_tab == "RTN"){
        var document_type = "RTN"
      }

      const formData = new FormData();

      formData.append('search', this.search)
      formData.append('search_in', this.field_type)
      formData.append('status', status)
      formData.append('document_type', document_type)
      formData.append('page', 1)
      formData.append('per_page', params['size'])

      if (this.search.length != 0){
        this.$http.secured.post('/api/v1/warehouse/wms/documents/search_outbound_documents', formData)
        .then(response => {
          if (response.data.outbound_documents){
            this.table_data = response.data.outbound_documents
            this.totalPages =  response.data.meta.total_pages            
          }else{
            this.showAlert("error","No Records Found for given value");
          }
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      }else {
        this.field_type = ''
        this.getDocumentData(this.active_tab)
      }

    },

    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
          if (index[0]=='both_ageing') {
            if (!isDesc[0]) {
                return (parseInt(b.ageing_dispatch.split(' ')[0])) - parseInt(a.ageing_dispatch.split(' ')[0])
            } else {
                return (parseInt(a.ageing_dispatch.split(' ')[0])) - parseInt(b.ageing_dispatch.split(' ')[0])
            }
          }
          else {
            if(typeof a[index] !== 'undefined'){
              if (!isDesc[0]) {
                 return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
              }
              else {
                  return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
              }
            }
          }
      });
      return items;
    },

    openEditPopup(){
      this.editPopup = true;
      this.isDocNotExsit = false;
      this.isNotMatch = false;
    },
    closeEditPopup(){
      this.editPopup = false;
      this.articleId= '';
      this.doc_number= '';
    },
    proceedEditPopup(){
      this.isNotMatch = false;
      this.isDocNotExsit = false;
      const params = {document_number : this.doc_number , article_id: this.articleId};
      this.$http.secured
        .get("/api/v1/warehouse/wms/documents/fetch_outbound_record", { params })
        .then(response => {
              if (response.data) {
                if(response.data.error){
                  if(!response.data.error.includes('Article'))
                    {
                      this.isDocNotExsit = true;
                      this.ErrorMessages1 = response.data.error;
                    }
                    else {
                      this.isNotMatch = true;
                      this.ErrorMessages2 = response.data.error;
                    }
                } else{
                  this.proceedPopup = true;
                  this.editPopup = false;
                  this.inboundId = response.data.id;
                  this.article_descip = response.data.item_description;
                  this.scanIndicator = response.data.scan_id;
                  this.imeiFlag = response.data.imei_flag;
                  this.serialNumbLength = response.data.serial_number_length;
                  if(response.data.scan_id == 'N'){
                    this.scanIndicator = 'No';
                    this.imeiFlag = 'N/A';
                    this.serialNumbLength = 'N/A';
                  } else { 
                    this.scanIndicator = 'Yes';
                    this.serialNumbLength = (this.imeiFlag != 0) ? 'N/A' : this.serialNumbLength;
                  }
                }
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
    closeProceedPopup(){
      this.proceedPopup = false;
      this.articleId= '';
      this.doc_number= '';
      this.article_descip='';
      this.scanIndicator='';
      this.imeiFlag='';
      this.serialNumbLength='';
      this.isNotMatch = false;
      this.isDocNotExsit = false;
    },
    submitProceedPopup(){
      const scan_id = this.scanIndicator == 'No' ? 'N' : 'Y';
      this.imeiFlag = this.imeiFlag == 'N/A' ? '0' : this.imeiFlag.toString();;
      this.serialNumbLength = this.serialNumbLength == 'N/A' ? 0 : parseInt(this.serialNumbLength);
      const id = this.inboundId;
      const gate_pass = {"scan_id" : scan_id , "imei_flag": this.imeiFlag, "serial_number_length":this.serialNumbLength};
      this.$http.secured
        .post("/api/v1/warehouse/wms/documents/update_outbound_scan_flag?id="+id, { "gate_pass" : gate_pass})
        .then(response => {
          if (response.data) {
            this.closeProceedPopup();
            this.submitPopup =true;
            this.message = response.data.message;
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
    makeDisableImeiAndSerial(){
      if(this.scanIndicator == 'No'){
        this.imeiFlag='N/A';
        this.serialNumbLength = 'N/A';
      }
      else {
        this.imeiFlag = '';
      }
    },
    updateSerialNumber(){
      if(this.imeiFlag!=0){this.serialNumbLength = 'N/A';}
      else {this.serialNumbLength = 0;}
    },
    submitConfirmationCancel(){
      this.submitPopup = false;
    },
    afterSubmitLoadData(){
      this.submitPopup = false;
      this.loadData(this.active_tab)
    },
  filters: {
    truncate: function(text, length, suffix) {
      if (text?text.length:0 > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
}
};
</script>