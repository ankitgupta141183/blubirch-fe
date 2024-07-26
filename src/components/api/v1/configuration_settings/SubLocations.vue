<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>

    <!-- Pop up for creating and editing Sub Location -->
    <v-row justify="center">
      <v-dialog v-model="addSubLocationDialog" persistent max-width="480px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title class="headline">
              <span class="headline">{{ actionHeadline() }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="addSubLocationDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-flex>
                    <v-autocomplete v-model="input_location" outlined :items="locations" v-if="!isEditing" item-value="id" item-text="code"
                      label="Location*">
                    </v-autocomplete>
                    <v-text-field outlined v-else v-model="edit_input_location" label="Location" readonly></v-text-field>
                  </v-flex>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-flex>
                    <v-text-field outlined v-model.trim="input_sub_location_name" label="Sub-Location Name*"></v-text-field>
                  </v-flex>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-flex>
                    <v-select :items="subLocation_types" item-value="value" item-text="name"
                      v-model="input_sub_location_type" label="Sub-Location Type" outlined>
                    </v-select>
                  </v-flex>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-flex>
                    <v-text-field outlined v-model.trim="input_sub_location_id" label="Sub-Location Id*"></v-text-field>
                  </v-flex>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions style="justify-content: center;">
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="closePopup">Cancel</v-btn>
            <v-btn small class="mb-3" color="primary" @click="saveSubLocation" :loading="isSubmited" :disabled="verifyInputs() || isSubmited">{{ buttonText() }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Pop up for delete confirmation -->
    <v-row justify="center">
      <v-dialog v-model="deleteSubLocationDialog" persistent max-width="450px">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Confirmation</span><br>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <span>Are you sure you want to delete the selected sub location(s) ?</span><br>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="closePopup">Cancel</v-btn>
            <v-btn small color="primary" @click="deleteSubLocationsConfirm">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Pop up for sorting sub location sequence -->
    <v-row justify="center">
      <v-dialog v-model="sortSubLocationSequence" persistent max-width="850px">
        <v-card class="v-card-100">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sort Sub Locations (Closest to Farthest)</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn class="blue--text" color="white" small @click="handleSaveSorting">Save Sorting Order
              </v-btn>
              <v-btn icon dark @click="closePopup"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-toolbar>

          <v-layout column>
            <v-flex md6 style="overflow: auto">
              <v-simple-table class="gray-border">
                <template>
                  <thead>
                    <tr>
                      <th class="text-left">Sequence</th>
                      <th class="text-left">Sub-Locations</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in sub_locations_items" :key="item.code">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.code }}</td>
                      <td>
                        <img src="@/assets/images/icons/up-arrow.svg" @click="handleUp(item, index)" width="25"
                          title="Move up">
                        <img src="@/assets/images/icons/down-arrow.svg" @click="handleDown(item, index)" width="25"
                          title="Move down">
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-row>
     <!-- Export Inventory popup -->
     <v-row justify="center">
      <v-dialog v-model="exportinventorypopu" max-width="750px">
        <v-card class="v-card-100">
          <v-form ref="dispatchForm">
            <v-card class="v-card-100">
              <v-card-title>
              <span v-if="this.active_tab == 'Update Inventory'" class="inc-title">Export Inventories</span>
              <span v-if="this.active_tab == 'Sub-Locations'" class="inc-title"> Export Sub-locations</span>
              <span v-if="this.active_tab == 'Sub-Location Sequence'" class="inc-title"> Export Sub-location Sequence</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="exportinventorypopu = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            </v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-flex>
                      <v-autocomplete v-model="inventory_location" :items="InventoryLocation" item-text="code" item-value="id" placeholder="Select Location" prepend-icon="mdi-magnify"></v-autocomplete>
                      <!-- <v-text-field solo v-model="vendor_code" label="Vendor Code"></v-text-field> -->
                    </v-flex>
                  </v-col>
                   <v-col cols="6" sm="6" md="6">
                    <v-btn class="ma-2" color="primary" @click="downloadInventoryFile" :disabled="!inventory_location">Download</v-btn>
                    </v-col>
                  </v-row>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
      </v-row>

         <!-- upload Inventory popup -->
         <v-row justify="center">
      <v-dialog v-model="uploadinventorypopup" max-width="750px">
        <v-card  class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span v-if="this.active_tab == 'Update Inventory'" class="inc-title">Inventory File Upload</span>
              <span v-if="this.active_tab == 'Sub-Locations'" class="inc-title">Sub-locations File Upload</span>
              <span v-if="this.active_tab == 'Sub-Location Sequence'" class="inc-title"> Import Sub-Location Sequence </span>
              <v-spacer></v-spacer>
              <v-btn icon @click="uploadinventorypopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text class="pa-0">
            <form @submit.prevent="importFile" enctype="multipart/form-data" ref="inv_file_upload_form">
              <v-card-title style="display: flow-root;"> 
              </v-card-title>
              <v-card-text>
                <v-container>
                  <div>
                    <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
                    <div v-if="file_required">
                      <div class="warning_img">
                        <div class="warnig_imgw">
                          <img src="@/assets/images/icons/warning.svg">File is required 
                        </div>
                      </div>
                    </div>
                  </div>
                </v-container>
              </v-card-text>
              <v-card-actions center>
                <v-spacer></v-spacer>
                <v-btn small type="button" text class="btn-cancel mr-2 mb-3" @click="uploadinventorypopup = false">Cancel</v-btn>
                <v-btn small color="primary"  class="mb-3" @click="importFile()" :disabled="number > 0">Submit</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-putaway" v-model="filtersPopup" persistent max-width="1000px">
        <v-card>
          <v-card-actions>
            <v-combobox prepend-inner-icon="mdi-magnify" clearable v-model="filterLocation" :items="locations" item-text="code"
              item-value="id" label="Location" multiple outlined class="ma-2"
              style="max-width: 300px;"></v-combobox>

            <v-combobox prepend-inner-icon="mdi-magnify" clearable v-model="filterLocationType" :items="location_type_filter" item-text="name" item-value="id" label="Location Type" outlined class="ma-2" style="max-width: 300px;"></v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="filtersPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="applyFilters" :disabled="this.filterLocation.length == 0 && this.filterLocationType == ''">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- For showing tabs -->
    <v-card class="v-card-100">
      <v-tabs v-model='tab_name'>
        <v-tab ripple :href="'#'" style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked') || dataClear()"
          v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>

    <!-- For showing Filters and Action buttons -->
    <v-card-title style="padding: 28px;">
      <v-row>
        <v-col cols="1" sm="5" v-if="active_tab == 'Sub-Locations'">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="sub_location_search" label="Search"
            style="max-width: 300px;" outlined v-on:keyup.enter="loadData('Sub-Locations')"></v-text-field>
        </v-col>
        <v-col cols="8" sm="8" v-if="active_tab == 'Sub-Location Rules' && !showRuleScreen">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="sub_location_rules_search" label="Search"
            style="max-width: 300px;" outlined v-on:keyup.enter="loadData('Sub-Location Rules')"></v-text-field>
        </v-col>
        <v-col cols="8" sm="8" v-if="active_tab == 'Sub-Location Sequence'">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="sub_location_sequence_search" label="Search"
            style="max-width: 300px;" outlined v-on:keyup.enter="loadData('Sub-Location Sequence')"></v-text-field>
        </v-col>
      </v-row>
     
      <v-actions style="margin-bottom: 28px;">
        <v-btn cols="2" color="primary"  v-if="active_tab == 'Sub-Locations'" @click="exportInventoryPopup">EXPORT SUBLOCATION</v-btn>
        <v-btn cols="1" sm="4" md="3" color="primary"  v-if="active_tab == 'Sub-Locations'" @click="uploadInventoryDialog">IMPORT SUBLOCATIONS</v-btn>
    
        <v-btn class="ma-2" color="primary" :disabled="this.selected.length > 0" v-if="active_tab == 'Sub-Locations'"
          @click="addSubLocationPopupOpen">ADD SUB LOCATIONS</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0 || this.selected.length > 1)"
          v-if="active_tab == 'Sub-Locations'" @click="editSubLocationPopupOpen">EDIT</v-btn>

        <v-btn class="ma-2" color="primary" :disabled="this.selected.length == 0" v-if="active_tab == 'Sub-Locations'"
          @click="deleteSubLocationConfirmationPopupOpen">DELETE</v-btn>
          <v-btn cols="2" color="primary"  v-if="active_tab == 'Sub-Location Sequence'" @click="exportInventoryPopup">EXPORT SEQUENCE</v-btn>
          <v-btn cols="1" sm="4" md="3" color="primary"  v-if="active_tab == 'Sub-Location Sequence'" @click="uploadInventoryDialog">IMPORT SEQUENCE</v-btn>

          

        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length > 1) || (this.selected.length === 0)"
          v-if="active_tab == 'Sub-Location Sequence'" @click="sortSubLocationSequencePopupOpen">SORT SUB
          LOCATIONS</v-btn>
          <v-btn class="ma-2" color="primary"
          v-if="(!showRuleScreen && active_tab == 'Sub-Location Rules')"><a href="https://qa-docker.blubirch.com:3810/master_files/sub_location_rules.csv"
              download style="color: #ffffff;">EXPORT RULES</a></v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"
          v-if="(!showRuleScreen && active_tab == 'Sub-Location Rules')" @click="handleruleLinkClick()">DEFINE
          RULE</v-btn>
      </v-actions>
    <!-- Update inventory -->
      <template v-if="active_tab == 'Update Inventory'">    
        <v-actions style="margin-bottom: 28px;">
          <v-btn class="ma-2" color="primary"
          v-if="active_tab == 'Update Inventory'" @click="exportInventoryPopup">EXPORT INVENTORY</v-btn>
        <v-btn class="ma-2" color="primary" v-if="active_tab == 'Update Inventory'"
          @click="uploadInventoryDialog">IMPORT INVENTORY</v-btn>        
        </v-actions>   
     </template>

      <template v-if="!showRuleScreen && active_tab != 'Update Inventory'">
        <v-expansion-panels ref = "filterPopupRef" class="custom-control_outlined" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;" v-if="active_tab !== 'Sub-Location Sequence'">
          <v-expansion-panel outlined @click="listFiltersData" >
            <v-expansion-panel-header>Filter
              <template v-slot:actions>
              <v-icon color="primary">
                mdi-menu-down
              </v-icon>
            </template>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
      <template v-else-if="showRuleScreen && active_tab != 'Update Inventory'">
        <v-btn :disabled="!saveRuleBtn" @click="handleSaveRule" class="ma-2" color="primary">SAVE RULE</v-btn>
        <v-btn :disabled="!saveRuleBtn" @click="closePopup" text class="btn-cancel mr-2" color="primary">CANCEL</v-btn>
      </template>
    </v-card-title>

    <!-- For listing data -->
    <template v-if="!showRuleScreen && active_tab != 'Update Inventory'">
      <v-layout column>
        <v-flex md6 style="overflow: auto">
          <v-data-table :dense="true" v-model="selected" :headers="headers" :items="table_data" show-select
            disable-pagination :hide-default-footer="true" class="elevation-1">
            <template #[`item.rules`]="{ item }">
              <a @click="handleruleLinkClick(item)" style="color: #1976d2;">
                <u> {{ item.rules }}</u>
              </a>
              <!-- <span v-else>{{ item.rules }}</span> -->
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
    </template>
    <template v-else-if="showRuleScreen">
      <v-card>
        <v-card-title style="padding: 28px">
          <span>Rule Type</span>
        </v-card-title>
        <v-card-text>
          <v-container v-for="ruleOption in ruleOptions" :key="ruleOption.ruleName" class="rule-ct_chips" >
            <v-card-actions>
              <input type="checkbox" :checked="ruleOption.checked" id="item.ruleName" name="check"
                style="width: 18px; height: 18px; margin-top: 2px;" class="checkbox"
                @change="handleCheckRule(ruleOption)">
              <span class="ml-2">{{ ruleOption.ruleName }}</span>
            </v-card-actions>
            <template v-if="ruleOption.show">
              <!-- <input type="text"/> -->
              <!-- <div v-if="ruleOption.ruleName == 'Quantity'" style="display: flex">
                <v-autocomplete v-model="requestReason" outlined :items="ruleOption.Options" item-text="key"
                  item-value="value" label="" style="max-width: 150px;" />
                <v-text-field v-model="sub_location_search" label="No. of items" outlined></v-text-field>
              </div> -->
              <template>
               
                <div class="row">
                  <div class="col-6">
                    <v-autocomplete v-model="ruleOption.selectedValue" outlined :items="ruleOption.Options"
                      item-text="key" item-value="value" :label="ruleOption.label" style="max-width: 300px;" multiple
                      chips closable-chips deletable-chips>
                    </v-autocomplete>
                  </div>
                  <div class="col-6">
                    <div>
                        <div class="mb-2">
                          <span class="v-label">Selected {{ ruleOption.ruleName }}</span>
                        </div>
                        <div class="selected_rule_box">
                            <span v-for="item in ruleOption.selectedValue" :key="item" class="rule-type_option">
                              {{ item }}
                              <span style="color: #000000; cursor: pointer" class="text-black"
                                @click="handleRemoveSelect(ruleOption, item)">x</span></span>
                        </div>
                      </div>
                  </div>
                </div>
              </template>
            </template>
          </v-container>
        </v-card-text>
      </v-card>
    </template>

  </v-card>
