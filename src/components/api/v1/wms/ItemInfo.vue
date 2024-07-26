<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <template>
    <div class="vld-parent">
      <loading :active.sync="isLoading" color="#007bff" :z-index="9999" :width="110" :height="110" :isFullPage="true"></loading>
    </div>
  </template>
    <v-row justify="center">
      <v-dialog v-model="imageDailog" persistent max-width="800px">
          <v-card style="overflow-y:auto;">
          <v-card-title>
            Image Attachment
          </v-card-title>
          <v-card-actions style="overflow-y:auto;">
           
           <template v-for="(item, index) in images">
            <v-col cols="12" sm="4" md="4" >
            <v-row>
              <v-checkbox
              :id="item" :key="index" :value="item" name="item" type="checkbox" v-model="checkedImages"
              color="indigo darken-3"
              hide-details
              class="pl-3"
              ></v-checkbox>
              <v-img :src="item" width="170" ></v-img>
              </v-row>
            </v-col>
            </template>
                 
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue" @click="downloadImage">Download Selected Images</v-btn>
            <v-btn small text color="normal" @click=" closeImageDialog">Cancel</v-btn>
          </v-card-actions>

       </v-card>
       </v-dialog>
      </v-row>

    <!-- <v-row justify="center">
      <v-dialog v-model="imageDailog2" persistent max-width="800px">
          <v-card style="overflow-y:auto;">
          <v-card-title>
            Image Attachment
          </v-card-title>
          <v-card-actions style="overflow-y:auto;">
           
           <template>
            <v-col cols="12" sm="4" md="4" >
            <v-row>
              <v-img :src="item_image_url" width="170" ></v-img>
              </v-row>
            </v-col>
            </template>     
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue" @click="downloadImage">Download Selected Images</v-btn>
            <v-btn small text color="normal" @click="imageDailog2 = false">Cancel</v-btn>
          </v-card-actions>

       </v-card>
       </v-dialog>
      </v-row> -->
    <div> <HeaderComponent headerTitle="Item Information" /></div> 
      <v-card class="v-card-100">
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-text-field class="ml-2" prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id or Serial Number" v-on:keyup.enter="searchItem()"></v-text-field>
          </v-col>
          <v-col cols="1" sm="1" md="1">
            <v-btn medium class="mr-2 mt-5 text-none" style="background-color:#0357D0 !important" color="primary" @click="searchItem()">Search</v-btn>
          </v-col>
          <v-col cols="2" sm="2" md="2">
            <v-chip v-if="showItemFound" class="mt-5" :color="item_status" text-color="white">{{item_text}}</v-chip>
          </v-col>
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

          <v-card-text >
            <div v-if="(active_tab == 'Item Details' || active_tab == 'Outward Documents') && item_text == 'Item Found'">
              <v-row v-for="(items,i) in item_details_hash">
                <v-col cols="12" sm="12" v-if="i != 'Attachments'">
                  <v-card >
                    <v-card-title>
                      <span class="headline" text-size="small"> {{i}} </span>
                    </v-card-title>
                    <v-card-text>
                      <v-row v-for="(item,i2) in items">
                        <v-col cols="6" sm="6">
                          {{i2}}
                        </v-col>
                        <v-col cols="6" sm="6" v-if="i == 'Outward Documents'">
                          <span @click="openImage(item.attachment)"  style="color: rgb(3 87 204 / 1);">{{item.number}}</span>
                        </v-col>
                        <v-col cols="6" sm="6" v-else>
                          {{item}}
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <v-row v-if="active_tab == 'Packing' || active_tab == 'Item Condition' || active_tab == 'Functional Condition' || active_tab == 'Accessories'" class="ml-2">
              <v-col cols="2" sm="2">
                <strong>{{heading}}</strong>
              </v-col>
              <v-col cols="5" sm="5">
                <strong style="margin-left: 50px;"> {{output}} </strong>  
              </v-col>
              <!-- <v-col cols="4" sm="4" v-if="active_tab != 'Functional Condition' && active_tab != 'Accessories'">
                <span style="color: rgb(3 87 204 / 1); font-weight: bold; margin-left: 22px;" @click="imageDailog=true">Images</span>
              </v-col> -->
            </v-row>
            <v-data-table  
                v-if="active_tab == 'Packing' || active_tab == 'Item Condition' || active_tab == 'Functional Condition' || active_tab == 'Accessories'"
                :dense="true"   
                :headers="sub_tabs" 
                :items="grading_results">
                <!-- <template v-slot:item.images="{item}">
                  <span style="color: rgb(3 87 204 / 1); font-weight: bold;" @click="openImageDialog(item)">Image</span>
                </template> -->
                <template v-slot:item.image_url="{item}">
                  <div v-if="item.image_url.length == 0">
                    <span>N/A</span>
                  </div>
                  <div v-else>
                    <span style="color: rgb(3 87 204 / 1);" @click="openImageDialog(item)">Image</span>
                  </div>
                </template>
            </v-data-table>
            <v-data-table  
                v-if="active_tab == 'Item Journey'"
                :dense="true"   
                :headers="sub_tabs_journy"
                :items="journy_data">
                <template v-slot:item.attachment_display="{ item }">
                  <div v-for="attachment in item.attachments">
                    <a  style="color: rgb(3 87 204 / 1);" :href="attachment.url" target="_blank">{{attachment.name}}</a>
                  </div>
                </template>
            </v-data-table>
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
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        isLoading: false,
        alert: false,
        active_tab: "Item Details",
        search: '',
        tabs: [
          "Item Details",
          "Packing",
          "Item Condition",
          "Functional Condition",
          "Accessories",
          "Item Journey",
          "Outward Documents"
        ],
        action: "",
        tab_name: '',
        sub_tabs: [
        {text: 'Damage Position', value: 'position',width: '20%'},
        {text: 'Annotation', value: 'value', width: '40%'},
        {text: 'Images', value: 'image_url', width: '40%'}
        ],
        sub_tabs_journy: [
        {text: 'Disposition Status', value: 'disposition'},
        {text: 'Sub Status', value: 'status'},
        {text: 'Entry Date', value: 'entry_date'},
        {text: 'TAT', value: 'tat_days'},
        {text: 'Comments', value: 'comment'},
        {text: 'Attachments', value: 'attachment_display'},
        {text: 'User', value: 'status_changed_by'},
        ],
        grading_results: [],
        journy_data: [],
        item_details_hash: [],
        searched_item: {},
        showItemFound:false,
        item_status: '',
        item_text: '',
        heading: '',
        output: '',
        images: [],
        checkedImages: [],
        alert_message: '',
        alert_type: '',
        imageDailog: false,
        imageDailog2: false,
        item_image_url: ''
      };
    },
    created() {
      if (this.$route.params.type && this.$route.params.type == 'external'){
        this.search = this.$route.params.tag_number
      }
    },
    components: {
      editor: Editor,
      HeaderComponent,
      Loading
    },
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },

      loadData(tab) {
        this.checkedImages = []
        this.active_tab = tab;
        if (this.active_tab == 'Item Details') {
          this.item_details_hash = this.searched_item.item_details
        }else if (this.active_tab == 'Outward Documents'){
          this.item_details_hash = this.searched_item.outward_details
        } else if (this.active_tab == 'Packing'){
          this.grading_results = this.searched_item.packaging_info.Packaging
          this.heading = 'Packaging'
          this.output = this.searched_item.packaging_info.Output
          this.images = this.searched_item.packaging_info.Images
          this.sub_tabs = [
          {text: 'Damage Position', value: 'position',width: '20%'},
          {text: 'Annotation', value: 'value', width: '40%'},
          {text: 'Images', value: 'image_url', width: '40%'}
          ]
        }else if (this.active_tab == 'Item Condition'){
          this.grading_results = this.searched_item.item_condition_info.ItemCondition
          this.heading = 'Item Condition'
          this.output = this.searched_item.item_condition_info.Output
          this.images = this.searched_item.item_condition_info.Images
          this.sub_tabs = [
          {text: 'Damage Position', value: 'position',width: '20%'},
          {text: 'Annotation', value: 'value', width: '40%'},
          {text: 'Images', value: 'image_url', width: '40%'}
          ]
        }else if (this.active_tab == 'Functional Condition'){
          this.grading_results = this.searched_item.functional_info.Functional
          this.sub_tabs= [
          {text: 'Functional Question', value: 'position',width: '20%'},
          {text: 'Answer', value: 'value', width: '40%'}
          ]
          this.heading = 'Functional Condition'
          this.output = this.searched_item.functional_info.Output
        }else if (this.active_tab == 'Accessories'){
          this.grading_results = this.searched_item.accessories_info.Accessories
          this.sub_tabs= [
          {text: 'Accessories Question', value: 'position',width: '20%'},
          {text: 'Answer', value: 'value', width: '40%'}
          ]
          this.heading = 'Accessories'
          this.output = this.searched_item.accessories_info.Output
        } else if (this.active_tab == 'Item Journey'){
          this.journy_data = this.searched_item.item_journey

          this.journy_data.sort((a, b) => {
            return (new Date(b.created_at)) - (new Date(a.created_at))
          });
          return items;
        }

      },
      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      searchItem(){
        if (this.search.length == 0){
          this.showAlert("error", "Please provide value in search");
          return
        }
        this.isLoading =true,
        this.$http.secured
          .get("/api/v1/warehouse/inventories/item_info", {params: {tag_number: this.search}})
          .then((response) => {
              if (response.data.inventory) {
                this.isLoading =false
                this.searched_item = response.data.inventory;
                this.showItemFound = true
                this.item_status = 'green'
                this.item_text = 'Item Found'
                this.loadData('Item Details')
                this.active_tab = 'Item Details'
                this.checkedImages = []
              }else{
                this.isLoading =false
                this.showItemFound = true
                this.item_status = 'red'
                this.item_text = 'Item Not Found'
                this.checkedImages = []
              }
          })
          .catch((error) => {
            this.isLoading =false
            this.$toast.error("Error in geting item");
          });
        },

        openImageDialog(item){
          this.images = item.image_url
          this.imageDailog = true
        },

        downloadImage(){
          if (this.checkedImages.length <= 0) {
            this.showAlert("error", "Please Select any on image to download");
            return
          }
          for (var i = 0; i <= this.checkedImages.length-1; i++) {
            var fileLink = document.createElement('a');

            fileLink.href = this.checkedImages[i]
            fileLink.setAttribute('target', '_blank');
            document.body.appendChild(fileLink);

            fileLink.click();
          }
        },

        openImage(url){
          var fileLink = document.createElement('a');

          fileLink.href = url
          fileLink.setAttribute('target', '_blank');
          document.body.appendChild(fileLink);
          fileLink.click();
        },

        closeImageDialog(){
          this.imageDailog = false
          this.checkedImages = []
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