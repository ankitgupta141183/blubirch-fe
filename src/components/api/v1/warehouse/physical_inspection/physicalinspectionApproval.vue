<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <!-- alert -->
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
        </div>
        <!-- Approve / reject popup -->
        <v-dialog v-model="confirmationModelDelete" persistent max-width="450px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
            <v-card-title>
              <span>Confirmation</span>
              <v-spacer></v-spacer>  
              <v-btn icon @click="confirmationModelDelete = false">
                  <v-icon>mdi-close</v-icon>
              </v-btn>          
            </v-card-title>
          </v-card>
          <v-card-text class="text-center pt-6">
              <span> {{ accessMessage }} </span>
          </v-card-text>  
          <v-card-actions center>
              <v-spacer></v-spacer>
              <v-btn  small color="primary" @click="confirmedFunc()">Confirm</v-btn>
              <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--  Success messeage popup -->
      <v-row justify="center">
        <v-dialog v-model="successPopUp" persistent max-width="424px">
          <v-card class="v-card-100">
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="successPopUp = false">
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
        <!-- Tab header section -->
        <div>
            <HeaderComponent :headerTitle="headerText" />
        </div>
        <!-- search action and filter -->
        <v-card-title >
            <v-row>
                <v-col cols="8" sm="8">
                    <v-text-field prepend-inner-icon="mdi-magnify" v-model="pending_return_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData()"></v-text-field>
                </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-card-actions style="margin-bottom: 28px;">
              <v-btn class="ma-2 green" :disabled = "selected.length == 0" @click="approveItems()">Approve</v-btn>
              <v-btn class="ma-2 red" :disabled = "selected.length == 0" @click="rejectItems()">reject</v-btn>
            </v-card-actions>
            <!-- filter -->
            <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
            <v-expansion-panel outlined @click="handlefilterPopup" >
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
        <!-- table content -->
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
              loading-text="Loading Data... Please wait"
              class="elevation-1">
              <template v-slot:item.claim_amount="{ item }">
                <span v-if="item.details && item.details.claim_amount">
                  {{ item.details.claim_amount }}
                </span>
                <span v-else>
                  N/A
                </span>
              </template>
              <template v-slot:item.name="{ item }">
                <span v-if="item.details && item.details.name">
                  {{ item.details.name }}
                </span>
                <span v-else>
                  N/A
                </span>
              </template>
              <template v-slot:item.inventory_status="{ item }">
                {{ formatinventory(item.inventory_status) }}
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
        <div class="float-right">
            <v-row class="ml-2">
              <v-col cols="4" sm="3">
                <v-select
                  v-model="pageSize"
                  :items="pageSizes"
                  label="Items per Page"
                  @change="handlePageSizeChange"
                ></v-select>
              </v-col>
              <span  class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span>
              <v-col cols="12" sm="9">
                <v-pagination
                  v-model="page"
                  :length="totalPages"
                  total-visible="7"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  @input="handlePageChange"
                ></v-pagination>
              </v-col>
            </v-row>
          </div>
          <!-- filter data popup -->
          <v-row justify="center">
            <v-dialog content-class="filter-putaway" v-model="filterPopup" persistent max-width="375px">
              <v-card>
                <v-card-actions>
                  <!-- <v-text-field prepend-inner-icon="mdi-magnify" v-model="statuss" label="status" outlined class="ma-2" style="max-width: 350px;"></v-text-field> -->
                  <v-combobox v-model="statuss" :items="filter_status" item-text="name" item-value="id" label="Status" style="width: 300px !important;" outlined ></v-combobox>
                </v-card-actions>
                <v-card-actions class="margin-10">
                  <v-spacer></v-spacer>
                  <v-btn small text color="normal" @click="closefilter()">CANCEL</v-btn>
                  <v-btn small color="primary" @click="applyFilters()" :disabled="this.statuss.length == 0">APPLY FILTER(S)</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
    </v-card>
