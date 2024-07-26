<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Title-->
    <header-component :headerTitle="headerText" />

    <!-- tabs -->
    <v-tabs>
      <v-tab ripple :href="'#'" @click="loadData(tab)" style="text-transform:none!important; text-decoration: none; padding-top: 4px;" v-for="(tab, index) in tabs" :key="index">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <!-- search, filter, Action buttons -->
    <v-card class="v-card-100">
      <v-card-title style="padding: 12px 24px 4px 24px;">
        <!-- Search fields -->
        <v-row>
          <v-col cols="8" sm="8">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab, 'tab_clicked')"></v-text-field>
          </v-col>
        </v-row>
        <!-- Actions buttons -->
        <v-actions style="margin: 0px 16px 28px 0px;">
          <v-btn class="mr-2" color="primary" @click="reserveDialog" v-if="active_tab == 'In Stock'">RESERVE</v-btn>
          <v-menu offset-y v-if="active_tab == 'In Stock'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-on="on" v-bind="attrs" :disabled="selected.length == 0">
                CHANGE DISPOSITION
                <v-icon dark>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in change_disposition_list" :key="index" @click="changeDisposition(item)">
                <v-list-item-title>{{ item.original_code }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn class="ma-2" color="primary" :disabled="selected.length == 0" @click="updatePaymentDetail" v-if="active_tab == 'Pending Payment'">UPDATE PAYMENT DETAILS</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="selected.length == 0" @click="unreserveDialog" v-if="active_tab == 'Pending Payment'">UNRESERVE</v-btn>
        </v-actions>

        <!-- Filter -->
        <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
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
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template #[`item.payment_received`]="{ item }">
            <span>{{ item.payment_received ? item.payment_received : "-" }}</span>
          </template>
          <template #[`item.reserve_date`]="{ item }">
            <span>{{ item.reserve_date ? item.reserve_date.split('-').reverse().join('-') : "N/A" }}</span>
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
        <span class="item-selected"> <span v-if="selected.length == 1">{{ selected.length }} Item Selected</span> <span v-if="selected.length > 1">{{ selected.length }} Items Selected</span> </span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="PaddingItemPerPage">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="724px">
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
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">Ok</v-btn>
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
              <v-btn icon @click="updatePaymentPopup = !updatePaymentPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field v-model="sellingPrice" disabled label="Selling Price" class="ma-2" outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field v-model="paymentReceived" label="Payment Received" class="ma-2" outlined type="number" min="0" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="updatePaymentSubmit" :disabled="number > 0 || paymentReceived == ''">Submit</v-btn>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="updatePaymentPopup = !updatePaymentPopup">Cancel</v-btn>
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
            <span> Are you sure want to move this item to {{ disposition_action.original_code }} bucket? </span>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="confirmationPopup = false">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" @click="changeDispos" :disabled="number > 0">Confirm</v-btn>
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
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="unreservePopup = false">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" @click="callUnreserveApi">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>
<script>
  import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";

  export default {
    components: {
      HeaderComponent
    },
    data() {
      return {
        headerText: "Saleable",
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
        number: 0
      }
    },
    async created() {
      this.scrollToTop();
      this.fetchDisposition();
      this.loadData('In Stock');
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
            { text: "Article ID", value: "article_sku" },
            { text: "Article Description", value: "article_description" },
            { text: "Location", value: "location" }
          ],
            this.fetchInStock();
        } else if (tab == 'Pending Payment') {
          this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
            { text: "Article ID", value: "article_sku" },
            { text: "Article Description", value: "article_description" },
            { text: "Reserve ID", value: "reserve_number" },
            { text: "Selling Price (₹)", value: "selling_price" },
            { text: "Payment Received (₹)", value: "payment_received" },
            { text: "Reserve Date", value: "reserve_date" },
            { text: "Location", value: "location" }
          ],
            this.fetchPendingPayment();
        }
      },
      fetchDisposition() {
        this.$http.secured
          .get("/api/v2/warehouse/saleables/dispositions")
          .then(response => {
            if (response.data) {
              this.change_disposition_list = response.data.dispositions
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      },
      fetchInStock() {
        const params = {
          query: this.search_tag,
          page: this.page,
          per_page: this.pageSize,
        };
        this.$http.secured
          .get("/api/v2/warehouse/saleables", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.saleables
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
      fetchPendingPayment() {
        const params = {
          query: this.search_tag,
          page: this.page,
          per_page: this.pageSize,
          status: 'Pending Payment'
        };
        this.$http.secured
          .get("/api/v2/warehouse/saleables", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.saleables
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
      changeDisposition(item) {
        this.disposition_action = item;
        this.confirmationPopup = true;
        this.number = 0;
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
            article_id: this.article_id_search,
            page: this.page,
            per_page: this.pageSize,
          }
        } else {
          params = {
            tag_number: this.tag_id_search,
            article_id: this.article_id_search,
            page: this.page,
            per_page: this.pageSize,
            status: 'Pending Payment'
          }
        }
        this.$http.secured
          .get("/api/v2/warehouse/saleables", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.saleables
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
      callUnreserveApi() {
        const id = this.selected.map(x => x.id);
        this.$http.secured
          .put("/api/v2/warehouse/saleables/un_reserve", { 'ids': id.join(","), status: 'Pending Payment' })
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
          });
      },
      updatePaymentDetail() {
        const vendorList = this.selected.map(x => x.vendor_code);
        const unique_vendor_list = Array.from(new Set(vendorList))
        if (unique_vendor_list.length > 1) {
          this.showAlert("warning", "Vendor should be same for all the selected items!");
          this.selected = []
          return;
        }
        this.updatePaymentPopup = true;
        this.number = 0;
        this.paymentReceived = '';
        this.sellingPrice = '';
        const ids = this.selected.map(x => x.id).join(',');
        const status = 'Pending Payment';
        this.$http.secured
          .get("/api/v2/warehouse/saleables/get_payment_details?status=" + status + "&ids=" + ids)
          .then(response => {
            if (response.data) {
              this.sellingPrice = response.data.total_amount_to_be_paid
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.$toast.error(error.response.data.error)
          });
      },
      updatePaymentSubmit() {
        this.number++;
        const id = this.selected.map(x => x.id);
        const amountToBePaid = '' + this.sellingPrice;
        this.$http.secured
          .put("/api/v2/warehouse/saleables/update_payment_details", {
            'ids': id.join(','), 'status': 'Pending Payment',
            'payment_received': this.paymentReceived, 'total_payment_amount': amountToBePaid
          })
          .then(response => {
            if (response.data) {
              this.updatePaymentPopup = false;
              this.messagePopup = true;
              this.message = response.data.message;
            } else {
              this.number = 0;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error)
          });
      },
      unreserveDialog() {
        this.unreservePopup = true;
      },
      reserveDialog() {
        this.$store.commit("setSelectedLot", {
          lot: JSON.stringify(this.selected),
          action: 'Reserve',
        });
        this.$router.push({ name: 'ReservePage' });
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
      changeDispos() {
        this.number++;
        const temp = this.selected.map(x => x.id).join(",")
        this.$http.secured
          .post("/api/v2/warehouse/saleables/set_dispositions", { "ids": temp, "disposition_id": this.disposition_action.id })
          .then(response => {
            if (response.data) {
              this.confirmationPopup = false;
              this.messagePopup = true;
              this.message = response.data.message;
            } else {
              this.number = 0;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error);
          });
      }
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
    margin-top: 23px;
    position: absolute;
    left: 41%;
  }

  @media (max-height: 1104px) {
    .PaddingItemPerPage {
      padding: 8px !important;
    }
  }

  @media (min-height: 1126px) {
    .PaddingItemPerPage {
      padding: 24px !important;
    }
  }
</style>
