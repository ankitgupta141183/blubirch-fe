<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
       <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <!-- Header component -->
    <div> <HeaderComponent :headerTitle="headerText" :assignBuyer="assignBuyer" :lotIdB2b="lotIdB2b"/></div>
    <!-- Tabs -->
    <!-- assign confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="successpopup" persistent max-width="424px">
        <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="successpopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center">
              <span> Are you sure you want to assign Lot "{{this.lotIdB2b}}" to {{biddername}}?</span>
            </v-card-text>
            <v-card-actions style="justify-content: center;">
              <v-btn small text color="normal" class="border-color" @click="successpopup = false">Cancel</v-btn>
                <v-btn small color="primary" @click="confirmButton" :disabled="number > 0">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')"
          v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    <v-card-title style="padding: 28px;">
        <!-- Search fields -->
        <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify"  v-model="buyer_id_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>
      <!-- Actions buttons -->
      <v-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)" @click="assignBuyerFunc">ASSIGN</v-btn>        
    </v-actions>
    <!-- Filter -->
    <!-- <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
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
    </v-card-title>
    <v-layout column>
      <v-flex md6 style="overflow: auto">
            <v-data-table 
          :dense="true" 
          :search="search" 
          v-model="selected"
          disable-pagination 
          :hide-default-footer="true"
          :headers="headers" 
          :items="table_data" 
          :loading="loading" 
          loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template v-slot:item="{ item }">
        <tr @click="selectRow(item)" :class="{ 'active': isActiveRow(item) }">
          <td>{{ item.higest_bid_id }}</td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.organization ? item.organization : "N/A" }}</td>
          <td>{{ item.higest_bid }}</td>
          <!-- Add other table columns here -->
        </tr>
      </template>

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
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';

export default {
    data(){
        return {
           headerText: "Liquidation",
           assignBuyer:true, 
           number:0,
           infoDataType:'',
           isShow:true,
           selected:[],    
           file: '',
           binaryData:'',
           alert_type:'',
           alert_message:'',
           menu: false,
           loading: false,
           attachment: "",
           alert: false,
              tabs: [
            "Assign"
            ],
          active_tab: "Assign",
          headers: [
          { text: "Buyer ID", value: "higest_bid_id"},
          { text: "Buyer Name", value: "user_name"},
          { text: "Organisation", value: "organization"},
          { text: "Highest Bid", value: "higest_bid"}
        ],
        table_data: [],
        buyer_id_search:'',
        lotIdB2b:'',
        page: 1,
        totalPages: 1,
        pageSize: 25,
        pageSizes: [25, 50, 75, 100],
        successpopup:false,
        biddername:'',
        highestBidId:'',
        usermail:'', 
        highestbid:'',
        number:0         
      }
    },
    components: {
      HeaderComponent
    },
    async created() {
      const lotIdB2b = this.$store.state.lotIds;
      this.lotIdB2b = parseInt(lotIdB2b.substring(1, lotIdB2b.length - 1));
      this.loadData('Assign')    
  },
    methods:{        
        loadData(tab, tab_action) {
      if(tab_action){
        this.buyer_id_search = ''
      }
      this.loading = true;
      this.selected = []
      this.active_tab = tab
      this.table_data = []
      this.page = 1
      this.totalPages = 1
      this.pageSize = 25
      if (tab == "Assign") {
        (this.headers = [
        { text: "Buyer ID", value: "higest_bid_id"},
          { text: "Buyer Name", value: "user_name"},
          { text: "Organisation", value: "organization"},
          { text: "Highest Bid", value: "higest_bid"}
        ]);
        this.fetchBuyerList();
      }
    },
      fetchBuyerList(){
        let lotIds = JSON.parse(this.$store.state.lotIds)
        const params = this.getRequestParams(
        this.page,
        this.pageSize
      );
      this.$http.secured
        .get(`/api/v2/warehouse/liquidation_order/pending/decision/get_bidders?id=${lotIds}`)
        .then(response => {
          if (response.data) {
            this.table_data = response.data.bids_details
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
    handlePageChange(value) {
      this.page = value;
      this.fetchBuyerList();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;   
      this.fetchBuyerList();   
    },
    assignBuyerFunc(){
      this.successpopup = true     
    },
    confirmButton(){
      this.number++;
      let lotIds = JSON.parse(this.$store.state.lotIds)
         this.$http.secured
            .put(`/api/v2/warehouse/liquidation_order/pending/decision/${lotIds}`, 
            {
              "vendor_code":this.highestBidId,
              "user_name": this.biddername,
              "user_email": this.usermail,
              "higest_bid": this.highestbid     
            })
            .then(response => {
              if (response.status === 200) {
                this.successpopup = false
                this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
                this.$store.commit('setMessage',
               { 
                responseMessage: response.data.message,
                action : 're_publish'
              });                
                this.$router.push({ name: "liquidationNew"});
              } else {
                this.number = 0;
                this.showAlert("error", "Something went Wrong !!");
              }
            })
            .catch(error => {
              this.showAlert("error", error.response.data.errors);
              this.number = 0;
            });
    },
    selectRow(item) {
      this.biddername = item.user_name
      this.highestBidId = item.higest_bid_id
      this.usermail  = item.user_email
      this.highestbid = item.higest_bid
    const index = this.selected.findIndex((selectedItem) => selectedItem === item);
    if (index !== -1) {
      this.selected.splice(index, 1);
    } else {
      this.selected.push(item);
    }
  },
  isActiveRow(item) {
    return this.selected.includes(item);
  },
    }
}
</script>
<style scoped>
.border-color{
  border: 1px solid #0357D0;
}
</style>
