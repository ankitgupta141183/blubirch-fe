<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
      <!-- alert message -->
      <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
      </div>
      <!-- alert message end -->
      <!-- header -->
      <div>
        <HeaderComponent :headerTitle="headerText" />
      </div>
      <!-- header end -->
      <!-- action buttons and search -->
      <v-card-title style="padding: 28px;">
        <v-row>
          <!-- search type -->
          <v-autocomplete class="mr-4" v-model="field_type" :items="Array.isArray(field_item) ? field_item : []" item-value="value" style="max-width: 150px;" item-text="name" label="Select Field" outlined></v-autocomplete >
          <!--search field  -->
          <v-text-field prepend-inner-icon="mdi-magnify"  v-model="inward_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="getData()"></v-text-field>
          <v-spacer></v-spacer> 
          <!-- action buttons -->
          <v-card-actions style="margin-bottom: 28px;">
            <v-btn class="ma-2" color="primary" @click="generateGrn" :disabled="(this.selected.length == 0)">Generate GRN</v-btn>
          </v-card-actions>
        </v-row>
      </v-card-title>
      <!-- action buttons and search end -->
      <!-- table  -->
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
            <template   #[`item.qty_not_inwarded`]="{ item }">
              <a @click="itemDetails(item)" style="color: #1976d2;">
                <u> {{ item.qty_not_inwarded }}</u>
              </a>
            </template>
            <template   #[`item.inward_reference_document_number`]="{ item }">
              <a @click="IrdDetails(item)" style="color: #1976d2;">
                <u> {{ item.inward_reference_document_number }}</u>
              </a>
            </template>
            </v-data-table> 
        </v-flex>
      </v-layout>
      <!-- table end -->
      <!-- pagination display -->
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
      <!-- popups -->
      <v-row justify="center">
        <v-dialog v-model="viewDetailsPopup" persistent max-width="800px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Items Not Inwarded</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="viewDetailsPopup = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-data-table
                  :dense="true"
                  :search="search"
                  v-model="ItemSelected"
                  :headers="viewDetailsHeader"
                  :items="view_details"
                  :loading="loading"
                  loading-text="Loading Data... Please wait"
                  class="elevation-1" >
                  <template #[`item.box_number`]="{ item }">
                    {{ item.box_number || 'N/A' }}
                  </template>
                  <template #[`item.tag_number`]="{ item }">
                    {{ item.tag_number || 'N/A' }}
                  </template>
                  <template #[`item.inward_reference_document_number`]>
                    {{  Item_Ird || 'N/A' }}
                  </template>
                  </v-data-table> 
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- ird Details Popup -->
      <v-row justify="center">
        <v-dialog v-model="IrdDetailsPopup" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span class="ml-4">{{ IrdNo }}</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="IrdDetailsPopup = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
            <v-card-text>
              <v-container>
                <div class="itemPopUp">
                  <v-row>
                    <v-col cols="6">
                      <span style="font-weight: 500;">Created At</span>
                    </v-col>
                    <v-col cols="6">
                      {{ item_details_popup.created_at ? item_details_popup.created_at : 'N/A'}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" >
                      <span style="font-weight: 500;">Quantity</span>
                    </v-col>
                    <v-col cols="6">
                      {{ item_details_popup.quantity ? item_details_popup.quantity : 'N/A'}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" >
                      <span style="font-weight: 500;">Quantity Inwarded</span>
                    </v-col>
                    <v-col cols="6">
                      {{ item_details_popup.qty_inwarded }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" >
                      <span style="font-weight: 500;">Quantity Not Inwarded</span>
                    </v-col>
                    <v-col cols="6">
                      {{ item_details_popup.qty_not_inwarded ? item_details_popup.qty_not_inwarded : 'N/A'}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <span style="font-weight: 500;">Inward Reason Reference Document Type</span>
                    </v-col>
                    <v-col cols="6">
                      {{ popup_item_info.inward_reason_reference_document_type ? popup_item_info.inward_reason_reference_document_type : 'N/A'}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" >
                      <span style="font-weight: 500;">Inward Reason Reference Document Number</span>
                    </v-col>
                    <v-col cols="6">
                      {{ popup_item_info.inward_reason_reference_document_number ? popup_item_info.inward_reason_reference_document_number : 'N/A'}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" >
                      <span style="font-weight: 500;">Consignee Reference Document Number</span>
                    </v-col>
                    <v-col cols="6">
                      {{ popup_item_info.consignee_reference_document_number ? popup_item_info.consignee_reference_document_number : 'N/A'}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" >
                      <span style="font-weight: 500;">Vendor Reference Document Number</span>
                    </v-col>
                    <v-col cols="6">
                      {{ popup_item_info.vendor_reference_document_number ? popup_item_info.vendor_reference_document_number : 'N/A'}}
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
          <v-dialog v-model="successPopup" persistent max-width="424px">
          <v-card class="v-card-100 pa-2">
              <v-card-title>
                  <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="text-center">
                   <span > {{message}} </span>
              </v-card-text>
              <v-card-actions center>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="mb-3" @click="closePopup">Ok</v-btn>
                  <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
          </v-dialog>
      </v-row>
      <v-row justify="center">
          <v-dialog v-model="warningPopup" persistent max-width="424px">
          <v-card class="v-card-100 pa-2">
              <v-card-title>
                  <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="text-center">
                  <div><span><v-icon color="red" class="icon-size">mdi-alert</v-icon></span></div>
                  <span > {{message}} </span>
              </v-card-text>
              <v-card-actions center>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="mb-3" @click="warningPopup = false">NO</v-btn>
                  <v-btn color="primary" class="mb-3" @click="ProceedItems">yes</v-btn>
                  <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
          </v-dialog>
      </v-row>
    </v-card>
  </template>
  <script>
    import HeaderComponent from "../../../commoncomponents/HeaderComponent.vue";
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
      data() {
        return {
          headerText: "Inward Tracking",
          alert: false,
          alert_type: "success",
          alert_message: "success",
          headers: [
            { text: "IRD No.", value: "inward_reference_document_number", sortable: false },
            { text: "Quantity", value: "quantity" },
            { text: "Quantity Inwarded", value: "qty_inwarded" },
            { text: "Quantity Not Inwarded", value: "qty_not_inwarded" },
          ],
          viewDetailsHeader:[
            { text: "IRD No.", value: "inward_reference_document_number", sortable: false },
            { text: "Box ID", value: "box_number" },
            { text: "Tag ID", value: "tag_number" },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "sku_description" },
            { text: "Qty", value: "quantity" },
          ],
          inward_search:'',
          field_type:[],
          field_item:[
          { value: 1, name: 'IRD' },
          ],
          selected: [],
          search:'',
          table_data:[],
          loading: false,
          page: 1,
          totalPages: [],
          pageSize: 100,
          pageSizes: [100, 200, 500],
          viewDetailsPopup: false,
          view_details:[],
          ItemSelected:[],
          IrdDetailsPopup: false,
          IrdNo:'',
          successPopup: false,
          message:'',
          warningPopup : false,
          item_details_popup:'',
          popup_item_info:'',
          initialWindowHeight: window.innerHeight,
        }
      },
      components: {
        HeaderComponent
      },
      mounted() {
        this.field_type = this.field_item.length > 0 ? this.field_item[0].value : null;
      },
      created() {
        this.loadData();
      },
      methods: {
        loadData() {
          this.inward_search = ''
          this.field_type = ''
          this.table_data = []
          this.page = 1
          this.totalPages = 1
          this.pageSize = 100
          this.getData();
        },
        getData(){
          const requestBody = {
            search: this.inward_search,
            page: this.page,
            per_page: this.pageSize
          };
          this.$http.secured
            .get('/api/v1/warehouse/inward_tracking', {params: requestBody})
            .then(response => {
                if (response.data) {
                  this.table_data = response.data.data;
                  this.totalPages = response.data.meta.total_pages;
                  this.loading = false;
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
        IrdDetails(item){
          this.item_details_popup = item
          this.IrdDetailsPopup = true;
          this.ids = item.id;
          this.IrdNo = item.inward_reference_document_number
          // this.getData();
          this.ItemAPi();
        },
        itemDetails(item) {
          this.viewDetailsPopup = true;
          this.ids = item.id;
          this.Item_Ird = item.inward_reference_document_number;
          this.ItemAPi();
        },
        ItemAPi(){
          this.$http.secured
          .get(`/api/v1/warehouse/inward_tracking/${this.ids}`)
          .then(response => {
            if (response.data) {
              this.view_details = response.data.prd.pending_inward_items;
              this.popup_item_info = response.data.prd
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
              alert('no data')
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
        },
        generateGrn(){
          const item_Ids = this.selected.map(x=> x.id);
          var dc = this.selected.map(x => x.qty_not_inwarded)
                  const unique = (value, index, self) => {
                      return self.indexOf(value) === index
                  }
                  dc = dc.filter(function (element) {
                      return element !== undefined;
                  });
              var unique_array = dc.filter(unique)
              if (unique_array == 0) {  
                this.$http.secured
                  .post("/api/v1/warehouse/inward_tracking/generate_grn", { "ids" : item_Ids} )
                      .then(response => {
                      if (response.data) {
                          this.message = response.data.message;
                          this.selected = []
                          this.successPopup = true;
                      } else {
                          this.showAlert("error", "No Data Found");
                      }
                  })
                      .catch(error => {
                          this.$toast.error(error.response.data.error)
                  });
              }else if(unique_array != 0){
                this.warningPopup = true;
                this.message = "Warning: Some items have not been inwarded and will be marked as short. Continue to generate GRN?"
              }
        },
        ProceedItems(){
          const item_Ids = this.selected.map(x=> x.id);
          this.$http.secured
            .post("/api/v1/warehouse/inward_tracking/generate_grn", { "ids" : item_Ids} )
              .then(response => {
                if (response.data) {
                  this.message = response.data.message;
                  this.warningPopup = false;
                  this.selected = []
                  this.successPopup = true;
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
              .catch(error => {
                this.$toast.error(error.response.data.error)
            });
        },
        closePopup(){
          this.successPopup = false;
          this.loadData();
        },
        handlePageSizeChange(){
          this.pageSize = size;
          this.page = 1
          this.loadData();    
        },
        handlePageChange(value) {
          this.page = value;
          this.loadData();
        },
      }
    }
  </script>
  <style scoped>
    .icon-size{
      font-size: 40px !important;
      margin-bottom: 20px;
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