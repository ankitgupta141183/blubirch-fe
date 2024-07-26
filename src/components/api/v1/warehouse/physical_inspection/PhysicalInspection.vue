<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">

    <!-- Title-->
    <header-component :headerTitle="headerText" />
    <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Request tracker tab popups -->
    <v-row justify="center">
      <v-dialog v-model="dialogDetails" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Create Request Screen</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialogDetailsClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <v-col cols="12">
                    <v-combobox v-model="select_location" :items="location_items" item-text="code" item-value="code" label="Select Location" outlined ></v-combobox>
                  </v-col>
                </v-row>
                <span>Inventory:</span>
                <v-radio-group v-model="selectedOption" row >
                  <v-radio  label="All" value="all_invetory" class="mr-12"></v-radio>
                  <v-radio  label="Partial" value="partial" class="ml-12"></v-radio>
                </v-radio-group>
                <div>
                  <v-row>
                    <v-col cols="6">
                      <v-autocomplete v-model="brand_select" :items="brand_items" item-text="brands name" item-value="brand" label="Brand" multiple outlined :disabled="selectedOption === 'all_invetory'" @input="handleAutocompleteInput('brand_select')" @keyup="searchbrand($event)"  ref="brandsearchClear"></v-autocomplete>
                      <p v-for="(item, index) in selectedBrandItems" :key="index" class="addeditems">
                        {{ item }}
                        <v-btn icon @click="removeSelectedItem('brand_select', index)" class="closeitems">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </p>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete v-model="category_select" :items="category_items" item-text="categery name" item-value="name" label="Category" multiple outlined  :disabled="selectedOption === 'all_invetory'" @input="handleAutocompleteInput('category_select')" @keyup="categorySearch($event)"  ref="cat_searchClear"></v-autocomplete>
                      <p v-for="(item, index) in selectedCategoryItems" :key="index" class="addeditems">
                        {{ item }}
                        <v-btn icon @click="removeSelectedItem('category_select', index)" class="closeitems">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-autocomplete v-model="article_id_select" :items="articleId_items" item-text="" item-value="" label="Article ID" multiple outlined  :disabled="selectedOption === 'all_invetory'" @input="handleAutocompleteInput('article_id_select')" @keyup="articleidsearch($event)"  ref="artic_searchClear"> </v-autocomplete>
                      <p v-for="(item, index) in selectedArticleIdItems" :key="index" class="addeditems">
                        {{ item }}
                        <v-btn icon @click="removeSelectedItem('article_id_select', index)" class="closeitems">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </p>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete v-model="disposition_select" :items="disposition_items" item-text="name" item-value="id" label="Disposition" multiple outlined  :disabled="selectedOption === 'all_invetory'" @input="handleAutocompleteInput('disposition_select')" @keyup="dispositionSearch($event)" ref="disp_searchClear"> </v-autocomplete>
                      <p v-for="(item, index) in selectedDispositionItems" :key="index" class="addeditems">
                        {{ item }}
                        <v-btn icon @click="removeSelectedItem('disposition_select', index)" class="closeitems">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </p>
                    </v-col>
                  </v-row>
                  </div>
                  <span>Select the Physical Inspection Executives</span>
                  <v-row>
                    <v-col cols="12">
                      <v-combobox v-model="search_id_names_select" :items="search_id_names_items" item-text="full_name" item-value="id" label="search by ID or first/last names" multiple outlined @input="handleAutocompleteInput('search_id_names_select')"  @keyup="searchItems($event)" ref="searchClear"> </v-combobox>
                      <p v-for="(item, index) in selectednameItems" :key="index" class="addeditems">
                        {{ item.full_name }}
                        <v-btn icon @click="removeSelectedItem('search_id_names_select', index)" class="closeitems">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </p>
                    </v-col>
                  </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined small color="primary" class="cancel-color mb-3" @click="dialogDetailsClose">CANCEL</v-btn>
            <v-btn color="primary" small class="mb-3" :disabled="number > 0 || !select_location || !search_id_names_select" @click="requestSubmission">SUBMIT</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="successpopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="successpopup = false">
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
    <!-- Item Issue tab popup -->
    <v-row justify="center">
      <v-dialog v-model="writeoffpopup" persistent max-width="700px">
        <v-form>
          <v-card class="v-card-100">
              <v-card class="v-card-100">
                  <v-card-title>
                  <v-spacer>Write Off</v-spacer>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="closeeriteoff">
                  <v-icon>mdi-close</v-icon>
                  </v-btn>
                  </v-card-title>
              </v-card>
              <v-card-text>
                <v-container>
                  <v-checkbox v-model="showDebitNote" label="With Debit Note" @change="handleCheckboxChange('showDebitNote')"></v-checkbox>
                  <v-checkbox v-model="showWithoutDebitNote" label="Without Debit Note" @change="handleCheckboxChange('showWithoutDebitNote')"></v-checkbox>
              
                  <div v-if="showDebitNote">
                      <v-row>
                          <v-col cols="6">
                            <v-combobox v-model="vendor_code"  :items="vendor_data" item-text="vendor_code" item-value="id" label="Vendor Code" outlined @keyup="searchVendor($event)" ref="vendorsearchClear"></v-combobox>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field prepend-inner-icon="mdi-magnify" v-model="debit_amount" label="Debit Amount (₹)" @input="validatePrice" :error-messages="priceErrorMessages" outlined></v-text-field>
                          </v-col>
                      </v-row>
                  </div>
                </v-container>
              </v-card-text>          
              <v-card-actions center>
                  <v-spacer></v-spacer>
                  <v-btn outlined small color="primary" class="cancel-color mb-3" @click="closeeriteoff">CANCEL</v-btn>
                  <v-btn small color="primary" class="mb-3" :disabled="submitButtonDisabled" @click="debitnotesubmit">SUBMIT</v-btn>
                  <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
      </v-form>
      </v-dialog>
    </v-row>
    <!-- Update Asignees -->
    <v-dialog v-model="assigneesdetails" persistent max-width="400px">
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Updates Assignees</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="assigneesdetails  = false">
            <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12">
                  <v-combobox v-model="add_assignees" :items="filteredAssignees" item-text="full_name" item-value="full_name" label="Add Assignees" multiple outlined  @input="handleAutocompleteInput('add_assignees')" @keyup="searchItems($event)" ref="assigneesearch"></v-combobox>
                  <p v-for="(item, index) in assigneeselectitems" :key="index" class="addeditems">
                    {{ item.full_name }}
                    <v-btn icon @click="removeSelectedItem('add_assignees', index)" class="closeitems">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
          <v-spacer></v-spacer>
          <v-btn small outlined color="primary" class="cancel-color mb-3" @click="closeassigneepopup">CANCEL</v-btn>
          <v-btn small color="primary" class="mb-3" @click="updateassigneessubmit">CONFIRM</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Change Status -->
    <v-dialog v-model="change_status" persistent max-width="370px">
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>CHANGE STATUS</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="change_status = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-radio-group v-model="selected_status" row>
                <v-radio  label="Closed" value="completed" class="mr-12"></v-radio>
                <v-radio  label="In Progress" value="in_progress" class="ml-12"></v-radio>
              </v-radio-group>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined small color="primary" class="cancel-color mb-3" @click="change_status = false">CANCEL</v-btn>
            <v-btn color="primary" small class="mb-3" @click="updateStatus">CONFIRM</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- data detail popup  -->
    <v-row justify="center">
      <v-dialog v-model="datadetailpopupdisposition" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Inventory Status: {{ select_id }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopupdisposition = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                  <v-row>
                    <v-col>
                      <span class="status-items">
                        Total Inventory: {{ totalInventory }}
                      </span>
                    </v-col>
                    <v-col>
                      <span class="status-items">
                        Short Inventory:  {{ short_excess_count.short > 0 ? short_excess_count.short : 'NA' }}
                      </span>
                    </v-col>
                    <v-col>
                      <span class="status-items">
                        Excess Inventory: {{ short_excess_count.excess > 0 ? short_excess_count.excess : 'NA' }}
                      </span>
                    </v-col>
                  </v-row>
                  <v-data-table
                    :dense="true"
                    :search="search"
                    v-model="selected"
                    disable-pagination
                    :hide-default-footer="true"
                    :headers="item_headers"
                    :items="details_data"
                    fixed-header
                    height="100%" 
                    :loading="loading"
                    loading-text="Loading Data... Please wait"
                    >
                  </v-data-table>
                  <v-row class="ml-2 pb-0">
                    <v-col cols="4" sm="3" class="PaddingItemPerPage">
                      <v-select v-model="popuppageSize" :items="itemspageSizes" label="Items per page" @change="popupPageSizeChange"></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="9" class="PaddingItemPerPage">
                      <v-pagination v-model="popuppage" :length="popuptotalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="popupPageChange"></v-pagination>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- filter data popup -->
    <v-dialog content-class="filter-repair" v-model="filterDetails" persistent :max-width="active_tab === 'Request Tracker' ? '400px' : (active_tab === 'Item Issue' ? '1080px' : '600px')"  >
      <v-card>
        <v-card-actions>
          <!-- Request tracker fields -->
          <v-combobox v-if="active_tab === 'Request Tracker'" v-model="status_filter" :items="filter_status" item-text="name" item-value="id" label="Status" style="width: 300px !important;" outlined ></v-combobox>
          <!-- item issue tab filters -->
          <v-combobox v-if="active_tab === 'Item Issue'" v-model="locationAs" :items="locationAs_filter" item-text="location" item-value="location" prepend-inner-icon="mdi-magnify" label="Location As Per System"  outlined class="ma-2"> </v-combobox>
          <v-combobox v-if="active_tab === 'Item Issue'" v-model="sort_items" :items="sort_filter" item-text="name" item-value="id" prepend-inner-icon="mdi-magnify" label="Inventory Status"  outlined class="ma-2" > </v-combobox>
          <v-combobox v-if="active_tab === 'Item Issue'" v-model="excess" :items="excess_filter" item-text="name" item-value="id" prepend-inner-icon="mdi-magnify" label="Status"  outlined class="ma-2" > </v-combobox>
          
        </v-card-actions>
        <v-card-actions class="margin-10">
          <v-spacer></v-spacer>
          <v-btn small text color="normal" @click="filterDetails = false" >CANCEL</v-btn >
          <v-btn small color="primary" @click="ApplyFilterFunc" >APPLY FILTER(S)</v-btn >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Item Issue tab popup end-->
    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" @click="loadData(tab, 'tab_clicked')" style="text-transform:none!important;text-decoration: none;" v-for="(tab, index) in tabs" :key="index" >
          {{tab}}
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- Search, Action Buttons, Filter -->
    <v-card-title style="padding: 28px;">
      <!-- Search Fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" class="search_style" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>

      <!-- Action Buttons -->
      <v-card-actions style="margin-bottom: 28px;" v-if="active_tab == 'Request Tracker'">
          <v-btn class="ma-2" color="primary" :disabled="(this.selected.length > 0)" @click="createrequest">Create Request</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="isUpdateButtonDisabled()" @click="updateassignees">Update Assignees</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="changeStatus">Change Status</v-btn>
      </v-card-actions>
      <v-card-actions style="margin-bottom: 28px;" v-if="active_tab == 'Item Issue'">
          <v-btn class="ma-2" color="primary" :disabled="disabledButton()" @click="writeoff" value="write off">write off</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="disabledButton()" @click="correctexcess">Correct Excess</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="disabledButton()" @click="writeon">Write On</v-btn>
      </v-card-actions>
        
      <!-- Filter -->
      <v-expansion-panels class="custom-control_outlined filter_style" ref="filterPopupRef">
          <v-expansion-panel outlined @click="filterListOfButtons">
              <v-expansion-panel-header>
                  Filter
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
            fixed-header
            height="100%" 
            :loading="loading"
            loading-text="Loading Data... Please wait"
            class="elevation-1" >
            <template v-if="active_tab == 'Request Tracker'" #[`item.request_id`]="{ item }">
              <span>
                <a v-if="item.status === 'Closed'" @click="linkPopupInReqTracker(item)" style="color: #1976d2;">
                  <u> {{ item.request_id }}</u>
                </a>
              </span>
              <span v-if="item.status === 'pending' || item.status === 'in_progress'">
                {{ item.request_id }}
              </span>
            </template>
            <template #[`item.created_at`]="{ item }">
              {{ formatTimestamp(item.created_at) }}
            </template>
            <template #[`item.assignees_hash`]="{ item }">
              <span v-if="item.assignees_hash">
                {{ Object.values(item.assignees_hash).join(', ') }}
              </span>
              <span v-else>
                Na
              </span>
            </template>
            <template #[`item.status`]="{ item }">
              {{ formatStatus(item.status) }}
            </template>
            <template #[`item.inventory_status`]="{ item }">
              {{ formatinventory(item.inventory_status) }}
            </template>
            </v-data-table> 
        </v-flex>
    </v-layout>
    <!-- pagination display -->
    <div class="float-right">
      <v-row class="ml-2 pb-0">
        <v-col cols="4" sm="3" class="PaddingItemPerPage">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
        </v-col>
        <span  class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="9" class="PaddingItemPerPage">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";

export default {
    components:{
        HeaderComponent,
    },
    data(){
        return{
            headerText:"Physical Inspection",
            tabs:[
                "Request Tracker",
                "Item Issue"
            ],
            active_tab:"Request Tracker",
            active_tab1_action_btn:'CREATE REQUEST',
            active_tab2_action_btn:'WRITE OFF',
            selected:[],
            table_data: [],
            headers:[
              { text: "Request ID", align: "start", sortable: false, value:"request_id"},
              { text: "Creation Date", value: "creation_date" },
              { text: "Status", value: "status" },
              { text: "Assignees", value: "assignees" },
            ],
            item_headers:[
              { text: "Request ID", align: "start", sortable: false, value:"request_id"},
              { text: "Creation Date", value: "creation_date" },
            ],
            details_data:[],
            dialogDetails: false,
            selectedOption: 'all_invetory',
            loading: true,
            writeoffpopup: false,
            showDebitNote: false,
            showWithoutDebitNote: false,
            assigneesdetails: false,
            change_status: false,
            select_location: [],
            filterDetails: false,
            vendor_code: [],
            vendor_data:'',
            debit_amount: null,
            add_assignees: [],
            brand_select: [],
            category_select:[],
            ategory_select: [],
            article_id_select: [],
            disposition_select: [],
            search_id_names_select:[],
            closed_value: [],
            location_items:[],
            brand_items:[],
            category_items:[],
            successpopup: false,
            row:[],
            filteredAssignees: [],
            in_progress_value:[],
            search_id_names_items:[],
            status_filter: [],
            delivery_location_search:[],
            category:[],
            category_filter:'',
            brand_filter:'',
            locationAs:[],
            locationAs_filter:'',
            brand:[],
            excess:[],
            number:'',
            excess_filter:[
              {
                "name":"Pending For Approval",
                "id": "pending_for_approval"
              },
              {
                "name":"Pending For Action",
                "id": "pending_for_action"
              }
            ],
            sort_items:[],
            sort_filter:[{
                "name":"Excess",
                "id": "excess"
              },
              {
                "name":"Short",
                "id": "short"
              },
            ],
            selectedBrandIds:[],
            selectedCategoryIds:[],
            selectedArticleIds:[],
            selectedSearchIds:[],
            articleId_items:[],
            disposition_items:[],
            distribution_id:null,
            successmessage:'',
            search_tag: '',
            search:'',
            showSelectedItems: false,
            short_excess_count:[],
            datadetailpopupdisposition:false,
            assignees_assigned: [],
            assignee_details:[],
            filter_status: [
              {
                "name":"In Progress",
                "id": "in_progress"
              },
              {
                "name":"Closed",
                "id": "completed"
              },
              {
                "name":"Pending",
                "id": "pending"
              }
            ],
            selected_status: "completed",
            select_id:'',
            priceErrorMessages:'',
            page: 1,
            totalPages: [],
            pageSize: 100,
            pageSizes: [100, 200, 500],
            item:'',
            popuppage:1,
            popuppageSize: 25,
            itemspageSizes:[25,50,100],
            popuptotalPages:[],
            alert: false,
            alert_message:'',
            alert_type:'',
            itemStore:'',
            selectedBrandItems : [],
            selectedCategoryItems : [],
            selectedArticleIdItems : [],
            selectedDispositionItems : [],
            selectednameItems : [],
            assigneeselectitems:[],
            existingAssignees: []
        }
    },

    async created(){
      this.loadData('Request Tracker');
      this.scrollToTop();
    },
    watch : {
      search_id_names_select(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.searchClear.internalSearch = '';
            });
          }
        },
        brand_select(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.brandsearchClear.internalSearch = '';
            });
          }
        },
        category_select(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.cat_searchClear.internalSearch = '';
            });
          }
        },
        article_id_select(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.artic_searchClear.internalSearch = '';
            });
          }
        },
        disposition_select(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.disp_searchClear.internalSearch = '';
            });
          }
        },
        vendor_code(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.vendorsearchClear.internalSearch = '';
            });
          }
        },
        add_assignees(newValue){
          if (newValue && newValue.length > 0) {
            this.$nextTick(() => {
              this.$refs.assigneesearch.internalSearch = '';
            });
          }
        },
    },
    computed: {
      // selectedBrandItems() {
      //   return this.brand_select;
      // },
      // selectedCategoryItems() {
      //   return this.category_select;
      // },
      // selectedArticleIdItems() {
      //   return this.article_id_select;
      // },
      // selectedDispositionItems() {
      //   return this.disposition_select;
      // },
      // selectednameItems() {
      //   return this.search_id_names_select;
      // },
      showLinkForCompleteItems() {
        return this.active_tab === 'Request Tracker' && this.item && this.item.status === 'complete';
      },
      totalInventory() {
        const short = this.short_excess_count && this.short_excess_count.short || 0;
        const excess = this.short_excess_count && this.short_excess_count.excess || 0;

        if (short === 0 && excess === 0) {
          return 'NA';
        } else if (short === 0) {
          return excess;
        } else if (excess === 0) {
          return short;
        } else {
          return short + excess;
        }
      },
      submitButtonDisabled() {
        if (!this.showDebitNote && !this.showWithoutDebitNote) {
          return true;
        }
        if (this.showDebitNote && (!this.vendor_code || !this.debit_amount)) {
          return true;
        }
        return false;
      },
    },
    methods:{
        loadData(tab, tab_action){
            if (tab_action) {
              this.search_tag = ''
            }
            this.selected = []
            this.active_tab = tab
            this.table_data = []
            this.page = 1
            this.totalPages = 1
            this.pageSize = 100
            if(tab == 'Request Tracker'){
                (this.headers = [
                    { text: "Request ID", align: "start", sortable: false, value:"request_id"},
                    { text: "Creation Date", value: "created_at" },
                    { text: "Status", value: "status" },
                    { text: "Assignees", value: "assignees_hash" },
                ]);
                this.requestData();
            }
            if(tab == 'Item Issue'){
                (this.headers = [
                    { text: "Tag Number", align: "start", sortable: false, value:"tag_number"},
                    { text: "Request ID", value: "request_id" },
                    { text: "Location As Per System", value: "location" },
                    { text: "Inventory Status", value: "inventory_status" },
                    { text: "Status", value: "status" },
                ]);
                this.itemissues();
            }
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        requestData(){
          this.loading = true;
          const searchArray = [];
          if(this.search_tag != ''){
            const parts = this.search_tag.split(',');
            for(let i=0;i<parts.length;i++){
                searchArray.push(parts[i]);
              }
          }
          const params = this.getRequestParams(
            this.page,
            this.pageSize
          );
          this.$http.secured
            .get('/api/v1/physical_inspections', {
              params: 
                  { 
                    search: searchArray, 
                    page: params['page'], 
                    per_page: params['size'],
                  }
              })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.physical_inspections;
                this.totalPages = response.data.meta.total_pages;
                this.makeLoadingFalse();
                this.loading = false
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
        itemissues(){
          this.loading = true;
          const searchArray = [];
          if(this.search_tag != ''){
            const parts = this.search_tag.split(',');
            for(let i=0;i<parts.length;i++){
                searchArray.push(parts[i]);
              }
          }
          const params = this.getRequestParams(
            this.page,
            this.pageSize
          );
          this.$http.secured
            .get('/api/v1/issue_inventories',{
              params: 
                  { 
                    search: searchArray, 
                    page: params['page'], 
                    per_page: params['size'],
                  }
              })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.issue_inventories;
                this.totalPages = response.data.meta.total_pages;
                this.makeLoadingFalse();
                this.loading = false
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
        formatStatus(status) {
          if (status === "in_progress") {
            return "In Progress";
          } else if (status === "completed") {
            return "Completed";
          } else if (status === "pending") {
            return "Pending";
          } else if (status === "pending_for_approval") {
            return "Pending For Approval";
          } else if (status === "pending_for_action") {
            return "Pending For Action";
          } else {
            return status;
          }
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
        linkPopupInReqTracker(item) {
          this.itemStore = item
          this.datadetailpopupdisposition = true;
          const selectedIds =  item.id
          this.select_id = item.request_id;
          this.loading = true;
          const params = this.getRequestParams(
            this.popuppage,
            this.popuppageSize
          );
          
          this.$http.secured
            .get(`/api/v1/physical_inspections/${selectedIds}/issue_items`, {
              params :{ 
                    page: params['page'], 
                    per_page: params['size'],
                  }
            })
            .then(response => {
              if (response.data) {
                this.item_headers = [
                  { text: "Tag Id", align: "start", sortable: false, value: "tag_number" },
                  { text: "Status", value: "inventory_status" },
                ];
                this.details_data = response.data.issue_items;
                this.short_excess_count = response.data.shor_excess_count;
                this.popuptotalPages = response.data.meta.total_pages;
                this.loading = false;
                
              } else {
                this.showAlert("error", "No Data Found");
                this.loading = false;
              }
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network: " + error);
              this.loading = false;
            });
        },
        assigneeStatus(){
          this.selected.item.length = 0;
          this.selected.item.status = 'pending';
        },
        formatTimestamp(timestamp) {
          const date = new Date(timestamp);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          let hour = date.getHours();
          const minute = date.getMinutes();
          const amPM = hour >= 12 ? 'PM' : 'AM';
          hour = hour % 12 || 12;
          const formattedTime = `${hour}:${minute.toString().padStart(2, '0')} ${amPM}`;
          return `${day}/${month}/${year}`;
        },
        // create request 
        createrequest() {
          this.brand_items = '';
          this.select_location = '';
          this.brand_select = '';
          this.category_select ='';
          this.article_id_select ='';
          this.disposition_select ='';
          this.search_id_names_select ='';
          this.dialogDetails = true;
          this.$http.secured
            .get('/api/v1/distribution_centers')
            .then(response => {
              this.location_items = response.data.distribution_centers;
            })
            .catch(error => {
              console.error("Error fetching brand data:", error);
            });
          this.$http.secured
            .get('/api/v1/physical_inspections/brands')
            .then(response => {
              this.brand_items = response.data.brands.map(brand => brand.brand);
            })
            .catch(error => {
              console.error("Error fetching brand data:", error);
            });
          this.$http.secured
            .get('/api/v1/physical_inspections/categories')
            .then(response => {
              this.category_items = response.data.client_categories.map(category => category.name);
            })
            .catch(error => {
              console.error("Error fetching category data:", error);
            });
          this.$http.secured
            .get('/api/v1/physical_inspections/articles')
            .then(response => {
              this.articleId_items = response.data.articles.map(article => article.code);
            })
            .catch(error => {
              console.error("Error fetching article ID data:", error);
            });
          this.$http.secured
            .get('/api/v1/physical_inspections/dispositions')
            .then(response => {
              this.disposition_items = response.data.dispositions;
            })
            .catch(error => {
              console.error("Error fetching disposition data:", error);
            });
            this.$http.secured
            .get('/api/v1/physical_inspections/assignees')
            .then(response => {
              this.search_id_names_items = response.data.users;
            })
            .catch(error => {
              console.error("Error fetching disposition data:", error);
            });
        },
        requestSubmission() {
          const distribution_id = this.select_location.id;
          const assigneesObject = {};
          this.selectednameItems.forEach((item) => {
            assigneesObject[item.id] = item.full_name;
          });
          const dataToSend = {
            physical_inspection: {
              brands: this.selectedBrandItems,
              category_ids: this.selectedCategoryItems,
              article_ids: this.selectedArticleIdItems,
              distribution_center_id: distribution_id,
              inventory_type: this.selectedOption,
              dispositions: this.selectedDispositionItems,
              assignees_hash:assigneesObject
            },
          };

          this.$http.secured
            .post('/api/v1/physical_inspections', dataToSend)
            .then((response) => {
              if (response.data) {
                this.successpopup = true;
                this.successmessage = response.data.message;
                this.brand_items = '';
                this.select_location = '';
                this.brand_select = '';
                this.category_select ='';
                this.article_id_select ='';
                this.disposition_select ='';
                this.search_id_names_select ='';
                this.selectedBrandItems = '';
                this.selectedCategoryItems = '';
                this.selectedArticleIdItems = '';
                this.selectedDispositionItems = '';
                this.selectednameItems = '';
                this.selectedOption = 'all_invetory'
                this.loadData(this.active_tab);
              } else {
                this.showAlert('error', 'No Data Found');
              }
              this.loading = false;
            })
            .catch((error) => {
              this.showAlert('error', 'Something went wrong from Network' + error);
              this.loading = false;
            });
        },
        dialogDetailsClose(){
          this.dialogDetails = false;
          this.selectedBrandItems = '';
          this.selectedCategoryItems = '';
          this.selectedArticleIdItems = '';
          this.selectedDispositionItems = '';
          this.selectednameItems = '';
        },
        closeassigneepopup(){
          this.assigneesdetails = false;
          this.assigneeselectitems ='';
        },
        ApplyFilterFunc(){
          const params = new URLSearchParams();
         
          const pageparams = this.getRequestParams(
            this.page,
            this.pageSize
          );
          
          params.append('page' , pageparams['page'])
          params.append('per_page' , pageparams['size'])
          if (this.active_tab == "Request Tracker") {
            const statusfield = this.status_filter.id
            params.append('statuses', statusfield);
            this.$http.secured
              .get('/api/v1/physical_inspections', { params })
              .then(response => {
                if (response.data) {
                  this.table_data = response.data.physical_inspections;
                  this.totalPages = response.data.meta.total_pages
                  this.filterDetails = false;
                  this.loading = false;
                  this.status_filter='';

                } else {
                  this.loading = false;
                  this.showAlert("error", "No Data Found");

                }
              })
              .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
                this.loading = false;
              });
            }else
            if (this.active_tab === "Item Issue") {
              const params = new URLSearchParams();
              if (this.sort_items.id) {
                params.append('inventory_statuses', this.sort_items.id);
              }
              if (this.locationAs) {
                params.append('locations', this.locationAs);
              }
              if (this.excess.id) {
                params.append('statuses', this.excess.id);
              }
              this.$http.secured
                .get('/api/v1/issue_inventories', { params })
                .then(response => {
                  if (response.data) {
                    this.table_data = response.data.issue_inventories;
                    this.totalPages = response.data.meta.total_pages;
                    this.filterDetails = false;
                    this.locationAs = '';
                    this.sort_items = '';
                    this.excess = '';
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
            }
        },
        afterClickOkLoadData(){
          this.successpopup = false;
          this.assigneesdetails = false;
          this.change_status = false;
          this.dialogDetails = false;
          this.writeoffpopup = false;
          this.selected = ''
          this.loadData(this.active_tab);
        },
        updateassignees() {
          this.assigneesdetails = true;
          const selectedItem = this.selected.find(item => item.id);
          if (selectedItem && selectedItem.assignees_hash) {
            const assigneesHash = selectedItem.assignees_hash;
            this.assigneeselectitems = Object.values(assigneesHash).map(full_name => ({ full_name }));
          } else {
            this.assigneeselectitems = [];
            this.add_assignees = [];
          }
          this.$http.secured
            .get('/api/v1/physical_inspections/assignees')
            .then(response => {
              if (response.data) {
                this.filteredAssignees = response.data.users;
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
        updateassigneessubmit() {
          const assigneesObject = {};
          this.assigneeselectitems.forEach((item) => {
            assigneesObject[item.id] = item.full_name;
          });
          this.$http.secured
            .post('/api/v1/physical_inspections/update_assignees', 
              {
                "id": this.selected.map(item => item.id),
                "assignees_hash": assigneesObject, 
              }
            )
            .then(response => {
              if (response.data) {
                this.successpopup = true;
                this.successmessage = response.data.message
                
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
        isUpdateButtonDisabled() {
          return this.selected.length === 0 || this.selected.some(item => item.status !== "pending");
        },
        disabledButton(){
          const hasExcess = this.selected.some(item => item.inventory_status === "excess");
          const hasShort = this.selected.some(item => item.inventory_status === "short");
          return this.selected.length === 0 || (hasExcess && hasShort);
        },
        requestscreencancel(){
          this.dialogDetails = false;
        },
        changeStatus(){
          this.change_status = true;
        },
        updateStatus() {
          this.$http.secured
            .post('/api/v1/physical_inspections/update_status', {
              "id": this.selected.map(item => item.id),
              "status": this.selected_status,
            })
            .then(response => {
              if (response.data) {
                this.successpopup = true;
                this.successmessage = response.data.message;
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
        writeoff() {
          this.writeoffpopup = true;
          this.vendor_code = '';
          this.debit_amount = '';
          this.$http.secured
          .get('/api/v1/vendor_masters')
          .then(response => {
            this.vendor_data = response.data.vendor_masters.map(item => item.vendor_code);
          })
          .catch(error => {
            console.error("Error fetching disposition data:", error);
          });
        },
        handleCheckboxChange(checkboxName) {
            if (checkboxName === 'showDebitNote' && this.showDebitNote) {
                this.showWithoutDebitNote = false;
            } else if (checkboxName === 'showWithoutDebitNote' && this.showWithoutDebitNote) {
                this.showDebitNote = false;
            }
        },
        handleAutocompleteInput(fieldName) {
          if(fieldName == 'brand_select'){
            this.selectedBrandItems.push(this.brand_select[0]);
            this.brand_items = this.brand_items.filter( item => item != this.brand_select[0]);
            this.brand_select = [];
            this.$refs.brandsearchClear.internalSearch = '';
          } else if(fieldName == 'category_select'){
            this.selectedCategoryItems.push(this.category_select[0]);
            this.category_items = this.category_items.filter( item => item != this.category_select[0]);
            this.category_select = [];
            this.$refs.cat_searchClear.internalSearch = '';
          } else if(fieldName == 'article_id_select'){
            this.selectedArticleIdItems.push(this.article_id_select[0]);
            this.articleId_items = this.articleId_items.filter( item => item != this.article_id_select[0]);
            this.article_id_select = [];
            this.$refs.artic_searchClear.internalSearch = '';
          } else if(fieldName == 'disposition_select'){
            this.selectedDispositionItems.push(this.disposition_select[0]);
            this.disposition_items = this.disposition_items.filter( item => item != this.disposition_select[0]);
            this.disposition_select = [];
            this.$refs.disp_searchClear.internalSearch = '';
          } else if(fieldName == 'search_id_names_select'){
            this.selectednameItems.push(this.search_id_names_select[0]);
            this.search_id_names_items = this.search_id_names_items.filter( item => item != this.search_id_names_select[0]);
            this.search_id_names_select = [];
            this.$refs.searchClear.internalSearch = '';
          }else if (fieldName === 'add_assignees' && this.add_assignees.length > 0) {
            const existingAssignee = this.add_assignees[0];
            if (!this.assigneeselectitems.some(item => item.id === existingAssignee.id)) {
              this.assigneeselectitems.push(existingAssignee);
            }
            this.filteredAssignees = this.filteredAssignees.filter(item => item.id !== existingAssignee.id);
            this.add_assignees = [];
            this.$refs.assigneesearch.internalSearch = '';
          }
          const computedPropertyName = `showSelected${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Items`;
          this[computedPropertyName] = this[fieldName].length > 0;
        },
        searchItems(event) {
          const searchTerm = event.target.value;
          this.$http.secured
            .get(`/api/v1/physical_inspections/assignees?search=${searchTerm}`)
            .then(response => {
              this.search_id_names_items = response.data.users;
              this.search_id_names_items = this.search_id_names_items.filter( item => !this.selectednameItems.some( assignee => assignee == item));
              this.filteredAssignees = response.data.users;
            })
            .catch(error => {
              console.error("Error fetching assignees data:", error);
            });
        },
        searchbrand(event){
          const searchbrand = event.target.value
          this.$http.secured
            .get(`/api/v1/physical_inspections/brands?search=${searchbrand}`)
            .then(response => {
              this.brand_items = response.data.brands.map(brand => brand.brand);
              this.brand_items = this.brand_items.filter( item => !this.selectedBrandItems.some( brand => brand == item));
            })
            .catch(error => {
              console.error("Error fetching brand data:", error);
            });
        },
        categorySearch(event){
          const categoriesseach = event.target.value
          this.$http.secured
            .get(`/api/v1/physical_inspections/categories?search=${categoriesseach}`)
            .then(response => {
              this.category_items = response.data.client_categories.map(category => category.name);
              this.category_items = this.category_items.filter( item => !this.selectedCategoryItems.some( category => category == item));
            })
            .catch(error => {
              console.error("Error fetching category data:", error);
            });
        },
        articleidsearch(event){
          const articlesearch = event.target.value
          this.$http.secured
            .get(`/api/v1/physical_inspections/articles?search=${articlesearch}`)
            .then(response => {
              this.articleId_items = response.data.articles.map(article => article.code);
              this.articleId_items = this.articleId_items.filter( item => !this.selectedArticleIdItems.some( articleId => articleId == item));
            })
            .catch(error => {
              console.error("Error fetching article ID data:", error);
            });
        },
        dispositionSearch(event){
          const dispatchsearc = event.target.value
          this.$http.secured
            .get(`/api/v1/physical_inspections/dispositions?search=${dispatchsearc}`)
            .then(response => {
              this.disposition_items = response.data.dispositions;
              this.disposition_items = this.disposition_items.filter( item => !this.selectedDispositionItems.some( dispo => dispo == item));
            })
            .catch(error => {
              console.error("Error fetching disposition data:", error);
            });
        },
        searchVendor(event){
          const getVendor = event.target.value
          this.$http.secured
          .get(`/api/v1/vendor_masters?search=${getVendor}`)
          .then(response => {
            this.vendor_data = response.data.vendor_masters;
          })
          .catch(error => {
            console.error("Error fetching disposition data:", error);
          });
        },
        removeSelectedItem(fieldName,index) {
          if(fieldName == 'brand_select'){
            this.brand_items.push(this.selectedBrandItems[index]);
            this.selectedBrandItems.splice(index,1);
          } else if(fieldName == 'category_select'){
            this.category_items.push(this.selectedCategoryItems[index]);
            this.selectedCategoryItems.splice(index,1);
          } else if(fieldName == 'article_id_select'){
            this.articleId_items.push(this.selectedArticleIdItems[index]);
            this.selectedArticleIdItems.splice(index,1);
          } else if(fieldName == 'disposition_select'){
            this.disposition_items.push(this.selectedDispositionItems[index]);
            this.selectedDispositionItems.splice(index,1);
          } else if(fieldName == 'search_id_names_select'){
            this.search_id_names_items.push(this.selectednameItems[index]);
            this.selectednameItems.splice(index,1);
          }  else if(fieldName == 'add_assignees'){
            const removedItem = this.assigneeselectitems.splice(index, 1)[0];
            this.filteredAssignees.push(removedItem);
          }  
        },
        filterListOfButtons() {
          document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
          this.locationAs = '';
          this.sort_items = '';
          this.excess = '';
          this.status_filter='';
          this.search_tag = '';
          this.filterDetails = true;
            this.$http.secured
            .get('/api/v1/physical_inspections')
            .then(response => {
              if (response.data) {
                // this.filter_status = response.data.physical_inspections;
              } else {
                this.showAlert("error", "No Data Found");
                this.loading = false;
              }
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
            });
            this.$http.secured
            .get('/api/v1/issue_inventories/get_filter_locations')
            .then(response => {
              if (response.data) {
                this.locationAs_filter = response.data;
                // this.sort_filter = response.data.issue_inventories;
                // this.excess_filter = response.data.issue_inventories.map(item => item.status);
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
        debitnotesubmit(){
          const selected_id = this.selected.map(item => item.id)
          const dataToSendBase = {
            ids: selected_id,
            status: "Write Off",
          };
          let dataToSend;
          if (this.showDebitNote && this.showWithoutDebitNote) {
            dataToSend = { ...dataToSendBase };
          } else if (this.showDebitNote) {
            let vendorCodeArray;
            if (Array.isArray(this.vendor_code)) {
              vendorCodeArray = this.vendor_code.map(item => item.vendor_code);
            } else {
              vendorCodeArray = [this.vendor_code.vendor_code];
            }
            const vendorCode = vendorCodeArray.join(', ');
            dataToSend = {
              ids: selected_id,
              status: "Write Off",
              vendor_code: vendorCode,
              claim_amount: this.debit_amount,
            };
          } else if (this.showWithoutDebitNote) {
            dataToSend = {
              ids: selected_id,
              status: "Write Off",
            };
          } else {
            this.showAlert("error", "Please select at least one checkbox");
            return;
          }

          this.$http.secured
            .post('/api/v1/issue_inventories/update_status', dataToSend)
            .then(response => {
              if (response.data) {
                this.successpopup = true;
                this.successmessage = response.data.message;
                this.vendor_code = [];
                this.debit_amount = '';
                this.showDebitNote = '';
                this.showWithoutDebitNote = '';
              } else {
                this.showAlert("error", "No Data Found");
              }
              this.loading = false;
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
            });
        },
        closeeriteoff(){
          this.writeoffpopup = false;
          this.showDebitNote = false;
          this.showWithoutDebitNote= false;
        },
        correctexcess(){
          const selected_ids = this.selected.map(item => item.id)
          const params = {
            ids: selected_ids
          }
          this.$http.secured.post('/api/v1/issue_inventories/correct_excess', params )
            .then(response => {
              if (response.data) {
                this.successpopup = true;
                this.successmessage = response.data.message;
              } else {
                this.showAlert("error", "No Data Found");
              }
              this.loading = false;
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
            });
        },
        writeon(){
          const selected_ids = this.selected.map(item => item.id)
          const params = {
            status: 'Write on',
            ids: selected_ids
          }
          this.$http.secured.post('/api/v1/issue_inventories/update_status',params)
            .then(response => {
              if (response.data) {
                this.successpopup = true;
                this.successmessage = response.data.message;
              } else {
                this.showAlert("error", "No Data Found");
              }
              this.loading = false;
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
            });
        },
        validatePrice() {
          const cleanedPrice = this.debit_amount.replace(/[^\d.]/g, '');
          if (
            !/^[1-9]\d*(\.\d{0,2})?$/.test(cleanedPrice) || 
            cleanedPrice !== this.debit_amount || 
            parseFloat(cleanedPrice) === 0.0 
          ) {
            this.priceErrorMessages = ['Please enter a valid amount greater than zero.'];
          } else {
            this.priceErrorMessages = [];
          }

          this.debit_amount = cleanedPrice;
        },
        // create request dropdown data getting
        makeLoadingFalse(){
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        },
        //  pagination params
        getRequestParams(page, pageSize) {
          let params = {};
          if (page) {
            params["page"] = page;
          }
          if (pageSize) {
            params["size"] = pageSize;
          }
          return params;
        },
         // To handle the page change
        handlePageChange(value) {
            this.page = value;
            if (this.active_tab == 'Request Tracker') {
                this.requestData();
            } else if (this.active_tab == 'Item Issue') {
                this.itemissues();
            }
        },

        //  To handle the page size change
        handlePageSizeChange(size) {
            this.pageSize = size;
            this.page = 1
            if (this.active_tab == 'Request Tracker') {
                this.requestData();
            } else if (this.active_tab == 'Item Issue') {
                this.itemissues();
            }
        },
        popupPageSizeChange (size){
          this.popuppageSize = size;
          this.popuppage = 1
          this.linkPopupInReqTracker(this.itemStore);
        },
        popupPageChange(value) {
            this.popuppage = value;
            this.linkPopupInReqTracker(this.itemStore);
        },









    },
}
</script>

<style scoped>
  .filter_style{
      max-width: 300px;
      margin-bottom: 28px;
      min-height: 56px;
  }
  .v-dialog__content:has(.filter-repair){
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
}
  .search_style{
      max-width: 300px;
  }
  .addeditems{
    display: flex;
    float: left;
    padding: 4px;
    border: 1px solid #9e9e9e;
    border-radius: 10px;
    margin: 0px 4px 4px 0px;
  }
  .closeitems{
    width: 15px !important;
    height: 15px !important;
    margin-top: 4px;
    margin-left: 3px;
  }
  .status-items{
    font-size:14px;
    font-weight: 600;
    color: #9c9c9c;
  }
  .item-selected{
    margin-top: 23px;
    position: absolute;
    left: 41%;
  }
</style>