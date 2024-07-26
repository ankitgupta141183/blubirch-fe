<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <v-row class>
        <v-col class xs8 :cols="8">
          <span class="mdi mdi-arrow-left-thick"></span>          
            <span class="mx-5">GRN Item Inward</span>
        </v-col>
        <v-col class xs4 :cols="4">
          <span class="float-right mdi mdi-information-outline"></span>
          <v-spacer></v-spacer>
          <span class="mx-5 float-right mdi mdi-download"></span>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-stepper alt-labels value="2">
            <v-stepper-header>
              <v-stepper-step editable step="1">Box Inward</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="2">Item Inward</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="3">Summary</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="2">
                <div class="flex-row">
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" sm="10" md="10">
                      <v-row class="ma-0 pa-0">
                        <caption class="ma-0 pa-0 dull-color">Scan Box</caption>
                      </v-row>
                      <v-row class="ma-0 pa-0">
                        <h6 class="ma-0 pa-0 dull-color">DX578245379</h6>
                      </v-row>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-row class="ma-0 pa-0" rows="2">
                    <v-col xs="2" sm="2" md="2">
                      <p class="text-end">
                        <img src= "@/assets/images/remove.png">
                      </p>
                    </v-col>
                  </v-row>
                  </v-row>
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" sm="10" md="10">
                      <v-row class="ma-0 pa-0">
                        <caption class="ma-0 pa-0 dull-color">Scan Item</caption>
                      </v-row>
                      <v-row class="ma-0 pa-0">
                        <h6 class="ma-0 pa-0 dull-color">#284567324</h6>
                      </v-row>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-row class="ma-0 pa-0" rows="2">
                    <v-col xs="2" sm="2" md="2">
                      <p class="text-end">
                        <img src= "@/assets/images/remove.png">
                      </p>
                    </v-col>
                  </v-row>
                  </v-row>
                  <v-divider class="ma-0 pa-0"></v-divider>
                  <div class="flex-row">
                  <v-row class="ma-0 pa-0">                                
                    <v-col class xs8 :cols="8" md="10" sm="8">
                      <div class="subheading font-weight-medium text-color">BX_5370</div>
                    </v-col>
                    <v-col class xs4 :cols="4" md="2" sm="8">
                      <div class="subheading font-weight-medium">Item Qty: 3</div>
                    </v-col>
                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <div class="ma-0 pa-0" three-line>
                        <div class="ma-0 pa-0" v-for="(item, index) in listitems">
                          <v-col xs12 :cols="12">
                            <v-divider class="ma-0 pa-0"></v-divider>
                          </v-col>

                          <v-row class="ma-0 pa-0">
                            <v-col class="ma-0 pa-0" xs4 :cols="4" md="1" sm="4">
                              <img
                                class="float-left"
                                style="margin-top:15px"
                                src="@/assets/images/Mobile.png"
                                @click=""
                              />
                            </v-col>

                            <v-col class="ma-0 pa-0" xs8 :cols="8" md="11" sm="8">
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs8 :cols="8" md="10" sm="8">
                                  <span class="text-color">{{item.title}}</span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs5 :cols="4" md="2" sm="4" align="end">
                                  <v-icon medium>info</v-icon>
                                </v-col>
                              </v-row>
                              <div>{{item.subtitle}}</div>
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs8 :cols="6" md="10" sm="6">
                                  <span class="caption">
                                    MRP: 
                                    <i class="mdi mdi-currency-inr"></i>
                                    {{item.mrp}}
                                  </span>
                                </v-col>
                                <v-col class="ma-0 py-0" xs6 :cols="6" md="2" sm="6">
                                  <span class="caption text-color float-right">Total Amount</span>
                                </v-col>

                                <v-col class="ma-0 pa-0" xs7 :cols="10" md="10" sm="7">
                                  <span class="caption">Quantity: {{item.quantity}}</span>
                                </v-col>

                                <v-col class="ma-0 py-0" xs5 :cols="2" md="2" sm="5">
                                  <span class="caption float-right">₹{{item.total_amount}}</span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
            
                </div>
              </v-stepper-content>
              <template absolute class="font-weight-medium">
                <div class="d-flex caption" style="background-color: #0357D0;color:white">
                  <v-row class="ma-0 pa-0">
                    <v-col xs8 :cols="8" md="10 " sm="8">
                      <span>
                      0(4) BOXES | 0(7) ITEMS
                      </span>
                    </v-col>
                    <v-col xs4 :cols="4" md="2" sm="4">
                      <a style="color:white;margin-left:28px" @click="summary()">CONTINUE</a>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style scoped>
.text-color {
  color: #0357d0;
}
.header-background {
  background-color: #0357d0;
}
.dull-color {
  color: #4F4F4F;
}
@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  }
  @media only screen and (max-width: 959px) {
    .v-stepper:not(.v-stepper--vertical) .v-stepper__step__step {
      margin-right: 12px;
    }
  }
}
</style> 

<script>
export default {
  data() {
    return {
      active_tab: "Billing",
      tabs: ["Billing", "Customer", "Payment"],
      show1: "mdi-camera",
      items: ["Cash", "Card", "DD"],

      listitems: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "SKU179821",
          subtitle: "Samsung S20 Ultra 12GB RAM 128GB Memory Smartphone",
          mrp: 85000,
          quantity: 1,
          total_amount: 85000,
          tag_id: ["SR375682","SR375742"],
        },
        // { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "SKU175521",
          subtitle: "Samsung S20 Ultra 8GB RAM 128GB Memory Smartphone",
          mrp: 70000,
          quantity: 3,
          total_amount: 210000,
          tag_id: ["SR375682","SR375742","SR375781"],
        },
        // { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "SKU179337",
          subtitle: "Samsung Note 20 Ultra 12GB RAM 256GB Memory Bronze With S Pen Smartphone",
          mrp: 100000,
          quantity: 4,
          total_amount: 400000,
          tag_id: ["SR375682","SR375742"],
        },
        // { divider: true, inset: true },
      ],
    };
  },

  methods: {
    summary(){
      this.$router.push({name: "GRNSummary"})
    },
  },
};
</script>

