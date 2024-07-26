<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <!-- Alert message -->
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>
        <!-- Title-->
        <header-component :headerTitle="headerText" />

            <!-- filter data popup -->
             <v-row justify="center">
                <v-dialog content-class="filter-data" v-model="filterPopup" persistent max-width="1092px">
                    <v-card style="max-width: 100% !important;">
                        <v-card-text class="pb-0">
                            <v-row class="pt-5">
                                <v-text-field prepend-inner-icon="mdi-magnify" v-model="prd_number"  label="PRD Number" class="ma-2" outlined style="max-width: 250px;"></v-text-field>
                                <v-text-field prepend-inner-icon="mdi-magnify" v-model="reasonRefDocNo"  label="Internal Reason Ref Doc Num" class="ma-2" outlined style="max-width: 250px;"></v-text-field>
                                <v-text-field prepend-inner-icon="mdi-magnify" v-model="RefDocNo"  label="Internal Ref Doc Num" class="ma-2" outlined style="max-width: 250px;"></v-text-field>
                                <v-text-field prepend-inner-icon="mdi-magnify" v-model="tag_id"  label="Tag ID" class="ma-2" outlined style="max-width: 250px;"></v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field prepend-inner-icon="mdi-magnify" v-model="article_id"  label="Article ID" class="ma-2" outlined style="max-width: 250px;"></v-text-field>
                                <v-text-field prepend-inner-icon="mdi-magnify" v-model="serial_no"  label="Serial Number" class="ma-2" outlined style="max-width: 250px;"></v-text-field>
                                <v-autocomplete prepend-inner-icon="mdi-magnify" v-model="irrd_type"  :items = "irrdType_list" item-text = "name" item-value = "id" label="IRRD Type" class="ma-2" outlined style="max-width: 250px;"></v-autocomplete>
                            </v-row>
                            <v-card-actions class="margin-10">
                                <v-spacer></v-spacer>
                                <v-btn small color="primary" outlined @click="filterPopup = false">CANCEL</v-btn>
                                <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>

            <!-- ird number dropdown popup -->
            <v-row justify="center">
                <v-dialog v-model="irdPopUp" persistent :max-width="ird_width">
                    <v-card class="v-card-100">
                        <v-card class="v-card-100">
                            <v-card-title>
                                <span>Create IRD</span>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="irdPopUp = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                        </v-card>
                        <v-card-text class="d-flex mt-6">
                            <v-autocomplete prepend-inner-icon="mdi-magnify" label="IRRD NUMBER" :item="irrdList" v-model="irrd_selected" outlined style="max-width: 400px;"></v-autocomplete>
                            <v-btn color="primary" class="mt-2 ml-8" @click="showDataByIrd">GO</v-btn>
                        </v-card-text>
                        <v-card-text v-if="irrdTableData" class="px-0 pb-0">
                            <v-layout column>
                                <v-flex md6 style="overflow: auto">
                                    <v-list-item-content class="pl-2 pr-2">
                                        <v-data-table 
                                            :dense="true" 
                                            disable-pagination 
                                            :hide-default-footer="true"
                                            :headers="irrdHeaders" 
                                            :items="irrd_table_data"
                                            fixed-header
                                            height = "300px"
                                            style="max-height:300px; overflow-y: scroll;"
                                            class="elevation-1">
                                            <template #[`item.received_quantity`]="{ item }">
                                                <v-text-field v-model="item.received_quantity" placeholder="Enter QTY"></v-text-field>
                                            </template>
                                        </v-data-table>
                                    </v-list-item-content>
                                </v-flex>
                            </v-layout>
                            <a @click="addMoreColumn" style="text-decoration:underline; color:#007BFF; margin: 12px;">
                                <span v-if="view_more">View Less</span>
                                <span v-else>View ALL</span>
                            </a>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="cancel-color ma-2"  outlined color="primary" >CANCEL</v-btn>
                                    <v-btn class="ma-2" color="primary">SUBMIT</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
            <!-- Excel Upload popup -->
            <v-row justify="center">
                <v-dialog v-model="excelUploadPopup" persistent max-width="424px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Create PRD</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="cancelUploadFile">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                <v-card-text>
                    <v-container>
                        <v-file-input
                            v-model="upload_file"
                            label="Attach PRD Csv file"
                            @change="changeFile"
                            style="margin-top: 28px;"
                            accept=".csv"
                            >
                        </v-file-input>
                        <div v-if="uploading">
                            Uploading file ({{ uploadPercentage }}%)
                            <v-progress-linear
                            :value="uploadPercentage"
                            color="blue"
                            height="10"
                            ></v-progress-linear>
                        </div>
                    </v-container>
                </v-card-text>
                <v-card-actions center>
                    <v-spacer></v-spacer>
                        <v-btn color="primary" class="mb-3" v-if="this.confirmButton != 'FINISH'" @click="uploadFile" :disabled="!upload_file">Confirm</v-btn>
                        <v-btn color="primary" class="mb-3" v-if="this.confirmButton == 'FINISH'" @click="confirmUploadFile" :disabled="!upload_file || number>0">Finish</v-btn>
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="cancelUploadFile">Cancel</v-btn>   
                    <v-spacer></v-spacer>
                </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>

            <!-- Manual Creation popup -->
            <v-row justify="center">
                <v-dialog v-model="manualCreationPopup" persistent max-width="700px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Create PRD</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="closeManualcreation">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                <v-card-text style="padding: 0px 20px;">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field v-model="articleId" label="Article ID" outlined style="margin-bottom: 0px !important;"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field v-model="serialNo" label="Serial Number" outlined style="margin-bottom: 0px !important;"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="5" md="6">
                                <v-text-field v-model="quantity" label="Quantity" outlined style="margin-bottom: 0px !important;" type="number"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions center>
                    <v-spacer></v-spacer>
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="closeManualcreation">Cancel</v-btn>
                        <v-btn color="primary" :disabled="articleId=='' || serialNo =='' || quantity ==''" class="cancel-color mb-3" @click="submitManualCreation">Submit</v-btn>   
                    <v-spacer></v-spacer>
                </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>

            <!--Approve Ok confirm popup -->
            <v-row justify="center">
                <v-dialog v-model="okapproveconfirmpopup" persistent max-width="424px">
                <v-card class="v-card-100">
                    <v-card-title v-if="action_name == 'success' || action_name == 'deletion_reject'">
                        <v-spacer></v-spacer>
                        <v-btn icon @click="approvalConfirmationCancel">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card class="v-card-100"  v-if="action_name == 'delete' || action_name == 'deletion_approval'">
                        <v-card-title>
                            <span v-if="action_name == 'deletion_approval'">Remarks</span>
                            <span v-if="action_name == 'delete'">Reason For Deletion</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="approvalConfirmationCancel">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                    <v-card-text class="text-center">
                         <span v-if="action_name == 'success' || action_name == 'deletion_reject'"> {{message}} </span>
                         <span v-if="action_name == 'deletion_approval'">
                            <v-text-field label="Enter the remarks" v-model="deletion_remarks" outlined class="mt-7"></v-text-field>
                         </span>
                         <span v-if="action_name == 'delete'">
                            <v-text-field label="Enter reason for deleting this PRD" v-model="deletion_remarks" outlined class="mt-7"></v-text-field>
                         </span>
                    </v-card-text>
                    <v-card-actions center v-if="confirmedClicked == false">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mb-3" @click="approvalCinfirmed" :disabled="action_name != 'deletion_reject' && !deletion_remarks">Confirm</v-btn>
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="approvalConfirmationCancel">Cancel</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-card-actions v-if="confirmedClicked">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mb-3" @click="okClicked">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>

            <v-card class="v-card-100">
                <v-tabs>
                    <v-tab ripple :href="'#'" @click="loadData(tab,'tab_clicked')" style="text-transform:none!important;
                    text-decoration: none; padding-top: 4px;" v-for="tab in tabs" :key="tab"> {{tab}}</v-tab>
                </v-tabs>
            </v-card>

            <v-row class="mt-5 mx-4">
                <!-- <v-autocomplete label="Select Field" outlined :items="fieldlist" style="max-width: 200px; margin-right: 12px;" v-if="active_tab == 'Incomplete PRD\'s'"></v-autocomplete> -->
                <v-text-field label="Search" prepend-inner-icon="mdi-magnify" v-model="search_tag" style="max-width: 200px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn :disabled="selected.length == 0" color="primary" class="ma-2" v-if="active_tab == 'Incomplete PRD\'s'" @click="download_incomplete_file">DOWNLOAD</v-btn>
                <v-btn color="primary" class="ma-2" v-if="active_tab == 'Incomplete PRD\'s'" @click="itemIrrdDetailpopup([],'upload_prd')">UPLOAD</v-btn>
                <v-btn color="primary" class="ma-2" v-if="active_tab == 'Incomplete PRD\'s'" @click="itemIrrdDetailpopup([],'create_prd')">CREATE PRD</v-btn>
                <!-- <v-btn color="primary" class="ma-2" v-if="active_tab == 'Incomplete PRD\'s'" @click="creatPRD('IRD Number')">CREATE IRD</v-btn> -->
                <v-btn :disabled="selected.length == 0" color="primary" @click="deleteItem" class="ma-2" v-if="active_tab == 'Incomplete PRD\'s' || active_tab == 'Open PRD\'s'">DELETE</v-btn>
                <v-btn  color="primary" class="ma-2" :disabled="selected.length == 0" v-if="active_tab == 'Approval'" @click="opendApprove">APPROVE</v-btn>
                <v-btn  color="primary" class="ma-2" :disabled="selected.length == 0" v-if="active_tab == 'Approval'" @click="OpenReject">Reject</v-btn>

                <!-- Filter -->
                <v-expansion-panels class="custom-control_outlined ml-2" ref = "filterPopupRef" readonly style="max-width: 250px; margin-bottom: 28px; min-height: 56px;">
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
            </v-row>
            <!-- search, filter, Action buttons -->
            <!-- <v-card class="v-card-100">
                <v-card-title style="padding: 12px 24px 4px 24px;"> -->
                <!-- Search fields -->
                <!-- <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData()" ></v-text-field> -->
                <!-- <v-spacer></v-spacer> -->
                <!-- Actions buttons -->
                <!-- <v-actions style="margin-bottom: 28px;display: flex;">
                    <div class="text-center mt-2 mr-2">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attr }">
                                <v-btn color="primary" v-on="on" v-bind="attr">
                                Create PRD
                                <v-icon dark>
                                    mdi-menu-down
                                </v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in prdList"
                                @click="creatPRD(item)" :key="index">
                                <v-list-item-title>{{ item }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <v-btn class="ma-2" :disabled="selected.length == 0" color="primary" @click="deleteItem">Delete</v-btn>
                </v-actions> -->
                
                <!-- Filter -->
                    <!-- <v-expansion-panels class="custom-control_outlined ml-2" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
                        <v-expansion-panel outlined @click="filterListOfButtons" >
                            <v-expansion-panel-header>Filter
                                <template v-slot:actions>
                                    <v-icon color="primary">
                                    mdi-menu-down
                                    </v-icon>
                                </template>
                            </v-expansion-panel-header>
                        </v-expansion-panel>
                    </v-expansion-panels> -->
                <!-- </v-card-title>
            </v-card> -->

            <!--Return request sub id data popup-->
            <v-row justify="center">
                    <v-dialog v-model="dataDetailPopup" persistent max-width="700px">
                        <v-card class="v-card-100">
                            <v-card class="v-card-100">
                                <v-card-title>
                                    <span>Return Sub-Request ID "{{ returnRequestId }}"</span>
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click="dataDetailPopup=false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>
                            </v-card>
                        <v-card-text>
                            <v-container>
                                <div class="itemPopUp">
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Type Of Request</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.return_type ? item_details.return_type : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Article ID</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? item_details.sku_code : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">PRD Creation Date</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.created_date ? item_details.created_date : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Internal Reason Ref Doc Num</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.irrd_number ? item_details.irrd_number : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Internal Ref Doc Num</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.ird_number ? item_details.ird_number : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Serial Number</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.serial_number_1 ? item_details.serial_number_1 : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Tag ID</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.tag_number ? item_details.tag_number : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Box ID</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.box_number ? item_details.box_number : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Pickup Location</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.pickup_location ? item_details.pickup_location : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Delivery Location</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.delivery_location ? item_details.delivery_location : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Suggested Pick Up Date</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.suggested_pickup_date ? item_details.suggested_pickup_date : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Logistics Partner</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.logistic_partner ? item_details.logistic_partner : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Status</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.status ? item_details.status : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-3">
                                        <v-col cols="6" >
                                            <span style="font-weight: 700;">PRICING DETAILS</span>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">ASP (Of Item To Be Returned)</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.asp ? item_details.asp : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Sales Price (Of Item To Be Returned)</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.purchase_price ? item_details.purchase_price : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-2">
                                        <v-col cols="6">
                                            <a @click="conditionDetails" style="color: #1976d2;text-decoration: underline;"> Click Here For Condition Details</a>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>

            <!--Condition data popup-->
            <v-row justify="center">
                    <v-dialog v-model="conditionPopup" persistent max-width="700px">
                        <v-card class="v-card-100">
                            <v-card class="v-card-100">
                                <v-card-title>
                                    <v-btn icon @click="backToRequestpage">
                                        <v-icon>mdi-arrow-left</v-icon>
                                    </v-btn>
                                    <span class="ml-4">Condition Details "{{ returnRequestId }}"</span>
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click="conditionPopup=false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>
                            </v-card>
                        <v-card-text>
                            <v-container>
                                <div class="itemPopUp">
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Packaging  Condition</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                            <a style="color: #1976d2;text-decoration: underline; margin-left: 12px;">View Image(s)</a>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Item Condition</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                            <a style="color: #1976d2;text-decoration: underline;margin-left: 12px;">View Image(s)</a>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Item Powering On?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Freezer Working?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Insulator Working?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Light Working?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Closing Properly?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Door Intact?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" >
                                            <span style="font-weight: 500;">Accessories Attached?</span>
                                        </v-col>
                                        <v-col cols="6">
                                            {{ item_details.sku_code ? 'N/A' : 'N/A'}}
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>

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
                        <template #[`item.return_sub_request_id`]="{ item }">
                            <span v-if="item.return_sub_request_id"><a @click="itemSubRequestDetailpopup(item)" style="color: #1976d2;">{{ item.return_sub_request_id }}</a>
                            </span>
                            <span v-else>N/A</span>
                        </template>
                        <template #[`item.irrd_number`]="{ item }">
                            <span v-if="item.irrd_number"><a @click="itemIrrdDetailpopup(item,'IRRD')" style="color: #1976d2;">{{ item.irrd_number }}</a>
                            </span>
                            <span v-else>N/A</span>
                        </template>
                        <template #[`item.ird_number`]="{ item }">
                            <span v-if="item.ird_number"><a @click="itemIrrdDetailpopup(item,'IRD')" style="color: #1976d2;">{{ item.ird_number }}</a>
                            </span>
                            <span v-else>N/A</span>
                        </template>
                        <template #[`item.action`]="{ item }">
                            <v-btn outlined class="cancel-color my-1" color="primary" @click="itemIrrdDetailpopup(item,'Incomplete PRD\'s')">COMPLETE PRD</v-btn>
                        </template>
                        <!-- <template v-slot:item.irrd_number="{ item }">
                            <span>{{ item.irrd_number ? item.irrd_number : "N/A" }}</span>
                        </template> -->
                        <!-- <template #[`item.return_sub_request_id`]="{ item }">
                            <a @click="itemSubRequestDetailpopup(item)" style="color: #1976d2;"><span>{{ item.return_sub_request_id ? item.return_sub_request_id : "N/A" }}</span>                       <u> {{ item.tag_number }}</u>
                            </a>
                        </template> -->
                    </v-data-table>
                </v-flex>
            </v-layout>

            <!-- pagination display -->
            <div>
                <v-row class="ml-2">
                    <v-col cols="4" sm="1" class="PaddingItemPerPage">
                        <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
                        @change="handlePageSizeChange"></v-select>
                    </v-col>
                    <span class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="4" class="PaddingItemPerPage">
                        <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
                        prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
                    </v-col>
                </v-row>
            </div>
    </v-card>
</template>


<script>
import $ from 'jquery';
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";

export default {
    components: {
    HeaderComponent
    },
    data(){
            return{
                headerText : "PRD",
                search_tag:'',
                alert_type:'',
                alert : false,
                alert_message : '',
                tabs : ["Incomplete PRD's", "Open PRD's", "Approval"],
                loading: false,
                table_data: [],
                page: 1,
                totalPages: 1,
                pageSize: 100,
                pageSizes: [100, 200, 500],
                selected:[],
                search:'',
                filterPopup: false,
                loading: false,
                headers: [],
                prdList : ["Excel Upload","Manual Creation"],
                subRequestId : '',
                reasonRefDocNo : '',
                RefDocNo: '',
                status : '',
                message : '',
                okapproveconfirmpopup : false,
                confirmedClicked : false,
                excelUploadPopup : false,
                upload_file : '',
                uploading: false,
                confirmButton:'CONFIRM',
                number: 0,
                uploadPercentage: 0,
                manualCreationPopup : false,
                serialNo : '',
                articleId : '',
                quantity : '',
                item_details : [],
                dataDetailPopup: false,
                conditionPopup: false,
                irrdType_list : [],
                returnRequestId : '',
                number : 0,
                isFiltering : false,
                filterPage : 1,
                active_tab : "Incomplete PRD's",
                irdPopUp : false,
                irrd_selected : '',
                irrdList : [],
                irrdTableData : false,
                ird_width : "624px",
                irrdHeaders : [],
                irrd_table_data : '',
                view_more : false,
                action_name : '',
                prd_number: '',
                tag_id: '',
                article_id: '',
                serial_no : '',
                irrd_type: '',
                deletion_remarks : '',
            }
        },
    async created(){
        this.message = this.$store.state.alert_message
        if(this.message){
            this.action_name = 'success';
            this.okapproveconfirmpopup = true;
            this.confirmedClicked = true;
            this.$store.commit("showMessage",{ alert_type : '',alert_message : ''});
        }
        this.scrollToTOp();
        this.loadData("Incomplete PRD's",'tab_clicked');
        this.getFilterData();
    },
    methods: {
        scrollToTOp(){
            window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
        showAlert(alert_type, alert_message) {
            this.scrollToTop();
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
        loadData(tab,action){
            if(action){
                this.search_tag = '';
            }
            this.loading = true;
            this.selected = [];
            this.table_data = [];
            this.page = 1;
            this.pageSize = 100;
            this.isFiltering = false;
            this.filterPage = 1;
            this.active_tab = tab;
            if( tab == "Incomplete PRD's"){
                this.headerText = "PRD";
                this.headers = [
                    { text: "PRD No.", value: "prd_number", width:"120px"  },
                    { text: "IRRD No.", value: "irrd_number", width:"120px" },
                    { text: "IRRD Type", value: "irrd_type", width:"140px" },
                    { text: "IRRD Date", value: "created_date", width:"120px" },
                    { text: "IRD No.", value: "ird_number", width:"120px" },
                    { text: "IRD Type", value: "ird_type", width:"140px" },
                    { text: "IRD Date", value: "ird_date", width:"120px" },
                    { text: "Tag ID", value: "tag_number", width:"120px" },
                    { text: "Article ID", value: "sku_code", width:"120px" },
                    { text: "Article Description", value: "sku_description", width:"350px" },
                    { text: "Quantity", value: "quantity", width:"100px" },
                    { text: "Serial No.", value: "serial_number1", width:"120px" },
                    { text: "Serial No.", value: "serial_number2", width:"120px" },
                    { text: "Action", value: "action"}
                ];
            } else if( tab == "Open PRD's"){
                this.headerText = "PRD";
                this.headers = [
                    { text: "PRD No.", value: "prd_number", width:"120px" },
                    { text: "IRRD No.", value: "irrd_number", width:"120px" },
                    { text: "IRRD Type", value: "irrd_type", width:"140px" },
                    { text: "IRRD Date", value: "created_date", width:"120px" },
                    { text: "IRD No.", value: "ird_number", width:"120px" },
                    { text: "IRD Type", value: "ird_type", width:"140px"},
                    { text: "IRD Date", value: "ird_date" , width:"120px"},
                    { text: "Tag ID", value: "tag_number", width:"120px" },
                    { text: "Article ID", value: "sku_code", width:"120px" },
                    { text: "Article Description", value: "sku_description", width:"350px" },
                    { text: "Quantity", value: "quantity", width:"100px" },
                    { text: "Serial No.", value: "serial_number1", width:"120px" },
                    { text: "Serial No.", value: "serial_number2", width:"120px" },
                ];
            } else {
                this.headerText = "PRD Deletion Approval";
                this.headers = [
                    { text: "PRD No.", value: "prd_number", width:"120px" },
                    { text: "IRRD No.", value: "irrd_number", width:"120px" },
                    { text: "IRRD Type", value: "irrd_type", width:"140px" },
                    { text: "IRRD Date", value: "created_date", width:"120px" },
                    { text: "IRD No.", value: "ird_number", width:"120px" },
                    { text: "IRD Type", value: "ird_type", width:"140px" },
                    { text: "IRD Date", value: "ird_date", width:"120px" },
                    { text: "Tag ID", value: "tag_number", width:"120px" },
                    { text: "Article ID", value: "sku_code", width:"120px" },
                    { text: "Article Description", value: "sku_description", width:"350px" },
                    { text: "Quantity", value: "quantity", width:"100px" },
                    { text: "Serial No.", value: "serial_number1", width:"120px" },
                    { text: "Serial No.", value: "serial_number2", width:"120px" },
                ];
            }
            this.fetchIndexData();
        },
        fetchIndexData(){
            this.loading = true;
            const params = {
                search : this.search_tag,
                page : this.page,
                per_page : this.pageSize
            }
            const status = (this.active_tab == "Incomplete PRD's") ? 'Incomplete' : (this.active_tab == "Open PRD's") ? 'Open' : 'Approval'; 
            this.$http.secured
            .get("/api/v1/warehouse/prd?status="+status, { params } )
                .then(response => {
                if (response.data) {
                    this.table_data = response.data.pending_receipt_document_items
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
        getFilterData(){
            this.$http.secured
            .get("/api/v1/warehouse/prd/filters_data")
                .then(response => {
                if (response.data) {
                    this.irrdType_list = response.data.irrd_types
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        filterListOfButtons() {
            this.filterPopup = true;
            this.irrd_type = '';
            this.prd_number = '';
            this.subRequestId = '';
            this.reasonRefDocNo = '';
            this.RefDocNo = '';
            this.tag_id = '';
            this.article_id = '';
            this.serial_no = '';
        },
        applyFilterFunc(){
            this.filterPopup = false;
            this.search_tag = '';
            this.loading = true;
            this.isFiltering = true;
            const params = {    
                search : this.prd_number,
                irrd_number : this.reasonRefDocNo,
                ird_number : this.RefDocNo,
                irrd_type :this.irrd_type,
                tag_number : this.tag_id,
                sku_code : this.article_id, 
                serial_number : this.serial_no,
                page : this.filterPage,
                per_page : this.pageSize,
            }
            const status = (this.active_tab == "Incomplete PRD's") ? 'Incomplete' : (this.active_tab == "Open PRD's") ? 'Open' : 'Approval'; 
            this.$http.secured
            .get("/api/v1/warehouse/prd?status="+status, { params } )
                .then(response => {
                if (response.data) {
                    this.table_data = response.data.pending_receipt_document_items
                    this.totalPages = response.data.meta.total_pages
                    this.loading = false;
                    this.filterPopup = false;
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
            if(this.isFiltering){
                this.filterPage = value;
                this.applyFilterFunc();
                return;
            }
            this.fetchIndexData();
        },
        handlePageSizeChange(size) {
            this.pageSize = size;
            this.page = 1
            this.filterPage = 1;
            if(this.isFiltering){
                this.applyFilterFunc();
                return;
            }
            this.fetchIndexData();
        },
        deleteItem(){
            this.message = "Are you sure you want to delete ?";
            this.okapproveconfirmpopup = true;
            this.deletion_remarks = '';
            this.action_name = 'delete';
        },
        approvalConfirmationCancel(){
            this.okapproveconfirmpopup = false;
            this.confirmedClicked = false;
        },
        approvalCinfirmed(){
            const selectedId=this.selected.map(x=> x.id);
            // selectedId.forEach( x => {params.ids.push(x)});
            if(this.action_name == 'delete'){
                this.$http.secured
                .post("/api/v1/warehouse/prd/update_approval", { "ids" : selectedId, "reason_for_deletion" : this.deletion_remarks } )
                    .then(response => {
                    if (response.data) {
                        this.message = response.data.message;
                        this.action_name = 'success';
                        this.confirmedClicked = true;
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                    .catch(error => {
                        this.$toast.error(error.response.data.error)
                });
            } else if(this.action_name == 'deletion_approval'){
                const params = {
                    "ids" : selectedId,
                    "remarks" : this.deletion_remarks
                }
                this.$http.secured
                .delete("/api/v1/warehouse/prd/delete_items", { params } )
                    .then(response => {
                    if (response.data) {
                        this.message = response.data.message;
                        this.action_name = 'success';
                        this.confirmedClicked = true;
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                    .catch(error => {
                        this.$toast.error(error.response.data.error)
                });
            }  else if (this.action_name == 'deletion_reject') {
                this.$http.secured
                .post("/api/v1/warehouse/prd/reject", { "ids" : selectedId, } )
                    .then(response => {
                    if (response.data) {
                        this.message = response.data.message;
                        this.action_name = 'success';
                        this.confirmedClicked = true;
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                    .catch(error => {
                        this.$toast.error(error.response.data.error)
                });
            }    
        },
        okClicked(){
            this.okapproveconfirmpopup = false;
            this.confirmedClicked = false;
            this.loadData(this.active_tab);
        },
        creatPRD(item){
            if(item == 'Excel Upload'){
                this.excelUploadPopup = true;
                this.confirmButton='CONFIRM';
            } else if(item == 'IRD Number'){
                alert("coming");
                this.irdPopUp = true;
                this.irrdTableData = false;
                this.ird_width = "624px";
            }
        },
        cancelUploadFile(){
            this.excelUploadPopup = false;
            this.number = 0;
            this.upload_file = '';
            this.uploadPercentage = 0;
            this.uploading = false;
        },
        confirmUploadFile(){
            this.number++;
            const formData = new FormData();
            formData.append('file' , this.upload_file);
            this.$http.secured
            .post('/api/v1/items/create_bulk_inwards_file_import', formData )
                .then(response => {
                this.excelUploadPopup = false;
                this.showAlert('success', response.data.message);
                this.loadData(this.active_tab);
                })
                .catch(error => {
                    this.number = 0;
                    this.$toast.error(error.response.data.message);
                });  
        },
        changeFile(){
            if(this.upload_file == null){
                this.confirmButton = 'CONFIRM'
            }
        },
        uploadFile() {
            this.uploading = true;
            const reader = new FileReader();
            reader.onloadend = (event) => {
                setTimeout(() => {
                this.uploading = false;
                this.uploadPercentage = 0;
                }, 2000);
            };
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                const percentage = Math.round((event.loaded / event.total) * 100);
                this.uploadPercentage = percentage;
                this.number = 0;
                this.confirmButton = 'FINISH'
                }
            };
            reader.readAsDataURL(this.upload_file);
        },
        closeManualcreation(){
            this.manualCreationPopup = false;
            this.articleId = '';
            this.serialNo = '';
            this.quantity = '';
        },
        submitManualCreation(){
            const params = {
                articleId : this.articleId,
                serialNo : this.serialNo,
                quantity : this.quantity
            }
            this.$http.secured
            .get("", { params } )
                .then(response => {
                if (response.data) {
                    this.message=response.data.message;
                    this.closeManualcreation();
                    this.confirmedClicked = true;
                    this.okapproveconfirmpopup = true;
                    this.action_name = 'success';
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        itemSubRequestDetailpopup(item){
            this.returnRequestId = item.return_sub_request_id
            this.dataDetailPopup = true;
            this.$http.secured
            .get("/api/v1/warehouse/prd/"+item.id)
                .then(response => {
                if (response.data) {
                    this.item_details = response.data.item
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        itemIrrdDetailpopup(item,action){
          this.$store.commit("setPrdDetails",{
            action : action, 
            items : JSON.stringify(item),
            tab_name : (this.active_tab == "Incomplete PRD's") ? 'Incomplete' : (this.active_tab == "Open PRD's") ? 'Open' : 'Approval'
          });
          this.$router.push({ name: 'IrrdDetails' });
        },
        conditionDetails(){
            this.dataDetailPopup = false;
            this.conditionPopup = true;
        },
        backToRequestpage(){
            this.dataDetailPopup = true;
            this.conditionPopup = false;
        },
        showDataByIrd(){
            this.irrdTableData = true;
            this.ird_width = "790px";
            this.view_more = false;
            this.irrdHeaders = [
                { text: "Article ID", value: "sku_code" },
                { text: "Article Description", value: "sku_description" },
                { text: "IRRD Quantity", value: "quantity" },
                { text: "Received Quantity", value: "received_quantity" },
            ];
            this.irrd_table_data = this.selected;
        },
        addMoreColumn(){
            if(!this.view_more){
                this.ird_width = "960px";
                this.irrdHeaders = [
                    { text: "Tag ID", value: "tag_number" , width: "16%"},
                    { text: "Article ID", value: "sku_code" },
                    { text: "Serial Number", value: "serial_number_1" },
                    { text: "Article Description", value: "sku_description", width: "45%" },
                    { text: "IRRD Quantity", value: "quantity" },
                    { text: "Received Quantity", value: "received_quantity" },
                ];
            } else {
                this.ird_width = "790px";
                this.irrdHeaders = [
                    { text: "Article ID", value: "sku_code" },
                    { text: "Article Description", value: "sku_description", width: "50%"},
                    { text: "IRRD Quantity", value: "quantity" },
                    { text: "Received Quantity", value: "received_quantity" },
                ];
            }
            this.view_more = !this.view_more;
        },
        opendApprove(){
            this.okapproveconfirmpopup = true;
            this.deletion_remarks = '';
            this.action_name = 'deletion_approval';
        },
        OpenReject(){
            this.okapproveconfirmpopup = true;
            this.message = "Are you sure want to reject this delete aprroval request!"
            this.action_name = 'deletion_reject';
        },
        download_incomplete_file(){
            const selected_id = this.selected.map( x=> x.id)
            const params = {
                "ids" : selected_id
            }
            this.$http.secured.
            get("/api/v1/warehouse/prd/download_items",{ params }
            )
            .then(response => {
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `PRD-Incomplete-Items_prd.csv`);
                document.body.appendChild(link);
                link.click();
                this.message = "CSV for prd ( ";
                for( var i=0;i<Math.min(this.selected.length,3); i++){
                    if( i==0){
                        this.message += this.selected[i].prd_number
                    } else {
                        this.message +=", " + this.selected[i].prd_number
                    }
                }
                if(this.selected.length>3){
                    this.message +=",... "
                }
                this.message+=" ) Successfully Downloaded.";
                this.okapproveconfirmpopup = true;
                this.action_name = 'success';
                this.confirmedClicked = true;
            }
            })
            .catch(error => {
                this.$toast.error(error.response.data.error)
            });
        },
    },
}
</script>

<style scoped>
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
    .v-dialog__content:has(.filter-data){
        justify-content: right;
        align-items: baseline;
        top: 13rem;
    }  
    
    .itemPopUp .col-6{
        padding : 6px !important;
    }


    .item-selected{
        margin-top: 23px;
        position: absolute;
        left: 41%;
    }
    @media (max-height: 1104px) {
        .PaddingItemPerPage{
            padding: 8px !important;
        }
    }
    @media (min-height: 1126px) {
        .PaddingItemPerPage{
            padding: 24px !important;
        }
    }
</style>