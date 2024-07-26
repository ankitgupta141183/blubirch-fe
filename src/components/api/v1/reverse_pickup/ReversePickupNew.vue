<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
   <!-- Alert message -->
   <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
      </div>
    <!-- Header -->
    <header-component :headerTitle="headerText" />

    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab
          ripple
          :href="'#'"
          @click="loadData(tab)"
          style="text-transform: none !important; text-decoration: none"
          v-for="(tab, index) in tabs"
          :key="index"
          >{{ tab }}</v-tab
        >
      </v-tabs>
    </v-card>

    <!-- search -->
    <v-card-title style="padding: 28px">
      <!-- Search fields -->
      <v-row>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            v-model="search_tag"
            label="Search"
            style="max-width: 170px"
            outlined
            v-on:keyup.enter="loadData(active_tab,'tab_clicked')"
          ></v-text-field>
          <v-spacer></v-spacer>
      <!-- Actions buttons -->
      <v-actions style="margin-bottom: 28px">
        <v-btn
          class="ma-2"
          color="primary"
          v-for="(action_btn, index) in action_btn_tab1"
          :key="index"
          @click="openPopup(action_btn)"
          v-if="active_tab == 'Update Packaging Details'"
        >
          {{ action_btn }}
        </v-btn>
        <v-btn
          class="ma-2"
          color="primary"
          v-for="(action_btn, index) in action_btn_tab2"
          :key="index"
          @click="openPopup(action_btn)"
          v-if="active_tab == 'Pending Reverse Pick Up'"
          style="padding: 0px 4px;"
          :disabled="selected.length == 0"
        >
          {{ action_btn }}
        </v-btn>
      </v-actions>

      <!-- Filter -->
      <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly style="max-width: 170px; margin-bottom: 28px; min-height: 56px">
        <v-expansion-panel outlined @click="filterListOfButtons">
          <v-expansion-panel-header>Filter
            <template v-slot:actions>
              <v-icon color="primary"> mdi-menu-down </v-icon>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-row>
    </v-card-title>

    <!-- Data Table1 -->
    <v-layout column v-if="active_tab == 'Update Packaging Details'">
      <v-flex md6 style="overflow: auto">
        <v-data-table
          :dense="true"
          :search="search"
          v-model="selected"
          disable-pagination
          :hide-default-footer="true"
          :headers="headers"
          :items="table_data1"
          :loading="loading"
          loading-text="Loading Data... Please wait"
          class="elevation-1"
        >
          <template #[`item.return_sub_request_id`]="{ item }">
            <a @click="itemDetailForTab1(item)" style="color: #1976d2;">
              <u> {{ item.return_sub_request_id }}</u>
            </a>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- Data Table2 -->
    <v-layout column v-if="active_tab == 'Pending Reverse Pick Up'">
      <v-flex md6 style="overflow: auto">
        <v-data-table
          :dense="true"
          :search="search"
          v-model="selected"
          show-select
          disable-pagination
          :hide-default-footer="true"
          :headers="headers"
          :items="table_data2"
          :loading="loading"
          loading-text="Loading Data... Please wait"
          class="elevation-1"
        >
          <template #[`item.irrd_number`]="{ item }">
            <a @click="itemDetailForTab2(item)" style="color: #1976d2;">
              <u> {{ item.irrd_number }}</u>
            </a>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- pagination display -->
    <div class="float-right">
      <v-row class="ml-2">
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per page"
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

    <!-- item detail pop for pending reverse pick up -->
    <v-row justify="center">
      <v-dialog v-model="detailPopup2" persistent max-width="600">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Internal Reason Reference Document No. "{{ item_details.irrd_number }}"</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="detailPopup2 = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Return Sub-Request ID</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.return_sub_request_id ? item_details.return_sub_request_id : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Type Of Request</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.return_type ? item_details.return_type : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Article ID</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.sku_code ? item_details.sku_code : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Serial Number</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.serial_number ? item_details.serial_number : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Tag ID</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.tag_number ? item_details.tag_number : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Box ID</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.box_number ? item_details.box_number : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Pick Up Location</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.pickup_location ? item_details.pickup_location : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Delivery Location</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.delivery_location ? item_details.delivery_location : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Suggested Pick Up Date</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.suggested_pickup_date ? item_details.suggested_pickup_date : "N/A" }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span style="font-weight: 500;">Logistics Partner</span>
              </v-col>
              <v-col cols="6">
                <span>{{ item_details.logistic_partner ? item_details.logistic_partner : "N/A" }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      </v-dialog>
    </v-row>

    <!-- Dialogs -->
    <ReversePickupDialogs
      :dialogDetails="dialogDetails"
      :modelData="modelData"
      :tagAndBoxId="tagAndBoxId"
      :filterDetails="filterDetails"
      :completeAddTagId="completeAddTagId"
      :confirmPackaging="confirmPackaging"
      :messageDetails="messageDetails"
      :submitSuggestedPickupDate="submitSuggestedPickupDate"
      :submitAssignLogisticsPartner="submitAssignLogisticsPartner"
      :submitPickUpDetails="submitPickUpDetails"
      :returnTypesList="returnTypesList"
      :deliveryLocationList="deliveryLocationList"
      :active_tab="active_tab"
      :applyFilterFunc="applyFilterFunc"
      :clickOkLoadData="clickOkLoadData"
      :confirmPackPopup = "confirmPackPopup"
    >
    </ReversePickupDialogs>
  </v-card>
</template>

<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import ReversePickupDialogs from "./ReversePickupDialogs.vue";

export default {
  components: {
    HeaderComponent,
    ReversePickupDialogs,
  },
  data() {
    return {
      headerText: "Reverse Pickup",
      search_tag: [],
      selected: [],
      tabs: ["Update Packaging Details", "Pending Reverse Pick Up"],
      active_tab: "Update Packaging Details",
      table_data1: [],
      table_data2: [],
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      dialogDetails: {
        title: "Update Packaging Details",
        popup: false,
        type: "UPDATE SUGGEST PICK UP DATE",
      },
      action_btn_tab1: ["ADD TAG ID", "START PACKING"],
      action_btn_tab2: [
        "UPDATE SUGGEST PICK UP DATE",
        "ASSIGN LOGISTICS PARTNER",
        "UPDATE PICK UP DETAILS",
      ],
      active_action_btn_tab2: "UPDATE SUGGEST PICK UP DATE",
      modelData: {
        pickup_date: "",
        assign_logistics_partner: "",
        actual_pickup_date: "",
        dispatch_document_number: "",
        boxes_pickedup: "",
        actual_boxes_pickedup: "",
        boxNumber: "",
        tagNumbers: "",
        number : 0,
        add_tagId_btn: [
          {
            sku_code: "",
            serial_number: "",
            tag_number: "",
          },
        ],
        add_boxId_btn: [
          {
            box_number: "",
            tag_numbers: [],
          },
        ],
      },
      tagAndBoxId : {
        tagIds : [],
        boxIds : []
      },
      confirmPackPopup: false,
      filterDetails: {
        title1: "Update Packaging Details",
        title2: "Pending Reverse Pick Up",
        popup: false,
        article_id_search: "",
        pickup_location_search: "",
        delivery_location_search: "",
        article_search: "",
        return_type_search: "",
      },
      messageDetails: {
        popup: false,
        message: "",
      },
      return_ids: [],
      deliveryLocationList: [],
      returnTypesList: [],
      item_details : [],
      detailPopup1 : false,
      detailPopup2 : false,
      search : '',
      isFilteringPage : false,
      filterPageNo : 1,
      alert : false,
      alert_type : '',
      alert_message: '',

    };
  },

  async created() {
    this.scrollToTop();
    this.loadData("Update Packaging Details");
  },

  methods: {
    scrollToTop() {
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
        }, 3000);
    },
    loadData(tab,tab_action) {
      if(tab_action !='tab_clicked'){
        this.search_tag = "";
      }
      this.selected = [];
      this.active_tab = tab;
      this.table_data1 = [];
      this.table_data2 = [];
      this.loading = true;
      this.isFilteringPage = false
      this.filterPageNo = 1
      if (tab == "Update Packaging Details") {
        this.headers = [
          {
            text: "Return Sub-Request ID",
            align: "start",
            sortable: false,
            value: "return_sub_request_id",
          },
          { text: "IRRD Number", value: "irrd_number" || "-" },
          { text: "Type Of Request", value: "return_type" },
          { text: "Article ID", value: "sku_code" },
          { text: "Serial Number", value: "serial_number" },
          { text: "Tag ID", value: "tag_number" || "-" },
        ];
        this.fetchUpdatingPackagingDetails();
        this.getReturnTypes();
      }
      if (tab == "Pending Reverse Pick Up") {
        this.headers = [
          {
            text: "IRRD Number",
            align: "start",
            sortable: false,
            value: "irrd_number",
          },
          { text: "Pick Up Location", value: "pickup_location" },
          { text: "Delivery Location", value: "delivery_location" },
          { text: "Suggested Pick Up Date", value: "suggested_pickup_date" },
          { text: "Logistics Partner", value: "logistic_partner" },
        ];
        this.fetchPendingReversePickUp();
        this.getDeliveryLocations();
      }
    },

    // fetch the table data in Update-Packaging-Details tab
    fetchUpdatingPackagingDetails() {
      this.number++;
      const params = new URLSearchParams();

      params.append("page", this.page);
      params.append("per_page", this.pageSize);
      params.append("search", this.search_tag);
      this.$http.secured
        .get("/api/v1/warehouse/return_initiation/reverse_pickup", { params })
        .then((response) => {
          if (response.data) {
            this.table_data1 = response.data.return_items;
          } else {
            this.showAlert("error", "No Data Found");
          }
          this.loading = false;
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },

    // fetch the table data in Pending-Reverse-Pick-Up tab
    fetchPendingReversePickUp() {
      this.number++;
      const params = new URLSearchParams();

      params.append("page", this.page);
      params.append("per_page", this.pageSize);
      params.append("irrd_number", this.search_tag);
      this.$http.secured
        .get(
          "/api/v1/warehouse/return_initiation/reverse_pickup/reverse_pickup_items",
          { params }
        )
        .then((response) => {
          if (response.data) {
            this.table_data2 = response.data.return_items;
          } else {
            this.showAlert("error", "No Data Found");
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    // Add-tag-id popup box in "Update-Packaging-Details"
    completeAddTagId() {
      this.number++;
      const addTagId_details = this.modelData.add_tagId_btn
        .filter(
          (tag) =>
            tag.sku_code.trim() !== "" &&
            tag.serial_number.trim() !== "" &&
            tag.tag_number.trim() !== ""
        )
        .map((tag) => ({
          sku_code: tag.sku_code,
          serial_number: tag.serial_number,
          tag_number: tag.tag_number,
        }));
      if (addTagId_details.length > 0) {
        this.$http.secured
          .post(
            "/api/v1/warehouse/return_initiation/reverse_pickup/update_tag_numbers",
            { items: addTagId_details }
          )
          .then((response) => {
            if (response.data) {
              this.messageDetails.message = response.data.message;
              this.dialogDetails.popup = false;
              this.messageDetails.popup = true;
              this.eraseModelData();
              // this.modelData.add_tagId_btn.sku_code="";
              // this.modelData.add_tagId_btn.serial_number="";
              // this.modelData.add_tagId_btn.tag_number=[];
              this.tagAndBoxId.tagIds = [];
              this.tagAndBoxId.boxIds = [];
            } else {
              this.loading = false;
              this.showAlert("error", "No data Found");
            }
          })
          .catch((error) => {
            this.number = 0;
            this.dialogDetails.popup = false;
            this.showAlert("error",error.response.data.error);
            this.loading = false;
          });
      }
    },

    // Start-Packaging popup box in Update-Packaging-Details
    confirmPackaging() {
      this.number++;
      const boxes = this.modelData.add_boxId_btn.map((box) => ({
        box_number: box.box_number,
        tag_numbers: box.tag_numbers,
      }));
      this.$http.secured
        .post(
          "/api/v1/warehouse/return_initiation/reverse_pickup/update_packaging_details",
          { boxes }
        )
        .then((response) => {
          if (response.data) {
            this.messageDetails.message = response.data.message;
            this.dialogDetails.popup = false;
            this.messageDetails.popup = true;
            this.confirmPackPopup = false;
            this.modelData.add_boxId_btn.box_number="";
            this.modelData.add_boxId_btn.tag_numbers=[];
          } else {
            this.loading = false;
            this.showAlert("error", "No data Found");
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error);
          this.loading = false;
        });
    },

    // applyFilter
    applyFilterFunc() {
      this.isFilteringPage = true;
      this.search_tag = '';
      const params = new URLSearchParams();

      if (this.active_tab == "Update Packaging Details") {
        params.append(
          "return_type",
          this.filterDetails.return_type_search || ""
        );
        params.append("sku_code", this.filterDetails.article_id_search || "");
        params.append("page", this.filterPageNo);
        params.append("per_page", this.pageSize);

        this.$http.secured
          .get("/api/v1/warehouse/return_initiation/reverse_pickup", { params })
          .then((response) => {
            if (response.data) {
              this.table_data1 = response.data.return_items;
              this.filterDetails.popup = false;
              this.filterDetails.return_type_search = "";
              this.filterDetails.article_id_search = "";
              this.request_type_search = [];
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch((error) => {
            this.showAlert(
              "error",
              "Something went wrong from Network" + error
            );
            this.loading = false;
          });
      }
      if (this.active_tab == "Pending Reverse Pick Up") {
        params.append(
          "pickup_location",
          this.filterDetails.pickup_location_search || ""
        );
        params.append(
          "delivery_location",
          this.filterDetails.delivery_location_search || ""
        );
        params.append("sku_code", this.filterDetails.article_id_search || "");
        params.append("page", this.filterPageNo);
        params.append("per_page", this.pageSize);

        this.$http.secured
          .get("/api/v1/warehouse/return_initiation/reverse_pickup/reverse_pickup_items", { params })
          .then((response) => {
            if (response.data) {
              this.table_data2 = response.data.return_items;
              this.filterDetails.popup = false;
              this.filterDetails.pickup_location_search = "";
              this.filterDetails.delivery_location_search = "";
              this.filterDetails.article_id_search = "";
              this.request_type_search = [];
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch((error) => {
            this.showAlert(
              "error",
              "Something went wrong from Network" + error
            );
            this.loading = false;
          });
      }
    },

    // update-suggested-pick-up-date in pending-reverse-pickup tab
    submitSuggestedPickupDate() {
      this.modelData.number++;
      this.return_ids = this.selected.map((table_data2) => table_data2.id);
      const suggestedPickupDate = {
        return_ids: this.return_ids,
        pickup_date: this.modelData.pickup_date,
      };

      this.$http.secured
        .post(
          "/api/v1/warehouse/return_initiation/reverse_pickup/update_pickup_date",
          suggestedPickupDate
        )
        .then((response) => {
          if (response.data) {
            this.messageDetails.message = response.data.message;
            this.dialogDetails.popup = false;
            this.messageDetails.popup = true;
            this.modelData.pickup_date="";
          } else {
            this.modelData.number=0;
            this.loading = false;
            this.showAlert("error", "No data Found");
          }
        })
        .catch((error) => {
          this.modelData.number=0;
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },

    //Assign-Logistics-Partner popup in the Pending reverse pickup tab
    submitAssignLogisticsPartner() {
          this.modelData.number++;
          this.return_ids = this.selected.map((table_data2) => table_data2.id);
          const assignLogisticPartnerDetails = {
            return_ids: this.return_ids,
            logistic_partner: this.modelData.assign_logistics_partner,
          };

         this.$http.secured
        .post(
          "/api/v1/warehouse/return_initiation/reverse_pickup/assign_logistic_partner",
          assignLogisticPartnerDetails
        )
        .then((response) => {
          if (response.data) {
            this.messageDetails.message = response.data.message;
            this.dialogDetails.popup = false;
            this.messageDetails.popup = true;
            this.modelData.assign_logistics_partner="";
          } else {
            this.modelData.number = 0;
            this.loading = false;
            this.showAlert("error", "No data Found");
          }
        })
        .catch((error) => {
          this.modelData.number = 0
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },

    // Update-Pickup-Details in Pending Reverse Pick up tab
      submitPickUpDetails() {
          this.modelData.number++;
          this.return_ids = this.selected.map((table_data2) => table_data2.id);
          const updatePickUpDetails = {
          return_ids: this.return_ids,
          actual_pickup_date: this.modelData.actual_pickup_date,
          document_number: this.modelData.dispatch_document_number,
          boxes_to_pickup: this.modelData.boxes_pickedup,
          actual_boxes_picked: this.modelData.actual_boxes_pickedup,
        };

        this.$http.secured
        .post(
          "/api/v1/warehouse/return_initiation/reverse_pickup/update_pickup_details",
          updatePickUpDetails
        )
        .then((response) => {
          if (response.data) {
            this.messageDetails.message = response.data.message;
            this.dialogDetails.popup = false;
            this.messageDetails.popup = true;
            this.modelData.actual_pickup_date="";
            this.modelData.dispatch_document_number="";
            this.modelData.boxes_pickedup="";
            this.modelData.actual_boxes_pickedup="";
          } else {
            this.modelData.number = 0;
            this.loading = false;
            this.showAlert("error", "No data Found");
          }
        })
        .catch((error) => {
          // this.showAlert("error", "Something went wrong from Network" + error);
          this.modelData.number = 0;
          this.$toast.error(error.response.data.error);
          this.loading = false;
        });
    },

    // Get Delivery Locations
     getDeliveryLocations() {
      this.$http.secured
        .get("/api/v1/warehouse/sub_locations/get_locations")
        .then((response) => {
          if (response.data) {
            this.deliveryLocationList = response.data.locations;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      },

      //Get return types
      getReturnTypes() {
        this.$http.secured
          .get("/api/v1/warehouse/return_initiation/master_values/return_types")
          .then((response) => {
          if (response.data) {
            this.returnTypesList = response.data.lookup_values;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
      },

      // to open the popup
      openPopup(action_btn) {
          this.tagAndBoxId.tagIds = [];
          this.tagAndBoxId.boxIds = [];
          this.eraseModelData();
          this.active_action_btn_tab2 = action_btn;
          if (this.active_tab == "Pending Reverse Pick Up")
          this.dialogDetails = {
              title: this.active_tab,
              popup: true,
              type: action_btn,
              active_tab: this.active_tab,
            };
          this.active_action_btn_tab1 = action_btn;
          if (this.active_tab == "Update Packaging Details")
            this.dialogDetails = {
              title: this.active_tab,
              popup: true,
              type: action_btn,
              active_tab: this.active_tab,
            };
      },

      filterListOfButtons() {
        this.filterDetails = {
          title: this.active_tab,
          popup: true,
          active_tab: this.active_tab,
        };
      },

      clickOkLoadData() {
          this.messageDetails.popup = false;
          this.loadData(this.active_tab);
      },
      itemDetailForTab1(item){
        this.item_details = item;
        this.detailPopup1 = true;
      },
      itemDetailForTab2(item){
        this.item_details = item;
        this.detailPopup2 = true;
      },
      handlePageSizeChange(size){
        this.pageSize = size;
        this.page = 1;
        this.filterPageNo = 1;
        if(this.isFilteringPage){
            this.applyFilterFunc();
            return;
        }
        if(this.active_tab == 'Update Packaging Details'){
          this.fetchUpdatingPackagingDetails();
        } else {
          this,fetchPendingReversePickUp();
        }
      },
      handlePageChange(value){
        this.page = value;
        if(this.isFilteringPage){
            this.filterPageNo = value;
            this.applyFilterFunc();
            return;
        }
        if(this.active_tab == 'Update Packaging Details'){
          this.fetchUpdatingPackagingDetails();
        } else {
          this,fetchPendingReversePickUp();
        }
      },
      eraseModelData(){
        this.modelData = {
          pickup_date: "",
          assign_logistics_partner: "",
          actual_pickup_date: "",
          dispatch_document_number: "",
          boxes_pickedup: "",
          actual_boxes_pickedup: "",
          boxNumber: "",
          tagNumbers: "",
          number : 0,
          add_tagId_btn: [
            {
              sku_code: "",
              serial_number: "",
              tag_number: "",
            },
          ],
          add_boxId_btn: [
            {
              box_number: "",
              tag_numbers: [],
            },
          ],
        }
      }
  },
};
</script>
<style scoped>
.v-dialog__content:has(.filter-repair) {
  justify-content: right;
  align-items: baseline;
  top: 15rem;
}

.link-color {
  color: #0357d0;
  font-size: 14px;
  font-weight: 600;
}

.bg-color {
  background: #0357d0;
  color: #ffffff;
}
</style>