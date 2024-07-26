<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- Title-->
    <header-component :headerTitle="headerText" :router-link="{ name: 'ReplacementForward' }" :router-link-text="'In Stock'" :return-condition="true" :component-name="action" />

    <!-- search, Submit buttons -->
    <v-card class="v-card-100" v-if="action == 'Reserve'">
      <v-card-title style="padding: 12px 24px 12px 24px;">
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px; margin-top: 8px;" outlined></v-text-field>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="primary" :disabled="selected.length == 0" @click="deleteitems">Delete</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="number > 0" @click="submitReserve">SUBMIT</v-btn>
      </v-card-title>
    </v-card>

    <!--Update Buyer popup -->
    <v-row justify="center">
      <v-dialog v-model="updateBuyerPopup" persistent max-width="500px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title outlined style="padding: 12px;">
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updateBuyerPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text style="padding: 20px 24px 0px;">
            <v-row>
              <v-col cols="8">
                <v-autocomplete v-model="updatedbuyerName" label="Buyer Name" :items="buyerList" item-text="vendor_name" item-value="id" class="ma-2" outlined></v-autocomplete>
              </v-col>
              <!-- <v-col cols="4" style="padding: 20px 0px">
                        <v-btn outlined color="primary" class="cancel-color ma-2" @click="addBuyer">Add Buyer</v-btn> 
                    </v-col> -->
            </v-row>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="cancel-color mb-3" @click="updateBuyerPopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="submitexistReserve" :disabled="!updatedbuyerName">Submit</v-btn>
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
            <span> {{ message }} </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" small class="mb-3" @click="redirectToRepl">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- delete conformation popup -->
    <v-row justify="center">
      <v-dialog v-model="Deletepopup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title style="padding: 0px 0px 32px;">
            <v-spacer></v-spacer>
            <v-btn icon @click="Deletepopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <span> Are you sure want to delete this item? </span>
          </v-card-text>
          <v-card-actions center class="mt-2">
            <v-spacer></v-spacer>
            <v-btn small outlined color="primary" class="cancel-color mb-3" @click="Deletepopup = false">Cancel</v-btn>
            <v-btn small color="primary" class="mb-3" @click="confirmDelete">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Total selling Price select reserve data-->
    <v-card class="v-card-100" v-if="action == 'Reserve'">
      <v-card-title>
        <v-spacer></v-spacer>
        <span>Selling Price Total : ₹{{ totalSumPrice }}</span>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>

    <!-- Data Table for selected reserve data -->
    <v-layout column v-if="action == 'Reserve'">
      <v-flex md6 style="overflow: auto">
        <v-data-table 
          v-model="selected"
          :dense="true"
          :search="search_tag"
          disable-pagination
          show-select
          :hide-default-footer="true"
          :headers="headers"
          :items="table_data"
          :loading="loading"
          fixed-header
          height="100%"
          loading-text="Loading Data... Please wait" class="elevation-1">
          <template #[`item.selling_price`]="{ item }">
            <v-text-field v-model="item.selling_price" hide-details outlined v-on:keyup="calculateSum"
              style="max-width: 150px;" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></v-text-field>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>


    <!-- for New Reserve  -->
    <template v-if="action == 'New Reserve'">
      <v-form ref="ReserveForm">
        <v-card class="v-card-100 mt-4">
          <v-card-text style="height: 80vh;overflow-y: scroll;">
            <v-row>
              <v-col cols="3">
                <span>Enter Customer/Buyer</span>
              </v-col>
              <v-col cols="4">
                <v-autocomplete label="Customer/Buyer Name" v-model="updatedbuyerName" :items="buyerList"
                  item-text="vendor_name" item-value="id" outlined></v-autocomplete>
              </v-col>
              <!-- <v-col cols="4">
                <v-btn outlined color="primary" class="cancel-color mt-3" @click="addBuyer">ADD BUYER</v-btn>
              </v-col> -->
            </v-row>
            <v-row>
              <v-col cols="3">
                <span>Add items</span>
              </v-col>
              <v-col cols="9">
                <v-row style="margin-bottom: -25px;" v-for="(item, index) in items_detail" :key="item.id">
                  <v-col cols="2" sm="3" md="3">
                    <v-text-field outlined label="Article ID" v-model="item.sku_code"
                      v-on:keyup.enter="fetchRemainingDetails(item)" @change="calculateTotalNumber"></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="3">
                    <v-text-field outlined label="Per Unit Price (₹)" v-model="item.unitPrice"
                      v-on:keyup="calculateTotal(item)"></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="3">
                    <v-text-field outlined label="Quantity" v-model="item.quantity"
                      v-on:keyup="calculateTotal(item)"></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="2" md="2">
                    <v-text-field outlined disabled label="Total (₹)" v-model="item.totalPrice"></v-text-field>
                  </v-col>
                  <v-col cols="1" sm="1" md="1">
                    <span class="deleteimg"><img @click="deleteItem(index)"
                        :class="{ 'disabled': items_detail.length === 1 }" src="@/assets/images/delete_red.png"
                        title="Delete Item" /></span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3"></v-col>
              <v-col cols="9">
                <a style="color: #1976d2;" @click="addMoreItemsDetail">
                  <u>Add More +</u>
                </a>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="procedFooter">
            <div>
              <span>Total no. of items - {{ numberOfItems }}</span>
              <span class="ml-15">Total amount (₹) - {{ totalAmount }}</span>
            </div>
            <v-btn color="primary" small @click="submitNewReserve" :disabled="number > 0 || !updatedbuyerName" class="ma-3">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </template>

  </v-card>
