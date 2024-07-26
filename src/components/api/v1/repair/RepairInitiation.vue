<template>
  <v-card class="overflow-hidden">
    <div class="main_header" style="margin-left:16px;margin-top:16px">Repair</div>
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab
          style="text-transform:none!important;"
          @click="loadData(tab)"
          v-for="(tab, index) in tabs"
          :key="index"
        >{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
          v-if="active_tab != 'Repair QC'"
          :dense="true"
          :headers="headers"
          :items="table_data"
          :search="search"
          :item-key="item_key"
          class="elevation-1"
          :loading="loading"
          loading-text="Loading Data... Please wait"
        >
          <template v-slot:item.cost="{item}">
            <i class="mdi mdi-currency-inr"></i>
            {{ item.cost }}
          </template>
          <template v-slot:item.job_sheet="{item}">
            <img
              @click="navigateTarget(item)"
              src="@/assets/images/job_sheet.png"
              width="30"
              height="22"
            />
          </template>

          <template v-slot:item.is_job_sheet_draft="{item}">
            <img
              v-if="item.initiation_draft"
              small
              width="20"
              height="20"
              src="@/assets/images/icons/draft.svg"
            />
            <img
              v-if="(active_tab == 'Pending Repair' && item.pending_draft)"
              small
              width="20"
              height="20"
              src="@/assets/images/icons/draft.svg"
            />
          </template>

          <template>
            <v-btn color="success">Create</v-btn>
          </template>
          <template v-slot:item.alert_level="{ item }">
            <v-chip
              class="ma-2 justify-center"
              small
              label
              :color="getColor(item.alert_level)"
              dark
              style = "min-width:60px;"
            >{{ item.alert_level }}</v-chip>
          </template>

          <template v-slot:item.view_attachmet>
            <v-icon>mdi-download</v-icon>
          </template>
        </v-data-table>

        <v-data-table
          v-if="active_tab === 'Repair QC'"
          :dense="true"
          v-model="selected"
          :headers="headers"
          :items="table_data"
          :single-select="singleSelect"
          :search="search"
          :item-key="item_key"
          class="elevation-1"
          :loading="loading"
          loading-text="Loading Data... Please wait"
        >
          <template v-slot:item.grade="{item}">
            <img
              src="@/assets/images/job_sheet.png"
              width="30"
              height="22"
              @click="proceedGrading(item)"
            />
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<style>
/* .v-card {
  max-width: 98% !important;
} */

.v-card-100 {
  max-width: 100% !important;
}
</style>

<script>
//import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
      escalateDialog: false,
      dialog_title: "Confirmation - Claim ID",
      approval_btn: "Send For Claim",
      active_tab: "Repair Initiation",
      tabs: [
        "Repair Initiation",
        "Pending Repair",
        "Repair QC",
        "Pending Putaway",
        "Report",
      ],
      singleSelect: false,
      selected: [],
      search: "",
      item_key: "RRNumber",
      menu_items: ["Restock", "Repair", "Liquidation", "E-Waste"],
      dialog: false,
      settlementDialog: false,
      journeyDialog: false,
      dspRepairDialog: false,
      inventory: {},
      loading: true,
      headers: [
        {
          text: "Tag",
          align: "start",
          sortable: false,
          value: "tag_number",
        },
        { text: "Item Type", value: "item_type" },
        { text: "Item Description", value: "item_desc" },
        { text: "Grade", value: "grade" },
        { text: "MRP", value: "cost" },
        // { text: "Tag", value: "tag_number" },
        { text: "Ageing", value: "initiation_ageing" },
        { text: "Job Sheet", value: "job_sheet" },
        { text: "", value: "is_job_sheet_draft", sortable: false },
      ],

      items: [{ title: "Escalate" }, { title: "Remind" }],
      table_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm",
    };
  },
  created() {
    this.getRepairOperationalData();
  },

  methods: {
    getRepairOperationalData() {
      this.loading = true;
      this.$http.secured
        // .get("https://5f05ab61ee44800016d38501.mockapi.io/rtv/rtvrepair")
        .get("/api/v1/warehouse/repairs")
        .then((response) => {
          if (response.data.repairs) {
            this.original_table_data = response.data.repairs;
            this.table_data = this.original_table_data;
            this.table_data = this.original_table_data.filter(
              (x) => x.repair_status == "Repair Initiation"
            );
            this.loading = false;
          } else {
            this.loading = false;
            alert("no data");
          }
        })
        .catch((error) => {
          this.loading = false;
          alert("API Error :: " + error);
        });
    },

    loadData(tab) {
      this.active_tab = tab;
      this.table_data = this.original_table_data.filter(
        (x) => x.repair_status == this.active_tab
      );
      if (tab == "Repair Initiation") {
        let action_data = this.table_data.map(function (t_data) {
          t_data.job_sheet = "";
          return t_data;
        });
        this.table_data = action_data;
        (this.items = [{ title: "Escalate" }, { title: "Remind" }]),
          (this.item_key = "rrnumber");
        this.approval_btn = "Approve";
        this.headers = [
          {
            text: "Tag",
            align: "start",
            sortable: false,
            value: "tag_number",
          },
          { text: "Item Type", value: "item_type" },
          { text: "Item Description", value: "item_desc" },
          { text: "Grade", value: "grade" },
          { text: "MRP", value: "cost" },
          // { text: "Tag", value: "tag_number" },
          { text: "Ageing", value: "initiation_ageing" },
          { text: "Job Sheet", value: "job_sheet" },
          { text: "", value: "is_job_sheet_draft", sortable: false },
        ];
      }
      if (tab == "Pending Repair") {
        this.table_data = this.original_table_data.filter(
          (x) => x.repair_status == "Pending Repair"
        );
        (this.approval_btn = "Send For Claim"),
          (this.item_key = "tag_number"),
          (this.headers = [
            {
              text: "Tag",
              align: "start",
              sortable: false,
              value: "tag_number",
            },
            { text: "Item Type", value: "item_type" },
            { text: "Item Description", value: "item_desc" },
            { text: "Grade", value: "grade" },
            { text: "New Grade", value: "new_grade" },
            // { text: "Tag", value: "tag_number" },
            { text: "Ageing", value: "repair_ageing" },
            { text: "Repair Status", value: "repair_status" },
            { text: "Job Sheet", value: "job_sheet" },
            { text: "", value: "is_job_sheet_draft", sortable: false },
          ]);
      }
      if (tab == "Repair QC") {
        // (this.items = [{ title: "Re-Submit" }, { title: "Escalate" }]),
        this.item_key = "rrnumber";
        let action_data = this.table_data.map(function (t_data) {
          t_data.view_attachmet = "";
          return t_data;
        });
        this.table_data = action_data;
        this.headers = [
          {
            text: "Tag",
            align: "start",
            sortable: false,
            value: "tag_number",
          },
          { text: "Item Type", value: "item_type" },
          { text: "Item Description", value: "item_desc" },
          { text: "Ageing", value: "qc_ageing" },
          { text: "Grade", value: "grade" },
        ];
      }
      if (tab == "Pending Putaway") {
        (this.approval_btn = "Escalate"),
          (this.item_key = "tag_number"),
          (this.headers = [
            {
              text: "Tag",
              align: "start",
              sortable: false,
              value: "tag_number",
            },
            { text: "Item Type", value: "item_type" },
            { text: "Item Description", value: "item_desc" },
            { text: "Ageing", value: "putaway_ageing" },
            { text: "Disposition", value: "disposition" },
            { text: "Grade", value: "grade" },
          ]);
      }
      if (tab == "Report") {
        let action_data = this.table_data.map(function (t_data) {
          t_data.actions = "";
          return t_data;
        });
        this.table_data = action_data;
        (this.item_key = "claim_id"),
          (this.items = [{ title: "Enter Amount" }, { title: "View Journey" }]),
          (this.headers = [
            {
              text: "Claim Id",
              align: "start",
              sortable: false,
              value: "claim_id",
            },
            { text: "Vendor", value: "vendor" },
            { text: "POD", value: "pod" },
            { text: "Dispatch Date", value: "dispatch_date" },
            { text: "COGS", value: "cost" },
            { text: "Ageing", value: "ageing" },
            { text: "Approved Amount", value: "approved_amount" },
            { text: "", value: "actions" },
          ]);
      }
    },

    getColor(calories) {
      if (calories == "High") return "red";
      else if (calories == "Med") return "orange";
      else return "green";
    },

    // settlementAction(actionTitle) {
    //   if (actionTitle === "Enter Amount") {
    //     this.dialog_title = "Settlement Amount";
    //     this.settlementDialog = true;
    //   } else {
    //     this.journeyDialog = true;
    //     this.dialog_title = "Claim Id [CAIM8974] Journey";
    //   }
    // },

    escalateAction(actionTitle) {
      if (actionTitle === "Escalate") {
        this.dialog_title = "Escalate";
        this.escalateDialog = true;
      }
    },
    navigateTarget(item) {
      this.$store.commit("setSelectedTagJobSheet", { tag: item });
      this.$router.push({
        name:
          this.active_tab == "Pending Repair"
            ? "PendingRepairJobSheet"
            : "Jobsheet",
      });
    },
    proceedGrading(item) {
      console.log(item);
      this.$http.secured
        .get("/api/v1/warehouse/warehouse_grading/warehouse_rules", {
          params: { tag_number: item.tag_number },
        })
        .then((response) => {
          this.inventory = response.data["inventory"];
          let selected_inventory = {
            id: this.inventory.id,
            return_quantity: 1,
            client_category_id: this.inventory.details["client_category_id"],
          };
          this.$store.commit("setWarehouseGrading", {
            selected_inventory: selected_inventory,
            warehouse_grading: true,
            grading_type: "Repair",
          });
          this.$router.push({ name: "Package" });
        })
        .catch((error) => this.$toast.error("Error in fetching category"));
    },
  },
};
</script>