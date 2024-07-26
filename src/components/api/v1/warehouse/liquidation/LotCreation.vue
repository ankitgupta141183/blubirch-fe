<template>
    <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>

      <v-dialog v-model="confirmationModelDelete" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>  Are you sure! You want create lot? </span><br>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="closeDeleteItemPopUp2()">Cancel</v-btn>
            <v-btn small color="primary" @click="create_offline_lot()">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog v-model="requistIdPopup" persistent max-width="600px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Total Request IDs: {{liquidation_requests.length}}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="requistIdPopup = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-simple-table class="gray-border">
                    <template>
                      <thead>
                        <tr>
                          <th class="text-left">Request ID</th>
                          <th class="text-left">Total items</th>
                          <th class="text-left">Graded</th>
                          <th class="text-left">Pending Regrade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in liquidation_requests">
                          <td :class="getColor(item)" @click="getRequestItems(item.request_id)">{{item.request_id}}</td>
                          <td>{{item.total_items}}</td>
                          <td>{{item.graded_items}}</td>
                          <td>{{item.remaining_count}}</td>
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
            <v-btn small color="normal" @click="requistIdPopup=false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="vendorModel" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Please Select Vendor</span><br>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-simple-table class="gray-border">
                    <template>
                      <thead>
                        <tr>
                          <th class="text-left">Id</th>
                          <th class="text-left">Lot Name</th>
                          <th class="text-left">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selected_lots">
                          <td>{{item.id}}</td>
                          <td>{{item.lot_name}}</td>
                          <td>{{item.quantity}}</td>
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
                <v-col cols="12" sm="12" md="12">
                  <v-autocomplete v-model="vendor_code" :items="vendor_code_menu_items" item-text="vendor_code_name" item-value="vendor_code" placeholder="Search/Enter Vendor Code*" :rules="inputRules" prepend-icon="mdi-magnify"></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="closeVendorModel()">Cancel</v-btn>
            <v-btn small color="primary" @click="dispatchOfflineLots()">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <v-dialog v-model="quotationlistmodel" persistent fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
          <v-card tile>
            <v-toolbar dark color="primary" style="max-height: 100px;" >
              <v-toolbar-title>Quotation List</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="quotationlistmodel = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-row class="ma-5 pa-0" style="max-height: 15px;">
                <v-col :cols="4" md="4" sm="4">
                    <span> Lot Id: {{current_lot.order_number}}</span>
                </v-col>
                <v-col :cols="4" md="4" sm="4">
                    <span> Lot Description: {{current_lot.lot_desc}}</span>
                </v-col>
                <v-col :cols="4" md="4" sm="4">
                    <span> Quantity: {{ current_lot.quantity }}</span>
                </v-col>
            </v-row>
            <v-card-title>
              <v-text-field prepend-inner-icon="mdi-magnify" v-model="quotation_search" label="Search" single-line></v-text-field>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>

              <v-data-table
                :dense="true"
                :headers="quotation_headers"
                :items="quotation_records"
                :search="quotation_search"
                class="elevation-1"
              >
                <template v-slot:item.action="{item}">
                  <img @click="selectQuotation(item)"
                    src="@/assets/images/job_sheet.png"
                    title="Select Quotation"
                  />
                </template>              
              </v-data-table>
            </v-card-text>

            <div style="flex: 1 1 auto;"></div>
          </v-card>
        </v-dialog>

      <v-dialog v-model="deleteItemPopup" max-width="900px" max-height= "900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline"> Delete Item From Lots </span>
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
                    <v-col v-if="active_tab == 'Pending Publish'" cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field
                          v-model="new_lot_name"
                          label="Provide New Lot Name"
                          type="text"
                        ></v-text-field>
                      </v-flex>
                    </v-col>

                  </v-row>
                  <v-flex>

                    <v-textarea outlined v-model="delete_remark" label= "Add Remarks" ></v-textarea>
                  </v-flex>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="closeDeleteItemPopUp()">Cancel</v-btn>
            <v-btn small color="primary" @click="deleteLotItem()" :disabled="number > 0">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
            <v-btn small color="blue darken-1" text @click="closeSetDisposition">Cancel</v-btn>
            <v-btn small color="primary" @click="setDisposition">{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- Edit  Lot-->
    <v-row justify="center">
      <v-dialog v-model="lotEditDialog" persistent max-width="1000px">
        <v-form ref="lotEditForm">
          <v-card class="v-card-100">
            <v-card-title class="pl-4">
              <span>Edit Lot</span>
              <!-- <span><v-btn icon class="icon-right" @click="closeLotEditDialog"><v-icon>mdi-close</v-icon></v-btn></span> -->
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="12">
                  <v-text-field :rules="inputRules"  label="Lot Name" disabled outlined v-model="lot_name" type="text"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="4" md="12">
                  <v-text-field :rules="inputRules"  label="Lot Description" outlined v-model="lot_description" type="text"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="4" md="6">
                  <v-text-field :rules="mrp_rule"  label="MRP (₹)" outlined disabled v-model="lot_mrp" type="number" :min="0"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="4" md="6">
                  <v-text-field :rules="buy_now_rule"  label="Buy Now(₹)" outlined  v-model="buy_now_price" type="number" :min="0"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="6">
                  <v-text-field :rules="floor_price_rule"  label="Floor Price(₹)" outlined v-model="floor_price" type="number" :min="0"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="4" md="6">
                  <v-text-field :rules="res_price_rule"  label="Reserve Price(₹)" outlined v-model="reserve_price" type="number" :min="0"></v-text-field>
                </v-col>
              
                <v-col cols="12" sm="4" md="6">
                  <v-text-field :rules="inc_slab_rule"  label="Increment Slab(₹)" outlined v-model="increment_slab" type="number" :min="0"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                 <!-- Start date -->
                <v-col cols="12" sm="4" md="6">
                  <v-menu ref="menu_16" v-model="menu_16" :close-on-content-click="false" :return-value.sync="start_date"   transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined
                      v-model="start_date"
                      label="Start Date"
                      prepend-inner-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on" 
                      :rules="inputRules"
                      ></v-text-field>
                    </template>
                    <v-date-picker  v-model="start_date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu_16 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu_16.save(start_date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- End date -->
                <v-col cols="12" sm="4" md="6">
                  <v-menu ref="menu_17" v-model="menu_17" :close-on-content-click="false" :return-value.sync="end_date"
                    transition="scale-transition" offset-y min-width="290px">

                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                          v-model="end_date"
                          label="End Date"
                          prepend-inner-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on" 
                          :rules="inputRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="end_date" no-title scrollable >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu_17 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu_17.save(end_date)">OK</v-btn>
                      </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              
              <v-row>
                <!-- Start Time -->
                <v-col cols="12" sm="4" md="6">
                  <v-menu ref="menu_18"
                    v-model="menu_18"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time7"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    :rules="inputRules">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time7"
                        label="Start Time"
                        prepend-inner-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        :rules="inputRules"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      ampm-in-title
                      v-if="menu_18"
                      v-model="time7"
                      :allowed-minutes="allowedStep"
                      full-width
                      @click:minute="$refs.menu_18.save(time7)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <!-- End Time -->
                <v-col cols="12" sm="4" md="6">
                  <v-menu
                    ref="menu_19"
                    v-model="menu_19"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time8"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time8"
                        label="End Time"
                        prepend-inner-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        :rules="inputRules"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu_19"
                      v-model="time8"
                      :allowed-minutes="allowedStep"
                      full-width
                      @click:minute="$refs.menu_19.save(time8)">
                    </v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <!--<v-row>
                <v-col cols="12" sm="4" md="12" >
                  <div class="field image-box" align="left">
                    <v-file-input small-chips
                      outlined dense counter
                      @change="file_change"
                      multiple
                      v-model="files"
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      placeholder="Attach Images"
                      label="Image Attacment"> 
                      </v-file-input>
                      <div class="files"></div>
                  </div>
                </v-col>
              </v-row>-->
              <v-card-actions>
                     <v-btn  color="primary" @click="get_image_popup">CHOOSE IMAGES</v-btn>
                      <div v-if="lot_images_count > 0" class="pl-5" style="font-style:normal">
                      {{ lot_images_count }} IMAGES ATTACHED
                      </div>
                      <v-row v-else>
                        <v-col cols="6" sm="6">
                          <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                    <v-container v-if="this.cards.length > 0"fluid class="attach-img-box">
                <v-row dense>
                  <v-col v-for="(url, index) in cards" :key="index">
                    <v-card class="mx-auto" width="200">
                      <v-img
                        :src="url"
                        class="rounded-lg"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px">
                      </v-img>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                          <v-btn 
                          color="orange lighten-2"
                          text 
                          @click="reomoveImg(url,index)"
                          >
                          Remove
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small text color="normal" @click="closeLotEditDialog">Cancel</v-btn>
              <v-btn small color="primary" @click="updateLotDetails" >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>


        <v-row justify="center">
            <v-dialog v-model="LotInventoryDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card class="card-width" style="max-width:100% !important;">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                Lot Information
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-card-actions>

                <v-btn class="blue--text" color="white" small v-if="active_tab == 'Pending Publish'" @click="deleteBeamLotConfirmationPopupOpen(selected_lot_details.id)" >DELETE LOT</v-btn>

                <v-btn class="blue--text" color="white" small v-if="active_tab == 'Decision Pending' && selected_lot_details.status != 'Dispatch Ready'" @click="LotDetailSubmitFn" :disabled="number > 0 || !payment_status || !winner_amount ||!winner_code || !amount_received" >SAVE AND CLOSE</v-btn>

                <v-btn icon dark @click="closePopup"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-actions>
            </v-toolbar>
                  <v-card><v-card-title style="padding:0px;">
                  <v-col cols="12" sm="6" md="3">
                  <span style="font-size: 14px;"> Lot ID : {{selected_lot_details.id}}</span>
                      </v-col>

                   <v-col cols="12" sm="6" md="6">
                  <span style="font-size: 14px;"> Lot Description : {{selected_lot_details.lot_name}} </span>
                      </v-col> 
                      <v-col cols="12" sm="6" md="3">
                        
                  <span style="font-size: 14px;"> Quantity: {{selected_lot_details.quantity}}</span>
                  <v-btn v-if="currentUser.roles.includes('central_admin') && active_tab == 'Pending Publish'" class="ml-2" color="error" small @click="openDeleteItem()" >DELETE ITEM</v-btn>
                  <!-- <v-btn  v-if="selected_lot_details.is_expired && active_tab == 'Decision Pending'" class="ml-2" color="success" small @click="OpenReliveLotPopup(selected_lot_details)" >RELIVE LOT</v-btn> -->
                    </v-col>
                  </v-card-title></v-card>
                    <v-tabs 
                    align-with-title
                    class="primary lighten-2"
                    background-color="#E5F1FF"
                    >
                    <v-tabs-slider color="primary"></v-tabs-slider>
                    <v-tab 
                        v-for="item in LotInventorytTabData"
                        :key="item"
                        @click="lotInventoryData(item)"
                    >
                        {{ item }}
                    </v-tab>

                    </v-tabs>               
                <v-card-text>

                <v-card v-if="LotInventorytabe == 'Inventory List'" class="theme--light">
                    <v-card-text> 
                    <v-data-table  
                        :dense="true"
                        v-model="selected"
                        :headers="LotInventoryTableHeader" 
                        :items="LotInventoryData" 
                        :search="inventory_search"  
                        :loading="loading"
                        show-select 
                        loading-text="Loading Data... Please wait">\
                        <template v-slot:item.delete_item="{item}">
                          <img v-if="currentUser.roles.includes('central_admin') && active_tab == 'Pending Publish'" @click="openDeleteItem(item)"
                            src="@/assets/images/job_sheet.png"
                            title="Delete Item"
                          />
                        </template>
                    </v-data-table>
                 </v-card-text>
                </v-card>

                <v-card v-if="LotInventorytabe == 'Bid Details'" class="theme--light">
                    <v-card-text> 
                    <v-data-table  
                        :dense="true"   
                        :headers="BidDetailHeader"
                        :items="quotation_records"
                        >
                    </v-data-table>
                 </v-card-text>
                </v-card>

                <v-card v-if="LotInventorytabe == 'Emailed Vendors List'" class="theme--light">
                    <v-card-text> 
                    <v-data-table  
                        :dense="true"   
                        :headers="VendorListDetailsHeader"
                        :items="vendor_email_records"
                        >
                    </v-data-table>
                 </v-card-text>
                </v-card>

                <v-card v-if="LotInventorytabe == 'Settlement Details'" class="theme--light">
                  <v-card-text>
                    <v-form ref="settlementForm">
                      <v-container>
                        <v-row>
                          <v-col cols="6" sm="6" md="6">
                            <span class="lot_sub_header">  Bid Winner Details </span>
                          </v-col>
                          <v-col v-if="currentUser.roles.includes('central_admin')" cols="6" sm="6" md="6" style="text-align: right;">
                            <u @click="openquotationlist" style="color: blue; font-size: 14px;"> Check Quotation List </u>
                          </v-col>
                        </v-row>

                          <v-row>
                            <v-col cols="12" sm="4" md="6">
                              <v-text-field
                               v-model="winner_code"
                               outlined
                               :rules="inputRules"
                               chips
                               label="Winner Code*"
                               disabled=true>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="6">
                              <v-text-field :rules="inputRules" hide-details label="Winner Amount (INR)*" outlined v-model="winner_amount" type="number" disabled=true></v-text-field> 
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="12" sm="4" md="6">
                              <v-flex>
                                <v-select :rules="inputRules" @change="changePaymentStatus" hide-details :items="payment_status_menu_items" v-model="payment_status" color="primary" label="Payment Status*" outlined :disabled="selected_lot_details.status == 'Dispatch Ready'"></v-select>
                              </v-flex>
                            </v-col>
                            <v-col cols="12" sm="4" md="6">
                              <v-text-field :rules="payment_status == '' || payment_status =='Full Payment Received' ? [] : partial_rules" :disabled="payment_status == '' || payment_status =='Full Payment Received'"  label="Amount received (INR)*" outlined v-model="amount_received" type="number" @keyup="trackingChange"></v-text-field>
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
                                <v-radio :disabled="payment_status == null || payment_status == '' || payment_status =='Partial Payment'" :rules="payment_status == '' || payment_status =='Partial Payment' ? []: inputRules" v-for="n in  ['Yes','No']" :key="n" :label="`${n}`" :value="n"></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                          <v-row>
                           <v-col cols="6" sm="4" md="6">
                             <v-file-input v-model="files" outlined hide-details small-chips multiple label="ATTACH DOCUMENT" :disabled="selected_lot_details.status == 'Dispatch Ready'"></v-file-input>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-card v-if="LotInventorytabe == 'Lot Details'" class="theme--light">
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
                        <v-col cols="6" sm="6" md="6">
                          <v-text-field hide-details label="MRP (INR)" outlined readonly v-model="selected_lot_mrp" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" md="6">
                          <v-text-field hide-details label="Expected Price (INR)" outlined readonly v-model="selected_lot_expected_price" type="text"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4" md="12">
                          <v-text-field hide-details label="End Date" outlined readonly v-model="selected_lot_end_date" type="text"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <span><b>Attached Images</b></span>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2" md="2" v-for="(image, i) in selected_lot_details.lot_image_urls" :key="i">
                          <v-img :src="image" /></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
                </v-card-text>
                </v-card>   
            </v-dialog>
        </v-row>

        <!-- contract decision pending button -->
        <v-row justify="center" >
            <v-dialog v-model="ContractLotInventoryDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card class="card-width" style="max-width:100% !important;">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                Lot Information
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-card-actions>

                <v-btn class="blue--text" color="white" small v-if="active_tab == 'Pending Publish'" @click="deleteBeamLotConfirmationPopupOpen(selected_lot_details.id)" >DELETE LOT</v-btn>

                <v-btn class="blue--text" color="white" small v-if="active_tab == 'Decision Pending' && selected_lot_details.status != 'Dispatch Ready'" @click="LotDetailSubmitFn" :disabled="number > 0 || !payment_status || !winner_amount ||!winner_code || !amount_received" >SAVE AND CLOSE</v-btn>

                <v-btn icon dark @click="ContractLotInventoryDialog = false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-actions>
            </v-toolbar>
                  <v-card><v-card-title style="padding:0px;">
                  <v-col cols="12" sm="6" md="3">
                  <span style="font-size: 14px;"> Lot ID : {{selected_lot_details.id}}</span>
                      </v-col>

                   <v-col cols="12" sm="6" md="6">
                  <span style="font-size: 14px;"> Lot Description : {{selected_lot_details.lot_name}} </span>
                      </v-col> 
                      <v-col cols="12" sm="6" md="3">
                        
                  <span style="font-size: 14px;"> Quantity: {{selected_lot_details.quantity}}</span>
                  <v-btn v-if="currentUser.roles.includes('central_admin') && active_tab == 'Pending Publish'" class="ml-2" color="error" small @click="openDeleteItem()" >DELETE ITEM</v-btn>
                  <!-- <v-btn  v-if="selected_lot_details.is_expired && active_tab == 'Decision Pending'" class="ml-2" color="success" small @click="OpenReliveLotPopup(selected_lot_details)" >RELIVE LOT</v-btn> -->
                    </v-col>
                  </v-card-title></v-card>
                  <v-tabs 
                    
                    align-with-title
                    class="primary lighten-2"
                    background-color="#E5F1FF"
                    >
                    <v-tabs-slider color="primary"></v-tabs-slider>
                   
                      <v-tab 
                        v-for="item in ContractLotInventorytTabData"
                        :key="item"
                        @click="lotInventoryData(item)"
                    >
                        {{ item }}
                    </v-tab>
                  
                    

                    </v-tabs>               
                <v-card-text>

                <v-card v-if="LotInventorytabe == 'Inventory List'" class="theme--light">
                    <v-card-text> 
                    <v-data-table  
                        :dense="true"
                        v-model="selected"
                        :headers="LotInventoryTableHeader" 
                        :items="LotInventoryData" 
                        :search="inventory_search"  
                        :loading="loading"
                        show-select 
                        loading-text="Loading Data... Please wait">\
                        <template v-slot:item.delete_item="{item}">
                          <img v-if="currentUser.roles.includes('central_admin') && active_tab == 'Pending Publish'" @click="openDeleteItem(item)"
                            src="@/assets/images/job_sheet.png"
                            title="Delete Item"
                          />
                        </template>
                    </v-data-table>
                 </v-card-text>
                </v-card>

                <!-- <v-card v-if="LotInventorytabe == 'Bid Details'" class="theme--light">
                    <v-card-text> 
                    <v-data-table  
                        :dense="true"   
                        :headers="BidDetailHeader"
                        :items="quotation_records"
                        >
                    </v-data-table>
                 </v-card-text>
                </v-card> -->

                <!-- <v-card v-if="LotInventorytabe == 'Emailed Vendors List'" class="theme--light">
                    <v-card-text> 
                    <v-data-table  
                        :dense="true"   
                        :headers="VendorListDetailsHeader"
                        :items="vendor_email_records"
                        >
                    </v-data-table>
                 </v-card-text>
                </v-card> -->

                <v-card v-if="LotInventorytabe == 'Settlement Details'" class="theme--light">
                  <v-card-text>
                    <v-form ref="settlementForm">
                      <v-container>
                        <v-row>
                          <v-col cols="6" sm="6" md="6">
                            <span class="lot_sub_header">  Bid Winner Details </span>
                          </v-col>
                        </v-row>

                          <v-row>
                            <v-col cols="12" sm="4" md="6">
                              <v-text-field
                               v-model="winner_code"
                               outlined
                               :rules="inputRules"
                               chips
                               label="Winner Code*"
                               disabled=true>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="6">
                              <v-text-field :rules="inputRules" hide-details label="Winner Amount (INR)*" outlined v-model="winner_amount" type="number" disabled=true></v-text-field> 
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="12" sm="4" md="6">
                              <v-flex>
                                <v-select :rules="inputRules" @change="changePaymentStatus" hide-details :items="payment_status_menu_items" v-model="payment_status" color="primary" label="Payment Status*" outlined :disabled="selected_lot_details.status == 'Dispatch Ready'"></v-select>
                              </v-flex>
                            </v-col>
                            <v-col cols="12" sm="4" md="6">
                              <v-text-field :rules="payment_status == '' || payment_status =='Full Payment Received' ? [] : partial_rules" :disabled="payment_status == '' || payment_status =='Full Payment Received'"  label="Amount received (INR)*" outlined v-model="amount_received" type="number" @keyup="trackingChange"></v-text-field>
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
                                <v-radio :disabled="payment_status == null || payment_status == '' || payment_status =='Partial Payment'" :rules="payment_status == '' || payment_status =='Partial Payment' ? []: inputRules" v-for="n in  ['Yes','No']" :key="n" :label="`${n}`" :value="n"></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                          <v-row>
                           <v-col cols="6" sm="4" md="6">
                             <v-file-input v-model="files" outlined hide-details small-chips multiple label="ATTACH DOCUMENT" :disabled="selected_lot_details.status == 'Dispatch Ready'"></v-file-input>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-card v-if="LotInventorytabe == 'Lot Details'" class="theme--light">
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
                        <v-col cols="12" sm="4" md="12">
                          <v-text-field hide-details label="Contracted Value (INR)" outlined readonly v-model="winner_amount" type="text"></v-text-field>
                        </v-col>
                      </v-row>
                     
                    </v-container>
                  </v-card-text>
                </v-card>
                </v-card-text>
                </v-card>   
            </v-dialog>
        </v-row>
        <!-- End -->
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
                                    <v-col cols="6" sm="6" md="6">
                                        <span class="lot_sub_header">  Bid Winner Details </span>
                                    </v-col>
                                    <v-col cols="6" sm="6" md="6" style="text-align: right;">
                                      <u @click="openquotationlist" style="color: blue; font-size: 14px;"> Check Quotation List </u>
                                    </v-col>
                                </v-row>
    
                                <v-row>
                                    <v-col cols="12" sm="4" md="6" v-if="lot_type == 'Email Lot'">
                                        <!--  <v-text-field :rules="inputRules" hide-details label="Winner Code" outlined v-model="winner_code" type="text"></v-text-field>-->
                                         <v-autocomplete 
                                         v-model="winner_code"
                                         :items="winner_code_list"
                                         outlined
                                         chips
                                         label="Search/Select Vendor Code*"  
                                         :rules="inputRules"     
                                         prepend-inner-icon="mdi-magnify"
                                         :disabled="!currentUser.roles.includes('central_admin')">                                            
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6" v-if="lot_type == 'Beam Lot'">
                                         <v-text-field :rules="inputRules" hide-details label="Winner Code" outlined v-model="winner_code" type="text"></v-text-field> 
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
                                        <v-text-field :rules="payment_status == '' || payment_status =='Full Payment Received' ? [] : partial_rules" :disabled="payment_status == '' || payment_status =='Full Payment Received'"  label="Amount received (INR)" outlined v-model="amount_received" type="number"></v-text-field>
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
                                            <v-radio :disabled="payment_status == null || payment_status == '' || payment_status =='Partial Payment'" :rules="payment_status == '' || payment_status =='Partial Payment' ? []: inputRules" v-for="n in  ['Yes','No']" :key="n" :label="`${n}`" :value="n"></v-radio>
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

        <!-- Inventory download starts -->
    <v-row justify="center">
      <v-dialog v-model="inventoryDownloadDialog" persistent max-width="1000px">
        <v-form ref="inventoryDownloadForm">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Download Inventory</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="12">
                  <v-text-field :rules="email_format_rule"  label="Email Id" outlined v-model="email_id" type="text"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" :disabled="et_isdiasbled" @click="download_btn">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      </v-dialog>
    </v-row>
    <!-- Inventory download ends -->

        <v-row justify="center">
      <v-dialog v-model="re_publishDialog" persistent max-width="1000px">
        <v-form ref="createLotForm">
          <v-card class="v-card-100" >
            <v-card-title>
              <span>Republish B2B - Online Auction</span>
              <span><v-btn icon dark @click="createLotDialog = false"><v-icon>mdi-close</v-icon></v-btn></span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" label="Lot Name" outlined v-model="lot_name" type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" label="Lot Description" outlined v-model="lot_desc" type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="MRP (₹)" :rules="mrp_rule" outlined v-model="lot_mrp" :min="0" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Buy Now(₹)" outlined v-model="buy_now_price" :rules="buy_now_rule" :min="0" type="number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Reserve Price(₹)" outlined v-model="reserve_price" :rules="res_price_rule" :min="0" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Floor Price(₹)" outlined v-model="floor_price"  :rules="floor_price_rule" :min="0" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Increment Slab(₹)" outlined v-model="increment_slab" :rules="inc_slab_rule" :min="0" type="number"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_13" v-model="menu_13" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined hide-details
                            v-model="start_date"
                            label="Start Date"
                            prepend-inner-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on" 
                            :rules="inputRules"
                            ></v-text-field>
                      </template>
                  <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu_13 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu_13.save(start_date)">OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_14" v-model="menu_14" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
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
                    <v-btn text color="primary" @click="menu_14 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu_14.save(end_date)">OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
              <v-col cols="12" sm="4" md="6">
              <v-menu
                ref="menu_3"
                v-model="menu_3"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                :rules="inputRules"
              >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time3"
                  label="Start Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :rules="inputRules"
                ></v-text-field>
                </template>
                <v-time-picker
                v-if="menu_3"
                v-model="time3"
                :allowed-minutes="allowedStep"
                full-width
                @click:minute="$refs.menu_3.save(time3)"
                ></v-time-picker>
              </v-menu>
              </v-col>


          <v-col cols="12" sm="4" md="6">
              <v-menu
                ref="menu_4"
                v-model="menu_4"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                
              >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time4"
                  label="End Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :rules="inputRules"
                ></v-text-field>
                </template>
                <v-time-picker
                v-if="menu_4"
                v-model="time4"
                :allowed-minutes="allowedStep"
                full-width
                @click:minute="$refs.menu.save(time4)"
                ></v-time-picker>
              </v-menu>
              </v-col>
              </v-row>
              <v-row>
              <v-col cols="12" sm="4" md="12" >
               <v-flex>
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
          <v-card-title>
            Image Attachment
          </v-card-title>
          <v-card-actions>
           <v-btn  color="primary" @click="get_republish_inventory_images">ATTACH IMAGES</v-btn>
           <div v-if="lot_images_count">
            {{ lot_images_count }} IMAGES ATTACHED
            </div>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="sendRepublishLotFn" >Confirm</v-btn>
          </v-card-actions>
        </v-card>
         </v-form>
        </v-dialog>
       </v-row>


    <v-row justify="center">
      <v-dialog v-model="createBeamLotDialog" persistent max-width="1000px">
        <v-form ref="createBeamLotForm">
          <v-card class="v-card-100">
            <v-card-title class="pl-4">
              <span>B2B - Online Auction</span>
              <span><v-btn icon dark @click="createBeamLotDialog = false"><v-icon>mdi-close</v-icon></v-btn></span>
            </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules"  label="Lot Name" outlined v-model="lot_name" type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules"  label="Lot Description" outlined v-model="lot_desc" type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="mrp_rule"  label="MRP (₹)" outlined v-model="lot_mrp" type="number" :min="0"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="buy_now_rule"  label="Buy Now(₹)" outlined v-model="buy_now_price" type="number" :min="0"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="res_price_rule"  label="Reserve Price(₹)" outlined v-model="reserve_price" type="number" :min="0"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="floor_price_rule"  label="Floor Price(₹)" outlined v-model="floor_price" type="number" :min="0"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="inc_slab_rule"  label="Increment Slab(₹)" outlined v-model="increment_slab" type="number" :min="0"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                        v-model="start_date"
                        label="Start Date"
                        prepend-inner-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on" 
                        :rules="inputRules"
                        ></v-text-field>
                      </template>
                  <!-- <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable> -->
                  <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="start_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu1.save(start_date)">OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                        v-model="end_date"
                        label="End Date"
                        prepend-inner-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on" 
                        :rules="inputRules"
                        ></v-text-field>
                      </template>
                  <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="end_date" no-title scrollable >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(end_date)">OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="4" md="6">
              <v-menu
                ref="menu_1"
                v-model="menu_1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                :rules="inputRules"
              >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time2"
                  label="Start Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :rules="inputRules"
                ></v-text-field>
                </template>
                <v-time-picker
                v-if="menu_1"
                v-model="time2"
                :allowed-minutes="allowedStep"
                full-width
                @click:minute="$refs.menu1.save(time2)"
                ></v-time-picker>
              </v-menu>
              </v-col>


          <v-col cols="12" sm="4" md="6">
              <v-menu
                ref="menu_2"
                v-model="menu_2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                
              >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time1"
                  label="End Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :rules="inputRules"
                ></v-text-field>
                </template>
                <v-time-picker
                v-if="menu_2"
                v-model="time1"
                :allowed-minutes="allowedStep"
                full-width
                @click:minute="$refs.menu_2.save(time1)"
                ></v-time-picker>
              </v-menu>
              </v-col>
              </v-row>
             </v-container>
          <v-card-title class="pl-4">
            Image Attachment
          </v-card-title>
          <v-card-actions class="pl-4">
           <v-btn  color="primary" @click="get_image_popup">CHOOSE IMAGES</v-btn>
            <div v-if="lot_images_count > 0" class="pl-5" style="font-style:normal">
            {{ lot_images_count }} IMAGES ATTACHED
            </div>
            <v-row v-else>
              <v-col cols="6" sm="6">
                <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="close_b2b_auction">Cancel</v-btn>
            <v-btn small color="primary" @click="sendBeamLotCreationFn" >Confirm</v-btn>
          </v-card-actions>
        </v-card>
         </v-form>
        </v-dialog>
       </v-row>

    <v-row justify="center">
      <v-dialog v-model="regradeConfirmDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>{{regrade_confirm_dialog_title}}</span><br>
            <span>{{regrade_confirm_dialog_title_2}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="sendRegrade">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    
    <v-row justify="center">
      <v-dialog v-model="lotConfirmDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>{{lot_confirm_dialog_title}}</span><br>  
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="movingLotCreation" :disabled="number > 0" >Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    <v-row justify="center">
      <v-dialog v-model="liquidationConfirmDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>Are you Sure you want to move item to Pending Liquidation ?</span><br>  
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="movingToPendingLiquidation" :disabled="number > 0">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="deleteLotConfirmDialog" persistent max-width="900px" max-height= "900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-flex>
                    <span>Please Provide the reason for cancelling the lot</span>
                    <v-textarea outlined v-model="delete_remark" label= "Add Remarks*" ></v-textarea>
                  </v-flex>
                </v-col>
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

    <v-row justify="center">
      <v-dialog v-model="ReliveLotPopup" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>  Are you sure! You want Relive this lot? </span><br>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="CloseReliveLotPopup">Cancel</v-btn>
            <v-btn small color="primary" @click="ReliveLotSubmitFn">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    <!-- Extend Time -->
    <v-row justify="center">
      <v-dialog v-model="extendTimeDialog" persistent max-width="1000px">
        <v-form ref="extendTimeForm">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Extend Time</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!--Date fields -->
                <v-col cols="12" sm="4" md="6">
                  <v-menu ref="menu_9" v-model="menu_9" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined
                      v-model="selected_et_lot_details.start_date.substr(0, 10)"
                      label="Start Date"
                      prepend-inner-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on" 
                      :rules="inputRules"  :disabled="true"
                      ></v-text-field>
                    </template>
                    <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="start_date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu_9 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu_9.save(start_date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_10" v-model="menu_10" :close-on-content-click="false" :return-value.sync="end_date" required transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                        v-model="end_date"
                        label="End Date"
                        prepend-inner-icon="event"
                        v-bind="attrs"
                        v-on="on" 
                        :rules="inputRules"
                        ></v-text-field>
                      </template>
                    <v-date-picker :min="getEndDate"  v-model="end_date" no-title scrollable >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu_10 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu_10.save(end_date)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <!--Time fields -->
                <v-col cols="12" sm="4" md="6">
                  <v-menu
                    ref="menu_11" v-model="menu_11"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="start_date"
                    transition="scale-transition"
                    offset-y
                    readonly
                    max-width="290px"
                    min-width="290px"
                    :rules="inputRules">
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="selected_et_lot_details.start_date.substr(11, 8)"
                      label="Start Time"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :rules="inputRules" :disabled="true"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu_11"
                    readonly
                    :allowed-minutes="allowedStep"
                    v-model="time1"
                    full-width
                    @click:minute="$refs.menu_11.save(time1)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>


                <v-col cols="12" sm="4" md="6">
                  <v-menu
                    ref="menu_12"
                    v-model="menu_12"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time6"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time6"
                      label="End Time"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :rules="inputRules"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu_12"
                    v-model="time6"
                    :allowed-minutes="allowedStep"	
                    full-width
                    @click:minute="$refs.menu_12.save(time6)"
                    ></v-time-picker>
                  </v-menu>
                  <span v-if="this.selected_Extend_Time_Error" class="selectedTimeErrMessage">{{ this.selected_Extend_Time_Error }}</span>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" :disabled="et_isdiasbled" @click="extendTimeConPopupOpen">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="extendTimeConfirmDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>  Are you sure want to Extend time of the lot? </span><br>  
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup()">Cancel</v-btn>
            <v-btn small color="primary" @click="extendBeamLotFn(selected_lot_item_id)" :disabled="number >0">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Extend Time -->
    
    <!-- Publish Lot / > / Publish -->
    <v-row justify="center">
      <v-dialog v-model="publishLotConfirmDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>                 
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
              <span>  Are you sure! You want to publish  this lot? </span><br>  
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="PublishLot(selected_lot_item_id)">Confirm</v-btn>
          </v-card-actions>
          <v-overlay :value="progress_overlay">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Publish Lot / > / Publish -->
    
    <v-row justify="center">
      <v-dialog v-model="B2b_email" persistent max-width="1000px">
        <v-form ref="createLotForm">
          <v-card class="v-card-100">
            <v-card-title>
              <span>B2B - Email Auction </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" hide-details label="Lot Name" outlined v-model="lot_name"
                      type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" hide-details label="Lot Description" outlined v-model="lot_desc"
                      type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_13" v-model="menu_13" :close-on-content-click="false" :return-value.sync="start_date"
                      transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined hide-details v-model="start_date" label="Start Date" prepend-inner-icon="event"
                          readonly v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>
                      </template>
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="start_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu_13 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu_13.save(start_date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_15" v-model="menu_15" :close-on-content-click="false" :return-value.sync="end_date"
                      transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined hide-details v-model="end_date" label="End Date" prepend-inner-icon="event" readonly
                          v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>
                      </template>
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="end_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu_15 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu_15.save(end_date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_3" v-model="menu_3" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
                      transition="scale-transition" offset-y max-width="290px" min-width="290px" :rules="inputRules">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time3" label="Start Time" prepend-inner-icon="mdi-clock-time-four-outline" readonly
                          outlined v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>
                      </template>
                      <v-time-picker v-if="menu_3" v-model="time3" :allowed-minutes="allowedStep" full-width
                        @click:minute="$refs.menu_3.save(time3)"></v-time-picker>
                    </v-menu>
                  </v-col>
              
              
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_4" v-model="menu_4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
                      transition="scale-transition" offset-y max-width="290px" min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time4" label="End Time" prepend-inner-icon="mdi-clock-time-four-outline" readonly
                          outlined v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>
                      </template>
                      <v-time-picker v-if="menu_4" v-model="time4" :allowed-minutes="allowedStep" full-width
                        @click:minute="$refs.menu.save(time4)"></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-flex>
                      <template v-slot:selection="data">
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select"
                          @click:close="remove(data.item)">
                          {{ data.item.vendor_code }}
                        </v-chip>
                      </template>
                      </v-autocomplete>
              
                    </v-flex>
                  </v-col>
                </v-row>
              
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Expected Price" :rules="mrp_rule" outlined v-model="lot_expected_price" :min="0"
                      type="number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
              
                </v-row>
              </v-container>
            </v-card-text>

          <v-card-title>
            Image Attachment
          </v-card-title>
          <v-card-actions>
            <v-btn  color="primary" @click="get_image_popup">CHOOSE IMAGES</v-btn>
            <div v-if="lot_images_count > 0" class="pl-5" style="font-style:normal">
            {{ lot_images_count }} IMAGES ATTACHED
            </div>
            <v-row v-else>
              <v-col cols="6" sm="6">
                <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small text color="normal" @click="close_b2b_email  ">Cancel</v-btn>
              <v-btn small color="primary" :disabled="isdiasbled" @click.prevent="sendLotCreationFn">Confirm</v-btn>
          </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
    <!-- publish lot for B2b Contract -->
    <v-row justify="center">
      <v-dialog v-model="B2b_contract" persistent max-width="1000px">
        <v-form ref="createLotForm">
          <v-card class="v-card-100">
            <v-card-title>
              <span>B2B - Contract Lot </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" hide-details label="Lot Name" outlined v-model="lot_name"
                      type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" hide-details label="Lot Description" outlined v-model="lot_desc"
                      type="text"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-flex>
                      <template v-slot:selection="data">
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select"
                          @click:close="remove(data.item)">
                          {{ data.item.vendor_code }}
                        </v-chip>
                      </template>
                   
              
                    </v-flex>
                  </v-col>
                </v-row>
                <v-row>
              
                </v-row>
              </v-container>
            </v-card-text>

          <!-- <v-card-title>
            Image Attachment
          </v-card-title>
          <v-card-actions>
            <v-btn  color="primary" @click="get_image_popup">CHOOSE IMAGES</v-btn>
            <div v-if="lot_images_count > 0" class="pl-5" style="font-style:normal">
            {{ lot_images_count }} IMAGES ATTACHED
            </div>
            <v-row v-else>
              <v-col cols="6" sm="6">
                <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
              </v-col>
            </v-row>
          </v-card-actions> -->

          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small text color="normal" @click="close_b2b_contract">Cancel</v-btn>
              <v-btn small color="primary" :disabled="isdiasbled" @click.prevent="sendContractLotCreationFn">Confirm</v-btn>
          </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
    <!-- Edit Contract lot -->  
      <v-row justify="center">  
        <v-dialog v-model="ContractlotEditDialog" persistent max-width="1000px">  
          <v-form ref="lotEditForm">  
            <v-card class="v-card-100"> 
              <v-card-title class="pl-4"> 
                <span>Edit Contract Lot</span>  
              </v-card-title> 
              <v-container> 
                <v-row> 
                  <v-col cols="12" sm="4" md="12">  
                    <v-text-field :rules="inputRules"  label="Lot Name" disabled outlined v-model="lot_name" type="text"></v-text-field>  
                  </v-col>  
                </v-row>  
                <v-row> 
                  <v-col cols="12" sm="4" md="12">  
                    <v-text-field :rules="inputRules"  label="Lot Description" outlined v-model="lot_description" type="text"></v-text-field> 
                  </v-col>  
                </v-row>  
                <!-- <v-row>  
                  <v-col cols="12" sm="4" md="6"> 
                    <v-text-field label="Contracted Value" outlined v-model="contracted_value" :min="0" type="number"></v-text-field> 
                  </v-col>  
                </v-row>   -->
              </v-container>  
              <v-card-actions>  
                <v-spacer></v-spacer> 
                <v-btn small text color="normal" @click="closeContractLotEditDialog">Cancel</v-btn> 
                <v-btn small color="primary" @click="updateEmailLotDetails">Save</v-btn>  
              </v-card-actions> 
            </v-card> 
          </v-form>
        </v-dialog> 
      </v-row>
      <!-- publish lot for B2b Contract  end -->


        <v-row justify="center">
            <v-dialog v-model="deleteBeamLotConfirmDialog" persistent max-width="450px">
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
                <v-btn small color="primary" @click="deleteBeamLotSubmitFn(selected_lot_item_id)">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Liquidation</div> -->
        <div>
            <HeaderComponent :headerTitle="headerText" />
        </div>
        <v-card class="v-card-100">
            <v-tabs v-model="tab_index">
                <v-tab style="text-transform:none!important;" @click="loadData(tab)" v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
            </v-tabs>
        </v-card>

        <v-card-title class="lq_custom_title">
            <v-container grid-list-md fluid v-if="active_tab == 'Pending Liquidation' || active_tab == 'Pending RFQ'" class="ml-2">
              <v-row class="mt-6">
                    <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined style="max-width: 100px;"></v-select>
                    <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id or Serial Number or Brand" outlined v-on:keyup.enter="searchItem()" class="ml-3 search" style="max-width: 195px;"></v-text-field>
                    <v-spacer v-if="active_tab == 'Pending RFQ'"></v-spacer>
                  <v-actions v-if="active_tab == 'Pending RFQ'" class="mt-2">
                    <v-btn  class="ma-1" @click="download_popup" color="primary">DOWNLOAD</v-btn>
                    <v-btn  class="ma-1" @click="update_liquidation_btn" color="primary">MOVE TO PENDING LIQUIDATION</v-btn>
                    <v-btn  class="ma-1" @click="openRequestIdpopup" color="primary">VIEW ALL REQUEST IDS</v-btn>
                    </v-actions>
                    <!-- <v-spacer v-if="active_tab == 'Pending RFQ'"></v-spacer> -->
                    <v-actions class="d-flex" v-if="active_tab == 'Pending RFQ'">
                      <v-select  v-model="manual_creation" :items="['B2B Email','B2B Auction','B2B Contract']" label="MANUAL CREATION" dense outlined color="primary" hide-details @change="creation_select" class="ma-3" style="max-width:200px"></v-select>
                      <v-chip class="ma-3">
                          Selected {{this.selected.length}}
                      </v-chip>
                    </v-actions>

                    <v-autocomplete
                      v-model="selectedDisposition"
                      v-if="active_tab == 'Pending Liquidation'"
                      :items="disposition"
                      item-text="original_code"
                      item-value="id"
                      @change="changeDispositionItems"
                      target="#set-disposition"
                      color="primary"
                      label="SET DISPOSITION"
                      class="ml-6"
                      style="max-width: 240px;"
                    ></v-autocomplete>
                    <v-spacer v-if="active_tab == 'Pending Liquidation'"></v-spacer>
                    <v-actions v-if="active_tab == 'Pending Liquidation'">
                        <v-btn  @click="update_lot_btn" class="ma-4" color="primary">Move for RFQ</v-btn>
                        <v-btn  @click="regrade_btn" class="ma-4" color="primary">REGRADE</v-btn>
                        <v-chip @class="ma-4"> Selected {{this.selected.length}} </v-chip>
                     </v-actions>
              </v-row>
            </v-container>
            <v-flex v-if="displayRequestDetail" class="ml-2">
              <span> {{total_items}} Items:</span>
              <span class="ml-2"> {{graded_items}} Graded </span>
              <span class="ml-2"> {{pending_grade_items}} Pending Regrade </span>
            </v-flex>
            <v-text-field  prepend-inner-icon="mdi-magnify" v-model="search" label="Search lot id" single-line v-if="(active_tab == 'In Progress') || (active_tab == 'Dispatch') || (active_tab == 'Decision Pending') || (active_tab == 'Pending Publish')" v-on:keyup.enter="getLotStatusData(true)" style="max-width: 250px;"></v-text-field>
            <!-- <v-text-field  prepend-inner-icon="mdi-magnify" v-model="search_publish" \ label="Search" single-line  v-if="active_tab == 'Pending Publish' && tab_link == 'Publish'" v-on:keyup.enter="getLotStatusData"></v-text-field>
            <v-text-field  prepend-inner-icon="mdi-magnify" v-model="search_progress" label="Search" single-line  v-if="active_tab == 'Pending Publish' && tab_link == 'In progress'"></v-text-field>
            <v-text-field  prepend-inner-icon="mdi-magnify" v-model="search_decision" label="Search" single-line  v-if="active_tab == 'Pending Publish' && tab_link == 'Decision Pending'"></v-text-field> -->
            <v-spacer></v-spacer>
            <v-actions>
              <a
                style="display: none"
                id="inventory_report"
                small
                tile
                color="#F3F3F3"
                href=""
                target="_blank"
                download
              ></a>
              <v-card-title>
                <!-- <v-btn v-if="active_tab == 'Pending Publish' && (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))" @click="openVendorListModal" class="ma-2" color="primary">EMAIL VENDOR</v-btn>
                <v-btn v-if="active_tab == 'Pending Publish'" @click="PublishGlobalLot"  color="primary" class="ma-2">Publish Lots</v-btn> -->
              </v-card-title>
                <!-- global extend time -->
            </v-actions>
            </v-card-title>
      

        <v-layout column>
           
            <v-flex md6 style="overflow: auto" > 
             <v-data-table v-if="active_tab == 'Pending Publish'" 
                v-model="selected"
                :dense="true"   
                :headers="pending_publish_lot_header"
                :items="pending_publish_lots" 
                class="elevation-1" 
                show-select
                :loading="loading" 
                disable-pagination
                :hide-default-footer="true"
                loading-text="Loading Data... Please wait">
                <template v-slot:item.actions="{ item }">
                  <span v-if="item.lot_type == 'Beam Lot'">
                    <img src="@/assets/images/job_sheet.png"  @click="open_dialog_with_item(item)"/>
                    <img v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')" src="@/assets/images/edit.png" @click="openLotEditDialog(item)"/>
                  </span>
                  <span v-if="item.lot_type == 'Email Lot'">
                    <img src="@/assets/images/job_sheet.png"  @click="LotInventoryDialogOpen(item)"/>
                    <img v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')" src="@/assets/images/edit.png" @click="openEmailLotEditDialog(item)"/>
                  </span>
                  <span v-if="item.lot_type == 'Contract Lot'">
                    <img src="@/assets/images/job_sheet.png"  @click="LotInventoryContractDialogOpen(item)"/>
                    <img v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')" src="@/assets/images/edit.png" @click="openContractLotEditDialog(item)"/>
                  </span>
                  <img v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')" src="@/assets/images/Delete_Icon.png" @click="deleteBeamLotConfirmationPopupOpen(item.id)"/>
                  <v-btn small v-if="item.lot_type == 'Contract Lot'  && currentUser.roles.includes('central_admin')" @click="openContractDispatchModel(item)" class="ma-2" color="primary">Select Vendor</v-btn>
                </template>
              </v-data-table>

        <v-data-table v-if="active_tab == 'In Progress'" 
          :dense="true"
          v-model="selected_lots"
          :headers="inprocess_lot_headers"
          :items="inprocess_item"
          class="elevation-1" 
          show-select
          :loading="loading" 
          disable-pagination
          :hide-default-footer="true"
          loading-text="Loading Data... Please wait">
          <template v-slot:item.actions="{ item }">
            <img v-if="item.lot_type == 'Beam Lot'" src="@/assets/images/job_sheet.png"  @click="open_dialog_with_item(item)"/>
            <img v-if="item.lot_type == 'Email Lot'" src="@/assets/images/job_sheet.png"  @click="LotInventoryDialogOpen(item)"/>
            <img v-if="item.lot_type == 'Contract Lot'" src="@/assets/images/job_sheet.png"  @click="LotInventoryContractDialogOpen(item)"/>
            <v-btn small v-if="item.lot_type == 'Email Lot'  && currentUser.roles.includes('central_admin')" @click="openVendorListModal(item)" class="ma-2" color="primary">EMAIL VENDOR</v-btn>
            <v-btn small v-if="item.lot_type == 'Beam Lot' && currentUser.roles.includes('central_admin')" @click="GlobalExtendTime(item)"  color="primary" class="ma-2"> Extend Time</v-btn>
            <img v-if="currentUser.roles.includes('central_admin') && item.lot_type == 'Email Lot'" src="@/assets/images/edit.png" @click="openEmailLotEditDialog(item)"/>
            <img v-if= "currentUser.roles.includes('central_admin')" src="@/assets/images/Delete_Icon.png" @click="deleteBeamLotConfirmationPopupOpen(item.id)"/>
          </template>
        </v-data-table>

        <v-data-table v-if="active_tab == 'Dispatch'" 
          :dense="true"
          :headers="despatch_lot_headers"
          :items="dispatch_ready_items"
          class="elevation-1" 
          :loading="loading" 
          loading-text="Loading Data... Please wait">
          <template v-slot:item.edit="{ item }">
            <span v-if="item.lot_type == 'Beam Lot'">
              <img src="@/assets/images/job_sheet.png"  @click="open_dialog_with_item(item)"/>
            </span>
            <span v-if="item.lot_type == 'Email Lot'">
              <img src="@/assets/images/job_sheet.png"  @click="LotInventoryDialogOpen(item)"/>
            </span>
            <span v-else>
              <img src="@/assets/images/job_sheet.png"  @click="LotInventoryDialogOpen(item)"/>
            </span>
            <!-- <img v-if= "currentUser.roles.includes('central_admin')" src="@/assets/images/Delete_Icon.png" @click="deleteBeamLotConfirmationPopupOpen(item.id)"/> -->
          </template>
        </v-data-table>

        <v-data-table v-if="active_tab == 'Decision Pending'" 
        :dense="true"   
        :headers="descision_lot_headers" 
        :items="descision_pending_items"
        class="elevation-1"
        :loading="loading" 
        disable-pagination
        :hide-default-footer="true"
        loading-text="Loading Data... Please wait">
        <template v-slot:item.action="{ item }">
          <span v-if="item.lot_type == 'Beam Lot'">
            <v-btn v-if="currentUser.roles.includes('central_admin')" small @click="openRePublishDialog(item)" :disabled="item.republish_status === 'pending'" color="success">RE-PUBLISH</v-btn>
            <img src="@/assets/images/job_sheet.png"  @click="open_dialog_with_item(item)"/>
          </span>
          <span v-if="item.lot_type == 'Email Lot'">
            <v-btn  v-if="item.is_expired && item.lot_type == 'Email Lot' && currentUser.roles.includes('central_admin')" color="success" small @click="OpenReliveLotPopup(item)" >RELIVE LOT</v-btn>
            <img src="@/assets/images/job_sheet.png"  @click="LotInventoryDialogOpen(item) || autoFillFields()"/>
          </span>
          <span v-if="item.lot_type == 'Contract Lot'">
            <!-- <v-btn  v-if="item.is_expired && item.lot_type == 'Email Lot' && currentUser.roles.includes('central_admin')" color="success" small @click="OpenReliveLotPopup(item)" >RELIVE LOT</v-btn> -->
            <img src="@/assets/images/job_sheet.png"  @click="LotInventoryContractDialogOpen(item) || autoFillFields()"/>
          </span>
          <span v-if="item.lot_type == 'Offline Lot'">
            <img v-if="currentUser.roles.includes('central_admin')" src="@/assets/images/edit.png" @click="openOfflineLotVednorDialog(item)"/>
          </span>
          <img v-if="currentUser.roles.includes('central_admin')" src="@/assets/images/Delete_Icon.png" @click="deleteBeamLotConfirmationPopupOpen(item.id)"/>
        </template>         
        </v-data-table>

        <!-- <v-row justify="center"> -->
      <!-- <v-dialog v-model="B2b_email" persistent max-width="1000px">
        <v-form ref="createLotForm">
          <v-card class="v-card-100">
            <v-card-title class="pl-4">
              <span>B2B - Email Auction </span>
              <span><v-btn icon dark @click="B2b_email = false"><v-icon>mdi-close</v-icon></v-btn></span>
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
                    <v-menu ref="menu_14" v-model="menu_14" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined hide-details
                            v-model="start_date"
                            label="Start Date"
                            prepend-inner-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on" 
                            :rules="inputRules"
                            ></v-text-field>
                      </template>
                  <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu_14= false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu_14.save(start_date)">OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_4" v-model="menu_4" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
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
                    <v-btn text color="primary" @click="menu_4 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu_4.save(end_date)">OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title class="pl-4">
            Image Attachment
          </v-card-title>
          <v-card-actions class="pl-4">
          <v-btn  color="primary" @click="imageDailog = true">ATTACH IMAGES</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="close_b2b_email">Cancel</v-btn>
            <v-btn small color="primary" >Confirm</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
        </v-dialog> -->
      <!-- </v-row> -->

       <!-- Move dispatch for contract vendor -->
       <v-row justify="center">
        <v-dialog v-model="contractDispatchDialog" max-width="750px">
          <v-card class="v-card-100">
            <v-form ref="dispatchForm">
              <v-card-title>
                <span class="headline">Move To Decision Pending</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-flex>
                        <v-autocomplete v-model="vendor_code" :items="table_data_dispatch" item-text="vendor_code_name" item-value="vendor_code" placeholder="Search/Enter Vendor Code*" :rules="inputRules" prepend-icon="mdi-magnify" @change="getContractValue()"></v-autocomplete>
                        <!-- <v-text-field solo v-model="vendor_code" label="Vendor Code"></v-text-field> -->
                      </v-flex>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                          <v-text-field hide-details label="Contacted Value (INR)" outlined readonly v-model="contracted_value" type="text"></v-text-field>
                    </v-col>
                  </v-row>
                  <span> <b>Items Summary:</b></span><br>
                  <v-flex style="overflow: auto"> 
                    <v-data-table
                      :dense="true"
                      :headers="contract_dispatch_headers"
                      :items="table_data_contract"
                      class="elevation-1"
                      :loading="loading"
                    >
                    </v-data-table>
                  </v-flex>
                </v-container>
              </v-card-text>
              <v-card-actions text-center>
                <v-spacer></v-spacer>
                <v-btn small color="primary" @click="contractDispatchItems" :disabled="number > 0">Confirm</v-btn>
                <v-btn small color="normal" @click="contractDispatchDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Move dispatch for contract vendo end-->
      <v-row justify="center">
      <v-dialog v-model="imageDailog" persistent max-width="800px">
          <v-card style="overflow-y:auto;">
          <v-card-title>
            Image Attachment
          </v-card-title>
          <v-card-actions style="overflow-y:auto;">
           
           <template v-for="(item, index) in selected_inventory_images">
            <v-col cols="12" sm="4" md="4" >
            <v-row>
              <v-checkbox
              :id="item" :key="index" :value="item" name="item" type="checkbox" v-model="checkedImages"
              color="indigo darken-3"
              hide-details
              class="pl-3"
              ></v-checkbox>
              <v-img :src="item" width="170" /></v-img>
              </v-row>
            </v-col>
            </template>

                 
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="close_image_dialog">Cancel</v-btn>
            <v-btn small color="primary" @click="get_selected_inventory_images">Proceed</v-btn>
          </v-card-actions>

       </v-card>
       </v-dialog>
      </v-row> 

      <v-row justify="center">
        <v-dialog v-model="Emaildialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card >
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Email Vendors</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" @click="sendEmailToVendor" :disabled= "number > 0" small >Send Email</v-btn>


              <v-btn icon dark @click="closePopup()"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
                        </v-toolbar>

              <v-spacer></v-spacer>
              <v-card class='ma-5'>

              <v-row class="ml-2">
              <v-col cols="3" sm="3">
                <v-select :items="vendor_search_field_items" v-model="vendor_search_field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_vendor" label="Search Vendor Name Email or Code" outlined v-on:keyup.enter="searchVendor()"></v-text-field>
              </v-col>

              <v-col cols="3" sm="3">
                <v-chip v-model="select_vendors">
                  Selected {{this.selected_vendors.length}}
                </v-chip>
              </v-col>
            </v-row>

             <v-data-table 
        :dense="true"   
        :headers="vendor_headers"
        :items="vendor_code_menu_items"
        v-model="selected_vendors"
        class="elevation-1" 
        show-select
        :loading="loading" 
        loading-text="Loading Data... Please wait">
        </v-data-table>
        </v-card>

        </v-card>
         </v-dialog>
      </v-row>    
       

       <v-row justify="center">
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card >
            <v-toolbar dark color="primary">
              <v-toolbar-title>Lot Information</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-card-actions>

                <v-btn class="blue--text" color="white" v-if="active_tab == 'Pending Publish'" small @click="deleteBeamLotConfirmationPopupOpen(selected_lot_item_id)" >DELETE LOT</v-btn>

                <!-- <v-btn class="blue--text" color="white" small v-if="selected_lot_details.lot_type == 'Beam Lot' && active_tab == 'Pending Publish'" @click="publishLotConfirmationPopupOpen()">PUBLISH</v-btn> -->  
                <!-- individual extend time -->

                <v-btn class="blue--text" color="white" v-if="active_tab == 'In Progress'  && currentUser.roles.includes('central_admin')" small @click="extendTimeDialogOpen"> Extend Time</v-btn>

                <v-btn class="blue--text" color="white" v-if="active_tab == 'Decision Pending' " small  @click="WinnerSubmitFn(selected_lot_item_id)" :disabled="number > 0">SAVE & CLOSE</v-btn>
                <v-btn v-if="(active_tab == 'Pending Publish')  && currentUser.roles.includes('central_admin')" class="ml-2" color="error" small @click="openDeleteItem()" >DELETE ITEM</v-btn>
                <v-btn icon dark @click="closePopup"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-actions>
            </v-toolbar>
                      <div>
                        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
                      </div>
                      <v-card><v-card-title style="padding:0px;">
                      <v-col cols="12" sm="6" md="3">
                      <span style="font-size: 14px;"> Lot ID : {{selected_lot_details.id}}</span>
                          </v-col>

                       <v-col cols="12" sm="6" md="6">
                      <span style="font-size: 14px;"> Lot Description : {{selected_lot_details.lot_desc}} </span>
                          </v-col> 
                          <v-col cols="12" sm="6" md="3">
                            
                      <span style="font-size: 14px;"> Quantity: {{selected_lot_details.quantity}}</span>
                          </v-col>
  
                          </v-card-title></v-card>
                      <v-list-item-content class="pa-0">
                      <v-toolbar
                         color="#EDF3FA" height="53"
                      >
                        <v-tabs v-model="active_tab_extend_number">
                            <v-tab
                              @click="loadData_publish_lot(tab)"
                              v-for="(tab, index) in pending_decision_tabs"
                              :key="index"
                            >{{tab}}</v-tab>
                        </v-tabs>
                        </v-toolbar>

                      </v-list-item-content>
                      <v-list-item-content  class="pl-4" v-if="active_tab_publish_lot === 'Bid Details'">
                      
                     <v-card>
                   <div>
                      <v-data-table
                        :dense="false"
                        :headers="bid_detail_header"
                        :items="selected_lot_bid_details"
                        :search="search_bid"
                        class="elevation-1"> 
                        <template v-slot:item.created_at="{ item }">
                          {{ format_date(item.created_at) }}
                        </template>                     
                      </v-data-table>

                    </div> 
                   </v-card>
                  </v-list-item-content>
                   <v-list-item-content  class="pl-4" v-if="active_tab_publish_lot === 'Inventory List'">
                      
                     <v-card>
                   <div>
                      <v-data-table
                        :dense="false"
                        v-model="selected"
                        :headers="inv_list_header"
                        show-select
                        :items="selected_lot_detail_items"
                        :search="search_inv"
                        class="elevation-1">
                      </v-data-table>
                    </div> 
                   </v-card>
                  </v-list-item-content>
                      <v-list-item-content  v-if="active_tab_publish_lot === 'Lot Details'">
                          <v-row  style="padding:50px;">
                          <v-col cols="12" sm="6" md="6" style="padding: 0px;">
                             <v-text-field label="Lot Name1" outlined :value="selected_lot_details.lot_name" :disabled="true" ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="6">
                            </v-col>
                            <v-col cols="12" sm="6" md="6" style="padding: 0px;">
                             <v-text-field label="Lot Description" outlined :value="selected_lot_details.lot_desc" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            </v-col>
                            <v-col cols="12" sm="6" md="3"  style="padding: 0px;">
                             <v-text-field label="MRP(₹)" outlined :value="selected_lot_details.mrp" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                            </v-col>
                                                        <v-col cols="12" sm="6" md="6"></v-col>

                            <v-col cols="12" sm="6" md="3" class="pa-0 pr-2">
                             <v-text-field label="Buy Now Price(₹)" outlined :value="selected_lot_details.buy_now_price" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" class="pa-0 pr-2">
                             <v-text-field label="Floor Price(₹)" outlined :value="selected_lot_details.floor_price" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" class="pa-0">
                             <v-text-field label="AI Price(₹)" outlined :value="selected_lot_details.ai_price" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6"></v-col>
                            <v-col cols="12" sm="6" md="6"></v-col>
                            <v-col cols="12" sm="6" md="3" class="pa-0 pr-2">
                             <v-text-field label="Reserve Price(₹)" outlined :value="selected_lot_details.reserve_price" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" class="pa-0">
                             <v-text-field label="Increment Slab(₹)" outlined :value="selected_lot_details.increment_slab" :disabled="true" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            </v-col>
                            <!-- start date --> 
                            <v-col cols="12" sm="6" md="3" class="pa-0 pr-2">
                                        <v-menu ref="menu_5" v-model="menu_5" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                      <v-text-field outlined
                                                        v-model="selected_lot_details.start_date ? selected_lot_details.start_date.substr(0, 10) : selected_lot_details.start_date"
                                                        label="Start Date"
                                                        prepend-inner-icon="event"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        :rules="inputRules" :disabled="true"
                                                      ></v-text-field>
                                            </template>
                                    <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable :disabled= true>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="menu_5 = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu_5.save(start_date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                              </v-col>
                               <!-- start date --> 
                               <!-- end date -->
                              <v-col cols="12" sm="6" md="3" class="pa-0">
                                        <v-menu ref="menu_6" v-model="menu_6" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                      <v-text-field outlined
                                                        v-model="selected_lot_details.end_date ? selected_lot_details.end_date.substr(0, 10) : selected_lot_details.end_date"
                                                        label="End Date"
                                                        prepend-inner-icon="event"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on" 
                                                        :rules="inputRules" :disabled="true"
                                                      ></v-text-field>
                                            </template>
                                    <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="end_date" no-title scrollable readonly>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="menu_6 = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu_6.save(end_date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                              </v-col>
                              <!-- end date -->
                              <v-col cols="12" sm="6" md="6">
                                </v-col>
                              <!-- start timer 5 & 6 -->
                                
                            <v-col cols="12" sm="4" md="3" class="pa-0 pr-2">
                  <v-menu
                    ref="menu_7"
                    v-model="menu_7"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="selected_lot_details.start_date ? selected_lot_details.start_date.substr(11, 8) : selected_lot_details.start_date"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="selected_lot_details.start_date ? selected_lot_details.start_date.substr(11, 8) : selected_lot_details.start_date"
                        label="Start Time"
                        prepend-inner-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        :rules="inputRules" :disabled="true"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu_7"
                      v-model="time5"
                      :allowed-minutes="allowedStep"
                      full-width
                      @click:minute="$refs.menu_7.save(time5)"
                      ></v-time-picker>
                  </v-menu>
                </v-col>


                                <v-col cols="12" sm="4" md="3" class="pa-0">
                                    <v-menu
                                      ref="menu_8"
                                      v-model="menu_8"
                                      :close-on-content-click="false"
                                      :nudge-right="40"
                                      :return-value.sync="selected_lot_details.end_date ? selected_lot_details.end_date.substr(11, 8) : selected_lot_details.end_date"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                              v-model="selected_lot_details.end_date ? selected_lot_details.end_date.substr(11, 8) : selected_lot_details.end_date"
                                              label="End Time"
                                              prepend-inner-icon="mdi-clock-time-four-outline"
                                              readonly
                                              outlined
                                              v-bind="attrs"
                                              v-on="on"
                                              :rules="inputRules" :disabled="true"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="menu_8"
                                            v-model="time1"
                                            :allowed-minutes="allowedStep"
                                            full-width
                                            @click:minute="$refs.menu_8.save(time1)"
                                          ></v-time-picker>
                                    </v-menu>
                                </v-col>
                              <!-- end timer -->
                          </v-row>

                            <v-container>
                          <v-row >
                              <!-- <v-file-input
                                accept="image/*"
                                label="Attached Images"
                              ></v-file-input>
                              </v-col> -->
                              <v-col cols="12" sm="2" md="2" v-for="(image, i) in selected_lot_details.lot_image_urls" :key="i">
                          <v-img :src="image" /></v-img>
                        </v-col>

                          </v-row>
                          </v-container>
                        </v-card-text>
                   </v-list-item-content> 
                   <v-list-item-content  class="pl-4" v-if="active_tab_publish_lot === 'Settlement Details'">
                     <v-card class="v-card-100 pa-5">
                      <v-row>
                         <v-col cols="6" sm="6" md="6" class="pa-0">
                            <v-card-title class="pl-2">Auction Summary</v-card-title>
                            <v-card-title><v-col cols="6" sm="6" md="6" style="padding-left: 5px;">Winner : {{winner_user}}</v-col>
                            </v-card-title>
                          </v-col>
                        <v-col cols="6" sm="6" md="6" class="pa-0">  
                          <v-card-title class="pl-2">Billing Summary</v-card-title>
                          <v-card-title><v-col cols="6" sm="6" md="6" style="padding-left: 5px;">Bill To : {{winner_billing_to_name}}</v-col>
                          </v-card-title>
                        </v-col>
                      </v-row>
                    <v-divider></v-divider>
                    <v-row class= 'pl-4'>
                     <v-col cols="12" sm="6" md="12" style="padding-left: 0px;"><v-card-title>Auction Winner</v-card-title> </v-col>
                     <v-col cols="12" sm="6" md="3" class="pa-0">
                             <v-select
                             v-model='winner_user'
                              :items="selected_lot_active_bid_details"
                              v-validate="'required'"
                              item-text="user_name"
                              item-value="last"
                              label="Select Winner"
                              @change="changedWinner"
                              :disabled="!currentUser.roles.includes('central_admin')"
                              outlined
                              />
                            </v-col>
                             <v-col cols="12" sm="6" md="3"></v-col>
                             <v-col cols="12" sm="6" md="6"></v-col>
                            <v-col cols="12" sm="6" md="3" class="pa-0">
                             <v-text-field label="Bid Received(₹)" outlined readonly :value="selected_lot_details.winner_amount" v-model="manual_winner_amount"></v-text-field>
               </v-col>
               <v-col cols="12" sm="6" md="3"></v-col>
               <v-col cols="12" sm="6" md="6"></v-col>
               <v-col cols="12" sm="6" md="3" class="pa-0">
                <v-select :rules="inputRules"
                @change="changeWinnerPaymentStatus" 
                :items="payment_status_menu_items" v-model="winner_payment_status" color="primary" label="Payment Status" outlined />
                            </v-col>
                            <v-col cols="12" sm="6" md="3"></v-col>
                             <v-col cols="12" sm="6" md="6"></v-col>
               <v-col cols="12" sm="6" md="3" class="pa-0">
               <v-text-field label="Amount Received(₹)" outlined  type="number" inputmode="numeric" :value="selected_lot_details.amount_received" v-model="winner_amount_received"></v-text-field>
               </v-col>

                <v-col cols="12" sm="6" md="12" style="padding-left: 0px;"><v-card-title>Billing Details</v-card-title> </v-col>
                <v-col cols="12" sm="6" md="3" class="pa-0">
                   <v-select
                   v-model='winner_billing_to'
                    :items="bill_to_items"
                    v-validate="'required'"
                    item-text="vendor_name"
                    item-value="id"
                    label="Bill To"
                    @change="changedBillTo"
                    outlined
                    />
                  </v-col>
                   <v-col cols="12" sm="6" md="3"></v-col>
                   <v-col cols="12" sm="6" md="6"></v-col>


                          <v-col cols="12" sm="6" md="1">Dispatch Details</v-col> <v-col cols="12" sm="6" md="11">(Select Full Payment Received to Change Dispatch Details)</v-col>
                          <!-- <v-col cols="12" sm="6" md="3"></v-col> -->
                           <v-col cols="12" sm="6" md="2" class='pt-5 mt-8'>Is it Dispatch Ready?  </v-col>  
                           <v-col cols="12" sm="6" md="2" class='pt-5'>
                            <v-radio-group v-model="winner_dispatch_status" row>
                              <v-radio :disabled="winner_payment_status == null || winner_payment_status == '' || winner_payment_status == 'Partial Payment'" :rules="winner_payment_status == '' || winner_payment_status =='Partial Payment' ? []: inputRules" v-for="n in  ['Yes','No']" :key="n" :label="`${n}`" :value="n"></v-radio>
                            </v-radio-group>
                            </v-col>
                           <v-col cols="12" sm="6" md="3"></v-col>
                           <v-col cols="12" sm="6" md="9">
                             <v-textarea label="Add Remarks" outlined v-model='winner_remarks'></v-textarea>
                            </v-col>
                                                       <!-- <v-col cols="12" sm="6" md="3"></v-col>
                           <v-col cols="12" sm="6" md="6">

                           <v-file-input
                                accept="image/*"
                                label="Attach Documents"
                              ></v-file-input>
                              </v-col> -->
                     </v-row>
                   </v-card>

                  </v-list-item-content>
 
                   </v-card>
                </v-dialog>
              </v-row>
                <v-data-table 
                  v-model="selected"
                  v-if="active_tab == 'Pending Liquidation'"
                  :dense="true" 
                  :headers="headers"
                  show-select
                  :items="table_data"
                  class="elevation-1" 
                  :loading="loading"
                  disable-pagination
                  :hide-default-footer="true"
                  loading-text="Loading Data... Please wait">
                </v-data-table>

                <v-data-table
                v-model="selected"
                v-if="active_tab == 'Pending RFQ'"
                :dense="true" :headers="pending_rfq_header"
                :items="pending_lot_creation"
                class="elevation-1" 
                :loading="loading"
                show-select
                disable-pagination
                :hide-default-footer="true"
                loading-text="Loading Data... Please wait">

                </v-data-table>

            </v-flex>
        </v-layout>
          <div v-if="active_tab == 'Pending Liquidation' || active_tab == 'Pending RFQ' "  class="float-right">
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
          <div v-if="active_tab == 'Pending Publish'  || active_tab == 'In Progress' || active_tab == 'Decision Pending'" class="float-right">
            <v-row class="ml-2">
              <v-col cols="4" sm="3">
                <div>
                  <v-select
                  v-model="pendingpagesize"
                  :items="itemsperpage"
                  label="Items per Page"
                  @change="handlePageSizeChange"
                ></v-select>
                </div>
              </v-col>

              <v-col cols="12" sm="9" >
                <v-pagination class="mt-3"
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
import Handsontable from 'handsontable';
import HeaderComponent from "../../../../commoncomponents/HeaderComponent";
import moment from 'moment'
import JwPagination from 'jw-vue-pagination';


export default {
    data() {
      const todayTime = new Date().getHours() + ':' + new Date().getMinutes();
        return {         
          todayTime,
          number :0,
          date: new Date(),
          time: null,
          amount_received:0,
          test_lot_type:'',
          ContractLotInventoryDialog: false,
          contracted_value:'',
      time1: null,
      time2: null,
      time3: null,
      time4: null,
      time5: null,
      time6: null,
      time7: null,
      time8: null,
      menu: null,
      menu1: false,
      menu2: false,
      menu_1: false,
      menu_2: false,
      menu_3: false,
      menu_4: false,
      menu_5: false,
      menu_6: false,
      menu_7: false,
      menu_8: false,
      menu_9: false,
      menu_10: false,
      menu_11: false,
      menu_12: false,
      menu_13: false,
      menu_14: false,
      menu_15: false,
      menu_16: false,
      menu_17: false,
      menu_18: false,
      menu_19: false,
      cards: [],
      lotEditDialog: false,
      lot_description: "",
      search_publish: "",
      search_progress: "",
      search_decision: "",
      lot_type: "",
      selected_lot_item_id: "",
      selected_lot_details: "",
      selected_et_lot_details: "",
      selected_lot_detail_items: [],
      selected_lot_bid_details: [],
      selected_lot_active_bid_details: [],
      bill_to_items: [],
      winner_billing_to: '',
      winner_billing_to_name: '',
      progress_overlay: false,
      all_lots: [],
      pending_publish_lots: [],
      pending_publish_lot_header:[
        { text: "Lot ID", value: "id"},
        { text: "Lot Name", value: "lot_name"},
        { text: "Lot Type", value: "lot_type"},
        {text:"Status", value:"auto_publishable"},
        { text: "Publish Error", value:"beam_lot_response"},
        { text: "", value: "actions", width: '25%'},
      ],
      
      selected_inventory_images: [],
      lot_images: "",
      lot_images_count: 0,
      checkedImages: [],
      manual_winner_amount: 0,
      re_publishDialog: false,
      B2b_email: false,
   
      manual_creation: '',
      Emaildialog: false,
      imageDailog : false,
      tab_link: "Publish",
      selected_vendors: [],
      selected_lots: [],
      files: [],
      classTypes: ['Publish', 'In progress', 'Decision Pending'],
      email_classTypes: ['Publish', 'Decision Pending'],
      dialog: false,
      winner_payment_status: '',
      dispatched: false,
      dispatched1:false,
      inventoryDownloadDialog: false,
      email_id: "",
      tab_index: 0,
      selectedDisposition: '',
      disposition: [],
      submission_headers: [],
      dispositionRemarks: '',
      search_vendor: '',
      deleteItemPopup: false,
      ReliveLotPopup: false,
      delete_reasons: ['Item Not Found', 'Wrong item'],
      delete_remark: '',
      delete_reason: '',
      createLotDialog: false,
      requistIdPopup: false,
      liquidation_requests: [],
      displayRequestDetail: false,
      selected_request: '',
      contract_lot_id:'',	
      contractDispatchDialog: false,	
      contract_dispatch_headers: [	
        {text: "Item Id", align: "start", value: 'tag_number'},	
        { text: "Article Id", value: 'sku_code' },	
        { text: "Article Description", value: "item_description" },	
        { text: "Grade", value: 'grade', width: '10%'}	
      ],	
      table_data_dispatch:[],	
      table_data_contract:[],
      headerText: "Liquidation",
      tabs: [
          "Pending Liquidation",
          "Pending RFQ",
          "Pending Publish",
          "In Progress",
          "Decision Pending"      ],
          number: 0,
      active_tab: "Pending Liquidation",
      original_table_data: [],
      search_inv: '',
      loading: true,
      selected: [],
      ip_selected: [],
      search: "",
      headers: [{
              text: "Site Location",
              align: "start",
              sortable: false,
              value: "location",
              width: '10%'
          },
          { text: "Class Description", value: "item_type",width: '20%' },
          { text: "Brand", value: "brand",width: '10%' },
          { text: "Brand Type", value: "brand_type" ,width: '10%'},
          { text: "Policy", value: "policy",width: '10%' },
          { text: "Article Description", value: "item_description",width: '20%' },
          { text: "Tag Number", value: "tag_number"},
          { text: "Serial Number", value: "serial_no",width: '10%' },
          { text: "Grade", value: "grade",width: '10%' },
          { text: "Path", value: "path",width: '10%' },
      ],
      lot_status_headers: [
        { text: "Lot Name", value: "lot_name" },
        { text: "Quantity", value: "quantity"},
        { text: "Dispatch", value: "edit" }
      ],
      beam_lot_status_headers: [
        { text: "Lot Name", value: "lot_name" },
        { text: "Quantity", value: "quantity" }, 
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      regradeConfirmDialog: false,
      lotConfirmDialog: false,
      liquidationConfirmDialog: false,
      lot_confirm_dialog_title: "",
      regrade_confirm_dialog_title: "",
      regrade_confirm_dialog_title_2: "",
      ContractlotEditDialog: false,
      createLotDialog: false,
      createBeamLotDialog: false,
      LotDetailsDialog: false,
      isdiasbled: false,
      et_isdiasbled:false,
      alert: false,
      confirmationModelDelete: false,
      alert_type: "success",
      alert_message: "success",
      table_data: [],
      pending_table_data: [],
      pending_lot_creation: [],
      pending_beam_lot_creation: [],
      progress_beam_lots: [],
      decision_beam_lots: [],
      dynamicColumns: [],
      selectedforLot: [],
      selected_inv: '',
      lot_mrp: null,
      buy_now_price: null,
      reserve_price: null,
      floor_price: null,
      increment_slab: null,
      start_date: "",
      lot_desc: "",
      lot_name: "",
      end_date: "",
      vendor_code: [],
      lot_expected_price: "",
      contracted_price: "",
      vendor_code_menu_items: [],
      winner_code_list:[],
      menu: "",
      current_lot: {},
      selected_lot_name: "",
      selected_lot_desc: "",
      selected_lot_id: "",
      winner_code: "",
      winner_amount: "",
      payment_status: "",
      amount_received: "",
      amount_received_backup:0,
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      pendingpagesize: 10,
      itemsperpage: [10,15,25],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}, {name: 'Brand', value: "brand"}],
      vendor_search_field_items: [{name: 'Vendor Name', value: "vendor_name"}, {name: 'Email', value: "vendor_email"}, {name: 'Vendor Code', value: "vendor_code"}],
      field_type: '',
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}],
      vendor_search_field_type: '',
      dispatch_status: "No",
      deleteLotConfirmDialog: false,
      publishLotConfirmDialog: false,
      extendTimeDialog: false,
      extendTimeConfirmDialog: false,
      deleteBeamLotConfirmDialog: false,
      vendorModel: false,
      dailog_confirm: '',
      dailog_cancel: '',
      dialog_title: '',
      dspRepairDialog: false,
      componentKey: 0,
      payment_status_menu_items: ['Partial Payment', 'Full Payment Received'],
      inputRules: [v => !!v || "The field is required"],
      inputNumRules: [v => !!v || 'The field is required',v => v >= 0 || 'value should be greater then 0' ],
      mrp_rule: [ v => !!v || 'The field is required',
      v => (Number(v) >= Number(this.buy_now_price)) || 'MRP should be greater then Buy Now Price',
      v => (Number(v) > Number(this.reserve_price)) || 'MRP should be greater then Reserve Price',
      v => (Number(v) > Number(this.floor_price)) || 'MRP should be greater then Floor Price' ],

      buy_now_rule: [ v => !!v || 'The field is required',
      v => (Number(v) <= Number(this.lot_mrp)) || 'Buy Now should be equal or less then MRP',
      v => (Number(v) > Number(this.reserve_price)) ||'Buy Now should be greater then Reserved Price',
      v => (Number(v) > Number(this.floor_price)) ||'Buy Now should be greater then Floor Price',
      v => ((Number(v) % 100) == 0) || 'Floor Price should be multiple of 100'],

      res_price_rule: [ v => !!v || 'The field is required',
      v => (Number(v)  < Number(this.lot_mrp)) || 'Reserved Price should be less then MRP',
      v => (Number(v)  < Number(this.buy_now_price)) || 'Reserved Price should be less then Buy Now Price',
      v => (Number(v)  > Number(this.floor_price)) || 'Reserved Price should be greater then floor Price',
      v => ((Number(v) % 100) == 0) || 'Floor Price should be multiple of 100'],

      inc_slab_rule:[ v => !!v || 'The field is required' ,
      v => ((Number(v) % 100) == 0) || 'Floor Price should be multiple of 100'],
      // v => (Number(v) > (Number(this.floor_price) * 0.05)) || "IncrementSlab can't be less than 5% of FloorPrice" ],

      floor_price_rule:[  v => !!v || 'The field is required',
      v => (Number(v) < Number(this.buy_now_price - this.increment_slab)) || "Floor Price can't be greater than difference between buy now price and increment slab", 
      v => ((Number(v) % 100) == 0) || 'Floor Price should be multiple of 100' ],

      email_format_rule:[ v => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email_id)) || "Please enter valid Email" ],

            exptected_price_chk:true,
            get_hands_dat:[], 
            select_all_inventory:false,
            LotInventoryDialog:false,
            quotationlistmodel: false,
            quotation_search: '',
            inventory_search: '',
            bid_serach: '',
            quotation_records: [],
            vendor_email_records: [],

            quotation_headers: [
              { text: "Vendor Name", value: "vendor_name", align: "start" },
              { text: "Vendor Code", value: "vendor_code" },
              { text: "Email", value: "vendor_email" },
              { text: "Bid Price", value: "expected_price" },
              { text: "Created At", value: "created_at" },
              { text: "", value: "action" },
            ],
            LotInventorytTabData: ["Inventory List","Lot Details"],
            decsion_tabs: ["Bid Details", "Settlement Details", "Emailed Vendors List"],
            LotInventorytabe:"Inventory List",
            LotInventoryTableHeader:[{ text: "Site Location", align: "start", sortable: false,
                    value: "location",
                    width: '10%'
                },
                { text: "Item ID", value: "tag_number",width: '20%' },
                { text: "Class Description", value: "item_type",width: '20%' },
                { text: "Brand", value: "brand",width: '10%' }, 
                { text: "Policy", value: "policy",width: '10%' },
                { text: "Article Description", value: "item_description",width: '20%' },
                { text: "Serial Number", value: "serial_no",width: '10%' },
                { text: "Grade", value: "grade",width: '10%' },
                { text: "Action", value: "delete_item",width: '10%' },
                ],
                lot_creation_headers: [
      { text: "Site Location", value: "location" },
      { text: "Category", value: "details[category_l3]" },
      { text: "Brand", value: "brand" },
      { text: "Article Description", value: "item_description", width: '10%' },
      { text: "Serial Number", value: "serial_number"},
      { text: "Grade", value: "grade" },
      { text: "Path", value: "path" }
      ],
    
    inprocess_lot_headers: [
      { text: "Lot ID", value: "id"},
      { text: "Lot Name", value: "lot_name"},
      { text: "Lot Type", value: "lot_type"},
      { text: "", value: "actions"},
    ],
    despatch_lot_headers: [
      { text: "Lot Name", value: "lot_name" },
      { text: "Quantity", value: "quantity"},
      { text: "Status", value: "warehouse_order_status"},
      { text: "Dispatch", value: "edit" }
      ],
    descision_lot_headers: [
      { text: "Lot ID", value: "id" },
      { text: "Lot Name", value: "lot_name" },
      { text: "Lot Type", value: "lot_type"},
      { text: "", value: "action" }
      ],
    inprocess_item: [],
    dispatch_ready_items: [],
    dispatched_items: [],
    descision_pending_items: [],
    offline_lot_item: [],
    emailed_lot_decision_headers: [
      { text: "Id", value: "id" },
      { text: "Lot Name", value: "lot_name" },
      { text: "End Date", value: "end_date" },
      { text: "Quantity", value: "quantity"},
      { text: "Expected Price", value: "order_amount" },
      { text: "Total Bids", value: "bid_count" },
      { text: "Alert Level", value: "alert_level" },
      { text: "Action", value: "lot_info" }
      ],
    emailed_lot_decision_item: [],
    publish_lot_headers: [
      { text: "Id", value: "id" },
      { text: "Display Name", value: "lot_name" },
      { text: "Bid Number", value: "order_number" },
      { text: "Bid Status", value: "status" },
      { text: "Floor Price", value: "floor_price", width: '10%' },
      { text: "Reserve Price", value: "reserve_price" },
      { text: "Start Date", value: "start_date" },
      { text: "End Date", value: "end_date" },
      { text: "", value: "actions" }
      ],
      publish_lot_eheaders: [
      { text: "Id", value: "id" },
      { text: "Display Name", value: "lot_name" },
      { text: "Bid Number", value: "order_number" },
      { text: "Bid Status", value: "status" },
      { text: "Floor Price", value: "floor_price", width: '10%' },
      { text: "Reserve Price", value: "reserve_price" },
      { text: "Start Date", value: "start_date" },
      { text: "End Date", value: "end_date" },
      { text: "Edit", value: "edit" },
      { text: "", value: "actions" }
      ],
    selectedLotForRepublish: {},
    active_tab_publish_lot: "Bid Details",
    
    publish_tabs: [
    "Inventory List",
    "Lot Details"],

    inprogress_tabs: [
    "Inventory List",
    "Lot Details"],

    pending_decision_tabs: [
    "Inventory List",
    "Lot Details",
    ],
    ContractLotInventorytTabData:["Inventory List",	
    "Lot Details",],
    bid_detail_header: [
    {text: "User", value: "user_name", width: "10%"},
    { text: "Client IP", value: "client_ip", width: '18%' },
    { text: "Bid Price", value: "bid_price" },
    { text: "Is Active", value: "is_active" },
    { text: "User Bid Status", value: "bid_status" },
    { text: "Created At", value: "created_at" },
    ],

    BidDetailHeader: [
    {text: "User", value: "vendor_name"},
    {text: "Vendor Code", value: "vendor_code"},
    {text: "Email", value: "vendor_email"},
    { text: "Client IP", value: "client_ip"},
    { text: "Bid Price", value: "expected_price" },
    { text: "Created At", value: "created_at" },
    ],

    VendorListDetailsHeader: [
      { text: 'Vendor Code', value: "vendor_code"},
      { text: 'Vendor Name', value: "vendor_name"},
      { text: 'Vendor Email', value: "vendor_email"}
    ],

    inv_list_header: [
    {text: "Item Type", value: "item_type", width: "15%"},
    { text: "SKU", value: "sku_code", width: '10%' },
    { text: "Grade", value: "grade", width: '10%' },
    { text: "Price", value: "item_price" },
    { text: "Serial Number", value: "serial_number" },
    { text: "Inventory Status", value: "status" },
    { text: "Tag Number", value: "tag_number" },
    ],

    vendor_headers : [
    {text: "User", value: "vendor_name"},
    {text: "Vendor Code", value: "vendor_code"},
    { text: "E-mail", value: "vendor_email" },
    { text: "Category", value: "brand" },
    { text: "Site Location", value: "vendor_city" }
    ],
    pending_rfq_header: [
    {text: "", value: "customcheck", width: "3%"},
    {text: "Request ID", value: "request_number"},
    { text: "Tag Number", value: "tag_number" },
    { text: "Grade", value: "manual_grade" },
    { text: "Site Location", value: "location" },
    { text: "Class Description", value: "item_type" },
    { text: "Brand", value: "brand" },
    { text: "Brand Type", value: "brand_type" },
    { text: "Policy", value: "policy" },
    { text: "Article ID", value: "sku_code" },
    { text: "Article Description", value: "item_description" },
    { text: "Serial Number", value: "serial_no" },
    { text: "Path", value: "path" }
    ],
    winner_dispatch_status: '',
    total_items: '',
    graded_items: '',
    pending_grade_items: '',
    selected_quotation: {},
    displayReasonField: false,
    isnewQuotation: false,
    currentUser: {},
    search_bid: '',
    new_lot_name: '',
    vendor_item: [],
            LotInventoryData: [],
            selectedData:0,
            pageOfItems: [],
            hotSettings: {
                data: [],
                disableVisualSelection: true,
                afterGetColHeader: this.setEditHeader,
              
                // colHeaders: [],
                rowHeaders: false,
                height: 755,
                rowHeights: 20,
                stretchH: 'all',
                filters: true,
                dropdownMenu: true,
                formulas: true,
                colWidths: [10, 25, 20, 25, 30, 20, 50, 20, 30, 20, 20, 35, 35],
                dropdownMenu: ['filter_by_condition','filter_by_value', 'filter_action_bar', ],
                outsideClickDeselects: false,
                licenseKey: 'non-commercial-and-evaluation',
            },
            selected_Extend_End_time : "",
            selected_Extend_Time_Error : "",
            active_tab_extend_number : 0
            


        }
    },
    computed:
    {
      partial_rules () { 
      return [
          () => (parseInt(this.amount_received) < parseInt(this.winner_amount)) || 'should not be greater than or equal to winner amount',
          v => !!v || 'The field is required',
          v => (v > 0) || 'Should be greater than zero' 
          ];
      },

      getEndDate() {
        var endDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1 );
        return endDate.toISOString().slice(0,10)
      }

    },
    async created() {
      this.currentUser = this.$store.state.currentUser
      switch (this.$store.state.action || '') {
      case "b2b_auction":
        this.tab_index = 3;
        this.loadData('Pending Publish')
        break;
      case "edit_lot":
        this.tab_index = 3;
        this.loadData('Pending Publish')
        break;
      case "republish_lot":
        this.tab_index = 3;
        this.loadData('Pending Publish')
        break;
      default:
        this.loadData('Pending Liquidation')
      }
        if(this.$store.state.alert_type){
          this.showAlert(this.$store.state.alert_type,this.$store.state.alert_message)
        }
        this.loading = true;
        this.get_vendor_liquidation();
        this.getDisposition()
    },
    components: {
    HeaderComponent,
    JwPagination,

  },
    methods: {
      allowedStep: m => m % 15 === 0,
      deleteBeamLotConfirmationPopupOpen(selected_lot_item_id) {
          this.selected_lot_item_id = selected_lot_item_id
          if (this.active_tab == 'Pending Publish' || this.active_tab == 'Decision Pending' || this.active_tab == 'In Progress'){
            this.deleteBeamLotConfirmDialog = true;
          }else{
            this.deleteLotConfirmDialog = true;
          }
        },
      close_b2b_email(){
      this.clear_lot_creation_form();
      this.B2b_email = false
    },
    close_b2b_contract(){	
      this.clear_lot_creation_form();	
      this.B2b_contract = false	
    },	

 // zero == null
 trackingChange(){
      this.amount_received = parseInt(this.amount_received) === 0 ?null : this.amount_received
    },
    FilterWithAlert(){
      this.getRTVOperationalData(this.active_tab);
    },
    close_b2b_auction(){
      this.clear_lot_creation_form();
      this.createBeamLotDialog = false
    },
    close_image_dialog(){
      this.checkedImages = [];
      this.lot_images = [];
      this.imageDailog = false
    },
    clear_lot_creation_form(){
      this.selectedforLot = []
      this.selected = []
      this.manual_creation = ''
      this.lot_name  = ''
      this.lot_desc  = ''
      this.lot_mrp   = null
      this.buy_now_price  = null
      this.reserve_price  = null
      this.floor_price    = null
      this.increment_slab = null
      this.start_date = ''
      this.end_date   = ''
      this.time1  = null
      this.time2  = null
      this.menu_1 = false
      this.menu_2 = false
      this.lot_images = ""
      this.checkedImages = [];
      this.selected_inventory_images = [];
    },

    creation_select(){
      this.lot_images_count = 0;
      this.checkedImages = [];
      if(this.selected.length == 0 ){
        this.showAlert("error", "Plese select the INVENTORY for desired operation !!");
        this.manual_creation = '';
        return;
      }

      var selected = this.selected.filter(x => x.status == 'Pending Liquidation Regrade')
      if (selected.length > 0){
        this.showAlert("error", 'Please Select only Pending for Lot Creation Inventories')
        this.B2b_email = false;
        this.selectedforLot = [];
        this.selected = [];
        return
      }

      var dc = this.selected.map(x =>  x.distribution_center_id)
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      dc = dc.filter(function( element ) {
        return element !== undefined;
      });

      var unique_array = dc.filter(unique)
      if (unique_array.length > 1) {
        this.selected = []
        this.showAlert("error", "Select only One Distribution Center Items");
        return
      }

      if (selected.length > 0){
        this.showAlert("error", 'Please Select only Pending for Lot Creation Inventories')
        this.B2b_email = false;
        this.selectedforLot = [];
        this.selected = [];
        return
      }

      else{
        if (this.manual_creation == 'B2B Auction'){
          this.$store.commit("setLotIds", {
            inventoryId: JSON.stringify(this.selected.map(a => a.inventory_id)),
            lotIds:  JSON.stringify(this.selected.map(a => a.id)),
            action: 'b2b_auction'
          });
          this.$router.push({ name: "ImagesList"});          
          // this.createBeamLotDialog = true
          // this.get_inventory_images();
        }
        else if (this.manual_creation == 'B2B Email'){
          this.$store.commit("setLotIds", {
            lotIds:  JSON.stringify(this.selected.map(a => a.id)),
            action: 'b2b_email'
          });
          this.$router.push({ name: "ImagesList"});
          this.loading = false;
          // this.B2b_email = true
          // this.get_inventory_images();

        }
        else if (this.manual_creation == 'B2B Contract'){	
          this.B2b_contract = true	
          this.get_inventory_images();	
        }
        else if (this.manual_creation == 'Offline Lot'){
          this.confirmationModelDelete = true
        }
      }
    },

    roundNearest100(num) {
      return Math.round(num / 100) * 100;
    },

    closeDeleteItemPopUp2(){
      this.confirmationModelDelete = false
      this.selectedforLot = []
      this.selected = []
      this.manual_creation = ''
    },

    loadData_publish_lot(tab){
    this.active_tab_publish_lot = tab; 
  },


        format_date(value){
            if (value) {
            return moment(String(value)).format('DD/MM/YYYY')
            }
        },

        changePaymentStatus(){ 
         if(this.payment_status == 'Full Payment Received' ){
           this.amount_received_backup = this.amount_received
           this.amount_received = this.winner_amount_received;
           this.amount_received = this.winner_amount;
           this.number = 0;
         }else{
           this.amount_received = this.amount_received_backup
           this.amount_received = '';
           this.number = 0;
         } 
        },
        changeWinnerPaymentStatus(){
         if(this.winner_payment_status == 'Full Payment Received' ){
            this.winner_amount_received = this.manual_winner_amount
         }else{
            this.winner_amount_received = this.amount_received_backup
         } 
        },
        setEditHeader(col, TH) {
            TH.className = 'col_header'
            if (col === 0) {
                TH.innerHTML = ""
            }
            if (col === 10) {
                // TH.innerHTML = "" + "<div class='editable'> <i class='fa fa-pencil'></i> Expected Price(INR) </div>"
            }
        },
        remove(item) {
            const index = this.vendor_code.indexOf(item.vendor_code)
            if (index >= 0) this.vendor_code.splice(index, 1)
        },
        LotInventoryDialogOpen(item){
          this.number=0;
            this.selected_lot_details = item
            this.selected_lot_name = item.lot_name;
            this.selected_lot_desc = item.lot_desc;
            this.selected_lot_id = item.id
            this.LotInventorytabe = 'Inventory List';
            this.selected_lot_mrp = item.mrp; 
            this.selected_lot_expected_price = item.order_amount; 
            this.selected_lot_end_date = item.end_date;
            this.winner_code = item.winner_code;
            this.winner_amount = item.winner_amount;
            this.payment_status = item.payment_status;
            this.amount_received = item.amount_received;

            if (this.payment_status == "Full Payment Received"){
                this.dispatch_status = item.dispatch_ready;               
            }else{
                this.dispatch_status = "No"
            }

            const formData = new FormData();
            formData.append("id", item.id)
            // Need to add one more condition to check lot type
            this.$http.secured.get("/api/v1/warehouse/liquidations/get_quotations", {params: {lot_id: item.id}})
                    .then(response => {
                      this.quotation_records = response.data.quotations
                    })
                    .catch(error => this.$toast.error('Error1 in fetching Liquidation Data'))
            this.$http.secured.get("/api/v1/warehouse/liquidations/get_email_vendors_list", {params: {lot_id: item.id}})
                    .then(response => {
                      this.vendor_email_records = response.data.liquidation_order_vendors
                    })
                    .catch(error => this.$toast.error('Error1 in fetching email Vendors Data'))

            this.$http.secured.post('/api/v1/warehouse/liquidation_orders/lot_inventory',formData)
                    .then(response => {
                        this.LotInventoryData = response.data.liquidations
                        this.LotInventoryDialog = true
                        this.selected = [];
                    })
                    .catch(error => this.$toast.error('Error1 in fetching Liquidation Data'))
        },
        LotInventoryContractDialogOpen(item){	
          this.number=0;	
            this.selected_lot_details = item	
            this.selected_lot_name = item.lot_name;	
            this.selected_lot_desc = item.lot_desc;	
            this.selected_lot_id = item.id  	
            this.selected_lot_mrp = item.mrp; 	
            this.selected_lot_expected_price = item.order_amount; 	
            this.selected_lot_end_date = item.end_date;	
            this.winner_code = item.winner_code;	
            this.winner_amount = item.winner_amount;	
            this.payment_status = item.payment_status;	
            this.amount_received = item.amount_received;	
            if (this.payment_status == "Full Payment Received"){	
                this.dispatch_status = item.dispatch_ready;               	
            }else{	
                this.dispatch_status = "No"	
            }	
            const formData = new FormData();	
            formData.append("id", item.id)	
            // Need to add one more condition to check lot type	
            this.$http.secured.get("/api/v1/warehouse/liquidations/get_quotations", {params: {lot_id: item.id}})	
                    .then(response => {	
                      this.quotation_records = response.data.quotations	
                    })	
                    .catch(error => this.$toast.error('Error1 in fetching Liquidation Data'))	
            this.$http.secured.get("/api/v1/warehouse/liquidations/get_email_vendors_list", {params: {lot_id: item.id}})	
                    .then(response => {	
                      this.vendor_email_records = response.data.liquidation_order_vendors	
                    })	
                    .catch(error => this.$toast.error('Error1 in fetching email Vendors Data'))	
            this.$http.secured.post('/api/v1/warehouse/liquidation_orders/lot_inventory',formData)	
                    .then(response => {	
                        this.LotInventoryData = response.data.liquidations	
                        this.ContractLotInventoryDialog = true	
                        this.selected = [];	
                    })	
                    .catch(error => this.$toast.error('Error1 in fetching Liquidation Data'))	
        },
        open_dialog_with_item(item){

          this.number = 0;
          this.active_tab_extend_number = 0

          this.selectedLotForRepublish = item
          this.selected_et_lot_details = item
          this.dialog = true
          this.selected_lot_item_id = item.id
          this.active_tab_publish_lot = "Inventory List"
          this.selected_lot_details = item
          this.winner_user = item.winner_code
          this.winner_payment_status = item.payment_status
          this.winner_amount_received = item.amount_received
          this.manual_winner_amount = item.winner_amount
          this.winner_remarks = item.remarks
          this.winner_billing_to = item.bill_to
          var bill_to_id = this.winner_billing_to
          this.$http.secured
          .get("/api/v1/warehouse/liquidation_orders/get_lot_details", {params: {id: item.id}})
          .then(response => {
            if (response) {
              item.ai_price = response.data.liquidation_order.ai_price
              this.selected_lot_detail_items = response.data.liquidation_order.liquidations
              this.selected_lot_bid_details = response.data.liquidation_order.bids
              this.selected_lot_active_bid_details = response.data.liquidation_order.active_bids
              this.bill_to_items = response.data.liquidation_order.billing_to_items

            // beam lot auto fill fields in settlement details
              let result = response.data.liquidation_order.bids.reduce(function (result, item){
                if(!result || result.bid_price<item.bid_price)
                return item
                else{
                  return result
                }
              },null)
              if(result){
                this.winner_user = result.user_name;
                this.manual_winner_amount = result.bid_price ;
              }
              
              // end
              
              if (bill_to_id){
                this.winner_billing_to_name = response.data.liquidation_order.billing_to_items.filter(x => (x.id == bill_to_id))[0].vendor_name
              }
              
            } else {
              this.showAlert("error", "No Data Found");
            }                         
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      },
    PublishLot(item){
      this.progress_overlay = true;
      this.$http.secured
      .post("/api/v1/warehouse/liquidation_orders/publish_lot", {id: item})
      .then(response => {
        if (response) {
          this.showAlert("success", "Lot Published on BEAM");
          this.dialog = false;
          this.publishLotConfirmDialog = false;
          this.selected = []
          this.progress_overlay = false;
          this.selected_lot_item_id = '';
          this.active_tab = "Pending Publish"
          this.getLotStatusData()
        } else {
          this.publishLotConfirmDialog   = false;
          this.progress_overlay = false;
          this.showAlert("error", "No Data Found");
        }                         
      })
      .catch(error => {
        this.publishLotConfirmDialog   = false;
        this.progress_overlay = false;
        this.showAlert("error", error.response.data.errors);
      });
    },
    PublishGlobalLot(){
      if (this.selected.length == 1){
        if (this.checkUniq(this.selected, 'Beam Lot')){
          return
        }
        if ((this.selected[0].increment_slab == null || this.selected[0].increment_slab == undefined || this.selected[0].increment_slab == '') || (this.selected[0].reserve_price == null || this.selected[0].reserve_price == undefined  || this.selected[0].reserve_price == '') || (this.selected[0].start_date == null || this.selected[0].start_date == undefined || this.selected[0].start_date == '') || (this.selected[0].end_date == null || this.selected[0].end_date == undefined || this.selected[0].end_date == '') || (this.selected[0].floor_price == null || this.selected[0].floor_price == undefined || this.selected[0].floor_price == '') || (this.selected[0].buy_now_price == null || this.selected[0].buy_now_price == undefined || this.selected[0].buy_now_price == '') || (this.selected[0].mrp == null || this.selected[0].mrp == undefined || this.selected[0].mrp == '')){
          this.showAlert("error", "Please Provide All Required Fields (Increment Slab, Reserve Price, Floor Price, End Date, Start Date and Buy Now Price) Before Publishing Lot");
          return
        }
        this.PublishLot(this.selected[0].id)
      } else {
        alert("Select only one Lot to Publish")
      }
    },
    CancelGlobalLot(){
      if (this.ip_selected.length == 1){
        this.selected_lot_item_id  = this.ip_selected[0].id ;
        this.deleteBeamLotConfirmationPopupOpen(this.ip_selected[0].id);
      } else {
        alert("Select only one Lot to Cancel")
      }
    },
    GlobalExtendTime(item){
      this.number=0;
      if (item){
        this.selected.push(item)
      }
      if (this.selected.length == 1){
        this.end_time = null
        this.time6 = null
        this.selected_et_lot_details = this.progress_beam_lots.filter(x => x.id == this.selected[0].id)[0];
        this.selected_lot_item_id  = this.selected[0].id;
        this.extendTimeDialogOpen();
        // this.extendTimeDialog = true;
      } else {
        alert("Select only one Lot to Extend Time");
      }
    },

    checkUniq(selected, type){
      var lot_types = selected.map(x => x.lot_type)
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      lot_types = lot_types.filter(function( element ) {
        return element !== undefined;
      });

      var unique_array = lot_types.filter(unique)
      if (unique_array.length > 1) {
        this.selected = []
        this.showAlert("error", "Select only One Lot Type");
        return true
      }else if(unique_array[0] != type){
        this.selected = []
        this.showAlert("error", "Select only "+ type + " Lot Type for this action");
        return true
      }else {
        return false
      }
    },
    
    extendTimeConPopupOpen() {
      if (this.$refs.extendTimeForm.validate()) {
        const selectedDateString = this.selected.length > 0 && this.selected[0].end_date || this.selectedLotForRepublish.end_date ; 
        const [selectedDate, selectedTime] = selectedDateString.split(" ");
         
        const [Apiday, Apimonth, ApiYear] = selectedDate.split("/")
        const [ApiHours, Apimin] = selectedTime.split(":")

        const [currentYear, currentmonth, currentday] = this.end_date.split("-")
        const [currentHours, currentmin] = this.time6.split(":")

        const selectedDateTime = new Date(ApiYear, Apimonth - 1, Apiday, ApiHours, Apimin);

        const currentDateTime = new Date(currentYear, currentmonth - 1, currentday, currentHours, currentmin);

        if (selectedDateTime > currentDateTime) {
          this.selected_Extend_Time_Error = `Please select a value greater than current End Time`
        } else if (selectedDateTime < currentDateTime) {
          this.selected_Extend_Time_Error = ""
          this.extendTimeConfirmDialog = true;
        } else {
          this.selected_Extend_Time_Error = ""
          this.extendTimeConfirmDialog = true;
        }
      }
    },

    extendTimeDialogOpen(){
      this.extendTimeDialog = true;
    },

    extendBeamLotFn(item){
      this.number++;
      this.$http.secured
        .post("/api/v1/warehouse/liquidation_orders/extend_time", {id: item, end_date: (this.end_date + " " + this.time6)})
        .then(response => {
          if (response.data) {
              this.closePopup();
              this.showAlert("success", "Lot Extended Successfully");
              this.dialog = false;
              this.selected_lot_item_id = '';
              this.ip_selected = [];
              this.getRTVOperationalData(this.active_tab)
              this.loadData('In Progress')
          } else {
              this.extendTimeConfirmDialog = false;
              this.extendTimeDialog = false;
              this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
        });
        this.end_date = "";
        this.time2 = "";
    },
        lotInventoryData(item){
          this.LotInventorytabe = item
          this.LotInventorytabe === 'Inventory List';
          if(this.LotInventorytabe == 'Settlement Details'){
            this.autoFillFields();
            this.number = 0;
          }
          
        },

        deleteLotSubmitFn() {
          if (this.delete_remark == '' || this.delete_remark == undefined){
            this.$toast.error('Please Select Valid Reason to Delete')
            return
          }
          const formData = new FormData();
          formData.append('remark', this.delete_remark)
          formData.append("id", this.selected_lot_item_id)
          this.$http.secured
              .post("/api/v1/warehouse/liquidation_orders/delete_lot", formData)
              .then(response => {
                  if (response.data) {
                      this.showAlert("success", "Lot Canceled");
                      this.deleteLotConfirmDialog = false;
                      this.LotInventoryDialog = false
                      this.delete_reason = ''
                      this.delete_remark = ''
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

        ReliveLotSubmitFn(){
          const formData = new FormData();
          formData.append("id", this.selected_lot_details.id)
          this.$http.secured
              .post("/api/v1/warehouse/liquidation_orders/relive_lot", formData)
              .then(response => {
                if (response.data) {
                    this.showAlert("success", "Lot Relived");
                    this.LotInventoryDialog = false
                    this.getLotStatusData();
                } else {
                    this.showAlert("error", "No Data Found");
                }
              })
              .catch(error => {
                  this.showAlert("error", "Something went wrong from Network" + error);
              });
          this.ReliveLotPopup = false;
          this.LotDetailsDialog = false;
        },

        deleteBeamLotSubmitFn(selected_lot_item_id) {
      const formData = new FormData();
      formData.append("id", selected_lot_item_id)
      this.$http.secured
        .post("/api/v1/warehouse/liquidation_orders/cancel_lot_mail", formData)
        .then(response => {
          if (response.data) {
            this.showAlert("success", "Lot Deleted");
            this.ip_selected = [];
            this.deleteBeamLotConfirmDialog = false;
            this.LotInventoryDialog = false;
            this.ContractLotInventoryDialog = false;
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
        publishLotConfirmationPopupOpen() {
          this.publishLotConfirmDialog = true;
        },
        LotDetailSubmitFn() {
          this.number++;
            if (this.$refs.settlementForm.validate()) {
                this.dispatched = true
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

                formData.append("id", this.selected_lot_details.id)

                for (var i = 0; i < this.files.length; i++) {
                  let file = this.files[i];
                  formData.append("files[]", file);
                }


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
                    .post("/api/v1/warehouse/liquidations/update_lot_order", formData)
                    .then(response => {
                        if (response.data) {

                            this.showAlert("success", "Lot Detail Update Successfully");
                            this.createLotDialog = false;
                            this.LotInventoryDialog = false;
                            this.ContractLotInventoryDialog = false;
                            this.getLotStatusData();
                            this.winner_code = "";
                            this.winner_amount = "";
                            this.payment_status = "";
                            this.amount_received = "";
                            this.dispatch_status = "";
                            this.disabled = false
                            this.dispatched = false
                            this.selected_quotation = {}
                            this.files = [];
                        } else {
                            this.showAlert("error", "No Data Found");
                        }
                    })
                    .catch(error => {
                        this.showAlert("error", "Something went wrong from Network" + error);
                    });
                this.LotDetailsDialog = false;
            }
            if (this.active_tab == "Lot Publish" && this.$refs.updateLotForm.validate()) {
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
                .post("/api/v1/warehouse/liquidations/update_lot_order", formData)
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
            //  this.$refs.updateLotForm.reset()
            this.selected_inv = item
            this.selected_lot_name = item.lot_name;
            this.selected_lot_desc = item.lot_desc;
            this.selected_lot_id = item.id
            this.winner_code = item.winner_code;
            this.winner_amount = item.winner_amount;
            this.payment_status = item.payment_status;
            this.amount_received = item.amount_received;
            this.lot_type = item.lot_type

            if (this.payment_status == "Full Payment Received"){
                this.dispatch_status = item.dispatch_ready;               
            }else{
                this.dispatch_status = "No"
            }
            this.get_winner_code(item.id)           
            this.$refs.updateLotForm.resetValidation()
        },
        yellowRenderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.color = 'green';
        },
        getLotStatusData(search = false) {
          this.loading = true;
          const params = this.getRequestParams(
            this.page,
            this.pageSize,
            this.pendingpagesize,
            this.totalPages
          );

          let lot_type_text = '';
          if (this.active_tab == 'Decision Pending') {
            lot_type_text = 'decision_pending';
          } else if (this.active_tab == 'In Progress') {
            lot_type_text = 'in_progress';
          } else if (this.active_tab == 'Pending Publish') {
            lot_type_text = 'pending_publish';
          } else if (this.active_tab == 'Pending RFQ') {
            lot_type_text = 'dispatch_ready';
          }

          let page = search ? 1 : params['page'];

          let searchParams = {};
          if (isNaN(this.search)) {
            searchParams.lot_name = this.search || '';
          } else {
            searchParams.lot_id = this.search || '';
          }

          this.$http.secured
            .get('/api/v1/warehouse/liquidation_orders', {params: {page: page, per_page: params['size'], lot_type: lot_type_text, ...searchParams,},
            })
            .then((response) => {
              if (response.data) {
                this.all_lots = response.data.liquidation_orders;
                this.pending_publish_lots = response.data.liquidation_orders.filter((x) => (x.status == 'Pending Publish' || x.status == 'Publish Initiated') || (x.lot_type == 'Email Lot' && x.email_sent == false));
                this.inprocess_item = this.all_lots.filter((x) => x.status == 'In Progress' || (x.lot_type == 'Email Lot' && x.email_sent == true && !x.is_expired));
                this.descision_pending_items = response.data.liquidation_orders.filter((x) => x.status == 'Confirmation Pending' || x.status == 'Partial Payment' || x.status == 'No Bid' || x.status == 'Full Payment Received' || (x.is_expired && x.email_sent == true && x.status != 'Dispatch Ready') || (x.lot_type == 'Manual Dispatch Lot' && x.status == 'Pending Closure'));
                this.dispatch_ready_items = response.data.liquidation_orders.filter( (x) => x.status == 'Dispatch Ready'); this.loading = false; this.totalPages = response.data.meta.total_pages;
              } else {
                this.loading = false;
                this.showAlert('error', 'No Data Found');
              }
            })
            .catch((error) => {
              this.showAlert('error', 'Something went wrong from Network' + error);
              this.loading = false;
            });
        },
      getBeamLotStatusData() {
        this.loading = true;
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
      this.$http.secured
        .get("/api/v1/warehouse/liquidation_orders/beam_orders", {params: {page: params['page'], per_page: 500}})
        .then(response => {
          if (response.data.liquidation_orders.length > 0) {
            this.all_lots = response.data.liquidation_orders
            this.pending_beam_lot_creation = this.all_lots.filter(x => x.status == "Pending Publish")
            this.progress_beam_lots = this.all_lots.filter(x => x.status == "In Progress")
            this.decision_beam_lots = this.all_lots.filter(x => (x.status == "Confirmation Pending" || x.status == "No Bid"))
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
            var  start_dtime = this.dateformat(this.start_date + " " + this.time3)
            var  end_dtime = this.dateformat(this.end_date + " " + this.time4)
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time..!!");
          return
          }
            // if (this.lot_images == ''){
            //     this.showAlert('error', "Please Attach Images")
            //     return
            // }
            if (this.active_tab == "Pending RFQ" && this.$refs.createLotForm.validate()) {
                this.isdiasbled = true
                const formData = new FormData();
                formData.append("lot_name", this.lot_name)
                formData.append("lot_expected_price", this.lot_expected_price)
                formData.append("lot_desc", this.lot_desc)
                formData.append("start_date", (this.start_date + " " + this.time3))
                formData.append("end_date", (this.end_date + " " + this.time4))
                formData.append("images", this.lot_images)

                for (var i = 0; i < this.files.length; i++) {
                  let file = this.files[i];
                  formData.append("files[]", file);
                }

                this.selected = this.selected.filter(x => (x.status == 'Pending Lot Creation' || x.status == 'Pending RFQ'))
                if (this.selected.length <= 0){
                  this.showAlert("error", 'Please Select only Pending for Lot Creation Inventories')
                  this.B2b_email = false;
                  this.selectedforLot = [];
                  this.selected = [];
                  this.lot_name = "";
                  this.lot_mrp = "";
                  this.lot_desc = "";
                  this.time4 = ""
                  this.time3 = ""
                  this.lot_expected_price = "";
                  this.start_date = "";
                  this.end_date = "";
                  this.vendor_code = "";
                  this.manual_creation = "";
                  this.lot_images = "";
                  this.lot_images_count = 0
                  this.selected = [];
                  this.files = [];
                  this.isdiasbled=false
                  return
                }

                for (var i = 0; i < this.selected.length; i++) {
                    formData.append("liquidation_obj[]", this.selected[i].id);
                }

                this.$http.secured
                    .post("/api/v1/warehouse/liquidations/create_lots", formData)
                    .then(response => {
                        if (response) {
                            this.showAlert("success", "Lot Created For Selected Inventory");
                            this.B2b_email = false;
                            this.selectedforLot = [];
                            this.selected = [];
                            this.lot_name = "";
                            this.lot_mrp = "";
                            this.lot_desc = "";
                            this.time4 = ""
                            this.time3 = ""
                            this.lot_expected_price = "";
                            this.start_date = "";
                            this.end_date = "";
                            this.vendor_code = "";
                            this.manual_creation = "";
                            this.lot_images = "";
                            this.lot_images_count = 0
                            this.selected = [];
                            this.files = [];
                            this.isdiasbled=false
                            this.field_type = ''
                            this.search = ''
                            this.active_tab = 'Pending Publish'
                            this.getLotStatusData() 
                            
                        } else {
                            this.showAlert("error", "No Data Found");
                        }                         
                    })
                    .catch(error => {
                        this.isdiasbled = false
                        this.showAlert("error", error.response.data.errors);
                    });
            }
        },
        sendContractLotCreationFn() {    	
            if (this.active_tab == "Pending RFQ" && this.$refs.createLotForm.validate()) {	
                this.isdiasbled = true	
                const formData = new FormData();	
                formData.append("lot_name", this.lot_name)	
                formData.append("lot_expected_price", this.lot_expected_price)	
                formData.append("lot_desc", this.lot_desc)          	
                formData.append("images", this.lot_images)	
                for (var i = 0; i < this.files.length; i++) {	
                  let file = this.files[i];	
                  formData.append("files[]", file);	
                }	
                this.selected = this.selected.filter(x => (x.status == 'Pending Lot Creation' || x.status == 'Pending RFQ'))	
                if (this.selected.length <= 0){	
                  this.showAlert("error", 'Please Select only Pending for Lot Creation Inventories')	
                  this.B2b_contract = false;	
                  this.selectedforLot = [];	
                  this.selected = [];	
                  this.lot_name = "";	
                  this.lot_expected_price = "";	
                  this.vendor_code = "";	
                  this.manual_creation = "";	
                  this.lot_images = "";	
                  this.lot_images_count = 0	
                  this.selected = [];	
                  this.files = [];	
                  this.isdiasbled=false;	
                  return	
                }	
                for (var i = 0; i < this.selected.length; i++) {	
                    formData.append("liquidation_obj[]", this.selected[i].id);	
                }	
                this.$http.secured	
                    .post("/api/v1/warehouse/liquidations/create_contract_lots", formData)	
                    .then(response => {	
                        if (response) {	
                            this.showAlert("success", "Lot Created For Selected Inventory");	
                            this.B2b_contract = false;	
                            this.active_tab == 'Pending Publish';	
                            this.getLotStatusData() 	
                            this.selectedforLot = [];	
                            this.selected = [];	
                            this.lot_name = "";	
                            this.lot_expected_price = "";	
                            this.vendor_code = "";	
                            this.manual_creation = "";	
                            this.lot_images = "";	
                            this.lot_images_count = 0	
                            this.selected = [];	
                            this.files = [];	
                            this.isdiasbled=false	
                            this.field_type = ''	
                            this.search = ''                           	
                             
                             
                        } else {	
                            this.showAlert("error", "No Data Found");	
                        }                         	
                    })	
                    .catch(error => {	
                        this.isdiasbled = false	
                        this.showAlert("error", error.response.data.errors);	
                    });	
            }	
        },
        create_offline_lot() {
          const formData = new FormData();
          this.selected = this.selected.filter(x => x.status == 'Pending Lot Creation')
          if (this.selected.length <= 0){
            this.showAlert("error", 'Please Select only Pending for Lot Creation Inventories')
            this.manual_creation = "";
            this.selected = [];
            this.confirmationModelDelete = false
            this.selectedforLot = [];
            this.files = [];
            this.getRTVOperation
            return
          }
          for (var i = 0; i < this.selected.length; i++) {
              formData.append("liquidation_obj[]", this.selected[i].id);
          }

          this.$http.secured
              .post("/api/v1/warehouse/liquidations/create_manual_dispatch_lot", formData)
              .then(response => {
                  if (response) {
                      this.showAlert("success", "Lot Created For Selected Inventory");
                      this.manual_creation = "";
                      this.selected = [];
                      this.confirmationModelDelete = false
                      this.selectedforLot = [];
                      this.field_type = ''
                      this.search = ''
                      this.files = [];
                      this.getRTVOperationalData(this.active_tab) 
                      
                  } else {
                      this.showAlert("error", "No Data Found");
                  }                         
              })
              .catch(error => {
                  this.isdiasbled = false
                  this.showAlert("error", error.response.data.errors);
              });
        },

        openOfflineLotVednorDialog(item){
          this.number=0;
          this.vendorModel = true
          this.selected_lots = [item]
        },

        closeVendorModel(){
          this.vendor_code = []
          this.vendorModel = false
          this.selected_lots = []
        },

        dispatchOfflineLots(){
          if (this.vendor_code.length <= 0){
            this.showAlert("error", "Please Select Vendor");
            return
          }
          const formData = new FormData();
          formData.append("id", this.selected_lots[0].id);
          formData.append("winner_user", this.vendor_code);
          this.$http.secured
              .post("/api/v1/warehouse/liquidations/dispatch_offline_lot", formData)
              .then(response => {
                  if (response) {
                      this.showAlert("success", "Lot Sent For Dispatch");
                      this.vendorModel = false
                      this.selected_lots = []
                      this.selectedforLot = [];
                      this.vendor_code = [];
                      this.getRTVOperationalData(this.active_tab) 
                      
                  } else {
                      this.showAlert("error", "No Data Found");
                  }                         
              })
              .catch(error => {
                  this.showAlert("error", error.response.data.errors);
              });

        },

        dateformat(dateString){
          var dateTimeParts = dateString.split(' ');
          var timeParts = dateTimeParts[1].split(':');
          var dateParts = dateTimeParts[0].split('-');
          var date = new Date(dateParts[0],parseInt(dateParts[1], 10) - 1,dateParts[2],timeParts[0], timeParts[1])
          return date;
        },
        sendBeamLotCreationFn() {
        var  start_dtime = this.dateformat(this.start_date + " " + this.time2)
        var  end_dtime = this.dateformat(this.end_date + " " + this.time1)
      if (this.active_tab == "Pending RFQ" && this.$refs.createBeamLotForm.validate()) {
        if(end_dtime <= start_dtime){
          this.showAlert("error", "Invalid Date / Time ..!!");
        }else{
        const formData = new FormData();
        formData.append("lot_name", this.lot_name)
        formData.append("lot_mrp", this.lot_mrp)
        formData.append("lot_desc", this.lot_desc)
        formData.append("buy_now_price", this.buy_now_price)
        formData.append("floor_price", this.floor_price)
        formData.append("reserve_price", this.reserve_price)
        formData.append("increment_slab", this.increment_slab)
        formData.append("start_date", (this.start_date + " " + this.time2))
        formData.append("end_date", (this.end_date + " " + this.time1))
        formData.append("images", this.lot_images)

        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }

        this.selected = this.selected.filter(x => x.status == 'Pending Lot Creation')
        if (this.selected.length <= 0){
          this.showAlert("error", 'Please Select only Pending for Lot Creation Inventories')
          this.closePopup()
          return
        }
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("liquidation_obj[]", this.selected[i].id);
        }
        this.$http.secured
          .post("/api/v1/warehouse/liquidations/create_beam_lots", formData)
          .then(response => {
            if (response) {
              this.showAlert("success", "Lot Created For Selected Inventory");
              this.clear_lot_creation_form()
              this.createBeamLotDialog = false;
              this.selected = [];
              this.files = [];
              this.lot_images = "";
              this.lot_images_count = 0;
              this.selectedforLot = [];
              this.selected = []
              this.checkedImages = [];
              this.active_tab = 'Pending Publish'
              this.field_type = ''
              this.search = ''
              this.getLotStatusData() 
              
            } else {
              this.showAlert("error", "No Data Found");
              this.closePopup();
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.errors);
          });
      }}
    },
    get_lot_images(lot_id){
      var inventory_images_all = []
      this.checkedImages = []
      this.lot_images = []
      for (var i = 0; i < this.selected.length; i++) {
      inventory_images_all.push(this.selected[i].id)
      }
      // this.selected_inventory_images = inventory_images_all
      this.$http.secured
       .get("/api/v1/warehouse/liquidations/get_lot_images", {params: {id: this.lot_id}})
       .then(response => {
       if (response.data) {
        this.selected_inventory_images = response.data
       } else {
         this.loading = false;
       }
       })
       .catch(error => {
       this.showAlert("error", "Something went wrong from Network" + error);
       this.loading = false;
      });
    },
    get_inventory_images() {
      var inventory_images_all = []
      this.checkedImages = []
      this.lot_images = []
      for (var i = 0; i < this.selected.length; i++) {
      inventory_images_all.push(this.selected[i].id)
      }
      // this.selected_inventory_images = inventory_images_all
      this.$http.secured
       .get("/api/v1/warehouse/liquidations/get_liquidation_images", {params: {id: inventory_images_all}})
       .then(response => {
       if (response.data) {
        this.selected_inventory_images = response.data
       } else {
         this.loading = false;
       }
       })
       .catch(error => {
       this.showAlert("error", "Something went wrong from Network" + error);
       this.loading = false;
      });
    },
    get_image_popup(){
      if (this.selected_inventory_images){
        this.imageDailog = true;  
      }
      else{
        this.loading = false;
        this.showAlert("error", "No Data Found");
      }
    },
    get_selected_inventory_images(){
      this.lot_images = this.checkedImages
      this.lot_images_count = this.lot_images.length
      this.imageDailog = false;
    },
    get_republish_inventory_images() {
      this.$http.secured
       .get("/api/v1/warehouse/liquidations/get_republish_liquidation_images", {params: {id: this.selected_lot_item_id}})
       .then(response => {
       if (response.data) {
        this.selected_inventory_images = response.data
         this.imageDailog = true;
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
    sendRepublishLotFn() {
      var  start_dtime = this.dateformat(this.start_date + " " + this.time3)
      var  end_dtime = this.dateformat(this.end_date + " " + this.time4)
      if (this.active_tab == "Pending Publish" && this.$refs.createLotForm.validate()) {
        if(end_dtime <= start_dtime){
          this.showAlert("error", "Invalid Date / Time ..!!");
        }else{
        const formData = new FormData();
        formData.append("lot_name", this.lot_name)
        formData.append("lot_mrp", this.lot_mrp)
        formData.append("lot_desc", this.lot_desc)
        formData.append("buy_now_price", this.buy_now_price)
        formData.append("floor_price", this.floor_price)
        formData.append("reserve_price", this.reserve_price)
        formData.append("increment_slab", this.increment_slab)
        formData.append("start_date", (this.start_date + " " + this.time3))
        formData.append("end_date", (this.end_date + " " + this.time4))
        formData.append("id", this.selected_lot_item_id)
        formData.append("images", this.lot_images)

        this.$http.secured
          .post("/api/v1/warehouse/liquidations/create_beam_republish_lots_async", formData)
          .then(response => {
            if (response.data) {
              this.showAlert("success", "Lot republish intiated");
              this.re_publishDialog = false;
              this.lot_images = "";
              this.lot_images_count = 0
              this.selected = [];
              this.getRTVOperationalData(this.active_tab) 
              
            } else {
              this.showAlert("error", error.response.data.errors);
              this.re_publishDialog = false;
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.errors);
            this.re_publishDialog = false;
          });
        }
      }
    },
    WinnerSubmitFn(item) {
      this.number++;
      if (this.winner_user) {
        this.dispatched1=true;
        if (this.winner_dispatch_status == "Yes"){
            this.winner_dispatch_status = true
        }else{
            this.winner_dispatch_status = false
        }

        const formData = new FormData();
        formData.append("id", item)
        formData.append("winner_user", this.winner_user)
        formData.append("winner_billing_to", this.winner_billing_to)
        formData.append("winner_price", this.manual_winner_amount)
        formData.append("winner_payment_status", this.winner_payment_status)
        formData.append("winner_remarks", this.winner_remarks)
        formData.append("winner_dispatch_status", this.winner_dispatch_status)
        formData.append("winner_amount_received", this.winner_amount_received)

        if (this.winner_payment_status == "Full Payment Received") {
            if (this.winner_dispatch_status) {
                formData.append("lot_status", "Dispatch Ready")
            } else {
                formData.append("lot_status", "Full Payment Received")
            }
        } else {
            formData.append("lot_status", "Partial Payment")
        }
        this.$http.secured
            .post("/api/v1/warehouse/liquidations/update_lot_winner", formData)
            .then(response => {
                if (response.data) {
                    this.showAlert("success", "Lot Detail Update Successfully");
                    this.dialog = false;
                    this.winner_user = "";
                    this.winner_price = "";
                    this.winner_payment_status = "";
                    this.winner_billing_to = "";
                    this.winner_remarks = "";
                    this.winner_dispatch_status = "";
                    this.winner_amount_received = "";
                    this.dispatched1 = false;
                    this.disabled = false;
                    this.getLotStatusData()
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
            });
        this.LotDetailsDialog = false;
      } else {
        alert("Please select winner")
        this.number--;
      }
    },
    changedWinner: function(val) {
      var manual_winner_amount = ""
      $.map(this.selected_lot_active_bid_details, function(bid) {
      if(bid.user_name == val ){
        manual_winner_amount = bid.bid_price
      };
      });
      this.winner_payment_status = ''
      this.manual_winner_amount = manual_winner_amount
      this.winner_amount_received = ''
    },

    changedBillTo(){
      this.winner_billing_to_name = this.bill_to_items.filter(x => (x.id == this.winner_billing_to))[0].vendor_name
    },

    create_lot_dialog_open() {
        if (this.selected.length) {
            this.exptected_price_chk = true;
            this.lot_name = "";
            this.lot_desc = "";
            this.lot_mrp = null;
            this.lot_expected_price = null;
            this.end_date = "";
            this.vendor_code = "";
            this.selected.filter((ele) => {

                this.lot_mrp += parseInt(ele.mrp)
                this.lot_expected_price += parseInt(ele.sales_price)

            });

            if (this.exptected_price_chk){
                this.createLotDialog = true;
            }

        } else {
            this.showAlert(
                "error",
                "Please select Inventories"
            );
        }
    },
    create_beam_lot_dialog_open() {
      if (this.selected.length) {
        this.exptected_price_chk = true;
        this.lot_name = "";
        this.lot_desc = "";
        this.lot_mrp = null;
        this.lot_expected_price = 0;
        this.end_date = "";
        this.vendor_code = "";
        this.selected.filter((ele) => {
          if(!ele.sales_price || ele.sales_price == 0 || ele.sales_price == "" || ele.sales_price === null){
              this.exptected_price_chk = false;
          }else{
            this.lot_mrp += parseInt(ele.mrp)
            this.lot_expected_price += parseInt(ele.sales_price)
          } 
        });

        if (this.exptected_price_chk){
          this.createBeamLotDialog = true;
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

    handlePageChange(value) {
      this.page = value;
      if (this.active_tab == 'Pending Publish' || this.active_tab == 'In Progress' || this.active_tab == 'Decision Pending' || this.active_tab == 'Dispatch'){
        this.getLotStatusData();
      }else {
        this.getRTVOperationalData(this.active_tab);
      }
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      if ( this.active_tab == 'Pending Publish' || this.active_tab == 'In Progress' || this.active_tab == 'Decision Pending' || this.active_tab == 'Dispatch'){
        this.getLotStatusData();
      }else {

        this.getRTVOperationalData(this.active_tab);
      }
    },

    getRequestParams( page, pageSize, pendingpagesize) {
      let params = {};


      if (page) {
        params["page"] = page;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }
      if (pendingpagesize) {
        params["size"] = pendingpagesize;
      }

      return params;
    },

    getStatus(tab) {
      var status = "";
      if (tab == "Pending Liquidation") {
        status = "Pending Liquidation";
      } else if (tab == "Pending RFQ"){
        // status = "Pending Lot Creation"
           status = "Pending RFQ"
      }
      return status;
    },

    getRTVOperationalData(tab) {
        this.loading = true;
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        var status = this.getStatus(tab)
        this.$http.secured
            .get("/api/v1/warehouse/liquidations/fetch_inventories", {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value}})
            .then(response => {
                if (response.data) {
                  this.original_table_data = response.data.liquidations;
                  // this.dynamicColumns = Object.keys(response.data.liquidations[0])
                  this.table_data = this.original_table_data.filter(
                      x => x.status == status)
                  this.pending_lot_creation = response.data.liquidations.filter(
                      x => x.status == status || x.status == 'Pending Liquidation Regrade' || x.status == 'Pending RFQ')
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

    getRequestIdData(){
      this.$http.secured
          .get("/api/v1/warehouse/liquidations/get_liquidation_requests")
          .then(response => {
              if (response.data) {
                this.liquidation_requests = response.data.liquidation_requests
                this.liquidation_requests = this.liquidation_requests.filter(x => x.total_items >= 0)
                this.liquidation_requests = this.liquidation_requests.sort((a,b) => (a.color > b.color) ? 1 : ((b.color > a.color) ? -1 : 0))
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

    getRequestItems(val){
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.field_type = 'request_number'
      this.search = val
      this.selected_request = this.liquidation_requests.filter(x => x.request_id == val)[0]
      this.total_items = this.selected_request.total_items
      this.graded_items = this.selected_request.graded_items
      this.pending_grade_items = this.selected_request.remaining_count
      this.displayRequestDetail = true
      var status = this.getStatus(this.active_tab)

      const formData = new FormData();

      formData.append('search', val)
      formData.append('search_in', 'request_number')
      formData.append('status', status)
      formData.append('page', 1)
      formData.append('per_page', 500)

      this.$http.secured.post('/api/v1/warehouse/liquidations/search_item', formData)
      .then(response => {
        if (response.data) {
          this.requistIdPopup = false
          this.pending_lot_creation = response.data.liquidations.filter(
              x => x.status == status || x.status == 'Pending Liquidation Regrade' || x.status == 'Pending RFQ')
          this.totalPages =  response.data.meta.total_pages

        } else {
          this.loading = false;
          this.showAlert("error", "No Data Found");
        }
      })
      .catch(error => this.showAlert("error", "Error in Records"))
    },

    download_popup() {
      this.email_id = this.$store.state.currentUser.email;
      this.inventoryDownloadDialog = true;
    },
    download_btn() {
        var req_param = {email: this.email_id}
        if (this.selected.length > 0){
          var ids = this.selected.map(x => x.id)
          req_param = {email: this.email_id, liq_ids: ids}
        }
         this.$http.secured
           .get("/api/v1/warehouse/liquidations/generate_csv", {params: req_param})
           .then(response => {
             if (response.data) {
                    // this.file_url = response.data.url;
                    // document.getElementById("inventory_report").href = response.data.url;
                    // document.getElementById("inventory_report").click();
            //    this.showAlert("success", "downloaded");
               this.$toast.success('Email with Download Link is Sent Successfully')
               this.inventoryDownloadDialog = false;
               this.selected = [];
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

    openDeleteItem(item){
      if (item) {
        this.selected.push(item)
      }

      if (this.selected.length > 0) {
        this.deleteItemPopup = true
        this.new_lot_name = '';
      }else{
        this.$toast.error('Please Select Item to delete');
      }
      
    },

    OpenReliveLotPopup(item){
      this.number = 0;
      if (!this.selected_lot_details) {
        this.selected_lot_details = item
      }
      this.ReliveLotPopup = true
    },

    CloseReliveLotPopup(item){
      this.ReliveLotPopup = false
    },

    closeDeleteItemPopUp(){
      this.deleteItemPopup = false
      this.selected = []
      this.delete_remark = ''
      this.delete_reason = ''
    },

    deleteLotItem(){
      this.number++;  
      if (this.delete_reason == '' || this.delete_reason == undefined)  {
        this.$toast.error('Please Select Valid Reason to Delete')
        this.number--;
        return
      }
      if(this.delete_remark == ''){
        this.$toast.error('Please Provide Remarks to Delete')
        this.number--;
        return
      }

      if ((this.active_tab == 'Pending Publish') && (this.new_lot_name == '' || this.new_lot_name == undefined) ){
        this.$toast.error('Please Provide New Lot Name')
        this.number--;
        return 
      }

      const formData = new FormData();
      formData.append('reason', this.delete_reason)

      if (this.active_tab == 'Pending Publish'){
        formData.append('new_lot_name', this.new_lot_name)
      }

      if (this.delete_remark != ''){
        formData.append('remark', this.delete_remark)
      }
      for (var i = 0; i < this.selected.length; i++) {
        let tag = this.selected[i].tag_number;
        formData.append("tag_numbers[]", tag);
      }
      formData.append('id', this.selected[0].liquidation_order_id)
      this.loading = true;
      this.$http.secured
        .post("api/v1/warehouse/liquidations/remove_excess_items_before_dispatch", formData)
        .then(response => {
          if (response.data) {
            this.deleteItemPopup = false
            if (this.new_lot_name) {
              this.closePopup()
              this.LotInventoryDialog = false
              this.ContractLotInventoryDialog = false
            }
            this.showAlert("success", 'Item Deleted Successfully');
            this.getLotStatusData()
            this.loading = false;
            this.selected = []
            this.delete_reason = ''
            this.delete_remark = ""
            this.new_lot_name = ""
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
            this.number--;
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
          this.$store.state.alert_type = '';
          this.$store.state.alert_message = '';
      }, 3000);
    },

    update_lot_btn() {
      this.number=0;
      if (this.selected.length) {

        var label = this.selected.map(x =>  x.brand_type)

        label = label.filter(function( element ) {
          return element !== undefined;
        });

        // if (label.includes('NON OL')) {
        //   this.selected = []
        //   this.showAlert("error", "Please Select only Own Label Items to Move to Liquidations");
        //   return
        // }

        var dc = this.selected.map(x =>  x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function( element ) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        if (unique_array.length > 1) {
          this.selected = []
          this.showAlert("error", "Select only One Distribution Center Items");
          return
        }

        var brand_values_arr = this.selected.map(x =>  x.brand_type)
        var unique_values = brand_values_arr.filter(unique)
        if (unique_values.length > 1) {
          this.selected = []
          this.showAlert("error", "You cannot liquidate OL and NON OL items together");
          return
        }

        this.lot_confirm_dialog_title = 'Are you sure want to send selected items to lot creation.';
        // this.lot_confirm_dialog_title_2 = ' Do you want to proceed?';
        this.lotConfirmDialog = true;
      } else {
        this.showAlert("error","Please select Inventories");
      }
    },

    update_liquidation_btn() {
      this.number = 0;
      if (this.selected.length) {
        this.liquidationConfirmDialog = true;
      } else {
        this.showAlert("error","Please select Inventories");
      }
    },

    regrade_btn() {
        if (this.selected.length) {


            var label = this.selected.map(x =>  x.brand_type)

            label = label.filter(function( element ) {
              return element !== undefined;
            });

            if (label.includes('OL')) {
              this.selected = []
              this.showAlert("error", "Please Select only Non Own Label Items to Move to Regrade");
              return
            }

            var dc = this.selected.map(x =>  x.distribution_center_id)
            const unique = (value, index, self) => {
              return self.indexOf(value) === index
            }
            dc = dc.filter(function( element ) {
              return element !== undefined;
            });

            var unique_array = dc.filter(unique)
            if (unique_array.length > 1) {
              this.selected = []
              this.showAlert("error", "Select only One Distribution Center Items");
              return
            }
            this.regrade_confirm_dialog_title = this.selected.length + ' Items selected for regrade.';
            this.regrade_confirm_dialog_title_2 = ' Do you want to proceed?';
            this.regradeConfirmDialog = true;
        } else {
            this.showAlert(
                "error",
                "Please select Inventories"
            );
        }
    },
    closePopup() {
      this.lot_name = "";
      this.lot_desc = "";
      this.lot_mrp = "";
      this.lot_expected_price = "";
      this.end_date = "";
      this.vendor_code = "";
      this.ip_selected = [];
      this.time2 = "";
      this.selected = [];
      this.winner_code = "";
      this.winner_amount = "";
      this.payment_status = "";
      this.amount_received = "";
      this.dispatch_status = "";
      this.lot_images_count = 0;
      this.deleteBeamLotConfirmDialog = "";
      this.regradeConfirmDialog = false;
      this.lotConfirmDialog = false;
      this.liquidationConfirmDialog = false;
      this.createLotDialog = false;
      this.LotDetailsDialog = false;
      this.deleteLotConfirmDialog = false;
      this.LotInventoryDialog = false;
      this.publishLotConfirmDialog = false;
      this.extendTimeDialog = false;
      this.extendTimeConfirmDialog = false;
      this.re_publishDialog = false;
      this.dialog = false;
      this.imageDailog = false;
      this.winner_user = '';
      this.winner_payment_status = '';
      this.manual_winner_amount = 0;
      this.winner_amount_received = 0;
      this.selected_lot_bid_details = [];
      this.selectedforLot = [] ;
      this.winner_remarks = '';
      this.winner_billing_to = '';
      this.winner_billing_to_name = '';
      this.lot_images = "";
      this.checkedImages = [];
      this.delete_remark = ''
      this.inventoryDownloadDialog = false;
      this.Emaildialog = false;
      this.selected_Extend_Time_Error = ""
    },
    onlyNumber ($event) {
       //console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
       if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
          $event.preventDefault();
       }
    },
    movingLotCreation() { 
      this.number++;
      var ids = this.selected.map(s => s.id)
      this.$http.secured
          .post("/api/v1/warehouse/liquidations/moving_lot_creation", { selected_inventories: ids })
          .then(response => {
              if (response.data) {
                  this.showAlert("success", "Selected Items Sent for Lot Creation");
                  this.lotConfirmDialog = false
                  this.selected = [];
                  this.getRTVOperationalData(this.active_tab)
                  return
                  

              } else {
                  this.loading = false;
                  this.showAlert("error", "No Data Found");
                  this.lotConfirmDialog = false
                  this.selected = [];
              }
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
              this.lotConfirmDialog = false
          });
          
    },
    movingToPendingLiquidation(){
      this.number++;
      var ids = this.selected.map(s => s.id)
      this.$http.secured
          .post("/api/v1/warehouse/liquidations/move_to_pending_liquidation", { liquidation_ids: ids })
          .then(response => {
              if (response.data) {
                  this.showAlert("success", "Selected Items Sent to Pending Liquidation");
                  this.liquidationConfirmDialog = false
                  this.selected = [];
                  this.search = ''
                  this.field_type = ''
                  this.displayRequestDetail = false
                  this.getRTVOperationalData(this.active_tab)
                  this.getRequestIdData()
                  return

              } else {
                  this.loading = false;
                  this.showAlert("error", "No Data Found");
                  this.liquidationConfirmDialog = false
                  this.selected = [];
              }
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
              this.liquidationConfirmDialog = false
          });
    },
    sendRegrade() {
      this.$http.secured
          .post("/api/v1/warehouse/liquidations/regrade_inventories", { selected_inventories: this.selected })
          .then(response => {
              if (response.data) {
                  this.regradeConfirmDialog = false
                  this.showAlert("success", "Item Sent for regrade");
                  this.selected = [];
                  this.getRTVOperationalData(this.active_tab)
              } else {
                  this.loading = false;
                  this.showAlert("error", "No Data Found");
                  this.regradeConfirmDialog = false
              }
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
              this.regradeConfirmDialog = false
          });
    },
    setUploadingFile() {
      this.file = this.$refs.inputFile.files[0]
      const formData = new FormData();
      formData.append('file', this.$refs.inputFile.files[0]);

      this.$http.secured.post('/admin/liquidation_file_uploads', formData)
          .then(response => {
              this.showAlert("success", "Liquidation File Imported Successfully");

          })
          .catch(error => this.$toast.error('Error in importing Attribute Master file'))
    },
    upload_btn() {document.getElementById("fileUpload").click();
    },
    loadData(tab) {
        this.selected = [];
        this.active_tab = tab;
        this.search = "";
        this.manual_creation = '';
        this.displayRequestDetail = false
        this.selected_request = ''
        this.page =  1
        this.totalPages =  1
        this.pageSize = 100 
        if (tab == 'Pending RFQ'){
          this.field_item = [{name: 'Request Id', value: "request_number"}, {name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}, {name: 'Brand', value: "brand"}]
        }else if (tab == 'Pending Liquidation'){
          this.field_item = [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}, {name: 'Brand', value: "brand"}]
        }

        if (tab == 'Pending Publish' || tab == 'In Progress'){
          this.pending_decision_tabs = ["Inventory List", "Lot Details"]
          this.LotInventorytTabData =["Inventory List","Lot Details"]
          this.ContractLotInventorytTabData = ["Inventory List","Lot Details"]       
        }else{
          this.pending_decision_tabs = ["Inventory List", "Bid Details", "Lot Details", "Settlement Details"]
          this.LotInventorytTabData =["Inventory List","Lot Details", "Bid Details", "Settlement Details", "Emailed Vendors List"]
          this.ContractLotInventorytTabData = [ "Inventory List", "Lot Details", "Settlement Details"]
        }

        if (this.active_tab == 'In Progress' || this.active_tab == 'Pending Publish' || this.active_tab == 'Decision Pending' || this.active_tab == 'Dispatch'){
          this.getLotStatusData();
        }else {
          this.getRTVOperationalData(tab);
          if (tab == 'Pending RFQ'){
            this.getRequestIdData()
          }
        }
    },

    pageData(data){            
      var page  = parseInt(window.location.hash.replace('#', ''), 10) || 1,
      limit = 10,
      row   = (page - 1) * limit,
      count = page * limit,
      part  = [];

      for (;row < count;row++) {
      part.push(data[row]);
      }
      return part;  
    },
    get_vendor_liquidation() {
      this.$http.secured.get("/api/v1/warehouse/liquidations/get_vendor_liquidation")
        .then(response => {
            this.vendor_code_menu_items = response.data.vendor_masters
            this.loading = false;
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
    },
    get_winner_code(id) {
      const formData = new FormData();
      formData.append("id", id)
      if (this.lot_type == "Email Lot") {
      this.$http.secured.post("/api/v1/warehouse/liquidation_orders/winner_code_list",formData)
        .then(response => {
            if (response.data) {
                this.winner_code_list =  response.data;
            } 
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
      }
    },
    //Auto populate fields for liquidation - decision pending - emailLot
    autoFillFields(){
      this.$http.secured.get("/api/v1/warehouse/liquidations/get_quotations", {params: {lot_id: this.selected_lot_id}})
      .then(response => {
        if (response.data) {
          this.quotation_records = response.data.quotations
          let result=this.quotation_records.reduce(function (result, item){
            if(!result || result.expected_price<item.expected_price)
            return item 
            else{
              return result
            }
          },null)
          this.winner_amount = result.expected_price;
          this.winner_code = result.vendor_code;
          this.current_lot = this.descision_pending_items.filter((x) => x.id == this.selected_lot_id)[0]
        } else {
          this.$toast.error("No Quotation Found");
        }
      })
    },
    openquotationlist(){
      this.$http.secured.get("/api/v1/warehouse/liquidations/get_quotations", {params: {lot_id: this.selected_lot_id}})
      .then(response => {
        if (response.data) {
          this.quotation_records = response.data.quotations
          this.current_lot = this.descision_pending_items.filter((x) => x.id == this.selected_lot_id)[0]
          this.quotationlistmodel = true
        } else {
          this.$toast.error("No Quotation Found");
        }
      })
    },
    selectQuotation(item){
      if (this.winner_code == ''){
        this.isnewQuotation = true
      }else{
        this.isnewQuotation = false
      }
      this.selected_quotation = item
      this.winner_amount = item.expected_price
      this.winner_code = item.vendor_code
      this.current_lot = {}
      this.quotationlistmodel = false
    },
    openVendorListModal(item){
      this.vendor_search_field_type = '';
      this.search_vendor = '';
      this.get_vendor_liquidation();
      this.number=0;
      if (item){
        this.selected.push(item)
      }
      if (this.selected.length <= 0){
        this.$toast.error("Please Select Lots")
        return
      }

      if (this.checkUniq(this.selected, 'Email Lot')){
        return
      }

      var expired_lots = this.selected.filter((x) => x.is_expired)

      if (expired_lots.length > 0){
        this.$toast.error("Please Select Only Active Lots")
        return 
      }

      this.Emaildialog = true
    },
    // ============== Republish ===========
     openRePublishDialog(item){
        // if (item.inventory_deleted){
        //  this.showAlert('error', 'Inventory is deleted in this lot. You can not republish these lots')
        //  return
        // }
        this.selectedLotForRepublish = item
        this.$store.commit("setSelectedLot", { lot: this.selectedLotForRepublish, action: 'republish_lot'});
        this.$router.push({ name: "ImagesList"});
      },
    // ============== Edit Email Lot ===========
      openEmailLotEditDialog(item){
        this.$store.commit("setSelectedLot", { lot:  item , action: 'edit_email_lot'});
        this.$router.push({ name: "ImagesList"});
      },
      // ============== Edit Contract Lot ============	
      openContractLotEditDialog(item){	
        this.$store.commit("setSelectedLot", { lot:  item , action: 'edit_contract_lot'});	
         // this.$router.push({ name: "ImagesList"}); 	
         this.ContractlotEditDialog = true; 	
        this.lot_id        = item.id  	
        this.removedUrls   = [];  	
        this.setLotParams(item);  	
        this.setLotimages(item.id); 	
      },  	
      closeContractLotEditDialog(){ 	
        this.ContractlotEditDialog = false; 	
        this.lot_id = null; 	
        this.$refs.ContractlotEditForm.reset(); 	
      },  	
      updateEmailLotDetails(){  	
        var  start_ltime = this.dateformat(this.start_date + " " + this.time7)  	
        var  end_ltime   = this.dateformat(this.end_date + " " + this.time8)  	
        if (this.$refs.lotEditForm.validate()) {  	
          if(end_ltime <= start_ltime){ 	
            this.showAlert('error', "Invalid Date / Time ..!!");  	
          }else{  	
          const formData = new FormData();  	
          formData.append("liquidation_order[lot_description]", this.lot_description) 	
          formData.append("liquidation_order[start_date]", (this.start_date + " " + this.time7))  	
          formData.append("liquidation_order[end_date]", (this.end_date + " " + this.time8))  	
          formData.append("liquidation_order[contracted_value]", this.order_amount) 	
          formData.append("liquidation_order[lot_id]", this.lot_id) 	
          for (let file of this.files) {  	
            formData.append("lot[images][]", file, file.name);  	
          } 	
          formData.append("lot[image_urls]", JSON.stringify(this.checkedImages))  	
          formData.append("lot[removed_urls]", JSON.stringify(this.removedUrls))  	
          this.isLoading = true;  	
          this.$http.secured  	
            .put("api/v1/warehouse/inventory_file_uploads/"+this.lot_id, formData,{ headers: { 'Content-Type': 'multipart/form-data'}}) 	
            .then(response => { 	
              if (response) { 	
                   
                this.$router.push({ name: "LotCreation"});  	
                this.showAlert("success", "Lot updated successfully!"); 	
                this.ContractlotEditDialog = false; 	
              } else {  	
                this.showAlert('error', "No Data Found"); 	
                this.closeLotEditDialog();  	
              }             	
            })  	
            .catch(error => { 	
              if(error.response.status == 500){ 	
                this.showAlert('error', "Something went wrong from Network" + error); 	
              }else{  	
                this.showAlert('error', error.response.data.message || "Something went wrong"); 	
              } 	
              this.isLoading                = false;  	
          }); 	
        }}	
      },
    // ============== Edit Lot ===========
      openLotEditDialog(item){
        this.$store.commit("setSelectedLot", { lot:  item , action: 'edit_lot'});
        this.$router.push({ name: "ImagesList"});
        // this.lot_id        = item.id
        // this.lotEditDialog = true
        // this.removedUrls   = [];
        // this.checkedImages = [];
        // this.setLotParams(item);
        // this.setLotimages(item.id);
        // this.get_lot_images(item.id);
      },
      closeLotEditDialog(){
        this.lotEditDialog = false
        this.lot_id        = null
        this.$refs.lotEditForm.reset();
      },
      setLotimages(lot_id){
        this.$http.secured
        .get("api/v1/warehouse/inventory_file_uploads/get_edit_lot_images?id="+lot_id)
        .then(response => {
          if(response.data) {
            this.cards = response.data.lot_images
            for(var i=0; i< response.data.inv_images.length;i++){
              this.selected_inventory_images.push({url: response.data.inv_images[i], checked: false})
            }
          }                
        })
        .catch(error => {
          this.showAlert('error', "Something went wrong from Network" + error);
        });
      },
      setLotParams(item){
        this.lot_name        = item.lot_name
        this.lot_description = item.lot_desc
        this.lot_mrp         = item.mrp
        this.buy_now_price   = item.buy_now_price
        this.floor_price     = item.floor_price
        this.reserve_price   = item.reserve_price
        this.increment_slab  = item.increment_slab
        this.start_date      = this.dateForCalander(item.start_date,'date')
        this.end_date        = this.dateForCalander(item.end_date, 'date')
        this.time7           = this.dateForCalander(item.start_date,'time')
        this.time8           = this.dateForCalander(item.end_date,'time')
      },
      dateForCalander(date_str, type){
        //input    =  5/02/2021 08:32 AM
        // date op = '2021-02-05'
        // time op = 08:32
        if(date_str == null || date_str == '' || date_str == undefined){
          date_str = this.todaysDate();
        }
        var output = '';
        if('date' == type){
          var arr = date_str.substr(0,10).split('/');
          output  = arr[2]+'-'+arr[1]+'-'+arr[0]
        }else{
          output  = date_str.substr(11,8).split(' ')[0]
        }
        return output
      },
      updateLotDetails(){
        var  start_ltime = this.dateformat(this.start_date + " " + this.time7)
        var  end_ltime   = this.dateformat(this.end_date + " " + this.time8)
        if (this.$refs.lotEditForm.validate()) {
          if(end_ltime <= start_ltime){
            this.showAlert('error', "Invalid Date / Time ..!!");
          }else{
          const formData = new FormData();
          formData.append("liquidation_order[lot_description]", this.lot_description)
          formData.append("liquidation_order[buy_now_price]", this.buy_now_price)
          formData.append("liquidation_order[floor_price]", this.floor_price)
          formData.append("liquidation_order[reserve_price]", this.reserve_price)
          formData.append("liquidation_order[increment_slab]", this.increment_slab)
          formData.append("liquidation_order[start_date]", (this.start_date + " " + this.time7))
          formData.append("liquidation_order[end_date]", (this.end_date + " " + this.time8))
          formData.append("liquidation_order[lot_id]", this.lot_id)
          
          for (let file of this.files) {
            formData.append("lot[images][]", file, file.name);
          }
          
          formData.append("lot[image_urls]", JSON.stringify(this.checkedImages))
          formData.append("lot[removed_urls]", JSON.stringify(this.removedUrls))

          this.isLoading = true;
          this.$http.secured
            .put("api/v1/warehouse/inventory_file_uploads/"+this.lot_id, formData,{ headers: { 'Content-Type': 'multipart/form-data'}})
            .then(response => {
              if (response) {
                this.showAlert("success", "Lot updated successfully!");
                this.closeLotEditDialog();
                this.isLoading              = false;
                this.loadData('Pending Publish');
              } else {
                this.showAlert('error', "No Data Found");
                this.isLoading                = false;
                this.closeLotEditDialog();
              }            
            })
            .catch(error => {
              if(error.response.status == 500){
                this.showAlert('error', "Something went wrong from Network" + error);
              }else{
                this.showAlert('error', error.response.data.message || "Something went wrong");
              }
              this.isLoading                = false;
          });
        }}
      },

    getDisposition(){
      this.$http.secured.get("/api/v1/warehouse/liquidations/get_dispositions")
        .then(response => {
          if (response.data) {
            this.disposition = response.data.dispositions
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        })
    },

    changeDispositionItems(selected_item) { 
      this.selectedDisposition = selected_item;
      var selected_disposition = this.disposition.filter(x => x.id == (selected_item) )
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
              value: 'tag_number'
            },
            { text: "Article Description", value: "item_description" },
            {text: "Class Description", value: "item_type"}
          ]
          this.dspRepairDialog = true;
      } else {
        this.showAlert("warning", "Please select the Inv. for operations");
      }
    },
    closeSetDisposition(){
      this.dspRepairDialog = false;
      this.files = [];
      this.dispositionRemarks = '';
      this.dialog_title = "";
      this.selectedDisposition = '';
    },
    setDisposition() {
      if(this.dispositionRemarks == '' ){
         this.$toast.error('Please enter remarks')
        this.dispositionRemarks = ''
        return
      }

      this.loading = true;

      const formData = new FormData();
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("liquidation_ids[]", this.selected[i].id);
      }

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }

      formData.append("desposition_remarks", this.dispositionRemarks);
      formData.append("disposition", this.selectedDisposition);

      this.$http.secured
        .put("/api/v1/warehouse/liquidations/set_disposition", formData)
        .then(response => {
          if (response.data) {
            this.selected = [];
            this.closeSetDisposition();
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

    searchItem(){
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      if (this.field_type == ''){
        this.showAlert("error", "Please Select Field to search in");
        return
      }

      var status = this.getStatus(this.active_tab)

      const formData = new FormData();
      if (this.field_type == 'request_number'){
        var search = this.search.split(',')
        search = search.map(x => x.replace(/ /g,''))
        this.selected_request = this.liquidation_requests.filter(x => search.includes(x.request_id))
        if (this.selected_request.length > 0){
          this.total_items = this.selected_request.reduce((accumulator, object) => {return accumulator + object.total_items;},0)
          this.graded_items = this.selected_request.reduce((accumulator, object) => {return accumulator + object.graded_items;},0)
          this.pending_grade_items = this.selected_request.reduce((accumulator, object) => {return accumulator + object.remaining_count;},0)
          this.selected_request = this.selected_request[0]
          this.displayRequestDetail = true
        }else {
          this.displayRequestDetail = false
        }
      }

      formData.append('search', this.search)
      formData.append('search_in', this.field_type)
      formData.append('status', status)
      formData.append('page', 1)
      formData.append('per_page', 500)


      if (this.search.length != 0){
        this.$http.secured.post('/api/v1/warehouse/liquidations/search_item', formData)
        .then(response => {
          if (response.data) {
            // this.dynamicColumns = Object.keys(response.data.liquidations[0])
            this.table_data = response.data.liquidations.filter(
                x => x.status == status)
            this.pending_lot_creation = response.data.liquidations.filter(
                x => x.status == status || x.status == 'Pending Liquidation Regrade' || x.status == 'Pending RFQ')
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
        this.displayRequestDetail = false
        this.selected_request = ''
        this.getRTVOperationalData(this.active_tab)
      }

    },

    searchVendor(){
      if (this.vendor_search_field_type == ''){
        this.showAlert("error", "Please Select Field to search in");
        return
      }
      const formData = new FormData();

      formData.append('search', this.search_vendor)
      formData.append('search_in', this.vendor_search_field_type)


      if (this.search_vendor.length != 0){
        this.$http.secured.post('/api/v1/warehouse/liquidations/search_vendor', formData)
        .then(response => {
            this.vendor_code_menu_items = response.data.vendor_masters
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
      }else {
        this.vendor_search_field_type = ''
        this.search_vendor = ''
        this.get_vendor_liquidation()
      }

    },

    openRequestIdpopup(){
      this.requistIdPopup = true
    },

    getColor(item){
      return item.color + '--text'
    },

    sendEmailToVendor(){
      this.number++;
      if (this.selected_vendors.length <= 0 ){
        this.$toast.error("Please Select Vendors")
        returnisDisabled = true;
        this.loading= true;
        
      }
      
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );


      const formData = new FormData();

      var ids = this.selected.map(x => x.id)

      ids = ids.filter(function( element ) {
        return element !== undefined;
      });

      for (var i = 0; i < ids.length; i++) {
          formData.append("liquidation_order_ids[]", ids[i]);
      }

      for (var i = 0; i < this.selected_vendors.length; i++) {
          formData.append("vendor_codes[]", this.selected_vendors[i].vendor_code);
      }

      formData.append("page", params['page']);
      formData.append("per_page", params['size']);

      this.$http.secured.post("/api/v1/warehouse/liquidation_orders/send_email_to_vendors", formData)
        .then(response => {
          if (response.data.liquidation_orders) {
            this.getLotStatusData()
            this.Emaildialog = false
            this.selected = []
            this.selected_vendors = []
            this.totalPages =  response.data.meta.total_pages
            this.showAlert("success", "Successfully Sent Email to Vendors");
          }
        })
        .catch(error => {
            this.showAlert("error", error.response.data.errors);
            this.loading = false;
        });

    },

    format_date(value){
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY hh:mm::ss A')
      }
    },
    openContractDispatchModel(item){	
      this.number = 0;	
       this.contract_lot_id = item.id;	
        // if (this.selected.length <= 0) {	
        //   this.showAlert('warning', 'Please Select Vendor First')	
        //   return	
        // }	
        
        const formData = new FormData();	
        formData.append("id", item.id)	
        this.contractDispatchDialog = true;	
        this.vendor_code = '';	
        this.contracted_value = '';	
        this.loading = true;	
      this.$http.secured	
        .get("/api/v1/warehouse/liquidations/get_vendor_contract")	
        .then((response) => {	
          if (response) {	
            this.table_data_dispatch = response.data.vendor_masters 	
            this.loading = false;	
          } else {	
            this.showAlert("error", "No Data Found");	
            this.loading = false;	
          }	
        })	
        .catch((error) => {	
          this.showAlert("error", "Something went wrong from Network" + error);	
          this.loading = false;	
        });	
        this.$http.secured.post('/api/v1/warehouse/liquidation_orders/lot_inventory',formData)	
                    .then(response => {	
                        this.table_data_contract = response.data.liquidations	
                    })	
                    .catch(error => this.$toast.error('Error1 in fetching Liquidation Data'))	
      },	
      contractDispatchItems(){	
        this.number++;	
        if (this.vendor_code == '' || this.vendor_code == undefined) {	
          this.showAlert("error", "Please provide Vendor Code");	
          this.number = 0;	
          return	
        }	
        const formData = new FormData();	
        // for (var i = 0; i < this.selected.length; i++) {	
        //   formData.append("vendor_return_ids[]", this.selected[i].id);	
        // }	
        formData.append("vendor_code", this.vendor_code)	
        formData.append("liquidation_order_id", this.contract_lot_id)	
        this.is_disabled = true	
        this.$http.secured.post("api/v1/warehouse/liquidation_orders/approve_contract_lot", formData)	
          .then(response => {	
            if (response.data) {	
              this.contractDispatchDialog = false	
              this.vendor_code = ''	
              this.selected = []	
              this.orderConfirmDialog = true	
              this.order_number = response.data.order_number	
              this.is_disabled = false	
              this.lot_name = ''	
              this.showAlert("success", "Successfully Published");	
               
            } else {	
              this.showAlert("error", "No Data Found");	
            }	
          }).catch(error => {	
            this.showAlert("error", "Please update rate card.");	
            this.loading = false;	
            this.number = 0;	
          });	
      },  	
      getContractValue(){	
        const formData = new FormData();	
        formData.append("vendor_code", this.vendor_code)	
        formData.append("liquidation_order_id", this.contract_lot_id)	
      this.$http.secured	
          .get("/api/v1/warehouse/liquidation_orders/get_contracted_price",	
          {params:{	
              vendor_code: this.vendor_code,	
              liquidation_order_id: this.contract_lot_id	
            }	
          }) 	
          .then(response => {	
              if (response.data) {	
                this.contracted_value = response.data.contracted_price;	
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

  }
  }
  </script>

  <style>
  .v-card__subtitle, .v-card__text, .v-card__title {
  padding: 5px;
  }

  .layout.wrap {
  padding-right: 80px;
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

  .fa-pencil:before {
    content: "\F040" !important;
    font-family: FontAwesome !important;
    font-weight: 100;
  }

  .col_header {
    text-align: left !important;
  }
  .down_load{
    color: #0357D0;
    font-weight: 500;
    font-size: 14px;
  }
  .v-data-table-header{
    white-space: nowrap;
  }
  .lq_custom_title{
    padding-left:0px !important;
  }
  .label-custom  .v-label{
    margin-bottom:0px !important;
  }
  .lot_inventory_dialog_btn{
    padding-left:10px;
  }
  .lot_inv_pop_title{
    color:#FFFFFF !important;
  }
  .lot_inventory_dialog_btn1{
    padding-left:52px;
  }
  .v-card{
    margin-top:0px !important;
    max-width: 100% !important;
  }
  .selectedTimeErrMessage{
    color: red ;
    position: absolute;
    top: 75px ;
  }
  @media (max-width: 1024px){
    .lq_custom_title .d-flex{
      position: absolute !important;
      top:210px !important;
      right:0 !important;
    }
    .lq_custom_title .search{
      width:200px !important ;
    }
  }
  </style>
