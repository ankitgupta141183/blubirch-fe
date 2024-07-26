<template>
    <v-card  class="overflow-hidden v-card v-sheet theme--light">

      <!-- Alert message -->
      <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
      </div>

      <!-- Header -->
      <header-component :headerTitle="headerText" />

    <!-- salesReturnPopup -->
    <v-row justify="center">
            <v-dialog v-if="this.selected.some(item => item.return_type == 'Sales Return')" v-model="salesReturnPopup" persistent max-width="700px">
              <v-card class="v-card-100">
                <v-card class="v-card-100">
                  <v-card-title>
                    <span>Settelement Method</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="closePopup">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                </v-card>
                  <v-container>
                    
                    <v-row v-for="(items) in sales_settlement_methods" :key="items.id">
                      <v-col cols="12">
                        <v-card> 
                          <v-card-title>
                              <span class="mr-3">
                              <img src="@/assets/images/refund.png">
                              </span>
                               {{items.original_code}}
                              <v-spacer></v-spacer>
                            <v-radio-group
                              v-model="selectedOption"
                              row
                              >
                              <v-radio
                                  :value="items.id"
                              ></v-radio>
                              </v-radio-group>
                          </v-card-title>
                        </v-card>
                      </v-col>
                    </v-row>
                </v-container>
                <v-card-actions center>
                  <v-spacer></v-spacer>
                  <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup" >CANCEL</v-btn>
                  <v-btn color="primary" class="mb-3" :disabled="number > 0" @click="proceedSettelments(selectedOption)">PROCEED</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </v-row>

    <!-- Replacement-same in sales-return-type -->
     <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Sales Return')" v-model="approveSalesReplacementSamePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Sales Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid>
               
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined       
                      readonly
                      :disabled = true  
                      :value="item_details"             
                    >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Item Decision:</div>
                      <div>
                      <v-radio-group
                        v-model="item_decision_selected"
                        mandatory
                        row
                      >
                        <v-radio
                         v-for="(decision) in item_decisions" :key="decision.id"
                          :label="decision.name"
                          :value="decision.id"
                          @change="getDecisionIds(decision.id)"
                          class="mr-12"
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>
              <!-- <v-row v-if="(this.selectedOption === 'Return')">
                <v-col cols="12">
                  <div>
                    <div v-if="!isLabelGenerated">exchange return approval
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row> -->

              <v-row v-if="(decisionIdCondi === 2)">
                <v-col cols="12">
                  <v-text-field
                  v-model="add_remarks"
                  label="Add Remarks"
                  outlined
                  :height="100"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

               <v-row v-if="(decisionIdCondi === 1)">
                <v-col cols="12">
                  <v-text-field
                  v-model="lable_name"
                  label="Lable Name"
                  outlined
                  :height="100"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="number > 0" @click="approveSalesReplacementSame">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> 

    <!-- Replacement-others in Sales-return-type -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Sales Return')" v-model="approveSalesReplacementOthersPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Sales Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid>
               
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Replacement Item Details" 
                      outlined       
                      readonly
                      :disabled = true  
                      :value="item_details"             
                      >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Item Decision:</div>
                      <div>
                      <v-radio-group
                        v-model="item_decision_selected"
                        mandatory
                        row
                      >
                        <v-radio
                         v-for="(decision) in item_decisions" :key="decision.id"
                          :label="decision.name"
                          :value="decision.id"
                          class="mr-12"
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div v-if="!isLabelGenerated">
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row> -->

              <v-row>
                <v-col cols="12">
                  <v-text-field
                  v-model="add_remarks"
                  label="Add Remarks"
                  outlined
                  :height="100"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="number >0 || !add_remarks" @click="approveSalesReplacementOthers">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> 
    
    <!-- Refund-Popup in Sales-return-type -->
    <v-row justify="center">
      <v-dialog v-model="salesReturnApprovalPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Sales Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="salesReturnApprovalPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid>
               
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Refund Amount" 
                      outlined                      
                      type="number" 
                      required
                      readonly
                      disabled
                      :value="refund_amount"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Item Decision:</div>
                      <div>
                      <v-radio-group
                        v-model="item_decision_selected"
                        mandatory
                        row
                      >
                        <v-radio
                         v-for="(decision) in item_decisions" 
                          :key="decision.id"
                          :label="decision.name"
                          :value="decision.id"
                          class="mr-12" 
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>
              <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div v-if="!isLabelGenerated">
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row> -->

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup" >CANCEL</v-btn>
            <v-btn color="primary" class="mb-3"  @click="approveSalesReturn">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Repair-Popup in Sales-return-type -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Sales Return' || 'Warrenty Claim Popup')"  v-model="approveSalesRepairPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Sales Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text" required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Repair Location:</div>
                      <div>
                      <v-radio-group
                        v-model="selectedLocation"
                        row
                      >
                       <v-radio
                         v-for="location in repair_locations" :key="location.id"
                          :label="location.name"
                          :value="location.id"
                          class="mr-12"
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Movement Mode:</div>
                      <div>
                      <v-radio-group
                        v-model="selectedMovement" 
                        mandatory
                        row
                      >
                        <v-radio
                         v-for="movement in movement_modes" :key="movement.id"
                          :label="movement.name"
                          :value="movement.id"
                          class="mr-12"
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <!-- Hiding it temporarily  -->
              <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div>
                      <span class="label-print" text>Print Label</span>
                    </div>
                  </div>
                </v-col>
              </v-row>      -->
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="number > 0 ||!selectedLocation || !selectedMovement" @click="approveSalesRepair">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Discount-Popup in sales-return-type -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Sales Return')"  v-model="approveSalesDiscountPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Sales Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="6">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text" required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
                <v-col cols="6">
                   <v-text-field 
                      label="Actual Amount" 
                      outlined                      
                      type="number" required
                      readonly
                      disabled
                      :value="refund_amount"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

               <v-row>
                <v-col cols="12">
                   <v-text-field 
                      v-model="discount_amount"
                      label="Discount Amount" 
                      outlined                      
                      type="number" required
                      @input="validatediscountamount"
                      :error-messages="errorMessages"
                      >
                   </v-text-field>
                </v-col>
               </v-row>

              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      v-model="add_remarks"
                      label="Add Remarks" 
                      outlined                      
                      type="text"
                      :height="100"
                      >
                   </v-text-field>
                </v-col>
               </v-row>
             
            
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="isButtonDisabled" @click="approveSalesDiscount">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- 'Internal Return Approve' Request-Type Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Internal Return')"  v-model="internalReturnPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Internal Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid>
               
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text" 
                      required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

               <v-row>
                    <v-col cols="12">
                      <div class="disable-text-color">Item Decision:</div>
                      <div>
                      <v-radio-group
                        v-model="internal_item_decision_selected"
                        mandatory
                        disabled
                        row
                      >
                        <v-radio
                         v-for="(decision) in item_decisions" :key="decision.id"
                          :label="decision.name"
                          :value="decision.id"
                          class="mr-12"
                          
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div v-if="!isLabelGenerated">
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row> -->

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="approveInternalReturn">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

     <!-- 'Internal Return Reject' Request-Type Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Internal Return')"  v-model="internalReturnRejectPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Internal Return Reject</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid>

               <v-row>
                    <v-col cols="12">
                      <div>Recovery Method:</div>
                      <div>
                      <v-radio-group
                        v-model="recoverySelected"
                        row
                      >
                        <v-radio
                        v-for="recovery in internal_recovery_methods" :key="recovery.id"
                          :label="recovery.name"
                          :value="recovery.id"
                          class="mr-12"
                        ></v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>
               
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      v-model="vendor_id"
                      label="Enter the Vendor ID" 
                      outlined                      
                      type="number" required
                      @input="validateInput"
                      :error-messages="errorMessages"
                      >
                   </v-text-field>
                </v-col>
              </v-row>
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="!isDataValid || !recoverySelected" @click="rejectInternalReturnConfirm">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Exchange Return Approval -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Exchange Return')"  v-model="approveExchangeReturnPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Exchange Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text" 
                      required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

               <v-row>
                    <v-col cols="12">
                      <div class="disable-text-color">Item Decision:</div>
                      <div>
                      <v-radio-group
                        v-model="exchange_item_decision_selected"
                        mandatory
                        disabled
                        row
                      >
                        <v-radio
                           v-for="(decision) in item_decisions" :key="decision.id"
                          :label="decision.name"
                          :value="decision.id"
                          class="mr-12" 
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                 <div class="d-inline-flex mr-0 pr-0" style="width:100%">
                  <v-checkbox  v-model="enabled">
                  <template v-slot:label>
                     <p class="mt-3">Apply Revised Exchange value</p>
                  </template>
                  </v-checkbox>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field 
                      :disabled="!enabled"
                      v-model="exchange_revised_amount"
                      label="Enter the Revised Amount" 
                      outlined                      
                      type="number" 
                      required
                      width="50"
                      @input="reviseAmountvalidation"
                      :error-messages="errorMessages"
                      >
                   </v-text-field>
                   <p>Note: Current Exchange Value is {{refund_amount}}</p>
                </v-col>
              </v-row>

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="number > 0 || !exchange_revised_amount || !enabled || isAmountValid" @click="approveExchangeReturn">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Exchange-Return-Reject -->
       <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Exchange Return')" v-model="rejectExchangeReturnPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
             <v-card-text class="text-center">
              <span > Are you sure if you want to Reject ? </span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
             <v-btn outlined color="primary" class="cancel-color mb-3" @click="rejectExchangeReturnPopup = false">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="rejectReturnItems">CONFIRM</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Warranty-Claim-Approve settelements-methods Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Warranty Claim Return')" v-model="warrantyClaimPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Settelement Method</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
             <v-container>
               
              <v-row v-for="warranty in warranty_return_settlement_methods" :key="warranty.id">
                <v-col cols="12">
                    <v-card> 
                    <v-card-title>
                        <span class="mr-3">
                        <img src="@/assets/images/payment.png">
                        </span>
                          {{warranty.original_code}}
                        <v-spacer></v-spacer>
                      <v-radio-group
                        v-model="selectedOption"
                        row
                        >
                        <v-radio
                            :value="warranty.id"
                        ></v-radio>
                        </v-radio-group>
                    </v-card-title>
                   </v-card>
                </v-col>
              </v-row>
            </v-container>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup" >CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="proceedWarrentyClaimSettelements">PROCEED</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Warrenty-claim-return with replacement of spares Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Warranty Claim Return')"  v-model="warrentyRepWithSparesPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Warranty Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text"
                      required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
              </v-row>


              <v-row v-for="(row, index) in rows" :key="index">
                    <v-col cols="6">
                      <v-text-field 
                      v-model="row.name"
                      :label="getLabel(index)"
                      outlined                      
                      >
                   </v-text-field>
                    </v-col>
                    <v-col cols="6">
                     <v-autocomplete 
                        v-model="row.item_decision" 
                        outlined 
                        :items="item_decisions" 
                        item-text="name"
                        item-value="id" 
                        label="Item Decision"
                        style="max-width: 300px;"
                      >
                    </v-autocomplete>
                    <!-- <div>
                     <div v-if="!isLabelGenerated">
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div> -->
                  </v-col>
                  </v-row>
              <v-btn class="label-print" @click="addNewRow(row, index)" style="color: blue" >
                Add another Spare
              </v-btn>
            
               <v-row>
                    <v-col cols="12">
                      <div>Repair Location:</div>
                      <div>
                      <v-radio-group
                        v-model="repairLocation_selectedOption"         
                        row
                      >
                        <v-radio
                        v-for="repairLocation in repair_locations" 
                          :key="repairLocation.id"
                          :label="repairLocation.name"
                          :value="repairLocation.id" 
                        ></v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

                <v-row>
                    <v-col cols="12">
                      <div>Movement Modes:</div>
                      <div>
                      <v-radio-group
                        v-model="movement_selectedOption"         
                        row
                      >
                        <v-radio
                        v-for="movementModes in movement_modes" :key="movementModes.id"
                          :label="movementModes.name"
                          :value="movementModes.id" 
                        ></v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>         

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined small color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" small class="mb-3" :disabled="!isSubmitEnabled" @click="submitWarrentyRepWithSpares">SUBMIT</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Warrenty replacement-of-items Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Warranty Claim Return')"  v-model="warrentyReplacementItemPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Warranty Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text" 
                      required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Item Decision:</div>
                      <div>
                      <v-radio-group
                        v-model="item_decision_selected"
                        mandatory
                        row
                      >
                        <v-radio
                         v-for="(decision) in item_decisions" :key="decision.id"
                          :label="decision.name"
                          :value="decision.id"
                          class="mr-12"
                        >
                        </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

                <v-row>
                    <v-col cols="12">
                      <div>Repair Location:</div>
                      <div>
                      <v-radio-group
                        v-model="repairLocation_selectedOption"         
                        row
                      >
                        <v-radio
                           v-for="repairLocation in repair_locations" :key="repairLocation.id"
                          :label="repairLocation.name"
                          :value="repairLocation.id" 
                        ></v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                      <div>Movement Modes:</div>
                      <div>
                      <v-radio-group
                        v-model="movement_selectedOption"         
                        row
                      >
                        <v-radio
                           v-for="movementModes in movement_modes" :key="movementModes.id"
                          :label="movementModes.name"
                          :value="movementModes.id" 
                        ></v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
                </v-row>         


              <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div v-if="!isLabelGenerated">
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>      -->

            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3"  @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="number > 0 || !item_decision_selected ||!repairLocation_selectedOption || !movement_selectedOption" @click="submitWarrentyRepWithSpares">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Warrenty-claim Reject Popup -->
     <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Warranty Claim Return')" v-model="rejectWarrentyClaimPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
             <v-card-text class="text-center">
              <span > Are you sure you want to Reject ? </span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
             <v-btn outlined color="primary" @click="rejectWarrentyClaimPopup = false" class="cancel-color mb-3">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="warrentypopup">CONFIRM</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- warrnty reject -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type== 'Warranty Claim Return')" v-model="warrantyRejectSettlementPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Settelement Method</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
             <v-container>

              <v-row v-for="items in warranty_return_reject_settlement_methods" :key="items.id">
                      <v-col cols="12">
                        <v-card> 
                          <v-card-title>
                              <span class="mr-3">
                              <img src="@/assets/images/refund.png">
                              </span>
                               {{items.original_code}}
                              <v-spacer></v-spacer>
                            <v-radio-group v-model="selectedOption" row >
                              <v-radio :value="items.id" ></v-radio>
                            </v-radio-group>
                          </v-card-title>
                        </v-card>
                      </v-col>
                </v-row>
            </v-container>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="warrantyreject">PROCEED</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Warrnty  sales return reject -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Warranty Claim Return')"  v-model="approveWarrntyRejectPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Warranty Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="approveWarrntyRejectPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="12">
                   <v-text-field label="Item Details" outlined type="text" required readonly disabled :value="item_details" >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <div>Repair Location:</div>
                  <div>
                  <v-radio-group v-model="selectedLocation" row >
                   <v-radio v-for="location in repair_locations" :key="location.id" :label="location.name" :value="location.id" class="mr-12" >
                    </v-radio>
                    <v-spacer></v-spacer>
                  </v-radio-group>
                  </div>  
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div>Movement Mode:</div>
                  <div>
                  <v-radio-group v-model="selectedMovement" mandatory row >
                    <v-radio
                     v-for="movement in movement_modes" :key="movement.id"
                      :label="movement.name"
                      :value="movement.id"
                      class="mr-12"
                    >
                    </v-radio>
                    <v-spacer></v-spacer>
                  </v-radio-group>
                  </div>  
                </v-col>
              </v-row>
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="approveWarrntyRejectPopup = false">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="number > 0 || !selectedLocation || !selectedMovement" @click="approveWarrantyReject">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Lease-Return-Approve settlements-methods Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Lease Return')" v-model="leaseReturnPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Settelement Method</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
             <v-container>
               
              <v-row v-for="items in lease_return_settlement_methods" :key="items.id">
                <v-col cols="12">
                    <v-card> 
                    <v-card-title>
                        <span class="mr-3">
                        <img src="@/assets/images/payment.png">
                        </span>
                          {{items.original_code}}
                        <v-spacer></v-spacer>
                      <v-radio-group
                        v-model="leaseSelectedOption"
                        row
                        >
                        <v-radio
                            :value="items.id"
                        ></v-radio>
                        </v-radio-group>
                    </v-card-title>
                   </v-card>
                </v-col>
              </v-row>

              <!-- <v-row>
              <v-col cols="12">
                  <v-card> 
                    <v-card-title>
                        <span class="mr-3">
                        <img src="@/assets/images/payment.png">
                        </span>
                          Approve Without Deduction
                        <v-spacer></v-spacer>
                      <v-radio-group
                        v-model="selectedOption"
                        row
                        >
                        <v-radio
                            value="approve-without-deduction"
                        ></v-radio>
                        </v-radio-group>
                    </v-card-title>
                   </v-card>   
              </v-col>        
              </v-row>      -->
            </v-container>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="proceedLeaseSettelments">PROCEED</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Lease-Return Approve-with-Deduction Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Lease Return')"  v-model="approveWithDeductionPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Lease Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container fluid> 
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Item Details" outlined type="text" required readonly disabled :value="item_details" > </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                      <div class="disable-text-color">Item Decision:</div>
                      <div>
                      <v-radio-group v-model="lease_item_decision_selected" mandatory disabled row >
                        <v-radio v-for="(decision) in item_decisions" :key="decision.id" :label="decision.name" :value="decision.id" class="mr-12" > </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
                </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="deduction_amount" label="Enter the deduction amount(₹)" outlined type="number" required @input="deductionvalidation" :error-messages="errorMessages"> </v-text-field>
                </v-col>
              </v-row>
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="isDisabledbitton" @click="approveWithDeduction">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Lease-Return Approve-without-Deduction Popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Lease Return')"  v-model="approveWithoutDeductionPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Lease Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container fluid> 
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Item Details" outlined type="text" required readonly disabled :value="item_details" > </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                      <div class="disable-text-color">Item Decision:</div>
                      <div>
                      <v-radio-group v-model="item_decision_selected" disabled mandatory row >
                        <v-radio v-for="(decision) in item_decisions" :key="decision.id" :label="decision.name" :value="decision.id" class="mr-12" > </v-radio>
                      </v-radio-group>
                      </div>  
                    </v-col>
                </v-row>
               <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div v-if="!isLabelGenerated">
                      <span class="label-print" text @click="generateLabel">Generate and print label</span>
                    </div>
                    <div v-else>
                      <div>
                        <span class="generate-label"> Label generated and printed successfully!</span>
                        <span class="label-print" @click="viewLabel">View</span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>        -->

             
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup" >CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="approveWithoutDeduction">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Lease-Return Reject Popup -->
     <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Lease Return')" v-model="rejectLeaseReturnPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
             <v-card-text class="text-center">
              <span > Are you sure you want to Reject ? </span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
             <v-btn outlined color="primary" @click="rejectLeaseReturnPopup = false" class="cancel-color mb-3">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="rejectReturnItems">CONFIRM</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

     <!--Approve Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okApprovePopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="afterClickOkLoadData">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
               <v-card-text class="text-center">
              <span> {{message}} </span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData" >Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Reject Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okRejectPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="afterClickOkLoadData">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span > {{message}} </span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData" >Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Reject popup in Sales Return -->
    <v-row justify="center">
      <v-dialog v-model="rejectSalesPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
             <v-card-text class="text-center">
              <span > Are you sure you want to Reject? </span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="rejectSalesPopup = false">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="rejectSalesConfirm">CONFIRM</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Sales Reject settelement-methods popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type== 'Sales Return')" v-model="salesRejectSettlementPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Settelement Method</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
             <v-container>

              <v-row v-for="items in sales_reject_settlement_methods" :key="items.id">
                      <v-col cols="12">
                        <v-card> 
                          <v-card-title>
                              <span class="mr-3">
                              <img src="@/assets/images/refund.png">
                              </span>
                               {{items.original_code}}
                              <v-spacer></v-spacer>
                            <v-radio-group v-model="selectedOption" row >
                              <v-radio :value="items.id" ></v-radio>
                            </v-radio-group>
                          </v-card-title>
                        </v-card>
                      </v-col>
                </v-row>
            </v-container>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="rejectProceedSettelments">PROCEED</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Sales-return-reject-confirm-popup -->
    <v-row justify="center">
      <v-dialog v-if="this.selected.some(item => item.return_type == 'Sales Return')"  v-model="approveSalesRejectPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Sales Return Approval</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container fluid> 
              <v-row>
                <v-col cols="12">
                   <v-text-field 
                      label="Item Details" 
                      outlined                      
                      type="text" 
                      required
                      readonly
                      disabled
                      :value="item_details"
                      >
                   </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Repair Location:</div>
                      <div>
                      <v-radio-group
                        v-model="selectedLocation" 
                        row
                      >
                       <v-radio
                         v-for="location in repair_locations" :key="location.id"
                          :label="location.name"
                          :value="location.id"
                          class="mr-12"
                        >
                        </v-radio>
                        <v-spacer></v-spacer>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <v-row>
                    <v-col cols="12">
                      <div>Movement Mode:</div>
                      <div>
                      <v-radio-group
                        v-model="selectedMovement" 
                        mandatory
                        row
                      >
                        <v-radio
                         v-for="movement in movement_modes" :key="movement.id"
                          :label="movement.name"
                          :value="movement.id"
                          class="mr-12"
                        >
                        </v-radio>
                        <v-spacer></v-spacer>
                      </v-radio-group>
                      </div>  
                    </v-col>
              </v-row>

              <!-- Hiding it temporarily  -->
              <!-- <v-row>
                <v-col cols="12">
                  <div>
                    <div>
                      <span class="label-print" text>Print Label</span>
                    </div>
                  </div>
                </v-col>
              </v-row>      -->
            </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="closePopup">CANCEL</v-btn>
            <v-btn color="primary" class="mb-3" @click="approveSalesReject">APPROVE</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-repair" v-model="filterPopup" persistent max-width="650px">
        <v-card>
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify"  v-model="return_request_id_search" label="Return Request ID"  class="ma-2" outlined></v-text-field>
              <v-autocomplete
                        v-on:keyup.enter="loadData"
                        prepend-inner-icon="mdi-magnify"
                        v-model="request_type_search"
                        outlined 
                        :items="request_types" 
                        item-text="original_code"
                        item-value="id" 
                        label="Request Types" 
                       
                >
               </v-autocomplete>
               </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- search -->
    <v-card-title style="padding: 28px;">

        <!-- Search fields -->
        <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify"  v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="searchData" ></v-text-field>
        </v-col>
      </v-row>
      
      <!-- Actions buttons -->
      <v-card-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" color="#19B100" style="color:white" :disabled="disableActionBtns()"  @click="approvePopup" >Approve</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="disableActionBtns()" @click="rejectPopup">Reject</v-btn>
      </v-card-actions>


       <!-- Filter -->
       <v-expansion-panels  class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
        <v-expansion-panel outlined  @click="filterListOfButtons" >
          <v-expansion-panel-header>Filter
            <template v-slot:actions>
              <v-icon color="primary">
                mdi-menu-down
              </v-icon>
            </template>
          </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
    </v-card-title>

    <!-- Data Table -->
    <v-layout column>
             <v-flex md6 style="overflow: auto">
                <v-data-table 
                :dense="true" 
                :search="search" 
                v-model="selected"
                show-select
                disable-pagination 
                :hide-default-footer="true"
                :headers="headers" 
                :items="table_data"
                :loading="loading" 
                loading-text="Loading Data... Please wait"
                class="elevation-1">   
                 </v-data-table>
        </v-flex>
    </v-layout>

    <!-- pagination display -->
    <div class="float-right">
      <v-row class="ml-2">
        <v-col cols="4" sm="3">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
            @change="handlePageSizeChange"></v-select>
        </v-col>
        <v-col cols="12" sm="9">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>


    </v-card>
