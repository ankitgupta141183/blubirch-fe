<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <!-- Alert message -->
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
        </div>
        <!-- Title-->
        <header-component :headerTitle="headerText" :router-link="{ name: 'Saleable' }" :router-link-text="'In Stock'"
            :return-condition="true" :component-name="action" />

        <!-- search, Submit buttons -->
        <v-card class="v-card-100" v-if="action == 'Reserve'">
            <v-card-title style="padding: 12px 24px 12px 24px;">
                <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search"
                    style="max-width: 300px; margin-top: 8px;" outlined
                    v-on:keyup.enter="searchElement"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="primary" @click="submitReserve">SUBMIT</v-btn>
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
                                <v-autocomplete v-model="updatedbuyerName" label="Buyer Name" :items="buyerList" @keyup="handleKeyEnter($event)" :loading="isLoading"
                                    item-text="vendor_name" item-value="id" class="ma-2" outlined></v-autocomplete>
                            </v-col>
                            <v-col cols="4" style="padding: 20px 0px">
                                <v-btn outlined color="primary" class="cancel-color ma-2" @click="addBuyer">Add
                                    Buyer</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions center class="mt-2">
                        <v-spacer></v-spacer>
                        <v-btn outlined color="primary" class="cancel-color mb-3"
                            @click="updateBuyerPopup = false">Cancel</v-btn>
                        <v-btn color="primary" class="mb-3" @click="submitNewReserve"
                            :disabled="!updatedbuyerName">Submit</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>


        <!--ADD Buyer -->
        <v-row justify="center">
            <v-dialog v-model="addBuyerPopup" persistent max-width="660px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title outlined style="padding: 12px;">
                            <span>Add Buyer Details</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="addBuyerPopup = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                    <v-card-text style="padding: 20px 24px 0px;">
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="buyerName" :rules="[validateBuyerName]" label="Buyer Name"
                                    class="mr-2" outlined></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="buyerPhoneNo" :rules="[mobileValid]" label="Buyer Phone No."
                                    class="ml-2" outlined></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="buyerEmailId" :rules="[validateEmail]" label="Buyer Email ID"
                                class="ma-2" outlined></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="buyerAddress" label="Address Line 1" class="ma-2"
                                outlined></v-text-field>
                        </v-row><v-row>
                            <v-col cols="6">
                                <v-select :items="addBuyerStates" label="State" v-model="buyerStateName"
                                     outlined></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select :items="citiesList" label="City" v-model="buyerCityName"
                                    outlined></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions center class="mt-2">
                        <v-spacer></v-spacer>
                        <v-btn outlined color="primary" class="cancel-color mb-3"
                            @click="addBuyerPopup = false">Cancel</v-btn>
                        <v-btn color="primary" class="mb-3" @click="submitBuyerDetails"
                            :disabled="buyerName == '' || buyerPhoneNo == '' || buyerEmailId == ''
                                || buyerAddress == '' || buyerCityName == '' || buyerStateName == '' || number > 0">Submit</v-btn>
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
                        <v-btn color="primary" class="mb-3" @click="redirectToSaleble">Ok</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Total selling Price selectec reserve data-->
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
                <v-data-table :dense="true" :search="search" disable-pagination :hide-default-footer="true"
                    :headers="headers" :items="table_data" :loading="loading" loading-text="Loading Data... Please wait"
                    class="elevation-1">
                    <template #[`item.selling_price`]="{ item }">
                        <v-text-field v-model="item.selling_price" hide-details outlined @keypress="isNumber($event)" v-on:keyup="calculateSum"
                            style="max-width: 150px;"></v-text-field>
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
                                <v-autocomplete label="Customer/Buyer Name" v-model="updatedbuyerName" :items="buyerList" @keyup="handleKeyEnter($event)" :loading="isLoading"
                                    item-text="vendor_name" item-value="id" outlined></v-autocomplete>
                            </v-col>
                            <v-col cols="4">
                                <v-btn outlined color="primary" class="cancel-color mt-3" @click="addBuyer">ADD
                                    BUYER</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <span>Add items</span>
                            </v-col>
                            <v-col cols="8">
                                <v-row style="margin-bottom: -25px;" v-for="(item, index) in items_detail" :key="item.id">
                                    <v-col cols="2" sm="3" md="3">
                                        <v-text-field outlined label="Article ID" v-model="item.articleId"
                                            v-on:keyup.enter="fetchRemainingDetails(item)"
                                            @change="calculateTotalNumber"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" sm="3" md="3">
                                        <v-text-field outlined label="Per Unit Price (₹)" v-model="item.unitPrice"
                                            v-on:keyup="totalPriceChange(item)" type="number" min="0"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" sm="3" md="3">
                                        <v-text-field outlined label="Quantity" v-model="item.quantity"
                                            v-on:keyup="totalPriceChange(item)" type="number" min="0"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" sm="3" md="3">
                                        <v-text-field outlined label="Total (₹)" v-model="item.toatlPrice" type="number"
                                            min="0" disabled></v-text-field>
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
                    <v-actions class="procedFooter">
                        <div>
                            <span>Total no. of items - {{ numberOfItems }}</span>
                            <span class="ml-15">Total amount (₹) - {{ totalAmount }}</span>
                        </div>
                        <v-btn color="primary" @click="submitNewReserve"
                            :disabled="!items_detail[0].articleId || !updatedbuyerName || number > 0"
                            class="ma-3">Submit</v-btn>
                    </v-actions>
                </v-card>
            </v-form>
        </template>

    </v-card>
