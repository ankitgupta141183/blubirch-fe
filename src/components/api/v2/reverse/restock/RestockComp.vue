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
    <!-- Update popup   -->
    <v-row justify="center">
      <v-dialog v-model="updatePopup" persistent max-width="431px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Restock Location</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeUpdateRestock">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-autocomplete v-model="vendor_list" outlined :items="vendor_list_item" item-text="vendor_name"
                  item-value="vendor_code" label="Location ID" style="max-width: 380px;"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="closePopup">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" @click="submitUpdatePopup"
              :disabled="!vendor_list || number > 0">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="successPopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="successPopup = false">
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
    <!-- Data detail popup -->
    <v-row justify="center">
      <v-dialog v-model="datadetailpopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeItemDataPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article id</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">ASP (₹)</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.asp ? item_details.asp : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Category</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.category ? item_details.category : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.grade ? item_details.grade : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Restock Location</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <a @click="openItemUpdatePopup" style="color: #1976d2;"><u>Update</u></a>
                  </v-col>
                </v-row>
              </div>
            </v-container>

          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Data detail popup in dispatch-->
    <v-row justify="center">
      <v-dialog v-model="dispatchdatadetailpopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeItemDataPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article id</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">ASP (₹)</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.price ? item_details.price : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Category</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.category ? item_details.category : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.grade ? item_details.grade : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Restock Location</span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    {{ item_details.restock_location ? item_details.restock_location : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>

          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Filter Popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-insurance" v-model="filteWithSubPopup" persistent max-width="1224px">
        <v-card>
          <v-card-actions>
            <v-text-field v-model="tag_id" hide-details label="Tag ID" outlined type="text" required
              style="max-width: 300px; margin-bottom: 26px;">
            </v-text-field>
            <v-expansion-panels readonly class="custom-control_outlined" ref="asppopref"
              style="max-width: 300px; margin-bottom: 28px; min-height: 56px; margin-left: 10px;">
              <v-expansion-panel outlined @click="openASPPopup">
                <v-expansion-panel-header>ASP (₹)
                  <template v-slot:actions>
                    <v-icon color="primary">
                      mdi-menu-down
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-combobox v-model="category" :items="category_items" item-text="name" item-value="id" label="Category"
              multiple outlined class="ma-2" style="max-width: 300px;" ref="brandAutocomplete"></v-combobox>
            <v-combobox v-model="grade" :items="Grade_items" item-text="name" item-value="id" label="Grade" multiple
              outlined class="ma-2" style="max-width: 300px;" ref="gradeAutocomplete"></v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="submitApplyFilterFun" :disabled="number > 0">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- ASP popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-asp" v-model="aspFilterpopup" persistent max-width="300px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>ASP (₹)</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="1" sm="4" md="4">
                    <span style="font-weight: 500;">Min</span>
                  </v-col>
                  <v-col cols="2" sm="8" md="8">
                    <v-text-field v-model="min_price" hide-details label="Enter Price" outlined type="number" required>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" sm="4" md="4">
                    <span style="font-weight: 500;">Max</span>
                  </v-col>
                  <v-col cols="4" sm="8" md="8">
                    <v-text-field v-model="max_price" hide-details label="Enter Price" outlined type="number" required>
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primar" class="mb-3" @click="closeAspPopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="submitAspPopup">SUBMIT</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Item update popup -->
    <v-row justify="center">
      <v-dialog v-model="itemUpdatePopup" persistent max-width="431px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Restock Location</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="itemUpdatePopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-autocomplete v-model="vendor_list" outlined :items="vendor_list_item" item-text="vendor_name"
                  item-value="vendor_code" label="Location Id" style="max-width: 380px;"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="closePopup">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" @click="submitItemUpdatePopup"
              :disabled="!vendor_list || number > 0">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')"
          v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title style="padding: 12px 20px 0px 20px;">
      <!-- Search fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="restock_search" label="Search" style="max-width: 300px;"
            outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>
      <!-- Action buttons -->
      <v-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"
          v-if="this.active_tab == 'Pending Restock Location'" @click="openUpdatePopup">UPDATE</v-btn>
      </v-actions>
      <!-- Filter -->
      <v-expansion-panels v-if="this.active_tab == 'Pending Restock Location'" class="custom-control_outlined"
        ref="filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
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
          fixed-header
          height="100%"
          loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template #[`item.tag_number`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
          <template #[`item.restock_location`]="{ item }">
            <span>{{ item.restock_location ? item.restock_location : "N/A" }}</span>
          </template>
          <template #[`item.price`]="{ item }">
            <span>{{ item.price ? item.price : "N/A" }}</span>
          </template>
          <template #[`item.order_number`]="{ item }">
            <span>{{ item.order_number ? item.order_number : "N/A" }}</span>
          </template>
          <template #[`item.chalan`]="{ item }">
            <span>{{ item.chalan ? item.chalan : "N/A" }}</span>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
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
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
  import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
  import { strict } from 'assert';
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        headerText: "Restock",
        loading: true,
        alert: false,
        alert_type: "success",
        alert_message: "success",
        tabs: [
          "Pending Restock Location",
          "Dispatch"
        ],
        active_tab: "Pending Restock Location",
        selected: [],
        restock_search: '',
        filteWithSubPopup: false,
        tag_id: '',
        tag_id_items: '',
        asp: '',
        asp_items: '',
        category: '',
        category_items: '',
        grade: '',
        Grade_items: '',
        headers: [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "ASP (₹)", value: "asp" },
          { text: "Category", value: "category" },
          { text: "Grade", value: "grade" }
        ],
        table_data: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 300],
        updatePopup: false,
        vendor_list_item: '',
        vendor_list: '',
        restock_ids: [],
        successmessage: '',
        successPopup: false,
        tag_number: '',
        item_id: '',
        item_details: [],
        datadetailpopup: false,
        itemUpdatePopup: false,
        number: 0,
        dispatchdatadetailpopup: false,
        aspFilterpopup: false,
        min_price: '',
        max_price: '',
      }
    },
    components: {
      HeaderComponent
    },
    watch: {
      max_price(newVal) {
        if (newVal !== null && newVal < 0) {
          this.max_price = null; // Set to null or any default positive value
        }
      },
      min_price(newVal) {
        if (newVal !== null && newVal < 0) {
          this.min_price = null; // Set to null or any default positive value
        }
      },
      selected(newVal) {
        if (this.active_tab === 'Pending Restock Location') {
          const putawayInward = newVal.filter(restock => restock.is_putaway_inwarded === false)
          if (putawayInward.length > 0) {
            this.showAlert("warning", "Please complete Putaway Process");
            this.selected = []
          }
        }

      },
      category(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.brandAutocomplete.internalSearch = '';
          });
        }
      },
      grade(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.gradeAutocomplete.internalSearch = '';
          });
        }
      },
    },
    async created() {
      this.scrollToTop();
      this.loadData('Pending Restock Location')
    },
    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
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
        this.scrollToTop();
      },
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },
      loadData(tab, tab_action) {
        if (tab_action) {
          this.restock_search = ''
        }
        this.loading = true;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if (tab == "Pending Restock Location") {
          (this.headers = [
            { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "ASP (₹)", value: "asp" },
            { text: "Category", value: "category" },
            { text: "Grade", value: "grade" }
          ]);
          this.fetchPendingRestockLoc();
          this.fetchFilterdData();
        }
        if (tab == "Dispatch") {
          (this.headers = [
            { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
            { text: "Price (₹)", value: "price" },
            { text: "Restock Location", value: "restock_location" },
            { text: "Transfer Order NO.", value: "order_number" },
            { text: "Challan", value: "chalan" },
            { text: "Status", value: "status" }
          ]);
          this.fetchDispatchData();
        }
      },
      fetchPendingRestockLoc() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/restocks", { params: { tag_number: this.restock_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.restocks
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
      fetchDispatchData() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/restocks/restock_dispatch_items", { params: { tag_number: this.restock_search, page: params['page'], per_page: params['size'] } })
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
      filterListOfButtons(ev) {
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filteWithSubPopup = true;
        this.number = 0;
      },
      closeFilterpopup() {
        this.filteWithSubPopup = false;
        this.min_price = '',
          this.max_price = '',
          this.grade = '',
          this.category = '',
          this.tag_id = ''
      },
      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Pending Restock Location') {
          this.fetchPendingRestockLoc();
        } else {
          this.fetchDispatchData();
        }
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'Pending Restock Location') {
          this.fetchPendingRestockLoc();
        } else {
          this.fetchDispatchData();
        }
      },
      closePopup() {
        this.updatePopup = false;
        this.number = 0;
        this.vendor_list = '';
        this.itemUpdatePopup = false;
      },
      openUpdatePopup() {
        this.updatePopup = true;
        this.number = 0;
        this.restock_ids = this.selected.map(restocks => restocks.id);
        this.$http.secured
          .get("/api/v1/warehouse/restocks/get_master_vendor")
          .then(response => {
            if (response.data) {
              this.vendor_list_item = response.data.vendor_masters
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
      submitUpdatePopup() {
        this.number++;
        this.$http.secured.post('/api/v1/warehouse/restocks/create_restock_dispatch_order', {
          "ids": this.restock_ids,
          "status": "Pending Restock Destination",
          "vendor_code": this.vendor_list
        },)
          .then(response => {
            if (response.data) {
              this.updatePopup = false;
              this.successmessage = response.data.message;
              this.vendor_list = '';
              this.successPopup = true;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      openItemUpdatePopup() {
        this.itemUpdatePopup = true;
        this.number = 0;
        this.restock_ids = this.selected.map(restocks => restocks.id);
        this.$http.secured
          .get("/api/v1/warehouse/restocks/get_master_vendor")
          .then(response => {
            if (response.data) {
              this.vendor_list_item = response.data.vendor_masters
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
      submitItemUpdatePopup() {
        this.number++;
        var item_ids = [];
        item_ids = this.item_id;
        this.$http.secured.post('/api/v1/warehouse/restocks/create_restock_dispatch_order', {
          "ids": item_ids,
          "status": "Pending Restock Destination",
          "vendor_code": this.vendor_list
        },)
          .then(response => {
            if (response.data) {
              this.itemUpdatePopup = false;
              this.successmessage = response.data.message;
              this.vendor_list = '';
              this.successPopup = true;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      afterClickOkLoadData() {
        this.successPopup = false;
        this.datadetailpopup = false;
        this.selected = [];
        this.loadData(this.active_tab);
      },
      itemDetailpopup(item) {
        if (this.active_tab == 'Pending Restock Location') {
          this.datadetailpopup = true
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/restocks/${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.restock
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
        } else if (this.active_tab == 'Dispatch') {
          this.dispatchdatadetailpopup = true;
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/restocks/restock_dispatch_item?id=${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.warehouse_order_item
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
      closeItemDataPopup() {
        this.dispatchdatadetailpopup = false;
        this.datadetailpopup = false;
      },
      openASPPopup() {
        const dialogElement = this.$refs.asppopref.$el;
        const topPosition = dialogElement.getBoundingClientRect().top + 32;
        document.documentElement.style.setProperty('--dialog-ypos1', `${topPosition}px`);
        // document.documentElement.style.setProperty('--dialog-ypos1', (this.$refs.asppopref.$el.getBoundingClientRect().top + 35).toString() + 'px');
        this.aspFilterpopup = true;
      },
      submitAspPopup() {
        if (this.min_price != '' && this.max_price != '') {
          this.aspFilterpopup = false;
        } else if (this.min_price == '' && this.max_price == '') {
          this.aspFilterpopup = true;
        }
      },
      fetchFilterdData() {
        this.$http.secured
          .get("/api/v1/warehouse/restocks/get_filters_data")
          .then(response => {
            if (response.data) {
              this.category_items = response.data.categories
              this.Grade_items = response.data.grades
              // this.loading = false;
            } else {
              // this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          }) / api / v1 / wms - chart
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              // this.loading = false;
            });
      },
      closeAspPopup() {
        this.aspFilterpopup = false;
        this.min_price = '';
        this.max_price = '';
      },
      submitApplyFilterFun() {
        const params = this.getRequestParams(this.page, this.pageSize);
        this.restock_search = '';
        this.$http.secured
          .get("/api/v1/warehouse/restocks", {
            params: {
              "tag_number": this.tag_id,
              "price_min": this.min_price,
              "price_max": this.max_price,
              "grade": this.grade ? this.grade.map(item => item.id) : [],
              "category": this.category ? this.category.map(item => item.id) : []
            }
          })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.restocks;
              this.totalPages = response.data.meta.total_pages;
              this.filteWithSubPopup = false;
              this.min_price = '',
                this.max_price = '',
                this.grade = '',
                this.category = '',
                this.tag_id = ''
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
      closeUpdateRestock() {
        this.number = 0;
        this.updatePopup = false;
        this.vendor_list = '';
      }
    }
  }
</script>
<style>
  .v-dialog>.v-card>:has(.v-card__title) {
    overflow-wrap: break-word !important;
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

  .v-dialog__content:has(.filter-insurance) {
    justify-content: right;
    align-items: baseline;
    top: var(--dialog-ypos);
  }

  .v-dialog__content:has(.filter-asp) {
    justify-content: center;
    align-items: baseline;
    top: var(--dialog-ypos1);
    left: calc(var(--dialog-ypos1) - 188px);
  }

  .v-card__text>.row>.col hr {
    border-top: 0.5px solid #2D2D2D;
  }

  @media screen and (min-width: 2000px) {
    .v-dialog__content:has(.filter-asp) {
      left: calc(var(--dialog-ypos1) - 93px);
    }

  }

  @media screen and (max-width: 1440px) {
    .v-dialog__content:has(.filter-asp) {
      left: calc(var(--dialog-ypos1) - 422px) !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .v-dialog__content:has(.filter-asp) {
      left: calc(var(--dialog-ypos1) - 460px) !important;
    }
  }

  @media screen and (max-width: 1350px) {
    .v-dialog__content:has(.filter-asp) {
      left: calc(var(--dialog-ypos1) - 471px);
    }
  }

  @media screen and (max-width: 1610px) {
    .v-dialog__content:has(.filter-asp) {
      left: calc(var(--dialog-ypos1) - 349px);
    }
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