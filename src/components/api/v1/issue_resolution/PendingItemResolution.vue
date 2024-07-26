<template>
  <v-card class="v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <div>
      <v-card-title style="padding: 28px;">
        <v-row>
          <v-col cols="4" sm="4">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData()"></v-text-field>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-actions class="d-flex">
          <template>
            <div class="text-center">
              <v-btn id="menu-activator" :disabled="this.selected.length ===0 || checkItemMismatch" color="primary" class="ma-2">
                TAKE ACTION 
                <v-icon start icon="mdi-chevron-down"></v-icon>
              </v-btn>
              <v-menu activator="#menu-activator">
                <v-list>
                  <v-list-item v-for="(item, index) in takeActionItems" :key="index" :value="index">
                    <v-list-item-title @click="takeAction(item)">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
          <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly outlined style="max-width: 300px;" >
            <v-expansion-panel @click="handlefilterPopup">
              <v-expansion-panel-header>Filter
                <template v-slot:actions>
                  <v-icon color="primary">
                    mdi-menu-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-actions>
      </v-card-title>
    </div>
    <div>
      <v-layout column>
        <v-flex md6 style="overflow: auto">
          <v-data-table :dense="true" v-model="selected" :headers="headers" :items="table_data" show-select fixed-header height = "100%"
            disable-pagination :hide-default-footer="true" class="elevation-1" :loading="loading" loading-text="Loading Data... Please wait">
            <template v-slot:[`item.tag_number`]="{ item }">
              <span>{{ item.tag_number ? item.tag_number : "-" }}</span>
            </template>
            <template v-slot:[`item.item_issue`]="{ item }">
              <span>{{ item.item_issue ? item.item_issue : "-" }}</span>
            </template>
            
          </v-data-table>
        </v-flex>
      </v-layout>
      <div class="float-right">
        <v-row class="ml-2">
          <v-col cols="4" sm="3">
            <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
          </v-col>
          <v-col cols="12" sm="9">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange">
            </v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-putaway" v-model="filterPopup" persistent max-width="936px">
        <v-card>
          <v-card-actions>
            <v-combobox  clearable v-model="filterClient" :items="client_ids" label="Client Id" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>
            <v-combobox  clearable v-model="filterLocation" :items="consignor_locations" label="Consignor Location" multiple outlined class="ma-2" style="max-width: 300px;"></v-combobox>
            <v-combobox  clearable v-model="filterIssue" :items="issues" label="Issue" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="filterPopup = false">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilters()" :disabled="this.filterClient.length == 0 && this.filterLocation == '' && this.filterIssue.length == 0">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent.vue";
  import { mixinHelper } from '../../../../mixins/mixin-helper.js'

  export default {
    name: "PendingItemxResolution",
    mixins: [mixinHelper],
    data() {
      return {
        headerText: "Pending Item Resolution",
        table_data: [],
        selected: [],
        search: '',
        filterPopup :  false ,
        filterClient: [],
        filterLocation: [],
        filterIssue: [],
        client_ids: [],
        consignor_locations : [],
        issues: [],
        page : 1,
        pageSize : 100,
        pageSizes : [100,200,500],
        totalPages : 1,
        takeActionItems: ["Accept", "Write Off", "Send To Customer", "Send To Consignor"],
        headers: [
          { text: "Tag ID", value: "tag_number" },
          { text: "Customer ID", value: "client_id" },
          { text: "Consignor Location", value: "location" },
          { text: "Issue", value: "item_issue" },
        ],
        loading : false,
      };
    },

    components: {
      HeaderComponent
    },

    created() {
      this.loadData();
    },

    computed:{
      checkItemMismatch(){
        const isAnyNotPending = this.selected.some(item => item.item_issue == "Tag id Mismatch");
        return isAnyNotPending;
      }
    },

    methods: {
      loadData(tab) {
        this.loading = true;
        this.selected = []
        this.table_data = []

        const params = this.getRequestParams(
          this.page,
          this.pageSize
        )
        const searchArray = [];
        if(this.search != ''){
          const parts = this.search.split(',');
          for(let i=0;i<parts.length;i++){
              searchArray.push(parts[i]);
            }
        }
        this.$http.secured
        .get("/api/v1/items/pending_item_resolutions", { params: { search: searchArray, page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.items
            this.totalPages = response.data.meta.total_pages
            this.client_ids = response.data.items.map(x => x.client_id)
            this.consignor_locations = response.data.items.map(x => x.location)
            this.issues = response.data.items.map(x => x.item_issue)
            this.filterClient = ''
            this.filterLocation = ''
            this.filterIssue = ''
            this.loading = false
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

      handlefilterPopup () {
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filterPopup =  true
      },

      applyFilters() {
        this.loading = true;
        this.filterPopup = false;
        const params = {
          'client_ids' : this.filterClient,
          'locations'  : this.filterLocation,
          'item_issues': this.filterIssue,
          'page'       : this.page,
          'per_page'   : this.pageSize
        }
        this.$http.secured
        .get('/api/v1/items/pending_item_resolutions', { params: params})
        .then(response => {
          if (response.data) {
            this.table_data = response.data.items
            this.filterClient = '';
            this.filterLocation = '';
            this.filterIssue = '';
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

      takeAction(item) {
        var selected_ids = this.selected.map(x => x.id)
        if (item == 'Accept') {
          var apiUrl = "/api/v1/items/accept"
        } else if (item == 'Send To Customer' || item == 'Send To Consignor') {
          var apiUrl = "/api/v1/items/rejected?from_page=Item"
        } else if (item == 'Write Off') {
          var apiUrl = "/api/v1/items/write_off"
        } 
        // else if (item == 'Send To Customer') {
        //   var apiUrl = "/api/v1/items/send_to_customer"
        // } else if (item == 'Send To Consignor') {
        //   var apiUrl = "/api/v1/items/send_to_consignor"
        // }

        this.$http.secured.put(`${apiUrl}`, { ids: selected_ids })
        .then(response => {
          if (response.data) {
            this.showAlert("success", response.data.message);
            this.loadData();
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;
        });
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        this.loadData();
      },

      handlePageChange(value) {
        this.page = value;
        this.loadData();
      }
    }
  }
</script>

<style>
  .v-dialog__content:has(.filter-putaway){
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
    border-color: rgba(0,0,0,.42);
    border-style: solid;
  }

  .custom-control_outlined button:focus {
    outline: none;
  }
</style>
