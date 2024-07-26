<template>
  <div>
    <div>
      <span>
        <HeaderComponent :headerTitle="headerText" />
      </span>
    </div>

    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class xs12 style="background-color: grey lighten-3">
          <v-row>
            <v-col xs3 cols="3" sm="3" md="3">
              <router-link :to="{ name: 'InboundDocument'}">
                <v-card
                  id="downlaodcard"
                  class="pa-4 box_shadow_class"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/RealTimeGRN.svg"
                      width="108"
                      height="108"
                    />
                  </div>

                  <div class="mt-3 text-color" style="font-size: 19px; font-weight: normal;" align="center" justify="center">
                    Inbound Documents
                  </div>
                </v-card>
              </router-link>
            </v-col>

            <v-col xs3 cols="3" sm="3" md="3">
              <router-link :to="{ name: 'OutboundDocument'}">
                <v-card
                  id="downlaodcard"
                  class="pa-4 box_shadow_class"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/RealTimeGRN.svg"
                      width="108"
                      height="108"
                    />
                  </div>

                  <div class="mt-3 text-color" style="font-size: 19px; font-weight: normal;" align="center" justify="center">
                    Outbound Documents
                  </div>
                </v-card>
              </router-link>
            </v-col>

            <v-col xs3 cols="3" sm="3" md="3">
              <router-link :to="{ name: 'DocumentError'}">
              <v-card
                class="pa-4 box_shadow_class"
              >
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/inward_visibility.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" style="font-size: 19px; font-weight: normal;" align="center" justify="center">
                  Document Error Data
                </div>
              </v-card>
            </router-link>
            </v-col>

            <v-col xs3 cols="3" sm="3" md="3">
              <router-link :to="{ name: 'exceptionalArticlesFileUploadList'}">
              <v-card
                class="pa-4 box_shadow_class"
              >
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/inward_visibility.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" style="font-size: 19px; font-weight: normal;" align="center" justify="center">
                  Exceptional Articles - Scan Indicator Mapping
                </div>
              </v-card>
            </router-link>
            </v-col>

            <v-col xs3 cols="3" sm="3" md="3">
              <router-link :to="{ name: 'expArticlesSerialNumberFileUploadList'}">
              <v-card
                class="pa-4 box_shadow_class"
              >
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/inward_visibility.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" style="font-size: 19px; font-weight: normal;" align="center" justify="center">
                  Exceptional Articles - Serial Number Mapping
                </div>
              </v-card>
            </router-link>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="6" sm="6" md="6" >
              <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%;">
                <v-card-title>
                  <span class="headline" text-size="small"> Download Inbound Documents Report </span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" >
                      <v-menu ref="menu_14" v-model="menu_14" :close-on-content-click="false" :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                v-model="start_date"
                                label="From Date"
                                prepend-inner-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on" 
                                ></v-text-field>
                          </template>
                        <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="start_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_14= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu_14.save(start_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" >
                      <v-menu ref="menu_10" v-model="menu_10" :close-on-content-click="false" :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                v-model="end_date"
                                label="To Date"
                                prepend-inner-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on" 
                                ></v-text-field>
                          </template>
                        <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="end_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_10= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu_10.save(end_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                  </v-row>

                  <v-row>

                    <v-col cols="4"sm="4" v-if="currentUser.roles.includes('central_admin')">
                      <v-autocomplete
                        v-model="dc_inbound_receiving_site"
                        :items="dist_centers"
                        label="Select Receiving Site"
                        multiple
                        dense
                        small-chips
                        solo
                        chips 
                        item-value="code" item-text="code"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="4"sm="4">
                      <v-autocomplete
                        v-model="dc_inbound_supplying_site"
                        :items="dist_centers"
                        label="Select Supplying Site"
                        multiple
                        dense
                        small-chips
                        solo
                        chips 
                        item-value="code" item-text="code"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="4" sm="4">
                      <v-card @click="downloadInboundDocumentsReport()">
                        <div align="center" justify="center">
                          <img
                            class="mt-3"
                            src="@/assets/images/icons/inward_visibility.svg"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div class="mt-3 text-color" align="center" justify="center">
                          Download
                        </div>
                      </v-card>
                    </v-col>

                  </v-row>                  
                </v-card-text>
              </v-card>
            </v-col> 

            <v-col cols="6" sm="6" md="6" >
              <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%;">
                <v-card-title>
                  <span class="headline" text-size="small"> Download Outbound Documents Report </span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" >
                      <v-menu ref="menu_13" v-model="menu_13" :close-on-content-click="false" :return-value.sync="outbound_start_date" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                v-model="outbound_start_date"
                                label="From Date"
                                prepend-inner-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on" 
                                ></v-text-field>
                          </template>
                        <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="outbound_start_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_13= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu_13.save(outbound_start_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" >
                      <v-menu ref="menu_11" v-model="menu_11" :close-on-content-click="false" :return-value.sync="outbound_end_date" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                v-model="outbound_end_date"
                                label="To Date"
                                prepend-inner-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on" 
                                ></v-text-field>
                          </template>
                        <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="outbound_end_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_11= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu_11.save(outbound_end_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                  </v-row>

                  <v-row>

                    <v-col cols="4"sm="4" v-if="currentUser.roles.includes('central_admin')">
                      <v-autocomplete
                        v-model="dc_outbound_supplying_site"
                        :items="dist_centers"
                        label="Select Supplying Site"
                        multiple
                        chips
                        dense
                        small-chips
                        solo
                        item-value="code" item-text="code"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="4"sm="4">
                      <v-autocomplete
                        v-model="dc_outbound_receiving_site"
                        :items="dist_centers"
                        label="Select Receiving Site"
                        multiple
                        chips
                        dense
                        small-chips
                        solo
                        item-value="code" item-text="code"
                      ></v-autocomplete>
                    </v-col>
                    
                    <v-col cols="4" sm="4">
                      <v-card @click="downloadOutboundDocumentsReport()">
                        <div align="center" justify="center">
                          <img
                            class="mt-3"
                            src="@/assets/images/icons/inward_visibility.svg"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div class="mt-3 text-color" align="center" justify="center">
                          Download
                        </div>
                      </v-card>
                    </v-col>

                  </v-row>

                  
                </v-card-text>
              </v-card>
            </v-col> 

          </v-row>

        </v-flex>
      </v-layout>
    </v-container>

  </div>
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
.box_shadow_class {
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 4px;
}

