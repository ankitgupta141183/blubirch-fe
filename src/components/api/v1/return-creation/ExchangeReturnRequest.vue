<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition" >{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" :router-link="{ name: 'RetunrCreation' }" :router-link-text="'Return / Claim Requests'" :return-condition="true" :component-name="'Exchange Return Request'"/>
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
    <!-- success popup -->
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
                <v-select v-model="pageSize" :items="pageSizes" label="Items Per Page"
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
    <!--  -->
    <v-card class="v-card-100">
      <v-card-text>
        <v-row class="returnmb">
          <v-col cols="1" sm="4" md="4" >
            <span style="font-weight: 500;">Request Details</span>
          </v-col>
          <v-col cols="2" sm="4" md="4" >
           <v-combobox v-model="channel" :items="channel_items" item-text="original_code" return-object label="Channel*" outlined class="ma-2 " ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="returnmb">
          <v-col cols="7" sm="4" md="4" > </v-col>
          <v-col cols="8" sm="4" md="4" >
            <v-combobox v-model="item_location" :items="item_location_items" item-text="original_code" return-object item-value="" label="Item Location*" outlined class="ma-2"  @change="changeLocation"></v-combobox>
          </v-col>
          <v-col cols="9" sm="4" md="4" v-if="item_location && item_location.original_code === 'Location ID'">
            <v-text-field v-model="location_id" label="Location ID*" outlined class="ma-2"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="v-card-100 border-top">
      <v-card-text>
        <v-row class="returnmb">
          <v-col cols="1" sm="4" md="4" >
            <span style="font-weight: 500;">Purchase Details</span>
          </v-col>
          <v-col cols="13" sm="4" md="4" >
            <v-text-field v-model="article_id1" label="Article ID*" outlined class="ma-2" @input="validateInput" :error-messages="errorMessages" ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="returnmb">
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
                      <template v-else>
                        Article ID {{ dataItem.sku_code }} does not exist in data
                      </template>
                    </span>
                  </div>
                </div>
                <v-btn class="ma-2 color-change" @click="addSerialNumber" color="#ffff">+ Add Another Article Id</v-btn>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Quantity" label="Quantity*" outlined class="ma-2" ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" > </v-col>
              <v-col cols="13" sm="4" md="4" v-if="select_method && select_method.original_code === 'Serial Number'">
                <v-text-field v-model="serial_number2" label="Serial Number*" outlined class="ma-2" @keyup.enter="fetchData('Serial Number')"></v-text-field>
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
                <div v-else-if="showError">
                  <p class="error-message">Serial number does not exist.</p>
                </div>
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
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="v-card-100 border-top">  
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4" md="4" >
            <span style="font-weight: 500;">Condition Details*</span>
          </v-col>
          <v-col cols="13" sm="8" md="8">
            <span class="ma-2">What  is the condition of the item (e.g. new, used, refurbished)?</span><br>
            <v-row > 
              <v-col cols="14" sm="4" md="4">
                <label for="">
                  <input class="inputfield ml-2" type="radio" value="New" v-model="selectedValue" > <span class="titles">New</span>
                </label>
              </v-col>
              <v-col cols="14" sm="4" md="4">
                <label for="">
                  <input class="inputfield" type="radio" value="User" v-model="selectedValue"> <span class="titles">Used</span>
                </label>
              </v-col> 
              <v-col cols="14" sm="4" md="4">
                <label for="">
                  <input class="inputfield" type="radio" value="Refurbished" v-model="selectedValue"> <span class="titles">Refurbished</span>
                </label>
              </v-col> 
            </v-row>                                  
          </v-col>
        </v-row>
        <v-row class="returnmb">
          <v-col cols="12" sm="4" md="4" ></v-col>
          <v-col cols="12" sm="8" md="8"> 
            <span class="ma-2">What is the brand and model of the item?</span><br>
            <v-row>
              <v-col cols="13" sm="6" md="6" >
                <v-combobox v-model="brand" :items="brand_items" item-text="" item-value="" label="Brand*" outlined class="ma-2" ></v-combobox>
              </v-col>
              <v-col cols="13" sm="6" md="6" >
                <v-combobox v-model="model" :items="model_items" item-text="" item-value="" label="Model*" outlined class="ma-2" ></v-combobox>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="returnmb">
          <v-col cols="12" sm="4" md="4" ></v-col>
          <v-col cols="12" sm="8" md="8" >
            <span class="ma-2">What is the current market value of the item</span><br>
            <v-row>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field v-model="value" label="Value*" outlined class="ma-2"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12" sm="4" md="4"></v-col>
          <v-col cols="12" sm="8" md="8" >
            <span class="ma-2">Are there any accessories or additional items included with the item?</span><br>
            <v-row> 
              <v-col cols="14" sm="3" md="3">
                <label for="">
                  <input class="inputfield ml-2" type="radio" value="yes" v-model="answer"> <span class="titles">Yes</span>
                </label>
              </v-col>
              <v-col cols="14" sm="3" md="3">
                <label for="">
                  <input class="inputfield" type="radio" value="no" v-model="answer"> <span class="titles">No</span>
                </label>
              </v-col> 
            </v-row>    
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12" sm="4" md="4"></v-col>
          <v-col cols="8" sm="4" md="4" >
            <v-file-input v-model="file" accept= "" label="Images*" class="ma-2" ></v-file-input>
          </v-col>
          <v-col cols="9" sm="4" md="4" >
            <v-file-input v-model="file_video" accept= "" label="Videos*" class="ma-2"></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="v-card-100 border-top">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4" md="4" >
            <span style="font-weight: 500;">Exchange Offer Value</span>
          </v-col>
          <v-col cols="13" sm="4" md="4" >
              <v-text-field v-model="price" label="₹" outlined class="ma-2" @input="validatePrice" :error-messages="priceErrorMessages" ></v-text-field>
            </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="primary" style="margin-top: 18px;" :disabled="number > 0 || !channel || !item_location || !article_id1 || !select_method || !price" @click="submitForm">SUBMIT</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
  import HeaderComponent from "../../../commoncomponents/HeaderComponent.vue"
  export default {
    data() {
      return {
        headerText: "Return Creation",
        alert_type: '',
        alert_message: '',
        alert: false,
        channel: '',
        channel_items: [],
        item_location: '',
        item_location_items: [],
        location_id: '',
        location_id_items: [],
        select_method: '',
        select_method_items: [],
        article_id:'',
        article_ids: '',
        article_id1: '',
        selectedValue: '',
        brand: '',
        brand_items: '',
        model: '',
        model_items: '',
        answer: '',
        file: '',
        file_video: '',
        selectedAddItem: [],
        price: '',
        searchInvoicePopup: false,
        search_invoice: '',
        selected_manf: [],
        edit_req_headers: '',
        edit_req_table_data: [],
        invoiceItemPopup: false,
        weatherData: null,
        articleId: null,
        req_id: '',
        number: '',
        search: '',
        value: '',
        loading: true,
        returncreateionsuccesspopup: false,
        returncreationsuccessmessage: '',
        successpopup: false,
        successmessage: '',
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
      this.returntype = this.$route.params.return_value;
      this.fetchingData();
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
      fetchingData() {
        // this.fetchAllData();
        this.channels();
        this.getlocation();
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
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
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
      fetchData(searchType) {
        let searchData;

        if (searchType === "Article ID") {
          if (!this.article_id2) {
            return;
          }
          searchData = this.article_id2;
        } else if (searchType === "Serial Number") {
          if (!this.serial_number2) {
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
            if (response.data) {
              if (searchType === "Article ID") {
                this.articleId = response.data.return_inventory_informations;
              } else if (searchType === "Serial Number") {
                this.weatherData = response.data.return_inventory_informations;
                console.log(this.weatherData);
              }
            } else {
              if (searchType === "Article ID") {
                this.articleId = null;

              } else if (searchType === "Serial Number") {
                this.weatherData = null;
                this.showError = true;

              }
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            this.showAlert("error", "Something went wrong from Network: " + error);
          });
      },
      removeItem(dataItem, index) {
        this.weatherData.splice(index, 1);
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
      },
      openDialogSearchInVoice() {
        this.searchInvoicePopup = true;
      },
      closeSearchInvoicePopup() {
        this.search_invoice = '';
        this.searchInvoicePopup = false;
        this.select_method = ''
      },
      invoiceItemDataPopup() {
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
      addItem() {
        this.selectedAddItem.push(this.selected_manf);
        this.invoiceItemPopup = false
        this.searchInvoicePopup = false
        if (this.selected_manf.length > 0) {
          this.successpopup = true;
          this.successmessage = `${this.selected_manf.length} Items are marked for Exchange Return Request`
        }
      },
      afterClickOkLoadData() {
        this.successpopup = false;
        this.successmessage = ''
      },
      changeLocation() {
        if (this.item_location) {
          const selectedlocation = this.item_location.id;
          if (selectedlocation === 'Location ID') {
          }
        }
      },
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
            item_location: this.item_location.original_code,
            item_location_id: this.item_location.id,
            article_id: this.article_id1,
            serial_number: this.serial_number2,
            return_details: returnDetails,
          },
        };
        console.log("Request Data:", requestData);

        this.$http.secured
          .post("/api/v1/warehouse/return_initiation/return_creations", requestData)
          .then((response) => {
            if (response.data) {
              this.returncreationsuccessmessage = response.data.message;
              this.returncreateionsuccesspopup = true
              this.showAlert("success", response.data.message);
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
      redirectToreturncreation() {
        this.returncreateionsuccesspopup = false;
        this.returncreationsuccessmessage = ''
        this.$router.push({ name: "RetunrCreation" });
      },
      isAddButtonDisabled() {
          return this.selected_manf.length > 0;
      },
      validateInput() {        
        const temp_article_id = this.article_id1.replace(/\D/g, '');        
        if (!/^\d+$/.test(this.article_id1) || temp_article_id != this.article_id1) {
          this.errorMessages = ['Please enter a valid Article ID.'];
        } else {
          this.errorMessages = [];
        }
        this.article_id1 = temp_article_id;
      },
      validatePrice() {
        const cleanedPrice = this.price.replace(/[^\d.]/g, '');
        if (!/^\d+(\.\d{0,2})?$/.test(cleanedPrice) || cleanedPrice != this.price) {
          this.priceErrorMessages = ['Please enter a valid  price.'];
        } else {
          this.priceErrorMessages = [];
        }
        this.price = cleanedPrice;
      },
      handlePageChange(value) {
        this.page = value;
        tinvoiceItemDataPopup();
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
</style>