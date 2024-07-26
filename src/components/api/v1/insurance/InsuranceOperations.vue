<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dspRepairDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-data-table
                :dense="true"
                :headers="submission_headers"
                :items="selected"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="dispositionRemarks" solo name="input-7-4" label="Add Remarks*"></v-textarea>
          </v-card-text>
          <v-col cols="12" sm="12">
            <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENT"></v-file-input>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="dspRepairDialog = false">Cancel</v-btn>
            <v-btn small color="primary" @click="setDisposition" :disabled="number > 0">{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="viewAttachmentDialog" persistent max-width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="view-attachment-title">Attachments</span>
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
                        <tr>
                          <td>{{selected_inv.tag_number}}</td>
                          <td>{{selected_inv.item_description}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
                <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <template>
                    <v-expansion-panels>
                      <v-expansion-panel v-for="(item,i) in view_attachment_title" :key="i">
                        <v-expansion-panel-header>{{item}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-card class="mx-auto mr-0 ml-0 pa-5 mb-5" max-width="344" outlined>
                            <p v-if="item == 'Pending Claim Registration'" color="#828282"> {{selected_inv.claim_submission_remarks}} </p>
                            <p v-if="item == 'Pending Surveyor Inspection' || item == 'Pending Replacement'" color="#828282"> {{selected_inv.claim_inspection_remarks}} </p>
                            <p v-if="item == 'Pending Claim Resolution'" color="#828282"> {{selected_inv.action_remarks}} </p>
                          </v-card>

                          <div v-if="item == 'Pending Claim Registration' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_submission_attachments" :key="i">
                              <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}}</a>
                            </span >
                          </div>
                          <div v-if="item == 'Pending Surveyor Inspection' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_inspection_attachments" :key="i">
                              <a class="blue--text mr-2" small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}}</a>
                            </span >
                          </div>
                          <div v-if="item == 'Pending Claim Resolution' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_resolution_attachments" :key="i">
                              <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}}</a>
                            </span >
                          </div>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </template>
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
                  color="#828282"
                  @click="viewAttachmentDialog = false"
                >CLOSE</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="claimRegistrationModel" persistent max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Please Enter Call Log Id</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-text-field v-model='call_log_number' label="Endter Call Log" ></v-text-field>
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
                  @click="closeclaimRegistration()"
                >CLOSE</v-btn>
                <v-btn
                  class="mr-2"
                  small
                  text
                  color="blue"
                  @click="saveCalllog()" :disabled="number > 0 || !call_log_number"
                >CONFIRM</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="policyModel" persistent max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Please Select Policy</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-radio-group v-model="liquidation_policy">
                <v-radio
                  v-for="policy in policies"
                  :key="policy.id"
                  :label="policy.original_code"
                  :value="policy.id"
                ></v-radio>
              </v-radio-group>
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
                  v-on:click.once="closepolicypop" :disabled="!liquidation_policy"
                >CONFIRM</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="orderConfirmDialog" persistent max-width="500px">
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
      <v-dialog v-model="dispatchDialog" persistent max-width="750px">
        <v-card class="v-card-100">
          <v-form ref="dispatchForm">
            <v-card-title>
              <span class="headline">Create RTI Dispatch Order</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-flex>
                      <v-autocomplete v-model="vendor_code" :items="vendor_master" item-text="vendor_code_name" item-value="vendor_code" placeholder="Search/Enter Vendor Code*" :rules="inputRules" prepend-icon="mdi-magnify"></v-autocomplete>
                      <!-- <v-text-field solo v-model="vendor_code" label="Vendor Code*"></v-text-field> -->
                    </v-flex>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="normal" @click="dispatchDialog = false">Cancel</v-btn>
              <v-btn small color="primary" @click="dispatchItems" :disabled="number > 0">Create</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="insuranceSubmissionDialog" persistent width="1000px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">{{insurance_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container v-if="actionValid">
              <v-data-table
                :dense="true"
                :headers="submission_headers"
                :items="tempSelected"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </v-container>
            <v-container v-else>
              <v-data-table
                :dense="true"
                :headers="submission_headers"
                :items="selected"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </v-container>

          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6" v-if="active_tab != 'Pending Claim Resolution'">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="claimSubmissionDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:item.both_ageing="{ item }">
                    <span>{{item.both_ageing.ageing_dispatch}} ({{item.both_ageing.ageing_inward}})</span>
                  </template>  
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="claimSubmissionDate"
                      :label=" active_tab == 'Pending Claim Registration' ? 'Claim Submission Date*' : 'Claim Inspection Date*' "
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="claimSubmissionDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(claimSubmissionDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-if="active_tab == 'Pending Claim Resolution' && dailog_confirm == 'Approve'">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="claimSubmissionDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="claimSubmissionDate"
                      label="Approval Date*"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="claimSubmissionDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(claimSubmissionDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col v-if="active_tab != 'Pending Claim Resolution'" cols="12" sm="6" md="6">
                <v-text-field v-if= "active_tab != 'Pending Surveyor Inspection'"
                  label="Claim Amount*"
                  outlined
                  v-model = "ins_claim_amount"
                  type="number"
                  min=1
                  @keypress="onlyNumber"
                ></v-text-field>
              </v-col>
              <v-col v-if="active_tab == 'Pending Claim Resolution' && dailog_confirm == 'Approve'" cols="12" sm="6" md="6">
                <v-text-field
                  label="Enter Approved Amount*"
                  outlined
                  v-model = "ins_claim_amount"
                  type="number"
                  min=1
                  @keypress="onlyNumber"

                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  solo
                  name="remark"
                  :label="(active_tab == 'Pending Claim Resolution' && action=='Reject')? 'Add Remarks*':'Add Remarks*'"
                  v-model="claim_remark"
                ></v-textarea>
              </v-col>  
              <v-col cols="12" sm="12">
                <v-file-input v-model="files" small-chips multiple label="ATTACH DOCUMENTS"></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeInsuranceModel()">Cancel</v-btn>
            <v-btn v-if="active_tab == 'Pending Claim Registration'" small color="primary" @click="submitInsurance" :disabled="number > 0 || !claimSubmissionDate|| !ins_claim_amount ||!claim_remark">Confirm</v-btn>
            <v-btn v-if="active_tab == 'Pending Surveyor Inspection'" small color="primary" @click="submitInspection" :disabled="number > 0 || !claimSubmissionDate || !claim_remark">Confirm</v-btn>
            <v-btn v-if="active_tab == 'Pending Claim Resolution'" small v-bind:color="dailog_confirm ==='Reject'?'error': 'primary'" @click="approveRejectInsurance" :disabled="number > 0 || !claim_remark">{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- start -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">
      Insurance
    </div> -->
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
          <v-text-field v-if="active_tab != 'Pending Claim Registration' && active_tab != 'Update Claim Registration'  " prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id, Serial Number or Call Log Id" outlined v-on:keyup.enter="searchItem()"></v-text-field>
          <v-text-field v-else prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id, Serial Number" outlined v-on:keyup.enter="searchItem()"></v-text-field>
        </v-col>
        <v-col cols="3" sm="3">
          <v-select :items="alert_item" v-model="alert_value" item-value="value" item-text="name"  label="Select Alert Level" outlined @change="FilterWithAlert()"></v-select>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-layout align-center>
          <v-btn
            @click="openDispatchModel"
            v-if="active_tab == 'Pending Liquidation'"
            class="ma-2 white--text"
            color="grey"
          >RTI Dispatch</v-btn>

          <v-btn
            @click="insuranceDialogOpen()"
            v-if="active_tab == 'Pending Surveyor Inspection'"
            class="ma-2"
            color="primary"
            :disabled="(this.selected.length == 0)"
          >Update Info</v-btn>

          <v-btn
            @click="claimDialogOpen()"
            v-if="active_tab == 'Update Claim Registration'"
            class="ma-2"
            color="primary"
          >Update Call Log</v-btn>
          <v-flex xs12 sm7 d-flex>
            <v-autocomplete
              v-if="active_tab == 'Pending Liquidation' || active_tab == 'Pending Claim Registration'"
              v-model="selectedDisposition"
              :items="disposition"
              item-text="original_code"
              item-value="id"
              @change="changeDispositionItems"
              target="#set-disposition"
              color="primary"
              label="SET DISPOSITION"
              style="min-width: 150px;"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card-title>

    <v-layout column>

    <v-flex md6 style="overflow: auto"> 
  
    <v-data-table
      :dense="true"
      v-model="selected"
      :headers="headers"
      :items="table_data"
      :item-key="item_key"
      :custom-sort="customSort"
      disable-pagination
      :hide-default-footer="true"
      :show-select="active_tab != 'Pending Liquidation' && active_tab != 'Pending Claim Resolution'"
      class="elevation-1"
    >

    <template v-slot:item.data-table-select="{ item, isSelected, select }">
      <v-simple-checkbox
          v-if="active_tab != 'Pending Claim Registration'"
         :value="isSelected"
         @input="select($event)"
       ></v-simple-checkbox>
      <v-simple-checkbox
          v-else
         :value="isSelected"
         @input="select($event)"
       ></v-simple-checkbox>
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

      <template v-slot:item.customcheck="{ item }">
        <input v-if="item.insurance_order_id == null " type="checkbox" :value="item" id="item.id" @change="assignvalue($event, item)" style="width: 18px; height: 18px; margin-top: 2px;">
      </template>

    <template v-slot:item.insurance_submission="{item}">
      <img @click="insuranceDialogOpen(item)"
        src="@/assets/images/job_sheet.png"
        title="Insurance Submission "
      />
    </template>

    <template v-slot:item.both_ageing="{ item }">
      <span>{{item.both_ageing.ageing_dispatch}} ({{item.both_ageing.ageing_inward}})</span>
    </template>

    <template v-slot:item.call_action="{ item }">
      <button v-show= "true" :id="`edit-${item.inventory_id}`" ><img src="@/assets/images/Edit_pencil.png" @click="enableField(item)" /></button>
      <button v-show="false" :id="`save-${item.inventory_id}`"><img src="@/assets/images/save.png" @click="saveCalllog(item)" /></button>
    </template>

    <template v-slot:item.action="{item}">
      <img @click=""
        src="@/assets/images/Tick_mark.png"
        title="Edit"
      />
    </template>

    <template v-slot:item.call_log_id_field = "{item}">
      <input v-model="item.call_log_id" type="text" style= "margin-top: 10px; width: 100px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px; height: 35px;" :id="`field-${item.inventory_id}`" disabled="true">
    </template>
    
    <template v-slot:item.insurance_inspection="{item}">
      <img @click="insuranceDialogOpen(item)"
        src="@/assets/images/job_sheet.png"
        title="Insurance Inspection"
      />
    </template>

    <template v-slot:item.attachment="{item}">
      <div class="my-2">
        <v-btn class="ma-0 pa-0"
          text
          small
          color="primary"
          href
          @click="viewAttachmentDialogOpen(item)"
        >View Attachment</v-btn>
      </div>
      <!-- <a :href="item.attached_file_url" target="#" download> <v-icon>mdi-download</v-icon></a> -->
    </template>

    <template v-slot:item.alert_level="{ item }">
      <v-chip
        v-if="item.alert_level"
        class="ma-2 justify-center"
        small
        label
        :color="getColor(item.alert_level)"
        dark
        style = "min-width:80px;"
      >{{ item.alert_level }}</v-chip>
    </template>

    <template v-slot:item.actions="{item}">
      <v-btn
      @click="approveConfirmationDialogOpen(item)"
      v-if="active_tab == 'Pending Claim Resolution'"
      class="ma-2"
      x-small
      color="primary"
    >Approve</v-btn>
    <v-btn
      @click="rejectConfirmationDialogOpen(item)"
      v-if="active_tab == 'Pending Claim Resolution'"
      class="ma-2"
      x-small
      color="normal"
    >Reject</v-btn>
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

<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        headerText: "Insurance", 
        number:0,       
        files: [],
        menu: false,
        claimSubmissionDate: "",
        insuranceSubmissionDialog: false,
        loading: false,
        attachment: "",
        alert: false,
        active_tab: "Pending Claim Registration",
        files: [],
        selected_item: {},
        tabs: [
          "Pending Claim Registration",
          "Update Claim Registration",
          "Pending Surveyor Inspection",
          "Pending Claim Resolution",
          "Pending Liquidation"
        ],
        tab_name: "pending_claim_registration",
        singleSelect: false,
        selected: [],
        actionValid:false,
        tempSelected: [],
        search: "",
        item_key: "inventory_id",
        disposition: [],
        dialog: false,
        headers: [
          {
            text: "Item Id",
            align: "start",
            value: "tag_number"
          },
          { text: "Article Id", value: "sku_code"},
          { text: "Article Description", value: "item_description"  },
          { text: "Serial Number", value: "sr_number" },
          { text: "Ageing", value: "both_ageing" },
          { text: "Location", value: "warehouse_location"},
          { text: "Alert Level", value: "alert_level" },
          { text: "Action" , value: "insurance_submission"}
        ],
        submission_headers: [],
        table_data: [],
        original_table_data: [],
        ins_claim_amount: '',
        claim_remark: '',
        alert_type: "success",
        alert_message: "success",
        insurance_title: 'Insurance Submission',
        dailog_confirm: "",
        action: "",
        dspRepairDialog: false,
        selectedDisposition: '',
        dispositionRemarks: '',
        dialog_title: '',
        dispatchDialog: false,
        vendor_code: '',
        orderConfirmDialog: false,
        claimRegistrationModel: false,
        call_log_number: '',
        order_number: '',
        policyModel: false,
        liquidation_policy: '',
        inputRules: [ v => !!v || "The field is required"],
        vendor_master: [],
        policies: [],
        view_attachment_title: ['Pending Claim Registration', 'Pending Surveyor Inspection', 'Pending Claim Resolution'],
        selected_inv: "",
        viewAttachmentDialog: false,
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        subMissionDateItem:'',
        field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}],
        field_type: '',
        alert_value: '',
        alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}]
      };
    },
    created() {
      this.getInsuranceData('Pending Claim Registration')
      this.getDisposition()
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

    FilterWithAlert(){
      this.getInsuranceData(this.active_tab);
    },

      loadData(tab) {
        this.selected = [];
        this.active_tab = tab;
        this.table_data = [];
        this.search = '';
        this.page =  1
        this.totalPages =  1
        this.pageSize = 100
        this.getInsuranceData(tab)
        var status = this.getStatus(this.active_tab)
        if (tab == 'Pending Surveyor Inspection' || tab == 'Pending Claim Resolution' || tab == 'Pending Liquidation'){
          this.field_item = [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number2"}, {name: "Call Log Id", value: "call_log_id"}]
        }else{
          this.field_item = [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number2"}]
        }
        if (tab == 'Pending Liquidation') {
          this.table_data = this.original_table_data.filter(x => (x.status == 'Pending Insurance Disposition' || x.status == 'Pending Insurance Dispatch')).map(function(insurance_item){insurance_item.both_ageing = {ageing_dispatch:insurance_item.ageing_dispatch, ageing_inward:insurance_item.ageing}; return insurance_item});
          this.table_data = this.table_data.filter(x => x.disposition_set != true)
        }

        if (tab == "Pending Claim Registration") {
          this.insurance_title = "Insurance Submission"
          this.headers = [
          {
            text: "Item Id",
            align: "start",
            value: "tag_number"
          },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "sr_number" },
          { text: "Ageing", value: "both_ageing" },
          { text: "Location", value: "warehouse_location" },
          { text: "Alert Level", value: "alert_level" },
          { text: "Action", value: "insurance_submission"},
        ];
        }if(tab == "Update Claim Registration"){
    
          this.headers = [
          {
            text: "Item Id",
            align: "start",
            value: "tag_number"
          },
          { text: "Article Id", value: "sku_code"},
          { text: "Article Description", value: "item_description"},
          { text: "Serial Number", value: "sr_number"},
          { text: "Claim Amount(INR)", value: "claim_amount" },
          { text: "Ageing", value: "both_ageing" },
          { text: "Call Log Id", value: "call_log_id_field" },
          { text: "Alert Level", value: "alert_level" },
          { text: "" , value:"call_action"}
        ];
        }
        if(tab == "Pending Surveyor Inspection"){
          this.headers = [
          {
            text: "Call Log Id",
            align: "start",
            sortable: false,
            value: "call_log_id"
          },
          { text: "Article Id", value: "sku_code"},
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "sr_number"},
          { text: "Claim Amount(INR)", value: "claim_amount" },
          { text: "Ageing", value: "both_ageing" },
          { text: "Alert Level", value: "alert_level" },
          { text: "", value: "insurance_inspection" }
        ];
        }if(tab == "Pending Claim Resolution"){
          this.headers = [
          {
            text: "Call Log Id",
            align: "start",
            sortable: false,
            value: "call_log_id"
          },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "sr_number"},
          { text: "Ageing", value: "both_ageing" },
          { text: "Claim Amount(INR)", value: "claim_amount" },
          { text: "Alert Level", value: "alert_level" },
          { text: "" , value:"actions"}
        ];
        }if(tab == "Pending Liquidation"){
          this.get_vendor_master()
          this.headers = [
          {text: "", value: "customcheck", width: "3%"},
          {
            text: "Call Log Id",
            align: "start",
            sortable: false,
            value: "call_log_id"
          },
          { text: "Article Id", value: "sku_code"},
          { text: "Article Description", value: "item_description"},
          { text: "Serial Number", value: "sr_number" },
          { text: "Ageing", value: "both_ageing" },
          { text: "Approved Amount(INR)", value: "approved_amount" },
          { text: "Attachment", value: "attachment" },
          { text: "Alert Level", value: "alert_level" }
        ];
        }
      },
      getColor(calories) {
        if (calories == "High") return "red";
        else if (calories == "Medium") return "orange";
        else if (calories == "Low") return "green";
      },

      onlyNumber ($event) {
         //console.log($event.keyCode); //keyCodes value
         let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
         if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
            $event.preventDefault();
         }
      },
      insuranceDialogOpen(item) {
        this.number = 0;
        this.actionValid = false;
        if (item && !this.selected.includes(item)){
          this.tempSelected=[];
          this.selected=[];
          this.tempSelected.push(item);
          this.subMissionDateItem = item.claim_submission_date
          this.actionValid=true;
        }
        this.files = [];
        this.claimSubmissionDate = ''
        this.claim_remark = ''
        this.ins_claim_amount = ''
        this.submission_headers = [
          {
            text: "Item Id",
            align: "start",
            value: 'tag_number'
          },
          { text: "Article Description", value: "item_description" }
        ]
        if (this.active_tab == 'Pending Surveyor Inspection'){
          this.submission_headers.push({text: "Claim Amount(INR)", value: 'claim_amount'})
          this.insurance_title = "Insurance Inspection"
        }
        this.insuranceSubmissionDialog = true;
        this.files = [];
      },
      claimDialogOpen(){
        this.number=0;
        if (this.selected.length <= 0){
          this.$toast.error('Please Select Inventories')
          return
        }
        this.claimRegistrationModel = true
      },

      closeclaimRegistration(){
        this.selected = []
        this.claimRegistrationModel = false
      },
      approveConfirmationDialogOpen(item){
        this.number = 0;
        this.insuranceSubmissionDialog = true;
        if (item){
          this.selected.push(item)
        }
        this.action = "Approve"
        this.submission_headers = [
          {
            text: "Item Id",
            align: "start",
            value: 'tag_number'
          },
          { text: "Article Description", value: "item_description" },
          {text: "Claim Amount(INR)", value: 'claim_amount'}
        ]
        this.dailog_confirm = "Approve"
        this.insurance_title = "Approval Confirmation"
        this.files = [];  
      },
      rejectConfirmationDialogOpen(item){
        this.insuranceSubmissionDialog = true;
        if (item){
          this.selected.push(item)
        }
        this.action = "Reject"
        this.submission_headers = [
          {
            text: "Item Id",
            align: "start",
            value: 'tag_number'
          },
          { text: "Article Description", value: "item_description" },
          {text: "Claim Amount(INR)", value: 'claim_amount'}
        ]

        this.dailog_confirm = "Reject"
        this.insurance_title = "Rejection Confirmation"
        this.files = [];  
      },

      handlePageChange(value) {
        this.page = value;
        this.getInsuranceData(this.active_tab);
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.getInsuranceData(this.active_tab);
      },

      getInsuranceData(tab) {
        this.loading = true;
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        if (tab == 'Pending Liquidation'){
          var status = ['Pending Insurance Dispatch', 'Pending Insurance Disposition']
        }else{
          var status = this.getStatus(tab)
        }

        this.loading = true;
        this.$http.secured
          .get("/api/v1/warehouse/insurances", {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value}})
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.insurances;
              if (tab == 'Pending Liquidation') {
                this.table_data = this.original_table_data.filter(x => (x.status == 'Pending Insurance Disposition' || x.status == 'Pending Insurance Dispatch')).map(function(insurance_item){insurance_item.both_ageing = {ageing_dispatch:insurance_item.ageing_dispatch, ageing_inward:insurance_item.ageing}; return insurance_item});
              } else{
                this.table_data = this.original_table_data.filter(x => x.status == status).map(function(insurance_item){insurance_item.both_ageing = {ageing_dispatch:insurance_item.ageing_dispatch, ageing_inward:insurance_item.ageing}; return insurance_item});
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
      get_vendor_master(){
        this.$http.secured.get('/api/v1/warehouse/insurances/get_vendor_insurance')
        .then(response => {
          this.vendor_master = response.data.vendor_masters
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      },
      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      closeInsuranceModel(){
        this.insuranceSubmissionDialog=false;
        this.selected = []
      },

      submitInsurance(){
        this.number++;
        if ((this.claimSubmissionDate == '') && (this.ins_claim_amount == '' )) {
          this.$toast.error('Please Provide Claim Date, Claim Amount')
          this.claimSubmissionDate = ''
          return
        }
       else if (this.claimSubmissionDate == '') {
          this.$toast.error('Please Provide Claim Date')
          this.claimSubmissionDate = ''
          return
        }
      else if (this.ins_claim_amount == '') {
          this.$toast.error('Please Provide Claim Amount')
          return
        }
      else if (this.claim_remark == ''){
        this.$toast.error('Please Provide Remarks')
        this.claim_remark = ''
        return
      }
        
        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }

        formData.append("claim_submission_date", this.claimSubmissionDate);
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("insurance_ids[]", this.selected[i].id);
        }
        for (var i = 0; i < this.tempSelected.length; i++) {
          formData.append("insurance_ids[]", this.tempSelected[i].id);
        }
        formData.append("claim_amount", this.ins_claim_amount);
        formData.append("claim_remark", this.claim_remark);

        this.loading = true;
        this.$http.secured
          .post("/api/v1/warehouse/insurances/submit_for_insurance", formData)
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.insurances;
              this.table_data = this.original_table_data.filter(
                x => x.status == "Pending Insurance Submission"
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              this.showAlert("success", "Item sent for Update Claim Registration");
              this.loading = false;
              this.files = []
              this.claimSubmissionDate = ''
              this.selected = []
              this.tempSelected = []
              this.claim_remark = ""
              this.ins_claim_amount = ""
              this.insuranceSubmissionDialog = false;
              this.tab_name = "update_claim_registration"
              this.loadData("Update Claim Registration")
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
      },
      submitInspection(){
        this.number++;
        if (this.claimSubmissionDate == '' ) {
          this.$toast.error('Please Provide Date')
          this.claimSubmissionDate = ''
          this.claim_remark = ''
          return
        }
        const formattedClaimSubmissionDate = this.subMissionDateItem.split("T")[0];
        
        if(this.claimSubmissionDate < formattedClaimSubmissionDate){
          this.$toast.error('Claim Inspection Date should be greater equal then Submission Date');
          return
        }

        if (this.claim_remark == ""){
          this.$toast.error('Please Provide Remarks');
          return
        }

        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }

        formData.append("claim_inspection_date", this.claimSubmissionDate);

         if(this.selected.length > 0){
                for (var i = 0; i < this.selected.length; i++) {
                formData.append("insurance_ids[]", this.selected[i].id);
                }
         }else{
              for (var i = 0; i < this.tempSelected.length; i++) {
              formData.append("insurance_ids", this.tempSelected[i].id);
             }
         }   
        formData.append("claim_inspection_remarks", this.claim_remark);

        this.loading = true;
        this.$http.secured
          .post("/api/v1/warehouse/insurances/submit_inspection", formData)
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.insurances;
              this.table_data = this.original_table_data.filter(
                x => x.status == "Pending Insurance Inspection"
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              this.showAlert("success", "Inspection Submitted");
              this.loading = false;
              this.files = []
              this.claimSubmissionDate = ''
              this.selected = []
              this.claim_remark = ""
              this.insuranceSubmissionDialog = false;
              this.tab_name = "pending_claim_resolution"
              this.loadData("Pending Claim Resolution")
            } else {
              this.loading = false;
              this.number = 0;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.loading = false;
            this.number = 0;
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      },
      saveCalllog (item){
        this.number++;
        var call_log_id = ''
        const formData = new FormData();
        if (item){
          item.call_log_id = item.call_log_id.trim();
          if ((item.call_log_id == null || item.call_log_id =='')){
            this.$toast.error("Please Provide Call Log ID");
            return
          }
          formData.append("insurance_ids[]", item.id)
          call_log_id = item.call_log_id
        }else {
          this.call_log_number.trim();
          if (this.call_log_number == null || this.call_log_number ==''){
            this.$toast.error("Please Provide Call Log ID");
            return
          }
          for (var i = 0; i < this.selected.length; i++) {
            formData.append("insurance_ids[]", this.selected[i].id)
          }
          call_log_id = this.call_log_number
        }

        formData.append("call_log_id", call_log_id);
        this.$http.secured.put("/api/v1/warehouse/insurances/update_call_log", formData)
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.insurances;
              this.table_data = this.original_table_data.filter(
                x => x.status == this.getStatus(this.active_tab)
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              this.showAlert('success', "Item sent for Pending Surveyor inspection")
              this.tab_name = "pending_surveyor_inspection"
              this.selected = []
              this.call_log_number = ''
              this.claimRegistrationModel = false
              this.loadData("Pending Surveyor Inspection")
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
      },

      approveRejectInsurance(){
        this.number++;
        if ( this.action == 'Approve' && (this.ins_claim_amount == '' && this.claimSubmissionDate == '' ) ) {
          this.$toast.error('Please select date and enter approval amount')
          this.claimSubmissionDate = ''
          this.claim_remark = ''
          return
        }

        if (this.action == 'Approve' && (this.claimSubmissionDate == '')) {
          this.$toast.error('Please enter date ')
          this.claimSubmissionDate = ''
          return
        }

        if(this.action == 'Approve' && new Date(this.claimSubmissionDate).getTime() < new Date(this.selected[0].claim_inspection_date).getTime()){
          this.$toast.error('Claim Approval Date should be greater equal then Inspection Date');
          return
        }

        if (this.action == 'Approve' && (this.ins_claim_amount == '')) {
          
          this.$toast.error('Please enter approval amount')
          return
        }
        if (this.claim_remark == '') {
        
          this.$toast.error('Please enter Remarks')
          return
        }

        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }

        formData.append("approved_amount", this.ins_claim_amount);
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("insurance_ids[]", this.selected[i].id);
        }
        formData.append("approval_date", this.claimSubmissionDate)
        formData.append("action_remarks", this.claim_remark);
        formData.append("action_type", this.action);

        this.loading = true;
        this.$http.secured
          .post("/api/v1/warehouse/insurances/approve_reject_insurance", formData)
          .then(response => {
            if (response.data) {
              this.original_table_data = response.data.insurances;
              this.table_data = this.original_table_data.filter(
                x => x.status == "Pending Insurance Approval"
              ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              if( this.dailog_confirm == "Approve"){
              this.showAlert("success", "Approved Successfully");
              }
              if( this.dailog_confirm == "Reject"){
              this.showAlert("success", "Rejected Successfully");
              }              
              this.loading = false;
              this.files = []
              this.ins_claim_amount = ''
              this.selected = []
              this.claim_remark = ""
              this.action = ""
              this.tab_name = "pending_liquidation"
              this.loadData("Pending Liquidation")
              this.insuranceSubmissionDialog = false;

            } else {
              this.loading = false;
             
              this.showAlert("error", "No Data Found");
            }
          })

      },

      changeDispositionItems(selected_item) {
        this.number = 0;
        this.selectedDisposition = selected_item;
        var selected_disposition = this.disposition.filter(x => x.id == (selected_item) )
        if (selected_disposition[0].original_code == 'Liquidation'){
          this.policyModel = true
        }
        if (this.selected.length) {
          this.dispositionRemarks = '';
            (this.dailog_confirm = "Confirm"),
            (this.dialog_title =
              "Set Disposition to " + selected_disposition[0].original_code);
          this.submission_headers = [
            {
              text: "Item Id",
              align: "start",
              value: 'tag_number'
            },
            { text: "Article Description", value: "item_description" },
            {text: "Approved Amount(INR)", value: 'approved_amount'}
          ]
          if (this.policyModel == false){
            this.dspRepairDialog = true;
          }
          this.dsp_repair_data = this.selected;
        } else {
          this.showAlert("warning", "Please select the inventories first");
        }
      },

      setDisposition() {
        this.number++;
        if(this.dispositionRemarks == '' ){

           this.$toast.error('Please enter remarks')
          this.dispositionRemarks = ''
          return
        }

        this.loading = true;

        const formData = new FormData();
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("insurance_ids[]", this.selected[i].id);
        }

        formData.append("desposition_remarks", this.dispositionRemarks);
        formData.append("disposition", this.selectedDisposition);
        if (this.liquidation_policy != ''){
          formData.append('policy', this.liquidation_policy)
        }

        this.$http.secured
          .put("/api/v1/warehouse/insurances/set_disposition", formData)
          .then(response => {
            if (response.data.insurances) {
              this.original_table_data = response.data.insurances;
              if (this.active_tab == "Pending Claim Registration"){
                this.table_data = this.original_table_data.filter(x => (x.status == 'Pending Insurance Submission')
                ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              }else{
                this.table_data = this.original_table_data.filter(x => (x.status == 'Pending Insurance Disposition' || x.status == 'Pending Insurance Dispatch')
                ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
              }
              if(this.active_tab == 'Pending Liquidation'){
                let action_data = this.table_data.filter(x => x.disposition_set != true);
                this.table_data = action_data;
              }
              this.selectedDisposition = '';
              this.selected = [];
              this.dspRepairDialog = false;
              this.dispositionRemarks = ''
              this.dialog_title = ""
              this.liquidation_policy = ''
              this.loading = false;
              this.loadData(this.active_tab)
              this.showAlert("success", 'Disposition Set Sucessfully');
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

      dispatchItems(){
        this.number++;
        if(this.vendor_code=='' || this.vendor_code == undefined)
        {
          this.showAlert("error", "Please enter vendor code");
          return;
        }
        const formData = new FormData();

        for (var i = 0; i < this.selected.length; i++) {
          formData.append("insurance_ids[]", this.selected[i].id);
        }

        formData.append("vendor_code", this.vendor_code)

        this.$http.secured.post("/api/v1/warehouse/insurances/create_dispatch_items", formData)
          .then(response => {
            if (response.data) {
              this.dispatchDialog = false
              this.vendor_code = ''
              this.selected = []
              this.orderConfirmDialog = true
              this.order_number = response.data.order_number
              this.getInsuranceData(this.active_tab)
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
      },


      openDispatchModel(){
        this.number=0;
        if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Inventories First')
          return
        }
        this.dispatchDialog = true
      },

      getStatus(tab){
        var status = ''
        if (tab == 'Pending Claim Registration'){
          status = 'Pending Insurance Submission'
        }else if (tab == 'Update Claim Registration'){
          status = 'Pending Insurance Call Log'
        }else if (tab == 'Pending Surveyor Inspection'){
          status = 'Pending Insurance Inspection'
        }else if (tab == 'Pending Claim Resolution'){
          status = 'Pending Insurance Approval'
        }else if (tab == 'Pending Liquidation'){
          status = 'Pending Insurance Disposition'
        }
        return status
      },
      enableField (item){

        $("#edit-"+item.inventory_id).hide();
        $("#save-"+item.inventory_id).show();
        $("#field-"+item.inventory_id).prop("disabled", false);
        $("#field-"+item.inventory_id).focus();
      },

      getDisposition(){
        this.$http.secured.get("/api/v1/warehouse/insurances/get_dispositions")
          .then(response => {
            if (response.data) {
              this.disposition = response.data.dispositions
              this.policies = response.data.policies
            } else {
              this.showAlert("error", "No Disposition Found");
            }
          })
      },

      viewAttachmentDialogOpen(item) {
        this.selected_inv = item
        this.viewAttachmentDialog = true;
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
      if (this.liquidation_policy == ''){
        this.$toast.error('Please Select Policy')
        return
      }
      this.policyModel = false
      this.dspRepairDialog = true
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
      if (this.active_tab == 'Pending Liquidation'){
        var status = ['Pending Insurance Dispatch', 'Pending Insurance Disposition']
      }else{
        var status = this.getStatus(this.active_tab)
      }

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
        this.$http.secured.post('/api/v1/warehouse/insurances/search_item', formData)
        .then(response => {
          if (response.data.insurances){
            if (this.active_tab == 'Pending Liquidation') {
              this.table_data = response.data.insurances.filter(x => (x.status == 'Pending Insurance Disposition' || x.status == 'Pending Insurance Dispatch')).map(function(insurance_item){insurance_item.both_ageing = {ageing_dispatch:insurance_item.ageing_dispatch, ageing_inward:insurance_item.ageing}; return insurance_item});
            } else{
              this.table_data = response.data.insurances.filter(x => x.status == status).map(function(insurance_item){insurance_item.both_ageing = {ageing_dispatch:insurance_item.ageing_dispatch, ageing_inward:insurance_item.ageing}; return insurance_item});
            }
            this.totalPages =  response.data.meta.total_pages
          }else{
            this.showAlert("error","No Records Found for given value");
          }
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      }else {
        this.field_type = ''
        this.getInsuranceData(this.active_tab)
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
  .inc-title{
    color: #172B4D;
    font-size: 20px;
  }
  .insurance-submission-table{
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>