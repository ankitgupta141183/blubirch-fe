<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <!-- start -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">
      Insurance
    </div> -->
    <div> <HeaderComponent headerTitle="Edit Item Details" /></div>

    <v-card-title>
      <v-row>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Item Id" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col clos="2">
          <v-btn
            @click="searchItem()"
            class="mt-2 white--text"
            color="blue">Search</v-btn>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-layout align-center>
          <v-btn
            @click="updateSerailNumber()"
            class="ma-2 white--text"
            color="blue"
          >Save and Update</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card-title>

    <v-row>
      <v-col cols="8" sm="8">
        <v-layout column>
          <v-flex md6 style="overflow: auto"> 
            <h2 class="ml-2 blue--text">Inward Details</h2>
          </v-flex>
          <v-card class="ml-2">
            <v-row class="ml-2">
              <v-col cols="6" sm="6">
                <v-row>
                  <v-col cols="4" sm="4" md="4">
                    SR Number
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <input v-model="sr_number" type="text" style= "margin-top: 10px; width: 200px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" id="field-sr_number" disabled="true">
                  </v-col>
                  <v-col cols="2" sm="2" md="2">
                    <button v-show= "true" id="edit-sr_number" ><img src="@/assets/images/Edit_pencil.png" @click="enableField('sr_number')" /></button>
                    <button v-show="false" id="save-sr_number"><img src="@/assets/images/save.png"/></button>
                  </v-col>
                </v-row>
                <v-row v-if="currentUser.roles.includes('central_admin')">
                  <v-col cols="4" sm="4" md="4">
                    SERIAL NUMBER 1
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <input v-model="serial_number" type="text" style= "margin-top: 10px; width: 200px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" id="field-serial_number" disabled="true">
                  </v-col>
                  <v-col cols="2" sm="2" md="2">
                    <button v-show= "true" id="edit-serial_number" ><img src="@/assets/images/Edit_pencil.png" @click="enableField('serial_number')" /></button>
                    <button v-show="false" id="save-serial_number"><img src="@/assets/images/save.png"/></button>
                  </v-col>
                </v-row>
                <v-row v-if="currentUser.roles.includes('central_admin')">
                  <v-col cols="4" sm="4" md="4">
                    SERIAL NUMBER 2
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <input v-model="serial_number_2" type="text" style= "margin-top: 10px; width: 200px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" id="field-serial_number_2" disabled="true">
                  </v-col>
                  <v-col cols="2" sm="2" md="2">
                    <button v-show= "true" id="edit-serial_number_2" ><img src="@/assets/images/Edit_pencil.png" @click="enableField('serial_number_2')" /></button>
                    <button v-show="false" id="save-serial_number_2"><img src="@/assets/images/save.png"/></button>
                  </v-col>
                </v-row>
                <v-row v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')">
                  <v-col cols="4" sm="4" md="4">
                    INVOICE NUMBER
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <input v-model="invoice_number" type="text" style= "margin-top: 10px; width: 200px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" id="field-invoice_number" disabled="true">
                  </v-col>
                  <v-col cols="2" sm="2" md="2">
                    <button v-show= "true" id="edit-invoice_number" ><img src="@/assets/images/Edit_pencil.png" @click="enableField('invoice_number')" /></button>
                    <button v-show="false" id="save-invoice_number"><img src="@/assets/images/save.png"/></button>
                  </v-col>
                </v-row>

                <v-row v-if="currentUser.roles.includes('central_admin')  || currentUser.roles.includes('site_admin')">
                  <v-col cols="4" sm="4" md="4">
                    CALL LOG NUMBER
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <input v-model="call_log_number" type="text" style= "margin-top: 10px; width: 200px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" id="field-call_log_number" disabled="true">
                  </v-col>
                  <v-col cols="2" sm="2" md="2">
                    <button v-show= "true" id="edit-call_log_number" ><img src="@/assets/images/Edit_pencil.png" @click="enableField('call_log_number')" /></button>
                    <button v-show="false" id="save-call_log_number"><img src="@/assets/images/save.png"/></button>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="4" md="4">
                    INWARD DATE
                  </v-col>
                  <v-col cols="4" sm="4" md="4">
                    {{inventory.inward_date}}
                  </v-col>
                  <v-col cols="4" sm="4" md="4">
                    
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="4" md="4">
                    RETURN REASON
                  </v-col>
                  <v-col cols="4" sm="4" md="4">
                    {{inventory.return_reason}}
                  </v-col>
                  <v-col cols="4" sm="4" md="4">
                    
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-flex md6 style="overflow: auto"> 
            <h2 class="ml-2 mt-4 blue--text" color="blue">Grading Images</h2>
          </v-flex>
          <v-card class="ml-2">
            <v-col cols="12" v-if="images != []" >
              <v-row v-for="(src) in images">
                <v-img :src="src" width="100px" height="100px" /></v-img>
              </v-row>
            </v-col>
            <p v-else>No Image Present </p>
          </v-card>
        </v-layout>
      </v-col>
      <v-col cols="4" sm="4" class="mt-11">
        <v-card class="overflow-hidden v-card v-sheet">
          <v-row class="ml-2">
            <v-col cols="6">
              <span class="blue--text bold">Current Status</span>
              <p>{{inventory.status}}</p>
            </v-col>
            <v-col cols="6">
              <span class="float-right mr-2">{{inventory.last_updated}}</span>
            </v-col>
            <v-col cols="6">
              <img src="@/assets/images/icons/reinward.svg" /></img>
              <span class="ml-2">Inward</span>
              <p class="ml-10" style="font-size: 12px;">Inwarded On {{inventory.inward_date}}</p>
            </v-col>
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <img src="@/assets/images/icons/Group.svg" /></img>
              <span class="ml-2">Disposition</span>
              <p class="ml-10" style="font-size: 12px;">Last Disposition On{{inventory.last_disposition}}</p>
            </v-col>
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <img src="@/assets/images/icons/delivery-note.png" /></img>
              <span class="ml-2">Dispatch</span>
              <p class="ml-10" style="font-size: 12px;">Dispatched On{{inventory.dispatch_date}}</p>
            </v-col>
            <v-col cols="6">
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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
        search: '',
        serial_number: '',
        serial_number_2: '',
        inventory: {},
        serial_number: '',
        invoice_number: '',
        call_log_number: '',
        alert: false,
        alert_type: "success",
        alert_message:'',
        inputRules: [ (v) => (v && (v.length == 15)) && ((/^[A-Za-z0-9]+$/.test(v))) || "Invoice Number must be equal to 15 characters only Alpha Numeric",],
        images: []
      };
    },
    computed: mapState(["currentUser", "signedIn"]),
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

      searchItem(){
        if (this.search.length == 0){
          this.showAlert("error", "Please provide value in search");
          return
        }
        this.$http.secured
          .get("/api/v1/warehouse/inventories/search_inventory", {params: {tag_number: this.search}})
          .then((response) => {
              if (response.data.inventory) {
                this.inventory = response.data.inventory
                this.sr_number = this.inventory.sr_number
                this.serial_number = this.inventory.serial_number
                this.serial_number_2 = this.inventory.serial_number_2
                this.invoice_number = this.inventory.invoice_number
                this.call_log_number  = this.inventory.call_log_number
                this.images = this.inventory.grading_images
                this.$toast.success("Item found");
              }else{
                this.$toast.error("Item Not found");
              }
          })
          .catch((error) => {
            this.$toast.error("Error in geting item");
          });

      },

      enableField (type){
        $("#edit-"+type).hide();
        $("#save-"+type).show();
        $("#field-"+type).prop("disabled", false);
        $("#field-"+type).focus();
      },

      updateSerailNumber(){
        if (this.search.length == 0){
          this.showAlert("error", "Please provide value in search");
          return
        }

        if (this.sr_number == '' && this.serial_number == '' && this.serial_number_2 != ''){
          this.showAlert('error', 'Please Provide any value to update')
        }

        if (this.invoice_number.length != 0 && (this.invoice_number.length != 15 || !(/^[A-Za-z0-9]+$/.test(this.invoice_number)) )){
          this.showAlert("error", "Please ProvideInvoice Number with 15 digits only Alpha Numeric");
          return
        }

        const formData = new FormData();
        formData.append('tag_number', this.search)
        if (this.sr_number != '' && this.sr_number != null  && this.sr_number != 'null'){
          formData.append('sr_number', this.sr_number)
        }
        if (this.serial_number != '' && this.serial_number != null && this.serial_number != 'null'){
          formData.append('serial_number', this.serial_number)
        }

        if (this.serial_number_2 != '' && this.serial_number_2 != null && this.serial_number_2 != 'null'){
          formData.append('serial_number_2', this.serial_number_2)
        }

        if (this.invoice_number != '' && this.invoice_number != null && this.invoice_number != 'null'){
          formData.append('invoice_number', this.invoice_number)
        }

        if (this.call_log_number != '' && this.call_log_number != null && this.call_log_number != 'null'){
          formData.append('call_log_number', this.call_log_number)
        }

        this.$http.secured.patch('/api/v1/warehouse/inventories/update_serial_number', formData)
        .then(response => {
          if (response.data.inventory){
              this.inventory = {}
              this.sr_number = ''
              this.serial_number = ''
              this.serial_number_2 = ''
              this.invoice_number = ''
              this.call_log_number = ''
              this.images = ''
              this.search = ''
              var items = ['sr_number', 'serial_number_2', 'serial_number']
               for (var i = 0; i < items.length; i++) {
                var type = items[i]
                $("#edit-"+type).show();
                $("#save-"+type).hide();
                $("#field-"+type).prop("disabled", true);
               }
              this.showAlert('success', 'Successfully Updated')
          }else{
            this.showAlert("error","Please Enter Valid Item ID to Updated");
          }
        })
      }

    },
  };
</script>
