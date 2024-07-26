<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- alert message -->
    <div> <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert> </div>
    <!-- popup dailogs -->
    <v-row justify="center">
      <v-dialog v-model="allocateTob2bdailog" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="allocateTob2bdailog = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to allocate the following {{ this.selected.length }} items to B2B? </span><br>
            </v-row>
            <!-- <v-row>
              <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                <v-simple-table class="gray-border v-data-simple-adjust">
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">Total items</th>
                        <th class="text-right">{{ this.selected.length }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selected" :key="item.id" class="d-inline-block m-1">
                        <td>{{item.tag_number}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row> -->
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="allocateTob2bdailog = false">Cancel</v-btn>
            <v-btn small color="primary" @click="allocationchanel">SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="allocateTob2cdailog" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="allocateTob2cdailog = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to allocate the following {{ this.selected.length }} items to B2C? </span><br>
            </v-row>
            <!-- <v-row>
              <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                <v-simple-table class="gray-border v-data-simple-adjust">
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">Total items</th>
                        <th class="text-right">{{ this.selected.length }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selected" :key="item.id" class="d-inline-block m-1">
                        <td>{{item.tag_number}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row> -->
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="allocateTob2cdailog = false">Cancel</v-btn>
            <v-btn small color="primary" @click="allocationchanelb2c">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog for competitive bidding -->
    <v-row justify="center">
      <v-dialog v-model="competitiveBiddibg" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="competitiveBiddibg = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to select Competitive Bidding for the following items? </span><br>
            </v-row>
            <!-- <v-row>
              <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                <v-simple-table class="gray-border v-data-simple-adjust">
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">Total items</th>
                        <th class="text-right">{{ this.selected.length }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selected" :key="item.id" class="d-inline-block m-1">
                        <td>{{ item.id }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row> -->
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="competitiveBiddibg = false">Cancel</v-btn>
            <v-btn small color="primary" @click="competitiveBiddingconfirm">confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Dialog for contracted -->
    <v-row justify="center">
      <v-dialog v-model="contractedPopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="contractedPopup = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to select allocate the following {{ this.selected.length }} items to Contracted? </span><br>
            </v-row>
            <!-- <v-row>
              <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                <v-simple-table class="gray-border v-data-simple-adjust">
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">Total items</th>
                        <th class="text-right">{{ this.selected.length }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selected" :key="item.id" class="d-inline-block m-1">
                        <td>{{item.tag_number}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row> -->
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="contractedPopup = false">Cancel</v-btn>
            <v-btn small color="primary" @click="contractedConfirm">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- moq dialog inentory move in price discovery method -->
    <v-row justify="center">
      <v-dialog v-model="moqLotcreationdilog" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="moqLotcreationdilog = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to allocate the following {{ this.selected.length }} items to MOQ? </span><br>
            </v-row>
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="moqLotcreationdilog = false">Cancel</v-btn>
            <v-btn small color="primary" @click="Moqcreation">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- item move comm to moq -->
     <v-row justify="center">
      <v-dialog v-model="moveItemCommToMoq" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="moveItemCommToMoq = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to allocate the following {{ this.selected.length }} item(s) to MOQ? </span><br>
            </v-row>
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="moveItemCommToMoq = false">Cancel</v-btn>
            <v-btn small color="primary" @click="moveToMAQFromComBidd">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="markewastedailog" max-width="400px">
        <v-card class="v-card-100">
          <v-toolbar style="max-height: 100px;" >
              <v-toolbar-title style="font-weight: 500;">Mark As E-Waste?</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="markewastedailog = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn> 
          </v-toolbar>
          <v-container>
              <v-row class="p-3">
                <v-col cols="6" sm="6" md="6" >        
                  <input type="radio" id="Yes" value="Yes" v-model="picked" />
                  <label for="one">Yes</label>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" sm="6" md="6">
                  <input type="radio" id="No" value="No" v-model="picked" />
                  <label for="two">No</label>
                </v-col>
              </v-row>
            </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="primary"  @click="savemarkeWast" :disabled="number > 0 || !picked ">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- upload file popup -->
    <v-row justify="center">
      <v-dialog v-model="uploadlotfiledilog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Upload Lot file</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeFilePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-col cols="12" sm="12">
                <v-file-input class="upload" v-model="file" e label="Attach CSV File" accept='.csv'></v-file-input>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="primary" @click="fileLotCreatecontract" :disabled="number > 0 || !file">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- lot creation -->
    <v-row justify="center">
      <v-dialog v-model="lotCreationdilog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Create Lot</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopupLotCreate">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="12">
                  <v-text-field  label="Lot Name" outlined v-model="lot_name" type="text"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="12" class="pb-0">
                  <v-autocomplete  v-model="assign_buyer" outlined :items="assign_user_items" item-text="displayText"
                  item-value="id" label="Assign Buyer" ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="12" >
                  <v-simple-table class="gray-border v-data-simple-adjust">
                    <template>
                      <thead>
                        <tr>
                          <th class="text-left">Total items</th>
                          <th class="text-right">{{ this.selected.length }}</th>
                        </tr>
                      </thead>
                      <!-- <tbody>
                        <tr v-for="item in selected" :key="item.id" class="d-inline-block m-1">
                          <td>{{item.tag_number}}</td>
                        </tr>
                      </tbody> -->
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="normal"  class="mb-3" @click="closePopupLotCreate">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="createLotContract" :disabled="!lot_name || !assign_buyer || number > 0">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- confirm dialog -->
    <v-row>
      <v-dialog v-model="confirmDialog" max-width="400px">
        <v-card>
          <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="confirmDialog = false" > <v-icon>mdi-close</v-icon> </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text style="justify-content: center;">
              <span>item succesfully marked as E-wast</span>
            </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="primary" class="mb-3">ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="successpopup" persistent max-width="424px">
        <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeSuccesspopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text v-if="ewasteYes === true" class="text-center" style="margin-bottom: -20px;">
              <span style="color: #F04545;">ERROR!</span>
            </v-card-text>
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
    <v-row justify="center">
      <v-dialog v-model="datadetailpopupdisposition" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span v-if="active_tab === 'In Progress B2B'">
                <span>Publish Information: "{{ publishID }}"</span><span class="creation-date">Creation Date:{{ creationDate}}</span>
              </span>
              <span v-else><span>Lot Information: "{{ id }}"</span><span class="creation-date">Creation Date:{{ creationDate}}</span></span>            
              
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopupdisposition = false" > <v-icon>mdi-close</v-icon> </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container class="p-0">
                <div>
                  <v-row v-if="active_tab === 'In Progress B2B'">
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span class="mr2" style="font-weight: 500;">Lot ID</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_id ? item_details.lot_id : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span class="mr2" style="font-weight: 500;">Lot Name</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_name ? item_details.lot_name : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Lot Type</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_type ? item_details.lot_type : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Lot Category</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_category ? item_details.lot_category : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Floor Price (₹)</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.floor_price ? item_details.floor_price : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Incremental Bid (₹)</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.increment_slab ? item_details.increment_slab : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Reserve Price (₹)</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.reserve_price ? item_details.reserve_price : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Buy Now Price (₹)</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.buy_now_price ? item_details.buy_now_price : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">AI Recommended Price (₹)</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.ai_price ? item_details.ai_price : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Current Highest Bid</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.higest_bid ? item_details.higest_bid : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Start Date & Time</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.start_date ? item_details.start_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">End Date & Time</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.end_date ? item_details.end_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Images</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <a  @click="openDialog" style="color: #1976d2;">
                          <u>View</u>
                        </a>
                        <!-- {{ item_details.reserve_price ? item_details.reserve_price : 'N/A'}} -->
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Videos</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <a style="color: #1976d2;">
                          <u>View</u>
                        </a>
                        <!-- {{ item_details.reserve_price ? item_details.reserve_price : 'N/A'}} -->
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Delivery TimeLine In Days</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.delivery_timeline ? item_details.delivery_timeline : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <a v-if="active_tab == 'Pending B2B Publish'" @click="editinventorydilog" style="color: #1976d2;">
                          <u>View & Edit The Inventory</u>
                        </a>
                        <a v-if="active_tab == 'Pending Decision' || active_tab == 'In Progress B2B'" @click="editinventorydilog" style="color: #1976d2;">
                          <u>View The Inventory</u>
                        </a>
                      </v-col>
                    
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="p-2 d-flex">
                        <a v-if="active_tab == 'Pending B2B Publish'" @click="navigateeditinventorydilogToComponent" style="color: #1976d2;">
                          <u>Edit lot details</u>
                        </a>
                        <v-spacer></v-spacer>
                        <span>                              
                          <span>
                            <img src="@/assets/images/icons/bb-price-engine.png" class="img-fluid" />
                          </span>
                        </span>
                      
                      </v-col>                     
                    </v-row>
                  </div>
                  
              </v-container>
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Image show popup -->
    <v-dialog v-model="dialogVisible" persistent max-width="600">
      <v-card class="v-card-100">
        <v-card-title>
          <span class="headline">Images</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-row>
            <v-col v-for="(imageUrl, index) in imageUrls" :key="index" cols="4">
              <v-img :src="imageUrl" width="100%" contain></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- edit time and date popup -->
    <v-row justify="center" ref="createForm">
      <v-dialog v-model="ecitBidTimeDilog" persistent max-width="780px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Edit Bid Timings</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeEditBidDailog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-form ref="editDateTimeForm">
              <v-row>
                <v-col cols="13" sm="6" md="6">                                    
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="bid_start_date" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined
                      v-model="formattedStartDate"
                      label="Bid Start Date"
                      prepend-inner-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="bid_start_date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu1.save(bid_start_date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="14" sm="6" md="6">                                    
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
                <v-col cols="16" sm="6" md="6">                                    
                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="bid_end_date" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                        v-model="formattedEndDate"
                        label="Bid End Date"
                        prepend-inner-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on" 
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
                <v-col cols="17" sm="6" md="6">                                    
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
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="normal"  class="mb-3" @click="closeEditBidDailog">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="SaveBidTime" :disabled="!bid_start_date || !bid_end_date ||  !time1 || !time2 || number > 0">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- edit inventory -->
    <v-row justify="center">
      <v-dialog v-model="editinventory" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Edit Inventory: {{ id }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="editinventory = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-container>
            <v-row  class="p-3 text-center">
              <span class="text-right">Total Items: {{ this.edit_inventory.length }}</span>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-data-table 
                  :dense="true" 
                  :search="search" 
                  v-model="selected" 
                  disable-pagination 
                  :hide-default-footer="true"
                  :headers="itemsheader" 
                  :items="edit_inventory" 
                  :loading="loading" 
                  loading-text="Loading Data... Please wait"
                  class="elevation-1 v-data-simple-adjust">
                  <template v-slot:item.delete_item="{item}">
                          <img v-if="active_tab == 'Pending B2B Publish'" @click="deleteEvent(item, index)" src="@/assets/images/delete_red.png" title="Delete Item" />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions v-if="active_tab == 'Pending B2B Publish'" style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="editinventory = false">Cancel</v-btn>
            <v-btn small color="primary" @click="allocationchanelb2cconfirm" :disabled="eventDeleteClicked || number > 0" >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- update lote conform -->
    <v-row justify="center">
            <v-dialog v-model="updatelotconfirm" persistent max-width="450px">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Confirmation</span><br>                 
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                  <span>  Are you sure want delete the Items? </span><br>  
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small text color="normal" @click="updatelotconfirm = false">Cancel</v-btn>
                <v-btn small color="primary" @click="allocationchanelb2csubmit">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
    <!-- delete lot -->
    <v-row justify="center">
            <v-dialog v-model="deletelotDilog" persistent max-width="450px">
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
              <v-card-actions style="justify-content: center;">
                <v-btn small text color="normal" @click="deletelotDilog = false">Cancel</v-btn>
                <v-btn small color="primary" @click="deletelotconfirm">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
    <!-- Reserve Lot Form -->
      <v-row justify="center" ref="reserveLotForm">
        <v-dialog v-model="reserveLotPopup" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Reserve Lot "{{ liq_id }}"</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="closePopups"><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
            <v-card-text>
            <v-container>
              <row style="margin-bottom: -25px">
                <input type="radio" id="option1" value="option1" v-model="select_buyer">
                <label for="option1" style="color:#2D2D2D">Select Buyer:</label>
              </row>
              <v-row>
                <v-col cols="1" sm="6" md="6">
                  <v-autocomplete prepend-inner-icon="mdi-magnify" v-model="assign_buyer" outlined :items="assign_user_items" item-text="full_name"
                    item-value="username" label="Buyer Name" :disabled="select_buyer !== 'option1'">
                  </v-autocomplete>
                </v-col>
              </v-row>
              <!-- <row style="margin-bottom: -25px">
                <input type="radio" id="option2" value="option2" v-model="select_buyer">
                <label for="option2">Add New Buyer Details:</label>
              </row>
              <v-row style="margin-bottom: -25px;">
                <v-col cols="1" sm="6" md="6">
                  <v-text-field label="Buyer Name" outlined v-model="buyer_name" type="text"
                    :disabled="select_buyer !== 'option2'">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -25px;">
                <v-col cols="1" sm="6" md="6">
                  <v-text-field label="Address Line 1" outlined v-model="address_line_1" type="text"
                    :disabled="select_buyer !== 'option2'">
                  </v-text-field>
                </v-col>
                <v-col cols="2" sm="6" md="6">
                  <v-text-field label="Address Line 2" outlined v-model="address_line_2" type="text"
                    :disabled="select_buyer !== 'option2'">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -25px;">
                <v-col cols="1" sm="6" md="6">
                  <v-text-field label="City" outlined v-model="city" type="text"
                    :disabled="select_buyer !== 'option2'">
                  </v-text-field>
                </v-col>
                <v-col cols="2" sm="6" md="6">
                  <v-text-field label="State" outlined v-model="state" type="text"
                    :disabled="select_buyer !== 'option2'">
                  </v-text-field>
                </v-col>
              </v-row> -->
            </v-container>
          </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small color="normal"  class="mb-3" @click="closePopups">Cancel</v-btn>
              <v-btn small color="primary" class="mb-3" @click="reserveConfirm" :disabled="!assign_buyer">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Move to b2b dailog -->
    <v-row justify="center">
            <v-dialog v-model="moveToB2B" persistent max-width="424px">
            <v-card class="v-card-100">
              <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="moveToB2B = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span> Are you sure you want to move the selected item to B2B?</span>
            </v-card-text>
              <v-card-actions style="justify-content: center;">
                <v-btn small text color="normal" @click="moveToB2B = false">Cancel</v-btn>
                <v-btn small color="primary" @click="consfirmMoveToB2B">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      <!-- publish dialog details -->
      <v-row justify="center" ref="reserveLotForm">
        <v-dialog v-model="publishDialog" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Update details</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="publishDialog = false"><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
            <v-card-text>
            <v-container>
              <v-form ref="lotPublishForm">
              <v-row>
                <v-col cols="1" sm="12" md="12" class="pb-0">
                  <v-autocomplete v-model="platform" outlined :items="platform_items" item-text="name"
                    item-value="id" label="Platform">
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2" sm="6" md="6" style="padding-top:42px; padding-bottom: 0px">
                  <v-text-field label="Publish Price (₹)" :rules="publishPriceValidationRules"  outlined v-model="format_publish_price"  :min="0" :disabled="publishpriceDisable" v-on:keyup="calculateDiscPercent" :error-messages = "showPriceError ? ['Publish Price should be less than or equal to Benchmark Price !'] : []">
                  </v-text-field>
                </v-col>
                <v-col cols="3" sm="6" md="6" class="pb-0">
                  <span>Note: Benchmark Price (₹) is {{ formatCurrency(benchmark_price) }}</span>
                  <v-text-field label="Discount (%)" outlined v-model="discount" type="number" :min="0" :disabled="discountDisable" v-on:keyup="calculatePublishPrice" class="pt-2" :error-messages = "showDiscError ? ['Discount % should be less than or equal to 100!'] : []">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>                               
               <v-col cols="4" sm="6" md="6">                                    
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
                     <div class="selected_rule_box">
                        <span  v-for="image in lotImageNames" :key="image" class="rule-type_option" :label="getImageName(image)" >
                         {{ image }}
                         <span style="color: #000000; cursor: pointer" class="text-black"
                                    @click="removeImage(index)">x</span>
                       </span >
                     </div>
                   </span>
               </v-col>
               <v-col cols="5" sm="6" md="6">                                    
                   <v-expansion-panels class="custom-control_outlined" ref = "imagepopup" readonly disabled>
                   <v-expansion-panel disab outlined >
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
                 <v-col cols="6" sm="6" md="6">                                    
                <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false" :return-value.sync="bid_start_date" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                        v-model="bid_start_date"
                        label="Publish Start Date"
                        prepend-inner-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="bid_start_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu3.save(bid_start_date)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                 </v-col>
                 <v-col cols="7" sm="6" md="6">                                    
                  <!-- <v-menu
                     ref="menu_3"
                     v-model="menu_3"
                     :close-on-content-click="false"
                     :nudge-right="40"
                     transition="scale-transition"
                     offset-y
                     max-width="290px"
                     min-width="290px"
                     >
                     <template v-slot:activator="{ on, attrs }">
                       <v-text-field
                         v-model="time3"
                         label="Publish Start Time"
                         prepend-inner-icon="mdi-clock-time-four-outline"
                         readonly
                         outlined
                         v-bind="attrs"
                         v-on="on"
                       ></v-text-field>
                     </template>
                     <v-time-picker
                       ampm-in-title
                       v-if="menu_3"
                       v-model="time3"
                       :allowed-minutes="allowedStep"
                       full-width
                       @click:minute="$refs.menu3.save(time3)">
                     </v-time-picker>
                   </v-menu> -->
                   <inlineTimePicker label="Bid Start Time"  required :timeValue="time1" :allow_time="allow_start_time" :getSelectedTime="(selectedTime)=>{time1 = selectedTime}" />
                 </v-col>
                </v-row>
                <v-row style="margin-bottom: -25px;">
                  <v-col cols="8" sm="6" md="6">                                    
                      <v-menu ref="menu4" v-model="menu4" :close-on-content-click="false" :return-value.sync="bid_end_date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field outlined
                          v-model="bid_end_date"
                          label="Publish End Date"
                          prepend-inner-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          >
                          </v-text-field>
                      </template>
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="bid_end_date" no-title scrollable >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu4.save(bid_end_date)">OK</v-btn>
                      </v-date-picker>
                      </v-menu>
                  </v-col>
                  <v-col cols="9" sm="6" md="6">                                    
                      <!-- <v-menu
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
                              label="Bid End Time"
                              prepend-inner-icon="mdi-clock-time-four-outline"
                              outlined
                              v-bind="attrs"
                              v-on="on"
                              >
                              </v-text-field>
                          </template>
                          <v-time-picker
                              ampm-in-title
                              v-if="menu_4"
                              v-model="time4"
                              :allowed-minutes="allowedStep"
                              full-width
                              @click:minute="$refs.menu_4.save(time4)">
                          </v-time-picker>
                          </v-menu> -->
                          <inlineTimePicker label="Bid End Time"  required :timeValue="time2" :allow_time="allow_end_time" :getSelectedTime="(selectedTime)=>{time2 = selectedTime}" />
                  </v-col>
                 </v-row>
                </v-form>
            </v-container>
          </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small color="normal"  class="mb-3" @click="publishDialog = false">Cancel</v-btn>
              <v-btn small color="primary" class="mb-3" @click="publishLot" >Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- add image popup -->
      <v-row justify="center">
      <v-dialog v-model="addImagesPopup" persistent max-width="700px">
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
                <v-col v-for="image in lotImages" :key="image" cols="3">
                  <img :src="image" alt="Lot Image" style="width: 186px; height: 184px;" @click="openImagePopupSingle(image)"/>
                </v-col>
              </v-row>
              <label for="fileInput" class="icon-container">
          <v-icon color="#91C6FF" class="custom-icon" size="25">mdi-plus</v-icon>
        </label>
        <input type="file" id="fileInput" accept="image/*" @change="handleImageUpload" style="display: none" />
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="closeImageDialog">Cancel</v-btn>
            <v-btn color="primary" @click="addImagesPopup = false" class="mb-3">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Update sales popup -->
    <v-row justify="center" ref="reserveLotForm">
        <v-dialog v-model="updateSalesPopup" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Update Sales Details</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="updateSalesPopup = false"><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
            <v-card-text>
            <v-container>
              <v-row style="margin-bottom: -25px;">
                <v-col cols="1" sm="6" md="6">
                  <v-text-field label="Buyer Name" outlined v-model="buyer_name" type="text">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -25px;">
                <v-col cols="1" sm="6" md="6">
                  <v-text-field label="Address Line 1" outlined v-model="address_line_1" type="text">
                  </v-text-field>
                </v-col>
                <v-col cols="2" sm="6" md="6">
                  <v-text-field label="Address Line 2" outlined v-model="address_line_2" type="text">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -25px;">
                <v-col cols="1" sm="6" md="6">
                  <v-text-field label="City" outlined v-model="city" type="text">
                  </v-text-field>
                </v-col>
                <v-col cols="2" sm="6" md="6">
                  <v-text-field label="State" outlined v-model="state" type="text">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small color="normal"  class="mb-3" @click="updateSalesPopup = false">Cancel</v-btn>
              <v-btn small color="primary" class="mb-3" @click="submitUpdateSalesDetails" >Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
       <!-- Update Payment Deatils -->
       <v-row justify="center" ref="reserveLotForm">
        <v-dialog v-model="updatePaymentPopup" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Update Payment Details</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="closePopups"><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
              <v-container>
                <v-row>
              <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                <v-simple-table class="gray-border v-data-simple-adjust">
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">Purchase Amount</th>
                        <th class="text-right"> ₹ {{ this.purchaseAmount }}</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th class="text-left">Partial Amount Received</th>
                        <th class="text-right"> ₹ {{ this.amountReceived }}</th>
                      </tr>
                    </thead>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" sm="6" md="6">
                  <v-text-field label="Purchase Amount (₹)" outlined v-model="formattedPurchaseAmount"  :min="0" :rules="[validateAmount]">
                  </v-text-field>
                </v-col>
                <v-col cols="3" sm="6" md="6">
                  <v-text-field label="Payment Reference Number" outlined v-model="payment_ref_number" type="text"  @keyup="validateInput">
                  </v-text-field>
                </v-col>
              </v-row>
              </v-container>
            <v-card-text>
          </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small color="normal"  class="mb-3" @click="closePopups">Cancel</v-btn>
              <v-btn small color="primary" class="mb-3" @click="paymentUpdateDetailsSubmit" :disabled="!formattedPurchaseAmount || !payment_ref_number">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- cancel pending payment -->
      <v-row justify="center">
        <v-dialog v-model="cancelPaymentPopup" persistent max-width="400px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Choose The Next Action</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="closePopups"><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
              <v-container>
                <row style="margin-bottom: -25px">
                  <v-col cols="1" sm="8" md="8">
                    <input type="radio" id="option1" class="custom-radio" value="option1" @click="assignLotOne" v-model="select_buyer" :disabled="assignDisabled == true">
                    <label class="custom-label" for="option1">Assign Lot</label>                    
                  </v-col>                  
                  <v-row>
                <v-col cols="1" sm="10" md="10" v-if="select_buyer === 'option1'">
                  <v-autocomplete v-model="assign_buyer" outlined :items="assign_user_items" item-text="user_name"
                    item-value="higest_bid_id" label="Assign Buyer" :disabled="select_buyer !== 'option1'" @change="getDataAssign">
                  </v-autocomplete>
                </v-col>
               </v-row>         
              </row>
              <row style="margin-bottom: -25px">
                <v-col cols="1" sm="8" md="8">
                  <input type="radio" id="option2" class="custom-radio" value="option2" @click="republishShowAlert" v-model="select_buyer" :disabled="assignDisabled == true">
                <label class="custom-label" for="option2">Republish Lots</label>
                </v-col>              
              </row>
              <row style="margin-bottom: -25px">
                <v-col cols="1" sm="8" md="8">
                  <input type="radio" id="option3" class="custom-radio" value="option3" @click="deleteShowAlert" v-model="select_buyer" :disabled="assignDisabled == true">
                <label class="custom-label" for="option3">Delete Lots</label>
                </v-col>               
              </row>
              <row style="margin-bottom: -25px">
                <v-col cols="1" sm="8" md="8">
                  <input type="radio" id="option4" class="custom-radio" value="option4" @click="unReserveLotShowAlert" v-model="select_buyer" :disabled="reserveLotDisabled == true">
                  <label class="custom-label" for="option4">Unreserve Sub-Lots</label>
                </v-col>                
              </row>
              </v-container>
            <v-card-text>
          </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small color="normal"  class="mb-3" @click="closePopups">Cancel</v-btn>
              <v-btn small color="primary" class="mb-3" @click="lotCancelApiCall" :disabled="number > 0">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Update Dispatch date dialog -->
      <v-row justify="center">
        <v-dialog v-model="updateDispatchDatePopup" persistent max-width="400px">
          <v-card class="v-card-100">
            <v-card class="v-card-100">
              <v-card-title>
                <span>Update Dispatch Date</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="closePopups"><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
              <v-container>
                <v-row style="margin-bottom: -25px;">
                  <v-col cols="1" sm="12" md="12">                                    
                      <v-menu ref="menu4" v-model="menu4" :close-on-content-click="false" :return-value.sync="publish_end_date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field outlined
                          v-model="dateFormattedPublish"
                          label="Select the date"
                          prepend-inner-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          >
                          </v-text-field>
                      </template>
                      <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="publish_end_date" no-title scrollable >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu4.save(publish_end_date)">OK</v-btn>
                      </v-date-picker>
                      </v-menu>
                  </v-col>
                  </v-row>
              </v-container>
            <v-card-text>
          </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small color="normal"  class="mb-3" @click="closePopups">Cancel</v-btn>
              <v-btn small color="primary" class="mb-3" @click="submitUpdateDispatchDate" :disabled="!publish_end_date">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- MOQ Lot Information -->
      <v-row justify="center">
      <v-dialog v-model="moqaLotInformation" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span v-if="active_tab === 'In Progress B2B'">
                <span>Publish Information: "{{ publishID }}"</span><span class="creation-date">Creation Date:{{ creationDate}}</span>
              </span>
              <span v-else>
                <span>Lot Information: "{{ id }}"</span><span class="creation-date">Creation Date:{{ creationDate}}</span>
            </span>  
              <!-- <span>Lot Information: "{{ id }}"</span><span class="creation-date">Creation Date:{{ creationDate}}</span> -->
              <v-spacer></v-spacer>
              <v-btn icon @click="moqaLotInformation = false" > <v-icon>mdi-close</v-icon> </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container class="p-0">
                <div>
                  <v-row v-if="active_tab === 'In Progress B2B'">
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span class="mr2" style="font-weight: 500;">Lot ID</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_id ? item_details.lot_id : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span class="mr2" style="font-weight: 500;">Lot Name MOQ</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_name ? item_details.lot_name : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Lot Type</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_type ? item_details.lot_type : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Lot Category</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.lot_category ? item_details.lot_category : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">No. Of Sub-Lots</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{item_details.possible_sub_lots ? item_details.possible_sub_lots : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Start Date & Time</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.start_date ? item_details.start_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">End Date & Time</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.end_date ? item_details.end_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <span style="font-weight: 500;">Delivery TimeLine In Days</span>
                      </v-col>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        {{ item_details.delivery_timeline ? item_details.delivery_timeline : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" class="p-2">
                        <a 
                           v-if="active_tab == 'Pending B2B Publish'" 
                           @click="navigateToMOQComponent('edit_moq')" 
                           style="color: #1976d2;"
                           >
                          <u>View & Edit The Inventory</u>
                        </a>
                        <a v-if="active_tab == 'In Progress B2B'" @click="navigateToMOQComponent('view_moq_items')" style="color: #1976d2;">
                          <u>View The Inventory</u>
                        </a>
                        <a v-if="active_tab == 'Pending Decision'" @click="navigateToMOQComponent('vie_moq_PD')" style="color: #1976d2;">
                          <u>View The Inventory</u>
                        </a>
                      </v-col>
                    
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="p-2 d-flex">
                        <a 
                        v-if="active_tab == 'Pending B2B Publish' && creatingStatus !== 'Creating Sub Lots'" 
                          @click="navigateToMOQGridFrom('edit_lot_moq')" 
                          style="color: #1976d2;"
                          :class="{ 'disabled-link': creatingStatus === 'Creating Sub Lots' }"
                          >
                          <u>Edit lot details</u>
                        </a>
                        <v-spacer></v-spacer>
                        <span>                              
                          <span>
                            <img src="@/assets/images/icons/bb-price-engine.png" class="img-fluid" />
                          </span>
                        </span>
                      
                      </v-col>                     
                    </v-row>
                  </div>
                  
              </v-container>
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
     <!-- popup dailogs move competivebidding-->
     <v-row justify="center">
      <v-dialog v-model="movecommbidd" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="movecommbidd = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <v-row  class="p-3 text-center">
              <span>  Are you sure you want to allocate the following {{ this.selected.length }} items to competitive Bidding? </span><br>
            </v-row>
          </v-container>
          <v-card-actions style="justify-content: center;">
            <v-btn small color="blue darken-1" text @click="movecommbidd = false">Cancel</v-btn>
            <v-btn small color="primary" @click="submitMoveCommBidd">SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- popup dailogs end -->
    <!-- main header -->
    <div> <HeaderComponent :headerTitle="headerText"/> </div>
    <!-- main header end -->
    <!-- tabs -->
    <v-card class="v-card-100">
        <v-tabs v-model="tab_index">
          <v-tab @click="loadData(tab, 'tab_clicked', index)" style="text-transform:none" v-for="(tab, index) in tabs1" :key="`${tab+index}`">{{tab}}</v-tab>
          
          <div ref="createLotDropDownContainer">
            <v-menu v-model="createLotDropDown" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-tab v-on="on" v-bind="attrs" @click="createLotDropDownFunction" style="text-transform:none;  padding : 0px 0px !important">
                <span style="width: 190px !important; padding: 12px 0px;">{{ selectedCreateLotSubtab }}
                    <v-icon>{{ createLotDropDown ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon></span>
                </v-tab>
              </template>
              <v-list>
                <v-list-item v-for="subtab in createLotSubTab" :key="subtab" @click="loadData(subtab, 'subtab_clicked1', index)">
                  <v-list-item-title>{{ subtab }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <div ref="pendingPublishDropDownContainer">
            <v-menu v-model="pendingPublishPopUp" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-tab v-on="on" v-bind="attrs" @click="pendingPublishDropDownFunction" style="text-transform:none; padding : 0px 0px !important">
                  <span style="width: 184px !important; padding: 12px 0px;">{{ selectedPendingPublishSubtab }}
                  <v-icon>{{ pendingPublishPopUp ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon></span>
                </v-tab>
              </template>
              <v-list>
                <v-list-item v-for="subtab in pendingPublishSubTab" :key="subtab" @click="loadData(subtab, 'subtab_clicked2', index)" >
                  <v-list-item-title>{{ subtab }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          
            <div ref="inProgressDropDownContainer">
              <v-menu v-model="InProgressDropDown" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-tab v-on="on" v-bind="attrs" @click="inProgressDropDownFunction" style="text-transform:none; padding : 0px 0px !important">
                    <span style="width: 184px !important; padding: 12px 0px;">{{ selectedInProgrssSubtab }}
                      <v-icon>{{ InProgressDropDown ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon></span>
                  </v-tab>
                </template>
                <v-list>
                  <v-list-item v-for="subtab in subtabs3" :key="subtab" @click="loadData(subtab, 'subtab_clicked3', index)">
                    <v-list-item-title>{{ subtab }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
          </div>

          <v-tab @click="loadData(tab, 'tab_clicked', index)" style="text-transform:none" v-for="(tab, index) in tabs2" :key="`${tab + index}`">{{tab}}</v-tab>
        </v-tabs>
      </v-card>
    <!-- tabs end -->
    <!--  -->
    <v-card-title style="padding: 12px 20px 0px 20px">
      <v-row>
        <v-col cols="8" sm="8" >
          <v-text-field  prepend-inner-icon="mdi-magnify" v-model="Liquidation_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>
          <v-spacer></v-spacer>
      <!-- action buttons -->
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Channel Allocation'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="allocateTob2b">ALLOCATE TO B2B</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="allocateTob2c">ALLOCATE TO B2C</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="markewaste">MARK AS E-WASTE</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Price Discovery Method'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="contractedDialog">CONTRACTED</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="competitiveBiddibgdilog">competitive bidding</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="createMoqlot">moq</v-btn>
      </v-actions>                                                                                                                                                                                                                                                                                                                                                                                                          
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Create Lots (Con)'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="lotCreation">Create Lots</v-btn>
        <v-btn class="ma-2" color="primary"  @click="uploadlotfile">Upload Lot File</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Create Lots (ComBid)'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="navigateToComponent">Create lot</v-btn>
        <v-btn class="ma-2" color="primary" disabled @click="autocreatelot">auto create lot</v-btn>
        <v-btn class="ma-2" color="primary"  @click="navigateToFileUpload">upload lot file</v-btn>
        <v-btn class="ma-2" color="primary"  @click="downloadInventory">Download inventory</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="itemMoveCommToMoqTab">move to moq</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Create Lots (MOQ)'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length != 0)" @click="navigateToMOQComponent('create_moq')">Create Lots</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="competitivebidding">move to Competitive bidding</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending B2B Publish'">
        <v-btn class="ma-2" color="primary" :disabled="(selected.length !== 1)" @click="editbidtiming">Edit Bid Timings</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="deletelot">delete lot</v-btn>
        <!-- <v-btn class="ma-2" color="primary" :disabled="number > 0 || (this.selected.length === 0) || disableB2BActionButton" @click="PublishLot">publish</v-btn> -->
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'In Progress B2B'">
        <v-btn class="ma-2" color="primary" :disabled="(selected.length !== 1)" @click="editbidtiming">Edit Bid Timings</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="deletelot">delete lot</v-btn>
        <!-- <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="reserveLotDialog">Reserve Lot</v-btn> -->
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending Decision'">
        <v-btn class="ma-2" color="primary" :disabled="isMoqLot()" @click="assignLotToBuyer">Assign Buyer</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(selected.length !== 1)" @click="navigateToRepublish('re_publish')">Republish</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(selected.length == 0)" @click="deletelot">delete lot</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending B2C Publish'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="opendialogMoveToB2b">Move TO B2B</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="openPublishDialog">PUBLISH</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'In Progress B2C'">
        <v-btn class="ma-2" color="primary" disabled @click="openUpdateSalesDialog">Update Sales</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="deletelot">Delete</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending Payment'">
        <v-btn class="ma-2" color="primary" :disabled="(selected.length !== 1)" @click="openupdatePaymentDialog">Update Payment</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="openCancelPendingPayment">Cancel</v-btn>
      </v-actions>
      <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending dispatch confirmation & Time'">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="openDispatchDateDialog">Update Dispatch Date</v-btn>
      </v-actions>
      <!-- action buttons end -->
      <!-- filter -->
      <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 150px; margin-bottom: 28px; min-height: 56px;">
        <v-expansion-panel outlined @click="filterListOfButtons">
          <v-expansion-panel-header>Filter
            <template v-slot:actions>
              <v-icon color="primary">
                mdi-menu-down
              </v-icon>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-title>
    <!-- tabs data -->
    <v-layout column>
        <v-flex md6 style="overflow: auto">
            <v-data-table 
          :dense="true" 
          :search="search" 
          v-model="selected" 
          show-select
          disable-pagination 
          :hide-default-footer="true"
          :headers="headers" 
          :items="formatted_table_data" 
          :loading="loading"
          fixed-header
          height="100%" 
          loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template v-slot:item.ewaste="{item}">
            <span>{{ item.ewaste ? item.ewaste : "N/A"}}</span>
          </template>
          <template   #[`item.id`]="{ item }">
              <a v-if="active_tab == 'Pending B2B Publish'" @click="itemDetailpopup(item)" style="color: #1976d2;">
                <u> {{ item.id }}</u>
              </a>
              <a v-else>
                 {{ item.id }}
              </a>
            </template>
          <template   #[`item.lot_id`]="{ item }">
              <a v-if="active_tab == 'Pending B2B Publish' || active_tab == 'Pending Decision'" @click="itemDetailpopup(item)" style="color: #1976d2;">
                <u> {{ item.lot_id }}</u>
              </a>
              <a v-else>
                 {{ item.lot_id }}
              </a>
            </template>
            <template   #[`item.beam_lot_id`]="{ item }">
              <a v-if="active_tab == 'In Progress B2B'" @click="itemDetailpopup(item)" style="color: #1976d2;">
                <u> {{ item.beam_lot_id }}</u>
              </a>
              <a v-else>
                 {{ item.beam_lot_id }}
              </a>
            </template>
            <template v-slot:item.price_discovery_method="{item}">
              <span>{{ item.price_discovery_method ? item.price_discovery_method : "N/A" }}</span>
            </template>
            <template v-slot:item.higest_bid="{item}">
              <span>{{ item.higest_bid ? item.higest_bid : "N/A" }}</span>
            </template>
            <template v-slot:item.article_description="{item}">
              <span>{{ item.article_description ? item.article_description : "N/A" }}</span>
            </template>
            <template v-slot:item.category="{item}">
              <span>{{ item.category ? item.category : "N/A" }}</span>
            </template>
            <template v-slot:item.buyer_name="{item}">
              <span>{{ item.buyer_name ? item.buyer_name : "N/A" }}</span>
            </template>
            <template v-slot:item.purchase_amount="{item}">
              <span>{{ item.purchase_amount ? item.purchase_amount : "N/A" }}</span>
            </template>
            <template v-slot:item.amount_received="{item}">
              <span>{{ item.amount_received ? item.amount_received : "N/A" }}</span>
            </template>
            <template v-slot:item.destination_city="{item}">
              <span>{{ item.destination_city ? item.destination_city : "N/A" }}</span>
            </template>
            <template #[`item.dispatch_date`]="{item}">
              <span>{{ formatDispatchDate(item) }}</span>
            </template>
            <template v-slot:item.publishable_status="{ item }">
            <span v-if="item.publishable_status.length <= 30">{{ item.publishable_status }}</span>
            <span v-else>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <a v-bind="attrs" v-on="on" @click="showFullText(item.publishable_status)">
                    {{ item.publishable_status.substring(0, 25) }}...
                  </a>
                </template>
                <span>{{ item.publishable_status }}</span>
              </v-tooltip>
            </span>
          </template>
        </v-data-table>
        </v-flex>
    </v-layout>
    <!-- tabs data end -->
     <!-- filter data popup -->
     <v-row justify="center">
        <v-dialog content-class="filter-liquidation" v-model="filteWithSubPopup" persistent max-width="1080px" width="auto">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row class="flex-nowrap">
                  <v-col v-for="(row, index) in rows" :key="index">
                    <template v-if="row.element === 'select&search'">
             
                      <v-combobox hide-details  prepend-inner-icon="mdi-magnify" v-model="row.value" :items="row.menuItems"
                        item-text="label" item-value="label" :label="row.label" :multiple="row.multiple" outlined
                        style="width: 300px;">
                          <template v-slot:selection="item">
                          </template>
                      
                      </v-combobox>
                        <template v-if="row.value && row.value.length > 0">
                          <v-chip class="filterchip text-wrap my-1" v-for="item in row.value"
                            :key="item.label" color="#fffff" outlined>
                            <span>{{ item.label }}</span>&nbsp;&nbsp;
                            <v-icon small @click="handelComboSelectValue(row, item)"
                              class="menuItemCloseIcon">mdi-close</v-icon>
                          </v-chip>
                        </template>
                    </template>
                    <template v-if="row.element === 'text'">
                        <v-text-field style="width: 300px;" outlined :label="row.label" v-model="row.value"></v-text-field>
                      </template>
                      <template v-if="row.element === 'dropdownwithaction'">
                        <v-combobox hide-details 
                        :ref="'nextDialogRef' + row.label"
                            outlined
                            :label="row.label"
                            :items="dropStaticData"
                            item-text="name" item-value="id" 
                            multiple
                            style="width: 300px;" 
                            :loading="dropStaticData.length === 0"
                            @focus="handleClickdropdownwithaction(row)"
                            >
                            <template v-slot:selection="{ item }">
                            </template>
                              <template v-slot:item="{ item }">
                                <v-row>
                                  <v-col cols="9">{{ item.name }}</v-col>
                                  <v-col cols="3" class="text-right d-flex">
                                    <!-- :checked="true" -->
                                  <v-checkbox hide-details class="ma-0" 
                                    :name="item.name"
                                    item-value="id"
                                    :value="item.value"
                                    :checked="row.parentData ? row.parentData.filter(cate => cate.value.includes(item.value)).length > 0 :  false"
                                    @change="handleCheckCategory(row, item)"
                                    ></v-checkbox>
                                  <v-icon v-if="item.children.length > 0"
                                    @click="handleDropDownFilterMenu(item, row)">mdi-chevron-right</v-icon>
                                  </v-col>
                                </v-row>
                              </template>
                        </v-combobox>
                        <template v-if="row.parentData.length > 0">
                            <v-chip class="filterchip text-wrap my-1" v-for="selectedData in row.parentData"
                              :key="selectedData.label" color="#fffff" outlined>
                              <span>{{ selectedData.value.join("/") }}</span>&nbsp;&nbsp;
                              <v-icon small @click="handlemenuItemClose(selectedData, row)"
                                class="menuItemCloseIcon">mdi-close</v-icon>
                            </v-chip>
                          </template>
                        <!-- <v-btn outlined :label="row.label" @click="handleOpenDispositionDialog"></v-btn> -->
                        <!-- <v-expansion-panels class="custom-control_outlined" :ref="'nextDialogRef' + row.label" readonly
                      style="width: 300px; margin-bottom: 28px; min-height: 56px;">
                      <v-expansion-panel outlined @click="handleOpenDispositionDialog(row, 'nextDialogRef' + row.label)">
                        <v-expansion-panel-header class="active_border-primary"><span class="active_float-label text-primary">{{ row.label }}</span>
                          <template v-slot:actions>
                            <v-icon color="primary">
                              mdi-menu-down
                            </v-icon>
                          </template>
                        </v-expansion-panel-header>
                      </v-expansion-panel>
                      
                    </v-expansion-panels> -->
                      </template>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="margin-10">
              <v-spacer></v-spacer>
              <v-btn small class="resetButton" @click="resetFields()">Reset</v-btn>
              <v-btn small text color="normal" @click="handleCloseFilterPopup">Cancel</v-btn>
              <v-btn small color="primary" @click="applyFilterFunc" :disabled="number > 0">Apply Filter(s)</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    <!-- pagination -->
    <div>
      <v-row class="ml-2 pb-0">
        <v-col cols="4" sm="1" class="PaddingItemPerPage">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange" ></v-select>
        </v-col>
        <span v-if="active_tab == 'Channel Allocation' || active_tab == 'Price Discovery Method' || active_tab == 'Create Lots (Con)' || active_tab == 'Create Lots (ComBid)' || active_tab == 'Create Lots (MOQ)'" class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span>
        <span v-if="active_tab == 'Pending B2B Publish' || active_tab == 'Pending B2C Publish' || active_tab == 'In Progress B2B' || active_tab == 'In Progress B2C' || active_tab == 'Pending Decision' || active_tab == 'Pending Payment'|| active_tab == 'Pending dispatch confirmation & Time'|| active_tab == 'Dispatch'" class="item-selected"><span v-if="selected.length == 1">{{selected.length}} Lot Selected</span> <span v-if="selected.length > 1">{{selected.length}} Lots Selected</span></span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="PaddingItemPerPage">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange" ></v-pagination>
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
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import inlineTimePicker from '../../../../commoncomponents/inlineTimePicker.vue';

  export default {
    data(){
      return {
        headerText: "Liquidation",
        tab_index: 0,
        lot_name:'',
        assign_buyer:'',
        search:"",
        alert: false,
        all_lots: [],
        selected: [],
        picked: [],
        category:[],
        grade: '',
        Buyer_status: '',
        Liquidation_search: [],
        liquidation_filter: '',
        dailog_confirm: '',
        dialog_title: '',
        bid_start_date:null,
        menu1: false,
        menu_1:false,
        time1: null,
        menu2:false,
        bid_end_date:null,
        menu_2:false,
        time2:null,
        eventDeleteClicked:true,
        // main tabs 
        tabs1: [
          "Channel Allocation",
          "Price Discovery Method",],
        tabs2 :[
          // "In Progress B2B",
          "Pending Decision",
          // "In Progress B2C",
          "Pending Payment",
          "Pending dispatch confirmation & Time",
          "Dispatch"
        ],
        createLotSubTab : [
          "Contracted",
          "Competitive",
          "MOQ"
        ],
        pendingPublishSubTab : [
          "B2B",
          "B2C",
        ],
        subtabs3 : [
          "B2B",
          "B2C"
        ],
        prev_tabIndex : 0,
        selectedCreateLotSubtab : "Create Lots",
        selectedPendingPublishSubtab : "Pending Publish",
        selectedInProgrssSubtab : "In Progress",
        // main tabs end
        active_tab: "Channel Allocation",
        // tabe headers
        headers: [
        { text: "Tag ID", value: "id"},
        { text: "Article ID", value: "article_id"},
        { text: "Article Description", value: "article_description"},
        { text: "Category", value: "category",},
        {text: "Grade", value:"grade"},
        {text: "Benchmark Price", value:"bench_mark_price"},
        {text: "E-waste?", value:"ewaste"},
        ],
        table_data: [],
        change_assignment_items:[],
        loading: false,
        category_filter: '',
        selectedChannelAllocation: '',
        filteWithSubPopup: false,
        allocateTob2bdailog: false,
        allocateTob2cdailog: false,
        competitiveBiddibg : false,
        contractedPopup: false,
        moqLotcreationdilog: false,
        markewastedailog: false,
        uploadlotfiledilog: false,
        lotCreationdilog : false,
        confirmDialog : false,
        ecitBidTimeDilog : false,
        datadetailpopupdisposition : false,
        editinventory : false,
        deletelotDilog : false,
        updatelotconfirm: false,
        page: 1,
        totalPages: 1,
        pageSize: 25,
        pageSizes: [],
        liq_id:[],
        file:'',
        assign_user_items:[],
        channel_liq_id:[],
        b2b_liq_id:[],
        selected_lot_item_id:'',
        successpopup:false,
        successmessage:'',
        item_details:[],
        edit_inventory:[],
        new_lot_name: '',
        tagIds: [],
        liq_lot_id:[],
        id:'',
        imageUrls:[],
        dialogVisible:false,
        reserveLotPopup:false,
        select_buyer:'',
        add_new_buyer:'',
        buyer_name:'',
        address_line_1:'',
        address_line_2:'',
        city:'',
        state:'',
        alert_type:'info',
        alert_message:'',
        number:'',
        time: null,
        itemsheader:[],
        moveToB2B:false,
        publishDialog:false,
        platform:'',
        createLotDropDown: false,
        pendingPublishPopUp: false,
        InProgressDropDown: false,
        platform_items:[],
        publish_price : '',
        discount: '',
        addImagesPopup : false,
        lotImageNames:[],
        lotImagesUrl:[],
        lotImages: [],
        imagePopup: false,
        lotImagesFileFormat:[],
        publish_start_date:null,
        menu3: false,
        menu_3:false,
        time3: null,
        menu4:false,
        publish_end_date:null,
        menu_4:false,
        time4:null,
        updateSalesPopup:false,
        updatePaymentPopup:false,
        purchaseAmount:'',
        amountReceived:'',
        payment_ref_number:'',
        purchase_amount:'',
        cancelPaymentPopup: false,
        updateDispatchDatePopup: false,
        rows: [],
        dropStaticData: [],
        categoryList : [],
        creationdDate:'',
        action:'',
        biddername:'',
        highestBidId:'',
        usermail:'',  
        highestbid:'',
        itemsWithNullEwasteYes:'',
        ewasteYes:false,
        moqaLotInformation:false,
        reserveLotDisabled:false,
        assignDisabled:false,
        benchmark_price : '',
        showPriceError : false,
        showDiscError : false,
        publishpriceDisable : false,
        discountDisable : false,
        initialLotImagesLength: 0,
        disableB2BActionButton : false,
        movecommbidd:false,
        creationDate: "",
        dataChecking:false,
        publishID:'',
        moveItemCommToMoq:'',
        total_amount :'',
        creatingStatus:''
      }
    },
    computed: {
    formattedPurchaseAmount: {
      get() {
        return Number(this.purchase_amount).toLocaleString('en-IN') ;
      },
      set(value) {
        // Remove non-digit characters
        const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
        // Ensure positive value
        this.purchase_amount = Math.max(parseFloat(numericValue), 0);
      }
    },

    publishPriceValidationRules() {
      const rules = [
        v => /^(0|[1-9]\d*)(\.\d+)?$/.test(this.formatNumber(v)) || 'Enter a valid number',
      ];
      return rules;
    },
    
    format_publish_price: {
      get() {
        return Number(this.publish_price).toLocaleString('en-IN');
      },
      set(value) {
        // Parse the formatted value and update the numeric value in the data model
        const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
        this.publish_price = isNaN(numericValue) ? '' : numericValue;
      },
    },

    formatted_table_data(){
      return this.table_data.map((item) => {
               const formattedItem = { ...item };
                    this.headers.forEach((header) => {
                      if (header.text.includes("₹")) {
                        formattedItem[header.value] = this.formatCurrency(item[header.value]);
                      }
                    });
               return formattedItem;
      });
    },
    hasValidationError() {
    const totalAmount = this.amountReceived + parseFloat(this.formatNumber(this.formattedPurchaseAmount));
    return totalAmount > this.purchaseAmount;
  },
  allow_end_time() {
      if(this.selected.length !=0){
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
    allow_start_time() {
      if(this.selected.length !=0){
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
    dateFormattedPublish(){
      if (this.publish_end_date) {
        const date = new Date(this.publish_end_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      return '';
    },
  },
    async created() {
      this.action = this.$store.state.action
      this.$store.state.action = '';
      this.scrollToTop();
      if(this.action == 'create_moq'){
        this.tab_index = 2;
        this.loadData('MOQ','tab_clicked');
        this.successmessage=this.$store.state.responseMessage;
          if(this.successmessage !== undefined && this.successmessage !== ''){
            this.successpopup = true
          }else if(this.successmessage === undefined){
            this.successpopup = false
          }
       }else if(this.action == 'edit_lot' || this.action == 'edit_moq'){
        this.tab_index = 3;
        this.loadData('B2B','subtab_clicked2');
        this.successmessage=this.$store.state.responseMessage;
        if(this.successmessage !== undefined && this.successmessage !== ''){
          this.successpopup = true
        }else if(this.successmessage === undefined){
          this.successpopup = false
        }
      }else if(this.action == 'edit_lot_view'){
        this.tab_index = 4;
        this.loadData('B2B','subtab_clicked3');
        this.successmessage=this.$store.state.responseMessage;
        if(this.successmessage !== undefined && this.successmessage !== ''){
          this.successpopup = true
        }else if(this.successmessage === undefined){
          this.successpopup = false
        }
      }else if(this.action == 'create_lot'){
        this.tab_index = 2;
        this.loadData('Competitive','tab_clicked');
        this.successmessage=this.$store.state.responseMessage;
        if(this.successmessage !== undefined && this.successmessage !== ''){
          this.successpopup = true
          }else if(this.successmessage === undefined){
            this.successpopup = false
          }
      }else if(this.action == 're_publish'){
        this.tab_index = 5;
        this.loadData('Pending Decision','tab_clicked');
        this.successmessage=this.$store.state.responseMessage;
          if(this.successmessage !== undefined && this.successmessage !== ''){
            this.successpopup = true
          }else if(this.successmessage === undefined){
            this.successpopup = false
          }
      }else if(this.action == 're_publish_return'){
        this.tab_index = 5;
        this.loadData('Pending Decision');
        this.$store.commit("setMessage", {lotIds:  JSON.stringify([])});
      }else if(this.action == 're_publish_return_payment'){
        this.tab_index = 6;
        this.loadData('Pending Payment');
        this.$store.commit("setMessage", {lotIds:  JSON.stringify([])});
      }
      else{
        const tabName = this.$route.query.tab;
        if(!tabName){ this.tab_index = 0; this.loadData('Channel Allocation','tab_clicked'); }
        else if(tabName == 'Channel_Allocation'){ this.tab_index = 0; this.loadData('Channel Allocation'); }
        else if(tabName == 'Price_Discovery_Method'){ this.tab_index = 1; this.loadData('Price Discovery Method'); }
        else if(tabName == 'Create_Lots_Con'){ this.tab_index = 2; this.loadData('Create Lots (Con)'); }
        else if(tabName == 'Create_Lots_ComBid'){ this.tab_index = 2; this.loadData('Create Lots (ComBid)'); }
        else if(tabName == 'Create_Lots_MOQ'){ this.tab_index = 2; this.loadData('Create Lots (MOQ)'); }
        else if(tabName == 'Pending_B2B_Publish'){ this.tab_index = 3; this.loadData('Pending B2B Publish'); }
        else if(tabName == 'Pending_B2C_Publish'){ this.tab_index = 3; this.loadData('Pending B2C Publish'); }
        else if(tabName == 'In Progress B2B'){ this.tab_index = 4; this.loadData('In Progress B2B'); }
        else if(tabName == 'In_Progress_B2c'){ this.tab_index = 4; this.loadData('In Progress B2C'); }
        else if(tabName == 'Pending_Decision'){ this.tab_index = 5; this.loadData('Pending Decision'); }
        else if(tabName == 'Pending_Payment'){ this.tab_index = 6; this.loadData('Pending Payment'); }
        else if(tabName == 'Pending_dispatch_confirmation__Time'){ this.tab_index = 7; this.loadData('Pending dispatch confirmation & Time'); }
        else if(tabName == 'Dispatch'){ this.tab_index = 8; this.loadData('Dispatch'); }
      }    
      this.getCategoriesList();
      
    },
    components: {
        HeaderComponent, Loading, inlineTimePicker, JwPagination
    },
    watch: {
    selected(newVal) {
      this.disableB2BActionButton = false;
      const putawayInward = newVal.filter(liquidation => liquidation.is_putaway_inwarded === false)
      let lotPendong = newVal.filter(liquidation => liquidation.republish_status === "pending")
      let lotError = newVal.filter(liquidation => liquidation.republish_status === "error")
       if(putawayInward.length > 0){
        this.showAlert("warning", "Please complete Putaway Process");
        this.selected = []
       }
       if(this.active_tab === 'Pending B2B Publish'){
        if(lotError.length > 0 || lotPendong.length > 0){
          // this.selected = []
          this.disableB2BActionButton = true;
        }

       }
      
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
    methods: {
      handleOutsideClick(event) {
        const container1 = this.$refs.createLotDropDownContainer;
        if (container1 && !container1.contains(event.target) && this.createLotDropDown) {
          this.createLotDropDownFunction();
        }
        const container2 = this.$refs.pendingPublishDropDownContainer;
        if (container2 && !container2.contains(event.target) && this.pendingPublishPopUp) {
          this.pendingPublishDropDownFunction();
        }
        const container3 = this.$refs.inProgressDropDownContainer;
        if (container3 && !container3.contains(event.target) && this.InProgressDropDown) {
          this.inProgressDropDownFunction();
        }
    },
    formatCurrency(value){
      return Number(value).toLocaleString('en-IN');
    },
    formatNumber(value){
        return typeof value === 'string' ? Number(value.replace(/,/g, '')) : value
    },
      createLotDropDownFunction(){
        if(this.createLotDropDown){
          this.createLotDropDown = false;
          this.tab_index = this.prev_tabIndex;
        } else {
          this.createLotDropDown = true;
        }
      },
      pendingPublishDropDownFunction(){
        if(this.pendingPublishPopUp){
          this.pendingPublishPopUp = false;
          this.tab_index = this.prev_tabIndex;
        } else {
          this.pendingPublishPopUp = true;
        }
      },
      inProgressDropDownFunction(){
        if(this.InProgressDropDown){
          this.InProgressDropDown = false;
          this.tab_index = this.prev_tabIndex;
        } else {
          this.InProgressDropDown = true;
        }
      },
      allowedStep: m => m % 15 === 0, 
      scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
      loadData(tab, tab_action) {
          this.createLotDropDown = false;
          this.pendingPublishPopUp = false;
          this.InProgressDropDown = false;
          if(tab == "Create Lots (Con)" || tab == "Create Lots (ComBid)" || tab == "Create Lots (MOQ)") { this.selectedCreateLotSubtab = tab; }
          else if(tab == 'Contracted'){ this.selectedCreateLotSubtab = "Create Lots (Con)"; tab = this.selectedCreateLotSubtab;}
          else if(tab == 'Competitive') { this.selectedCreateLotSubtab = "Create Lots (ComBid)"; tab = this.selectedCreateLotSubtab;} 
          else if(tab == 'MOQ'){ this.selectedCreateLotSubtab = "Create Lots (MOQ)"; tab = this.selectedCreateLotSubtab;}
          else { this.selectedCreateLotSubtab = "Create Lots";}

          if(tab == "Pending B2B Publish" || tab == "Pending B2C Publish") { this.selectedPendingPublishSubtab = tab; }
          else if(tab == "In Progress B2B" || tab == "In Progress B2C") { this.selectedInProgrssSubtab = tab; }
          else if(tab == 'B2B'){ if(tab_action === 'subtab_clicked2') {this.selectedPendingPublishSubtab = "Pending B2B Publish"; tab = this.selectedPendingPublishSubtab; this.selectedInProgrssSubtab = "In Progress";} else {this.selectedInProgrssSubtab = "In Progress B2B"; tab = this.selectedInProgrssSubtab; this.selectedPendingPublishSubtab = "Pending Publish";} }
          else if(tab == 'B2C') { if(tab_action === 'subtab_clicked2') {this.selectedPendingPublishSubtab = "Pending B2C Publish"; tab = this.selectedPendingPublishSubtab; this.selectedInProgrssSubtab = "In Progress";} else {this.selectedInProgrssSubtab = "In Progress B2C"; tab = this.selectedInProgrssSubtab; this.selectedPendingPublishSubtab = "Pending Publish";} } 
          else { this.selectedPendingPublishSubtab = "Pending Publish"; this.selectedInProgrssSubtab = "In Progress";}

          if(tab_action){
            this.Liquidation_search = ''
            var tabName = tab.replace(/\s/g,'_');
            tabName = tabName.split('(').join('');
            tabName = tabName.split(')').join('');
            tabName = tabName.replace(/&/g,'')
            this.$router.push({ name : 'liquidationNew', query : { tab : tabName }});
          }
          this.loading = true;
          this.selected = []
          this.active_tab = tab
          this.table_data = []
          this.page = 1
          this.totalPages = 1
          this.pageSize = 25
          this.dataChecking = false
          this.rows = []
          if (tab == "Channel Allocation") {
            (this.headers = [
              { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              { text: "Category", value: "category",},
              {text: "Grade", value:"grade"},
              {text: "Benchmark Price (₹)", value:"bench_mark_price"},
              {text: "E-waste?", value:"ewaste"},
              {text: "City", value:"destination_city"}
            ]);
            this.channelAllocation();
            this.prev_tabIndex=0;
          }
          if (tab == "Price Discovery Method") {
            (this.headers = [
              { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              { text: "Category", value: "category",},
              {text: "Grade", value:"grade"},
              {text: "Benchmark Price (₹)", value:"bench_mark_price"},
              {text: "E-waste?", value:"ewaste"},
            ]);
            this.pricediscovery();
            this.prev_tabIndex=1;
          }
          if (tab == "Create Lots (Con)") {
            (this.headers = [
              { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              { text: "Category", value: "category",},
              { text: "Grade", value:"grade"},
              { text: "Benchmark Price (₹)", value:"bench_mark_price"},
              {text: "E-waste?", value:"ewaste"},
            ]);
            this.create_lotCon();
            this.prev_tabIndex=2;
          }
          if (tab == "Create Lots (ComBid)") {
            (this.headers = [
              { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              { text: "Category", value: "category",},
              {text: "Grade", value:"grade"},
              {text: "Benchmark Price (₹)", value:"bench_mark_price"},
              {text: "E-waste?", value:"ewaste"},
              {text: "City", value:"destination_city"}
            ]);
            this.create_lotCombid();
            this.prev_tabIndex=2;
          }
          if (tab == "Create Lots (MOQ)") {
            (this.headers = [
              { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              { text: "Category", value: "category",},
              {text: "Grade", value:"grade"},
              {text: "Benchmark Price (₹)", value:"bench_mark_price"},
              {text: "E-waste?", value:"ewaste"},
              {text: "City", value:"destination_city"}
            ]);
            this.createLotsMOQ();
            this.prev_tabIndex=2;
          }
          if (tab == "Pending B2B Publish") {
            (this.headers = [
              { text: "Lot ID", value: "lot_id"},
              { text: "Lot Name", value: "lot_name"},
              { text: "Price Discovery Method", value: "price_discovery_method"},
              { text: "Status", value: "publishable_status",},
              {text: "Bid Start Date & Time", value:"start_date"},
              {text: "Bid End Date & Time", value:"end_date"}
            ]);
            this.pendingB2b_publish();
            this.prev_tabIndex=3;
          }
          if (tab == "In Progress B2B") {
            (this.headers = [
              { text: "Publish ID", value: "beam_lot_id"},
              { text: "Lot ID", value: "id"},
              { text: "Lot Name", value: "lot_name"},
              { text: "Price Discovery Method", value: "price_discovery_method"},
              { text: "Bid Start Date & Time", value:"start_date"},
              { text: "Bid End Date & Time", value:"end_date"},
              { text: "No. Of Unique Bids", value: "uniq_bids_no"},
              { text: "Highest Bid (₹)", value: "higest_bid"}
            ]);
            this.inProgressB2B();
            this.prev_tabIndex=4;
          }
          if (tab == "Pending Decision") {
            (this.headers = [
              { text: "Lot ID", value: "lot_id"},
              { text: "Lot Name", value: "lot_name"},
              { text: "Price Discovery Method", value: "price_discovery_method"},
              { text: "Reserve Price (₹)", value:"reserve_price"},
              { text: "No. Of Unique Bids", value: "uniq_bids_no"},
              { text: "Highest Bid (₹)", value: "higest_bid"}
            ]);
            this.pendingDecision();
            this.prev_tabIndex=5;
          }
          if (tab == "Pending B2C Publish") {
            (this.headers = [
            { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              { text: "Category", value: "category",},
              {text: "Grade", value:"grade"},
              {text: "Benchmark Price (₹)", value:"bench_mark_price"},
            ]);
            this.pendingB2CPublish();
            this.prev_tabIndex=3;
          }
          if (tab == "In Progress B2C") {
            (this.headers = [
            { text: "publish Id", value: "publish_id"},
              { text: "Article ID", value: "article_id"},
              { text: "Article Description", value: "article_description"},
              {text: "Grade", value:"grade"},
              {text: "Platform", value:"platform"},
              {text: "Quantity", value:"quantity"},
            ]);
            this.inProgressB2C();
            this.prev_tabIndex=4;
          }
          if (tab == "Pending Payment") {
            (this.headers = [
              { text: "Lot ID/Sub-Lot ID", value: "lot_id", width: '10%'},
              { text: "Lot name", value: "lot_name"},
              { text: "Buyer Name", value: "buyer_name"},
              {text: "Purchase Amount (₹)", value:"purchase_amount"},
              {text: "Payment Received (₹)", value:"amount_received"},
              {text: "Status", value:"status"},
            ]);
            this.pendingPayment();
            this.get_vendor_liquidation();
            this.prev_tabIndex=6;
          }
          if (tab == "Pending dispatch confirmation & Time") {
            (this.headers = [
            { text: "Lot ID/Sub-Lot ID", value: "lot_id", width: '10%'},
              { text: "Lot name", value: "lot_name"},
              { text: "SO Number", value: "so_number"},
              { text: "Buyer Name", value: "buyer_name"},
              {text: "Purchase Amount (₹)", value:"purchase_amount"},
              {text: "Dispatch Date", value:"dispatch_date"},
            ]);
            this.pendingDispatchConfirmTime();
            this.prev_tabIndex=7;
          }
          if (tab == "Dispatch") {
            (this.headers = [
            { text: "Lot ID/Sub-Lot ID", value: "lot_id", width: '10%'},
              { text: "Lot name", value: "lot_name"},
              { text: "SO Number", value: "so_number"},
              { text: "Buyer Name", value: "buyer_name"},
              {text: "Purchase Amount (₹)", value:"purchase_amount"},
              {text: "Invoice Number", value:"invoice_number"},
              {text: "Invoice Value", value:"invoice_value"},
              {text: "Dispatch Status", value:"warehouse_order_status"},
            ]);
            this.dispatch();
            this.prev_tabIndex=8;
          }
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
       getCategoriesList(){
        this.$http.secured.get("/api/v2/warehouse/liquidation/channel_allocations/formatted_category_list")
        .then(response => {
          if(response.data.category_list){
            this.categoryList = response.data.category_list  
            this.dropStaticData = response.data.category_list
            // this.loading = false;
          }else{
            this.loading = true;
          }
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
    },

    filterListOfButtons() {
      this.dropStaticData = this.categoryList
      if(this.table_data.length > 0) {
        this.filteWithSubPopup = true;
      }else if(this.dataChecking){
        this.filteWithSubPopup = true;
      }
      this.number = 0
      this.setFilterInputfields();
      document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
    },
    handleOpenDispositionDialog(row, ref) {
      row.nextDialog = true
      document.documentElement.style.setProperty('--dialog-leftpos', (this.$refs[ref] && this.$refs[ref][0].$el.getBoundingClientRect().left - 20).toString() + 'px');
      document.documentElement.style.setProperty('--dialog-yposi', (this.$refs[ref] && this.$refs[ref][0].$el.getBoundingClientRect().top + 60).toString() + 'px');
    },
    handleCloseFilterPopup() {
      // this.rows = []
      this.dropStaticData = ""
      this.filteWithSubPopup = false;
    },
    getRowMenuItems(key)
 {
      let myArray = this.table_data.map(data => data[key]).filter(value => value)
      return [...new Set(myArray)].map(data => ({ label: data, value: "" }))
    },
    setFilterInputfields() {
      const selectedValues = {};
      for (const row of this.rows) {
        selectedValues[row.label] = row.value;
      }

      let rows = []
      let ewaste = [{ label: "Yes", value: "" }, { label: "No", value: "" }, { label: "Not defined", value: "" }]
      let price_discovery_method = [{ label: "Competitive Bidding", value: "Competitive Lot" }, { label: "MOQ", value: "MOQ Lot" }]
      let grades = [{ label: "A", value: "" }, { label: "B", value: "" }, { label: "C", value: "" }, { label: "D", value: "" }, { label: "AA", value: "" }, { label: "Not Tested", value:""}]

      if (["Channel Allocation"].includes(this.active_tab)) {
        rows = [
          // { element: "dropdownwithaction", label: "Tag ID", inputTag: "selectWithCheckBox", nextDialog: false, parentData: [], menuItems: this.getRowMenuItems('tag_number') },
          // { element: "dropdownwithaction", label: "Article ID", inputTag: "selectWithCheckBox", nextDialog: false, parentData: [], menuItems: this.getRowMenuItems("article_id") },
          { element: "dropdownwithaction", label: "Category", inputTag: "checkBox", nextDialog: false, parentData: [] },
          { element: "select&search", label: "Grade", multiple: true, menuItems: grades, value: [] },
          { element: "select&search", label: "E-waste", multiple: true, menuItems: ewaste, value: [] },

        ]
      } else if (["Price Discovery Method", "Create Lots (Con)", "Create Lots (ComBid)", "Create Lots (MOQ)"].includes(this.active_tab)) {
        rows = [
          { element: "select&search", label: "Grade", multiple: true, menuItems: grades, value: [] },
          { element: "dropdownwithaction", label: "Category", inputTag: "checkBox", nextDialog: false, parentData: [] },
          { element: "select&search", label: "E-waste", multiple: true, menuItems: ewaste, value: [] },
        ]
      } else if (['Pending B2B Publish'].includes(this.active_tab)) {
        let status = [{ label: "Ready for Publishing", value: "Ready for publishing" }, { label: "Pending Lot Details", value: "Pending lot details" }]
        rows = [
          { element: "select&search", label: "Price Discovery Method", multiple: true, menuItems: price_discovery_method, value: [] },
          { element: "select&search", label: "Status", multiple: true, menuItems: status, value: [] },
        ]
      } else if (["In Progress B2B", "Pending Decision"].includes(this.active_tab)) {
        rows = [
          { element: "select&search", label: "Price Discovery Method", multiple: true, menuItems: price_discovery_method, value: [] },
        ]
        // ["Channel Allocation","Price Discovery Method", "Pending B2C Publish" , "Create Lots (Con)", "Create Lots (ComBid)"].includes(this.active_tab)
      } else if (["Pending B2C Publish"].includes(this.active_tab)) {
        rows = [
          { element: "dropdownwithaction", label: "Category", inputTag: "checkBox", nextDialog: false, parentData: [], value: [] },
          { element: "select&search", label: "Grade", multiple: true, menuItems: grades, value: [] },
        ]
      } else if (["In Progress B2C"].includes(this.active_tab)) {
        rows = [
          { element: "select&search", label: "Grade", multiple: true, menuItems: grades, value: [] },
          { element: "select&search", label: "Platform", multiple: true, menuItems: this.getRowMenuItems("plateform"), value: [] },
        ]
      } else if (["Pending Payment"].includes(this.active_tab)) {
        let status = [{ label: "Pending Payment", value: "Pending Payment" }, { label: "Partially recieved", value: "Partial Payment" }]
        rows = [
          { element: "select&search", label: "Status", multiple: true, menuItems: status, value: [] },
          { element: "text", label: "Buyer Name", multiple: true,  },
        ]
      } else if (["Pending dispatch confirmation & Time"].includes(this.active_tab)) {
        rows = [
          { element: "text", label: "Buyer Name", cols: "4", multiple: true,  },
        ]
      }
      else if (["Dispatch"].includes(this.active_tab)) {
        let status = [{ label: "Pending Pick-Up", value: "Pending Pick" }, { label: "Pending Packaging", value: "Pending Pack" }, { label: "Pending Dispatch", value: "Pending Dispatch" }]
        rows = [
          { element: "text", label: "Buyer Name", multiple: true, menuItems: this.getRowMenuItems("buyer_name") },
          { element: "select&search", label: "Status", multiple: true, menuItems: status, value: [] },
        ]
      }
      for (const row of rows) {
        if (selectedValues.hasOwnProperty(row.label)) {
          row.value = selectedValues[row.label];
        }
      }
      for (const row of this.rows) {
        this.selectedValues[row.label] = row.value;
      }
      this.rows = rows
    },
    resetFields() {
      for (const row of this.rows) {
        if (row.label === 'Category') {
          row.value = [];
          row.parentData = [];
          this.dropStaticData = ""
          this.loading = false;
        } else {
          row.value = Array.isArray(row.value) ? [] : '';
        }
      }
    },

    apiCallForFilter(apiURL, requestBody) {
      this.$http.secured
        .post(apiURL, requestBody)
        .then(response => {
          if (response.data) {
            this.table_data = response.data.liquidations || response.data.liquidation_orders;
            if(this.table_data.length === 0){
              this.dataChecking = true
            }
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network: " + error);
        }).finally(() => {
          this.loading = false;
          // this.rows = []
          // this.dropStaticData = []

          this.number = 0
          this.filteWithSubPopup = false;
        });
    },

    generateOutputCategory(input) {
      let outputCategory = {};
      for (let i = 0; i < input.length; i++) {
        const categoryLevels = input[i].slice(0);
        for (let j = 0; j < categoryLevels.length; j++) {
          const categoryLevel = `category_l${j + 1}`;
          const categoryValue = categoryLevels[j];
          if (!outputCategory.hasOwnProperty(categoryLevel)) {
            outputCategory[categoryLevel] = [];
          }
          outputCategory[categoryLevel].push(categoryValue);
        }
      }

      // Convert category arrays to comma-separated strings
      for (const categoryLevel in outputCategory) {
        let data = outputCategory[categoryLevel]
        // let UniqueCat = [...new Set(data)]
        outputCategory[categoryLevel] = data.join(",");
      }
      return outputCategory;
    },

    getFilterKeyForApiParams() {
      let activeTab = this.active_tab
      let filter;
      let category = {} ;
      if (activeTab === "Channel Allocation") {
        let grades = this.rows.find(row => row.label === "Grade").value
        let Ewaste = this.rows.find(row => row.label === "E-waste").value
        let getcategory =  this.rows.find(row => row.label === "Category")
        let selectedCategory =  getcategory.parentData.map(item => item.value)
        let categoryKeys = this.generateOutputCategory(selectedCategory)
        let count = Object.keys(categoryKeys).length
        category = {
          ...categoryKeys,
          category_filter_count : count
        }
        filter = {
          grade: grades.map(grade => grade.label),
          ewaste: Ewaste.map(grade => grade.label)
        }
      } else if (["Price Discovery Method", "Create Lots (Con)", "Create Lots (ComBid)", "Create Lots (MOQ)"].includes(this.active_tab)) {
        let grades = this.rows.find(row => row.label === "Grade").value
        let Ewaste = this.rows.find(row => row.label === "E-waste").value
 
         let getcategory =  this.rows.find(row => row.label === "Category")
        let selectedCategory =  getcategory.parentData.map(item => item.value)
        let categoryKeys = this.generateOutputCategory(selectedCategory)
        let count = Object.keys(categoryKeys).length
        category = {
          ...categoryKeys,
          category_filter_count : count
        }
        filter = {
          grade: grades.map(grade => grade.label),
          ewaste: Ewaste.map(grade => grade.label)
        }
      } else if (['Pending B2B Publish'].includes(this.active_tab)) {
        let price_discovery_method = this.rows.find(row => row.label === "Price Discovery Method").value
        let status = this.rows.find(row => row.label === "Status").value
        filter = {
          price_discovery_method: price_discovery_method.map(grade => grade.value),
          status: status.map(grade => grade.value)
        }
      } else if (["In Progress B2B", "Pending Decision"].includes(this.active_tab)) {
        let price_discovery_method = this.rows.find(row => row.label === "Price Discovery Method").value
        filter = {
          price_discovery_method: price_discovery_method.map(grade => grade.value),
        }
      } else if (["Pending B2C Publish"].includes(this.active_tab)) {
        let grades = this.rows.find(row => row.label === "Grade").value
        let getcategory =  this.rows.find(row => row.label === "Category")
        let selectedCategory =  getcategory.parentData.map(item => item.value)
        let categoryKeys = this.generateOutputCategory(selectedCategory)
        let count = Object.keys(categoryKeys).length
        category = {
          ...categoryKeys,
          category_filter_count : count
        }
        filter = {
          grade: grades.map(grade => grade.label),
        }
      } else if (["In Progress B2C"].includes(this.active_tab)) {
        let grades = this.rows.find(row => row.label === "Grade").value
        let plateform = this.rows.find(row => row.label === "Platform").value
        filter = {
          grade: grades.map(grade => grade.label),
          plateform: plateform.map(grade => grade.label)
        }
      } else if (["Pending Payment"].includes(this.active_tab)) {
        let status = this.rows.find(row => row.label === "Status").value
        let buyer_name = this.rows.find(row => row.label === "Buyer Name").value
        filter = {
          payment_status: status.map(grade => grade.value),
          buyer_name: buyer_name
        }
      } else if ([ "Dispatch"].includes(this.active_tab)) {
        let status = this.rows.find(row => row.label === "Status").value
        let buyer_name = this.rows.find(row => row.label === "Buyer Name").value
        filter = {
          status: status.map(grade => grade.value),
          buyer_name: buyer_name
        }
      }
      else if (["Pending dispatch confirmation & Time"].includes(this.active_tab)) {
        let buyer_name = this.rows.find(row => row.label === "Buyer Name").value
        filter = {
          buyer_name: buyer_name
        }
      }

      return {filter , ...category}
    },

    applyFilterFunc() {
      this.isFilteringPage = true
      this.number++;
      let params = this.getFilterKeyForApiParams()
      let requestBody = {
      ...params,
        page: this.filterPageNo,
        per_page: this.pageSize,
        status: this.active_tab
      };

      if (this.active_tab === "Channel Allocation") {
        this.apiCallForFilter('/api/v2/warehouse/liquidation/channel_allocations', requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation/channel_allocations', requestBody)
      }
      if (this.active_tab === "Price Discovery Method") {

        this.apiCallForFilter('/api/v2/warehouse/liquidation/price_discovery', requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation/price_discovery', requestBody)
      }        
      if (this.active_tab === "Create Lots (Con)") {
        this.apiCallForFilter('/api/v2/warehouse/liquidation/contracted_price', requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation/contracted_price', requestBody)
      }
      if (this.active_tab === "Create Lots (ComBid)") {
        this.apiCallForFilter('/api/v2/warehouse/liquidation/competitive_bidding_price', requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation/competitive_bidding_price', requestBody)
      }
      if (this.active_tab === "Create Lots (MOQ)") {
        this.apiCallForFilter('/api/v2/warehouse/liquidation/moq', requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation/moq', requestBody)
      }
      if (this.active_tab === "Pending B2B Publish") {
        this.apiCallForFilter('/api/v2/warehouse/liquidation_order/b2b/pending_publish', requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation_order/b2b/pending_publish/index_new', requestBody)
      }
      if (this.active_tab === "In Progress B2B") {
        this.apiCallForFilter("/api/v2/warehouse/liquidation_order/b2b/in_progress", requestBody)
        this.updatePageSizesOnFilter("/api/v2/warehouse/liquidation_order/b2b/in_progress", requestBody)
      }
      if (this.active_tab === "Pending Decision") {
        this.apiCallForFilter("/api/v2/warehouse/liquidation_order/pending/decision", requestBody)
        this.updatePageSizesOnFilter("/api/v2/warehouse/liquidation_order/pending/decision", requestBody)
      }
      if (this.active_tab === "Pending B2C Publish") {
        this.apiCallForFilter("/api/v2/warehouse/liquidation/b2c_pending_publish", requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation/b2c_pending_publish', requestBody)
      }
      if (this.active_tab === "Pending Payment") {
        this.apiCallForFilter("/api/v2/warehouse/liquidation_order/pending/payment", requestBody)
        this.updatePageSizesOnFilter('/api/v2/warehouse/liquidation_order/pending/payment', requestBody)
      }
      if (this.active_tab === "Pending dispatch confirmation & Time") {
        this.apiCallForFilter("/api/v2/warehouse/liquidation_order/pending/dispatch_confirmation_time", requestBody)
        this.updatePageSizesOnFilter("/api/v2/warehouse/liquidation_order/pending/dispatch_confirmation_time", requestBody)
      }
      if (this.active_tab === "Dispatch") {
        this.apiCallForFilter("/api/v2/warehouse/liquidation_order/dispatch", requestBody)
        this.updatePageSizesOnFilter("/api/v2/warehouse/liquidation_order/dispatch", requestBody)
      }

    },
      updatePageSizesOnFilter(apiEndpoint, requestBody) {
      this.$http.secured
        .post(apiEndpoint, requestBody)
        .then(response => {
          if (response.data && response.data.meta) {
            this.updatePageSizes(response.data.meta.total_count);
          }
        })
        .catch(error => {
          console.error("Error while updating page sizes on filter:", error);
        });
    },
    handleNextDialog(row) {
      if (row.label === "Category") {
        let multicheckTrue = this.dropStaticData.filter(data => data.value)
        if (multicheckTrue && multicheckTrue.length > 0) {
          if (row.parentData.length === 0) {
            let chckedData = multicheckTrue.map(data => ({
              name: data.name,
              value: [data.name]
            }))
            row.parentData = [...chckedData]
          } else {
            let chckedData = row.parentData.flatMap(item => {
              let includedValue = multicheckTrue.map(checkitem => 
                checkitem.parentLable && checkitem.parentLable.includes(item.value[item.value.length - 1]) ? { ...item, value: [...item.value, checkitem.name] } :
                !checkitem.parentLable && item.name !== checkitem.name ? {anem : checkitem.name , value : [checkitem.name]} 
                : item)
              return includedValue
            })
            row.parentData = [...chckedData]
          }
          
        } 
      }
     row.nextDialog = false
    },

    handleDropDownFilterMenu(category, row) {
      if (category.children.length > 0) {
        if(row.parentData && row.parentData.length > 0){
          let parentData =  row.parentData.flatMap(item => item.value)
          if(!parentData.includes(category.name)){
            this.addSelectedRowData(category, row)
          }
          this.dropStaticData = category.children.map(Sub_Cate => ({ ...Sub_Cate, value : parentData.includes(Sub_Cate.name) ? Sub_Cate.name : "", parentLable: category.parentLable && category.parentLable.length > 0 ? [...category.parentLable , category.name] : [category.name] }))
        }else{
          this.addSelectedRowData(category, row)
          this.dropStaticData = category.children.map(Sub_Cate => ({ ...Sub_Cate, parentLable: category.parentLable && category.parentLable.length > 0 ? [...category.parentLable , category.name] : [category.name] }))
        }
      }
    },
    handleClickdropdownwithaction(row ){
      let hasselectData = row.parentData ? row.parentData.map(cate => cate.name) : []
      this.dropStaticData = []
      if(hasselectData.length > 0){
        this.dropStaticData  =[...this.categoryList].map(cate => hasselectData.includes(cate.name) ? {...cate, value : cate.name} : cate)
      }else{
        this.dropStaticData  =[...this.categoryList].map(cate => ({...cate , value: ""}))
      }
    },

    handleCheckCategory(row, item) {
      let includedData = row.parentData.filter(cate => cate.value.includes(item.value))
      if (row.parentData && row.parentData.length > 0 && includedData.length > 0) {
        row.parentData = row.parentData.filter(cate => !cate.value.includes(item.value))
        item.value = ""
      } else {
        item.value = item.name
        if (item.parentLable && item.parentLable.length > 0) {

          let data = item.parentLable && row.parentData.filter(parentItem => parentItem.value.join("/") === item.parentLable.join("/"))

          if (data && data.length > 0) {
            let updateData = row.parentData.map(parentItem => parentItem.value.join("/") === item.parentLable.join("/") ?
              { ...parentItem, value: [...parentItem.value, item.name] }
              : parentItem
            )
            row.parentData = updateData
          } else {
            let Unique = item.parentLable && row.parentData.filter(parentItem => parentItem.value.join("/") !== item.parentLable.join("/"))
            if (Unique && Unique.length > 0) {
              row.parentData = [...row.parentData, { name: item.parentLable[0], value: [...item.parentLable, item.name] }]
            }
          }
        }
        else {
          row.parentData = [...row.parentData, { name: item.name, value: [item.name] }]
        }
      }
    },

    addSelectedRowData(category, row) {
      let updateData;
      if (row.parentData && row.parentData.length > 0 && category.parentLable && category.parentLable.length > 0) {
        updateData = row.parentData.map(data => category.parentLable.includes(data.name) ? { ...data, value: [...data.value, category.name] } : data)
      } else if (row.parentData && row.parentData.length > 0 && category.parentLable && category.parentLable.length === 0) {
        let findParentData = row.parentData.find(data => data.name === category.name)
        updateData = findParentData && findParentData.name ? row.parentData.map(data => category.name === data.name ? { ...data, value: [category.name] } : data) : [...row.parentData, { name: category.name, value: [category.name] }]
      } else {
        updateData = [...row.parentData, { name: category.name, value: [category.name] }]
      }
      row.parentData = updateData
    },

    handlemenuItemClose(selectedValue, row) {
      this.categoryList = [...this.categoryList].map(item => item.value && selectedValue.value.includes(item.name) ? {...item , value : ""} : item)
      this.dropStaticData = [...this.dropStaticData].map(item => item.value && selectedValue.value.includes(item.name) ? {...item , value : ""} : item)
      row.parentData = row.parentData.filter(data => data.value.join("/") !== selectedValue.value.join("/"))
      // menuItem.value = false
    },
    handelComboSelectValue(row , item){
      row.value =  row.value.filter(value => value.label !== item.label)
    },
      
      channelAllocation(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : []; 
              const requestBody = {
              search_text: searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/channel_allocations', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidations
                this.totalPages = response.data.meta.total_pages
                // this.category = response.data.liquidations.map(liquidations => liquidations.category);
                this.grade = response.data.liquidations.map(liquidations => liquidations.grade);
                this.ewaste = response.data.liquidations.map(liquidations => liquidations.ewaste);
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.showAlert("error", "No Data Found");
                this.loading = false;
              }
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
          });
      },
      pricediscovery(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/price_discovery', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidations
                this.totalPages = response.data.meta.total_pages
                // this.category = response.data.liquidations.map(liquidations => liquidations.category);
                this.grade = response.data.liquidations.map(liquidations => liquidations.grade);
                this.ewaste = response.data.liquidations.map(liquidations => liquidations.ewaste);
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      create_lotCon(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/contracted_price', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidations
                this.totalPages = response.data.meta.total_pages
                // this.category = response.data.liquidations.map(liquidations => liquidations.category);
                this.grade = response.data.liquidations.map(liquidations => liquidations.grade);
                this.ewaste = response.data.liquidations.map(liquidations => liquidations.ewaste);
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      create_lotCombid(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/competitive_bidding_price',requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidations
                this.totalPages = response.data.meta.total_pages
                // this.category = response.data.liquidations.map(liquidations => liquidations.category);
                this.grade = response.data.liquidations.map(liquidations => liquidations.grade);
                this.ewaste = response.data.liquidations.map(liquidations => liquidations.ewaste);
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      createLotsMOQ(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/moq',requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidations
                this.totalPages = response.data.meta.total_pages
                // this.category = response.data.liquidations.map(liquidations => liquidations.category);
                this.grade = response.data.liquidations.map(liquidations => liquidations.grade);
                this.ewaste = response.data.liquidations.map(liquidations => liquidations.ewaste);
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      
      pendingB2b_publish(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/b2b/pending_publish/index_new', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidation_orders
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                // this.category = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.category);
                this.grade = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.grade);
                this.ewaste = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.ewaste);                
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      inProgressB2B(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('api/v2/warehouse/liquidation_order/b2b/in_progress', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidation_orders
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                // this.category = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.category);
                this.grade = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.grade);
                this.ewaste = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.ewaste);                
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      pendingDecision(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/pending/decision', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidation_orders
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                // this.category = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.category);
                this.grade = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.grade);
                this.ewaste = response.data.liquidation_orders.map(liquidation_orders => liquidation_orders.ewaste);
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      pendingB2CPublish(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/b2c_pending_publish', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidations
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      inProgressB2C(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/b2c/in_progress', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.ecom_liquidations
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      pendingPayment(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/pending/payment', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidation_orders
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      pendingDispatchConfirmTime(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/pending/dispatch_confirmation_time', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidation_orders
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      dispatch(){
        const searchArray = this.Liquidation_search && typeof this.Liquidation_search === 'string'
        ? this.Liquidation_search.split(',').map(value => value.trim())
        : [];
        const requestBody = {
              search_text:searchArray,
              page: this.page,
              per_page: this.pageSize
            };
            this.loading = true
        this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/dispatch', requestBody)
          .then(response => {
              if (response.data) {
                this.table_data = response.data.liquidation_orders
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
                this.updatePageSizes(response.data.meta.total_count);
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;
      })
      },
      closePopups(){
        this.selected = []
        this.reserveLotPopup = false
        this.select_buyer = '',
        this.assign_buyer = ''
        this.updatePaymentPopup = false
        this.purchase_amount = ''
        this.payment_ref_number = ''
        this.cancelPaymentPopup = false
        this.select_buyer = ''
        this.assign_buyer = ''
        this.updateDispatchDatePopup = false
        this.publish_end_date = ''
      },
      allocationchanel(){
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/channel_allocations/allocate_channel', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
               "alloted_channel":"liquidation_status_allocate_b2b"
              }              
            }
          )
          .then(response => {
            if (response.data) {
                // this.table_data = response.data.liquidations
                this.successmessage = response.data.message
                this.showAlert("success", "Successfully alloted!");
                this.allocateTob2bdailog = false
                this.successpopup = true
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
      },
      allocationchanelb2c(){
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/channel_allocations/allocate_channel', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
              "alloted_channel":"liquidation_status_pending_b2c_publish"
              }              
            }
          )
          .then(response => {
            if (response.data) {
                // this.table_data = response.data.liquidations
                this.showAlert("success", "Successfully alloted");
                this.allocateTob2cdailog = false
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
      },
      itemDetailpopup(item){
      if(this.active_tab == 'Pending B2B Publish' || this.active_tab == 'Pending Decision' || this.active_tab == 'In Progress B2B'){
        if(item.price_discovery_method == 'Competitive Bidding'){
          this.datadetailpopupdisposition = true
        }else if(item.price_discovery_method == 'MOQ'){
          this.creatingStatus = item.status
          this.moqaLotInformation = true
        }        
        this.id = item.id;
        this.publishID = item.beam_lot_id
        let str = String(this.id);
        this.lot_name = item.lot_name;
        this.created_at = item.created_at;
        this.id = str
        this.created_at = str;
        this.$http.secured
        .get(`api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.id}`)
        .then(response => {
          if (response.data) {
            this.item_details = response.data.liquidation_order
            this.imageUrls = this.item_details.lot_image_urls
            const creationDate = new Date(this.item_details.created_at);
           this.creationDate = this.formatDateTime(creationDate);
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
      }   
    },
    formatDateTime(dateTime) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };
      const date = new Date(dateTime);
      return date.toLocaleString("en-GB", options);
    },

    allocateTob2b(){
        const itemsWithNullEwaste = this.selected.filter(liquidation => liquidation.ewaste === '');
        // const itemgatepass = this.selected.filter(liquidation => liquidation.has_inventory_gate_pass === false)
        if (itemsWithNullEwaste.length > 0) {
          const itemNames = itemsWithNullEwaste.map(liquidation => liquidation.tag_number).join(", ");
          this.showAlert("warning", `Please update the e_waste status for the following inventories: ${itemNames}`);
          this.allocateTob2bdailog = false;
          this.selected = []
          return; // Stop further execution
        }
        else{
          this.allocateTob2bdailog = true;
        this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        }
               
        },
        allocateTob2c() {
          const itemsWithNullEwaste = this.selected.filter(liquidation => liquidation.ewaste === '');
          // this.itemsWithNullEwasteYes = this.selected.filter(liquidation => liquidation.ewaste === 'yes');
          const itemgatepass = this.selected.filter(liquidation => liquidation.has_inventory_gate_pass === false)
          if (itemsWithNullEwaste.length > 0) {
          const itemNames = itemsWithNullEwaste.map(liquidation => liquidation.tag_number).join(", ");
          this.showAlert("warning", `Please update the e_waste status for the following inventories: ${itemNames}`);
          this.allocateTob2bdailog = false;
          this.selected = []
          return; // Stop further execution
        }else if(this.itemsWithNullEwasteYes.length > 0){
          this.successmessage = 'E-waste items cannot be allocated to B2C.'
          this.successpopup = true
          this.ewasteYes = true
        }else{
          this.allocateTob2cdailog = true;
          this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        }
        },
        competitiveBiddibgdilog(){
          this.competitiveBiddibg = true
          this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        },
        contractedDialog(){
          this.contractedPopup = true
          this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        },
        createMoqlot(){
          this.moqLotcreationdilog = true
          this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        },
        deletelot(){
          if(this.active_tab == 'In Progress B2B'){
            for(let i=0;i<this.selected.length;i++){
              if(this.selected[i].bid_count != 0){
                this.showAlert("error","Bids are present, Not able to delete lot!");
                this.selected = [];
                return;
              }
            }
          }
          this. deletelotDilog= true
          this.b2b_liq_id = this.selected.map(liquidation_order => liquidation_order.id);
        },
        PublishLot(){
          this.number++;
          this.liq_lot_id = this.selected.map(liquidation => liquidation.id);
          this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/b2b/pending_publish/publish',
            {
              "id":this.liq_lot_id
            }
          )
          
          .then(response => {
            if (response) {
              this.showAlert("success", "Lot Published");
              this.publishLotConfirmDialog = false;
              this.selected = []
              this.successmessage = response.data.message
              this.successpopup = true
              this.this.liq_lot_id = '';
              this.number = 0;
            } else {
              this.publishLotConfirmDialog   = false;
              this.progress_overlay = false;
              this.number = 0;
              this.showAlert("error", "No Data Found");
            }                         
          })
          .catch(error => {
            this.publishLotConfirmDialog   = false;
            this.progress_overlay = false;
            this.number = 0;
            this.showAlert("error", error.response.data.error);
          });
        },
        savemarkeWast(){
          this.$http.secured
          .post('api/v2/warehouse/liquidation/channel_allocations/mark_e_waste', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
                "ewaste":this.picked
              }
            }
          )
          .then(response => {
            if (response.data) {
                // this.table_data = response.data.liquidations
                this.showAlert("success", "Mark as E-waste updated");
                this.markewastedailog = false
                this.successmessage = response.data.message
                this.successpopup = true
              } else {                
                this.showAlert("error", "No Data Found");
                this.number = 0;
              }
          })
          .catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;
        });
        },
        competitiveBiddingconfirm(){
          this.$http.secured
          .post('api/v2/warehouse/liquidation/price_discovery/assign_price', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
                "price_type":"liquidation_status_competitive_bidding_price"
              }
            }
          )
          .then(response => {
            if (response.data) {
                // this.table_data = response.data.liquidations
                this.showAlert("success", "Successfully alloted");
                this.competitiveBiddibg = false
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                  this.showAlert("error", "No Data Found");
                  this.number = 0;
                }              
          }).catch(error => {
            this.publishLotConfirmDialog   = false;
            this.progress_overlay = false;
            this.showAlert("error", error.response.data.error);
          });
        },
        contractedConfirm(){
          this.$http.secured
          .post('api/v2/warehouse/liquidation/price_discovery/assign_price', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
                "price_type":"liquidation_status_contracted_price"
              }
            }
          )
          .then(response => {
            if (response.data) {
                // this.table_data = response.data.liquidations
                this.showAlert("success", "Successfully alloted");
                this.contractedPopup = false
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                  this.showAlert("error","No Data Found");
                }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
        },
        Moqcreation(){
          const itemsWithNullEwaste = this.selected.filter(liquidation => liquidation.ewaste === 'yes');
          if (itemsWithNullEwaste === 'yes') {
            this.showAlert("error", "ERROR! E-waste Items cannot be sent to MOQ");
            return;
          }

          this.$http.secured
          .post('api/v2/warehouse/liquidation/price_discovery/assign_price', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
                "price_type":"liquidation_status_moq_price"
              }
            }
          )
          .then(response => {
            if (response.data) {
                this.showAlert("success", "Successfully alloted!");
                this.moqLotcreationdilog = false
                this.successmessage = response.data.message
                this.successpopup = true
                this.loading = false
                this.this.channel_liq_id = []
              }else {
                  this.showAlert("error", "No Data Found");                
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
        },
        dateformat(dateString){
        let dateTimeParts = dateString.split(' ');
        let timeParts     = dateTimeParts[1].split(':');
        let dateParts     = dateTimeParts[0].split('-');
        let date = new Date(dateParts[0],parseInt(dateParts[1], 10) - 1,dateParts[2],timeParts[0], timeParts[1])
        return date;
      },
        SaveBidTime(){
          var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
          var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
          this.liq_lot_id = this.selected.map(liquidation => liquidation.id);
          const formData = new FormData();
            if(end_dtime <= start_dtime){
              this.showAlert("error", "Invalid Date / Time ..!!");
            }else{

            this.number++;
            if(this.active_tab == 'Pending B2B Publish'){
              this.$http.secured
            .post("/api/v2/warehouse/liquidation_order/b2b/pending_publish/update_timing", {
              "liquidation_order": {
                 "ids": this.liq_lot_id,
                "start_date": (this.bid_start_date + " " + this.time1),
                "end_date": (this.bid_end_date + " " + this.time2)
            }
            })
            .then(response => {
              if (response) {  
                  this.showAlert("success", response.data.message);
                  this.ecitBidTimeDilog = false
                  this.successmessage = response.data.message
                  this.successpopup = true
                  this.liq_lot_id = '',
                  this.bid_start_date = '',
                  this.time1='',
                  this.bid_end_date = '',
                  this.time2 = ''
                  this.number = 0;
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;
                this.number = 0;
              }                         
            })
            .catch(error => {
              this.showAlert("error", error.response.data.error);
              this.number = 0;
            });
          }
            
            if(this.active_tab == 'In Progress B2B'){
              this.$http.secured
            .post("/api/v2/warehouse/liquidation_order/b2b/in_progress/update_timing", {
              "liquidation_order": {
                 "ids": this.liq_lot_id,
                "start_date": (this.bid_start_date + " " + this.time1),
                "end_date": (this.bid_end_date + " " + this.time2)
            }
            })
            .then(response => {
              if (response) {  
                  this.showAlert("success", response.data.message);
                  this.ecitBidTimeDilog = false
                  this.successmessage = response.data.message
                  this.successpopup = true
                  this.liq_lot_id = '',
                  this.bid_start_date = '',
                  this.time1='',
                  this.bid_end_date = '',
                  this.time2 = ''
                  this.number = 0;
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;
                this.number = 0;
              }                         
            })
            .catch(error => {
              this.showAlert("error", error.response.data.error);
              this.number = 0;
            }); 
            }
            }
            
        },
        deletelotconfirm(){
          if(this.active_tab == 'Pending B2B Publish'){
            this.$http.secured
            .post("/api/v2/warehouse/liquidation_order/b2b/pending_publish/delete_lots", 
                {
                  "liquidation_order":{
                    "ids":this.b2b_liq_id
                  }
                }
            )
            .then(response => {
              if (response.data) {
                this.showAlert("success", "Lot Deleted");
                this.ip_selected = [];
                this.deletelotDilog = false;
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                this.showAlert("error", "No Data Found");
              }
            }).catch(error => {
                  this.showAlert("error", "Something went wrong from Network" + error);
              });
          }
          if(this.active_tab == 'In Progress B2B'){
            this.$http.secured
            .post("api/v2/warehouse/liquidation_order/b2b/in_progress/delete_lots", 
                {
                  "liquidation_order":{
                    "ids":this.b2b_liq_id
                  }
                }
            )
            .then(response => {
              if (response.data) {
                this.showAlert("success", "Lot Deleted");
                this.ip_selected = [];
                this.deletelotDilog = false;
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                this.showAlert("error", "No Data Found");
              }
            }).catch(error => {
                  this.showAlert("error", "Something went wrong from Network" + error);
              }); 
          }
          if(this.active_tab == 'In Progress B2C'){
            this.$http.secured
            .post("/api/v2/warehouse/liquidation_order/b2c/in_progress", 
                {
                  "liquidation_order":{
                    "ids":this.b2b_liq_id
                  }
                }
            )
            .then(response => {
              if (response.data) {
                this.showAlert("success", "Lot Deleted");
                this.ip_selected = [];
                this.deletelotDilog = false;
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                this.showAlert("error", "No Data Found");
              }
            }).catch(error => {
                  this.showAlert("error", "Something went wrong from Network" + error);
              }); 
          } 
          if(this.active_tab == 'Pending Decision'){
            this.$http.secured
            .post("/api/v2/warehouse/liquidation_order/pending/decision/delete_lots", 
                {
                  "liquidation_order":{
                    "ids":this.b2b_liq_id
                  }
                }
            )
            .then(response => {
              if (response.data) {
                this.showAlert("success", "Lot Deleted");
                this.ip_selected = [];
                this.deletelotDilog = false;
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                this.showAlert("error", "No Data Found");
              }
            }).catch(error => {
                  this.showAlert("error", "Something went wrong from Network" + error);
              }); 
          }            
        },
        allocationchanelb2csubmit() {
          this.$http.secured          
            .post(`/api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.id}/remove_lot_items`, 
            {
              remove_tag_numbers: this.tagIds
            })
            .then(response => {
              if (response.status === 200) {
                this.successmessage = response.data.message
                this.files = [];
                this.loadData('Pending B2B Publish');
                this.$store.commit("setLotIds", { lotIds: JSON.stringify([]) });
                this.editinventory = false;
                this.datadetailpopupdisposition = false;
                this.updatelotconfirm = false;
                this.tagIds = ''
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;

              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.errors);
              this.number = 0;
            });
        },

        allocationchanelb2cconfirm(){
          this.updatelotconfirm = true;
          this.eventDeleteClicked = false;
        },
        deleteEvent(item) {
            const tagNumberToDelete = item.tag_number;
            this.tagIds.push(item.tag_number);
            const indexToDelete = this.edit_inventory.findIndex(
              (inventoryItem) => inventoryItem.tag_number === tagNumberToDelete
            );
            if (indexToDelete !== -1) {
              this.edit_inventory.splice(indexToDelete, 1);
            }
            this.eventDeleteClicked = false;
        },
        markewaste(){
          this.picked = ''
          this.markewastedailog = true
          this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        },
        uploadlotfile(){
          this.uploadlotfiledilog = true
        },
        lotCreation(){
          this.liq_id = this.selected.map(liquidation => liquidation.id);
          this.lotCreationdilog = true
          this.$http.secured.get("api/v2/warehouse/liquidation/contracted_price/get_vendor_contract")
            .then(response => {
                this.assign_user_items = response.data.vendor_masters.map(vendor =>({
                  id:vendor.vendor_code,
                  displayText: `Code: ${vendor.vendor_code} | ${vendor.vendor_name}`,
                }));
                this.loading = false;
           })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
          });
        },
        formatDispatchDate(item) {
          if (item && item.dispatch_date) {
            const formattedDate = new Date(item.dispatch_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            return formattedDate;
          } else {
            return "N/A";
          }
        },
        showAlert(alert_type, alert_message) {
          this.alert = true;
          this.alert_type = alert_type;
          this.alert_message = alert_message;
          this.scrollToTop();
          this.alertTimeOut();
        },
        alertTimeOut() {
          setTimeout(() => {
              this.alert = false;
          }, 3000);
        },
        handlePageSizeChange(size) {
          this.pageSize = size;
          this.page = 1
          this.filterPageNo = 1;
          if(this.isFilteringPage){
              this.applyFilterFunc();
              return;
          }
          if (this.active_tab == 'Channel Allocation') {
            this.channelAllocation();      
          }else if(this.active_tab == 'Price Discovery Method'){
            this.pricediscovery();
          }else if(this.active_tab == 'Create Lots (Con)'){
            this.create_lotCon();
          }else if(this.active_tab == 'Create Lots (ComBid)'){
            this.create_lotCombid();
          }else if(this.active_tab == 'Pending B2B Publish'){
            this.pendingB2b_publish();
          }else if(this.active_tab == 'In Progress B2B'){
            this.inProgressB2B(); 
          }else if(this.active_tab == 'Pending Decision'){
            this.pendingDecision();
          }else if(this.active_tab == 'Pending B2C Publish'){
            this.pendingB2CPublish();
          }else if(this.active_tab == 'In Progress B2C'){
            this.inProgressB2C();
          }else if(this.active_tab == 'Pending Payment'){
            this.pendingPayment();
          }else if(this.active_tab == 'Pending dispatch confirmation & Time'){
            this.pendingDispatchConfirmTime()
          }else if(this.active_tab == 'Dispatch'){
            this.dispatch();
          }else if(this.active_tab == 'Create Lots (MOQ)'){
            this.createLotsMOQ();
          }
        },
        handlePageChange(value) {
          this.page = value;
          if(this.isFilteringPage){
            this.filterPageNo = value;
            this.applyFilterFunc();
            return;
        }
          if (this.active_tab == 'Channel Allocation') {
            this.channelAllocation();      
          }else if(this.active_tab == 'Price Discovery Method'){
            this.pricediscovery();
          }else if(this.active_tab == 'Create Lots (Con)'){
            this.fetchPendingInspection();
          }else if(this.active_tab == 'Create Lots (ComBid)'){
            this.create_lotCombid();
          }else if(this.active_tab == 'Pending B2B Publish'){
            this.pendingB2b_publish();
          }else if(this.active_tab == 'In Progress B2B'){
            this.inProgressB2B() 
          }else if(this.active_tab == 'Pending Decision'){
            this.pendingDecision();
          }else if(this.active_tab == 'Pending B2C Publish'){
            this.pendingB2CPublish();
          }else if(this.active_tab == 'In Progress B2C'){
            this.inProgressB2C();
          }else if(this.active_tab == 'Pending Payment'){
            this.pendingPayment();
          }else if(this.active_tab == 'Pending dispatch confirmation & Time'){
            this.pendingDispatchConfirmTime()
          }else if(this.active_tab == 'Dispatch'){
            this.dispatch()
          }else if(this.active_tab == 'Create Lots (MOQ)'){
            this.createLotsMOQ();
          }
        },
        updatePageSizes(totalCount) {
          if (totalCount <= 25) {
            this.pageSizes = [25];
          } else if (totalCount <= 50) {
            this.pageSizes = [25, 50];
          } else if (totalCount <= 75) {
            this.pageSizes = [25, 50, 75];
          } else {
            this.pageSizes = [25, 50, 75, 100];
          }
        },
      // pagination params
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
      closePopupLotCreate(){
        this.lotCreationdilog = false;
        this.lot_name = ''
        this.liq_id = ''
        this.assign_buyer = ''
        this.selected=[]
      },
      createLotContract(){
        this.$http.secured.post('/api/v2/warehouse/liquidation/contracted_price/create_lot', {          
           "lot_name":this.lot_name,
          "liquidation_ids":this.liq_id,
          "assigned_buyer": this.assign_buyer
         }
          )
        .then(response => {
          if (response.data) {
            this.selected = [];
            this.lotCreationdilog = false
            this.lot_name = ''
            this.liq_id = ''
            this.assign_buyer = ''
            this.successmessage = response.data.message
            this.successpopup = true
            this.showAlert("success", "Successfully created");
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.loading = false;

        });
      },
      get_vendor_liquidation() {
      this.$http.secured.get("api/v2/warehouse/liquidation/competitive_bidding_price/buyers")
        .then(response => {
            this.assign_user_items = response.data.buyer_masters
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
    },

      fileLotCreatecontract(){
        const formData = new FormData();
        formData.append('lot_file', this.file)
       if(this.active_tab == 'Create Lots (Con)'){
        this.$http.secured.post('api/v2/warehouse/liquidation/contracted_price/create_lot', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
             }
         }
          )
        .then(response => {
          if (response.data) {
            this.uploadlotfiledilog = false;
            this.file = '';
            this.showAlert("success", "Successfully updated");
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       }
       if(this.active_tab == 'Create Lots (ComBid)'){
        this.$http.secured.post('api/v2/warehouse/liquidation/competitive_bidding_price/create_lot', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
             }
         }
          )
        .then(response => {
          if (response.data) {
            this.uploadlotfiledilog = false;
            this.file = '';
            this.showAlert("success", "Successfully created");
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       }
      },
      closeFilePopup(){
        this.uploadlotfiledilog = false;
        this.file = '';
      },
      editinventorydilog(){
        this.editinventory = true;
        this.tagIds = [];
        this.eventDeleteClicked = true;
        this.itemsheader = [
              { text: "Tag ID", value: "tag_number"},
              { text: "Article ID", value: "sku_code"},
              { text: "", value: "delete_item"},
            ];
        this.$http.secured
        .get(`/api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.id}/lot_details`)
        .then(response => {
          if (response.data) {
            this.edit_inventory = response.data.liquidation_order.liquidations
            this.new_lot_name = response.data.liquidation_order.lot_name
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
      navigateeditinventorydilogToComponent() {
        this.$store.commit("setLotIds", {
            lotIds: this.id,
            action:'edit_lot'

          });
          this.$router.push({ name: 'CreateLotCompBidd', query : { action : "edit-lot" }});
        },
      navigateToComponent() {
            var dc = this.selected.map(x =>  x.destination_city)
            var ewaste = Array.from(new Set(this.selected.map(x => x.ewaste)));
            const unique = (value, index, self) => {
              return self.indexOf(value) === index
            }
            dc = dc.filter(function( element ) {
              return element !== undefined;
            });

            if(ewaste.length > 1){
              this.selected = []
              this.showAlert("error", "Both E-waste and Non-ewaste items not to be in same lot");
              return
            }
            var unique_array = dc.filter(unique)
            if (unique_array.length > 1) {
              this.selected = []
              this.showAlert("error", "Select Same Cities");
              return
            }
            let benchmarkSum = 0;
            for(var i=0; i<this.selected.length; i++){
              benchmarkSum+=  this.formatNumber(this.selected[i].bench_mark_price);
            }
            this.$store.commit("setLotIds", {
              lotIds:  JSON.stringify(this.selected.map(a => a.id)),
              action:'create_lot',
              inventoryId : benchmarkSum, //invenoryId as benchmarkPrice
            });
          this.$router.push({ name: 'CreateLotCompBidd',query : { action : "create-lot" } });
        },
        moveToMAQFromComBidd(){
          this.liq_id = this.selected.map(liquidation => liquidation.id);
        this.$http.secured.post('api/v2/warehouse/liquidation/competitive_bidding_price/move_to_moq', {
          "liquidation":{
             "ids":this.liq_id
          }
         }
          )
        .then(response => {
          if (response.data) {
            this.liq_id = ''
            this.assign_buyer = ''
            // this.loadData(this.active_tab)
            this.moveItemCommToMoq = false
            this.successmessage = `${this.selected.length} item(s) is successfully allocated to MOQ`
            // this.selected = [];
            this.successpopup = true
            this.showAlert("success", "Successfully updated");
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });
      },
      afterClickOkLoadData(){
          this.successpopup = false;
          this.successmessage = ''
          this.$store.commit("setMessage", { responseMessage: undefined });
          this.selected=[];
          this.ewasteYes = false
          this.loadData(this.active_tab);     
    },
        closeSuccesspopup(){
          this.successpopup = false;
          this.ewasteYes = false
        },
      editbidtiming(){
        if(this.active_tab == "In Progress B2B"){
          const dateStr = this.selected[0].start_date.slice(0, 16);
        const parts = dateStr.split(/[\s/:-]/);
        const startDate = new Date(parts[2],parts[1]-1,parts[0],parts[3],parts[4])
        const currentDate = new Date();
        if(startDate <= currentDate){
            this.showAlert("warning", "Lot already started");
            this.ecitBidTimeDilog = false
            this.selected = []
          }else{
            this.ecitBidTimeDilog = true
            this.number=0;
          }       
        }else{
          this.ecitBidTimeDilog = true
            this.number=0;
        }
        
      },
      closeEditBidDailog(){
        this.ecitBidTimeDilog = false
        this.$refs.editDateTimeForm.reset();
        this.time1=null;
        this.time2=null;
        this.selected = [];
      },
      formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hour}:${minutes}`;
},
      openDialog() {
      this.dialogVisible = true;
    },
      closeDialog() {
        this.dialogVisible = false;
      },
      assignBuyerList() {
      this.$http.secured.get("api/v2/warehouse/liquidation_order/b2b/in_progress/vendor_list")
        .then(response => {
            this.assign_user_items = response.data.vendor_masters
            this.loading = false;
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
    }, 
      reserveLotDialog(){
           const liq_id = this.selected.map(liquidation => liquidation.id);
          let str = String(liq_id);
          this.liq_id = str;
          this.reserveLotPopup = true
          this.get_vendor_liquidation();
      },
      reserveConfirm(){
        this.liq_id = this.selected.map(liquidation => liquidation.id);
        this.$http.secured.post('/api/v2/warehouse/liquidation_order/b2b/in_progress/reserve', {
          "liquidation_order":{
             "ids":this.liq_id,
             "winner_code":this.assign_buyer
          }
         }
          )
        .then(response => {
          if (response.data) {
            this.reserveLotPopup = false
            this.selected = []
            this.liq_id = ''
            this.assign_buyer = ''
            this.successmessage = response.data.message
            this.successpopup = true
            this.showAlert("success", "Successfully updated");
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });
      },
      isMoqLot() {
        return this.selected.length !== 1 || this.selected[0].lot_type === 'MOQ Lot';
      },
      assignLotToBuyer(){
        const selectedItem = this.selected.find(item => item.uniq_bids_no === 0);
          if (selectedItem) {
            this.showAlert("warning", 'Please select a bidder lot.');
            this.selected = []
            return;
          }
        this.$store.commit("setLotIds", {
            lotIds: JSON.stringify(this.selected.map(a => a.id)),
          });
          this.$router.push({ name: 'AssignLotToBuyer' });
        },
        navigateToRepublish(condition) {
          if(this.selected.length == 1){
            if (this.selected[0].lot_type === 'Competitive Lot'){
                  this.$store.commit("setLotIds", {
                  lotIds: this.selected.map(liquidation => liquidation.id),
                  action:condition
                   }); 
                 this.$router.push({ name: 'CreateLotCompBidd', query : { action : "republish" } }); 
            }else if(this.selected[0].lot_type === 'MOQ Lot'){
                this.navigateToMOQGridFrom('re_publish_payment')
              }                
            }else{
              this.showAlert("warning", "Please select one lot for Republish");
              this.selected = []
            }
        },
        opendialogMoveToB2b(){
          this.moveToB2B = true;
          this.b2b_liq_id = this.selected.map(liquidation_order => liquidation_order.id);
        },
        consfirmMoveToB2B(){
          this.$http.secured
            .post("/api/v2/warehouse/liquidation/b2c_pending_publish/move_to_b2b", 
                {
                  "liquidation":{
                    "ids":this.b2b_liq_id
                  }
                }
            )
            .then(response => {
              if (response.data) {
                this.showAlert("success", "Successfully alloted!");
                this.selected = [];
                this.b2b_liq_id = ''
                this.moveToB2B = false;
                this.successmessage = response.data.message
                this.successpopup = true
              } else {
                this.showAlert("error", "No Data Found");
              }
            }).catch(error => {
                  this.showAlert("error", "Something went wrong from Network" + error);
              });
        },
        openPublishDialog(){
          this.publishDialog = true;
          this.getPlatformList()
          this.b2b_liq_id = this.selected.map(liquidation_order => liquidation_order.id);
          this.benchmark_price = 0;
          this.selected.forEach( item => {
            this.benchmark_price += this.formatNumber(item.bench_mark_price) })
          this.$refs.lotPublishForm.reset();
          this.lotImages = [];
          this.lotImageNames = [];
        },
        openImagePopup(){
        this.initialLotImagesLength = this.lotImages.length;
        this.addImagesPopup = true;        
      },
      openImagePopupSingle(image) {
        this.selectedImage = image;
        this.imagePopup = true;
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
    getImageName(imageUrl) {
    const urlParts = imageUrl.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    return fileName;
  },
  removeImage(index) {
    this.lotImages.splice(index, 1);
    this.lotImageNames.splice(index, 1);
    this.lotImagesFileFormat.splice(index,1);
  },
  publishLot(){
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
        if (this.$refs.lotPublishForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
          }else{
          const formData = new FormData();
          const ecom_liquidation = {
            "discount":this.discount,
            "publish_price": this.publish_price,
            "start_date":(this.bid_start_date + " " + this.time1),
            "end_date":(this.bid_end_date + " " + this.time2),
            "platform":this.platform,
            "liquidation_ids":this.b2b_liq_id,    
         }
          for(var i=0; i < this.lotImagesFileFormat.length; i++){
            formData.append("images[]", this.lotImagesFileFormat[i])
          }
          for (const key in ecom_liquidation) {
              formData.append(`ecom_liquidation[${key}]`, ecom_liquidation[key]);
            }
          this.$http.secured
          .post(`api/v2/warehouse/liquidation/b2c_pending_publish/publish`, formData,{
              headers: {
              'Content-Type': 'multipart/form-data'
                  }
         })
          .then(response => {
            if (response.data) {  
              this.publishDialog = false
              this.selected = []
              this.b2b_liq_id = ''
              this.successmessage = response.data.message
              this.successpopup = true
              this.$refs.lotPublishForm.reset();
              this.showAlert("success", "Lot Created For Selected Inventory");
              this.files         = [];
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
          }); 
        }}
     },
      openUpdateSalesDialog(){
        this.updateSalesPopup = true;
        this.b2b_liq_id = this.selected.map(liquidation_order => liquidation_order.id);
      },
      submitUpdateSalesDetails(){
        this.$http.secured.post('/api/v2/warehouse/liquidation_order/b2c/in_progress/update_sales', {
          "lot":{
             "buyer_name":this.buyer_name,
             "buyer_address_1":this.address_line_1,
             "buyer_address_2":this.address_line_2,
             "buyer_city":this.city,
             "buyer_state":this.state,
          },
          "liquidation_order": {
            "ids": this.b2b_liq_id
          }
         }
          )
        .then(response => {
          if (response.data) {
            this.updateSalesPopup = false
            this.selected = []
            this.b2b_liq_id = ''
            this.buyer_name = ''
            this.address_line_1 = ''
            this.address_line_2 = ''
            this.city = ''
            this.state = ''            
            this.successmessage = response.data.message
            this.successpopup = true
            this.showAlert("success", "Successfully updated");
          } else {
            this.showAlert("error", "No Data Found");
            this.number = 0;
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });
      },
      openupdatePaymentDialog(){
        this.get_vendor_liquidation()
        this.updatePaymentPopup = true
        this.liq_id = this.selected.map(liquidation => liquidation.id);
        for (let i = 0; i < this.selected.length; i++) {
        const selectedItem = this.selected[i];
        this.purchaseAmount = selectedItem.purchase_amount;
        this.amountReceived = selectedItem.amount_received,
        this.total_amount =   parseInt(this.purchaseAmount.replace(/,/g, "")) - parseInt(this.amountReceived.replace(/,/g, ""))
      }
      },
      paymentUpdateDetailsSubmit() {
          this.$http.secured
            .put(`/api/v2/warehouse/liquidation_order/pending/payment/${this.liq_id}`, 
            {
              "payment_received": this.purchase_amount,
              "transaction_id": this.payment_ref_number
            })
            .then(response => {
              if (response.status === 200) {
                this.successmessage = response.data.message
                this.updatePaymentPopup = false
                this.successmessage = response.data.message
                this.successpopup = true
                this.selected = []
                this.purchase_amount = ''
                this.payment_ref_number = ''
                this.liq_id = ''
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;

              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.errors);
              this.number = 0;
            });
        },
        openCancelPendingPayment(){      
          this.number = 0;    
          this.cancelPaymentPopup = true
          this.select_buyer = ''
          this.liq_id = this.selected.map(liquidation => liquidation.id);
          const itemsWithNullEwaste = this.selected.filter(liquidation => liquidation.lot_type === 'Competitive Lot');
        if (itemsWithNullEwaste.length > 0) {
          const itemNames = itemsWithNullEwaste.map(liquidation => liquidation.lot_type).join(", ");
          this.reserveLotDisabled = true
          this.assignDisabled = false
          return; 
        }else{
          this.reserveLotDisabled = false
          this.assignDisabled = true
        }
        },
        assignLotOne(){
          const amountReceived = this.selected.map(liquidation => liquidation.amount_received);
          if(amountReceived  == 0){
            if(this.selected.length == 1){
          this.$http.secured
        .get(`/api/v2/warehouse/liquidation_order/pending/decision/get_bidders?id=${this.liq_id}`)
        .then(response => {
          if (response.data) {
            this.assign_user_items = response.data.bids_details
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
         }else{
          this.showAlert("warning", "Please select one lot for assign. ");
                 this.cancelPaymentPopup = false
                 this.select_buyer = ''
                 this.selected = []                 
         }
          }else{
            this.showAlert("warning", `Unable to assign lot! ${this.liq_id} have Payment initiated. `);
                 this.cancelPaymentPopup = false
                 this.select_buyer = ''
                 this.selected = [] 
          }
        
        },
        getDataAssign() {    
        const filteredItems = this.assign_user_items.filter(data => {
          return data.higest_bid_id === this.assign_buyer;
        });
          this.biddername = filteredItems[0].user_name
          this.highestBidId = filteredItems[0].higest_bid_id
          this.usermail  = filteredItems[0].user_email
          this.highestbid = filteredItems[0].higest_bid
      },
        lotCancelApiCall(){
          this.number++;
          this.liq_id = this.selected.map(liquidation => liquidation.id);
          const id = parseInt(this.liq_id[0])
          if(this.select_buyer === 'option1'){
            this.$http.secured
            .put(`/api/v2/warehouse/liquidation_order/pending/decision/${this.liq_id}`, 
            {
              "vendor_code":this.highestBidId,
              "user_name":  this.biddername,
              "user_email": this.usermail,
              "higest_bid": this.highestbid     
            })
            .then(response => {
              if (response.status === 200) {
                this.cancelPaymentPopup = false
                this.successmessage = response.data.message
                this.successpopup = true
                this.selected = []
                this.assign_buyer = ''
                this.liq_id = ''
                this.highestBidId = ''
                this.biddername = ''
                this.usermail = ''
                this.highestbid = ''
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;

              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.errors);
              this.number = 0;
            });
          }
          if(this.select_buyer === 'option2'){
            if(this.selected.length == 1){
              if (this.selected[0].lot_type === 'Competitive Lot'){
                this.navigateToRepublish('re_publish_payment')
              }else if(this.selected[0].lot_type === 'MOQ Sub Lot'){
                this.navigateToMOQGridFrom('re_publish_payment')
              }            
              
            }else{
              this.showAlert("warning", "Please select one lot for Republish");
              this.cancelPaymentPopup = false
              this.selected = []
              this.select_buyer = ''
            }
            
          }
          if(this.select_buyer === 'option3'){
            this.$http.secured
            .post(`/api/v2/warehouse/liquidation_order/pending/decision/delete_lots`, 
            {
              "liquidation_order":{
              "ids": this.liq_id
               }          
            })
            .then(response => {
              if (response.status === 200) {
                this.cancelPaymentPopup = false
                this.successmessage = response.data.message
                this.successpopup = true
                this.selected = []
                this.assign_buyer = ''
                this.liq_id = ''
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;

              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.errors);
              this.number = 0;
            });
          }
          if(this.select_buyer === 'option4'){
            this.$http.secured
            .post(`/api/v2/warehouse/liquidation_order/pending/payment/unreserve_sub_lot`, 
            {
             "id":id           
            })
            .then(response => {
              if (response.status === 200) {
                this.cancelPaymentPopup = false
                this.successmessage = response.data.message
                this.successpopup = true
                this.selected = []
                this.assign_buyer = ''
                this.liq_id = ''
              } else {
                this.showAlert("error", "Something went Wrong !!");
                this.ecitBidTimeDilog = false;
                this.number = 0;

              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.error);
              this.number = 0;
            });
          }
        },
        openDispatchDateDialog(){
          this.updateDispatchDatePopup = true
          this.liq_id = this.selected.map(liquidation => liquidation.id);
        },
        submitUpdateDispatchDate(){
          this.$http.secured
            .post(`api/v2/warehouse/liquidation_order/pending/dispatch_confirmation_time/update_dispatch_date`, 
            {
              "liquidation_order":{
                 "ids": this.liq_id
              },
              "dispatch_date": this.publish_end_date      
            })
            .then(response => {
              if (response.status === 200) {
                this.updateDispatchDatePopup = false
                this.successmessage = response.data.message
                this.successpopup = true
                this.selected = []
                this.publish_end_date = ''
                this.liq_id = ''
              } else {
                this.showAlert("error", "Something went Wrong !!");
              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.errors);
              this.number = 0;
            });
        },
        validateInput() {
            this.payment_ref_number = this.payment_ref_number.replace(/[^a-zA-Z0-9]/g, "");
        },
    disableBtn() {
    return this.selected.length === 0 || this.selected.some(item => !item.has_inventory_gate_pass);
    },
      validateAmount(value) {
        const totalAmount = this.formatNumber(value);
        // if(totalAmount === this.formatNumber(this.purchaseAmount)){
        //   return true;
        // }
        if(!(/^(0|[1-9]\d*)(\.\d+)?$/.test(this.formatNumber(value)))){
          this.purchase_amount = 0
          return 'Enter a valid number'
        }
        if (totalAmount > this.total_amount) {
          return 'Total amount received exceeds the purchase amount.';
        }
        return true;
      },
      republishShowAlert(){
        const amountReceived = this.selected.map(liquidation => liquidation.amount_received);
          if(amountReceived  != '0'){
            this.showAlert("warning", `Unable to Re-publish lot! ${this.liq_id} have Payment initiated.`);
                 this.cancelPaymentPopup = false
                 this.select_buyer = ''
                 this.selected = [] 
          }
      },
      unReserveLotShowAlert(){
        const amountReceived = this.selected.some(liquidation => liquidation.amount_received != 0);
        if(this.selected.length > 1){
          this.showAlert("warning", `Please select one sub lot for un-reserve`);
          this.cancelPaymentPopup = false
          this.select_buyer = ''
          this.selected = [] 
        }else{
          if(amountReceived){
            this.showAlert("warning", `Unable to Unreserve sub-lot! ${this.liq_id} have Payment initiated.`);
                 this.cancelPaymentPopup = false
                 this.select_buyer = ''
                 this.selected = [] 
          }
        }
         
      },
      deleteShowAlert(){
        const amountReceived = this.selected.map(liquidation => liquidation.amount_received);
          if(amountReceived  != '0'){
            this.showAlert("warning", `Unable to delete lots! ${this.liq_id} have Payment initiated.`);
                 this.cancelPaymentPopup = false
                 this.select_buyer = ''
                 this.selected = [] 
          }
      },
      calculateDiscPercent(){
        this.showPriceError = false;
        this.discountDisable = true;
        let publishPriceValue = typeof this.publish_price === "string" ? parseFloat(this.publish_price.replace(/,/g, '')) : ""
        if(isNaN(publishPriceValue)){
          this.format_publish_price = ""
          return
        }
        else if(this.publish_price>this.benchmark_price){
          this.showPriceError = true;
        }
        else if(this.publish_price > 0){
          this.discount = ((Number(this.benchmark_price) - Number(this.publish_price))*100/Number(this.benchmark_price)).toFixed(2);
        }
        else {
          this.discount = '';
          this.discountDisable = false;
        }
      },
      calculatePublishPrice(){
        this.showDiscError = false;
        this.publishpriceDisable = true;
        if(this.discount>100){
          this.showDiscError = true;
        }
        else if(this.discount > 0){
        this.format_publish_price = ((100 - Number(this.discount))*Number(this.benchmark_price)/100).toFixed(2);
        } else {
          this.format_publish_price = '';
          this.publishpriceDisable = false;
        }
      },
      navigateToMOQComponent(condition) {
        this.$store.commit("setLotIds", {
            lotIds: this.id,
            action:condition

          });
          this.$router.push({ name: 'CreateLotsMOQ' });
        },
        navigateToMOQGridFrom(condition) {
          if(condition == 're_publish_payment'){
            var dc = this.selected.map(x =>  x.id)
            var id = dc.pop();
        this.$store.commit("setLotIds", {
            lotIds: id,
            action:condition
          });
          this.$router.push({ name: 'PriceGridMoq' });
          }else if(condition == 'edit_lot_moq'){
        this.$store.commit("setLotIds", {
            lotIds: this.id,
            action:condition
          });
          this.$router.push({ name: 'PriceGridMoq' });
          }          
        },
        getPlatformList(){
        this.$http.secured.get("/api/v2/warehouse/liquidation/b2c_pending_publish/get_platform_list")
        .then(response => {
          if(response.data){
            this.platform_items = response.data.ext_platform_names 
            this.loading = false;
          }else{
            this.loading = true;
          }
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
    },
    closeImageDialog() {        
          const newImagesCount = this.lotImages.length - this.initialLotImagesLength;
          if (newImagesCount > 0) {
            // Remove newly added images if any
            this.lotImages.splice(this.initialLotImagesLength, newImagesCount);
            this.lotImageNames.splice(this.initialLotImagesLength, newImagesCount);
            this.lotImagesFileFormat.splice(this.initialLotImagesLength, newImagesCount);
          }
          this.addImagesPopup = false;
        },
    competitivebidding(){
         this.movecommbidd = true
         this.channel_liq_id = this.selected.map(liquidation => liquidation.id);
        },
    submitMoveCommBidd(){
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/moq/move_to_competative_bidding', 
            {
              "liquidation":{
                "ids":this.channel_liq_id,
              }              
            }
          )
          .then(response => {
            if (response.data) {
                // this.table_data = response.data.liquidations
                this.successmessage = response.data.message
                this.showAlert("success", "Successfully alloted!");
                this.movecommbidd = false
                this.successpopup = true
              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              }
          }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
      },
      navigateToFileUpload(){
        this.$store.commit("setLotIds", {
              lotIds:  JSON.stringify(this.selected.map(a => a.id)),
              action:'create_lot'
            });
        this.$router.push({ name: 'LotFileuploadComm' });
        },
        itemMoveCommToMoqTab(){
          const itemsWithNullEwaste = this.selected.filter(liquidation => liquidation.ewaste === 'yes');
          if (itemsWithNullEwaste.length > 0) {
          this.showAlert("warning", "Please select only non ewaste items for move to moq");
          this.moveItemCommToMoq = false;
          this.selected = []
          return; // Stop further execution
        }
        else{
          this.moveItemCommToMoq = true
        }
          
        },
        downloadInventory() {
          this.liq_id = this.selected.map(liquidation => liquidation.id);
          this.$http.secured.post("/api/v2/warehouse/inventory_file_uploads/download_competitive_liquidations", {
              "liquidation":{
              "ids":this.liq_id
            }
          })
            .then(response => {
              this.successmessage = response.data.message
                this.successpopup = true
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
.filter-liquidation{
  width: auto !important;
}
.v-dialog__content:has(.filter-liquidation){
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
  }
  .v-dialog>.v-card>:has(.v-card__title){
  overflow-wrap: break-word !important;
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
  .next_filter_dialog {
    position: absolute;
    left: var(--dialog-leftpos);
    top: var(--dialog-yposi);
    margin: 0;
  }
  .filterchip {
    padding: 7px 10px !important;
    height: auto !important;
  }
  .menuItemCloseIcon {
    min-height: auto !important;
    border: none !important;
  }
  .active_border-primary {
    border-color: #1976d2 !important;
    border-width: 2px !important;
  }
  .active_float-label {
    position: absolute;
    top: 0;
    left: 9px;
    display: table-cell;
    white-space: nowrap;
    margin-top: -7px;
    background-color: #ffffff;
  }
  .creation-date{
    font-size: 12px;
    margin-left: 6px;
    color: #ccc;
  }
  .item-selected{
    margin-top: 23px;
    position: absolute;
    left: 41%;
  }
  @media (max-height: 1104px) {
    .PaddingItemPerPage{
    padding: 8px !important;
  }
}
  @media (min-height: 1126px) {
    .PaddingItemPerPage{
    padding: 24px !important;
  }
  }
  /* .v-data-table {
  height: auto !important;
} */
/* .v-data-simple-adjust{
  height: auto !important;
} */
.resetButton{
  background: #6c757d!important;
  color: #fff !important;
}
.custom-radio {
  width: 20px; /* Adjust the size as needed */
  height: 20px; /* Adjust the size as needed */
}
.custom-label{
  position: absolute;
  margin-left: 10px
}
.disabled-link {
    color: #999; /* Adjust the color to your preference */
    pointer-events: none; /* Prevents any interaction with the link */
    text-decoration: none; /* Optionally remove underline */
  }

</style>
