<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Title-->
    <header-component :headerTitle="headerText" />


    <!-- Update  popup  -->
    <v-row justify="center">
      <v-dialog v-model="UpdatePopup" persistent max-width="860px">
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
          <v-form>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-tabs v-model="tab_index">
                    <v-tab ripple :href="'#'" @click="update_current_Tab(tab)" style="text-transform:none!important;text-decoration: none;" v-for="(tab, index) in updateConfirmTab" :key="`${tab + index}`">
                      <span v-if="index == 0">{{ tab }} ({{ selected.length }})</span>
                      <span v-else>{{ tab }}</span>
                    </v-tab>
                  </v-tabs>
                </v-row>
                <div v-if="currentUdateTab == 'Selected Items'">
                  <v-layout column>
                    <v-flex md6 style="overflow: auto">
                      <v-list-item-content class="pl-2 pr-2">
                        <v-data-table 
                          :dense="true"
                          :headers="updateHeaders"
                          :items="selected" 
                          style="max-height: 300px; overflow: scroll;" 
                          disable-pagination 
                          :hide-default-footer="true"
                          class="elevation-1">
                          <template #[`item.tag_number`]="{ item }">
                            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
                              <u> {{ item.tag_number }}</u>
                            </a>
                          </template>
                          <template #[`item.action`]="{ item }">
                            <img @click="deleteEvent(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                          </template>
                        </v-data-table>
                      </v-list-item-content>
                    </v-flex>
                  </v-layout>
                </div>
                <div v-if="currentUdateTab == 'Update'">
                  <v-row class="mt-4">
                    <v-col cols="12" sm="5" md="6">
                      <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                        :return-value.sync="rtv_return_date" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field outlined hide-details :value="formattedReturnDate" label="Return Date" prepend-inner-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="rtv_return_date" no-title
                          scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(rtv_return_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="5" md="6">
                      <v-autocomplete v-model="returnMethod" outlined :items="rtv_return_method_list" item-text="name" item-value="value" label="Return Method"> </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="5" md="6">
                      <v-autocomplete v-model="returnDocType" outlined :items="rtv_return_doc_type" item-text="name" item-value="value" label="Return Document Type"> </v-autocomplete>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>

          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="updatePendingConfirmationCancel">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="!isFormValid || this.number > 0" @click="updatePendingConfirmationSubmit">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-repair" v-model="filterPopup" persistent max-width="1224px">
        <v-card>
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab === 'Pending Confirmation'" v-model="rtv_article_id_search" label="Article Id" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-autocomplete v-if="active_tab === 'Pending Confirmation'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="rtv_brand_search" outlined :items="brandList" item-text="brandList" item-value="brandList" label="Brand" class="mr-2" multiple ref="brandAutocomplete"> </v-autocomplete>
            <v-autocomplete v-if="active_tab === 'Pending Confirmation'" v-on:keyup.enter="loadData(active_tab)"
              prepend-inner-icon="mdi-magnify" v-model="rtv_vendor_search" outlined :items="vendorList" item-text="vendor_name" item-value="id" label="Vendor" multiple ref="vendorAutocomplete"> </v-autocomplete>
            <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab == 'Pending Confirmation'" v-model="rtv_approval_code_search" label="Approval Code" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Pending Confirmation -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPendingConfirmationPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPendingConfirmationPopup = !dataDetailPendingConfirmationPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Id</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.sku_code ? item_details.sku_code : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.item_description ? item_details.item_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Brand</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.brand ? item_details.brand : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Vendor</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.vendor ? item_details.vendor : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Approval Code</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.approval_code ? item_details.approval_code : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Status</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.confirmation_status ? item_details.confirmation_status : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Dispatch -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailDispatchPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailDispatchPopup = !dataDetailDispatchPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Id</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.item_description ? item_details.item_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Brand</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.brand ? item_details.brand : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Vendor</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.vendor ? item_details.vendor : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Return Order No</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.order_number ? item_details.order_number : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Challan/Invoice No.</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.invoice_number ? item_details.invoice_number : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Status</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.status ? item_details.status : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Approve Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okapproveconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
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
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" @click="loadData(tab, 'tab_clicked')" style="text-transform:none!important;text-decoration: none;" v-for="(tab, index) in tabs" :key="index">
          {{ tab }}
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- search, filter, Action buttons -->
    <v-card-title style="padding: 12px 20px 0px 20px;">
      <!-- Search fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>

      <!-- Actions buttons -->
      <v-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" :disabled="this.selected.length == 0" v-if="active_tab == 'Pending Confirmation'" color="primary" @click="updatedialog">UPDATE CONFIRMATION</v-btn>
      </v-actions>

      <!-- Filter -->
      <v-expansion-panels v-if="active_tab == 'Pending Confirmation'" class="custom-control_outlined" ref="filterPopupRef"
        readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
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

    <!-- Data Table -->
    <v-layout column>
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
          <template #[`item.tag_number`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

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
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';

  export default {
    components: {
      HeaderComponent
    },

    data() {
      return {
        headerText: "RTV",
        tabs: [
          "Pending Confirmation",
          "Dispatch"
        ],
        search_tag: '',
        table_data: [],
        original_table_data: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        active_tab: "Pending Confirmation",
        selected: [],
        search: '',
        filterPopup: false,
        rtv_article_id_search: '',
        rtv_brand_search: [],
        rtv_vendor_search: [],
        rtv_approval_code_search: '',
        UpdatePopup: false,
        vendorList: '',
        rtv_id: [],
        rtv_return_date: '',
        returnMethod: '',
        returnDocType: '',
        rtv_return_method_list: [
          { name: "Dispatch", value: "Dispatch" },
          { name: "Handover", value: "Handover" }
        ],
        rtv_return_doc_type: [
          { name: "Invoice", value: "Invoice" },
          { name: "Delivery Challan", value: "Delivery Challan" }
        ],
        okapproveconfirmpopup: false,
        message: '',
        tag_number: '',
        dataDetailPendingConfirmationPopup: false,
        dataDetailDispatchPopup: false,
        item_details: '',
        brandList: [],
        alert_type: '',
        alert_message: '',
        alert: false,
        menu: false,
        number: 0,
        headers: [],
        updateConfirmTab: ["Selected Items", "Update"],
        currentUdateTab: '',
        tab_index: 1,
        updateHeaders: [
          { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Date", value: "date_for_dispatch" },
          { text: 'Delete', value: 'action' }
        ]
      }
    },

    async created() {
      this.currentUser = this.$store.state.currentUser;
      this.loadData('Pending Confirmation');
      this.fetchFilterVendorList();
      this.fetchFilterBrandList();
    },

    computed: {
      isFormValid() {
        return (
          this.rtv_return_date !== '' &&
          this.returnMethod !== '' &&
          this.returnDocType !== ''
        );
      },
      formattedReturnDate() {
        if (this.rtv_return_date) {
          const date = new Date(this.rtv_return_date);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        }
        return '';
      },
    },

    watch: {
      rtv_brand_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.brandAutocomplete.internalSearch = '';
          });
        }
      },
      rtv_vendor_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.vendorAutocomplete.internalSearch = '';
          });
        }
      }
    },
    methods: {
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

      //  show Alert messages
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
        if (tab == "Pending Confirmation") {
          (this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Brand", value: "brand" },
            { text: "Vendor", value: "vendor" },
            { text: "Approval Code", value: "approval_code" },
            { text: "Status", value: "confirmation_status" },
            { text: "Date for Dispatch", value: "date_for_dispatch" },
          ]);

          this.fetchPendingConfirmation();
        }
        if (tab == "Dispatch") {
          (this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
            { text: "Brand", value: "brand" },
            { text: "Vendor", value: "vendor" },
            { text: "Return Order No", value: "order_number" },
            { text: "Challan/Invoice No", value: "invoice_number" },
            { text: "Status", value: "status" },
          ]);

          this.fetchDispatch();
        }
      },


      // fetch the data from the API to load data to the table
      fetchPendingConfirmation() {
        const params = {
          search_text: this.search_tag,
          page: this.page,
          per_page: this.pageSize
        };
        this.$http.secured
          .post("/api/v2/warehouse/vendor_return/pending_confirmation", params)
          .then(response => {
            if (response.data) {
              this.table_data = response.data.vendor_returns
              this.totalPages = response.data.meta.total_pages
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
        const params = {
          search_text: this.search_tag,
          page: this.page,
          per_page: this.pageSize
        };
        this.$http.secured
          .post("/api/v2/warehouse/vendor_return/dispatch", params)
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items
              this.totalPages = response.data.meta.total_pages
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

      //  fetch the vendor list in the filter drop-down
      fetchFilterVendorList() {
        this.$http.secured
          .get("/api/v2/warehouse/vendor_return/pending_confirmation/vendor_list")
          .then(response => {
            if (response.data) {
              this.vendorList = response.data.vendor_list
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

      //  fetch the Brand list in the filter drop-down
      fetchFilterBrandList() {
        this.$http.secured
          .get("/api/v2/warehouse/vendor_return/pending_confirmation/brand_list")
          .then(response => {
            if (response.data) {
              this.brandList = response.data.brand_list
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


      applyFilterFunc() {
        const filter = {
          "inventory_id": this.rtv_article_id_search,
          "tag_id": this.search_tag,
          "brands": this.rtv_brand_search,
          "vendors": this.rtv_vendor_search,
          "approval_code": this.rtv_approval_code_search,

        }
        this.$http.secured
          .post('/api/v2/warehouse/vendor_return/pending_confirmation', { "filter": filter })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.vendor_returns
              this.filterPopup = false;
              this.rtv_article_id_search = '';
              this.rtv_approval_code_search = '';
              this.rtv_brand_search = [];
              this.rtv_vendor_search = [];
              this.search_tag = '';
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

      closeFilterpopup() {
        this.filterPopup = false;
        this.rtv_article_id_search = '';
        this.rtv_brand_search = [];
        this.rtv_vendor_search = [];
        this.rtv_approval_code_search = '';
      },

      // filter Dialog PopUP 
      filterListOfButtons(ev) {
        this.filterPopup = true;
        this.search_tag = '';
      },

      // Update Dialog for Pending Confirmation Tab
      updatedialog() {
        const vendors = this.selected.map(item => item.vendor)
        const vendorList = Array.from(new Set(vendors));
        if (vendorList.length > 1) {
          this.showAlert("warning", "Please select the items with same vendor!");
          this.selected = []
          return;
        }

        const brands = this.selected.map(item => item.brand)
        const brondList = Array.from(new Set(brands));
        if (brondList.length > 1) {
          this.showAlert("warning", "Please select the items with same Brand!");
          this.selected = []
          return;
        }

        const statuss = this.selected.map(item => item.confirmation_status)
        const NumberOfStatus = Array.from(new Set(statuss));
        if (NumberOfStatus.length > 1) {
          this.showAlert("warning", "Please select the items either Confirmed or Not Confirmed!");
          this.selected = []
          return;
        }
        this.UpdatePopup = true;
        this.currentUdateTab = 'Update'
        this.tab_index = 1;
        if (this.selected[0].confirmation_status == 'Confirmed') {
          this.returnMethod = this.selected[0].return_method
          this.returnDocType = this.selected[0].return_document_type;
        }
      },

      // submit on update dialog in Pending-Confirmation
      updatePendingConfirmationSubmit() {
        this.number++;
        this.rtv_id = this.selected.map(vendor_returns => vendor_returns.id)
        const vendor_return = {
          "ids": this.rtv_id,
          "return_date": this.rtv_return_date,
          "return_method": this.returnMethod,
          "return_document_type": this.returnDocType,
        }
        this.$http.secured.post("/api/v2/warehouse/vendor_return/pending_confirmation/update_confirmation", {
          "vendor_return": vendor_return
        })
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.UpdatePopup = false;
              this.okapproveconfirmpopup = true;
              this.rtv_return_date = '';
              this.returnMethod = '';
              this.returnDocType = '';
              this.number = 0;
              this.showAlert("success", "Successfully updated");
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            // this.showAlert("error", "Something went wrong from Network" + error);
            this.$toast.error(error.response.data.error)
            this.loading = false;
            this.number = 0;
          });
      },

      // clear all fields when clicked cancel in pending-confirmation
      updatePendingConfirmationCancel() {
        this.rtv_return_date = '';
        this.returnMethod = '';
        this.returnDocType = '';
        this.UpdatePopup = false;
      },

      afterClickOkLoadData() {
        this.okapproveconfirmpopup = false;
        this.loadData(this.active_tab);
      },

      itemDetailpopup(item) {
        if (this.active_tab == 'Pending Confirmation') {
          this.dataDetailPendingConfirmationPopup = true;
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.item_details = item;
        } else if (this.active_tab == 'Dispatch') {
          this.dataDetailDispatchPopup = true;
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.item_details = item;
        }
      },

      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Pending Confirmation') {
          this.fetchPendingConfirmation();
        } else {
          this.fetchDispatch();
        }
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'Pending Confirmation') {
          this.fetchPendingConfirmation();
        } else {
          this.fetchDispatch();
        }
      },
      update_current_Tab(tab) {
        this.currentUdateTab = tab;
      },
      deleteEvent(item) {
        const index = this.selected.indexOf(item);
        this.selected.splice(index, 1);
      },
    },
  }
</script>
<style scoped>
  .v-dialog__content:has(.filter-repair) {
    justify-content: right;
    align-items: baseline;
    top: 15rem;
  }

  .link-color {
    color: #0357D0;
    font-size: 14px;
    font-weight: 600;
  }

  .bg-color {
    background: #0357D0;
    color: #ffffff;
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