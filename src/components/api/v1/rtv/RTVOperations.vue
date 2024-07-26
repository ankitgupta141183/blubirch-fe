<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dispatchDialog" max-width="750px">
        <v-card class="v-card-100">
          <v-form ref="dispatchForm">
            <v-card-title>
              <span class="headline">Create Brand Call-Log Dispatch Order</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-flex>
                      <v-autocomplete v-model="vendor_code" :items="vendor_master" item-text="vendor_code_name" item-value="vendor_code" placeholder="Search/Enter Vendor Code*" :rules="inputRules" prepend-icon="mdi-magnify"></v-autocomplete>
                      <!-- <v-text-field solo v-model="vendor_code" label="Vendor Code"></v-text-field> -->
                    </v-flex>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="normal" @click="dispatchDialog = false">Cancel</v-btn>
              <v-btn small color="primary" @click="dispatchItems">Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="editModel" max-width="750px">
        <v-card class="v-card-100">
          <v-form ref="invoiceForm" @submit.prevent>
            <v-card-title>
              <span class="headline">Update Information</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-flex>
                      <v-text-field solo v-model="invoice_number" :counter="15" label="Invoice Number" :rules="InvoiceinputRules"></v-text-field>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="normal" @click="editModel = false">Cancel</v-btn>
              <v-btn small color="primary" type="button" @click="editDetails" :disabled="number > 0 || !invoice_number">Confirm</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="callLogDialog" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">Set Call Log</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-flex>
                    <v-text-field solo v-model="input_call_log" label="Enter Call Log"></v-text-field>
                  </v-flex>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="callLogDialog = false">Cancel</v-btn>
            <v-btn small color="primary"  @click="saveCalllog" :disabled="number > 0 || !input_call_log">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

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
                <v-col cols="9">
                  <v-flex>
                    <v-text-field type="number" v-model="credit_note_amount" label="Credit Note Amount" @keypress="onlyNumber"></v-text-field>
                  </v-flex>
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
      <v-dialog v-model="orderConfirmDialog" max-width="500px">
        <v-card class="v-card-100">
          <v-card-text>
            <v-container>
              <v-row align="center"
                justify="center" style="margin-top: 30px;">
                <h6 align="center">Order Number # {{order_number}} submitted for Dispatch</h6>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="primary" @click="orderConfirmDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="inspectionDialog" max-width="900px" max-height= "900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">Brand Inspection</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-flex>
                    <v-text-field outlined required @click="dateselect = true" v-model= "inspection_date" >
                      <template slot="label">
                        <v-icon>event</v-icon> Inspection Date *
                      </template>
                    </v-text-field>
                    <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-if="dateselect" v-model="inspection_date_2" @change="selectdate"></v-date-picker>
                  </v-flex>
                  <!-- New Fields -->
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-select
                          :items="replacement_location_items"
                          v-model="replacement_location"
                          label="Inspection Location*"
                          outlined
                        ></v-select>
                      </v-flex>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" >
                      <v-text-field v-if="replacement_location == 'External Location'" hide-details v-model="rgp_number" label="RGP Number*" outlined></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- New fields End -->
                  <v-flex>

                    <v-textarea outlined v-model="inspection_remark" label= "Add Remarks*" ></v-textarea>
                  </v-flex>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENTS"></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="inspectionDialog=false">Cancel</v-btn>
            <v-btn small color="primary" @click="saveInspectionDetails" :disabled="number > 0 || !inspection_date || !replacement_location || !inspection_remark">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dispositionDialog" max-width="900px" max-height= "900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline"> {{dispositionHeading}} </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-simple-table class="gray-border">
                    <template>
                      <thead>
                        <tr>
                          <th class="text-left">Item Id</th>
                          <th class="text-left">Article Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selected">
                          <td>{{item.tag_number}}</td>
                          <td>{{item.item_description}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <!-- New Fields -->
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-autocomplete
                          v-if="active_tab == 'Pending Brand Resolution'"
                          v-model="selectedDisposition"
                          :items="menu_items"
                          target="#set-disposition"
                          item-text="original_code"
                          @change="openPolicyPopup"
                          item-value="id"
                          color="primary"
                          label="SET DISPOSITION"
                        ></v-autocomplete>
                      </v-flex>
                    </v-col>
                  </v-row>
                  <!-- New fields End -->
                  <v-flex>

                    <v-textarea outlined v-model="inspection_remark" label= "Add Remarks*" ></v-textarea>
                  </v-flex>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENTS"></v-file-input>
                </v-col>
              </v-row>
            </v-container>SET DISPOSITION
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="normal" @click="dispositionDialog=false">Cancel</v-btn>
            <v-btn small color="primary" @click="confirmdspRepairDialog" :disabled="number > 0 || !selectedDisposition || !inspection_remark">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="980px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-data-table
                :dense="true"
                :headers="active_tab=='Pending Call Log'? claims_header : confirmed_headers"
                :items="confirmed_data"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.alert_level="{ item }">
                  <v-chip
                    v-if="item.alert_level"
                    class="ma-2 justify-center"
                    small
                    label
                    :color="getColor(item.alert_level)"
                    style = "min-width:60px;"
                    dark
                  >{{ item.alert_level }}</v-chip>
                </template>
                <template v-slot:item.item_desc="{item}">
                  <span
                    v-b-tooltip.hover
                    :title="item.item_desc"
                  >{{item.item_desc | truncate(17, '...')}}</span>
                </template>

                <template v-slot:item.both_ageing="{ item }">
                  <span>{{item.both_ageing.ageing_inward}} ({{item.both_ageing.ageing_dispatch}})</span>
                </template>  
              </v-data-table>

              <v-flex v-if="active_tab == 'Pending Call Log'" style="margin-top: 30px;">
                <v-text-field outlined v-model="settlement_date" @click="dateselect = true" required>
                  <template slot="label">
                    <v-icon>event</v-icon> Email Date*
                  </template>
                </v-text-field>
                <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-if="dateselect" v-model="inspection_date_2" @change="selectsettlementdate"></v-date-picker>

              </v-flex>
              <!-- New Fields -->
              <v-row v-if="active_tab == 'Pending Call Log'">
                <v-col cols="6" sm="6" md="6">
                  <v-flex>
                    <v-select
                      :items="replacement_location_items"
                      v-model="replacement_location"
                      label="Initiation Location*"
                      outlined
                    ></v-select>
                  </v-flex>
                </v-col>
                <v-col cols="6" sm="6" md="6" >
                  <v-text-field hide-details v-if="replacement_location == 'External Location'" v-model="rgp_number" label="RGP Number*" outlined></v-text-field>
                </v-col>
              </v-row>
              <!-- New fields End -->

              <!-- New Fields -->
              <v-row v-if="active_tab == 'Pending Call Log'">
                <v-col cols="12" sm="12" md="12" >
                  <v-textarea outlined v-model="action_remark" label= "Add Remarks*" ></v-textarea>
                </v-col>
              </v-row>

              <v-flex v-if="active_tab == 'Pending Call Log'">
                <v-file-input small-chips multiple v-model="files" label="ATTACH DOCUMENT"></v-file-input>
              </v-flex>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="dialog = false">{{dailog_cancel}}</v-btn>
            <v-btn small
              v-bind:color="dailog_confirm ==='Reject'?'error': 'primary'"
              @click="confirmDialog"
              :disabled="number > 0 || !settlement_date || !replacement_location || !action_remark"
            >{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="approvaldialog" persistent max-width="980px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-data-table
                :dense="true"
                :headers="brand_approval_headers"
                :items="brand_approval_data"
                
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.both_ageing="{ item }">
                  <span>{{item.both_ageing.ageing_inward}} ({{item.both_ageing.ageing_dispatch}})</span>
                </template>
                <template v-slot:item.item_description="{item}">
                  <span
                    v-b-tooltip.hover
                    :title="item.item_description"
                  >{{item.item_description | truncate(17, '...')}}</span>
                </template>

                <template v-slot:item.item_price="{item}">
                  <span><v-icon>mdi-currency-inr</v-icon>{{item.item_price}}</span>
                </template>
              </v-data-table>

              <v-flex style="margin-top: 30px;">
                <v-textarea outlined v-model="action_remark" label= "Add Remarks*" ></v-textarea>
              </v-flex>

              <v-col cols="6" sm="6">
                <v-file-input small-chips v-model="files" multiple label="ATTACH DOCUMENT"></v-file-input>
              </v-col>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="cancelDialog">{{dailog_cancel}}</v-btn>
            <v-btn small
              v-bind:color="dailog_confirm ==='Reject'?'error': 'primary'"
              @click="approveRejectInventory"
            >{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- <v-card-title>RTV</v-card-title> -->
    <!-- <div class="main_header" style="margin-left:16px">RTV</div> -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Vendor Returns</div> -->
    <div> <HeaderComponent :headerTitle="headerText" /></div>
    <v-card class="v-card-100">
      <v-tabs v-model='tab_name'>
        <v-tab
          ripple :href="'#'+tab.replace(/ /g,'_').toLowerCase()"
          style="text-transform:none!important;"
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title>
      <v-row>
        <v-col cols="3" sm="3">
          <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id, Serial Number or Brand" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col cols="3" sm="3">
          <v-select :items="alert_item" v-model="alert_value" item-value="value" item-text="name"  label="Select Alert Level" outlined @change="FilterWithAlert()"></v-select>
        </v-col>
      </v-row>
      <v-card-actions>

        <v-btn
          @click="updateDetails"
          v-if="active_tab == 'Pending Inspection'"
          class="ma-2"
          color="primary"
        > Update Information </v-btn>

        <v-flex xs12 d-flex>
          <v-autocomplete
            v-if="active_tab == 'Pending Call Log'"
            v-model="selectedDisposition"
            :items="menu_items"
            target="#set-disposition"
            item-text="original_code"
            @change="openDisposition"
            item-value="id"
            color="primary"
            label="SET DISPOSITION"
            solo
            style= "margin-top: 10px;"
          ></v-autocomplete>
        </v-flex>

        <v-btn
          @click="openBrandInspection"
          v-if="active_tab == 'Pending Inspection'"
          class="ma-2"
          color="primary"
        > Brand Inspection </v-btn>

        <v-btn
          @click="openDisposition"
          v-if="active_tab == 'Pending Brand Resolution'"
          class="ma-2"
          color="primary"
        > Resolution </v-btn>

        <v-btn
          @click="confirmation"
          v-if="active_tab == 'Pending Call Log'"
          class="ma-2"
          color="primary"
        >{{approval_btn}}</v-btn>


        <v-btn
          @click="openDispatchModel"
          v-if="active_tab == 'Pending Dispatch'"
          class="ma-2"
          color="primary"
        >Dispatch</v-btn>

        <v-btn
          @click="openCallLogModel"
          v-if="active_tab == 'Update Call Log'"
          class="ma-2"
          color="primary"
        >Update Call Log</v-btn>

      </v-card-actions>
    </v-card-title>
    <v-layout column>

    <v-flex md6 style="overflow: auto"> 
      <v-data-table
        :dense="true"
        v-model="selected"
        :headers="headers"
        :items="table_data"
        show-select
        class="elevation-1"
        :loading="loading"
        :custom-sort="customSort"
        disable-pagination
        :hide-default-footer="true"
        loading-text="Loading Data... Please wait"
      >
        <template v-slot:item.alert_level="{ item }">
          <v-chip
            v-if="item.alert_level"
            class="ma-2 justify-center"
            x-small
            label
            :color="getColor(item.alert_level)"
            dark
            style = "min-width:60px;"
          >{{ item.alert_level}}</v-chip>
        </template>

        <template v-slot:item.customcheck="{ item }">
          <input v-if="item.vendor_return_order_id == null " type="checkbox" :value="item" id="item.id" @change="assignvalue($event, item)" style="width: 18px; height: 18px; margin-top: 2px;">
          <!-- <v-checkbox v-if="item.vendor_return_order_id != '' " :value="item" @click = "($event)" hide-details /> -->
        </template>

        <template v-slot:item.item_desc="{item}">
          <span
            v-b-tooltip.hover
            :title="item.item_desc"
          >{{item.item_desc | truncate(17, '...')}}</span>
        </template>

        <template v-slot:item.call_log_id="{item}">
          <span>{{ item.call_log_id ? item.call_log_id : "N/A"}}</span>
        </template>

        <template v-slot:item.attached_file_url="{item}"><a :href="item.attached_file_url" target="#" download>
          <v-icon v-if="item.attached_file_url">mdi-download</v-icon></a>
        </template>

        <!-- <template v-slot:item.call_log_id_field = "{item}">
          <input v-model="item.call_log_id" type="text" style= "margin-top: 10px; width: 100px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" :id="`field-${item.inventory_id}`" disabled="true">
        </template> -->

        <template v-slot:item.call_action="{ item }">
          <button v-show= "true" :id="`edit-${item.inventory_id}`" ><img src="@/assets/images/Edit_pencil.png" @click="enableField(item)" /></button>
          <button v-show="false" :id="`save-${item.inventory_id}`"><img src="@/assets/images/Save.svg" @click="saveCalllog(item)" /></button>
        </template>

        <template v-slot:item.brand_approval_action="{ item }">
          <v-btn x-small color="primary" @click="approveConfirmation(item)" style = "margin-top: 10px; margin-bottom: 10px;">Approve</v-btn>
          <v-btn x-small color="grey" class="white--text" @click="rejectConfirmation(item)" style = "margin-top: 10px; margin-bottom: 10px;">Reject</v-btn>
        </template>

        <template v-slot:item.item_description_truncate = "{item}">
          <span
            v-b-tooltip.hover
            :title="item.item_description"
          >{{item.item_description | truncate(17, '...')}}</span>
        </template>

        <template v-slot:item.remind_escalate="{item}">
          <img v-if="item.remind_escalate.last_escalated_at!=null && item.remind_escalate.last_reminded_at==null"
            src="@/assets/images/icons/only esclated.svg"
            title="'Last Escalated at ' + item.remind_escalate.last_escalated_at "
          />

          <img v-if="(item.remind_escalate.last_reminded_at != null) && (item.remind_escalate.last_escalated_at == null)"
            src="@/assets/images/icons/only reminded.svg"
            :title="'Last Reminded at '+ item.remind_escalate.last_reminded_at "
          />
          <img v-if="item.remind_escalate.last_escalated_at != null && item.remind_escalate.last_reminded_at != null"
            src="@/assets/images/icons/Both esclated & Reminder.svg"
            v-bind:title="'Last Escalated at '+ item.remind_escalate.last_escalated_at +  ' And Last Reminded at ' + item.remind_escalate.last_reminded_at "
          />
        </template>

<!--         <template v-slot:item.inspection_action="{item}">
          <img @click="openBrandInspection(item)"
            src="@/assets/images/job_sheet.png"
            title="Brand Inspection"
          />
        </template> -->

<!--         <template v-slot:item.disposition_action="{item}">
          <img @click="openDisposition(item)"
            src="@/assets/images/job_sheet.png"
            title="Set Disposition"
          />
        </template> -->

        <template v-slot:item.item_price="{item}">
          <span><v-icon>mdi-currency-inr</v-icon>{{item.item_price}}</span>
        </template>

        <template v-slot:item.both_ageing="{ item }">
          <span>{{item.both_ageing.ageing_dispatch?item.both_ageing.ageing_dispatch:'0d'}} ({{item.both_ageing.ageing_inward?item.both_ageing.ageing_inward:'0d'}})</span>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
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

<style >
.theme--light.v-icon {
  color: #1867c0!important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 14px !important;
}
.v-card {
  max-width: 97% !important;
}

.v-card-100 {
  max-width: 100% !important;
}
</style>

<script>
import $ from 'jquery'
import Editor from "@tinymce/tinymce-vue";
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      headerText: "Brand Call-Log",
      settlement_confirm_dialog_title:'',
      dispositionRemarks:'',
      selectedDisposition:'',
      journey_data: [],
      settlement_date: "",
      approved_amount: "",
      last_saved_date: "",
      tab_name: "pending_claim",
      loading: true,
      to_email: "",
      files: [],
      email_content: {},
      email_subject: "",
      email_desc: "",
      attachment: "",
      alert: false,
      alert_type: "success",
      alert_message: "success",
      dialog_title: "Confirmation - Claim ID",
      approval_btn: "Update Initiation Date",
      active_tab: "Pending Call Log",
      // for confirm button disabled
      number: 0,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      save_button: false,
      is_disable: true,
      edit_button: true,
      selected_row : [],
      tabs: [
        "Pending Call Log",
        "Update Call Log",
        "Pending Inspection",
        "Pending Brand Resolution"
      ],
      singleSelect: false,
      selected: [],
      search: "",
      item_key: "inventory_id",
      menu_items: [],
      dialog: false,
      journeyDialog: false,
      selected_dispoition: "",
      dateselect: false,
      approvaldialog: false,
      brand_approval_data: [],
      brand_approval_headers: [
        {
          text: "Article Id",
          align: "start",
          sortable: false,
          value: "sku_code"
        },
        { text: "Article Description", value: "item_description" },
        { text: "Brand", value: "vendor" },
        { text: "Claim Amount", value: "item_price" },
        { text: "Ageing", value: "both_ageing", width: '10%' },
      ],
      settlement_remark: '',
      original_claim_table_data: [],
      claim_table_data: [],
      inspectionDialog: false,
      inspection_remark: '',
      action_remark: '',
      inspection_date: '',
      inspection_date_2: '',
      inspection_inventory: '',
      dispatchDialog: false,
      vendor_code: '',
      order_number: '',
      orderConfirmDialog: false,

      dsp_repair_headers: [
        {
          text: "Call Log",
          align: "start",
          sortable: false,
          value: "call_log_id"
        },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Brand", value: "vendor" },
        { text: "Ageing", value: "both_ageing", width: '10%' }
      ],
      dsp_repair_data: [],
      confirmed_headers: [
        {
          text: "Call Log",
          align: "start",
          sortable: false,
          value: "call_log_id"
        },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description", width:'20%' },
        { text: "Brand", value: "vendor" },
        { text: "Ageing", value: "both_ageing", width: '10%' }
      ],

      claims_header: [
        {
          text: "Item Id",
          align: "start",
          sortable: false,
          value: "tag_number"
        },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description", width:'20%' },
        { text: "Brand", value: "vendor" },
        { text: "Alert Level", value: "alert_level" }
      ],
      confirmed_data: [],
      headers: [
        {
          text: "Item Id",
          align: "start",
          value: "tag_number"
        },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description", width: '15%' },
        { text: "Brand", value: "vendor" },
        { text: "Ageing", value: "both_ageing", width: '10%' },
        { text: "RPA Reason", value: "return_reason", width: '15%' },
        { text: "Serial Number", value: "serial_number"},
        { text: "Alert Level", value: "alert_level" }
      ],
      journey_headers: [
        {
          text: "Tag",
          align: "start",
          sortable: false,
          value: "tag",
          width:'12%'
        },
        { text: "Return Date", value: "return_date",  width:'12%' },
        { text: "Item Description", value: "item_desc", width:'12%' },
        { text: "Approval Sent", value: "approval_sent", width:'13%' },
        { text: "Approval Received", value: "approval_received", width:'15%' },
        { text: "Dispatch Date", value: "dispatch_date", width:'12%' },
        { text: "Amount", value: "cost", width:'8%' }
      ],
      items: [{ title: "Escalate" }, { title: "Remind" }],
      table_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm",
      selected_inventory: "",
      replacement_location: '',
      rgp_number: '',
      replacement_location_items: ["In House", "External Location"],
      dispositionDialog: false,
      policyModel: false,
      liquidation_policy: '',
      policies: [],
      credit_note_amount: '',
      callLogDialog: false,
      input_call_log: '',
      vendor_master: [],
      inputRules: [ v => !!v || "The field is required"],
      editModel: false,
      sr_number: '',
      invoice_number: '',
      dispositionHeading: 'Set Disposition',
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      InvoiceinputRules: [ (v) => (v && (v.length == 15)) && ((/^[A-Za-z0-9]+$/.test(v))) || "Invoice Number must be equal to 15 characters only Alpha Numeric",],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number2"}, {name: 'Brand', value: "brand"}],
      field_type: '',
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}]

    };
  },
  created() {
    this.getRTVOperationalData('Pending Call Log');
    this.getDesposition()
  },
  components: {
    editor: Editor,
    HeaderComponent
  },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
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

    confirmDialog() {
      this.number++;
      let selectedClaimId = [];
      var param_data = "";
      var message_to_show = "";

      if (this.active_tab == "Pending Call Log") {
        if (this.settlement_date == ''){
          this.$toast.error('Please Provide Email Date')
          return
        }
         if (this.replacement_location == ''){
          this.$toast.error('Please Provide Replacement Location')
          return
        }

        if (this.replacement_location == 'External Location' && this.rgp_number == ''){
          this.$toast.error("Please Provide RGP Number")
          return
        }
        if (this.action_remark == ''){
          this.$toast.error('Please Provide Remarks')
          return
        }

        this.number++;
        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }

        formData.append('email_date', this.settlement_date)
        formData.append('claim_replacement_location', this.replacement_location)
        formData.append('claim_rgp_number', this.rgp_number)
        formData.append('remark', this.inspection_remark)

        for (var i = 0; i < this.selected.length; i++) {
          formData.append("inventory_ids[]", this.selected[i].inventory_id);
        }
        
        message_to_show = "Selected items updated successfully";
        this.postRTVOperationalData(
          "/api/v1/warehouse/return_to_vendor/send_for_claim",
          formData,
          message_to_show,
          this.active_tab,
          "Update Call Log"
        );
      }
        
    },

    isDisabled() {
      // if (this.active_tab === "Pending Call Log") {
        return true
      // }
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },
    confirmationReSubmit() {
      if (this.selected.length) {
        this.confirmed_data = this.selected;
          (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Accept");
          this.dialog_title = "Confirmation Re-Submit";
          this.dialog = true;
      } else {
        this.showAlert(
          "warning",
          "Please select the Inv. for Re-Submit for " + this.active_tab
        );
      }
    },

    confirmation() {
      this.number=0
      this.files = []
      this.settlement_date = ''
      this.inspection_remark = ''
      this.rgp_number = ''
      this.replacement_location = ''
      this.action_remark = ''
      if (this.selected.length) {
        this.confirmed_data = this.selected.reverse();
        if (this.active_tab == "Pending Call Log") {
          (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Confirm");
          this.dialog_title = "Update Initiation Date";
          this.dialog = true;
        } else if (this.active_tab == "Pending Brand Resolution") {
          (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Accept");
            this.dialog_title = "Confirmation Approval";
            this.dialog = true;
        } else if (this.active_tab == "Pending Dispatch") {
          this.dialog_title = "";
          this.clearEmailModal();
        }
      } else {
        this.showAlert(
          "warning",
          "Please select the Items for " + this.active_tab
        );
      }
    },

    FilterWithAlert(){
      this.getRTVOperationalData(this.active_tab);
    },

    handlePageChange(value) {
      this.page = value;
      this.getRTVOperationalData(this.active_tab);
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getRTVOperationalData(this.active_tab);
    },

    getRTVOperationalData(tab) {
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      var status = this.getStatus(tab)
      this.$http.secured
        .get("/api/v1/warehouse/return_to_vendor", {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value}})
        .then(response => {
          if (response.data) {
            this.original_table_data = response.data.vendor_returns;
            this.totalPages =  response.data.meta.total_pages
            if(this.active_tab == 'Pending Brand Resolution'){
              this.table_data = this.original_table_data.filter(
                x => x.status == status[0] || x.status == status[1]
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            }else{
              this.table_data = this.original_table_data.filter(
                x => x.status == status
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            }
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

    custom_sort(a, b) {
      return new Date(a.dispatch_date).getTime() - new Date(b.dispatch_date).getTime();
    },

    getRTVOperationalClaimsJourney(param_data) {
      this.$http.secured
        .get("/api/v1/warehouse/return_to_vendor/claim_journey", param_data)
        .then(response => {
          if (response.data) {
            this.journey_data = response.data.vendor_returns;
            this.journeyDialog = true;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    postRTVOperationalData(api_url, dataUpdate, message_to_show, active_tab, next_tab) {
      this.loading = true;
      var status = this.getStatus(active_tab)
      this.$http.secured
        .post(api_url, dataUpdate)
        .then(response => {
          if (response.data.vendor_returns) {
            this.original_table_data = response.data.vendor_returns;
            this.table_data.splice(this.selected, 1)
            this.table_data = [];
            this.table_data = this.original_table_data.filter(x =>
              x.status == (status)
            ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.selected = [];
            this.showAlert("success", message_to_show);
            this.loading = false;
            this.dialog = false
            this.files= [];
            this.settlement_date = ''
            this.replacement_location = ''
            this.rgp_number = ''
            this.inspection_remark = ''
            this.tab_name = 'update_call_log'
            this.loadData(next_tab)
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    setDisposition(dataUpdate, message_to_show, active_tab, path) {
      this.loading = true;
      this.$http.secured
        .put(path, dataUpdate)
        .then(response => {
          if (response.data.vendor_returns) {
            this.original_table_data = response.data.vendor_returns;
            this.table_data = this.original_table_data.filter(x =>
              x.status == "Pending Brand Approval"
            ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.table_data = this.table_data.filter(x => x.disposition_set != true)
            this.selectedDisposition = '';
            this.selected = [];
            this.loading = false;
            this.inspection_remark = ''
            this.dispositionDialog = false
            this.files = []
            if (this.active_tab == "Pending Call Log"){
              this.tab_name = "pending_call_log"
              this.loadData("Pending Call Log")
            }else{
              this.loadData(this.active_tab)
            }
            this.showAlert("success", message_to_show);
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    getStatus(tab) {
      var status = "";
      if (tab == "Pending Call Log") {
        status = "Pending Claim";
      } else if (tab == "Update Call Log") {
        status = "Pending Call Log";
      } else if (tab == "Pending Inspection"){
        status = "Pending Brand Inspection"
      }else  if (tab == "Pending Brand Resolution"){
        status = ["Pending Brand Approval", "Pending Brand Resolution"]
      }else {
        status = tab
      }
      return status;
    },

    onlyNumber ($event) {
       //console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
       if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
          $event.preventDefault();
       }
    },
    postRTVOperationalClaimData(
      api_url,
      dataUpdate,
      message_to_show,
      active_tab
    ) {
      this.loading = true;
      this.$http.secured
        .post(api_url, dataUpdate)
        .then(response => {
          if (response.data.claims) {
            this.original_claim_table_data = response.data.claims;
            this.claim_table_data = [];
            this.claim_table_data = this.original_claim_table_data.map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.selected = [];
            this.showAlert("success", message_to_show);
            this.loading = false;
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    aggregatePendingBrandAppralData(inventories){

      this.table_data = [];

      this.table_data = inventories.reduce(function(acc, curr) {
        let findIndex = acc.findIndex(item => item.claim_number === curr.claim_number);
        acc.quantity=0;
        if (findIndex === -1) {
          acc.push(curr);
        } else {
        acc[findIndex].cost += curr.cost;
        acc[findIndex].approved_amount += Number(curr.approved_amount);
        acc[findIndex].quantity += curr.quantity;
        acc[findIndex].brand_approvals = "";
        }
        return acc;
      }, []).filter(x =>x.claim_id !=null);

    },

    loadData(tab) {
      this.selected = [];
      this.active_tab = tab;
      this.table_data = [];
      this.search = '';
      this.page =  1
      this.totalPages =  1
      this.pageSize = 100
      this.field_type = ''
      var status = this.getStatus(tab)

      this.getRTVOperationalData(tab)

      this.table_data = this.original_table_data.filter(
        x =>
          x.status == status
      ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});

      if(tab == 'Pending Brand Resolution'){
          this.getDesposition()
          this.table_data = this.original_table_data.filter(
            x =>
              x.status == status
          ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
          this.table_data = this.table_data.filter(x => x.disposition_set != true)
          let action_data = this.table_data.map(function(pending_brand_inventory) {
          pending_brand_inventory.remind_escalate = {
            last_escalated_at: pending_brand_inventory.escalated_at ? pending_brand_inventory.escalated_at : null,
          last_reminded_at: pending_brand_inventory.reminded_at ? pending_brand_inventory.reminded_at : null}
          return pending_brand_inventory;
        });
        this.table_data = action_data;
        // this.aggregatePendingBrandAppralData(this.table_data);
      }


      if (tab == "Pending Brand Resolution") {
          (this.item_key = "inventory_id"),
          (this.headers = [
            {
              text: "Call Log",
              align: "start",
              sortable: false,
              value: "call_log_id"
            },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description_truncate" },
            { text: "Brand", value: "vendor" },
            { text: "Ageing", value: "both_ageing", width: '10%' },
            { text: "Tag Number", value: "tag_number" },
            { text: "Serial Number", value: "serial_number"},
            { text: "Alert Level", value: "alert_level" }
          ]);
      }


      if (tab == "Update Call Log") {
        (this.approval_btn = "Send For Call Log"),
          (this.item_key = "inventory_id"),
          (this.headers = [
            {
              text: "Item Id",
              align: "start",
              value: "tag_number"
            },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Brand", value: "vendor" },
            { text: "Ageing", value: "both_ageing", width: '10%' },
            { text: "Serial Number", value: "serial_number"},
            // { text: "Call Log", value: "call_log_id_field"},
            { text: "Alert Level", value: "alert_level" },
            // { text: "Action", value: "call_action" }
          ]);
      }

      if (tab == "Pending Inspection") {
          (this.item_key = "inventory_id"),
          (this.headers = [
            {
              text: "Call Log",
              align: "start",
              sortable: false,
              value: "call_log_id"
            },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Brand", value: "vendor" },
            { text: "Ageing", value: "both_ageing", width: '10%' },
            { text: "Serial Number", value: "serial_number"},
            { text: "Alert Level", value: "alert_level" }
          ]);
      }

      if (tab == "Pending Call Log") {
        (this.approval_btn = "Update Initiation Date"),
          (this.item_key = "inventory_id"),
          (this.headers = [
            {
              text: "Item Id",
              align: "start",
              value: "tag_number"
            },
            { text: "Article ID", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Brand", value: "vendor" },
            { text: "Ageing", value: "both_ageing", width: '10%' },
            { text: "RPA Reason", value: "return_reason"},
            { text: "Serial Number", value: "serial_number"},
            { text: "Alert Level", value: "alert_level" }
          ]);
      }
    },

    confirmdspRepairDialog() {
      this.number++;
      if (this.selectedDisposition == ''){
        this.$toast.error('Please Select Disposition')
        return
      }

      if (this.inspection_remark == '' ){
        this.$toast.error('Please enter Remark')
        return
      }

      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("inventory_ids[]", this.selected[i].inventory_id);
      }
      formData.append("disposition", this.selectedDisposition);
      formData.append("remark", this.inspection_remark);
      if (this.liquidation_policy != ''){
        formData.append('policy', this.liquidation_policy)
        formData.append('credit_note_amount', this.credit_note_amount)
      }

      this.dispatchDialog = false;

      let message_to_show = "Disposition set for selected inventory successfully";

      let path = ""

      if (this.active_tab == "Pending Call Log"){
        path = "/api/v1/warehouse/return_to_vendor/set_disposition"
      }else{
        path = "/api/v1/warehouse/return_to_vendor/set_disposition"
      }

      this.setDisposition(formData, message_to_show, this.active_tab, path);
    },

    getColor(calories) {
      if (calories == "High") return "red";
      else if (calories == "Medium") return "orange";
      else if (calories == "Low")return "green";
    },

    enableField (item){

      $("#edit-"+item.inventory_id).hide();
      $("#save-"+item.inventory_id).show();
      $("#field-"+item.inventory_id).prop("disabled", false);
    },

    saveCalllog (){
      this.number++;
      if (this.input_call_log == null || this.input_call_log == ""  ){
        this.showAlert("error", "Please Provide Call Log ID");
        return
      }

      var inventory = []
      for(var i=0;i < this.selected.length; i++){
        this.selected[i].call_log_id = this.input_call_log
        inventory.push(this.selected[i].inventory_id)
      }
      
      let data = {
        inventory_ids: inventory,
        call_log_id: this.input_call_log
      }
      var status = this.getStatus(this.active_tab)
      this.$http.secured.put("/api/v1/warehouse/return_to_vendor/update_call_log", data)
        .then(response => {
          if (response.data) {
            this.original_table_data = response.data.vendor_returns;
            this.table_data = this.original_table_data.filter(
              x => x.status == status
            ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.callLogDialog = false
            this.input_call_log = null
            this.tab_name = "pending_inspection"
            this.loadData("Pending Inspection")
            this.showAlert('success', "Update Call Log Id")
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
            this.loading = false;
            this.showAlert("error", "Something went wrong from Network" + error);
          });
    },

    openBrandInspection(){
      this.number=0;
      if (this.selected.length <= 0 ){
        this.showAlert("warning", "Please Select Records")
        return
      }
      this.inspection_date = ''
      this.files = []
      this.inspection_remark = ''
      this.inspectionDialog = true
    },

    openDisposition(){
      this.number=0;
      this.liquidation_policy = '';
      this.credit_note_amount = '';
      if (this.selected.length <= 0 ){
        this.showAlert("warning", "Please Select Records")
        return
      }

      if (this.active_tab == "Pending Call Log"){
        this.openPolicyPopup()
      }

      this.inspection_remark = ''
      this.files = []
      if (this.policyModel == false) {
        this.dispositionDialog = true
      }

    },
    openPolicyPopup(){
      var selected_disposition = this.menu_items.filter(
        (x) => x.id == this.selectedDisposition
      );

      if (this.active_tab == "Pending Call Log" ){
        this.dispositionHeading = "Set Disposition - " + selected_disposition[0].original_code
      }

      if (selected_disposition[0].original_code == 'Liquidation'){
        this.policyModel = true
      }
    },

    saveInspectionDetails(){        
      this.number++;  
      if(new Date(this.selected_row.claim_email_date).getTime() > new Date(this.inspection_date).getTime()){
          this.$toast.error('Inspection Date should be greater OR equal then Email Date');
          return
      }
      if (this.inspection_date == ''){
        this.$toast.error("Please Provide Inspection Date");
        return
      }
      if (this.replacement_location == ''){
        this.$toast.error("Please Provide Inspection Location");
        return
      }
      if (this.replacement_location == 'External Location' && this.rgp_number == ''){
        this.$toast.error("Please Provide RGP Number")
        return
      }

      if (this.inspection_remark == ''){
        this.$toast.error("Please Provide Remark");
        return
      }

      const formData = new FormData();
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("inventory_ids[]", this.selected[i].inventory_id);
      }
      formData.append("inspection_date", this.inspection_date)
      formData.append("inspection_remark", this.inspection_remark)
      formData.append("inspection_replacement_location", this.replacement_location)
      formData.append("inspection_rgp_number", this.rgp_number)

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        console.log(file);
        formData.append("files[]", file);
      }

      var status = this.getStatus(this.active_tab)

      this.$http.secured.post("/api/v1/warehouse/return_to_vendor/update_inspection_details", formData)
        .then(response => {
          if (response.data) {
            this.original_table_data = response.data.vendor_returns;
            this.table_data = this.original_table_data.filter(
              x => x.status == status
            ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.inspection_inventory = ''
            this.inspection_remark = ''
            this.inspection_date = ""
            this.inspectionDialog = false
            this.files = []
            this.tab_name = "pending_brand_resolution"
            this.loadData("Pending Brand Resolution")
            this.showAlert('success', "Inspection details saved successfully")
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
      },
      selectdate(){
        this.inspection_date = this.inspection_date_2
        this.dateselect = false
      },
      selectsettlementdate(){
        this.settlement_date = this.inspection_date_2
        this.dateselect = false
      },
      cancelDialog () {
        this.approvaldialog = false;
        this.files = [];
      },

      rejectConfirmation(item) {
        this.brand_approval_data = [item];
        this.inspection_inventory = item.inventory_id;
        (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Reject");
        this.approvaldialog = true;
        this.dialog_title = "Confirmation Rejection";
      },

      approveConfirmation(item) {
        this.brand_approval_data = [item];
        this.inspection_inventory = item.inventory_id;
        (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Approve");
        this.approvaldialog = true;
        this.dialog_title = "Confirmation Approval";
      },

      approveRejectInventory(){
        if (this.action_remark == ''){
          this.$toast.error("Please Provide Remark")
          this.files = []
          return
        }
        const formData = new FormData();
        formData.append("inventory_id", this.inspection_inventory)
        formData.append("claim_action", this.dailog_confirm)
        formData.append("action_remark", this.action_remark)

        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }
        this.$http.secured.post("/api/v1/warehouse/return_to_vendor/approve_reject_inventory", formData)
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.vendor_returns;
              this.table_data = this.original_table_data.filter(
                x => x.status == "Pending Brand Approval"
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});

              let action_data = this.table_data.map(function(pending_brand_inventory) { pending_brand_inventory.remind_escalate = {last_escalated_at: pending_brand_inventory.escalated_at ? pending_brand_inventory.escalated_at : null, last_reminded_at: pending_brand_inventory.reminded_at ? pending_brand_inventory.reminded_at : null}
                return pending_brand_inventory;
              })

              this.table_data = action_data

              this.inspection_inventory = ''
              this.approvaldialog = false
              this.brand_approval_data = []
              this.files = []
              this.action_remark = ''
              this.selected = []
              this.showAlert('success', "Successfully Updated Invetory")
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
      },
      openDispatchModel(){
        if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Item First')
          return
        }
        this.dispatchDialog = true
      },
      openCallLogModel(){
        this.number = 0;
        if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Item First')
          return
        }
        this.callLogDialog = true
      },
      dispatchItems(){

        if (this.vendor_code == '' || this.vendor_code == undefined) {
          this.showAlert("error", "Please provide Vendor Code");
          return
        }

        const formData = new FormData();

        for (var i = 0; i < this.selected.length; i++) {
          formData.append("vendor_return_ids[]", this.selected[i].id);
        }

        formData.append("vendor_code", this.vendor_code)

        this.$http.secured.post("/api/v1/warehouse/return_to_vendor/create_dispatch_items", formData)
          .then(response => {
            if (response.data) {
              // this.original_table_data = response.data.vendor_returns;
              // this.table_data = this.original_table_data.filter(
              //   x => x.status == this.active_tab
              // ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              this.dispatchDialog = false
              this.vendor_code = ''
              this.selected = []
              this.orderConfirmDialog = true
              this.order_number = response.data.order_number
              this.getRTVOperationalData("Pending Settlement")
              this.tab_name = "pending_settlement"
              this.loadData("Pending Settlement")
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
          });
      },

      getDesposition(){
        this.$http.secured.get("/api/v1/warehouse/return_to_vendor/get_dispositions")
          .then(response => {
            if (response.data) {
              this.menu_items = response.data.dispositions
              if (this.active_tab == "Pending Call Log"){
                this.menu_items = response.data.dispositions.filter((x) => x.original_code != "Brand Call-Log")
              }
              this.policies = response.data.policies
            } else {
              this.showAlert("error", "No Disposition Found");
            }
          })
      },

      assignvalue(event, item){
        if (event.target.checked){
          this.selected.push(item)
        }else{
          var record = this.selected.find (x => x.id == item.id )
          var ind = this.selected.indexOf(record)
          this.selected.splice(ind, 1)
        }
      },

      closepolicypop(){
        if (this.liquidation_policy == '' || this.credit_note_amount == ''){
          this.$toast.error('Please provide Policy and Credit Note Amount ')
          return
        }
        this.policyModel = false
        this.dispositionDialog = true
      },

      get_vendor_master(){
        this.$http.secured.get('/api/v1/warehouse/return_to_vendor/get_vendor_master')
        .then(response => {
          this.vendor_master = response.data.vendor_masters
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      },

      updateDetails(){
        this.number = 0;
        if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Item First')
          return
        }

        this.sr_number = ''
        this.invoice_number = ''
        this.editModel = true
      },

      editDetails(){
        this.number++;
        if (!this.$refs.invoiceForm.validate()) {
          this.showAlert("error", "Please ProvideInvoice Number with 15 digits only Alpha Numeric");
          return
        }

        const formData = new FormData();

        for (var i = 0; i < this.selected.length; i++) {
          formData.append("vendor_return_ids[]", this.selected[i].id);
        }

        formData.append("invoice_number", this.invoice_number)

        this.$http.secured.post("/api/v1/warehouse/return_to_vendor/edit_information", formData)
          .then(response => {
            if (response.data) {
              this.editModel = false
              this.selected = []
              this.invoice_number = ''
              this.showAlert("success", "Record Updated Successfully");
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
          });


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
      formData.append('status', status)
      formData.append('page', 1)
      formData.append('per_page', params['size'])

      if (this.search.length != 0){
        this.$http.secured.post('/api/v1/warehouse/return_to_vendor/search_item', formData)
        .then(response => {
          if (response.data.vendor_returns){
            this.table_data = response.data.vendor_returns
            this.totalPages =  response.data.meta.total_pages
            this.table_data = this.table_data.map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
          }else{
            this.showAlert("error","No Records Found for given value");
          }
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      }else {
        this.field_type = ''
        this.getRTVOperationalData(this.active_tab)
      }

    },

    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
          if (index[0]=='both_ageing') {
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
  
  filters: {
    truncate: function(text, length, suffix) {
      if (text?text.length:0 > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>