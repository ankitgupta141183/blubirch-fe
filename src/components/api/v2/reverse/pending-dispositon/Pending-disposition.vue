<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert
        :type="alert_type"
        :value="alert"
        transition="scale-transition"
        >{{ alert_message }}</v-alert
      >
    </div>
    <div><HeaderComponent :headerTitle="headerText" /></div>

    <v-row justify="center">
      <v-dialog v-model="dspRepairDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-data-table
                :dense="true"
                :headers="submission_headers"
                :items="selected"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="dispositionRemarks" solo name="input-7-4" label="Add Remarks*"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="dspRepairDialog = false">Cancel</v-btn>
            <v-btn small color="primary" @click="setDisposition">{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="policyModel" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Please Select Policy</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-radio-group v-model="liquidation_policy">
                <v-radio
                  v-for="policy in policies"
                  :key="policy.id"
                  :label="policy.original_code"
                  :value="policy.id"
                ></v-radio>
              </v-radio-group>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="closepolicypop('close')"
                >CLOSE</v-btn>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="closepolicypop('confirm')"
                >CONFIRM</v-btn>
              </v-layout>
            </v-container>
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
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id or Serial Number" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col cols="3" sm="3">
          <v-select :items="alert_item" v-model="alert_value" item-value="value" item-text="name"  label="Select Alert Level" outlined @change="FilterWithAlert()"></v-select>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-actions>
        <v-autocomplete
          v-model="selectedDisposition"
          :items="disposition"
          item-text="original_code"
          item-value="id"
          @change="changeDispositionItems"
          target="#set-disposition"
          color="primary"
          label="SET DISPOSITION"
        ></v-autocomplete>
      </v-actions>
    </v-card-title>
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
          :dense="true"
          v-model="selected"
          :headers="headers"
          :items="table_data"
          show-select
          class="elevation-1"
          :custom-sort="customSort"
          disable-pagination
          :hide-default-footer="true"
          :loading="loading"
          loading-text="Loading Data... Please wait"
        >
          <template #[`item.alert_level`]="{ item }">
            <v-chip
              class="ma-2 justify-center"
              x-small
              label
              :color="getColor(item.alert_level)"
              dark
              style = "min-width:80px;"
              >{{ item.alert_level }}</v-chip
            >
          </template>

          <template #[`item.both_ageing`]="{ item }">
            <span>({{item.both_ageing.ageing_inward?item.both_ageing.ageing_inward:'0d'}})</span>
          </template>

          <template #[`item.item_desc`]="{ item }">
            <span v-b-tooltip.hover :title="item.item_desc">{{
              item.item_desc | truncate(17, "...")
            }}</span>
          </template>

          <template #[`item.call_log_id`]="{ item }">
            <span>{{ item.call_log_id ? item.call_log_id : "N/A" }}</span>
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
  color: #1867c0 !important;
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
import $ from "jquery";
import Editor from "@tinymce/tinymce-vue";
import HeaderComponent from "../../../../commoncomponents/HeaderComponent.vue";
export default {
  data() {
    return {
      headerText: "Pending Disposition",
      loading: true,
      alert: false,
      selected: [],
      search: "",
      alert_type: "success",
      alert_message: "success",
      dspRepairDialog: false,
      selected_dispoition: "",
      action_remark: "",
      disposition: [],
      selectedDisposition: "",
      submission_headers: [],
      dialog_title: '',
      files: [],
      dispositionRemarks: '',
      item_key: "inventory_id",

      headers: [
        {
          text: "Item ID",
          align: "start",
          value: "tag_number",
        },
        { text: "Article ID", value: "sku_code" },
        {
          text: "Article Description",
          value: "item_description",
        },
        { text: "Brand", value: "brand" },
        { text: "Aging", value: "both_ageing" },
        { text: "RPA Reason", value: "return_reason" },
        { text: "Serial Number", value: "serial_number" },
        { text: "Alert Level", value: "alert_level" },
      ],

      table_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm",
      policyModel: false,
      liquidation_policy: "",
      policies: [],
      credit_note_amount: "",
      page: 1,
      totalPages: 1,
      pageSize: 100,

      pageSizes: [100, 200, 500],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}, {name: 'Brand', value: "brand"}],
      field_type: '',
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}]
    };
  },
  created() {
    this.getPendingDispositionData();
    this.getDisposition();
  },
  components: {
    HeaderComponent,
  },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },

    FilterWithAlert(){
      this.getPendingDispositionData(this.active_tab);
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
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
      this.getPendingDispositionData(this.active_tab);
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getPendingDispositionData(this.active_tab);
    },

    getPendingDispositionData() {
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get("/api/v1/warehouse/pending_dispositions", {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value}})
        .then((response) => {
          if (response.data) {
            this.original_table_data = response.data.pending_dispositions;
            this.table_data = this.original_table_data
              .map(function (inv_item) {
                inv_item.both_ageing = {
                  ageing_inward: inv_item.ageing
                };
                return inv_item;
              });
            this.table_data = this.table_data.filter(x => x.is_active == true)
            this.loading = false;
            this.totalPages =  response.data.meta.total_pages
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },

    getDisposition() {
      this.$http.secured
        .get("/api/v1/warehouse/pending_dispositions/get_dispositions")
        .then((response) => {
          if (response.data) {
            this.disposition = response.data.dispositions;
            this.policies = response.data.policies;
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        });
    },

    getColor(calories) {
      if (calories == "High") return "red";
      else if (calories == "Medium") return "orange";
      else return "green";
    },

    selectdate() {
      this.inspection_date = this.inspection_date_2;
      this.dateselect = false;
    },
    selectsettlementdate() {
      this.settlement_date = this.inspection_date_2;
      this.dateselect = false;
    },

    changeDispositionItems(selected_item) {
      this.selectedDisposition = selected_item;
      var selected_disposition = this.disposition.filter(x => x.id == (selected_item) )
      if (this.selected.length) {
        if (selected_disposition[0].original_code == 'Liquidation'){
          this.policyModel = true
        }
        this.dispositionRemarks = '';
          (this.dailog_confirm = "Confirm"),
          (this.dialog_title =
            "Set Disposition to " + selected_disposition[0].original_code);
        this.submission_headers = [
          {
            text: "Item Id",
            align: "start",
            value: 'tag_number'
          },
          { text: "Article Description", value: "item_description" }
        ]
        if (this.policyModel == false){
          this.dspRepairDialog = true;
        }
        this.dsp_repair_data = this.selected;
      } else {
        this.showAlert("warning", "Please select the inventories first");
      }
    },

    closepolicypop(action){

      if (action == 'close'){
        this.policyModel = false
        return
      }

      if (this.liquidation_policy == '' && action == 'confirm'){
        this.$toast.error('Please Select Policy')
        return
      }
      this.policyModel = false
      this.dspRepairDialog = true
    },

    setDisposition() {
      if(this.dispositionRemarks == '' ){
         this.$toast.error('Please enter remarks')
        this.dispositionRemarks = ''
        return
      }

      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      this.loading = true;

      const formData = new FormData();
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("pending_disposition_ids[]", this.selected[i].id);
      }

      formData.append("desposition_remarks", this.dispositionRemarks);
      formData.append("disposition", this.selectedDisposition);
      formData.append("page", params['page']);
      formData.append("per_page", params['size']);
      if (this.liquidation_policy != ''){
        formData.append('policy', this.liquidation_policy)
      }

      this.$http.secured
        .post("/api/v1/warehouse/pending_dispositions/set_disposition", formData)
        .then(response => {
          if (response.data.pending_dispositions) {
            this.original_table_data = response.data.pending_dispositions;
            this.table_data = this.original_table_data.filter(x => (x.status == 'Pending Disposition')
            ).map(function(inv_item){inv_item.both_ageing = {ageing_inward:inv_item.ageing}; return inv_item});
            this.table_data = this.table_data.filter(x => x.is_active == true)
            this.selectedDisposition = '';
            this.selected = [];
            this.dspRepairDialog = false;
            this.dispositionRemarks = ''
            this.dialog_title = ""
            this.liquidation_policy = ''
            this.loading = false;
            this.totalPages =  response.data.meta.total_pages
            this.showAlert("success", 'Disposition Set Sucessfully');
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

    searchItem(){
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      if (this.field_type == ''){
        this.showAlert("error", "Please Select Field to search in");
        return
      }

      const formData = new FormData();

      formData.append('search_in', this.field_type)
      formData.append('search', this.search)
      formData.append('status', status)
      formData.append('page', 1)
      formData.append('per_page', params['size'])

      if (this.search.length != 0){
        this.$http.secured.post('/api/v1/warehouse/pending_dispositions/search_item', formData)
        .then(response => {
          if (response.data) {
            this.table_data = response.data.pending_dispositions.map(function (inv_item) {
                inv_item.both_ageing = {
                  ageing_inward: inv_item.ageing
                };
                return inv_item;
              });
            this.table_data = this.table_data.filter(x => x.is_active == true)
            this.loading = false;
            this.totalPages =  response.data.meta.total_pages
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => this.showAlert("error", "Error in Records"))
      }else {
        this.field_type = ''
        this.getPendingDispositionData()
      }

    },

    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
          if (index[0]=='both_ageing') {
            if (!isDesc[0]) {
                return (parseInt(b.ageing.split(' ')[0])) - parseInt(a.ageing.split(' ')[0])
            } else {
                return (parseInt(a.ageing.split(' ')[0])) - parseInt(b.ageing.split(' ')[0])
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

  },

  filters: {
    truncate: function (text, length, suffix) {
      if (text ? text.length : 0 > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
};
</script>