<template>
  <v-card class="overflow-hidden">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <v-row justify="center">
            <v-dialog v-model="LotDetailsDialog" persistent max-width="1000px">
                <v-form ref="updateLotForm">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <v-container>
                                <span>Lot Details</span>
                            </v-container>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="4" md="12">
                                        <v-text-field hide-details label="Lot Name" outlined readonly v-model="selected_lot_name" type="text"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="4" md="12">
                                        <v-text-field hide-details label="Lot Description" outlined readonly v-model="selected_lot_desc" type="text"></v-text-field>
                                    </v-col>
                                </v-row>
    
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <span class="lot_sub_header">  Bid Winner Details </span>
                                    </v-col>
                                </v-row>
    
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <!--  <v-text-field :rules="inputRules" hide-details label="Winner Code" outlined v-model="winner_code" type="text"></v-text-field>-->
                                         <v-autocomplete 
                                         v-model="winner_code"
                                         :items="winner_code_list"                                         
                                         outlined
                                         chips
                                         label="Search/Select Winner Code*"  
                                         :rules="inputRules"     
                                         prepend-inner-icon="mdi-magnify">                                            
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                         <v-text-field :rules="inputRules" hide-details label="Winner Amount (INR)" outlined v-model="winner_amount" type="number"></v-text-field> 
                                        
                                    </v-col>
                                </v-row>
    
    
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-flex>
                                            <v-select :rules="inputRules" @change="changePaymentStatus" hide-details :items="payment_status_menu_items" v-model="payment_status" color="primary" label="Payment Status" outlined></v-select>
                                        </v-flex>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field :rules="payment_status == '' || payment_status =='Full Payment Received' ? [] : partial_rules" :disabled="payment_status == '' || payment_status =='Full Payment Received'"  hide-details label="Amount received (INR)" outlined v-model="amount_received" type="number"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <span class="lot_sub_header"> Dispatch Details  </span> <span>(Select Full Payment Received to change Dispatch Details) </span>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" sm="4" md="4" style="margin-top:20px;">
                                        <span>  Is it Dispatch Ready? </span>
                                    </v-col>
                                    <v-col cols="6" sm="4" md="6">
                                        <v-radio-group v-model="dispatch_status" row>
                                            <v-radio :disabled="payment_status == '' || payment_status =='Partial Payment'" v-for="n in  ['Yes','No']" :key="n" :label="`${n}`" :value="n"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-container> 
                                <v-layout align-end>
                                    <span class="down_load">Download Manifest</span>
                                     <v-spacer></v-spacer>
                                     <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
                                    <v-btn small text color="normal" @click="deleteLotConfirmationPopupOpen">Delete Lot</v-btn>
                                    <v-btn small color="primary" @click="LotDetailSubmitFn">Confirm</v-btn>
                                </v-layout> 
                            </v-container>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>
        </v-row>
    <v-row justify="center">
            <v-dialog v-model="createLotDialog" persistent max-width="1000px">
                <v-form ref="createLotForm">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>B2B - Email Auction  </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="4" md="12">
                                        <v-text-field :rules="inputRules" hide-details label="Lot Name" outlined v-model="lot_name" type="text"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="4" md="12">
                                        <v-text-field :rules="inputRules" hide-details label="Lot Description" outlined v-model="lot_desc" type="text"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field readonly hide-details label="MRP (INR)" outlined v-model="lot_mrp" type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field readonly hide-details label="Expected Price(INR)" outlined v-model="lot_expected_price" type="number"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                      <v-text-field outlined hide-details
                                                        v-model="end_date"
                                                        label="End Date"
                                                        prepend-inner-icon="event"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on" 
                                                        :rules="inputRules"
                                                      ></v-text-field>
                                            </template>
                                    <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="end_date" no-title scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(end_date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                              </v-col>
                          </v-row>
                          <v-row>
                          <v-col cols="12" sm="4" md="12" >
                           <v-flex>
                            <v-autocomplete label="Search/Select Vendor Code*" multiple :rules="inputRules" chips outlined v-model="vendor_code" :items="vendor_code_menu_items" item-text="vendor_code_name" item-value="vendor_code"   prepend-inner-icon="mdi-magnify">
                            <template v-slot:selection="data">
                                <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="remove(data.item)">
                                    {{ data.item.vendor_code }}
                                </v-chip>
                            </template>
                          </v-autocomplete>
                             
                             </v-flex>
                          </v-col>                            
                        </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
                        <v-btn small color="primary" @click="sendLotCreationFn">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
                 </v-form>
            </v-dialog>
        </v-row>

         <v-row justify="center">
            <v-dialog v-model="deleteLotConfirmDialog" persistent max-width="450px">
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
                        <v-btn small color="primary" @click="deleteLotSubmitFn">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab style="text-transform:none!important;" @click="loadData(tab)" v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title>
  
      <v-text-field v-if="active_tab == 'Pending Dispatch'" prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
      <v-spacer></v-spacer>
      <input id="fileUpload" type="file" ref="inputFile" @input="setUploadingFile()" hidden />
      <v-card-actions>
        <v-flex xs12 d-flex mr-2>
            <v-select v-if="active_tab == 'Pending E-Waste'" :items="alert_item" v-model="alert_value" item-value="value" item-text="name"  label="Select Alert Level" outlined @change="FilterWithAlert()"></v-select>
        </v-flex>
        <v-flex xs12 d-flex>
         <!--  <v-btn small color="primary" @click="download_btn">DOWNLOAD</v-btn> -->
         <v-btn v-if="active_tab == 'Pending E-Waste'" @click="create_lot_dialog_open" class="ma-2" color="primary">CREATE LOT</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card-title>
    <!-- Data Table Begins -->
    <v-layout column>
        <v-app-bar v-if="active_tab == 'Pending E-Waste'" flat dense hide-details height="30" class="select_all">
            <v-checkbox
              v-model="select_all_inventory"
              label="Select All"
              hide-details
              class="label-custom d-inline pa-2"
              @change="select_all_inv_btn">
           </v-checkbox>
        </v-app-bar>
      <v-spacer></v-spacer>
      <v-flex md6 style="overflow: auto">
       <hot-table ref="eWasteHotTableComponent"  v-if="active_tab == 'Pending E-Waste'" :settings="hotSettings">    
        </hot-table>
        <div>
          <v-data-table
            v-if="active_tab == 'Pending Dispatch'"
            :dense="true"
            :headers="lot_status_headers"
            :items="lot_status_data"
            :search="search"
            item-key="id"
            class="elevation-1"
            :custom-sort="customSort"
            :loading="loading"
            disable-pagination
            :hide-default-footer="true"
            loading-text="Loading Data... Please wait"
          >
            <template v-slot:item.action="{ item }">
              <img @click="LotDetailDialogOpen(item)" src="@/assets/images/job_sheet.png" title=" " />
            </template>

            <template v-slot:item.start_date="{ item }">
              {{ format_date(item.start_date) }}
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
    <div v-if="active_tab == 'Pending Dispatch'" class="float-right">
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
import { HotTable, HotColumn } from '@handsontable/vue';
import Handsontable from 'handsontable';
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import moment from 'moment'

export default {
  data() {
    return {
      headerText: "E-Waste",
      tabs: [
                "Pending E-Waste", 
                "Pending Dispatch",
            ],
      alert: false,
      alert_type: "success",
      alert_message: "success",
      active_tab:"Pending E-Waste", 
      selected: [],
      search: "",
      loading: false,
      all_ewaste: [],
      original_table_data:[], 
      selectedforLot:[],
      inputRules: [v => !!v || "The field is required"],
      selected_inv: '',
      lot_mrp: "",
      lot_desc: "",
      lot_name: "",
      end_date: "",
      vendor_code: [],
      menu:"",
      vendor_code_menu_items:[],
      lot_expected_price:"",
      exptected_price_chk:true,
      lot_status_data:[],
      lot_status_headers: [
                { text: "Lot Name", value: "lot_name" },
                { text: "Quantity", value: "quantity" },
                { text: "Amount (₹)", value: "order_amount" },
                { text: "Publish Date", value: "start_date" },
                { text: "Status", value: "status" },
                { text: "Aging", value: "lot_ageing" },
                { text: "Alert Level", value: "alert_level" },
                { text: "Action", value: "action" },
            ],
      createLotDialog: false,
      LotDetailsDialog: false, 
      payment_status_menu_items: ['Partial Payment', 'Full Payment Received'],
      selected_lot_name: "",
      selected_lot_desc: "",
      winner_code: "",
      winner_amount: "",
      payment_status: "",
      amount_received: "",
      amount_received_backup:0,
      dispatch_status: "",
      deleteLotConfirmDialog:false,
      winner_code_list:[],
      select_all_inventory: false,
      afterSelection: (r, c) => {
        var data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(r);
      },
      afterDeselect: (r, c) => {
        var data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(r);
      },
      afterChange: this.afterChangeVue,
      selectedLotCount: 0,
      hotSettings: {
                data: [],
                width:'100%',
                height:'70vh',
                disableVisualSelection: true,
                afterGetColHeader: this.setEditHeader, 
                rowHeaders: false,
                stretchH: 'all',
                filters: true,
                dropdownMenu: ['filter_by_condition','filter_by_value', 'filter_action_bar', ],
                formulas: true,
                outsideClickDeselects: false,
                licenseKey: 'non-commercial-and-evaluation', 
                columns: [{
                        data: "select",
                        type: 'checkbox',
                        // title: "Select",
                        className: "htLeft",
                    },
                    {
                        data: "location",
                        type: 'text',
                        title: "Site Location",
                        readOnly: true,
                        className: "htLeft",
                    },
                    {
                        data: "item_type",
                        type: 'text',
                        title: "Class Description",
                        readOnly: true,
                        className: "htLeft",
                    }, {
                        data: "brand",
                        type: 'text',
                        title: "Brand",
                        readOnly: true,
                        className: "htLeft",
                    }, {
                        data: "sku_code",
                        type: 'text',
                        title: "Article ID",
                        readOnly: true,
                        className: "htLeft",
                    }, {
                        data: "item_description",
                        type: 'text',
                        title: "Article Description",
                        readOnly: true,
                        className: "htLeft",
                    }, {
                        data: "serial_no",
                        type: 'text',
                        title: "Serial Number",
                        readOnly: true,
                        className: "htLeft",
                    }, {
                        data: "grade",
                        type: 'text',
                        title: "Grade",
                        readOnly: true,
                        className: "htLeft",
                    },{
                        data: "sales_price",
                        type: 'numeric',
                        title: '<i class="fa fa-pencil"></i> Expected Price(₹)',

                        renderer: this.yellowRenderer,
                        class: "editable",
                        className: "htLeft",
                        allowInvalid: false
                    },{
                        data: "alert_level",
                        type: 'text',
                        title: 'Alert Level',
                        className: "htLeft",
                        readOnly: true,
                        allowInvalid: false
                    }
                ],
                contextMenu: [],
                afterSelection: (r, c) => {
                    var data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(r);

                },
                afterDeselect: (r, c) => {
                    var data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(r);

                },
                afterChange: this.afterChangeVue,
                page: 1,
                totalPages: 1,
                pageSize: 100,
                pageSizes: [100, 200, 500],
                alert_value: '',
                alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}]
            },
    };
  },
  components: {
    HeaderComponent,
    HotTable,
    HotColumn,
  },
   computed: {       
        partial_rules () { 
        return [
            () => (parseInt(this.amount_received) < parseInt(this.winner_amount)) || 'should not be greater than or equal to winner amount',
            v => !!v || 'The field is required',
            v => (v > 0) || 'Should be greater than zero' 
            ];
        }
    },
  created() {
    //  this.get_distribution_center();
    this.get_E_waste();
    this.get_e_waste_vendor();
    this.getLotStatusData();
  },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },

    FilterWithAlert(){
      this.get_E_waste();
    },

    changePaymentStatus(){ 
             if(this.payment_status == 'Full Payment Received' ){
                    this.amount_received_backup = this.amount_received
                    this.amount_received = 0;
             }else{
                 this.amount_received = this.amount_received_backup
             } 
    },
    format_date(value){
          if (value) {
          return moment(String(value)).format('DD/MM/YYYY')
          }
      },
    setEditHeader(col, TH) {
            
            if (col === 0) {
                TH.innerHTML = ""
            }
            if (col === 10) {
              // TH.className = 'col_header'
                // TH.innerHTML = TH.innerHTML + "<div class='editable'> <i class='fa fa-pencil'></i> Expected Price(INR) </div>"
            }
    },
    remove(item) {
            const index = this.vendor_code.indexOf(item.vendor_code)
            if (index >= 0) this.vendor_code.splice(index, 1)
    },
    create_lot_dialog_open() {
            if (this.selectedforLot.length) {
                this.exptected_price_chk = true;
                this.lot_name = "";
                this.lot_desc = "";
                this.lot_mrp = 0;
                this.lot_expected_price = 0;
                this.end_date = "";
                this.vendor_code = "";
                this.selectedforLot.filter((ele) => {
                    if(!ele.sales_price || ele.sales_price == 0 || ele.sales_price == "" || ele.sales_price === null){
                            this.exptected_price_chk = false;
                    }else{
                        this.lot_mrp += parseInt(ele.mrp)
                        this.lot_expected_price += parseInt(ele.sales_price)
                    } 
                });

                if (this.exptected_price_chk){
                    this.createLotDialog = true;
                } else {
                    this.showAlert("error", "Please enter expected price for selected Inventries");   
                }                           
                
            } else {
                this.showAlert(
                    "error",
                    "Please select Inventories"
                );
            }
        },
        deleteLotSubmitFn() {
            const formData = new FormData();
            formData.append("id", this.selected_inv.id)
            this.$http.secured
                .post("/api/v1/warehouse/e_waste_orders/delete_lot", formData)
                .then(response => {
                    if (response.data) {
                        this.showAlert("success", "Lot Deleted");
                        this.deleteLotConfirmDialog = false;
                        this.getLotStatusData();
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
                });
            this.deleteLotConfirmDialog = false;
            this.LotDetailsDialog = false;

        },
        deleteLotConfirmationPopupOpen() {
            this.deleteLotConfirmDialog = true;
        },
        LotDetailSubmitFn() {
            if (this.active_tab == "Pending Dispatch" && this.$refs.updateLotForm.validate()) {
                this.winner_code;
                this.winner_amount;
                this.payment_status;
                this.amount_received;
                this.dispatch_status;
                this.selected_inv.id
                if (this.dispatch_status == "Yes"){
                    this.dispatch_status = true
                }else{
                    this.dispatch_status = false
                }

                const formData = new FormData();
                formData.append("id", this.selected_inv.id)
                formData.append("winner_code", this.winner_code)
                formData.append("winner_amount", this.winner_amount)
                formData.append("payment_status", this.payment_status)
                formData.append("amount_received", this.amount_received)
                formData.append("dispatch_status", this.dispatch_status)

                if (this.payment_status == "Full Payment Received") {
                    if (this.dispatch_status) {
                        formData.append("lot_status", "Dispatch Ready")
                    } else {
                        formData.append("lot_status", "Full Payment Received")
                    }
                } else {
                    formData.append("lot_status", "Partial Payment")
                }
                this.$http.secured
                    .post("/api/v1/warehouse/e_waste_orders/update_lot_status", formData)
                    .then(response => {
                        if (response.data) {

                            this.showAlert("success", "Lot Detail Update Successfully");
                            this.createLotDialog = false;
                            this.getLotStatusData();
                            this.winner_code = "";
                            this.winner_amount = "";
                            this.payment_status = "";
                            this.amount_received = "";
                            this.dispatch_status = "";
                        } else {
                            this.showAlert("error", "No Data Found");
                        }
                    })
                    .catch(error => {
                        this.showAlert("error", "Something went wrong from Network" + error);
                    });
                this.LotDetailsDialog = false;
            }
        },
        LotDetailDialogOpen(item) {
            this.LotDetailsDialog = true;
            this.$refs.updateLotForm.resetValidation()
            this.selected_inv = item
            this.selected_lot_name = item.lot_name;
            this.selected_lot_desc = item.lot_desc; 

            this.winner_code = item.winner_code;
            this.winner_amount = item.winner_amount;
            this.payment_status = item.payment_status;
            this.amount_received = item.amount_received;
            if (this.payment_status == "Full Payment Received"){
                this.dispatch_status = item.dispatch_ready;               
            }else{
                this.dispatch_status = ""
            }
            this.get_winner_code(item.id)            
            
        },
        yellowRenderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.color = 'green';
        },
        afterChangeVue(changes, source) {
            if (changes) {
                var column_index = changes[0][0];
                var column_name = changes[0][1]
                var old_value = changes[0][2]
                var new_value = changes[0][3]

                if (!column_name && new_value) {
                    var source_data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(column_index);
                    this.selectedforLot.push(source_data)
                }else if(!column_name && old_value){
                    var remove_source_data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(column_index).id;
                    this.selectedforLot = this.selectedforLot.filter((item) => item.id != remove_source_data);
                }else {
                    if (source && new_value && source == "edit" && old_value != new_value && changes[0][3] != undefined) {
                        if(!isNaN(new_value)){
                            var data_id = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(column_index).id
                            const formData2 = new FormData();
                            formData2.append("id", data_id)
                            formData2.append("column_name", column_name)
                            formData2.append("column_value", new_value)

                            this.$http.secured
                                .post("/api/v1/warehouse/e_wastes/update_ewaste_cell", formData2)
                                .then(response => {
                                    if (response.data) {
                                        this.showAlert("success", "Expected price Updated");
                                         this.selectedforLot.filter((ele) => {
                                                if(ele.id == data_id ){
                                                    ele.sales_price = new_value;
                                                } 
                                        });
                                    } else {
                                        this.showAlert("error", "No Data Found");
                                    }
                                })
                                .catch(error => {
                                    this.showAlert("error", "Something went wrong from Network" + error);
                                });
                        }
                    }
                }
            }
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
          this.getLotStatusData()
        },

        handlePageSizeChange(size) {
          this.pageSize = size;
          this.page = 1;
          this.getLotStatusData();
        },
        getLotStatusData() {
            this.loading = true;
            const params = this.getRequestParams(
              this.page,
              this.pageSize
            );
            this.$http.secured
                .get("/api/v1/warehouse/e_waste_orders", {params: {page: params['page'], per_page: params['size']}})
                .then(response => {
                    if (response.data) {
                         this.lot_status_data = response.data.e_waste_orders.filter(
                            x => x.status != "Dispatched")

                        this.loading = false;
                        this.totalPages =  response.data.meta.total_pages
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
        sendLotCreationFn() {
            if (this.active_tab == "Pending E-Waste" && this.$refs.createLotForm.validate()) {
                const formData = new FormData();
                formData.append("lot_name", this.lot_name)
                formData.append("lot_mrp", this.lot_mrp)
                formData.append("lot_desc", this.lot_desc)
                formData.append("lot_expected_price", this.lot_expected_price)
                formData.append("end_date", this.end_date)
                // formData.append("vendor_code", this.vendor_code)

                for (var i = 0; i < this.vendor_code.length; i++) {
                    formData.append("vendor_code[]", this.vendor_code[i]);
                }

                for (var i = 0; i < this.selectedforLot.length; i++) {
                    formData.append("ewaste_obj[]", this.selectedforLot[i].id);
                }

                this.$http.secured
                    .post("/api/v1/warehouse/e_waste_orders/create_lot", formData)
                    .then(response => {
                        if (response) {
                            this.showAlert("success", "Lot Created For Selected Inventory");
                            this.createLotDialog = false;
                            this.selectedforLot = [];
                            this.get_E_waste()
                            
                        } else {
                            this.showAlert("error", "No Data Found");
                        }                         
                    })
                    .catch(error => {
                        this.showAlert("error", "Something went wrong from Network" + error);
                    });  
            }
      }, 
      get_E_waste() {
        this.loading = true;
        this.$http.secured
          .get("/api/v1/warehouse/e_wastes/fetch_e_wastes", {params: {criticality: this.alert_value}})
          .then((response) => { 
            this.original_table_data = response.data.e_wastes;
            this.all_ewaste = this.original_table_data.filter(
                              x => x.status == "Pending E-Waste")
            this.$refs.eWasteHotTableComponent.hotInstance.loadData(this.all_ewaste)
          //  this.setData();
          })
          .catch((error) =>
            this.showAlert("error", "Error in fetching E-waste")
          );
      },
      closePopup() {
            this.lot_name = "";
            this.lot_desc = "";
            this.lot_mrp = "";
            this.lot_expected_price = "";
            this.end_date = "";
            this.vendor_code = "";

            this.winner_code = "";
            this.winner_amount = "";
            this.payment_status = "";
            this.amount_received = "";
            this.dispatch_status = "";

              this.createLotDialog = false;
              this.LotDetailsDialog = false;
              this.deleteLotConfirmDialog = false;
      },
      download_btn() {
        this.$http.secured
          .get("/api/v1/warehouse/e_wastes/generate_csv")
          .then((response) => {
            if (response.data) {
              this.showAlert("success", "Email has been sent successfully");
              //this.$toast.success('Email has been sent successfully')
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch((error) => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      setUploadingFile() {
        this.file = this.$refs.inputFile.files[0];
        const formData = new FormData();
        formData.append("file", this.$refs.inputFile.files[0]);
        if (this.file.type == "text/csv"){
          this.$http.secured
              .post("/api/v1/warehouse/e_waste_file_uploads", formData)
            .then((response) => {
              this.showAlert("success", "E-waste File Imported Successfully");
            })
            .catch((error) =>
              this.$toast.error("Error in importing Attribute Master file")
            );
        }
        else{
          this.showAlert("error", "The file-type doesn't belong to text/csv");
        }
      },
      upload_btn() {
        document.getElementById("fileUpload").click();
      },

      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },
      loadData(tab) {
              this.selected = [];
              this.active_tab = tab;
              this.search = ""; 
              if(this.active_tab == "Pending Dispatch"){
                 this.getLotStatusData();
              }else{
                this.get_E_waste()
              }
      },
      get_e_waste_vendor() {
              this.$http.secured.get("/api/v1/warehouse/e_wastes/get_vendor_ewaste")
                  .then(response => {
                    this.vendor_code_menu_items = response.data.vendor_masters
                  })
                  .catch(error => {
                      this.showAlert("error", "Something went wrong from Network" + error);
                      this.loading = false;
                  });
      },
      get_winner_code(id) {
            const formData = new FormData();
            formData.append("id", id)
            this.$http.secured.post("/api/v1/warehouse/e_waste_orders/winner_code_list",formData)
                .then(response => {
                    if (response.data) {                         
                        this.winner_code_list =  response.data;
                    } 
                })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
                    this.loading = false;
                });
        },

        select_all_inv_btn(){
          if (this.select_all_inventory){
            this.select_all()
          }else{
            this.un_select_all()
          }
        },
        select_all(){
          this.selectedLotCount   = 0;
          var hot = this.$refs.eWasteHotTableComponent.hotInstance
          hot.unlisten();
          let notTrimmed = hot.rowIndexMapper.getNotTrimmedIndexes()
          var source_data = this.all_ewaste
            for (var i = 0; i <= notTrimmed.length - 1; i++) {
              source_data[notTrimmed[i]].select = true;
              this.selectedLotCount++;
            }
          hot.render();
          hot.listen();
        },
        un_select_all(){
          this.select_all_inventory = false;
          var hot = this.$refs.eWasteHotTableComponent.hotInstance
          hot.unlisten();
          var source_data = this.all_ewaste
          
          for (var i = 0; i <= this.all_ewaste.length - 1; i++) {
            source_data[i].select = false;
          }
          this.selectedLotCount = 0;
          hot.render();
          hot.listen();
        },

    afterChangeVue(changes, source) {
        if (changes) {
            var column_index = changes[0][0];
            var column_name = changes[0][1]
            var old_value = changes[0][2]
            var new_value = changes[0][3]

              // this.selectedforLot = []
              // this.selectedData   = 0

            if (column_name == "select" && new_value && !old_value) {
                var source_data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(column_index);
                this.selectedforLot.push(source_data)
                this.selectedData = this.selectedData + 1
            }else if(column_name == "select" && old_value && !new_value){

                var remove_source_data = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(column_index).id;
                this.selectedforLot = this.selectedforLot.filter((item) => item.id != remove_source_data);
                this.selectedData = this.selectedData - 1

            }else {

                if (source && new_value && source == "edit" && old_value != new_value && changes[0][3] != undefined && column_name !="select") {
                   if(!isNaN(new_value)){
                        var data_id = this.$refs.eWasteHotTableComponent.hotInstance.getSourceDataAtRow(column_index).id
                        const formData2 = new FormData();
                        formData2.append("id", data_id)
                        formData2.append("column_name", column_name)
                        formData2.append("column_value", new_value)

                        this.$http.secured
                            .post("/api/v1/warehouse/liquidations/update_liquidation_cell", formData2)
                            .then(response => {
                                if (response.data) {
                                    this.showAlert("success", "Expected price Updated");
                                    // this.swapHotData(this.active_tab)
                                    // this.$refs.eWasteHotTableComponent.hotInstance.setSourceDataAtCell(column_index,"sales_price",new_value)
                                    this.selectedforLot.filter((ele) => {
                                            if(ele.id == data_id ){
                                                ele.sales_price = new_value;
                                            } 
                                    });
                                } else {
                                    this.showAlert("error", "No Data Found");
                                }
                            })
                            .catch(error => {
                                this.showAlert("error", "Something went wrong from Network" + error);
                            });
                   }else{
                        this.showAlert("error", "Please Enter the correct Expected Price");
                   }
                }
            }
        }
    },

    getColor(calories) {
      if (calories == "High") return "red";
      else if (calories == "Medium") return "orange";
      else if (calories == "Low") return "green";
    },
    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
          if (index[0]=='lot_ageing') {
            if (!isDesc[0]) {
                return (parseInt(b.lot_ageing.split(' ')[0])) - parseInt(a.lot_ageing.split(' ')[0])
            } else {
                return (parseInt(a.lot_ageing.split(' ')[0])) - parseInt(b.lot_ageing.split(' ')[0])
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
};
</script>
<style src="handsontable/dist/handsontable.full.css"></style>
<style>

.custom_pencil {
    width: 3px;
    height: 9px;
    background: green;    
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    position: absolute; 
    left: 7px;
    top: 6px; 
}
.custom_pencil::before {
  content: "" ;
  position: absolute ;
  width: 3px ;
  height: 3px ;
  background: green ;
  top: -13px ;
}
.custom_pencil::after {
    content: "";
    position: absolute;
    width: 3px;
    height: 3px;
    background: green;
    left: 0px;
    bottom: -4px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

/* .v-card {
  max-width: 98% !important;
} */

.v-card-100 {
  max-width: 100% !important;
}
.inc-title {
  color: #172b4d;
  font-size: 20px;
}
.gray-border {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.cursor-pointer:hover {
  cursor: pointer;
}
.handsontable td {
    padding: 4px 4px 4px 4px;
}

.handsontable th {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6) !important;
}

.handsontable th,
.handsontable td {
    
    font-size: 14px;
    font-family: Roboto, sans-serif;
    color: #212529;
}

.lot_sub_header {
    color: #000;
    font-size: 16px;
    font-weight: 500;
}

.editable {}
 

.col_header {
    text-align: left !important;
}
.down_load{
    color: #0357D0;
    font-weight: 500;
    font-size: 14px;
}

.fa-pencil:before {
    content: "\F040" !important;
    font-family: FontAwesome !important;
    font-weight: 300;
}

.select_all{border-top: 1px solid #cccccc!important;background: #f0f0f0!important;}
  .cp{cursor: pointer;}

</style>