.v-card {
  max-width: 97% !important;
}

.v-card-100 {
  max-width: 100% !important;
}
</style> 

<script>
import { mapState } from "vuex";
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      active_tab: "Billing",
      headerText: "Reports",
      start_date: '',
      end_date: '',
      outbound_start_date: '',
      outbound_end_date: '',
      menu_10: false,
      menu_14: false,
      menu_11: false,
      menu_13: false,
      dist_centers: [],
      dc_outbound: '',
      dc_inbound: ''
    };
  },
  components: {
    HeaderComponent,
  },
  computed: mapState(["currentUser", "signedIn"]),
  created() {
    this.getDcs();
  },
  methods: {

    getDcs(){
      this.$http.secured
      .get("/api/v1/warehouse/wms/documents/dc_list")
      .then((response) => {
        if (response) {
          this.dist_centers = response.data.distribution_centers
        } else {
          this.showAlert("error", "No Data Found");
          this.loading    = false;
        }
      })
      .catch((error) => {
        this.showAlert("error", "Something went wrong from Network" + error);
        this.loading = false;
      });
    },

    downloadInboundDocumentsReport(){
      if (this.start_date == '' || this.end_date == ''){
        this.$toast.error("Please Provide Start Date and End Date")
        return
      }

      var  start_date = new Date(this.start_date)
      var  end_date = new Date(this.end_date)
      if(end_date < start_date){
        this.$toast.error("Start Date should be less than End date");
        return
      }
      this.$http.secured

        .post("/api/v1/export_inbound_documents", {start_date: this.start_date, end_date: this.end_date, dc_inbound_receiving_site: this.dc_inbound_receiving_site, dc_inbound_supplying_site: this.dc_inbound_supplying_site})
        .then((response) => {
          if (response.data.message){
            this.$toast.warning(response.data.message)
            this.start_date = ''
            this.end_date = ''
          }
          else{
            this.$toast.success("Report will be sent on your registered email address "  + this.$store.state.currentUser.email)
            this.start_date = ''
            this.end_date = ''
          }
        })
        .catch((error) =>
          this.$toast.error("Error in fetching inbound documents report")
        );
    },

    downloadOutboundDocumentsReport(){
      if (this.outbound_start_date == '' || this.outbound_end_date == ''){
        this.$toast.error("Please Provide Start Date and End Date")
        return
      }

      var  start_date = new Date(this.outbound_start_date)
      var  end_date = new Date(this.outbound_end_date)
      if(end_date < start_date){
        this.$toast.error("Start Date should be less than End date");
        return
      }
      this.$http.secured

        .post("/api/v1/export_outbound_documents", {start_date: this.outbound_start_date, end_date: this.outbound_end_date, dc_outbound_receiving_site: this.dc_outbound_receiving_site, dc_outbound_supplying_site: this.dc_outbound_supplying_site})
        .then((response) => {
          if (response.data.message){
            this.$toast.warning(response.data.message)
            this.outbound_start_date = ''
            this.outbound_end_date = ''
          }
          else{
            this.$toast.success("Report will be sent on your registered email address "  + this.$store.state.currentUser.email)
            this.outbound_start_date = ''
            this.outbound_end_date = ''
          }
        })
        .catch((error) =>
          this.$toast.error("Error in fetching inbound documents report")
        );
    },

    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    },
  },
};
</script>