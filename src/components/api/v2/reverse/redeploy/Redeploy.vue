<template>
  <v-card class="overflow-hidden">   
  <div>
    <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
  </div>

   <!-- dispatch success Dialog -->

    <v-row justify="center">
      <v-dialog v-model="policyModel" persistent max-width="750px">
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
                  @click="policyModel=false"
                >CLOSE</v-btn>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="closepolicypop"
                >CONFIRM</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
   <v-row justify="center">

      <v-dialog v-model="dspRepairDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-data-table
                :dense="true"
                :headers="submission_headers"
                :items="selected"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="dispositionRemarks" solo name="input-7-4" label="Add Remarks*"></v-textarea>
          </v-card-text>
          <v-col cols="12" sm="12">
            <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="dspRepairDialog = false">Cancel</v-btn>
            <v-btn small color="primary"  @click="setDisposition" :disabled="number > 0">{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dispatchSuccessDialog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card-title>
            
          </v-card-title>  
          <v-card-text>
            <v-container>
              <v-row>                              
                <v-col cols="12" class="pa-0 pb-3">
                <span class="inc-title">  Order Number {{this.orderNumber}} Submitted for Dispatch </span>                 
                </v-col>                
              </v-row>
            </v-container>
          </v-card-text>  
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn small color="primary" @click="dispatchSuccessDialog = false">OK</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>        
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dispatch success Dialog -->

     <!-- dispatch Dialog -------------------------------------------------->
    <v-row justify="center">
      <v-dialog v-model="dispatchDialog" max-width="750px">
        <v-card class="v-card-100">
          <v-form ref="dispatchForm">
            <v-card-title>
              <span class="inc-title">{{dialog_title}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" class="pa-0 pb-3">
                    <v-autocomplete v-model="vendor_code" :items="dispatch_vendors" item-text="vendor_code_name" item-value="vendor_code" placeholder="Search/Enter Vendor Code*" :rules="inputRules" prepend-icon="mdi-magnify"></v-autocomplete>
                  </v-col>
                  <v-col cols="6" class="pa-0 pb-3">
                    <v-text-field v-model="lot_name" placeholder="Lot Name*" :rules="inputRules" prepend-icon="mdi-magnify" hint="Should start with 8" @keypress="onlyNumber" maxlength="9"></v-text-field>
                  </v-col>
                </v-row>
                <span> <b>Items Summary:</b></span><br>
                <v-flex style="overflow: auto"> 
                  <v-data-table
                    :dense="true"
                    :headers="dispatch_headers"
                    :items="selected"
                    class="elevation-1"
                    :loading="loading"
                    :custom-sort="customSort"
                    disable-pagination
                    :hide-default-footer="true"
                  >
                  </v-data-table>
                </v-flex>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-layout align-center>
                  <v-spacer></v-spacer>
                  <v-btn small color="primary" :disabled="number > 0 || !vendor_code || !lot_name" @click="dispatchDialogSubmit()">CREATE</v-btn>
                  <v-btn small text color="#828282" @click="dispatchDialog = false">CANCEL</v-btn>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dispatch Dialog ----------------------------------------------->

    <!-- Restock Location Details Dialog -->
    <v-row justify="center">
      <v-dialog v-model="restockLocationDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-form ref="destinationForm">
            <v-card-title>
              <span class="inc-title">{{dialog_title}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                    <v-simple-table class="gray-border">
                      <template>
                        <thead>
                          <tr>
                            <th class="text-left">Item Id</th>
                            <th class="text-left">Article Description</th>
                            <th class="text-left">Source</th> 
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{this.selected_inv.item_id}}</td>
                            <td>{{this.selected_inv.article_description}}</td>
                            <td>{{this.selected_inv.source_code}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>               
                  <v-col cols="12" class="pa-0 pb-3">
                    <v-row>                
                      <v-col cols="12" sm="4" md="4">
                            <v-select
                                v-model="destination"
                                :items="destination_items" 
                                label="Destination*"
                                name="details.warehouse_code"
                                item-text="name"
                                :rules="inputRules"
                                solo
                              ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-textarea  v-model="remarks" name="remark" label="Add Remark" outlined></v-textarea>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-file-input
                      v-model="files"
                      color="light-blue accent-3"
                      counter
                      label="Documents"
                      multiple
                      placeholder="Attach Documents"
                      prepend-icon="mdi-paperclip"
                      outlined
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="light-blue accent-3"
                          dark
                          label
                          small
                        >{{ text }}</v-chip>
                        <span
                          v-else-if="index === 2"
                          class="overline grey--text text--darken-3 mx-2"
                        >+{{ files.length - 2 }} File(s)</span>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-layout align-end>
                  <v-spacer></v-spacer>
                  <v-btn  text small color="#828282" @click="restockLocationDialog = false">CANCEL</v-btn>
                  <v-btn small color="primary" @click="restockLocationDialogSubmit()">SUBMIT</v-btn>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Repair Detail Dialog -->
    <!-- View Summary Dialog -->
 
    <v-row justify="center">
      <v-dialog v-model="viewSummaryDialog" persistent max-width="900px">
        <v-card class="v-card-100">
          <v-card-text class="pa-0">
          <GradeSummary :title="selected_inv.article_description" :summarydata = "selected_inv.grade_summary" :packagingImages="packagingImages" :physicalImages="physicalImages" @summaryClose="viewSummaryDialogClose()"/>            
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
 
    <!-- View Summary Dialog -->
    <!-- Repair Screen -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Redeploy</div> -->
        <div> <HeaderComponent :headerTitle="headerText" /></div>    
    <!-- Header -->
    <v-card class="v-card-100">
      <v-tabs v-model='tab_name'>
        <v-tab
          ripple :href="'#'+tab.replace(/ /g,'_').toLowerCase()" 
          style="text-transform:none!important;text-decoration: none;"
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <!-- Header -->
    <v-card-title>
      <v-row>
        <v-col cols="3" sm="3">
          <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id or Serial Number" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col cols="3" sm="3">
          <v-select :items="alert_item" v-model="alert_value" item-value="value" item-text="name"  label="Select Alert Level" outlined @change="FilterWithAlert()"></v-select>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions >

        <v-btn class="mr-2" v-if="active_tab == 'Pending Redeploy Dispatch'" small color="primary" @click="dispatchDialogOpen()">MOve To Dispatch</v-btn>
        <v-autocomplete
          v-model="selectedDisposition"
          :items="disposition"
          item-text="original_code"
          item-value="id"
          @change="changeDispositionItems"
          target="#set-disposition"
          color="primary"
          label="SET DISPOSITION"
          style="min-width: 150px;"
        ></v-autocomplete>
      </v-card-actions>
    </v-card-title>
    <!-- Data Table -->
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
          v-model="selected"
          :dense="true"
          :headers="headers"
          :items="table_data"
          :item-key="item_key"
          class="elevation-1"
          :custom-sort="customSort"
          :loading="loading"
          disable-pagination
          :hide-default-footer="true"
          show-select
          loading-text="Loading Data... Please wait"
        >
          <template v-slot:item.pending_initiation_action="{ item }">
            <img
              @click="restockLocationDialogOpen(item)"
              src="@/assets/images/job_sheet.png"
              title="Insurance Submission "
            />
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
    <!-- Data Table -->
  </v-card>
</template>
<script>
import GradeSummary from '../../../v1/gradesummary/gradeSummary.vue'
import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
export default {
  data() {
    return {
      headerText: "Redeploy",       
      tab_name: 'pending_redeploy_destination',
      item_key: "id",
      item:"",
      files: "",
      alert: false,
      alert_type: "success",
      alert_message: "success",
      selectedDisposition: "",
      active_tab: "Pending Redeploy Dispatch",
      dspRepairDialog: false,
      tabs: ["Pending Redeploy Dispatch"],
      singleSelect: false,
      selected: [],
      search: "", 
      destination_items: [],
      liquidation_policy: '',
      policyModel: false,
      disposition: [],
      policies: [],
      loading: false,
      lot_name: '',
      number: 0,
      dispatch_headers: [
        {
          text: "Item ID",
          align: "start",
          value: 'item_id'
        },
        { text: "Article Description", value: "article_description" },
        {text: "Source", value: 'source_code'}
      ],
      headers: [
        {
          text: "Item ID",
          align: "start",
          sortable: false,
          value: "item_id",
        },
        { text: "Article ID", value: "article_id" },
        { text: "Article Description", value: "article_description" },
        { text: "Serial Number", value: "serial_number" },
        { text: "Grade Summary", value: "grade_summary" },
        { text: "Aging", value: "pending_dispatch_ageing" }, 
        { text: "Source", value: "source_code" }, 
        { text: "Destination", value: "destination_code" },
        { text: "Alert Level", value: "alert_level" },

      ],
      table_data: [],
      selected_inv:"",     
      dialog_title: "Redeploy Location Details",
      restockLocationDialog: false,
      dispatchSuccessDialog:false,
      orderNumber:"",
      viewSummaryDialog: false,  
      dispatchDialog: false,
      destination:"", 
      vendor_code:"",
      remarks:"",
      files:[],  
      dispatch_vendors: [],
      physicalImages: [],
      packagingImages: [],
      inputRules: [ v => !!v || "The field is required"],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}],
      field_type: '',
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}]
    };
  },
  created() {
    this.getRedeployOperationalData(); 
    this.getdestinationData()
    this.get_vendor_redeploy()
    this.getDisposition()
  },
  components: {
    GradeSummary, 
    HeaderComponent
  },
  watch: {
    dispatchDialog() {
      this.$refs.dispatchForm.reset()
    },
    restockLocationDialog(){
      this.$refs.destinationForm.reset()
    }
  },
  methods: {

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
      this.getRedeployOperationalData()
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getRedeployOperationalData()
    },

    FilterWithAlert(){
      this.getRedeployOperationalData();
    },

    onlyNumber ($event) {
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
       if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
          $event.preventDefault();
       }
    },

    loadData(tab) {
      this.active_tab = tab;
      this.page =  1
      this.totalPages =  1
      this.pageSize = 100
      this.getRedeployOperationalData()
      if (tab == "Pending Redeploy Dispatch") {
        (this.dialog_title = "Move To Dispatch"),
          (this.headers = [
            {
              text: "Item ID",
              align: "start",
              sortable: false,
              value: "item_id",
            },
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Serial Number", value: "serial_number" },
            { text: "Grade Summary", value: "grade_summary" },
            { text: "Aging", value: "pending_dispatch_ageing" }, 
            { text: "Source", value: "source_code" }, 
            { text: "Destination", value: "destination_code" },
            { text: "Alert Level", value: "alert_level" },

          ]);
      }
    },
    restockLocationDialogOpen(item) {
      this.restockLocationDialog = true; 
      this.selected_inv = item 
      this.files= []
      this.remarks ="";

    },
    viewSummaryDialogOpen(item) {
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
    dispatchDialogOpen(){
      this.number = 0;
      if (this.selected.length) {
          this.vendor_code =""; 
        this.dispatchDialog = true;
      }else{
        this.showAlert("warning", "Please select the inventory for desired operation.");
      }
        
    },   
    getRedeployOperationalData() {
        this.loading = true;
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/redeploy", {params: {page: params['page'], per_page: params['size'], criticality: this.alert_value}})
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.redeploys;
              this.table_data = this.original_table_data
              this.totalPages =  response.data.meta.total_pages
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
      get_vendor_redeploy(){
        this.$http.secured.get("/api/v1/warehouse/redeploy/get_vendor_redeploy")
          .then(response => {
            this.dispatch_vendors =  response.data.vendor_masters
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          }); 
      },
       getdestinationData() {
        this.$http.secured
          .get("/api/v1/warehouse/redeploy/get_distribution_centers")
          .then(response => {
            if (response.data) {
                this.destination_items =  response.data.distribution_centers
            } else {
              this.showAlert("error", "Something went wrong from Network" + error);
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      closepolicypop(){
        if (this.liquidation_policy == ''){
          this.$toast.error('Please Select Policy')
          return
        }
        this.policyModel = false
        this.dspRepairDialog = true
      },
    changeDispositionItems(selected_item) {   
          this.number = 0;   
          
          this.selectedDisposition = selected_item;
          var selected_disposition = this.disposition.filter(x => x.id == (selected_item) )
          if (selected_disposition[0].original_code == 'Liquidation'){
            this.policyModel = true
          }
          if (this.selected.length) {
            this.dispositionRemarks = "";
            (this.dailog_cancel = "Cancel"),
              (this.dailog_confirm = "Confirm"),
              (this.dialog_title =
                "Confirmation - Set Disposition to " + selected_disposition[0].original_code);
              this.submission_headers = [
                {
                  text: "Item Id",
                  align: "start",
                  value: 'item_id'
                },
                { text: "Article Description", value: "article_description" },
                {text: "Article Id", value: 'article_id'}
              ]
            if (this.policyModel == false){
              this.dspRepairDialog = true;
            }
          } else {
            this.showAlert("warning", "Please select the Inv. for operations");
          }
    },


    setDisposition() {
      this.number++;
      if(this.dispositionRemarks == '' ){
         this.$toast.error('Please enter remarks')
        this.dispositionRemarks = ''
        
        return
      }

      this.loading = true;

      const formData = new FormData();
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("redeploy_ids[]", this.selected[i].id);
      }

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }

      formData.append("desposition_remarks", this.dispositionRemarks);
      formData.append("disposition", this.selectedDisposition);
      if (this.liquidation_policy != ''){
        formData.append('policy', this.liquidation_policy)
      }

      this.$http.secured
        .put("/api/v1/warehouse/redeploy/set_disposition", formData)
        .then(response => {
          if (response.data) {
            this.selectedDisposition = '';
            this.selected = [];
            this.dspRepairDialog = false;
            this.dispositionRemarks = ''
            this.dialog_title = ""
            this.liquidation_policy = ''
            this.loading = false;
            this.loadData(this.active_tab)
            this.showAlert("success", 'Disposition Set Sucessfully');
          } else {
            this.loading = false;
            
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.loading = false;
          
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },
    showAlert(alert_type, alert_message) {
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
    restockLocationDialogSubmit(){     
      if (this.active_tab == "Pending Store Redeployment" && this.$refs.destinationForm.validate()){ 
        this.destination
        this.remarks
        const formData1 = new FormData();
        var status = ''
        if (this.active_tab == 'Pending Store Redeployment'){
          status = 'Pending Redeploy Destination'
        }else{
          status = this.active_tab
        }
        formData1.append("redeploy_details[status]", status)
        formData1.append("redeploy_details[destination_code]", this.destination)
        formData1.append("redeploy_details[pending_initiation_remark]", this.remarks)
        console.log(this.remarks);
        for (var i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData1.append("redeploy_details[files][]", file);                
        }

        this.$http.secured.put("/api/v1/warehouse/redeploy/"+this.selected_inv.id+"/update_redeploy_details", formData1)
          .then(response => {
          if (response.data) { 
            this.restockLocationDialog = false                    
            this.destination =""; 
            this.remarks ="";  
            this.tab_name = "pending_redeploy_dispatch"
            this.loadData("Pending Redeploy Dispatch");
            this.showAlert('success', "Successfully updated");
            this.getRedeployOperationalData("Pending Redeploy Dispatch");                    
          } else {
            this.restockLocationDialog = false
            this.showAlert("error", "fail to update");
          }
        })
      }
     },
    dispatchDialogSubmit(){
      this.number++;
      if(this.$refs.dispatchForm.validate()){
        this.vendor_code
        this.selected
        if (this.lot_name != '' && this.lot_name != undefined) {
          if(this.lot_name.trim().length != 9){
            this.showAlert("error", "Lot name should have 9 characters");
           
            return
          }else if(this.lot_name.trim()[0] != '8'){
            this.showAlert("error", "Lot name should start with 8");
            
            return
          }
        }

        const formData = new FormData();
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("redeploy_ids[]", this.selected[i].id);
        }
        formData.append("vendor_code", this.vendor_code);
        formData.append("lot_name", this.lot_name.trim());
        this.$http.secured.post("/api/v1/warehouse/redeploy/create_redeploy_dispatch_order", formData)
          .then(response => {
          if (response.data) { 
            this.dispatchDialog = false                    
            this.destination =""; 
            this.remarks ="";  
            this.dispatchDialog = false;
            this.lot_name = ''
            this.selected = []
            this.dispatchSuccessDialog = true;
            this.orderNumber = response.data.order_number  
            this.showAlert('success', "Successfully updated");
            this.getRedeployOperationalData('Pending Redeploy Dispatch');                                    
          } else {
            this.restockLocationDialog = false
            this.showAlert("error", "fail to update");
            
          }
        })
      }
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

      if (this.field_type == ''){
        this.showAlert("error", "Please Select Field to search in");
        return
      }

      const formData = new FormData();

      formData.append('search', this.search)
      formData.append('search_in', this.field_type)
      formData.append('status', status)
      formData.append('page', 1)
      formData.append('per_page', params['size'])

      if (this.search.length != 0){
        this.$http.secured.post('/api/v1/warehouse/redeploy/search_item', formData)
        .then(response => {
            if (response.data) {
              this.table_data = response.data.redeploys
              this.totalPages =  response.data.meta.total_pages
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
        })
        .catch(error => this.showAlert("error", "Error in Records"))
      }else {
        this.field_type = ''
        this.getRedeployOperationalData(this.active_tab)
      }

    },
    getDisposition(){
      this.$http.secured.get("/api/v1/warehouse/redeploy/get_dispositions")
        .then(response => {
          if (response.data) {
            this.disposition = response.data.dispositions
            this.policies = response.data.policies
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        })
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
  }

};
</script>

<style>
  .v-card {
    max-width: 98% !important;
  }

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
</style>