<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{dialog_title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-data-table
                :dense="true"
                :headers="confirmed_headers"
                :items="confirmed_data"
                :item-key="item_key"
                class="elevation-1"
                :hide-default-footer="true"
              >
              <template v-slot:item.both_ageing="{ item }">
                <span>{{item.both_ageing.ageing_inward}} ({{item.both_ageing.ageing_dispatch}})</span>
              </template>
              </v-data-table>
                  <v-col cols="6" sm="6">
                  <v-file-input small-chips v-model="files" label="ATTACH DOCUMENT"></v-file-input>
                </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" text @click="cancelDialog">{{dailog_cancel}}</v-btn>
            <v-btn small
              v-bind:color="dailog_confirm ==='Reject'?'error': 'primary'"
              @click="confirmDialog"
            >{{dailog_confirm}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex class="text-xs-center">
        <div class="main_header" style="margin-left:16px;margin-top:16px">Brand Approvals</div>
        <v-card class="v-card-100">
          <v-row class="ma-0">
            <v-col cols="4" sm="4">
              <span class="ma-2 font-weight-black" justify="center">Claim Id:</span>
                <span class="text-no-wrap text-example">{{selected_claim.claim_number}}</span>
            </v-col>
            <v-col cols="4" sm="4">
              <span class="ma-2 font-weight-black" justify="center">Vendor:</span>
              <span>{{selected_claim.vendor}}</span>
            </v-col>
            
            <v-col cols="4" sm="4">
              <span class="ma-2 font-weight-black" justify="center">Claim Date:</span>
              <span>{{selected_claim.claim_date}}</span>
            </v-col>
            <v-col cols="4" sm="4">
              <span class="ma-2 font-weight-black" justify="center">Quantity:</span>
              <span>{{selected_claim.quantity}}</span>
            </v-col>
            <v-col cols="4" sm="4">
              <span class="ma-2 font-weight-black" justify="center">Claim Amount:</span>
              <span>{{selected_claim.cost}}</span>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
    <br />

    <v-card class="v-card-100">
      <v-layout>
        <v-flex>
          <v-card-title>
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
            <v-spacer></v-spacer>
            <v-actions>
              <v-btn class="ma-2" color="normal" @click="saveExit">Save & Exit</v-btn>
              <v-btn class="ma-2" color="normal" @click="rejectConfirmation">Reject</v-btn>
              <v-btn class="ma-2" color="primary" @click="approveConfirmation">Approve</v-btn>
            </v-actions>
          </v-card-title>
          <v-data-table v-model="selected"
            :dense="true"
            :headers="headers"
            :items="table_data"
            :single-select="singleSelect"
            :search="search"
            show-select
            :item-key="item_key"
            :hide-default-footer="true"
            :loading="loading"
            loading-text="Loading Data... Please wait"
            class="elevation-1"
          >
            <template v-slot:item.repaired="{ item }">
              <v-select :items="item.repaired" dense></v-select>
            </template>
            <template v-slot:item.item_desc="{item}">
              <span
                v-b-tooltip.hover
                :title="item.item_desc"
              >{{item.item_desc | truncate(25, '...')}}</span>
            </template>

            <template v-slot:item.both_ageing="{ item }">
              <span>{{item.both_ageing.ageing_inward}} ({{item.both_ageing.ageing_dispatch}})</span>
            </template>           

            <template v-slot:item.status="{ item }">
                <v-chip
                class="ma-2"
                small
                label
                :color="getColor(item.status)"
                >{{ item.status }}</v-chip>
            </template>

            <template v-slot:item.remarks="{ item }">
              <v-text-field :value="item.remarks" dense></v-text-field>
            </template>

            <template v-slot:item.uploaded_images="{ item }">
              <img
                :hint="item"
                width="28"
                height="28"
                src="@/assets/images/icons/baseline_visibility_black_18dp.png"
              />
            </template>

            <template v-slot:item.capture_image="{ item }">
              <v-icon color="primary" :hint="item">mdi-camera</v-icon>
              <!-- <img :hint="item" src="@/assets/images/icons/baseline_visibility_black_18dp.png" /> -->
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-card>
</template>

<style>
#styled-input {
  height: 40px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 40px;
  font-size: 20pt;
}
.font-weight-black {
  color: black;
  font-weight: bold;
}

.theme--light.v-icon {
  color: #1867c0;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 14px !important;
}
</style>


<script>
export default {
  data: () => ({})
};
</script>

<script>
export default {
  data() {
    return {
      files: [],
      loading: false,
      alert: false,
      alert_type: "success",
      alert_message: "success",

      confirmed_headers: [{
          text: "Tag Id",
          align: "start",
          sortable: false,
          value: "tag"
        },
        { text: "Vendor", value: "vendor" },
        { text: "Quantity", value: "quantity" },
        { text: "Amount", value: "cost" },
        { text: "Ageing", value: "both_ageing" }        
      ],
      confirmed_data: [],
      selected_claim:'',
      tagNumberDialog: false,
      viewImageDialog: false,
      name: "Test",
      props: {
        msg: String
      },
      applicants: [
        {
          previous: "",
          expiration: ""
        }
      ],
      escalateDialog: false,
      dialog_title: "Confirmation - Claim ID",
      approval_btn: "Send For Claim",
      active_tab: "Pending Brand Approval",
      singleSelect: false,
      selected: [],
      search: "",
      item_key: "tag",
      menu_items: ["Restock", "Repair", "Liquidation", "E-Waste"],
      dialog: false,
      settlementDialog: false,
      journeyDialog: false,
      dspRepairDialog: false,

      tentative_new_grade_items: ["Very Good", "Good", "Defective"],

      headers: [
        {
          text: "Tag",
          align: "start",
          sortable: false,
          value: "tag",
          width:'12%'
        },
        { text: "SKU", value: "sku",  width:'10%' },
        { text: "Item Description", value: "item_desc", width:'25%' },
        { text: "Ageing", value: "both_ageing", width: "12%" },
        { text: "Grade", value: "grade", width: "22%" },
        { text: "Status", value: "status", width: "22%" },
      ],
      items: [{ title: "Escalate" }, { title: "Remind" }],
      table_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm"
    };
  },
  created() {
    this.getStoreData();
    this.getRTVOperationalData();
  },

  methods: {
    cancelDialog () {
      this.dialog = false;
      this.files = [];
    },

    applyCustomStatus () {
        let action_data = this.table_data.map(function(pending_brand_inventory) {
          if(pending_brand_inventory.rtv_status=='Pending Brand Approval'){
            pending_brand_inventory.status = 'Pending'
          } else if(pending_brand_inventory.rtv_status=='Pending Dispatch'){
            pending_brand_inventory.status = 'Approved'
          } else if(pending_brand_inventory.rtv_status=='Pending Disposition'){
            pending_brand_inventory.status = 'Rejected'
          }              
          return pending_brand_inventory;
        });
        this.table_data = action_data;
    },
      getRTVOperationalData() {
      this.loading = true;
      this.$http.secured
        .get("/api/v1/warehouse/return_to_vendor")
        .then(response => {
          if (response.data) {
            this.table_data = response.data.vendor_returns.filter(x =>x.rtv_status == "Pending Brand Approval" && x.claim_number == this.selected_claim.claim_number && x.claim_id !=null).map(function(inv_item){inv_item.quantity = 1; inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.loading = false;

            this.applyCustomStatus();
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
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
        if(!this.table_data.length){
          this.$router.push({ name: 'RTVOperations'})
        }
      }, 3000);
    },

    saveExit () {
      if (this.selected.length) {
        this.saveApproveReject("Save", "Selected inv. saved as draft Successfully");
      } else {
        this.dsp_repair_data = [];
        this.showAlert("warning", "Please select the Inv. for Saving this claim as draft");
        }
    },

    rejectConfirmation() { 
       if (this.selected.length) {
          this.confirmed_data = this.selected;
          (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Reject");
          this.dialog = true;
          this.dialog_title = "Confirmation Rejection";
       } else {
          this.dsp_repair_data = [];
          this.showAlert("warning", "Please select the Inv. for Reject");
        }
    },

    approveConfirmation() {      
      if (this.selected.length) {
        this.confirmed_data = this.selected;
        (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Accept");
        this.dialog = true;
        this.dialog_title = "Confirmation Approvals";
      } else {
        this.dsp_repair_data = [];
        this.showAlert("warning", "Please select the Inv. for Approve");
      }
    },

  getStoreData () {
    this.selected_claim = this.$store.state.selected_claim;
  },

    postRTVOperationalData(api_url, dataUpdate, message_to_show, active_tab, claim_number) {
      this.loading = true;
      this.$http.secured
        .post(api_url, dataUpdate)
        .then(response => {
          if (response.data.vendor_returns) {
            this.original_table_data = response.data.vendor_returns;
            this.table_data.splice(this.selected, 1)
            this.table_data = [];
            this.table_data = this.original_table_data.filter(x =>x.claim_number == claim_number
            ).map(function(inv_item){inv_item.both_ageing = {ageing_dispatch:inv_item.ageing_dispatch, ageing_inward:inv_item.ageing}; return inv_item});
            this.selected = [];
            this.files = [];
            this.showAlert("success", message_to_show);
            this.dialog = false;
            this.loading = false;
            this.applyCustomStatus();
          } else {
            this.loading = false;
            this.files = [];
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.loading = false;
          this.dialog = false;
          this.showAlert("error", "Something went wrong from Network" + error);
        });
    },

    tagAction(actionTitle) {
      this.dialog_title = "Settlement Amount";
      this.tagNumberDialog = true;
    },

    viewGrade() {
      this.viewImageDialog = true;
    },

    getColor(calories) {
      if (calories == "Approved") return "green";
      else if (calories == "Rejected") return "red";
      else return "normal";
    },

    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    saveApproveReject(claim_action, alert_message){
      const formData = new FormData();
      formData.append("files[]", this.files);
      formData.append('claim_action', claim_action);
      for (var i = 0; i < this.selected.length; i++) {
        if (this.selected[i].claim_id != null && this.selected[i].approval_required){
          formData.append('inventory_ids[]',this.selected[i].inventory_id)
        }
      }
      formData.append('claim_id', this.selected_claim.claim_id);
        let message_to_show = alert_message;

        this.postRTVOperationalData(
          "/api/v1/warehouse/return_to_vendor/approve_reject_claim",
          formData,
          message_to_show,
          this.active_tab,
          this.selected_claim.claim_number
        );
    },
    confirmDialog() {
      this.saveApproveReject(this.dailog_confirm == "Accept" ? "Approve" : "Reject", this.dailog_confirm == "Reject"
            ? "Selected RR No. rejected Successfully "
            : "Selected RR No. approved Successfully");
        
    },

  },

  filters: {
    truncate: function(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>