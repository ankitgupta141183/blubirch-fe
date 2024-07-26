<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>

    <v-card-title style="padding: 28px;">
      <v-row>
        <v-text-field prepend-inner-icon="mdi-magnify" label="Search" style="max-width: 300px;" outlined v-model="search"
          v-on:keyup.enter="loadData('search')"></v-text-field>
        <v-spacer></v-spacer>
        <v-actions style="margin-bottom: 28px;">
          <v-btn class="ma-2" color="primary" :disabled="disableAssign" @click="handleDialogOpen('assign')">ASSIGN</v-btn>
          <v-btn class="ma-2" color="primary" :disabled="disableUnAssign"
            @click="handleDialogOpen('Confirm unassign')">UNASSIGN</v-btn>
          <v-btn class="ma-2" v-if="(selected.length === 0) || disableDisposition" color="primary" disabled>
            CHANGE DISPOSITION
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>

          <v-menu offset-y v-if="(selected.length > 0) && !disableDisposition" v-model="menuOpen">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" class="ma-2">
                CHANGE DISPOSITION
                <v-icon v-if="menuOpen">mdi-menu-up</v-icon>
                <v-icon v-else>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item class="cursor-pointer row-pointer" v-for="(item, index) in changeDispositionOptions"
                :key="index">
                <v-list-item-title @click="changeDisposition(item)">
                  {{ item.code }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-actions>

        <v-expansion-panels class="custom-control_outlined" ref="filterPopupRef" readonly
          style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
          <v-expansion-panel outlined @click="handleFilterPopup">
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
          :items="formattedTableData"
          :loading="loading === 'table_data'"
          fixed-header
          height="100%"
          loading-text="Loading Data... Please wait" class="elevation-1">
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
    <v-row justify="center">
      <v-dialog v-model="dialogDitails.open" persistent :max-width="dialogDitails.maxWidth">
        <v-card>
          <v-toolbar>
            <span>{{ dialogDitails.headerText }}</span><br>
            <v-spacer></v-spacer>
            <v-btn icon @click="handleDialogClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <template
              v-if="(dialogDitails.type === 'Confirm unassign') || (dialogDitails.type === 'Change disposition') || (dialogDitails.type === 'Success')">
              <div class="d-flex justify-center mt-10">
                <h6 class="text-center">
                  {{ dialogDitails.messageText }}
                </h6>
              </div>
            </template>
            <template v-if="dialogDitails.type === 'assign'">
              <v-autocomplete class="mt-10" :items='assignUserList' return-object item-text="full_name"
                label="Enter\select employee name" outlined v-model="dialogDitails.selectedUser"></v-autocomplete>
            </template>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn small outlined class="btn-cancel mr-2 mb-3" @click="handleDialogClose" v-if="dialogDitails.closeBtn">{{ dialogDitails.closeText }}</v-btn>
            <v-btn small color="primary" class="mb-3" @click="handleDialogSubmit" v-if="dialogDitails.submitBtn">{{ dialogDitails.submitText }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog content-class="filter-popup" v-model="filterPopupDetails.open" persistent max-width="936px">
        <v-card>
          <v-card-actions>
            <v-text-field append-icon="mdi-magnify" item-text="value" item-value="value" label="Tag ID" outlined
              class="ma-2" style="max-width: 300px;" v-model="filterPopupDetails.tag_id"></v-text-field>
            <v-text-field append-icon="mdi-magnify" v-model="filterPopupDetails.article_id" label="Article ID" outlined
              class="ma-2" style="max-width: 300px;"></v-text-field>
            <v-select clearable
              :items="[{ level: 'Assigned', value: 'assigned' }, { level: 'Unassigned', value: 'unassigned' }]"
              item-text="level" item-value="value" :loading="loading === 'UserList'" label="Status"
              v-model="filterPopupDetails.assignment_status" outlined class="ma-2" style="max-width: 300px;"></v-select>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text class="btn-cancel mr-2 mb-3" @click="handleFilterPopup('close')">CANCEL</v-btn>
            <v-btn small color="primary" class="mb-3" @click="handleApplyFilter">APPLY
              FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
  import HeaderComponent from "@/components/commoncomponents/HeaderComponent";

  export default {
    data() {
      return {
        headerText: "Capital assets",
        search: "",
        selected: [],
        alert: false,
        alert_type: "success",
        alert_message: "success",
        headers: [
          { text: "Tag ID", value: "tag_id", width: '12%', align: "start", sortable: false },
          { text: "Article Id", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Status", value: "assignment_status" },
          { text: "Assigned To", value: "assigned_to", align: "center" },
          { text: "Location", value: "distribution_center", align: "center" }
        ],
        table_data: [],
        loading: [],
        active_tab: "",
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 300],
        changeDispositionOptions: [],
        menuOpen: false,
        dialogType: "",
        dialogDitails: {
          open: false,
          maxWidth: "375px",
          closeBtn: true,
          submitBtn: true,
          submitText: "SUBMIT",
          closeText: "CANCEL",
          type: "",
          okBtn: false,
          headerText: ""
        },
        filterPopupDetails: {
          open: false
        },
        assignUserList: []
      }
    },
    components: {
      HeaderComponent
    },

    computed: {
      disableAssign() {
        let location = this.getunique(this.selected, "distribution_center")
        // let assigned_to = this.selected.filter(item => item.assigned_to !== "-")
        let getstatus = this.getunique(this.selected, "assignment_status")
        let statusType = this.selected.filter(item => item.assignment_status === "assigned")
        return location.length > 1 || this.selected.length === 0 || getstatus.length > 1 || statusType.length > 0
      },

      disableUnAssign() {
        let location = this.getunique(this.selected, "distribution_center")
        let getstatus = this.getunique(this.selected, "assignment_status")
        let statusType = this.selected.filter(item => item.assignment_status === "assigned")
        return location.length > 1 || this.selected.length === 0 || statusType.length === 0 || getstatus.length > 1
      },

      disableDisposition() {
        let statusType = this.selected.filter(item => item.assignment_status === "assigned")
        return statusType.length > 0
      },

      formattedTableData() {
        return this.table_data.map((item) => {
          return {
            ...item,
            tag_id: item.tag_id || "-",
            article_id: item.article_id || "-",
            article_description: item.article_description ? item.article_description.length > 150 ? item.article_description.slice(0, 150) + "..." : item.article_description : "-",
            assignment_status: item.assignment_status || "-",
            assigned_to: item.assigned_to || "-",
            distribution_center: item.distribution_center || "-",
          }
        });
      },
    },
    created() {
      this.loadData();
      this.getDispositionList();
    },
    methods: {
      apiCaller(apiDetails) {
        return this.$http.secured({
          method: apiDetails.method,
          url: apiDetails.url,
          params: apiDetails.params,
          data: apiDetails.body
        }).then(response => {
          if (response.data) {
            this.loading = false;
            return response.data
          }
          else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
            return { error: "No Data Found" }
          }
        }).catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
          return { error: "Something went wrong from Network" }
        });

      },

      async loadData(type) {
        // /api/v2/warehouse/capital_assets
        let data = type === "search" ?
          {
            search_text: this.search,
          } :
          type === "filter" ?
            {
              filter: {
                tag_id: this.filterPopupDetails.tag_id,
                article_id: this.filterPopupDetails.article_id,
                assignment_status: this.filterPopupDetails.assignment_status
              }
            }
            : {}
        this.loading = "table_data"
        let table_data = await this.apiCaller({
          method: "post",
          url: "/api/v2/warehouse/capital_assets",
          body: data
        })

        if (table_data.capital_assets) {
          this.table_data = table_data.capital_assets
          this.totalPages = table_data.meta.total_pages
        }
        this.filterPopupDetails = {
          open: false
        };
        this.search = ""

      },

      async getDispositionList() {
        let list = await this.apiCaller({
          method: "get",
          url: '/api/v2/warehouse/capital_assets/get_dispositions'
        })
        if (list.dispositions) {
          this.changeDispositionOptions = list.dispositions
        }
        console.log(list, ":::::: list");
      },

      async getAssignUserList() {
        let UserList = await this.apiCaller({
          method: "get",
          url: "/api/v2/warehouse/capital_assets/get_distribution_users",
          params: { ids: this.selectedIds() }
        })
        if (UserList) {
          this.assignUserList = UserList
          this.loading = ""
        }
        console.log("UserList ::::", UserList);
      },

      getunique(arr, key) {
        return arr.filter((a, i) => arr.findIndex((s) => a[key] === s[key]) === i)
      },

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

      handlePageChange(value) {
        this.page = value;
        this.loadData("pageChange")
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.loadData("pageSizeChange")
      },

      handleDialogOpen(type) {
        if (type === "assign") {
          this.loading = "UserList"
          this.getAssignUserList()
          this.dialogDitails = {
            ...this.dialogDitails,
            type: type,
            open: true,
            headerText: "Assign Items",
            closeBtn: false,
            maxWidth: "500px",
            submitText: "Confirm"
          }

        }
        else if (type === "Confirm unassign") {
          this.dialogDitails = {
            ...this.dialogDitails,
            type: type,
            open: true,
            headerText: "",
            maxWidth: "500px",
            submitText: "Confirm",
            messageText: `Are you sure you want to unassign ${this.selected.length} selected items?`
          }
        }
      },

      handleDialogClose() {
        this.dialogDitails = {
          open: false,
          maxWidth: "375px",
          closeBtn: true,
          submitBtn: true,
          submitText: "SUBMIT",
          closeText: "CANCEL",
          type: "",
          okBtn: false,
          headerText: ""
        }
        this.selected = []
      },

      async changeDisposition(value) {
        let changeDisposition = await this.apiCaller({
          method: "post",
          url: "/api/v2/warehouse/capital_assets/set_dispositions",
          body: {
            ids: this.selectedIds(),
            disposition: value.code
          }
        })
        if (changeDisposition.error) {
          this.handleDialogClose()
        } else {
          this.dialogDitails = {
            ...this.dialogDitails,
            type: "Success",
            open: true,
            headerText: "",
            closeBtn: false,
            maxWidth: "500px",
            submitText: "OK",
            messageText: changeDisposition.message || `${this.selected.length} item moved to ${value.title} disposition`
          }
        }
      },

      async handleDialogSubmit() {
        let dialogType = this.dialogDitails.type
        if (dialogType === 'assign') {
          let assign_user = await this.apiCaller({
            method: "post",
            url: "/api/v2/warehouse/capital_assets/assigned_user",
            body: {
              ids: this.selectedIds(),
              full_name: this.dialogDitails.selectedUser.full_name,
              username: this.dialogDitails.selectedUser.username
            }
          })
          if (assign_user.error) {
            this.handleDialogClose()
          } else {
            this.dialogDitails = {
              ...this.dialogDitails,
              type: 'Success',
              open: true,
              headerText: "",
              closeBtn: false,
              maxWidth: "500px",
              submitText: "OK",
              messageText: `${this.selected.length} ${this.selected.length > 1 ? "items" : "item"} successfully assigned to ${this.dialogDitails.selectedUser.full_name}`
            }

          }
        } else if (dialogType === 'Confirm unassign') {
          let unassign_user = await this.apiCaller({
            method: "post",
            url: "/api/v2/warehouse/capital_assets/unassigned_user",
            body: { ids: this.selectedIds() }
          })
          // 
          if (unassign_user.error) {
            this.handleDialogClose()
          } else {
            this.dialogDitails = {
              ...this.dialogDitails,
              type: 'Success',
              open: true,
              headerText: "",
              closeBtn: false,
              maxWidth: "500px",
              submitText: "OK",
              messageText: `${this.selected.length} items successfully unassigned`
            }
          }
        }
        else if (dialogType === 'Change disposition') {
          this.handleDialogClose()
        }
        else if (dialogType === 'Success') {
          this.handleDialogClose()
          this.loadData()
        }
      },

      handleFilterPopup(type) {
        if (type === "close") {
          this.filterPopupDetails = {
            open: false
          };
        } else {
          document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
          this.filterPopupDetails = {
            open: true
          };
        }
      },

      selectedIds() {
        return this.selected.map(item => item.id)
      },
      handleApplyFilter() {
        this.loadData("filter")
      }
    }
  }
</script>
<style>
  .custom-control_outlined .v-expansion-panel:before { box-shadow: none; }
  .custom-control_outlined button { min-height: 56px; border-width: 1px; border-color: rgba(0, 0, 0, .42); border-style: solid; }
  .custom-control_outlined button:focus { outline: none; }
  .v-dialog__content:has(.filter-popup) { justify-content: right; align-items: baseline; top: var(--dialog-ypos); }
  .item-selected { margin-top: 23px; position: absolute; left: 41%; }

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
