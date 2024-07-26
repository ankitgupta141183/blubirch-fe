<template>
   <v-card class="v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Header -->
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-3PClaim" v-model="filterPopup" persistent max-width="936px">
        <v-card>
          <v-card-actions v-if="active_tab === 'Logistics Claim Requests'">
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="receiptDatelist" :items="receiptDateTotallist" label="Receipt Date" multiple outlined class="ma-2" style="max-width: 300px;"></v-combobox>
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="tagIdList" :items="tagIdTotalList" label="Tag Id" multiple outlined class="ma-2" style="max-width: 300px;"></v-combobox>
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="dispatchList" :items="dispatchTotalList" label="Dispatch Document No." multiple outlined class="ma-2" style="max-width: 300px;"></v-combobox>
          </v-card-actions>
          <v-card-actions v-if="active_tab === 'Item Mismatch Claim Request'">
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="articleIdList" :items="articleIdTotalList" label="Article ID" multiple outlined class="ma-2" style="max-width: 450px;"></v-combobox>
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="itemTesterList" :items="itemTesterTotalList" label="Item Confirmed/Tested By" multiple outlined class="ma-2" style="max-width: 450px;"></v-combobox>
          </v-card-actions>
          <v-card-actions v-if="active_tab === 'Item Grade Mismatch Claim Request'">
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="articleIdList" :items="articleIdTotalList" label="Article ID" multiple outlined class="ma-2" style="max-width: 225px;"></v-combobox>
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="gradePRDList" :items="gradePRDTotalList" label="Grade (PRD)" multiple outlined class="ma-2" style="max-width: 225px;"></v-combobox>
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="gradeReceivedList" :items="gradeReceivedTotalList" label="Grade (Received)" multiple outlined class="ma-2" style="max-width: 225px;"></v-combobox>
              <v-combobox  prepend-inner-icon="mdi-magnify" clearable v-model="itemTesterList" :items="itemTesterTotalList" label="Item Tested By" multiple outlined class="ma-2" style="max-width: 225px;"></v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
                <v-spacer></v-spacer>
                <v-btn small text color="normal" @click="filterPopup = false">CANCEL</v-btn>
                <v-btn small color="primary" @click="applyFilters()">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
       </v-dialog>
    </v-row>

    <!--Raise Debit Note Request Popup-->
    <v-row justify="center">
      <v-dialog v-model="UpdatePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Raise Debit Note Request</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updatePendingConfirmationCancel">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                
                <v-row>
                  <v-col cols="12" sm="5" md="6">
                    <v-autocomplete
                          v-model="raise_against"
                          outlined 
                          :items="raiseList" 
                          item-text="name"
                          item-value="value" 
                          label="Raise Against" 
                        >
                        </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="5" md="6">
                    <v-autocomplete
                          v-model="namevalue"
                          outlined 
                          :items="nameList" 
                          item-text="vendor_name"
                          item-value="vendor_code"
                          label="Name" 
                        >
                        </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                      <v-col cols="12" sm="5" md="6">
                        <v-text-field
                          outlined 
                          label="Claim/Debit Note amount" 
                          v-model="claim_amount"
                          >
                        </v-text-field>
                      </v-col>
                      </v-row>
              </v-container>
            </v-card-text>
          <v-card-actions center>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="claim_amount == '' || namevalue == '' || raise_against == ''" class="mb-3" @click="updatePendingConfirmationSubmit">Save & Update</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- no claim confirmation  -->
    <v-row justify="center">
      <v-dialog v-model="noClaimDialog" persistent max-width="450px">
        <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="noClaimClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          <v-card-text class="mt-4">
            <p style="text-align: center;">Are you sure you don’t want to raise any claim?</p>
          </v-card-text>
          <v-card-actions center>
              <v-spacer></v-spacer>
              <v-btn style="color: #1976D2;" class="mb-3 btn btn-outline-primary" @click="noClaimClose">Cancel</v-btn>
              <v-btn color="primary" class="mb-3 ml-8" @click="noClaimConfirmed">Ok</v-btn>
              <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--attach popup of damage certificate file -->
    <v-row justify="center">
      <v-dialog v-model="damagePopup" persistent max-width="600px" width="100%">
        <v-card  class="v-card-100">
            <v-card  class="v-card-100">
              <v-card-title style="display: flow-root;">
                <span class="headline">Damage Certificate Upload</span>
                <span  style="float: right;"><v-btn icon class="icon-right" @click="damageFileUploadDialogClose"><v-icon>mdi-close</v-icon></v-btn></span>
              </v-card-title>
            </v-card>
            <v-card-text>
              <v-container>
                <v-file-input
                v-model="damage_File"
                label="Select Damage certificate to upload"
                outlined
                class="mt-8"
                ></v-file-input>
              </v-container>
            </v-card-text>
            <v-card-actions center>
              <div class="w-100">
                <button class="main_button" @click="uploadDamageFile">Upload</button>
              </div>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="rejectsussesspopup" persistent max-width="424px">
        <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="rejectsussesspopup = false">
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

    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab
          style="text-transform:none!important;"
          @click="loadData(tab,'tab_clicked')"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    
    <div>
      <v-card-title style="padding: 28px;">
        <v-row>
          <v-col cols="4" sm="4">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-actions style="margin-bottom: 28px;" class="d-flex">
          <template>
            <div class="text-center d-flex">
              <v-btn :disabled="this.selected.length === 0"  color="primary" class="ma-2" @click="updatedialog">
                RAISE DEBIT NOTE REQUEST
                <v-icon start icon="mdi-chevron-down"></v-icon>
              </v-btn>
              <v-btn :disabled="this.selected.length === 0"  color="primary" class="ma-2" @click="updateNoclaimDialog">
                NO CLAIM
                <v-icon start icon="mdi-chevron-down"></v-icon>
              </v-btn>
            </div>
          </template>

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

        </v-actions>
      </v-card-title>
    </div>

     <!-- table  -->
     <div>
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
              height = "100%"
              loading-text="Loading Data... Please wait"
              class="elevation-1"
            >
              <template v-slot:item.document_value="{ item }">
                <span>{{ item.document_value ? item.document_value : "N/A" }}</span>
              </template>

              <template v-slot:item.debit_note_request_amount="{ item }">
                <span>{{ item.debit_note_request_amount ? item.debit_note_request_amount : "N/A" }}</span>
              </template>

              <template v-slot:item.tested_by="{ item }">
                <span>{{ item.tested_by ? item.tested_by : "N/A" }}</span>
              </template>

              <template v-slot:item.debit_note_request_against="{ item }">
                <span>{{ item.debit_note_request_against ? item.debit_note_request_against : "N/A" }}</span>
              </template>

              <template #[`item.receipt_file`]="{ item }">
                <template v-if="item.receipt_file === null">
                  <span>N/A</span>
                </template>
                <template v-else>
                  <a :href="item.receipt_file" target="_blank" style="color: #1976d2;text-decoration: underline !important;">View</a>
                </template>
              </template>

                <template #[`item.damage_certificate`]="{ item }">
                  <template v-if="item.damage_certificate === null">
                    <a @click="attachDamageCerti(item)" style="color: #1976d2;text-decoration: underline;">
                      Attach
                    </a>
                  </template>
                  <template v-else>
                    <a :href="item.damage_certificate" target="_blank" style="color: #1976d2;text-decoration: underline !important;">View</a>
                  </template>
                </template>
                
            </v-data-table>
          </v-flex>
      </v-layout>

       <div class="float-right">
        <v-row class="ml-2">
          <v-col cols="4" sm="3">
            <v-select v-model="pageSize" :items="pageSizes" label="Items per page" 
            @change="handlePageSizeChange"></v-select>
          </v-col>
          <v-col cols="12" sm="9">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"
            @input="handlePageChange">
            </v-pagination>
          </v-col>
        </v-row>
       </div>

      </div>
    </v-card>
