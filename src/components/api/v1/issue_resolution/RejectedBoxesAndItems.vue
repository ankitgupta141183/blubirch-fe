<template>
  <v-card class="v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Header -->
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <!-- Filter & search -->
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
              <v-btn :disabled="this.selected.length === 0" @click="getDispatchDetails" color="primary" class="ma-2">
                UPDATE DISPATCH DETAILS
                <v-icon start icon="mdi-chevron-down"></v-icon>
              </v-btn>
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
    <!-- table  -->
    <div>
      <v-layout column>
        <v-flex md6 style="overflow: auto">
          <v-data-table :dense="true" v-model="selected" :headers="headers" :items="table_data" show-select disable-pagination :hide-default-footer="true" class="elevation-1" fixed-header height = "100%"  :loading="loading" loading-text="Loading Data... Please wait">
          </v-data-table>
        </v-flex>
      </v-layout>
      <div class="float-right">
        <v-row class="ml-2">
          <v-col cols="4" sm="4">
            <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
          </v-col>
          <v-col cols="12" sm="8">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange">
            </v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-putaway" v-model="filterPopup" persistent max-width="624px">
        <v-card>
          <v-card-actions>
            <v-combobox  clearable v-model="filterCustomer" :items="customer_details" label="Consignor/Customer" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>
            <v-combobox  clearable v-model="filterStatus" :items="status" label="Status" multiple outlined class="ma-2" style="max-width: 300px;"></v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="filterPopup = false">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilters()" :disabled="this.filterCustomer.length == 0 && this.filterStatus.length == 0">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Dialogs  -->
    <div>
      <template>
        <v-row justify="center">
          <v-dialog v-model="UpdateDispatchPopup" persistent max-width="480px">
            <v-card class="v-card-100">
              <!-- Dialog Header -->
              <v-card-title class="headline">
                <span class="headline">Update Dispatch Details</span>
              </v-card-title>

              <!-- Dialog Body -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                            <v-text-field  v-model="Reference_Document_Number" :disabled="select_status_type === 'Pending Receipt'" outlined label="Reference Document Number" ></v-text-field>
                          </v-flex>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field outlined v-model="Dispatch_Document_Number" :disabled=" this.select_status_type === 'Pending Receipt'" label="Dispatch Document Number"></v-text-field>
                      </v-flex>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field outlined type="date" :disabled=" this.select_status_type === 'Pending Receipt'" v-model="Dispatch_Date" label="Dispatch Date"></v-text-field>
                      </v-flex>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-autocomplete outlined type="search" :disabled="this.select_status_type === 'Pending Receipt'" v-model="Logistics_Partner" :items="Logistics_Partner_option" item-value="name" item-text="name" prepend-inner-icon="mdi-magnify" label="Logistics Partner"></v-autocomplete>
                      </v-flex>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field outlined type="date" :disabled="this.select_status_type === 'Pending Dispatch'" v-model="Receipt_Date" label="Receipt Date"></v-text-field>
                      </v-flex>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field outlined type="text" :disabled="this.select_status_type === 'Pending Dispatch'" v-model="POD" label="POD"></v-text-field>
                      </v-flex>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <!-- dialog Footer -->
              <v-card-actions style="justify-content: center;">
                <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
                <v-btn small color="primary" @click="handleDispatchSubmit" >SUBMIT</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </div>
  </v-card>
</template>