</template>
<script>
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";
export default {
    data() {
        return {
            headerText: "Pending Approval",
            search: "",
            pending_return_search: "",
            loading: false,
            headers: [
                        { text: "Tag Number", value: "tag_number", align: "start", sortable: false },
                        { text: "Request ID", value: "request_id" },
                        { text: "Name", value: "name", },
                        { text: "Debit Amount (₹)", value: "claim_amount" },
                        { text: "Status", value: "inventory_status" }
                    ],
            filterPopup :  false ,
            table_data: [],
            confirmationModelDelete : false,
            statuss : [],
            filter_status:[
            {
                "name":"Excess",
                "id": "excess"
              },
              {
                "name":"Short",
                "id": "short"
              },
            ],
            gradeSelected : '',
            gradelist : '',
            pageSizes : [50,100,200],
            selected : [],
            totalPages : 1,
            pageSize : 100,
            page : 1,
            successPopUp : false,
            accessMessage : '',
            acceptOrReject : '',
            successmessage : '',
            alert_type : 'success',
            alert: false,
            alert_message: '',
        }
    },


    components: {
        HeaderComponent
    },
    created() {
        this.loadData();
    },
    methods: {
      loadData() {
        this.selected = []
        this.table_data = []
        this.getdata();
      },
      getdata(){
        this.loading = true;
        const searchArray = [];
        if(this.pending_return_search != ''){
          const parts = this.pending_return_search.split(',');
          for(let i=0;i<parts.length;i++){
              searchArray.push(parts[i]);
            }
        }
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        const params = {
            "search":searchArray,
            "page": this.page,
            "per_page": this.pageSize
        };
        this.loading = true;
        this.$http.secured
          .get("/api/v1/issue_inventories/pending_approvals", { params: params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.issue_inventories;
              // this.totalPages = response.data.meta.total_pages;
              // this.pending_return_search = '';
              
              this.loading = false;
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
            }
          )
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },
      handlefilterPopup () {
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filterPopup =  true
        this.pending_return_search = '';
        this.$http.secured
            .get('/api/v1/issue_inventories/pending_approvals')
            .then(response => {
              if (response.data) {
                // this.filter_status = response.data.issue_inventories;
              } else {
                this.showAlert("error", "No Data Found");
                this.loading = false;
              }
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
            });
      },
      closefilter(){
        this.filterPopup = false
      },
      applyFilters() {
        this.loading = true;
        const params = {
          'inventory_statuses' : this.statuss.id,
          'page'    : this.page,
          'per_page' : this.pageSize
        }
        this.$http.secured
        .get('/api/v1/issue_inventories/pending_approvals', { params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.issue_inventories
            this.loading = false;
            this.statuss = '';
            this.gradeSelected = '';
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
        this.filterPopup = false;
      },
        rejectItems(){
          this.confirmationModelDelete = true;
          this.acceptOrReject = "rejected";
          this.accessMessage = "Are you sure! You want reject?"
        },
        approveItems(){
          this.confirmationModelDelete = true;
          this.acceptOrReject = "accepted";
          this.accessMessage = "Are you sure! You want Approve?"
        },
        confirmedFunc(){
          const selectedId = this.selected.map(x => x.id);
          if(this.acceptOrReject == "accepted"){
              this.$http.secured
              .post('/api/v1/issue_inventories/approve', { ids : selectedId })
              .then(response => {
                if (response.data) {
                  this.successPopUp = true;
                  this.confirmationModelDelete = false;
                  this.successmessage = response.data.message
                } else {
                  this.showAlert("error", "No Data Found");
                }
              })
              .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
                this.loading = false;
              });
          }
          else if(this.acceptOrReject == "rejected"){
            this.$http.secured
              .post('/api/v1/issue_inventories/reject', { ids : selectedId })
              .then(response => {
                if (response.data) {
                  this.successPopUp = true;
                  this.confirmationModelDelete = false;
                  this.successmessage = response.data.message
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
          this.acceptOrReject = '';
        },
        formatinventory(inventory_status){
          if (inventory_status === "short") {
            return "Short";
          } else if (inventory_status === "excess") {
            return "Excess";
          } else {
            return inventory_status;
          }
        },
        afterClickOkLoadData(){
          this.successPopUp = false;
          this.page = 1;
          this.pending_return_search = '';
          this.getdata();
        },
        handlePageChange(value) {
          this.page = value;
          this.pending_return_search = '';
          this.getdata();
        },
        handlePageSizeChange(size) {
          this.pageSize = size;
          this.page = 1;
          this.pending_return_search = '';
          this.getdata();
        },
  },
}

</script>
<style scoped>
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

  .v-dialog__content:has(.filter-putaway){
    justify-content: right;
    align-items: baseline;
    top: var(--dialog-ypos);
  }
  .green{
    background: #219653;
;
    color: #fff;
  }
  .red{
    background: #EC0101;
    color: #fff;
  }
  .item-selected{
    margin-top: 23px;
    position: absolute;
    left: 41%;
  }

</style>