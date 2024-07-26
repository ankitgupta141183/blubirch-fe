<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>

    <v-row justify="center">
      <v-dialog v-model="selctedItemsPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="v-card-100">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Selected {{ selected_table_data.length }} Items</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="assignExecutiveFnc">ASSIGN EXECUTIVE</v-btn>
              <v-btn class="ml-2 blue--text" color="white" small  @click="addMoreItems">ADD MORE ITEMS</v-btn>
              <v-btn class="ml-2 red--text" color="white" small @click="deleteRequest">DELETE REQUEST</v-btn>
              <v-btn icon dark @click="selctedItemsPopup = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table :dense="true" :search="search" v-model="selected" :headers="selected_headers"
                  :items="selected_table_data" :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template v-slot:item.action="{ item }">
                    <img @click="deleteEvent(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                  </template>
                  <template v-slot:item.sub_location="{item}">
                    <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Create request popup -->
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
                <v-autocomplete 
                   v-model="requestReason" 
                   outlined 
                   :items="request_reason" 
                   item-text="name" 
                   item-value="id"
                   label="Request Reason" 
                   style="max-width: 300px;"
                   ></v-autocomplete> <br>
                <v-autocomplete 
                  v-model="assignTo"
                  outlined 
                  :items="inward_users" 
                  item-text="username" 
                  item-value="id"
                  label="Assign To" 
                  style="max-width: 300px;"
                  multiple
                  chips
                  clearable
                  ></v-autocomplete>
                  <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u>                    
                  <!-- <div v-if="assignData.length > 0">
                    <div class="selected_rule_box">
                      <span v-for="itemId in assignData" :key="itemId" class="rule-type_option">
                        {{ getItemName(itemId) }}
                        <v-icon small @click="removeItem(itemId)">mdi-close</v-icon>
                      </span>
                    </div>
                  </div> -->
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions  class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="assignExecutivePopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="assignExecutiveSubmit"
              :disabled="number > 0 || !assignTo || !requestReason">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Update sublocation popup -->
    <v-row justify="center">
      <v-dialog v-model="updateSubLocationReq" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Sub Location</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="updateSubLocationReq = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="sub_lcation_inward" outlined :items="update_sub_location" item-text="code"
                  item-value="id" label="Select Location" style="max-width: 300px;"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="updateSubLocationReq = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="updateSubLocSubmit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Selected items popup in open-putaway -->
    <v-row justify="center">
      <v-dialog v-model="selctedItemsOpenPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="v-card-100">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Selected {{ selected_table_data_open.length }} Items</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="assignExecutiveFncInOpen">ASSIGN EXECUTIVE</v-btn>
              <v-btn class="blue--text" color="white" small @click="addMoreItemsOpenTab">ADD MORE ITEMS</v-btn>
              <v-btn class="red--text" color="white" small @click="deleteRequestOpen">DELETE REQUEST</v-btn>
              <v-btn icon dark @click="selctedItemsOpenPopup = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table :dense="true" :search="search" v-model="selected" :headers="selected_headers_open"
                :items="selected_table_data_open" :loading="loading" loading-text="Loading Data... Please wait"
                class="elevation-1">
                <template v-slot:item.action="{ item }">
                  <img @click="deleteEvent(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                </template>
              </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Create request popup in open-putaway tab -->
    <v-row justify="center">
      <v-dialog v-model="assignExecutivePopupInOPen" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Create Request</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="assignExecutivePopupInOPen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete 
                   v-model="requestReasonOpen" 
                   outlined 
                   :items="request_reason_open" 
                   item-text="name"
                   item-value="id" 
                   label="Request Reason" 
                   style="max-width: 300px;"
                   ></v-autocomplete> <br>
                <v-autocomplete 
                   v-model="assignToOpen" 
                   outlined 
                   :items="inward_users_open" 
                   item-text="username"
                  item-value="id" 
                  label="Assign To" 
                  style="max-width:300px;"
                  multiple
                  chips
                  clearable
                  ></v-autocomplete>
                  <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u>                    
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="assignExecutivePopupInOPen = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="assignExecuOpenSubmit"
              :disabled="number > 0 || !assignToOpen || !requestReasonOpen">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Update sublocation popup in open-putaway tab -->
    <v-row justify="center">
      <v-dialog v-model="updateSubLocationReqOpenTab" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Sub Location</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="updateSubLocationReqOpenTab = false">
                <v-icon>mdi-close</v-icon>
             </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="updateSubLocOpen" outlined :items="update_sub_location_open" item-text="code"
                  item-value="id" label="Select Location" style="max-width: 300px;"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="updateSubLocationReqOpenTab = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="updateSubLocSubmitOpen">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-putaway" v-model="filteWithSubPopup" persistent max-width="936px">
        <v-card>
          <v-card-actions>
            <v-combobox  v-if="active_tab != 'Request Tracker'" prepend-inner-icon="mdi-magnify" clearable v-model="filterCategory" :items="category_filter" item-text="value"
              item-value="value" label="Category" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>
            <v-combobox v-if="active_tab != 'Request Tracker'" prepend-inner-icon="mdi-magnify" clearable v-model="filterGrade" :items="grade_filter" item-text="value" item-value="value" label="Grade" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>
            <v-combobox v-if="active_tab != 'Request Tracker'" prepend-inner-icon="mdi-magnify" clearable v-model="filterBrand" :items="brand_filter" item-text="value" item-value="value" label="Brand" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>
              <v-autocomplete  v-if="active_tab == 'Request Tracker'" prepend-inner-icon="mdi-magnify" clearable v-model="filterRequestType" :items="filter_request_type" item-text="name" item-value="value" label="Request Type"  outlined class="ma-2"
              ></v-autocomplete>
              <v-autocomplete v-if="active_tab == 'Request Tracker'" prepend-inner-icon="mdi-magnify" clearable v-model="filterStatus" :items="filter_status" item-text="name" item-value="value" label="status"  outlined class="ma-2"
              ></v-autocomplete>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="filteWithSubPopup = false">CANCEL</v-btn>
            <v-btn small color="primary" class="mb-3" @click="applyFilterFunc" :disabled="number > 0">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- write off item selected items popup -->
    <!-- <v-row justify="center">
      <v-dialog v-model="selctedItemsPopInNF" persistent max-width="1000px">
        <v-card class="v-card-100">         
          <v-toolbar dark color="primary">
          <v-toolbar-title>Selected {{selected.length}} Items</v-toolbar-title>
          <v-spacer></v-spacer> 
          <v-card-actions>
            <v-btn
                  class="mr-2 btn-color-text"
                 color="#FFFFFF"
                 @click="dialogWriteOffItem"
                >RAISE DEBIT NOTE</v-btn>
                <v-btn
                class="mr-2 btn-color-text"
                 color="#FFFFFF"
                 @click="addMoreItems"
                >ADD MORE ITEMS</v-btn>
                <v-btn
                  class="mr-2 btn-color-red"
                 color="#FFFFFF"
                 @click="deleteRequest"
                >DELETE All</v-btn>
            <v-btn icon dark @click="selctedItemsPopInNF = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>         
        </v-toolbar>
        <v-layout column>
          <v-flex md6 style="overflow: auto"> 
              <v-data-table
                :dense="true"
                :search="search"
                v-model="selected"
                :headers="selected_headers_NFI"
                :items="selected_table_data_NFI"
                :loading="loading"
                loading-text="Loading Data... Please wait"
                class="elevation-1"
              >
              <template v-slot:item.action="{ item }">
                <img @click="deleteEvent(index)" src="@/assets/images/delete_red.png"
                  title="Delete item" />
              </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row> -->

    <!-- Write off items popup  -->
    <v-row justify="center">
      <v-dialog v-model="writeOffItemsPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Write Off Items</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="writeOffItemsPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field  hide-details label="Raise Note Against" outlined
                      v-model="raise_note_against" type="text" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Debit Amount" outlined v-model="debit_amount" :min="0" oninput="validity.valid||(value='');"
                      type="number" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="btn-cancel mr-2 mb-3" small @click="writeOffItemsPopup = false">Cancel</v-btn>
            <!-- <v-btn outlined class="submit-color mb-3" @click="writeOffItemSubmit" :disabled=" number >0 || !raise_note_against || !debit_amount">submit</v-btn> -->
            <v-btn color="primary" class="mb-3"  small @click="writeOffItemSubmit"
              :disabled="number > 0 || !raise_note_against || !debit_amount">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Upate sublocation popup in Not Found Item tab -->
    <v-row justify="center">
      <v-dialog v-model="updateSubLocationNFI" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Sub Location</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updateSubLocationNFI = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="updateSubLocNFI" outlined :items="update_sub_location_nfi" item-text="code"
                  item-value="id" label="Select Location" style="max-width: 300px;"></v-autocomplete>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="updateSubLocationNFI = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="updateSubLocSubmitNfi">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- success popup in inward putaway -->
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
          <v-card-title style="margin-top: -13px;">
            <span style="font-size: initial;">{{ successMsg }}</span>
          </v-card-title>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="blue--text" color="white" small @click="successDialogInward = false">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Pick up selected popup -->
    <v-row justify="center">
      <v-dialog v-model="selctedItemsPickup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="v-card-100">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Selected {{ table_data_pickup_sel.length }} Items</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="assignExecutivePickup">ASSIGN EXECUTIVE</v-btn>
              <v-btn class="blue--text" color="white" small @click="addMoreItems">ADD MORE ITEMS</v-btn>
              <v-btn class="red--text" color="white" small @click="deleteRequestPickup">DELETE REQUEST</v-btn>
              <v-btn icon dark @click="selctedItemsPickup = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table :dense="true" :search="search" v-model="selected" :headers="headers_pickup_sel"
                  :items="table_data_pickup_sel" :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template v-slot:item.action="{ item }">
                    <img @click="deleteEvent(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                  </template>
                  <template v-slot:item.sub_location="{item}">
                    <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Create request popup in Pick Up -->
    <v-row justify="center">
      <v-dialog v-model="assignExecutivePopupPickup" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Create Request</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="assignExecutivePopupPickup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete v-model="requestReasonPickup" outlined :items="reason" item-text="name" item-value="id"
                  label="Request Reason" style="max-width: 300px;"></v-autocomplete> <br>
                <v-autocomplete 
                    v-model="assignToPickup" 
                    outlined 
                    :items="users_pickup" 
                    item-text="username"
                    item-value="id" 
                    label="Assign To" 
                    style="max-width: 300px;"
                    multiple
                    chips
                    clearable
                    ></v-autocomplete>
                    <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u>                    
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="assignExecutivePopupPickup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="assignExSubmitPickup"
              :disabled="number > 0 || !assignToPickup || !requestReasonPickup">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Cancel Request Pop up in Request Tracker -->
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
          <v-card-title style="margin-top: -13px;">
            <span>Are you sure you want to cancel requests?</span>
          </v-card-title>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="btn-cancel mr-2 mb-3" small @click="cancelRequestPopup = false">No</v-btn>
            <v-btn color="primary" class="mb-3 mr-5" small @click="cancelRequestSubmit">Yes</v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
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
                <v-autocomplete 
                   v-model="change_assignment" 
                   outlined 
                   :items="change_assignment_items" 
                   item-text="username"
                   item-value="id" 
                   label="Choose the Executive" 
                   style="max-width: 300px;"
                   multiple
                  chips
                  clearable
                  ></v-autocomplete>
                  <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="changeAssignmentPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="changeAssignConfirm"
              :disabled="number > 0 || !change_assignment">Confirm</v-btn>
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
            <v-btn class="blue--text" color="white" small @click="editrequestSave" :disabled="number > 0">SAVE & UPDATE</v-btn>
            <v-btn icon dark @click="editRequestPopup = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </v-toolbar>
        <v-card class="v-card-100">
          <v-toolbar>
            <v-spacer></v-spacer>
            <v-card-actions>

              <v-btn class="blue--text" color="white" small @click="addMoreItemsReqTrack">ADD MORE ITEMS</v-btn>
              <v-btn class="blue--text" color="white" small @click="changeAssignmentEditFunc">CHANGE ASSIGNMENT</v-btn>
              <v-btn class="red--text" color="white" small @click="deleteReqTracker">DELETE REQUEST</v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table 
                  :dense="true" 
                  :search="search" 
                  v-model="selected" 
                  :headers="edit_req_headers"
                  :items="edit_req_table_data" 
                  :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template v-slot:item.action="{ item }">
                    <img @click="deleteEvenTrack(item)" src="@/assets/images/delete_red.png" title="Delete item" />
                  </template>
                  <template v-slot:item.sub_location="{item}">
                    <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>  
            </v-flex>
          </v-layout>
        </v-card>
         
      </v-dialog>
      
    </v-row>
    <!-- change assignment pop in edit assignment -->
    <v-row justify="center">
      <v-dialog v-model="changeAssignmentEditPopup" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Change Assignee</span><br>
              <v-spacer></v-spacer>
              <v-btn icon @click="changeAssignmentEditPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row style="justify-content: center;" class="margin-right">
                <v-autocomplete 
                   v-model="change_assignment_item_edit" 
                   outlined 
                   :items="change_assignment_edit_items" 
                   item-text="username"
                   item-value="id" 
                   label="Choose the Executive" 
                   style="max-width: 300px;"
                   multiple
                  chips
                  clearable
                  ></v-autocomplete>
                  <u><a href="#" class="select-all-link" @click="selectAllForEdid">Select All</a></u>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="margin-10">
            <!-- <v-spacer></v-spacer> -->
            <v-btn small color="primary" class="mb-3" @click="changeAssignmentEditPopup = false"
              :disabled="number > 0 || !change_assignment_item_edit">Ok</v-btn>
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

    <!-- add more items popup in request tracker -->
    <v-row justify="center">
      <v-dialog v-model="addMoreItemsPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary">
          <v-toolbar-title class="alert-link">Selected items {{ this.selected_add.length }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn class="blue--text" color="white" small @click="addButton" :disabled="this.selected_add.length == 0">ADD</v-btn>
            <v-btn icon dark @click="addMoreItemsPopup = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </v-toolbar>
        <v-card class="v-card-100">
          <v-toolbar class="tool_search">         
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="add_item_search" label="Search" style="max-width: 300px; margin-top: 28px;" outlined v-on:keyup.enter="addMoreItemsReqTrack()"></v-text-field>        
          </v-toolbar>
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-3 pr-3">
                <v-data-table 
                  :dense="true" 
                  :search="search" 
                  v-model="selected_add"  
                  show-select
                  :headers="add_items_headers"
                  :items="add_items_table_data" 
                  :loading="loading" 
                  loading-text="Loading Data... Please wait"  
                class="elevation-1"
                >
                <template v-slot:item.sub_location="{item}">
                   <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
                </template>
              </v-data-table>
              </v-list-item-content>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Item Link request popup in request tracker -->
    <v-row justify="center">
      <v-dialog v-model="itemLinkPopup" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary">
          <v-toolbar-title class="alert-link">{{ req_id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn class="blue--text" color="white" small @click="manfSubmit" v-if="reqTrackStatus !== 'Completed'" :disabled="number > 0 || !canMarkAsNotFound">MARK AS NOT FOUND</v-btn>
            <v-btn icon dark @click="itemLinkPopup = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </v-toolbar>
        <v-card class="v-card-100">
          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-list-item-content class="pl-2 pr-2">
                <v-data-table 
                  :dense="true" 
                   show-select
                  :search="search" 
                  v-model="selected_manf" 
                  :headers="edit_req_headers"
                  :items="edit_req_table_data" 
                  :loading="loading" loading-text="Loading Data... Please wait"
                  class="elevation-1">
                  <template v-slot:item.sub_location="{item}">
                    <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
                  </template>
                  <template v-slot:item.status="{item}">
                    <span>{{ item.status ? item.status : "N/A"}}</span>
                  </template>
                </v-data-table>
              </v-list-item-content>  
            </v-flex>
          </v-layout>
        </v-card>
         
      </v-dialog>
      
    </v-row>
   

    <v-card class="v-card-100">
      <v-tabs>
        <v-tab style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')" v-for="(tab, index) in tabs"
          :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title style="padding: 28px;">
      <v-row>
          <v-autocomplete class="mr-4" v-if="active_tab == 'Inward Putaway'" :items="field_item" v-model="field_type" item-value="value" style="max-width: 150px;" item-text="name" label="Select Field" outlined></v-autocomplete >
          <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab != 'Pick Up'" v-model="putaway_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab == 'Pick Up'" v-model="putaway_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="changeDispositon()"></v-text-field>
          <v-spacer></v-spacer> 
        <v-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Inward Putaway'"
          @click="createRequestPopup">CREATE REQUEST</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Inward Putaway'"
          @click="openSubLocationDialog">UPDATE SUB LOCATION</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="isButtonDisabled" v-if="active_tab == 'Open Putaway'"
          @click="openDialogOpenCreateRequest">CREATE REQUEST</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Open Putaway'"
          @click="openSubLocationDialogInOpen">UPDATE SUB LOCATION</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="!requestTracListSelected" v-if="active_tab == 'Request Tracker'"
          @click="editRequestDialog">EDIT REQUEST</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="!requestTracListSelected" v-if="active_tab == 'Request Tracker'"
          @click="cancelRequestDialogOpen">CANCEL REQUEST</v-btn>

        <v-btn class="ma-2" color="primary" v-if="active_tab == 'Request Tracker'" :disabled="!requestTracListSelected"
          @click="changeAssignmentFunc">CHANGE ASSIGNMENT</v-btn>

        <v-btn class="ma-2" color="primary" v-if="active_tab == 'Not Found Items'" :disabled="(this.selected.length == 0)"
          @click="dialogSubLocNfi">UPDATE SUB-LOCATION</v-btn>

        <v-btn class="ma-2" color="primary" v-if="active_tab == 'Not Found Items'" :disabled="(this.selected.length == 0)"
          @click="dialogWriteOffItem">WRITE OFF ITEMS</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="isButtonDisabled" v-if="active_tab == 'Pick Up'"
          @click="dialogSelectedItemPickup">CREATE REQUEST</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pick Up'"
          @click="openSubLocationDialogInOpen">UPDATE SUB LOCATION</v-btn>

      </v-actions>

      <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;" v-if="active_tab != 'Pick Up'">
        <v-expansion-panel outlined @click="filterListOfButtons" >
          <v-expansion-panel-header>Filter
            <template v-slot:actions>
              <v-icon color="primary">
                mdi-menu-down
              </v-icon>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-autocomplete v-model="pickup_disposition" :items="pickup_filter" item-text="key" item-value="value" outlined
        label="Disposition" v-if="active_tab == 'Pick Up'" style="max-width: 300px;"
        @change="changeDispositon"></v-autocomplete>
      </v-row>     

    </v-card-title>
    <v-layout column>

      <v-flex md6 style="overflow: auto">
        <v-data-table 
          :dense="true" 
          :search="search" 
          v-model="selected" 
          show-select
          v-if="active_tab == 'Inward Putaway'"
          disable-pagination 
          :hide-default-footer="true"
          :headers="headers" 
          :items="table_data" 
          :loading="loading" 
          loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template v-slot:item.customcheck="{ item }">
            <input v-if="item.vendor_return_order_id == null" type="checkbox" :value="item" id="item.id"
              @change="assignvalue($event, item)" name="check" style="width: 18px; height: 18px; margin-top: 2px;"
              class="checkbox">
            <!-- <v-checkbox v-if="item.vendor_return_order_id != '' " :value="item" @click = "($event)" hide-details /> -->
          </template>
          <template v-slot:item.sub_location="{item}">
            <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
          </template> 
          <template v-slot:item.rdd_number="{item}">
            <span>{{ item.rdd_number ? item.rdd_number : "N/A"}}</span>
          </template> 
        </v-data-table>
        <!-- Open putaway -->
        <v-data-table :dense="true" :search="search" show-select v-model="selected" v-if="active_tab == 'Open Putaway'"
        disable-pagination :hide-default-footer="true"
          :headers="headers" :items="table_data_open" :loading="loading" loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template v-slot:item.customcheck="{ item }">
            <input v-if="item.vendor_return_order_id == null" type="checkbox" :value="item" id="item.id"
              @change="assignvalue($event, item)" name="check" style="width: 18px; height: 18px; margin-top: 2px;"
              class="checkbox">
            <!-- <v-checkbox v-if="item.vendor_return_order_id != '' " :value="item" @click = "($event)" hide-details /> -->
          </template>
          <template v-slot:item.sub_location="{item}">
          <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
        </template> 
        </v-data-table>
        <!-- not found items -->
        <v-data-table :dense="true" :search="search" show-select v-model="selected" v-if="active_tab == 'Not Found Items'"
        disable-pagination :hide-default-footer="true"
          :headers="headers" :items="table_data_notfound" :loading="loading" loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template v-slot:item.customcheck="{ item }">
            <input v-if="item.vendor_return_order_id == null" type="checkbox" :value="item" id="item.id"
              @change="assignvalue($event, item)" name="check" style="width: 18px; height: 18px; margin-top: 2px;"
              class="checkbox">
            <!-- <v-checkbox v-if="item.vendor_return_order_id != '' " :value="item" @click = "($event)" hide-details /> -->
          </template>
          <template v-slot:item.sub_location="{item}">
          <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
        </template> 
        </v-data-table>
        <!-- Pick up -->
        <v-data-table :dense="true" :search="search" show-select v-model="selected" v-if="active_tab == 'Pick Up'"
          :headers="headers_pickup" :items="table_data_pickup" :loading="loading"
          disable-pagination :hide-default-footer="true"
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template v-slot:item.customcheck="{ item }">
            <input v-if="item.vendor_return_order_id == null" type="checkbox" :value="item" id="item.id"
              @change="assignvalue($event, item)" name="check" style="width: 18px; height: 18px; margin-top: 2px;"
              class="checkbox">
            <!-- <v-checkbox v-if="item.vendor_return_order_id != '' " :value="item" @click = "($event)" hide-details /> -->
          </template>
          <template v-slot:item.sub_location="{item}">
          <span>{{ item.sub_location ? item.sub_location : "N/A"}}</span>
        </template> 
        </v-data-table>
        <!-- Request Tracker -->
        <v-data-table 
            :dense="true" 
            :search="search" 
            v-model="selected" 
            v-if="active_tab == 'Request Tracker'"
            :headers="headers" 
            :items="table_data_request_track" 
            :loading="loading" 
            disable-pagination 
           :hide-default-footer="true"
          loading-text="Loading Data... Please wait" 
          class="elevation-1">
          <template v-slot:item.customcheck="{ item }">
            <input v-if="item.vendor_return_order_id == null" type="checkbox" :value="item" id="item.id"
              @change="assignvalue($event, item)" name="check" style="width: 18px; height: 18px; margin-top: 2px;"
              class="checkbox">
          </template>
          <template v-slot:item.completed_at="{item}">
            <span>{{ item.completed_at ? item.completed_at : "N/A"}}</span>
          </template>
          <template #[`item.request_id`]="{ item }">
              <a @click="linkPopupInReqTracker(item)" style="color: #1976d2;">
                <u> {{ item.request_id }}</u>
              </a>
            
            </template>
        </v-data-table>

      </v-flex>
    </v-layout>
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
import $ from 'jquery'
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      headerText: "Putaway",
      rejectsussesspopup:false,
      rejectsussesspopup:'',
      number: 0,
      tabs: [
        "Inward Putaway",
        "Open Putaway",
        "Pick Up",
        "Request Tracker",
        "Not Found Items"
      ],
      active_tab: "Inward Putaway",
      selected: [],
      selected_add:[],
      search: "",
      putaway_search: "",
      headers: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" },
        {text: "RDD", value: "rdd_number"}
      ],
      add_items_headers:[ 
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" }
       ],
       add_items_table_data:[],
      table_data: [],
      table_data_open: [],
      selected_headers: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" }
      ],
      selected_table_data: [],
      table_data_notfound: [],
      selctedItemsPopup: false,
      loading: true,
      alert: false,
      alert_type: "success",
      alert_message: "success",
      putaway: [],
      selectedPutwayList: '',
      inwardSelected: false,
      openListSelected: false,
      NotfoundListSelected: false,
      assignExecutivePopup: false,
      selctedItemsPopInNF: false,
      pickupaction: false,
      requestReason: '',
      assignTo: [],
      number: '',
      filterButtonPopup: false,
      filterCategory: [],
      filterGrade: [],
      filterBrand: [],
      category_filter: '',
      grade_filter: '',
      brand_filter: '',
      updateSubLocationReq: false,
      selctedItemsOpenPopup: false,
      assignExecutivePopupInOPen: false,
      updateSubLocationReqOpenTab: false,
      filteWithSubPopup: false,
      selected_table_data_open: [],
      dc_id: '',
      inv_id: [],
      update_inv_id:[],
      request_reason: '',
      request_reason_name: '',
      inward_users: '',
      update_sub_location: '',
      sub_lcation_inward: '',
      request_reason_open: '',
      inward_users_open: '',
      assignToOpen: [],
      requestReasonOpen: '',
      update_sub_location_open: '',
      updateSubLocOpen: '',
      currentFilterCategory: '',
      writeOffItemsPopup: false,
      raise_note_against: '',
      debit_amount: '',
      updateSubLocationNFI: false,
      updateSubLocNFI: '',
      update_sub_location_nfi: '',
      successDialogInward: false,
      successMsg: '',
      pickup_disposition: '',
      pickup_filter: '',
      selctedItemsPickup: false,
      assignExecutivePopupPickup: false,
      users_pickup: '',
      request_reason_pickup: '',
      requestReasonPickup: '',
      assignToPickup: [],
      pickupReason: '',
      pickup_reason: '',
      request_Type: '',
      requestType: '',
      reason: '',
      requestTracListSelected: false,
      cancelRequestPopup: false,
      changeAssignmentPopup: false,
      change_assignment: [],
      change_assignment_items: '',
      editRequestPopup: false,
      req_id: '',
      request_sl_id: '',
      table_data_request_track: [],
      assign_user: '',
      addMoreItemsPopup:false,
      add_item_search:'',
      filterStatus:'',
      filterRequestType:'',
      isButtonNeeded: false,
      selected_headers_open: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" }
      ],
      selected_table_data_NFI: [],
      selected_headers_NFI: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" }
      ],
      headers_pickup: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Disposition", value: "disposition" }
      ],
      table_data_pickup: [],
      edit_req_headers: [
        { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" }
      ],
      filter_request_type:[],
      requestTypes: [
        { value: "put_away", name: "Put Away" },
        { value: "pick_up", name: "Pick Up" }
      ],
      filter_status:[],
      trackStatus:[
        { value: "pending", name: "Pending" },
        { value: "in_progress", name: "In Progress" },
        {value: "completed", name:"Completed"}
      ],
      edit_req_table_data: [],
      table_data_pickup_sel: [],
      headers_pickup_sel: [],
      page : 1 ,
      totalPages : 1,
      pageSize :  100,
      pageSizes : [100 , 200, 300],
      field_item: [{name: 'Tag Number', value: "tag_number"}, {name: 'RDD Number', value: "rdd_number"}],
      field_type: '',
      itemLinkPopup: false,
      selected_manf:[],
      assignData:[],
      reqTrackStatus:'',
      change_assignment_edit_items:[],
      changeAssignmentEditPopup:false,
      change_assignment_item_edit:[]
    }
  },
  created() {
    this.loadData('Inward Putaway')
    this.getFilterOption();
  },
  components: {
    HeaderComponent
  },
  computed:{
    canMarkAsNotFound() {
    if (this.selected_manf.length === 0) {
      return false;
    }
    
    for (const item of this.selected_manf) {
      if (item.status !== 'Pending pickup' && item.status !== 'Pending putaway') {
        return false;
      }
    }
    
    return true;
  },
  isButtonDisabled() {
    return this.selected.length === 0 || this.selected.some(item => item.sub_location === null);
  }
  },
  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    isDisabled() {
      return !this.isButtonNeeded;
    },
    getFilterOption(){
      this.$http.secured.get("/api/v1/warehouse/put_away/filters_data")
      .then(response => {
        if(response.status === 200){
          this.category_filter =  response.data.categories
          this.brand_filter = response.data.brands
          this.grade_filter =  response.data.grades   
        }
      })
    },

    loadData(tab, tab_action) {
      if(tab_action){
        this.putaway_search = ''
        this.field_type = ''
        this.sub_location_sequence_search = ''
        this.sub_location_rules_search = ''
      }
      this.selected = [];

      if (this.active_tab != tab) {
        this.active_tab = tab;
        this.putaway_search = '';
        this.page = 1
        this.pageSize  = 100
      }

      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      if (tab == "Inward Putaway") {
        this.pickup_disposition = '';
        this.table_data_open = [];
        this.table_data_pickup = [];
        this.loading = true;
        this.headers = [
        { text: "Tag ID", value: "tag_number", align: "start", sortable: false, width: "12%" },
        { text: "RDD", value: "rdd_number", sortable: true },
        { text: "Category", value: "category", sortable: true },
        { text: "Article Id", value: "sku_code", sortable: true },
        { text: "Article Description", value: "item_description", sortable: true },
        { text: "Grade", value: "grade", sortable: true },
        { text: "Sub Location", value: "sub_location", sortable: true },
        { text: "Site Location", value: "distribution_center", sortable: true },
        { text: "Inwarded Date", value: "inward_date", sortable: true,sort: (a, b) => {
              const dateA = new Date(a.split("/").reverse().join("/"));
              const dateB = new Date(b.split("/").reverse().join("/"));
              return dateA - dateB;
            } }
        ];
        securedAxiosInstance.get('api/v1/warehouse/put_away' , 
        {params: 
          { 
            search: this.putaway_search,
            search_in: this.field_type, 
            page: params['page'], 
            per_page: params['size'],

          }})
          .then(response => {
            this.table_data = response.data.inventories
            this.totalPages =  response.data.meta.total_pages
            this.loading = false;
          })
          .catch(error => this.$toast.error('Error in retrieving data'))

      } if (tab == 'Open Putaway') {
        this.pickup_disposition = '';
        this.table_data = [];
        this.table_data_pickup = [];
        this.loading = true;
        this.headers = [
          {
            text: "Tag ID",
            value: "tag_number",
            align: "start",
            sortable: false,
            width: "12%"
          },
          { text: "Category", value: "category" },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Grade", value: "grade" },
          { text: "Sub Location", value: "sub_location" },
          { text: "Site Location", value: "distribution_center" }
        ];
        
        securedAxiosInstance.get('api/v1/warehouse/put_away?sub_location_status=open' , {params: { tag_number: this.putaway_search, page: params['page'], per_page: params['size']}})
          .then(response => {
            this.table_data_open = response.data.inventories
            this.totalPages =  response.data.meta.total_pages
            this.loading = false;
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
      }
      if (tab == 'Not Found Items') {
        this.pickup_disposition = '';
        this.table_data = [];
        this.table_data_pickup = [];
        this.loading = true;
        this.headers = [
          {
            text: "Tag ID",
            value: "tag_number",
            align: "start",
            sortable: false,
            width: "12%"
          },
          { text: "Category", value: "category" },
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Grade", value: "grade" },
          { text: "Last Sub-Location", value: "sub_location" },
          { text: "Site Location", value: "distribution_center" }
        ];
        securedAxiosInstance.get('api/v1/warehouse/put_away/not_found' , { params: { tag_number: this.putaway_search, page: params['page'], per_page: params['size'] } } )
          .then(response => {
            this.table_data_notfound = response.data.inventories
            this.totalPages =  response.data.meta.total_pages
            this.loading = false;
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
      }
      if (tab == 'Pick Up') {
        this.pickup_disposition = 'Brand Call-Log';
        this.changeDispositon();
        securedAxiosInstance.get('api/v1/warehouse/put_away/get_dispositions')
          .then(response => {
            this.pickup_filter = response.data.dispositions
            this.loading = false;
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
      }
      if (tab == 'Request Tracker') {
            this.table_data = [];
            this.loading = true;
            this.headers = [
            { text: "", value: "customcheck", width: "3%" },
          {
            text: "Request ID",
            value: "request_id",
            align: "start",
            sortable: false,
            width: "12%"
          },
          { text: "Creation Date & Time", value: "created_at" },
          { text: "Request Type", value: "request_type" },
          { text: "Assigned To", value: "assignee_name" },
          { text: "Status", value: "status" },
          { text: "Completion Date & Time", value: "completed_at" },
          { text: "Not Found Items", value: "not_found_items" },
          { text: "Quantity", value:"items_count"}
        ];
        securedAxiosInstance.get('api/v1/warehouse/put_requests' , {params: { request_id: this.putaway_search, page: params['page'], per_page: params['size']}} )
          .then(response => {
            this.table_data_request_track = response.data.put_requests
            this.totalPages =  response.data.meta.total_pages
            this.filter_request_type = this.requestTypes;
            this.filter_status = this.trackStatus;
            this.loading = false;
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
      }

    },

    assignvalue(event, item) {
      if (event.target.checked) {
        if (this.selected.length == 0 || this.first_select == "") {
          this.first_select = item.issue_type
          if(this.active_tab == 'Pick Up' && !item.sub_location){
            event.target.checked = false
            this.showAlert("error", "Please select a record that contains sub-location")
          }else{
            this.selected.push(item)
          }
          if (item.issue_type == "In-Transit") {
            this.isReturn = true
          }
          if (item.issue_type == "Excess") {
            this.isTranfer = true
            this.isDisposition = true
          }
        }
        if (this.first_select != "") {
          if (this.first_select == item.issue_type) {
            if(this.active_tab == 'Pick Up' && !item.sub_location){
            event.target.checked = false
            this.showAlert("error", "Please select a record that contains sub-location")
          }else{
            this.selected.push(item)
          }
          }
          else {
            event.target.checked = false
            this.$toast.error("Only one issue type can be selected at once");
          }
        }

      } else {
        var record = this.selected.find(x => x.id == item.id)
        var ind = this.selected.indexOf(record)
        this.selected.splice(ind, 1)
      }

      if (this.active_tab == 'Inward Putaway') {
        if (this.selected.length > 0) {
          this.inwardSelected = true;
        } else {
          this.inwardSelected = false;
        }
      }
      if (this.active_tab == 'Open Putaway') {
        if (this.selected.length > 0) {
          this.openListSelected = true;
        } else {
          this.openListSelected = false;
        }
      }
      if (this.active_tab == 'Not Found Items') {
        if (this.selected.length > 0) {
          this.NotfoundListSelected = true;
        } else {
          this.NotfoundListSelected = false;
        }
      }
      if (this.active_tab == 'Pick Up') {
        if (this.selected.length > 0) {
          this.pickupaction = true;
        } else {
          this.pickupaction = false;
        }

      }

      if (this.active_tab == 'Request Tracker') {
        if (this.selected.length > 0) {
          var dc = this.selected.map(x => x.status)
          this.reqTrackStatus = dc;         
          if(dc.includes('Pending') && dc.includes('Completed')){
            this.requestTracListSelected = false;
          }else if(dc.includes('Pending') && dc.includes('In Progress')){
            this.requestTracListSelected = false;
          }          
          else if(dc.includes('Pending')){
            this.requestTracListSelected = true;
          }else{
            this.requestTracListSelected = false;
          }    
          
        } else {
          this.requestTracListSelected = false;
        }

      }

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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.inwardSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.selctedItemsPopup = true;
      this.selected_headers = [
        {
          text: "Tag ID",
          value: "tag_number",
          align: "start",
          sortable: false,
          width: "12%"
        },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" },
        { text: 'Delete', value: 'action' }
      ];
      this.selected_table_data = this.selected;
      this.inv_id = this.selected.map(inventory => inventory.id);
      var dato = unique_array[0];
      this.dc_id = dato.toString()
    },
    deleteEvent(item) {
      if(this.active_tab == 'Inward Putaway'){
        const index = this.selected_table_data.indexOf(item);
        this.selected_table_data.splice(index, 1);
        this.inv_id = this.selected_table_data.map(x =>x.id)
            if(this.selected_table_data.length == 0){
              this.selected_table_data = []
              this.selctedItemsPopup = false;
              this.loadData(this.active_tab)
             var input = document.querySelectorAll('.checkbox');
             for (var i = 0; i < input.length; i++) {
             input[i].checked = false;
              this.inwardSelected = false;            
            }
          }
      }else if(this.active_tab == 'Open Putaway'){
        const index = this.selected_table_data_open.indexOf(item);
        this.selected_table_data_open.splice(index, 1);
        this.inv_id = this.selected_table_data_open.map(x =>x.id)
        if(this.selected_table_data_open.length == 0){
              this.selected_table_data_open = []
              this.selctedItemsOpenPopup = false;
              this.loadData(this.active_tab)
             var input = document.querySelectorAll('.checkbox');
             for (var i = 0; i < input.length; i++) {
             input[i].checked = false;
              this.openListSelected = false;            
            }
          }
      }else if(this.active_tab == 'Pick Up'){
        const index = this.table_data_pickup_sel.indexOf(item);
        this.table_data_pickup_sel.splice(index, 1);
        this.inv_id = this.table_data_pickup_sel.map(x =>x.id)
        if(this.table_data_pickup_sel.length == 0){
              this.table_data_pickup_sel = []
              this.selctedItemsPickup = false;
              this.loadData(this.active_tab)
             var input = document.querySelectorAll('.checkbox');
             for (var i = 0; i < input.length; i++) {
             input[i].checked = false;
              this.pickupaction = false;            
            }
          }
      }
     
    },
    deleteEvenTrack(item) {
        const index = this.edit_req_table_data.indexOf(item);
        if (index > -1) {
          this.edit_req_table_data.splice(index, 1);
        }

        this.update_inv_id = this.edit_req_table_data.map((x) => x.inventory_id);

        if (this.edit_req_table_data.length === 0) {
          this.edit_req_table_data = [];
          this.editRequestPopup = false;
          this.loadData(this.active_tab);

          // Clear checkboxes
          var input = document.querySelectorAll('.checkbox');
          for (var i = 0; i < input.length; i++) {
            input[i].checked = false;
          }

          this.requestTracListSelected = false;
        }
      },
    assignExecutiveFnc() {
      
      this.number = 0;
      this.assignExecutivePopup = true;
      this.assignTo = '';
      this.requestReason = this.active_tab
      this.$http.secured
        .get("api/v1/warehouse/put_away/request_reasons", { params: { distribution_center_id: this.dc_id } })
        .then(response => {
          if (response.data) {
            var request_reason_1 = response.data.put_away_reasons;
            request_reason_1.map(inward_reason =>{
              if(inward_reason.id == 'inward_putaway'){
                this.request_reason = inward_reason.name
              }
            })
            this.request_reason_name = response.data.put_away_reasons.map(inventory => inventory.name);
            this.inward_users = response.data.users
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

      this.$http.secured.post("api/v1/warehouse/put_requests", {
        put_request:
        {
          "request_type": "put_away",
          "put_away_reason": "inward_putaway",
          "distribution_center_id": this.dc_id,
          "assignee_ids": this.assignTo,
          "inventory_ids": this.inv_id
        }
      },)
        .then(response => {
          if (response.data) {
            this.selctedItemsPopup = false;
            this.assignExecutivePopup = false;
            this.selected = []
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.inwardSelected = false;
            }
            this.successDialogInward = true;
            this.successMsg = response.data.message;
            this.loadData(this.active_tab);
            this.showAlert("success", "Successfully request created");
            this.loadData(this.active_tab);
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;
        });
    },

    addMoreItems() {
      this.selctedItemsPopup = false;
      this.selctedItemsPickup = false;
    },

    filterListOfButtons(ev) {
      this.filterCategory= [],
      this.filterGrade = [],
      this.filterBrand = [],
      this.filterStatus = '',
      this.filterRequestType = '',
      this.putaway_search = ''
      document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
      this.filteWithSubPopup = true;
    },

    openSubLocationDialog() {
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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.inwardSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.updateSubLocationReq = true;
      this.sub_lcation_inward = '';
      var dato = unique_array[0];
      this.dc_id = dato.toString()

      this.inv_id = this.selected.map(inventory => inventory.id);
      this.$http.secured
        .get("api/v1/warehouse/put_away/sub_locations", { params: { distribution_center_id: this.dc_id } })
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
    updateSubLocSubmit() {
      const formData = new FormData();
      this.$http.secured.put("api/v1/warehouse/put_away/update_sub_location", {
        "inventory_ids": this.inv_id,
        "sub_location_id": this.sub_lcation_inward,
        "putaway_type": "inward"
      },)
        .then(response => {
          if (response.data) {
            this.updateSubLocationReq = false
            this.selected = []
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.inwardSelected = false;
            }
            this.showAlert("success", "Successfully updated");
            this.loadData(this.active_tab);
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });

    },
    openDialogOpenCreateRequest() {
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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.openListSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.selctedItemsOpenPopup = true;
      this.selected_headers_open = [

        { text: "", value: "customcheck", width: "3%" },
        {
          text: "Tag ID",
          value: "tag_number",
          align: "start",
          sortable: false,
          width: "12%"
        },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" },
        { text: 'Delete', value: 'action' }

      ];
      this.selected_table_data_open = this.selected;
      this.inv_id = this.selected.map(inventory => inventory.id);
      var dato = unique_array[0];
      this.dc_id = dato.toString()
    },
    addMoreItemsOpenTab() {
      this.selctedItemsOpenPopup = false
    },
    assignExecutiveFncInOpen() {
      this.number = 0;
      this.assignExecutivePopupInOPen = true
      this.assignToOpen = [],
      this.requestReasonOpen = this.active_tab;
        this.$http.secured
          .get("api/v1/warehouse/put_away/request_reasons", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              var request_reason_open_1 = response.data.put_away_reasons;
              request_reason_open_1.map(open_reason => {
                if(open_reason.id == 'open_putaway'){
                  this.request_reason_open = open_reason.name;
                }
              })
              this.inward_users_open = response.data.users;
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

    assignExecuOpenSubmit() {
      this.number++;
      const formData = new FormData();
      this.$http.secured.post("api/v1/warehouse/put_requests", {
        put_request:
        {
          "request_type": "put_away",
          "put_away_reason": "open_putaway",
          "distribution_center_id": this.dc_id,
          "assignee_ids": this.assignToOpen,
          "inventory_ids": this.inv_id
        }
      },)
        .then(response => {
          if (response.data) {
            this.assignExecutivePopupInOPen = false;
            this.selctedItemsOpenPopup = false;
            this.selected = []
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.openListSelected = false;
            }
            this.successDialogInward = true;
            this.successMsg = response.data.message;
            this.showAlert("success", "Successfully request created");
            this.loadData(this.active_tab);
            this.active_tab == 'Decision Pending'
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;
        });

    },

    openSubLocationDialogInOpen() {
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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.openListSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.updateSubLocationReqOpenTab = true;
      this.updateSubLocOpen = '';
      var dato = unique_array[0];
      this.dc_id = dato.toString()
      this.inv_id = this.selected.map(inventory => inventory.id);
      this.$http.secured
        .get("api/v1/warehouse/put_away/sub_locations", { params: { distribution_center_id: this.dc_id } })
        .then(response => {
          if (response.data) {
            this.update_sub_location_open = response.data.sub_locations;
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

    updateSubLocSubmitOpen() {
      const formData = new FormData();
      this.$http.secured.put("api/v1/warehouse/put_away/update_sub_location", {
        "inventory_ids": this.inv_id,
        "sub_location_id": this.updateSubLocOpen,
        "putaway_type": "open"
      },)
        .then(response => {
          if (response.data) {
            this.updateSubLocationReqOpenTab = false
            this.selected = []
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.inwardSelected = false;
            }
            this.showAlert("success", "Successfully updated");
            this.loadData(this.active_tab);
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });

    },
    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },
    deleteRequest() {
      if (this.selected.length > 0) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.inwardSelected = false;
        }
      }
      this.selctedItemsPopup = false
    },
    deleteRequestOpen() {
      if (this.selected.length > 0) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.openListSelected = false;
        }
      }
      this.selctedItemsOpenPopup = false
    },
    deleteRequestPickup() {
      if (this.selected.length > 0) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.pickupaction = false;
        }
      }
      this.selctedItemsPickup = false
    },

    applyFilterFunc() {
      const accessoryTypes = ['Mobile Covers/Cases', 'Power bank/Batteries'];
      const params = new URLSearchParams();
      params.append('categories', JSON.stringify(this.filterCategory.map(item => item.value)));
      params.append('brands', JSON.stringify(this.filterBrand.map(item => item.value))); 
      params.append('grade', JSON.stringify(this.filterGrade.map(item => item.value)));

      const pageparams = this.getRequestParams(
        this.page,
        this.pageSize
      );
      params.append('page' , pageparams['page'])
      params.append('per_page' , pageparams['size'])

      if(this.active_tab == 'Inward Putaway'){
        this.$http.secured
        .get('/api/v1/warehouse/put_away', { params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.inventories
            this.filteWithSubPopup=false;
            this.filterCategory = '';
            this.filterGrade = '';
            this.filterBrand = '';
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
      }else if(this.active_tab == 'Open Putaway'){
        this.$http.secured
        .get('api/v1/warehouse/put_away?sub_location_status=open', { params })
        .then(response => {
          if (response.data) {
            this.table_data_open = response.data.inventories
            this.filteWithSubPopup=false;
            this.filterCategory = '';
            this.filterGrade = '';
            this.filterBrand = '';
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
      }else if(this.active_tab == 'Not Found Items'){
        this.$http.secured
        .get('/api/v1/warehouse/put_away/not_found', { params })
        .then(response => {
          if (response.data) {
            this.table_data_notfound = response.data.inventories
            this.filteWithSubPopup=false;
            this.filterCategory = '';
            this.filterGrade = '';
            this.filterBrand = '';
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
    }else if(this.active_tab == 'Request Tracker'){
      // params.append('reuqest_type', this.filterRequestType);
      // params.append('status', this.filterStatus);
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get('api/v1/warehouse/put_requests', { params: { request_type: this.filterRequestType, status:this.filterStatus, page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.table_data_request_track = response.data.put_requests
            this.totalPages =  response.data.meta.total_pages
            this.filteWithSubPopup=false;
            this.filterRequestType = '';
            this.filterStatus ='';
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
    selectedItemDailogNF() {
      var dc = this.selected.map(x => x.distribution_center_id)
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      dc = dc.filter(function (element) {
        return element !== undefined;
      });

      var unique_array = dc.filter(unique)
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.NotfoundListSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.selctedItemsPopInNF = true;
      this.selected_headers_NFI = [

        { text: "", value: "customcheck", width: "3%" },
        {
          text: "Tag ID",
          value: "tag_number",
          align: "start",
          sortable: false,
          width: "12%"
        },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" },
        { text: 'Delete', value: 'action' }
      ];
      this.selected_table_data_NFI = this.selected;
      this.inv_id = this.selected.map(inventory => inventory.id);
      var dato = unique_array[0];
      this.dc_id = dato.toString()
    },
    dialogWriteOffItem() {
      this.number = 0;
      if (this.selected.length == 1) {
        this.writeOffItemsPopup = true;
        this.debit_amount = '';
        this.raise_note_against = '';
      } else {
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.selected = []
          this.NotfoundListSelected = false;
        }
        this.showAlert("error", "Select only One items");
        return
      }

    },
    writeOffItemSubmit() {
      this.number++;
      var dc = this.selected.map(x => x.id)
      const formData = new FormData();
      formData.append("raised_against", this.raise_note_against)
      formData.append("debit_amount", this.debit_amount)
      this.$http.secured
        .put("/api/v1/warehouse/put_away/" + dc + "/write_off", formData)
        .then(response => {
          if (response.data) {
            this.update_sub_location_open = response.data.sub_locations;
            this.loading = false;
            this.writeOffItemsPopup = false;
            this.showAlert("success", "Successfully updated");
            this.loadData(this.active_tab);
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

    dialogSubLocNfi() {
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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.openListSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.updateSubLocationNFI = true;
      this.updateSubLocNFI = '';
      var dato = unique_array[0];
      this.dc_id = dato.toString()
      this.inv_id = this.selected.map(inventory => inventory.id);
      this.$http.secured
        .get("api/v1/warehouse/put_away/sub_locations", { params: { distribution_center_id: this.dc_id } })
        .then(response => {
          if (response.data) {
            this.update_sub_location_nfi = response.data.sub_locations;
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
    updateSubLocSubmitNfi() {
      const formData = new FormData();
      this.$http.secured.put("api/v1/warehouse/put_away/update_sub_location", {
        "inventory_ids": this.inv_id,
        "sub_location_id": this.updateSubLocNFI,
        "putaway_type": "not_found"
      },)
        .then(response => {
          if (response.data) {
            this.updateSubLocationNFI = false
            this.selected = []
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.NotfoundListSelected = false;
            }
            this.showAlert("success", "Successfully updated");
            this.loadData(this.active_tab);
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });

    },
    changeDispositon() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      this.loading = true;
      this.headers_pickup = [
        {
          text: "Tag ID",
          value: "tag_number",
          align: "start",
          sortable: false,
          width: "12%"
        },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" },
        { text: "Disposition", value: "disposition" }

      ];

      securedAxiosInstance.get("/api/v1/warehouse/put_away/all_inventories", { params: { disposition: this.pickup_disposition, search: this.putaway_search, page: params['page'], per_page: params['size'] } })
        .then(response => {
          this.table_data_pickup = response.data.inventories
          this.totalPages = response.data.meta.total_pages
          this.loading = false;
        })
        .catch(error => this.$toast.error('Error in retrieving data'))
    },
    dialogSelectedItemPickup() {
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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.pickupaction = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
      this.selctedItemsPickup = true;
      this.headers_pickup_sel = [

        { text: "", value: "customcheck", width: "3%" },
        {
          text: "Tag ID",
          value: "tag_number",
          align: "start",
          sortable: false,
          width: "12%"
        },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: "Site Location", value: "distribution_center" },
        { text: 'Delete', value: 'action' }

      ];
      this.table_data_pickup_sel = this.selected;
      this.inv_id = this.selected.map(inventory => inventory.id);
      var dato = unique_array[0];
      this.dc_id = dato.toString()

    },
    assignExecutivePickup() {
      this.number = 0;
      this.assignExecutivePopupPickup = true;
      this.requestReasonPickup = '';
      this.assignToPickup = [];
      this.pickupReason = '';
      this.requestType = '',
        this.$http.secured
          .get("api/v1/warehouse/put_away/request_reasons", { params: { distribution_center_id: this.dc_id } })
          .then(response => {
            if (response.data) {
              this.request_reason_pickup = response.data.put_away_reasons;
              this.reason = response.data.pick_up_reasons;
              this.request_Type = response.data.request_types;
              this.users_pickup = response.data.users;
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
    assignExSubmitPickup() {
      this.number++;
      const formData = new FormData();
      this.$http.secured.post("api/v1/warehouse/put_requests", {
        put_request:
        {
          "request_type": "pick_up",
          "pick_up_reason": this.requestReasonPickup,
          "disposition": this.pickup_disposition,
          "distribution_center_id": this.dc_id,
          "assignee_ids": this.assignToPickup,
          "inventory_ids": this.inv_id
        }
      },)
        .then(response => {
          if (response.data) {
            this.selctedItemsPickup = false;
            this.assignExecutivePopupPickup = false;
            this.selected = []
            var input = document.querySelectorAll('.checkbox');
            for (var i = 0; i < input.length; i++) {
              input[i].checked = false;
              this.pickupaction = false;
            }
            this.successDialogInward = true;
            this.successMsg = response.data.message;
            this.showAlert("success", "Successfully request created");
            this.loadData(this.active_tab);
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.number = 0;
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });
    },

    cancelRequestDialogOpen() {
      this.cancelRequestPopup = true;
    },

    cancelRequestSubmit() {
      this.$http.secured.post("api/v1/warehouse/put_requests/cancel_request", {

        "request_ids": this.selected.map(x => x.id)

      })
        .then(response => {
          if (response.data) {
            this.cancelRequestPopup = false;
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


    // changeReasonPickup(){
    //             if(this.requestType === 'pick_up'){
    //               this.reason = this.pickup_reason;              
    //             }else{          
    //               this.reason = this.request_reason_pickup;
    //             }
    //           }

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
      if (unique_array.length > 1) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.requestTracListSelected = false;
        }
        this.showAlert("error", "Please select the items from the same Location!");
        return
      }
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
    changeAssignmentEditFunc() {  
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
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.number = 0;
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });

    },
    editRequestDialog() {
      this.number = 0;
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
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Grade", value: "grade" },
        { text: "Sub Location", value: "sub_location" },
        { text: 'Delete', value: 'action' }

      ];
      securedAxiosInstance.get("api/v1/warehouse/put_requests/" + this.request_sl_id)
        .then(response => {
          this.edit_req_table_data = response.data.put_request.request_items
          this.change_assignment_item_edit = response.data.put_request.assignee_ids
          this.update_inv_id = this.edit_req_table_data.map(x => x.inventory_id)
          this.change_assignment = response.data.put_request.assignee_id;
          this.loading = false;
        })
        .catch(error => this.$toast.error('Error in retrieving data'))


    },
    deleteRequestTrack() {
      this.editRequestPopup = false;
      if (this.selected.length > 0) {
        this.selected = []
        var input = document.querySelectorAll('.checkbox');
        for (var i = 0; i < input.length; i++) {
          input[i].checked = false;
          this.requestTracListSelected = false;
        }
      }
    },
    editrequestSave() {
      this.number++;
      const formData = new FormData();
      this.$http.secured.put("api/v1/warehouse/put_requests/" + this.request_sl_id, {
        "put_request": {
          "assignee_ids": this.change_assignment_item_edit,
          "inventory_ids": this.update_inv_id
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
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.showAlert("error", "error.response.data.error");
          this.number=0;
          this.loading = false;

        });

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
      this.loadData(this.active_tab)
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.loadData(this.active_tab)
    },
    deleteReqTracker(){
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

    },
    addMoreItemsReqTrack(){
      this.addMoreItemsPopup = true;
      this.loading = true;

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
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description", width: "15%" },
          { text: "Grade", value: "grade" },
          { text: "Sub Location", value: "sub_location" },
          { text: "Site Location", value: "distribution_center" }
        ];
        securedAxiosInstance.get('/api/v1/warehouse/put_requests/'+this.request_sl_id+'/add_items', {params: { search: this.add_item_search, page: params['page'], per_page: params['size']}})
          .then(response => {
            this.add_items_table_data = response.data.inventories
            this.totalPages =  response.data.meta.total_pages
            this.loading = false;
            this.add_item_search = ''
          })
          .catch(error => this.$toast.error('Error in retrieving data'))
    },

    addButton() {
      this.addMoreItemsPopup = false;
      const newItems = this.selected_add.filter(item => {
        return !this.edit_req_table_data.some(existingItem => {
          return existingItem.id === item.id;
        });
      });
      newItems.forEach(item => {
        if (!this.edit_req_table_data.some(existingItem => existingItem.id === item.id)) {
          this.edit_req_table_data.push(item);
        } else {
          this.showAlert(`Item with ID ${item.id} is already added.`);
        }
      });
      const newIds = newItems.map(item => item.id);
      this.update_inv_id = [...this.update_inv_id, ...newIds];
      this.selected_add = []; 
 },
    searchfiledClear(active_tab){
      if(this.active_tab == 'Open Putaway'){
        this.putaway_search = '';
      }
    },
    linkPopupInReqTracker(item) {
      this.number = 0;
      this.request_sl_id = item.id;
      let value = item.request_id
      this.req_id = value;
      this.reqTrackStatus = item.status; 
      this.selected_manf = [];     
      this.itemLinkPopup = true;
      this.loading = true;
      this.edit_req_headers = [
        { text: "Tag ID",value: "tag_number", align: "start", sortable: false, width: "12%"   },
        { text: "Category", value: "category" },
        { text: "Article Id", value: "sku_code" },
        { text: "Article Description", value: "item_description" },
        { text: "Status", value: "status" },
        { text: "Sub Location", value: "sub_location" },

      ];
      securedAxiosInstance.get("api/v1/warehouse/put_requests/" + this.request_sl_id)
        .then(response => {
          this.edit_req_table_data = response.data.put_request.request_items
          this.update_inv_id = this.edit_req_table_data.map(x => x.inventory_id)
          this.change_assignment = response.data.put_request.assignee_id;
          this.loading = false;
        })
        .catch(error => this.$toast.error('Error in retrieving data'))


    },
    manfSubmit() {
      this.number++;
      const formData = new FormData();
      var vendorLists = [];
          for (var i = 0; i < this.selected_manf.length; i++) {
          vendorLists.push(this.selected_manf[i].id);
        }
        var vendorListsString = JSON.stringify(vendorLists);
        formData.append("item_ids", vendorListsString)
      this.$http.secured.put(`api/v1/warehouse/put_requests/${this.request_sl_id}/mark_as_not_found`, {
        "item_ids": vendorLists
      })
        .then(response => {
          if (response.data) {
            this.itemLinkPopup = false;
            this.successmessage = response.data.message;
            this.rejectsussesspopup = true;
            this.selected_manf = [];
            this.showAlert("success", "Successfully updated");
          } else {
            this.showAlert("error", "No Data Found");
          }
        }).catch(error => {
          this.number = 0;
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;

        });

    },
    afterClickOkLoadData(){
      this.rejectsussesspopup = false;
      this.selected=[];
      this.loadData(this.active_tab);
    },  
    handleSelection() {
      this.assignData = this.assignTo;
      // Handle any additional logic when items are selected
    },
    getItemName(itemId) {
      const item = this.inward_users.find((item) => item.id === itemId);
      return item ? item.username : '';
    },
    removeItem(itemId) {
      // Remove the item from selectedItems
      const index = this.assignData.indexOf(itemId);
      if (index > -1) {
        this.assignData.splice(index, 1);
      }
    }, 
    selectAll() {
      if(this.active_tab == 'Inward Putaway'){
        this.assignTo = this.inward_users.map((user) => user.id);  
      }
      if(this.active_tab == 'Open Putaway'){
        this.assignToOpen = this.inward_users_open.map((user) => user.id);    
      }
      if(this.active_tab == 'Pick Up'){
        this.assignToPickup = this.users_pickup.map((user) => user.id);    
      }
      if(this.active_tab == 'Request Tracker'){
        this.change_assignment = this.change_assignment_items.map((user) => user.id);    
      }
      
    },
    selectAllForEdid() {
      if(this.active_tab == 'Request Tracker'){
        this.change_assignment_item_edit = this.change_assignment_edit_items.map((user) => user.id);    
      }
      
    },

  }

}

</script>
<style scoped>
.btn-color-text {
  color: #0357D0 !important;
}

.btn-color-red {
  color: #EC0101 !important;
}

.selected-items {
  margin-bottom: -10px !important;
  color: white !important;
}

.margin-right {
  margin-right: 0;
}

.filter-position {
  position: absolute !important;
  top: 236px !important;
  right: 0px !important;
}

.v-dialog-filter {
  position: absolute !important;
  top: 236px !important;
  right: 0 !important;
}

.cancel-color {
  background-color: #FFFFFF;
  color: #0000FF;
  border: 1px solid #0000FF;
}

.submit-color {
  background-color: #0000FF;
  color: #FFFFFF !important;
  border: 1px solid #0000FF;
}

.my-custom-dialog {
  align-self: flex-end;
}

.margin-10 {
  margin-top: -32px;
  margin-right: 13px;
  justify-content: center !important; 
}
.tool_search{
  height: 65px;
}
.v-dialog__content:has(.filter-putaway){
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
}
.btn-groop {
  position: relative;
    top: -44px;
    margin-right: 10px;
}
.v-dialog>.v-card>:has(.v-card__title){
  overflow-wrap: break-word !important;
}

.custom-control_outlined .v-expansion-panel:before {
    box-shadow: none;
  }

  .custom-control_outlined button {
    min-height: 56px;
    border-width: 1px;
    border-color: rgba(0,0,0,.42);
    border-style: solid;
  }

  .custom-control_outlined button:focus {
    outline: none;
  }
  .btn-cancel{
    border: 1px solid #2196f3;
    color: #2196f3;
  }

  .rule-type_option {
  border: 1px solid #000000;
  padding: 4px 8px;
  border-radius: 5px;
  margin: 1px 2px;
}
.selected_rule_box{
  display: flex;
  flex-wrap: wrap;
}
.select-all-link {
     color: #1561B1;
    margin-top: -17px;
    margin-left: 233px;
}
</style>
