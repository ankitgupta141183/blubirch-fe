<template>
  <v-card class="pa-4 box_shadow_class main-card ">
    <div>
      <div>
        <span>
          <HeaderComponent :headerTitle="headerText" />
        </span>
      </div>
      <v-row justify="center">
          <v-dialog v-model="conformationPopup" persistent max-width="500px">
            <v-card class="v-card-100">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="conformationPopup = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <div>
                    The Data is Not avalable do you want to Preview
                  </div>
                </v-container>
              </v-card-text>
              <v-card-actions center>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="mb-3" @click="conformationPopup = false">OK</v-btn>
                <v-btn color="primary" class="mb-3" @click="navigatetoemptydashboard">Proceed</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      <v-container class="ma-0 pa-0" fluid grid-list-lg>
        <v-layout class="ma-0 pa-0" row wrap>
          <v-flex class xs12 style="background-color: grey lighten-3">
            <v-row>
              <template>
                <v-col xs3 cols="3" sm="3" md="3">
                  <router-link :to="{ name: 'returngeneration', params: { generationName: 'Return Generation' } }">
                    <v-card class="pa-4 box_shadow_class">
                      <div align="center" justify="center">
                        <img class="mt-3" src="@/assets/images/icons/dashboard.svg" width="108" height="108" />
                      </div>
                      <div class="mt-3 text-color" align="center" justify="center">Return Generation</div>
                    </v-card>
                  </router-link>
                </v-col>
              </template>
              <v-col xs3 cols="3" sm="3" md="3">
                <router-link :to="{ name: 'returnprocessedvsgeneratedtrend' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/Overall.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center" id="1">Return Processed vs Generated Trend</div>
                  </v-card>
                </router-link>
              </v-col>
              <v-col xs3 cols="3" sm="3" md="3">
                <router-link :to="{ name: 'ReverseLifecycleTAT' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/Overall.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center" id="2">Reverse Lifecycle TAT</div>
                  </v-card>
                </router-link>
              </v-col>
              <v-col xs3 cols="3" sm="3" md="3">
                <router-link :to="{ name: 'ReturnProcessedvsGenerated' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/Overall.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center" id="3">Return Processed vs Generated</div>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
            <v-row>
              <v-col xs3 cols="3" sm="3" md="3">
                <router-link :to="{ name: 'PerUnitCost' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/Overall.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center" id="4">Per Unit Cost</div>
                  </v-card>
                </router-link>
              </v-col>
              <v-col xs3 cols="3" sm="3" md="3">
                <router-link :to="{ name: 'returngenerationtrend' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/dashboard.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center" id="5">Return Generation Trend</div>
                  </v-card>
                </router-link>
              </v-col>
              <v-col xs3 cols="3" sm="3" md="3">
                <router-link :to="{ name: 'masterReportCard' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/Overall.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center" id="6">Master Report Card</div>
                  </v-card>
                </router-link>
              </v-col>
              <v-col xs3 cols="3" sm="3" md="3">
                <v-card class="pa-4 box_shadow_class" @click="checkAndNavigate(8)">
                  <div align="center" justify="center">
                    <img class="mt-3" src="@/assets/images/icons/dashboard.svg" width="108" height="108" />
                  </div>
                  <div class="mt-3 text-color" align="center" justify="center" >Empty Data 1</div>
                </v-card>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>
<script>
  import HeaderComponent from "../../../../commoncomponents/HeaderComponent.vue";
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        headerText: "Dashboard",
        conformationPopup : false,
        decodeURL:'',
        iframeUrl:''
      };
    },
    components: {
      HeaderComponent,
    },
    computed: mapState(["currentUser", "signedIn"]),
    methods: {
      checkAndNavigate(id) {
        this.$http.secured
        .get(`/api/v2/dashboard/dashboard_embed_url?dashboard=${id}`)
        .then(response => {
          if (response.data && response.data.is_data_present === true) {
            this.iframeUrl = response.data.embed_url;
            this.decodeURL = decodeURI(this.iframeUrl)
            this.$router.push({ name: 'nodataavalable', query: { embed_url: this.decodeURL }  });
          } else {
            this.conformationPopup = true
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network: " + error);
        });
      },
      navigatetoemptydashboard(id) {
        this.$router.push({ name: "nodataavalable" });
      },
    }
  };
</script>

<style scoped>
  .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)>.v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev {
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
    /* max-width: 97% !important; */
  }
  /* .main-card{
    height: 90vh !important;
  } */
  .v-card-100 {
    max-width: 100% !important;
  }
</style>