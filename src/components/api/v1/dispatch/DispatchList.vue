<template>
  <v-card class="overflow-hidden">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <!-- Markdown Dispatch Detail Dialog Begins -->

    <v-row justify="center">
        <v-dialog v-model="deleteBeamLotConfirmDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>  Are you sure want delete the lot? </span><br>  
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="deleteBeamLotSubmitFn(selected_lot_item_id)" :disabled="number > 0">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
        <v-dialog v-model="deleteItemConfirmPopUp" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>  Are you sure want delete the Item from Lot? </span><br>  
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopupEditItemDelete">Cancel</v-btn>
            <v-btn small color="primary" @click="deleteItem()" :disabled="number > 0">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
        <v-dialog v-model="editItemDialog" persistent max-width="600px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Provide Adjustment Amount</span><br>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="12">
                  <v-text-field hide-details label="Adjustment Amount" outlined v-model="adjustment_amount" type="number" min=1 @keypress="onlyNumber"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="12">
                  <v-text-field hide-details label="Adjustment Reason" outlined v-model="adjustment_reason" type="text"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="UpdateAdjusmentAmount()">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Markdown Destination Detail Dialog Begins ==================================================--->
    <v-row justify="center">
      <v-dialog v-model="editLotDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-form ref="destinationForm">
            <v-card-title>
              <span class="inc-title">Edit Dispatch Lot</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="2">
                    <b>Vendor Code:</b>
                  </v-col>
                  <v-col cols="2">
                    <b>{{selected_lot.vendor_code}}</b>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <b>Lot Name:</b>
                  </v-col>
                  <v-col cols="2">
                    <b>{{selected_lot.lot_name}}</b>
                  </v-col>
                </v-row>
                <v-row v-if="(selected_lot.lot_type == 'Beam Lot' || selected_lot.lot_type == 'Email Lot')">
                  <v-col cols="2">
                    <b>Winner Amount:</b>
                  </v-col>
                  <v-col cols="2">
                    <b>{{selected_lot.winner_amount - selected_lot.adjustment_amount}}</b>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-file-input v-model="files" outlined small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
                    <v-btn v-if="currentUser.roles.includes('central_admin') && (selected_lot.lot_type == 'Beam Lot' || selected_lot.lot_type == 'Email Lot')"  @click="openEditItemConfirm()" class="ma-2" color="primary">Adjust Amount</v-btn>
                  </v-col>
                </v-row>

                <b>Items Summary:</b><br>
                <v-flex style="overflow: auto">
                  <div >
                    <v-data-table
                      :dense="true"
                      :headers="edit_headers"
                      :items="edit_items"
                      :item-key="item_key"
                      class="elevation-1"
                      :custom-sort="customSort"
                      :loading="loading"
                      disable-pagination
                      :hide-default-footer="true"
                      loading-text="Loading Data... Please wait"
                      >
                      <template v-slot:item.delete="{ item }">
                        <img v-if="currentUser.roles.includes('central_admin')" src="@/assets/images/Delete_Icon.png" @click="openDeleteItemConfirm(item)"/>
                      </template>
                    </v-data-table>

                  </div>
                </v-flex>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-layout align-end>
                  <v-spacer></v-spacer>
                  <v-btn small color="primary" @click="editLotConfirm()">Save & Close</v-btn>
                  <v-btn class="mr-2" small color="normal" @click="closePopup">CANCEL</v-btn>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Markdown Destination Dialog Ends --------------------------------------------------------------->
    <!-- View Summary Dialog -->
    <v-row justify="center">
      <v-dialog v-model="viewSummaryDialog" persistent max-width="900px">
        <v-card class="v-card-100">
          <v-card-text class="pa-0">
          <GradeSummary ref="grade" :title="selected_inv.article_description" :summarydata = "selected_inv.grade_summary" :packagingImages = "packagingImages" :physicalImages="physicalImages" @summaryClose="viewSummaryDialogClose()"/>            
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- View Summary Dialog -->
    <!-- Markdown Screen -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Markdown</div> -->
        <div> <HeaderComponent :headerTitle="headerText" /></div>    
    <!-- Header -->
    <!-- Header -->
    <v-card-title>
      <v-row>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <!-- Data Table Begins ------------------------------>
    <v-layout column> 
      <v-flex md6 style="overflow: auto">
        <div >
          <v-data-table
            :dense="true"
            :headers="headers"
            :items="all_dispatch_items"
            :item-key="item_key"
            class="elevation-1"
            :custom-sort="customSort"
            :loading="loading"
            disable-pagination
            :hide-default-footer="true"
            loading-text="Loading Data... Please wait"
            >
            <template v-slot:item.pending_initiation_action="{ item }">