</template>

<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent.vue";
export default {
    name: "ThreePClaimRequests",
    data(){
        return {
            headerText: "3P Claim Requests",
            loading: false,
            alert: false,
            tabs: [
                    "Logistics Claim Requests",
                    "Item Mismatch Claim Request",
                    "Item Grade Mismatch Claim Request"
                ],
            active_tab: "",
            table_data: [],
            selected: [],
            alert_type: "success",
            alert_message: "success",
            page: 1,
            totalPages: 1,
            pageSize: 100,
            pageSizes: [100, 200, 500],
            alert_value: '',
            search_field_value: "",
            alert_item: [{ name: 'All', value: '' }, { name: 'High', value: 'high' }, { name: 'Medium', value: 'medium' }, { name: 'Low', value: 'low' }],
            headers: [],
            UpdatePopup: false,
            claim_amount:'',
            search_tag:'',
            damagePopup : false,
            damage_File:null,
            receiptFile_required : false,
            filterPopup :  false ,
            tagIdList : '',
            tagIdTotalList:[],
            receiptDatelist:'',
            receiptDateTotallist:[],
            dispatchList : '',
            dispatchTotalList : [],
            articleIdList : [],
            articleIdTotalList : [],
            itemTesterList : [],
            itemTesterTotalList : [],
            gradePRDList : [],
            gradePRDTotalList :[],
            gradeReceivedList : [],
            gradeReceivedTotalList :[],
            raiseList :['Vendor'],
            file :[],
            noClaimDialog : false,
            nameList : [],
            tempList : [],
            raise_against : '',
            namevalue : '',
            rejectsussesspopup: false,
            successmessage:'',
            search:'',
        }

    },
    created() {
    this.loadData('Logistics Claim Requests')
  },
  components: {
      HeaderComponent
    },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    
    loadData(tab, tab_action) {
            if(tab_action){
            this.search_tag = '';
          }
          this.loading = true;
          this.selected = []
          this.active_tab = tab
          this.table_data = []
          this.page = 1
          this.totalPages = 1
          this.pageSize = 100
          if (tab == "Logistics Claim Requests") {
            (this.headers = [
                          { text: "Tag ID", align: "start", sortable: false, value:"tag_id"},
                          { text: "Dispatch Document No.", value: "reverse_dispatch_document_number" },
                          { text: "Dispatch Document Value (₹)", value: "document_value" },
                          { text: "Claim/Debit Note Amount (₹)", value: "debit_note_request_amount" },
                          { text: "Receipt Date", value: "receipt_date" },
                          { text: "Box Receipt Summary", value: "receipt_file" },
                          { text: "Damage Certificate", value: "damage_certificate" },
                          ]);
            this.fetchLogistics();
          }
          if (tab == "Item Mismatch Claim Request") {
            (this.headers = [
                          { text: "Tag ID", align: "start", sortable: false, value:"tag_id"},
                          { text: "Article ID (PRD)", value: "article_id" },
                          { text: "MRP (PRD) ₹", value: "mrp" },
                          { text: "Article ID (Received)", value: "received_article_id" },
                          { text: "MRP (Received) ₹", value: "received_mrp" },
                          { text: "Item Confirmedor Tested By", value: "tested_by" },
                          { text: "claim/Debit Note Amount (₹)", value: "debit_note_request_amount" },
                          { text: "Debit Note Against", value: "debit_note_request_against" },
                          ]);
            this.fetchClaimMismatch();  
          }
          if (tab == "Item Grade Mismatch Claim Request") {
            (this.headers = [
                          { text: "Tag ID", align: "start", sortable: false, value:"tag_id"},
                          { text: "Article ID", value: "article_id" },
                          { text: "MRP (₹)", value: "mrp" },
                          { text: "Grade (PRD)", value: "prd_grade" },
                          { text: "Grade (Received)", value: "grade" },
                          { text: "Item Tested By", value: "tested_by" },
                          { text: "claim/Debit Note Amount (₹)", value: "debit_note_request_amount" },
                          { text: "Debit Note Against", value: "debit_note_request_against" },
                          ]);
            this.fetchGradeMismatch();  
          }
      },

      fetchLogistics(){
        const searchArray = [];
        if(this.search_tag != ''){
          const parts = this.search_tag.split(',');
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
          .get("/api/v1/items/logistic_partner_claims",{params: params})
          .then(response => {
            if (response.data) {
              this.table_data = response.data.items
              this.totalPages = response.data.meta.total_pages
              this.tagIdTotalList = response.data.items.map(x => x.tag_id)
              this.receiptDateTotallist = response.data.items.map(x => x.receipt_date)
              this.dispatchTotalList = response.data.items.map(x => x.reverse_dispatch_document_number)
              this.tagIdTotalList.sort();
              this.receiptDateTotallist.sort();
              this.dispatchTotalList.sort();
              this.loading = false;
              this.tagIdList='';
              this.dispatchList = '';
              this.receiptDatelist = '';
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

      fetchClaimMismatch(){
        const searchArray = [];
        if(this.search_tag != ''){
          const parts = this.search_tag.split(',');
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
        .get("/api/v1/items/item_mismatch_claim", {params: params})
        .then(response => {
          if (response.data) {
            this.table_data = response.data.items
            this.totalPages = response.data.meta.total_pages
            this.articleIdTotalList = response.data.items.map(x => x.article_id)
            this.itemTesterTotalList = response.data.items.map(x => x.tested_by)
            this.articleIdTotalList.sort();
            this.itemTesterTotalList.sort();
            this.loading = false;
            this.articleIdList = '';
            this.itemTesterList = '';
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

      fetchGradeMismatch(){
        const searchArray = [];
        if(this.search_tag != ''){
          const parts = this.search_tag.split(',');
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
          .get("/api/v1/items/item_grade_mismatch_claim",{params: params})
          .then(response => {
            if (response.data) {
              this.table_data = response.data.items
              this.totalPages = response.data.meta.total_pages
              this.articleIdTotalList = response.data.items.map(x => x.article_id)
              this.gradePRDTotalList = response.data.items.map(x => x.prd_grade)
              this.gradeReceivedTotalList = response.data.items.map(x => x.grade)
              this.itemTesterTotalList = response.data.items.map(x => x.tested_by)
              this.gradePRDTotalList.sort();
              this.gradeReceivedTotalList.sort();
              this.articleIdTotalList.sort();
              this.itemTesterTotalList.sort();
              this.loading = false;
              this.articleIdList = '';
              this.gradePRDList = '';
              this.gradeReceivedList = '';
              this.itemTesterList = '';
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
      fetchVendorNameList(){
        this.$http.secured
              .get('/api/v1/vendor_masters')
              .then(response => {
                if (response.data) {
                  this.nameList = response.data.vendor_masters
                  this.nameList.sort((a, b) => { const nameA = a.vendor_name.toLowerCase(); const nameB = b.vendor_name.toLowerCase();
                  if (nameA < nameB) return -1; 
                  if (nameA > nameB) return 1; 
                  return 0; });
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

      updatedialog(){
        this.fetchVendorNameList();
        this.UpdatePopup=true;
      },

      updatePendingConfirmationCancel(){
        this.UpdatePopup = false;
        this.raise_against = '';
        this.namevalue = '';
        this.claim_amount = ''
      },

      handlePageChange(value) {
        this.page = value;
          if(this.active_tab == 'Logistics Claim Requests') {
              this.fetchLogistics();
          }else if (this.active_tab == "Item Mismatch Claim Request") {
            this.fetchClaimMismatch();
          }
          else{
            this.fetchGradeMismatch();
          }
      },
    
    handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if(this.active_tab == 'Logistics Claim Requests') {
              this.fetchLogistics();
          }else if (this.active_tab == "Item Mismatch Claim Request") {
            this.fetchClaimMismatch();
          }
          else{
            this.fetchGradeMismatch();
          }
      },
      attachDamageCerti(item){
        this.damage_File = null;
        this.damagePopup = true;
        this.item_details = item;
      },
      handlefilterPopup () {
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filterPopup =  true
      },
      damageFileUploadDialogClose(){
        this.damagePopup = false;
      },

    applyFilters() {
      if(this.active_tab == 'Logistics Claim Requests'){
              const params = {
                    'tag_ids':this.tagIdList,
                    'rddns' : this.dispatchList,
                    'receipt_dates':this.receiptDatelist,
                    'page': this.page,
                    'per_page': this.pageSize
                };
              this.$http.secured
              .get('/api/v1/items/logistic_partner_claims',{ params : params })
              .then(response => {
                if (response.data) {
                  this.table_data = response.data.items
                  this.filterPopup = false;
                  this.tagIdList = '';
                  this.receiptDatelist = '';
                  this.dispatchList = '';
                } else {
                  this.loading = false;
                  this.showAlert("error", "No Data Found");
                }
              })
              .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
                this.loading = false;
              });
      }  else if (this.active_tab == "Item Mismatch Claim Request") {
               const params = {
                  'article_ids' : this.articleIdList,
                  'usernames' : this.itemTesterList,
                  'page' :  this.page,
                  'per_page': this.pageSize
                };
              this.$http.secured
              .get('/api/v1/items/item_mismatch_claim', { params : params})
              .then(response => {
                if (response.data) {
                  this.table_data = response.data.items
                  this.filterPopup = false;
                  this.articleIdList = '';
                  this.itemTesterList = '';
                } else {
                  this.loading = false;
                  this.showAlert("error", "No Data Found");
                }
              })
              .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
                this.loading = false;
              });
        }  else  {
              const params = {
                'article_ids' : this.articleIdList,
                'prd_grades' : this.gradePRDList,
                'received_grades' : this.gradeReceivedList,
                'usernames' : this.itemTesterList,
                'page' : this.page,
                'per_page' : this.pageSize
              }
              this.$http.secured
              .get('/api/v1/items/item_grade_mismatch_claim',{ params : params })
              .then(response => {
                if (response.data) {
                  this.table_data = response.data.items
                  this.filterPopup = false;
                  this.articleIdList = '';
                  this.gradePRDList = '';
                  this.gradeReceivedList = '';
                  this.itemTesterList = '';
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

      updatePendingConfirmationSubmit(){
        this.tempList = this.selected.map(x => x.id)
        let claimName ; 
        if(this.active_tab == 'Logistics Claim Requests') {
           claimName = 'logistic';
        } else if(this.active_tab == 'Item Mismatch Claim Request'){
          claimName = 'item_mismatch';
        } else {
          claimName = 'grade_mismatch';
        }
        this.$http.secured
        .post("/api/v1/items/raise_debit_notes", { 
            'ids' : this.tempList,
            'vendor_code' : this.namevalue,
            'claim_amount': this.claim_amount,
            'claim_name'  : claimName
           })
            .then(response => {
            if (response.data) {
              this.raise_against ='',
              this.namevalue = '',
              this.claim_amount = '',
              this.loading = false;
              this.rejectsussesspopup = true;
              this.successmessage = response.data.message;
              this.showAlert(response.data.type, response.data.message);
              this.updatePendingConfirmationCancel();
            } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
            }
        })
        .catch(error => {
            // this.showAlert("error", "Something went wrong from Network" + error);
            this.$toast.error(error.response.data.message)
            this.loading = false;
        });
    },

    updateNoclaimDialog(){
      this.noClaimDialog = true;
    },

    noClaimClose(){
      this.noClaimDialog = false;
    },

    noClaimConfirmed(){
        this.tempList = this.selected.map(x => x.id)
        let claimName; 
        if(this.active_tab == 'Logistics Claim Requests') {
           claimName = 'logistic';
        } else if(this.active_tab == 'Item Mismatch Claim Request'){
          claimName = 'item_mismatch';
        } else {
          claimName = 'grade_mismatch';
        }
        this.$http.secured
        .post("/api/v1/items/no_claims", {'ids' : this.tempList, 'claim_name' : claimName })
            .then(response => {
            if (response.data) {
              this.loading = false;
              this.rejectsussesspopup = true;
              this.successmessage = response.data.message;
              this.showAlert(response.data.type, response.data.message);
              this.noClaimClose();
              this.selected=[];
            } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
            }
        })
        .catch(error => {
            // this.showAlert("error", "Something went wrong from Network" + error);
            this.$toast.error(error.response.data.message)
            this.loading = false;
        });
    },

    uploadDamageFile(){
      if(this.damage_File == null){
        this.showAlert("error","Please attach Damage Certificate to upload");
        return ;
      }
      const itemId = this.item_details.id;
      const formData = new FormData();
      formData.append("id", itemId);
      formData.append('file' , this.damage_File);
      this.$http.secured
      .post('/api/v1/items/upload_damage_certificate', formData )
        .then(response => {
          this.loading = false;
          this.loadData(this.active_tab);
          this.showAlert(response.data.type,response.data.message);
          this.damageFileUploadDialogClose();
        })
        .catch(error => {
            this.showAlert("error","Something went wrong from Network" + error);
            this.loading = false;
        });      
    },
    afterClickOkLoadData(){
      this.rejectsussesspopup = false;
      this.selected=[];
      this.loadData(this.active_tab);
    },

    // show Alert messages
    showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
    },
    alertTimeOut() {
        setTimeout(() => {
        this.alert = false;
        },3000);
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
    border-color: rgba(0,0,0,.42);
    border-style: solid;
  }
.v-dialog__content:has(.filter-3PClaim){
    justify-content: right;
    align-items: baseline;
    top: var(--dialog-ypos);
  }
</style>
