<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
  <div> <HeaderComponent :headerTitle="headerText" /></div>    
    <v-card class="v-card-100">
    <v-row class="pl-4">
      <v-col class="pt-0 pr-0" cols="6" sm="6" md="2">
        <v-card height="900">
          <v-card-title class="pa-0">
            <v-card-actions>
              <v-btn class="ma-2" color="primary">Write Message</v-btn>
            </v-card-actions>
          </v-card-title>
          <v-divider :inset="inset" horizontal></v-divider>
           <v-card-actions>
           <v-row class="pa-0">
              <v-expansion-panels accordion>
                <v-expansion-panel
                  v-for="(item,i) in items"
                  :key="i"
                >
                  <v-expansion-panel-header>{{ item }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                  <v-overflow-btn  :items="['Pending Claim','Pending Call Log','Pending Brand Resolution','Pending Dispatch','Pending Settlement']">
                </v-overflow-btn>

                  </v-expansion-panel-content>
                </v-expansion-panel>



              </v-expansion-panels>
            </v-row>
                      </v-card-actions>
                </v-card>
              </v-col>
              <v-col class="pt-0 pr-0" cols="6" sm="6" md="4">
                <v-card height="900">
                  <v-card-title class="pa-0">
                    <v-card-title>
                      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search From Message" single-line></v-text-field>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                      <v-btn class="ma-2" color="primary">TRASH</v-btn>
                    </v-card-actions>
                  </v-card-title>
                  <v-divider :inset="inset" horizontal></v-divider>

                   <v-tabs v-model="tab">
                      <v-tab
                        v-for="item in item_tab"
                        :key="item.tab"
                      >
                        {{ item.tab }}
                      </v-tab>
                    </v-tabs>
                
                    <v-tabs-items v-model="tab">
                      <v-tab-item
                        v-for="item in item_tab"
                        :key="item.tab"
                      >
                        <v-card flat>
                          <v-card-text>{{ item.content }}</v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  
                </v-card>
              </v-col>
 
              <v-col class="pt-0 pr-0" cols="6" sm="6" md="5">
                <v-card height="900">
                    <v-card-title>
                      <div style="color:#1B3A57;">Vendor Returns - BA9212322 </div>
                      </v-card-title>

                    <v-card-actions>

                      <div style="color:#1B3A57;">12/02/2020 12:48PM</div>
                    </v-card-actions>
                    <v-divider :inset="inset" horizontal></v-divider>

                    <v-card-actions>
                    <v-row>
                    <v-col cols="12" sm="4" md="2">
                    <v-avatar
                      color="orange"  
                          size="62"
                        >
                          <span class="white--text headline">LG</span>
                        </v-avatar>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                        <span style="font-size:12px;">From : CustomerCare@Lg.com</span>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                        </v-col>

                        <v-col cols="12" sm="4" md="8">
                         <span style="font-size:10px;"> Please place your bids for the lot by visiting the below url </span>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                        </v-col>
                        <v-col cols="12" sm="4" md="8">
                         <span style="font-size:10px;"> https://beam.blubirch.com/product_detail/2052687?bid_id=54207</span>
                        </v-col>


                        </v-row>

                        </v-card-actions>

                    <v-card-actions class="text-right">
                    <v-col cols="12" sm="4" md="4">
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-btn  class="ma-2" color="primary">REPLY</v-btn>
                      </v-col>
                    </v-card-actions>

                  
                </v-card>
              </v-col>
  </v-row>
        
      
    </v-card>
    
        

   
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
      tab: null,
      item_tab: [
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Two', content: 'Tab 2 Content' }],
      headerText: "Mail Box",
      items: ['Vendor Return','Insurance','Repair','Replacement','Redeploy','Markdown','Liquidation']
      
    };
  },
  created() {
  },
  components: {
    HeaderComponent
  },
    
  methods: {
    
  }
};
</script>