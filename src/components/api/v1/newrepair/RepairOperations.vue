<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
  <div>
    <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
  </div>
  <!--view attachment dialogue -->

   <v-row justify="center">
      <v-dialog v-model="viewAttachmentDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="view-attachment-title"> Attachment </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-col cols="12" sm="6" md="12"  class="pa-0 pb-3">
                      <v-simple-table class="gray-border">
                        <template>
                          <thead>
                            <tr>
                              <th class="text-left">Item Id</th>
                              <th class="text-left">Article Description</th>                               
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(inv,i) in selected" :key="i">
                              <td>{{inv.item_id}}</td>
                              <td>{{inv.article_description}}</td>                              
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                
                    <v-col cols="12" sm="6" md="12"  class="pa-0 pb-3" >
                        <div v-if ="selected_inv" >
                            <v-expansion-panels>
                              <v-expansion-panel>
                                <v-expansion-panel-header> Pending Repair Inspection  </v-expansion-panel-header>
                                <v-expansion-panel-content>                                    
                                        <v-card v-if="selected_inv.details.pending_initiation_remark"
                                          class="mx-auto mr-0 ml-0 pa-5 mb-5"
                                          max-width="344"
                                          outlined                                           
                                        >
                                        <p  color="#828282"> {{ this.selected_inv.details.pending_initiation_remark }} </p>
                                        </v-card>
                                    <div v-if="selected_inv.pending_initiation_attachments.length">
                                      <p color="#828282">Attachment</p>
                                      <span v-for="(item,i) in selected_inv.pending_initiation_attachments" :key="i">
                                        <a class="mr-2" :href="item.url" target="#" download><v-btn class="blue--text" depressed small tile>{{item.name}}</v-btn></a>
                                      </span >
                                    </div>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                          <div v-if="selected_inv">
                              <v-expansion-panels>
                                <v-expansion-panel>
                                  <v-expansion-panel-header>  Pending Repair Estimate </v-expansion-panel-header>
                                  <v-expansion-panel-content>                                    
                                          <v-card v-if="selected_inv.details.pending_quotation_remark"
                                            class="mx-auto mr-0 ml-0 pa-5 mb-5"
                                            max-width="344"
                                            outlined                                           
                                          >
                                          <p color="#828282"> {{ this.selected_inv.details.pending_quotation_remark }}  </p>
                                          </v-card>
                                      <div v-if="selected_inv.pending_quotation_attachments.length">
                                        <p color="#828282" v-if="selected_inv.pending_quotation_attachments.length">Attachment</p>
                                        <span v-for="(item,i) in selected_inv.pending_quotation_attachments" :key="i">
                                          <a class="mr-2" :href="item.url" target="#" download><v-btn class="blue--text" depressed small tile>{{item.name}}</v-btn></a>
                                        </span >
                                      </div>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                          </div>
                        <div v-if="active_tab != 'Pending Repair Approval'">
                         <div v-if="selected_inv" >
                            <v-expansion-panels>
                              <v-expansion-panel>
                                <v-expansion-panel-header>  Pending Repair Approval </v-expansion-panel-header>
                                <v-expansion-panel-content>                                    
                                        <v-card v-if="selected_inv.details.pending_approval_remark"
                                          class="mx-auto mr-0 ml-0 pa-5 mb-5"
                                          max-width="344"
                                          outlined                                           
                                        >
                                        <p color="#828282"> {{ this.selected_inv.details.pending_approval_remark }}  </p>
                                        </v-card>
                                    <div v-if="selected_inv.pending_approval_attachments.length">
                                    <p color="#828282" >Attachment</p>
                                    <span v-for="(item,i) in selected_inv.pending_approval_attachments" :key="i">
                                      <a class="mr-2" :href="item.url" target="#" download><v-btn class="blue--text" depressed small tile>{{item.name}}</v-btn></a>
                                    </span >
                                    </div>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                      </div>
                      <div v-if="active_tab != 'Pending Repair Approval' && active_tab != 'Pending Repair Completion'">
                        <div v-if="selected_inv" >
                            <v-expansion-panels >
                              <v-expansion-panel>
                                <v-expansion-panel-header> Pending Repair </v-expansion-panel-header>
                                <v-expansion-panel-content>                                    
                                        <v-card v-if="selected_inv.details.pending_repair_remark"
                                          class="mx-auto mr-0 ml-0 pa-5 mb-5"
                                          max-width="344"
                                          outlined                                           
                                        >
                                        <p color="#828282"> {{ this.selected_inv.details.pending_repair_remark}}  </p>
                                        </v-card>
                                    <div v-if="selected_inv.pending_repair_attachments.length">
                                    <p color="#828282">Attachment</p>
                                    <span v-for="(item,i) in selected_inv.pending_repair_attachments" :key="i">
                                      <a class="mr-2" :href="item.url" target="#" download><v-btn class="blue--text" depressed small tile>{{item.name}}</v-btn></a>
                                    </span >
                                    </div>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                      </div>

                    </v-col>
                
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions> 
              <v-container>
                  <v-layout align-end>
                      <v-spacer></v-spacer>
                      <v-btn class="mr-2" small text color="#828282" @click="viewAttachmentDialog = false">CLOSE</v-btn> 
                   </v-layout>
                </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Repair Detail Dialog -->
    <v-row justify="center">
      <v-dialog v-model="repairDetailDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-col cols="12" sm="6" md="12"  class="pa-0 pb-3">
                      <v-simple-table class="gray-border">
                        <template>
                          <thead>
                            <tr>
                              <th class="text-left">Item Id</th>
                              <th class="text-left">Article Description</th> 
                              <th v-if="active_tab == 'Pending Repair Estimate'" class="text-left">MAP (INR)</th>                              
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(inv,i) in selected" :key="i">
                              <td>{{inv.item_id}}</td>
                              <td>{{inv.article_description}}</td>
                              <td v-if="active_tab == 'Pending Repair Estimate'" >{{inv.map}}</td>                               
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                     <v-col cols="12" sm="12" md="12"  class="pa-0">
                        <v-row v-if="active_tab == 'Pending Repair Inspection'">
                          <v-col cols="12" sm="4" md="4">
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="email_date"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                  v-model="email_date"
                                  label="Email Date"
                                  prepend-inner-icon="event"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on" 
                                ></v-text-field>
                              </template>
                              <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="email_date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(email_date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                            </v-col>
                        </v-row>
                         <v-row v-if="active_tab == 'Pending Repair Estimate'">
                              <v-col cols="12" sm="4" md="4">
                                  <v-text-field hide-details
                                      label="Repair Cost"
                                      outlined                                      
                                      v-model="repair_amount"
                                      type="number"
                                      min=1
                                  ></v-text-field>                               
                              </v-col>
                          </v-row>
                          <v-row v-if="active_tab == 'Pending Repair Approval'">
                              <v-col cols="12" sm="4" md="4">
                                  <v-text-field hide-details
                                      label="Authorized By"
                                      v-model="authorized_by"
                                      outlined
                                      readonly
                                  ></v-text-field>
                              </v-col>
                          </v-row>
                          <v-row v-if="active_tab == 'Pending Repair Completion'">
                            <v-col cols="12" sm="4" md="4"  >
                              <v-flex>
                                <v-select  hide-details
                                  :items="menu_items" 
                                  v-model="pending_repair_location"
                                  :disabled = "repair_location_disable"
                                  color="primary"
                                  label="Repair Location*"
                                outlined></v-select>
                               </v-flex>
                          </v-col>

                          <v-col cols="12" sm="4" md="4"  >
                              <v-text-field hide-details v-if="pending_repair_location == 'External Location'"
                                v-model="pending_repair_rgp_number"
                                :disabled = "repair_rgp_disable"
                                label="RGP Number"
                                outlined
                              ></v-text-field>
                              </v-col>
                          </v-row>    
                     </v-col>
                     <v-col cols="12" class="pa-0 pb-3" >  
                        <v-row v-if="active_tab == 'Pending Repair Inspection'">
                          <v-col cols="12" sm="4" md="4"  >
                           <v-flex>
                              <v-select  hide-details
                                :items="menu_items" 
                                v-model="repair_location"
                                color="primary"
                                label="Repair Location*"
                              outlined></v-select>
                             </v-flex>
                          </v-col>
                           <v-col cols="12" sm="4" md="4"  >
                              <v-text-field hide-details v-if="repair_location == 'External Location'"
                                v-model="rgp_no"
                                label="RGP Number"
                                outlined
                              ></v-text-field>
                              </v-col>
                        </v-row>
                        <v-row v-if="active_tab == 'Pending Repair Completion'">
                          
                          <v-col cols="12" sm="4" md="4">
                                  <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="repair_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field outlined hide-details
                                        v-model="repair_date"
                                        label="Repair Date"
                                        :disabled = "repair_date_disable"
                                        prepend-inner-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[rules.required]"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="repair_date" no-title scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(repair_date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                              </v-col>

                        </v-row>
                     </v-col>
                     <v-col cols="12"  class="pa-0">
                        <v-textarea 
                          v-model="remarks"
                          name="remark"
                          label="Add Remarks"
                        outlined>
                        </v-textarea>
                     </v-col>
                    <v-col cols="12"  class="pa-0">
                      <v-file-input
                        v-model="files"
                        color="light-blue accent-3"
                        counter
                        label="Documents"
                        small-chips 
                        multiple
                        placeholder="Attach Documents"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="light-blue accent-3"
                            dark
                            label
                            small
                          >{{ text }}</v-chip>
                          <span v-else-if="index === 2"
                            class="overline grey--text text--darken-3 mx-2">
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                      <!--  <v-chip
                        class="ma-2"
                        close
                        color="#F3F3F3"
                        label
                        text-color=""> 
                        Grading Doc
                      </v-chip>-->
                  </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions> 
              <v-container>
                  <v-layout align-end v-if="active_tab == 'Pending Repair Estimate'">
                      <v-spacer></v-spacer>
                      <v-btn class="mr-2" text small color="normal" @click="repairdialogClose()">CANCEL</v-btn>
                      <v-btn small color="primary" :disabled="number > 0 || !remarks || !files || !repair_amount"  @click="repairDetailDialogsSubmit()">Submit</v-btn> 
                   </v-layout>
                   <v-layout align-end v-if="active_tab == 'Pending Repair Inspection'">
                      <v-spacer></v-spacer>
                      <v-btn class="mr-2" text small color="normal" @click="repairdialogClose()">CANCEL</v-btn>
                      <v-btn small color="primary" :disabled="number > 0 || !email_date || !remarks || !files"  @click="repairDetailDialogsSubmit()">Submit</v-btn> 
                   </v-layout>
                   <v-layout align-end v-if="active_tab == 'Pending Repair Completion'">
                      <v-spacer></v-spacer>
                      <v-btn class="mr-2" text small color="normal" @click="repairdialogClose()">CANCEL</v-btn>
                      <v-btn small color="primary" :disabled="number > 0 || !remarks || !files"  @click="repairDetailDialogsSubmit()">Submit</v-btn> 
                   </v-layout>
                   <v-layout align-end v-if="active_tab == 'Pending Repair Approval'">
                      <v-spacer></v-spacer>
                      <v-btn class="mr-2" text small color="normal" @click="repairdialogClose()">CANCEL</v-btn>
                      <v-btn class="mr-2" small color="normal" :disabled="number > 0 || !authorized_by || !remarks" @click="repairDetailDialogsReject()">REJECT</v-btn>
                      <v-btn small color="primary" :disabled="number > 0 || !authorized_by || !remarks || !files" @click="repairDetailDialogsApprove()">APPROVE</v-btn> 
                   </v-layout>
                </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Repair Detail Dialog -->
    <!-- View Summary Dialog -->

    <v-row justify="center">
      <v-dialog v-model="policyModel" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Please Select Policy</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-radio-group v-model="liquidation_policy">
                    <v-radio
                      v-for="policy in policies"
                      :key="policy.id"
                      :label="policy.original_code"
                      :value="policy.id"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="policyModel=false"
                >CLOSE</v-btn>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="closepolicypop"
                >CONFIRM</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="viewSummaryDialog" persistent max-width="900px">
        <v-card class="v-card-100">
          <v-card-text class="pa-0">
          <GradeSummary :title="selected_inv.article_description" :summarydata = "selected_inv.grade_summary" :packagingImages = "packagingImages" :physicalImages="physicalImages" @summaryClose="viewSummaryDialogClose()"/>            
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- View Summary Dialog -->
    
    <!-- Set Disposition Dialog -->
     <v-row justify="center">
      <v-dialog v-model="dspRepairDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
          <v-container>
          <v-row>
            <v-col cols="12"  class="pa-0">
              <v-data-table
                :dense="true"
                :headers="dsp_repair_headers"
                :items="dsp_repair_data"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              <template v-slot:item.article_description="{item}">
                <span
                  v-b-tooltip.hover
                  :title="item.article_description"
                >{{item.article_description | truncate(17, '...')}}</span>
              </template>
              <template v-slot:item.item_id="{item}">
                <span
                  v-b-tooltip.hover
                  :title="item.item_id"
                >{{item.item_id}}</span>
              </template>           
              </v-data-table>
              </v-col>
              <v-col cols="12" class="mt-7 pa-0">
                        <v-textarea 
                          name="remark"
                          label="Add Remarks"
                          v-model="remarks"
                        outlined>
                        </v-textarea>
              </v-col>
              <v-col cols="12"  class="pa-0">
                      <v-file-input
                        v-model="files"
                        color="light-blue accent-3"
                        counter
                        label="Documents"
                        multiple
                        placeholder="Attach Documents"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="light-blue accent-3"
                            dark
                            label
                            small
                          >{{ text }}</v-chip>
                          <span v-else-if="index === 2"
                            class="overline grey--text text--darken-3 mx-2">
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                      <!--  <v-chip
                        class="ma-2"
                        close
                        color="#F3F3F3"
                        label
                        text-color=""> 
                        Grading Doc
                      </v-chip>-->
                  </v-col>
              </v-row>
            </v-container>
          </v-card-text>          
          <v-card-actions>
          <v-container>
            <v-layout align-end>
              <v-spacer></v-spacer>
              <v-btn small text color="#828282" @click="dspRepairDialogClose">{{dailog_cancel}}</v-btn>
              <v-btn small color="primary" @click="repairDetailDialogsSubmit">{{dailog_confirm}}</v-btn>
            </v-layout>
          </v-container>  
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Set Disposition Dialog -->


    <!-- Repair Screen -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Repair</div> -->
    <div> <HeaderComponent :headerTitle="headerText" /></div>    

    <!-- Header -->
    <v-card class="v-card-100">
      <v-tabs v-model='tab_name'>
        <v-tab
          ripple :href="'#'+tab.replace(/ /g,'_').toLowerCase()"
          style="text-transform:none!important;text-decoration: none;"
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index" 
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <!-- Header -->
    <v-card-title>
      <v-row>
        <v-col cols="3" sm="3">
          <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id or Serial Number" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col cols="3" sm="3">
          <v-select :items="alert_item" v-model="alert_value" item-value="value" item-text="name"  label="Select Alert Level" outlined @change="FilterWithAlert()"></v-select>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-actions>
        <v-flex xs12 d-flex>
          <v-autocomplete
            v-if="active_tab == 'Pending Redeployment'"
            v-model="selectedDisposition"
            :items="disposition_items"
            color="primary"
            item-text="original_code"
            item-value="id"
            @change="openPolicyPopup"
            target="#set-disposition" 
            label="SET DISPOSITION"
            solo
          ></v-autocomplete>
          </v-flex>
      </v-actions>

    </v-card-title>
    
    <!-- Data Table -->
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
          v-model="selected"
          :dense="true"
          :headers="headers"
          :items="table_data"
          :item-key="item_key"
          class="elevation-1"
          :show-select="active_tab == 'Pending Redeployment'"
          :custom-sort="customSort"
          :loading="loading"
          disable-pagination
          :hide-default-footer="true"
          loading-text="Loading Data... Please wait"
        >

        <template v-slot:item.data-table-select="{ item, isSelected, select }">
          <v-simple-checkbox
              v-if="active_tab != 'Pending Redeployment'"
             :value="isSelected"
             :readonly="item.serial_no != null"
             :disabled="item.serial_no != null"
             @input="select($event)"
           ></v-simple-checkbox>
          <v-simple-checkbox
              v-else
             :value="isSelected"
             @input="select($event)"
           ></v-simple-checkbox>
        </template>
         <template v-slot:item.repair_location="{item}">
                <span v-if="item.repair_location == 'In House'" >{{item.repair_location}}</span> 
                <span v-if="item.repair_location != 'In House'" >{{item.rgp_number}}</span>                
         </template>

         <template v-slot:item.pending_repair_location="{item}">
                <span v-if="item.pending_repair_location == 'In House'" >{{item.pending_repair_location}}</span> 
                <span v-if="item.pending_repair_location != 'In House'" >{{item.pending_repair_rgp_number}}</span>                
         </template>

        <template v-slot:item.alert_level="{ item }">
          <v-chip
            v-if="item.alert_level"
            class="ma-2 justify-center"
            small
            label
            :color="getColor(item.alert_level)"
            style = "min-width:80px;"
            dark
          >{{ item.alert_level }}</v-chip>
        </template>


        <template v-slot:item.pending_initiation_action="{ item }">
           <img @click="repairDetailDialogOpen(item)"
            src="@/assets/images/job_sheet.png"
            title="Insurance Submission "
          />
        </template>

        <template v-slot:item.repair_amount="{item}">
          <span>{{item.repair_amount}}</span>
        </template>

        <template v-slot:item.grade_summary="{ item }">
          <div class="my-2">
            <v-btn text small color="primary" @click="viewSummaryDialogOpen(item)">View Summary</v-btn>
          </div>
        </template>

        <template v-slot:item.attachment="{ item }">
          <div class="my-2">
            <v-btn text small color="primary" href="" @click="viewAttachmentDialogOpen(item)">View Attachment</v-btn>
          </div>
        </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- Data Table -->
    <div class="float-right">
      <v-row class="ml-2">
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per Page"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="9">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import GradeSummary from '.././gradesummary/gradeSummary'
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        headerText: "Repair", 
        tab_name: 'pending_repair_inspection',
        item_key: 'item_id',
        repair_date_disable: true,
        repair_location_disable: false,
        repair_rgp_disable: false,
        files: "",
        alert: false,
        alert_type: "success",
        alert_message: "success",
        selectedDisposition: '',
        active_tab: "Pending Repair Inspection",
        email_date:"",
        repair_location:"",
        rgp_no:"",
        pending_repair_location:'',
        pending_repair_rgp_number:'',
        remark:"",
        repair_date:"",
        authorized_by:"",
        repair_amount: 0,
        number: 0,
        menu:"",
        item:"", 
        tabs: [
          "Pending Repair Inspection",
          "Pending Repair Estimate",
          "Pending Repair Approval",
          "Pending Repair Completion",
          "Pending Repair Grade",
          "Pending Redeployment",
        ],
        singleSelect: false,
        selected: [],
        search: "",
        disposition_items: [],
        loading: false,
        physicalImages: [],
        packagingImages: [],
        policyModel: false,
        liquidation_policy: '',
        policies: [],
        headers: [
          { text: "Item Id", align: "start", sortable: false, value: "item_id"},
          { text: "Article Id", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Serial Number", value: "serial_no" },
          { text: "Grade Summary", value: "grade_summary" },
          { text: "Ageing", value: "pending_initiation_ageing" },
          { text: "Alert Level", value: "alert_level" },
          { text: "Action", value: "pending_initiation_action" , sortable: false},
        ],
        table_data: [],
        dialog_title:"Repair Details",
        repairDetailDialog:false,
        viewSummaryDialog:false,

        viewAttachmentDialog:false,
        menu_items: ["In House", "External Location"],
        view_attachment_title: ["pending_initiation_attachments","Pending Repair Estimate","Pending Repair Approval","Pending Repair Completion"],

        dspRepairDialog: false,
        dsp_repair_headers: [
        {
          text: "Item Id",
          align: "start",
          sortable: false,
          value: "item_id"
        },
        { text: "Article Description", value: "article_description" },
      ],
      dsp_repair_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm",
      dispositionRemarks: '', 
      original_table_data:[],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}],
      field_type: '',
      selected_inv:'', 
      remarks:"",
      repair_details:"",
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}],
      rules: {
          required: value => !!value || 'Required.'
      },
      };
      
    },
    components: {
      GradeSummary, 
      HeaderComponent
    },
    created() {
      this.getRepairOperationalData('Pending Repair Inspection'); 
      this.authorized_by = this.$store.state.currentUser.username 
      this.getPolicy();
    },
    methods: { 
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },

      FilterWithAlert(){
        this.getRepairOperationalData(this.active_tab);
      },


      getRequestParams( page, pageSize) {
        let params = {};


        if (page) {
          params["page"] = page;
        }

        if (pageSize) {
          params["size"] = pageSize;
        }

        return params;
      },

      handlePageChange(value) {
        this.page = value;
        this.getRepairOperationalData(this.active_tab);
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.getRepairOperationalData(this.active_tab);
      },

      repairdialogClose(){
        this.repairDetailDialog = false
        this.selected = []

      },

      loadData(tab) {
        this.active_tab = tab;
        this.page =  1
        this.totalPages =  1
        this.pageSize = 100
        this.getRepairOperationalData(tab)
        var status = this.getStatus(tab)

        if (tab == "Pending Repair Inspection"){ 
          this.table_data = this.table_data.map(x => ({ ...x, isSelectable: x.serial_no == null }))
          this.files   = []
          this.dialog_title = "Repair Details",
          this.headers    = [
          { text: "Item Id", align: "start", sortable: false, value: "item_id"},
          { text: "Article Id", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Serial Number", value: "serial_no" },
          { text: "Grade Summary", value: "grade_summary" },
          { text: "Ageing", value: "pending_initiation_ageing" },
          { text: "Alert Level", value: "alert_level" },
          { text: "Action", value: "pending_initiation_action" , sortable: false},
        ];
        }
        if (tab == "Pending Repair Estimate") { 
          this.files   = []
          this.dialog_title = "Repair Quotation",
          this.headers = [
          { text: "Item Id",align: "start",sortable: false,value: "item_id"},
          { text: "Article Id", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Serial Number", value: "serial_no" },
          { text: "Grade Summary", value: "grade_summary" },
          { text: "Ageing", value: "pending_quotation_ageing" },
          { text: "RGP", value: "repair_location" },
          { text: "Alert Level", value: "alert_level" },
          { text: "Action", value: "pending_initiation_action" , sortable: false},
        ];
        }
        if (tab == "Pending Repair Approval") { 
          this.files   = []
          this.table_data = this.table_data.map(x => ({ ...x, isSelectable: x.serial_no == null }))
          this.dialog_title = "Repair Approval",
          this.headers = [
            {
              text: "Item Id", align: "start",sortable: false, value: "item_id"},
            { text: "Article Id", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Serial Number", value: "serial_no" },
            { text: "Grade Summary", value: "grade_summary" },
            { text: "Amount(INR)", value: "repair_amount" },
            { text: "Attachment", value: "attachment" , sortable: false},
            { text: "Ageing", value: "pending_approval_ageing" },
            { text: "Alert Level", value: "alert_level" },
            { text: "Action", value: "pending_initiation_action" },
          ];
        }
        if (tab == "Pending Repair Completion") { 
          this.table_data = this.table_data.map(x => ({ ...x, isSelectable: x.serial_no == null }))
          this.files   = []
          this.dialog_title = "Repair Details",
         this.headers = [
            { text: "Item Id", align: "start", sortable: false, value: "item_id"},
            { text: "Article Id", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Serial Number", value: "serial_no" },
            { text: "RGP", value: "repair_location" },
            { text: "Amount(INR)", value: "repair_amount" },
            { text: "Attachment", value: "attachment" , sortable: false},
            { text: "Ageing", value: "pending_repair_ageing" },
            { text: "Alert Level", value: "alert_level" },
            { text: "Action", value: "pending_initiation_action" },
          ];
        }
        if (tab == "Pending Repair Grade") {
          this.files   = []
          this.headers = [
            { text: "Item Id", align: "start",sortable: false,value: "item_id"},
            { text: "Article Id", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Serial Number", value: "serial_no" },
            { text: "RGP", value: "pending_repair_location" },
            { text: "Attachment", value: "attachment" , sortable: false},
            { text: "Alert Level", value: "alert_level" },
            { text: "Ageing", value: "pending_grade_ageing" },
          ];
        }
        if (tab == "Pending Redeployment") {
          this.getDisposition()
          this.selectedDisposition = ''
          this.selected = []
          this.files   = []
          this.headers = [
            { text: "Item Id", align: "start",sortable: false,value: "item_id"},
            { text: "Article Id", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Serial Number", value: "serial_no" },
            { text: "Grade Summary", value: "grade_summary" },
            { text: "Ageing", value: "pending_disposition_ageing" },
            { text: "Alert Level", value: "alert_level" },
            { text: "Attachment", value: "attachment" , sortable: false},
          ];
        }
      },
      getDisposition(){
        this.$http.secured.get("/api/v1/warehouse/insurances/get_dispositions")
          .then(response => {
            if (response.data) {
              this.disposition_items = response.data.dispositions.filter(
                x => x.original_code != 'Repair'
              )
            } else {
              this.showAlert("error", "No Dispositions Found");
            }
          })
      },
      repairDetailDialogOpen(item){
        this.number = 0;
        if ( item && item.pending_repair_location != null && item.pending_repair_location != "" ){
          this.repair_date_disable = false
          this.pending_repair_location = item.pending_repair_location
          this.pending_repair_rgp_number = item.pending_repair_rgp_number
          this.repair_location_disable = true
          this.repair_rgp_disable = true
        }
        if (item){
          this.selected = [item]
        }
        this.selected_inv = this.selected[0]
        this.repairDetailDialog = true;
        this.files = []
        this.remarks =""
        this.email_date =''
        this.repair_location = ''
        this.rgp_no= ''
        this.repair_amount= 0;
      },
      viewSummaryDialogOpen(item){
        this.selected_inv = item
        var functional_images = item.grade_summary.physical_image_annotations
        for(var i=0; i < functional_images.length; i++){
          if (!this.physicalImages.includes(functional_images[i]["src"])){
            this.physicalImages.push(functional_images[i]["src"])
          }
        }

        var packaging_images = item.grade_summary.packaging_image_annotations
        for(var i=0; i < packaging_images.length; i++){
          if (!this.packagingImages.includes(packaging_images[i]["src"])){
            this.packagingImages.push(packaging_images[i]["src"])
          }
        }
        this.viewSummaryDialog = true;
      },
      viewSummaryDialogClose(){
        this.physicalImages = []
        this.packagingImages = []
        this.viewSummaryDialog = false
      },
      dspRepairDialogClose(){
        this.dspRepairDialog = false
        this.selectedDisposition = ''
        this.selected = []
      },
      viewAttachmentDialogOpen(item){
        this.selected_inv = item
        this.viewAttachmentDialog = true;
        //todo
      },
      changeDispositionItems() {
        var selected_disposition = this.disposition_items.filter(
          (x) => x.id == this.selectedDisposition
        );

        // this.selected_dispoition = selected_item;
        if (this.selected.length) {
          this.dispositionRemarks = '';
          (this.dailog_cancel = "Cancel"),
            (this.dailog_confirm = "Confirm"),
            (this.dialog_title =
              "Set Disposition - " + selected_disposition[0].original_code);
          this.dspRepairDialog = true;
          this.dsp_repair_data = this.selected;
        } else {
          this.showAlert("warning", "Please select the inventory for desired operation.");
        }
      },
      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      getRepairOperationalData(tab) {
      var status = this.getStatus(tab)
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.loading = true;
      this.$http.secured
        .get("/api/v1/warehouse/new_repairs", {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value }})
        .then(response => {
          if (response.data) {
            this.original_table_data = response.data.repairs;
            if (tab == 'Pending Repair Inspection'){
              this.table_data = this.original_table_data.map(x => ({ ...x, isSelectable: x.serial_no == null })).filter(
                x => x.status == status
              )
            }else if(tab == 'Pending Repair Estimate'){
              this.table_data = this.original_table_data.filter(
                x => (x.status == 'Pending Repair Estimate' || x.status == 'Pending Repair Quotation')
              )
            }else if(tab == 'Pending Repair Completion'){
              this.table_data = this.original_table_data.filter(
                x => (x.status == 'Pending Repair' || x.status == 'Pending Repair Completion')
              )
            }else if(tab == 'Pending Redeployment'){
              this.table_data = this.original_table_data.filter(
                x => (x.status == 'Pending Repair Disposition' || x.status == 'Pending Redeployment')
              )
            }else {
              this.table_data = this.original_table_data.filter(
                x => x.status == status
              )
            }

            this.loading = false;
            this.totalPages =  response.data.meta.total_pages
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
    repairDetailDialogsSubmit(){
        if (this.active_tab != "Pending Redeployment"){ 
            if (this.active_tab == "Pending Repair Inspection"){ 
              this.number++;
                const formData1 = new FormData();
                var status = this.getStatus(this.active_tab)
                formData1.append("repair_details[status]", status)
                formData1.append("repair_details[email_date]", this.email_date)
                formData1.append("repair_details[repair_location]", this.repair_location)
                formData1.append("repair_details[rgp_number]", this.rgp_no)
                formData1.append("repair_details[pending_initiation_remark]", this.remarks)
                for (var i = 0; i < this.selected.length; i++) {
                  formData1.append("repair_ids[]", this.selected[i].id);
                }

                for (var i = 0; i < this.files.length; i++) {
                  let file = this.files[i];
                  formData1.append("repair_details[files][]", file);                
                }
                if(this.email_date && this.repair_location){   
                  if(this.repair_location == "External Location" ) {
                      if (this.rgp_no){
                          this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData1)
                          .then(response => {
                              if (response.data) { 
                                this.repairDetailDialog = false
                                this.showAlert('success', "successfully updated")
                                this.active_tab = "Pending Repair Estimate"

                                this.email_date ="";
                                this.repair_location="";
                                this.rgp_no ="";
                                this.remarks ="";
                                this.repair_date ="";
                                this.selected = []
                                // this.authorized_by ="";
                                this.repair_amount = 0;
                                this.tab_name = "pending_repair_estimate"
                                this.loadData("Pending Repair Estimate");
                                this.getRepairOperationalData("Pending Repair Estimate");
                                
                              } else {
                                this.repairDetailDialog = false
                                this.showAlert("error", "No Data Found");
                              }
                          })
                      }
                      else{
                        this.showAlert("error", "RGP is required"); 
                      }                     
                  }else{
                    this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData1)
                    .then(response => {
                        if (response.data) { 
                          this.repairDetailDialog = false
                          this.showAlert('success', "successfully updated")
                          this.active_tab = "Pending Repair Estimate"

                          this.email_date ="";
                          this.repair_location="";
                          this.rgp_no ="";
                          this.remarks ="";
                          this.repair_date ="";
                          // this.authorized_by ="";
                          this.selected = []
                          this.repair_amount = 0;
                          this.tab_name = "pending_repair_estimate"
                          this.loadData("Pending Repair Estimate");
                          this.getRepairOperationalData("Pending Repair Estimate");
                          
                        } else {
                          this.repairDetailDialog = false
                          this.showAlert("error", "No Data Found");
                        }
                    })                      
                  }                  
                }
                else{
                    this.showAlert("error", "Email date and Repair location is required"); 
                }
            }

            if (this.active_tab == "Pending Repair Estimate"){ 
              this.number++;
                const formData2 = new FormData();
                var status = this.getStatus(this.active_tab)
                formData2.append("repair_details[status]", status)
                formData2.append("repair_details[pending_quotation_remark]", this.remarks)
                formData2.append("repair_details[repair_amount]", this.repair_amount)

                for (var i = 0; i < this.files.length; i++) {
                  let file = this.files[i];
                  formData2.append("repair_details[files][]", file);                
                }
                for (var i = 0; i < this.selected.length; i++) {
                  formData2.append("repair_ids[]", this.selected[i].id);
                }
                if(this.repair_amount && this.repair_amount >= 1){
                  this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData2)
                    .then(response => {
                    if (response.data) { 
                      this.repairDetailDialog = false
                      this.showAlert('success', "successfully updated")
                      this.email_date ="";
                      this.repair_location="";
                      this.rgp_no ="";
                      this.remarks ="";
                      this.repair_date ="";
                      this.selected = []
                      // this.authorized_by ="";
                      this.repair_amount = 0;
                      this.tab_name = "pending_repair_approval"
                      this.loadData("Pending Repair Approval");
                      this.getRepairOperationalData("Pending Repair Approval");
                      
                    } else {
                      this.repairDetailDialog = false
                      this.showAlert("error", "No Data Found");
                    }
                  })
                }else{
                      this.showAlert("error", "Repair amount should be greater than or equal to 1");
                      this.number = 0;
                }

            } 
              
            if (this.active_tab == "Pending Repair Completion"){ 
              this.number++;
                const formData3 = new FormData();
                var status = this.getStatus(this.active_tab)
                formData3.append("repair_details[status]", status)
                formData3.append("repair_details[repair_date]", this.repair_date)
                formData3.append("repair_details[pending_repair_location]", this.pending_repair_location)
                formData3.append("repair_details[pending_repair_rgp_number]", this.pending_repair_rgp_number)
                formData3.append("repair_details[pending_repair_remark]", this.remarks)
                for (var i = 0; i < this.selected.length; i++) {
                  formData3.append("repair_ids[]", this.selected[i].id);
                }

                for (var i = 0; i < this.files.length; i++) {
                  let file = this.files[i];
                  formData3.append("repair_details[files][]", file);                
                }

                if (this.repair_date_disable == false && this.repair_date){

                }

                if(this.pending_repair_location){   
                  if(this.pending_repair_location == "External Location" ) {
                      if (this.pending_repair_rgp_number){
                             this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData3)
                              .then(response => {
                              if (response.data) { 
                                this.repairDetailDialog = false
                                this.showAlert('success', "successfully updated")

                                this.email_date ="";
                                this.pending_repair_location="";
                                this.pending_repair_rgp_number ="";
                                this.remarks ="";
                                this.repair_date ="";
                                this.selected = []
                                // this.authorized_by ="";
                                this.repair_amount = 0;
                                this.tab_name = "pending_repair_grade"
                                this.loadData("Pending Repair Grade");
                                this.getRepairOperationalData("Pending Repair Grade");
                              } else {
                                this.repairDetailDialog = false
                                this.showAlert("error", "No Data Found");
                              }
                            })
                      }else{
                           this.showAlert("error", "RGP is required"); 
                      }
                  }else{
                         this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData3)
                          .then(response => {
                          if (response.data) { 
                            this.repairDetailDialog = false
                            this.showAlert('success', "successfully updated")

                            this.email_date ="";
                            this.pending_repair_location="";
                            this.pending_repair_rgp_number ="";
                            this.remarks ="";
                            this.repair_date ="";
                            this.selected = []
                            // this.authorized_by ="";
                            this.repair_amount = 0;
                            this.tab_name = "pending_repair_grade"
                            this.loadData("Pending Repair Grade");
                            this.getRepairOperationalData("Pending Repair Grade");
                          } else {
                            this.repairDetailDialog = false
                            this.showAlert("error", "No Data Found");
                          }
                        })
                  }
                }else{
                    this.showAlert("error", "Repair date and Repair location is required");
                }
               

            }
                     
        }else{

          const formData = new FormData();
          for (var i = 0; i < this.selected.length; i++) {
            formData.append("repair_ids[]", this.selected[i].id);
          }
          formData.append("pending_disposition_remark", this.remarks);
          formData.append("disposition", this.selectedDisposition);
          var status = this.getStatus(this.active_tab)
          formData.append("status", status);
          formData.append("policy", this.liquidation_policy);
          console.log(formData); 
          this.$http.secured.post("/api/v1/warehouse/new_repairs/update_disposition_item", formData)
          .then(response => {
          if (response.data) {
            this.repairDetailDialog = false
            this.showAlert('success', "successfully updated")
            this.getRepairOperationalData(this.active_tab) 
            this.email_date ="";
            this.repair_location="";
            this.rgp_no ="";
            this.remarks ="";
            this.repair_date ="";
            this.repair_amount = 0;  
            this.dspRepairDialog = false;
            this.selectedDisposition = '';
            this.selected = [];
            this.liquidation_policy = ''
          } else {
            this.dspRepairDialog = false; 
            this.showAlert("error", "No Data Found");
          }
        })  
      }
    },

    repairDetailDialogsApprove(){
      this.number++;
        const formData4 = new FormData();
        var status = this.getStatus(this.active_tab)
        formData4.append("repair_details[status]", status)
        formData4.append("repair_details[authorized_by]", this.authorized_by)
        formData4.append("repair_details[pending_approval_remark]", this.remarks)
        formData4.append("repair_details[repair_approval]", "approve") 
        for (var i = 0; i < this.selected.length; i++) {
          formData4.append("repair_ids[]", this.selected[i].id);
        }
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData4.append("repair_details[files][]", file);                
        }  
       this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData4)
        .then(response => {
        if (response.data) { 
          this.repairDetailDialog = false
          this.showAlert('success', "successfully updated")
          this.email_date ="";
          this.repair_location="";
          this.rgp_no ="";
          this.remarks ="";
          this.repair_date ="";
          this.selected = []
          this.repair_amount = 0;
          
          this.tab_name = "pending_repair_completion"
          this.loadData("Pending Repair Completion");
          this.getRepairOperationalData("Pending Repair Completion")

        } else {
          this.repairDetailDialog = false
          this.showAlert("error", "No Data Found");
        }
      }).catch(error => {
          this.showAlert("error", error.response.data.error);
          this.number = 0;
          this.loading = false;

        });  
    },
    repairDetailDialogsReject(){
      this.number++;
      const formData5 = new FormData();
      var status = this.getStatus(this.active_tab)
      formData5.append("repair_details[status]", status)
      formData5.append("repair_details[authorized_by]", this.authorized_by)
      formData5.append("repair_details[pending_approval_remark]", this.remarks)
      formData5.append("repair_details[repair_approval]", "reject") 
      for (var i = 0; i < this.selected.length; i++) {
        formData5.append("repair_ids[]", this.selected[i].id);
      }
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData5.append("repair_details[files][]", file);                
      }      
      this.$http.secured.put("/api/v1/warehouse/new_repairs/update_repair_details", formData5)
          .then(response => {
          if (response.data) { 
            this.repairDetailDialog = false
            this.showAlert('success', "successfully updated")
            this.email_date ="";
            this.repair_location="";
            this.rgp_no ="";
            this.remarks ="";
            this.repair_date ="";
            this.repair_amount = 0;
            this.selected = []
            this.tab_name = "pending_redeployment"
            this.loadData("Pending Redeployment");
            this.getRepairOperationalData("Pending Redeployment")
          } else {
            this.repairDetailDialog = false
            this.showAlert("error", "No Data Found");
          }
      })
    },
    getPolicy() {
      this.$http.secured
        .get("/api/v1/warehouse/insurances/get_dispositions")
        .then((response) => {
          if (response.data) {
            this.policies = response.data.policies;
          } else {
            this.showAlert("error", "No Disposition Found");
          }
        });
    },

    closepolicypop(){
      if (this.liquidation_policy == ''){
        this.$toast.error('Please provide Policy')
        return
      }
      this.policyModel = false
      this.changeDispositionItems()
    },

    openPolicyPopup(){
      if (this.selected.length == 0) {
        this.showAlert("warning", "Please select the inventory for desired operation.");
        return
      }
      var selected_disposition = this.disposition_items.filter(
        (x) => x.id == this.selectedDisposition
      );
      if (selected_disposition[0].original_code == 'Liquidation'){
        this.policyModel = true
      }else{
        this.changeDispositionItems()
      }
    },

    getColor(calories) {
      if (calories == "High") return "red";
      else if (calories == "Medium") return "orange";
      else if (calories == "Low") return "green";
    },

    getStatus(tab){
      var status = ''
      if (tab == 'Pending Repair Inspection'){
        status = 'Pending Repair Initiation'
      }else if (tab == 'Pending Repair Estimate'){
        status = ['Pending Repair Estimate', 'Pending Repair Quotation']
      }else if (tab == 'Pending Repair Approval'){
        status = 'Pending Repair Approval'
      }else if (tab == 'Pending Repair Completion'){
        status = ['Pending Repair', 'Pending Repair Completion']
      }else if (tab == 'Pending Repair Grade'){
        status = 'Pending Repair Grade'
      }else if (tab == 'Pending Redeployment'){
        status = ['Pending Repair Disposition', 'Pending Redeployment']
      }
      return status
    },

      searchItem(){
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );

        if (this.field_type == ''){
          this.showAlert("error", "Please Select Field to search in");
          return
        }


        var status = this.getStatus(this.active_tab)
        const formData = new FormData();

        formData.append('search', this.search)
        formData.append('search_in', this.field_type)

        if (Array.isArray(status)) {
          for (var i = 0; i < status.length; i++) {
            formData.append('status[]', status[i]);
          }
        } else {
          formData.append('status', status)
        }

        formData.append('page', 1)
        formData.append('per_page', params['size'])

        if (this.search.length != 0){
          this.$http.secured.post('/api/v1/warehouse/new_repairs/search_item', formData)
          .then(response => {
            if (response.data) {
              if (this.active_tab == 'Pending Repair Estimate' || this.active_tab == 'Pending Repair Completion' || this.active_tab == 'Pending Redeployment'){
                this.table_data = response.data.repairs.filter(
                  x => x.status == status[0] || x.status == status[1]
                )
              }else{
                this.table_data = response.data.repairs.filter(
                  x => x.status == status
                )
              }
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
        }else {
          this.field_type = ''
          this.getRepairOperationalData(this.active_tab)
        }

      },

    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
          if (index[0]=='pending_initiation_ageing' || index[0]=='pending_quotation_ageing' || index[0]=='pending_approval_ageing' || index[0]=='pending_repair_ageing' || index[0]=='pending_grade_ageing' || index[0] || 'pending_disposition_ageing' ) {
            if (!isDesc[0]) {
                return (parseInt(b.ageing_dispatch.split(' ')[0])) - parseInt(a.ageing_dispatch.split(' ')[0])
            } else {
                return (parseInt(a.ageing_dispatch.split(' ')[0])) - parseInt(b.ageing_dispatch.split(' ')[0])
            }
          }
          else {
            if(typeof a[index] !== 'undefined'){
              if (!isDesc[0]) {
                 return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
              }
              else {
                  return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
              }
            }
          }
      });
      return items;
    }
  },
}
</script>
<style>
  .v-card {max-width: 98% !important;}
  .v-card-100 {max-width: 100% !important;}
  .inc-title{color: #172B4D;font-size: 20px;}
  .gray-border{border: 1px solid rgba(0, 0, 0, 0.1);border-radius: 4px;}
  .cursor-pointer:hover {cursor: pointer;}
</style>