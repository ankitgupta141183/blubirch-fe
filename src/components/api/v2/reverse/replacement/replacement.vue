<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Title-->
    <header-component :headerTitle="headerText" />

    <!-- Update popup -->
    <v-row justify="center">
      <v-dialog v-model="updatePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Confirmation</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updatePendingConfirmationCancel">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="5" md="6">
                  <v-autocomplete v-model="return_method" outlined :items="returnList" label="Return Method"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="5" md="6">
                  <v-menu ref="menu_141" v-model="menu_141" :close-on-content-click="false" :return-value.sync="returnDate" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined hide-details v-model="formattedReturnDate" label="Return Date" prepend-inner-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="returnDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu_141 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu_141.save(returnDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="updatePendingConfirmationSubmit" :disabled="number > 0">Submit</v-btn>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="updatePendingConfirmationCancel">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="1224px">
        <v-card style="max-width: 100% !important;">
          <v-card-actions v-if="active_tab === 'Pending Confirmation' || active_tab === 'Dispatch'">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id_search" label="Article Id" class="ma-2" outlined></v-text-field>
            <v-autocomplete prepend-inner-icon="mdi-magnify" v-model="brand_selected" outlined :items="brandList" label="Brand" class="ma-2" multiple></v-autocomplete>
            <v-autocomplete prepend-inner-icon="mdi-magnify" v-model="vendor_selected" outlined :items="vendorList" item-text="vendor_name" item-value="vendor_code" label="Vendor" class="ma-2" :loading="isLoading" @keyup="handleKeyEnter($event)"></v-autocomplete>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Approve Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okapproveconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="approvalConfirmationCancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Header -->
    <v-tabs>
      <v-tab ripple :href="'#'" @click="loadData(tab, 'tab_clicked')" style="text-transform:none!important;text-decoration: none;padding-top: 4px;" v-for="(tab, index) in tabs" :key="index">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <!-- search, filter, Action buttons -->
    <v-card class="v-card-100">
      <v-card-title style="padding: 12px 20px 0px 20px;">
        <!-- Search fields -->
        <v-row>
          <v-col cols="8" sm="8">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          </v-col>
        </v-row>
        <!-- Actions buttons -->
        <v-actions style="margin-bottom: 28px;">
          <v-btn class="ma-2" :disabled="this.selected.length == 0" v-if="active_tab == 'Pending Confirmation'" color="primary" @click="updatedialog">UPDATE Confirmation</v-btn>
        </v-actions>

        <!-- Filter -->
        <v-expansion-panels v-if="active_tab == 'Pending Confirmation' || active_tab == 'Dispatch'"
          class="custom-control_outlined" ref="filterPopupRef" readonly
          style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
          <v-expansion-panel outlined @click="filterListOfButtons">
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
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dataDetailPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID "{{ item_details.tag_number }}"</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeDataDetailPopUp">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6" v-if="active_tab == 'Pending Confirmation' || active_tab == 'Pending Replacement'">
                    {{ item_details.sku_code ? item_details.sku_code : 'N/A' }}
                  </v-col>
                  <v-col cols="6" v-if="active_tab == 'Dispatch'">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6" v-if="active_tab == 'Pending Confirmation' || active_tab == 'Pending Replacement'">
                    {{ item_details.item_description ? item_details.item_description : 'N/A' }}
                  </v-col>
                  <v-col cols="6" v-if="active_tab == 'Dispatch'">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Pending Replacement'">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Price</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.item_price ? item_details.item_price : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab != 'Pending Replacement' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Brand</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.brand ? item_details.brand : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab != 'Pending Replacement' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Vendor</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.vendor ? item_details.vendor : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab != 'Pending Replacement' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Approval Code</span>
                  </v-col>
                  <v-col cols="6" v-if="active_tab == 'Pending Confirmation' || active_tab == 'Pending Replacement'">
                    {{ item_details.approval_code ? item_details.approval_code : 'N/A' }}
                  </v-col>
                  <v-col cols="6" v-if="active_tab == 'Dispatch'">
                    {{ item_details.approval_code_text ? item_details.approval_code_text : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Pending Confirmation'">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Status</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.confirmed_status ? item_details.confirmed_status : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Dispatch' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Replacement Order Number</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.order_number ? item_details.order_number : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Dispatch' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Replacement DC Number</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.replacement_dc_number ? item_details.replacement_dc_number : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Dispatch' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Return Method</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.return_method ? item_details.return_method : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Dispatch' || isDispatched == true">
                  <v-col cols="6">
                    <span style="font-weight: 500;">Return Date</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.return_date ? item_details.return_date.split('-').reverse().join('/') : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Data Table -->
    <v-layout column v-if="active_tab == 'Pending Confirmation' || active_tab == 'Dispatch'">
      <v-flex md6 style="overflow: auto">
        <v-data-table 
          :dense="true"
          :search="search"
          v-model="selected"
          show-select
          disable-pagination
          :hide-default-footer="true"
          :headers="headers"
          :items="table_data"
          :loading="loading"
          fixed-header
          height="100%"
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template #[`item.vendor`]="{ item }">
            <span>{{ item.vendor ? item.vendor : "N/A" }}</span>
          </template>
          <template #[`item.return_date`]="{ item }">
            <span>{{ item.return_date ? item.return_date.split('-').reverse().join('/') : "" }}</span>
          </template>
          <template #[`item.approval_code`]="{ item }">
            <span>{{ item.approval_code ? item.approval_code : "N/A" }}</span>
          </template>
          <template #[`item.tag_number`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <div v-if="active_tab == 'Pending Replacement'">
      <v-row>
        <v-col cols="6" sm="6" md="6"
          style="padding-right: 0px !important; padding-top:0px !important; border-right: 1px solid rgba(0,0,0,.26);">
          <v-layout>
            <v-flex style="overflow: auto">
              <div style="background-color:#0000000a; padding: 4px;">
                <span style="padding-left: 8px; padding-bottom: 8px;">Dispatched</span>
              </div>
              <v-data-table 
                :dense="true"
                disable-pagination
                :headers="headersDispatched"
                :hide-default-footer="true"
                :items="dispatchItem"
                :loading="loading"
                loading-text="Loading Data... Please wait" class="elevation-1">
                <template #[`item.tag_number`]="{ item }">
                  <a @click="newitemDetailpopup(item)" style="color: #1976d2;">
                    <u> {{ item.tag_number }}</u>
                  </a>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-col>
        <v-col cols="6" sm="6" md="6" style="padding-left: 0px !important; padding-top:0px !important; border-left: 1px solid rgba(0,0,0,.26)">
          <v-layout>
            <v-flex style="overflow: auto">
              <div style="background-color: #0000000a; padding: 4px;">
                <span style="padding-left: 8px; padding-bottom: 8px;">Replacement</span>
              </div>
              <v-data-table 
                :dense="true"
                :headers="headersReplacement"
                disable-pagination
                :hide-default-footer="true"
                :items="replacementItem"
                :loading="loading"
                loading-text="Loading Data... Please wait"
                class="elevation-1">
                <template #[`item.tag_id`]="{ item }">
                  <a @click="itemDetailpopup(item)" style="color: #1976d2;">
                    <u> {{ item.tag_number }}</u>
                  </a>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </div>

    <!-- pagination display -->
    <div>
      <v-row class="ml-2">
        <v-col cols="4" sm="1" class="PaddingItemPerPage">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
        </v-col>
        <span class="item-selected"> 
          <span v-if="selected.length == 1">{{selected.length}} Item Selected</span>
          <span v-if="selected.length > 1">{{selected.length}} Items Selected</span>
        </span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="PaddingItemPerPage">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>

  </v-card>
</template>
    
<script>
import HeaderComponent from "../../../../commoncomponents/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent
  },

  data() {
    return {
      headerText: "Replacement",
      tabs: [
        "Pending Confirmation",
        "Dispatch",
        "Pending Replacement"
      ],
      search_tag: '',
      alert_type: '',
      alert: false,
      alert_message: '',
      table_data: [],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      active_tab: "Pending Confirmation",
      selected: [],
      search: '',
      filterPopup: false,
      tag_id_search: '',
      article_id_search: '',
      updatePopup: '',
      number: 0,
      return_method: '',
      returnList: ["Dispatch", "Handover"],
      returnDate: '',
      okapproveconfirmpopup: false,
      headers: [],
      headersDispatched: [],
      headersReplacement: [],
      articleList: [],
      brandList: [],
      vendorList: [],
      dataDetailPopup: false,
      item_details: '',
      dispatchItem: [],
      replacementItem: [],
      message: [],
      menu_141: false,
      isDispatched: false,
      brand_selected: '',
      vendor_selected: '',
      isLoading: false,
      isFilteringPage: false,
      filterPageNo: 1,
    }
  },

  async created() {
    this.loadData('Pending Confirmation');
  },

  computed: {
    formattedReturnDate() {
      const dateParts = this.returnDate.split('-').reverse();
      return dateParts.join('/');
    },
  },
  methods: {
    // show Alert messages
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
        this.search_tag = '';
      }
      this.loading = true;
      this.selected = []
      this.active_tab = tab
      this.table_data = []
      this.page = 1
      this.totalPages = 1
      this.pageSize = 100
      this.isFilteringPage = false
      this.filterPageNo = 1
      if (tab == "Pending Confirmation") {
        (this.headers = [
          { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Brand", value: "brand" },
          { text: "Vendor", value: "vendor" },
          { text: "Approval Code", value: "approval_code" },
          { text: "Status", value: "confirmed_status" },
          { text: "Date for Dispatch", value: "return_date" },
        ]);
        this.fetchPendingConfirmation();
      } else if (tab == "Dispatch") {
        (this.headers = [
          { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
          { text: "Brand", value: "brand" },
          { text: "Vendor", value: "vendor" },
          { text: "Replacement Order Number", value: "order_number" },
          { text: "Replacement DC Number", value: "replacement_dc_number" },
          { text: "Status", value: "status" },
        ]);
        this.fetchDispatch();
      } else {
        (this.headersDispatched = [
          { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Price (₹)", value: "item_price" },
        ]);
        (this.headersReplacement = [
          { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Price (₹)", value: "item_price" },
        ]);
        this.fetchReplacement();
      }
    },

    fetchReplacement() {
      const params = {
        tag_number: this.search_tag,
        page: this.page,
        per_page: this.pageSize,
        status: this.active_tab,
      };
      this.$http.secured
        .get("/api/v1/warehouse/replacements", { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.replacements
            this.totalPages = response.data.meta.total_pages
            this.loading = false;
            this.dispatchItem = [];
            this.replacementItem = [];
            for (let i = 0; i < this.table_data.length; i++) {
              if (this.table_data[i].has_replacement_order) {
                if (this.table_data[i].item_replaced) {
                  this.replacementItem.push(this.table_data[i]);
                } else {
                  this.dispatchItem.push(this.table_data[i]);
                }
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

    fetchPendingConfirmation() {
      this.getVendorList('');
      const params = {
        tag_number: this.search_tag,
        page: this.page,
        per_page: this.pageSize,
        status: this.active_tab,
      };
      this.$http.secured
        .get("/api/v1/warehouse/replacements", { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.replacements
            this.brandList = response.data.replacements.map(x => x.brand)
            // this.vendorList = response.data.replacements.map(x => x.vendor)
            this.totalPages = response.data.meta.total_pages
            this.brandList.sort()
            // this.vendorList.sort()
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

    fetchDispatch() {
      this.getVendorList('');
      const params = {
        tag_number: this.search_tag,
        page: this.page,
        per_page: this.pageSize,
        status: this.active_tab,
      };
      this.$http.secured
        .get("/api/v1/warehouse/replacements/dispatch_items", { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.warehouse_order_items
            this.totalPages = response.data.meta.total_pages
            this.brandList = response.data.warehouse_order_items.map(x => x.brand)
            // this.vendorList = response.data.warehouse_order_items.map(x => x.vendor)
            this.brandList.sort()
            // this.vendorList.sort()
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
    handleKeyEnter(event) {
      this.getVendorList(event.target.value);
    },
    getVendorList(val) {
      this.isLoading = true;
      const params = {
        query: val,
      }
      this.$http.secured
        .get("/api/v1/warehouse/new_repairs/get_vendor_master", { params: params })
        .then(response => {
          if (response.data) {
            this.isLoading = false;
            this.vendorList = response.data.vendor_masters
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

    updatedialog() {
      this.updatePopup = true;
      this.number = 0;
    },

    updatePendingConfirmationCancel() {
      this.number = 0;
      this.updatePopup = false;
      this.returnDate = '';
      this.return_method = '';
    },

    updatePendingConfirmationSubmit() {
      this.number++;
      const idsList = this.selected.map(x => x.id).join(', ');
      this.$http.secured
        .put("/api/v1/warehouse/replacements/update_confirmation",
          {
            'ids': idsList,
            'return_method': this.return_method,
            'return_date': this.returnDate,
          })
        .then(response => {
          if (response.data) {
            this.message = response.data.message,
              this.message = this.message.replace(/'Updated'/g, '"Updated"'),
              this.okapproveconfirmpopup = true,
              this.loading = false;
            this.updatePendingConfirmationCancel();
          } else {
            this.loading = false;
            this.number = 0;
            this.$toast.error("error", "No Data Found");
          }
        })
        .catch(error => {
          this.number = 0;
          // this.showAlert("error", "Something went wrong from Network" + error);
          this.$toast.error(error.response.data.error)
          this.loading = false;
        });
    },

    approvalConfirmationCancel() {
      this.okapproveconfirmpopup = false;
    },

    afterClickOkLoadData() {
      this.okapproveconfirmpopup = false;
      this.loadData(this.active_tab);
    },

    closeFilterpopup() {
      this.filterPopup = false;
    },

    filterListOfButtons() {
      this.filterPopup = true;
      this.vendor_selected = '';
      this.article_id_search = '';
      this.brand_selected = '';
    },

    handlePageChange(value) {
      this.page = value;
      if (this.isFilteringPage) {
        this.filterPageNo = value;
        this.applyFilterFunc();
        return;
      }
      if (this.active_tab == 'Pending Confirmation') {
        this.fetchPendingConfirmation();
      } else if (this.active_tab == 'Dispatch') {
        this.fetchDispatch();
      } else {
        this.fetchReplacement();
      }
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1
      this.filterPageNo = 1;
      if (this.isFilteringPage) {
        this.applyFilterFunc();
        return;
      }
      if (this.active_tab == 'Pending Confirmation') {
        this.fetchPendingConfirmation();
      } else if (this.active_tab == 'Dispatch') {
        this.fetchDispatch();
      } else {
        this.fetchReplacement();
      }
    },

    applyFilterFunc() {
      this.search_tag = ''
      this.filterPopup = false;
      this.loading = true;
      this.isFilteringPage = true;
      const params = {
        article_id: this.article_id_search,
        vendor_code: this.vendor_selected,
        brand: (this.brand_selected.length > 1) ? this.brand_selected.join(',') : this.brand_selected[0],
        page: this.filterPageNo,
        per_page: this.pageSize,
        status: this.active_tab
      }
      if (this.active_tab == 'Pending Confirmation') {
        this.$http.secured
          .get("/api/v1/warehouse/replacements", { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.replacements
              this.totalPages = response.data.meta.total_pages
              this.loading = false;
              this.closeFilterpopup();
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      } else if (this.active_tab == 'Dispatch') {
        this.$http.secured
          .get("/api/v1/warehouse/replacements/dispatch_items", { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items
              this.totalPages = response.data.meta.total_pages
              this.loading = false;
              this.closeFilterpopup();
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
    newitemDetailpopup(item) {
      this.isDispatched = true;
      this.itemDetailpopup(item);
    },
    itemDetailpopup(item) {
      if (this.active_tab == 'Pending Confirmation' || this.active_tab == 'Pending Replacement') {
        this.dataDetailPopup = true;
        const id = item.id;
        this.$http.secured
          .get("/api/v1/warehouse/replacements/" + id)
          .then(response => {
            if (response.data) {
              this.item_details = response.data.replacement
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      } else if (this.active_tab == 'Dispatch') {
        this.dataDetailPopup = true;
        const id = item.id;
        this.$http.secured
          .get("/api/v1/warehouse/replacements/" + id + "/dispatch_item")
          .then(response => {
            if (response.data) {
              this.item_details = response.data.warehouse_order_item
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
    closeDataDetailPopUp() {
      this.dataDetailPopup = false;
      this.isDispatched = false;
    },
  },
}
</script>
<style scoped>
  .custom-control_outlined button {
    min-height: 56px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, .42);
    border-style: solid;
  }

  .v-dialog__content:has(.filter-data) {
    justify-content: right;
    align-items: baseline;
    top: 15rem;
  }
  .item-selected {
    margin-top: 29px;
    position: absolute;
    left: 35%;
  }
  @media (max-height: 1104px) {
    .PaddingItemPerPage{
      padding: 8px !important;
    }
  }
  @media (min-height: 1126px) {
    .PaddingItemPerPage{
      padding: 24px !important;
    }
  }
</style>
    
