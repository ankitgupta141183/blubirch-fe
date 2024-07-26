<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <v-row class>
        <v-col class xs8 :cols="8">
          <span class="mdi mdi-arrow-left-thick"></span>

          
            <span class="mx-5">Invoice Summary</span>
         
        </v-col>
        <v-col class xs4 :cols="4">
          <span class=" float-right mdi mdi-share-variant"></span>
          <v-spacer></v-spacer>
          <span class="mx-5 float-right mdi mdi-download"></span>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-container class="ma-0 pa-0" fluid grid-list-lg>
            <v-layout class="ma-0 pa-0" row>
              <v-flex class="ma-0 pa-0" xs12>
                <div class="flex-row" v-if="active_tab === 'Billing'">
                  <v-row class="ma-0 pa-0">
                    <v-col class="caption text-color" xs6 :cols="6" md="2" sm="6">
                      <div>Invoice Number</div>
                      <div>Customer Name</div>
                      <div>Customer Code</div>
                      <div>Customer Location</div>
                      <div>Customer Contact</div>
                    </v-col>

                    <v-col class="caption" xs6 :cols="6" md="10" sm="6">
                      <div>INV57654234</div>
                      <div>Sri Devi Future Electricals</div>
                      <div>VEN57643</div>
                      <div>Bangalore</div>
                      <div>9257724561</div>
                    </v-col>

                    <v-col class xs8 :cols="8" md="10" sm="8">
                      <div class="subheading font-weight-medium text-color">Bill Total</div>
                    </v-col>

                    <v-col xs12 :cols="12">
                      <v-divider class="ma-0 pa-0"></v-divider>
                    </v-col>

                    <v-col class="caption text-color" xs6 :cols="6" md="2" sm="6">
                      <div>Quantity</div>
                      <div>Amount</div>
                      <div>Tax(18%)</div>
                      <div>Discount</div>
                      <div>Total Amount</div>
                    </v-col>

                    <v-col class="caption" xs6 :cols="6" md="10" sm="6">
                      <div>456</div>
                      <div>₹36,83,000</div>
                      <div>₹4,83,000</div>
                      <div>7%</div>
                      <div>₹41,83,000</div>
                    </v-col>

                    <v-col class xs8 :cols="8" md="10" sm="8">
                      <div class="subheading font-weight-medium text-color">Bill Items</div>
                    </v-col>

                    <v-col class xs4 :cols="4" md="2" sm="8">
                      <i class="float-right mdi mdi-magnify"></i>
                    </v-col>

                    <!-- <v-col xs12 :cols="12">
                      <v-divider></v-divider>
                    </v-col>-->

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
                                @click="proceedGrading(item)"
                              />
                            </v-col>

                            <v-col class="ma-0 pa-0" xs8 :cols="8" md="11" sm="8">
                              <span class="text-color">{{item.title}}</span>
                              <div>{{item.subtitle}}</div>
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs8 :cols="6" md="10" sm="6">
                                  <span class="caption">
                                    <i class="mdi mdi-currency-inr"></i>
                                    {{item.mrp}}
                                  </span>
                                </v-col>
                                <v-col class="ma-0 py-0" xs6 :cols="6" md="2" sm="6">
                                  <span class="caption text-color float-right">Total Amount</span>
                                </v-col>

                                <v-col class="ma-0 pa-0" xs7 :cols="10" md="10" sm="7">
                                  <span class="caption">Quantity: 43</span>
                                </v-col>

                                <v-col class="ma-0 py-0" xs5 :cols="2" md="2" sm="5">
                                  <span class="caption float-right">₹43,000</span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>

    <template absolute class="font-weight-medium">
      <div class="d-flex caption" style="background-color: #0357D0;color:white">
        <v-row class="ma-0 pa-0">
          <v-col xs8 :cols="8" md="10 " sm="8">
            <span>
              36 ITEMS |
              <i class="mdi mdi-currency-inr"></i>9,34,000
            </span>
          </v-col>
          <v-col xs4 :cols="4" md="2" sm="4">
            <a style="color:white;margin-left:28px">Continue</a>
          </v-col>
        </v-row>

        <!-- <span   style="margin-left:40px;width:70%">36 ITEMS | <i class="mdi mdi-currency-inr"></i>9,34,000</span>

        <span> <a class="float-right" style="color:white">Continue</a></span>-->
      </div>
    </template>
  </v-card>
</template>

<style>
/* .v-card {
  max-width: 98% !important;
}

.v-card-100 {
  max-width: 100% !important;
} */

.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)
  > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none;
  visibility: hidden;
}
.text-color {
  color: #0357d0;
}
.header-background {
  background-color: #0357d0;
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
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
        // { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
        // { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
        // { divider: true, inset: true },
      ],
    };
  },

  methods: {
    loadData(tab) {
      this.active_tab = tab;
    },
  },
};
</script>