</template>
<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
export default {
    components: {
        HeaderComponent
    },
    data(){
        return{
            headerText : "Return Approval",
            selected:[],
            search_tag:"",
            page: 1,
            totalPages: 1,
            pageSize: 100,
            pageSizes: [100, 200, 500],
            salesReturnPopup:false,
            row:null,
            salesReturnApprovalPopup:false,
            isLabelGenerated: false,
            okApprovePopup: false,
            return_type:'Sales Return',
            table_data:[],
            internalReturnPopup:false,
            isDisabled:true,
            internalReturnRejectPopup: false,
            okRejectPopup: false,
            approveExchangeReturnPopup: false,
            rejectExchangeReturnPopup: false,
            warrantyClaimPopup: false,
            leaseReturnPopup:false,
            enabled: false,
            selectedOption: null,
            warrentyReplacementItemPopup: false,
            approveWithDeductionPopup: false,
            deduction_amount:'',
            approveWithoutDeductionPopup: false,
            approveSalesRepairPopup: false,
            discount_amount:'',
            add_remarks:'',
            approveSalesDiscountPopup: false,
            approveSalesReplacementOthersPopup: false,
            rejectSalesPopup: false,
            salesRejectSettlementPopup: false,
            approveSalesReplacementSamePopup: false,
            lable_name:'',
            warrentyRepWithSparesPopup: false,
            spare_details:'',
            rejectWarrentyClaimPopup:false,
            rejectLeaseReturnPopup: false,
            filterPopup: false,
            return_request_id_search:'',
            request_type_search:[],
            sales_settlement_methods:[],
            item_decisions:[],
            item_decision_selected:"",
            return_ids:[],
            repair_locations:"",
            movement_modes:"",
            selectedLocation:"",
            selectedMovement:"",
            item_details:"",
            sales_reject_settlement_methods:[],
            approveSalesRejectPopup:false,
            internal_item_decision_selected:"",
            internal_recovery_methods:"",
            exchange_revised_amount:[],
            request_id:[],
            lease_return_settlement_methods:[],
            lease_item_decision_selected:"",
            leaseSelectedOption:"",
            warranty_return_settlement_methods:[],
            movement_modes:[],
            repair_locations:[],
            repairLocation_selectedOption:"",
            exchange_item_decision_selected:'',
            errorMessages: [],
            warrantyRejectSettlementPopup:false,
            approveWarrntyRejectPopup: false,
            warranty_return_reject_settlement_methods:[],
            index:'',
            movement_selectedOption:"",
            refund_amount:"",
            recoverySelected:"",
            vendor_id:"",
            request_types:[],
            decisionIdCondi:'',
             rows: [
                {
                 name: '',
                 item_decision:""
                }
            ],
            item_decisions: [], 
            spareCounter: 1,
            number:0,
            message:'',
            search:'',
            alert_message:'',
            alert_type:'info',
            alert: false,
          };
        },

    created(){
      this.loadData();
      this.scrollToTop();
    },

    computed: {
      isDataValid() {
      return this.errorMessages.length === 0 && this.vendor_id !== "";
      },
      isButtonDisabled() {
        return this.errorMessages.length > 0 || !this.discount_amount || this.discount_amount <= 0;
      },
      isDisabledbitton(){
        return this.errorMessages.length > 0 || !this.deduction_amount || this.deduction_amount <= 0;
      },
      isSubmitEnabled() {
        for (const row of this.rows) {
          if (!row.name || !row.item_decision) {
            return false;
          }
        }
        if (!this.repairLocation_selectedOption || !this.movement_selectedOption) {
          return false;
        }
        return true;
      },
      isAmountValid() {
        return this.exchange_revised_amount > this.refund_amount;
      },
    },

    methods:{ 
      addNewRow() {
          this.rows.push({
          name:"",
          item_decision:"",
        });
        this.spareCounter++;
      },
      getLabel(index) {
        if (index === 0) {
          return "Spare 1"; 
        } else {
          return `Spare ${index + 1}`;
        }
      },
      // show Alert messages
      showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
       },
        alertTimeOut() {
          setTimeout(() => {
            this.alert = false;
          },3000);
        },

      loadData(){
      // this.search_tag = '';
      
      this.loading = true;
      this.selected = []
      this.table_data = []
      this.page = 1
      this.totalPages = 1
      this.pageSize = 100
      this.headers = [
                      { text: "Return Request Sub-ID", align: "start", sortable: false, value: "return_sub_request_id"},
                      { text: "Return Request Id", value: "return_request_id" },
                      { text: "Request Type", value: "return_type" },
                      { text: "Creation Date", value: "created_date" },
                      ]; 
      this.fetchTableData();
      this.getRequestTypes();
      },
      
      approvePopup(){
        const firstItem = this.selected[0];
        this.refund_amount = firstItem.item_amount;
        this.item_details = firstItem.sku_description;
        if(this.selected.some(item => item.return_type == 'Sales Return')){
             this.salesReturnPopup = true;
             this.salesReturnSettlementMethods();
        }
        if(this.selected.some(item => item.return_type == 'Internal Return')){
            this.internalReturnPopup = true;
            this.salesReturnEnumsMethods();
            // this.fetchTableData();
        }
        if(this.selected.some(item => item.return_type == 'Exchange Return')){
          this.approveExchangeReturnPopup = true;
          this.exchange_item_decision_selected = null;
          this.exchange_revised_amount = '';
          this.errorMessages = '';
          this.salesReturnEnumsMethods();
          // this.fetchTableData();
        }
        if(this.selected.some(item => item.return_type == 'Warranty Claim Return')){
          this.warrantyClaimPopup = true;
          this.item_decision = '';
          this.salesReturnSettlementMethods();
          // this.fetchTableData();
        }
         if(this.selected.some(item => item.return_type == 'Lease Return')){
          this.leaseReturnPopup = true;
          this.salesReturnSettlementMethods();
          // this.fetchTableData();
        }
       },

      rejectPopup(){
        if(this.selected.some(item => item.return_type == 'Sales Return')){
            this.rejectSalesPopup = true;
            // this.fetchTableData();
        }
        if(this.selected.some(item => item.return_type == 'Internal Return')){
            this.internalReturnRejectPopup = true;
            this.salesReturnEnumsMethods();
        }
        if(this.selected.some(item => item.return_type == 'Exchange Return')){
            this.rejectExchangeReturnPopup = true;
        }
        if(this.selected.some(item => item.return_type == 'Warranty Claim Return')){
            this.rejectWarrentyClaimPopup = true;
        }
        if(this.selected.some(item => item.return_type == 'Lease Return')){
            this.rejectLeaseReturnPopup = true;
        }
       },
       scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
       proceedSettelments(items){
       if(items === this.sales_settlement_methods[0].id  ){
          this.salesReturnPopup = false;
          this.salesReturnApprovalPopup = true;
          this.salesReturnEnumsMethods();
          // this.fetchTableData(); 
        }
        if(items === this.sales_settlement_methods[1].id){
          this.salesReturnPopup = false;
          this.approveSalesReplacementSamePopup = true;
          this.salesReturnEnumsMethods();
          // this.fetchTableData();
          
        }
        if(items === this.sales_settlement_methods[2].id){
          this.salesReturnPopup = false;
          this.approveSalesReplacementOthersPopup = true;
          this.salesReturnEnumsMethods();
          // this.fetchTableData();

        }
        if(items === this.sales_settlement_methods[3].id){
          this.salesReturnPopup = false;
          this.approveSalesRepairPopup = true;
          this.salesReturnEnumsMethods();
          // this.fetchTableData();
          
        }
        if(items === this.sales_settlement_methods[4].id){
          this.salesReturnPopup = false;
          this.approveSalesDiscountPopup = true; 
          // this.fetchTableData(); 
        }

       },

       approveSalesRepair(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            "movement_mode":this.selectedMovement,
            "repair_location":this.selectedLocation,
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_sales_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveSalesRepairPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.selectedMovement = "";
            this.selectedLocation = "";
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       approveSalesDiscount(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            "discount_amount":this.discount_amount, 
            "remarks":this.add_remarks,
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_sales_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveSalesDiscountPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.discount_amount = "";
            this.add_remarks = "";
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       approveSalesReplacementOthers(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            "item_decision":this.item_decision_selected,
            "remarks":this.add_remarks,
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_sales_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveSalesReplacementOthersPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.item_decision_selected = "";
            this.add_remarks = "";
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       approveSalesReplacementSame(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            "item_decision":this.item_decision_selected,
            "remarks":this.add_remarks,
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_sales_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveSalesReplacementSamePopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.item_decision_selected = "";
            this.add_remarks = "";
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       approveSalesReturn(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            // "refund_amount": "",
            "item_decision":this.item_decision_selected
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_sales_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.salesReturnApprovalPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.item_decision_selected = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       approveSalesReject(){
         this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            "repair_location":this.selectedLocation,
            "movement_mode": this.selectedMovement,  
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/reject_sales_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveSalesRejectPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.selectedLocation = "";
            this.selectedMovement = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });

       },
       
       approveInternalReturn(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "item_decision": this.item_decisions[0].id,  
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_internal_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.internalReturnPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.item_decisions = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       submitWarrentyRepWithSpares(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id":this.selectedOption,
            "item_decision": this.item_decision_selected, 
            "repair_location":this.repairLocation_selectedOption,
            "movement_mode":this.movement_selectedOption,
            "spare_details":this.rows
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_warranty_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message;
            this.warrentyRepWithSparesPopup= false;
            this.warrentyReplacementItemPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.item_decision_selected = "";
            this.repairLocation_selectedOption = "";
            this.movement_selectedOption = "";
            this.rows = [];
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       rejectInternalReturnConfirm(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "vendor_code": this.vendor_id,
            "recovery_method": this.recoverySelected,
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/reject_internal_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.internalReturnRejectPopup = false;
            this.okRejectPopup = true;
            this.return_ids = [];
            this.vendor_id = "";
            this.recoverySelected = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       }, 

       rejectSalesConfirm(){
        this.rejectSalesPopup = false;
        this.salesRejectSettlementPopup = true;
        this.salesReturnSettlementMethods()
       },
       warrentypopup(){
        this.rejectWarrentyClaimPopup = false;
        this.warrantyRejectSettlementPopup = true;
        this.salesReturnSettlementMethods()
       },
       rejectProceedSettelments(){
        if(this.selectedOption === this.sales_reject_settlement_methods[0].id){
          this.salesRejectSettlementPopup = false;
          this.approveSalesRejectPopup = true;
          this.salesReturnEnumsMethods();
        }
        if(this.selectedOption === this.sales_reject_settlement_methods[1].id){
          this.salesRejectSettlementPopup = false;
          this.approveSalesReject();
        }
          
       },
       warrantyreject(){
        if(this.selectedOption === this.warranty_return_reject_settlement_methods[0].id){
          this.warrantyRejectSettlementPopup = false;
          this.item_details == this.selected.map(table_data => table_data.sku_description)
          this.approveWarrntyRejectPopup = true;
          this.salesReturnEnumsMethods();
        }
        if(this.selectedOption === this.warranty_return_reject_settlement_methods[1].id){
          this.warrantyRejectSettlementPopup = false;
          this.approveWarrantyReject();
        }
       },
       approveWarrantyReject(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.selectedOption,
            "repair_location":this.selectedLocation,
            "movement_mode": this.selectedMovement,  
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/reject_warranty_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveSalesRejectPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.selectedOption = "";
            this.selectedLocation = "";
            this.selectedMovement = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },
       approveExchangeReturn(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "item_decision": this.exchange_item_decision_selected,  
            "apply_revised_exchange_value": this.exchange_revised_amount,
            "item_decision": this.item_decisions[0].id
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_exchange_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveExchangeReturnPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.exchange_item_decision_selected = "";
            this.exchange_revised_amount = "";
            ths.item_decisions = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       rejectReturnItems(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/reject_return_item', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.rejectExchangeReturnPopup = false;
            this.rejectLeaseReturnPopup = false;
            this.rejectWarrentyClaimPopup = false;
            this.okRejectPopup = true;
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       proceedWarrentyClaimSettelements(){
          if(this.selectedOption === this.warranty_return_settlement_methods[0].id){
            this.warrantyClaimPopup = false;
            this.submitWarrentyRepWithSpares();
    
          }
          if(this.selectedOption === this.warranty_return_settlement_methods[1].id){
            this.warrantyClaimPopup = false;
            this.warrentyRepWithSparesPopup = true;
            this.salesReturnEnumsMethods();
          }
          if(this.selectedOption === this.warranty_return_settlement_methods[2].id){
            this.warrantyClaimPopup = false;
            this.warrentyReplacementItemPopup = true;
            this.salesReturnEnumsMethods();
          }
       },

       approveWarrentyReplacementItem(){
        this.warrentyReplacementItemPopup = false;
        this.okApprovePopup = true;
       },

       proceedLeaseSettelments(){
          if(this.leaseSelectedOption === this.lease_return_settlement_methods[0].id){
            this.leaseReturnPopup = false;
            this.approveWithDeductionPopup = true;
            this.deduction_amount =''
            this.errorMessages = '';
            this.salesReturnEnumsMethods();
          }
          if(this.leaseSelectedOption === this.lease_return_settlement_methods[1].id){
            this.leaseReturnPopup = false;
            this.approveWithoutDeductionPopup = true;
            this.salesReturnEnumsMethods();
            this.salesReturnSettlementMethods();
          }
       },

       approveWithDeduction(){
        this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.leaseSelectedOption,
            "lease_deduction_amount":this.deduction_amount,
            "item_decision": this.item_decisions[0].id,  
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_lease_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveWithDeductionPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.leaseSelectedOption = "";
            this.deduction_amount = "";
            this.item_decisions = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });

       },

       getDecisionIds(value) {
            this.decisionIdCondi = value
        },

       approveWithoutDeduction(){
         this.number++;
        this.return_ids = this.selected.map(table_data => table_data.id);
        const salesReturnDetails = {
            "return_ids":this.return_ids,
            "settlement_method_id": this.leaseSelectedOption,
            "item_decision": this.item_decisions[0].id,  
        }
        this.$http.secured.post('/api/v1/warehouse/return_initiation/return_approvals/approve_lease_return', salesReturnDetails)
        .then(response => {
          if(response.data) {
            this.message = response.data.message
            this.approveWithoutDeductionPopup = false;
            this.okApprovePopup = true;
            this.return_ids = [];
            this.leaseSelectedOption = "";
            this.item_decisions = "";
            this.loading = false;
            this.number = 0;
          }else {
            this.showAlert("error", "No Data Found");
            this.number=0;
          }
        }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });
       },

       confirmRejectWarrentyClaim(){
        this.rejectWarrentyClaimPopup = false;
        this.salesRejectSettlementPopup = true;
       },

      //  confirmRejectLeaseReturn(){
      //     this.rejectLeaseReturnPopup = false;
      //     this.okRejectPopup = true;
      //  },

      // filter Dialog PopUP 
        filterListOfButtons(ev) {
          this.search_tag = '';
          this.filterPopup = true;
          document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        },

         // Apply Filters Function
        applyFilterFunc() {
          const params = new URLSearchParams();

          params.append('return_type', this.request_type_search)
          params.append('return_request_id',this.return_request_id_search)

          this.$http.secured
            .get('/api/v1/warehouse/return_initiation/return_approvals', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.return_items
                this.filterPopup=false;
                this.return_request_id_search ='';
                this.request_type_search =[];
                this.loading = false;

              } else {
                this.loading = false;
                this.showAlert("error", "No Data Found");
              
              }
            })
            .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
            });
          },

          // close filter popup and clear all the fields
          closeFilterpopup(){
            this.filterPopup = false;
            this.request_type_search = '';
            this.return_request_id_search='';
          },

          // fetch table data
          fetchTableData(){
            const params = new URLSearchParams();
            params.append('return_type', this.search_tag)
            params.append('page',  this.page)
            params.append('per_page',this.pageSize)
            params.append('search', this.search_tag)

           this.$http.secured
           .get("/api/v1/warehouse/return_initiation/return_approvals", {params})
           .then(response => {
          if (response.data) {
            this.table_data = response.data.return_items;
            // const firstItem = response.data.return_items[0];
            // this.refund_amount = firstItem.item_amount;
            // this.item_details = firstItem.sku_description;
            this.totalPages = response.data.meta.total_pages
            this.loading = false;
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },
      searchData(){
        const params = new URLSearchParams();
          params.append('search', this.search_tag)
          params.append('page',  this.page)
          params.append('per_page',this.pageSize)
          this.$http.secured
          .get("/api/v1/warehouse/return_initiation/return_approvals", {params})
          .then(response => {
          if (response.data) {
            this.table_data = response.data.return_items;
            this.totalPages = response.data.meta.total_pages
            this.loading = false;
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },

       salesReturnSettlementMethods(){
        this.$http.secured
           .get("/api/v1/warehouse/return_initiation/return_approvals/get_settlement_methods")
        .then(response => {
          if (response.data) {
            this.sales_settlement_methods = response.data.sales_return_settlement_methods;
            this.sales_reject_settlement_methods = response.data.sales_return_reject_settlement_methods;
            this.lease_return_settlement_methods = response.data.lease_return_settlement_methods;
            this.warranty_return_settlement_methods = response.data.warranty_return_settlement_methods;
            this.warranty_return_reject_settlement_methods = response.data.warranty_return_reject_settlement_methods;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
       },

      // After clicking Ok popup
      afterClickOkLoadData(){
      this.okApprovePopup = false;
      this.okRejectPopup = false;
      this.loadData();
      },
      
      validateInput() {
        const inputValue = this.vendor_id;
        this.errorMessages = []; 
        if (!/^[0-9]+$/.test(inputValue)) {
          this.errorMessages.push("Please Enter A Valid Vendor Id.");
        }
        if (inputValue < 0) {
          this.errorMessages.push("Value cannot be negative.");
        }
      },
      validatediscountamount() {
        const inputValue = this.discount_amount;
        this.errorMessages = []; 
        if (!/^[0-9]+$/.test(inputValue)) {
          this.errorMessages.push("Please Enter A Valid Discount Amount.");
        }
        if (inputValue < 0) {
          this.errorMessages.push("Value cannot be negative.");
        }
        if (inputValue > this.refund_amount) {
          this.errorMessages.push("Discount Amount cannot exceed the Actual Amount.");
        }
      },
      reviseAmountvalidation(){
        const inputValue = this.exchange_revised_amount;
        const refundAmount = this.refund_amount;
        this.errorMessages = []; 
        if (!/^[0-9]+$/.test(inputValue)) {
          this.errorMessages.push("Please Enter A Valid Revised Amount.");
        }
        if (inputValue < 0) {
          this.errorMessages.push("Value cannot be negative.");
        }
        if(inputValue > refundAmount){
          this.errorMessages.push("Amount Exceeds Refund Amount")
        }
      },
      deductionvalidation(){
        const inputValue = this.deduction_amount;
        this.errorMessages = []; 
        if (!/^[0-9]+$/.test(inputValue)) {
          this.errorMessages.push("Please Enter A Valid Deduction Amount.");
        }
        if (inputValue < 0) {
          this.errorMessages.push("Value cannot be negative.");
        }
      },
      salesReturnEnumsMethods(){
        this.$http.secured
           .get("/api/v1/warehouse/return_initiation/return_approvals/get_enums_data")
        .then(response => {
          if (response.data) {
            this.item_decisions = response.data.item_decisions;
            this.repair_locations = response.data.repair_locations; 
            this.movement_modes = response.data.movement_modes;
            this.internal_recovery_methods = response.data.internal_recovery_methods;
            this.repair_locations = response.data.repair_locations;
            this.movement_modes = response.data.movement_modes;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      },

      getRequestTypes(){
          this.$http.secured
           .get("/api/v1/warehouse/return_initiation/master_values/return_types")
        .then(response => {
          if (response.data) {
            this.request_types = response.data.lookup_values;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      },

      closePopup(){
        this.salesReturnApprovalPopup = false;
        this.approveSalesReplacementSamePopup = false;
        this.approveSalesReplacementOthersPopup = false;
        this.approveSalesRepairPopup = false;
        this.approveSalesDiscountPopup = false;
        this.internalReturnPopup = false;
        this.salesReturnPopup = false;
        this.salesRejectSettlementPopup = false;
        this.approveSalesRejectPopup = false;
        this.internalReturnRejectPopup = false;
        this.approveExchangeReturnPopup = false;
        this.warrantyClaimPopup = false;
        this.warrentyRepWithSparesPopup = false;
        this.warrentyReplacementItemPopup = false;
        this.rejectWarrentyClaimPopup = false;
        this.leaseReturnPopup = false;
        this.approveWithDeductionPopup = false;
        this.approveWithoutDeductionPopup = false;
        this.warrantyRejectSettlementPopup = false;
        this.warrentyReplacementItemPopup = false;
        this.item_decision_selected = "";
        this.item_decision_selected = "";
        this.add_remarks = "";
        this.lable_name = "";
        this.selectedLocation = "";
        this.selectedMovement = "";
        this.item_details = "";
        this.refund_amount = "";
        this.discount_amount = "";
        this.internal_item_decision_selected = "";
        this.selectedOption = "";
        this.recoverySelected = "";
        this.vendor_id = "";
        this.exchange_item_decision_selected="";
        this.spare_details = "";
        this.repairLocation_selectedOption = "";
        this.movement_selectedOption = "";
        this.leaseSelectedOption = [];
        this.lease_item_decision_selected = "";
        this.deduction_amount = ""; 
      },

      disableActionBtns() {
        if (this.selected.length === 0) {
          return true;
        }

        const firstSelectedType = this.selected[0];

        for (const type of this.selected) {
          if (type !== firstSelectedType) {
            return true;
          }
        }

        return false; 
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        this.loadData();
      },
      handlePageChange(value) {
        this.page = value;
        this.loadData()
      }

    },
}
  </script>
  <style scoped>
    .label-print{
      text-decoration: underline;
      color: #0357D0;
      cursor: pointer;
      box-shadow: none !important;
      padding: 0 !important;
      height: 0 !important;
    }
    .generate-label{
      color: #19B100;
    }
    .v-dialog__content:has(.filter-repair){
  justify-content: right;
  align-items: baseline;
  top: 10.5rem;
  }

  .link-color{
    color: #0357D0;
    font-size: 14px;
    font-weight: 600;
  }

  .bg-color{
  background: #0357D0;
  color: #ffffff;
  }


    .fieldset{
      background:#0357D0 ;
    }

    .v-list-item{
      display: none !important;
    }

    .v-label{
      position: relative !important;
      margin-top: 50px !important;
    }

    .disable-text-color{
      color:#9f9d9d;
    }

  </style>