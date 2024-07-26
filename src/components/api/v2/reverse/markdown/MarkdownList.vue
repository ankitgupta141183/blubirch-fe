<template>
  <v-card class="overflow-hidden">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <!-- Markdown Dispatch Detail Dialog Begins --------------------------------------------------------->
    <v-row justify="center">
      <v-dialog v-model="markdownDispatchDialog" persistent max-width="500px">
        <v-card class="v-card-100">
          <v-form ref="dispatchForm">
            <v-card-title>
              <span class="inc-title">Create Pending Transfer Out Dispatch Order</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12"  class="pa-0">
                    <v-autocomplete v-model="vendor_code" :items="vendor_master" item-text="vendor_code_name" item-value="vendor_code" placeholder="Search/Enter Vendor Code*" :rules="inputRules" prepend-icon="mdi-magnify"></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-layout align-end>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-2" small color="normal" @click="markdownDispatchDialog = false">CANCEL</v-btn>
                  <v-btn small color="primary" @click="markdownComplete()">CREATE</v-btn>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Markdown Order Dialog +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--->
    <v-row justify="center">
      <v-dialog v-model="markdownOrderDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Order Number {{order_number}} submitted for Dispatch</span>
          </v-card-title>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn small color="primary" @click="markdownOrderDialog = false">OK</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Markdown Destination Detail Dialog Begins ==================================================--->
    <v-row justify="center">
      <v-dialog v-model="markdownDestinationDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-form ref="destinationForm">
            <v-card-title>
              <span class="inc-title">Pending Transfer Out Location Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12"  class="pa-0 pb-3">
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
                            <td>{{selected_destination_markdown["tag_number"]}}</td>
                            <td>{{selected_destination_markdown["item_description"]}}</td>
                            <td>{{selected_destination_markdown["source"]}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                  <v-col cols="12" sm="12" md="12"  class="pa-0">
                    <v-row v-if="active_tab == 'Pending Destination'">
                      <v-col cols="12" sm="4" md="4">
                        <v-autocomplete v-model="destination" :items="dc" item-text="name" item-value="name" placeholder="Search/Enter Destination*" :rules="inputRules" prepend-icon="mdi-magnify"></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"  class="pa-0">
                    <v-textarea name="remark" v-model="destination_remark" label="Add Remark" outlined ></v-textarea>
                  </v-col>
                  <v-col cols="12"  class="pa-0">
                    <v-file-input v-model="files" color="light-blue accent-3" counter label="Documents" multiple placeholder="Attach Documents" prepend-icon="mdi-paperclip" outlined :show-size="1000">
                      <template v-slot:selection="{ index, text }">
                        <v-chip v-if="index < 2" color="light-blue accent-3" dark label small>{{ text }}</v-chip>
                        <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                        +{{ files.length - 2 }} File(s)
                        </span>
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
                  <v-btn class="mr-2" small color="normal" @click="markdownDestinationDialog = false">CANCEL</v-btn>
                  <v-btn small color="primary" @click="markdownUpdate()">SUBMIT</v-btn>
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
      <v-card-actions>
        <v-flex xs12 d-flex>
          <v-btn v-if="active_tab == 'Pending Dispatch'" small color="primary" @click="dispatch()">Dispatch</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card-title>
    <!-- Data Table Begins ------------------------------>
    <v-layout column> 
      <v-flex md6 style="overflow: auto">
        <div >
          <v-data-table
            :dense="true"
            :headers="headers"
            v-model="selected"
            :items="all_markdowns"
            :item-key="item_key"
            class="elevation-1"
            :custom-sort="customSort"
            :loading="loading"
            :show-select="active_tab == 'Pending Dispatch'"
            disable-pagination
            :hide-default-footer="true"
            loading-text="Loading Data... Please wait"
            >
            <template v-slot:item.pending_initiation_action="{ item }">
              <img @click="markdownDestinationDialogOpen(item)"
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
    <!-- Data Table Ends------------------------------------------->
  </v-card>
</template>

<script>
  import GradeSummary from '.././gradesummary/gradeSummary'
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
  export default {
    data() {
      return {
        headerText: "Pending Transfer Out",       
        item_key: 'item_id',
        all_markdowns: [],
        destination_markdowns: [],
        dispatch_markdowns: [],
        dc: [],
        vendor_master: [],
        selected_destination_markdown: '',
        selected_dispatch_markdown: [],
        markdownDestinationDialog: false,
        markdownDispatchDialog: false,
        markdownOrderDialog: false,
        viewSummaryDialog:false,
        files: [],
        selected_inv: '',
        destination_remark: '',
        destination: '',
        vendor_code: '',
        order_number: null,
        alert: false,
        alert_type: "success",
        item: '',
        alert_message: "success",
        active_tab: "Pending Destination",
        tabs: ["Pending Destination","Pending Dispatch"],
        singleSelect: false,
        selected: [],
        search: "",
        loading: false,
        physicalImages: [],
        packagingImages: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}],
        field_type: '',
        inputRules: [ v => !!v || "The field is required"],
        headers: [
          { text: "Item Id", align: "start",  value: "tag_number"},
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "serial_number" },
          { text: "Grading Summary", value: "grade_summary" },
          { text: "Ageing", value: "pending_destination_ageing" },
          { text: "Source", value: "source" },
          { text: "Alert Level", value: "alert_level" },
          { text: "Action", value: "pending_initiation_action" , sortable: false},
        ],
        alert_value: '',
        alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}]
      };
    },
    components: {
      GradeSummary, 
      HeaderComponent
    },
    created() {   
      this.get_markdown('Pending Destination')
      this.get_distribution_center()
      this.get_vendor_master()
    },
    watch: {
      markdownDispatchDialog() {
        this.$refs.dispatchForm.reset()
      },
      markdownDestinationDialog() {
        this.$refs.destinationForm.reset()
      }
    },
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },
      FilterWithAlert(){
        this.get_markdown(this.active_tab);
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
        this.get_markdown(this.active_tab)
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.get_markdown(this.active_tab)
      },

      loadData(tab) {
        this.active_tab = tab;
        this.page =  1
        this.totalPages =  1
        this.pageSize = 100
        this.get_markdown(tab)
        if (tab == "Pending Destination"){ 
          this.headers    = [
          { text: "Item Id", align: "start",  value: "tag_number"},
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "serial_number" },
          { text: "Grading Summary", value: "grade_summary" },
          { text: "Ageing", value: "pending_destination_ageing" },
          { text: "Source", value: "source" },
          { text: "Alert Level", value: "alert_level" },
          { text: "Action", value: "pending_initiation_action" , sortable: false},
        ];
        }
        if (tab == "Pending Dispatch") { 
          this.headers = [
          { text: "Item Id", align: "start", value: "tag_number"},
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "serial_number" },
          { text: "Grading Summary", value: "grade_summary" },
          { text: "Ageing", value: "pending_dispatch_ageing" },
          { text: "Source", value: "source" },
          { text: "Destination", value: "destination_code"},
          { text: "Alert Level", value: "alert_level" },
        ];
        }
      },
      get_markdown(tab) { 
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        var status = ''
        if (tab == 'Pending Destination'){
          status = 'Pending Transfer Out Destination'
        }else{
          status = 'Pending Transfer Out Dispatch'
        }
        this.$http.secured.get('/api/v1/warehouse/markdowns', {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value}})
        .then(response => {
          this.all_markdowns = []
          this.all_markdowns = response.data.markdowns
          this.totalPages =  response.data.meta.total_pages
        })
        .catch(error => this.showAlert("error", "Error in fetching dispatch markdown"))
      },
      get_distribution_center(){
        this.$http.secured.get('/api/v1/warehouse/markdowns/get_distribution_center')
        .then(response => {
          this.dc = response.data.distribution_centers
        })
        .catch(error => this.showAlert("error", "Error in fetching Distribution Centers"))
      },
      get_vendor_master(){
        this.$http.secured.get('/api/v1/warehouse/markdowns/get_vendor_markdown')
        .then(response => {
          this.vendor_master = response.data.vendor_masters
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      },
      markdownDestinationDialogOpen(item){
        this.destination_remark = ''
        this.files = []
        this.destination = "";
        this.selected_destination_markdown = item
        this.markdownDestinationDialog = true
      },
      markdownUpdate(){
        if(this.$refs.destinationForm.validate()){
          this.selected_destination_markdown["destination_code"] = this.destination
          this.selected_destination_markdown["destination_remark"] = this.destination_remark
          const formData = new FormData();
          for (var i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData.append("files[]", file);
          }
          Object.entries(this.selected_destination_markdown).forEach(
            ([key, value]) => formData.append(key, value)
          )
          this.$http.secured.post('/api/v1/warehouse/markdowns/markdown_update', formData)
          .then(response => {
            this.destination_remark = null
            this.destination = ''
            this.files = []
            this.selected_destination_markdown = ''
            this.markdownDestinationDialog = false
            this.showAlert('success', "Pending Transfer Out Successfully Updated")
            this.active_tab = "Pending Destination"
            this.get_markdown(this.active_tab)
          })
          .catch(error => this.showAlert("error", "Error in updating destination"))         
        }
      },
      markdownComplete(){
        if(this.$refs.dispatchForm.validate()){
          const formData = new FormData();
          let markdowns = []
          formData.append('markdowns',JSON.stringify(this.selected));
          formData.append('vendor_code',this.vendor_code)
          this.$http.secured.post('/api/v1/warehouse/markdowns/markdown_dispatch_complete', formData)
          .then(response => {
            this.selected = []
            this.markdownDispatchDialog = false
            this.markdownOrderDialog = true
            this.order_number = response.data.order_number
            this.showAlert('success', "Pending Transfer Out Dispatch Successfully Completed")
            this.active_tab = "Pending Dispatch"
            this.get_markdown(this.active_tab)
          })
          .catch(error => this.showAlert("error", "Error in completing dispatch"))
        }
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
      dispatch () {
        if (this.selected.length){
          this.markdownDispatchDialog = true
        }
        else{
          this.showAlert("error", "At least one markdown must be selected")
        }
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

        if (this.field_type == ''){
          this.showAlert("error", "Please Select Field to search in");
          return
        }


        var status = ''
        if (this.active_tab == 'Pending Destination'){
          status = 'Pending Transfer Out Destination'
        }else{
          status = 'Pending Transfer Out Dispatch'
        }

        const formData = new FormData();

        formData.append('search', this.search)
        formData.append('search_in', this.field_type)
        formData.append('status', status)
        formData.append('page', 1)
        formData.append('per_page', params['size'])

        if (this.search.length != 0){
          this.$http.secured.post('/api/v1/warehouse/markdowns/search_item', formData)
          .then(response => {
            if (response.data) {
              this.all_markdowns = response.data.markdowns
              this.totalPages =  response.data.meta.total_pages
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
        }else {
          this.field_type = ''
          this.get_markdown(this.active_tab)
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