<!--               <img v-if="currentUser.roles.includes('central_admin') && item.lot_type == 'Beam Lot'" src="@/assets/images/edit.png" @click="openLotEditDialog(item)"/>
              <img v-if="currentUser.roles.includes('central_admin') && item.lot_type == 'Email Lot'" src="@/assets/images/edit.png" @click="openEmailLotEditDialog(item)"/> -->

              <img v-if="currentUser.roles.includes('central_admin')" src="@/assets/images/edit.png" @click="openLotEditLot(item)"/>

              <img v-if="currentUser.roles.includes('central_admin')" src="@/assets/images/Delete_Icon.png" @click="deleteBeamLotConfirmationPopupOpen(item.id)"/>
            </template>
            <template v-slot:item.grade_summary="{ item }">
              <div class="my-2">
                <v-btn text small color="primary" @click="viewSummaryDialogOpen(item)">View Summary</v-btn>
              </div>
            </template>
            <template v-slot:item.alert_level="{ item }">
              <v-chip
                v-if="item.alert_level"
                class="ma-2 justify-center"
                small
                label
                :color="getColor(item.alert_level)"
                style = "min-width:80px;"
                dark
              >{{ item.alert_level }}</v-chip>
            </template>
            <template v-slot:item.alert_level="{ item }">
              <v-chip
                v-if="item.alert_level"
                class="ma-2 justify-center"
                small
                label
                :color="getColor(item.alert_level)"
                style = "min-width:80px;"
                dark
              >{{ item.alert_level }}</v-chip>
            </template>
          </v-data-table>

        </div>
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
    <!-- Data Table Ends -->
  </v-card>
</template>

