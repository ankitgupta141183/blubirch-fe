<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <v-row justify="center">
      <v-dialog v-model="policyModel" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Please Select Policy</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-radio-group v-model="liquidation_policy">
                <v-radio
                  v-for="policy in policies"
                  :key="policy.id"
                  :label="policy.original_code"
                  :value="policy.id"
                ></v-radio>
              </v-radio-group>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="[policyModel=false, selectedDisposition='', selected = []]"
                >CLOSE</v-btn>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="sendForDisposition('confirm')"
                >CONFIRM</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Models Start-->
    <!-- Transfer popup -->
    <v-row justify="center">
      <v-dialog v-model="transferDialog" persistent max-width="600px">
        <v-card class="v-card-100">
          <v-form ref="form" @submit.prevent="sendForTransfer">
            <v-card-title>
              <span class="headline pp-title">Create Order</span>
            </v-card-title>
            <v-card-text>          
              <v-container>
               <v-row>
                <v-col cols="12" sm="12" md="12">
                   <v-text-field
                    v-model = 'order_name'
                    label="Order Name*"
                    :rules="validationRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                   <v-text-field
                    v-model = 'destination'
                    label="Destination*"
                    :rules="validationRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                   <v-text-field
                    v-model = 'amount'
                    label="Amount"
                    outlined
                    type="number"
                    :rules="validationRules"
                    required
                  ></v-text-field>
                </v-col>               
               </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="blue darken-1" :disabled="cancel_disable" text @click="transferDialog = false">CANCEL</v-btn>
              <v-btn small color="primary" :disabled="cancel_create" type="submit" >Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Update STN popup -->
    <v-row justify="center">
      <v-dialog v-model="stnDialog" persistent max-width="600px">
        <v-card class="v-card-100">
          <v-form ref="form" @submit.prevent="sendForUpdateStn">
            <v-card-title>
              <span class="headline pp-title">Update STN</span>
            </v-card-title>
            <v-card-text>          
              <v-container>
               <v-row>
                <v-col cols="12" sm="12" md="12">
                   <v-text-field
                    v-model = 'new_stn_number'
                    label="New STN Number*"
                    :rules="validationRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    solo
                    v-model = 'stn_remarks'
                    label="Add Remark*"
                    :rules="validationRules"
                    required
                  ></v-textarea>
                </v-col>
                <template>
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="Attachments"
              multiple
              placeholder="Select Attachments"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </template>

               </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="blue darken-1" :disabled="cancel_disable" text @click="stnDialog = false">CANCEL</v-btn>
              <v-btn small color="primary" :disabled="cancel_create" type="submit" >Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>



    <!-- return stock popup -->
    <v-row justify="center">
      <v-dialog v-model="returnStockDialog" persistent max-width="600px">
        <v-card class="v-card-100">
          
          <v-form ref="form" @submit.prevent="UpdateRsto">
            <v-card-title>
              <span class="headline pp-title">Update RSTO</span>
            </v-card-title>
            <v-card-text>   
              <v-container>
               <v-row>
                <v-col cols="6" sm="6" md="6">
                   <v-text-field
                    v-model = 'rsto_number'
                    label="RSTO Number*"
                    name="rsto_number"
                    :rules="validationRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                   <v-text-field
                    v-model = 'update_grn'
                    label="Enter GRN Number*"
                    name="update_grn"
                    :rules="validationRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    solo
                    v-model = 'rsto_remarks'
                    name="add_remark"
                    label="Add Remark*"
                    :rules="validationRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12">
          <template>
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="Attachments"
              multiple
              placeholder="Select Attachments"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </template>
              </v-col>
               </v-row>
              </v-container>
           <!--  </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="returnStockDialog = false">CANCEL</v-btn>
            <v-btn small color="primary" @click="UpdateRsto" :disabled="!valid">CONFIRM</v-btn>
          </v-card-actions> -->

          </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="blue darken-1" text :disabled="cancel_disable" @click="returnStockDialog = false">CANCEL</v-btn>
              <v-btn small color="primary" :disabled="cancel_create" type="submit" >CONFIRM</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- dispostion popup -->
    <v-row justify="center">
      <v-dialog v-model="dispostionDialog" persistent max-width="500px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline pp-title">Dispostion</span>
          </v-card-title>
          <v-card-text>
            <v-container>
             <v-row>
              <!-- todo -->
             </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="dispostionDialog = false">CANCEL</v-btn>
            <v-btn small color="primary" @click="">SAVE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- information popup -->
    <v-row justify="center">
      <v-dialog v-model="informationDialog" persistent max-width="800px">
        <v-card class="v-card-100">
          <v-card-title>
          <v-row>  
            <v-col class="ma-0 pa-0" xs8 :cols="8">{{article_description}}</v-col>
            <v-col class="ma-0 pa-0 cursor-pointer" xs4 :cols="4"><img class="pull-right" @click="informationDialog = false"
                  src="@/assets/images/icons/cross.svg"
                  title="Close"
                /></v-col>
          </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <template>
                <v-simple-table width="100%">
                  <template>
                    <tbody>
                      <tr>
                        <td><strong class="info-title">Article Description </strong> {{article_description}}</td>
                        <td><strong class="info-title">Brand </strong>{{brand}}</td>
                      </tr>
                      <tr>
                        <td><strong class="info-title">Article Id </strong> {{article_id}}</td>
                        <td><strong class="info-title">RPA Reason </strong> {{rpa_reason?rpa_reason:'NA'}}</td>
                      </tr>
                      <tr>
                        <td><strong class="info-title">Serial Number </strong> {{serial_number}}</td>
                        <td><strong class="info-title">Grade </strong> {{grade}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Models End-->

    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Pending Issue Resolution</div> -->
    <div><HeaderComponent :headerTitle="headerText" /></div>    
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab
          style="text-transform:none!important;"
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
      <v-spacer></v-spacer>
      <v-actions>
        <v-btn
          @click="stnDialogOpen(item)"
          class="ma-2"
          color="primary"
          :disabled="!isTranfer"
        >UPDATE STN</v-btn>

        <v-btn
          @click="transferDialogOpen(item)"
          v-if="active_tab == 'Inward'"
          class="ma-2"
          color="primary"
          :disabled="!isTranfer"
        >TRANSFER</v-btn>

        <!-- <v-btn
          @click="dispostionDialogOpen(item)"
          v-if="active_tab == 'Inward'"
          class="ma-2"
          color="primary"
        >DISPOSTION</v-btn> -->

        <v-btn
          @click="returnStockDialogOpen(item)"
          v-if="active_tab == 'Inward'"
          class="ma-2"
          color="primary"
          :disabled="!isReturn"
        >RETURN STOCK</v-btn>
          
      </v-actions>

      <v-autocomplete
        v-model="selectedDisposition"
        :items="dispositions"
        item-text="original_code"
        item-value="original_code"
        :disabled="!isDisposition"
        @change="sendForDisposition('')"
        label="SET DISPOSITION"
        style= "max-width: 300px;"
      ></v-autocomplete>
    </v-card-title>
    <v-layout column>

    <v-flex md6 style="overflow: auto"> 
      <v-data-table
        :dense="true"
        :search="search"
        v-model="selected"
        :headers="headers"
        :items="table_data"
        :loading="loading"
        disable-pagination
      :hide-default-footer="true"
        loading-text="Loading Data... Please wait"
        class="elevation-1"
      >
        <template v-slot:item.customcheck="{ item }">
          <input v-if="item.vendor_return_order_id == null " type="checkbox" :value="item" id="item.id" @change="assignvalue($event, item)" name="check" style="width: 18px; height: 18px; margin-top: 2px;">
          <!-- <v-checkbox v-if="item.vendor_return_order_id != '' " :value="item" @click = "($event)" hide-details /> -->
        </template>
        <template v-slot:item.info="{item}">
          <img @click="informationDialogOpen(item)"
            src="@/assets/images/ant-design_info-circle-outlined.svg"
            title="Information"
          />
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
  </v-card>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      // default vars start
      headerText: "Pending Issue Resolution",
      valid: false,            
      order_number: '',
      item_key: '',
      transferDialog: false,
      stnDialog: false,
      returnStockDialog: false,
      dispostionDialog: false,
      informationDialog: false,
      alert: false,
      alert_type: "success",
      alert_message: "success",
      active_tab: "Inward",
      destination:"",
      rsto_number:"",
      update_grn: "",
      rsto_remarks: "",
      order_name:"",
      first_select: "",
      isReturn: false,
      isTranfer: false,
      isDisposition: false,
      cancel_disable: false,
      cancel_create: false,
      loading: true,
      amount:"",
      stn_remarks:"",
      new_stn_number:"",
      files: [],
      validationRules: [],
      tabs: [
        "Inward",
        "Pick",
        "Pack",
        "Dispatch"
      ],
      selected: [],
      search: "",
      headers: [
        { text: "STN Number", value: "stn_number", width: '12%', align: "start", sortable: false},
        { text: "Issue Type", value: "issue_type", width: '10%' },
        { text: "Article Id", value: "sku_code", width: '10%' },
        { text: "Item Id", value: "tag_number", width: '10%' },
        { text: "Transferred To", value: "pending_issue_destination" },
        { text: "Transferred From", value: "pending_issue_source", width:'15%' },
        { text: "Aging", value: "pending_issue_aging", width: '10%' },
        { text: "", value: "info" },
      ],
      table_data: [],
      // default vars end
      // information popup var start
      article_description: '',
      article_id: '',
      serial_number: '',
      brand: '',
      rpa_reason: '',
      grade: '',
      dispositions: [],
      selectedDisposition: '',
      policies: [],
      policyModel: false,
      liquidation_policy: '',
      page: 1,
      totalPages: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      // information popup var end
    };
  },
  created() {
    this.loadData('Inward')
    this.getDispositions();
    this.getPolicy();
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
    loadData(tab) {
      this.selected = [];
      this.active_tab = tab;
      this.search = '';
      const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
      if (tab == "Inward") {
        this.headers = [
          
          {text: "", value: "customcheck", width: "3%"},
          {
            text: "STN Number",
            value: "stn_number",
            align: "start",
            sortable: false,
            width: "12%"
          },
          { text: "Issue Type", value: "issue_type", width: "10%"},
          { text: "Article Id", value: "sku_code", width: "10%" },
          { text: "Item Id", value: "tag_number", width: "10%" },
          { text: "Transferred To", value: "pending_issue_destination" },
          { text: "Transferred From", value: "pending_issue_source", width: "15%"  },
          { text: "Ageing", value: "pending_issue_aging", width: "10%" },
          { text: "", value: "info" },
        ];


      securedAxiosInstance.get('/api/v1/warehouse/inventories/pending_issues',{params: {page: params['page'], per_page: params['size']}})
        .then(response => {
                            this.table_data = response.data.inventories
                            this.loading = false;
                            this.totalPages =  response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in retrieving vendors'))
      }if(tab == 'Pick'){
        this.table_data = [];
        //todo
      }if(tab == 'Pack'){
        this.table_data = [];
        //todo
      }if(tab == 'Dispatch'){
        this.table_data = [];
        //todo
      }
    },

    transferDialogOpen(item) {
      if (this.selected.length <= 0) {
      this.showAlert('warning', 'Please Select Item First')
      return
    }
    this.validationRules = [];
    this.destination = "";
    this.order_name = "";
    this.amount = "";
    this.transferDialog = true;
    this.order_number   = '821334573';
    },

    stnDialogOpen(item) {
        if (this.selected.length <= 0) {
        this.showAlert('warning', 'Please Select Item First')
        return
      }
      this.validationRules = [];
      this.destination = "";
      this.order_name = "";
      this.amount = "";
      this.stnDialog = true;
    },

    dispostionDialogOpen(item){
      this.dispostionDialog = true;
    },
    returnStockDialogOpen(item){
          this.rsto_remarks = "";
          this.rsto_number = "";
          this.update_grn = "";
          this.validationRules = [];
          this.files = []
          if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Item First')
          return
          }
      this.returnStockDialog = true;

    },
    informationDialogOpen(item){
      this.informationDialog   = true;
      this.article_description = item.item_description;
      this.article_id          = item.sku_code;
      this.serial_number       = item.serial_number;
      this.brand               = item.details.brand;
      this.rpa_reason          = item.return_reason;
      this.grade               = item.grade;
    },
    getDispositions(){
      this.$http.secured.get("/api/v1/warehouse/inventories/get_dispositions")
        .then(response => {
          if (response.data) {
            this.dispositions = response.data.dispositions
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        })

    },
    sendForDisposition(action){
      var item = this.selectedDisposition
      if (this.selected.length <= 0) {
        this.showAlert("warning", "Please Select Item First");
        return;
      }

      if (action == 'confirm' && this.liquidation_policy == ''){
        this.$toast.error('Please Select Policy')
        return
      }else{
        this.policyModel = false
      }

      if (item == 'Liquidation' && action != 'confirm'){
        this.policyModel = true
        return
      }
      securedAxiosInstance.post('/api/v1/warehouse/stock_transfers/assign_disposition',{selected_inventories: this.selected, disposition:item, policy: this.liquidation_policy})
        .then(response => {
                        this.$toast.success('Disposition updated')
                        this.isReturn = false
                        this.isTranfer = false
                        this.isDisposition = false
                        this.selectedDisposition = ''
                        this.liquidation_policy = ''
                        this.selected = []
                        $('input[name="check"]').each(function() {
                          this.checked = false;
                        });
                        if (response.data) {
                          this.table_data = response.data.inventories;
                        } 
                        else {
                          this.showAlert("error", "No Data Found");
                        }
                      })
        .catch(error => {this.$toast.error('Error in Transfer')
                           this.isReturn = false
                           this.isTranfer = false
                           this.isDisposition = false
                           this.selected = []
                            $('input[name="check"]').each(function() {
                              this.checked = false;
                            });
                          })

    },
    sendForTransfer(){
      this.loading = true;
      this.validationRules = [v => !!v || 'Field is required']
      let self = this
      self.$refs.form.validate()

      if (this.amount == '' || this.destination == '' || this.order_name == ''){
        return;
      }

      this.cancel_disable = true;
      this.cancel_create = true;
      var source = this.selected[0].pending_issue_source
      var stn = this.selected[0].stn_number
      var issue_type = this.selected[0].issue_type
      var flag = 1
      console.log(source)
      console.log(stn)
      console.log(issue_type)
      for (var i =1; i< this.selected.length ; i++){

        console.log(this.selected[i].pending_issue_source + " " + source)
        console.log(this.selected[i].stn_number+ " " + stn)
        console.log(this.selected[i].issue_type+ " " + issue_type)

        if (this.selected[i].pending_issue_source != source || this.selected[i].stn_number != stn || this.selected[i].issue_type != issue_type){
          flag = -1
          break;
        }


      }

      if (flag == -1){
        this.$toast.error('The Source destination, STN and Issue Type need to be same')
        this.transferDialog = true;
        this.cancel_disable = false;
        this.cancel_create = false;
      }
      else{
        this.transferDialog = true;
        securedAxiosInstance.post('/api/v1/warehouse/stock_transfers/transfer' , {selected_inventories: this.selected , destination:this.destination, order_name:this.order_name, amount: this.amount})
          .then(response => {
                            this.transferDialog = false;
                             this.$toast.success('Order created successfully')
                             this.selected = []
                             $('input[name="check"]').each(function() {
                              this.checked = false;
                             }); 
                             this.destination = ""
                             this.amount = ""
                             this.order_name = ""
                             this.isReturn = false
                             this.isTranfer = false
                             this.isDisposition = false
                              if (response.data) {
                                this.table_data = response.data.inventories;
                                this.loading = false;
                                this.cancel_disable = false;
                                this.cancel_create = false;
                              } 
                              else {
                                this.showAlert("error", "No Data Found");
                                this.loading = false;
                                this.cancel_disable = false;
                                this.cancel_create = false;
                              }
                            })
          .catch(error => {this.$toast.error('Error in Transfer')
                           this.transferDialog = false;
                           this.destination = ""
                           this.amount = ""
                           this.order_name = ""
                           this.isReturn = false
                           this.isTranfer = false
                           this.isDisposition = false
                           this.selected = []
                           this.loading = false;
                           this.cancel_disable = false;
                           this.cancel_create = false;
                            $('input[name="check"]').each(function() {
                              this.checked = false;
                            });
                          })

      }


    },

    assignvalue(event, item){
      if (event.target.checked){
        if (this.selected.length == 0 || this.first_select == ""){
          this.first_select = item.issue_type
          this.selected.push(item)
          if (item.issue_type == "In-Transit"){
            this.isReturn = true
          }
          if (item.issue_type == "Excess"){
            this.isTranfer = true
            this.isDisposition = true
          }
        }
        if(this.first_select != ""){
          if (this.first_select == item.issue_type){
            this.selected.push(item)
          }
          else{
            event.target.checked = false
            this.$toast.error("Only one issue type can be selected at once");
          }
        }
      
      }else{
        var record = this.selected.find (x => x.id == item.id )
        var ind = this.selected.indexOf(record)
        this.selected.splice(ind, 1)
      }
      if (this.selected.length == 0){
        this.isReturn = false
        this.isTranfer = false
        this.isDisposition = false
      }

    },

    UpdateRsto(){
      // if (!this.$refs.form.validate()) return;
      
      
      const formData = new FormData();

      this.validationRules = [v => !!v || 'Field is required']
      let self = this
      self.$refs.form.validate()

      if (this.rsto_number == '' || this.rsto_remarks == '' || this.update_grn == ''){
        return;
      }

      this.cancel_disable = true;
      this.cancel_create = true;


      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }

      formData.append('rsto_number', this.rsto_number)
      formData.append('update_grn', this.update_grn)
      formData.append('rsto_remarks', this.rsto_remarks)
      
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("inventory_ids[]", this.selected[i].id);
      }

      securedAxiosInstance.post('/api/v1/warehouse/stock_transfers/update_rsto', formData)
        .then(response => {
          this.returnStockDialog = false;
          this.$toast.success('RSTO successfully updated')
          this.selected = []
          this.isReturn = false
          this.isTranfer = false
          this.isDisposition = false
          this.cancel_disable = false
          this.cancel_create = false
          $('input[name="check"]').each(function() {
            this.checked = false;
          });
          this.rsto_number = ""
          this.update_grn = ""
          this.rsto_remarks = ""
          this.files = []
          if (response.data) {
            this.table_data = response.data.inventories;
          } else {
            this.showAlert("error", "No Data Found");
          }
        
        })
        .catch(error => {this.$toast.error('Error in Updating RSTO')
                          this.returnStockDialog = false;
                          this.selected = []
                          this.isReturn = false
                          this.isTranfer = false
                          this.isDisposition = false
                          this.cancel_disable = false
                          this.cancel_create = false
                          $('input[name="check"]').each(function() {
                            this.checked = false;
                          });
                          this.rsto_number = ""
                          this.update_grn = ""
                          this.rsto_remarks = ""
                          this.files = []
                          })
    },

    sendForUpdateStn(){


      const formData = new FormData();

      this.validationRules = [v => !!v || 'Field is required']
      let self = this
      self.$refs.form.validate()

      if (this.new_stn_number == '' || this.stn_remarks == ''){
        return;
      }

      this.cancel_disable = true;
      this.cancel_create = true;
      
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }

      formData.append('new_stn_number', this.new_stn_number)
      formData.append('stn_remarks', this.stn_remarks)
      
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("inventory_ids[]", this.selected[i].id);
      }

      securedAxiosInstance.post('/api/v1/warehouse/inventories/assign_new_stn', formData)
        .then(response => {
          this.stnDialog = false;
          this.selected = []
          this.isReturn = false
          this.isTranfer = false
          this.cancel_disable = false
          this.cancel_create = false
          
          this.isDisposition = false
          $('input[name="check"]').each(function() {
            this.checked = false;
          });
          this.new_stn_number = ""
          this.stn_remarks = ""
          this.files = []
          if (response.data) {
            this.table_data = response.data.inventories;
          } else {
            this.showAlert("error", "No Data Found");
          }


          if (response.data.status == 302){
            this.showAlert("error", "Error in Updating STN");
          }
          if (response.data.status == 402){
            this.showAlert("error", "This STN is not present in your system");
          }
          else{
            this.$toast.success('STN successfully updated')
          }
        
        })
        .catch(error => {this.$toast.error('Error in Updating STN')
                          this.stnDialog = false;
                          this.selected = []
                          this.isReturn = false
                          this.isTranfer = false
                          this.isDisposition = false
                          this.cancel_disable = false
                          this.cancel_create = false
                          $('input[name="check"]').each(function() {
                            this.checked = false;
                          });
                          if (response.data) {
                            this.table_data = response.data.inventories;
                          } else {
                            this.showAlert("error", "No Data Found");
                          }
                          this.new_stn_number = ""
                          this.stn_remarks = ""
                          this.files = []
                          })
    },

    getPolicy() {
      this.$http.secured
        .get("/api/v1/warehouse/insurances/get_dispositions")
        .then((response) => {
          if (response.data) {
            this.policies = response.data.policies;
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        });
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },
    handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.loadData(this.active_tab);
      },
      handlePageChange(value) {
        this.page = value;
        this.loadData(this.active_tab);
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
  }
};
</script>
<style >
  .theme--light.v-icon {color: #1867c0!important;}
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 14px !important;
  }
  .v-card {max-width: 97% !important;}
  .v-card-100 {max-width: 100% !important;}
  .pp-title{color: #172B4D;font-size: 20px;}
  .info-title{color:#4F4F4F;font-size: 16px;}
  .cursor-pointer:hover {cursor: pointer;}
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
  }
</style>