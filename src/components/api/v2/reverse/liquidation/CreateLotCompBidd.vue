<template>
    <div>
        <v-card class="overflow-hidden v-card v-sheet theme--light">
            <!-- Alert Messages -->
            <div>
                <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
            </div>
            <!-- ######## Main page ######## -->
            <div>
                <HeaderComponent :headerTitle="headerText" :createLotComtBidding="createLotComtBidding" :lotIdB2b="lotIdB2b" :action="action"/>
            </div>
            <loading :active.sync="isLoading" 
                :can-cancel="true" 
                :is-full-page="fullPage" :color="primary_code"></loading>
            <!-- Create lot form -->
            <template v-if="action == 'create_lot'">
                <v-form ref="createForm" class="dynamic-height-form">
                    <v-card class="v-card-100">
                        <v-card-text>
                            <div>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Lot Name create</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-text-field :rules="inputRules" v-model="lot_name" label="Lot Name" hint="Standard Lot Name structure: Category||Brand||City||Enddate" persistent-hint outlined type="text" style="font-weight: bold;"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Lot Description</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-text-field :rules="inputRules" v-model="lot_desc" label="Lot Description" type="text" outlined></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                    <span class="text-align">Price details</span>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                    <v-combobox 
                                        v-model="bid_value" 
                                        :items="bid_value_items" 
                                        label="Bid Value to be Multiple of"
                                        outlined
                                        :rules="inputRules"
                                        ></v-combobox>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                  <v-text-field v-model="mrp_value" outlined label="MRP" disabled></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="6" sm="4" md="4">
                                </v-col>
                                <v-col cols="8" sm="4" md="4">                                    
                                    <v-text-field :rules="buyNowValidationRules" v-model="format_buy_now_price" label="Buy Now Price (₹)" outlined  :min="0" required ref="buyNowPrice" 
                                    
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="7" sm="4" md="4">                                    
                                    <v-text-field :rules="reserveValidationRules" v-model="format_reserve_price" label="Reserve Price (₹)" outlined  :min="0" required ref="reservePrice" 
                                    
                                    ></v-text-field>
                                </v-col>                               
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                </v-col>
                                <v-col cols="5" sm="4" md="4">                                    
                                    <v-text-field :rules="floorNowValidationRules" v-model="format_floor_price" label="Floor Price (₹)" outlined  :min="0" required ref="floorPrice" ></v-text-field>
                                </v-col>
                                <v-col cols="4" sm="4" md="4" v-if="biddingMethod == 'open'">                                    
                                    <v-text-field :rules="bidIncreValidationRules" v-model="bid_incr_price" label="Bid Increament Price (₹)" outlined type="number" :min="0" required ref="bidPrice"></v-text-field>
                                </v-col>                              
                               </v-row>                              
                               <v-row>
                                <v-col cols="9" sm="4" md="4">
                                    <span class="text-align">Item Attachments</span>
                                </v-col>
                                <v-col cols="10" sm="4" md="4">                                    
                                    <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly>
                                    <v-expansion-panel outlined @click="openImagePopup">
                                        <v-expansion-panel-header>Lot Images
                                            <template v-slot:actions>
                                            <v-icon>
                                                mdi-attachment
                                            </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                    <span>
                                      Images attached: {{ selectedCount ? selectedCount : lotImages.length }}
                                      <!-- <div class="selected_rule_box">
                                         <span  v-for="(image, index) in lotImageNames" :key="index" class="rule-type_option" :label="getImageName(image)" >
                                          {{ image }}
                                          <span style="color: #000000; cursor: pointer" class="text-black"
                                                     @click="removeImage(index)">x</span>
                                        </span >
                                      </div> -->
                                    </span>
                                </v-col>
                                <v-col cols="11" sm="4" md="4">                                    
                                    <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly disabled>
                                    <v-expansion-panel disab outlined @click="openVideosPopup">
                                        <v-expansion-panel-header>Lot Videos
                                            <template v-slot:actions>
                                            <v-icon>
                                                mdi-attachment
                                            </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="12" sm="4" md="4">
                                    <span class="text-align">Lot Duration Details</span>
                                </v-col>
                                <v-col cols="13" sm="4" md="4">                                    
                               <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="bid_start_date" transition="scale-transition" offset-y min-width="290px">
                                   <template v-slot:activator="{ on, attrs }">
                                       <v-text-field outlined
                                       v-model="formattedStartDate"
                                       label="Bid Start Date"
                                       prepend-inner-icon="event"
                                       readonly
                                       v-bind="attrs"
                                       v-on="on"
                                       :rules="inputRules"
                                       ></v-text-field>
                                   </template>
                                   <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="bid_start_date" no-title scrollable>
                                       <v-spacer></v-spacer>
                                       <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                       <v-btn text color="primary" @click="$refs.menu1.save(bid_start_date)">OK</v-btn>
                                   </v-date-picker>
                                   </v-menu>
                                </v-col>
                                <v-col cols="14" sm="4" md="4">                                    
                                 <!-- <v-menu
                                    ref="menu_1"
                                    v-model="menu_1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="time1"
                                        label="Bid Start Time"
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
                                      v-model="time1"
                                      :allowed-minutes="allowedStep"
                                      full-width
                                      @click:minute="$refs.menu1.save(time1)">
                                    </v-time-picker>
                                  </v-menu> -->
                                  <inlineTimePicker label="Bid Start Time"  required :timeValue="time1" :allow_time="allow_start_time" :getSelectedTime="(selectedTime)=>{time1 = selectedTime}" />

                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="15" sm="4" md="4">
                                </v-col>
                                <v-col cols="16" sm="4" md="4">                                    
                                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="bid_end_date" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field outlined
                                        v-model="formattedEndDate"
                                        label="Bid End Date"
                                        prepend-inner-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="inputRules" 
                                        >
                                        </v-text-field>
                                    </template>
                                    <v-date-picker :min="minium_end_date"  v-model="bid_end_date" no-title scrollable >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu2.save(bid_end_date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="17" sm="4" md="4">                                    
                                    <!-- <v-menu
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
                                            v-model="time2"
                                            label="Bid End Time"
                                            prepend-inner-icon="mdi-clock-time-four-outline"
                                            outlined
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="inputRules"
                                            >
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            ampm-in-title
                                            v-if="menu_2"
                                            v-model="time2"
                                            :allowed-minutes="allowedStep"
                                            full-width
                                            @click:minute="$refs.menu_2.save(time2)">
                                        </v-time-picker>
                                        </v-menu> -->
                                  <inlineTimePicker label="Bid End Time"  required :timeValue="time2" :allow_time="allow_end_time" :getSelectedTime="(selectedTime)=>{time2 = selectedTime}" />

                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="18" sm="4" md="4">
                                    <span class="text-align">Delivery Timeline</span>
                                </v-col>
                                <v-col cols="19" sm="4" md="4">
                                    <v-text-field v-model="payment_date" :rules="inputRules" oninput="validity.valid||(value='');" label="Enter the no. of days from the date of payment" outlined type="number" :min="0"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                    <span class="text-align">Select Approved Buyers</span>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                    <v-combobox 
                                        v-model="select_list" 
                                        :items="select_list_items" 
                                        item-text="full_name" 
                                        item-value="username" 
                                        label="Search & Select from the list"
                                        outlined
                                        multiple
                                        clearable
                                        chips
                                        :rules="inputRules"
                                        ref="brandAutocomplete"
                                        ></v-combobox>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Additional Information</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-textarea v-model="add_remarks" label="Add Remarks here" outlined></v-textarea>
                                </v-col>
                               </v-row>
                            </div>
                            <v-card-actions class="submit-actions">
                              <div>
                                <img src="@/assets/images/icons/bb-price-engine.png" class="img-fluid" />
                              </div>
                                <v-spacer></v-spacer>
                                <v-btn dark color="primary" style="margin-top: 18px;" :disabled="number > 0" @click="createContractLot">SUBMIT</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-form>
            </template>  
            <!-- edit lot form -->
            <template v-if="action == 'edit_lot'">
                <v-form ref="editLotForm" class="dynamic-height-form">
                    <v-card class="v-card-100">
                        <v-card-text>
                            <div>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Lot Name edit</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-text-field :rules="inputRules" v-model="lot_name" disabled label="Lot Name" hint="Standard Lot Name structure: Category||Brand||City||Enddate" persistent-hint outlined type="text" style="font-weight: bold;"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Lot Description</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-text-field :rules="inputRules" v-model="lot_desc" label="Lot Description" type="text" outlined></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                    <span class="text-align">Price Details</span>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                    <v-combobox 
                                        v-model="bid_value" 
                                        :items="bid_value_items" 
                                        label="Bid Value to be Multiple of"
                                        outlined
                                        :rules="inputRules"
                                        ></v-combobox>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                  <v-text-field v-model="mrp_value" outlined label="MRP" disabled></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="6" sm="4" md="4">
                                </v-col>
                                <v-col cols="8" sm="4" md="4">                                    
                                    <v-text-field :rules="moduleredit" v-model="format_buy_now_price" label="Buy Now Price (₹)" outlined  :min="0" ref="buy_now_price_input" ></v-text-field>
                                </v-col>
                                <v-col cols="7" sm="4" md="4">                                    
                                    <v-text-field :rules="buy_now_rule_edit" v-model="format_reserve_price" label="Reserve Price (₹)" outlined  :min="0" ref="reserve_price_input" ></v-text-field>
                                </v-col>                               
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                </v-col>
                                <v-col cols="5" sm="4" md="4">                                    
                                    <v-text-field :rules="floor_price_rule_edit" v-model="format_floor_price" label="Floor Price (₹)" outlined :min="0" ref="floor_price_input" ></v-text-field>
                                </v-col>
                                <v-col cols="4" sm="4" md="4" v-if="biddingMethod == 'open'">                                    
                                    <v-text-field :rules="bid_icre_price_rule_edit" v-model="bid_incr_price" label="Bid Increament Price (₹)" outlined type="number" :min="0" ref="bidincr_price_input"></v-text-field>
                                </v-col>                                 
                               </v-row>                              
                               <v-row>
                                <v-col cols="9" sm="4" md="4">
                                    <span class="text-align">Item Attachments</span>
                                </v-col>
                                <v-col cols="10" sm="4" md="4">                                    
                                    <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly>
                                    <v-expansion-panel outlined @click="openImagePopup">
                                        <v-expansion-panel-header>Lot Images
                                            <template v-slot:actions>
                                            <v-icon>
                                                mdi-attachment
                                            </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                    <span>
                                      Images attached: {{ selectedCount ? selectedCount : lotImages.length }}
                                      <!-- <div class="selected_rule_box">
                                         <span  v-for="(image, index) in lotImageNames" :key="index" class="rule-type_option" :label="getImageName(image)" >
                                          {{ image }}
                                          <span style="color: #000000; cursor: pointer" class="text-black"
                                                     @click="removeImage(index)">x</span>
                                        </span >
                                      </div> -->
                                    </span>
                                </v-col>
                                <v-col cols="11" sm="4" md="4">                                    
                                    <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly disabled>
                                    <v-expansion-panel outlined @click="openVideosPopup">
                                        <v-expansion-panel-header>Lot Videos
                                            <template v-slot:actions>
                                            <v-icon>
                                                mdi-attachment
                                            </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="12" sm="4" md="4">
                                    <span class="text-align">Lot Duration Details</span>
                                </v-col>
                                <v-col cols="13" sm="4" md="4">                                    
                               <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="bid_start_date" transition="scale-transition" offset-y min-width="290px">
                                   <template v-slot:activator="{ on, attrs }">
                                       <v-text-field outlined
                                       v-model="formattedStartDate"
                                       label="Bid Start Date"
                                       prepend-inner-icon="event"
                                       readonly
                                       v-bind="attrs"                                       
                                       v-on="on"
                                       :rules="inputRules"
                                       ></v-text-field>
                                   </template>
                                   <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="bid_start_date" no-title scrollable>
                                       <v-spacer></v-spacer>
                                       <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                       <v-btn text color="primary" @click="$refs.menu1.save(bid_start_date)">OK</v-btn>
                                   </v-date-picker>
                                   </v-menu>
                                </v-col>
                                <v-col cols="14" sm="4" md="4">                                    
                                 <!-- <v-menu
                                    ref="menu_1"
                                    v-model="menu_1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="time1"
                                        label="Bid Start Time"
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
                                      v-model="time1"
                                      :allowed-minutes="allowedStep"
                                      full-width
                                      @click:minute="$refs.menu1.save(time1)">
                                    </v-time-picker>
                                  </v-menu> -->
                                  <inlineTimePicker label="Bid Start Time"  required :timeValue="time1" :allow_time="allow_start_time" :getSelectedTime="(selectedTime)=>{time1 = selectedTime}" />
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="15" sm="4" md="4">
                                </v-col>
                                <v-col cols="16" sm="4" md="4">                                    
                                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="bid_end_date" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field outlined
                                        v-model="formattedEndDate"
                                        label="Bid End Date"
                                        prepend-inner-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="inputRules" 
                                        >
                                        </v-text-field>
                                    </template>
                                    <v-date-picker :min="minium_end_date"  v-model="bid_end_date" no-title scrollable >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu2.save(bid_end_date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="17" sm="4" md="4">                                    
                                    <!-- <v-menu
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
                                            v-model="time2"
                                            label="Bid End Time"
                                            prepend-inner-icon="mdi-clock-time-four-outline"
                                            outlined
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="inputRules"
                                            >
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            ampm-in-title
                                            v-if="menu_2"
                                            v-model="time2"
                                            :allowed-minutes="allowedStep"
                                            full-width
                                            @click:minute="$refs.menu_2.save(time2)">
                                        </v-time-picker>
                                        </v-menu> -->
                                        <inlineTimePicker label="Bid End Time"  required :timeValue="time2" :allow_time="allow_end_time" :getSelectedTime="(selectedTime)=>{time2 = selectedTime}" />
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="18" sm="4" md="4">
                                    <span class="text-align">Delivery Timeline</span>
                                </v-col>
                                <v-col cols="19" sm="4" md="4">
                                    <v-text-field v-model="payment_date" :rules="inputRules" oninput="validity.valid||(value='');" label="Enter the no. of days from the date of payment" outlined type="number" :min="0"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                    <span class="text-align">Select Approved Buyers</span>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                    <v-combobox 
                                        v-model="select_list" 
                                        :items="select_list_items" 
                                        item-text="full_name" 
                                        item-value="username" 
                                        label="Search & Select from the list"
                                        outlined
                                        multiple
                                        clearable
                                        chips
                                        :rules="inputRules"
                                        ref="brandAutocomplete"
                                        ></v-combobox>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Additional Information</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-textarea v-model="add_remarks" label="Add Remarks here" outlined></v-textarea>
                                </v-col>
                               </v-row>
                            </div>
                            <v-card-actions class="submit-actions">
                              <div>
                                <img src="@/assets/images/icons/bb-price-engine.png" class="img-fluid" />
                              </div>
                                <v-spacer></v-spacer>
                                <v-btn dark color="primary" style="margin-top: 18px;" :disabled="number > 0" @click="editLotSave">SAVE & CLOSE</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-form>
            </template>

            <!-- Republish lot -->
            <template v-if="action == 're_publish' || action === 're_publish_payment'">
                <v-form ref="republishLotForm" class="dynamic-height-form">
                    <v-card>
                        <v-card-text>
                            <div>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Lot Name republish</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-text-field :rules="inputRules" v-model="lot_name" disabled label="Lot Name" hint="Standard Lot Name structure: Category||Brand||City||Enddate" persistent-hint outlined type="text" style="font-weight: bold;"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Lot Description</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-text-field :rules="inputRules" v-model="lot_desc" label="Lot Description" type="text" outlined></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                    <span class="text-align">Price Details</span>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                    <v-combobox 
                                        v-model="bid_value" 
                                        :items="bid_value_items" 
                                        label="Bid Value to be Multiple of"
                                        outlined
                                        :rules="inputRules"
                                        ></v-combobox>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                  <v-text-field v-model="mrp_value" outlined label="MRP" disabled></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="6" sm="4" md="4">
                                </v-col>
                                <v-col cols="8" sm="4" md="4">                                    
                                    <v-text-field :rules="moduleredit" v-model="format_buy_now_price" label="Buy Now Price (₹)" outlined  :min="0" ref="buy_now_price_input"></v-text-field>
                                </v-col>
                                <v-col cols="7" sm="4" md="4">                                    
                                    <v-text-field :rules="buy_now_rule_edit" v-model="format_reserve_price" label="Reserve Price (₹)" outlined :min="0" ref="reserve_price_input" ></v-text-field>
                                </v-col>                               
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                </v-col>
                                <v-col cols="5" sm="4" md="4">                                    
                                    <v-text-field :rules="floor_price_rule_edit" v-model="format_floor_price" label="Floor Price (₹)" outlined :min="0" ref="floor_price_input"></v-text-field>
                                </v-col>
                                <v-col cols="4" sm="4" md="4" v-if="biddingMethod == 'open'">                                    
                                    <v-text-field :rules="bid_icre_price_rule_edit" v-model="bid_incr_price" label="Bid Increament Price (₹)" outlined type="number" :min="0"></v-text-field>
                                </v-col>                                 
                               </v-row>                              
                               <v-row>
                                <v-col cols="9" sm="4" md="4">
                                    <span class="text-align">Item Attachments</span>
                                </v-col>
                                <v-col cols="10" sm="4" md="4">                                    
                                    <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly>
                                    <v-expansion-panel outlined @click="openImagePopup">
                                        <v-expansion-panel-header>Lot Images
                                            <template v-slot:actions>
                                            <v-icon>
                                                mdi-attachment
                                            </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                    <span>
                                      Images attached: {{ selectedCount ? selectedCount : lotImages.length  }}
                                      <!-- <div class="selected_rule_box">
                                         <span  v-for="(image, index) in lotImageNames" :key="index" class="rule-type_option" :label="getImageName(image)" >
                                          {{ image }}
                                          <span style="color: #000000; cursor: pointer" class="text-black"
                                                     @click="removeImage(index)">x</span>
                                        </span >
                                      </div> -->
                                    </span>
                                </v-col>
                                <v-col cols="11" sm="4" md="4">                                    
                                    <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly disabled>
                                    <v-expansion-panel outlined @click="openVideosPopup">
                                        <v-expansion-panel-header>Lot Videos
                                            <template v-slot:actions>
                                            <v-icon>
                                                mdi-attachment
                                            </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="12" sm="4" md="4">
                                    <span class="text-align">Lot Duration Details</span>
                                </v-col>
                                <v-col cols="13" sm="4" md="4">                                    
                               <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="bid_start_date" transition="scale-transition" offset-y min-width="290px">
                                   <template v-slot:activator="{ on, attrs }">
                                       <v-text-field outlined
                                       v-model="formattedStartDate"
                                       label="Bid Start Date"
                                       prepend-inner-icon="event"
                                       readonly
                                       v-bind="attrs"                                       
                                       v-on="on"
                                       :rules="inputRules"
                                       ></v-text-field>
                                   </template>
                                   <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="bid_start_date" no-title scrollable>
                                       <v-spacer></v-spacer>
                                       <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                       <v-btn text color="primary" @click="$refs.menu1.save(bid_start_date)">OK</v-btn>
                                   </v-date-picker>
                                   </v-menu>
                                </v-col>
                                <v-col cols="14" sm="4" md="4">                                    
                                 <!-- <v-menu
                                    ref="menu_1"
                                    v-model="menu_1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="time1"
                                        label="Bid Start Time"
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
                                      v-model="time1"
                                      :allowed-minutes="allowedStep"
                                      full-width
                                      @click:minute="$refs.menu1.save(time1)">
                                    </v-time-picker>
                                  </v-menu> -->
                                  <inlineTimePicker label="Bid Start Time"  required :timeValue="time1" :allow_time="allow_start_time" :getSelectedTime="(selectedTime)=>{time1 = selectedTime}" />
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="15" sm="4" md="4">
                                </v-col>
                                <v-col cols="16" sm="4" md="4">                                    
                                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="bid_end_date" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field outlined
                                        v-model="formattedEndDate"
                                        label="Bid End Date"
                                        prepend-inner-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="inputRules" 
                                        >
                                        </v-text-field>
                                    </template>
                                    <v-date-picker :min="minium_end_date"  v-model="bid_end_date" no-title scrollable >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu2.save(bid_end_date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="17" sm="4" md="4">                                    
                                    <!-- <v-menu
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
                                            v-model="time2"
                                            label="Bid End Time"
                                            prepend-inner-icon="mdi-clock-time-four-outline"
                                            outlined
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="inputRules"
                                            >
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            ampm-in-title
                                            v-if="menu_2"
                                            v-model="time2"
                                            :allowed-minutes="allowedStep"
                                            full-width
                                            @click:minute="$refs.menu_2.save(time2)">
                                        </v-time-picker>
                                        </v-menu> -->
                                        <inlineTimePicker label="Bid End Time"  required :timeValue="time2" :allow_time="allow_end_time" :getSelectedTime="(selectedTime)=>{time2 = selectedTime}" />
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="18" sm="4" md="4">
                                    <span class="text-align">Delivery Timeline</span>
                                </v-col>
                                <v-col cols="19" sm="4" md="4">
                                    <v-text-field v-model="payment_date" :rules="inputRules" oninput="validity.valid||(value='');" label="Enter the no. of days from the date of payment" outlined type="number" :min="0"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="4" md="4">
                                    <span class="text-align">Select Approved Buyers</span>
                                </v-col>
                                <v-col cols="4" sm="4" md="4">
                                    <v-combobox 
                                        v-model="select_list" 
                                        :items="select_list_items" 
                                        item-text="full_name" 
                                        item-value="username" 
                                        label="Search & Select from the list"
                                        outlined
                                        multiple
                                        clearable
                                        chips
                                        :rules="inputRules"
                                        ref="brandAutocomplete"
                                        ></v-combobox>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="4" md="4">
                                    <span class="text-align">Additional Information</span>
                                </v-col>
                                <v-col cols="2" sm="8" md="8">
                                    <v-textarea v-model="add_remarks" label="Add Remarks here" outlined></v-textarea>
                                </v-col>
                               </v-row>
                            </div>
                            <v-card-actions class="submit-actions">
                              <div>
                                <img src="@/assets/images/icons/bb-price-engine.png" class="img-fluid" />
                              </div>
                                <v-spacer></v-spacer>
                                <v-btn dark color="primary" style="margin-top: 18px;" :disabled="number > 0" @click="republishLot">REPUBLISH</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-form>
            </template>

        </v-card>
        <!-- Add images Popup -->
        <v-row justify="center">
      <v-dialog v-model="addImagesPopup" persistent max-width="830px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Select images</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeImageDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text class="mt-3">
              <v-row>
                <v-col v-for="(image, index) in lotImages" :key="image" cols="3">
                  <div class="image-container">
                <div class="checkbox-container">
                  <v-checkbox v-model="selectedImages[index]"></v-checkbox>
                </div>                
                  <img :src="image" alt="Lot Image" class="image-rad-size" @click="openImagePopupSingle(image)"/>
                  <div class="cancel-icon" @click="removeImage(index)">
                      <v-icon>mdi-close</v-icon>
                  </div>
                  </div>
                </v-col>
              </v-row>
              <label for="fileInput" class="icon-container">
          <v-icon color="#91C6FF" class="custom-icon" size="25">mdi-plus</v-icon>
        </label>
        <input type="file" id="fileInput" accept="image/*" @change="handleImageUpload" multiple style="display: none;" ref="fileInput"/>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="closeImageDialog">Cancel</v-btn>
            <v-btn color="primary" @click="handleImageSelectionAndClose" class="mb-3">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
     <!-- Add Videos Popup -->
     <v-row justify="center">
      <v-dialog v-model="addVideosPopup" persistent max-width="830px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Select images</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="addVideosPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text class="mt-3">              
               <span class="icon-container"> <v-icon color="#91C6FF" class="custom-icon" size="25">mdi-plus</v-icon></span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="addVideosPopup = false">Cancel</v-btn>
            <v-btn color="primary" class="mb-3">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

      <v-dialog v-model="imagePopup" max-width="600px">
    <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="imagePopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
      <v-img :src="selectedImage" width="100%" contain></v-img>
    </v-card>
  </v-dialog>


    </div>
</template>
<script>
import $ from 'jquery';
import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { METHODS } from 'http';
import inlineTimePicker from '../../../../commoncomponents/inlineTimePicker.vue';
import { DynamicHeightMixin } from '../../../../commoncomponents/DynamicHeightMixin';
export default {
  mixins: [DynamicHeightMixin],
    data() {
        return {
            ids: [],
            alert: false,
            alert_type: "success",
            alert_message: "success",
            headerText: "Liquidation",
            createLotComtBidding:true,
            isLoading: false,
            lot_name:'',
            lot_desc:'',
            bid_value:'',
            bid_value_items:[1,10,100,1000,10000,100000],
            // bid_value_items:[
            //     {
            //         "id":'1',
            //         "value":"1"
            //     },
            //     {
            //         "id":'10',
            //         "value":"10"
            //     },
            //     {
            //         "id":'100',
            //         "value":"100"
            //     },
            //     {
            //         "id":'1000',
            //         "value":"1000"
            //     },
            //     {
            //         "id":'10000',
            //         "value":"10000"
            //     },
            //     {
            //         "id":'100000',
            //         "value":"10000"
            //     }
            // ],
            bid_incr_price:'',
            floor_price:'',
            files:[],
            videos_files:[],
            reserve_price:'',
            buy_now_price:'',
            bid_start_date:null,
            menu1: false,
            menu_1:false,
            time1: null,
            menu2:false,
            bid_end_date:null,
            menu_2:false,
            time2:null,
            payment_date:'',
            select_list:[],
            select_list_items:'',
            addImagesPopup:false,
            addVideosPopup:false,
            add_remarks:'',
            successmessage:'',
            lotImages: [],
            imagePopup: false,
            selectedImage: '',
            time:'',
            lotImageNames:[],
            lotImagesUrl:[],
            templotImagesUrl : [],
            action:'',
            lotIdB2b:'',
            lotImagesFileFormat:[],
            templotImagesFileFormat : [],
            lot_details:[],
            removedImages:[],
            tempRemovedImages : [],
            responseErrors:'',
            initialLotImagesLength: 0,
            primary_code: "#0275d8",
            fullPage : true,
            biddingMethod:'',
            mrp_value : '',
            selectedImages:[],
            temp_lotImages : '',
            temp_lotImageNames : '',
            temp_lotImagesFileFormat : '', 
            number:0,
            moduler: [
              v => !!v || 'The field is required',
              (v) => /^\d+$/.test(v) || 'Enter a valid number',
              (v) => v % this.bid_value === 0 || ' Buy now price should be multiple of bid value'],
            moduleredit: [
              v => !!v || 'The field is required',
              (v) => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
              (v) => this.formatNumber(v) % this.bid_value === 0 || 'Buy now price should be multiple of bid value',
              (v) => this.formatNumber(v) < this.formatNumber(this.mrp_value) || 'Buy now price should be less than mrp'],
            inputRules: [v => !!v || "The field is required"],
            buy_now_rule: [ v => !!v || 'The field is required',
            (v) => /^\d+$/.test(v) || 'Enter a valid number',
          v => (Number(v) <= Number(this.buy_now_price)) || 'Reserve Price Now should be equal or less then  Buy Now Price',
          v => (v % this.bid_value === 0 || 'Reserve price should be multiple of bid value')
        ],
        buy_now_rule_edit: [ v => !!v || 'The field is required',
        (v) => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
          v => (this.formatNumber(v) <= this.formatNumber(this.buy_now_price)) || 'Reserve Price Now should be equal or less then  Buy Now Price',
          v => (this.formatNumber(v) % this.bid_value === 0 || 'Reserve price should be multiple of bid value')
        ],
          floor_price_rule: [ v => !!v || 'The field is required',
          (v) => /^\d+$/.test(v) || 'Enter a valid number',
          v => (Number(v) < Number(this.reserve_price)) || 'Floor Price shoud be less than Reserve Price',
          v => (v % this.bid_value === 0 || 'Floor price should be multiple of bid value')
        ],
        floor_price_rule_edit: [ v => !!v || 'The field is required',
        (v) => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
          v => (this.formatNumber(v) < this.formatNumber(this.reserve_price)) || 'Floor Price shoud be less than Reserve Price',
          v => (this.formatNumber(v) % this.bid_value === 0 || 'Floor price should be multiple of bid value')
        ],
          bid_icre_price_rule: [ v => !!v || 'The field is required',
          (v) => /^\d+$/.test(v) || 'Enter a valid number',
          v => (Number(v) < Number(this.reserve_price)) || 'Floor Price shoud be less than Buy Now Price',
          v => (v % this.bid_value === 0 || 'Bid increament price should be multiple of bid value')],

          // bid_icre_price_rule_edit: [ v => !!v || 'The field is required',
          // (v) => /^\d+$/.test(v) || 'Enter a valid number',
          // v => (Number(v) < Number(this.reserve_price)) || 'Floor Price shoud be less than Buy Now Price',
          // v => (v % this.bid_value === 0 || 'Bid increament price should be multiple of bid value')],
        }
    },
    components: {
        HeaderComponent, Loading, inlineTimePicker
    },
    watch: {
    bid_value: {
    immediate: true,
    handler(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$nextTick(() => {
          const refs = [this.$refs.buyNowPrice, this.$refs.reservePrice, this.$refs.floorPrice, this.$refs.bidPrice, this.$refs.reserve_price_input, this.$refs.floor_price_input, this.$refs.bidincr_price_input, this.$refs.buy_now_price_input]; // Add your refs here
          refs.forEach(ref => ref && ref.validate());
        });
      }
    },
  },
  buy_now_price(newValue) {
    if(this.action === 'edit_lot' || this.action === 're_publish' || this.action === 're_publish_payment'){
      this.$refs.reserve_price_input.validate();
    }else if(this.action === 'create_lot'){
      this.$refs.reservePrice.validate();
    }
        
  },
  reserve_price(newValue){
    if(this.action === 'edit_lot' || this.action === 're_publish' || this.action === 're_publish_payment'){
      this.$refs.floor_price_input.validate();
      this.$refs.bidincr_price_input.validate();
    }else if(this.action === 'create_lot'){
      this.$refs.floorPrice.validate();
      this.$refs.bidPrice.validate();
    }
  },
   select_list(newValue) {
    if (newValue && newValue.length > 0) {
      this.$nextTick(() => {
      this.$refs.brandAutocomplete.internalSearch = '';
      });
    }
  },
},
   computed: {

  buyNowValidationRules() {
    const rules = [
      v => !!v || 'The field is required',
      v => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
      v => (Number(this.formatNumber(v)) < Number(this.formatNumber(this.mrp_value))) || 'Buy now price should be less than mrp',
    ];
    let bidValue = this.bid_value;
    if (typeof this.bid_value === 'object') {
      bidValue = this.bid_value.value;
    }
    if ([1, 10, 100, 1000, 10000].includes(parseInt(bidValue))) {
      rules.push(v => Number(this.formatNumber(v)) % parseInt(bidValue) === 0 || 'Buy now price should be multiple of bid value');
      // rules.push(v => v < Number(this.mrp_value) || 'Buy now price should2222 be multiple of bid value');
    }
    return rules;
  },
  reserveValidationRules() {
    const rules = [
      v => v !== null && v !== undefined || 'The field is required',
      v => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
      v => (Number(this.formatNumber(v)) <= Number(this.formatNumber(this.buy_now_price))) || 'Reserve Price Now should be equal or less then  Buy Now Price',
    ];
    
    let bidValue = this.bid_value;
    if (typeof this.bid_value === 'object') {
      bidValue = this.bid_value.value;
    }
    if ([1, 10, 100, 1000, 10000].includes(parseInt(bidValue))) {
      rules.push(v => Number(this.formatNumber(v)) % parseInt(bidValue) === 0 || 'Buy now price should be multiple of bid value');
    }
    
    return rules;
  },
  floorNowValidationRules() {
    const rules = [
      v => v !== null && v !== undefined || 'The field is required',
      v => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
      v => (Number(this.formatNumber(v)) < Number(this.formatNumber(this.reserve_price))) || 'Floor Price shoud be less than Reserve Price',
    ];
    
    let bidValue = this.bid_value;
    if (typeof this.bid_value === 'object') {
      bidValue = this.bid_value.value;
    }
    if ([1, 10, 100, 1000, 10000].includes(parseInt(bidValue))) {
      rules.push(v => Number(this.formatNumber(v)) % parseInt(bidValue) === 0 || 'Buy now price should be multiple of bid value');
    }
    
    return rules;
  },
  bidIncreValidationRules() {
      const rules = [
        v => v !== null && v !== undefined || 'The field is required',
        v => /^\d+$/.test(v) || 'Enter a valid number',
        v => (Number(v) < Number(this.buy_now_price)) || 'Bid increament price shoud be less than Buy Now Price',
      ];

      let bidValue = this.bid_value;
      if (typeof this.bid_value === 'object') {
        bidValue = this.bid_value.value;
      }
      if ([1, 10, 100, 1000, 10000].includes(parseInt(bidValue))) {
        rules.push(v => v % parseInt(bidValue) === 0 || 'Buy now price should be multiple of bid value');
      }

      return rules;
    },
    allow_start_time() {
      if (this.lot_details.start_time || this.lot_details.start_date) {
        let bid_start_date;
        let bid_start_time;
        if(this.lot_details.start_time ){
          bid_start_date = this.dateForCalander(this.lot_details.start_time, 'date')
          bid_start_time = this.dateForCalander(this.lot_details.start_time, 'time')
        } else {
          bid_start_date = this.dateForCalander(this.lot_details.start_date, 'date')
          bid_start_time = this.dateForCalander(this.lot_details.start_date, 'time')
        }
        this.time1 = bid_start_time
        const st_time = this.currentDateAndTime();
        let todaysDate = this.dateForCalander(st_time, 'date')
        let todaysTime = this.dateForCalander(st_time, 'time')
        if (bid_start_date && (bid_start_date === this.bid_start_date)) {
          return bid_start_time
        } else if(this.bid_start_date == todaysDate && (this.action == 're_publish_payment' || this.action === 're_publish')){
          this.time1 = todaysTime;
          return this.time1;
        } else {
          return "00:00"
        }
      }else if(this.responseErrors.length > 0){
        const st_time = this.currentDateAndTime();
        let bid_start_date = this.dateForCalander(st_time, 'date')
        let bid_start_time = this.dateForCalander(st_time, 'time')
        this.time1 = bid_start_time
        if (bid_start_date && (bid_start_date === this.bid_start_date)) {
          return bid_start_time
        } else {
          return "00:00"
        }
    }
    },
    allow_end_time() {
      if (this.lot_details.end_time || this.lot_details.end_date) {
        let bid_start_date;
        let bid_start_time;
        if(this.lot_details.start_time ){
          bid_start_date = this.dateForCalander(this.lot_details.start_time, 'date')
          bid_start_time = this.dateForCalander(this.lot_details.start_time, 'time')
        } else {
          bid_start_date = this.dateForCalander(this.lot_details.start_date, 'date')
          bid_start_time = this.dateForCalander(this.lot_details.start_date, 'time')
        }
        if(this.time1 !== bid_start_date && (this.bid_start_date === this.bid_end_date)){
          if(!this.time2 || (this.time2 && this.time2<this.time1))
         { this.time2 = this.time1 }
          return this.time1
        }else if (bid_start_date && (bid_start_date === this.bid_end_date)) {
          return bid_start_time
        } else {
          return "00:00"
        }
      }else if(this.responseErrors.length > 0){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}`;
        const st_time = `${formattedDate} ${formattedTime}`;
        let bid_start_date = this.dateForCalander(st_time, 'date')
        let bid_start_time = this.dateForCalander(st_time, 'time')
        if(this.time1 !== bid_start_date && (this.bid_start_date === this.bid_end_date)){
          if(!this.time2 || (this.time2 && this.time2<this.time1))
         { this.time2 = this.time1 }
          return this.time1
        }else if (bid_start_date && (bid_start_date === this.bid_end_date)) {
          return bid_start_time
        } else {
          return "00:00"
        }
    }
    },
    minium_end_date() {
      let date1 = new Date(this.bid_start_date)
      let date2 = new Date(this.bid_end_date)
      if (date1 > date2) {
        this.bid_end_date = this.bid_start_date
        return this.bid_start_date
      } else if (date1 < date2) {
        return this.bid_start_date
      } else if (date1 === date2) {
        return this.bid_start_date
      }
      else {
        return new Date().toISOString().substr(0, 10)
      }
    },
    selectedImages() {
    return new Array(this.lotImages.length).fill(false);
  },
  selectedCount() {
    return this.selectedImages.filter(selected => selected).length;
  },
  formattedStartDate() {
      if (this.bid_start_date) {
        const date = new Date(this.bid_start_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      return '';
    },
    formattedEndDate(){
      if (this.bid_end_date) {
        const date = new Date(this.bid_end_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      return '';
    },
    format_buy_now_price : {
        get() {
          return this.buy_now_price ? this.formatCurrency(this.buy_now_price) : "";
        },
        set(value) {
          const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
          this.buy_now_price = isNaN(numericValue) ? '' : numericValue;
        },        
    },

    format_reserve_price: {
        get() {
          return this.reserve_price ? this.formatCurrency(this.reserve_price) : "";
        },
        set(value) {
          const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
          this.reserve_price = isNaN(numericValue) ? '' : numericValue;
        },        
    },
    
    format_floor_price: {
        get() {
          return this.floor_price ? this.formatCurrency(this.floor_price) : "";
        },
        set(value) {
          const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
          this.floor_price = isNaN(numericValue) ? '' : numericValue;
        },        
    },
  },
    async created() {
        this.action = this.$store.state.action
        this.loadApproverbuyers();       
        if(this.action === 'create_lot'){
          this.ids = this.$store.state.lotIds;
          await this.invonteryDataUpdate()
          await this.invonteryDataUpdateImages()
          this.$refs.createForm.reset();
          this.mrp_value = this.formatCurrency(this.$store.state.inventoryId);
        }else if(this.action === 'edit_lot'){
          this.lotIdB2b = this.$store.state.lotIds;
          this.isLoading = true;
          await this.editLotDataUpdate();
          this.loadImagesurls()           
        }else if(this.action === 're_publish' || this.action === 're_publish_payment'){
          const id = this.$store.state.lotIds;
          this.isLoading = true;
          this.lotIdB2b = parseInt(id[0])
          await this.editLotDataUpdate();
          this.loadImagesurls()           
        }    
    },
    methods:{
      currentDateAndTime(){
        const currentDate = new Date();
        const currentMinutes = currentDate.getMinutes();
        const minutesToAdd = 30 - (currentMinutes % 15 || 15);
        const roundedDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        const year = roundedDate.getFullYear();
        const month = String(roundedDate.getMonth() + 1).padStart(2, '0');
        const day = String(roundedDate.getDate()).padStart(2, '0');
        const hours = String(roundedDate.getHours()).padStart(2, '0');
        const minutes = String(roundedDate.getMinutes()).padStart(2, '0');
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}`;
        const st_time = `${formattedDate} ${formattedTime}`;
        return st_time;
      },

      formatNumber(value){
        return typeof value === 'string' ? Number(value.replace(/,/g, '')) : value
      },

      formatCurrency(value) {
        let number = typeof value === 'string' ? value.replace(/,/g, '') : value
        return Number(number) ?  Number(number).toLocaleString('en-IN') : null;
      },

      allowedStep: m => m % 15 === 0, 
      scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
      validateRemainder(value) {
            var remainder = value % this.bid_value;        
          if (remainder === 0) {
            return "valid";
          } else {
            return "invalid";
          }
      },
      invonteryDataUpdate(){ 
        let lotIds = JSON.parse(this.$store.state.lotIds)          
          // for (var i = 0; i < lotIds.length; i++) {
          //   formData.append("liquidation_ids[]", lotIds[i]);
          // }  
        this.$http.secured
        .get(`/api/v2/warehouse/liquidation/competitive_bidding_price/calculate_ai_price?inventory_ids[]=${lotIds}`)
        .then(response => {
          if (response.data) {  
            if(response.data.errors){
              this.responseErrors = response.data.errors
              this.$toast.error("AI price is not available for this. Please fill the details manually")
            }else{          
            this.lot_details = response.data.prices            
            const floorPrice = this.lot_details.floor_price
            this.loading = false;
            if(floorPrice > 0){
              this.setInventoryParams();
            }else{
              this.$toast.error("AI price is not available for this. Please fill the details manually")
            }
          }
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
      setInventoryParams(){        
        this.buy_now_price   = this.lot_details.buy_now_price
        this.floor_price     = this.lot_details.floor_price
        this.reserve_price   = this.lot_details.reserve_price
        this.bid_incr_price  = this.lot_details.bid_increment_price   
        this.bid_value       = this.lot_details.bid_multiple
        this.payment_date    = this.lot_details.delivery_days     
        this.bid_start_date  = this.dateForCalander(this.lot_details.start_time,'date')
        this.bid_end_date    = this.dateForCalander(this.lot_details.end_time, 'date')
        this.time1           = this.dateForCalander(this.lot_details.start_time,'time')
        this.time2           = this.dateForCalander(this.lot_details.end_time,'time')
      },
        createContractLot(){
          this.number++;
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
        if (this.$refs.createForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0
          }else{
            this.handleImageSelectionAndClose();
          const formData = new FormData();
          formData.append("lot_name", this.lot_name)
          formData.append("lot_desc", this.lot_desc)
          formData.append("start_date", (this.bid_start_date + " " + this.time1))
          formData.append("end_date", (this.bid_end_date + " " + this.time2))
          formData.append("floor_price",  this.formatNumber(this.floor_price))
          formData.append("reserve_price", this.formatNumber(this.reserve_price))
          formData.append('buy_now_price', this.formatNumber(this.buy_now_price))
          formData.append("increment_slab",this.bid_incr_price)          
          formData.append("lot_image_urls", this.files)
          formData.append("delivery_timeline", this.payment_date)
          formData.append("additional_info", this.add_remarks)
          formData.append('bid_value_multiple_of', this.bid_value)
          for(var i=0; i < this.select_list.length; i++){
            formData.append("approved_buyer_ids[]", this.select_list[i].username)
          }
          for(var i=0; i < this.templotImagesFileFormat.length; i++){
            formData.append("images[]", this.templotImagesFileFormat[i])
          }
          for(var i=0; i < this.templotImagesUrl.length; i++){
            formData.append("image_urls[]", this.templotImagesUrl[i])
          }
          for(var i=0; i < this.tempRemovedImages.length; i++){
            formData.append("removed_urls[]", this.tempRemovedImages[i])
          }

          let lotIds = JSON.parse(this.$store.state.lotIds)
          
          for (var i = 0; i < lotIds.length; i++) {
            formData.append("liquidation_ids[]", lotIds[i]);
          }
          this.isLoading = true
          this.$http.secured
          .post("api/v2/warehouse/liquidation/competitive_bidding_price/create_lot", formData,{
              headers: {
              'Content-Type': 'multipart/form-data'
                  }
         }     )
          .then(response => {
            if (response.data) {    
              this.isLoading = false
              this.$router.push({ name: "liquidationNew"});
              this.files         = [];
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
              this.$store.commit('setMessage', 
              { 
                responseMessage: response.data.message,
                action: 'create_lot'
              });
              this.lotImagesFileFormat = ''
              this.lotImages = ''
              this.lotImageNames = ''
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
              this.isLoading = false
              this.number = 0
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.isLoading = false
          }); 
        }}else{
          this.number = 0
        }
        },
        dateformat(dateString){
        let dateTimeParts = dateString.split(' ');
        let timeParts     = dateTimeParts[1].split(':');
        let dateParts     = dateTimeParts[0].split('-');
        let date = new Date(dateParts[0],parseInt(dateParts[1], 10) - 1,dateParts[2],timeParts[0], timeParts[1])
        return date;
      },
      showAlert(alert_type, alert_message) {
        this.scrollToTop();
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },
      alertTimeOut() {
        setTimeout(() => {this.alert = false;}, 3000);
      },
      loadApproverbuyers(){
        this.$http.secured.get("api/v2/warehouse/liquidation/competitive_bidding_price/buyers")
        .then(response => {
            this.select_list_items = response.data.buyer_masters
            this.biddingMethod = response.data.bidding_method
            // this.loading = false;
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            // this.loading = false;
        });
      },
      openImagePopup(){
        this.initialLotImagesLength = this.lotImages.length;
        this.addImagesPopup = true;   
        const _ = require('lodash');
        this.temp_lotImages = _.cloneDeep(this.lotImages);
        this.temp_lotImagesFileFormat = _.cloneDeep(this.lotImagesFileFormat);
        this.temp_lotImageNames = _.cloneDeep(this.lotImageNames);
     
      },
      loadImagesurls(){
        let lotIds = JSON.parse(this.$store.state.lotIds)
        this.lotImages = [];
        this.lotImageNames = [];
        this.$http.secured.get(`api/v2/warehouse/liquidation_order/b2b/pending_publish/${lotIds}/lot_images`)
        .then(response => {
             const lotImages = response.data.lot_images;
             lotImages.forEach(image => {
             this.lotImageNames.push(image.file_name);
             this.lotImages.push(image.url);
      });
            this.loading = false;
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
      },
      handleImageUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.lotImageNames.push(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
          const binaryData = e.target.result;
          this.lotImages.push(reader.result);
          this.lotImagesFileFormat.push(file);
        };

        // Read the image file as binary data
        reader.readAsDataURL(file);
      }
      // this.initialLotImagesLength = this.lotImages.length;
    },
  openImagePopupSingle(image) {
    this.selectedImage = image;
    this.imagePopup = true;
  },
  removeImage(index) {
    const removedImage = this.lotImages[index]; 
    this.lotImagesFileFormat = this.lotImagesFileFormat.filter(item => {
      return item.name != this.lotImageNames[index]
    });
    this.lotImagesUrl.splice(index, 1);
    this.lotImages.splice(index, 1);
    this.lotImageNames.splice(index, 1);
    this.selectedImages.splice(index, 1);
    // this.lotImagesFileFormat.splice(index, 1);
    this.removedImages.push(removedImage);
    this.$refs.fileInput.value = null;
  },
  getImageName(imageUrl) {
    const urlParts = imageUrl.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    return fileName;
  },
      openVideosPopup(){
       this.addVideosPopup = true;
      },
      editLotDataUpdate(){  
        this.$http.secured
        .get(`api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.lotIdB2b}`)
        .then(response => {
          if (response.data) {
            this.lot_details = response.data.liquidation_order
            this.isLoading = false;
            this.loading = false;
            this.setEditLotParams()
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
      setEditLotParams(){
        this.lot_name        = this.lot_details.lot_name
        this.lot_desc        = this.lot_details.lot_desc
        this.bid_value       = this.lot_details.bid_value_multiple_of
        this.buy_now_price   = this.lot_details.buy_now_price
        this.floor_price     = this.lot_details.floor_price
        this.reserve_price   = this.lot_details.reserve_price
        this.bid_incr_price  = this.lot_details.increment_slab    
        this.mrp_value       = this.formatCurrency(this.lot_details.mrp)
        if(this.lot_details.start_date) {   
          this.bid_start_date  = this.dateForCalander(this.lot_details.start_date,'date');
        } else {
          this.bid_start_date  = this.dateForCalander(this.currentDateAndTime(),'date');
        }
        if(this.lot_details.end_date){
          this.bid_end_date    = this.dateForCalander(this.lot_details.end_date, 'date')
        } else {
          this.bid_end_date    = this.dateForCalander(this.currentDateAndTime(),'date');
        }
        if(this.lot_details.start_date){
          this.time1           = this.dateForCalander(this.lot_details.start_date,'time')
        } else {
          this.time1           = this.dateForCalander(this.currentDateAndTime(),'time');
          this.lot_details.start_date = this.currentDateAndTime();
        }
        if(this.lot_details.end_date){
          this.time2           = this.dateForCalander(this.lot_details.end_date,'time')
        } else {
          this.time2           = this.dateForCalander(this.currentDateAndTime(),'time');
          this.lot_details.end_date = this.currentDateAndTime();
        }
        this.add_remarks     = this.lot_details.additional_info
        this.payment_date= this.lot_details.delivery_timeline
        const temp    = this.lot_details.approved_buyer_ids
        temp.forEach((username) => {
            const foundObject = this.select_list_items.find((obj) => obj.username === username);
            this.select_list.push(foundObject);
        });

        const lotImagesUrl       = this.lot_details.lot_image_urls
        lotImagesUrl.forEach(image => {
        this.lotImagesUrl.push(image);
      });      
        // this.order_amount    = item.order_amount
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
     
      editLotSave(){
        this.number++;
        this.handleImageSelectionAndClose();
        let lotIds = JSON.parse(this.$store.state.lotIds)
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)

        const bueyr_list = [];
        this.select_list.forEach(image => {
          bueyr_list.push(image.vendor_code);
         });
         const image_urls = [];
         this.lotImagesUrl.forEach(urls =>{
          image_urls.push(urls)
         })
        if (this.$refs.editLotForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0
          }else{
            const formData = new FormData();
          formData.append("lot_name", this.lot_name)
          formData.append("lot_desc", this.lot_desc)
          formData.append("start_date", (this.bid_start_date + " " + this.time1))
          formData.append("end_date", (this.bid_end_date + " " + this.time2))
          formData.append("floor_price",   this.floor_price)
          formData.append("reserve_price", this.reserve_price)
          formData.append('buy_now_price',this.buy_now_price)
          formData.append("increment_slab",this.bid_incr_price)
          formData.append("delivery_timeline", this.payment_date)
          formData.append("additional_info", this.add_remarks)
          formData.append('bid_value_multiple_of', this.bid_value)

          for (var i = 0; i < this.select_list.length; i++) {
              var selectedUsername = this.select_list[i].username;
              if (selectedUsername) {
                formData.append("approved_buyer_ids[]", selectedUsername);
              } else {
                formData.append("approved_buyer_ids[]", this.select_list[i]);
              }
          }
          for(var i=0; i < this.templotImagesFileFormat.length; i++){
            formData.append("images[]", this.templotImagesFileFormat[i])
          }
          for(var i=0; i < this.templotImagesUrl.length; i++){
            formData.append("image_urls[]", this.templotImagesUrl[i])
          }
          for(var i=0; i < this.tempRemovedImages.length; i++){
            formData.append("removed_urls[]", this.tempRemovedImages[i])
          }
            

          let lotIds = JSON.parse(this.$store.state.lotIds)
          
          // for (var i = 0; i < lotIds.length; i++) {
          //   formData.append("liquidation_ids[]", lotIds[i]);
          // }
          this.isLoading = true
          this.$http.secured
          .put(`/api/v2/warehouse/liquidation_order/b2b/pending_publish/${lotIds}`, formData,{
              headers: {
              'Content-Type': 'multipart/form-data'
                  }
         })
          .then(response => {
            if (response.data) {  
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
              this.$store.commit('setMessage', { 
                responseMessage: response.data.message,
                action:'edit_lot'
              });
              this.isLoading = false    
              this.$router.push({ name: "liquidationNew"});
              this.showAlert("success", "Lot Created For Selected Inventory");
              this.files         = [];
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
              this.isLoading = false
              this.number = 0
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.isLoading = false
          }); 
        }}else{
          this.number = 0
        }
        },

        republishLot(){
          this.number++;
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
        if (this.$refs.republishLotForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0
          }else{
          this.handleImageSelectionAndClose();
          const formData = new FormData();
          formData.append("lot_name", this.lot_name)
          formData.append("lot_desc", this.lot_desc)
          formData.append("start_date", (this.bid_start_date + " " + this.time1))
          formData.append("end_date", (this.bid_end_date + " " + this.time2))
          formData.append("floor_price",   this.formatNumber(this.floor_price))
          formData.append("reserve_price", this.formatNumber(this.reserve_price))
          formData.append('buy_now_price', this.formatNumber(this.buy_now_price))
          formData.append("increment_slab",this.bid_incr_price)
          formData.append("delivery_timeline", this.payment_date)
          formData.append("additional_info", this.add_remarks)
          formData.append('bid_value_multiple_of', this.bid_value)
          formData.append('id', this.lotIdB2b)

          for (var i = 0; i < this.select_list.length; i++) {
              var selectedUsername = this.select_list[i].username;
              if (selectedUsername) {
                formData.append("approved_buyer_ids[]", selectedUsername);
              } else {
                formData.append("approved_buyer_ids[]", this.select_list[i]);
              }
          }
          for(var i=0; i < this.templotImagesFileFormat.length; i++){
            formData.append("images[]", this.templotImagesFileFormat[i])
          }
          for(var i=0; i < this.templotImagesUrl.length; i++){
            formData.append("image_urls[]", this.templotImagesUrl[i])
          }
          for(var i=0; i < this.tempRemovedImages.length; i++){
            formData.append("removed_urls[]", this.tempRemovedImages[i])
          }

          let lotIds = JSON.parse(this.$store.state.lotIds)
          
          // for (var i = 0; i < lotIds.length; i++) {
          //   formData.append("liquidation_ids[]", lotIds[i]);
          // }
          this.isLoading = true
          this.$http.secured
          .post(`/api/v2/warehouse/liquidation_order/pending/decision/republish`, formData,{
              headers: {
              'Content-Type': 'multipart/form-data'
                  }
         })
          .then(response => {
            if (response.data) {
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
              if(this.action == 're_publish'){
                this.$store.commit('setMessage',
               { 
                responseMessage: response.data.message,
                action : 're_publish'
              });
              }else{
                this.$store.commit('setMessage',
               { 
                responseMessage: response.data.message,
                action : 're_publish_return_payment'
              });
              }
              
              this.$router.push({ name: "liquidationNew"});
              this.showAlert("success", "Lot Created For Selected Inventory");
              this.files         = [];
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
              this.isLoading = false
              this.number = 0
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.isLoading = false
          }); 
        }}else{
          this.number = 0
        }
        },
        closeImageDialog() {        
        const _ = require('lodash');
        this.lotImages = _.cloneDeep(this.temp_lotImages);
        this.lotImageNames = _.cloneDeep(this.temp_lotImageNames);
        this.lotImagesFileFormat = _.cloneDeep(this.temp_lotImagesFileFormat);
        this.$refs.fileInput.value = null;   
          // const newImagesCount = this.lotImages.length - this.initialLotImagesLength;
          // if (newImagesCount > 0) {
          //   // Remove newly added images if any
          //   this.lotImages.splice(this.initialLotImagesLength, newImagesCount);
          //   this.lotImageNames.splice(this.initialLotImagesLength, newImagesCount);
          //   this.lotImagesFileFormat.splice(this.initialLotImagesLength, newImagesCount);
          // }
          this.addImagesPopup = false;
        },
        validatePositiveNumber() {
          const numberValue = Number(this.payment_date);
          if (Number.isInteger(numberValue) && numberValue > 0) {
            this.payment_date = numberValue;
          } else {
            this.payment_date = null;
          }
        },
        clearImage(index) {
        this.lotImages.splice(index, 1);
       },
       handleImageSelection() {
        this.tempRemovedImages = [];
        this.templotImagesFileFormat = [];
        this.templotImagesUrl = [];
          this.lotImages.forEach((image, index) => {
            if(this.lotImagesUrl.includes(image)){
              if (this.selectedImages[index]) {
                this.templotImagesUrl.push(image); 
              } else {
                this.tempRemovedImages.push(image); 
              }
            } else{ 
              var x = -1;
              this.lotImagesFileFormat.forEach((item,y) =>{ if(item.name == this.lotImageNames[index]){ x=y; }});
              if(x!=-1 && this.selectedImages[index]){
                this.templotImagesFileFormat.push(this.lotImagesFileFormat[x]);
              }
            }
          });
          this.addImagesPopup = false;
        },
       handleImageSelectionAndClose() {
        if(this.selectedCount == 0){
          this.tempRemovedImages = this.removedImages;
          this.templotImagesFileFormat = this.lotImagesFileFormat;
          this.templotImagesUrl = this.lotImagesUrl;
        } else {
          this.handleImageSelection(); 
        }
        this.addImagesPopup = false;
      },
      invonteryDataUpdateImages(){ 
        let lotIds = JSON.parse(this.$store.state.lotIds)          
          // for (var i = 0; i < lotIds.length; i++) {
          //   formData.append("liquidation_ids[]", lotIds[i]);
          // }  
        this.$http.secured
        .get(`/api/v2/warehouse/liquidation/competitive_bidding_price/inventories_images?liquidation_ids=${lotIds}`)
        .then(response => {
          if (response.data) { 
            // this.lotImages = response.data.images
            // this.lotImagesUrl = response.data.images
            const lotImages = response.data.images
            var i = 1
            lotImages.forEach(image => {
             this.lotImageNames.push(i++);
             this.lotImages.push(image);
             this.lotImagesUrl = response.data.images
            })
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
<style scoped>
 .text-align{
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #0C0C0C;
 }
 .custom-control_outlined .v-expansion-panel:before {
    box-shadow: none;
  }
  .custom-control_outlined button {
    min-height: 56px;
    border-width: 1px;
    border-color: rgba(0,0,0,.42);
    border-style: solid;
  }
  .custom-control_outlined button:focus {
    outline: none;
  }
  .icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border: 1px solid #91C6FF;
}
.selected_rule_box{
  display: flex;
  flex-wrap: wrap;
}
.rule-type_option {
  border: 1px solid #000000;
  padding: 4px 8px;
  border-radius: 5px;
  margin: 1px 2px;
}
.custom-icon {
  font-size: 48px !important; /* Adjust the font size as needed */
}
.image-container {
    position: relative;
    display: inline-block;
}

.lot-image {
    width: 186px;
    height: 184px;
    cursor: pointer;
}

.cancel-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    background-color: #ffff;
}
.image-rad-size{
  width: 186px;
  height: 184px;
  border-radius: 8px;
}
.checkbox-container {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  margin: 0px !important;
}
.checkbox-container .v-input--selection-controls{
  margin: 0 !important;
  padding: 0 !important;
}
.checkbox-container .v-input--selection-controls__input{
  background-color: #ffff;
}
.form-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.dynamic-height-form {
  height: calc(var(--vh, 1vh) * 100 - 76px); /* Adjust the header height accordingly */
  overflow-y: auto;
}
.submit-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px; /* Adjust padding as needed */
  background-color: white;
  position: sticky;
  bottom: 0;
  width: 100%;
}

</style>
