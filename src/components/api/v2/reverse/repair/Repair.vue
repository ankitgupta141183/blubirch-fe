<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Nav -->
    <header-component :headerTitle="headerText" />

    <!-- Update  popup  -->
    <v-row justify="center">
      <v-dialog v-model="UpdatePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="UpdatePopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="5" md="6">
                    <v-combobox v-model="vendor_list_item" label="Vendor Name" :items="vendor_list" item-text="vendor_name" :loading="isLoading" item-value="vendor_code" @keydown.enter="handleKeyEnter($event)" outlined> </v-combobox>
                  </v-col>
                  <v-col cols="12" sm="5" md="6">
                    <v-text-field v-model="repair_quotation_value" label="Repair Quotation Value" outlined type="number" required :rules="positiveIntegerRules"> </v-text-field>
                    <!-- <v-text-field v-model="vendorCodeToSend" label="Vendor Code" outlined type="number" required :rules="positiveIntegerRules" @keydown.enter="updatedialogVendornamelist($event.target.value)" > </v-text-field> -->
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="5" md="6">
                    <v-autocomplete v-model="repair_type_list" outlined :items="repair_type" item-text="name" item-value="id" label="Repair Type"> </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="5" md="6">
                    <v-autocomplete v-model="expected_revised_grade_list" outlined :items="expected_revised_grade" item-text="name" item-value="id" label="Expected Revised Grade"> </v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6" outlined>
                    <v-file-input v-model="file" accept=".pdf, .png" :rules="[fileTypeRule]" label="Upload Quotation" @change="handleFileChange">
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="cancel-color mb-3" @click="updatePendingQuotationCancel">Cancel</v-btn>
            <v-btn color="primary" class="mb-3" :disabled="isSubmitDisabled" @click="updatePendingQuotationSubmit">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-repair" v-model="filterPopup" persistent max-width="1224px">
        <v-card>
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab === 'Pending Quotation' || active_tab === 'Pending Repair Approval' || active_tab === 'Pending Repair'" v-model="article_id_search" label="Article ID" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-autocomplete v-if="active_tab === 'Pending Quotation'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="grade_search_quo" outlined :items="filter_grades" item-text="name" item-value="id" label="Grade" multiple ref="gradeAutocomplete"> </v-autocomplete>
            <v-autocomplete v-if="active_tab === 'Pending Repair Approval'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="grade_search_approval" outlined :items="filter_grades" item-text="name" item-value="id" label="Grade" multiple ref="gradeSearchAutocomplete"> </v-autocomplete>
            <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab == 'Pending Repair Approval'" v-model="repair_quote_percentage_search" label="Repair Quote Percentage" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-autocomplete v-if="active_tab === 'Pending Repair Approval'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="expected_revised_grade_search" outlined :items="filter_expected_revised_grade" item-text="name" item-value="id" label="Expected revised Grade" multiple ref="expectedGradeAutocomplete"> </v-autocomplete>
            <v-autocomplete v-if="active_tab == 'Pending Repair'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="repair_type_search" outlined :items="filter_repair_type" item-text="name" item-value="id" label="Repair Type" class="mr-2" multiple ref="repairTypeAutocomplete"> </v-autocomplete>
            <v-autocomplete v-if="active_tab == 'Pending Repair'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="repair_status_search" outlined :items="filter_repair_status" item-text="name" item-value="id" label="Repair Status" multiple ref="repairStatusAutocomplete"> </v-autocomplete>
            <v-combobox v-if="active_tab == 'Dispatch'" prepend-inner-icon="mdi-magnify" v-model="repair_vendor_search" outlined :items="filter_vendor_list" item-text="vendor_name" item-value="vendor_code" :loading="isLoading" label="Repair Vendor" multiple @change="checkValidRepair" @keydown.enter="handleKeyEnter($event)"> </v-combobox>
            <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab == 'Dispatch'" v-model="repair_order_number_search" label="Repair Order Number" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-autocomplete prepend-inner-icon="mdi-magnify" v-if="active_tab == 'Dispatch'" v-model="status_search" :items="statusList" label="Status" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-autocomplete>
            <v-text-field prepend-inner-icon="mdi-magnify" v-if="active_tab == 'Pending Disposition'" v-model="article_id_search" label="Article ID" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-autocomplete v-if="active_tab == 'Pending Disposition'" v-on:keyup.enter="loadData(active_tab)" prepend-inner-icon="mdi-magnify" v-model="grade_search_disposition" label="Grade" :items="filter_disposition_expected_revised_grade" item-text="name" item-value="id" class="mr-2" outlined multiple ref="gradeSearchDisAutocomplete"></v-autocomplete>

            <v-menu v-model="aspValue" :close-on-content-click="false" v-if="active_tab == 'Pending Disposition'" prepend-inner-icon="mdi-magnify" transition="scale-transition" offset-y>
              <template v-slot:activator="{ on }">
                <v-combobox v-model="random" v-on="on" outlined label="Benchmark Price (₹)" :items="price_list"
                  class="mr-2">
                  <template v-slot:prepend-item>
                    <v-list>
                      <v-sheet>
                        <v-card-title><span>Range</span></v-card-title>
                        <div class="d-flex mb-2">
                          <div class="w-25">
                            <div class="d-flex align-items-center h-100 justify-center">Min</div>
                          </div>
                          <div class="w-75 px-2">
                            <v-text-field outlined hide-details type="number" label="Enter Price" v-model="minValue" class="ma-0" :rules="positiveIntegerRules"></v-text-field>
                          </div>
                        </div>
                        <div class="d-flex mb-2">
                          <div class="w-25">
                            <div class="d-flex align-items-center h-100 justify-center">Max</div>
                          </div>
                          <div class="w-75 px-2">
                            <v-text-field outlined hide-details type="number" label="Enter Price" v-model="maxValue" class="ma-0" :rules="positiveIntegerRules"></v-text-field>
                          </div>
                        </div>
                        <v-divider thickness="2"></v-divider>
                        <v-card-actions class="text-center">
                          <v-spacer></v-spacer>
                          <v-btn small outlined @click="cancelAspValues">Cancel</v-btn>
                          <v-btn small color="primary" @click="aspValue = !aspValue">Submit</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-sheet>
                    </v-list>
                  </template>
                </v-combobox>
              </template>
            </v-menu>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Pending Quotation -->
    <v-row justify="center">
      <v-dialog v-model="datadetailpopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopup = !datadetailpopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.grade ? item_details.grade : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Quotation Details</span>
                  </v-col>
                  <v-col cols="6">
                    <span :disabled="(this.selected.length == 0)">
                      <a class="link-color" @click="itemDialogUpdatePopup"> update</a>
                    </span>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Pending Repair Approval -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPopupPendingRepairApproval" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPopupPendingRepairApproval = !dataDetailPopupPendingRepairApproval">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.grade ? item_details.grade : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Benchmark Price</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.benchmark_price ? item_details.benchmark_price : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Quote</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.repair_amount ? item_details.repair_amount : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Quote Percentage</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.repair_quote_percentage ? item_details.repair_quote_percentage : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Expected Revised Grade</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.formatted_expected_revised_grade ? item_details.formatted_expected_revised_grade : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Pending Repair -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPendingRepairPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPendingRepairPopup = !dataDetailPendingRepairPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Type</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.repair_type_location ? item_details.repair_type_location : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Status</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.current_repair_status ? item_details.current_repair_status : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Dispatch -->
    <v-row justify="center">
      <v-dialog v-model="dataDispatchPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDispatchPopup = !dataDispatchPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Vendor</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.repair_vendor ? item_details.repair_vendor : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Order number</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.order_number ? item_details.order_number : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Returnable DC Number</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.returnable_dc_number ? item_details.returnable_dc_number : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Repair Quote</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.repair_quote ? item_details.repair_quote : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span style="font-weight: 500;">Status</span>
                  </v-col>
                  <v-col cols="6">
                    {{ item_details.status ? item_details.status : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Table-data Detail Popup for Pending-Disposition -->
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
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_details.article_id ? item_details.article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_details.article_description ? item_details.article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Grade</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_details.formatted_expected_revised_grade ? item_details.formatted_expected_revised_grade :
                      'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Benchmark Price</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_details.benchmark_price }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Net Recovery</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_details.repair_amount ? item_details.repair_amount : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Net Recovery%</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ item_details.repair_quote_percentage ? item_details.repair_quote_percentage : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Approve confirm popup in Pending-Repair-Approval Screen -->
    <v-row justify="center">
      <v-dialog v-model="approveconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="approveconfirmpopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> Are you sure you want to Approve?</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" v-if="(active_tab == 'Pending Repair Approval')" :disabled="number > 0" @click="adminApproveItem('approve')">Yes</v-btn>
            <v-btn color="primary" class="mb-3" v-if="(active_tab == 'Pending Disposition')" :disabled="number > 0" @click="adminApproveDispositionItem">Yes</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Reject confirm popup in Pending-Repair-Approval Screen -->
    <v-row justify="center">
      <v-dialog v-model="rejectconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="rejectconfirmpopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> Are you sure you want to Reject?</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" v-if="(active_tab == 'Pending Repair Approval')" :disabled="number > 0" @click="adminRejectItem('reject')">Yes</v-btn>
            <v-btn color="primary" class="mb-3" v-if="(active_tab == 'Pending Disposition')" :disabled="number > 0" @click="adminRejectDispositionItem">Yes</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Approve Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okapproveconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Repair Approval')">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Repair')">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Quotation')">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Disposition')">
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

    <!--Reject Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="okrejectconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Repair Approval')">
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Repair')">
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

    <!-- Dispatch confirm popup in Pending-Repair Screen -->
    <v-row justify="center">
      <v-dialog v-model="dispatchconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dispatchconfirmpopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center" v-if="(active_tab == 'Pending Repair')">
            <span> Are you sure you want to Dispatch to service Center</span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" :disabled="number > 0" @click="adminDispatchItem">Yes</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Update popup in pending-Repair -->
    <v-row justify="center">
      <v-dialog v-model="updatePendingRepairPopup" persistent max-width="366px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Repair Status</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updatePendingRepairColsePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <v-col cols="6" sm="12" md="12" style="height: 96px;">
                <v-autocomplete v-model="rejectPendingRepair" outlined :items="repair_filter_status" item-text="name"
                  item-value="id" label="Pending Repair" style="max-width: 300px;"></v-autocomplete> <br>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="adminUpdatePendingRepairItem"
              :disabled="number > 0 || !rejectPendingRepair">Submit</v-btn>
            <v-btn outlined class="cancel-color mb-3" @click="updatePendingRepairColsePopup">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Header -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" @click="loadData(tab, 'tab_clicked')" style="text-transform:none!important;text-decoration: none;" v-for="(tab, index) in tabs" :key="index">
          {{ tab }}
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- search, filter, Action buttons -->
    <v-card-title style="padding: 12px 20px 0px 20px;">
      <!-- Search fields -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>

      <!-- Actions buttons -->
      <v-actions style="margin-bottom: 12px 20px 0px 20px;">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pending Quotation'" @click="updatedialog">UPDATE</v-btn>
        <v-btn class="ma-2" color="#19B100" style="color:white" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pending Repair Approval' && currentUser.roles.includes('central_admin')" @click="approveConfirmPopup">Approve</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pending Repair Approval' && currentUser.roles.includes('central_admin')" @click="rejectConfirmPopup">Reject</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="disableDispatchPendingRepair()" v-if="active_tab == 'Pending Repair'" @click="dispatchConfirmPopup">Dispatch</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="disableUpdatePendingrepair()" v-if="active_tab == 'Pending Repair'" @click="updatePendingRepairDialog">UPDATE</v-btn>
        <template>
          <div class="text-center mr-3" v-if="(active_tab == 'Pending Disposition') && this.currentUser.roles.includes('default_user')">
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
                  <v-list-item-title>{{ item.original_code }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
        <v-btn class="ma-2" color="#19B100" style="color:white" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pending Disposition' && currentUser.roles.includes('central_admin')" @click="approveConfirmPopup">Approve</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" v-if="active_tab == 'Pending Disposition' && currentUser.roles.includes('central_admin')" @click="rejectConfirmPopup">Reject</v-btn>
      </v-actions>

      <!-- Filter -->
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
          fixed-header
          height="100%"
          :loading="loading"
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template v-if="active_tab != 'Dispatch'" #[`item.item_id`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.item_id }}</u>
            </a>
          </template>
          <template v-if="active_tab == 'Dispatch'" #[`item.tag_number`]="{ item }">
            <a @click="itemDetailpopup(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
          <template #[`item.repair_quote_percentage`]="{ item }">
            <span>{{ item.repair_quote_percentage ? item.repair_quote_percentage : "N/A" }}</span>
          </template>
          <template #[`item.repair_type_location`]="{ item }">
            <span>{{ item.repair_type_location ? item.repair_type_location : "N/A" }}</span>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

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
  import $ from 'jquery';
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
  import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios';
  import { strict } from 'assert';
  import { required, minLength, helpers } from 'vuelidate/lib/validators';

  export default {
    components: {
      HeaderComponent
    },
    data() {
      return {
        headerText: "Repair",
        currentUser: {},
        tabs: [
          "Pending Quotation",
          "Pending Repair Approval",
          "Pending Repair",
          "Dispatch",
          "Pending Disposition",
        ],
        dialog: false,
        dialog_update: "Update",
        headers: [
          { text: "Tag ID", align: "start", sortable: false, value: "item_id" },
          { text: "Article ID", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Grade", value: "grade" },
        ],
        selected: [],
        active_tab: "Pending Quotation",
        table_data: [],
        original_table_data: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        search_tag: '',
        UpdatePopup: false,
        isShow: true,
        repair_id: [],
        expected_revised_grade: '',
        filterPopup: false,
        article_id_search: '',
        grade_search_disposition: [],
        repair_quote_percentage_search: null,
        expected_revised_grade_search: [],
        datadetailpopup: false,
        dataDetailPopupPendingRepairApproval: false,
        dataDetailPendingRepairPopup: false,
        dataDispatchPopup: false,
        tag_number: '',
        item_details: [],
        approveconfirmpopup: false,
        rejectconfirmpopup: false,
        dispatchconfirmpopup: false,
        updatePendingRepairPopup: false,
        repair_status: '',
        rejectPendingRepair: '',
        vendor_name: '',
        repair_quotation_value: '',
        repair_type: '',
        expected_revised_grade: '',
        rejectsussesspopup: false,
        updatemessage: '',
        itemLength: '',
        file: '',
        pending_quotation_attachments: '',
        tag_id: '',
        repair_vendor: '',
        repair_order_number: '',
        status: '',
        selectedDisposition: '',
        assign_disposition_list: [],
        successmessage: '',
        search: '',
        number: 0,
        okapproveconfirmpopup: false,
        okrejectconfirmpopup: false,
        vendor_list: '',
        vendorCodeTosend: '',
        vendor_code: '',
        tag_id_search: '',
        repair_vendor_search: [],
        repair_order_number_search: '',
        status_search: '',
        repair_type_search: [],
        repair_status_search: [],
        benchmark_price_search: '',
        datadetailpopupdisposition: false,
        repair_filter_status: '',
        repair_type_list: '',
        expected_revised_grade_list: '',
        filter_grades: '',
        filter_repair_type: '',
        filter_repair_status: '',
        filter_vendor_list: '',
        filter_disposition_expected_revised_grade: '',
        vendor_code_update: [],
        message: '',
        grade_search_quo: [],
        grade_search_approval: [],
        maxValue: '',
        minValue: '',
        vendor_list_item: '',
        alert: false,
        alert_type: '',
        alert_message: '',
        currentUser: {},
        item_id: '',
        isLoading: false,
        aspValue: false,
        price_list: '',
        positiveIntegerRules: [
          (value) => Number(value) >= 0 || 'Value must be a positive integer',
        ],
        invalidFileType: false,
        statusList: ["Pending Pick-Up", "Pending Packaging", "Pending Dispatch", "Pending Disposition"],
      }
    },

    computed: {
      fileTypeRule() {
        return (value) => {
          if (!value) {
            this.invalidFileType = false;
            return true;
          }
          const allowedTypes = ['.png', '.pdf'];
          const fileType = value ? value.name.slice(value.name.lastIndexOf('.')) : '';
          this.invalidFileType = !allowedTypes.includes(fileType);
          return !this.invalidFileType || 'Invalid file type';

        };
      },

      isSubmitDisabled() {
        // Check if any required field is empty
        if (
          !this.vendor_list_item ||
          !this.repair_quotation_value ||
          !this.repair_type_list ||
          !this.expected_revised_grade_list ||
          !this.isFileTypeValid() ||
          this.number > 0
        ) {
          return true; // Disable the submit button
        }
        return false; // Enable the submit button
      },

    },

    async created() {
      this.currentUser = this.$store.state.currentUser;
      this.loadData('Pending Quotation');
      this.scrollToTop();
    },

    watch: {
      grade_search_quo(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.gradeAutocomplete.internalSearch = '';
          });
        }
      },
      grade_search_approval(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.gradeSearchAutocomplete.internalSearch = '';
          });
        }
      },
      expected_revised_grade_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.expectedGradeAutocomplete.internalSearch = '';
          });
        }
      },
      repair_type_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.repairTypeAutocomplete.internalSearch = '';
          });
        }
      },
      repair_status_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.repairStatusAutocomplete.internalSearch = '';
          });
        }
      },
      repair_vendor_search(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.repairVendorAutocomplete.internalSearch = '';
          });
        }
      },
      grade_search_disposition(newValue) {
        if (newValue && newValue.length > 0) {
          this.$nextTick(() => {
            this.$refs.gradeSearchDisAutocomplete.internalSearch = '';
          });
        }
      },
    },


    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
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
        }, 3000);
      },


      // loading the table data to the table

      loadData(tab, tab_action) {
        if (tab_action) {
          this.search_tag = '';
        }
        this.loading = true;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if (tab == "Pending Quotation") {
          (this.headers = [
            { text: "Tag ID", align: "start", sortable: false, value: "item_id" },
            { text: "Article ID", value: "article_id" },
            { text: "Article Description", value: "article_description" },
            { text: "Grade", value: "grade" },
          ]);


          this.fetchPendingQuotation();
          this.fetchFilterGradePendingQuotation();
        }
        if (tab == 'Pending Repair Approval') {
          (this.headers = [
            { text: "Tag ID", value: "item_id", width: '12%', align: "start", sortable: false },
            { text: "Article ID", value: "article_id" },
            { text: "Grade", value: "grade" },
            { text: "Benchmark Price (₹)", value: "benchmark_price" },
            { text: "Repair Quote (₹)", value: "repair_amount" },
            { text: "Repair Quote Percentage (%)", value: "repair_quote_percentage" },
            { text: "Expected Revised Grade", value: "formatted_expected_revised_grade" },
          ]);
          this.fetchPendingRepairApproval();
          this.fetchFilterGradePendingRepairApproval()

        }
        if (tab == 'Pending Repair') {
          (this.headers = [
            { text: "Tag ID", value: "item_id", width: '12%', align: "start", sortable: false },
            { text: 'Article ID', value: 'article_id' },
            { text: 'Article Description', value: 'article_description' },
            { text: 'Repair Types', value: 'repair_type_location' },
            { text: 'Repair Status', value: 'current_repair_status' }
          ]);
          this.fetchPendingRepair();
          this.fetchFilterPendingRepair();
        }
        if (tab == 'Dispatch') {
          (this.headers = [
            { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
            { text: 'Repair Vendor', value: 'repair_vendor' },
            { text: 'Repair Order Number', value: 'order_number' },
            { text: 'Returnable DC Number', value: 'returnable_dc_number' },
            { text: 'Repair Quote (₹)', value: 'repair_quote' },
            { text: 'Status', value: 'status' }
          ]);
          this.fetchDispatch();
          // this.fetchFilterDispatch();
        }
        if ((tab == 'Pending Disposition') && (this.currentUser.roles.includes('central_admin'))) {
          (this.headers = [
            { text: "Tag ID", value: "item_id", width: '12%', align: "start", sortable: false },
            { text: 'Article ID', value: 'article_id' },
            { text: 'Article Description', value: 'article_description' },
            { text: 'Grade', value: 'formatted_expected_revised_grade' },
            { text: 'Assigned Disposition', value: 'disposition_name' },
            { text: 'Benchmark Price (₹)', value: 'benchmark_price' },
            { text: 'Net Recovery (₹)', value: 'repair_amount' },
            { text: 'Net Recovery (%)', value: 'repair_quote_percentage' }

          ]);
          this.fetchPendingDisposition();
          this.fetchFilterPendingDisposition();
          this.assignDispositionList();
        }
        if ((tab == 'Pending Disposition') && (this.currentUser.roles.includes('default_user'))) {
          (this.headers = [
            { text: "Tag ID", value: "item_id", width: '12%', align: "start", sortable: false },
            { text: 'Article ID', value: 'article_id' },
            { text: 'Article Description', value: 'article_description' },
            { text: 'Grade', value: 'formatted_expected_revised_grade' },
            { text: 'Benchmark Price', value: 'benchmark_price' },
            { text: 'Net Recovery', value: 'repair_amount' },
            { text: 'Net Recovery %', value: 'repair_quote_percentage' }

          ]);
          this.fetchPendingDisposition();
          this.fetchFilterPendingDisposition();
          this.assignDispositionList();
        }
      },

      // fetch the data from the API to load data to the table

      fetchPendingQuotation() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/index_new",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Quotation',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.repairs
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

      fetchFilterGradePendingQuotation() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_filters_data",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Quotation',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.filter_grades = response.data.grades
              this.filter_expected_revised_grade = response.data.expected_revised_grade
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


      fetchPendingRepairApproval() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/index_new",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Repair Approval',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.repairs
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


      fetchFilterGradePendingRepairApproval() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_filters_data",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Repair Approval',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.filter_grades = response.data.grades
              this.filter_expected_revised_grade = response.data.expected_revised_grade
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


      fetchPendingRepair() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/index_new",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Repair',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.repairs
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

      fetchFilterPendingRepair() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_filters_data",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Repair',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.filter_repair_type = response.data.repair_type
              this.filter_repair_status = response.data.repair_statuse
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

      fetchDispatch() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/repair_dispatch_items",
            {
              params:
              {
                tag_number: this.search_tag,
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.warehouse_order_items
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

      fetchFilterDispatch(val) {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        const params2 = {
          query: val,
        }
        this.isLoading = true;
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_vendor_master",
            {
              params: params2
              // params: 
              // { 
              //   tag_number:this.search_tag,
              //   page: params['page'], 
              //   per_page: params['size'] 
              // } 
            })
          .then(response => {
            if (response.data) {
              this.filter_vendor_list = response.data.vendor_masters
              this.isLoading = false;
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


      fetchPendingDisposition() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/index_new",
            {
              params:
              {
                tag_number: this.search_tag,
                status: 'Pending Disposition',
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.repairs
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

      fetchFilterPendingDisposition() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_filters_data",
            {
              params:
              {
                tag_number: this.search_tag,
                page: params['page'],
                per_page: params['size']
              }
            })
          .then(response => {
            if (response.data) {
              this.filter_disposition_expected_revised_grade = response.data.expected_revised_grade
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

      // To handle the page change

      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Pending Quotation') {
          this.fetchPendingQuotation();
        } else if (this.active_tab == 'Pending Repair Approval') {
          this.fetchPendingRepairApproval();
        } else if (this.active_tab == 'Pending Repair') {
          this.fetchPendingRepair();
        } else if (this.active_tab == 'Dispatch') {
          this.fetchDispatch();
        } else {
          this.fetchPendingDisposition();
        }
      },

      //  To handle the page size change
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'Pending Quotation') {
          this.fetchPendingQuotation();
        } else if (this.active_tab == 'Pending Repair Approval') {
          this.fetchPendingRepairApproval();
        } else if (this.active_tab == 'Pending Repair') {
          this.fetchPendingRepair();
        } else if (this.active_tab == 'Dispatch') {
          this.fetchDispatch();
        } else {
          this.fetchPendingDisposition();
        }
      },

      // To handle the file upload
      handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.file = reader.result;
        };
        reader.readAsBinaryString(file);
      },
      selectFile(event) {
        this.file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsBinaryString(this.file)
        reader.onload = () => {
          this.binaryData = btoa(reader.result)
        }
      },

      itemDialogUpdatePopup() {
        this.UpdatePopup = true;
        this.number = 0;
        this.datadetailpopup = false;
        this.updatedialog();
      },

      // Update Dialog for Pending Quotation Tab
      updatedialog() {
        this.updatedialogVendornamelist('');
        this.UpdatePopup = true;
        this.number = 0;
        this.vendor_list_item = '';
        this.repair_id = this.selected.map(repairs => repairs.id)
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_filters_data", { params: { id: this.repair_id } })
          .then(response => {
            if (response.data) {
              this.repair_type = response.data.repair_type;
              this.expected_revised_grade = response.data.expected_revised_grade;
              // this.vendor_list_item='';
              this.repair_quotation_value = '';
              this.repair_type_list = '';
              this.expected_revised_grade_list = '';
              this.file = '';
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
      checkValidRepair() {
        if (this.repair_vendor_search.length >= 2) {
          const secondLastIndex = this.repair_vendor_search.length - 2;
          if (typeof this.repair_vendor_search[secondLastIndex] !== 'object') {
            this.repair_vendor_search.splice(secondLastIndex, 1);
          }
        }
      },
      handleKeyEnter(event) {
        if (this.active_tab == "Pending Quotation") {
          this.updatedialogVendornamelist(event.target.value);
        } else if (this.active_tab == "Dispatch") {
          this.fetchFilterDispatch(event.target.value);
        }
      },
      // Update dialog vendors name list in pending-Quotation screen
      updatedialogVendornamelist(val) {
        this.isLoading = true;
        const params = {
          query: val,
        }
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_vendor_master", { params: params })
          .then(response => {
            if (response.data) {
              this.vendor_list = response.data.vendor_masters
              this.isLoading = false;
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

      // submit on update dialog in Pending-Quotation
      updatePendingQuotationSubmit() {

        this.number++;
        if (!this.vendor_list_item.vendor_code) {
          this.$toast.error("Please select valid vendor name.");
          this.number = 0;
          return;
        }

        const repairDetails = {
          "ids": [],
          "status": this.active_tab,
          "vendor_code": this.vendor_list_item.vendor_code,
          "repair_quotation_value": this.repair_quotation_value,
          "repair_type": this.repair_type_list,
          "expected_revised_grade": this.expected_revised_grade_list,
        }

        if (this.selected.length == 0) {
          this.repair_id = this.item_id;
          repairDetails.ids.push(this.item_id);
        } else {
          this.repair_id = this.selected.map(repairs => repairs.id)
          for (const id of this.repair_id) {
            repairDetails.ids.push(id);
          }
        }

        const formData = new FormData();
        formData.append("file", this.file);
        for (const key in repairDetails) {
          formData.append(`repair_details[${key}]`, (repairDetails[key]));
        }


        this.$http.secured.put("/api/v1/warehouse/new_repairs/update_pending_quotation", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.vendor_name = '';
              this.repair_quotation_value = '';
              this.repair_type = '';
              this.expected_revised_grade = '';
              this.file = '';
              this.vendorNameToSend = '';
              this.UpdatePopup = false;
              this.updatemessage = 'Pending Quotation';
              this.okapproveconfirmpopup = true;
              this.itemLength = this.selected.length;
              this.showAlert("success", "Successfully updated");
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.number = 0;
            this.loading = false;
          });
      },

      //  Update in pending-Quotation popup close
      updatePendingQuotationCancel() {
        this.vendor_name = '';
        this.repair_quotation_value = '';
        this.repair_type = '';
        this.expected_revised_grade = '';
        this.UpdatePopup = false;
        this.file = null;
        this.invalidFileType = false;
        this.vendorNameToSend = '';
      },


      // filter Dialog PopUP 
      filterListOfButtons(ev) {
        this.filterPopup = true;
        if (this.active_tab == 'Dispatch') {
          this.fetchFilterDispatch('');
        }
      },


      // Item dialog popup in pending Quotation
      itemDetailpopup(item) {
        if (this.active_tab == 'Pending Quotation') {
          this.datadetailpopup = true;
          this.tag_number = item.item_id;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/new_repairs/${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.repair
                this.require_doc = response.data.repair.pending_quotation_attachments
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
        } else if (this.active_tab == 'Pending Repair Approval') {
          this.dataDetailPopupPendingRepairApproval = true;
          this.tag_number = item.item_id;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/new_repairs/${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.repair
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
        } else if (this.active_tab == 'Pending Repair') {
          this.dataDetailPendingRepairPopup = true;
          this.tag_number = item.item_id;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/new_repairs/${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.repair
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
        else if (this.active_tab == 'Dispatch') {
          this.dataDispatchPopup = true;
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/new_repairs/repair_dispatch_item?id=${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.warehouse_order_item
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
        else if (this.active_tab == 'Pending Disposition') {
          this.datadetailpopupdisposition = true;
          this.tag_number = item.item_id;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
            .get(`/api/v1/warehouse/new_repairs/${this.item_id}`)
            .then(response => {
              if (response.data) {
                this.item_details = response.data.repair
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


      // Approve Dialog in Pending Repair Aproval
      approveConfirmPopup() {
        this.approveconfirmpopup = true;
      },

      // Admin Approve function after Approved by clicking yes
      adminApproveItem(approvalStatus) {
        this.number++;
        this.repair_id = this.selected.map(repairs => repairs.id);
        const repairDetails = {
          "ids": this.repair_id,
          "status": this.active_tab,
          "repair_approval": approvalStatus,
          "repair_status": ""
        }
        this.$http.secured.put('/api/v1/warehouse/new_repairs/update_details',
          {
            "repair_details": repairDetails
          },)
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.approveconfirmpopup = false;
              this.okapproveconfirmpopup = true;
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;

          });
      },

      afterClickOkLoadData() {
        this.okapproveconfirmpopup = false;
        this.okrejectconfirmpopup = false;
        this.loadData(this.active_tab);
      },

      // Reject Dialog in Pending Repair Aproval
      rejectConfirmPopup() {
        this.rejectconfirmpopup = true;
      },


      // Admin Reject function after rejecting by clicking yes
      adminRejectItem(approvalStatus) {
        // post method to send the response
        this.number++;
        this.repair_id = this.selected.map(repairs => repairs.id);
        const repairDetails = {
          "ids": this.repair_id,
          "status": this.active_tab,
          "repair_approval": approvalStatus,
          "repair_status": ""
        }
        this.$http.secured.put('/api/v1/warehouse/new_repairs/update_details',
          {
            "repair_details": repairDetails
          },)
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.rejectconfirmpopup = false;
              this.okrejectconfirmpopup = true;
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;

          });
      },

      // dispatch dialog in Pending Repair
      dispatchConfirmPopup() {
        this.dispatchconfirmpopup = true;
      },

      // Admin dispatch function aftre dispatching in Pending Repair
      adminDispatchItem() {
        this.number++;
        this.vendor_code_update = this.selected.map(repairs => repairs.vendor_code);
        this.repair_id = this.selected.map(repairs => repairs.id);
        const repairDetails = {
          "ids": this.repair_id,
          "status": this.active_tab,
          "vendor_code": this.vendor_code_update,
        }

        this.$http.secured.put('/api/v1/warehouse/new_repairs/create_dispatch_items', {
          "repair_details": repairDetails
        })
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.dispatchconfirmpopup = false;
              this.okapproveconfirmpopup = true;
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.dispatchconfirmpopup = false;
            this.number = 0;
            this.loading = false;
          });
      },

      // Admin update in Pending-Repair once clicked submit
      adminUpdatePendingRepairItem() {
        this.number++;
        this.repair_id = this.selected.map(repairs => repairs.id);
        const repairDetails = {
          "ids": this.repair_id,
          "status": this.active_tab,
          "repair_approval": '',
          "repair_status": this.rejectPendingRepair,
        }
        this.$http.secured.put('/api/v1/warehouse/new_repairs/update_details',
          {
            "repair_details": repairDetails
          },)
          .then(response => {
            if (response.data) {
              this.message = response.data.message;
              this.rejectPendingRepair = '';
              this.updatePendingRepairPopup = false;
              this.okrejectconfirmpopup = true;
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;

          });
      },

      // Admin Approve in Pending-disposition once clicked Approve visible for central user 
      adminApproveDispositionItem() {
        this.number++;
        this.repair_id = this.selected.map(repairs => repairs.id);
        const repairDetails = {
          "ids": this.repair_id,
          "status": this.active_tab,
        }
        this.$http.secured.post('/api/v1/warehouse/new_repairs/update_disposition_item',
          {
            "repair_details": repairDetails
          },)
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.approveconfirmpopup = false;
              this.okapproveconfirmpopup = true;
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },


      // Admin Reject in Pending-disposition once clicked Reject.... visible for central user  
      adminRejectDispositionItem() {
        this.number++;
        this.repair_id = this.selected.map(repairs => repairs.id);
        const temp = this.repair_id.join(', ');
        const repairDetails = {
          "ids": temp,
        }
        this.$http.secured.put('/api/v1/warehouse/new_repairs/reject_disposition_item',
          {
            "repair_details": repairDetails
          },)
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.rejectconfirmpopup = false;
              this.okapproveconfirmpopup = true;
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;
          });
      },



      // Apply Filters Function
      applyFilterFunc() {
        this.search_tag = '';
        const params = new URLSearchParams();

        const pageparams = this.getRequestParams(
          this.page,
          this.pageSize
        );

        params.append('page', pageparams['page'])
        params.append('per_page', pageparams['size'])

        if (this.active_tab == "Pending Quotation") {

          params.append('article_id', this.article_id_search);
          params.append('status', 'Pending Quotation');

          if (this.grade_search_quo.length > 0)
            params.append('grade', JSON.stringify(this.grade_search_quo.map(item => item)));
          else params.append('grade', this.grade_search_quo);

          this.$http.secured
            .get('/api/v1/warehouse/new_repairs/index_new', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.repairs
                this.totalPages = response.data.meta.total_pages
                this.filterPopup = false;
                this.article_id_search = '';
                this.grade_search_quo = [];
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
        if (this.active_tab == "Pending Repair Approval") {
          params.append('status', 'Pending Repair Approval')
          params.append('article_id', this.article_id_search);
          params.append('repair_quote_percentage', this.repair_quote_percentage_search);

          // if conditions are added because to send an empty string when the array is empty as per the requirement from backend.
          if (this.grade_search_approval.length > 0)
            params.append('grade', JSON.stringify(this.grade_search_approval.map(item => item)));
          else params.append('grade', this.grade_search_approval);


          if (this.expected_revised_grade_search.length > 0)
            params.append('expected_revised_grade', JSON.stringify(this.expected_revised_grade_search.map(item => item)));
          else params.append('expected_revised_grade', this.expected_revised_grade_search);

          this.$http.secured
            .get('/api/v1/warehouse/new_repairs/index_new', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.repairs
                this.totalPages = response.data.meta.total_pages
                this.filterPopup = false;
                this.article_id_search = '';
                this.grade_search_approval = [];
                this.repair_quote_percentage_search = '';
                this.expected_revised_grade_search = [];
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
        if (this.active_tab == "Pending Repair") {

          params.append('status', 'Pending Repair')
          params.append('article_id', this.article_id_search);

          if (this.repair_type_search.length > 0)
            params.append('repair_type', JSON.stringify(this.repair_type_search.map(item => item)))
          else params.append('repair_type', this.repair_type_search);


          if (this.repair_status_search.length > 0)
            params.append('repair_status', JSON.stringify(this.repair_status_search.map(item => item)))
          else params.append('repair_status', this.repair_status_search);


          this.$http.secured
            .get('/api/v1/warehouse/new_repairs/index_new', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.repairs
                this.totalPages = response.data.meta.total_pages
                this.filterPopup = false;
                this.article_id_search = '';
                this.repair_type_search = [];
                this.repair_status_search = [];
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
        if (this.active_tab == "Dispatch") {
          if (this.repair_vendor_search.length >= 1) {
            const LastIndex = this.repair_vendor_search.length - 1;
            if (typeof this.repair_vendor_search[LastIndex] !== 'object') {
              this.repair_vendor_search.splice(LastIndex, 1);
            }
          }
          const temp_status = (this.status_search == 'Pending Pick-Up') ? 'pending_pickup' : (this.status_search == 'Pending Packaging') ? 'pending_packaging' : (this.status_search == 'Pending Dispatch') ? 'pending_dispatch' : (this.status_search == 'Pending Disposition') ? 'pending_disposition' : '';
          params.append('repair_order', this.repair_order_number_search);
          params.append('status', temp_status);

          if (this.repair_vendor_search.length > 0)
            params.append('repair_vendor_code', JSON.stringify(this.repair_vendor_search.map(item => item.vendor_code)));
          else params.append('repair_vendor_code', this.repair_vendor_search);

          this.$http.secured
            .get('/api/v1/warehouse/new_repairs/repair_dispatch_items', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.warehouse_order_items
                this.totalPages = response.data.meta.total_pages
                this.filterPopup = false;
                this.repair_vendor_search = [];
                this.repair_order_number_search = '';
                this.repair_status = '';
                this.loading = false;
                this.status_search = '';
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
        if (this.active_tab == "Pending Disposition") {

          params.append('status', 'Pending Disposition');
          params.append('article_id', this.article_id_search);

          if (this.grade_search_disposition.length > 0)
            params.append('expected_revised_grade', JSON.stringify(this.grade_search_disposition.map(item => item)))
          else params.append('expected_revised_grade', this.grade_search_disposition)

          params.append('price_min', this.minValue);
          params.append('price_max', this.maxValue)
          this.$http.secured
            .get('/api/v1/warehouse/new_repairs/index_new', { params })
            .then(response => {
              if (response.data) {
                this.table_data = response.data.repairs
                this.totalPages = response.data.meta.total_pages
                this.filterPopup = false;
                this.article_id_search = '';
                this.grade_search_disposition = [];
                this.benchmark_price_search = '';
                this.minValue = '',
                  this.maxValue = '',
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

      // close filter popup and clear all the fields
      closeFilterpopup() {
        this.filterPopup = false;
        this.article_id_search = '';
        this.grade_search_quo = [];
        this.grade_search_approval = [];
        this.repair_quote_percentage_search = '';
        this.expected_revised_grade_search = [];
        this.repair_type_search = [];
        this.repair_status_search = [];
        this.repair_vendor_search = [];
        this.repair_order_number_search = '';
        this.status_search = '';
        this.grade_search_disposition = [];
        this.minValue = '';
        this.maxValue = '';
      },

      // Repair Status dialog opens when clicked on update button in pending Repair
      updatePendingRepairDialog() {
        this.updatePendingRepairPopup = true;
        this.repair_id = this.selected.map(repairs => repairs.id)
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_filters_data", { params: { id: this.repair_id } })
          .then(response => {
            if (response.data) {
              this.repair_filter_status = response.data.repair_filter_status
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


      // Update close dialog function in Pending-Repair
      updatePendingRepairColsePopup() {
        this.updatePendingRepairPopup = false;
        this.rejectPendingRepair = '';
      },

      // Assigning Dispositions menu in Pending Disposition Screen
      assignDispositionList() {
        this.$http.secured
          .get("/api/v1/warehouse/new_repairs/get_dispositions")
          .then(response => {
            if (response.data) {
              this.assign_disposition_list = response.data.dispositions;
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


      assignDisposition(item) {
        // post method to send disposition after selecting
        this.repair_id = this.selected.map(repairs => repairs.id)
        const repairDetails = {
          "ids": this.repair_id,
          "disposition": item.original_code,
        }
        this.$http.secured
          .put("/api/v1/warehouse/new_repairs/update_disposition", {
            "repair_details": repairDetails,
            "status": "Pending Disposition"
          },)
          .then(response => {
            if (response.data) {
              this.message = response.data.message
              this.okapproveconfirmpopup = true,
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

      disableDispatchPendingRepair() {
        return this.selected.length == 0 || this.selected.some(item => item.current_repair_status == 'Pending dispatch to service center' || item.current_repair_status == 'Pending receipt from service center') ||
          this.selected.some(item => item.repair_type_location == 'Location') ||
          this.selected.some(item => item.repair_type_location == null);
      },

      disableUpdatePendingrepair() {
        return this.selected.length == 0 ||
          this.selected.some(item => item.current_repair_status == 'Pending dispatch to service center' && item.repair_type_location == 'Service center') ||
          this.selected.some(item => item.current_repair_status == 'Pending repair' && item.repair_type_location == 'Service center') ||
          this.selected.some(item => item.current_repair_status == 'Repaired' && item.repair_type_location == 'Service center') ||
          this.selected.some(item => item.repair_type_location == null);
      },

      isFileTypeValid() {
        if (this.file) {
          const allowedFileTypes = ['.pdf', '.png'];
          const fileType = this.file.name.substring(this.file.name.lastIndexOf('.')).toLowerCase();
          if (!allowedFileTypes.includes(fileType)) {
            console.error('Invalid file type. Only PDF and PNG files are allowed.');
            return false;
          }
        }
        return true;
      },

      cancelAspValues() {
        this.maxValue = '';
        this.minValue = '';
        this.aspValue = false;
      },
    }
  }
</script>

<style scoped>
  .v-dialog__content:has(.filter-repair) {
    justify-content: right;
    align-items: baseline;
    top: 15rem;
  }

  .link-color {
    color: #0357D0;
    font-size: 14px;
    font-weight: 600;
  }

  .bg-color {
    background: #0357D0;
    color: #ffffff;
  }

  .fieldset {
    background: #0357D0;
  }
  .item-selected {
    margin-top: 29px;
    position: absolute;
    left: 35%;
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
