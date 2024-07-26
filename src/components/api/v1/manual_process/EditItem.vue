<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <div> <HeaderComponent headerTitle="Edit Item" /></div>

    <v-row justify="center">
      <v-dialog v-model="dispositionDialog" max-width="900px" max-height= "900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline"> {{dispositionHeading}} </span>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selected">
                          <td>{{item.tag_number}}</td>
                          <td>{{item.item_description}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="dispositionDialog=false">Cancel</v-btn>
            <v-btn small color="primary" @click="confirmdspRepairDialog" :disabled="number > 0 ">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

      <v-dialog v-model="confirmationModelDelete" max-width="900px" max-height= "900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline"> Are you sure you want to delete item ? </span>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selected">
                          <td>{{item.tag_number}}</td>
                          <td>{{item.item_description}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <!-- New Fields -->
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-autocomplete
                          v-model="delete_reason"
                          :items="delete_reasons"
                          color="primary"
                          label="Select Reason"
                        ></v-autocomplete>
                      </v-flex>
                    </v-col>
                  </v-row>
                  <v-flex>

                    <v-textarea outlined v-model="delete_remark" label= "Add Remarks*" ></v-textarea>
                  </v-flex>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="closeDeleteItemPopUp()">Cancel</v-btn>
            <v-btn small color="primary" @click="deleteItem()">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    <v-card-title>
      <v-row>
        <v-col cols="3" sm="3">
          <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id, Serial Number or Brand" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-flex xs12 d-flex>
          <v-autocomplete
            v-model="selectedDisposition"
            :items="menu_items"
            target="#set-disposition"
            item-text="original_code"
            @change="openDisposition"
            item-value="id"
            color="primary"
            label="SET DISPOSITION"
            solo
            style= "margin-top: 10px;"
          ></v-autocomplete>
        </v-flex>

        <v-btn
          @click="openConfirmationDialog"
          class="ml-2"
          color="error"
        > DELETE ITEM </v-btn>
      </v-card-actions>
    </v-card-title>
    <v-layout column>
      <v-data-table
        :dense="true"
        v-model="selected"
        show-select
        :headers="headers"
        :items="table_data"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading Data... Please wait"
      >
      </v-data-table>
    </v-layout>

  </v-card>
</template>

<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import { mapState } from "vuex";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        loading: false,
        alert: false,
        alert_type: '',
        alert_message: '',
        confirmationModel: false,
        confirmationModelDelete: false,
        field_type: '',
        search: '',
        number :0,
        table_data: [],
        dispositions: [],
        selectedDisposition: '',
        delete_reasons: ['Excess Graded (Same Article)', 'Excess Graded (Different Article)', 'Wrongly Graded (Wrong Grade Details)'],
        delete_reason: '',
        delete_remark: '',
        delete_reason: '',
        selected: [],
        menu_items: [],
        policies: [],
        field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}],
        headers: [
          {
            text: "Item Id",
            align: "start",
            value: "tag_number"
          },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description", width: '15%' },
          { text: "Brand", value: "brand" },
          { text: "RPA Reason", value: "return_reason", width: '15%' },
          { text: "Serial Number", value: "serial_number"},
          { text: "Bucket", value: "current_bucket"},
          { text: "Current Status", value: "current_status"}
        ],
        dispositionHeading: 'Set Disposition',
        dispositionDialog: false,
      };
    },

    created() {
      this.getDesposition()
    },

    components: {
      editor: Editor,
      HeaderComponent
    },
    watch: {    
    selected(newVal) {
        const putawayInward = newVal.filter(insurances => insurances.is_putaway_inwarded === false)
       if(putawayInward.length > 0){
        this.showAlert("warning", "Please complete Putaway Process");
        this.selected = []
       }   
    }
  },
    computed: mapState(["currentUser", "signedIn"]),
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },



      deleteItem(){
        this.confirmationModelDelete = true
      },

    searchItem(){
      if (this.field_type == ''){
        this.showAlert("error", "Please Select Field to search in");
        return
      }

      const formData = new FormData();

      formData.append('search', this.search)
      formData.append('search_in', this.field_type)

      if (this.search.length != 0){
        this.$http.secured.post('/api/v1/warehouse/inventories/search_items', formData)
        .then(response => {
          if (response.data.inventories){
            this.table_data = response.data.inventories
          }else{
            this.showAlert("error","No Records Found for given value");
          }
        })
        .catch(error => this.showAlert("error", "Error in fetching Records"))
      }else {
        this.field_type = ''
      }

    },

    openConfirmationDialog(){
      if (this.selected.length <= 0){
        this.showAlert("warning", "Please Select Records")
        return        
      }
      this.confirmationModelDelete = true
    },

    openDisposition(){
      if (this.selected.length <= 0 ){
        this.showAlert("warning", "Please Select Records")
        return
      }
      this.dispositionDialog = true

    },

    getDesposition(){
      this.$http.secured.get("/api/v1/warehouse/manual_processes/get_dispositions")
        .then(response => {
          if (response.data) {
            this.menu_items = response.data.dispositions
            this.policies = response.data.policies
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        })
    },

    closeDeleteItemPopUp(){
      this.confirmationModelDelete = false
      this.selected = []
      this.delete_remark = ''
      this.delete_reason = ''
    },

    confirmdspRepairDialog() {
      this.number++
      if (this.selectedDisposition == ''){
        this.$toast.error('Please Select Disposition')
        return
      }

      const formData = new FormData();
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("inventory_ids[]", this.selected[i].id);
      }
      formData.append("disposition", this.selectedDisposition);

      this.dispatchDialog = false;

      let message_to_show = "Disposition set for selected inventory successfully";

        this.$http.secured.post("api/v1/warehouse/manual_processes/bucket_movement", formData)
        .then(response => {
          
          this.table_data = []
          this.selectedDisposition = '';
          this.selected = [];
          this.loading = false;
          this.search = ''
          this.field_type = ''
          this.dispositionDialog = false
          if (response) {
            if (response.data.status == 200){
              this.showAlert("success", message_to_show);
              this.number--
            }else if (response.data.status == 302) {
              this.number = 0;
              this.showAlert("error", response.data.message);
            }
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        })
        .catch(error => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
          this.number--
        });
    },


    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    deleteItem(){
      if (this.delete_reason == '' || this.delete_reason == undefined){
        this.$toast.error('Please Select Valid Reason to Delete')
        return
      }
      const formData = new FormData();
      formData.append('reason', this.delete_reason)
      if (this.delete_remark != ''){
        formData.append('remark', this.delete_remark)
      }
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("inventory_ids[]", this.selected[i].id);
      }


      this.$http.secured.post("api/v1/warehouse/manual_processes/delete_item", formData)
      .then(response => {
        if (response) {
          this.table_data = []
          this.selectedDisposition = '';
          this.selected = [];
          this.loading = false;
          this.search = ''
          this.field_type = ''
          this.confirmationModelDelete = false
          this.showAlert("success", 'Items Deleted Successfully');
        } else {
          this.loading = false;
          this.showAlert("error", "No Data Found");
        }
      })
      .catch(error => {
        this.loading = false;
        this.showAlert("error", "Something went wrong from Network" + error);
      });
    }

    },
    filters: {
      truncate: function(text, length, suffix) {
        if (text?text.length:0 > length) {
          return text.substring(0, length) + suffix;
        } else {
          return text;
        }
      }
    }
  };
</script>

<style >
  .theme--light.v-icon {
    color: #1867c0!important;
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 14px !important;
  }
  .v-card {
    max-width: 97% !important;
  }

  .v-card-100 {
    max-width: 100% !important;
  }
  .inc-title{
    color: #172B4D;
    font-size: 20px;
  }
</style>