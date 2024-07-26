<template>
  <!-- <v-card class="rigt_navbar" style="padding-left:0px"> -->
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>

    <!-- start -->
    <!-- <div class="main_header" style="margin-left:16px;margin-top:16px">
      Insurance
    </div> -->
    <div> <HeaderComponent headerTitle="User Control" /></div>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search by Email" outlined v-on:keyup.enter="searchItem()"></v-text-field>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-layout align-center>
          <v-btn
            @click=""
            class="ma-2 white--text"
            color="blue"
          >Update From File</v-btn>
          <router-link :to="{ name: 'NewUser'}">
            <v-btn
              @click=""
              class="ma-2 white--text"
              color="blue"
            >Create New User</v-btn>
          </router-link>
        </v-layout>
      </v-card-actions>
    </v-card-title>

    <v-layout column>

    <v-flex md6 style="overflow: auto"> 
  
    <v-data-table
      :dense="true"
      :headers="headers"
      :items="table_data"
      disable-pagination
      :hide-default-footer="true"
      class="elevation-1"
    >
    <template v-slot:item.user_status="{ item }">
      <v-chip
        class="ma-2 justify-center"
        small
        label
        :color="getColor(item.status)"
        style = "min-width:80px;"
        dark
      >{{ item.status }}</v-chip>
    </template>
      <template v-slot:item.view="{ item }">
        <router-link :to="{ name: 'EditUser', params: { id: item.id }}" v-if="item.role_name != 'central_admin' || currentUser.roles.includes('central_admin')">
          <img @click="openDisposition(item)"
            src="@/assets/images/job_sheet.png"
            title="Edit User">
        </router-link>
      </template>
    </v-data-table>
  </v-flex>
  </v-layout>
  <div class="float-right">
    <v-row class="ml-2">
      <v-col cols="4" sm="3">
        <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Items per Page"
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
  </v-card>
</template>

<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import { mapState } from "vuex";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        loading: false,
        alert: false,
        search: "",
        disposition: [],
        dialog: false,
        alert_type: '',
        headers: [
          {
            text: "User Name",
            align: "start",
            value: "username"
          },
          { text: "User Email", value: "email"},
          { text: "Employee Code", value: "employee_id"  },
          { text: "User Mobile Number", value: "contact_no" },
          { text: "Status", value: "user_status"},
          { text: "Action" , value: "view"}
        ],
        table_data: [],
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
      };
    },
    computed: mapState(["currentUser", "signedIn"]),
    created() {
      this.getUserData()
    },
    components: {
      editor: Editor,
      HeaderComponent
    },
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
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
        this.getUserData()
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.getUserData()
      },

      getColor(calories) {
        if (calories == "Inactive") return "red";
        else return "green";
      },

      onlyNumber ($event) {
         //console.log($event.keyCode); //keyCodes value
         let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
         if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
            $event.preventDefault();
         }
      },

      getUserData() {
        this.loading = true;
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );

        this.loading = true;
        this.$http.secured
          .get("/api/v1/warehouse/users", {params: {page: params['page'], per_page: params['size']}})
          .then(response => {
            if (response.data) {
              this.table_data = response.data.users;
              this.loading = false;
              this.totalPages =  response.data.meta.total_pages
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


    searchItem(){
      this.loading =true
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      if (this.search.length != 0){
        this.$http.secured.get("/api/v1/warehouse/users", {params: {page: 1, per_page: params['size'], search: this.search}})
        .then(response => {
          if (response.data){
            this.table_data = response.data.users;
            this.loading = false;
            this.totalPages =  response.data.meta.total_pages
          }else{
            this.showAlert("error","No Records Found for given value");
          }
        })
        .catch(error => this.showAlert("error", "Error in fetching Filter Record"))
      }else {
        this.loading = false;
        this.getUserData()
      }

    },

      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },


    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
          if (index[0]=='both_ageing') {
            if (!isDesc[0]) {
                return (parseInt(b.ageing_dispatch.split(' ')[0])) - parseInt(a.ageing_dispatch.split(' ')[0])
            } else {
                return (parseInt(a.ageing_dispatch.split(' ')[0])) - parseInt(b.ageing_dispatch.split(' ')[0])
            }
          }
          else {
            if(typeof a[index] !== 'undefined'){
              if (!isDesc[0]) {
                 return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
              }
              else {
                  return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
              }
            }
          }
      });
      return items;
    }

    },
    filters: {
      truncate: function(text, length, suffix) {
        if (text?text.length:0 > length) {
          return text.substring(0, length) + suffix;
        } else {
          return text;
        }
      }
    }
  };
</script>
<style >
  .theme--light.v-icon {
    color: #1867c0!important;
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 14px !important;
  }
  .v-card {
    max-width: 97% !important;
  }

  .v-card-100 {
    max-width: 100% !important;
  }
  .inc-title{
    color: #172B4D;
    font-size: 20px;
  }
  .insurance-submission-table{
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>