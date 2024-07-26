<template>
  <div>
    <HeaderComponent :headerTitle="headerText" />
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage" :color="primary_code"></loading>
    <!-- <div class="main_header" style="margin-top:10px;margin-bottom:0px">Disposition</div> -->
    <v-container fluid grid-list-lg pt-0>
      <v-layout class="ma-0 pa-0" wrap align-center>
        <v-flex class="ma-0 pa-0" xs12>
          <v-row align="center" justify="center">
            <v-col v-if= "currentUser.accessible_dispositions.includes('Brand Call Log') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))" block md="6" sm="12" xs12 :cols="6">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'BrandCallLog'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/RTV Icon@2x.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Brand Call Log</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count["Brand Call-Log"].pending_information) + Number(inv_status_count["Brand Call-Log"].pending_bcl_ticket) + Number(inv_status_count["Brand Call-Log"].pending_inspection) + Number(inv_status_count["Brand Call-Log"].pending_decision) + Number(inv_status_count["Brand Call-Log"].pending_disposition) }}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.brand_call_log.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.brand_call_log.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.brand_call_log.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Information:</span>
                                <span class="text-color">{{inv_status_count["Brand Call-Log"].pending_information == undefined ? 0 : inv_status_count["Brand Call-Log"].pending_information}}</span>
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
                                <span>BCL Ticket:</span>
                                <span class="text-color">{{inv_status_count["Brand Call-Log"].pending_bcl_ticket == undefined ? 0 : inv_status_count["Brand Call-Log"].pending_bcl_ticket}}</span>
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
                                <span>Inspection:</span>
                                <span class="text-color">{{inv_status_count["Brand Call-Log"].pending_inspection == undefined ? 0 : inv_status_count["Brand Call-Log"].pending_inspection}}</span>
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
                                <span>Decision:</span>
                                <span class="text-color">{{inv_status_count["Brand Call-Log"].pending_decision == undefined ? 0 : inv_status_count["Brand Call-Log"].pending_decision}}</span>
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
                                <span>Disposition:</span>
                                <span class="text-color">{{inv_status_count["Brand Call-Log"].pending_disposition == undefined ? 0 : inv_status_count["Brand Call-Log"].pending_disposition}}</span>
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
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-if= "currentUser.accessible_dispositions.includes('Insurance')  || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))" block md="6" sm="12" xs12 :cols="6">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'InsuranceOperationsNew'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/insurance.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Insurance</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count.Insurance.pending_information) + Number(inv_status_count.Insurance.pending_claim_ticket) + Number(inv_status_count.Insurance.pending_inspection) + Number(inv_status_count.Insurance.pending_decision) + Number(inv_status_count.Insurance.pending_disposition) }}</span>                                  
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.insurance.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.insurance.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.insurance.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Information:</span>
                                <span class="text-color">{{inv_status_count.Insurance.pending_information == undefined ? 0 : inv_status_count.Insurance.pending_information}}</span>
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
                                <span>Claim Ticket:</span>
                                <span class="text-color">{{inv_status_count.Insurance.pending_claim_ticket == undefined ? 0 : inv_status_count.Insurance.pending_claim_ticket}}</span>
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
                                <span>Inspection:</span>
                                <span class="text-color">{{inv_status_count.Insurance.pending_inspection == undefined ? 0 : inv_status_count.Insurance.pending_inspection}}</span>
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
                                <span>Decision:</span>
                                <span class="text-color">{{inv_status_count.Insurance.pending_decision == undefined ? 0 : inv_status_count.Insurance.pending_decision}}</span>
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
                                <span>Disposition:</span>
                                <span class="text-color">{{inv_status_count.Insurance.pending_disposition == undefined ? 0 : inv_status_count.Insurance.pending_disposition }}</span>
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
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-if= "currentUser.accessible_dispositions.includes('RTV') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))" block md="6" sm="12" xs12 :cols="6">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'RTVModule'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/return-box.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">RTV</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["RTV"].pending_dispatch) + Number(inv_status_count["RTV"].pending_settlement))}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.rtv.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.rtv.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.rtv.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Pending Confirmation:</span>
                                <span class="text-color">{{inv_status_count["RTV"].pending_dispatch == undefined ? 0 : inv_status_count["RTV"].pending_dispatch}}</span>
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
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count["RTV"].pending_settlement == undefined ? 0 : inv_status_count["RTV"].pending_settlement}}</span>
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

            <!-- <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Replacement') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Replacement'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/replacement.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Replacement</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count.Replacement.pending_replacement_disposition)+Number(inv_status_count.Replacement.pending_replacement_approved)}}</span>
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
                                <span>Replacement:</span>
                                <span class="text-color">{{inv_status_count.Replacement.pending_replacement_approved == undefined ? 0:inv_status_count.Replacement.pending_replacement_approved}}</span>
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
                                <span>Disposition:</span>
                                <span class="text-color">{{inv_status_count.Replacement.pending_replacement_disposition == undefined ? 0:inv_status_count.Replacement.pending_replacement_disposition}}</span>
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
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col> -->

           <!-- new replacement module -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Replacement') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'ReplacementNew'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/replacement.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Replacement</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(data_count.replacement.high)+Number(data_count.replacement.medium)+Number(data_count.replacement.low)}}</span>
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
                                <span class="text-color">{{inv_status_count.Replacement.pending_confirmation == undefined ? 0:inv_status_count.Replacement.pending_confirmation}}</span>
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
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count.Replacement.dispatch == undefined ? 0:inv_status_count.Replacement.dispatch}}</span>
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
                                <span>Pending Replacement:</span>
                                <span class="text-color">{{inv_status_count.Replacement.pending_replacement == undefined ? 0 : inv_status_count.Replacement.pending_replacement}}</span>
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

            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Repair') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'RepairModule'}">
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
                                <h4 justify="center">Repair</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count.Repair.dispatch)+Number(inv_status_count.Repair.pending_quotation)+Number(inv_status_count.Repair.pending_repair)+Number(inv_status_count.Repair.pending_disposition)+Number(inv_status_count.Repair.pending_repair_approval)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.repair.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.repair.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.repair.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Quotations:</span>
                                <span class="text-color">{{inv_status_count.Repair.pending_quotation==undefined?0:inv_status_count.Repair.pending_quotation}}</span>
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
                                <span>Approval:</span>
                                <span class="text-color">{{inv_status_count.Repair.pending_repair_approval==undefined?0:inv_status_count.Repair.pending_repair_approval}}</span>
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
                                <span>Pending Repair:</span>
                                <span class="text-color">{{inv_status_count.Repair.pending_repair==undefined?0:inv_status_count.Repair.pending_repair}}</span>
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
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count.Repair.dispatch==undefined?0:inv_status_count.Repair.dispatch}}</span>
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
                                <span>Disposition:</span>
                                <span class="text-color">{{inv_status_count.Repair.pending_disposition==undefined?0:inv_status_count.Repair.pending_disposition}}</span>
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
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Redeploy') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Redeploy'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/redeploy.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Redeploy</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(isNaN(inv_status_count.Restock.pending_redeploy_destination + inv_status_count.Restock.pending_redeploy_dispatch)) ? 0 : (inv_status_count.Restock.pending_redeploy_destination + inv_status_count.Restock.pending_redeploy_dispatch)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.restock.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.restock.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.restock.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count.Restock.pending_redeploy_dispatch==undefined?0:inv_status_count.Restock.pending_redeploy_dispatch + inv_status_count.Restock.pending_redeploy_destination==undefined?0:inv_status_count.Restock.pending_redeploy_destination}}</span>
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
                              <td class="td-border"></td>
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

            <!-- <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Liquidation') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'LotCreation'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/liquidation.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Liquidation</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(data_count.liquidation.high)+Number(data_count.liquidation.medium)+Number(data_count.liquidation.low)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.liquidation.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.liquidation.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.liquidation.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Pending Liquidation:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_liquidation==undefined?0:inv_status_count.Liquidation.pending_liquidation}}</span>
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
                                <span>Pending RFQ:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_rfq==undefined?0:inv_status_count.Liquidation.pending_rfq}}</span>
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
                                <span>Pending Publish:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_publish==undefined?0:inv_status_count.Liquidation.pending_publish}}</span>
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
                               <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_lot_dispatch==undefined?0:inv_status_count.Liquidation.pending_lot_dispatch}}</span>
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
            </v-col> -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Liquidation') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'liquidationNew'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/liquidation.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Liquidation</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count.Liquidation.pending_liquidation)+Number(inv_status_count.Liquidation.pending_liquidation_regrade)+Number(inv_status_count.Liquidation.pending_lot_creation)+Number(inv_status_count.Liquidation.pending_lot_dispatch))}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.liquidation.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.liquidation.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.liquidation.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Liquidation:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_liquidation==undefined?0:inv_status_count.Liquidation.pending_liquidation}}</span>
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
                                <span>Lot Create:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_lot_creation==undefined?0:inv_status_count.Liquidation.pending_lot_creation}}</span>
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
                                <span>Regrade:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.pending_liquidation_regrade==undefined?0:inv_status_count.Liquidation.pending_liquidation_regrade}}</span>
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
                               <span>In Proress:</span>
                                <span class="text-color">{{inv_status_count.Liquidation.inprogress==undefined?0:inv_status_count.Liquidation.inprogress}}</span>
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
                                <span>Decision Pending</span>
                                <span class="text-color">{{inv_status_count.Liquidation.decision_pending==undefined?0:inv_status_count.Liquidation.decision_pending}}</span>
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
             <!-- DISPATCH -->
                 <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Pending Transfer Out') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
                    <v-card class="rounded-card" :elevation="10">
                      <v-row class="ma-0 pa-0">
                        <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                          <router-link class="text-decoration-none" :to="{ name: 'NewDispatch' }">
                            <v-simple-table>
                              <template v-slot:default>
                                <tbody>
                                  <tr align="center">
                                    <td style="border:none">
                                      <img
                                        align="center"
                                        src="@/assets/images/icons/markdown.png"
                                        height="45"
                                        width="45"
                                      />
                                    </td>
                                    <td class="pt-2" colspan="2" style="border:none">
                                      <h4 justify="center">Dispatch</h4>
                                      <h5 justify="center" class="grey--text">
                                        Open Cases :
                                        <span class="text-color">{{ Number(inv_status_count["Dispatch"].pending_pickup) + Number(inv_status_count["Dispatch"].pending_packaging) + Number(inv_status_count["Dispatch"].pending_dispatch) + Number(inv_status_count["Dispatch"].pending_disposition) + Number(inv_status_count["Dispatch"].not_found_items)}}</span>
                                      </h5>
                                    </td>
                                  </tr>

                                  <tr align="center" class="ma-1 pa-1 overflow-hidden">
                                    <td class="ma-3 pa-3 td-border">
                                      <h3 class="high-alert">0</h3>
                                      <span>High alert</span>
                                    </td>
                                    <td class="td-border">
                                      <h3 class="medium-alert">0</h3>
                                      <span>Medium alert</span>
                                    </td>
                                    <td class="td-border">
                                      <h3 class="low-alert">0</h3>
                                      <span>Low alert</span>
                                    </td>
                                  </tr>

                                  <tr align="center">
                                    <td class="td-border">
                                      <span>Pending Pick-Up:</span>
                                      <span class="text-color">{{ inv_status_count["Dispatch"].pending_pickup == undefined ? 0 : inv_status_count["Dispatch"].pending_pickup }}</span>
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
                                      <span>Pending Packaging:</span>
                                      <span class="text-color">{{ inv_status_count["Dispatch"].pending_packaging == undefined ? 0 : inv_status_count["Dispatch"].pending_packaging }}</span>
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
                                      <span>Pending Dispatch:</span>
                                      <span class="text-color">{{ inv_status_count["Dispatch"].pending_dispatch == undefined ? 0 : inv_status_count["Dispatch"].pending_dispatch }}</span>
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
                                      <span>Pending Disposition:</span>
                                      <span class="text-color">{{ inv_status_count["Dispatch"].pending_disposition == undefined ? 0 : inv_status_count["Dispatch"].pending_disposition }}</span>
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
                                      <span>Not Found Items:</span>
                                      <span class="text-color">{{ inv_status_count["Dispatch"].not_found_items == undefined ? 0 : inv_status_count["Dispatch"].not_found_items }}</span>
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
                                    </td>
                                  </tr>                          
                                </tbody>
                              </template>
                            </v-simple-table>
                          </router-link>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
        

