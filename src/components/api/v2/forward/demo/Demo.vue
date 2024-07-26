<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Title-->
    <header-component :headerTitle="headerText" />

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
            <v-btn small outlined color="primary" class="cancel-color mb-3" @click="confirmationPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" :disabled="number > 0" @click="confirmedDispo">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Transfer location popup -->
    <v-row justify="center">
      <v-dialog v-model="transferPopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Location</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="transferPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text class="text-center">
            <v-combobox v-model="transfer_location" :items="locations" item-text="code" return-object label="Location"
              outlined class="ma-2 "></v-combobox>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="cancel-color mb-3" @click="transferPopup = false">CANCEL</v-btn>
            <v-btn small color="primary" class="mb-3" :disabled="number > 0" @click="callTransferApi">SUBMIT</v-btn>
            <v-spacer></v-spacer>
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

    <!-- filter popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="960px">
        <v-card style="max-width: 100% !important;">
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="tag_id_search" label="Tag Id" class="ma-2"
              outlined></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id_search" label="Article Id" class="ma-2"
              outlined></v-text-field>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="btn-cancel" @click="filterPopup = false">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- search, filter, Action buttons -->
    <v-card-title style="padding: 12px 24px 4px 24px;">
      <!-- Search fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search Tag ID"
            style="max-width: 300px;" outlined v-on:keyup.enter="loadData()"></v-text-field>
        </v-col>
      </v-row>
      <!-- Actions buttons -->
      <v-card-actions style="margin: 0px 16px 28px 0px;">
        <v-btn class="mr-2" color="primary" :disabled="selected.length == 0" @click="isTransferConfirm">Transfer</v-btn>
        <v-menu offset-y>
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
      </v-card-actions>

      <!-- Filter -->
      <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
        style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
        <v-expansion-panel outlined @click="filterButton">
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
  import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";

  export default {
    components: {
      HeaderComponent
    },
    data() {
      return {
        headerText: "Demo",
        alert_type: 'success',
        alert: false,
        alert_message: '',
        search_tag: '',
        change_disposition_list: [],
        selected: [],
        headers: [
          { text: "Tag ID", align: "start", sortable: false, value: "tag_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Location", value: "location" },

        ],
        loading: false,
        table_data: [],
        search: '',
        page: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        totalPages: 1,
        filterPopup: false,
        tag_id_search: '',
        article_id_search: '',
        confirmationPopup: false,
        disposition_action: '',
        transferPopup: false,
        transfer_location: '',
        messagePopup: false,
        message: '',
        locations: '',
        number: 0,
      }
    },
    async created() {
      this.loadData();
    },
    methods: {
      updateHash() {
        window.location.hash = 'search';
      },
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
      loadData() {
        this.messagePopup = false;
        this.loading = true;
        this.page = 1;
        this.pageSize = 100;
        this.table_data = [];
        this.loadtabledata();
        this.getdisposition();
      },
      loadtabledata() {
        const params = {
          tag_number: this.search_tag,
          page: this.page,
          per_page: this.pageSize,
        };
        this.$http.secured
          .get("/api/v1/forward/demos", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.demos
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
      handlePageChange(value) {
        this.page = value;
        this.loadData();
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        this.loadData();
      },
      filterButton() {
        this.filterPopup = true;
        this.article_id_search = '';
        this.tag_id_search = '';
        this.search_tag = '';
      },
      applyFilterFunc() {
        this.filterPopup = false;
        const params = {
          tag_number: this.tag_id_search,
          sku_code: this.article_id_search,
          page: this.page,
          per_page: this.pageSize,
        };
        this.$http.secured
          .get("/api/v1/forward/demos", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.demos
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
      isTransferConfirm() {
        const centerId = this.selected.map(item => item.location)
        const centerList = Array.from(new Set(centerId));
        if (centerList.length > 1) {
          this.message = "Items with different loctions can't transfered at once";
          this.messagePopup = true;
          this.selected = []
          return;
        }
        this.transferPopup = true;
        this.transfer_location = '';
        this.getlocation();
      },
      getlocation() {
        this.$http.secured
          .get("/api/v1/forward/demos/get_locations")
          .then(response => {
            if (response.data) {
              this.locations = response.data.locations
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
      getdisposition() {
        this.$http.secured
          .get("/api/v1/forward/demos/get_dispositions")
          .then(response => {
            if (response.data) {
              this.change_disposition_list = response.data.dispositions
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
        // const centerId = this.selected.map(item => item.id)
        // const centerList = Array.from(new Set(centerId));
        // if(centerList.length > 1){
        //     this.message = "Items with different loctions can't transfered at once";
        //     this.messagePopup = true;
        //     this.selected = []
        //     return;
        // }
        // this.disposition_action = item.original_code;
        // this.confirmationPopup = true;
        // this.dispositionId = [item];
        if (this.selected.length === 0) {
          this.message = "Please select some items.";
          this.messagePopup = true;
        } else {
          const firstLocation = this.selected[0].location;
          const allLocationsMatch = this.selected.every(item => item.location === firstLocation);

          if (allLocationsMatch) {
            this.disposition_action = item.original_code;
            this.confirmationPopup = true;
            this.dispositionId = [item];
          } else {
            this.showAlert("warning", "Please selecte items with same location")
          }
        }
      },
      callTransferApi() {
        const locationid = this.transfer_location.id
        const itemId = this.selected.map(table_data => table_data.id)
        const params = {
          ids: itemId,
          location_id: locationid
        }
        this.$http.secured
          .post("/api/v1/forward/demos/transfer", params)
          .then((response) => {
            if (response.data) {
              this.messagePopup = true
              this.message = response.data.message;
              this.transferPopup = false;
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch((error) => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      afterClickOkLoadData() {
        this.messagePopup = false;
        this.loadData(this.active_tab);
        this.selected = '';
      },
      confirmedDispo() {
        const dispositionid = this.dispositionId[0].id
        const itemId = this.selected.map(table_data => table_data.id)
        const params = {
          ids: itemId,
          disposition_id: dispositionid
        }
        this.$http.secured
          .post("/api/v1/forward/demos/set_disposition", params)
          .then((response) => {
            if (response.data) {
              this.messagePopup = true
              this.message = response.data.message;
              this.confirmationPopup = false;
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch((error) => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
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
    top: 10rem;
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