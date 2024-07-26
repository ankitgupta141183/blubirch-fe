<template>
  <div>
    <!-- alert -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
    </div>
    <!-- header -->
    <div>
      <HeaderComponent :headerTitle="headerText" :router-link="{ name: 'Rental' }" :router-link-text="'Rental'" :return-condition="true" :component-name="'Rental Reserve'" />
    </div>

    <v-card class="px-12 py-5">
      <template v-if="selectedItem.length > 0">
        <v-row>
          <v-col>
            <v-autocomplete outlined prepend-inner-icon="mdi-magnify" label="Lessee Name" v-model="selected_lessename"
              :items="lesseeList" item-value="vendor_code" item-text="vendor_name"></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete outlined prepend-inner-icon="mdi-magnify" v-model="selected_pay_freq"
              :items="['Monthly', 'Yearly']" label="Lease Payment Frequency"></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="startDatemenu" v-model="startDatePicker" :close-on-content-click="false"
              :return-value.sync="startDate" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="formatStartDate" label="Lease Start Date" outlined append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"> </v-text-field>
              </template>
              <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="startDate" no-title scrollable @change="calculateNumberOfDays">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startDatePicker = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="$refs.startDatemenu.save(startDate)"> OK </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="endDatemenu" v-model="endDatePicker" :close-on-content-click="false" :return-value.sync="endDate" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="formatEndDate" label="Lease End Date" outlined append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"> </v-text-field>
              </template>
              <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="endDate" no-title scrollable @change="calculateNumberOfDays">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endDatePicker = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="$refs.endDatemenu.save(endDate)"> OK </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Notice Period (In Days)" v-model="noticePeriodDays" outlined oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table disable-pagination :hide-default-footer="true" :headers="headers" :items="selectedItem">
              <template #[`item.article_description`]="{ item }">
                <span class="article_description-ellipsis">{{ item.article_description }}</span>
              </template>
              <template #[`item.lease_amount`]="{ item }">
                <v-text-field outlined class="my-2" v-model="item.lease_amount" v-on:keyup="calculateMonthlyAmount" :rules="amountRule" oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
              </template>
              <template #[`item.security_deposit`]="{ item }">
                <v-text-field outlined class="my-2" v-model="item.security_deposit" :rules="amountRule" v-on:keyup="calculateSecurityDeposit" oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <h6 class="mt-7">Add Items:</h6>
          </v-col>
          <v-col cols="12" sm="12" md="9">
            <v-row>
              <v-col>
                <v-autocomplete outlined prepend-inner-icon="mdi-magnify" label="Lessee Name" v-model="selected_lessename"
                  :items="lesseeList" item-value="vendor_code" item-text="vendor_name"></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete outlined prepend-inner-icon="mdi-magnify" v-model="selected_pay_freq"
                  :items="['Monthly', 'Yearly']" label="Lease Payment Frequency"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu ref="startDatemenu" v-model="startDatePicker" :close-on-content-click="false" :return-value.sync="startDate" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="formatStartDate" hide-details label="Lease Start Date" outlined append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"> </v-text-field>
                  </template>
                  <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="startDate" no-title scrollable @change="calculateNumberOfDays">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="startDatePicker = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.startDatemenu.save(startDate)"> OK </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu ref="endDatemenu" v-model="endDatePicker" :close-on-content-click="false" :return-value.sync="endDate" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="formatEndDate" hide-details label="Lease End Date" outlined append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"> </v-text-field>
                  </template>
                  <v-date-picker :min="allow_end_date" v-model="endDate" no-title scrollable @change="calculateNumberOfDays">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="endDatePicker = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.endDatemenu.save(endDate)"> OK </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="noticePeriodDays" label="Notice Period (In Days)" outlined oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
              </v-col>
            </v-row>

          </v-col>
        </v-row>
        <v-row style="min-height: 45vh;">
          <v-col cols="12" sm="12" md="3">
            <h6 class="mt-7">Add Lease Details:</h6>
          </v-col>
          <v-col cols="12" sm="12" md="9">
            <v-row v-for="(AddLeaseFields, index) in AddLeaseDetails" :key="index">

              <v-col>
                <v-autocomplete label="Article ID" outlined hide-details v-model="AddLeaseFields.article_id"
                  @input="(value) => handleChange(AddLeaseFields)" :items="articleIdList" item-text="article_id"
                  return-object>
                </v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field label="Per unit price (₹)" outlined v-model="AddLeaseFields.perUnitPrice" oninput="this.value = this.value.replace(/[^0-9]/g, '');">

                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Quantity" outlined v-model="AddLeaseFields.quantity" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @change="calculateNumberOfitem"> </v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Lease Amount(₹)" outlined v-model="AddLeaseFields.leaseAmount" v-on:keyup="calculateMonthlyAmount" :rules="amountRule" oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Security Deposit (₹)" outlined v-model="AddLeaseFields.securityDeposit" v-on:keyup="calculateSecurityDeposit" :rules="amountRule" oninput="this.value = this.value.replace(/[^0-9]/g, '');"> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn text color="primary" class="p-0" @click="handleAddMore">
                  <u><span>Add More +</span></u>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <v-row>
        <v-col cols="12" sm="6" md="11" style="display: flex; font-size: 13px;">
          <p class="mr-6">Total no. of items - {{ numberOfItem }}</p>
          <p class="mr-6">Total {{ selected_pay_freq ? selected_pay_freq : 'Monthly' }} amount (₹) - {{ monthlyAmount }} </p>
          <p class="mr-6">Total Lease Period amount (₹) - {{ totalLeasseAmount }}</p>
          <!-- <p class="mr-6">Total Lease Period amount (₹) - </p> -->
          <p class="mr-6" v-if="selectedItem.length > 0">Security Deposit (₹)- {{ securityDepositSum }}</p>
          <p class="mr-6">Total No. of Days- {{ numberOfDays }}</p>
        </v-col>
        <v-col cols="12" sm="12" md="1">
          <v-btn color="primary" class="mb-3" :disabled="number > 0 || disableSubmitButton" @click="submitReserve">Submit</v-btn>
        </v-col>
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
              <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">Ok</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import HeaderComponent from "@/components/commoncomponents/HeaderComponent";

  export default {
    components: {
      HeaderComponent
    },
    data() {
      return {
        headerText: "Rental",
        search: "",
        alert: false,
        alert_type: "success",
        alert_message: "success",
        startDatePicker: false,
        endDatePicker: false,
        startDate: "",
        endDate: "",
        headers: [
          { text: "Tag ID", value: "tag_id", width: '12%', align: "start", sortable: false },
          { text: "Article Id", value: "article_id" },
          { text: "Article Description", value: "article_description" },
          { text: "Lease Amount (₹)", value: "lease_amount" },
          { text: "Security Deposit (₹)", value: "security_deposit" }
        ],
        additemStaticfields: { id: 1, article_id: "", perUnitPrice: "", quantity: "", leaseAmount: "", securityDeposit: "" },
        AddLeaseDetails: [{ id: 1, article_id: "", perUnitPrice: "", quantity: "", leaseAmount: "", securityDeposit: "" }],
        noticePeriodDays: "",
        fieldError: [],
        selectedItem: [],
        lesseeList: [],
        selected_lessename: '',
        selected_pay_freq: '',
        articleIdList: [],
        messagePopup: false,
        message: '',
        number: 0,
        numberOfItem: 0,
        monthlyAmount: 0,
        totalLeasseAmount: 0,
        securityDepositSum: 0,
        numberOfDays: 0,
        numberOfMonth: 0,
        number: 0,
        amountRule: [v => !!v || "The field is required",
        v => Number(v) > 0 || "Value should be more than 0"
        ],
      }
    },
    async created() {
      this.selectedItem = JSON.parse(this.$store.state.lot);
      if (this.selectedItem.length) {
        this.calculateMonthlyAmount();
        this.calculateNumberOfitem();
        this.calculateSecurityDeposit();
      }
      this.getVendorMaster();
      this.fetchArticleId();
    },
    computed: {
      formatStartDate() {
        return this.formatDate(this.startDate)
      },
      formatEndDate() {
        return this.formatDate(this.endDate)
      },
      disableSubmitButton() {
        return !this.selected_lessename || !this.selected_pay_freq || !this.startDate || !this.endDate || !this.noticePeriodDays
          || (this.selectedItem.length == 0 && this.AddLeaseDetails.some(x => !x.article_id || !Number(x.perUnitPrice) || !Number(x.leaseAmount) || !Number(x.securityDeposit))) ||
          (this.selectedItem.length > 0 && this.selectedItem.some(x => !Number(x.lease_amount) || !Number(x.security_deposit)));
      },
      allow_end_date() {
        const start_date = this.startDate ? (new Date(this.startDate)) : (new Date());
        const temp = new Date();
        temp.setDate(start_date.getDate() + (this.selected_pay_freq == 'Monthly' ? 30 : this.selected_pay_freq == 'Yearly' ? 365 : 0));
        return temp.toISOString().substr(0, 10);
      }

    },

    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
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
            this.number = 0;
            this.loading = false;
            this.showAlert("error", "No Data Found");
            return { error: "No Data Found" }
          }
        }).catch(error => {
          this.number = 0;
          // this.showAlert("error", "Something went wrong from Network" + error);
          if (error.response.data.error) {
            this.$toast.error(error.response.data.error);
          }
          this.loading = false;
          return { error: "Something went wrong from Network" }
        });

      },
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },

      showAlert(alert_type, alert_message) {
        this.scrollToTop();
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },
      getVendorMaster() {
        this.$http.secured
          .get("/api/v2/warehouse/rental/reserve/vendor_master_details")
          .then(response => {
            if (response.data) {
              this.lesseeList = response.data.vendor_masters
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      },
      formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      handleAddMore() {
        this.AddLeaseDetails = [...this.AddLeaseDetails, { id: this.AddLeaseDetails.length + 1, ...this.additemStaticfields }]
      },
      handleChange(AddLeaseFields) {
        AddLeaseFields.quantity = AddLeaseFields.article_id.quantity;
        this.calculateNumberOfitem();
      },

      fetchArticleId() {
        this.$http.secured
          .get("/api/v2/warehouse/rental/reserve/article_ids_with_quantity")
          .then(response => {
            if (response.data) {
              this.articleIdList = response.data.article_ids_with_quantity
            } else {
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
          });
      },
      async submitReserve() {
        this.number++;
        if (Number(this.noticePeriodDays) > Number(this.numberOfDays)) {
          this.$toast.error("Number Of Notice Period Days should be at lesser than total number of lease day.");
          return;
        }
        if (this.selectedItem.length > 0) {
          const params = {
            "buyer_code": this.selected_lessename,
            "lease_payment_frequency": this.selected_pay_freq,
            "lease_start_date": this.startDate,
            "lease_end_date": this.endDate,
            "notice_period_days": Number(this.noticePeriodDays),
            "item_details_by_tag_number": []
          }
          this.selectedItem.forEach(temp => {
            params.item_details_by_tag_number.push({
              "tag_number": temp.tag_id,
              "lease_amount": Number(temp.lease_amount), "security_deposit": Number(temp.security_deposit)
            });
          });
          let list = await this.apiCaller({
            method: "post",
            url: "/api/v2/warehouse/rental/reserve/create_rental_reserve",
            body: params
          })
          if (list.message) {
            this.messagePopup = true;
            this.message = list.message;
          }
        } else {
          const params = {
            "buyer_code": this.selected_lessename,
            "lease_payment_frequency": this.selected_pay_freq,
            "lease_start_date": this.startDate,
            "lease_end_date": this.endDate,
            "notice_period_days": Number(this.noticePeriodDays),
            "item_details_by_article_number": []
          }
          this.AddLeaseDetails.forEach(temp => {
            params.item_details_by_article_number.push({
              "article_number": temp.article_id.article_id
              ,
              "unit_price": Number(temp.perUnitPrice), "quantity": Number(temp.quantity),
              "lease_amount": Number(temp.leaseAmount), "security_deposit": Number(temp.securityDeposit)
            });
          });
          let list = await this.apiCaller({
            method: "post",
            url: "/api/v2/warehouse/rental/reserve/create_rental_reserve",
            body: params
          })
          if (list.message) {
            this.messagePopup = true;
            this.message = list.message;
          }
        }
      },
      afterClickOkLoadData() {
        this.$router.push({ name: 'Rental' });
      },
      calculateNumberOfitem() {
        this.numberOfItem = 0;
        if (this.selectedItem.length) {
          this.numberOfItem = this.selectedItem.length;
        } else {
          this.AddLeaseDetails.forEach(x => (this.numberOfItem += Number(x.quantity)));
        }
      },
      calculateMonthlyAmount() {
        this.monthlyAmount = 0;
        if (this.selectedItem.length) {
          this.selectedItem.forEach(x => (this.monthlyAmount += Number(x.lease_amount ? x.lease_amount : 0)));
        } else {
          this.AddLeaseDetails.forEach(x => (this.monthlyAmount += Number(x.leaseAmount ? x.leaseAmount : 0)));
        }
        this.calculateTotalAmount();
      },
      calculateSecurityDeposit() {
        this.securityDepositSum = 0;
        if (this.selectedItem.length) {
          this.selectedItem.forEach(x => (this.securityDepositSum += Number(x.security_deposit ? x.security_deposit : 0)));
        }
      },
      calculateNumberOfDays() {
        if (!this.startDate || !this.endDate) {
          return;
        }
        const s_date = new Date(this.startDate);
        const e_date = new Date(this.endDate);
        const utcDate1 = Date.UTC(s_date.getFullYear(), s_date.getMonth(), s_date.getDate());
        const utcDate2 = Date.UTC(e_date.getFullYear(), e_date.getMonth(), e_date.getDate());
        this.numberOfDays = Math.floor((utcDate2 - utcDate1) / (24 * 60 * 60 * 1000)) + 1;
        // if(this.selected_pay_freq == 'Weekly'){
        //     if(this.numberOfDays < 7){
        //         this.$toast.error("End date  should be at least 7 days after start date.")
        //         this.endDate = '';
        //     }
        // } else
        if (this.selected_pay_freq == 'Monthly') {
          if (this.numberOfDays < 30) {
            this.$toast.error("End date should be at least 30 days after the start date.")
            this.endDate = '';
            this.numberOfDays = 0;
          }
        } else if (this.selected_pay_freq == 'Yearly') {
          if (this.numberOfDays < 365) {
            this.$toast.error("End date should be at least 365 days after the start date.")
            this.endDate = '';
            this.numberOfDays = 0;
          }
        }
        this.calculateTotalAmount();
      },
      calculateMonthNumber() {
        const s_date = new Date(this.startDate);
        const e_date = new Date(this.endDate);
        const yearDiff = e_date.getFullYear() - s_date.getFullYear();
        const monthDiff = e_date.getMonth() - s_date.getMonth();
        this.numberOfMonth = yearDiff * 12 + monthDiff + 1;
      },
      calculateTotalAmount() {
        if (!this.startDate || !this.endDate) {
          return;
        }
        // this.calculateMonthNumber();
        // this.totalLeasseAmount = Number(this.numberOfMonth) * Number(this.monthlyAmount);
        const No_of_leasse_freq = (Number(this.numberOfDays) * 1.0) / (this.selected_pay_freq == 'Monthly' ? 30 : 365);
        this.totalLeasseAmount = Math.ceil(Number(this.monthlyAmount) * No_of_leasse_freq);
      }
    }
  }
</script>
<style>
.article_description-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>