<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <span class="mdi mdi-arrow-left-thick"></span>

      <span class="mx-5">Invoice Retail</span>
    </v-app-bar>

    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-container class="ma-0 pa-0" fluid grid-list-lg>
            <v-layout class="ma-0 pa-0" row>
              <v-flex class="ma-0 pa-0" xs12>
                <!-- <div class="main_header">
                  <span class="mdi mdi-arrow-left-thick"></span>
                  Invoice Retail
                </div>-->

                <!-- <v-tabs xs12>
                  <v-tab
                    style="text-transform:none!important;"
                    v-for="(tab, index) in tabs"
                    :key="index"
                  >{{tab}}</v-tab>
                </v-tabs>-->

                <v-tabs class="ma-0 px-0" xs12>
                  <v-tab @click="loadData('Billing')" style="text-transform:none!important;">
                    <span class="mdi mdi-receipt"></span>
                    Billing
                  </v-tab>
                  <v-tab @click="loadData('Customer')" style="text-transform:none!important;">
                    <span class="mdi mdi-account"></span>
                    Customer
                  </v-tab>

                  <v-tab @click="loadData('Payment')" style="text-transform:none!important;">
                    <span class="mdi mdi-credit-card"></span>
                    Payment
                  </v-tab>
                </v-tabs>

                <div class="flex-row" v-if="active_tab === 'Billing'">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <v-divider></v-divider>
                    </v-col>
                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <v-text-field
                        block
                        solo
                        label="Search SKU/Item"
                        prepend-inner-icon="mdi-magnify"
                        append-icon="mdi-barcode-scan"
                      ></v-text-field>
                    </v-col>

                    <v-col class xs8 :cols="8" md="10" sm="8">
                      <div class="subheading font-weight-medium text-color">Bill Items</div>
                    </v-col>

                    <v-col class xs4 :cols="4" md="2" sm="8">
                      <span class="float-right mdi mdi-close-circle"></span>

                      <span class="caption font-weight-medium float-right">Clear Bill</span>
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
                                src="@/assets/images/sc1.png"
                                @click="proceedGrading(item)"
                              />
                            </v-col>

                            <v-col class xs8 :cols="8" md="11" sm="8">
                              <div>
                                <span class="text-color">{{item.title}}</span>
                                <span class="float-right">
                                  <i class="mdi mdi-delete"></i>
                                </span>
                              </div>
                              <div>{{item.subtitle}}</div>

                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs8 :cols="10" md="10" sm="8">
                                  <span class="caption">
                                    <i class="mdi mdi-currency-inr"></i>
                                    MRP
                                    {{item.mrp}}
                                  </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs4 :cols="2" md="2" sm="4">
                                  <span class="pull-right caption">
                                    <v-text-field solo></v-text-field>
                                  </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>

                <div class="flex-row" v-if="active_tab === 'Customer'">
                  <v-row class="ma-0 pa-0">
                    <!-- <v-col xs12 :cols="12">
                      <div
                        class="subheading font-weight-medium"
                        style="color:#0357D0;"
                      >Customer Information</div>
                      <v-divider></v-divider>
                    </v-col>-->

                    <v-col xs12 :cols="12">
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Customer GST * "
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Enter Customer Code* "
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Customer Name * "
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Customer Phone Number * "
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Customer Email * "
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Customer Location * "
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>

                <div class="flex-row" v-if="active_tab === 'Payment'">
                  <v-row class="ma-0 pa-0">
                    <v-col xs12 :cols="12">
                      <div class="subheading font-weight-medium text-color">Coupon Code</div>
                      <v-divider></v-divider>
                    </v-col>

                    <v-col xs12 :cols="12" sm="12">
                      <v-text-field
                        :messages="['Discount of 7% applied on bill']"
                        outlined
                        v-model="customer_code"
                        label="Coupon Code* "
                        suffix="APPLY"
                        required
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col xs1 :cols="1" sm="1">
                      <img
                        class="float-right"
                        style="margin-top:15px"
                        src="@/assets/images/check.png"
                        @click="proceedGrading(item)"
                      />
                    </v-col>-->
                  </v-row>

                  <v-row class="ma-0 pa-0">
                    <v-col xs12 :cols="12">
                      <div class="subheading font-weight-medium text-color">Payment Mode</div>
                      <v-divider></v-divider>
                    </v-col>

                    <v-col xs6 :cols="6" sm="6">
                      <div>Payment Type</div>
                      <br />
                      <div>
                        <v-select :items="items" label="Select" outlined></v-select>
                      </div>
                    </v-col>
                    <v-col xs6 :cols="6" sm="6">
                      <div>ID Proof No.</div>
                      <br />
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Enter Number* "
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col xs12 :cols="12">
                      <v-divider></v-divider>

                      <div class="subheading font-weight-medium">Sub-Total</div>
                    </v-col>

                    <v-col xs4 :cols="4">
                      <div class="d-flex justify-space-between caption text-color">Amount</div>
                      <div>
                        <i class="mdi mdi-currency-inr"></i>9,34,000
                      </div>
                    </v-col>

                    <v-col xs4 :cols="4">
                      <div class="d-flex justify-space-between caption text-color">Disc(%)</div>
                      <div>7</div>
                    </v-col>

                    <v-col xs4 :cols="4">
                      <div class="d-flex justify-space-between caption text-color">Total Amount</div>
                      <div>
                        <i class="mdi mdi-currency-inr"></i>9,34,000
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
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
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