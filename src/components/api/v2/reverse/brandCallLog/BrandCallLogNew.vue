<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Header component -->
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>

    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')"
          v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>

    <v-card-title style="padding: 28px;">
      <!-- Search fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="pending_info_search" label="Search"
            style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>
      <!-- Actions buttons -->
      <v-card-actions style="margin-bottom: 28px;">
        <!-- :disabled="(this.selected.length == 0)" -->
        <v-btn class="ma-2" color="primary" v-if="(active_tab !== 'Pending Disposition')"
          @click="dialogOpen">UPDATE</v-btn>

        <template v-if="active_tab === 'Pending Disposition'">
          <template v-if="this.currentUser.roles.includes('central_admin')">
            <v-btn class="ma-2" color="success" :disabled="(this.selected.length == 0)"
              @click="handleDisposition('approve')">Approve</v-btn>
            <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"
              @click="handleDisposition('reject')">Reject</v-btn>
          </template>
          <div class="text-center" v-if="this.currentUser.roles.includes('default_user')">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attr }">
                <v-btn color="primary" v-on="on" v-bind="attr">
                  ASSIGN DISPOSITION
                  <v-icon dark>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in disposition_item"
                  @click="handleDisposition('assignDisposition', item)" :key="index">
                  <v-list-item-title>{{ item.code }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>

      </v-card-actions>
      <!-- Filter -->
      <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
        style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
        <v-expansion-panel outlined @click="filtersData">
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
        <v-data-table :dense="true" :search="search" v-model="selected" show-select disable-pagination
          :hide-default-footer="true" :headers="headers" :items="table_data" :loading="loading"
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template v-slot:item.tag_number="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u>{{ item.tag_number }}</u>
            </a>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <div class="float-right">
      <v-row class="ml-2">
        <v-col cols="4" sm="3">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
            @change="(value) => handlePageChange(value, 'size')"></v-select>
        </v-col>
        <v-col cols="12" sm="9">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left" @input="(value) => handlePageChange(value, 'page')"></v-pagination>
        </v-col>
      </v-row>
    </div>
    <!--update's dialogs -->
    <BrandCallLogDialog :dialogDitails="dialogDitails" :rows="rows" :addMoreRows="addMoreRows" :addColoumns="addColoumns"
      :handleClosePopup="handleClosePopup" :handleSubmit="handleSubmit" :handlePopupLinkClick="handlePopupLinkClick"
      :disabledSubmitButton="disabledSubmitButton">
    </BrandCallLogDialog>


  </v-card>
</template>

<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { required } from 'vuelidate/lib/validators';
import BrandCallLogDialog from "./BrandCallLogDialog.vue";

export default {

  data() {
    return {
      headerText: "Brand Call Log",
      infoDataType: [],
      file: '',
      binaryData: '',
      alert_type: 'info',
      alert_message: '',
      loading: false,
      alert: false,
      active_tab: "Pending Information",
      files: [],
      selected_item: {},
      selected: [],
      tabs: [
        "Pending Information",
        "Pending BCL Tickets",
        "Pending Inspection",
        "Pending Decision",
        "Pending Disposition"
      ],
      headers: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Article ID", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Brand", value: "incident_date" },
        { text: "Supplier", value: "damage_type" },
      ],
      table_data: [],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 300],
      pending_info_search: '',
      pending_documents: '',
      pending_doc: '',
      rows: [],
      approved_amount: '',
      tag_number: '',
      search: '',
      currentUser: {},
      selectedDisposition: '',
      claim_amount: '',
      pending_documents_options: [],
      dialogDitails: {
        title: "Update",
        popup: false,
        width: "",
        type: "Pending Information",
        inputAdd: "ADD DATA FIELD"
      },
      addColoumns: {
        show: false,
        addText: "ADD DATA FIELD",
        deleteTaxt: "DELETE DATA FIELD"
      },
      disposition_item: [],
      disabledSubmitButton: false,
      mrp_rule: [v => !!v || 'The field is required',
      v => (Number(v) <= Number(this.claim_amount)) || 'Approved amount should be less then claim amount', this.validatePositiveNumber],
    }
  },
  components: {
    HeaderComponent,
    BrandCallLogDialog
  },
  validations: {
    file: { required }
  },
  async created() {
    this.currentUser = this.$store.state.currentUser;
    this.loadData('Pending Information')
  },

  methods: {
    addMoreRows() {
      let selected_item = this.rows.filter(row => row.element === "select").map(item => item.seletedValue)
      let remaingOPtions = this.pending_documents_options.filter(option => !selected_item.includes(option.field))
      let fill_data = this.rows.filter(row => row.element === "select").map(item => item.value || item.file)
      if (fill_data.includes(undefined) || remaingOPtions.length === 0) {
      } else {
        if (remaingOPtions.length === 1) {
          this.addColoumns.show = false
        }
        this.rows = [
          ...this.rows,
          { element: "select", label: "Select data field", options: remaingOPtions, inputLabel: "Update/Upload", inputType: "text", accept: 'application/pdf', itemText: "label", itemValue: "field", },
        ];
      }
    },
    deleteRow(index) {
      this.rows.splice(index, 1);
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

    async apiCaller({ method = "get", url, headers = {}, pagePage = false, params = {}, body = {} }) {
      let apiArguments = {
        params: { ...params },
        headers
      }
      if (pagePage) {
        const Pageparams = this.getRequestParams(this.page, this.pageSize);
        apiArguments.params = { ...apiArguments.params, page: Pageparams['page'], per_page: Pageparams['size'] }
      }
      this.loading = true;
      this.disabledSubmitButton = true
      // let result = await this.$http.secured[method](url, apiArguments)
      let httpMethod = method === "get" ? this.$http.secured[method](url, apiArguments) : this.$http.secured[method](url, body, apiArguments)
      let result = await httpMethod.then((response) => {
        if (response.status === 200 && response.data && response.headers["content-type"] !== "text/html") {
          return { response: true, data: response.data };
        } else {
          this.showAlert("error", "No Data Found");
          return "No Data Found"
        }
      })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network: " + error);
          return "Something went wrong from Network: "
        })
        .finally(() => {
          this.disabledSubmitButton = false
          this.loading = false;
        });
      let finallResult = { result: result.response ? result.data : "", error: !result.response ? result : "" }
      return finallResult
    },

    loadData(tab, tab_action) {
      if (tab_action) {
        this.pending_info_search = ''
      }
      this.loading = true;
      this.selected = []
      this.active_tab = tab
      this.table_data = []
      this.page = 1
      this.totalPages = 1
      this.pageSize = 100
      if (tab == "Pending Information") {
        (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Brand", value: "brand" },
          { text: "Supplier", value: "supplier" },
        ]);

        this.fetchPendingInfromation();
      }
      if (tab == 'Pending BCL Tickets') {
        (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Brand", value: "brand" },
          { text: "Supplier", value: "supplier" },
        ]);

        this.fetchPendingBclTicket();
      }
      if (tab == 'Pending Inspection') {
        (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Brand", value: "brand" },
          { text: "Supplier", value: "supplier" },
          { text: "Ticket Number", value: "ticket_number" }
        ]);

        this.fetchPendingInspection();
      }
      if ((tab == 'Pending Disposition') && (this.currentUser.roles.includes('default_user'))) {
        this.selectedDisposition = '';
        (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Brand", value: "brand" },
          { text: "Supplier", value: "supplier" },
          { text: "Ticket Number", value: "ticket_number" }
        ]);
        this.fetchPendingDisposition();
        let apiArguments = {
          method: "get",
          url: "/api/v1/warehouse/brand_call_logs/get_dispositions"
        }
        this.getDispositions(apiArguments)
      }
      if ((tab == 'Pending Disposition') && (this.currentUser.roles.includes('central_admin'))) {
        this.selectedDisposition = '';
        (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Grade", value: "grade" },
          { text: "Benchmark Price", value: "benchmark_price" },
          { text: "Net Recovery", value: "net_recovery" },
          { text: "Net Recovery %", value: "recovery_percent" }
        ]);
        this.fetchPendingDisposition();
        let apiArguments = {
          method: "get",
          url: "/api/v1/warehouse/brand_call_logs/get_dispositions"
        }
        this.getDispositions(apiArguments)

      }
      if (tab == 'Pending Decision') {
        (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Brand", value: "brand" },
          { text: "Supplier", value: "supplier" },
          { text: "Ticket Number", value: "ticket_number" }
        ]);
        this.fetchPendingDecision();
      }
    },

    apiFormatData(data) {

      let modifiedData = data.length > 0 ? data.map(item => {
        let modifiedItem = {};
        for (let key in item) {
          if (item[key] === "" || item[key] === null) {
            modifiedItem[key] = "N/A";
          } else {
            modifiedItem[key] = item[key];
          }
        }
        return modifiedItem;
      }) : [];
      return modifiedData
    },

    async fetchPendingInfromation(params = {}) {
      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/brand_call_logs",
        pagePage: true,
        params: { tag_number: this.pending_info_search, status: "pending_information", ...params }
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (!error && result) {
        this.table_data = this.apiFormatData(result.brand_call_logs)
        this.totalPages = result.meta.total_pages
      } else {
        this.table_data = []
        this.totalPages = 0
      }
    },

    async fetchPendingBclTicket(params = {}) {

      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/brand_call_logs",
        pagePage: true,
        params: { tag_number: this.pending_info_search, status: "pending_bcl_ticket", ...params }
      }
      let { result, error } = await this.apiCaller(apiArguments)

      if (!error && result) {
        this.table_data = this.apiFormatData(result.brand_call_logs)
        this.totalPages = result.meta.total_pages
      } else {
        this.table_data = []
        this.totalPages = 0
      }

    },
    async fetchPendingInspection(params = {}) {

      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/brand_call_logs",
        pagePage: true,
        params: { tag_number: this.pending_info_search, status: "pending_inspection", ...params }
      }
      let { result, error } = await this.apiCaller(apiArguments)

      if (!error && result) {
        this.table_data = this.apiFormatData(result.brand_call_logs)
        this.totalPages = result.meta.total_pages
      } else {
        this.table_data = []
        this.totalPages = 0
      }
    },
    async fetchPendingDecision(params = {}) {

      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/brand_call_logs",
        pagePage: true,
        params: { tag_number: this.pending_info_search, status: "pending_decision", ...params }
      }
      let { result, error } = await this.apiCaller(apiArguments)

      if (!error && result) {
        this.table_data = this.apiFormatData(result.brand_call_logs)
        this.totalPages = result.meta.total_pages
      } else {
        this.table_data = []
        this.totalPages = 0
      }

    },
    async fetchPendingDisposition(params = {}) {

      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/brand_call_logs",
        pagePage: true,
        params: { tag_number: this.pending_info_search, status: "pending_disposition", ...params }
      }
      let { result, error } = await this.apiCaller(apiArguments)

      if (!error && result) {
        this.table_data = this.apiFormatData(result.brand_call_logs)
        this.totalPages = result.meta.total_pages
      } else {
        this.table_data = []
        this.totalPages = 0
      }

    },
    async getDispositions(apiArguments) {

      let { result, error } = await this.apiCaller(apiArguments)

      if (!error && result) {
        this.disposition_item = result.dispositions;

      } else {
        this.disposition_item = ""
      }
    },

    handlePageChange(value, type) {
      if (type === "page") {
        this.page = value;
      } else {
        this.pageSize = value;
        this.page = 1
      }
      if (this.active_tab == 'Pending Information') {
        this.fetchPendingInfromation();
      } else if (this.active_tab == 'Pending BCL Tickets') {
        this.fetchPendingBclTicket();
      } else if (this.active_tab == 'Pending Inspection') {
        this.fetchPendingInspection();
      } else if (this.actions == 'Pending Decision ') {
        this.fetchPendingDecision
      } else {
        this.fetchPendingDisposition();
      }
    },

    async dialogOpen() {
      if (this.active_tab === "Pending Information") {
        this.updatePendingInformationfieldData()
      } else if (this.active_tab === 'Pending Decision') {
        let apiArguments = {
          method: "get",
          url: "/api/v1/warehouse/brand_call_logs/get_brand_decisions"
        }
        let { result, error } = await this.apiCaller(apiArguments)
        if (result && !error) {
          this.dialogDitails = {
            title: "Update",
            popup: true,
            width: "",
            active_tab: this.active_tab,
            dialogType: "update",
            closeBtn: true,
            submitBtn: true,
            closeText: "CANCEL",
            submitText: "SUBMIT",
            fieldData: {
              brand_approval_number_value: "",
              brand_decision_options: result.brand_decisions,
              brand_decision_value: "",
              discount_parcentage_value: "",
              credit_note_number: "",
              discount_value: ""
            }
          }
        }

      } else {
        this.addColoumns.show = false;
        this.setdialogRows('update')
        this.dialogDitails = {
          title: "Update",
          popup: true,
          width: "",
          active_tab: this.active_tab,
          dialogType: "update",
          closeBtn: true,
          submitBtn: true,
          closeText: "CANCEL",
          submitText: "SUBMIT",
        }
      }
    },

    async filtersData() {
      document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
      this.addColoumns.show = false;
      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/put_away/filters_data"
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {


        let data = {
          itemText: "key",
          itemValue: "value",
          brandsOptions: result.brands,
          gradeOptions: result.grades.map(grade => {
            return ({ label: grade.key, inputTag: "checkbox", ...grade })
          })
        }
        this.setdialogRows('filter', data)
        this.dialogDitails = {
          popup: true,
          type: this.active_tab,
          highestColums: 3,
          dialogType: "filter",
          closeBtn: true,
          submitBtn: true,
          closeText: "CANCEL",
          submitText: "Apply Filter(s)",
          width: "1000px"
        }
      }


    },

    async handleDisposition(type, item) {
      let ids = this.getSelectedIds()
      if (ids.length == 0) {
        this.showAlert("error", "Please select at least one record !")
        return "Please select at least one record !"
      }
      let body;
      if (type === "approve") {
        body = { ids: ids }
      } else if (type === "reject") {
        let data = {
          type: "reject",
          options: this.disposition_item
        }
        this.setdialogRows("update", data)
        this.dialogDitails = {
          popup: true,
          title: "Reject",
          active_tab: this.active_tab,
          dialogType: "update",
          closeBtn: true,
          submitBtn: true,
          closeText: "CANCEL",
          submitText: "Submit",
          width: "300px"
        }
        // body = {
        //   ids: ids,
        //   disposition_action: "reject",
        //   disposition: "Replacement"
        // }
      } else if (type === "assignDisposition") {
        body = {
          ids: ids,
          disposition: item.id
        }
      }
      if (body) {

        let apiArguments = {
          method: "post",
          url: ['approve', 'reject'].includes(type) ? "/api/v1/warehouse/brand_call_logs/set_disposition" : "/api/v1/warehouse/brand_call_logs/update_disposition",
          body
        }

        let { result, error } = await this.apiCaller(apiArguments)
        if (result && !error) {
          this.successPopup(result.message)
        }
      }

    },

    handleClosePopup() {
      this.rows = []
      this.dialogDitails = {
        popup: false
      }
      this.addColoumns.show = false;
    },

    async updatePendingInformationfieldData() {
      let ids = this.getSelectedIds()
      let apiArguments = {
        method: "get",
        url: "/api/v1/warehouse/brand_call_logs/get_pending_documents",
        params: { ids }
      }
      let { result, error } = await this.apiCaller(apiArguments)

      if (result && !error) {
        this.addColoumns.show = true;
        this.pending_documents_options = result.pending_documents
        this.setdialogRows('update', result.pending_documents)
        this.dialogDitails = {
          title: "Update",
          popup: true,
          width: "",
          active_tab: this.active_tab,
          highestColums: 3,
          dialogType: "update",
          closeBtn: true,
          submitBtn: true,
          closeText: "CANCEL",
          submitText: "SUBMIT",
        }
      }
    },

    handlePopupLinkClick(data, value) {
      this.setdialogRows("popupLink", value)
      this.dialogDitails = {
        popup: true,
        title: "Update",
        // active_tab: this.active_tab,
        dialogType: "update",
        popupLink: true,
        closeBtn: true,
        submitBtn: true,
        closeText: "CANCEL",
        submitText: "Submit",
        width: ""
      }
    },

    setdialogRows(type, data) {

      let rows;
      if (type === 'filter') {
        if (this.active_tab === 'Pending Information' || this.active_tab === 'Pending BCL Tickets') {
          rows = [
            { element: "search", label: "Article", value: '' },
            { element: "select", label: "Brand", value: '', options: data.brandsOptions, itemText: data.itemText, itemValue: data.itemValue },
            { element: "search", label: "Supplier", value: '' }
          ]
        } else if (this.active_tab === 'Pending Inspection' || this.active_tab === 'Pending Decision') {
          rows = [
            { element: "search", label: "Article ID", value: '' },
            { element: "select", label: "Brand", value: '', options: data.brandsOptions, itemText: data.itemText, itemValue: data.itemValue },
            { element: "search", label: "Supplier", value: '' },
            { element: "search", label: "Brand Call Log Ticket No.", value: '' }
          ]

        } else if (this.active_tab === 'Pending Disposition') {
          rows = [
            {
              element: "dropdownwithaction", label: "Grade",
              menuItems: data.gradeOptions
            },
            { element: "select&search", label: "Benchmark", menuItems: [] },
            { element: "select&search", label: "Net Recovery", menuItems: [] },
            { element: "select&search", label: "Net Recovery %", menuItems: [] }
          ]

        }
      } else if (type === 'update') {
        if (this.active_tab === 'Pending Information') {
          rows =
            [
              { element: "select", label: "Select data field", options: data, itemText: "label", itemValue: "field", inputLabel: "Update/Upload", inputType: "text", accept: 'application/pdf' },
              // { element: "file", label: "Update/Upload", accept: 'application/pdf' }
            ]
        } else if (this.active_tab === 'Pending BCL Tickets') {
          rows =
            [
              { element: "text", label: "Ticket No.", key: "ticket_number" },
              { element: "date", label: "Ticket Date", key: "ticket_date", datePopup: false, max: new Date().toISOString().substr(0, 10) }
            ]
        } else if (this.active_tab === 'Pending Inspection') {
          rows =
            [
              { element: "date", label: "Brand Inspection Date", key: "inspection_date", datePopup: false, max: new Date().toISOString().substr(0, 10) },
              { element: "file", label: "Brand Inspection Report", accept: 'application/pdf', key: "inspection_report" }
            ]
        } else if (this.active_tab === 'Pending Decision') {
          rows =
            [
              { element: "text", label: "Brand Approval Reference number" },
              { element: "select", label: "Brand Decision", options: ["RTV", "Replacement", "Discount", "Repair", "Reject"] },
              { element: "text", label: "Credit Note Number (Optional)" }
            ]
        }
        else if (this.active_tab === 'Pending Disposition') {
          if (data.type === "reject") {
            rows =
              [
                { element: "select", label: "Disposition", options: data.options, itemText: "id", itemValue: "code", col: '12' },
              ]
          }

        }
      } else if (type === "popupLink") {
        rows =
          [
            { element: "text", label: "Label Name", key: "label", value: data.label, readonly: true, field: data.field, data_type: data.data_type, is_mandatory: data.is_mandatory },
            { element: data.data_type === "doc" ? "file" : "text", accept: data.data_type === "doc" ? 'application/pdf' : "", label: "Update", key: "file" }
          ]
      } else if (type === "details") {
        rows = data
      }

      this.rows = rows
    },

    dataFormater(data) {
      let required_documents = [];
      if (data.brand_call_log.required_documents) {
        required_documents = data.brand_call_log.required_documents.map((document) => {
          return ({ key: document.label, link: true, ...document })
        })
      }
      let TabThreeAndFour = ["Pending Inspection", 'Pending Decision', 'Pending Disposition']
      let tabData = []
      if (TabThreeAndFour.includes(this.active_tab)) {
        let tab_pending_disposition = []
        if (this.active_tab === 'Pending Disposition') {
          tab_pending_disposition = [
            { key: "Benchmark Price", value: data.brand_call_log.item_price || "N/A" },
            { key: "Net Recovery", value: data.brand_call_log.net_recovery || "N/A" },
            { key: "Net Recovery %", value: data.brand_call_log.recovery_percent || "N/A" },
          ]
        }
        tabData = [
          { key: "Brand Call Log Ticket Date", value: data.brand_call_log.ticket_date || "N/A" },
          { key: "Brand Call Log Ticket Number", value: data.brand_call_log.ticket_number || "N/A" },
          // { key: "Brand Call Log Ticket Date", value: data.brand_call_log.ticket_date || "N/A" },
          ...tab_pending_disposition
        ]
      }

      return ([
        { key: "Article ID", value: data.brand_call_log.sku_code || "N/A" },
        { key: "Article Description", value: data.brand_call_log.item_description || "N/A" },
        { key: "Brand", value: data.brand_call_log.brand || "N/A" },
        { key: "Supplier", value: data.brand_call_log.supplier || "N/A" },
        ...required_documents,
        ...tabData
      ])

    },

    async itemDetailpopup(item) {
      this.addColoumns.show = false;
      this.selected_item = item

      let apiArguments = {
        method: "get",
        url: `api/v1/warehouse/brand_call_logs/${item.id}`
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {

        // if (this.active_tab === 'Pending Information') {
        let data = this.dataFormater(result, this.active_tab)
        this.setdialogRows('details', data)
        this.dialogDitails = {
          title: `Tag ID ${result.brand_call_log.tag_number}`,
          popup: true,
          width: "",
          active_tab: this.active_tab,
          highestColums: 3,
          dialogType: "details",
          data: item
        }
      }


    },

    handleSubmit() {

      if (this.dialogDitails.dialogType === "successAndError") {
        this.handleClosePopup()
        this.selected = []
        this.loadData(this.active_tab)
      } else if (this.dialogDitails.dialogType === 'filter') {
        this.applyFilterData()
      } else {
        if (this.active_tab === 'Pending Information') {
          if (this.dialogDitails.popupLink) {
            let file = this.rows.find(row => row.key === "file").file[0]
            if (file) {
              const formData = new FormData();
              formData.append('field', this.rows.find(row => row.key === "label").field);
              formData.append('label', this.rows.find(row => row.key === "label").value);
              formData.append('data_type', 'doc');
              formData.append('file', file);
              this.updateSingleInformationDocument(formData)
            }
          } else {
            let documents = this.rows.map(row => {
              let fieldData = this.rows.find(row => row.label === "Update/Upload")
              return ({
                field: row.optionData.field,
                label: row.optionData.label,
                data_type: row.optionData.data_type,
                file: row.file ? row.file : "",
                value: row.value ? row.value : ""
              })
            })

            let formData = new FormData();
            formData.append("ids", this.getSelectedIds());

            documents.forEach((item, index) => {
              for (let key in item) {
                // let fieldName = `documents[${index}][${key}]`;
                let fieldName = `${key}[${index}]`
                formData.append(fieldName, item[key]);
              }
            });

            this.bulkUpdateInformationDocument(formData)
          }
        }
        else if (this.active_tab === 'Pending BCL Tickets') {
          let bodyData = {
            ids: this.getSelectedIds(),
            ticket_date: this.rows.find(row => row.key === "ticket_date").value,
            ticket_number: this.rows.find(row => row.key === "ticket_number").value
          }
          this.updateBLCTicket(bodyData)
        } else if (this.active_tab === "Pending Inspection") {
          const file = this.rows.find(row => row.key === "inspection_report").file[0];
          const formData = new FormData();
          formData.append('ids', this.getSelectedIds());
          formData.append('inspection_date', this.rows.find(row => row.key === "inspection_date").value);
          formData.append('inspection_report', file);

          this.updatePendingInspection(formData)
        } else if (this.active_tab === 'Pending Decision') {
          let bodyData = {
            ids: this.getSelectedIds(),
            brand_decision: this.dialogDitails.fieldData.brand_decision_value,
            approval_ref_number: this.dialogDitails.fieldData.brand_approval_number_value,
          }

          if (this.dialogDitails.fieldData.brand_decision_value === "Discount") {
            bodyData = {
              ...bodyData,
              discount_parcentage_value: this.dialogDitails.fieldData.discount_parcentage_value
            }
          } else if (this.dialogDitails.fieldData.brand_decision_value !== "Reject") {
            bodyData = {
              ...bodyData,
              credit_note_number: this.dialogDitails.fieldData.credit_note_number
            }
          } else if (this.dialogDitails.fieldData.brand_decision_value === "Reject") {
            bodyData = {
              ...bodyData,
              credit_note_number: "",
              discount_parcentage_value: ""
            }
          }
          this.updatePendingDecision(JSON.stringify(bodyData))
        } else if (this.active_tab === 'Pending Disposition') {
          this.rejectDisposition()
        }
      }
    },

    async rejectDisposition() {
      let apiArguments = {
        method: "post",
        url: "/api/v1/warehouse/brand_call_logs/set_disposition",
        body: {
          ids: this.getSelectedIds(),
          disposition_action: "reject",
          disposition: this.rows.find(row => row.label === "Disposition").value
        }
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {
        this.successPopup(result.message)
      }
    },
    applyFilterData() {
      if (this.active_tab !== 'Pending Disposition') {
        let sku_code = this.rows.find(item => ["Article", "Article ID"].includes(item.label)).value
        let supplier = this.rows.find(item => item.label === "Supplier").value
        let brand = this.rows.find(item => item.label === "Brand").value
        let ticket_number = this.rows.find(item => item.label === "Brand Call Log Ticket No.")
        if (this.active_tab === 'Pending BCL Tickets') {
          let params = { sku_code, supplier, brand }
          this.fetchPendingBclTicket(params);
        } else if (this.active_tab === 'Pending Inspection') {
          let params = { sku_code, supplier, brand, ticket_number: ticket_number && ticket_number.value || "" }
          this.fetchPendingInspection(params)
        } else if (this.active_tab === 'Pending Decision') {
          let params = { sku_code, supplier, brand, ticket_number: ticket_number && ticket_number.value || "" }
          this.fetchPendingDecision(params)
        } else {
          let params = { sku_code, supplier, brand }
          this.fetchPendingInfromation(params)
        }
      }

      setTimeout(() => {
        this.handleClosePopup()
      }, 10)
    },
    async bulkUpdateInformationDocument(bodyData) {
      let apiArguments = {
        method: "post",
        url: `/api/v1/warehouse/brand_call_logs/bulk_update_docs`,
        body: bodyData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      let { result, error } = await this.apiCaller(apiArguments)

      if (result && !error) {
        this.successPopup(result.message)
      }
    },
    async updateSingleInformationDocument(bodyData) {
      let apiArguments = {
        method: "put",
        url: `/api/v1/warehouse/brand_call_logs/${this.selected_item.id}/update_document`,
        body: bodyData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {
        this.successPopup(result.message)
      }
    },
    getSelectedIds() {
      return this.selected.map(brandCallLog => brandCallLog.id);
    },

    async updateBLCTicket(body) {
      let apiArguments = {
        method: "put",
        url: "/api/v1/warehouse/brand_call_logs/update_ticket",
        body: body
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {
        this.successPopup(result.message)
      }
    },

    async updatePendingInspection(bodyData) {
      let apiArguments = {
        method: "put",
        url: "/api/v1/warehouse/brand_call_logs/update_inspection_details",
        body: bodyData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {
        this.successPopup(result.message)
      }
    },
    async updatePendingDecision(bodyData) {
      let apiArguments = {
        method: "put",
        url: "/api/v1/warehouse/brand_call_logs/update_approval_details",
        body: bodyData
      }
      let { result, error } = await this.apiCaller(apiArguments)
      if (result && !error) {
        this.successPopup(result.message)
      }
    },

    successPopup(message) {
      this.addColoumns.show = false;
      this.dialogDitails = {
        popup: true,
        width: "500px",
        dialogType: "successAndError",
        submitBtn: true,
        message: message,
        submitText: "Ok",
      }
    },
  },
}
</script>
<style>
@import "./BrandCallLogStyle.scss";
</style>
