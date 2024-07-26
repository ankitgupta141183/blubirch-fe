<template>
  <div>
    <!-- header -->
    <HeaderComponent :headerTitle="headerText" class="header-fixed" :router-link="{ name: 'rfDisposition' }" :router-link-text="'back'"  :return-condition="true" />
    <!-- loader -->
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage" :color="primary_code"></loading>
    <!-- content -->
    <v-container fluid grid-list-lg pt-0>
      <v-layout class="ma-0 pa-0" wrap align-center>
        <v-flex class="ma-0 pa-0" xs12>
          <v-row align="center" justify="center">
            <!-- capital assets -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Capital Assets') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10" v-if="inv_status_count">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'CapitalAssets' }">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img align="center" src="@/assets/images/icons/e-waste.svg" height="45" width="45" />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Capital Assets</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["Capital Assets"].assets))}}</span>
                                </h5>
                              </td>
                            </tr>
                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{ data_count.capital_assets.high }}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{ data_count.capital_assets.medium }}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{ data_count.capital_assets.low }}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span>Assets:</span>
                                <span class="text-color">{{inv_status_count["Capital Assets"].assets == undefined ? 0: inv_status_count["Capital Assets"].assets}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border"></td>
                            </tr>                            
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <!-- demo module -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Demo') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10" v-if="inv_status_count">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Demo' }">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img align="center" src="@/assets/images/Demo.png" height="45" width="45" />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Demo</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :<span class="text-color">{{(Number(inv_status_count["Demo"].demo))}}</span>
                                </h5>
                              </td>
                            </tr>
                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{ data_count.demo.high }}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{ data_count.demo.medium }}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{ data_count.demo.low }}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span>Demo:</span>
                                <span class="text-color">{{inv_status_count["Demo"].demo == undefined ? 0: inv_status_count["Demo"].demo}}</span>
                                <span> </span>
                              </td>
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border">
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border"></td>
                            </tr>                            
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <!-- replacement -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Replacement') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'ReplacementForward'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img align="center" src="@/assets/images/icons/replacement.png" height="45" width="45" />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Replacement</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :<span class="text-color">{{Number(data_count.replacement.high)+Number(data_count.replacement.medium)+Number(data_count.replacement.low)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.replacement.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.replacement.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.replacement.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Pending Confirmation:</span>
                                <span class="text-color">{{inv_status_count["Replacement"].pending_confirmation == undefined ? 0:inv_status_count["Replacement"].pending_confirmation}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count.Replacement.dispatch == undefined ? 0:inv_status_count.Replacement.dispatch}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Pending Replacement:</span>
                                <span class="text-color">{{inv_status_count.Replacement.pending_replacement == undefined ? 0 : inv_status_count.Replacement.pending_replacement}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              </tr>
                                <tr>
                                  <td class="td-border"></td>
                                  <td class="td-border"></td>
                                  <td class="td-border"></td>
                                </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <!-- rental -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Rental') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10" v-if="inv_status_count">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Rental' }">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img align="center" src="@/assets/images/icons/repair.png" height="45" width="45" />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Rental</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["Rental"].reserve))+(Number(inv_status_count["Rental"].pending_payment))+(Number(inv_status_count["Rental"].out_for_rental))}}</span>
                                </h5>
                              </td>
                            </tr>
                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.rental.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.rental.high}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.rental.high}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span>Rental:</span>
                                <span class="text-color">{{inv_status_count["Rental"].reserve==undefined?0:inv_status_count["Rental"].reserve}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Pending Payment:</span>
                                <span class="text-color">{{inv_status_count["Rental"].pending_payment==undefined?0:inv_status_count["Rental"].pending_payment}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Out For Rental:</span>
                                <span class="text-color">{{inv_status_count["Rental"].out_for_rental==undefined?0:inv_status_count["Rental"].out_for_rental}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span></span>
                              </td>
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span></span>
                              </td>
                              <td class="td-border"></td>
                            </tr>                            
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <!-- saleable -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('E-Waste') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Saleable'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img align="center" src="@/assets/images/icons/e-waste.svg" height="45" width="45" />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Saleable</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["Saleable"].in_stock))+(Number(inv_status_count["Saleable"].pending_payment))}}</span>
                                </h5>
                              </td>
                            </tr>
                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.saleable.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.saleable.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.saleable.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span>In Stock:</span>
                                <span class="text-color">{{inv_status_count["Saleable"].in_stock == undefined ? 0 :inv_status_count["Saleable"].in_stock}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count["Saleable"].dispatch == undefined ? 0:inv_status_count["Saleable"].dispatch}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Pending Payment:</span>
                                <span class="text-color">{{inv_status_count["Saleable"].pending_payment == undefined ? 0 :inv_status_count["Saleable"].pending_payment}}</span>
                                <span>
                                  <img class="pull-right" align="center" src="@/assets/images/arrow.png" height="18" width="18" @click="proceedGrading(item)" />
                                </span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span> </span>
                              </td>
                              <td class="td-border"></td>
                            </tr>                            
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <!-- Production -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Production'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/repair.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Production</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["Production"].production_inventory))+(Number(inv_status_count["Production"].work_in_progress))+(Number(inv_status_count["Production"].finished_or_semi_finished_goods))}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.production.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.production.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.production.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Production Inventory:</span>
                                <span class="text-color">{{inv_status_count["Production"].production_inventory == undefined ? 0 :inv_status_count["Production"].production_inventory}}</span>
                                <span>
                                  <img
                                    class="pull-right"
                                    align="center"
                                    src="@/assets/images/arrow.png"
                                    height="18"
                                    width="18"
                                    @click="proceedGrading(item)"
                                  />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Work In-Progress:</span>
                                <span class="text-color">{{inv_status_count["Production"].work_in_progress == undefined ? 0 :inv_status_count["Production"].work_in_progress}}</span>
                                <span>
                                  <img
                                    class="pull-right"
                                    align="center"
                                    src="@/assets/images/arrow.png"
                                    height="18"
                                    width="18"
                                    @click="proceedGrading(item)"
                                  />
                                </span>
                              </td>
                              <td class="td-border">
                                <span>Finished Or Semi-Finished Goods:</span>
                                <span class="text-color">{{inv_status_count["Production"].finished_or_semi_finished_goods == undefined ? 0 :inv_status_count["Production"].finished_or_semi_finished_goods}}</span>
                                <span>
                                  <img
                                    class="pull-right"
                                    align="center"
                                    src="@/assets/images/arrow.png"
                                    height="18"
                                    width="18"
                                    @click="proceedGrading(item)"
                                  />
                                </span>
                              </td>
                            </tr>
                            <tr align="center">
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                              <td class="td-border">
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                              <td class="td-border"></td>
                            </tr>                            
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
  import { mapState } from "vuex";
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  export default {
    data() {
      return {
        headerText: "Forward Disposition",
        data_count:'',
        inv_status_count:'',
        isLoading : false,
        primary_code: "#0275d8",
        fullPage : true,
      };
    },
    computed: mapState(["currentUser", "signedIn"]),
    created() {
      this.isLoading = true;
      this.getDispositionCount();
      this.get_Inventory_Status_Count();
    },
    components: {
      HeaderComponent,Loading
    },

    methods: {
      getDispositionCount() {
        this.$http.secured
          .get("/api/v1/warehouse/inventories/disposition_criticality_count")
          .then((response) => {
            this.data_count = response.data;
            console.log(response.data)
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Error in geting disposition count");
          });
      },
      get_Inventory_Status_Count() {
        this.$http.secured
          .get("/api/v1/warehouse/inventories/inventory_status_count")
          .then((response) => {
            this.inv_status_count = response.data;
            this.isLoading = false;
            console.log(response.data)
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Error in geting inventory status count");
          });
      },    
    },
  };
</script>
<style scoped>
  .v-card-100 { max-width: 100% !important; }
  .text-color { color: #0357d0; }
  .td-border { border: 2px solid #e5e5e5; }
  .v-data-table__wrapper { overflow-x: inherit !important; overflow-y: inherit !important; }
  .high-alert { color: #eb5757; }
  .medium-alert { color: #ff8b00; }
  .low-alert { color: #00875a; }
  .main_wraper { float: left; width: 100%; position: relative; padding-left: 120px; }
  .v-data-table { height: auto !important; }
  .header-fixed { background: #E5E5E5; position: sticky; top: 0; z-index: 9999;}
</style>