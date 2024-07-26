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
      <v-dialog v-model="UpdatePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Markdown Location</span>
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
                  <v-col cols="12" sm="5" md="6">
                    <v-text-field outlined :disabled="true" label="ASP (₹)" v-model="aspSum"> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5" md="6">
                    <v-autocomplete v-if="active_tab === 'Pending Price & Location'"
                      v-on:keyup.enter="loadData(active_tab)" v-model="location_id" outlined :items="locationList"
                      item-text="code" item-value="code" label="Location ID">
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="6">
                    <v-text-field v-on:keyup="makeMarkdownDiscountDisable()" outlined :disabled="markdown_pr_dis"
                      label="Markdown Discount Value (₹)" v-model="markdown_dis_value" :rules="inputRules">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5" md="6">
                    <v-text-field v-on:keyup="makeMarkdownPriceDisable()" outlined :rules="inputRules"
                      :disabled="markdown_discount_dis" label="Markdown Discount (%)" v-model="markdown_discount">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" :disabled="number > 0" @click="updatePendingConfirmationSubmit">Submit</v-btn>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="updatePendingConfirmationCancel">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="1224px">
        <v-card style="max-width: 100%;">
          <v-card-actions> <v-text-field v-if="active_tab === 'Pending Price & Location'" v-model="tag_id_search" label="Tag Id" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-menu v-model="aspValue" :close-on-content-click="false" transition="scale-transition" offset-y>
              <template v-slot:activator="{ on }">
                <v-combobox v-model="random" v-on="on" outlined label="ASP (₹)" :items="asplist" class="mr-2">
                  <template v-slot:prepend-item>
                    <v-list>
                      <v-sheet>
                        <v-card-title><span>ASP (₹)</span></v-card-title>
                        <div class="d-flex mb-2">
                          <div class="w-25">
                            <div class="d-flex align-items-center h-100 justify-center">Min</div>
                          </div>
                          <div class="w-75 px-2">
                            <v-text-field outlined hide-details type="number" label="Enter Price" v-model="minValue" class="ma-0"></v-text-field>
                          </div>
                        </div>
                        <div class="d-flex mb-2">
                          <div class="w-25">
                            <div class="d-flex align-items-center h-100 justify-center">Max</div>
                          </div>
                          <div class="w-75 px-2">
                            <v-text-field outlined hide-details type="number" label="Enter Price" v-model="maxValue" class="ma-0"></v-text-field>
                          </div>
                        </div>
                        <v-divider thickness="2"></v-divider>
                        <v-card-actions class="text-center">
                          <v-spacer></v-spacer>
                          <v-btn small outlined @click="cancelAspValues">Cancel</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn small color="primary" @click="aspValue = !aspValue">Submit</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-sheet>
                    </v-list>
                  </template>
                </v-combobox>
              </template>
            </v-menu>
            <v-autocomplete v-if="active_tab === 'Pending Price & Location'" style="max-width: 290px !important;"
              v-on:keyup.enter="loadData(active_tab)" v-model="category_filter" outlined :items="categoryList"
              item-text="name" item-value="id" label="Category" class="mr-2" multiple ref="categorySearchClear">
            </v-autocomplete>
            <v-autocomplete v-if="active_tab === 'Pending Price & Location'" style="max-width: 290px !important;"
              v-on:keyup.enter="loadData(active_tab)" v-model="grade_filter" outlined :items="gradeList"
              item-text="gradeList" item-value="gradeList" label="Grade" class="mr-2" multiple ref="gradeSearchClear">
            </v-autocomplete>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Pending Price & Location -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPendingPricePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPendingPricePopup = !dataDetailPendingPricePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article id</span>
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
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">ASP (₹)</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.price ? item_details.price : 0 }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Category</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.category ? item_details.category : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.grade ? item_details.grade : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Markdown Location</span>
                  </v-col>
                  <v-col cols="6">
                    <a @click="updateSecondDialog" style="color: #1976d2;">update
                    </a>
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
                    <span style="font-weight: 500;">Article id</span>
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
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">ASP (₹)</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.price ? item_details.price : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Category</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.category ? item_details.category : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.grade ? item_details.grade : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Markdown Location</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.markdown_location ? item_details.markdown_location : 'N/A' }}
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
        <v-tab ripple :href="'#'" @click="loadData(tab, 'tab_clicked')"
          style="text-transform:none!important;text-decoration: none;" v-for="(tab, index) in tabs"
          :key="index">{{ tab }}</v-tab>
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
        <v-btn class="ma-2" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pending Price & Location'" color="primary" @click="updatedialog">UPDATE</v-btn>
      </v-actions>

      <!-- Filter -->
      <v-expansion-panels v-if="active_tab == 'Pending Price & Location'" class="custom-control_outlined"
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
          <template #[`item.tag_id`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_id }}</u>
            </a>
          </template>
          <template #[`item.challan`]="{ item }">
            <span>{{ item.challan ? item.challan : "-" }}</span>
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
        headerText: "Markdown",
        tabs: [
          "Pending Price & Location",
          "Dispatch"
        ],
        search_tag: '',
        table_data: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        active_tab: "Pending Price & Location",
        selected: [],
        search: '',
        filterPopup: false,
        tag_id_search: '',
        grade_filter: [],
        category_filter: [],
        UpdatePopup: false,
        categoryList: [],
        update_id: [],
        price: '',
        location_id: '',
        markdown_dis_value: '',
        markdown_discount: '',
        okapproveconfirmpopup: false,
        message: '',
        tag_number: '',
        dataDetailPendingPricePopup: false,
        dataDetailDispatchPopup: false,
        item_details: '',
        gradeList: [],
        alert_type: '',
        alert_message: '',
        selectedItem: [],
        locationList: [],
        minValue: null,
        maxValue: null,
        aspPopup: false,
        markdown_pr_dis: false,
        markdown_discount_dis: false,
        selectedDirectly: false,
        aspSum: 0,
        alert: false,
        aspValue: false,
        asplist: '',
        inputRules: [
          (v) => v == '' || v >= 0 || /^\d+(\.\d+)?$/.test(v) || "Please enter only positive numbers"
        ],
        number: 0,
        random: '',
      }
    },

    async created() {
      this.loadData('Pending Price & Location');
      this.scrollToTop();
    },
    watch: {
      selected(newVal) {
        if (this.active_tab === 'Pending Price & Location') {
          const putawayInward = newVal.filter(insurances => insurances.is_putaway_inwarded === false)
          if (putawayInward.length > 0) {
            this.showAlert("warning", "Please complete Putaway Process");
            this.selected = []
          }
        }
      },
      category_filter(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.categorySearchClear.internalSearch = '';
          });
        }
      },
      grade_filter(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.gradeSearchClear.internalSearch = '';
          });
        }
      },
    },

    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      // show Alert messages
      showAlert(alert_type, alert_message) {
        this.scrollToTop();
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
        if (tab == "Pending Price & Location") {
          (this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_id" },
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "ASP (₹)", value: "price" },
            { text: "Category", value: "category" },
            { text: "Grade", value: "grade" },
          ]);

          this.fetchPendingPriceAndLocation();
          this.fetchFilterCategory();
          this.fetchFilterGrade();
          this.fetchLocationId();
        }
        if (tab == "Dispatch") {
          (this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_id" },
            { text: "ASP (₹)", value: "asp" },
            { text: "Markdown Price (₹)", value: "markdown_price" },
            { text: "Markdown Location", value: "markdown_location" },
            { text: "Transfer Order No", value: "transfer_order_no" },
            { text: "Challan", value: "challan" },
            { text: "Status", value: "warehouse_order_status" },
          ]);

          this.fetchDispatch();
        }
      },


      // fetch the data from the API to load data to the table
      fetchPendingPriceAndLocation() {
        const params = {
          search_text: this.search_tag,
          page: this.page,
          per_page: this.pageSize
        };
        this.$http.secured
          .post("api/v2/warehouse/markdown/pending_price_and_location", params)
          .then(response => {
            if (response.data) {
              this.table_data = response.data.markdowns
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

      // fetch the dispatch data from the API to load data to the table
      fetchDispatch() {
        const params = {
          search_text: this.search_tag,
          page: this.page,
          per_page: this.pageSize
        };
        this.$http.secured
          .post("/api/v2/warehouse/markdown/dispatch", params)
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

      // fetch the category list in the filter drop-down
      fetchFilterCategory() {
        this.$http.secured
          .get("/api/v2/warehouse/markdown/pending_price_and_location/filter_categories")
          .then(response => {
            if (response.data) {
              this.categoryList = response.data.categories
              this.categoryList.sort();
              // this.loading = false;
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

      // fetch the Location id in the update markdown 
      fetchLocationId() {
        this.$http.secured
          .get("/api/v2/warehouse/markdown/pending_price_and_location/get_distribution_center")
          .then(response => {
            if (response.data) {
              this.locationList = response.data.distribution_centers
              // this.loading = false;
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

      // fetch the Grade list in the filter drop-down
      fetchFilterGrade() {
        this.$http.secured
          .get("/api/v2/warehouse/markdown/pending_price_and_location/filter_grade")
          .then(response => {
            if (response.data) {
              this.gradeList = response.data.grade
              this.gradeList.sort();
              // this.loading = false;
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
        let filter;
        this.search_tag = '';
        if (this.minValue == null && this.maxValue == null) {
          filter = {
            "tag_id": this.tag_id_search,
            "grade": this.grade_filter,
            "category": this.category_filter,
          }
        } else if (this.minValue !== null && this.maxValue !== null) {
          if (this.maxValue < this.minValue) {
            this.showAlert("error", "Min value is greater than Max value");
          }
          const range = {
            "min": this.minValue,
            "max": this.maxValue
          }
          filter = {
            "tag_id": this.tag_id_search,
            "grade": this.grade_filter,
            "category": this.category_filter,
            "asp": range
          }
        } else if (this.minValue == null || this.maxValue == null) {
          this.showAlert("error", "You have to enter both max and min value");
        }

        const range = {
          "min": this.minValue,
          "max": this.maxValue
        }
        this.$http.secured
          .post('/api/v2/warehouse/markdown/pending_price_and_location', { "filter": filter, 'page': this.page, 'per_page': this.pageSize })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.markdowns
              this.filterPopup = false;
              this.tag_id_search = '';
              this.maxValue = null,
                this.minValue = null,
                this.grade_filter = [];
              this.category_filter = [];
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
        this.tag_id_search = '';
        this.grade_filter = [];
        this.category_filter = [];
        this.maxValue = null;
        this.minValue = null;
      },

      // filter Dialog PopUP 
      filterListOfButtons(ev) {
        this.filterPopup = true;
      },

      // Update Dialog for Pending Price & Location Tab
      updatedialog() {
        if (this.selectedDirectly) {
          this.aspSum = (this.item_details.price == null) ? 0 : this.item_details.price;
        }
        else {
          let sum = 0;
          const prList = this.selected.map(markdowns => markdowns.price);
          for (let i = 0; i < prList.length; i++) {
            sum += Number(prList[i]);
          }
          this.aspSum = sum;
        }
        this.UpdatePopup = true;
        this.number = 0;
      },

      updateSecondDialog() {
        this.number = 0;
        this.UpdatePopup = true;
        this.selectedDirectly = true;
        this.dataDetailPendingPricePopup = false;
        this.updatedialog();
      },

      // submit on update dialog in Pending-Confirmation
      updatePendingConfirmationSubmit() {
        this.number++;
        let markdown;
        if (this.selectedDirectly) {
          this.update_id = this.item_details.id;
          markdown = {
            "ids": this.update_id,
            "markdown_location": this.location_id,
            "markdown_price": this.aspSum - this.markdown_dis_value,
            "markdown_discount": this.markdown_discount,
          }
        } else {
          this.update_id = this.selected.map(markdowns => markdowns.id)
          markdown = {
            "ids": this.update_id,
            "markdown_location": this.location_id,
            "markdown_price": this.aspSum - this.markdown_dis_value,
            "markdown_discount": this.markdown_discount,
          }
        }
        this.$http.secured.post("/api/v2/warehouse/markdown/pending_price_and_location/update_markdowns", {
          "markdown": markdown
        })
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.UpdatePopup = false;
              this.selectedDirectly = false;
              this.okapproveconfirmpopup = true;
              this.price = '';
              this.location_id = '';
              this.markdown_dis_value = '';
              this.markdown_discount = '';
              this.markdown_pr_dis = false;
              this.markdown_discount_dis = false
              this.showAlert("success", "Successfully updated");
            } else {
              this.number = 0;
              this.$toast.error('error", "No Data Found')
            }
          })
          .catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error);
            // this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },

      // clear all fields when clicked cancel in pending-confirmation
      updatePendingConfirmationCancel() {
        this.price = '';
        this.location_id = '';
        this.markdown_dis_value = '';
        this.markdown_discount = ''
        this.UpdatePopup = false;
        this.selectedDirectly = false;
        this.markdown_pr_dis = false,
          this.markdown_discount_dis = false
      },

      afterClickOkLoadData() {
        this.okapproveconfirmpopup = false;
        this.loadData(this.active_tab);
      },

      itemDetailpopup(item) {
        if (this.active_tab == 'Pending Price & Location') {
          this.dataDetailPendingPricePopup = true;
          this.tag_number = item.tag_id;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.tag_id;
          this.item_details = item;
        }
        else if (this.active_tab == 'Dispatch') {
          this.tag_number = item.tag_id;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.item_details;
          this.item_details = item;
          this.dataDetailDispatchPopup = true;
        }
      },
      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Pending Price & Location') {
          this.fetchPendingPriceAndLocation();
        } else {
          this.fetchDispatch();
        }
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'Pending Price & Location') {
          this.fetchPendingPriceAndLocation();
        } else {
          this.fetchDispatch();
        }
      },

      reversepopup() {
        aspPopup = !aspPopup;
      },

      makeMarkdownDiscountDisable() {
        if (this.markdown_dis_value > this.aspSum) {
          this.updatePendingConfirmationCancel();
          this.showAlert("error", "Markdown Discount Value should be smaller than ASP");
        }
        else if (this.markdown_dis_value > 0) {
          this.markdown_discount_dis = true;
          const percent = (this.markdown_dis_value * 100 / this.aspSum);
          this.markdown_discount = percent.toFixed(2);
        } else if (this.markdown_dis_value == 0) {
          this.markdown_discount = '';
          this.markdown_discount_dis = false;
        }

      },
      makeMarkdownPriceDisable() {
        if (this.markdown_discount > 100) {
          this.updatePendingConfirmationCancel();
          this.showAlert("error", "Markdown Discount % should be smaller than 100");
        }
        else if (this.markdown_discount > 0) {
          this.markdown_pr_dis = true;
          this.markdown_dis_value = (this.markdown_discount * this.aspSum) / 100;
        } else if (this.markdown_discount == 0) {
          this.markdown_dis_value = '';
          this.markdown_pr_dis = false;
        }
      },
      cancelAspValues() {
        this.maxValue = '';
        this.minValue = '';
        this.aspValue = false;
      },



    },
  }
</script>
<style scoped>
  .v-dialog__content:has(.filter-data) {
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

  .min_maax_container {
    display: flex;
    align-items: center;
  }

  .mn_mx_box {
    max-width: 400px;
    width: 100%;
  }

  .v-autocomplete__content.v-menu__content .v-select-list {
    max-width: 285px !important;
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
    
