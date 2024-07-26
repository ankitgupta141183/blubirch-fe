<template>
  <v-card class="overflow-hidden">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <v-row justify="center">
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
                            <td>{{item.tag_number?item.tag_number:'NA'}}</td>
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
              <v-textarea v-model="remarks" solo name="input-7-4" label="Add Remarks*"></v-textarea>
            </v-card-text>
            <v-col cols="12" class="pa-0">
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
                  <v-chip v-if="index < 2" color="light-blue accent-3" dark label small>{{ text }}</v-chip>
                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >+{{ files.length - 2 }} File(s)</span>
                </template>
              </v-file-input>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                small
                color="blue darken-1"
                text
                @click="dspRepairDialog = false"
              >{{dailog_cancel}}</v-btn>
              <v-btn small color="primary" @click="setDisposition" :disabled="number > 0 ">{{dailog_confirm}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Set Disposition Dialog -->
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
                            <p v-if="item == 'Pending Call Log'" color="#828282"> {{selected_inv.call_log_remarks}} </p>
                            <p v-if="item == 'Pending Inspection' || item == 'Pending Replacement'" color="#828282"> {{selected_inv.replacement_remark}} </p>
                            <p v-if="item == 'Pending Resolution'" color="#828282"> {{selected_inv.action_remark}} </p>
                          </v-card>

                          <div v-if="item == 'Pending Call Log' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_call_log_attachments" :key="i">
                              <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}} </a>
                            </span >
                          </div>
                          <div v-if="item == 'Pending Inspection' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_inspection_attachments" :key="i">
                              <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}} </a>
                            </span >
                          </div>
                          <div v-if="item == 'Pending Resolution' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_resolution_attachments" :key="i">
                              <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}} </a>
                            </span >
                          </div>
                          <div v-if="item == 'Pending Replacement' ">
                            <p color="#828282" >Attachment</p>
                            <span v-for="(attach,ind) in selected_inv.pending_replacement_attachments" :key="i">
                              <a class="blue--text mr-2"  small tile color="#F3F3F3"  :href="attach.url" target="#" download> {{attach.name}} </a>
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

    <v-dialog v-model="skulistmodel" persistent fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
      <v-card tile>
        <v-toolbar dark color="primary" >
          <v-toolbar-title>Lookup Article Id</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="skulistmodel = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title>
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="sku_search" label="Search" single-line></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :dense="true"
            :headers="sku_headers"
            :items="sku_records"
            :search="sku_search"
            class="elevation-1"
          >
          </v-data-table>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-dialog v-model="barcodePopup" persistent max-width="750px">
        <v-card class="v-card-100">
          <v-card-text class="pa-0" style=" text-align: center;">
            <h5 class="barc_mod_hed">Item Id : <span> {{tag_number_barcode}} </span></h5>
            <div id= "barcode-value">
              <barcode v-bind:value="tag_number_barcode">

              </barcode>
            </div>
            <img @click="printBarcode()" src="@/assets/images/print-977.svg" />
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
                  @click="barcodePopup = false"
                >CLOSE</v-btn>
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
                  @click="closepolicypop"
                >CLOSE</v-btn>
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
                <v-col cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-simple-table class="gray-border">
                    <template>
                      <thead>
                        <tr>
                          <th class="text-left">Article Id</th>
                          <th class="text-left">Article Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selected">
                          <td>{{item.tag_number?item.sku_code:'NA'}}</td>
                          <td>{{item.item_description}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>

                <v-col v-if="active_tab == 'Pending Replacement'" cols="12" sm="12" md="12" class="pa-0">
                  <v-row>
                    <v-col cols="6" sm="6" md="6">
                      <v-switch
                        v-model="replace_item"
                        label="Replace With Diffrent Item"
                      ></v-switch>
                    </v-col>
                  </v-row>

                  <v-row v-if="replace_item">
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field
                          hide-details
                          label="Article Id*"
                          v-model="article_id"
                          color="primary"
                          outlined
                        ></v-text-field>
                      </v-flex>
                    </v-col>
                    <v-col cols= "6" sm="6" md="6">
                      <v-btn
                        color="#1867C0"
                        @click="searchSku"
                      >Search</v-btn>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col v-if="active_tab == 'Pending Replacement'" cols="12" sm="6" md="12" class="pa-0 pb-3">
                  <v-simple-table class="gray-border">
                    <template>
                      <thead>
                        <tr>
                          <th class="text-left">New Article Id</th>
                          <th class="text-left">New Article Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{article_id}}</td>
                          <td>{{article_description}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="pa-0">
                  <v-row
                    v-if="active_tab == 'Pending Call Log' || active_tab == 'Pending Inspection'"
                  >
                    <v-col v-if="active_tab == 'Pending Call Log'" cols="6" sm="6" md="6">
                      <v-text-field hide-details label="Call Log Id*" v-model="call_log" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
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
                            outlined
                            hide-details
                            v-model="claimSubmissionDate"
                            :label="email_label"
                            prepend-inner-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :max="today.toISOString().substring(0,10)"
                          v-model="claimSubmissionDate"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(claimSubmissionDate)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col v-if="active_tab == 'Pending Inspection'" cols="6" sm="6" md="6">
                      <v-flex>
                        <v-select
                          :items="menu_items"
                          v-model="replacement_location"
                          label="Replacement Location*"
                          outlined
                        ></v-select>
                      </v-flex>
                    </v-col>
                    <v-col
                      cols="6"
                      sm="6"
                      md="6"
                      v-if=" active_tab == 'Pending Inspection' || active_tab == 'Pending Replacement'"
                    >
                      <v-text-field v-if="replacement_location == 'External Location'" hide-details v-model="rgp_number" label="RGP Number*" outlined></v-text-field>
                    </v-col>
                    <v-col v-if="active_tab == 'Pending Replacement'" cols="6" sm="6" md="6">
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
                            outlined
                            hide-details
                            v-model="claimSubmissionDate"
                            label="Replacement Date*"
                            prepend-inner-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :max="today.toISOString().substring(0,10)"
                          v-model="claimSubmissionDate"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(claimSubmissionDate)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" class="pa-0 pb-3">
                  <v-row v-if="active_tab == 'Pending Replacement'">
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field
                          hide-details
                          label="Enter Item Id*"
                          v-model="item_id"
                          color="primary"
                          outlined @keydown.space.prevent
                          @blur="removeEventSpaces()"
                        ></v-text-field>
                      </v-flex>
                    </v-col>
                    <v-col class="pt-6" cols="6" sm="6" md="6">
                      <v-flex>
                        <v-btn link style="text-transform: none;" class="mr-2 font-weight-bold" text color="#1867C0" @click="generateQR()">Create Item Id</v-btn>
                      </v-flex>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" class="pa-0 pb-3">
                  <v-row v-if="active_tab == 'Pending Replacement'">
                    <v-col cols="6" sm="6" md="6">
                      <v-flex>
                        <v-text-field
                          hide-details
                          label="Serial Number 1*"
                          v-model="sr_number1"
                          outlined
                        ></v-text-field>
                      </v-flex>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-text-field
                        hide-details
                        label="Serial Number 2"
                        v-model="sr_number2"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" class="pa-0" v-if="active_tab == 'Pending Resolution'">
                  <v-textarea name="remark" v-model="remarks" label="Add Remarks*" outlined></v-textarea>
                </v-col>
                <v-col cols="12" class="pa-0" v-else="active_tab != 'Pending Resolution'">
                  <v-textarea name="remark" v-model="remarks" label="Add Remarks" outlined></v-textarea>
                </v-col>
                <v-col cols="12" class="pa-0">
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
                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >+{{ files.length - 2 }} File(s)</span>
                    </template>
                  </v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn class="mr-2" small color="normal" @click="closeRepaitPopup">CANCEL</v-btn>
                <v-btn
                  v-if="active_tab != 'Pending Resolution'"
                  small
                  color="primary" :disabled = "this.number > 0"
                  @click="confirmDialog()"
                >SUBMIT</v-btn>
                <v-btn
                  class="mr-2"
                  v-if="active_tab == 'Pending Resolution'"
                  color="grey"
                  small
                  @click="approveRejectReplacement('Reject')"
                >Reject</v-btn>
                <v-btn
                  v-if="active_tab == 'Pending Resolution'"
                  small
                  color="primary"
                  @click="approveRejectReplacement('Approve')"
                >Approve</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Repair Detail Dialog -->
    <!-- View Summary Dialog -->
    <v-row justify="center">
      <v-dialog v-model="viewSummaryDialog" persistent max-width="900px">
        <v-card class="v-card-100">
          <v-card-text class="pa-0">
            <GradeSummary
              :title="selected_inv.item_description"
              :summarydata="selected_inv.grade_summary"
              :packagingImages = "packagingImages" 
              :physicalImages="physicalImages" 
              @summaryClose="viewSummaryDialogClose()"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- View Summary Dialog -->
    <!-- Repair Screen -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">Replacement</div> -->
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <!-- Header -->
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
    <!-- Header -->
    <v-card-title>
      <v-row>
        <v-col cols="3" sm="3">
          <v-select :items="field_item" v-model="field_type" item-value="value" item-text="name" label="Select Field" outlined></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field v-if="active_tab != 'Pending Call Log'" prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id, Serial Number or Call Log" outlined v-on:keyup.enter="searchItem()"></v-text-field>
          <v-text-field v-else prepend-inner-icon="mdi-magnify" v-model="search" label="Search Item id, Serial Number" outlined v-on:keyup.enter="searchItem()"></v-text-field>
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
            :items="disposition"
            item-text="original_code"
            item-value="id"
            @change="changeDispositionItems"
            color="primary"
            label="SET DISPOSITION"
          ></v-autocomplete>
        </v-flex>
        <v-btn v-if="active_tab == 'Pending Call Log'" color="primary" @click="replacementDetailDialogOpen()">Update Call Log</v-btn>
        <v-btn v-if="active_tab == 'Pending Inspection'" color="primary" @click="replacementDetailDialogOpen()">Update Info</v-btn>
        <v-btn v-if="active_tab == 'Pending Resolution'" color="primary" @click="replacementDetailDialogOpen()">Update Resolution</v-btn>

      </v-actions>
    </v-card-title>

    <!-- Data Table -->
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
          :dense="true"
          :headers="headers"
          v-model="selected"
          :items="table_data"
          :item-key="item_key"
          show-select
          class="elevation-1"
          :custom-sort="customSort"
          :loading="loading"
          disable-pagination
          :hide-default-footer="true"
          loading-text="Loading Data... Please wait"
        >
        <template v-slot:item.data-table-select="{ item, isSelected, select }">
          <v-simple-checkbox
             :value="isSelected"
             @input="select($event)"
           ></v-simple-checkbox>
          <!-- <input v-if="item.sr_number == '' " type="checkbox" :value="item.id" id="item.id" @change="assignvalue($event, item)" class="custom-check" style="width: 18px; height: 18px; margin-top: 2px;"> -->
        </template>
          <template v-slot:item.pending_initiation_action="{ item }">
            <img @click="replacementDetailDialogOpen(item)" src="@/assets/images/job_sheet.png" />
          </template>

          <template v-slot:item.both_ageing="{ item }">
            <span>{{item.both_ageing.ageing_dispatch}} ({{item.both_ageing.ageing_inward}})</span>
          </template>

          <template v-slot:item.grade_summary="{ item }">
            <div class="my-2">
              <v-btn text small color="primary" @click="viewSummaryDialogOpen(item)">View Summary</v-btn>
            </div>
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

          <template v-slot:item.attachment="{ item }">
            <div class="my-2">
              <v-btn
                text
                small
                color="primary"
                href
                @click="viewAttachmentDialogOpen(item)"
              >View Attachment</v-btn>
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
  import $ from 'jquery'
  import GradeSummary from ".././gradesummary/gradeSummary";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  import VueBarcode from 'vue-barcode'
export default {
  data() {
    return {
      today: new Date(),
      headerText: "Replacement",
      item_key: "id",
      files: [],
      alert: false,
      number : 0,
      alert_type: "success",
      alert_message: "success",
      selectedDisposition: "",
      active_tab: "Pending Replacement",
      dspRepairDialog: false,
      email_label: "Call Log Date*",
      tab_name: "pending_replacement",
      tabs: [
        "Pending Replacement",
        "Pending Redeployment",
      ],
      singleSelect: false,
      selected: [],
      search: "",
      loading: false,
      headers: [
        {
          text: "Item Id",
          align: "start",
          sortable: false,
          value: "tag_number",
        },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Serial Number", value: "sr_number" },
        { text: "Grade Summary", value: "grade_summary" },
        { text: "Ageing", value: "both_ageing", width: "10%" },
        { text: "Alert Level", value: "alert_level" },
        { text: "Action", value: "pending_initiation_action", sortable: false },
      ],
      table_data: [],
      selected_inv: "",
      dialog_title: "Replacement Call Log",
      repairDetailDialog: false,
      viewSummaryDialog: false,
      viewAttachmentDialog: false,
      menu_items: ["In House", "External Location"],
      view_attachment_title: [
        "Pending Call Log",
        "Pending Inspection",
        "Pending Resolution",
        "Pending Replacement",
      ],
      claimSubmissionDate: "",
      remarks: "",
      dailog_cancel: "",
      menu: false,
      dailog_confirm: "",
      call_log: "",
      replacement_location: "",
      rgp_number: "",
      sr_number1: "",
      sr_number2: "",
      item_id: "",
      disposition: [],
      barcodePopup: false,
      tag_number_barcode: '',
      policyModel: false,
      liquidation_policy: '',
      policies: [],
      replace_item: false,
      article_description: '',
      article_id: '',
      skulistmodel: false,
      sku_headers: [{text: "Article Id.", align: "start", value: "code"}, {text: "Article Description", value: "sku_description"}],
      sku_records: [],
      sku_search: '',
      divContents: '',
      physicalImages: [],
      packagingImages: [],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number_2"}],
      field_type: '',
      alert_value: '',
      alert_item: [{name: 'All', value: ''}, {name: 'High', value: 'high'}, {name: 'Medium', value: 'medium'}, {name: 'Low', value: 'low'}],
      searched: false
    };
  },
  created() {
    this.getReplacements("Pending Replacement");
  },
  components: {
    GradeSummary,
    HeaderComponent,
    'barcode': VueBarcode
  },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    FilterWithAlert(){
      this.getReplacements(this.active_tab);
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
      this.getReplacements(this.active_tab);
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getReplacements(this.active_tab);
    },

    getReplacements(tab) {
      this.loading = true;
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      var status = this.getStatus(tab)
      this.$http.secured
        .get("/api/v1/warehouse/replacements", {params: {page: params['page'], per_page: params['size'], status: status, criticality: this.alert_value}})
        .then((response) => {
          if (response.data) {
            if (tab != 'Pending Redeployment'){
              this.original_table_data = response.data.replacements.map(x => ({ ...x, isSelectable: x.sr_number == '' }));
            }else{
              this.original_table_data = response.data.replacements
            }
            if (tab == 'Pending Redeployment'){
              this.table_data = this.original_table_data
              .filter((x) => x.status == status[0] || x.status == status[1])
              .map(function (replacement) {
                replacement.both_ageing = {
                  ageing_dispatch: replacement.ageing_dispatch,
                  ageing_inward: replacement.ageing,
                };
                return replacement;
              });
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
            }else{
              this.table_data = this.original_table_data
              .filter((x) => x.status == status)
              .map(function (replacement) {
                replacement.both_ageing = {
                  ageing_dispatch: replacement.ageing_dispatch,
                  ageing_inward: replacement.ageing,
                };
                return replacement;
              });
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
            }
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },
    loadData(tab) {
      this.active_tab = tab;
      this.page =  1
      this.totalPages =  1
      this.pageSize = 100
      this.getReplacements(tab)
      var status = this.getStatus(this.active_tab);
        if (tab != 'Pending Call Log'){
          this.field_item = [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number2"}, {name: "Call Log Id", value: "call_log_id"}]
        }else{
          this.field_item = [{name: 'Tag Number', value: "tag_number"}, {name: 'Serial Number', value: "serial_number"}, {name: 'Serial Number 2', value: "serial_number2"}]
        }
      if (tab == "Pending Inspection") {
        this.table_data = this.original_table_data
          .filter((x) => x.status == status)
          .map(function (replacement) {
            replacement.both_ageing = {
              ageing_dispatch: replacement.ageing_dispatch,
              ageing_inward: replacement.ageing,
            };
            return replacement;
          });
        (this.dialog_title = "Replacement Inspection"),
          (this.email_label = "Email Date*");
        this.headers = [
          {
            text: "Call Log Id",
            align: "start",
            sortable: false,
            value: "call_log_id",
          },
          { text: "Item Id", sortable: false, value: "tag_number" },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "sr_number" },
          { text: "Grade Summary", value: "grade_summary" },
          { text: "Ageing", value: "both_ageing", width: "10%" },
          { text: "Alert Level", value: "alert_level" },
          {
            text: "Action",
            value: "pending_initiation_action",
            sortable: false,
          },
        ];
      }
      if (tab == "Pending Call Log") {
        this.table_data = this.original_table_data
          .filter((x) => x.status == status)
          .map(function (replacement) {
            replacement.both_ageing = {
              ageing_dispatch: replacement.ageing_dispatch,
              ageing_inward: replacement.ageing,
            };
            return replacement;
          });
        (this.dialog_title = "Replacement Call Log"),
          (this.email_label = "Call Log Date*");
        this.headers = [
          {
            text: "Item Id",
            align: "start",
            sortable: false,
            value: "tag_number",
          },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "sr_number" },
          { text: "Grade Summary", value: "grade_summary" },
          { text: "Ageing", value: "both_ageing", width: "10%" },
          { text: "Alert Level", value: "alert_level" },
          {
            text: "Action",
            value: "pending_initiation_action",
            sortable: false,
          },
        ];
      }
      if (tab == "Pending Resolution") {
        this.table_data = this.original_table_data
          .filter((x) => x.status == status)
          .map(function (replacement) {
            replacement.both_ageing = {
              ageing_dispatch: replacement.ageing_dispatch,
              ageing_inward: replacement.ageing,
            };
            return replacement;
          });
        (this.dialog_title = "Replacement Resolution"),
          (this.headers = [
            {
              text: "Call Log Id",
              align: "start",
              sortable: false,
              value: "call_log_id",
            },
            { text: "Item Id", value: "tag_number" },
            { text: "Article Id", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Serial Number", value: "sr_number" },
            { text: "Grade Summary", value: "grade_summary" },
            { text: "Ageing", value: "both_ageing", width: "10%" },
            { text: "Replacement Location", value: "replacement_location" },
            { text: "Alert Level", value: "alert_level" },
            { text: "Action", value: "pending_initiation_action" },
          ]);
      }
      if (tab == "Pending Replacement") {
        this.table_data = this.original_table_data
          .filter((x) => x.status == status)
          .map(function (replacement) {
            replacement.both_ageing = {
              ageing_dispatch: replacement.ageing_dispatch,
              ageing_inward: replacement.ageing,
            };
            return replacement;
          });
        (this.dialog_title = "Replacement Details"),
          (this.headers = [
            {
              text: "Call Log Id",
              align: "start",
              sortable: false,
              value: "call_log_id",
            },
            { text: "Item Id", value: "tag_number" },
            { text: "Article Id", value: "sku_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Serial Number", value: "sr_number" },
            { text: "Attachment", value: "attachment", sortable: false },
            { text: "Ageing", value: "both_ageing", width: "10%" },
            { text: "Alert Level", value: "alert_level" },
            { text: "Action", value: "pending_initiation_action" },
          ]);
      }
      if (tab == "Pending Redeployment") {
        this.getDisposition();
        this.table_data = this.original_table_data
          .filter((x) => x.status == status)
          .map(function (replacement) {
            replacement.both_ageing = {
              ageing_dispatch: replacement.ageing_dispatch,
              ageing_inward: replacement.ageing,
            };
            return replacement;
          });
        this.table_data = this.table_data.filter(
          (x) => x.disposition_set != true
        );
        this.headers = [
          {
            text: "Call Log Id",
            align: "start",
            sortable: false,
            value: "call_log_id",
          },
          { text: "Item Id", value: "tag_number" },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Serial Number", value: "sr_number" },
          { text: "Grade Summary", value: "grade_summary" },
          { text: "Ageing", value: "both_ageing", width: "10%" },
          { text: "Attachment", value: "attachment", sortable: false },
          { text: "Alert Level", value: "alert_level" },
        ];
      }
    },
    replacementDetailDialogOpen(item) {
      if (item){
        this.selected = []
        this.selected.push(item)
      }
      if (this.selected.length <= 0) {
        this.showAlert('error', "Please select Items")
        return
      }
      this.today = new Date();
      this.today.setHours(this.today.getHours() + 5);
      this.today.setMinutes(this.today.getMinutes() + 30);
      this.remarks = "";
      this.files = [];
      this.claimSubmissionDate = "";
      this.call_log_id = "";
      this.replacement_location = "";
      this.rgp_number = "";
      this.sr_number1 = "";
      this.sr_number2 = "";
      this.item_id = "";
      this.repairDetailDialog = true;
      this.article_description = '';
      this.article_id = '';
      this.number = 0;
    },
    viewSummaryDialogOpen(item) {
      this.selected_inv = item;
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
    viewAttachmentDialogOpen(item) {
      if (item.item_replaced){
        this.view_attachment_title =  [ "Pending Call Log", "Pending Inspection", "Pending Resolution", "Pending Replacement"]
      }else{
        this.view_attachment_title =  ["Pending Inspection", "Pending Call Log", "Pending Resolution"]
      }
      this.selected_inv = item
      this.viewAttachmentDialog = true;
      //todo
    },

    changeDispositionItems(selected_item) {
      var selected_disposition = this.disposition.filter(
        (x) => x.id == selected_item
      );
      if (selected_disposition[0].original_code == 'Liquidation'){
        this.policyModel = true
      }
      this.selectedDisposition = selected_item;
      if (this.selected.length > 0) {
        this.remarks = "";
        (this.dailog_cancel = "Cancel"),
          (this.dailog_confirm = "Confirm"),
          (this.dialog_title =
            "Set Disposition - " + selected_disposition[0].original_code);
        if (this.policyModel == false){
          this.dspRepairDialog = true;
          this.number = 0;
        }
      } else {
        this.showAlert("warning", "Please select the Inv. for operations");
      }
    },

    confirmDialog() {
      this.number++
      var message_to_show = "";
      if (this.active_tab == "Pending Call Log") {
        if (this.call_log == "") {
          this.$toast.error("Please Provide call log");
          this.number--
          this.call_log = "";
          return;
        }
        if (this.claimSubmissionDate == "") {
          this.$toast.error("Please Provide Log Date");
          this.number--
          this.claimSubmissionDate = "";
          return;
        }

        if (this.call_log == "" || this.claimSubmissionDate == "") {
          this.$toast.error("Please Provide Call Log ID and Call Log Date");
           this.number--
          return;
        }

        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("replacement_ids[]", this.selected[i].id);
        }
        formData.append("call_log_id", this.call_log);
        formData.append("call_log_date", this.claimSubmissionDate);
        formData.append("call_log_remark", this.remarks);
        message_to_show = "Successfully Updated Replacement";
        this.number = 0;
        this.postRTVOperationalData(
          "/api/v1/warehouse/replacements/submit_for_inspection",
          formData,
          message_to_show,
          "Pending Inspection"
        );
      }

      if (this.active_tab == "Pending Inspection") {

        if (this.replacement_location == 'External Location' && this.rgp_number == ''){
          this.$toast.error("Please Provide RGP Number");
          return;
        }

        if (this.claimSubmissionDate == "") {
          this.$toast.error("Please Provide Email Date");
          this.claimSubmissionDate = "";
          return;
        }

        if(new Date(this.claimSubmissionDate).getTime() < new Date(this.selected[0].call_log_date).getTime()){
          this.$toast.error('Email Date should be greater or equal then Call Log Date');
          return
        }

        if (this.replacement_location == "") {
          this.$toast.error("Please Provide Replacement Location");
          
          this.replacement_location = "";
          return;
        }

        if (this.claimSubmissionDate == "" || this.replacement_location == ""){
          this.$toast.error("Please Provide Replacement Location and Email Date");
          
          this.replacement_location = "";
          return;
        }

        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }
        for (var i = 0; i < this.selected.length; i++) {
          formData.append("replacement_ids[]", this.selected[i].id);
        }
        formData.append("replacement_location", this.replacement_location);
        formData.append("email_date", this.claimSubmissionDate);
        formData.append("inspection_remark", this.remarks);
        formData.append("rgp_number", this.rgp_number);
        message_to_show = "Successfully Updated Replacement";
        this.postRTVOperationalData(
          "/api/v1/warehouse/replacements/submit_inspection",
          formData,
          message_to_show,
          "Pending Resolution"
        );
      }

      if (this.active_tab == "Pending Replacement") {
        if ( this.replacement_location == 'External Location' && this.rgp_number == "") {
          this.$toast.error("Please Provide RGP Number");
          this.rgp_number = "";
          return;
        }

        if (this.claimSubmissionDate == "") {
          this.$toast.error("Please Provide replacement Date");
          
          this.claimSubmissionDate = "";
          return;
        }

        if(new Date(this.claimSubmissionDate).getTime() < new Date(this.selected[0].replacement_date).getTime()){
          this.$toast.error('Call Log Date should be greater or equal then Email Date');
          
          return
        }

        if (this.item_id == "") {
          this.$toast.error("Please Provide Item Id");
          
          this.item_id = "";
          return;
        }
        if (this.replace_item && this.article_id == ''){
          this.showAlert("error", "Please Provide Article Id");
          
          return;
        }


        if (this.article_id != '' && !this.searched){
          this.showAlert("error", "Please Search Article Id First");
          
          return;
        }

        const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("files[]", file);
        }
        formData.append("replacement_id", this.selected[0].id);
        formData.append("rgp_number", this.rgp_number);
        formData.append("replacement_date", this.claimSubmissionDate);
        formData.append("tag_number", this.item_id.trim());
        formData.append("replacement_remark", this.remarks);
        formData.append("sr_number1", this.sr_number1);
        formData.append("sr_number2", this.sr_number2);
        if (this.replace_item){
          formData.append("article_id", this.article_id);
        }
        message_to_show = "Successfully Replaced Item";
        this.postRTVOperationalData(
          "/api/v1/warehouse/replacements/create_replacement",
          formData,
          message_to_show,
          "Pending Redeployment"
        );
      }
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
    postRTVOperationalData(api_url, dataUpdate, message_to_show, next_tab) {
      var status = this.getStatus(this.active_tab);
      this.loading = true;
      this.$http.secured
        .post(api_url, dataUpdate)
        .then((response) => {
          if (response.data.replacements) {
            if (this.active_tab != 'Pending Redeployment'){
              this.original_table_data = response.data.replacements.map(x => ({ ...x, isSelectable: x.sr_number == '' }));
            }else {
              this.original_table_data = response.data.replacements
            }
            this.table_data = [];
            this.table_data = this.original_table_data
              .filter((x) => x.status == status)
              .map(function (replacement) {
                replacement.both_ageing = {
                  ageing_dispatch: replacement.ageing_dispatch,
                  ageing_inward: replacement.ageing,
                };
                return replacement;
              });
            this.showAlert("success", message_to_show);
            this.repairDetailDialog = false;
            this.loading = false;
            this.call_log = "";
            this.claimSubmissionDate = "";
            this.replacement_location = "";
            this.selected = [];
            this.rgp_number = "";
            this.remarks = "";
            this.item_id = "";
            this.sr_number1 = "";
            this.sr_number2 = "";
            this.files = [];
            this.searched = false
            this.replace_item = false
            this.article_id = ''
            this.tab_name = next_tab.replace(/ /g,'_').toLowerCase()
            this.loadData(next_tab)
          } else {
            this.loading = false;
            this.$toast.error(response.data.message);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.error(error);
        });
    },

    approveRejectReplacement(action) {
      if (this.remarks == "") {
        this.$toast.error("Please Provide remarks");
        this.remarks = "";
        this.loading = false;
        return;
      }
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }
      formData.append("action_type", action);
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("replacement_ids[]", this.selected[i].id);
      }
      formData.append("action_remark", this.remarks);
      var status = this.getStatus(this.active_tab);
      this.loading = true;
      this.$http.secured
        .post(
          "/api/v1/warehouse/replacements/approve_reject_replacement",
          formData
        )
        .then((response) => {
          if (response.data.replacements) {
            if (this.active_tab != 'Pending Redeployment'){
              this.original_table_data = response.data.replacements.map(x => ({ ...x, isSelectable: x.sr_number == '' }));
            }else {
              this.original_table_data = response.data.replacements
            }
            this.table_data = [];
            this.table_data = this.original_table_data
              .filter((x) => x.status == status)
              .map(function (replacement) {
                replacement.both_ageing = {
                  ageing_dispatch: replacement.ageing_dispatch,
                  ageing_inward: replacement.ageing,
                };
                return replacement;
              });
            this.showAlert("success", "Replacement Updated Successfully");
            this.repairDetailDialog = false;
            this.loading = false;
            this.remarks = "";
            this.selected = [];
            this.files = [];
            this.tab_name = "pending_replacement"
            this.loadData("Pending Replacement")
          } else {
            this.loading = false;
            this.$toast.error("error", "No Data Found");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    setDisposition() {
      this.number++
      if (this.remarks == "") {
        this.$toast.error("Please Provide remarks");
        this.number--
        this.remarks = "";
        this.loading = false;
        return;
      }
      this.loading = true;
      var status = this.getStatus(this.active_tab);
      const formData = new FormData();
      for (var i = 0; i < this.selected.length; i++) {
        formData.append("replacement_ids[]", this.selected[i].id);
      }

      formData.append("desposition_remarks", this.remarks);
      formData.append("disposition", this.selectedDisposition);

      if (this.liquidation_policy != '') {
        formData.append('policy', this.liquidation_policy)
      }

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[]", file);
      }

      this.$http.secured
        .put("/api/v1/warehouse/replacements/set_disposition", formData)
        .then((response) => {
          if (response.data.replacements) {
            if (this.active_tab != 'Pending Redeployment'){
              this.original_table_data = response.data.replacements.map(x => ({ ...x, isSelectable: x.sr_number == '' }));
            }else {
              this.original_table_data = response.data.replacements
            }
            this.table_data = this.original_table_data
              .filter((x) => x.status == status)
              .map(function (inv_item) {
                inv_item.both_ageing = {
                  ageing_dispatch: inv_item.ageing_dispatch,
                  ageing_inward: inv_item.ageing,
                };
                return inv_item;
              });

            if (this.active_tab == "Pending Redeployment") {
              let action_data = this.table_data.filter(
                (x) => x.disposition_set != true
              );
              this.table_data = action_data;
            }

            this.loadData("Pending Redeployment")

            this.selectedDisposition = "";
            this.selected = [];
            this.dspRepairDialog = false;
            this.remarks = "";
            this.dialog_title = "";
            this.files = [];
            this.liquidation_policy = ''
            this.loading = false;
            this.showAlert("success", "Disposition Set Sucessfully");
            this.number--
          } else {
            this.loading = false;
            this.$toast.error("No Data Found");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.error("Something went wrong from Network" + error);
        });
    },
    getDisposition() {
      this.$http.secured
        .get("/api/v1/warehouse/replacements/get_dispositions")
        .then((response) => {
          if (response.data) {
            this.disposition = response.data.dispositions;
            this.policies = response.data.policies
          } else {
            this.$toast.error("No Disposition Found");
          }
        });
    },

    closeRepaitPopup(){
      this.repairDetailDialog = false
      this.selected = []
    },
    generateQR(){
      this.barcodePopup = true
      this.tag_number_barcode = "t-" + this.randomString(6, '0123456789abcdefghijklmnopqrstuvwxyz')

      this.item_id = this.tag_number_barcode
    },
    removeEventSpaces(){
      this.item_id = this.item_id.replace(/ /g, '');
    },
    closepolicypop(){
      if (this.liquidation_policy == ''){
        this.$toast.error('Please Select Policy')
        return
      }
      this.policyModel = false
      this.dspRepairDialog = true
      this.number = 0;
    },
    randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    },

    // openskulist(){
    //   this.$http.secured.get("/api/v1/warehouse/replacements/get_sku_records")
    //   .then(response => {
    //     if (response.data) {
    //       this.sku_records = response.data.client_sku_masters
    //     } else {
    //       this.$toast.error("No Disposition Found");
    //     }
    //   })
    // },

    searchSku(){
      if (this.article_id == ''){
        this.$toast.error("Please Provide Article Id");
        return
      }
      this.$http.secured.get("/api/v1/warehouse/replacements/get_sku_records", {params: {sku: this.article_id} })
      .then(response => {
        if (response.data) {
          if (response.data.client_sku_masters){
            this.article_description = response.data.client_sku_masters.sku_description
            this.searched = true
          }else{
            this.article_id = ''
            this.article_description = ''
            this.$toast.error("Article Id is Not Valid");
          }
        } else {
          this.$toast.error("No Disposition Found");
        }
      })
    },

    openSkuModel(){
      this.skulistmodel = true
    },

    selectSku(){
      var sku = this.sku_records.filter((x) => x.code == this.article_id)
      if (sku.length != 0) {
        this.article_description = sku[0].sku_description
      } else {
        this.$toast.error('Please Provide Valid Article Id')
        this.article_id = ''
        this.article_description = ''
      }
    },

    printBarcode() {
      this.divContents = document.getElementById('barcode-value').innerHTML;
      var a = window.open('', '', 'height=700, width=700')
      a.document.write('<html>')
      a.document.write('<body > <h1>Print Barcode <br>')
      a.document.write(this.divContents)
      a.document.write('</body></html>')
      a.document.close()
      a.print()
    } ,
    getStatus(tab) {
      var status = "";
      if (tab == "Pending Call Log") {
        status = "Pending Replacement Call Log";
      } else if (tab == "Pending Inspection") {
        status = "Pending Replacement Inspection";
      } else if (tab == "Pending Resolution") {
        status = "Pending Replacement Resolution";
      } else if (tab == "Pending Replacement") {
        status = "Pending Replacement Approved";
      } else if (tab == "Pending Redeployment") {
        status = ["Pending Replacement Disposition", 'Pending Redeployment'];
      }
      return status;
    },

    getColor(calories) {
      if (calories == "High") return "red";
      else if (calories == "Medium") return "orange";
      else if (calories == "Low") return "green";
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
        this.$http.secured.post('/api/v1/warehouse/replacements/search_item', formData)
        .then(response => {
          if (response.data) {
            if (this.active_tab != 'Pending Redeployment'){
              this.table_data = response.data.replacements.map(x => ({ ...x, isSelectable: x.sr_number == '' }));
            }else {
              this.table_data = response.data.replacements
            }
            if (this.active_tab == 'Pending Redeployment'){
              this.table_data = this.table_data.filter((x) => x.status == status[0] || x.status == status[1]).map(function (replacement) {
                replacement.both_ageing = {
                  ageing_dispatch: replacement.ageing_dispatch,
                  ageing_inward: replacement.ageing,
                };
                return replacement;
              });
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
            }else{
              this.table_data = this.table_data.filter((x) => x.status == status).map(function (replacement) {
                replacement.both_ageing = {
                  ageing_dispatch: replacement.ageing_dispatch,
                  ageing_inward: replacement.ageing,
                };
                return replacement;
              });
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
            }
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => this.showAlert("error", "Error in fetching Vendor Master"))
      }else {
        this.field_type = ''
        this.getReplacements(this.active_tab)
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
};
</script>
<style>
/* .v-card {
  max-width: 98% !important;
} */

.v-card-100 {
  max-width: 100% !important;
}
.inc-title {
  color: #172b4d;
  font-size: 20px;
}
.gray-border {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.cursor-pointer:hover {
  cursor: pointer;
}
</style>