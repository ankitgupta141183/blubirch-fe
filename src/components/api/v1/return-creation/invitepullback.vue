<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <div>
      <HeaderComponent :headerTitle="headerText" :router-link="{ name: 'RetunrCreation' }" :router-link-text="'Return / claim Requests'" :return-condition="true" :component-name="'Invite Pull Back'"/>
    </div>
    <v-card class="v-card-100">
      <v-card-text>
        <v-row class="returnmb">
          <v-col cols="1" sm="4" md="4">
            <span style="font-weight: 500;">Eligible Users</span>
          </v-col>
          <v-col cols="5" sm="4" md="4">
            <v-combobox v-model="select_usertype" :items="select_user_items" item-text="" item-value=""
                label="Select User Type" multiple outlined class="ma-2" @click="changeuser"></v-combobox>
          </v-col>
          <v-col cols="5" sm="4" md="4" >
            <v-autocomplete v-model="vendor" outlined :items="vendoe_list" item-text="username" item-value="id" label="vendor" multiple chips clearable ></v-autocomplete>
              <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u>   
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="v-card-100">
      <v-card-text>
        <v-row class="returnmb">
          <v-col cols="1" sm="4" md="4">
            <span style="font-weight: 500;">Validity</span>
          </v-col>
          <v-col cols="9" sm="4" md="4" >
           <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="incident_date" transition="scale-transition" offset-y min-width="290px" class="ma-2">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field outlined hide-details v-model="incident_date" label="Date" prepend-inner-icon="event" readonly v-bind="attrs" v-on="on" class="ma-2" ></v-text-field>
                </template>
              <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="incident_date" no-title scrollable class="ma-2">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(incident_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="v-card-100">
      <v-card-text>
        <v-row class="returnmb">
          <v-col cols="1" sm="4" md="4">
            <span style="font-weight: 500;">Inventory</span>
          </v-col>
          <v-col cols="5" sm="4" md="4">
            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="incident_date" transition="scale-transition" offset-y min-width="290px" class="ma-2">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field outlined hide-details v-model="incident_date" label="period range" prepend-inner-icon="event" readonly v-bind="attrs" v-on="on" class="ma-2" ></v-text-field>
                </template>
              <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="incident_date" no-title scrollable class="ma-2">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(incident_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u> 
          </v-col>
          <v-col cols="9" sm="4" md="4" >
            <v-text-field v-model="Date" label="invoice" outlined class="ma-2"></v-text-field>
            <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u> 
          </v-col>
        </v-row>
      </v-card-text>
      <v-row class="returnmb">
        <v-col cols="1" sm="4" md="4">
        </v-col>
        <v-col cols="9" sm="4" md="4" >
          <v-text-field v-model="aritcle_id" label="article Id" outlined class="ma-2"></v-text-field>
          <u><a href="#" class="select-all-link" @click="selectAll">Select All</a></u> 
        </v-col>
      </v-row>
    </v-card>
    <v-card class="v-card-100">
        <v-card-text>
          <v-row class="returnmb">
            <v-col cols="1" sm="4" md="4">
              <span style="font-weight: 500;">Eligible Users</span>
            </v-col>
            <v-col cols="9" sm="4" md="4" >
              <v-text-field v-model="location_id" label="Percentage" outlined class="ma-2"></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" style="margin-top: 18px;">SUBMIT</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
  </v-card>
</template>
<script>
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {
        headerText: "Return Creation",
        alert_type: '',
        alert_message: '',
        alert: false,
        tabs: [
          "Return / Claim Request",
          "Pending Eligibility Validation",
          "Pending Manual Disposition"
        ],
        select_usertype: '',
        select_user_items: [],
        vendor: '',
        vendoe_list: []
      }
    },
    components: {
      HeaderComponent
    },
    methods: {
      getallData() {
        this.$http.secured
        .get(`/api/v1/warehouse/return_initiation/master_values/channel_types`)
        .then(response => {
          if (response.data) {
            this.select_user_items = response.data.lookup_values;
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
      changeuser() {
        if (this.select_user_items) {
          const selecteduser = this.select_user_items.original_code;
          if (selecteduser === "") {
          }
        }
      },
      selectAll() {
        this.vendor = this.vendoe_list.map((user) => user.id);
      }
    }
  }
</script>