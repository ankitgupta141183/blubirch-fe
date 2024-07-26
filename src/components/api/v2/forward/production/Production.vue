<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert
        :type="alert_type"
        :value="alert"
        transition="scale-transition"
        >{{ alert_message }}</v-alert
      >
    </div>
    <!-- Title-->
    <header-component :headerTitle="headerText" />
    <!-- popups -->
    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog
        content-class="filter-data"
        v-model="filterPopup"
        persistent
        max-width="724px"
      >
        <v-card style="max-width: 100% !important;">
          <v-card-actions>
            <v-combobox
              v-model="article_type"
              :items="article_type_items"
              item-text="original_code"
              item-value="id"
              label="Article Type"
              multiple
              outlined
              class="ma-2"
            >
            </v-combobox>
            <v-combobox
              v-model="uom"
              :items="uom_items"
              item-text="original_code"
              item-value="id"
              label="UOM"
              multiple
              outlined
              class="ma-2"
            >
            </v-combobox>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn
              small
              outlined
              color="primary"
              class="btn-cancel"
              @click="filterPopup = false"
              >CANCEL</v-btn
            >
            <v-btn small color="primary" @click="applyFilterFunc"
              >APPLY FILTER(S)</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Change Disposition confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="confirmationPopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title style="padding: 0px 0px 32px;">
            <v-spacer></v-spacer>
            <v-btn icon @click="confirmationPopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span>
              Are you sure want to move this item to
              {{ disposition_action.original_code }} bucket?
            </span>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn
              outlined
              color="primary"
              class="cancel-color mb-3"
              @click="confirmationPopup = false"
              >Cancel</v-btn
            >
            <v-btn color="primary" class="mb-3" @click="dispositionConfirmed"
              >Confirm</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Success Message popup -->
    <v-row justify="center">
      <v-dialog v-model="messagePopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="messagePopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ message_response }} </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="Call_loadData"
              >Ok</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- item Details popup -->
    <v-row justify="center">
      <v-dialog v-model="itemDetailsPopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="itemDetailsPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-container>
              <div>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Toat ID</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ toat_id !== null && toat_id !== '' ? toat_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article ID</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ article_id !== null && article_id !== '' ? article_id : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article Description</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ article_description !== null && article_description !== '' ? article_description : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Article Type</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ type_article !== null && type_article !== '' ? type_article : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">UOM</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ uom_type !== null && uom_type !== '' ? uom_type : 'N/A' }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 500;">Ageing</span>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    {{ ageing !== null && ageing !== '' ? ageing : 'N/A' }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- popups end -->
    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab
          ripple
          :href="'#'"
          v-for="tab in tabs"
          :key="tab"
          @click="loadData(tab, 'tab_clicked')"
          style="text-transform:none!important;
            text-decoration: none; padding-top: 4px;"
          >{{ tab }}</v-tab
        >
      </v-tabs>
    </v-card>

    <!-- search, filter, Action buttons -->

    <v-card-title style="padding: 28px 24px 4px 24px;">
      <!-- Search fields -->
      <v-row>
        <v-combobox
          v-model="selected_field"
          :items="field_items"
          item-text="key"
          item-value="key"
          label="Select Field"
          outlined
          style="max-width: 170px;"
        >
        </v-combobox>
        <v-text-field
          class="ml-2"
          prepend-inner-icon="mdi-magnify"
          v-model="search_tag"
          label="Search"
          style="max-width: 180px;"
          outlined
          v-on:keyup.enter="loadData(active_tab)"
        ></v-text-field>

        <v-spacer></v-spacer>
        <!-- Actions buttons -->
        <v-card-actions style="margin-bottom: 15px;">
          <v-btn
            class="mr-2"
            color="primary"
            v-if="active_tab == 'Finished or Semi-Finished Goods'"
            :disabled="selected.length == 0"
            @click="productionInv"
            style="margin-bottom: 7px;"
            >PRODUCTION INVENTORY</v-btn
          >
          <v-menu offset-y v-if="active_tab != 'Work-In-Progress'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-on="on"
                v-bind="attrs"
                :disabled="selected.length == 0"
                class="mb-2"
              >
                CHANGE DISPOSITION
                <v-icon dark>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in change_disposition_list"
                :key="index"
                @click="changeDisposition(item)"
              >
                <v-list-item-title>{{ item.original_code }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
        <!-- Filter -->
        <v-expansion-panels
          class="custom-control_outlined"
          ref="filterPopupRef"
          readonly
          style="max-width: 170px; margin-bottom: 30px; min-height: 56px"
        >
          <v-expansion-panel outlined @click="filterListOfButtons">
            <v-expansion-panel-header
              >Filter
              <template v-slot:actions>
                <v-icon color="primary"> mdi-menu-down </v-icon>
              </template>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
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
          :loading="loading"
          fixed-header
          height="100%"
          loading-text="Loading Data... Please wait"
          class="elevation-1"
        >
          <template #[`item.tag_number`]="{ item }">
            <a @click="linkPopupInReqTracker(item)" style="color: #1976d2;">
              <u> {{ item.tag_number }}</u>
            </a>
          </template>
          <template #[`item.distribution_center_id`]="{item}">
            <span>{{
              item.distribution_center_id ? item.distribution_center_id : "N/A"
            }}</span>
          </template>
          <template #[`item.toat_number`]="{item}">
            <span>{{ item.toat_number ? item.toat_number : "N/A" }}</span>
          </template>
          <template #[`item.sku_code`]="{item}">
            <span>{{ item.sku_code ? item.sku_code : "N/A" }}</span>
          </template>
          <template #[`item.item_description`]="{item}">
            <span>{{
              item.item_description ? item.item_description : "N/A"
            }}</span>
          </template>
          <template #[`item.sku_type`]="{item}">
            <span>{{ item.sku_type ? item.sku_type : "N/A" }}</span>
          </template>
          <template #[`item.uom`]="{item}">
            <span>{{ item.uom ? item.uom : "N/A" }}</span>
          </template>
          <template #[`item.ageing`]="{ item }">
            <span>{{ item.ageing !== null ? item.ageing : "N/A" }}</span>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- pagination display -->
    <div>
      <v-row class="ml-2">
        <v-col cols="4" sm="1" class="PaddingItemPerPage">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per page"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>
        <span class="item-selected">
          <span v-if="selected.length == 1"
            >{{ selected.length }} Item Selected</span
          >
          <span v-if="selected.length > 1"
            >{{ selected.length }} Items Selected</span
          >
        </span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="PaddingItemPerPage">
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
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent.vue";
export default {
  components: {
    HeaderComponent
  },

  data() {
    return {
      headerText: "Production",
      alert_type: "success",
      alert: false,
      alert_message: "",
      search_tag: "",
      tabs: [
        "Production Inventory",
        "Work-In-Progress",
        "Finished or Semi-Finished Goods"
      ],
      selected: [],
      change_disposition_list: [],
      filterPopup: false,
      loading: false,
      page: 1,
      totalPages: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      search: "",
      article_type: [],
      article_type_items: "",
      uom: [],
      uom_items: "",
      uom_search: "",
      messagePopup: false,
      message_response: "",
      confirmationPopup: false,
      disposition_action: "",
      selected_field: "",
      active_tab: "",
      table_data: [],
      headers: [],
      itemDetailsPopup: false,
      field_items: [
        {
          key: "Tag ID",
          id: "tag_number"
        },
        {
          key: "Article ID",
          id: "sku_code"
        }
      ],
      tag_number: "",
      toat_id: "",
      article_id: "",
      article_description: "",
      lot_id: "",
      type_article: "",
      uom_type: "",
      ageing: ""
    };
  },
  async created() {
    this.scrollToTop();
    this.loadData("Production Inventory");
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
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
    loadData(tab, tab_action) {
      if (tab_action) {
        this.search_tag = "";
        this.selected_field = "";
      }
      this.page = 1;
      this.active_tab = tab;
      this.pageSize = 100;
      this.loading = true;
      this.selected = [];
      if (tab == "Production Inventory") {
        this.headers = [
          {
            text: "Tag ID",
            align: "start",
            sortable: false,
            value: "tag_number"
          },
          { text: "Toat ID", value: "toat_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Article Type", value: "sku_type" },
          { text: "UOM", value: "uom" },
          { text: "Ageing (In Days)", value: "ageing" }
        ];
        this.fetchProdInventory();
        this.getDisposition();
      }
      if (tab == "Work-In-Progress") {
        this.headers = [
          {
            text: "Tag ID",
            align: "start",
            sortable: false,
            value: "tag_number"
          },
          { text: "Toat ID", value: "toat_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "UOM", value: "uom" },
          { text: "Article Type", value: "sku_type" },
          { text: "Ageing (In Days)", value: "ageing" }
        ];
        this.fetchWorkInProgress();
      }
      if (tab == "Finished or Semi-Finished Goods") {
        this.headers = [
          {
            text: "Tag/Toat ID",
            align: "start",
            sortable: false,
            value: "tag_number"
          },
          { text: "Toat ID", value: "toat_number" },
          { text: "Article Description", value: "item_description" },
          { text: "UOM", value: "uom" },
          { text: "Article Type", value: "sku_type" },
          { text: "Ageing (In Days)", value: "ageing" }
        ];
        this.fetchFinishedGoods();
        this.getDisposition();
      }
    },
    fetchProdInventory() {
      this.loading = false;
      const params = {
        status: "Production Inventory",
        search: this.search_tag,
        search_in: this.selected_field.id,
        page: this.page,
        per_page: this.pageSize
      };
      this.$http.secured
        .get("/api/v1/forward/productions", { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.productions;
            this.totalPages = response.data.meta.total_pages;
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
    fetchWorkInProgress() {
      this.loading = false;
      const params = {
        status: "Work In Progress",
        search: this.search_tag,
        search_in: this.selected_field.id,
        page: this.page,
        per_page: this.pageSize
      };
      this.$http.secured
        .get(`/api/v1/forward/productions`, { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.productions;
            this.totalPages = response.data.meta.total_pages;
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
    fetchFinishedGoods() {
      this.loading = false;
      const params = {
        status: "Finished Or Semi Finished Goods",
        search: this.search_tag,
        search_in: this.selected_field.id,
        page: this.page,
        per_page: this.pageSize
      };
      this.$http.secured
        .get("/api/v1/forward/productions", { params: params })
        .then(response => {
          if (response.data) {
            this.table_data = response.data.productions;
            this.totalPages = response.data.meta.total_pages;
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
    filterListOfButtons() {
      this.filterPopup = true;
      this.article_type = "";
      this.uom = "";
      this.$http.secured
        .get("/api/v1/forward/productions/filters_data")
        .then(response => {
          if (response.data) {
            this.article_type_items = response.data.article_types;
            this.uom_items = response.data.uoms;
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
    getDisposition() {
      this.$http.secured
        .get("/api/v1/forward/productions/get_dispositions")
        .then(response => {
          if (response.data) {
            this.change_disposition_list = response.data.dispositions;
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
    changeDisposition(item) {
      this.confirmationPopup = true;
      this.disposition_action = item;
    },
    dispositionConfirmed(item) {
      const item_id = this.selected.map(x => x.id);
      const dispo_id = this.disposition_action.id;
      this.$http.secured
        .post("/api/v1/forward/productions/set_disposition", {
          ids: item_id,
          disposition_id: dispo_id
        })
        .then(response => {
          if (response.data) {
            this.confirmationPopup = false;
            this.messagePopup = true;
            this.message_response = response.data.message;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;
        });
    },
    productionInv() {
      const item_id = this.selected.map(x => x.id);
      this.$http.secured
        .post("/api/v1/forward/productions/update_production_inventory", {
          ids: item_id
        })
        .then(response => {
          if (response.data) {
            this.confirmationPopup = false;
            this.messagePopup = true;
            this.message_response = response.data.message;
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network");
          this.loading = false;
        });
    },
    Call_loadData() {
      this.messagePopup = false;
      this.loadData(this.active_tab);
    },
    linkPopupInReqTracker(item) {
      this.itemDetailsPopup = true;
      this.tag_number = String(item.tag_number);
      this.toat_id = String(item.toat_number);
      this.article_id = String(item.sku_code);
      this.article_description = String(item.item_description);
      this.lot_id = String(item.lot_id);
      this.type_article = String(item.sku_type);
      this.uom_type = String(item.uom);
      this.ageing = String(item.ageing);
    },
    applyFilterFunc() {
      this.filterPopup = false;
      const uom_id = Array.isArray(this.uom) ? this.uom.map(x => x.id) : [];
      const article_ids = Array.isArray(this.article_type) ? this.article_type.map(x => x.id) : [];

      let status = "";
      if (this.active_tab === "Production Inventory") {
        status = "Production Inventory";
      } else if (this.active_tab === "Work-In-Progress") {
        status = "Work In Progress";
      } else if (this.active_tab === "Finished or Semi-Finished Goods") {
        status = "Finished Or Semi Finished Goods";
      }

      if (status) {
        this.$http.secured
          .get("/api/v1/forward/productions", {
            params: {
              status: status,
              uom: uom_id,
              sku_type: article_ids,
              page: this.page,
              per_page: this.pageSize
            }
          })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.productions;
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
          });
      }
    },
    handlePageChange(value) {
      this.page = value;
      if (this.active_tab === "Production Inventory") {
        this.fetchProdInventory();
      } else if (this.active_tab === "Work-In-Progress") {
        this.fetchWorkInProgress();
      } else if (this.active_tab === "Finished or Semi-Finished Goods") {
        this.fetchFinishedGoods();
      }
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      if (this.active_tab === "Production Inventory") {
        this.fetchProdInventory();
      } else if (this.active_tab === "Work-In-Progress") {
        this.fetchWorkInProgress();
      } else if (this.active_tab === "Finished or Semi-Finished Goods") {
        this.fetchFinishedGoods();
      }
    }
  }
};
</script>

<style scoped>
.custom-control_outlined button {
  min-height: 56px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.42);
  border-style: solid;
}

.v-dialog__content:has(.filter-data) {
  justify-content: right;
  align-items: baseline;
  top: 13rem;
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