</template>
<script>
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";

export default {
    components: {
        HeaderComponent
    },

    data() {
        return {
            addBuyerStates:[],
            buyerCityData:{},
            headerText: "Saleable",
            alert_type: 'success',
            alert: false,
            alert_message: '',
            totalSumPrice: 0,
            updateBuyerPopup: false,
            action: '',
            reserve_data: [],
            addBuyerPopup: false,
            numberOfItems: 0,
            totalAmount: 0,
            buyerList: [],
            headers: [
                { text: "Tag ID", value: "tag_number" },
                { text: "Article ID", value: "article_sku" },
                { text: "Selling Price (₹)", value: "selling_price" }
            ],
            table_data: [],
            updatedbuyerName: '',
            buyerAddress: '',
            buyerName: '',
            buyerPhoneNo: '',
            buyerEmailId: '',
            buyerCityName: '',
            buyerStateName: '',
            messagePopup: false,
            message: '',
            items_detail: [{ articleId: '', unitPrice: '', quantity: '', toatlPrice: '' }],
            number: 0,
            search_tag: '',
            isLoading : false,
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
        this.buyerlistFunc('');
        this.calculateSum();
        this.getBuyerCityStates()
    },
    computed: {
        calculateTotalNumber() {
            this.numberOfItems = 0;
            this.totalAmount = 0;
            for (var i = 0; i < this.items_detail.length; i++) {
                this.numberOfItems += this.items_detail[i].quantity;
                this.totalAmount += this.items_detail[i].toatlPrice;
            }
        },
        citiesList(){
          return this.buyerCityData[this.buyerStateName] 
        }
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
        addMoreItemsDetail() {
            this.items_detail.push({ articleId: '', unitPrice: '', quantity: '', toatlPrice: '' });
        },
        addBuyer() {
            this.addBuyerPopup = true;
            this.number = 0;
            this.buyerName = '';
            this.buyerAddress = '';
            this.buyerPhoneNo = '';
            this.buyerEmailId = '';
            this.buyerCityName = '';
            this.buyerStateName = '';
        },

        getBuyerCityStates() {
            this.$http.secured
                .get("/api/v2/warehouse/saleables/get_city_and_states")
                .then(response => {
                    if (response.data) {
                        const list = response.data.states
                        this.addBuyerStates = list.slice().sort();
                        this.buyerCityData = response.data.state_map_with_cities
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
                });
        },
        handleKeyEnter(event){
            this.buyerlistFunc(event.target.value);
        },
        buyerlistFunc(val) {
            this.isLoading = true;
            const params = {
                query : val,
            }
            this.$http.secured
                .get("/api/v2/warehouse/saleables/get_buyers",{params : params})
                .then(response => {
                    if (response.data) {
                        this.buyerList = response.data.buyers
                        this.isLoading = false;
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
                });
        },
        fetchRemainingDetails(item) {
            this.$http.secured
                .get("/api/v2/warehouse/saleables/" + item.articleId + "/item_details")
                .then(response => {
                    if (response.data) {
                        item.unitPrice = response.data.per_unit_price;
                        item.quantity = response.data.quantity;
                        item.toatlPrice = response.data.total_price
                    } else {
                        this.showAlert("error", "No Data Found");
                    }
                })
                .catch(error => {
                    this.showAlert("error", "Something went wrong from Network" + error);
                });
        },
        submitBuyerDetails() {
            this.number++;
            const vendor_master = {
                'vendor_name': this.buyerName,
                'vendor_email': this.buyerEmailId,
                'vendor_phone': this.buyerPhoneNo,
                'vendor_address': this.buyerAddress,
                'vendor_city': this.buyerCityName,
                'vendor_state': this.buyerStateName
            };
            console.log("vendor_master",vendor_master)
            this.$http.secured
                .post("/api/v2/warehouse/saleables/create_buyer", { vendor_master: vendor_master })
                .then(response => {
                    if (response.data) {
                        this.addBuyerPopup = false;
                        const temp = response.data.vendor_master;
                        const addedBuyer = {
                            'id': temp.id,
                            'vendor_code': temp.vendor_code,
                            'vendor_name': temp.vendor_name,
                            'vendor_phone': temp.vendor_phone,
                        }
                        this.buyerList.push(addedBuyer);
                        this.updatedbuyerName = response.data.vendor_master.id
                    } else {
                        this.number = 0;
                        this.showAlert("error", "No Data Found");
                    }
                })
                .catch(error => {
                    this.number = 0;
                    this.$toast.error(error.response.data.error)
                });
        },
        submitNewReserve() {
            this.number++;
            const reserve_items = [];
            this.updateBuyerPopup = false;
            if (this.action == 'New Reserve') {
                for (var i = 0; i < this.items_detail.length; i++) {
                    const temp = [];
                    if (this.items_detail[i].articleId != '') {
                        temp.push(this.items_detail[i].articleId);
                        temp.push(this.items_detail[i].quantity);
                        temp.push(this.items_detail[i].unitPrice);
                        temp.push(this.updatedbuyerName);
                        reserve_items.push(temp);
                    }
                }
            } else {
                for (var i = 0; i < this.reserve_data.length; i++) {
                    const temp = [];
                    temp.push(this.reserve_data[i].article_sku);
                    temp.push('1');
                    temp.push(this.reserve_data[i].selling_price ? this.reserve_data[i].selling_price : 0);
                    temp.push(this.updatedbuyerName);
                    reserve_items.push(temp);
                }
            }
            this.$http.secured
                .put("/api/v2/warehouse/saleables/reserve_items", { reserve_items: reserve_items })
                .then(response => {
                    if (response.data) {
                        this.message = response.data.message;
                        this.messagePopup = true;

                    } else {
                        this.number = 0;
                        this.showAlert("error", "No Data Found");
                    }
                })
                .catch(error => {
                    this.number = 0;
                    this.$toast.error(error.response.data.error)
                });
        },
        redirectToSaleble() {
            this.messagePopup = false;
            this.$router.push({ name: 'Saleable' });
        },
        calculateSum() {
            this.totalSumPrice = 0;
            for (var i = 0; i < this.table_data.length; i++) {
                this.totalSumPrice += Number(this.table_data[i].selling_price ? this.table_data[i].selling_price : 0);
            }
        },
        totalPriceChange(item) {
            if (!item.quantity || !item.unitPrice) {
                item.toatlPrice = 0;
            } else {
                item.toatlPrice = item.unitPrice * item.quantity;
            }
        },
        validateBuyerName(value) {
            const regex = /^[A-Za-z\s]+$/;
            if (!regex.test(value)) {
                return 'Only alphabets and spaces are allowed.';
            }
            return true;
        },
        mobileValid(value) {
            const regex = /^[0-9]+$/;
            if (value == '') {
                return true;
            }
            if (!regex.test(value)) {
                return 'Only numbers are allowed.';
            }
            if (value.length > 10) {
                return 'Please enter exactly 10 digits.';
            }
            return true;
        },
        validateEmail(value) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(value)) {
                return 'Not a valid email address.';
            }
            return true;
        },
        searchElement(){
            if(this.search_tag == ''){
                this.table_data = this.reserve_data;
                return;
            }
            const parts = this.search_tag.split(',');
            this.table_data = [];
            for(var i=0; i<parts.length; i++){
                parts[i] = parts[i].replace(/^\s+/, "");
                const searchedElement = this.reserve_data.filter( x => (x.tag_number == parts[i]) || (x.article_sku == parts[i]));
                if(searchedElement.length > 0){
                    this.table_data.push(...searchedElement);
                }
            }
        },
        isNumber(evt) {
            const charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode < 48 || charCode > 57)
            {
                evt.preventDefault();
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
</style>