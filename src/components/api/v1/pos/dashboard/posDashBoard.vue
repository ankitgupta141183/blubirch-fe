<template>
  <div>
    <v-app-bar class="ma-0 pa-0" style="background-color: #FFFFFF;color:#000" dense dark>
      <!--      <span class="hidden-lg-and-up">

        <img src="@/assets/logo.png" height="28" alt="Blubirch Logo">
      </span>

      <span class="mx-5">Point of Sale</span>-->

      <v-row>
        <v-col class="px-1 ma-0" xs8 :cols="8">
          <span class="hidden-lg-and-up">
            <img src="@/assets/logo.png" height="20" alt="Blubirch Logo" />
          </span>

          <span class="mx-5">Point of Sale</span>
        </v-col>
        <v-col class="px-1 ma-0" xs4 :cols="4">
          <span class="float-right">
            <img src="@/assets/images/icons/user_icon.png" />
          </span>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class xs12 style="background-color:grey lighten-3">
          <v-row>
            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Invoice_Retail.png"
                    @click="navigateTarget('retailInvoice')"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Invoice Retail</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Invoice_Bulk.png"
                    @click="navigateTarget('bulkInvoice')"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Invoice Bulk</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/New_Order.png"
                    @click="navigateTarget('OrderPlacement')"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">New Order</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/GRN.png"
                    @click="navigateTarget('GRNInvoiceSelect')"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">GRN</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Dealer_Claims.png"
                    @click="proceedGrading(item)"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Dealer Claims</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Customer_returns.png"
                    @click="proceedGrading(item)"
                  />
                </div>
                <div
                  class="mt-3 caption text-color"
                  align="center"
                  justify="center"
                >Warranty Returns</div>
              </v-card>
            </v-col>
            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Dispatch.png"
                    @click="proceedGrading(item)"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Dispatch</div>
              </v-card>
            </v-col>
            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Service.png"
                    @click="proceedGrading(item)"
                  />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Service</div>
              </v-card>
            </v-col>
            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img class="mt-3" />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Dashboard</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img class="mt-3" />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Reports</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img class="mt-3" />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Alerts</div>
              </v-card>
            </v-col>

            <v-col xs4 cols="4" sm="4" md="4">
              <v-card class height="100" width="100">
                <div align="center" justify="center">
                  <img class="mt-3" />
                </div>
                <div class="mt-3 caption text-color" align="center" justify="center">Settings</div>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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

/* img {
   position: absolute;
   top: 50%;
   left: 50%;
   width: 30px;
   height: 30px;
   margin-top: -15px; 
   margin-left: -15px; 
} */
</style> 

<script>
export default {
  data() {
    return {
      active_tab: "Billing",
    };
  },

  methods: {
    loadData(tab) {
      this.active_tab = tab;
    },

    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    },
  },
};
</script>