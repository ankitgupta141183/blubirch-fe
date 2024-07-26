<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <span class="mdi mdi-arrow-left-thick"></span>

      <span class="mx-5">Invoice Retail</span>
    </v-app-bar>

    <v-dialog v-model="dialog" max-width="350">
      <v-card class="pa-10">
        <v-row>
          <v-col xs12 :cols="12">
            <v-card-text>Are you sure you want to complete the invoice?</v-card-text>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-col xs6 :cols="6">
              <v-btn small color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
            </v-col>
            <v-col xs6 :cols="6">
              <v-btn
                small
                style="background-color:#0357D0;color:#ffffff"
                text
                @click="confirmDialog"
              >Confirm</v-btn>
            </v-col>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>

    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row>
        <v-flex class="ma-0 pa-0" xs12>
          <v-stepper alt-labels v-model="e1" value="3">
            <v-stepper-header class="caption">
              <v-stepper-step :complete="e1 > 1" editable step="1">Billing</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" editable step="2">Customer</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" editable>Payment</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content stepper="1" step="1">
                <div class="flex-row" v-if="active_tab === 'Billing'">
                  <v-row class="ma-0 pa-0">
                    <v-col block class="ma-0 pa-0" xs12 :cols="12">
                      <v-text-field
                        block
                        solo
                        label="Search SKU/Item"
                        prepend-inner-icon="mdi-magnify"
                        append-icon="mdi-barcode-scan"
                      ></v-text-field>
                    </v-col>

                    <v-col class="ma-0 pa-0" xs8 :cols="8" md="10" sm="8">
                      <div class="subheading font-weight-medium text-color">Bill Items</div>
                    </v-col>

                    <v-col class="ma-0 pa-0" xs4 :cols="4" md="2" sm="4">
                      <span class="float-right mdi mdi-close-circle"></span>

                      <span class="mx-1 caption font-weight-medium float-right">Clear Bill</span>
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
                                src="@/assets/images/sc2.png"
                                @click="proceedGrading(item)"
                              />
                            </v-col>

                            <v-col class="ma-0 pa-0" xs8 :cols="8" md="11" sm="8">
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
              </v-stepper-content>

              <v-stepper-content stepper="2" step="2">
                <div class="flex-row">
                  <v-row class="ma-0 pa-0">
                    <!-- <v-col xs12 :cols="12">
                      <div
                        class="subheading font-weight-medium"
                        style="color:#0357D0;"
                      >Customer Information</div>
                      <v-divider></v-divider>
                    </v-col>-->

                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Customer Phone Number * "
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
                        label="Customer Email * "
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <div class="flex-row">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <div class="subheading font-weight-medium text-color">Coupon Code</div>
                      <v-divider></v-divider>
                    </v-col>

                    <v-col class="ma-0 pa-0" xs12 :cols="12" sm="12">
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
                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <div class="subheading font-weight-medium text-color">Payment Mode</div>
                      <v-divider></v-divider>
                    </v-col>

                    <v-col class="ma-0 pa-1 pl-0" xs6 :cols="6" sm="4">
                      <div>Payment Type</div>
                      <br />
                      <div>
                        <v-select :items="items" label="Select" outlined></v-select>
                      </div>
                    </v-col>
                    <v-col class="ma-0 pa-1 pr-0" xs6 :cols="6" sm="8">
                      <div>ID Proof No.</div>
                      <br />
                      <v-text-field
                        outlined
                        v-model="customer_code"
                        label="Enter Number* "
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <v-divider></v-divider>

                      <div class="text-color subheading font-weight-medium">Sub-Total</div>
                    </v-col>

                    <v-col class="ma-0 pa-0" xs4 :cols="4">
                      <div class="d-flex justify-space-between caption text-color">Amount</div>
                      <div>
                        <i class="mdi mdi-currency-inr"></i>9,34,000
                      </div>
                    </v-col>

                    <v-col class="ma-0 pa-0" xs4 :cols="4">
                      <div class="d-flex justify-space-between caption text-color">Discount</div>

                      <div class="ml-8">7%</div>
                    </v-col>

                    <v-col class="ma-0 pa-0 pull-right" xs4 :cols="4">
                      <div
                        class="d-flex pull-right justify-space-between caption text-color"
                      >Total Amount</div>

                      <br />
                      <div class="pull-right">
                        <span class="mdi mdi-currency-inr">9,34,000</span>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-stepper-content>

              <template absolute class="font-weight-medium">
                <div class="d-flex caption" style="background-color: #0357D0;color:white">
                  <v-row class="ml-4 pa-0">
                    <v-col xs8 :cols="8" md="10 " sm="8">
                      <span>
                        36 ITEMS |
                        <i class="mdi mdi-currency-inr"></i>9,34,000
                      </span>
                    </v-col>
                    <v-col xs4 :cols="4" md="2" sm="4">
                      <a style="color:white;margin-left:20px" @click="stepperValue()">Continue</a>
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

<style>
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
      e1: 0,
      active_tab: "Billing",
      tabs: ["Billing", "Customer", "Payment"],
      show1: "mdi-camera",
      items: ["Cash", "Card", "DD"],
      dialog: false,
      stepper: 0,
      customer_code: "",

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
    confirmDialog() {
      this.dialog = false;
      this.$router.push({ name: "posDashBoard" });
    },
    stepperValue() {
      if (this.e1 == "3") {
        this.dialog = true;
      } else {
        this.e1 = Number(this.e1) + 1;
      }
    },
  },
};
</script>


