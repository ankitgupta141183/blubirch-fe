<template>
  <div>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
      <!-- alert -->
      <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
      </div>
      <!-- header -->
      <div>
        <HeaderComponent :headerTitle="headerText" />
      </div>
      <!-- popups -->
      <v-row justify="center">
        <v-dialog v-model="dialogDitails.open" persistent :max-width="dialogDitails.maxWidth">
          <v-card class="v-card-100">
            <div v-if="dialogDitails.type != 'Success'">
              <v-toolbar>
                <span>{{ dialogDitails.headerText }}</span><br>
                <v-spacer></v-spacer>
                <v-btn icon @click="handleDialogClose">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
            </div>
            <div v-else>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="handleDialogClose">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </div>
            <v-card-text>
              <template v-if="(dialogDitails.type === 'Success')">
                <div class="d-flex justify-center">
                  <span class="text-center">
                    {{ dialogDitails.messageText }}
                  </span>
                </div>
              </template>
              <template v-if="dialogDitails.type === 'updatePaymentsDialog'">
                <v-row>
                  <v-col class="col-6" v-if="active_tab != 'Out for Rental'">
                    <label>Expected Security Deposit: ₹{{ selected[0].security_deposit }}</label>
                    <v-text-field outlined label="Received (₹)" v-model="updated_security_deposit" oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
                  </v-col>
                  <v-col class="(active_tab != 'Out for Rental') ? 'col-6' : ''">
                    <label>Expected 1st Rental: ₹{{ selected[0].lease_amount }}</label>
                    <v-text-field outlined label="Received (₹)" v-model="updated_lease_amount" oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
                  </v-col>
                </v-row>
              </template>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn small outlined class="btn-cancel mr-2 mb-3" @click="handleDialogClose"
                v-if="dialogDitails.closeBtn">{{ dialogDitails.closeText }}</v-btn>
              <v-btn small color="primary" class="mb-3" @click="handleDialogSubmit"
                :disabled="number > 0 || (dialogDitails.type != 'Success' && ((active_tab == 'Out for Rental' && !updated_lease_amount) || (active_tab !== 'Out for Rental' && !updated_lease_amount && !updated_security_deposit)))"
                v-if="dialogDitails.submitBtn">{{
                  dialogDitails.submitText }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- filter Dialog -->
        <v-dialog content-class="filter-popup" v-model="filterPopupDetails.open" persistent max-width="936px">
          <v-card>
            <v-card-actions>
              <v-text-field append-icon="mdi-magnify" item-text="value" item-value="value" label="Tag ID" outlined
                class="ma-2" style="max-width: 450px;" v-model="filterPopupDetails.tag_id"></v-text-field>
              <v-text-field append-icon="mdi-magnify" v-model="filterPopupDetails.article_id" label="Article ID" outlined
                class="ma-2" style="max-width: 450px;"></v-text-field>
            </v-card-actions>
            <v-card-actions class="margin-10">
              <v-spacer></v-spacer>
              <v-btn small text class="btn-cancel mr-2 mb-3" @click="handleFilterPopup('close')">CANCEL</v-btn>
              <v-btn small color="primary" class="mb-3" @click="handleApplyFilter">APPLY FILTER(S)</v-btn>
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
              <span> Are you sure want to move this item to {{ disposition_action.original_code }} bucket?
              </span>
            </v-card-text>
            <v-card-actions center class="mt-2">
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" class="cancel-color mb-3" @click="confirmationPopup = false">Cancel</v-btn>
              <v-btn color="primary" class="mb-3" @click="changeDisposition" :disabled="number > 0">Confirm</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!--Unreserve confirm popup -->
      <v-row justify="center">
        <v-dialog v-model="unreserveConfirmation" persistent max-width="424px">
          <v-card class="v-card-100 pa-2">
            <v-card-title style="padding: 0px 0px 32px;">
              <v-spacer></v-spacer>
              <v-btn icon @click="unreserveConfirmation = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span> Are you sure want to unreserve this item? </span>
            </v-card-text>
            <v-card-actions center class="mt-2">
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" class="cancel-color mb-3" @click="unreserveConfirmation = false">Cancel</v-btn>
              <v-btn color="primary" class="mb-3" @click="callUnreserveApi" :disabled="number > 0">Confirm</v-btn>
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

      <!-- search filter and action buttons -->
      <v-card-title style="padding: 28px;">
        <v-row>
          <!-- search field -->
          <v-text-field prepend-inner-icon="mdi-magnify" label="Search" style="max-width: 300px;" outlined v-model="searchedItem" v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          <v-spacer></v-spacer>
          <!-- action buttons -->
          <v-card-actions style="margin-bottom: 28px;">
            <v-btn v-if="active_tab === 'Rental'" class="ma-2" color="primary" @click="callRentalReserve">rental reserve</v-btn>
            <v-btn class="ma-2" v-if="((selected.length === 0) || disableDisposition) && (active_tab === 'Rental')" color="primary" disabled>
              CHANGE DISPOSITION
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>

            <v-menu offset-y v-if="(selected.length > 0) && !disableDisposition && (active_tab === 'Rental')" v-model="menuOpen">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" class="ma-2">
                  CHANGE DISPOSITION
                  <v-icon v-if="menuOpen">mdi-menu-up</v-icon>
                  <v-icon v-else>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item class="cursor-pointer row-pointer" v-for="(item, index) in changeDispositionOptions" :key="index">
                  <v-list-item-title @click="changeDispo(item)">
                    {{ item.original_code }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-if="active_tab === 'Pending Payment'" class="ma-2" color="primary" @click="handleDialogOpen('Update Payments')" :disabled="disableUpdatePaymentsBtn">UPDATE PAYMENTS</v-btn>
            <v-btn @click="handleDialogOpen('unreserve')" class="ma-2" :disabled="disableUnreserveBtn" v-if="active_tab === 'Pending Payment'" color="primary"> UNRESERVE </v-btn>
          </v-card-actions>
          <!-- filter -->
          <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
            style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
            <v-expansion-panel outlined @click="handleFilterPopup">
              <v-expansion-panel-header>Filter
                <template v-slot:actions>
                  <v-icon color="primary">
                    mdi-menu-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>

      </v-card-title>
      <!-- data table -->
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
            <template #[`item.article_description`]="{ item }">
              <span class="article_description-ellipsis">{{ item.article_description }}</span>
            </template>
            <template #[`item.lease_start_date`]="{ item }">
              <span>
                {{ item.lease_start_date ? item.lease_start_date.slice(0, 10).split('-').reverse().join('/') : "" }}
                </span>
            </template>
            <template #[`item.lease_end_date`]="{ item }">
              <span>
                {{ item.lease_end_date ? item.lease_end_date.slice(0, 10).split('-').reverse().join('/') : "" }}
              </span>
            </template>
            <template #[`item.emai_details.is_paid`]="{ item }">
              <span class="payment-status" :style="{ 'background-color': item.emai_details.is_paid ? '#19B100' : '#EC0101' }"> </span>
              <v-btn outlined color="blue" class="m-2" :disabled="item.emai_details.is_paid" @click="handleUpdate(item)">
                <span v-if="item.emai_details.is_paid">UPDATED</span>
                <span v-else>UPDATE</span>
              </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <!-- pagination -->
      <div>
        <v-row class="ml-2 mt-4">
          <v-col cols="4" sm="1" class="PaddingItemPerPage">
            <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
              @change="handlePageSizeChange"></v-select>
          </v-col>
          <span class="item-selected"> <span v-if="selected.length == 1">{{ selected.length }} Item Selected</span>
            <span v-if="selected.length > 1">{{ selected.length }} Items Selected</span> </span>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="4" class="PaddingItemPerPage">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
  import HeaderComponent from "@/components/commoncomponents/HeaderComponent";

  export default {
    data() {
      return {
        headerText: "Rental",
        search: "",
        selected: [],
        alert: false,
        alert_type: "success",
        alert_message: "success",
        tabs: [
          "Rental",
          "Pending Payment",
          "Out for Rental",
        ],
        active_tab: "Rental",
        headers: [
          { text: "Tag ID", value: "tag_id", width: '12%', align: "start", sortable: false },
          { text: "Article Id", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Location", value: "distribution_center" }
        ],
        table_data: [],
        loading: [],
        active_tab: "",
        searchedItem: '',
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 300],
        changeDispositionOptions: [],
        menuOpen: false,
        dialogType: "",
        dialogDitails: {
          open: false,
          maxWidth: "375px",
          closeBtn: true,
          submitBtn: true,
          submitText: "SUBMIT",
          closeText: "CANCEL",
          type: "",
          okBtn: false,
          headerText: ""
        },
        filterPopupDetails: {
          open: false,
          tag_id: '',
          article_id: '',
        },
        assignUserList: [],
        rentalReserve: false,
        fieldError: [],
        confirmationPopup: false,
        disposition_action: '',
        unreserveConfirmation: false,
        updated_security_deposit: '',
        updated_lease_amount: '',
        number: 0,
      }
    },

    components: {
      HeaderComponent,
    },

    computed: {
      selectedItemsLength() {
        return this.selected.length
      },
      disableAssign() {
        let location = this.getunique(this.selected, "distribution_center")
        // let assigned_to = this.selected.filter(item => item.assigned_to !== "-")
        let getstatus = this.getunique(this.selected, "assignment_status")
        let statusType = this.selected.filter(item => item.assignment_status === "assigned")
        return location.length > 1 || this.selected.length === 0 || getstatus.length > 1 || statusType.length > 0
      },

      disableDisposition() {
        let statusType = this.selected.filter(item => item.assignment_status === "assigned")
        return statusType.length > 0
      },


      disableUpdatePaymentsBtn() {
        return (this.selectedItemsLength === 0) || (this.selectedItemsLength > 1)
      },

      disableUnreserveBtn() {
        return this.selected.length === 0
      },
    },

    created() {
      this.scrollToTop();
      this.loadData('Rental');
      this.getDispositionList();
    },

    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      apiCaller(apiDetails) {
        return this.$http.secured({
          method: apiDetails.method,
          url: apiDetails.url,
          params: apiDetails.params,
          data: apiDetails.body
        }).then(response => {
          if (response.data) {
            // this.loading = false;
            return response.data
          }
          else {
            this.number = 0;
            this.loading = false;
            this.showAlert("error", "No Data Found");
            return { error: "No Data Found" }
          }
        }).catch(error => {
          this.number = 0;
          // this.showAlert("error", "Something went wrong from Network" + error);
          if (error.response.data.error) {
            this.$toast.error(error.response.data.error);
          } else if (error.response.data.message) {
            this.$toast.error(error.response.data.message);
          }
          this.loading = false;
          return { error: error.response.data.error }
        });
      },

      async loadData(tab, tab_action, tab_type) {
        this.active_tab = tab
        this.selected = []
        this.table_data = [];
        this.page = 1
        this.pageSize = 100
        if (tab_action) {
          this.searchedItem = ''
        }
        this.loading = true;

        if (tab === "Rental") {
          this.headers = [
            { text: "Tag ID", value: "tag_id", width: '12%', align: "start", sortable: false },
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Location", value: "distribution_center" }
          ];
          this.getRentalList()
        } else if (tab === "Pending Payment") {
          this.headers = [
            { text: "Reserve ID", value: "rental_reserve_id", width: '9%', align: "start" },
            { text: "Tag ID", value: "tag_id", width: '9%' },
            { text: "Article ID", value: "article_id" },
            { text: "Lessee Name", value: "lessee_name" },
            { text: "Lease Payment Frequency", value: "lease_payment_frequency" },
            { text: "Start Date", value: "lease_start_date" },
            { text: "End Date", value: "lease_end_date" },
            { text: "Lease Amount Total (₹)", value: "lease_amount" },
            { text: "Security Deposit Total (₹)", value: "security_deposit" },
            { text: "Location", value: "distribution_center" }
          ];
          this.getPendingPayment()
        } else if (tab === "Out for Rental") {
          this.headers = [
            { text: "Reserve ID", value: "rental_reserve_id", width: '9%', align: "start" },
            { text: "Tag ID", value: "tag_id", width: '9%' },
            { text: "Article ID", value: "article_id" },
            { text: "Lessee Name", value: "lessee_name" },
            { text: "Lease Amount (₹)", value: "lease_amount" },
            { text: "Lease Frequency", value: "lease_payment_frequency" },
            { text: "Lease end date", value: "lease_end_date" },
            { text: "Status", value: "emai_details.status" },
            { text: "Location", value: "distribution_center" },
            { text: "Payment Status", value: "emai_details.is_paid" }
          ];
          this.getOutFOrRental()
        }
      },

      async getDispositionList() {
        let list = await this.apiCaller({
          method: "get",
          url: '/api/v2/warehouse/rental/reserve/get_dispositions'
        })
        if (list.dispositions) {
          this.changeDispositionOptions = list.dispositions
        }
      },

      async getRentalList() {
        const params = new URLSearchParams();
        const parts = this.searchedItem.split(',');
        if (parts.length <= 1) {
          params.append('search_text', this.searchedItem);
        } else {
          for (var i = 0; i < parts.length; i++)
            params.append('search_text[]', parts[i]);
        }
        params.append('page', this.page);
        params.append('per_page', this.pageSize);
        let list = await this.apiCaller({
          method: "post",
          url: "/api/v2/warehouse/rental/reserve",
          params: params,
        })
        if (list) {
          this.loading = false;
          this.table_data = list.rentals;
          this.totalPages = list.meta.total_pages
        }
      },

      async getPendingPayment() {
        const params = new URLSearchParams();
        const parts = this.searchedItem.split(',');
        if (parts.length <= 1) {
          params.append('search_text', this.searchedItem);
        } else {
          for (var i = 0; i < parts.length; i++)
            params.append('search_text[]', parts[i]);
        }
        params.append('page', this.page);
        params.append('per_page', this.pageSize);
        let list = await this.apiCaller({
          method: "get",
          url: "/api/v2/warehouse/rental/pending_payment",
          params: params
        })
        if (list) {
          this.loading = false;
          this.table_data = list.rentals;
          this.totalPages = list.meta.total_pages
        }
      },

      async getOutFOrRental() {
        const params = new URLSearchParams();
        const parts = this.searchedItem.split(',');
        if (parts.length <= 1) {
          params.append('search_text', this.searchedItem);
        } else {
          for (var i = 0; i < parts.length; i++)
            params.append('search_text[]', parts[i]);
        }
        params.append('page', this.page);
        params.append('per_page', this.pageSize);
        let list = await this.apiCaller({
          method: "get",
          url: "/api/v2/warehouse/rental/out_for_rental",
          params: params
        })
        if (list) {
          this.loading = false;
          this.table_data = list.rentals;
          this.totalPages = list.meta.total_pages
        }
      },

      handleUpdate(item) {
        this.selected = [item]
        this.handleDialogOpen("Update Out Rental Payments")
      },

      getunique(arr, key) {
        return arr.filter((a, i) => arr.findIndex((s) => a[key] === s[key]) === i)
      },

      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },

      showAlert(alert_type, alert_message) {
        this.scrollToTop();
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Rental') {
          this.getRentalList();
        } else if (this.active_tab == 'Pending Payment') {
          this.getPendingPayment();
        } else {
          this.getOutFOrRental();
        }
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        if (this.active_tab == 'Rental') {
          this.getRentalList();
        } else if (this.active_tab == 'Pending Payment') {
          this.getPendingPayment();
        } else {
          this.getOutFOrRental();
        }
      },

      handleDialogOpen(type) {
        if (type === "rental reserve") {
          this.rentalReserve = true
        }
        if (type === "Update Payments") {
          this.number = 0;
          this.updated_lease_amount = '';
          this.updated_security_deposit = '';
          this.dialogDitails = {
            open: true,
            maxWidth: "675px",
            closeBtn: false,
            submitBtn: true,
            submitText: "SUBMIT",
            closeText: "CANCEL",
            type: "updatePaymentsDialog",
            okBtn: false,
            headerText: type
          }
        }
        if (type == 'unreserve') {
          this.unreserveConfirmation = true;
          this.number = 0;
        }
        if (type == 'Update Out Rental Payments') {
          this.updated_lease_amount = '';
          this.dialogDitails = {
            open: true,
            maxWidth: "362px",
            closeBtn: false,
            submitBtn: true,
            submitText: "SUBMIT",
            closeText: "CANCEL",
            type: "updatePaymentsDialog",
            okBtn: false,
            headerText: type
          }
        }
      },

      handleDialogClose(type) {
        this.dialogDitails = {
          open: false,
          maxWidth: "375px",
          closeBtn: true,
          submitBtn: true,
          submitText: "SUBMIT",
          closeText: "CANCEL",
          type: "",
          okBtn: false,
          headerText: ""
        }
        this.fieldError = []
        if (type === "changesDone") {
          this.selected = []
        }
      },
      changeDispo(item) {
        this.number = 0;
        this.disposition_action = item;
        this.confirmationPopup = true;
      },
      async changeDisposition() {
        this.number++;
        let changeDisposition = await this.apiCaller({
          method: "post",
          url: "/api/v2/warehouse/rental/reserve/change_disposition",
          body: {
            ids: this.selectedIds(),
            disposition_id: this.disposition_action.id
          }
        })
        if (changeDisposition.error) {
          this.handleDialogClose()
        } else {
          this.loading = false;
          this.confirmationPopup = false;
          this.number = 0;
          this.dialogDitails = {
            ...this.dialogDitails,
            type: "Success",
            open: true,
            headerText: "",
            closeBtn: false,
            maxWidth: "500px",
            submitText: "OK",
            messageText: `${this.selected.length} item moved to ${this.disposition_action.original_code} disposition`
          }
        }

      },

      async handleDialogSubmit() {
        let dialogType = this.dialogDitails.type

        if (dialogType === 'Success') {
          this.handleDialogClose("changesDone")
          this.loadData(this.active_tab)
        } else if (dialogType === 'updatePaymentsDialog') {
          this.number++;
          let url, body
          if (this.active_tab === 'Pending Payment') {
            url = "/api/v2/warehouse/rental/pending_payment/update_status";
            body = {
              "id": this.selected[0].id.toString(),
              "received_security_deposit": this.updated_security_deposit,
              "received_rental": this.updated_lease_amount
            }
          } else {
            if (this.selected[0].lease_amount != this.updated_lease_amount) {
              this.$toast.error("Price should be same as Expected!");
              this.number = 0;
              return;
            }
            url = "/api/v2/warehouse/rental/out_for_rental/update_rental";
            body = {
              "id": this.selected[0].emai_details.id.toString(),
              "received_rental": this.updated_lease_amount
            }
          }
          const updatePayment = await this.apiCaller({
            method: "post",
            url: url,
            body: body,
          })
          if (updatePayment.message) {
            this.loading = false;
            this.number = 0;
            this.dialogDitails = {
              ...this.dialogDitails,
              type: "Success",
              open: true,
              headerText: "",
              closeBtn: false,
              maxWidth: "500px",
              submitText: "OK",
              messageText: updatePayment.message,
            }
          }
        }
      },

      handleFilterPopup(type) {
        if (type === "close") {
          this.filterPopupDetails = {
            open: false
          };
        } else {
          document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
          this.filterPopupDetails = {
            open: true,
            tag_id: '',
            article_id: '',
          };
        }
      },

      selectedIds() {
        return this.selected.map(item => item.id)
      },
      async handleApplyFilter() {
        let method, url;
        if (this.active_tab == 'Rental') {
          method = "post";
          url = "/api/v2/warehouse/rental/reserve";
        } else if (this.active_tab == 'Pending Payment') {
          method = "get";
          url = "/api/v2/warehouse/rental/pending_payment";
        } else {
          method = "get";
          url = "/api/v2/warehouse/rental/out_for_rental";
        }
        let list = await this.apiCaller({
          method: method,
          url: url,
          params: {
            'filter[tag_id]': this.filterPopupDetails.tag_id,
            'filter[article_id]': this.filterPopupDetails.article_id,
            'page': this.page,
            'per_page': this.pageSize,
          }
        })
        if (list) {
          this.loading = false;
          this.table_data = list.rentals;
          this.totalPages = list.meta.total_pages
          this.handleFilterPopup('close');
        }
      },
      callRentalReserve() {
        this.$store.commit("setSelectedLot", {
          lot: JSON.stringify(this.selected),
          action: 'Reserve',
        });
        this.$router.push({ name: 'RentalReserve' });
      },
      async callUnreserveApi() {
        this.number++;
        let unreserveList = await this.apiCaller({
          method: "post",
          url: "/api/v2/warehouse/rental/pending_payment/unreserve",
          body: {
            id: this.selectedIds().join(","),
          }
        })
        if (unreserveList.error || unreserveList.type == 'error') {
          this.handleDialogClose();
        } else {
          this.loading = false;
          this.number = 0;
          this.unreserveConfirmation = false;
          this.dialogDitails = {
            ...this.dialogDitails,
            type: "Success",
            open: true,
            headerText: "",
            closeBtn: false,
            maxWidth: "500px",
            submitText: "OK",
            messageText: unreserveList.message,
          }
        }
      },
    }
  }
</script>
<style>
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

  .v-dialog__content:has(.filter-popup) {
    justify-content: right;
    align-items: baseline;
    top: var(--dialog-ypos);
  }

  .payment-status {
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    padding: 0px 8px;
    border-radius: 50%;
  }

  .article_description-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