</template>

<script>
import $ from 'jquery'
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { required, minLength, helpers } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      headerText: "Settings",
      loading: false,
      alert: false,
      active_tab: "Sub-Locations",
      tabs: [
        "Sub-Locations",
        "Sub-Location Rules",
        "Sub-Location Sequence",
        "Update Inventory"
      ],
      tab_name: "sub_locations",
      sequence_items: [],
      sub_locations_items: [],
      table_data: [],
      singleSelect: false,
      selected: [],
      sub_location_search: "",
      sub_location_sequence_search: "",
      sub_location_rules_search: "",
      dialog: false,
      deleteSubLocationDialog: false,
      addSubLocationDialog: false,
      disableAddButton: false,
      sortSubLocationSequence: false,
      input_location: '',
      edit_input_location: '',
      input_sub_location_type: '',
      input_sub_location_name: '',
      input_sub_location_id: '',
      subLocation_types: [{ name: 'Open', value: 'open' }, { name: 'Closed', value: 'closed' }],
      locations: [],
      location_type_filter: [],
      isSubmited: false,
      isEditing: false,
      headers: [
        {
          text: "Sub Location ID",
          value: "code"
        },
        { text: "Sub Location Name", value: "name" },
        { text: "Location", value: "distribution_center" },
        { text: "Location Type", value: "location_type" },
        { text: "Added On", value: "created_at" }
      ],
      sequence_headers: [
        {
          text: "Sequence",
          align: "start",
          sortable: false,
          value: "tag_number",
          width: '10%'
        },
        { text: "", value: "=====", width: '5%' },
        { text: "Sub-Locations", value: "item_description", width: '20%' },
        { text: "", value: "" }
      ],
      filterLocation: [],
      filterLocationType: [],
      alert_type: "success",
      alert_message: "success",
      insurance_title: 'Insurance Submission',
      dialog_confirm: "",
      action: "",
      selected_inv: "",
      viewAttachmentDialog: false,
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      alert_value: '',
      alert_item: [{ name: 'All', value: '' }, { name: 'High', value: 'high' }, { name: 'Medium', value: 'medium' }, { name: 'Low', value: 'low' }],
      filtersPopup: false,
      showRuleScreen: false,
      updateInventory: false,
      exportinventorypopu: false,
      inventory_location:'',
      InventoryLocation:'',
        file: "",
        file_required: false,
        uploadinventorypopup:false,
        number:0,
      ruleOptions: [
        {
          ruleName: "Category",
          show: false,
          checked: false,
          Options: [],
          label: "Valid Categories",
          selectedValue: [],
          ApiKey: "categories",
          updatekey: "category"
        },
        {
          ruleName: "Brand",
          show: false,
          checked: false,
          Options: [],
          label: "Valid Brand",
          selectedValue: [],
          ApiKey: "brands",
          updatekey: "brand"
        },
        {
          ruleName: "Grade",
          show: false,
          checked: false,
          Options: [],
          label: "Valid Grade",
          selectedValue: [],
          ApiKey: "grades",
          updatekey: "grade"
        },
        {
          ruleName: "Disposition",
          show: false,
          checked: false,
          Options: [],
          label: "Valid Disposition",
          selectedValue: [],
          ApiKey: "dispositions",
          updatekey: "disposition"
        },
        {
          ruleName: "Return Reason",
          show: false,
          checked: false,
          Options: [],
          label: "Valid Return Reason",
          selectedValue: [],
          ApiKey: "return_reasons",
          updatekey: "return_reason"
        }
      ],
      saveRuleBtn: false

    };
  },

  components: {
    HeaderComponent
  },
  validations: {
      file: {required }
    },

  created() {
    this.loadData('Sub-Locations')
    this.getLocations()
  },

  methods: {
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

    handleUp(item, index) {
      if (index !== 0) {
        const remainingItem = this.sub_locations_items.filter(value => value.id !== item.id)
        remainingItem.splice(index - 1, 0, item);
        this.sub_locations_items = remainingItem
      }
    },
    handleDown(item, index) {
      if (index !== (this.sub_locations_items.length - 1)) {
        const remainingItem = this.sub_locations_items.filter(value => value.id !== item.id)
        remainingItem.splice(index + 1, 0, item);
        this.sub_locations_items = remainingItem
      }
    },
    handleSaveSorting() {
      const sequence_items = this.sub_locations_items.map((item, ind) => {
        return { sequence: ind + 1, id: item.id }
      })
      this.$http.secured.put(`/api/v1/warehouse/distribution_centers/${this.selected[0].id}/update_sequence`,
        { sub_locations: sequence_items })
        .then(response => {
          if (response.status === 200) {
            this.loadData('Sub-Location Sequence')
            this.sortSubLocationSequence = false;
            this.showAlert('success', "Sub-Location sequence updated successfully")
          } else {
            console.log("something went wrong");
          }
        }).catch(error => {
          console.log(error, "update_sequence api error");
        })
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },

    buttonText() {
      if (this.isEditing) {
        return 'Update'
      } else {
        return 'Add'
      }
    },

    actionHeadline() {
      return this.isEditing ? 'Edit Sub Location' : 'Add Sub Location';
    },

    getLocations() {
      this.$http.secured
        .get("/api/v1/warehouse/sub_locations/get_locations")
        .then(response => {
          if (response.data) {
            this.locations = response.data.locations
            this.location_type_filter = response.data.location_types
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    listFiltersData(ev) {
      this.sub_location_rules_search = ''
      this.sub_location_search = ''
      document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
      this.filtersPopup = true;
    },

    applyFilters() {
      const params = new URLSearchParams();

      if (this.filterLocation) {
        params.append('distribution_center_ids', JSON.stringify(this.filterLocation.map(x => x.id)));
      }

      if (this.filterLocationType) {
        params.append('location_type', this.filterLocationType.id);
      }

      const pageparams = this.getRequestParams(
        this.page,
        this.pageSize
      );
      params.append('page' , pageparams['page'])
      params.append('per_page' , pageparams['size'])

      if (this.active_tab == 'Sub-Locations') {
        var apiUrl = '/api/v1/warehouse/sub_locations'
      }
      else {
        var apiUrl = '/api/v1/warehouse/sub_locations/sub_location_rules'
      }

      this.$http.secured
      .get(`${apiUrl}`, { params })
      .then(response => {
        if (response.data) {
          this.table_data = response.data.sub_locations
          this.filtersPopup = false;
          this.filterLocation = '';
          this.filterLocationType = '';
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

    disableFilterSubmit() {
      return (this.filterLocation.length == 0 || this.filterLocationType == '')
    },

    loadData(tab, tab_action) {
      if(tab_action){
        this.sub_location_search = ''
        this.sub_location_sequence_search = ''
        this.sub_location_rules_search = ''
      }
      this.loading = true;
      this.selected = []
      this.active_tab = tab
      this.table_data = []
      this.page = 1
      this.totalPages = 1
      this.pageSize = 100
      this.showRuleScreen = false
      this.ruleOptions =  this.ruleOptions.map(item => ({...item , Options : [] , selectedValue : [] , show : false , checked : false}))
      if (tab == "Sub-Locations") {
        this.sub_location_rules_search = '';
        this.sub_location_sequence_search = '';
        this.filterLocationType = '';
        (this.headers = [
          {
            text: "Sub Location ID",
            value: "code"
          },
          { text: "Sub Location Name", value: "name" },
          { text: "Location", value: "distribution_center" },
          { text: "Location Type", value: "location_type" },
          { text: "Updated At", value: "last_updated" }
        ]);

        this.fetchSubLocations();
      }

      if (tab == 'Sub-Location Sequence') {
        this.sub_location_rules_search = '';
        this.sub_location_search = '';
        (this.headers = [
          {
            text: "Location",
            align: "location",
            value: "code"
          },
          { text: "No. of Sub Location", value: "sub_locations" },
          { text: "Sorting Status", value: "status" }
        ]);

        this.fetchSubLocationsSequence();
      }

      if (tab == 'Sub-Location Rules') {
        this.sub_location_sequence_search = '';
        this.sub_location_search = '';
        this.headers = [
          { text: "Sub Location", align: "location", value: "code" },
          { text: "Location", value: "distribution_center" },
          { text: "Location Type", value: "location_type" },
          { text: "Rules", value: "rules" }
        ]

        this.fetchSubLocationRules();
      }
      if(tab == 'Update Inventory'){
        this.updateInventory = true
        this.sequence_headers = [];
        this.headers = [];
      }
    },

    fetchSubLocations() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get("/api/v1/warehouse/sub_locations", { params: { search: this.sub_location_search, page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.sub_locations
            this.totalPages = response.data.meta.total_pages
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

    fetchSubLocationsSequence() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get("/api/v1/warehouse/distribution_centers", { params: { search: this.sub_location_sequence_search, page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.distribution_centers
            this.totalPages = response.data.meta.total_pages
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

    fetchSubLocationRules() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      this.$http.secured
        .get("/api/v1/warehouse/sub_locations/sub_location_rules", { params: { search: this.sub_location_rules_search, page: params['page'], per_page: params['size'] } })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.sub_locations
            this.totalPages = response.data.meta.total_pages
            this.filtersPopup = false;
            this.filterLocation = '';
            this.filterLocationType = '';
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

    handlePageChange(value) {
      this.page = value;
      if (this.active_tab == 'Sub-Locations') {
        this.fetchSubLocations();
      } else if (this.active_tab == 'Sub-Location Rules') {
        this.fetchSubLocationRules();
      } else {
        this.fetchSubLocationsSequence();
      }
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1
      if (this.active_tab == 'Sub-Locations') {
        this.fetchSubLocations();
      } else if (this.active_tab == 'Sub-Location Rules') {
        this.fetchSubLocationRules();
      } else {
        this.fetchSubLocationsSequence();
      }
    },
    verifyInputs() {
      return this.input_location == '' || this.input_sub_location_type == '' || this.input_sub_location_name == '' || this.input_sub_location_id == ''
    },

    saveSubLocation() {
      this.isSubmited = true
      if (this.isEditing) {
        this.updateSubLocation()
      } else {
        this.createSubLocation()
      }
    },

    createSubLocation() {
      this.addSubLocationDialog = false;
      const formData = new FormData();
      formData.append('sub_location[distribution_center_id]', this.input_location)
      formData.append('sub_location[location_type]', this.input_sub_location_type)
      formData.append('sub_location[name]', this.input_sub_location_name)
      formData.append('sub_location[code]', this.input_sub_location_id)

      this.$http.secured
        .post("/api/v1/warehouse/sub_locations", formData)
        .then(response => {
          if (response.data) {
            this.addSubLocationDialog = false;
            this.loadData('Sub-Locations')
            this.isSubmited = false
            this.showAlert('success', "Sub-Location saved successfully")
          } else {
            this.showAlert("error", "Something went wrong");
          }
        })
        .catch(error => {
          this.showAlert("error", error.response.data.error || "Something went wrong from Network" + error);
          this.loading = false;
          this.isSubmited = false
        });
    },

    updateSubLocation() {
      const formData = new FormData();
      formData.append('sub_location[distribution_center_id]', this.input_location)
      formData.append('sub_location[location_type]', this.input_sub_location_type)
      formData.append('sub_location[name]', this.input_sub_location_name)
      formData.append('sub_location[code]', this.input_sub_location_id)

      const selected_sl = this.selected.map(x => x.id)

      this.$http.secured
        .put(`/api/v1/warehouse/sub_locations/${selected_sl}`, formData)
        .then(response => {
          if (response.data) {
            this.addSubLocationDialog = false;
            this.loadData('Sub-Locations')
            this.showAlert('success', "Sub-Location updated successfully")
            setTimeout(()=>{
              this.isSubmited = false
              this.isEditing = false;
            }, 100)
          } else {
            this.showAlert("error", "Something went wrong");
          }
        })
        .catch(error => {
          this.showAlert("error", error.response.data.error || "Something went wrong from Network" + error);
          this.loading = false;
          this.isSubmited = false
        });
    },

    deleteSubLocationConfirmationPopupOpen() {
      if (this.active_tab == 'Sub-Locations') {
        this.deleteSubLocationDialog = true;
      }
    },

    addSubLocationPopupOpen() {
      if (this.active_tab == 'Sub-Locations') {
        this.input_sub_location_id = ''
        this.input_sub_location_name = ''
        this.input_location = ''
        this.input_sub_location_type = ''
        this.isEditing = false;
        this.addSubLocationDialog = true;
      }
    },

    editSubLocationPopupOpen() {
      if (this.active_tab == 'Sub-Locations') {
        this.isEditing = true;
        this.input_sub_location_id = this.selected.map(x => x.code)[0]
        this.input_sub_location_name = this.selected.map(x => x.name)[0]
        this.input_location = this.selected.map(x => x.distribution_center_id)[0]
        this.edit_input_location = this.selected.map(x => x.distribution_center)[0]
        this.input_sub_location_type = this.selected.map(x => x.location_type)[0].toLowerCase()
        this.addSubLocationDialog = true;
      }
    },

    sortSubLocationSequencePopupOpen() {
      if (this.active_tab == 'Sub-Location Sequence') {
        this.sortSubLocationSequence = true;
        this.$http.secured.get(`/api/v1/warehouse/distribution_centers/${this.selected[0].id}/sub_location_sequence`)
          .then((response) => {
            if (response.status === 200) {
              this.sub_locations_items = response.data.distribution_center.sub_locations
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      }
    },

    deleteSubLocationsConfirm() {
      const deleteSubLocationsId = this.selected.map(x => x.id)
      this.$http.secured
        .delete("/api/v1/warehouse/sub_locations/bulk_delete", { params: { ids: deleteSubLocationsId } })
        .then(response => {
          if (response.status == 200) {
            this.loadData('Sub-Locations')
            this.selected = [];
            this.deleteSubLocationDialog = false;
            this.showAlert("success", "Sub Location(s) deleted successfully !");
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", error.response.data.error);
        });
      this.deleteSubLocationDialog = false
    },

    closePopup() {
      this.deleteSubLocationDialog = false
      this.addSubLocationDialog = false
      this.sortSubLocationSequence = false
      this.showRuleScreen = false
      this.selected = []
      this.ruleOptions =  this.ruleOptions.map(item => ({...item , Options : [] , selectedValue : [] , show : false , checked : false}))
    },

    handleClickDefineRule(ApiselectedValue) {
      this.showRuleScreen = true
      this.saveRuleBtn = false
      this.$http.secured.get("/api/v1/warehouse/sub_locations/rule_types")
        .then(response => {
          if (response.status === 200) {
            if (ApiselectedValue && ApiselectedValue.sub_location) {
              this.saveRuleBtn = true
              this.ruleOptions = this.ruleOptions.map(option => ({
                ...option, Options: response.data[option.ApiKey],
                selectedValue: ApiselectedValue.sub_location[option.updatekey],
                show: ApiselectedValue.sub_location[option.updatekey] && ApiselectedValue.sub_location[option.updatekey].length > 0 ? true : false,
                checked: ApiselectedValue.sub_location[option.updatekey] && ApiselectedValue.sub_location[option.updatekey].length > 0 ? true : false
              }))
            } else {
              this.ruleOptions = this.ruleOptions.map(option => ({ ...option, Options: response.data[option.ApiKey] }))
            }
          }
        })
    },

    handleCheckRule(item) {

      const updateRuleOption = this.ruleOptions.map(opt => opt.ruleName === item.ruleName ? ({
        ...opt,
        show: !opt.show,
        checked: !opt.checked,
        selectedValue: []
      }) : opt)
      this.ruleOptions = updateRuleOption
      let selectedRule = updateRuleOption.map(item => item.show)
      if (selectedRule.includes(true)) {
        this.saveRuleBtn = true
      } else {
        this.saveRuleBtn = false
      }

    },

    handleSaveRule() {
      const getSelectedrule = {
      }
      this.ruleOptions.map(option => {
        getSelectedrule[option.ApiKey] = option.selectedValue
      })
      let formData = {
        sub_location_ids: this.selected.map(item => item.id),
        category: getSelectedrule.categories,
        brand: getSelectedrule.brands,
        grade: getSelectedrule.grades,
        disposition: getSelectedrule.dispositions,
        return_reason: getSelectedrule.return_reasons
      }

      this.$http.secured.post("/api/v1/warehouse/sub_locations/update_rules", { ...formData })
        .then(response => {
          if (response.status === 200) {
            this.showRuleScreen = false
            this.saveRuleBtn = false
            this.ruleOptions = this.ruleOptions.map(item => ({ ...item, Options: [], checked: false, show: false }))
            this.loadData("Sub-Location Rules")
          }
        })
    },
    handleruleLinkClick(item) {
      let selectedId = ""
      if (item) {
        selectedId = item.id
        this.selected = [item]
      } else {
        selectedId = this.selected[0].id
      }
      if (this.selected.length === 1 || item) {
        this.$http.secured.get(`api/v1/warehouse/sub_locations/${selectedId}`)
          .then(response => {
            if (response.status === 200) {
              this.handleClickDefineRule(response.data)
            }
          })
      } else {
        var dc = this.selected.map(x => x.distribution_center)
        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }
        dc = dc.filter(function (element) {
          return element !== undefined;
        });

        var unique_array = dc.filter(unique)
        if (unique_array.length > 1) {
          this.selected = []
          this.showAlert("error", "Please select the items from the same location!");
        } else {
          this.handleClickDefineRule()
        }
      }

    },
    handleRemoveSelect(ruleOption, current_item) {
      this.ruleOptions = this.ruleOptions.map(item => item.ruleName === ruleOption.ruleName ? ({ ...item, selectedValue: item.selectedValue.filter(v => v !== current_item) }) : item)
    },
    dataClear(){
      if(this.active_tab == 'Sub-Locations'){
        this.sub_location_search = '';
      }else if(this.active_tab == 'Sub-Location Rules'){
        this.sub_location_rules_search = '';
      }else{
        this.sub_location_sequence_search = '';
      }
    },
    exportInventoryPopup(){
      if(this.active_tab == 'Update Inventory'){
        this.exportinventorypopu = true;
      this.inventory_location = '';
      this.$http.secured.get("/api/v1/warehouse/sub_locations/get_locations?have_sub_locations=true")
        .then(response => {
          if (response.data) {
            this.InventoryLocation = response.data.locations
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }

      if(this.active_tab == 'Sub-Locations'){
        this.exportinventorypopu = true;
      this.inventory_location = '';
      this.$http.secured.get("/api/v1/warehouse/sub_locations/get_locations")
        .then(response => {
          if (response.data) {
            this.InventoryLocation = response.data.locations
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }

      if(this.active_tab == 'Sub-Location Sequence'){
        this.exportinventorypopu = true;
      this.inventory_location = '';
      this.$http.secured.get("/api/v1/warehouse/sub_locations/get_locations")
        .then(response => {
          if (response.data) {
            this.InventoryLocation = response.data.locations
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }
     
    },
    downloadInventoryFile(){
      if(this.active_tab == 'Update Inventory'){
        this.$http.secured.get(`/api/v1/warehouse/put_away/export_inventory.csv?location_id=${this.inventory_location}`,
         {
        responseType: 'blob'
         }
      )
        .then(response => {
          if (response.data) {
            this.InventoryLocation.map(item => {
              if(item.id == this.inventory_location){
                this.inventory_location = item.code;              
          }})
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.inventory_location}_inventories.csv`);
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }
      if(this.active_tab == 'Sub-Locations'){
        this.$http.secured.get(`api/v1/warehouse/sub_locations/export_sublocations.csv?location_id=${this.inventory_location}`,
         {
        responseType: 'blob'
         }
      )
        .then(response => {
          if (response.data) { 
            this.InventoryLocation.map(item => {
              if(item.id == this.inventory_location){
                this.inventory_location = item.code;              
          }})           
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.inventory_location}_sublocations.csv`);
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }
      if(this.active_tab == 'Sub-Location Sequence'){
        this.$http.secured.get(`/api/v1/warehouse/sub_locations/export_sublocation_sequence?location_id=${this.inventory_location}`,
         {
        responseType: 'blob'
         }
      )
        .then(response => {
          if (response.data) { 
            this.InventoryLocation.map(item => {
              if(item.id == this.inventory_location){
                this.inventory_location = item.code;              
          }})           
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.inventory_location}_sublocations.csv`);
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }
     
    },
    importFile () {
        this.number++;
        if (this.$v.file.$invalid) {
          this.file_required = true;
          this.number = 0;
          return;
        }else{
           this.file_required = false;
        }  
        let formData = new FormData()

        if (this.file.name.split(".").pop() != 'csv'){
          this.$toast.error('Only CSV files can be imported');
          this.number = 0;
          return;
        }
        formData.append('file', this.file);
        this.show  = true
        if(this.active_tab == 'Update Inventory'){
          this.$http.secured.post('/api/v1/warehouse/put_away/import_inventory', formData)
        .then(response => {
          this.show   = false
          this.file = ""
          this.uploadinventorypopup = false
          this.$toast.success('File uploaded successfully');
        })
        .catch(error =>{ 
          this.number = 0;
          this.show   = false
          this.$toast.error(error.response.data.error)}          
        )
        }
        if(this.active_tab == 'Sub-Locations'){
          this.$http.secured.post('api/v1/warehouse/sub_locations/import_sublocations', formData)
        .then(response => {
          this.show   = false
          this.file = ""
          this.uploadinventorypopup = false
          this.$toast.success('File uploaded successfully');
        })
        .catch(error =>{ 
          this.number = 0;
          this.show   = false
          this.$toast.error(error.response.data.error)}          
        )
        }

        if(this.active_tab == 'Sub-Location Sequence'){
          this.$http.secured.post('/api/v1/warehouse/sub_locations/import_sublocation_sequence', formData)
        .then(response => {
          this.show   = false
          this.file = ""
          this.uploadinventorypopup = false
          this.$toast.success('File uploaded successfully');
        })
        .catch(error =>{ 
          this.number = 0;
          this.show   = false
          this.$toast.error(error.response.data.error)}          
        )
        }
        
      },
      selectFile(){
        this.file = this.$refs.file.files[0];
        if (this.$v.file.$invalid) {
          this.file_required = true;
          return;
        }else{
          this.file_required = false;
        } 
      },
      uploadInventoryDialog(){
        this.uploadinventorypopup = true
        this.number = 0;
        this.$refs.file.type='text';
        this.$refs.file.type='file'; 
      },
      downloadExporRules(){
        this.$http.secured.get("master_files/sub_location_rules.csv")
        .then(response => {
          if (response.data) {            
            const link = document.createElement('a');   
            link.href = url;                           
            link.download = 'file.pdf';                
            document.body.appendChild(link);            
            link.click();                              
            document.body.removeChild(link);
                }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      }
  }
}
</script>
<style>
/* .v-select__selections{
  display: none;
} */

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
.rule-ct_chips .v-chip {
  display: none;
}
.rule-ct_chips {
  max-width: 100%;
}
.v-dialog__content:has(.filter-putaway) {
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
}
.custom-control_outlined .v-expansion-panel:before{
  box-shadow: none;
}
.custom-control_outlined button{
  min-height: 56px;
  border-width: 1px;
  border-color: rgba(0,0,0,.42);
  border-style: solid;
}
.custom-control_outlined button:focus{
  outline: none;
}
.btn-cancel{
    border: 1px solid #2196f3 !important; 
    color: #2196f3 !important;
  }

</style>
