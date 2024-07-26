<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition" >{{ alert_message }}</v-alert>
    </div>
    <div><HeaderComponent :headerTitle="headerText" :router-link="{ name: 'RetunrCreation' }"
        :router-link-text="'Return / Claim Requests'"  :return-condition="true" :component-name="'Sales Return Request'"/>
    </div>
    <!-- Search invoice -->
    <v-row justify="center">
      <v-dialog v-model="searchInvoicePopup" persistent max-width="366px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Reference Document</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeSearchInvoicePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <v-col cols="6" sm="12" md="12" style="height: 96px;">
                  <v-text-field label="For Eg: INV-098-RT-097" prepend-inner-icon="mdi-magnify" outlined v-model="search_invoice" style="margin-bottom: -30px;" required></v-text-field>
                </v-col>               
              </v-container>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="invoiceItemDataPopup" :disabled="!search_invoice">GO</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
      <!-- Search invoice items popup -->
    <v-row justify="center">
      <v-dialog v-model="invoiceItemPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary">
          <v-toolbar-title class="alert-link">{{ req_id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn class="blue--text" color="white" small :disabled="(this.selected_manf.length == 0)"  @click="addItem">ADD Items</v-btn>
            <v-btn icon dark @click="invoiceItemPopup = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </v-toolbar>
        <v-card class="v-card-100">
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table 
                  :dense="true" 
                  show-select
                  :search="search" 
                  :hide-default-footer="true"
                  v-model="selected_manf"
                  :headers="edit_req_headers"
                  :items="edit_req_table_data"
                  disable-pagination
                  :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                </v-data-table>
              </v-list-item-content>  
            </v-flex>
          </v-layout>
          <div class="float-right">
            <v-row class="ml-2">
              <v-col cols="4" sm="3">
                <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
                  @change="handlePageSizeChange"></v-select>
              </v-col>
              <v-col cols="12" sm="9">
                <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="returncreateionsuccesspopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="returncreateionsuccesspopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ returncreationsuccessmessage }}</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="redirectToreturncreation">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
      <!-- Request details -->
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
    <!-- sales return form -->
    <template>
      <v-card class="v-card-100">
        <v-card-text>
          <v-row class="returnmb">
            <v-col cols="1" sm="4" md="4" >
              <span style="font-weight: 500;">Request Details</span>
            </v-col>
            <v-col cols="2" sm="4" md="4" >
              <v-combobox v-model="channel" :items="channel_items" item-text="original_code" return-object label="Channel*" outlined class="ma-2 " ></v-combobox>
            </v-col>
            <v-col cols="3" sm="4" md="4" >
              <v-combobox v-model="return_request_subtype" :items="return_request_subtype_itmes" item-text="original_code" return-object label="Return Request Sub-type*" outlined class="ma-2" @change="returnreason" ></v-combobox>
            </v-col>
          </v-row>
          <v-row class="returnmb">
            <v-col cols="4" sm="4" md="4" > </v-col>
            <v-col cols="5" sm="4" md="4" >
              <v-combobox v-model="return_reason" :items="return_reason_items" item-text="original_code" return-object label="Return Reason*" outlined class="ma-2" :disabled="return_request_subtype == ''"  @change="returnSubReason"></v-combobox>
            </v-col>
            <v-col cols="6" sm="4" md="4" >
              <v-combobox v-model="retrun_sub_reason" :items="retrun_sub_reason_itmes" item-text="original_code" item-value="" label="Return Sub-Reason*" outlined class="ma-2" :disabled="return_reason == ''" ></v-combobox>
            </v-col>
          </v-row>
          <v-row class="returnmb">
            <v-col cols="7" sm="4" md="4" > </v-col>
            <v-col cols="8" sm="4" md="4" >
              <v-combobox v-model="item_location" :items="item_location_items" item-text="original_code" return-object item-value="" label="Item Location*" outlined class="ma-2"  @change="changeLocation"></v-combobox>
            </v-col>
            <v-col cols="9" sm="4" md="4" v-if="item_location && item_location.original_code === 'Location ID'">
              <v-text-field v-model="location_id" label="Location Id*" outlined class="ma-2"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="returnmb">
            <v-col cols="10" sm="4" md="4" > </v-col>
            <v-col cols="11" sm="4" md="4" >
              <v-combobox v-model="pre_settlement_method" :items="pre_settlement_method_items" item-text="original_code" return-object item-value="" label="Preffered Settlement Method*" outlined class="ma-2" ></v-combobox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card class="border-top v-card-100">
          <v-card-text>
            <v-row class="returnmb">
              <v-col cols="12" sm="4" md="4" >
                <span style="font-weight: 500;">Return Item Details</span>
              </v-col>
              <v-col cols="13" sm="4" md="4" >
                <v-combobox v-model="select_method" :items="select_method_items" item-text="original_code" item-value="id" return-object label="Select Method" outlined class="ma-2" @change="changeSelectedMethod" ></v-combobox>
              </v-col>
            </v-row>
            <v-row style="margin-bottom: -20px;" v-if="select_method && select_method.original_code === 'Article ID & Serial Number'"> 
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="4" md="4" >
                <v-text-field v-model="article_id" label="Article ID*" outlined class="ma-2"></v-text-field>
                <v-btn class="ma-2 color-change" @click="addSerialNumber" color="#ffff">+ Add Article Id & Serial Number</v-btn>
              </v-col>
              <v-col cols="13" sm="4" md="4" >
                <v-text-field v-model="serial_number" label="Serial Number*" outlined class="ma-2"></v-text-field>
              </v-col>
              <div v-if="searchedData">
                <p>Article ID: {{ searchedData.article_id }}</p>
                <p>Serial Number: {{ searchedData.serial_number }}</p>
              </div>
              <div v-if="error">
                <p>Error: {{ error }}</p>
              </div>
            </v-row>
            <v-row style="margin-bottom: -20px;" v-if="select_method && select_method.original_code === 'Article ID'">
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="4" md="4" >
                <v-text-field v-model="article_id2" label="Article ID*" outlined class="ma-2" @keyup.enter="fetchData('Article ID')"></v-text-field>
                <div v-if="articleId !== null">
                  <div class="selected_rule_box">
                    <span v-for="(dataItem, index) in articleId" :key="dataItem.id" class="rule-type_option">
                      <template v-if="dataItem.sku_code">
                        {{ dataItem.sku_code }}
                        <v-icon small @click="removeItem(dataItem, index)">mdi-close</v-icon>
                      </template>
                    </span>
                  </div>
                </div>
                <div v-if="showError && weatherData === null" class="error-message">{{ errorMessage }}</div>
                <v-btn class="ma-2 color-change" @click="addSerialNumber" color="#ffff">+ Add Another Article Id</v-btn>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Quantity" label="Quantity*" outlined class="ma-2" ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="4" md="4" v-if="select_method && select_method.original_code === 'Serial Number'">
                <v-text-field v-model="serial_number2" label="Serial Number*" outlined class="ma-2" @input="validateSerialNumber" :error-messages="serialNumberErrorMessages" @keyup.enter="fetchData('Serial Number')" ></v-text-field>
                <div v-if="weatherData !== null">
                  <div class="selected_rule_box">
                    <span v-for="(dataItem, index) in weatherData" :key="dataItem.id" class="rule-type_option">
                      <template v-if="dataItem.serial_number">
                        {{ dataItem.serial_number }}
                        <v-icon small @click="removeItem(dataItem, index)">mdi-close</v-icon>
                      </template>
                    </span>
                  </div>
                </div>
                <div v-if="showError && weatherData === null" class="error-message">{{ errorMessage }}</div>
                <v-btn class="ma-2 color-change" @click="addSerialNumber" color="#ffff">+ Add Another</v-btn>
              </v-col>
            </v-row>
            <v-row style="margin-bottom: -10px;">
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="3" md="3">
                <v-btn  v-if="this.selectedAddItem.length > 0" class="ma-2 color-change" @click="openDialogSearchInVoice" color="#ffff">+ ADD ANOTHER Reference Document</v-btn> <br>
                <span v-if="this.selectedAddItem.length > 0" style="margin-left: 10px;">Items Selected: <u class="color-change">{{ this.selectedAddItem.length }}</u></span>
              </v-col>
              <v-col style="margin-bottom: -10px;"></v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="border-top v-card-100">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" md="4" >
                <span style="font-weight: 500;">Condition Details*</span>
              </v-col>
              <v-col cols="13" sm="8" md="8">
                <span>Is The Item In Its Original Packging?*</span><br>
                <v-row> 
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="yes" v-model="answer"> <span class="titles">Yes</span>
                    </label>
                  </v-col>
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="no" v-model="answer"> <span class="titles">No</span>
                    </label>
                  </v-col> 
                </v-row>                                  
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="8" md="8">
                <span>Has The Item Been Used?*</span><br>
                <v-row> 
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="yes" v-model="answer1"> <span class="titles">Yes</span>
                    </label>
                  </v-col>
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="no" v-model="answer1"> <span class="titles">No</span>
                    </label>
                  </v-col> 
                </v-row>                                  
              </v-col>
            </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4" > </v-col>
                <v-col cols="13" sm="8" md="8">
                    <span>Are All Of The Item's Parts And Accessories Included?*</span><br>
                  <v-row> 
                    <v-col cols="14" sm="4" md="4">
                      <label for="">
                        <input class="inputfield" type="radio" value="yes" v-model="answer2"> <span class="titles">Yes</span>
                      </label>
                    </v-col>
                    <v-col cols="14" sm="4" md="4">
                      <label for="">
                        <input class="inputfield" type="radio" value="no" v-model="answer2"> <span class="titles">No</span>
                      </label>
                    </v-col> 
                  </v-row>                                  
                </v-col>
              </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="8" md="8">
                <span>Are There Any Signs Of Wear And Tear On the Item?*</span><br>
                <v-row> 
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="yes" v-model="answer3"> <span class="titles">Yes</span>
                    </label>
                  </v-col>
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="no" v-model="answer3"> <span class="titles">No</span>
                    </label>
                  </v-col> 
                </v-row>                                  
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="8" md="8">
                <span>Has The Item Been Stored Proeprly Since It Was Received?*</span><br>
                <v-row> 
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="yes" v-model="answer4"> <span class="titles">Yes</span>
                    </label>
                  </v-col>
                  <v-col cols="14" sm="4" md="4">
                    <label for="">
                      <input class="inputfield" type="radio" value="no" v-model="answer4"> <span class="titles">No</span>
                    </label>
                  </v-col> 
                </v-row>
              </v-col>
            </v-row>
            <v-row class="returnmb">
              <v-col cols="7" sm="4" md="4" > </v-col>
              <v-col cols="8" sm="4" md="4" >
                <v-file-input v-model="fileImage" accept= "" label="Images*" ></v-file-input>
              </v-col>
              <v-col cols="9" sm="4" md="4" >
                <v-file-input v-model="fileVideo" accept= "" label="Videos*" ></v-file-input>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="primary" style="margin-top: 18px;" :disabled="number > 0 || !channel || !return_request_subtype || !return_reason || !retrun_sub_reason || !item_location || !pre_settlement_method || !select_method" @click="submitForm">SUBMIT</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-card>
    </template>
  </v-card>
