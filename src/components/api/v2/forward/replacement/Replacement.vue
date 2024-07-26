<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>

    <!-- Title-->
    <header-component :headerTitle="headerText" />

    <!--Success Message popup -->
    <v-row justify="center">
      <v-dialog v-model="messagePopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="messagePopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn small color="primary" class="mb-3" @click="afterClickOkLoadData">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Update popup -->
    <v-row justify="center">
      <v-dialog v-model="updatePaymentPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field v-model="sellingPrice" disabled label="Selling Price" class="ma-2"
                    outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field v-model="paymentReceived" :rules="[validatePaymentReceived]" @input="handlePaymentInput"
                    type="number" label="Payment Recieved" class="ma-2" outlined></v-text-field>
                  <span class="amount">Amount to be paid: {{ tobepaidamount }}</span>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn small color="primary" class="mb-3" @click="updatePaymentSubmit"
              :disabled="number > 0 || paymentReceived == '' || !isPaymentReceivedValid">Submit</v-btn>
            <v-btn small outlined color="primary" class="cancel-color mb-3" @click="closePopup">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Change Disposition confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="confirmationPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title style="padding: 0px 0px 32px;">
            <v-spacer></v-spacer>
            <v-btn icon @click="confirmationPopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> Are you sure want to move this item to {{ disposition_action }} bucket? </span>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="cancel-color mb-3"
              @click="confirmationPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" :disabled="number > 0" @click="confirmedDispo">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Unreserve confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="unreservePopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title style="padding: 0px 0px 32px;">
            <v-spacer></v-spacer>
            <v-btn icon @click="unreservePopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> Are you sure want to unreserve this item? </span>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="cancel-color mb-3" @click="unreservePopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="callUnreserveApi">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Item Popup -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: "{{ tag_number }}"</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPopup = !dataDetailPopup">
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
                    <span style="font-weight: 500;">Quantity</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.quantity ? item_details.quantity : 0 }}
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
                    <span style="font-weight: 500;">Category</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.category ? item_details.category : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Location</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.location ? item_details.location : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Stage</span>
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

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="912px">
        <v-card style="max-width: 100% !important;">
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="tag_id_search" label="Tag Id" class="ma-2"
              outlined></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id_search" label="Article Id" class="ma-2"
              outlined></v-text-field>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="btn-cancel" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Header -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" @click="loadData(tab)"
          style="text-transform:none!important; text-decoration: none; padding-top: 4px;" v-for="(tab, index) in tabs"
          :key="index">
          {{ tab }}
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- search, filter, Action buttons -->
    <v-card-title style="padding: 12px 24px 4px 24px;">
      <!-- Search fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search Tag Id"
            style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab, 'tab_clicked')"></v-text-field>
        </v-col>
      </v-row>

      <!-- Actions buttons -->
      <v-card-actions style="margin: 12px 20px 0px 20px;">
        <v-btn class="mr-2" color="primary" @click="reserveDialog" v-if="active_tab == 'In Stock'">RESERVE</v-btn>
        <v-menu offset-y v-if="active_tab == 'In Stock'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-on="on" v-bind="attrs" :disabled="selected.length == 0">
              CHANGE DISPOSITION
              <v-icon dark> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in change_disposition_list" :key="index" @click="changeDisposition(item)">
              <v-list-item-title>{{ item.original_code }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="ma-2" color="primary" :disabled="selected.length === 0 || selected.length > 1"
          @click="updatePaymentDetail" v-if="active_tab == 'Pending Payment'">UPDATE PAYMENT DETAILS</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="selected.length == 0" @click="unreserveDialog"
          v-if="active_tab == 'Pending Payment'">UNRESERVE</v-btn>
      </v-card-actions>

      <!-- Filter -->
      <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
        style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
        <v-expansion-panel outlined @click="filterListOfButtons">
          <v-expansion-panel-header>Filter
            <template v-slot:actions>
              <v-icon color="primary"> mdi-menu-down </v-icon>
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
          <template #[`item.payment_received`]="{ item }">
            <span>{{ item.payment_received ? item.payment_received : "-" }}</span>
          </template>
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
        headerText: "Replacement",
        alert_type: 'success',
        alert: false,
        alert_message: '',
        tabs: ["In Stock", "Pending Payment"],
        search_tag: '',
        active_tab: 'In Stock',
        selected: [],
        change_disposition_list: [],
        filterPopup: false,
        article_id_search: '',
        tag_id_search: '',
        loading: false,
        headers: [],
        table_data: [],
        search: '',
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        updatePaymentPopup: false,
        sellingPrice: '',
        paymentReceived: '',
        confirmationPopup: false,
        disposition_action: '',
        unreservePopup: false,
        message: '',
        messagePopup: '',
        tag_id_search: '',
        article_id_search: '',
        number: 0,
        tobepaidamount: '',
        dataDetailPopup: false,
        item_details: '',
        item_id: '',
        tag_number: ''
      }
    },
    async created() {
      this.scrollToTop();
      this.loadData('In Stock');
    },
    computed: {
      isPaymentReceivedValid() {
        const numericValue = parseFloat(this.paymentReceived);
        if (isNaN(numericValue) || numericValue < 0 || !/^\d+(\.\d{1,2})?$/.test(this.paymentReceived) || numericValue > this.sellingPrice) {
          return false;
        }
        return true;
      },
    },
    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
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
        if (tab_action != 'tab_clicked') {
          this.search_tag = '';
        }
        this.loading = true;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if (tab == 'In Stock') {
          this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Location", value: "location" }
          ],
            this.fetchInStock();
          this.getDisposition();
        } else if (tab == 'Pending Payment') {
          this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Reserve ID", value: "reserve_id" },
            { text: "Selling Price (₹)", value: "selling_price" },
            { text: "Payment Received (₹)", value: "payment_received" },
            { text: "Reserve Date", value: "reserved_date" },
          ],
            this.fetchPendingPayment();
        }
      },
      fetchInStock() {
        const params = {
          tag_number: this.search_tag,
          page: this.page,
          per_page: this.pageSize,
          status: "In Stock",
        };
        this.$http.secured
          .get("/api/v1/forward/replacements", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.forward_replacements
              this.totalPages = response.data.meta.total_pages
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      fetchPendingPayment() {
        const params = {
          tag_number: this.search_tag,
          page: this.page,
          per_page: this.pageSize,
          status: 'Pending Payment'
        };
        this.$http.secured
          .get("/api/v1/forward/replacements", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.forward_replacements
              this.totalPages = response.data.meta.total_pages
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      changeDisposition(item) {
        if (this.selected.length === 0) {
          this.message = "Please select some items.";
          this.messagePopup = true;
        } else {
          const firstLocation = this.selected[0].location;
          const allLocationsMatch = this.selected.every(item => item.location === firstLocation);

          if (allLocationsMatch) {
            this.disposition_action = item.original_code;
            this.confirmationPopup = true;
            this.number = 0
            this.dispositionId = [item];
          } else {
            this.showAlert("warning", "Please selecte items with same location")
          }
        }
      },
      confirmedDispo() {
        this.number++
        const dispositionid = this.dispositionId[0].id
        const itemId = this.selected.map(item => item.id)
        const params = {
          ids: itemId,
          disposition_id: dispositionid
        }
        this.$http.secured
          .post("/api/v1/forward/replacements/set_disposition", params)
          .then((response) => {
            if (response.data) {
              this.messagePopup = true
              this.message = response.data.message;
              this.confirmationPopup = false;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0
            }
          })
          .catch((error) => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
            this.number = 0
          });
      },
      filterListOfButtons() {
        this.filterPopup = true;
        this.article_id_search = '';
        this.tag_id_search = '';
      },
      closeFilterpopup() {
        this.filterPopup = false;
      },
      applyFilterFunc() {
        let params;
        this.loading = true;
        this.filterPopup = false;
        if (this.active_tab == 'In Stock') {
          params = {
            tag_number: this.tag_id_search,
            sku_code: this.article_id_search,
            page: this.page,
            per_page: this.pageSize,
            status: 'In Stock',
          }
        } else {
          params = {
            tag_number: this.tag_id_search,
            sku_code: this.article_id_search,
            page: this.page,
            per_page: this.pageSize,
            status: 'Pending Payment'
          }
        }
        this.$http.secured
          .get("api/v1/forward/replacements", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.forward_replacements
              this.totalPages = response.data.meta.total_pages
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      callUnreserveApi() {
        const id = this.selected.map(x => x.id);
        const requestData = {
          ids: id,
        }
        this.$http.secured
          .put("api/v1/forward/replacements/un_reserve", requestData)
          .then(response => {
            if (response.data) {
              this.unreservePopup = false;
              this.messagePopup = true;
              this.message = response.data.message;
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.$toast.error(error.response.data.error)
            this.unreservePopup = false;
          });
      },
      updatePaymentDetail() {
        this.updatePaymentPopup = true;
        this.paymentReceived = '';
        this.sellingPrice = this.selected.map(x => x.selling_price).join(',');
        const itemId = this.selected.map(item => item.id)
        const params = {
          ids: itemId
        }
        this.$http.secured
          .get("/api/v1/forward/replacements/get_payment_details", { params: params })
          .then(response => {
            if (response.data) {
              this.tobepaidamount = response.data.total_amount_to_be_paid
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      getDisposition() {
        this.$http.secured
          .get("/api/v1/forward/replacements/get_dispositions")
          .then(response => {
            if (response.data) {
              this.change_disposition_list = response.data.dispositions

            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      updatePaymentSubmit() {
        const id = this.selected.map(x => x.id);
        this.$http.secured
          .put(`api/v1/forward/replacements/${id}/update_payment_details`, {
            'payment_received': this.paymentReceived
          })
          .then(response => {
            if (response.data) {
              this.updatePaymentPopup = false;
              this.messagePopup = true;
              this.message = response.data.message;
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.$toast.error(error.response.data.error)
          });
      },
      unreserveDialog() {
        this.unreservePopup = true;
      },
      reserveDialog() {
        this.$store.commit("setSelectedLot", {
          lot: JSON.stringify(this.selected),
          action: 'Reserve'
        });
        this.$router.push({ name: 'ReplacementReserve' });
      },
      handlePaymentInput() {
        this.paymentReceived = this.paymentReceived.replace(/[^0-9]/g, '');
      },
      validatePaymentReceived(value) {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue) || !/^\d+$/.test(value) || value.includes('.') || /\.$/.test(value)) {
          return "Payment must be a positive integer without decimal points.";
        }
        if (numericValue > this.sellingPrice) {
          return "Payment cannot exceed the Selling Price.";
        }
        return true;
      },
      closePopup() {
        this.updatePaymentPopup = false
        this.paymentReceived = ""
      },
      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'In Stock') {
          this.fetchInStock();
        } else {
          this.fetchPendingPayment();
        }
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'In Stock') {
          this.fetchInStock();
        } else {
          this.fetchPendingPayment();
        }
      },
      afterClickOkLoadData() {
        this.messagePopup = false;
        this.loadData(this.active_tab);
      },
      itemDetailpopup(item) {
        this.dataDetailPopup = true
        this.tag_number = item.tag_number;
        let str = String(this.tag_number);
        this.tag_number = str;
        this.item_id = item.tag_id;
        this.item_details = item;

      },
    }
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
    top: 13rem;
  }

  .item-selected {
    margin-top: 29px;
    position: absolute;
    left: 35%;
  }

  .amount {
    color: #ccc;
    position: relative;
    top: -18px;
    left: 19px;
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
