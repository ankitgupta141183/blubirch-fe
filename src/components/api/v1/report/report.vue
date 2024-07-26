<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

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
                <a
                  style="display: none"
                  id="grn_report"
                  small
                  tile
                  color="#F3F3F3"
                  href=""
                  target="_blank"
                  download
                >
                </a>
                <a
                  style="display: none"
                  id="visibility_report"
                  small
                  tile
                  color="#F3F3F3"
                  href=""
                  target="_blank"
                  download
                >
                </a>
                <router-link :to="{ name: 'GrnReport'}">
                  <v-card
                    id="downlaodcard"
                    class="pa-4 box_shadow_class"
                    @click=""
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/RealTimeGRN.svg"
                        width="108"
                        height="108"
                      />
                    </div>

                    <div class="mt-3 text-color" align="center" justify="center">
                      Real Time GRN
                    </div>
                  </v-card>
                </router-link>
              </v-col>

              <v-col xs3 cols="3" sm="3" md="3" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')">
                <v-card
                  class="pa-4 box_shadow_class"
                  @click="downloadInwardVisibilityReport()"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/inward_visibility.svg"
                      width="108"
                      height="108"
                    />
                  </div>
                  <div class="mt-3 text-color" align="center" justify="center">
                    Visibility Report
                  </div>
                </v-card>
              </v-col>

              <v-col xs3 cols="3" sm="3" md="3" v-if="currentUser.roles.includes('central_admin')">
                <v-card
                  class="pa-4 box_shadow_class"
                  @click="downloadOutwardVisibilityReport()"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/outward_file.svg"
                      width="108"
                      height="108"
                    />
                  </div>
                  <div class="mt-3 text-color" align="center" justify="center">
                    Outward Visibility Report
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>

      <v-row>
        <v-col cols="6" sm="6" md="6" v-if="currentUser.roles.includes('central_admin')">
          <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%;">
            <v-card-title>
              <span class="headline" text-size="small"> Inward Report </span>
            </v-card-title>
            <v-card-text>
              <v-flex class xs12 style="background-color: grey lighten-3">
                <a
                  style="display: none"
                  id="rpa_report"
                  small
                  tile
                  color="#F3F3F3"
                  href=""
                  target="_blank"
                  download
                >
                </a>
                <v-row>
                  <v-col  cols="6" sm="6" md="5">
                    <v-card
                      class="pa-4 box_shadow_class"
                      @click="downloadTimelineReport()"
                    >
                      <div align="center" justify="center">
                        <img
                          class="mt-3"
                          src="@/assets/images/icons/inward_visibility.svg"
                          width="108"
                          height="108"
                        />
                      </div>
                      <div class="mt-3 text-color" align="center" justify="center">
                        Inward Report
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6" sm="6" md="6" >
          <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%; height: 370px;">
            <v-card-title>
              <span class="headline" text-size="small"> RPA Report - Brand  </span>
            </v-card-title>
            <v-card-text>
              <v-flex class xs12 style="background-color: grey lighten-3">
                <v-row class="ml-3">
                  
                  <v-card
                    class="pa-4 box_shadow_class"
                    @click="downloadRpaReport('Brand Wise RPA Inv')"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/price-tag 1.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      RPA Report - Brand
                    </div>
                  </v-card>
                </v-row>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="ml-1 mt-3">
        <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%;">
          <v-card-title>
            <span class="headline" text-size="small"> RPA Report - Daily </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="3" sm="3" md="3" >
                <v-card
                  class="pa-4 box_shadow_class"
                  @click="downloadRpaReport('RPA Report')"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/exchange 1.png"
                      width="108"
                      height="108"
                    />
                  </div>
                  <div class="mt-3 text-color" align="center" justify="center">
                    RPA Report
                  </div>
                </v-card>
              </v-col>

              <v-col cols="3" sm="3" md="3" >
                <v-card
                  class="pa-4 box_shadow_class"
                  @click="downloadRpaReport('Brand Manager')"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/team 1.png"
                      width="108"
                      height="108"
                    />
                  </div>
                  <div class="mt-3 text-color" align="center" justify="center">
                    RPA - Manager
                  </div>
                </v-card>
              </v-col>

              <v-col cols="3" sm="3" md="3" >
                <v-card
                  class="pa-4 box_shadow_class"
                  @click="downloadRpaReport('Overall RPA Inv')"
                >
                  <div align="center" justify="center">
                    <img
                      class="mt-3"
                      src="@/assets/images/icons/location 1.png"
                      width="108"
                      height="108"
                    />
                  </div>
                  <div class="mt-3 text-color" align="center" justify="center">
                    RPA - Location
                  </div>
                </v-card>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-row>

      <v-row class="ml-1 mt-3">
        <v-col cols="6" sm="6" md="6" >
          <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%;">
            <v-card-title>
              <span class="headline" text-size="small"> RPA Report - More Than 90 Days </span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" sm="6" md="6" >
                  <v-card
                    class="pa-4 box_shadow_class"
                    @click="downloadRpaReport('Brand More Than 90')"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/medal 1.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Brand
                    </div>
                  </v-card>
                </v-col>
                  <v-col cols="6" sm="6" md="6" >
                    <v-card
                      class="pa-4 box_shadow_class"
                      @click="downloadRpaReport('OL More Than 90')"
                    >
                      <div align="center" justify="center">
                        <img
                          class="mt-3"
                          src="@/assets/images/icons/badge-1.png"
                          width="108"
                          height="108"
                        />
                      </div>
                      <div class="mt-3 text-color" align="center" justify="center">
                        OL
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
              <span class="headline" text-size="small"> RPA Report - Intransit </span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" sm="6" md="6" >
                  <v-card
                    class="pa-4 box_shadow_class"
                    @click="downloadRpaReport('In-Transit')"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/shapes-and-symbols 1.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Intransit
                    </div>
                  </v-card>
                </v-col>
              </v-row>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="ml-1 mt-3">
        <v-col cols="6" sm="6" md="6" >
          <v-card class="overflow-hidden v-sheet theme--light" style="width: 100%;">
            <v-card-title>
              <span class="headline" text-size="small"> RPA Report - Weekly </span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" sm="6" md="6" >
                  <v-card
                    class="pa-4 box_shadow_class"
                    @click="downloadRpaReport('RPA In and Out Tracker')"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/arrows-outline-up-and-down-1.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Inward and Outward
                    </div>
                  </v-card>
                </v-col>
                  <v-col cols="6" sm="6" md="6" >
                    <v-card
                      class="pa-4 box_shadow_class"
                      @click="downloadRpaReport('RPA Sitewise Transfer')"
                    >
                      <div align="center" justify="center">
                        <img
                          class="mt-3"
                          src="@/assets/images/icons/destination-1.png"
                          width="108"
                          height="108"
                        />
                      </div>
                      <div class="mt-3 text-color" align="center" justify="center">
                        Sitewise
                      </div>
                    </v-card>
                  </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
      alert: false,
      alert_type: "success",
      alert_message: "success",
      menu_10: false,
      menu_14: false
    };
  },
  components: {
    HeaderComponent,
  },
  computed: mapState(["currentUser", "signedIn"]),
  created() {},
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 6000);
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    loadData(tab) {
      this.active_tab = tab;
    },

    downloadPDF() {
      this.showAlert("success", "Report Will be autodownloaded please wait")
      this.$http.secured
        .get("/api/v1/warehouse/wms/gate_passes/export_pending_grn_inventories")
        .then((response) => {
          this.file_url = response.data.url;
          document.getElementById("grn_report").href = response.data.url;
          document.getElementById("grn_report").click();
        })
        .catch((error) =>
          this.showAlert("error", "Error in fetching pending GRN inventories")
        );
    },

    downloadRpaReport(daily_report_type) {
      this.showAlert("success", "Report will be Auto Downloaded Please wait.")
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/export_daily_report", {params: {daily_report_type: daily_report_type}})
        .then((response) => {
          this.file_url = response.data.url;
          document.getElementById("rpa_report").href = response.data.url;
          document.getElementById("rpa_report").click();
        })
        .catch((error) =>
          this.showAlert("error", "Error in fetching report")
        );
    },
    downloadOutwardVisibilityReport() {
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/export_outward_visibility_report")
        .then((response) => {
          if (response.data.message){
            this.showAlert("warning", response.data.message)
          }else{
            this.showAlert("success", "Outward Visibility Report will be sent on your registered email address "  + this.$store.state.currentUser.email)
          }
        })
        .catch((error) =>
          this.showAlert("error", "Error in fetching visibility Report")
        );
    },
    downloadInwardVisibilityReport() {
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/export_inward_visibility_report")
        .then((response) => {
          if (response.data.message){
            this.showAlert("warning", response.data.message)
          }else{
            this.showAlert("success", "Inward Visibility Report will be sent on your registered email address " + this.$store.state.currentUser.email)
          }
        })
        .catch((error) =>
          this.showAlert('error', "Error in fetching visibility Report")
        );
    },
    downloadTimelineReport(){
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/timeline_report")
        .then((response) => {
          this.showAlert('success', "Report will be sent on your registered email address "  + this.$store.state.currentUser.email)
          this.start_date = ''
          this.end_date = ''
        })
        .catch((error) =>
          this.showAlert('error', "Error in fetching visibility Report")
        );
    },
    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    },
  },
};
</script>