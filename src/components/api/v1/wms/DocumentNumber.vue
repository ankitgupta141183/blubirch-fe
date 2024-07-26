<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <div> <HeaderComponent headerTitle="Document Number" /></div> 
      <v-card class="v-card-100">
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-text-field class="ml-2" prepend-inner-icon="mdi-magnify" v-model="search" label="Search Document Number" v-on:keyup.enter="searchItem()"></v-text-field>
          </v-col>
          <v-col cols="1" sm="1" md="1">
            <v-btn medium class="mr-2 mt-5 text-none" style="background-color:#0357D0 !important" color="primary" @click="searchItem()">Search</v-btn>
          </v-col>
          <!-- <v-col cols="2" sm="2" md="2">
            <v-chip class="mt-5" :color="item_status" text-color="white">{{item_text}}</v-chip>
          </v-col> -->
        </v-row>

        <v-card class="v-card-100 ma-2">
          <v-tabs v-model='tab_name'>
            <v-tab
              style="text-transform:none!important;"
              @click="loadData(tab)"
              v-for="(tab, index) in tabs"
              :key="index"
            >{{tab}}</v-tab>
          </v-tabs>

          <v-card-text>
            <div v-if="active_tab == 'Item Details' && item_text=='Item Found'">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-card >
                    <v-expansion-panels
                      v-model="panel"
                      :disabled="disabled"
                      multiple
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <span class="float-left" style="width: 80%; font-size: 18px; color: #1D88FB; font-weight: 600;">Document Details</span>
                          <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="searched_item.url" target="_blank" download>Download Document</a>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-simple-table>
                            <tbody>
                              <tr>
                                <td>Document Number</td>
                                <td>{{searched_item.reference_number}}</td>
                              </tr>
                              <tr>
                                <td>Document Type</td>
                                <td>{{searched_item.document_name}}</td>
                              </tr>
                              <tr>
                                <td>Site of Upload</td>
                                <td> {{searched_item.site_name}} </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                
                      <v-expansion-panel>
                        <v-expansion-panel-header><span style="font-size: 18px; color: #1D88FB; font-weight: 600;">Item Details</span></v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-data-table 
                              :dense="true"   
                              :headers="sub_tabs" 
                              :items="document_items"
                              disable-pagination
                              :hide-default-footer="true">
                              <template v-slot:item.action="{item}">
                                <img @click="redirectUrl(item)"
                                  src="@/assets/images/job_sheet.png"
                                  title="Details"
                                />
                              </template>
                              <template v-slot:item.serial_numbers="{item}">
                                <span>{{item.serial_number}}, {{item.serial_number_2}}</span>
                              </template>
                          </v-data-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-card>

    <v-layout column>

      <v-flex md6 style="overflow: auto"> 

      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        loading: false,
        alert: false,
        active_tab: "Item Details",
        search: '',
        tabs: [
          "Document Details"
        ],
        action: "",
        tab_name: '',
        sub_tabs: [
        {text: 'Item Id', value: 'tag_number'},
        {text: 'Item Description', value: 'item_description'},
        {text: 'Serial Number', value: 'serial_numbers'},
        {text: 'Details', value: 'action'}
        ],
        document_items: [],
        searched_item: {},
        heading: '',
        alert_message: '',
        alert_type: '',
        panel: [0, 1],
        disabled: false,
        readonly: false,
        item_status: 'red',
        item_text: 'Item Not Found'
      };
    },
    created() {
    },
    components: {
      editor: Editor,
      HeaderComponent
    },
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },

      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      redirectUrl(item){
        this.$router.push({ name: 'ItemInfo', params: { tag_number: item.tag_number, type: 'external'} });
      },

      searchItem(){
        if (this.search.length == 0){
          this.showAlert("error", "Please provide value in search");
          return
        }
        this.$http.secured
          .get("/api/v1/warehouse/inventories/document_search", {params: {reference_number: this.search}})
          .then((response) => {
            if (response.data.message != 'Not Found'){
              this.item_status = 'green'
              this.item_text = 'Item Found'
              this.$toast.success("Item Found");
              if (response.data.warehouse_order_document) {
                this.searched_item = response.data.warehouse_order_document
              }
              else if (response.data.warehouse_order){
                this.searched_item = response.data.warehouse_order
              } else if ((response.data.inventory_document)) {
                this.searched_item = response.data.inventory_document
              }

              if (this.searched_item){
                this.document_items = this.searched_item.inventories
              }
            }else{
              this.item_status = 'red'
              this.item_text = 'Item Not Found'
              this.$toast.error("Item not found");
            }
          })
          .catch((error) => {
            this.$toast.error("Error in geting item");
          });
        },


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