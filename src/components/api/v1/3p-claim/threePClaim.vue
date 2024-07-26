<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-3p" v-model="filtersPopup" persistent max-width="1224px">
        <v-card>
          <v-card-actions>
            <v-menu ref="menu_16" v-model="menu_16" :close-on-content-click="false" :return-value.sync="filter_date"
              transition="scale-transition" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field 
                    outlined 
                    v-model="filter_date" 
                    label="Date" 
                    prepend-inner-icon="event" readonly
                    v-bind="attrs" v-on="on"
                    style="max-width: 
                    300px;"  
                    class="ma-2"  
                ></v-text-field>
              </template>
              <v-date-picker v-model="filter_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu_16 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu_16.save(filter_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-combobox 
                  v-if="active_tab == 'Recovery'"
                  v-model="filterStage" 
                  :items="stages_data" 
                  item-text="name" 
                  item-value="id" 
                  label="Stage" 
                  outlined
                  class="ma-2" 
                  style="max-width:300px;"
            ></v-combobox>
            <!-- <v-text-field 
                prepend-inner-icon="mdi-magnify" 
                v-model="search_vendor" 
                label="vendor" 
                style="max-width: 
                300px;" outlined
                class="ma-2" 
            ></v-text-field> -->
            <v-combobox 
                v-model="search_vendor" 
                :items="search_vendor_data" 
                item-text="vendor_name" 
                item-value="vendor_code" 
                label="vendor"
                outlined 
                class="ma-2" 
                style="max-width: 300px;"
                @keyup="handleKeyEnter($event)"
            ></v-combobox>

            <v-combobox 
               v-if="active_tab == 'Recovery'"
                v-model="filterType" 
                :items="date_type" 
                item-text="name" 
                item-value="id" 
                label="Type"
                outlined 
                class="ma-2" 
                style="max-width: 
                300px;"
            ></v-combobox>
            <v-combobox 
               v-if="active_tab == 'Cost'"
                v-model="filterCostType" 
                :items="cost_data_type" 
                item-text="name" 
                item-value="id" 
                label="Cost Type"
                outlined 
                class="ma-2" 
                style="max-width: 
                300px;"
            ></v-combobox>
            
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="cancelFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="loadData(active_tab)">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

        <!-- Update CN/DN number popup -->  
     <v-row justify="center">
      <v-dialog v-model="updateCNorDNPopup" persistent max-width="366px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updateCNorDNPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                  <v-col cols="6" sm="12" md="12" style="height: 96px;">
                    <v-text-field label="Credit Note Number" outlined v-model="credit_note_number" type="number" required oninput="this.value = this.value.replace(/[^0-9]/g, '');"></v-text-field>
                    </v-col>               
              </v-container>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="updateCreditNumberSubmit" :disabled="!credit_note_number">Submit</v-btn>
            <v-btn outlined class="cancel-color mb-3" @click="updateCNorDNPopup = false">Cancel</v-btn>
            <v-spacer></v-spacer>
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
            <v-card-text class="text-center" v-if="active_tab == 'Recovery' || active_tab == 'Cost'">
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
     <!--  Item data detail popup for recovery-->
     <v-row justify="center">
      <v-dialog v-model="datadetailpopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.formatted_date ? item_details.formatted_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col colo="6" sm="6" md="6">
                        <span style="font-weight: 600;"> Stage</span>
                      </v-col>
                      <v-col colo="12" sm="6" md="6">
                        {{ item_details.formatted_stage_name ? item_details.formatted_stage_name: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 600;">Vendor</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                         {{ item_details.vendor_name ? item_details.vendor_name: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Type</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.formatted_note_type ? item_details.formatted_note_type : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Approval Ref. NO.</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.approval_reference_number ? item_details.approval_reference_number : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Amount</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.claim_amount ? item_details.claim_amount : 'N/A' }}
                      </v-col>
                    </v-row>
                   
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
     <!--  Item data detail popup for cost-->
     <v-row justify="center">
      <v-dialog v-model="datadetailcostpopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailcostpopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Repair Cost</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_amount ? item_details.claim_amount : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col colo="6" sm="6" md="6">
                        <span style="font-weight: 600;"> Cost Type</span>
                      </v-col>
                      <v-col colo="12" sm="6" md="6">
                        {{ item_details.formatted_cost_type ? item_details.formatted_cost_type: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Approval Ref. NO.</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.approval_reference_number ? item_details.approval_reference_number : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Date</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.formatted_date ? item_details.formatted_date : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 600;">Vendor</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                         {{ item_details.vendor_name ? item_details.vendor_name: 'N/A' }}
                      </v-col>
                    </v-row>              
                   
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Item data detail popup for closed-->
    <v-row justify="center" v-if="tabNameData == 'Cost'">
      <v-dialog v-model="datadetailcostpopupclosed" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailcostpopupclosed = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.formatted_date ? item_details.formatted_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col colo="6" sm="6" md="6">
                        <span style="font-weight: 600;"> Repair Cost</span>
                      </v-col>
                      <v-col colo="12" sm="6" md="6">
                        {{ item_details.claim_amount ? item_details.claim_amount: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Cost Type</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.formatted_cost_type ? item_details.formatted_cost_type : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Approval Ref. NO.</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.approval_reference_number ? item_details.approval_reference_number : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 600;">Vendor</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                         {{ item_details.vendor_name ? item_details.vendor_name: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">CN/DN Number</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.credit_debit_note_number ? item_details.credit_debit_note_number : 'N/A' }}
                      </v-col>
                    </v-row>
                   
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center" v-if="tabNameData == 'Recovery'">
      <v-dialog v-model="datadetailcostpopupclosed" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailcostpopupclosed = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.formatted_date ? item_details.formatted_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col colo="6" sm="6" md="6">
                        <span style="font-weight: 600;"> Stage</span>
                      </v-col>
                      <v-col colo="12" sm="6" md="6">
                        {{ item_details.formatted_stage_name ? item_details.formatted_stage_name: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Vendor</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.vendor_name ? item_details.vendor_name : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Type</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.formatted_note_type ? item_details.formatted_note_type : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 600;">Approval Ref. No.</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                         {{ item_details.approval_reference_number ? item_details.approval_reference_number: 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">CN/DN Number</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.credit_debit_note_number ? item_details.credit_debit_note_number : 'N/A' }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                         <span style="font-weight: 600;">Amount</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        {{ item_details.claim_amount ? item_details.claim_amount : 'N/A' }}
                      </v-col>
                    </v-row>
                   
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- For showing tabs -->
    <v-card class="v-card-100">
      <v-tabs v-model='tab_name'>
        <v-tab ripple :href="'#'" style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')"
          v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>
    <!-- For showing Filters and Action buttons -->
    <v-card-title style="padding: 28px;">
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="item_search" label="Search" style="max-width: 300px;"
            outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" color="primary" v-if="active_tab == 'Recovery'" @click="updateDialogRecovery" :disabled="(this.selected.length == 0)">UPDATE CN/DN NUMBER</v-btn>
        <v-btn class="ma-2" color="primary" v-if="active_tab == 'Cost'" @click="updateDialogRecovery" :disabled="(this.selected.length == 0)">UPDATE CN NUMBER</v-btn>
      </v-actions>

      <template v-if="active_tab != 'Closed'">
        <v-expansion-panels ref="filterPopupRef" class="custom-control_outlined" readonly
          style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
          <v-expansion-panel outlined @click="listFiltersData">
            <v-expansion-panel-header>Filter
              <template v-slot:actions>
                <v-icon color="primary">
                  mdi-menu-down
                </v-icon>
              </template>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-card-title>
    <!-- List data -->
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
           v-if="active_tab != 'Closed'"  
          :dense="true" 
          :search="search" 
          v-model="selected" 
          show-select 
          disable-pagination
          :hide-default-footer="true" 
          :headers="headers" 
          :items="table_data" 
          :loading="loading"
          loading-text="Loading Data... Please wait"
           class="elevation-1"
           >
          <template #[`item.tag_number`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
        </v-data-table>
        <!-- closed list data -->
        <v-data-table
          v-if="active_tab == 'Closed'" 
          :dense="true" 
          :search="search" 
          v-model="selected"
          disable-pagination
          :hide-default-footer="true" 
          :headers="headers" 
          :items="table_data" 
          :loading="loading"
          loading-text="Loading Data... Please wait"
           class="elevation-1"
           >
          <template #[`item.tag_number`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
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
import HeaderComponent from "./../../../commoncomponents/HeaderComponent"
import { required, minLength, helpers } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      headerText: "3P Claim",
      loading: false,
      alert: false,
      alert_type: "success",
      alert_message: "success",
      active_tab: 'Recovery',
      tab_name: 'Recovery',
      tabs: [
        "Recovery",
        "Cost",
        "Closed"
      ],
      headers: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Date", value: "formatted_date" },
        { text: "Stage", value: "formatted_stage_name" },
        { text: "Vendor", value: "vendor_name" },
        { text: "Type", value: "formatted_note_type" },
        { text: "Approval Ref. No.", value: "approval_reference_number" },
        { text: "Amount(₹)", value: "claim_amount" }
      ],
      table_data: [],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 300],
      item_search: '',
      filtersPopup: false,
      filterStage: '',
      search_vendor:'',
      filterType: '',
      filter_date: '',
      filterCostType:'',
      menu_16: false,
      selected: [],
      updateCNorDNPopup: false,
      credit_note_number: '',
      sussesspopup: false,
      datadetailpopup:false,
      item_details:[],
      tag_number:'',
      ins_id:'',
      item_id:'',
      successmessage:'',
      stages_data:'',
      date_type:'',
      cost_data_type:'',
      search_vendor_data:'',
      datadetailcostpopup:false,
      datadetailcostpopupclosed: false,
      search:'',
      tabNameData:''
    }
  },
  components: {
    HeaderComponent
  },
  async created() {
      this.loadData('Recovery')
    },
  methods: {
    listFiltersData(ev) {
      document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
      this.item_search = '';
      this.filtersPopup = true;
      
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
    loadData(tab, tab_action) {
      if (tab_action) {
        this.item_search = ''
      }
      this.loading = true;
      this.selected = []
      this.active_tab = tab
      this.table_data = []
      this.page = 1
      this.totalPages = 1
      this.pageSize = 100
      if (tab == "Recovery") {
        (this.headers = [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Date", value: "formatted_date" },
        { text: "Stage", value: "formatted_stage_name" },
        { text: "Vendor", value: "vendor_name" },
        { text: "Type", value: "formatted_note_type" },
        { text: "Approval Ref. No.", value: "approval_reference_number" },
        { text: "Amount(₹)", value: "claim_amount" }
        ]);
        this.fetchingRecoveryData();
        this.fetchingFiltersData();
      }
      if (tab == "Cost") {
        (this.headers = [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Date", value: "formatted_date" },
        { text: "Cost", value: "claim_amount" },
        { text: "Cost Type", value: "formatted_cost_type" },
        { text: "Approval Ref. No.", value: "approval_reference_number" },
        { text: "Vendor", value: "vendor_name" }
        ]);
        this.fetchingRecoveryData();
        this.fetchingFiltersData();
      }
      if (tab == "Closed") {
        (this.headers = [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Date", value: "formatted_date" },
        { text: "Vendor", value: "vendor_name" },
        { text: "Type", value: "formatted_note_type" },
        { text: "Approval Ref. No.", value: "approval_reference_number" },
        {text: "CN/DN Number", value:"credit_debit_note_number"},
        { text: "Amount(₹)", value: "claim_amount" }
        ]);
        this.fetchingRecoveryData();
      }
    },
    fetchingRecoveryData() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get("/api/v1/warehouse/third_party_claims", { 
          params: 
          { 
            tag_number: this.item_search, 
            page: params['page'], 
            per_page: params['size'],
            tab: this.active_tab,
            claim_raised_date : this.filter_date,
            vendor_code: this.search_vendor.vendor_code,
            stage_name: this.filterStage.id,
            note_type: this.filterType.id,
            cost_type: this.filterCostType.id,
            tab:this.active_tab
          } })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.third_party_claims
            this.totalPages = response.data.meta.total_pages
            this.filtersPopup = false;
            this.filter_date = '';
            this.filterCostType = '';
            this.search_vendor = '';
            this.filterType = '';
            this.filterStage = '';
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
    handlePageChange(value) {
      this.page = value;
      if (this.active_tab == 'Recovery') {
        this.fetchingRecoveryData();
      } 
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1
      if (this.active_tab == 'Recovery') {
        this.fetchingRecoveryData();
      } 
    },
    fetchingFiltersData() {
      this.$http.secured
        .get("/api/v1/warehouse/third_party_claims/get_filters_data")
        .then(response => {
          if (response.data) {
            this.stages_data = response.data.stage_names
            this.date_type = response.data.note_types;
            this.cost_data_type = response.data.cost_types;
            this.search_vendor_data = response.data.vendors_data;
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
    afterClickOkLoadData(){
      this.sussesspopup = false;
      this.selected = [];
      this.loadData(this.active_tab)
    },
    updateDialogRecovery(){
      this.updateCNorDNPopup = true;
      this.ins_id = this.selected.map(insurances => insurances.id);
    },
    itemDetailpopup(item){
      if(this.active_tab == 'Recovery'){
        this.datadetailpopup = true;
        this.tag_number = item.tag_number;
        let str = String(this.tag_number);
        this.tag_number = str;
        this.item_id = item.id;
        this.$http.secured
        .get(`/api/v1/warehouse/third_party_claims/${this.item_id}`)
        .then(response => {
          if (response.data) {
            this.item_details = response.data.third_party_claim
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
      if(this.active_tab == 'Cost'){
        this.datadetailcostpopup = true;
        this.tag_number = item.tag_number;
        let str = String(this.tag_number);
        this.tag_number = str;
        this.item_id = item.id;
        this.$http.secured
        .get(`/api/v1/warehouse/third_party_claims/${this.item_id}`)
        .then(response => {
          if (response.data) {
            this.item_details = response.data.third_party_claim
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
      if(this.active_tab == 'Closed'){
        this.datadetailcostpopupclosed = true;
        this.tag_number = item.tag_number;
        let str = String(this.tag_number);
        this.tag_number = str;
        this.item_id = item.id;
        this.$http.secured
        .get(`/api/v1/warehouse/third_party_claims/${this.item_id}`)
        .then(response => {
          if (response.data) {
            this.item_details = response.data.third_party_claim
            this.tabNameData = response.data.third_party_claim.tab_name
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
    updateCreditNumberSubmit(){
      var ids = [];
      ids = this.ins_id
      this.$http.secured.put(`/api/v1/warehouse/third_party_claims/update_cn_dn_number`, {
         "ids":ids,
         "credit_debit_note_number": this.credit_note_number
         } )
        .then(response => {
          if (response.data) {
            this.updateCNorDNPopup = false;
            this.sussesspopup = true;
            this.successmessage = response.data
            this.credit_note_number ='';
            this.showAlert("success", "Successfully updated");
            this.loadData(this.active_tab);
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.number = 0;
          this.loading = false;

        });
    },
    cancelFilterpopup(){
            this.filtersPopup = false;
            this.filter_date = '';
            this.filterCostType = '';
            this.search_vendor = '';
            this.filterType = '';
            this.filterStage = '';
    },
    handleKeyEnter(event){
        this.fetchVendorData(event.target.value);
    },
    fetchVendorData(val) {
      this.$http.secured
        .get("/api/v1/warehouse/new_repairs/get_vendor_master",{
          params: {
            query: val,
          },
        })
        .then(response => {
          if (response.data) {
            this.search_vendor_data = response.data.vendor_masters
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },
  }
}  
</script>
<style>
.v-dialog__content:has(.filter-3p) {
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
}

.custom-control_outlined .v-expansion-panel:before {
  box-shadow: none;
}

.custom-control_outlined button {
  min-height: 56px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .42);
  border-style: solid;
}

.custom-control_outlined button:focus {
  outline: none;
}
</style>