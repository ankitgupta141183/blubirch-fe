<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- popups  -->
    <v-row justify="center">
      <v-dialog v-model="selctedItemsPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="v-card-100">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Selected {{ selected_table_data.length }} Items</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="assignExecutiveFnc">ASSIGN EXECUTIVE</v-btn>
              <v-btn class="ml-2 blue--text" color="white" small @click="pickupaddMoreItems">ADD MORE ITEMS</v-btn>
              <v-btn class="ml-2 red--text" color="white" small @click="deleteRequestpickup">DELETE ALL</v-btn>
              <v-btn icon dark @click="selctedItemsPopup = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table :dense="true" :search="search" show-select v-model="selected" :headers="selected_headers"
                  :items="selected_table_data" :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template #[`item.action`]="{ item }">
                    <img @click="deleteEvent(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                  </template>
                  <template #[`item.sub_location`]="{ item }">
                    <span>{{ item.sub_location ? item.sub_location : "N/A" }}</span>
                  </template>
                  <template #[`item.lot_name`]="{ item }">
                    <span>{{ item.lot_name ? item.lot_name : "N/A" }}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="createPendingpackaging" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="v-card-100">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Selected {{ selected_table_data.length }} Items</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="assignExecutiveFnc_2">ASSIGN EXECUTIVE</v-btn>
              <v-btn class="ml-2 blue--text" color="white" small @click="packagingaddMoreItems">ADD MORE ITEMS</v-btn>
              <v-btn class="ml-2 red--text" color="white" small @click="deleteRequest">DELETE ALL</v-btn>
              <v-btn icon dark @click="createPendingpackaging = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table :dense="true" :search="search" v-model="selected" :headers="selected_headers"
                  :items="selected_table_data" :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template #[`item.action`]="{ item }">
                    <img @click="deleteEvent(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                  </template>
                  <template #[`item.sub_location`]="{ item }">
                    <span>{{ item.sub_location ? item.sub_location : "N/A" }}</span>
                  </template>
                  <template #[`item.lot_name`]="{ item }">
                    <span>{{ item.lot_name ? item.lot_name : "N/A" }}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="assignExecutivePopup" persistent max-width="367px" style="height: 361px;">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Create Request</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="assignExecutivePopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="requestReason" disabled outlined :items="request_type = 'Packaging'"
                  item-text="name" item-value="id" label="Request Reason" style="max-width: 300px;"></v-autocomplete> <br>
                <v-autocomplete v-model="assignTo" outlined :items="assignee_ids" item-text="username" item-value="id"
                  label="Assign To" style="max-width: 300px;" multiple chips ref="brandAutocomplete"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10" style="justify-content: center;">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small outlined color="primary" class="btn-cancel mr-2 mb-3" @click="assignExecutivePopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="assignExecutiveSubmit" :disabled="!assignTo || number > 0">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="assignExecutivePopup_2" persistent max-width="367px" style="height: 361px;">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Create Request</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="assignExecutivePopup_2 = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="assignTo" outlined :items="assignee_ids" item-text="username" item-value="id"
                  label="Assign To" style="max-width: 300px;" multiple chips ref="brandAutocomplete"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10" style="justify-content: center;">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small outlined color="primary" class="btn-cancel mr-2 mb-3" @click="assignExecutivePopup_2 = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="assignExecutiveSubmit_2" :disabled="!assignTo || number > 0">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    <!-- Edit request popup in request tracker -->
    <v-row justify="center">
      <v-dialog v-model="editRequestPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary">
          <v-toolbar-title class="alert-link">Edit Request {{ req_id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn class="blue--text" color="white" small @click="editrequestSave" :disabled="number > 0"> SAVE & UPDATE
            </v-btn>
            <v-btn icon dark @click="editRequestPopup = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </v-toolbar>
        <v-card class="v-card-100">
          <v-toolbar>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="addMoreItemsReqTrack">ADD MORE ITEMS</v-btn>
              <v-btn class="blue--text" color="white" small @click="changeAssignmentEditFunc">CHANGE ASSIGNMENT</v-btn>
              <v-btn class="red--text" color="white" small @click="deleteReqTracker()">DELETE REQUEST</v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table :dense="true" :search="search" v-model="selected" show-select :headers="edit_req_headers"
                  :items="edit_req_table_data" :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template #[`item.action`]="{ item }">
                    <img @click="deleteEvenTrack(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                  </template>
                  <template #[`item.sub_location`]="{ item }">
                    <span>{{ item.sub_location ? item.sub_location : "N/A" }}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- change assignment popup request tracker -->
    <v-row justify="center">
      <v-dialog v-model="changeAssignmentPopup" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Change Assignee</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="changeAssignmentPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="change_assignment" outlined :items="change_assignment_items" item-text="username"
                  item-value="id" label="Choose the Executive" style="max-width: 300px;" multiple chips
                  ref="brandAutocomplete"></v-autocomplete>
                <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="btn-cancel mr-2 mb-3" @click="changeAssignmentPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="changeAssignConfirm" :disabled="number > 0 || !change_assignment">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- add more items popup in request tracker -->
    <v-row justify="center">
      <v-dialog v-model="addMoreItemsPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary">
          <v-toolbar-title class="alert-link">Selected items {{ this.selected_add.length }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn class="blue--text" color="white" small @click="addButton"
              :disabled="this.selected_add.length == 0">ADD</v-btn>
            <v-btn icon dark @click="addMoreItemsPopup = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </v-toolbar>
        <v-card class="v-card-100">
          <v-toolbar class="tool_search">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="add_item_search" label="Search"
              style="max-width: 300px; margin-top: 28px;" outlined
              v-on:keyup.enter="addMoreItemsReqTrack()"></v-text-field>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-3 pr-3">
                <v-data-table :dense="true" :search="search" v-model="selected_add" show-select
                  :headers="add_items_headers" :items="add_items_table_data" :loading="loading"
                  loading-text="Loading Data... Please wait" class="elevation-1">
                  <template #[`item.sub_location`]="{ item }">
                    <span>{{ item.sub_location ? item.sub_location : "N/A" }}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- change assignment popup in edit assignment in Request-tracker tab -->
    <v-row justify="center">
      <v-dialog v-model="changeAssignmentEditPopup" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Change Assignment</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="changeAssignmentEditPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="change_assignment_item_edit" outlined :items="change_assignment_edit_items"
                  item-text="username" item-value="id" label="Choose the Executive" style="max-width: 300px;" multiple
                  chips clearable ref="brandAutocomplete"></v-autocomplete>
                <u><a href="#" class="select-all-link" @click="selectAllEditItem">Select All</a></u>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="btn-cancel mr-2 mb-3" small @click="changeAssignmentEditPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="changeAssignmentEditPopup = false" :disabled="number > 0 || !change_assignment_item_edit">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Cancel Request Pop up in Request-Tracker Tab -->
    <v-row justify="center">
      <v-dialog v-model="cancelRequestPopup" persistent max-width="470px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cancelRequestPopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text style="margin-top: 8px;text-align: center;">
            <span>Are you sure you want to cancel <span v-if="selected.length == 1">request</span> <span
                v-if="selected.length > 1">requests</span>
              <span v-for="item in selected" :key="item" style="font-weight: bold;"> {{ item.request_id }} </span>
              ?</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="btn-cancel mr-2 mb-3" small
              @click="cancelRequestPopup = false">Cancel</v-btn>
            <v-btn color="primary" class="mb-3 mr-5" small @click="cancelRequestSubmit">Yes</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Update sublocation popup -->
    <v-row justify="center">
      <v-dialog v-model="updateSubLocation" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Sub-Location</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="updateSubLocation = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="mt-4">
                <v-autocomplete v-model="sub_location" outlined :items="update_sub_location" item-text="code"
                  item-value="id" label="Select the sub-location" style="max-width: 300px;"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" :disabled="number > 0" @click="updateSubLocSubmit">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Raise debit note popup in write off items in Not-found-items tab -->
    <v-row justify="center">
      <v-dialog v-model="raiseDebitNotePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Write Off Items</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="raiseDebitNotePopup = raiseDebitNoteClose()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field hide-details label="Raise Note Against" outlined v-model="raise_note_against" type="text" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Debit Amount" outlined v-model="debit_amount" :min="0" oninput="validity.valid||(value='');" type="number" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="btn-cancel mr-2 mb-3" small @click="raiseDebitNotePopup = raiseDebitNoteClose()">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" @click="raiseDebitNoteSubmit" :disabled="!raise_note_against || !debit_amount || number > 0">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-center" v-if="(active_tab == 'Not Found Items')">
            <span> Sub location Updated Successfully </span>
          </v-card-text>
          <v-card-text class="text-center"
            v-if="(active_tab == 'Pending Disposition') || (active_tab == 'Pending Dispatch')">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="rejectsussesspopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="rejectsussesspopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ successmessage }}</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Cancel Success messeage popup in Request Tracker -->
    <v-row justify="center">
      <v-dialog v-model="cancelSuccesPopup" persistent max-width="424px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cancelSuccesPopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span>Request
              <span v-for="item in temp_selectedData" :key="item" style="font-weight: bold;"> {{
                item.request_id }} </span>
              ? Successfully cancelled.
            </span>
          </v-card-text>

          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="cancelSuccesPopup = false">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- success message -->
    <v-row justify="center">
      <v-dialog v-model="successDialogInward" persistent max-width="480px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="successDialogInward = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text class="text-center">
            <span style="font-weight:500">
              <span> {{ returnId }} </span>
              {{ successMsg }}
            </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn class="mb-3" color="primary" small @click="closemsg">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- error message -->
    <v-row justify="center">
      <v-dialog v-model="errorDialogInward" persistent max-width="480px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="errorDialogInward = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-title style="margin-top: -13px;">
            <span style="font-size: initial;" class="text">{{ ErroeMsg }}</span>
          </v-card-title>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="blue--text" color="white" small @click="errorDialogInward = false">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- cancelled tag ids -->
    <v-row justify="center">
      <v-dialog v-model="canseledtagspopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Cancelled Tag IDs</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="canseledtagspopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row v-for="(tag, index) in tags" :key="index">
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-autocomplete v-model="tag.reject_reason" outlined :items="reason_forReject_items" item-text="name"
                    item-value="id" :label="'Reason For Reject '" style="max-width: 300px;"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-text-field label="Tag Id" outlined v-model="tag.tag_id" @keydown.enter="addItem(tag)"></v-text-field>
                </v-col>
                <v-row v-if="tag.tag_ids.length > 0">
                  <v-col cols="12" sm="4" md="6"></v-col>
                  <v-col cols="12" sm="4" md="6">
                    <div class="selected_rule_box">
                      <span v-for="(item, index) in tag.tag_ids" :key="index" class="rule-type_option">
                        {{ item }}
                        <v-icon small @click="removeItem(tag, index)">mdi-close</v-icon>
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="blue" dark class="ma-2" @click="addMoreTag">
                    <v-icon>mdi-plus-circle</v-icon> + ADD MORE
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions center>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" class="cancel-color mb-3" @click="cancelCansalation">Cancel</v-btn>
              <v-btn color="primary" class="mb-3" @click="submitcansalation">Submit</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- data detail popup  -->
    <v-row justify="center">
      <v-dialog v-model="datadetailpopupdisposition" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopupdisposition = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article id</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ sku_master_code }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_description }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Lot ID</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ lot_id }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Lot Name</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ lot_name ? lot_name : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Destination Type</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ destination_type ? destination_type : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Outward Reason Ref Order</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ outward_reason_ref_order ? outward_reason_ref_order : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Pickup Request Status</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ pickup_request_status ? pickup_request_status : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Pending Packaging'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Packaging Request Status</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ pickup_request_status ? pickup_request_status : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- data detail popup  for Pending Dispatch and Request Tracker-->
    <v-row justify="center">
      <v-dialog v-model="detailDataPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span v-if="active_tab == 'Pending Dispatch'">Box Id: {{ bx_Id }}</span>
              <span v-if="active_tab == 'Request Tracker'">Request Id: {{ reqst_Id }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="detailDataPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row v-if="active_tab == 'Pending Dispatch'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">ORRD</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ orrdNumber }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Pending Dispatch'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Destination Type</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ destType }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Pending Dispatch'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Destination</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ dest }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Request Tracker'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Request Type</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ rqustType }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Request Tracker'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Assigned To</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ assignedTo }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Request Tracker'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Status</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ status1 }}
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Request Tracker'">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Distribution Center</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ distribCenter }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Update Details Popup in Pending Dispatch tab -->
    <v-row justify="center">
      <v-dialog v-model="createUpdateDispatchDetails" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Dispatch Details</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="createUpdateDispatchDetails = closeUpdateDispatchDetails()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-text-field hide-details label="Destination Type" outlined v-model="destination_type" type="text" :disabled="true"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-text-field hide-details label="Destinatinon" outlined v-model="destination" type="text" :disabled="true"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" style="height: 96px;">
                  <v-autocomplete v-model="outwordReferenceDocument" outlined :items="outward_ref_item" item-text="name"
                    item-value="id" label="Outward Reference Document" style="max-width: 300px;" disabled
                    @input="checkValueChange"
                    :error-messages="showError ? ['You can not change this!'] : []"></v-autocomplete>
                </v-col>
                <v-col cols="6" sm="4" md="6" style="padding: 0px;">
                  <v-col v-for="(field, index) in fields" :key="index" style="height: 96px;">
                    <v-text-field hide-details label="ORD Number" outlined v-model="field.outward_ref_value" required type="number" :min="0" oninput="validity.valid||(value='');"></v-text-field>
                  </v-col>
                </v-col>
                <v-row>
                  <v-col cols="6" sm="4" md="6"></v-col>
                  <v-col cols="6" sm="4" md="6">
                    <a @click="addMoreField" style="color: #1976d2; text-decoration: underline;">Add More ORV +</a>
                  </v-col>
                </v-row>
              </v-row>

              <v-row>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-autocomplete v-model="mode" outlined :items="mode_items" item-text="name" item-value="id" @change="updateOtherDetail" label="Mode" style="max-width: 300px;"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-autocomplete v-model="logisticPartner" outlined :disabled="mode == '2'" :items="logistic_partner_items" item-text="name" item-value="id" label="logistic Partner" style="max-width: 300px;"></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-text-field hide-details label="Vehicle Number" outlined :disabled="mode == '2'" v-model="value_number" oninput="this.value = this.value.replace(/[^0-9a-zA-Z]/g, '');" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="6" style="height: 96px;">
                  <v-text-field hide-details label="Dispatch Document Number" outlined :disabled="mode == '2'" v-model="dispatch_document_number" required oninput="this.value = this.value.replace(/[^0-9a-zA-Z]/g, '');"></v-text-field>
                </v-col>
              </v-row>
              <v-col cols="12" sm="4" md="6">
                <template>
                  <v-file-input v-model="file" accept="pdf" label="POD" @change="handleFileChange"></v-file-input>
                </template>
              </v-col>
              <v-col cols="12" sm="4" md="6">
                <v-btn color="primary" outlined class="btn-cancel ma-2" @click="addcancelledtags"> + ADD CANCELLED TAG IDs </v-btn>
                <div class="mt-2">
                  <span v-if="submittedTags.length > 0" class="text_color" @click="opencanceledtags" style="cursor: pointer;">{{ submittedTags.length }} Canceled Tag ID's </span>
                </div>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="btn-cancel mb-3"
              @click="createUpdateDispatchDetails = closeUpdateDispatchDetails()">Cancel</v-btn>
            <v-btn color="primary" class="mb-3"
              :disabled="outwordReferenceDocument == '' || mode == '' || (mode == '1' && (logisticPartner == ''
                || value_number == '' || dispatch_document_number == '')) || fields[0].outward_ref_value == '' || number > 0 || !file || outwordReferenceDocument != intial_value"
              @click="updatePendingDecisionSubmit">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- popups end -->
    <!-- Header -->
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>
    <!-- tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')" v-for="(tab, index) in tabs"
          :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>
    <!-- action , search and filter -->
    <v-card-title style="padding:28px">
      <v-row>
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="dispatch_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        <v-spacer></v-spacer>
        <!-- action buttons -->
        <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending Pick-Up'">
          <v-btn class="ma-2" color="primary" :disabled="selected == 0" @click="createRequestPopup">CREATE PICKUP REQUEST</v-btn>
        </v-actions>
        <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending Packaging'">
          <v-btn class="ma-2" color="primary" :disabled="selected == 0" @click="createPickuppopup">CREATE Packaging REQUEST</v-btn>
        </v-actions>
        <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Pending Dispatch'">
          <v-btn class="ma-2" color="primary" :disabled="selected == 0" @click="createUpdateDetails">UPDATE DISPATCH DETAILS</v-btn>
        </v-actions>
        <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Request Tracker'">
          <v-btn class="ma-2" color="primary" :disabled="checkIsPending" @click="editRequestDialog">EDIT REQUEST</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="checkIsPending" @click="cancelRequestDialogOpen">CANCEL REQUEST</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="checkIsPending" @click="changeAssignmentFunc">CHANGE ASSIGNMENT</v-btn>
        </v-actions>
        <v-actions style="margin-top: 10px; margin-right: 16px;" v-if="active_tab == 'Pending Disposition'">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-on="on" v-bind="attrs" :disabled="selected.length == 0">
                ASSIGN DISPOSITION
                <v-icon dark>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in assign_disposition_list" :key="index" @click="assignDisposition(item)">
                <v-list-item-title>{{ item.code }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-actions>
        <v-actions style="margin-bottom: 28px;" v-if="active_tab == 'Not Found Items'">
          <v-btn class="ma-2" color="primary" :disabled="selected == 0" @click="updateSubLocationDialog">UPDATE SUB-LOCATION</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="selected == 0 || selected.length > 1" @click="raiseDebitNote">WRITE OFF ITEM</v-btn>
        </v-actions>
        <!-- action buttons end -->
        <!-- filter -->
        <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
          style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
          <v-expansion-panel outlined @click="filterListOfButtons">
            <v-expansion-panel-header>Filter
              <template v-slot:actions>
                <v-icon color="primary">
                  mdi-menu-down
                </v-icon>
              </template>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card-title>
    <!-- tabs data -->
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
          fixes-header
          height="100%"
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template #[`item.tag_number`]="{ item }">
            <a @click="linkPopupInReqTracker(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
          <template #[`item.request_id`]="{ item }">
            <a @click="openDataDetails(item, 'requestTracker')" style="color: #1976d2;">
              <u> {{ item.request_id }}</u>
            </a>
          </template>
          <template #[`item.box_number`]="{ item }">
            <a @click="openDataDetails(item, 'pendingDispatch')" style="color: #1976d2;">
              <u> {{ item.box_number }}</u>
            </a>
          </template>
          <template #[`item.lot_name`]="{ item }"
            v-if="active_tab == 'Pending Pick-Up' || active_tab == 'Pending Packaging'">
            <span>{{ item.lot_name ? item.lot_name : "N/A" }}</span>
          </template>
          <template #[`item.orrd`]="{ item }" v-if="active_tab == 'Pending Dispatch'">
            <span>{{ item.orrd ? item.orrd : "N/A" }}</span>
          </template>
          <template #[`item.destination_type`]="{ item }" v-if="active_tab == 'Pending Dispatch'">
            <span>{{ item.destination_type ? item.destination_type : "N/A" }}</span>
          </template>
          <template #[`item.destination`]="{ item }" v-if="active_tab == 'Pending Dispatch'">
            <span>{{ item.destination ? item.destination : "N/A" }}</span>
          </template>
          <template #[`item.completed_at`]="{ item }" v-if="active_tab == 'Request Tracker'">
            <span>{{ item.status != 'Pending' && item.status != 'In Progress' ? item.completed_at : "N/A" }}</span>
          </template>
          <template #[`item.not_found_items`]="{ item }" v-if="active_tab == 'Request Tracker'">
            <span>{{ item.status != 'Pending' ? item.not_found_items : "N/A" }}</span>
          </template>
          <template #[`item.assignee_name`]="{ item }" v-if="active_tab == 'Request Tracker'">
            <span>{{ item.assignee_name ? item.assignee_name : "N/A" }}</span>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- tabs data end -->
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-dispatch" v-model="filteWithSubPopup" persistent max-width="1224px">
        <v-card>
          <v-card-actions v-if="active_tab == 'Pending Pick-Up'">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="lot_name_search" label="Lot Name" class="ma-2" outlined></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="outward_reason_ref_search" label="Outward Reason Ref Order" class="ma-2" outlined></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="destination_type_search" label="Destination Type" class="ma-2" outlined></v-text-field>
            <v-combobox clearable v-model="filterPickupRequestStatus" :items="pickup_request_status" item-text="name" item-value="id" label="Pick Up Request Status" outlined class="ma-2"></v-combobox>
          </v-card-actions>
          <v-card-actions v-if="active_tab == 'Pending Packaging'">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="lot_name_search" label="Lot Name" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="outward_reason_ref_search" label="Outward Reason Ref Order" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="destination_type_search" label="Destination Type" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-combobox clearable v-model="filterPackagingRequestStatus" :items="packaging_request_status" item-text="name" item-value="id" label="Packaging Request Status" outlined class="ma-2" v-on:keyup.enter="loadData(active_tab)" v-if="active_tab == 'Pending Packaging'"></v-combobox>
          </v-card-actions>
          <v-card-actions v-if="active_tab == 'Pending Dispatch'">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="outward_reason_ref_search" label="ORRD" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="destination_type_search" label="Destination Type" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="destination_items" label="Destination" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          </v-card-actions>
          <v-card-actions v-if="active_tab == 'Request Tracker'">
            <v-combobox clearable v-model="request_type_search" :items="filter_request_types" item-text="name" item-value="id" label="Request Type" outlined class="ma-2" v-on:keyup.enter="loadData(active_tab)"></v-combobox>
            <v-combobox clearable v-model="status_search" :items="filter_status" item-text="name" item-value="id" label="Status" outlined class="ma-2" v-on:keyup.enter="loadData(active_tab)"></v-combobox>
          </v-card-actions>
          <v-card-actions v-if="active_tab == 'Pending Disposition'">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id_search" label="Article ID" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field> <v-combobox clearable v-model="reason_for_reject_search" :items="filter_reject_reason" item-text="name" item-value="id" label="Reason For Reject" outlined class="ma-2" v-on:keyup.enter="loadData(active_tab)"></v-combobox>
          </v-card-actions>
          <v-card-actions v-if="active_tab == 'Not Found Items'">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id_notfound_search" label="Article ID" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-combobox clearable v-model="category_search" :items="filter_category" item-text="value" item-value="key" label="Category" multiple outlined class="ma-2" v-on:keyup.enter="loadData(active_tab)" ref="brandAutocomplete"></v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="filteWithSubPopup = filterPopupClose()">Cancel</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">Apply Filter(s)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- pagination display -->
    <div>
      <v-row class="ml-2">
        <v-col cols="4" sm="1" class="PaddingItemPerPage">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
        </v-col>
        <span class="item-selected"> 
          <span v-if="selected.length == 1">{{selected.length}} Item Selected</span>
          <span v-if="selected.length > 1">{{selected.length}} Items Selected</span>
        </span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="PaddingItemPerPage">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
  import { securedAxiosInstance } from '@/backend/axios'
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
  export default {
    data() {
      return {
        headerText: "Dispatch",
        tabs: [
          "Pending Pick-Up",
          "Pending Packaging",
          "Pending Dispatch",
          "Request Tracker",
          "Pending Disposition",
          "Not Found Items"
        ],
        active_tab: "Pending Pick-Up",
        headers: [],
        search: '',
        filteWithSubPopup: false,
        table_data: [],
        dispatch_search: '',
        loading: true,
        alert: false,
        alert_type: "success",
        alert_message: "success",
        selctedItemsPopup: false,
        selected_table_data: [],
        selected: [],
        filterLotName: [],
        filterOutwardReasonReforder: [],
        filterDestinationType: [],
        filterPickupRequestStatus: [],
        filterDestination: [],
        lot_name: [],
        lot_name_search: '',
        box_id_search: '',
        destination_type_search: '',
        outward_reason_ref_order: '',
        destination_type: '',
        pickup_request_status: '',
        assignExecutivePopup: false,
        assignExecutivePopup_2: false,
        editRequestPopup: false,
        addMoreItemsPopup: false,
        selected_add: [],
        add_item_search: '',
        request_sl_id: '',
        distributionCenterId: '',
        add_items_table_data: [],
        add_items_headers: [],
        changeAssignmentPopup: false,
        change_assignment: [],
        change_assignment_items: '',
        dc_id: '',
        inv_id: [],
        sub_location: [],
        successMsg: '',
        ErroeMsg: '',
        successDialogInward: false,
        errorDialogInward: false,
        update_inv_id: [],
        changeAssignmentEditPopup: false,
        change_assignment_item_edit: [],
        change_assignment_edit_items: [],
        cancelRequestPopup: false,
        selectedDisposition: '',
        addMoreItemsPopup: false,
        request_reason_name: '',
        datadetailpopupdisposition: false,
        item_details: '',
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        updateSubLocation: false,
        update_sub_location: '',
        sub_location: '',
        okconfirmpopup: false,
        dispatch_id: [],
        request_id_search: '',
        request_type_search: '',
        status_search: [],
        tag_id_search: '',
        article_id_search: '',
        reason_for_reject_search: [],
        category_search: [],
        createPendingpackaging: false,
        writeOffItemDialog: false,
        inwardSelected: false,
        raiseDebitNotePopup: false,
        raise_note_against: '',
        debit_amount: '',
        request_ids: [],
        filter_request_types: '',
        filter_status: '',
        filter_reject_reason: '',
        filter_category: '',
        requestReason: 'Packaging',
        assignTo: [],
        createUpdateDispatchDetails: false,
        put_request: [],
        outward_reason_ref_search: '',
        request_type: '',
        assignee_ids: '',
        value_number: [],
        dispatch_document_number: [],
        canseledtagspopup: false,
        reject_reason: '',
        reason_forReject_items: [],
        rows: [{ file: '', }],
        outward_ref_item: '',
        outwordReferenceDocument: [],
        mode_items: '',
        mode: [],
        logistic_partner_items: '',
        logisticPartner: '',
        filterPackagingRequestStatus: [],
        destination_items: '',
        edit_req_table_data: '',
        lot_id: '',
        sku_master_code: '',
        item_description: '',
        selected_headers: [],
        edit_req_headers: [],
        destination: [],
        tag_number: '',
        rejectsussesspopup: false,
        file: '',
        number: 0,
        temp_selectedData: [],
        // outward_ref_value: [],
        fields: [
          { outward_ref_value: '' } // Initial field
        ],
        tags: [
          {
            reject_reason: '',
            tag_ids: []
          },
        ],
        tag_id: [],
        submittedTags: [],
        req_id: '',
        items_to_add: [],
        edit_req_table_data: [],
        article_id_notfound_search: '',
        tag_items: [],
        cancelSuccesPopup: false,
        detailDataPopup: false,
        bx_Id: '',
        reqst_Id: '',
        returnId: '',
        rqustType: '',
        orrdNumber: '',
        destType: '',
        dest: '',
        message: '',
        intial_value: '',
        showError: false,
        temp_cancelled_tag: [],
      }
    },
    async created() {
      this.successmessage = this.$store.state.responseMessage;
      if (this.successmessage !== undefined && this.successmessage !== '') {
        this.successpopup = true
      } else if (this.successmessage === undefined) {
        this.successpopup = false
      }
      this.loadData('Pending Pick-Up');
      this.scrollToTop();
      this.get_categories_list();
    },
    components: {
      HeaderComponent
    },
    watch: {
      assignTo(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.brandAutocomplete.internalSearch = '';
          });
        }
      },
      change_assignment(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.brandAutocomplete.internalSearch = '';
          });
        }
      },
      change_assignment_item_edit(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.brandAutocomplete.internalSearch = '';
          });
        }
      },
      category_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.brandAutocomplete.internalSearch = '';
          });
        }
      },
    },
    computed: {
      checkIsPending() {
        if (this.selected.length === 0) {
          return true;
        }
        const isAnyNotPending = this.selected.some(item => item.status != "Pending");
        return isAnyNotPending;
      }
    },
    methods: {
      checkValueChange() {
        if (this.outwordReferenceDocument == this.intial_value) {
          this.showError = false;
        } else {
          this.showError = true;
        }
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      eraseAssign(selectedItems) {
        if (selectedItems.length > 0) {
          this.assignTo = selectedItems;
        } else {
          this.assignTo = '';
        }
      },
      addItem(tag) {
        if (tag.tag_id.trim() !== '') {
          tag.tag_ids.push(tag.tag_id.trim())
          tag.tag_id = ''
        }
      },
      removeItem(tag, index) {
        tag.tag_ids.splice(index, 1)
      },
      loadData(tab, tab_action) {
        if (tab_action) {
          this.dispatch_search = ''
        }
        this.loading = true;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1;
        this.pageSize = 100;
        this.totalPages = ''
        if (tab == "Pending Pick-Up") {
          (this.headers = [
            { text: "Tag ID", value: "tag_number" },
            { text: "Lot ID", value: "lot_id" },
            { text: "Lot Name", value: "lot_name" },
            { text: "Outward Reason Ref Order", value: "outward_reason_ref_order", },
            { text: "Destination Type", value: "destination_type" },
            { text: "Pick Up Request Status", value: "pickup_request_status" },
            { text: "Sub Location", value: "sub_location" }
          ]);
          this.PendingPickUP();
          this.Loadfilterdata();
        }
        if (tab == "Pending Packaging") {
          (this.headers = [
            { text: "Tag ID", value: "tag_number" },
            { text: "Lot ID", value: "lot_id" },
            { text: "Lot Name", value: "lot_name" },
            { text: "Outward Reason Ref Order", value: "outward_reason_ref_order", },
            { text: "Destination Type", value: "destination_type" },
            { text: "Packaging Request Status", value: "pickup_request_status" },
          ]);
          this.PendingPackaging();
        }
        if (tab == "Pending Dispatch") {
          (this.headers = [
            { text: "Box Id", value: "box_number" },
            { text: "ORRD", value: "orrd" },
            { text: "Destination Type", value: "destination_type" },
            { text: "Destination", value: "destination" },
          ]);
          this.PendingDispatch();
          this.fetchDocumentRefernce();
        }
        if (tab == "Request Tracker") {
          (this.headers = [
            { text: "Request ID", value: "request_id" },
            { text: "Creation Date & Time", value: "created_at" },
            { text: "Request Type", value: "request_type" },
            { text: "Assigned To", value: "assignee_name" },
            { text: "Status", value: "status" },
            { text: "Completion Date & Time", value: "completed_at" },
            { text: "Not Found Items", value: "not_found_items" },
          ]);
          this.fetchRequestTracker();
          this.fetchFilterRequestType();
        }
        if (tab == "Pending Disposition") {
          (this.headers = [
            { text: "Tag ID", value: "tag_number" },
            { text: "Article ID", value: "sku_master_code" },
            { text: "Article Description", value: "item_description" },
            { text: "Reason for Reject", value: "reject_reason" },
          ]);
          this.fetchPendingDisposition();
          this.assignDispositionList();
          this.fetchFilterReasonForReject();
        }
        if (tab == "Not Found Items") {
          (this.headers = [
            { text: "Tag ID", value: "tag_number" },
            { text: "Last Sub-Location", value: "sub_location" },
            { text: "Category", value: "category" },
            { text: "Article ID", value: "sku_master_code" },
            { text: "Article Description", value: "item_description" },
          ]);
          this.fetchNotFoundItems();
          this.fetchFilterCategory();
        }
      },
      filterListOfButtons() {
        this.filterLotName = [],
          this.filterOutwardReasonReforder = [],
          this.filterDestinationType = '',
          this.filterPickupRequestStatus = '',
          this.filteWithSubPopup = true;
        this.lot_name_search = '';
        this.outward_reason_ref_search = '';
        this.destination_type_search = '';
        this.filterPackagingRequestStatus = '';
        this.box_id_search = '';
        this.destination_items = '';
        this.request_type_search = '';
        this.status_search = '';
        this.article_id_search = '';
        this.reason_for_reject_search = '';
        this.article_id_notfound_search = '';
        this.category_search = [];
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
      },

      PendingPickUP() {
        this.search = '';
        const requestBody = {
          search: this.dispatch_search,
          page: this.page,
          per_page: this.pageSize,
          tab: "pending_pickup"
        };
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/fetch_orders', { params: requestBody })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items;
              this.totalPages = response.data.meta.total_pages;
              this.makeLoadingFalse();
            } else {
              this.showAlert("error", "No Data Found");
              this.loading = false;
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      PendingPackaging() {
        this.search = '';
        const requestBody = {
          search: this.dispatch_search,
          page: this.page,
          per_page: this.pageSize,
          tab: "pending_packaging"
        };
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/fetch_orders', { params: requestBody })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items;
              this.totalPages = response.data.meta.total_pages;
              this.filterLotName = response.data.warehouse_order_items.map(warehouse_order_items => warehouse_order_items.lot_name);
              this.filterOutwardReasonReforder = response.data.warehouse_order_items.map(warehouse_order_items => warehouse_order_items.outward_reason_ref_order);
              this.filterDestinationType = response.data.warehouse_order_items.map(warehouse_order_items => warehouse_order_items.destination_type);
              this.makeLoadingFalse();
            } else {
              this.showAlert("error", "No Data Found");
              this.loading = false;
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },
      PendingDispatch() {
        this.search = '';
        const requestBody = {
          box_number: this.dispatch_search,
          page: this.page,
          per_page: this.pageSize,
          tab: "pending_dispatch"
        };
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/dispatch_boxes', { params: requestBody })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.dispatch_boxes;
              this.totalPages = response.data.meta.total_pages;
              this.filterDestination = response.data.dispatch_boxes.map(dispatch_boxes => dispatch_boxes.destination);
              this.makeLoadingFalse();
            } else {
              this.showAlert("error", "No Data Found");
              this.loading = false;
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },

      // Fetch the table data for Request-tracker tab
      addMoreItems() {
        this.selctedItemsPopup = false;
        this.selctedItemsPickup = false;
        this.writeOffItemDialog = false;
        this.editRequestPopup = false;
      },
      pickupaddMoreItems() {
        this.selctedItemsPopup = false;
      },
      packagingaddMoreItems() {
        this.createPendingpackaging = false;
      },
      addNewRow() {
        this.rows = [
          ...this.rows,
          {
            file: '',
          }
        ];
      },
      // delete Items
      deleteRequest() {
        if (this.selected.length > 0) {
          this.selected = []
          var input = document.querySelectorAll('.checkbox');
          for (var i = 0; i < input.length; i++) {
            input[i].checked = false;
            this.createPendingpackaging = false;
            this.writeOffItemDialog = false;
          }
        }
        this.createPendingpackaging = false;
        this.writeOffItemDialog = false;
      },
      deleteRequestpickup() {
        if (this.selected.length > 0) {
          this.selected = []
          var input = document.querySelectorAll('.checkbox');
          for (var i = 0; i < input.length; i++) {
            input[i].checked = false;
            this.selctedItemsPopup = false;
          }
        }
        this.selctedItemsPopup = false;
      },
      deleteReqTracker() {
        this.$http.secured.delete("api/v1/warehouse/put_requests/" + this.request_sl_id)
          .then(response => {
            if (response.data) {
              this.editRequestPopup = false
              this.inv_id = '';
              this.change_assignment = '';
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
                this.requestTracListSelected = false;
              }
              this.showAlert("success", "Successfully deleted");
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;

          });


        // if (this.selected.length > 0) {
        //   this.selected = []
        //   var input = document.querySelectorAll('.checkbox');
        //   for (var i = 0; i < input.length; i++) {
        //     input[i].checked = false;
        //   }
        // }
      },
      // Fetch the table data 
      fetchRequestTracker() {
        this.search = ''
        const requestBody = {
          request_id: this.dispatch_search,
          page: this.page,
          per_page: this.pageSize,
          tab: this.active_tab,
          dispatch_requests: true,
        };
        this.$http.secured
          .get('/api/v1/warehouse/put_requests', { params: requestBody })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.put_requests
              this.totalPages = response.data.meta.total_pages
              this.makeLoadingFalse();
            } else {
              this.showAlert("error", "No Data Found");
              this.loading = false;
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },

      // fetch table-data for Pending-Disposition
      fetchPendingDisposition() {
        this.search = ''
        const requestBody = {
          search: this.dispatch_search,
          page: this.page,
          per_page: this.pageSize,
          tab: "pending_disposition"
        };
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/fetch_orders', { params: requestBody })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items
              this.totalPages = response.data.meta.total_pages
              this.makeLoadingFalse();
            } else {
              this.showAlert("error", "No Data Found");
              this.loading = false;
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },

      // Fetch Table-data for Not-found-items Tab
      fetchNotFoundItems() {
        this.search = ''
        const requestBody = {
          search: this.dispatch_search,
          page: this.page,
          per_page: this.pageSize,
          tab: "not_found_items"
        };
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/fetch_orders', { params: requestBody })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items
              this.totalPages = response.data.meta.total_pages
              this.makeLoadingFalse();
            } else {
              this.showAlert("error", "No Data Found");
              this.loading = false;
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },

      // fetch filter request-type and status in Request-tracker tab
      fetchFilterRequestType() {
        this.$http.secured
          .get("/api/v1/warehouse/put_requests/filters_data")
          .then(response => {
            if (response.data) {
              this.filter_request_types = response.data.request_types
              this.filter_status = response.data.statuses
              // this.makeLoadingFalse();
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

      // fetch filter Reson for reject in Pending-Disposition tab
      fetchFilterReasonForReject() {
        this.$http.secured
          .get("/api/v1/warehouse/dispatch/get_filters_data")
          .then(response => {
            if (response.data) {
              this.filter_reject_reason = response.data.reject_reasons
              // this.makeLoadingFalse();
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

      // fetch filter category in not-found-items tab
      fetchFilterCategory() {
        this.$http.secured
          .get("/api/v1/warehouse/put_away/filters_data")
          .then(response => {
            if (response.data) {
              this.filter_category = response.data.categories
              // this.makeLoadingFalse();
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

      // Edit Request in Request Tracker
      editRequestDialog() {
        this.number = 0;
        this.edit_req_table_data = [];
        this.request_sl_id = this.selected.map(x => x.id)
        var req_id_1 = this.selected.map(x => x.request_id)
        let value = req_id_1[0];
        this.req_id = value;
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        if (this.selected.length == 1) {
          this.editRequestPopup = true;
          this.assign_user = 'EDIT REQUEST';

        } else {
          var input = document.querySelectorAll('.checkbox');
          for (var i = 0; i < input.length; i++) {
            input[i].checked = false;
            this.selected = []
            this.requestTracListSelected = false;
          }
          this.showAlert("error", "Select only One items");
          return
        }

        this.loading = true;
        this.edit_req_headers = [

          { text: "", value: "customcheck", width: "3%" },
          {
            text: "Tag ID",
            value: "tag_number",
            align: "start",
            sortable: false,
            width: "12%"
          },
          { text: "Category", value: "category" },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Grade", value: "grade" },
          { text: "Sub Location", value: "sub_location" },
          { text: 'Delete', value: 'action' }

        ];
        securedAxiosInstance.get("/api/v1/warehouse/put_requests/" + this.request_sl_id)
          .then(response => {
            this.edit_req_table_data = response.data.put_request.request_items
            this.change_assignment_item_edit = response.data.put_request.assignee_ids
            this.update_inv_id = this.edit_req_table_data.map(x => x.inventory_id)
            this.request_ids = this.edit_req_table_data.map(x => x.id)
            this.change_assignment = response.data.put_request.assignee_id;
            this.distributionCenterId = response.data.put_request.distribution_center_id
            this.loading = false;
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
      },

      // SAVE & UPDATE IN THE EDIT REQUEST IN REQUEST-TRACKER TAB
      editrequestSave() {
        this.number++;
        const formData = new FormData();
        const temp_inventory_id = this.edit_req_table_data.map(x => x.warehouse_order_item_id)
        if (temp_inventory_id.length == 0) {
          this.editRequestPopup = false
          this.showAlert("error", "Request should have atleast 1 item");
          return;
        }
        this.$http.secured.put("api/v1/warehouse/put_requests/" + this.request_sl_id, {
          "put_request": {
            "assignee_ids": this.change_assignment_item_edit,
            "inventory_ids": temp_inventory_id
          }
        },)
          .then(response => {
            if (response.data) {
              this.editRequestPopup = false
              this.inv_id = '';
              this.change_assignment = '';
              this.change_assignment_item_edit = ''
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
                this.requestTracListSelected = false;
              }
              this.showAlert("success", `Request ${this.req_id} has been updated successfully.`);
              this.loadData(this.active_tab);
            } else {
              // this.editRequestPopup = false
              this.number = 0;
              this.$toast.error("No Data Found");
              // this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            // this.editRequestPopup = false
            this.$toast.error(error.response.data.error)
            this.number = 0;
            this.loading = false;

          });
      },
      addMoreField() {
        this.fields.push({ outward_ref_value: '' }); // Add a new field
      },
      addMoreTag() {
        this.tags.push({
          reject_reason: '',
          tag_ids: [],
        });
      },
      // add cancelled tags
      addcancelledtags() {
        const allTagIds = this.submittedTags.map(tag => tag.tag_ids);
        this.reject_reason = '',
          this.destination = "",
          this.canseledtagspopup = true;
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/get_filters_data')
          .then(response => {
            if (response.data) {
              this.reason_forReject_items = response.data.reject_reasons;
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
      // Add item in the edit request in REquest-tracker tab
      addMoreItemsReqTrack() {
        this.addMoreItemsPopup = true;
        this.loading = true;
        this.selected_add = [];
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.add_items_headers = [
          {
            text: "Tag ID",
            value: "tag_number",
            align: "start",
            sortable: false,
            width: "12%"
          },
          { text: "Category", value: "category" },
          { text: "Article ID", value: "sku_master_code" },
          { text: "Article Description", value: "item_description", width: "15%" },
          // { text: "Grade", value: "grade" },
          { text: "Sub Location", value: "sub_location" },
          { text: "Site Location", value: "distribution_center" }
        ];
        securedAxiosInstance.get('/api/v1/warehouse/dispatch/' + this.request_sl_id + '/add_items', { params: { search: this.add_item_search, page: params['page'], per_page: params['size'], distribution_center_id: this.distributionCenterId } })
          .then(response => {
            this.add_items_table_data = response.data.warehouse_order_items
            this.totalPages = response.data.meta.total_pages
            this.loading = false;
            this.add_item_search = ''
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
      },

      //  add button in edit request in Request-tracker tab
      addButton() {
        const mergedItems = [...this.edit_req_table_data, ...this.items_to_add, ...this.selected_add];
        this.edit_req_table_data = Array.from(new Set(mergedItems));
        this.addMoreItemsPopup = false;
      },

      // function called when clicked on the Assignment button in Request Tracker
      changeAssignmentFunc() {
        if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Item First')
          return
        }
        var dc = this.selected.map(x => x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        // if (unique_array.length > 1) {
        //   this.selected = []
        //   var input = document.querySelectorAll('.checkbox');
        //   for (var i = 0; i < input.length; i++) {
        //     input[i].checked = false;
        //     this.requestTracListSelected = false;
        //   }
        //   this.showAlert("error", "Please select the items from the same Location!");
        //   return
        // }
        this.assign_user = 'CHANGE ASSIGN'
        this.changeAssignmentPopup = true;
        this.change_assignment = [];
        this.number = 0;
        var dato = unique_array[0];
        this.dc_id = dato.toString()
        this.inv_id = this.selected.map(inventory => inventory.id);
        this.$http.secured
          .get("/api/v1/warehouse/put_requests/location_users", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              this.change_assignment_items = response.data.users;
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
      makeLoadingFalse() {
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      },
      handleFileChange(event) {
        this.file = event.target.files[0];
      },
      opencanceledtags() {
        this.canseledtagspopup = true;
      },
      cancelCansalation() {
        this.canseledtagspopup = false;
        this.tags = [],
          this.tags = _.cloneDeep(this.temp_cancelled_tag);
      },
      submitcansalation() {
        const temp_tags = this.tags.map(x => { const { tag_id, ...rest } = x; return rest; })
        for (var i = 0; i < this.tags.length; i++) {
          if (this.tags[i].tag_ids.length == 0) {
            this.tags[i].reject_reason = '';
          }
        }
        this.submittedTags = [].concat(...this.tags.map(person => person.tag_ids));
        this.temp_cancelled_tag = [];
        this.temp_cancelled_tag = _.cloneDeep(this.tags);
        this.canseledtagspopup = false;
      },
      updatePendingDecisionSubmit() {
        this.number++;
        // const submittedTags = this.selected.map(item => item.id);
        const statement = this.submittedTags.map[
          {
            [this.reject_reason]: this.tag_ids
          }
        ];
        const selectedIds = this.selected.map(item => item.id);
        const temp_tags = this.tags.map(x => { const { tag_id, ...rest } = x; return rest; })
        const outwardReferenceValues = this.fields.map(field => field.outward_ref_value);
        const formData = new FormData();
        formData.append('handover_document', this.file);
        formData.append('ids', selectedIds);
        formData.append('outward_reference_document', this.outwordReferenceDocument);
        formData.append('outward_reference_value', outwardReferenceValues);
        formData.append('mode', parseInt(this.mode));
        if (this.logisticPartner != '') {
          formData.append('logistic_partner', parseInt(this.logisticPartner));
        }
        formData.append('vehicle_number', this.value_number);
        formData.append('dispatch_document_number', this.dispatch_document_number);
        if (this.submittedTags.length > 0) { formData.append('cancelled_items', JSON.stringify(temp_tags)) }

        // console.log('formData content:', Array.from(formData.entries()));
        this.$http.secured.post("/api/v1/warehouse/dispatch/update_dispatch_details", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            // console.log('Response:', response.data);
            // alert("hello");
            if (response.data) {
              this.okconfirmpopup = true;
              this.message = response.data.message;
              this.createUpdateDispatchDetails = false;
              this.loading = false;

            } else {
              this.ErroeMsg = response.data.error;
              // this.createUpdateDispatchDetails = false;
              this.loading = false;
              this.number = 0;
              this.$toast.error(this.ErroeMsg);
              // this.showAlert("error", errorMsg);
            }
          })
          .catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error)
          })
      },

      // After Assignment of the assignee click confirm method in request tracker
      changeAssignConfirm() {
        this.number++;
        const formData = new FormData();
        this.$http.secured.post("/api/v1/warehouse/put_requests/update_assignee", {
          "request_ids": this.inv_id,
          "assignee_ids": this.change_assignment
        },)
          .then(response => {
            if (response.data) {
              this.changeAssignmentPopup = false
              this.selected = []
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
                this.requestTracListSelected = false;
              }
              this.showAlert("success", "Successfully updated");
              this.loadData(this.active_tab);
            } else {
              // this.showAlert("error", "No Data Found");
              this.number = 0;
              this.$toast.error("No Data Found");
            }
          }).catch(error => {
            this.number = 0;
            // this.showAlert("error", "Something went wrong from Network");
            this.$toast.error(error.response.data.error)
            this.loading = false;
          });
      },

      // change assesment in edit request inside Request-tracker tab
      changeAssignmentEditFunc() {
        this.number = 0;
        this.changeAssignmentEditPopup = true
        var dc = this.selected.map(x => x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        var dato = unique_array[0];
        this.dc_id = dato.toString()
        this.$http.secured
          .get("/api/v1/warehouse/put_requests/location_users", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              this.change_assignment_edit_items = response.data.users;
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

      // Assigning Dispositions menu in Pending Disposition Screen
      assignDispositionList() {
        this.$http.secured
          .get("/api/v1/warehouse/dispatch/get_dispositions")
          .then(response => {
            if (response.data) {
              this.assign_disposition_list = response.data.dispositions;
              // this.makeLoadingFalse();
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

      // post method to send disposition after selecting
      assignDisposition(item) {
        this.selectedDisposition = item.id;
        this.dispatch_id = this.selected.map(warehouse_order_items => warehouse_order_items.id)
        const dispatchDetails = {
          "ids": this.dispatch_id,
          "disposition": this.selectedDisposition,
        }
        this.$http.secured
          .post("/api/v1/warehouse/dispatch/set_disposition", dispatchDetails)
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.okconfirmpopup = true,
                this.selectedDisposition = "",
                this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          })
      },

      updateSubLocationDialog() {
        if (this.selected.length <= 0) {
          this.showAlert('warning', 'Please Select Item First')
          return
        }

        var dc = this.selected.map(x => x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        // if (unique_array.length > 1){
        //   this.selected = []
        //   var input = document.querySelectorAll('.checkbox');
        //   for (var i = 0; i < input.length; i++) {
        //     input[i].checked = false;
        //     this.openListSelected = false;
        //   }
        //   this.showAlert("error", "Please select the items from the same Location!");
        //   return
        // }
        this.updateSubLocation = true;
        this.number = 0;
        this.sub_location = '';
        var dato = unique_array[0];
        this.dc_id = dato.toString()
        this.inv_id = this.selected.map(inventory => inventory.id);
        this.$http.secured
          .get("/api/v1/warehouse/put_away/sub_locations", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              this.update_sub_location = response.data.sub_locations;
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


      //  Update sub-location submit in not-found-items tab
      updateSubLocSubmit() {
        this.number++;
        const formData = new FormData();
        this.$http.secured.put("/api/v1/warehouse/dispatch/update_sub_location", {
          "ids": this.inv_id,
          "sub_location_id": this.sub_location
        },)
          .then(response => {
            if (response.data) {
              this.updateSubLocation = false
              this.okconfirmpopup = true
              this.selected = []
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
              }
              this.showAlert("success", "Successfully updated");
              this.loadData(this.active_tab);
            } else {
              // this.showAlert("error", "No Data Found");
              this.number = 0;
              this.$toast.error("No Data Found");
            }
          }).catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error);
            // this.showAlert("error", "Something went wrong from Network");
            this.loading = false;

          });

      },

      // WriteOffItem function
      // writeOffItem(){
      //      var dc = this.selected.map(x => x.distribution_center_id)
      // const unique = (value, index, self) => {
      //   return self.indexOf(value) === index
      // }
      // dc = dc.filter(function (element) {
      //   return element !== undefined;
      // });

      // var unique_array = dc.filter(unique)
      // if (unique_array.length > 1) {
      //   this.selected = []
      //   var input = document.querySelectorAll('.checkbox');
      //   for (var i = 0; i < input.length; i++) {
      //     input[i].checked = false;
      //     this.inwardSelected = false;
      //   }
      //   this.showAlert("error", "Please select the items from the same Location!");
      //   return
      // }
      // this.writeOffItemDialog = true;
      // this.selected_headers = [
      //   {
      //     text: "Tag/BoxID",
      //     value: "tag_number",
      //     align: "start",
      //     sortable: false,
      //     width: "12%"
      //   },
      //   { text: "Last Sub-Location", value: "sub_location" },
      //   { text: "Category", value: "category" },
      //   { text: "Article ID", value: "sku_code" },
      //   { text: "Article Description", value: "item_description" },
      // ];
      // this.selected_table_data = this.selected;
      // this.inv_id = this.selected.map(inventory => inventory.id);
      // var dato = unique_array[0];
      // this.dc_id = dato.toString()
      // },

      // Raise Debit Note Popup
      raiseDebitNote() {
        this.number = 0;
        this.raiseDebitNotePopup = true;
      },
      // close success popup
      closemsg() {
        this.assignExecutivePopup_2 = false;
        this.successDialogInward = false;
        this.createPendingpackaging = false;
        this.assignTo = '';
        this.loadData(this.active_tab);
      },
      // Raise-debit-note submit function Api call
      raiseDebitNoteSubmit() {
        this.number++;
        var dc = this.selected.map(x => x.id)
        const formData = new FormData();
        formData.append("raised_against", this.raise_note_against)
        formData.append("debit_amount", this.debit_amount)
        this.$http.secured
          .put("/api/v1/warehouse/dispatch/" + dc + "/write_off", formData)
          .then(response => {
            if (response.data) {
              this.update_sub_location_open = response.data.sub_locations;
              this.loading = false;
              this.raiseDebitNotePopup = false;
              this.raise_note_against = "";
              this.debit_amount = "";
              this.showAlert("success", "Successfully updated");
              this.loadData(this.active_tab);
            } else {
              this.loading = false;
              this.number = 0;
              this.$toast.error("No Data Found");
              // this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error)
            this.loading = false;
          });
      },

      //  after click ok load the table data
      afterClickOkLoadData() {
        this.okconfirmpopup = false;
        this.loadData(this.active_tab);
      },


      Loadfilterdata() {
        this.$http.secured
          .get('/api/v1/warehouse/dispatch/get_filters_data')
          .then(response => {
            if (response.data) {
              this.pickup_request_status = response.data.request_statuses;
              this.packaging_request_status = response.data.request_statuses;
              // this.makeLoadingFalse();
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.$toast.error(error.response.data.error)
            this.loading = false;
          })
      },



      // Apply Filters Function
      applyFilterFunc() {

        this.dispatch_search = '';
        const params = new URLSearchParams();

        const pageparams = this.getRequestParams(
          this.page = 1,
          this.pageSize
        );
        params.append('page', pageparams['page'])
        params.append('per_page', pageparams['size'])
        if (this.active_tab == "Pending Pick-Up") {
          const selectedStatusIds = this.filterPickupRequestStatus.id || "";
          if (selectedStatusIds !== undefined) {
            params.append('request_status', selectedStatusIds);
          }
          params.append('lot_name', this.lot_name_search);
          params.append('outward_reason_ref_order', this.outward_reason_ref_search);
          params.append('destination_type', this.destination_type_search);
          params.append('request_status', selectedStatusIds);
          params.append('tab', 'pending_pickup');
          this.$http.secured
            .get('/api/v1/warehouse/dispatch/fetch_orders', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.warehouse_order_items
                this.totalPages = response.data.meta.total_pages
                this.filteWithSubPopup = false;
                this.lot_name = '';
                this.outward_reason_ref = '';
                this.destination_type = '';
                this.filterPickupRequestStatus = '';
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
        } else
          if (this.active_tab == "Pending Packaging") {
            const selectedStatusIds = this.filterPackagingRequestStatus.id || "";
            params.append('lot_name', this.lot_name_search);
            params.append('outward_reason_ref_order', this.outward_reason_ref_search);
            params.append('destination_type', this.destination_type_search);
            params.append('request_status', selectedStatusIds);
            params.append('tab', 'pending_packaging');
            this.$http.secured
              .get('/api/v1/warehouse/dispatch/fetch_orders', { params })
              .then(response => {
                if (response.data) {
                  this.table_data = response.data.warehouse_order_items
                  this.totalPages = response.data.meta.total_pages
                  this.filteWithSubPopup = false;
                  this.lot_name = '';
                  this.outward_reason_ref = '';
                  this.destination_type = '';
                  this.filterPackagingRequestStatus = '';
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
          } else
            if (this.active_tab == "Pending Dispatch") {
              const selectedStatusIds = this.destination_items.id || "";
              params.append('box_number', this.box_id_search);
              params.append('outward_reason_ref_order', this.outward_reason_ref_search);
              params.append('destination_type', this.destination_type_search);
              params.append('destination', this.destination_items);
              params.append('tab', 'pending_dispatch');
              this.$http.secured
                .get('/api/v1/warehouse/dispatch/dispatch_boxes', { params })
                .then(response => {
                  if (response.data) {
                    this.table_data = response.data.dispatch_boxes
                    this.totalPages = response.data.meta.total_pages
                    this.filteWithSubPopup = false;
                    this.lot_name = '';
                    this.outward_reason_ref = '';
                    this.destination_type = '';
                    this.filterPickupRequestStatus = '';
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
            } else
              if (this.active_tab == "Request Tracker") {
                const requestTypeIds = this.request_type_search.id || "";
                const statusids = this.status_search.id || "";
                params.append('dispatch_requests', true);
                params.append('request_type', requestTypeIds);
                params.append('status', statusids);


                this.$http.secured
                  .get('/api/v1/warehouse/put_requests', { params })
                  .then(response => {
                    if (response.data) {
                      this.table_data = response.data.put_requests
                      this.totalPages = response.data.meta.total_pages
                      this.filteWithSubPopup = false;
                      this.request_type_search = '';
                      this.status_search = '';
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
              } else
                if (this.active_tab == "Pending Disposition") {
                  const rejectSearchIds = this.reason_for_reject_search.id || ""
                  params.append('tab', 'pending_disposition');
                  params.append('sku_code', this.article_id_search);
                  params.append('reject_reason', rejectSearchIds);

                  this.$http.secured
                    .get('/api/v1/warehouse/dispatch/fetch_orders', { params })
                    .then(response => {
                      if (response.data) {
                        this.table_data = response.data.warehouse_order_items
                        this.totalPages = response.data.meta.total_pages
                        this.filteWithSubPopup = false;
                        this.reason_for_reject_search = '';
                        this.article_id_search = '';
                        this.rejectSearchIds = '';
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
                } else
                  if (this.active_tab == "Not Found Items") {
                    params.append('tab', 'not_found_items')
                    params.append('sku_code', this.article_id_notfound_search);
                    params.append('category', JSON.stringify(this.category_search.map(item => item.key)));

                    this.$http.secured
                      .get('/api/v1/warehouse/dispatch/fetch_orders', { params })
                      .then(response => {
                        if (response.data) {
                          this.table_data = response.data.warehouse_order_items
                          this.totalPages = response.data.meta.total_pages
                          this.filteWithSubPopup = false;
                          this.article_id_notfound_search = '';
                          this.category_search = [];
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
                  }
      },

      assignExecutiveFnc() {
        this.number = 0;
        this.assignExecutivePopup = true;
        this.request_type = 'packaging'
        this.assignee_ids = ''
        // this.requestReason = ''
        this.assignTo = null;
        var dc = this.selected.map(x => x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        var dato = unique_array[0];
        this.dc_id = dato.toString()
        this.$http.secured
          .get("/api/v1/warehouse/put_requests/location_users", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              this.request_type = response.data.put_request;
              this.assignee_ids = response.data.users
              this.$nextTick(() => {
                if (this.request_type === 'packaging') {
                  // this.requestReason = ''
                  this.assignTo = ''
                  this.assignExecutivePopup = true;
                }
              }),
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
      assignExecutiveSubmit() {
        this.number++;
        const formData = new FormData();

        this.$http.secured.post("api/v1/warehouse/dispatch/create_pick_up_request", {
          put_request:
          {
            "request_type": "packaging",
            "distribution_center_id": this.dc_id,
            "pick_up_reason": "packaging",
            "assignee_ids": this.assignTo,
            "inventory_ids": this.inv_id,
            "sub_location": this.sub_location
          }
        },)
          .then(response => {
            if (response.data) {
              this.selctedItemsPopup = false;
              this.assignExecutivePopup = false;
              this.temp_selectedData = this.selected;
              this.selected = []
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
                this.inwardSelected = false;
              }
              this.successDialogInward = true;
              this.returnId = response.data.put_request.request_id;
              this.successMsg = response.data.message;
              this.loadData(this.active_tab);
              this.showAlert("success", "Successfully request created");
              this.loadData(this.active_tab);
            } else {
              // this.assignExecutivePopup = false
              this.number = 0;
              this.$toast.error("No Data Found");
              // this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.number = 0;
            // this.showAlert("error", "Something went wrong from Network");
            this.$toast.error(error.response.data.error)
            this.loading = false;
          });
      },
      assignExecutiveSubmit_2() {
        this.number++;
        const formData = new FormData();

        this.$http.secured.post("/api/v1/warehouse/dispatch/create_packaging_request", {
          put_request:
          {
            "request_type": "packaging",
            "distribution_center_id": this.dc_id,
            "pick_up_reason": "packaging",
            "assignee_ids": this.assignTo,
            "inventory_ids": this.inv_id,
            "sub_location": this.sub_location
          }
        },)
          .then(response => {
            if (response.data) {
              this.selctedItemsPopup = false;
              this.assignExecutivePopup = false;
              this.temp_selectedData = this.selected;
              this.selected = []
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
                this.inwardSelected = false;
              }
              this.successDialogInward = true;
              this.returnId = response.data.put_request.request_id;
              this.successMsg = response.data.message;
              this.loadData(this.active_tab);
              this.showAlert("success", "Successfully request created");
              this.loadData(this.active_tab);
            } else {
              // this.assignExecutivePopup = false
              this.number = 0;
              this.$toast.error("No Data Found");
              // this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.number = 0;
            this.$toast.error(error.response.data.error);
            // this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
          });
      },
      showErrorPopup(errorMessage) {
        this.errorDialog = true;
        this.errorMsg = errorMessage;
      },
      openDataDetails(item, tab) {
        this.detailDataPopup = true;
        if (tab == 'requestTracker') {
          this.reqst_Id = item.request_id;
          this.rqustType = item.request_type;
          this.distribCenter = item.distribution_center;
          this.assignedTo = item.assignee_name;
          this.status1 = item.status;
        }
        else {
          this.bx_Id = item.box_number;
          this.orrdNumber = item.orrd;
          this.destType = item.destination_type;
          this.dest = item.destination;
        }
      },
      createUpdateDetails() {
        this.destination_type = this.selected[0].destination_type
        this.destination = this.selected[0].destination
        const ord_list = this.selected.map(item => item.orrd)
        const temp_var = Array.from(new Set(ord_list));
        if (temp_var.length > 1) {
          this.showAlert("warning", "ORRD should be same for selected boxes!");
          this.selected = []
          return;
        } else {
          this.outwordReferenceDocument = this.selected[0].or_document;
          this.intial_value = this.outwordReferenceDocument;
        }
        // this.outward_ref_item = '';
        // this.outward_ref_value = '';
        // this.mode_items = '';
        // this.outwordReferenceDocument = '';
        this.showError = false;
        this.mode = '';
        this.logisticPartner = '';
        this.value_number = '';
        this.dispatch_document_number = '';
        this.file = '';
        this.tags = [{ reject_reason: '', tag_ids: [] }],
          this.temp_cancelled_tag = this.tags;
        this.createUpdateDispatchDetails = true;
        this.number = 0;
        this.submittedTags = [];
        this.fields = [{ outward_ref_value: '' }];
      },
      fetchDocumentRefernce() {
        this.$http.secured
          .get("/api/v1/warehouse/dispatch/get_filters_data")
          .then(response => {
            if (response.data) {
              this.outward_ref_item = response.data.outward_ref_documents;
              this.mode_items = response.data.modes;
              this.logistic_partner_items = response.data.logistic_partners;
              // this.loading = false;
            } else {
              // this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            // this.loading = false;
          });
      },
      assignExecutiveFnc_2() {
        this.number = 0;
        this.assignExecutivePopup_2 = true;
        this.assignee_ids = '';
        this.assignTo = null;
        var dc = this.selected.map(x => x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        var dato = unique_array[0];
        this.dc_id = dato.toString()
        this.$http.secured
          .get("/api/v1/warehouse/put_requests/location_users", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              this.assignee_ids = response.data.users
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
      createRequestPopup() {
        var dc = this.selected.map(x => x.distribution_center_id)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        // if (unique_array.length > 1) {
        //   this.selected = []
        //   var input = document.querySelectorAll('.checkbox');
        //   for (var i = 0; i < input.length; i++) {
        //     input[i].checked = false;
        //     this.inwardSelected = false;
        //   }
        //   this.showAlert("error", "Please select the items from the same Location!");
        //   return
        // }

        const centerId = this.selected.map(item => item.distribution_center_id)
        const centerList = Array.from(new Set(centerId));
        if (centerList.length > 1) {
          this.showAlert("warning", "Please select the items from same location!");
          this.selected = []
          return;
        }
        var hasBlankSubLocation = this.selected.some(item => !item.sub_location);
        if (hasBlankSubLocation) {
          this.showAlert("error", "sub location can't be blank");
          this.selected = []
          return;
        }
        var hasPendingRequest = this.selected.some(item => item.pickup_request_status === "Pending");
        if (hasPendingRequest) {
          this.showAlert("warning", "Request already Created");
          this.selected = []
          return;
        }
        const dest_list = this.selected.map(x => x.destination_type);
        const temp_var = Array.from(new Set(dest_list));
        if (temp_var.length > 1) {
          this.showAlert("warning", "Please select the items from the same Destination Type!");
          this.selected = []
          return;
        }

        const orrdList = this.selected.map(x => x.outward_reason_ref_order);
        const temp_orrd = Array.from(new Set(orrdList));
        if (temp_orrd.length > 1) {
          this.showAlert("warning", "Please select the items from the same Outward Reason Ref Order!");
          this.selected = []
          return;
        }
        this.selctedItemsPopup = true;
        this.selected_headers = [
          { text: "Tag ID", value: "tag_number", align: "start", sortable: false, width: "12%" },
          { text: "Lot ID", value: "lot_id" },
          { text: "Lot Name", value: "lot_name" },
          { text: "Outward Reason Ref Order", value: "outward_reason_ref_order" },
          { text: "Destination Type", value: "destination_type" },
          { text: "Pick Up Request Status", value: "pickup_request_status" },
          { text: 'Delete', value: 'action' }
        ];
        this.selected_table_data = this.selected;
        this.inv_id = this.selected.map(inventory => inventory.id);
        var dato = unique_array[0];
        this.dc_id = dato.toString()
      },
      createPickuppopup() {
        var hasBlankSubLocation = this.selected.some(item => !item.sub_location);
        if (hasBlankSubLocation) {
          this.showAlert("error", "sub location can't be blank");
          this.selected = []
          return;
        }
        var hasPendingRequest = this.selected.some(item => item.pickup_request_status === "Pending");
        if (hasPendingRequest) {
          this.showAlert("warning", "Request already Created");
          this.selected = []
          return;
        }
        const orrdList = this.selected.map(x => x.outward_reason_ref_order);
        const temp_orrd = Array.from(new Set(orrdList));
        if (temp_orrd.length > 1) {
          this.showAlert("warning", "Please select the items from the same Outward Reason Ref Order!");
          this.selected = []
          return;
        }
        const centerId = this.selected.map(item => item.distribution_center_id)
        const temp_var = Array.from(new Set(centerId));
        if (temp_var.length > 1) {
          this.showAlert("warning", "Please select the items from same location!");
          this.selected = []
          return;
        }
        this.createPendingpackaging = true;
        this.selected_headers = [
          { text: "Tag ID", value: "tag_number", align: "start", sortable: false, width: "12%" },
          { text: "Lot ID", value: "lot_id" },
          { text: "Lot Name", value: "lot_name" },
          { text: "Outward Reason Ref Order", value: "outward_reason_ref_order" },
          { text: "Destination Type", value: "destination_type" },
          { text: "Packaging Request Status", value: "pickup_request_status" },
          { text: 'Delete', value: 'action' }
        ];
        this.selected_table_data = this.selected;
        this.inv_id = this.selected.map(inventory => inventory.id);
        var dato = unique_array[0];
        this.dc_id = dato.toString()
      },
      showAlert(alert_type, alert_message) {
        this.scrollToTop();
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },
      linkPopupInReqTracker(item) {
        this.datadetailpopupdisposition = true;
        this.tag_number = String(item.tag_number);
        this.sku_master_code = String(item.sku_master_code);
        this.item_description = String(item.item_description);
        this.lot_id = String(item.lot_id);
        this.lot_name = String(item.lot_name);
        this.destination_type = String(item.destination_type);
        this.outward_reason_ref_order = String(item.outward_reason_ref_order);
        this.pickup_request_status = String(item.pickup_request_status);
        this.sub_location = String(item.sub_location);
      },
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'Pending Pick-Up') { this.PendingPickUP(); }
        else if (this.active_tab == 'Pending Packaging') { this.PendingPackaging(); }
        else if (this.active_tab == 'Pending Dispatch') { this.PendingDispatch(); }
        else if (this.active_tab == 'Request Tracker') { this.fetchRequestTracker(); }
        else if (this.active_tab == 'Pending Disposition') { this.fetchPendingDisposition(); }
        else if (this.active_tab == 'Not Found Items') { this.fetchNotFoundItems(); }
      },
      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Pending Pick-Up') { this.PendingPickUP(); }
        else if (this.active_tab == 'Pending Packaging') { this.PendingPackaging(); }
        else if (this.active_tab == 'Pending Dispatch') { this.PendingDispatch(); }
        else if (this.active_tab == 'Request Tracker') { this.fetchRequestTracker(); }
        else if (this.active_tab == 'Pending Disposition') { this.fetchPendingDisposition(); }
        else if (this.active_tab == 'Not Found Items') { this.fetchNotFoundItems(); }
      },
      // pagination params
      getRequestParams(page, pageSize) {
        let params = {};
        if (page) {
          params["page"] = page;
        }
        if (pageSize) {
          params["size"] = pageSize;
        }
        return params;
      },

      selectAll() {
        if (this.active_tab == 'Request Tracker') {
          this.change_assignment = this.change_assignment_items.map((user) => user.id);
        }
      },
      selectAllEditItem() {
        this.change_assignment_item_edit = this.change_assignment_edit_items.map((user) => user.id);
      },

      //  cancel request in Request-tracker tab
      cancelRequestDialogOpen() {
        this.cancelRequestPopup = true;
      },

      //  cancel request sublit in Request-tracker tab
      cancelRequestSubmit() {
        this.$http.secured.post("api/v1/warehouse/put_requests/cancel_request", {

          "request_ids": this.selected.map(x => x.id)

        })
          .then(response => {
            if (response.data) {
              this.cancelRequestPopup = false;
              this.cancelSuccesPopup = true;
              this.temp_selectedData = this.selected;
              var input = document.querySelectorAll('.checkbox');
              for (var i = 0; i < input.length; i++) {
                input[i].checked = false;
                this.requestTracListSelected = false;
              }
              this.showAlert("success", "Requests cancelled successfully");
              this.loadData(this.active_tab);
              this.active_tab == 'Request Tracker'
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
          });
      },

      addMoreItems() {
        this.writeOffItemDialog = false;
      },

      // Delete in Edit Request in Request-tracker
      // deleteReqTracker(){
      //   this.selected.forEach(item => {
      //   const index = this.edit_req_table_data.indexOf(item);
      //   if (index !== -1) {
      //     this.edit_req_table_data.splice(index, 1);
      //   }
      // });
      // this.selected = [];
      // },

      deleteEvenTrack(item) {
        const index = this.edit_req_table_data.indexOf(item);
        if (index !== -1) {
          this.edit_req_table_data.splice(index, 1);
        }
      },

      deleteEvent(item) {
        if (this.active_tab == 'Pending Pick-Up') {
          const index = this.selected_table_data.indexOf(item);
          this.selected_table_data.splice(index, 1);
          this.inv_id = this.selected_table_data.map(x => x.id)
          if (this.selected_table_data.length == 0) {
            this.selected_table_data = []
            this.selctedItemsPopup = false;
            this.loadData(this.active_tab)
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.selctedItemsPopup = false;
            }
          }
        } else if (this.active_tab == 'Pending Packaging') {
          const index = this.selected_table_data.indexOf(item);
          this.selected_table_data.splice(index, 1);
          this.inv_id = this.selected_table_data.map(x => x.id)
          if (this.selected_table_data.length == 0) {
            this.selected_table_data = []
            this.createPendingpackaging = false;
            this.loadData(this.active_tab)
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.createPendingpackaging = false;
            }
          }
        } else if (this.active_tab == 'Not Found Items') {
          const index = this.selected_table_data.indexOf(item);
          this.selected_table_data.splice(index, 1);
          this.inv_id = this.selected_table_data.map(x => x.id)
          if (this.selected_table_data.length == 0) {
            this.selected_table_data = []
            this.writeOffItemDialog = false;
            this.loadData(this.active_tab)
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.writeOffItemDialog = false;
            }
          }
        }

      },

      // closing debit note function
      raiseDebitNoteClose() {
        this.raise_note_against = "";
        this.debit_amount = "";
      },

      // filter popup clear fields when closed
      filterPopupClose() {
        this.request_type_search = '';
        this.status_search = '';
      },

      // close popup of update-dispatch-details in pending dispatch
      closeUpdateDispatchDetails() {
        this.createUpdateDispatchDetails = false;
        this.outwordReferenceDocument = [];
        this.field.outward_ref_value = '';
        this.mode = [];
        this.logisticPartner = '';
        this.value_number = [];
        this.dispatch_document_number = [];
        this.file = '';
      },
      updateOtherDetail() {
        this.logisticPartner = '';
        this.value_number = '';
        this.dispatch_document_number = '';
      },


    }
  }
</script>
<style>
  .v-dialog__content:has(.filter-dispatch) {
    justify-content: right;
    align-items: baseline;
    top: var(--dialog-ypos);
  }

  .v-dialog>.v-card>:has(.v-card__title) {
    overflow-wrap: break-word !important;
  }

  .custom-control_outlined .v-expansion-panel:before {
    box-shadow: none;
  }

  .custom-control_outlined button {
    min-height: 56px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, .42);
    border-style: solid;
  }

  .custom-control_outlined button:focus {
    outline: none;
  }

  .select-all-link {
    color: #1561B1;
    margin-top: -17px;
    margin-left: 233px;
  }

  .margin-right {
    margin-right: 0;
  }

  .field-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .text_color {
    color: #83a2ff;
    text-decoration: underline;
  }

  .selected_rule_box {
    display: flex;
    flex-wrap: wrap;
  }

  .rule-type_option {
    border: 1px solid #000000;
    padding: 4px 8px;
    border-radius: 5px;
    margin: 1px 2px;
  }
  .item-selected {
    margin-top: 23px;
    position: absolute;
    left: 41%;
  }

  @media (max-height: 1104px) {
    .PaddingItemPerPage {
      padding: 8px !important;
    }
  }

  @media (min-height: 1126px) {
    .PaddingItemPerPage {
      padding: 24px !important;
    }
  }
</style>