</template>
<script>
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';

  export default {
    components: {
      HeaderComponent
    },

    data() {
      return {
        headerText: "Replacement",
        alert_type: 'success',
        alert: false,
        alert_message: '',
        totalSumPrice: 0,
        updateBuyerPopup: false,
        action: '',
        reserve_data: [],
        addBuyerPopup: false,
        numberOfItems: '',
        totalAmount: 0,
        buyerList: [],
        headers: [
          { text: "Tag ID", value: "tag_number" },
          { text: "Article ID", value: "sku_code" },
          { text: "Selling Price (₹)", value: "selling_price" }
        ],
        table_data: [],
        updatedbuyerName: '',
        messagePopup: false,
        message: '',
        items_detail: [{ sku_code: '', unitPrice: '', quantity: '', totalPrice: '' }],
        number: 0,
        Deletepopup: false,
        selected: [],
        search_tag: '',
        loading: false,
      }
    },
    async created() {
      this.reserve_data = JSON.parse(this.$store.state.lot);
      this.table_data = this.reserve_data
      if (this.reserve_data.length == 0) {
        this.action = 'New Reserve';
      } else {
        this.action = 'Reserve';
      }
      this.scrollToTop();
      this.buyerlistFunc();
      this.calculateSum();
    },
    computed: {
      calculateTotalNumber() {
        this.numberOfItems = 0;
        this.totalAmount = 0;
        for (var i = 0; i < this.items_detail.length; i++) {
          this.numberOfItems += Number(this.items_detail[i].quantity);
          this.totalAmount += Number(this.items_detail[i].totalPrice);
        }
      },
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
      submitReserve() {
        this.updateBuyerPopup = true;
      },
      deleteitems() {
        this.Deletepopup = true;
      },
      confirmDelete() {
        if (this.selected.length === 0) { return; }
        this.selected.forEach((selectedItem) => {
          const index = this.table_data.indexOf(selectedItem);
          if (index !== -1) {
            this.table_data.splice(index, 1);
          }
        });
        this.selected = [];
        this.calculateSum();
        this.Deletepopup = false;
      },
      isdisabled() {
        return this.selected.length === 0;
      },
      addMoreItemsDetail() {
        this.items_detail.push({ sku_code: '', unitPrice: '', quantity: '', totalPrice: '' });
      },
      buyerlistFunc() {
        this.$http.secured
          .get("api/v1/forward/replacements/get_buyers")
          .then(response => {
            if (response.data) {
              this.buyerList = response.data.buyers
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
          });
      },
      fetchRemainingDetails(item) {
        this.$http.secured
          .get("api/v1/forward/replacements/" + item.sku_code + "/item_details")
          .then(response => {
            if (response.data) {
              item.unitPrice = response.data.per_unit_price;
              item.quantity = response.data.quantity;
              item.totalPrice = item.unitPrice * item.quantity;
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
          });
      },
      calculateTotal(item) {
        item.totalPrice = Number(item.unitPrice) * Number(item.quantity);
      },
      submitNewReserve() {
        const reserve_items = [];
        this.updateBuyerPopup = false;
        if (this.action == 'New Reserve') {
          for (var i = 0; i < this.items_detail.length; i++) {
            const temp = [];
            if (this.items_detail[i].sku_code != '') {
              temp.push(this.items_detail[i].sku_code);
              temp.push(this.items_detail[i].quantity);
              temp.push(this.items_detail[i].unitPrice);
              temp.push(this.updatedbuyerName);
              reserve_items.push(temp);
            }
          }
        }
        // else {
        //     for(var i=0;i<this.table_data.length;i++){
        //         const temp= [];
        //         if(this.table_data[i].sku_code != ''){
        //             temp.push(this.table_data[i].sku_code);
        //             temp.push('1');
        //             temp.push(this.table_data[i].selling_price);
        //             temp.push(this.updatedbuyerName);
        //             reserve_items.push(temp);
        //         }
        //     }
        // }
        this.$http.secured
          .put("/api/v1/forward/replacements/reserve", { reserve_items: reserve_items })
          .then(response => {
            if (response.data) {
              this.message = response.data.message;
              this.messagePopup = true;

            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.$toast.error(error.response.data.error)
          });
      },
      submitexistReserve() {
        const reserves_items = []
        if (this.action == 'Reserve') {
          for (var i = 0; i < this.table_data.length; i++) {
            const temp = [];
            if (this.table_data[i].sku_code != '') {
              temp.push(this.table_data[i].id);
              temp.push(this.table_data[i].selling_price);
              temp.push(this.updatedbuyerName);
              reserves_items.push(temp);
            }
          }
        }
        this.$http.secured
          .put("/api/v1/forward/replacements/reserve_items", { reserve_items: reserves_items })
          .then(response => {
            if (response.data) {
              this.message = response.data.message;
              this.messagePopup = true;

            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.$toast.error(error.response.data.error)
          });
      },
      deleteItem(index) {
        this.items_detail.splice(index, 1);
      },
      redirectToRepl() {
        this.messagePopup = false;
        this.$router.push({ name: 'ReplacementForward' });
      },
      calculateSum() {
        this.totalSumPrice = 0;
        for (var i = 0; i < this.table_data.length; i++) {
          this.totalSumPrice += Number(this.table_data[i].selling_price ? this.table_data[i].selling_price : 0);
        }
      },
    }
  }
</script>
<style scoped>
  .procedFooter {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .deleteimg {
    position: absolute;
    top: 25px;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>