<script>
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent.vue";
  import { mixinHelper } from '../../../../mixins/mixin-helper.js'

  export default {
    name: "RejectedBoxesResolution",
    mixins: [mixinHelper],
    data() {
      return {
        headerText: "Rejected Boxes & Items",
        table_data: [],
        selected: [],
        search: "",
        filterPopup: false ,
        filterCustomer: [],
        filterStatus: [],
        customer_details: [],
        status: [],
        headers: [
          { text: "Box ID / Tag ID", value: "box_tag_id" },
          { text: "Consignor/Customer", value: "customer_detail" },
          { text: "Status", value: "current_status" },
        ],
        UpdateDispatchPopup: false,
        select_status_type : "Pending Receipt",
        Logistics_Partner_option : [],
        Reference_Document_Number : "",
        Dispatch_Document_Number : "",
        Dispatch_Date : "",
        Logistics_Partner : "",
        Receipt_Date : "",
        POD: "",
        page: 1,
        pageSize : 100,
        pageSizes : [100,200,500],
        loading : false,
      };
    },

    components: {
      HeaderComponent
    },

    created() {
      this.loadData()
      this.getLogisticsPartners();
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
        .get("/api/v1/items/rejected_boxes", { params: { search: searchArray, page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.loading = false
            this.table_data = response.data.items
            this.totalPages = response.data.meta.total_pages
            this.customer_details = response.data.items.map(x => x.customer_detail)
            this.status = response.data.items.map(x => x.current_status)
            this.filterCustomer = ''
            this.filterStatus = ''
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

      getLogisticsPartners () {
        const params = new URLSearchParams();
        params.append('page', 1)
        params.append('per_page', 1000)
        this.$http.secured.get('/api/v1/logistics_partners' , {params})
        .then(response => {
          if(response.status === 200){
            this.Logistics_Partner_option = response.data.logistics_partners
          }
        })
      },

      handlefilterPopup () {
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filterPopup =  true
      },

      applyFilters() {
        this.loading = true;
        this.filterPopup = false;
        const params = {
          'customer_details' : this.filterCustomer,
          'current_status'   : this.filterStatus,
          'page'             : this.page,
          'per_page'         : this.pageSize
        }
        this.$http.secured
        .get('/api/v1/items/rejected_boxes', { params : params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.items
            this.loading = false;
            this.filterCustomer = '';
            this.filterStatus = '';
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

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        this.loadData();
      },

      handlePageChange(value) {
        this.page = value;
        this.loadData();
      },

      getDispatchDetails() {
        const customerList = this.selected.map(item => item.customer_detail)
        const temp_cust = Array.from(new Set(customerList));
        if(temp_cust.length > 1){
          this.showAlert("warning", "Consignor/Customer should be same for selected boxes!");
          this.selected = []
          return;
        }
        const rrdList = this.selected.map(item => item.reverse_dispatch_document_number)
            const temp_rrdList = Array.from(new Set(rrdList));
            if(temp_rrdList.length > 1){
              this.showAlert("warning", "Reference Document Number should be same for selected boxes!");
              this.selected = []
              return;
            }
        const params = new URLSearchParams();
        var dc = this.selected.map(x => x.document_number)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        if (unique_array.length > 1) {
          this.selected = []
          this.showAlert("error", "Please select the items having same dispatch number!");
        } else {
          params.append('ids', this.selected.map(x => x.id));
        this.select_status_type = this.selected[0].current_status
        this.$http.secured
        .get('/api/v1/items/item_details', {params} )
        .then(response => {
          if(response.data && response.status === 200){
            this.UpdateDispatchPopup = true
            this.Reference_Document_Number =  response.data.items[0].reverse_dispatch_document_number
            this.Dispatch_Document_Number = response.data.items[0].document_number || "",
            this.Dispatch_Date = response.data.items[0].dispatch_date || "",
            this.Logistics_Partner = response.data.items[0].logistics_partner_name || "",
            this.Receipt_Date = response.data.items[0].receipt_date || "" ,
            this.POD = response.data.items[0].pod || ""
            if(this.Dispatch_Date != ""){
              this.Dispatch_Date = this.Dispatch_Date.substring(0,10);
            }
          }
        }).catch ((err) => {
          console.log(err , "log errr");
        })
        }        
      },

      closePopup() {
        this.UpdateDispatchPopup = false
      },

      handleDispatchSubmit() {
        let URL = this.select_status_type === "Pending Dispatch" ? 
          "/api/v1/items/update_pending_dispatch"
          : "api/v1/items/update_pending_receipt"
        let BodyData = this.select_status_type === "Pending Dispatch" ? 
        {
          ids: [this.selected[0].id],
          reference_document_number: this.Reference_Document_Number,
          dispatch_document_number: this.Dispatch_Document_Number,
          dispatch_date: this.Dispatch_Date,
          logistic_partner: this.Logistics_Partner
        }
        : 
        {
          ids: [this.selected[0].id],
          receipt_date: this.Receipt_Date,
          pod: this.POD
        }

        this.$http.secured.put(URL , BodyData)
        .then(response => {
          if(response.status === 200) {
            this.UpdateDispatchPopup = false
            this.showAlert("success", response.data.message);
            this.selected = []
            this.loadData();
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style>
  .v-dialog__content:has(.filter-putaway) {
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
