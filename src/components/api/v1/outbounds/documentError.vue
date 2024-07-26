<template>
  
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>



    <div> <HeaderComponent :headerTitle="headerText" /></div>
    
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

        <v-list-item-content  class="pl-4" v-if="active_details_tab === 'Request Payload'">
          <v-card>
            <div>
              <v-row>
                <v-col cols="12" sm="12" md="12" style="margin-left: 25px;">
                  <pre>{{ selected_document_data.payload }}</pre>
                </v-col>
            </v-row>
            </div> 
          </v-card>
        </v-list-item-content>  

        <v-list-item-content  class="pl-4" v-if="active_details_tab === 'Error Messages'">
          <v-card>
            <div>
              <v-row>
                <v-col cols="12" sm="12" md="12" style="margin-left: 25px;">
                  <pre>{{ selected_document_data.remarks }}</pre>
                </v-col>
            </v-row>
            </div> 
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

        <template v-slot:item.created_at="{ item }">
           {{ format_date(item.created_at) }}
        </template>

        <template v-slot:item.view_items="{item}">
          <img @click="viewDocumentDetails(item)"
            src="@/assets/images/job_sheet.png"title="View Items"/>
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
</style>

<script>
import $ from 'jquery'
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import moment from 'moment'
export default {
  data() {
    return {
      headerText: "Error Documents",      
      loading: true,
      alert: false,
      alert_type: "success",
      alert_message: "success",
      selected_document_data: "",
      DocumentInformationTabs: ["Request Payload", "Error Messages"],
      item_information_header: [],
      documentDetailDialog: false,
      tab_link_index: 0,
      selected_row : [],
      active_details_tab: 'Request Payload',
      singleSelect: false,
      selected: [],
      search: "",
      menu_items: [],
      dialog: false,
      headers: [
        { text: "Batch Number", value: "payload[batch_number]" },
        { text: "Document Numbers", value: "document_number" },
        { text: "Created At", value: "created_at" },
        { text: "Is Error", value: "is_error" },
        { text: "Action", value: "view_items" }
      ],
      payload_header: [
        { text: "Payload", value: "item_number"}
      ],
      table_data: [],      
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      field_type: ''     

    };
  },
  created() {
    this.getErrorData();
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

    loadDetails(tab_link){
      this.active_details_tab = tab_link;      
    }, 

    closeDocumentInformationDialog(){
      this.documentDetailDialog = false;
      this.selected             = []
      this.selected_document_data = []
    },

    viewDocumentDetails(item){
      this.selected_document_data = item
      this.tab_link_index      = 0
      this.documentDetailDialog = true
      this.selected.push(item)
      this.active_details_tab   = "Request Payload"
      // this.$http.secured
      //   .get("/api/v1/warehouse/wms/documents/get_item_list", {params: {id: item.id}})
      //   .then(response => {
      //     if ((response) && (response.data.master_data_inputs != undefined)) {
      //       this.selected_document_data = response.data.master_data_inputs
      //     }         
      //     else{
      //       this.showAlert('error', "No Data Found");
      //     }
      //   })
      //   .catch(error => {
      //     this.showAlert('error', "Something went wrong from Network" + error);
      //   });
    },
    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    handlePageChange(value) {
      this.page = value;
      this.getErrorData();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getErrorData();
    },

    getErrorData() {
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get("/api/v1/warehouse/wms/documents/get_error_documents", {params: {page: params['page'], per_page: params['size']}})
        .then(response => {
          if (response.data) {
            this.original_table_data = response.data.master_data_inputs;
            this.totalPages =  response.data.meta.total_pages
            this.table_data = this.original_table_data            
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

    format_date(value){
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY hh:mm::ss')
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
    }


  }
};
</script>