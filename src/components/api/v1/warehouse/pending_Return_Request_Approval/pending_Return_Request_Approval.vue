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
            <v-actions style="margin-bottom: 28px;">
                <v-btn class="ma-2" color="primary" :disabled = "selected.length == 0" @click="approveItems()">Approve</v-btn>
                <v-btn class="ma-2" color="primary" :disabled = "selected.length == 0" @click="rejectItems()">reject</v-btn>
            </v-actions>
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
            <v-dialog content-class="filter-putaway" v-model="filterPopup" persistent max-width="724px">
              <v-card>
                <v-card-actions>
                  <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id" label="Article Id" outlined class="ma-2" style="max-width: 350px;"></v-text-field>
                  <v-autocomplete v-model="gradeSelected" :items="gradelist" label="Grade" multiple outlined class="ma-2" style="max-width: 350px;"></v-autocomplete>
                </v-card-actions>
                <v-card-actions class="margin-10">
                  <v-spacer></v-spacer>
                  <v-btn small text color="normal" @click="filterPopup = false">CANCEL</v-btn>
                  <v-btn small color="primary" @click="applyFilters()" :disabled="this.article_id.length == 0 && this.gradeSelected.length == ''">APPLY FILTER(S)</v-btn>
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
            headerText: "Pending Return Request Approval",
            search: "",
            pending_return_search: "",
            loading: false,
            headers: [
                        { text: "Tag ID", value: "tag_id", align: "start", sortable: false },
                        { text: "Article Id", value: "article_id" },
                        { text: "Article Description", value: "article_description", width: '60%',align: "start" },
                        { text: "Grade", value: "grade" }
                    ],
            filterPopup :  false ,
            table_data: [],
            confirmationModelDelete : false,
            article_id : '',
            gradeSelected : '',
            gradelist : '',
            pageSizes : [100,200,500],
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
        this.loading = true;
        this.selected = []
        this.table_data = []
        const searchArray = [];
        if(this.pending_return_search != ''){
          const parts = this.pending_return_search.split(',');
          for(let i=0;i<parts.length;i++){
              searchArray.push(parts[i]);
            }
        }
        const params = {
            "search":searchArray,
            "page": this.page,
            "per_page": this.pageSize
        };
      this.$http.secured
        .get("/api/v1/items/pending_return_requests", { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.items
            this.totalPages = response.data.meta.total_pages
            this.gradelist = response.data.items.map(x => x.grade)
            this.gradelist.sort();
            this.loading = false;
            this.pending_return_search = '';
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
        const params = {
          'article_ids' : this.article_id,
          'grades'  : this.gradeSelected,
          'page'    : this.page,
          'per_page' : this.pageSize
        }
        this.$http.secured
        .get('/api/v1/items/pending_return_requests', { params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.items
            this.loading = false;
            this.article_id = '';
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
              .post('/api/v1/items/approve_return_request', { ids : selectedId })
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
              .post('/api/v1/items/reject_return_request', { ids : selectedId })
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
        afterClickOkLoadData(){
          this.successPopUp = false;
          this.page = 1;
          this.pending_return_search = '';
          this.loadData();
        },
        handlePageChange(value) {
          this.page = value;
          this.pending_return_search = '';
          this.loadData();
        },
        handlePageSizeChange(size) {
          this.pageSize = size;
          this.page = 1;
          this.pending_return_search = '';
          this.loadData();
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
</style>