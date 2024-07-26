<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
  <div> <HeaderComponent :headerTitle="headerText" /></div>    
    <v-card class="v-card-100">
      <v-tabs >
        <v-tab
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        color="primary" @click="createLotDialog= true"  v-if="active_tab == 'Lot Creation'"
      >
        AUTO-LOT
      </v-btn>
      <v-btn
        color="primary" @click="createLotDialog= true"  v-if="active_tab == 'Publish Lots'"
      >
        PUBLISH lOTS
      </v-btn>
     <!-- <v-select
            :items="['B2B Email','B2B Auction']"
            label="MANUAL CREATION"
            outlined
            color="primary"
            width="20"
          ></v-select> -->
    </v-card-title>

    <v-row justify="center">
            <v-dialog v-model="createLotDialog" persistent max-width="1000px">
                <v-form ref="createLotForm">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>B2B - Email Auction </span>
                            <v-icon @click="createLotDialog = false" class="ml-auto" color="white">fas fa-close</v-icon>
                        </v-card-title>
                        <v-card-title>
                         <v-radio  label="Blind Auction" color="primary" value="blind_auction" ></v-radio>
                         </v-card-title>
                         <v-card-title>
                         <v-radio  label="Forward Auction" color="primary" value="forward_auction" ></v-radio>
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
                                        <v-text-field readonly hide-details label="MRP ($)" outlined v-model="lot_mrp" type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field readonly hide-details label="Buy Now($)" outlined v-model="lot_expected_price" type="number"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field readonly hide-details label="Reserve Price($)" outlined v-model="reserve_price" type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field readonly hide-details label="Floor Price($)" outlined v-model="floor_price" type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field readonly hide-details label="Increment Slab" outlined v-model="increment_slab" type="number"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
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
                                    <v-date-picker :min="new Date().toISOString().substr(0, 10)"  v-model="end_date" no-title scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(end_date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                              </v-col>
                              <v-col cols="12" sm="4" md="6">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
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
                                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(end_date)">OK</v-btn>
                                    </v-date-picker>
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
                    <v-card-actions>
                    <v-file-input
                          accept="image/png, image/jpeg, image/bmp"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                    </v-card-actions>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small text color="normal" @click="closePopup">Cancel</v-btn>
                        <v-btn small color="primary" >Confirm</v-btn>
                    </v-card-actions>
                </v-card>
                 </v-form>
            </v-dialog>
        </v-row>


    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
          v-model="selected"
          :dense="true"
          :headers="headers"
          :items="table_data"
          :search="search"
          :item-key="item_key"
          class="elevation-1"
          show-select
          :loading="loading"
          loading-text="Loading Data... Please wait"
        >
        <template v-slot:item.actions="{ item }">
           <img src="@/assets/images/job_sheet.png"/>
        </template>

        </v-data-table>
      </v-flex>
  
  </v-layout>
  </v-card>
</template>

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
</style>

<script>
import HeaderComponent from "@/components/commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      createLotDialog: false,
    headerText: "Liquidation", 
      active_tab: "Lot Creation",
      tabs: [
        "Lot Creation",
        "Publish Lots"
      ],
      search: "",
      headers: [
          { text: "Site Location", value: "site_location" },
            { text: "Category", value: "category" },
            { text: "Brand", value: "brand" },
            { text: "Article Description", value: "article_description", width: '10%' },
            { text: "Serial Number", value: "serial_number"},
            { text: "Grade", value: "grade" },
            { text: "Path", value: "path" }
        ],
        table_data : [{
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        serial_number: 'serial-12333',
        grade : 'Damage',
        path: 'djdjhfjd'
        },
        {
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        serial_number: 'serial-12333',
        grade : 'Damage',
        path: 'djdjhfjd'
        },
        {
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        serial_number: 'serial-12333',
        grade : 'Damage',
        path: 'djdjhfjd'
        },
        {
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        serial_number: 'serial-12333',
        grade : 'Damage',
        path: 'djdjhfjd'
        }

        ]
    };
  },
  created() {
  },
  components: {
    HeaderComponent
  },
    
  methods: {
    
    loadData(tab) {
      this.selected = [];
      this.active_tab = tab;
      this.table_data = [];
      this.search = '';
      if (tab == "Lot Creation") {
          (this.headers = [
            { text: "Site Location", value: "site_location" },
            { text: "Category", value: "category" },
            { text: "Brand", value: "brand" },
            { text: "Article Description", value: "article_description", width: '10%' },
            { text: "Serial Number", value: "serial_number"},
            { text: "Grade", value: "grade" },
            { text: "Path", value: "path" }
          ]);
          this.table_data = [{
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        grade : 'Damage',
        path: 'djdjhfjd'
        },
        {
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        grade : 'Damage',
        path: 'djdjhfjd'
        },
        {
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        grade : 'Damage',
        path: 'djdjhfjd'
        },
        {
        site_location: 'Bangalore',
        category : 'Electronics',
        brand : 'LG',
        article_description: 'New',
        grade : 'Damage',
        path: 'djdjhfjd'
        }
        ]
      }
      
      if (tab == "Publish Lots") {
          (this.headers = [
            { text: "Id", value: "id" },
            { text: "Display Name", value: "display_name" },
            { text: "Blind Bid", value: "blind_bid"},
            { text: "Bid Number", value: "bid_number" },
            { text: "Bid Status", value: "bid_status" },
            { text: "Floor Price", value: "floor_price", width: '10%' },
            { text: "Reserve Price", value: "reerve_price" },
            { text: "Start Date", value: "start_date" },
            { text: "End Date", value: "end_date" },
            { text: "", value: "actions" }
          ]);

          this.table_data = [{
        id: '1',
        display_name : 'Electronics',
        blind_bid : 'LG',
        bid_number: '1122',
        bid_status : 'Damage',
        floor_price: '1000',
        reerve_price: '2000',
        start_date: '20-11-2020',
        end_date: '30-11-2020'
        },
        {
        id: '1',
        display_name : 'Electronics',
        blind_bid : 'LG',
        bid_number: '1122',
        bid_status : 'Damage',
        floor_price: '1000',
        reerve_price: '2000',
        start_date: '20-11-2020',
        end_date: '30-11-2020'
        },
        {
        id: '1',
        display_name : 'Electronics',
        blind_bid : 'LG',
        bid_number: '1122',
        bid_status : 'Damage',
        floor_price: '1000',
        reerve_price: '2000',
        start_date: '20-11-2020',
        end_date: '30-11-2020'
        },
        {
        id: '1',
        display_name : 'Electronics',
        blind_bid : 'LG',
        bid_number: '1122',
        bid_status : 'Damage',
        floor_price: '1000',
        reerve_price: '2000',
        start_date: '20-11-2020',
        end_date: '30-11-2020'
        }
        ]

      }
    }
  }
};
</script>