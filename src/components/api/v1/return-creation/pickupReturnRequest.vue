<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Header Component -->
    <div>
      <HeaderComponent :headerTitle="headerText" :router-link="{ name: 'RetunrCreation' }" :router-link-text="'Return / Claim Requests'" :return-condition="true" :component-name="'Pull back return'" />
    </div>
    <v-card-title>
      <!-- search -->
      <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="return_search" label="Search" style="max-width: 300px;" outlined></v-text-field>
        </v-col>
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
          :items="table_data" 
          :loading="loading" 
          loading-text="Loading Data... Please wait"
          class="elevation-1">
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
  import HeaderComponent from "../../../commoncomponents/HeaderComponent.vue"
  export default {
    data() {
      return {
        headerText: "Return Creation",
        return_search: "",
        selected: '',
        pageSize: '',
        page: '',
        alert : false,
        headers: [
          { text: "Approval Code", value: "return_sub_request_id", sortable: false },
          { text: "Valid Till", value: "return_request_id" },
        ],
        return_items: [
          {
            "Approval code": 'as-2333',
            "Valid Till" : "2023-07 - 26T05: 37:06.806Z",
          }
        ]
      }
    },
    components: {
      HeaderComponent
    },
    async created() {
      this.currentUser = this.$store.state.currentUser;
      this.loadData()
    },
    methods: {
      loadData(tab) {
        this.loading = true;
        this.selected = []
        this.table_data = []
        this.active_tab = tab
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        this.maindata()
      },
      maindata() {
        const params = this.getRequestParams(this.page, this.pageSize);
        this.$http.secured
          .get("/api/v1/warehouse/return_initiation/return_items", { params: { page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.return_items;
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
    }
  }
</script>
<style>
  .returnmb {
    margin-bottom: -40px;
  }
  .border-top{
    border-top: 18px solid #e5e5e5 !important;
  }
  .inputfield {
    height: 15px;
    width: 15px;
    margin-right: 10px;
  }
  .titles {
    margin-bottom: 10px !important;
  }

  .return-class{
    position: absolute;
    left: 25px;
  }
  .time .v-input {
    max-width: 96%;
  }

  .rule-type_option {
    border: 1px solid #000000;
    padding: 4px 8px;
    border-radius: 5px;
    margin: 1px 2px;
  }
</style>