<!--             <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Pending Transfer Out') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Markdown'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/markdown.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Pending Transfer Out</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count["Pending Transfer Out"].pending_transfer_out_destination)+Number(inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.pending_transfer_out.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.pending_transfer_out.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.pending_transfer_out.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Destination:</span>
                                <span class="text-color">{{inv_status_count["Pending Transfer Out"].pending_transfer_out_destination==undefined?0:inv_status_count["Pending Transfer Out"].pending_transfer_out_destination}}</span>
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
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch==undefined?0:inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch}}</span>
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
                              <td class="td-border"></td>
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
 -->
            <!-- <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Pending Transfer Out') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Dispatch'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/markdown.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Dispatch</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count["Pending Transfer Out"].pending_transfer_out_destination)+Number(inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.pending_transfer_out.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.pending_transfer_out.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.pending_transfer_out.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Pending Pick & Pack:</span>
                                <span class="text-color">{{inv_status_count["Pending Transfer Out"].pending_transfer_out_destination==undefined?0:inv_status_count["Pending Transfer Out"].pending_transfer_out_destination}}</span>
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
                                <span>Pending  Dispatch:</span>
                                <span class="text-color">{{inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch==undefined?0:inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch}}</span>
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
                              <td class="td-border"></td>
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
            </v-col> -->
            

            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Pending Disposition') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'PendingDisposition'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/pending_disposition.svg"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Pending Disposition</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{Number(inv_status_count["Pending Disposition"].pending_disposition_closed)+Number(inv_status_count["Pending Disposition"].pending_disposition)}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.pending_disposition.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.pending_disposition.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.pending_disposition.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td>
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                              <td>
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                              <td>
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                            </tr>
                            <tr align="center" style="border-style: hidden;">
                              <td>
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                              <td>
                                <span></span>
                                <span class="text-color"></span>
                                <span>

                                </span>
                              </td>
                              <td>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('E-Waste') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Waste'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/e-waste.svg"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">E-Waste</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["E-Waste"].pending_e_waste))+(Number(inv_status_count["E-Waste"].pending_e_waste_dispatch))}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.e_waste.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.e_waste.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.e_waste.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>E-Waste:</span>
                                <span class="text-color">{{inv_status_count["E-Waste"].pending_e_waste==undefined?0:inv_status_count["E-Waste"].pending_e_waste}}</span>
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
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count["E-Waste"].pending_e_waste_dispatch==undefined?0:inv_status_count["E-Waste"].pending_e_waste_dispatch}}</span>
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
            <!-- Restock bucket -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('E-Waste') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'RestockComp'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/e-waste.svg"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Restock</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["Restock"].pending_restock_dispatch))+(Number(inv_status_count["Restock"].pending_restock_destination))}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.restock.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.restock.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.restock.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>Pending Restock Location:</span>
                                <span class="text-color">{{inv_status_count["Restock"].pending_restock_destination==undefined?0:inv_status_count["Restock"].pending_restock_destination}}</span>
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
                                <span>Dispatch:</span>
                                <span class="text-color">{{inv_status_count["Restock"].pending_restock_dispatch==undefined?0:inv_status_count["Restock"].pending_restock_dispatch}}</span>
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

            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Pending Transfer Out') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'MarkDown'}">
                       <v-simple-table>
                         <template v-slot:default>
                          <tbody>
                             <tr align="center">
                             <td style="border:none">
                            <img
                            align="center"
                            src="@/assets/images/icons/markdown.png"
                            height="45"
                            width="45"
                            />
                             </td>
                            <td class="pt-2" colspan="2" style="border:none">
                            <h4 justify="center">Markdown</h4>
                            <h5 justify="center" class="grey--text">
                            Open Cases :
                            <span class="text-color">{{(Number(inv_status_count["Pending Transfer Out"].pending_transfer_out_destination))+(Number(inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch))}}</span>
                            </h5>
                            </td>
                             </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                            <td class="ma-3 pa-3 td-border">
                            <h3 class="high-alert">{{data_count.pending_transfer_out.high}}</h3>
                            <span>High alert</span>
                            </td>
                            <td class="td-border">
                            <h3 class="medium-alert">{{data_count.pending_transfer_out.medium}}</h3>
                            <span>Medium alert</span>
                            </td>
                            <td class="td-border">
                            <h3 class="low-alert">{{data_count.pending_transfer_out.low}}</h3>
                            <span>Low alert</span>
                            </td>
                           </tr>

                  <tr align="center">
                    <td class="td-border">
                      <span>Pending Price & Location:</span>
                      <span class="text-color">{{inv_status_count["Pending Transfer Out"].pending_transfer_out_destination==undefined?0:inv_status_count["Pending Transfer Out"].pending_transfer_out_destination}}</span>
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
                          <span>Dispatch:</span>
                          <span class="text-color">{{inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch==undefined?0:inv_status_count["Pending Transfer Out"].pending_transfer_out_dispatch}}</span>
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
                                <img
                                  align="center"
                                  src="@/assets/images/icons/e-waste.svg"
                                  height="45"
                                  width="45"
                                />
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
                                <span>Pending Payment:</span>
                                <span class="text-color">{{inv_status_count["Saleable"].pending_payment == undefined ? 0 :inv_status_count["Saleable"].pending_payment}}</span>
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
                                  <img
                                    align="center"
                                    src="@/assets/images/icons/e-waste.svg"
                                    height="45"
                                    width="45"
                                  />
                                </td>
                                <td class="pt-2" colspan="2" style="border:none">
                                  <h4 justify="center">Capital Assets</h4>
                                  <h5 justify="center" class="grey--text">
                                    Open Cases :
                                    <span class="text-color">0</span>
                                  </h5>
                                </td>
                              </tr>

                              <tr align="center" class="ma-1 pa-1 overflow-hidden">
                                <td class="ma-3 pa-3 td-border">
                                  <h3 class="high-alert">0</h3>
                                  <span>High alert</span>
                                </td>
                                <td class="td-border">
                                  <h3 class="medium-alert">{{data_count.e_waste.high}}</h3>
                                  <span>Medium alert</span>
                                </td>
                                <td class="td-border">
                                  <h3 class="low-alert">0</h3>
                                  <span>Low alert</span>
                                </td>
                              </tr>

                              <tr align="center">
                                <td class="td-border">
                                  <span>E-Waste:</span>
                                  <span class="text-color">....</span>
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
                                  <span>Dispatch:</span>
                                  <span class="text-color">0</span>
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
              <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('E-Waste') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'ReplacementForward'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/redeploy.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Replacement - Forward</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">{{(Number(inv_status_count["E-Waste"].pending_e_waste))+(Number(inv_status_count["E-Waste"].pending_e_waste_dispatch))}}</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.e_waste.high}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{data_count.e_waste.medium}}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">{{data_count.e_waste.low}}</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                                <span>In Stock:</span>
                                <span class="text-color">{{inv_status_count["E-Waste"].pending_e_waste==undefined?0:inv_status_count["E-Waste"].pending_e_waste}}</span>
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
                                <span>Pending Payment:</span>
                                <span class="text-color">{{inv_status_count["E-Waste"].pending_e_waste_dispatch==undefined?0:inv_status_count["E-Waste"].pending_e_waste_dispatch}}</span>
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

            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('E-Waste') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
              <v-card class="rounded-card" :elevation="10">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                    <router-link class="text-decoration-none" :to="{ name: 'Transfer'}">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr align="center">
                              <td style="border:none">
                                <img
                                  align="center"
                                  src="@/assets/images/icons/module-menu-3.png"
                                  height="45"
                                  width="45"
                                />
                              </td>
                              <td class="pt-2" colspan="2" style="border:none">
                                <h4 justify="center">Transfer</h4>
                                <h5 justify="center" class="grey--text">
                                  Open Cases :
                                  <span class="text-color">0</span>
                                </h5>
                              </td>
                            </tr>

                            <tr align="center" class="ma-1 pa-1 overflow-hidden">
                              <td class="ma-3 pa-3 td-border">
                                <h3 class="high-alert">{{data_count.e_waste.high ? 0 : 0}}</h3>
                                <span>High alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="medium-alert">{{ inv_status_count["E-Waste"].pending_e_waste_dispatch==undefined ? 0 : 0 }}</h3>
                                <span>Medium alert</span>
                              </td>
                              <td class="td-border">
                                <h3 class="low-alert">0</h3>
                                <span>Low alert</span>
                              </td>
                            </tr>

                            <tr align="center">
                              <td class="td-border">
                              </td>
                              <td class="td-border">
                              </td>
                              <td class="td-border">
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
                                  <img
                                    align="center"
                                    src="@/assets/images/Demo.png"
                                    height="45"
                                    width="45"
                                  />
                                </td>
                                <td class="pt-2" colspan="2" style="border:none">
                                  <h4 justify="center">Demo</h4>
                                  <h5 justify="center" class="grey--text">
                                    Open Cases :
                                    <span class="text-color">0</span>
                                  </h5>
                                </td>
                              </tr>

                              <tr align="center" class="ma-1 pa-1 overflow-hidden">
                                <td class="ma-3 pa-3 td-border">
                                  <h3 class="high-alert">0</h3>
                                  <span>High alert</span>
                                </td>
                                <td class="td-border">
                                  <h3 class="medium-alert">{{data_count.e_waste.high}}</h3>
                                  <span>Medium alert</span>
                                </td>
                                <td class="td-border">
                                  <h3 class="low-alert">0</h3>
                                  <span>Low alert</span>
                                </td>
                              </tr>

                              <tr align="center">
                                <td class="td-border">
                                  <span></span>
                                  <span class="text-color"></span>
                                  <span>
                                    <!-- <img
                                      class="pull-right"
                                      align="center"
                                      src="@/assets/images/arrow.png"
                                      height="18"
                                      width="18"
                                      @click="proceedGrading(item)"
                                    /> -->
                                  </span>
                                </td>
                                <td class="td-border">
                                  <span></span>
                                  <span class="text-color"></span>
                                  <span>
                                    <!-- <img
                                      class="pull-right"
                                      align="center"
                                      src="@/assets/images/arrow.png"
                                      height="18"
                                      width="18"
                                      @click="proceedGrading(item)"
                                    /> -->
                                  </span>
                                </td>
                                <td class="td-border">

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
                                  <img
                                    align="center"
                                    src="@/assets/images/icons/repair.png"
                                    height="45"
                                    width="45"
                                  />
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
                                  <span>Pending Payment:</span>
                                  <span class="text-color">{{inv_status_count["Rental"].pending_payment==undefined?0:inv_status_count["Rental"].pending_payment}}</span>
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
                                  <span>Out For Rental:</span>
                                  <span class="text-color">{{inv_status_count["Rental"].out_for_rental==undefined?0:inv_status_count["Rental"].out_for_rental}}</span>
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

            <!-- Cannibalization module -->
            <v-col block md="6" sm="12" xs12 :cols="6" v-if= "currentUser.accessible_dispositions.includes('Cannibalization') || currentUser.accessible_dispositions.includes('All') || (currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin'))">
                <v-card class="rounded-card" :elevation="10" v-if="inv_status_count">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" justify="center" xs12 :cols="12">
                      <router-link class="text-decoration-none" :to="{ name: 'Cannibalization' }">
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr align="center">
                                <td style="border:none">
                                  <img
                                    align="center"
                                    src="@/assets/images/icons/markdown.png"
                                    height="45"
                                    width="45"
                                  />
                                </td>
                                <td class="pt-2" colspan="2" style="border:none">
                                  <h4 justify="center">Cannibalization</h4>
                                  <h5 justify="center" class="grey--text">
                                    Open Cases :
                                    <span class="text-color">{{ (Number(inv_status_count["Cannibalization"].to_be_cannibalized)) + (Number(inv_status_count["Cannibalization"].work_in_progress)) + (Number(inv_status_count["Cannibalization"].cannibalized))}}</span>
                                  </h5>
                                </td>
                              </tr>

                              <tr align="center" class="ma-1 pa-1 overflow-hidden">
                                <td class="ma-3 pa-3 td-border">
                                  <h3 class="high-alert">{{data_count.cannibalization.high}}</h3>
                                  <span>High alert</span>
                                </td>
                                <td class="td-border">
                                  <h3 class="medium-alert">{{data_count.cannibalization.medium}}</h3>
                                  <span>Medium alert</span>
                                </td>
                                <td class="td-border">
                                  <h3 class="low-alert">{{data_count.cannibalization.low}}</h3>
                                  <span>Low alert</span>
                                </td>
                              </tr>

                              <tr align="center">
                                <td class="td-border">
                                  <span>To Be Cannibalized:</span>
                                    <span class="text-color">{{ inv_status_count["Cannibalization"].to_be_cannibalized === undefined ? 0 : inv_status_count["Cannibalization"].to_be_cannibalized }}</span>
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
                                  <span>Work In Progress:</span>
                                    <span class="text-color">{{ inv_status_count["Cannibalization"].work_in_progress === undefined ? 0 : inv_status_count["Cannibalization"].work_in_progress }}</span>
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
                                  <span>Cannibalized:</span>
                                    <span class="text-color">{{ inv_status_count["Cannibalization"].cannibalized === undefined ? 0 : inv_status_count["Cannibalization"].cannibalized }}</span>
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

<style scoped>
/* .v-card {
  max-width: 98% !important;
} */

.v-card-100 {
  max-width: 100% !important;
}
.text-color {
  color: #0357d0;
}

.td-border {
  border: 2px solid #e5e5e5;
}
.v-data-table__wrapper {
  overflow-x: inherit !important;
  overflow-y: inherit !important;
}
.high-alert {
  color: #eb5757;
}
.medium-alert {
  color: #ff8b00;
}
.low-alert {
  color: #00875a;
}
.main_wraper {
  float: left;
  width: 100%;
  position: relative;
  padding-left: 120px;
}
.v-data-table {
  height: auto !important;
}
</style>

<script>
//import Editor from "@tinymce/tinymce-vue";
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { mapState } from "vuex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      headerText: "Disposition",
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