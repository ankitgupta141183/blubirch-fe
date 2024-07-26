<template>
  <v-card class="pa-4 box_shadow_class">
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
<!--               <v-col xs3 cols="4" sm="4" md="4">
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
                <v-card
                  id="downlaodcard"
                  class="pa-4 box_shadow_class"
                  @click="downloadPDF()"
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
                    Master SKU
                  </div>
                </v-card>
              </v-col>

              <v-col xs3 cols="4" sm="4" md="4">
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
                    Master Category
                  </div>
                </v-card>
              </v-col>
 -->
              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'UserControl'}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/parental-control.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      User Control
                    </div>
                  </v-card>
                </router-link>
              </v-col>
              
              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'ConfigurationSettings'}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/conf_settings.svg"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Configuration Settings
                    </div>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
            <v-row>
              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'EditSerialNumber'}">
                  <v-card
                    class="pa-4 box_shadow_class"
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
                      Edit Item Details
                    </div>
                  </v-card>
                </router-link>
                
              </v-col>
              <v-col xs3 cols="4" sm="4" md="4" v-if="currentUser.product_access.includes('Edit Item') || currentUser.product_access.includes('All')">
                <router-link :to="{ name: 'EditItem'}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/contract.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Edit Item
                    </div>
                  </v-card>
                </router-link>
              </v-col>
              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'MasterDataUpload'}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/upload1.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Upload Master Data
                    </div>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>

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
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active_tab: "Billing",
      headerText: "Settings",
      start_date: '',
      end_date: '',
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
    loadData(tab) {
      this.active_tab = tab;
    },

    downloadPDF() {
      this.$toast.success("Report Will be autodownloaded please wait")
      this.$http.secured
        .get("/api/v1/warehouse/wms/gate_passes/export_pending_grn_inventories")
        .then((response) => {
          this.file_url = response.data.url;
          document.getElementById("grn_report").href = response.data.url;
          document.getElementById("grn_report").click();
        })
        .catch((error) =>
          this.$toast.error("Error in fetching pending GRN inventories")
        );
    },

    downloadRpaReport(daily_report_type) {
      this.$toast.success("Report will be Auto Downloaded Please wait.")
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/export_daily_report", {params: {daily_report_type: daily_report_type}})
        .then((response) => {
          this.file_url = response.data.url;
          document.getElementById("rpa_report").href = response.data.url;
          document.getElementById("rpa_report").click();
        })
        .catch((error) =>
          this.$toast.error("Error in fetching report")
        );
    },
    downloadOutwardVisibilityReport() {
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/export_outward_visibility_report")
        .then((response) => {
          this.$toast.success("Outward Visibility Report will be sent on your registered email address "  + this.$store.state.currentUser.email)
        })
        .catch((error) =>
          this.$toast.error("Error in fetching visibility Report")
        );
    },
    downloadInwardVisibilityReport() {
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/export_inward_visibility_report")
        .then((response) => {
          this.$toast.success("Inward Visibility Report will be sent on your registered email address " + this.$store.state.currentUser.email)
        })
        .catch((error) =>
          this.$toast.error("Error in fetching visibility Report")
        );
    },
    downloadTimelineReport(){
      if (this.start_date == '' || this.end_date == ''){
        this.$toast.error("Please Provide Start Date and End Date")
        return
      }

      var  start_date = new Date(this.start_date)
      var  end_date = new Date(this.end_date)
      if(end_date <= start_date){
        this.$toast.error("Start Date should be less than End date");
        return
      }
      this.$http.secured

        .get("/api/v1/warehouse/wms/gate_passes/timeline_report", {params: {start_date: this.start_date, end_date: this.end_date}})
        .then((response) => {
          this.$toast.success("Report will be sent on your registered email address "  + this.$store.state.currentUser.email)
          this.start_date = ''
          this.end_date = ''
        })
        .catch((error) =>
          this.$toast.error("Error in fetching visibility Report")
        );
    },
    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    },
  },
};
</script>