<script>
  import GradeSummary from '.././gradesummary/gradeSummary'
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {
        headerText: "Dispatch",       
        item_key: 'item_id',
        all_dispatch_items: [],
        destination_markdowns: [],
        dispatch_markdowns: [],
        selected_destination_markdown: '',
        selected_dispatch_markdown: [],
        markdownDestinationDialog: false,
        markdownDispatchDialog: false,
        markdownOrderDialog: false,
        viewSummaryDialog:false,
        files: [],
        selected_lot: '',
        selected_inv: '',
        destination_remark: '',
        destination: '',
        vendor_code: '',
        order_number: null,
        alert: false,
        alert_type: "success",
        item: '',
        alert_message: "success",
        singleSelect: false,
        selected: [],
        search: "",
        loading: false,
        physicalImages: [],
        packagingImages: [],
        page: 1,
        totalPages: 1,
        pageSize: 20,
        pageSizes: [20, 50, 100],
        currentUser: {},
        editItemDialog: false,
        adjustment_reason: '',
        adjustment_amount: '',
        // button disabled after click button
        number: 0,
        headers: [
          { text: "Lot Name", align: "start",  value: "lot_name"},
          { text: "Lot Id", value: "lot_id" },
          { text: "Lot Type", value: "lot_type" },
          { text: "Status", value: "status" },
          { text: "Action", value: "pending_initiation_action" , sortable: false},
        ],

        edit_items: [],
        edit_headers: [
          { text: "Item ID", align: "start",  value: "tag_number"},
          { text: "Article Description", value: "item_description" },
          { text: "Source", value: "source" },
          { text: "", value: "delete" , sortable: false},
        ],
        alert_value: '',
        alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}],
        deleteBeamLotConfirmDialog: false,
        selected_lot_item_id: '',
        editLotDialog: false,
        deleteItemConfirmPopUp: false,
        selected_item: ''
      };
    },
    components: {
      GradeSummary, 
      HeaderComponent
    },
    created() {
      this.currentUser = this.$store.state.currentUser
      this.getDispatchItems()
    },
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },


      deleteBeamLotConfirmationPopupOpen(selected_lot_item_id) {
        this.number = 0;
        this.selected_lot_item_id = selected_lot_item_id
        this.deleteBeamLotConfirmDialog = true;
      },

      // cancel popup in edit and delete item
      closePopupEditItemDelete(){
             this.deleteItemConfirmPopUp = false
         },

      closePopup(){
        this.selected_lot_item_id = ''
        this.deleteBeamLotConfirmDialog = false;
        this.editLotDialog = false
        this.selected_lot = ''
        this.adjustment_amount = ''
        this.adjustment_reason = ''
        this.files = []
        this.selected = []
        this.edit_items  = []
        this.deleteItemConfirmPopUp = false
        this.editItemDialog = false
        this.selected_item = ''
      },

      deleteBeamLotSubmitFn(selected_lot_item_id) {
        this.number++;
        const formData = new FormData();
        formData.append("id", selected_lot_item_id)
        this.$http.secured
          .post("/api/v1/warehouse/wms/pick/cancel_lot", formData)
          .then(response => {
            if (response.data) {
              this.showAlert("success", "Lot Deleted");
              this.selected_lot_item_id = [];
              this.deleteBeamLotConfirmDialog = false;
              this.getDispatchItems()
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      },


      UpdateAdjusmentAmount(){
        if (this.adjustment_amount == '' || this.adjustment_reason == ''){
          this.showAlert("error", "Please Provide Adjustment Amount and Reason");
          return
        }
        const formData = new FormData();
        formData.append("id", this.selected_lot.lot_id)
        formData.append("adjustment_reason", this.adjustment_reason)
        formData.append("adjustment_amount", this.adjustment_amount)
        this.$http.secured
          .post("/api/v1/warehouse/wms/pick/adjust_amount", formData)
          .then(response => {
            if (response.data) {
              this.showAlert("success", "Adjustment Amount Updated");
              this.selected_lot = ''
              this.editItemDialog = false;
              this.adjustment_reason = ''
              this.adjustment_amount = ''
              this.closePopup()
              this.getDispatchItems()
              
            } else {
              this.showAlert("error", "Something went wrong");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });

      },

      getRequestParams( page, pageSize) {
        let params = {};


        if (page) {
          params["page"] = page;
        }

        if (pageSize) {
          params["size"] = pageSize;
        }

        return params;
      },

      handlePageChange(value) {
        this.page = value;
        this.getDispatchItems()
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.getDispatchItems()
      },

      getDispatchItems() { 
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.loading = true
        this.$http.secured.get('/api/v1/warehouse/wms/pick/fetch_orders', {params: {page: params['page'], per_page: params['size'], dispatch: true}})
        .then(response => {
          this.all_dispatch_items = []
          this.all_dispatch_items = response.data.warehouse_orders
          this.totalPages =  response.data.meta.total_pages
          this.loading = false
        })
        .catch(error => this.showAlert("error", "Error in fetching dispatch Items"))
      },

      openLotEditDialog(item){
        this.$store.commit("setSelectedLot", { lot:  item , action: 'edit_lot'});
        this.$router.push({ name: "ImagesList"});
      },

      openEmailLotEditDialog(item){
        this.$store.commit("setSelectedLot", { lot:  item , action: 'edit_email_lot'});
        this.$router.push({ name: "ImagesList"});
      },

      viewSummaryDialogOpen(item){
        this.selected_inv = item
        var functional_images = item.grade_summary.physical_image_annotations
        for(var i=0; i < functional_images.length; i++){
          if (!this.physicalImages.includes(functional_images[i]["src"])){
            this.physicalImages.push(functional_images[i]["src"])
          }
        }

        var packaging_images = item.grade_summary.packaging_image_annotations
        for(var i=0; i < packaging_images.length; i++){
          if (!this.packagingImages.includes(packaging_images[i]["src"])){
            this.packagingImages.push(packaging_images[i]["src"])
          }
        }
        this.viewSummaryDialog = true;
      },
      viewSummaryDialogClose(){
        this.physicalImages = []
        this.packagingImages = []
        this.viewSummaryDialog = false
      },

      openLotEditLot(item){
        this.selected_lot = item
        this.edit_items = this.selected_lot.warehouse_order_items
        this.editLotDialog = true
      },

      onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
          $event.preventDefault();
        }
      },


      editLotConfirm(){
        if (this.files.length <= 0 ){
          this.showAlert('error', "Please Select Files")
          this.closePopup()
          return
        }
        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }
        formData.append('order_id', this.selected_lot.id)

        this.$http.secured
          .post("/api/v1/warehouse/wms/pick/edit_lot", formData)
          .then(response => {
            if (response.data) {
              this.showAlert("success", "Lot Updated");
              this.closePopup()
              this.getDispatchItems()
            } else {
              this.showAlert("error", response.errors.message);
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });

      },


      openDeleteItemConfirm(item){
        this.number=0;
        this.selected_item = item
        this.deleteItemConfirmPopUp = true
      },

      openEditItemConfirm(item){
        this.selected_item = item
        this.editItemDialog = true
      },

      deleteItem(){
        this.number++;
        const formData = new FormData();
        formData.append('item_id', this.selected_item.id)

        this.$http.secured
          .post("/api/v1/warehouse/wms/pick/remove_item_from_lot", formData)
          .then(response => {
            if (response.data == "success") {
              this.showAlert("success", "Item Deleted");
              this.closePopup()
              this.getDispatchItems()
            } 
            else if (response.data == "status_error") {
              this.showAlert("error", "This item has been already dispatched");
            }
            else {
              this.showAlert("error", response.errors.message);
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });

      },

      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      getColor(calories) {
        if (calories == "High") return "red";
        else if (calories == "Medium") return "orange";
        else if (calories == "Low") return "green";
      },

      searchItem(){
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );

        if (this.search.length != 0){
          this.$http.secured.get('/api/v1/warehouse/wms/pick/fetch_orders', {params: {page: params['page'], per_page: params['size'], search: this.search, dispatch: true}})
          .then(response => {
            this.all_dispatch_items = []
            this.all_dispatch_items = response.data.warehouse_orders
            this.totalPages =  response.data.meta.total_pages
          })
          .catch(error => this.showAlert("error", "Error in fetching Order"))
        }else {
          this.field_type = ''
          this.get_markdown()
        }

      },
      customSort: function(items, index, isDesc) {
        items.sort((a, b) => {
            if (index[0]=='pending_destination_ageing' || index[0]=='pending_dispatch_ageing') {
              if (!isDesc[0]) {
                  return (parseInt(b.ageing_dispatch.split(' ')[0])) - parseInt(a.ageing_dispatch.split(' ')[0])
              } else {
                  return (parseInt(a.ageing_dispatch.split(' ')[0])) - parseInt(b.ageing_dispatch.split(' ')[0])
              }
            }
            else {
              if(typeof a[index] !== 'undefined'){
                if (!isDesc[0]) {
                   return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
                }
                else {
                    return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
                }
              }
            }
        });
        return items;
      }
     },
  }
</script>
<style>
  .v-card {
    max-width: 98% !important;
  }

  .v-card-100 {
    max-width: 100% !important;
  }
  .inc-title{
    color: #172B4D;
    font-size: 20px;
  }
  .gray-border{
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  .cursor-pointer:hover {
    cursor: pointer;
  }
</style>