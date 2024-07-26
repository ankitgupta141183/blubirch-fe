<template>
  <v-card class="overflow-hidden v-card v-sheet theme-light">
    <!-- alert messsage -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <headerComponent :headerTitle="headerText"></headerComponent>

    <!-- Header -->
    <v-card class="v-card-100">
      <v-tabs v-model="tab_index">
        <v-tab style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')" v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>

      <!-- search, filter, Action buttons -->
      <v-card-title style="padding: 12px 20px 0px 20px;">
        <!-- Search fields -->
        <v-row>
          <v-col cols="8" sm="8">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 200px;" outlined v-on:keyup.enter="loadData(active_tab)" ></v-text-field>
          </v-col>
        </v-row>

        <!-- Actions buttons -->
        <v-card-actions style="margin-bottom: 28px;">
          <v-menu offset-y v-if="active_tab == 'To Be Cannibalized'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-on="on" v-bind="attrs" class="mr-4" :disabled="selected.length==0">
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
          <v-menu offset-y v-if="active_tab == 'Cannibalized'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-on="on" v-bind="attrs" class="mr-4" :disabled="selected.length==0">
                CHANGE DISPOSITION
                <v-icon dark>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in change_disposition" :key="index" @click="askToBeCannibalized(item)">
                <v-list-item-title>{{ item.original_code }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
            
        <!-- Filter -->
        <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
          <v-expansion-panel outlined @click="filterListOfButtons" >
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

      <!-- Table Data -->
      <v-layout column>
        <v-flex md6 style="overflow : auto">
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

      <!-- Pagination and Number of selected item -->
      <div>
        <v-row class="ml-2">
          <v-col cols="4" sm="1" class="PaddingItemPerPage">
            <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
            @change="handlePageSizeChange"></v-select>
          </v-col>
          <span class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="4" class="PaddingItemPerPage">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
          </v-col>
        </v-row>
      </div>

      <!-- filter data popup -->
      <v-row justify="center">
        <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="1232px">
          <v-card style="max-width: 100% !important;">
            <v-card-actions>
              <v-text-field prepend-inner-icon="mdi-magnify" v-model="tag_id_search"  label="Tag Id" class="ma-2" outlined></v-text-field>
              <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id_search"  label="Article Id" class="ma-2" outlined></v-text-field>
              <v-combobox v-model="selected_cond" :items="condition_list" item-text="name" item-value="id" label="Condition"  outlined class="ma-2" > </v-combobox>
              <v-combobox v-model="selected_uom" :items="uom_list" item-text="name" item-value="id" label="UOM"  outlined class="ma-2" v-if="active_tab == 'Work In Progress' || active_tab == 'Cannibalized'"> </v-combobox>
              <v-combobox v-model="selected_article_type" :items="articleType_list" item-text="name" item-value="id" label="Article Type"  outlined class="ma-2" v-if="active_tab == 'Work In Progress' || active_tab == 'Cannibalized'"> </v-combobox>
              <v-combobox v-model="selected_article" :items="articleType_list1" item-text="name" item-value="id" label="Article Type"  outlined class="ma-2" v-if="active_tab == 'To Be Cannibalized'"> </v-combobox>
            </v-card-actions>
            <v-card-actions class="margin-10">
              <v-spacer></v-spacer>
              <v-btn small outlined color="primary" class="btn-cancel" @click="filterPopup = false">CANCEL</v-btn>
              <v-btn small color="primary" @click="ApplyFilterFunc">APPLY FILTER(S)</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Change Disposition, To Be Cannibalized  confirm and success Popup -->
      <v-row justify="center">
        <v-dialog v-model="toBeDisposition" persistent max-width="424px">
          <v-card class="v-card-100 pa-2">
            <v-card-title style="padding: 0px 0px 32px;">
              <v-spacer></v-spacer>
              <v-btn icon @click="toBeDisposition = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span> Are you sure want to move this item to {{ dispos_action.original_code }} ? </span>
            </v-card-text>
            <v-card-actions center class="mt-2">
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" class="cancel-color mb-3" @click="toBeDisposition = false">Cancel</v-btn>   
              <v-btn color="primary" class="mb-3" @click="changeDispos()">Confirm</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="canniDisposition" persistent max-width="424px">
          <v-card class="v-card-100 pa-2">
            <v-card-title style="padding: 0px 0px 32px;">
              <v-spacer></v-spacer>
              <v-btn icon @click="canniDisposition = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span> Are you sure want to move this item to {{ dispos_action.original_code }} ? </span>
            </v-card-text>
            <v-card-actions center class="mt-2">
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" class="cancel-color mb-3" @click="canniDisposition = false">Cancel</v-btn>
              <v-btn color="primary" class="mb-3" @click="callToBeCannibalized">Confirm</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="openPopUp" persistent max-width="424px">
          <v-card class="v-card-100 pa-2">
            <v-card-title style="padding: 0px 0px 32px;">
              <v-spacer></v-spacer>
              <v-btn icon @click="openPopUp = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span>{{ message }}</span>
            </v-card-text>
            <v-card-actions center class="mt-2">
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" class="cancel-color mb-3" @click="openPopUp = false">Cancel</v-btn>
              <v-btn color="primary" class="mb-3" @click ="loadData(active_tab)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
  </v-card>
</template>
<script>
  import HeaderComponent from './../../../../commoncomponents/HeaderComponent';
  export default {
    components : {
      HeaderComponent,
    },
    data() {
      return {
        headerText : "Cannibalization",
        tab_index: 0,
        alert_type : 'success',
        alert : false,
        alert_message : '',
        tabs : ["To Be Cannibalized", "Work In Progress", "Cannibalized"],
        active_tab : '',
        openPopUp : false,
        popUpType : '',
        dispos_action : '',
        filterPopup : false,
        search_tag: '',
        change_disposition_list : [],
        selected_article_type : '',
        selected_article:'',
        selected_cond : '',
        tag_id_search : '',
        article_id_search : '',
        articleType_list1 :[
          {
            "name":"Finished Goods",
            "id": "Finished Goods"
          },
          {
            "name":"Semi Finished Goods",
            "id": "Semi-finished Goods"
          }
        ],
        condition_list : [
          {
            "name":"Damaged",
            "id": "Damaged"
          },
          {
            "name":"Good",
            "id": "Good"
          }
        ],
        articleType_list : [
          {
            "name":"Finished Goods",
            "id": "Finished Goods"
          },
          {
            "name":"Semi Finished Goods",
            "id": "Semi-finished Goods"
          },
          {
            "name":"Spares & Parts",
            "id": "Spares & Parts"
          },
          {
            "name":"Packaging Material",
            "id": "Packaging Material"
          }
        ],
        selected : [],
        loading : false,
        headers : [],
        table_data : [],
        search  : '',
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        message : '',
        selected_uom:[],
        uom_list:[
          {
            "name":"Number",
            "id": "Number"
          },
          {
            "name":"Liter",
            "id": "Liter"
          },
          {
            "name":"Kilogram",
            "id": "Kilogram"
          }
        ],
        change_disposition:[],
        canniDisposition : false,
        toBeDisposition: false,
      }
    },
    async created(){
      this.scrollToTop();
      this.loadData('To Be Cannibalized');
    },
    methods : {
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
      loadData(tab,tab_action){
        if(tab_action == 'tab_clicked'){
          this.search_tag = '';
        }
        this.loading = true;
        this.openPopUp = false;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if(tab == 'To Be Cannibalized'){
          this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value:"tag_id"},
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "item_description" },
            { text: "Quantity", value: "quantity"},
            { text: "UOM", value: "uom"},
            { text: "Condition", value: "condition"},
            { text: "Ageing (Days)", value: "ageing"},
            { text: "Article Type", value: "article_type"},
          ],
          this.fetchToBeCannibalized();
          this.getDisposition();
        } else if(tab == 'Work In Progress'){
          this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value:"tag_id"},
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "item_description" },
            { text: "Ageing", value: "ageing"},
            { text: "Quantity", value: "quantity"},
            { text: "UOM", value: "uom"},
            { text: "Condition", value: "condition"},
            { text: "Article Type", value: "article_type"},
          ],
          this.fetchWIP();
        } else {
          this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value:"tag_id"},
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "item_description" },
            { text: "Ageing", value: "ageing"},
            { text: "Quantity", value: "quantity"},
            { text: "UOM", value: "uom"},
            { text: "Condition", value: "condition"},
            { text: "Article Type", value: "article_type"},
          ],
          this.fetchCannibalized();
          this.getDispositioncannib();
        }
      },
      fetchToBeCannibalized(){
        const searchArray = this.search_tag && typeof this.search_tag === 'string'
        ? this.search_tag.split(',').map(value => value.trim())
        : []; 
        const params = {
          search_text:searchArray,
          page: this.page,
          per_page: this.pageSize,
        };
        this.$http.secured
          .get("api/v2/warehouse/cannibalization/to_be_cannibalized", { params : params } )
            .then(response => {
            if (response.data) {
              this.table_data = response.data.cannibalizations
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
      fetchWIP(){
        const searchArray = this.search_tag && typeof this.search_tag === 'string'
        ? this.search_tag.split(',').map(value => value.trim())
        : []; 
        const params = {
          search_text: searchArray,
          page: this.page,
          per_page: this.pageSize,
        };
        this.$http.secured
          .get("/api/v2/warehouse/cannibalization/work_in_progress", { params : params } )
            .then(response => {
            if (response.data) {
              this.table_data = response.data.cannibalizations
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
      fetchCannibalized(){
        const searchArray = this.search_tag && typeof this.search_tag === 'string'
        ? this.search_tag.split(',').map(value => value.trim())
        : []; 
        const params = {
          search_text: searchArray,
          page: this.page,
          per_page: this.pageSize,
        };
        this.$http.secured
          .get("/api/v2/warehouse/cannibalization/cannibalized", { params : params } )
            .then(response => {
            if (response.data) {
              this.table_data = response.data.cannibalizations
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
      getDisposition(){
        this.$http.secured
          .get(`/api/v2/warehouse/cannibalization/to_be_cannibalized/get_dispositions`)
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
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
      },
      getDispositioncannib(){
        this.$http.secured
          .get(`/api/v2/warehouse/cannibalization/cannibalized/get_dispositions`)
            .then(response => {
            if (response.data) {
              this.change_disposition = response.data.dispositions
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
      changeDisposition(item){
        this.toBeDisposition = true;
        this.dispos_action = item;
      },
      askToBeCannibalized(item){
        this.canniDisposition = true;
        this.dispos_action = item;
      },
      callToBeCannibalized(){
        const ItemId = this.selected.map(item => item.id)
        const dispositionId = this.dispos_action.id
        const requestData = {
          cannibalization: {
              ids: [ItemId] 
          },
          disposition_id: dispositionId
        };
        this.$http.secured
          .post(`/api/v2/warehouse/cannibalization/cannibalized/change_disposition`, requestData)
          .then(response => {
              if (response.data) {
                  this.canniDisposition = false;
                  this.openPopUp = true;
                  this.message = response.data.message;
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
      changeDispos(item){
        const ItemId = this.selected.map(item => item.id)
        const dispositionId = this.dispos_action.id
        const requestData = {
            cannibalization: {
                ids: [ItemId] 
            },
            disposition_id: dispositionId
        };
        this.$http.secured
          .post(`/api/v2/warehouse/cannibalization/to_be_cannibalized/change_disposition`, requestData)
          .then(response => {
              if (response.data) {
                  this.toBeDisposition = false;
                  this.openPopUp = true;
                  this.message = response.data.message;
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
      filterListOfButtons(){
        this.filterPopup = true;
        this.selected_article_type = '';
        this.selected_article = '';
        this.selected_cond = '';
        this.tag_id_search = '';
        this.article_id_search = '';
        this.search_tag = '';
        this.selected_uom = '';
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 35).toString() + 'px');
      },
      ApplyFilterFunc(){
        this.filterPopup = false;
        if(this.active_tab == "To Be Cannibalized"){
          const requestData = {
            "filter":{
              tag_id: this.tag_id_search,
              article_id: this.article_id_search,
              condition: this.selected_cond.id,
              article_type : this.selected_article.id
            }
          };
          this.$http.secured
          .post(`/api/v2/warehouse/cannibalization/to_be_cannibalized`, requestData )
              .then(response => {
              if (response.data) {
                  this.table_data = response.data.cannibalizations
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
        } else if(this.active_tab == 'Work In Progress'){
          const requestData = {
            "filter":{
              tag_id: this.tag_id_search,
              article_id: this.article_id_search,
              condition: this.selected_cond.id,
              article_type : this.selected_article_type.id,
              uom : this.selected_uom.id
            }
          };
          this.$http.secured
          .post(`/api/v2/warehouse/cannibalization/work_in_progress`, requestData )
              .then(response => {
              if (response.data) {
                  this.table_data = response.data.cannibalizations
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
        }else if(this.active_tab == 'Cannibalized'){
          const requestData = {
            "filter":{
              tag_id: this.tag_id_search,
              article_id: this.article_id_search,
              condition: this.selected_cond.id,
              article_type : this.selected_article_type.id,
              uom : this.selected_uom.id
            }
          };
          this.$http.secured
          .post(`/api/v2/warehouse/cannibalization/cannibalized`, requestData )
              .then(response => {
              if (response.data) {
                  this.table_data = response.data.cannibalizations
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
        }
      },
      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'To Be Cannibalized') {
          this.fetchToBeCannibalized();
        }else if(this.active_tab == ''){
          this.fetchWIP();
        } else {
          this.fetchCannibalized();
        }
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'To Be Cannibalized') {
          this.fetchToBeCannibalized();
        }else if(this.active_tab == ''){
          this.fetchWIP();
        } else {
          this.fetchCannibalized();
        }
      },
    },
  }
</script>
<style scoped>
.v-dialog__content:has(.filter-data){
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
  left: -40px;
  top: 13rem;
}
.custom-control_outlined button {
  min-height: 56px;
  border-width: 1px;
  border-color: rgba(0,0,0,.42);
  border-style: solid;
}
.item-selected{
  margin-top: 23px;
  position: absolute;
  left: 41%;
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