</template>
<script>
  import HeaderComponent from "../../../commoncomponents/HeaderComponent";
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default{
    data(){
      return{
        headerText: "Return Creation",
        salesReturnCondition:true,
        loading: true,
        alert: false,
        alert_type: "",
        alert_message: "",
        channel:null,
        original_code: [],
        channel_items:[],
        return_request_subtype:'',
        return_request_subtype_itmes:[],
        return_reason:'',
        return_reason_items:[],
        retrun_sub_reason:'',
        retrun_sub_reason_itmes:[],
        item_location:'',
        item_location_items:[],
        location_id:'',
        location_id_itmes:'',
        pre_settlement_method:'',
        pre_settlement_method_items:[],
        select_method:'',
        select_method_items:[],
        answer:'',
        answer1:'',
        answer2:'',
        answer3:'',
        answer4:'',
        fileImage: '',
        fileVideo:'',
        searchInvoicePopup:false,
        search_invoice:'',
        selected_manf:[],
        search: '',
        invoiceItemPopup:false,
        edit_req_headers: [
            { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
            { text: "Category", value: "category" },
            { text: "Article Id", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Grade", value: "grade" },
            { text: "Sub Location", value: "sub_location" },
            { text: "Site Location", value: "distribution_center" }
        ],
        edit_req_table_data:[],
        serial_number:'',
        article_id: '',
        article_id2:'',
        basedSelectMethod: false,
        req_id:'',
        number: 0,
        returnRequestSubtype: '',
        additionalField : false,
        successpopup: false,
        returncreateionsuccesspopup: false,
        successmessage:'',
        selectedAddItem: [],
        returnData:[],
        returntype: '',
        return_details: [],
        returncreationsuccessmessage: '',
        serial_number2: '',
        weatherData: null,
        articleId: null,
        weatherDataNot: '',
        inputFocused: false,
        searchedData: null,
        showError: false,
        serialNumberErrorMessages:[],
        errorMessage: "",
        Quantity: '',
        page: 1,
        totalPages: [],
        pageSize: 100,
        pageSizes: [50, 100, 150],
      }
    },
    components: {
      HeaderComponent
    },
    async created() {
      this.returnRequestSubtype = this.$route.params.return_id;
      this.returntype = this.$route.params.return_value
      this.fetchAllData(this.returnRequestSubtype);
      this.Fetchallapis();
    },
    methods: {
      loadData() {
        this.loading = true;
        this.selected = []
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
      },
      Fetchallapis() {
        this.channels();
        this.getlocation();
        this.returnSettlementType();
        this.returnDocumentKey();
      },
      channels() {
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/master_values/channel_types`)
          .then(response => {
            if (response.data) {
              this.channel_items = response.data.lookup_values;
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
      fetchAllData(id) {
        const params = {
          lookup_value_id: id
        }
        Promise.all([
          this.$http.secured.get(`/api/v1/warehouse/return_initiation/master_values/return_sub_types`, { params: params }),
        ])
          .then(([response]) => {
            this.return_request_subtype_itmes = response.data.lookup_values;
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
      },
      getlocation() {
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/master_values/return_creation_locations`)
          .then(response => {
            if (response.data) {
              this.item_location_items = response.data.lookup_values;
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
      returnSettlementType() {
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/master_values/sales_return_settlement_type`)
          .then(response => {
            if (response.data) {
              this.pre_settlement_method_items = response.data.lookup_values;
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
      returnDocumentKey() {
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/master_values/return_creation_document_keys`)
          .then(response => {
            if (response.data) {
              this.select_method_items = response.data.lookup_values;
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            // this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      returnreason() {
        this.return_reason = '';
        this.retrun_sub_reason = '';
        const params = {
          lookup_value_id: this.return_request_subtype.id
        }
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/master_values/return_reasons`, { params: params })
          .then(response => {
            if (response.data) {
              this.return_reason_items = response.data.lookup_values;
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            // this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      returnSubReason() {
        this.retrun_sub_reason = '';
        const params = {
          lookup_value_id: this.return_reason.id
        }
        this.$http.secured
          .get(`/api/v1/warehouse/return_initiation/master_values/return_sub_reasons`, { params: params })
          .then(response => {
            if (response.data) {
              this.retrun_sub_reason_itmes = response.data.lookup_values;
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            // this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      addItem() {
        this.selectedAddItem.push(this.selected_manf);
        this.invoiceItemPopup = false
        this.searchInvoicePopup = false
        if(this.selected_manf.length > 0){
          this.successpopup = true;
          this.successmessage = `${this.selected_manf.length} Items are marked for Sales Return Request`
        }
      },
      changeSelectedMethod() {
        if (this.select_method) {
          const selectedId = this.select_method.original_code;
          if (selectedId === "Reference Document") {
            this.searchInvoicePopup = true;
          } else if (selectedId === "Serial Number") {
            this.selectedAddItem = []
            this.additionalField = "";
          } else if (selectedId === "Article ID") {
            this.selectedAddItem = []
          } else if (selectedId === "Article ID & Serial Number") {
            this.selectedAddItem = []
          } else {
            this.additionalField = null;
          }
        }
      },
      validateSerialNumber() {
        this.serial_number2 = this.serial_number2.replace(/\D/g, '');

        if (this.serial_number2 === '' || isNaN(this.serial_number2)) {
          this.serialNumberErrorMessages = ['Please enter a valid numeric serial number.'];
        } else {
          this.serialNumberErrorMessages = [];
        }
      },
      fetchData(searchType) {
        let searchData;

        if (searchType === "Article ID") {
          if (!this.article_id2) {
            this.showError = true;
            this.errorMessage = "Please provide an Article ID.";
            return;
          }
          searchData = this.article_id2;
        } else if (searchType === "Serial Number") {
          if (!this.serial_number2) {
            this.showError = true;
            this.errorMessage = "Please provide a Serial Number.";
            return;
          }
          searchData = this.serial_number2;
        } else {
          return;
        }

        const formData = new FormData();
        formData.append("search_type", searchType);
        formData.append("search", searchData);

        this.$http.secured
          .post("/api/v1/warehouse/return_initiation/return_inventory_informations/search_return_items", formData)
          .then(response => {
            if (response.data && response.data.return_inventory_informations.length > 0) {
              if (searchType === "Article ID") {
                this.articleId = response.data.return_inventory_informations;
                this.weatherData = null;
              } else if (searchType === "Serial Number") {
                this.weatherData = response.data.return_inventory_informations;
                this.articleId = null;
              }
              this.showError = false; // Reset error state
            } else {
              this.showError = true;
              this.errorMessage = `No data found for '${searchData}'`;
              this.articleId = null;
              this.weatherData = null;
            }
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      },
      addSerialNumber() {
        if (this.serial_number2) {
          this.weatherData.push({ serial_number: this.serial_number2, temperature: this.temperatureValue });
          this.serial_number2 = ''; 
          this.temperatureValue = 0; 
        } else if (this.article_id2) {
          this.articleId.push({ article_id: this.article_id2, temperature: this.temperatureValue });
          this.article_id2 = '';
          this.temperatureValue = 0;
        }
      },
      removeItem(dataItem, index) {
        this.weatherData.splice(index, 1);
        this.articleId.splice(index, 1)
      },
      changeLocation() {
        if (this.item_location) {
          const selectedlocation = this.item_location.original_code;
          if (selectedlocation === "Location ID") {
          }
        }
      },
      openDialogSearchInVoice (){
        this.searchInvoicePopup = true;
      },
      closeSearchInvoicePopup(){
        this.search_invoice = '';
        this.searchInvoicePopup = false;
        this.select_method = ''
      },
      invoiceItemDataPopup () {
        this.req_id = this.search_invoice;
        this.loading = true;
        this.selected_manf = [];
        this.edit_req_headers = [
          { text: "Article Id", value: "sku_code" },
          { text: "Invoice Number", value: "reference_document_number" },
          { text: "Article Description", value: "sku_description" },
          { text: "Serial Number", value: "serial_number" },
        ];

        const formData = new FormData();
        formData.append("search_type", "Reference Document");
        formData.append("search", this.search_invoice);
        // formData.append("page", this.page);
        // formData.append("perpage", this.pageSize);

        this.$http.secured.post("/api/v1/warehouse/return_initiation/return_inventory_informations/search_return_items", formData)
          .then(response => {
            if (response.data) {
              this.edit_req_table_data = response.data.return_inventory_informations;
              // this.totalPages = response.data.meta.total_pages;
              this.loading = false;
              this.invoiceItemPopup = true;
              this.search_invoice = "";
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            console.error(error);
            this.showAlert("error", "Something went wrong from Network");
          })
          .finally(() => {
            this.loading = false;
          });
      },
      afterClickOkLoadData() {
        this.successpopup = false;
        this.successmessage = ''
        
      },
      redirectToreturncreation() {
        this.returncreateionsuccesspopup = false;
        this.returncreationsuccessmessage = ''
        this.$router.push({ name: "RetunrCreation" });
      },
      filldata() {
        return this.channel && this.return_request_subtype
      },
      // validateSelectedItems(selectedItems) {
      //   if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
      //     this.showAlert("error", "No selected items found.");
      //     return false;
      //   }

      //   for (const item of selectedItems) {
      //     if (
      //       !item.hasOwnProperty("id") ||
      //       !item.hasOwnProperty("quantity") ||
      //       !item.hasOwnProperty("sku_code") ||
      //       !item.hasOwnProperty("reference_document_number")
      //     ) {
      //       this.showAlert("Invalid selected item:", item);
      //       return false;
      //     }
      //   }
      //   return true;
      // },

      submitForm() {

        this.returnData = this.selected_manf;
        const returnDetails = this.returnData.map((item) => ({
          return_inventory_information_id: item.id,
          quantity: item.quantity,
          sku_code: item.sku_code,
          reference_document_number: item.reference_document_number,
        }));

        const requestData = {
          return_item: {
            return_type: this.returntype,
            return_type_id: this.returnRequestSubtype,
            channel: this.channel.original_code,
            channel_id: this.channel.id,
            return_reason: this.return_reason.original_code,
            return_reason_id: this.return_reason.id,
            return_sub_reason: this.retrun_sub_reason.original_code,
            return_sub_reason_id: this.retrun_sub_reason.id,
            return_request_sub_type: this.return_request_subtype.original_code,
            return_request_sub_type_id: this.return_request_subtype.id,
            item_location: this.item_location.original_code,
            item_location_id: this.item_location.id,
            preffered_settlement_method: this.pre_settlement_method.original_code,
            preffered_settlement_method_id: this.pre_settlement_method.id,
            article_id: this.article_id2,
            serial_number: this.serial_number2,
            return_details: returnDetails,
            // answer: this.answer,
            // answer1: this.answer1,
            // answer2: this.answer2,
            // answer3: this.answer3,
            // answer4: this.answer4
          },
        };
        console.log("Request Data:", requestData);

        this.$http.secured
          .post("/api/v1/warehouse/return_initiation/return_creations", requestData)
          .then((response) => {
            if (response.data) {
              this.returncreationsuccessmessage = response.data.message;
              this.returncreateionsuccesspopup = true
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch((error) => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      handlePageChange(value) {
        this.page = value;
        invoiceItemDataPopup();
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        invoiceItemDataPopup();
      },
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
    }
  }
</script>
<style>
  .returnmb {
    margin-bottom: -40px;
  }
  .border-top{
    border-top: 18px solid #e5e5e5 !important;
  }
  .inputfield {
    height: 15px;
    width: 15px;
    margin-right: 10px;
  }
  .titles {
    margin-bottom: 10px !important;
  }

  .return-class{
    position: absolute;
    left: 25px;
  }
  .time .v-input {
    max-width: 96%;
  }

  .rule-type_option {
    border: 1px solid #000000;
    padding: 4px 8px;
    border-radius: 5px;
    margin: 1px 2px;
  }
  .inputfield{
      height: 20px;
      width: 20px;
      margin-right: 10px; 
  }
  /* .titles {
      margin-bottom: 10px !important;
  } */
  .error-message{
    color: red;
  }
</style>