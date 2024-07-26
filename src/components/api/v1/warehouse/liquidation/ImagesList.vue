<template>     
  <div>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
      <template>
        <div>
          <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>
        <div class="vld-parent">
          <loading :active.sync="isLoading" color="#007bff" :z-index="9999" :width="110" :height="110" :isFullPage="true"></loading>
        </div>
      </template>
      <!-- ADD email vendor popup -->
    <v-row justify="center">
        <v-dialog v-model="Emaildialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="v-card-100">
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Email Vendors</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" @click="addVendorInList" :disabled= "!this.selected_vendors_email.length > 0" small >ADD VENDORS</v-btn>
              <v-btn icon dark @click="closeEmailVendorPopup"><v-icon>mdi-close</v-icon></v-btn>
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
                  Selected {{this.selected_vendors_email.length}}
                </v-chip>
              </v-col>
            </v-row>
             <v-data-table 
              :dense="true"   
              :headers="vendor_headers"
              :items="vendor_code_menu_items"
              v-model="selected_vendors_email"
              class="elevation-1" 
              show-select
              :loading="loading" 
              loading-text="Loading Data... Please wait">
            </v-data-table>
        </v-card>
        </v-card>
         </v-dialog>
      </v-row>        

      <!-- create Lot -->
      <v-row justify="center">
        <v-dialog v-model="createBeamLotDialog" persistent max-width="1000px">
          <v-form ref="createBeamLotForm">
            <v-card class="v-card-100">
              <v-card-title class="pl-4">
                <span>B2B - Online Auction</span>
              </v-card-title>
              <v-container>

                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules"  label="Lot Name" hint="Standard Lot Name structure: Category||Brand||City||Enddate" persistent-hint outlined v-model="lot_name" type="text" style="font-weight: bold;"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules"  label="Lot Description" outlined v-model="lot_desc" type="text">
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="mrp_rule"  label="MRP (₹)" outlined v-model="lot_mrp" type="number" :min="0">
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="buy_now_rule" label="Buy Now(₹)" outlined v-model="buy_now_price" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiBuyNowPr>0" class="aiRecommended">AI Recommemnded Price : {{ aiBuyNowPr }}</div>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="res_price_rule"  label="Reserve Price(₹)" outlined v-model="reserve_price" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiReservePr>0" class="aiRecommended">AI Recommemnded Price : {{  aiReservePr }}</div>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="floor_price_rule"  label="Floor Price(₹)" outlined v-model="floor_price" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiFloorPr>0" class="aiRecommended">AI Recommemnded Price : {{ aiFloorPr }}</div>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="inc_slab_rule"  label="Increment Slab(₹)" outlined v-model="increment_slab" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
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
                          :rules="inputRules">
                        </v-text-field>
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
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                      :rules="inputRules">
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
                        ampm-in-title
                        v-if="menu_1"
                        v-model="time2"
                        :allowed-minutes="allowedStep"
                        full-width
                        @click:minute="$refs.menu1.save(time2)">
                      </v-time-picker>
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
                      min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time1"
                          label="End Time"
                          prepend-inner-icon="mdi-clock-time-four-outline"
                          outlined
                          v-bind="attrs"
                          v-on="on"
                          :rules="inputRules">
                        </v-text-field>
                      </template>
                      <v-time-picker
                        ampm-in-title
                        v-if="menu_2"
                        v-model="time1"
                        :allowed-minutes="allowedStep"
                        full-width
                        @click:minute="$refs.menu_2.save(time1)">
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12" >
                    <div class="field image-box" align="left">
                      <v-file-input small-chips
                        outlined 
                        @change="file_change"
                        multiple
                        v-model="files"
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        placeholder="Attach Images"
                        label="Image Attacment"> 
                        </v-file-input>
                        <div class="files"></div>
                        <span v-if="!files || files.length === 0" class="error-message">{{ errorMessageImage }}</span>
                    </div>
                  </v-col>
                </v-row>
                <div class="attach-img-box">   
                  <v-card-actions class="pl-4">
                    <v-btn  color="primary" @click="closeCreateBeamLotDialog">{{ this.checkedImages.length }} IMAGES ATTACHED</v-btn>
                  </v-card-actions>
                </div>
              </v-container>
              <v-row>
                  <img src="@/assets/images/icons/AI-price-logo.png" class="img-fluid pl-8 pt-4"/>
              </v-row>
              <v-card-actions class="mt-5">
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="closeCreateLotDialog">Cancel</v-btn>
                <v-btn small color="primary" @click="sendBeamLotCreationFn" :disabled="number > 0 || !lot_name || !lot_desc || !lot_mrp || !buy_now_price || !reserve_price || !floor_price || !increment_slab || !start_date || !end_date || !time2 || !time1">Confirm</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
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
                                 readonly v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>                      </template>
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
                              v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>                      </template>
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="end_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu_15 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu_15.save(end_date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_3" v-model="menu_3" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
                           transition="scale-transition" offset-y max-width="290px" min-width="290px" :rules="inputRules">                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time3" label="Start Time" prepend-inner-icon="mdi-clock-time-four-outline" readonly
                            outlined v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>                      </template>
                      <v-time-picker v-if="menu_3" v-model="time3" :allowed-minutes="allowedStep"  full-width
                        @click:minute="$refs.menu_3.save(time3)"></v-time-picker>
                    </v-menu>
                  </v-col>
              
              
                  <v-col cols="12" sm="4" md="6">
                    <v-menu ref="menu_4" v-model="menu_4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
                      transition="scale-transition" offset-y max-width="290px" min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time4" label="End Time" prepend-inner-icon="mdi-clock-time-four-outline" readonly
                                  outlined v-bind="attrs" v-on="on" :rules="inputRules"></v-text-field>                      </template>
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
              
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Expected Price" :rules="mrp_rule" outlined v-model="lot_expected_price" :min="0"
                      type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-btn  color="primary" @click="openEmailDialog">ADD EMAIL VENDORS</v-btn>
                    <div v-if="selected_vendors_email.length > 0">
                    <div class="selected_rule_box">
                      <span class="selected-item">
                        {{ selected_vendors_email.length }} Vendors Added
                      </span>
                    </div>
                  </div>
                  <div v-else>
                <span v-if="selected_vendors_email === null || selected_vendors_email.length === 0" class="error-message">{{errorMessage}}</span>
              </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

          <v-card-title>
            <span>Image Attachment : {{ this.checkedImages.length }}</span>
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
              <span v-if="!files || files.length === 0" class="error-message">{{ errorMessageImage }}</span>
            </v-row>
          </v-card-actions>

          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small text color="normal" @click="close_b2b_email  ">Cancel</v-btn>
              <v-btn small color="primary" :disabled="isdiasbled"  @click.prevent="sendLotCreationFn" >Confirm</v-btn>
          </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    
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
                    <v-text-field :rules="buy_now_rule"  label="Buy Now(₹)" outlined  v-model="buy_now_price" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiBuyNowPr > 0" class="aiRecommended">AI Recommemnded Price : {{ aiBuyNowPr }}</div>
                  </v-col>

                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="floor_price_rule"  label="Floor Price(₹)" outlined v-model="floor_price" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiFloorPr > 0" class="aiRecommended">AI Recommemnded Price : {{ aiFloorPr }}</div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="res_price_rule"  label="Reserve Price(₹)" outlined v-model="reserve_price" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiReservePr > 0" class="aiRecommended">AI Recommemnded Price : {{ aiReservePr }}</div>
                  </v-col>
                
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field :rules="inc_slab_rule"  label="Increment Slab(₹)" outlined v-model="increment_slab" type="number" :min="0" style="margin-bottom: -10px;"></v-text-field>
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
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable>
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
                          :rules="[...inputRules, startTimeRule]"
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
                        full-width
                        :allowed-minutes="allowedStep"
                        @click:minute="$refs.menu_19.save(time8)">
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12" >
                    <div class="field image-box" align="left">
                      <v-file-input small-chips
                        outlined 
                        @change="file_change"
                        multiple
                        v-model="files"
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        placeholder="Attach Images"
                        label="Image Attacment"> 
                        </v-file-input>
                        <div class="files"></div>
                        <span v-if="!files || files.length === 0" class="error-message">{{ errorMessageImage }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-container v-if="this.cards.length > 0" fluid class="attach-img-box">
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
                 <div class="attach-img-box">   
                  <v-card-actions class="pl-4">
                    <v-btn  color="primary" @click="closeLotEditDialog">{{ this.checkedImages.length }} IMAGES ATTACHED</v-btn>
                  </v-card-actions>
                </div>
              </v-container>
              <v-row>
                  <img src="@/assets/images/icons/AI-price-logo.png" class="img-fluid pl-8 pt-4"/>
              </v-row>
              <v-card-actions class="mt-5">
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="closeLotEditDialog">Cancel</v-btn>
                <v-btn small color="primary" @click="updateLotDetails">Save</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>


      <!-- Edit Email Lot-->
      <v-row justify="center">
        <v-dialog v-model="EmaillotEditDialog" persistent max-width="1000px">
          <v-form ref="lotEditForm">
            <v-card class="v-card-100">
              <v-card-title class="pl-4">
                <span>Edit Email Lot</span>
                <!-- <span><v-btn icon class="icon-right" @click="closeEmailLotEditDialog"><v-icon>mdi-close</v-icon></v-btn></span> -->
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
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="start_date" no-title scrollable>
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
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Expected Price" outlined v-model="order_amount" :min="0" type="number"></v-text-field>
                  </v-col>
                  <!--                   <v-col cols="12" sm="4" md="6">
                    <v-autocomplete hide-details :items="vendors_list" item-text="vendor_code_name" item-value="vendor_code" v-model="selected_vendors" color="primary" placeholder="Select Vendors" outlined multiple prepend-icon="mdi-magnify"></v-autocomplete>
                  </v-col> -->
                  <v-col cols="12" sm="4" md="6">
                    <v-btn  color="primary" @click="openEmailDialog">ADD EMAIL VENDORS</v-btn>
                    <div v-if="vendor_code_list.length > 0">
                    <div class="selected_rule_box">
                      <span class="selected-item">
                        {{ selected_vendors_email.length }} Vendors Added
                      </span>
                    </div>
                  </div>
                  <div v-else>
                <span v-if="selected_vendors_email === null || selected_vendors_email.length === 0" class="error-message">{{errorMessage}}</span>
              </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="12" >
                    <div class="field image-box" align="left">
                      <v-file-input small-chips
                        outlined 
                        @change="file_change"
                        multiple
                        v-model="files"
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        placeholder="Attach Images"
                        label="Image Attacment"
                        :rules="[requiredFile]"> 
                        </v-file-input>
                        <div class="files"></div>
                        <span v-if="!files || files.length === 0" class="error-message">{{ errorMessageImage }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-container v-if="this.cards.length > 0" fluid class="attach-img-box">
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
                 <div class="attach-img-box">   
                  <v-card-actions class="pl-4">
                    <v-btn  color="primary" @click="closeEmailLotEditDialog">{{ this.checkedImages.length }} IMAGES ATTACHED</v-btn>
                  </v-card-actions>
                </div>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small text color="normal" @click="closeEmailLotEditDialog">Cancel</v-btn>
                <v-btn small color="primary" @click="updateEmailLotDetails">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>

      <!-- Re-Publish Dialog -->
      <v-row justify="center">
        <v-dialog v-model="rePublishDialog" persistent max-width="1000px">
          <v-form ref="rePublishLotForm">
            <v-card class="v-card-100" >
              <v-card-title class="pl-4">
                <span>Republish B2B - Online Auction</span>
              </v-card-title >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="12">
                    <v-text-field :rules="inputRules" label="Lot Name" hint="Standard Lot Name structure: Category||Brand||City||Enddate" persistent-hint outlined v-model="lot_name" type="text" style="font-weight: bold;"></v-text-field>
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
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Buy Now(₹)" outlined v-model="buy_now_price" :rules="buy_now_rule" :min="0" type="number" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiBuyNowPr > 0" class="aiRecommended">AI Recommemnded Price : {{ aiBuyNowPr }}</div>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Reserve Price(₹)" outlined v-model="reserve_price" :rules="res_price_rule" :min="0" type="number" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiReservePr > 0" class="aiRecommended">AI Recommemnded Price : {{ aiReservePr }}</div>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Floor Price(₹)" outlined v-model="floor_price"  :rules="floor_price_rule" :min="0" type="number" style="margin-bottom: -10px;"></v-text-field>
                    <div v-if="isAiAvailable && aiFloorPr > 0" class="aiRecommended">AI Recommemnded Price : {{ aiFloorPr }}</div>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Increment Slab(₹)" outlined v-model="increment_slab" :rules="inc_slab_rule" :min="0" type="number" style="margin-bottom: -10px;"></v-text-field>
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
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable>
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
                      :rules="inputRules">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time3"
                          label="Start Time"
                          prepend-inner-icon="mdi-clock-time-four-outline"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                          :rules="[startTimeRule15Min]"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        ampm-in-title
                        v-if="menu_3"
                        :allowed-minutes="allowedStep"
                        v-model="time3"
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
                      min-width="290px">
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
                      ampm-in-title
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
                    <div class="field image-box" align="left">
                      <v-file-input small-chips
                        outlined 
                        @change="file_change"
                        multiple
                        v-model="files"
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        placeholder="Attach Images"
                        label="Image Attacment"> 
                        </v-file-input>
                        <div class="files"></div>
                        <span v-if="!files || files.length === 0" class="error-message">{{ errorMessageImage }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-container v-if="this.cards.length > 0" fluid class="attach-img-box">
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
                <div class="attach-img-box">   
                  <v-card-actions class="pl-4">
                    <v-btn  color="primary" @click="closeRepublishLotDialog">{{ this.checkedImages.length }} IMAGES ATTACHED</v-btn>
                  </v-card-actions>
                </div>
              </v-container>
              <v-row>
                  <img src="@/assets/images/icons/AI-price-logo.png" class="img-fluid pl-8 pt-4"/>
              </v-row>
              <v-card-actions class="mt-5">
                <v-spacer></v-spacer>
                <v-btn small outlined color="primary" @click="closeRepublishLotDialog">Cancel</v-btn>
                <v-btn small color="primary" @click="sendRepublishLotFn" :disabled="number > 0 || !lot_name || !lot_desc || !lot_mrp || !buy_now_price || !reserve_price || !floor_price || !increment_slab || !start_date || !end_date || !time3 || !time4">Confirm</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
          </v-form>
        </v-dialog>
      </v-row>
      <!-- ######## Main page ######## -->
      <div><HeaderComponent :headerTitle="headerText"/></div>
      <v-card class="v-card-100 ">
        <v-card-title>
          <h4>Please select images</h4>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" color="primary" v-if="action == 'b2b_auction'"  @click="openCreateLotDialog">Proceed</v-btn>
          <v-btn class="ma-2" color="primary" v-if="action == 'edit_lot'" @click="openEditLotDialog">Proceed</v-btn>
          <v-btn class="ma-2" color="primary" v-if="action == 'b2b_email'" @click="opencreateemaillotDialog">Proceed</v-btn>
          <v-btn class="ma-2" color="primary" v-if="action == 'republish_lot'" @click="openRepublishLotDialog">Proceed</v-btn>
          <v-btn class="ma-2" color="primary" v-if="action == 'edit_email_lot'" @click="openEditEmailLotDialog">Proceed</v-btn>
        </v-card-title>
        <v-system-bar class="image-text"  height="40"><v-icon dense>mdi-file-image-outline</v-icon>{{this.objects.length}}</v-system-bar>
      </v-card>
      <v-layout row v-if="this.objects.length > 0">
        <v-col cols="3" sm="3" md="3" v-for="(item, index) in this.objects" :key="index">
          <v-checkbox
            :value="item.url"
            v-model="checkedImages" 
            color="indigo darken-3"
            hide-details
            class="pl-3">
            <template v-slot:label>
              <v-img 
                :src="item.url"
                class="mx-auto pa-4 rounded-lg elevation-24"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="250px"
                width="250px">
              </v-img>
            </template>
          </v-checkbox>
        </v-col>
      </v-layout>
      <div v-else>
        <p class="text-center">
          <img src="@/assets/images/no-images.jpg" height="650px"/>
        </p>
        <p class="text-center">
          Sorry!! No images found, please click on PROCEED.
        </p> 
      </div>  
    </v-card>
  </div>
</template>
<script>
  import $ from 'jquery';
  import HeaderComponent from "../../../../commoncomponents/HeaderComponent";
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data() {
      const todayTime = new Date().getHours() + ':' + new Date().getMinutes();
      return {
        todayTime,
        alert: false,
        alert_type: "success",
        alert_message: "success",
        headerText: "Lot Images",
        isLoading: false,
        checkedImages: [],
        beers: [],
        bottom: false,
        objects: [],
        page: 1,
        // one time click button disable
        number:0,
        not_zero_items: true,
        // -----------
        createBeamLotDialog: false,
        B2b_email : false,
        // -------------
        start_date: null ,
        end_date: null ,
        time1: null,
        time2: null,
        menu_1: false,
        menu_2: false,
        // ----------------
        lot_name: '',
        lot_mrp: '' ,
        lot_desc: '',
        buy_now_price: '',
        floor_price: '',
        reserve_price: '',
        increment_slab: '',
        files: [],
        // ------------------------
        action: '',
        // ----Edit Lot-------------
        lotEditDialog: false,
        EmaillotEditDialog: false,
        order_amount: "",
        removedUrls: [],
        menu1: false,
        menu2: false,
        time: null,
        lot_description: "",
        menu_16: false,
        menu_17: false,
        menu_18: false,
        time7: null,
        time8: null,
        menu_19: false,
        cards: [],
        vendors_list: [],
       
        selected_vendors: [],
        selected_inventory_images: [],
        isdiasbled: false,
        lot_expected_price: "",
        vendor_code: [],
        active_tab: '',
        //----------------------------
        rePublishDialog: false,
        time3: null,
        time4: null,
        menu_3: false,
        menu_4: false,
        menu_13: false,
        menu_14: false,
        menu_15: false,
        errorMessage:'',
        errorMessageImage:'',
        vendor_code_list:[],
        tempStoredList:[],
        isAiAvailable : false,
        aiBuyNowPr : '',
        aiFloorPr : '',
        aiReservePr : '',
        startTimeRule15Min: (value) => {
                if(this.start_date == this.todaydate){
                  if (value < this.futureTime) {
                    this.number = 0;
                      return 'Start time must be at least 15 minutes from now';
                    }
                }      
            return true;
          },
        requiredFile: [(v) => !!v || "Please attach file"],
        inputRules: [v => !!v || "The field is required"],
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
        
        floor_price_rule:[  v => !!v || 'The field is required',
          v => (Number(v) < Number(this.buy_now_price - this.increment_slab)) || "Floor Price can't be greater than difference between buy now price and increment slab", 
          v => ((Number(v) % 100) == 0) || 'Floor Price should be multiple of 100' ],
      };
    },
    components: {
      HeaderComponent, Loading,
    },
    computed: {
      futureTime() {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 15);
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
  },
    todaydate(){
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
          const day = currentDate.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
    },
      endDateRule() {
        return (value) => {
          if (!value) {
            return 'End Date is required';
          }
          const currentDate = new Date().toISOString().substr(0, 10);
          if (value < currentDate) {
            return 'End Date cannot be in the past';
          }
          return true;
        };
      },
      startDateRule() {
        return (value) => {
          if (!value) {
            return 'Start Date is required';
          }
          const currentDate = new Date().toISOString().substr(0, 10);
          if (value < currentDate) {
            return 'Start Date cannot be in the past';
          }
          return true;
        };
      },
      endTimeRule() {
        return (value) => {
          if (!value) {
            return 'End Time is required';
          }
          const currentDate = new Date();
          const selectedDate = new Date(`${this.end_date} ${value}`);
          if (selectedDate <= currentDate) {
            return 'End Time cannot be in the past';
          }
          return true;
        };
      },
      startTimeRule() {
        return (value) => {
          if (!value) {
            return 'Start Time is required';
          }
          const currentDate = new Date();
          const selectedDate = new Date(`${this.start_date} ${value}`);
          if (selectedDate <= currentDate) {
            return 'Start Time cannot be in the past';
          }
          return true;
        };
      },     
    },
    methods: {
      allowedStep: m => m % 15 === 0, 
      bottomVisible(){
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return (bottomOfPage && this.not_zero_items) || pageHeight < visible
      },
      addBeer() {
        let ids = [];
        if(this.action === 'b2b_auction'){
          ids = this.$store.state.lotIds
        }else if(this.action === 'b2b_email'){
          ids = this.$store.state.lotIds
        }else{
          let id = this.$store.state.lot.id
          ids = JSON.stringify([id])
        } 
        let data = [];
        const formData = new FormData();
        formData.append("id",  ids)
        formData.append("page", this.page)
        formData.append('request_type', this.action)
        this.isLoading = true
        this.$http.secured
        .post('/api/v1/warehouse/liquidations/get_liquidation_images_page', formData)
        .then(response => {
          this.not_zero_items = response.data.length > 0
          for(let i=0; i< response.data.length;i++){
            this.objects.push({url: response.data[i]})
          }
          this.isLoading = false
          if (this.bottomVisible()) {
            this.page = this.page + 1
            this.addBeer()
          }
        })
        this.isLoading = false;
      },
      openCreateLotDialog(){
        this.isLoading = true;
        this.number = 0;
        this.createBeamLotDialog = true
        this.floor_price = this.$store.state.floor_price
        this.lot_mrp = this.$store.state.mrp
        this.increment_slab = (Math.round((((this.$store.state.floor_price)*1)/100)/ 100) * 100)
        this.reserve_price = ((this.$store.state.floor_price) + (Math.round((((this.$store.state.floor_price)*1)/100)/ 100) * 100))
        this.buy_now_price = (Math.round((this.$store.state.mrp * 0.7) / 100) * 100)
        this.createBeamLotDialog = true;
        this.getEmailAuctionDetail();
        this.isAiAvailable = false;
        this.getEmailAuctionAiDetail();
      },
      opencreateemaillotDialog(){
        this.number = 0;
        this.B2b_email = true
        this.get_vendor_liquidation_email();
      },
      close_b2b_email(){
      this.B2b_email = false
    },
      closeCreateLotDialog(){
        this.createBeamLotDialog = false
        this.$store.commit("unsetSelectedLot");
      },
      closeCreateBeamLotDialog(){
        this.createBeamLotDialog = false
      },
      dateformat(dateString){
        let dateTimeParts = dateString.split(' ');
        let timeParts     = dateTimeParts[1].split(':');
        let dateParts     = dateTimeParts[0].split('-');
        let date = new Date(dateParts[0],parseInt(dateParts[1], 10) - 1,dateParts[2],timeParts[0], timeParts[1])
        return date;
      },
      sendBeamLotCreationFn() {
        this.number++;
        var  start_dtime = this.dateformat(this.start_date + " " + this.time2)
        var  end_dtime   = this.dateformat(this.end_date + " " + this.time1)
        if (this.$refs.createBeamLotForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0;
          }else if((!this.files || this.files.length === 0) && (this.checkedImages.length === 0)){
            this.errorMessageImage = "Please attach file"
          }else{
          const formData = new FormData();
          formData.append("lot_name", this.lot_name)
          formData.append("lot_mrp",  this.lot_mrp)
          formData.append("lot_desc", this.lot_desc)
          formData.append("buy_now_price", this.buy_now_price)
          formData.append("floor_price",   this.floor_price)
          formData.append("reserve_price", this.reserve_price)
          formData.append("increment_slab",this.increment_slab)
          formData.append("start_date", (this.start_date + " " + this.time2))
          formData.append("end_date", (this.end_date + " " + this.time1))
          formData.append("images", JSON.stringify(this.checkedImages))

          let lotIds = JSON.parse(this.$store.state.lotIds)
          
          for (var i = 0; i < lotIds.length; i++) {
            formData.append("liquidation_obj[]", lotIds[i]);
          }
          //Images from local file system
          for (var i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData.append("files[]", file);
          }
          this.$http.secured
          .post("/api/v1/warehouse/liquidations/create_beam_lots", formData)
          .then(response => {
            if (response) {
              
              this.createBeamLotDialog = false;
              // this.showAlert("success", "Lot Created For Selected Inventory");
              this.$store.commit("showMessage",{alert_type :"success", alert_message: "Lot Created For Selected Inventory"});
              this.files         = [];
              this.checkedImages = [];
              this.$router.push({ name: "LotCreation"});
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
            } else {
              // this.showAlert("error", "Something went Wrong !!");
              this.$store.commit("showMessage",{alert_type :"error", alert_message: "Something went Wrong !!"});
              this.createBeamLotDialog = false;
            }                         
          })
          .catch(error => {
            // this.showAlert("error", error.response.data.errors);
              this.$store.commit("showMessage",{alert_type :"error", alert_message: error.response.data.errors});
            this.number = 0;
          }); 
        }}
        // this.number = 0;
      },
      sendLotCreationFn() {
        this.number++;
        var  start_dtime = this.dateformat(this.start_date + " " + this.time3)
        var  end_dtime = this.dateformat(this.end_date + " " + this.time4)
        if (this.$refs.createLotForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0;
          }if ((this.selected_vendors_email === null || this.selected_vendors_email.length === 0)) {
            this.errorMessage = "Please add email vendors"
          }else if((!this.files || this.files.length === 0) && (this.checkedImages.length === 0)){
            this.errorMessageImage = "Please attach file"
          }else{
          const formData = new FormData();
          formData.append("lot_name", this.lot_name)
          formData.append("lot_expected_price", this.lot_expected_price)
          formData.append("lot_desc", this.lot_desc)
          formData.append("start_date", (this.start_date + " " + this.time3))
          formData.append("end_date", (this.end_date + " " + this.time4))
          // formData.append("images", this.lot_images)
          formData.append("images", JSON.stringify(this.checkedImages))

          let lotIds = JSON.parse(this.$store.state.lotIds)
          
          for (var i = 0; i < lotIds.length; i++) {
            formData.append("liquidation_obj[]", lotIds[i]);
          }
          var vendorLists = [];
          for (var i = 0; i < this.selected_vendors_email.length; i++) {
          vendorLists.push(this.selected_vendors_email[i].vendor_code);
        }
        var vendorListsString = JSON.stringify(vendorLists);
        formData.append("email_vendor_list", vendorListsString)
          //Images from local file system
          for (var i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData.append("files[]", file);
          }
          this.$http.secured
          .post("/api/v1/warehouse/liquidations/create_lots", formData)
          .then(response => {
            if (response) {
              this.$router.push({ name: "LotCreation"});
              // this.showAlert("success", "Lot Created For Selected Inventory");
              this.$store.commit("showMessage",{alert_type :"success", alert_message: "Lot Created For Selected Inventory"});
              this.files         = [];
              this.checkedImages = [];
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
            } else {
              // this.showAlert("error", "Something went Wrong !!");
              this.$store.commit("showMessage",{alert_type :"error", alert_message: "Something went Wrong !!"});
              this.B2b_email = false;
            }                         
          })
          .catch(error => {
            // this.showAlert("error", error.response.data.errors);
            this.$store.commit("showMessage",{alert_type :"error", alert_message: error.response.data.errors});
            this.number = 0;
          }); 
        }}
      },

        get_image_popup(){
      if (this.selected_inventory_images){
        this.imageDailog = true;  
        this.B2b_email = false
      }
      else{
        this.loading = false;
        this.showAlert("error", "No Data Found");
      }
    },
      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },
      alertTimeOut() {
        setTimeout(() => {this.alert = false;}, 3000);
      },
      openEditLotDialog(){
        // this.$store.commit("setSelectedLot", { lot:  item , action: 'edit_lot'});
        let item = this.$store.state.lot
        this.lot_id        = item.id
        this.lotEditDialog = true
        this.isAiAvailable = false;
        this.removedUrls   = [];
        this.isLoading = true;
        this.setLotParams(item);
        this.setLotimages(item.id);
        this.getEditLotAiDetail(this.lot_id);
        // this.selected_email_vendor_call();
      },
      openEditEmailLotDialog(){
        let item = this.$store.state.lot
        this.lot_id        = item.id

        this.EmaillotEditDialog = true
        this.isLoading = true;
        this.removedUrls   = [];
        this.setLotParams(item);
        this.setLotimages(item.id);
        // this.selected_email_vendor_call();
      },
      getEditLotAiDetail(id){        
        this.$http.secured
        .get(`/api/v1/warehouse/liquidations/calculate_ai_price?liquidation_order_id=${id}`)
        .then(response => {
          if (response.data) {  
            if(response.data.errors){
              this.responseErrors = response.data.errors
              this.$toast.error("AI price is not available for this. Please fill the details manually")
            }else{          
            const temp_detail = response.data.prices            
            const floorPrice = temp_detail.floor_price
            this.loading = false;
            if(floorPrice > 0){
              this.setInventoryParamsForEdit(temp_detail);
            }else{
              this.$toast.error("AI price is not available for this. Please fill the details manually")
            }
          }
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
          this.isLoading = false;
        });
      },
      setInventoryParamsForEdit(temp_detail){
        this.isAiAvailable = true;
        this.aiBuyNowPr      = temp_detail.buy_now_price
        this.aiFloorPr      = temp_detail.floor_price
        this.aiReservePr      = temp_detail.reserve_price
      },
      openRepublishLotDialog(){
        this.number = 0;
        let item = this.$store.state.lot
        this.lot_desc = item.lot_desc;
        this.lot_mrp = item.mrp;
        this.floor_price = item.floor_price;
        this.reserve_price = item.reserve_price;
        this.buy_now_price = item.buy_now_price;
        this.increment_slab = item.increment_slab;
        this.rePublishDialog = true
        this.isAiAvailable = false;
        this.getEditLotAiDetail(item.id);
        this.isLoading = true;
      },
      closeRepublishLotDialog(){
        this.rePublishDialog = false
      },
      closeLotEditDialog(){
        this.lotEditDialog = false
        this.lot_id        = null
        this.$refs.lotEditForm.reset();
      },
      closeEmailLotEditDialog(){
        this.EmaillotEditDialog = false
        this.lot_id        = null
        this.$refs.EmaillotEditForm.reset();
      },
      closeRePublishLotDialog(){
        this.rePublishDialog = false
      },
      setLotimages(lot_id){
        this.$http.secured
        .get("api/v1/warehouse/inventory_file_uploads/get_edit_lot_images?id="+lot_id)
        .then(response => {
          if(response.data) {
            this.isLoading = false;
            this.cards = response.data.lot_images
            for(var i=0; i< response.data.inv_images.length;i++){
              this.selected_inventory_images.push({url: response.data.inv_images[i], checked: false})
            }
          }                
        })
        .catch(error => {
          this.isLoading = false;
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
        this.order_amount    = item.order_amount
        if(item.auto_publishable != "Pending Information"){
          this.start_date      = this.dateForCalander(item.start_date,'date')
          this.end_date        = this.dateForCalander(item.end_date, 'date')
          this.time7           = this.dateForCalander(item.start_date,'time')
          this.time8           = this.dateForCalander(item.end_date,'time')
        }
        this.selected_vendors = item.selected_vendors
        if (item.selected_email_vendors !== null) {
          // this.selected_vendors_email = item.selected_email_vendors;          
          this.vendor_code_list = item.selected_email_vendors;
        }
      },
      updateLotDetails(){
        var  start_ltime = this.dateformat(this.start_date + " " + this.time7)
        var  end_ltime   = this.dateformat(this.end_date + " " + this.time8)
        if (this.$refs.lotEditForm.validate()) {
          if(end_ltime <= start_ltime){
            this.showAlert('error', "Invalid Date / Time ..!!");
          }else if((!this.files || this.files.length === 0) && (this.checkedImages.length === 0) && (this.cards.length === 0)){
            this.errorMessageImage = "Please attach file"
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
                
                this.$router.push({ name: "LotCreation"});
                // this.showAlert("success", "Lot updated successfully!");
                this.$store.commit("showMessage",{alert_type :"success", alert_message: "Lot updated successfully!"});
              } else {
                // this.showAlert('error', "No Data Found");
                this.$store.commit("showMessage",{alert_type :"error", alert_message: "No Data Found"});
                this.closeLotEditDialog();
              }            
            })
            .catch(error => {
              if(error.response.status == 500){
                // this.showAlert('error', "Something went wrong from Network" + error);
                this.$store.commit("showMessage",{alert_type :"error", alert_message: "Something went wrong from Network" + error});
              }else{
                // this.showAlert('error', error.response.data.message || "Something went wrong");
                this.$store.commit("showMessage",{alert_type :"error", alert_message: error.response.data.message || "Something went wrong"});
              }
              this.isLoading                = false;
          });
        }}
      },
      updateEmailLotDetails(){
        var  start_ltime = this.dateformat(this.start_date + " " + this.time7)
        var  end_ltime   = this.dateformat(this.end_date + " " + this.time8)
        if (this.$refs.lotEditForm.validate()) {
          if(end_ltime <= start_ltime){
            this.showAlert('error', "Invalid Date / Time ..!!");
          }else if ((this.vendor_code_list === null || this.vendor_code_list.length === 0) ) {
            this.errorMessage = "Please add email vendors"
          }else if((!this.files || this.files.length === 0) && (this.checkedImages.length === 0) && (this.cards.length === 0)){
            this.errorMessageImage = "Please attach file"
          }
          else{
          const formData = new FormData();
          formData.append("liquidation_order[lot_description]", this.lot_description)
          formData.append("liquidation_order[start_date]", (this.start_date + " " + this.time7))
          formData.append("liquidation_order[end_date]", (this.end_date + " " + this.time8))
          formData.append("liquidation_order[order_amount]", this.order_amount)
          formData.append("liquidation_order[lot_id]", this.lot_id)
          
          for (let file of this.files) {
            formData.append("lot[images][]", file, file.name);
          }
        //   for (var i = 0; i < this.selected_vendors_email.length; i++) {
        //     this.vendor_code_list.push(this.selected_vendors_email[i].vendor_code);
        // }
        var vendorListsString = JSON.stringify(this.vendor_code_list);
        formData.append("email_vendor_list", vendorListsString)
          // for (let code of this.selected_vendors) {
          //   formData.append("vendor_lists[]", code);
          // }
          
          formData.append("lot[image_urls]", JSON.stringify(this.checkedImages))
          formData.append("lot[removed_urls]", JSON.stringify(this.removedUrls))

          this.isLoading = true;
          this.$http.secured
            .put("api/v1/warehouse/inventory_file_uploads/"+this.lot_id, formData,{ headers: { 'Content-Type': 'multipart/form-data'}})
            .then(response => {
              if (response) {
                
                this.$router.push({ name: "LotCreation"});
                this.showAlert("success", "Lot updated successfully!");
                this.selected_vendors_email = '';
                this.vendor_code_list = ''
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
      getEmailAuctionAiDetail(){
        let lotIds = this.$store.state.inventoryId          
        this.$http.secured
        .get(`/api/v1/warehouse/liquidations/calculate_ai_price?inventory_ids[]=${lotIds}`)
        .then(response => {
          if (response.data) {  
            this.isLoading = false;
            if(response.data.errors){
              this.responseErrors = response.data.errors
              this.$toast.error("AI price is not available for this. Please fill the details manually")
            }else{          
            const temp_detail = response.data.prices            
            const floorPrice = temp_detail.floor_price
            this.loading = false;
            if(floorPrice > 0){
              this.setInventoryParams(temp_detail);
            }else{
              this.$toast.error("AI price is not available for this. Please fill the details manually")
            }
          }
          } else {
            this.isLoading = false;
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
          this.isLoading = false;
        });
      },
      setInventoryParams(temp_detail){       
        this.isAiAvailable   = true;
        this.aiBuyNowPr      = temp_detail.buy_now_price
        this.aiFloorPr       = temp_detail.floor_price
        this.aiReservePr     = temp_detail.reserve_price    
        // this.lot_mrp         = temp_detail.mrp_price 
        // this.buy_now_price   = temp_detail.buy_now_price
        // this.floor_price     = temp_detail.floor_price
        // this.reserve_price   = temp_detail.reserve_price
        // this.increment_slab  = temp_detail.bid_increment_price   
        // this.start_date      = this.dateForCalander(temp_detail.start_time,'date')
        // this.end_date        = this.dateForCalander(temp_detail.end_time, 'date')
        // this.time2           = this.dateForCalander(temp_detail.start_time,'time')
        // this.time1           = this.dateForCalander(temp_detail.end_time,'time')
      },
      get_republish_inventory_images() {
        this.selected_inventory_images = []
        this.$http.secured
         .get("/api/v1/warehouse/liquidations/get_republish_liquidation_images", {params: {id: this.selected_lot_item_id}})
         .then(response => {
         if (response.data) {
            for(let i=0; i< response.data.length;i++){
              this.selected_inventory_images.push({url: response.data[i], checked: false})
            } 
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
        this.number++;
        var  start_dtime = this.dateformat(this.start_date + " " + this.time3)
        var  end_dtime = this.dateformat(this.end_date + " " + this.time4)
        if (this.$refs.rePublishLotForm.validate()) {
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0;
          }else if((!this.files || this.files.length === 0) && (this.checkedImages.length === 0)){
            this.errorMessageImage = "Please attach file"
            this.number = 0;
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
          formData.append("images", JSON.stringify(this.checkedImages))
       
          for (var i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData.append("files[]", file);
          }

          this.$http.secured
            .post("/api/v1/warehouse/liquidations/create_beam_republish_lots_async", formData,{ headers: { 'Content-Type': 'multipart/form-data'}})
            .then(response => {
              if (response.data) {                
                // this.showAlert("success", "Lot Republish Initiated");
                this.$store.commit("showMessage",{alert_type :"success", alert_message: "Lot Republish Initiated"});
                this.$router.push({ name: "LotCreation"});
              } else {
                // this.showAlert("error", error.response.data.errors);
                this.$store.commit("showMessage",{alert_type :"error", alert_message: error.response.data.errors});
              }                         
            })
            .catch(error => {
              this.number = 0;
              // this.showAlert("error", error.response.data.errors);
              this.$store.commit("showMessage",{alert_type :"error", alert_message: error.response.data.errors});
            });
          }
        }
      },          
      file_change(){
        document.querySelectorAll('.pip').forEach(function(a){a.remove()})
        const files       = this.files;
        const filesLength = this.files.length;
        for (var i = 0; i < filesLength; i++) {
          var f = files[i]
          var fileReader = new FileReader();
          fileReader.onload = (function(ev) {
            var file = ev.target;
            $("<span class=\"pip\">" +
              "<img class=\"imageThumb\" src=\"" + ev.target.result + "\" title=\""+"Attached Image"+ "\"/></span>").insertAfter(".files");
            });
          fileReader.readAsDataURL(f);
        }
      },
      reomoveImg(url,index){
        this.removedUrls.push(url);
        this.$delete(this.cards, index)
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

      get_vendor_liquidation() {
        this.$http.secured.get("/api/v1/warehouse/liquidations/get_vendor_liquidation")
          .then(response => {
              this.vendors_list = response.data.vendor_masters
              this.loading = false;
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
          });
      },
      addVendorInList(){
        this.vendor_code_list=[];
        for (var i = 0; i < this.selected_vendors_email.length; i++) {
            this.vendor_code_list.push(this.selected_vendors_email[i].vendor_code);
        }
        this.vendor_code_list = [...new Set(this.vendor_code_list)];
        this.Emaildialog = false
        this.tempStoredList = this.selected_vendors_email;
        // this.updateEmailVendors();
      },
      selected_email_vendor_call() {
      this.$http.secured.get("/api/v1/warehouse/liquidation_orders/"+this.lot_id+"/email_vendors")
        .then(response => {
          this.vendor_code_menu_items = []
            this.selected_vendors_email = response.data.selected_email_vendors
            const unselected_vendors = response.data.other_email_vendors
            this.vendor_code_menu_items = [...this.selected_vendors_email, ...unselected_vendors];
            this.loading = false;
            this.tempStoredList = this.selected_vendors_email;
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
    },
    openEmailDialog(){
      this.Emaildialog = true;
      this.vendor_search_field_type = ''
      this.search_vendor = ''
    },
    get_vendor_liquidation_email() {
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
        this.selected_email_vendor_call()
      }

    },
    removeItem(itemId) {
      // Remove the item from selectedItems
      const index = this.selected_vendors_email.indexOf(itemId);
      if (index > -1) {
        this.selected_vendors_email.splice(index, 1);
      }
    },
    closeEmailVendorPopup(){
      this.Emaildialog = false;
      this.selected_vendors_email = this.tempStoredList;
    }, 
  },
    watch: {
      bottom(bottom) {
        if (bottom) {
          this.page = this.page + 1
          this.addBeer()
        }
      }
    },
    async created() {
      this.action = this.$store.state.action
      this.selected_lot_item_id = this.$store.state.lot.id
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
      this.addBeer()
      if(this.action == 'edit_email_lot' || this.action == 'edit_lot'){
      let item = this.$store.state.lot
        this.lot_id        = item.id
      this.selected_email_vendor_call();
      }
      else if(this.action == 'b2b_auction'){
        this.lot_id = this.$store.state.lotIds;
      }
      else {
      this.get_vendor_liquidation();
      }
    }
  };
</script>
<style scoped>
  .v-card {max-width: 97% !important;}
  .v-card-100 {max-width: 100% !important;}
  .v-card--reveal {align-items: center;bottom: 0;justify-content: center;opacity: .5;position: absolute;width: 100%;}
  .imageThumb {
    max-height: 120px;
    border: 1px solid;
    padding: 1px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  }
  .pip {
    display: inline-block;
    margin: 10px 10px 0 0;
  }
  .remove {
    display: block;
    background: #444;
    border: 1px solid black;
    color: white;
    text-align: center;
    cursor: pointer;
  }
  .remove:hover {
    background: white;
    color: black;
  }  
  .attach{
    padding: 5px;
    color: #6d6b6b;
    font-size: 13px;
  }
  .image-box{
    padding: 18px;
    border: 1px solid #9e9e9e;
    border-radius: 9px;
  }
  .attach-img-box{
    border: 1px solid #9e9e9e;
    margin-top: 13px;
    border-radius: 9px;
  }


  .image-text{
    font-size: 20px;
  }
  .rule-type_option {
  border: 1px solid #000000;
  padding: 4px 8px;
  border-radius: 5px;
  margin: 1px 2px;
}
.selected_rule_box{
  display: flex;
  flex-wrap: wrap;
}
.selected-item{
   font-size: 18px;
  font-weight: 400;
}
.error-message{
  color: #ff5252;
}
  .select_all{border-top: 1px solid #cccccc!important;background: #f0f0f0!important;}
  .cp{cursor: pointer;}
  .aiRecommended{
    color: #FF525E;
    font-size: 12px;
    padding-left: 14px;
  }

</style>