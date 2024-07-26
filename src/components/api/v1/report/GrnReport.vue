<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <div> <HeaderComponent headerTitle="Real Time GRN" /></div>
    <v-card-title>
        <a
          style="display: none"
          id="grn_report"
          small
          tile
          color="#F3F3F3"
          href=""
          target="_blank"
          download
        >
        </a>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search OBD" outlined v-on:keyup.enter="searchItem()" ></v-text-field>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-layout align-center>
          <v-btn
            @click="downloadPDF()"
            class="ma-2 white--text"
            color="blue"
          >Download</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card-title>

    <v-layout column>

    <v-flex md6 style="overflow: auto"> 
  
    <v-data-table
      :dense="true"
      :headers="headers"
      :items="table_data"
      disable-pagination
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template v-slot:item.obd_date="{ item }">
        {{ format_date(item.dispatch_date) }}
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

<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import { mapState } from "vuex";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  import moment from 'moment'
  export default {
    data() {
      return {  
        loading: false,
        alert: false,
        alert_message: '',
        alert_type: '',
        search: "",
        headers: [
          { text: "Source Site", align: "start", value: "source_code"},
          { text: "RP Site", value: "destination_code"  },
          { text: "OBD Number", value: "client_gatepass_number" },
          { text: "OBD Date", value: "obd_date" },
          { text: "Ageing", value: "ageing"},
          { text: "Total OBD Qty", value: "total_items"},
          { text: "GRN Completed Qty", value: "inwarded_quanity"},
          { text: "Pending Qty", value: "pending_quantity"},
          { text: "Status", value: "gp_status"},
        ],
        table_data: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
      };
    },
    computed: mapState(["currentUser", "signedIn"]),
    created() {
      this.getGrnData()
    },
    components: {
      editor: Editor,
      HeaderComponent
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

      handlePageChange(value) {
        this.page = value;
        this.getGrnData();
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.getGrnData();
      },

      searchItem(){
        this.loading =true
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );

        if (this.search.length != 0){
          this.$http.secured.get('/api/v1/warehouse/wms/gate_passes/get_grn_data', {params: {page: 1, per_page: params['size'], search: this.search}})
          .then(response => {
            if (response.data){
              this.table_data = response.data.gate_passes
              this.totalPages =  response.data.meta.total_pages
              this.loading = false;
            }else{
              this.showAlert("error","No Records Found for given value");
            }
          })
          .catch(error => this.showAlert("error", "Error in fetching Filter Record"))
        }else {
          this.loading = false;
          this.getGrnData()
        }

      },


      downloadPDF() {
        this.$toast.success("Report Will be autodownloaded please wait")
        this.$http.secured
          .get("/api/v1/warehouse/wms/gate_passes/export_pending_grn_inventories")
          .then((response) => {
            this.file_url = response.data.url;
            document.getElementById("grn_report").href = response.data.url;
            document.getElementById("grn_report").click();
          })
          .catch((error) =>
            this.$toast.error("Error in fetching pending GRN inventories")
          );
      },

      getGrnData() {
        this.loading = true;
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );

        this.loading = true;
        this.$http.secured
          .get("/api/v1/warehouse/wms/gate_passes/get_grn_data", {params: {page: params['page'], per_page: params['size']}})
          .then(response => {
            if (response.data) {
              this.table_data = response.data.gate_passes;
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
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

      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      format_date(value){
        if (value) {
        return moment(String(value)).format('DD-MMM-YYYY')
        }
      }

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
  };
</script>
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
  .inc-title{
    color: #172B4D;
    font-size: 20px;
  }
  .insurance-submission-table{
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>