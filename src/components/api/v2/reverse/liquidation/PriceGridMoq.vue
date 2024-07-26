<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <!-- Header component -->
    <div> <HeaderComponent :headerTitle="headerText" :lotIdB2b="lotIdB2b" :action="action" :subLotsQuantity="subLotsQuantity" :possible_of_sublot="possible_of_sublot"/></div>
      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage" :color="primary_code">
        </loading>
     
            <!-- Create lot form -->
            <template>
                <v-form ref="moqForm">
                    <v-card class="v-card-100">
                        <v-card-text>
                            <div>
                              <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="3" md="3">
                                    <span class="leftHeaderName">Lot Name</span>
                                </v-col>
                                <v-col cols="2" sm="9" md="9">
                                    <v-text-field :rules="inputRules" v-model="lot_name" label="Lot Name" hint="Standard Lot Name structure: Category||Brand||City||Enddate" persistent-hint outlined type="text" style="font-weight: bold;"></v-text-field>
                                </v-col>
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="1" sm="3" md="3">
                                    <span class="leftHeaderName">Lot Description</span>
                                </v-col>
                                <v-col cols="2" sm="9" md="9">
                                    <v-text-field :rules="inputRules" v-model="lot_desc" label="Lot Description" type="text" outlined></v-text-field>
                                </v-col>
                                </v-row>
                              <v-row>
                                <v-spacer></v-spacer>
                                <span class="mr-6" style="font-weight: bold;">MRP Total (Per Lot): ₹{{ mrpPerLotAmount.toLocaleString('en-IN') }}</span>
                              </v-row>
                              <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                  <p class="leftHeaderName">Sub-Lot Quantity</p>
                                </v-col>
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="MaxLotsPerBuyerRules" v-model="subLotQuantity[0].from_lot" label="From" outlined type="number" :min="0"  @input="calculateMaxLotBuyer" ref="fromLot"></v-text-field>
                                </v-col>
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="[...fromLotRules, ...MaxLotsPerBuyerRules]" v-model="subLotQuantity[0].to_lot" label="To" outlined type="number" :min="0"  @input="calculateMaxLotBuyer" ref="toLot"></v-text-field>
                                </v-col>  
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="priceRules" v-model="format_subLotQuantity_0_price_per_lot" label="Price per lot" outlined :min="0" @input="calculateTotalSum"></v-text-field>
                                </v-col>                                
                               </v-row> 
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                </v-col>
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="[...toLotRules, ...MaxLotsPerBuyerRules]" v-model="subLotQuantity[1].from_lot" label="From" outlined type="number" :min="0"  @input="calculateMaxLotBuyer" ref="fromLot1"></v-text-field>
                                </v-col>
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="[...fromLotRules1, ...MaxLotsPerBuyerRules]" v-model="subLotQuantity[1].to_lot" label="To" outlined type="number" :min="0"  @input="calculateMaxLotBuyer" ref="toLot1"></v-text-field>
                                </v-col>  
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="priceRules1" v-model="format_subLotQuantity_1_price_per_lot" label="Price per lot" outlined  :min="0" @input="calculateTotalSum"></v-text-field>
                                </v-col>                                
                               </v-row>
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                </v-col>
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="[...toLotRules1, ...MaxLotsPerBuyerRules]" v-model="subLotQuantity[2].from_lot" label="From" outlined type="number" :min="0"  @input="calculateMaxLotBuyer" ref="fromLot2"></v-text-field>
                                </v-col>
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="[...fromLotRules2, ...MaxLotsPerBuyerRules]" v-model="subLotQuantity[2].to_lot" label="To" outlined type="number" :min="0"  @input="calculateMaxLotBuyer" ref="toLot2"></v-text-field>
                                </v-col>  
                                <v-col cols="3" sm="3" md="3">                                    
                                    <v-text-field :rules="priceRules2" v-model="format_subLotQuantity_2_price_per_lot" label="Price per lot" outlined :min="0" @input="calculateTotalSum"></v-text-field>
                                </v-col>                                
                               </v-row>                              
                               
                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                    <p class="leftHeaderName">Lot Duration Details</p>
                                </v-col>
                                <v-col cols="9" sm="9" md="9">  
                                  <v-row>     
                                <v-col cols="6" sm="6" md="6">                                 
                                   <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="bid_start_date" transition="scale-transition" offset-y min-width="290px">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field outlined
                                        v-model="formattedStartDate"
                                        label="Bid Start Date"
                                        prepend-inner-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="bid_start_date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu1.save(bid_start_date)">OK</v-btn>
                                      </v-date-picker>
                                     </v-menu>
                                   </v-col>
                                    <v-col cols="6" sm="6" md="6">                                    
                                        <inlineTimePicker label="Bid Start Time"  required :timeValue="time1" :allow_time="allow_start_time" :getSelectedTime="(selectedTime)=>{time1 = selectedTime}" />
                                    </v-col>
                                </v-row>
                                </v-col>
                               </v-row>

                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                </v-col>
                                <v-col cols="9" sm="9" md="9">  
                                  <v-row>     
                                <v-col cols="6" sm="6" md="6">                                 
                                  <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="bid_end_date" transition="scale-transition" offset-y min-width="290px">
                                      <template v-slot:activator="{ on, attrs }">
                                          <v-text-field outlined
                                          v-model="formattedEndDate"
                                          label="Bid End Date"
                                          prepend-inner-icon="event"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on" 
                                          >
                                          </v-text-field>
                                      </template>
                                      <v-date-picker :min="minium_end_date"  v-model="bid_end_date" no-title scrollable >
                                          <v-spacer></v-spacer>
                                          <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                          <v-btn text color="primary" @click="$refs.menu2.save(bid_end_date)">OK</v-btn>
                                      </v-date-picker>
                                      </v-menu>
                                   </v-col>
                                <v-col cols="6" sm="6" md="6">  
                                    <inlineTimePicker label="Bid End Time" required :timeValue="time2" :allow_time="allow_end_time" :getSelectedTime="(selectedTime)=>{time2 = selectedTime}" />
                                </v-col>
                                </v-row>
                                </v-col>
                               </v-row>

                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                  <p class="leftHeaderName">Delivery Timeline</p>
                                </v-col>
                                <v-col cols="9" sm="9" md="9">  
                                  <v-row>
                                    <v-col cols="6" sm="6" md="6">
                                      <v-text-field  v-model="deliveryTimeline" :rules="positiveNumber" label="Enter the no. of days from date of payment" outlined type="number"></v-text-field>
                                    </v-col>
                                  </v-row>                                  
                                </v-col>                                
                               </v-row>

                               <v-row style="margin-bottom: -25px;">
                                <v-col cols="3" sm="3" md="3">
                                    <p class="leftHeaderName">Select Approved Buyers</p>
                                </v-col>
                                <v-col cols="9" sm="9" md="9">
                                  <v-row> 
                                    <v-col col="6" sm="6" md="6">
                                    <v-combobox 
                                        prepend-inner-icon="mdi-magnify"
                                        v-model="selected_approval" 
                                        :items="select_list_items" 
                                        item-text="full_name" 
                                        item-value="username" 
                                        label="Search & Select from the list"
                                        outlined
                                        multiple
                                        clearable
                                        chips
                                        ref="brandAutocomplete"
                                        ></v-combobox>
                                      </v-col>
                                  </v-row>
                                </v-col>
                               </v-row>
                               
                               <v-row style="margin-bottom: -25px;">
                                  <v-col cols="3" sm="3" md="3">
                                    <p class="leftHeaderName">Maximum Lots Per Buyer</p>
                                  </v-col>
                                  <v-col cols="9" sm="9" md="9">  
                                    <v-row>
                                      <v-col cols="6" sm="6" md="6">
                                        <v-text-field v-model="maxLotPrBuyer" :rules="[...positiveNumber, ...MaxLotsTlot]" label="Maximum Lots Per Buyer" outlined type="number" @input="testValue"></v-text-field>
                                      </v-col>
                                    </v-row>                                  
                                  </v-col>                                
                               </v-row>

                               <v-card-actions>                             
                                <v-spacer></v-spacer>
                                <v-btn  v-if="action == 'price_grid'" color="primary" style="margin-top: 18px;" @click="createMOQLot" :disabled="!isRequiredFieldsFilled || number > 0">SUBMIT</v-btn>
                                <v-btn  v-if="action == 'edit_lot_moq'" color="primary" style="margin-top: 18px;" @click="editAndSave" :disabled="!isRequiredFieldsFilled || number > 0">SAVE & CLOSE</v-btn>
                                <v-btn  v-if="action == 're_publish_payment'" color="primary" style="margin-top: 18px;" @click="rePublishLot" :disabled="!isRequiredFieldsFilled || number > 0">Republish</v-btn>
                            </v-card-actions>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-form>
            </template> 

    </v-card>
</template>
<script>
import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import inlineTimePicker from '../../../../commoncomponents/inlineTimePicker.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    data(){
       return {
        headerText: "Liquidation",
        alert_type:'',
        alert_message:'',
        alert: false,
        bid_start_date:null,
        menu1: false,
        menu2:false,
        bid_end_date:null,
        time1:null,
        time2:null,
        action:'',
        subLotQuantity:[
          {from_lot:'',to_lot:'',price_per_lot:''},{from_lot:'',to_lot:'',price_per_lot:''},{from_lot:'',to_lot:'',price_per_lot:''}
        ],
        maxLotPrBuyer:'',
        selected_approval:[],
        select_list_items:[],
        deliveryTimeline:'',
        lot_name:'',
        lot_desc:'',
        lot_details:[],
        mrpPerLotAmount:'',
        sumSubLotPrice:'',
        sub_lot_quantity:'',
        lotIdB2b:'',
        possible_of_sublot:'',
        primary_code: "#0275d8",
        subLotsQuantity:'',
        inputRules: [v => !!v || "The field is required"],
        maxFromLot:'',
        maxToLot:'',
        number : 0,
        priceRules: [
              v => !!v || 'The field is required',
              (v) => /^\d+$/.test(this.formatNumber(v)) || 'Enter a valid number',
              (v) => this.subLotQuantity[0].price_per_lot <= this.mrpPerLotAmount  || ' Sub lot price should be less than or equal to MRP'],
        priceRules1: [
            (v) => (v === null || v === undefined || v === '' || /^\d+$/.test(this.formatNumber(v))) || 'Enter a valid number',
            (v) =>(v === null || v === undefined || v === '' || Number(this.subLotQuantity[1].price_per_lot) <= Number(this.subLotQuantity[0].price_per_lot)) || ' Sub lot price should be less than or equal to First Price per lot'
        ],
        priceRules2: [
            (v) => (v === null || v === undefined || v === '' || /^\d+$/.test(this.formatNumber(v))) || 'Enter a valid number',
            (v) =>(v === null || v === undefined || v === '' || Number(this.subLotQuantity[2].price_per_lot) <= Number(this.subLotQuantity[1].price_per_lot)) || ' Sub lot price should be less than or equal to Second Price per lot'
        ],
        
        fromLotRules:[
           v => !!v || 'The field is required',
          (v) => /^\d+$/.test(v) || 'Enter a valid number',
          (v) => (v === null || v === undefined || v === '' || (parseInt(v) > parseInt(this.subLotQuantity[0].from_lot))) || ' It should greater than From'
        ],
        fromLotRules1: [
              (v) => (v === null || v === undefined || v === '' || /^\d+$/.test(v)) || 'Enter a valid number',
              (v) => (v === null || v === undefined || v === '' || (parseInt(v) > parseInt(this.subLotQuantity[1].from_lot))) || 'It should be greater than From',
            ],
        fromLotRules2:[
        (v) => (v === null || v === undefined || v === '' || /^\d+$/.test(v)) || 'Enter a valid number',
        (v) => (v === null || v === undefined || v === '' || (parseInt(v) > parseInt(this.subLotQuantity[2].from_lot))) || ' It should greater than From',
        ],
        toLotRules:[
          (v) => (v === null || v === undefined || v === '' || /^\d+$/.test(v)) || 'Enter a valid number',
          (v) => (v === null || v === undefined || v === '' || (parseInt(v) == parseInt(this.subLotQuantity[0].to_lot)+1)) || ' It should exactly one more than First TO',
        ],
        toLotRules1:[
        (v) => (v === null || v === undefined || v === '' || /^\d+$/.test(v)) || 'Enter a valid number',
          (v) => (v === null || v === undefined || v === '' || (parseInt(v) == parseInt(this.subLotQuantity[1].to_lot)+1)) || ' It should exactly one more than Second TO',
        ],
        positiveNumber:[
          v => !!v || 'Field is required',
          v => /^\d+$/.test(v) || 'Enter a positive whole number'
        ],
        fromLotRulesZero:[
        (value) => {
        if (!value || parseInt(value) < 1) {
          return "From value must be greater than or equal to 1";
        }
        return true;
      },
        ]
       }
    },
    components: {
      HeaderComponent, Loading, inlineTimePicker
    },
    watch: {
      selected_approval(newValue) {
    if (newValue && newValue.length > 0) {
      this.$nextTick(() => {
      this.$refs.brandAutocomplete.internalSearch = '';
      });
    }
  },
    },
    async created(){
        this.action = this.$store.state.action;
        this.number = 0;
        this.loadApproverbuyers();
        if(this.action === 'edit_lot_moq' || this.action === 're_publish_payment'){
          this.lotIdMoq = this.$store.state.lotIds;
          this.lotIdB2b = this.lotIdMoq
          this.isLoading = true;
          await this.editLotDataUpdate();          
        }else if(this.action === 'price_grid'){
          this.lotIdMoq = this.$store.state.lotIds;
          this.possible_of_sublot = this.$store.state.subLotsPossible
           this.subLotsQuantity = this.$store.state.subLotQuantity
          await this.mrpPerLot();          
        }
    },
    computed:{
    allow_end_time() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}`;
        const st_time = `${formattedDate} ${formattedTime}`;
        let bid_start_date = this.dateForCalander(st_time, 'date')
        let bid_start_time = this.dateForCalander(st_time, 'time')
        if(this.time1 !== bid_start_date && (this.bid_start_date === this.bid_end_date)){
          if(!this.time2 || (this.time2 && this.time2<this.time1))
          { this.time2 = this.time1 }
          console.log("h1+"+this.time1);
          // this.time2 = this.time1;
          return this.time1;
        }else if (bid_start_date && (bid_start_date === this.bid_end_date)) {
          console.log("h2+"+this.bid_start_time);
          return bid_start_time;
        } else {
          console.log("h3+");
          return "00:00";
        }
    },

    format_subLotQuantity_0_price_per_lot: {
      get() {
        return this.subLotQuantity[0].price_per_lot ? Number(this.subLotQuantity[0].price_per_lot).toLocaleString('en-IN') : "";
      },
      set(value) {
        const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
        this.subLotQuantity[0].price_per_lot = isNaN(numericValue) ? '' : numericValue;
      },
    },

    format_subLotQuantity_1_price_per_lot: {
      get() {
        return this.subLotQuantity[1].price_per_lot ? Number(this.subLotQuantity[1].price_per_lot).toLocaleString('en-IN') : "";
      },
      set(value) {
        const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
        this.subLotQuantity[1].price_per_lot = isNaN(numericValue) ? '' : numericValue;
      },
    },

    format_subLotQuantity_2_price_per_lot: {
      get() {
        return this.subLotQuantity[2].price_per_lot ? Number(this.subLotQuantity[2].price_per_lot).toLocaleString('en-IN') : "";
      },
      set(value) {
        const numericValue = Number(value.replace(/[^0-9.-]+/g, ''));
        this.subLotQuantity[2].price_per_lot = isNaN(numericValue) ? '' : numericValue;
      },
    },

    allow_start_time() {
        const currentDate = new Date();
        const currentMinutes = currentDate.getMinutes();
        const minutesToAdd = 30 - (currentMinutes % 15 || 15);
        const roundedDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        const year = roundedDate.getFullYear();
        const month = String(roundedDate.getMonth() + 1).padStart(2, '0');
        const day = String(roundedDate.getDate()).padStart(2, '0');
        const hours = String(roundedDate.getHours()).padStart(2, '0');
        const minutes = String(roundedDate.getMinutes()).padStart(2, '0');
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}`;
        const st_time = `${formattedDate} ${formattedTime}`;
        let bid_start_date = this.dateForCalander(st_time, 'date')
        let bid_start_time = this.dateForCalander(st_time, 'time')
        if(!this.bid_start_date)
        this.time1 = bid_start_time
        if (this.bid_start_date && (bid_start_date > this.bid_start_date)) {
          return this.time1;
        } else if (this.bid_start_date && (bid_start_date == this.bid_start_date)){
          return this.time1 = bid_start_time;
        } else {
          return "00:00"
        }
    },
    minium_end_date() {
      let date1 = new Date(this.bid_start_date)
      let date2 = new Date(this.bid_end_date)
      if (date1 > date2) {
        this.bid_end_date = this.bid_start_date
        return this.bid_start_date
      } else if (date1 < date2) {
        return this.bid_start_date
      } else if (date1 === date2) {
        return this.bid_start_date
      }
      else {
        return new Date().toISOString().substr(0, 10)
      }
    },
    isRequiredFieldsFilled() {
      const firstSubLot = this.subLotQuantity[0]; // Get the first subLot

// Check if the fields in the first row are filled 

    return (
      this.lot_name &&
      this.lot_desc &&
      firstSubLot.from_lot && firstSubLot.to_lot && firstSubLot.price_per_lot &&
      this.bid_start_date &&
      this.time1 &&
      this.bid_end_date &&
      this.time2 &&
      this.deliveryTimeline &&
      this.maxLotPrBuyer &&
      ((!this.subLotQuantity[1].from_lot) || (this.subLotQuantity[1].from_lot && this.subLotQuantity[1].to_lot && this.subLotQuantity[1].price_per_lot)) &&
      ((!this.subLotQuantity[2].from_lot) || (this.subLotQuantity[2].from_lot && this.subLotQuantity[2].to_lot && this.subLotQuantity[2].price_per_lot))
    );
  },
  MaxLotsPerBuyerRules() {
          let rules = [
            v => v <= this.possible_of_sublot  || 'Maximum lots per buyer less than or equal to possible of sub lots'

        ];
        return rules;     
    },
    MaxLotsTlot() {
          let rules = [
            v => v <= this.possible_of_sublot  || 'Maximum lots per buyer less than or equal to possible of sub lots',
            v => v <= this.maxToLot || 'Maximum lots per buyer less than or equal to Sub-Lot Quantity'

        ];
        return rules;     
    },
    formattedStartDate() {
      if (this.bid_start_date) {
        const date = new Date(this.bid_start_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      return '';
    },
    formattedEndDate(){
      if (this.bid_end_date) {
        const date = new Date(this.bid_end_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      return '';
    },
    },
    methods: {
        showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
        this.scrollToTop();
    },
    formatNumber(value){
        return typeof value === 'string' ? Number(value.replace(/,/g, '')) : value
      },
      formatCurrency(value) {
        let number = typeof value === 'string' ? value.replace(/,/g, '') : value
        return Number(number) ?  Number(number).toLocaleString('en-IN') : null;
      },
    alertTimeOut() {
        setTimeout(() => {
            this.alert = false;
        }, 3000);
    },
    submitLot(){
      console.log(this.subLotQuantity);
    },
    dateForCalander(date_str, type){
        //input    =  5/02/2021 08:32 AM
        // date op = '2021-02-05'
        // time op = 08:32
        if(date_str == null || date_str == '' || date_str == undefined){
          date_str = this.todaysDate();
        }
        var output = '';
        if('date' == type){
          var arr = date_str.substr(0,10).split('/');
          output  = arr[2]+'-'+arr[1]+'-'+arr[0]
        }else{
          output  = date_str.substr(11,8).split(' ')[0]
        }
        return output
      },
      //  todaysDate() {
      //      var today = new Date();
      //      var dd = String(today.getDate()).padStart(2, '0');
      //      var mm = String(today.getMonth() + 1).padStart(2, '0');
      //      var yyyy = today.getFullYear()
      //      return dd + '/' + mm + '/' + yyyy + ' ' + today.toLocaleTimeString();
      //  }, 
      loadApproverbuyers(){
        this.$http.secured.get("api/v2/warehouse/liquidation/competitive_bidding_price/buyers")
        .then(response => {
            this.select_list_items = response.data.buyer_masters
            this.loading = false;
        })
        .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
        });
      },
      createMOQLot(){
        this.number++;
        let subLotsQuantity = this.$store.state.subLotQuantity
        let possible_of_sublot = this.$store.state.subLotsPossible
        const validSubLots = this.subLotQuantity.filter(subLot => 
                    subLot.from_lot !== '' && subLot.to_lot !== '' && subLot.price_per_lot !== ''
                  );
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
        if (this.$refs.moqForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0;
          }else{
          const formData = new FormData();
          formData.append("lot_name", this.lot_name)
          formData.append("lot_desc", this.lot_desc)
          formData.append("start_date", (this.bid_start_date + " " + this.time1))
          formData.append("end_date", (this.bid_end_date + " " + this.time2))
          formData.append("delivery_timeline", this.deliveryTimeline)
          formData.append("maximum_lots_per_buyer", this.maxLotPrBuyer)
          formData.append('possible_sub_lots', possible_of_sublot)
          // formData.append('lot_range', this.subLotQuantity)
          for(var i=0; i < this.selected_approval.length; i++){
            formData.append("approved_buyer_ids[]", this.selected_approval[i].username)
          }
          for(var i=0; i < this.subLotQuantity.length; i++){
            formData.append("lot_range[]", this.subLotQuantity[i])
          }                    
          
          for (var i = 0; i < subLotsQuantity.length; i++) {
            formData.append("sub_lot_quantity[]", subLotsQuantity[i]);
          }
          const approvedBuyerUsernames = this.selected_approval.map(approval => approval.username);
          this.isLoading = true
          this.$http.secured
          .post("/api/v2/warehouse/liquidation/moq/create_lot", {
            "lot_name":this.lot_name,
            "lot_desc":this.lot_desc,
            "start_date":(this.bid_start_date + " " + this.time1),
            "end_date" : (this.bid_end_date + " " + this.time2),
            "delivery_timeline": this.deliveryTimeline,
            "maximum_lots_per_buyer": this.maxLotPrBuyer,
            'possible_sub_lots': possible_of_sublot,
            "sub_lot_quantity": subLotsQuantity,
            "lot_range": validSubLots,
            "approved_buyer_ids":approvedBuyerUsernames
          }   )
          .then(response => {
            if (response.data) {             
              this.$router.push({ name: "liquidationNew"});
              this.files         = [];
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
              this.$store.commit('setMessage', 
              { 
                responseMessage: response.data.message,
                action: 'create_moq'
              });
              this.isLoading = false
              this.lotImagesFileFormat = ''
              this.lotImages = ''
              this.lotImageNames = ''
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
              this.number = 0;
              this.isLoading = false
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.isLoading = false;
          }); 
        }}else{
          this.number = 0
        }
        },
        dateformat(dateString){
        let dateTimeParts = dateString.split(' ');
        let timeParts     = dateTimeParts[1].split(':');
        let dateParts     = dateTimeParts[0].split('-');
        let date = new Date(dateParts[0],parseInt(dateParts[1], 10) - 1,dateParts[2],timeParts[0], timeParts[1])
        return date;
      },
      calculateTotalSum() {
          const subLotQuantity = this.subLotQuantity;
          this.sumSubLotPrice = subLotQuantity.reduce((total, subLot) => total + Number(subLot.price_per_lot || 0), 0);
          // const totalSumSpan = document.getElementById('totalSumSpan');
          // if (totalSumSpan) {
          //   totalSumSpan.textContent = `MRP Total (Per Lot): ₹${sum.toFixed(2)}`;
          // }
        },
        editLotDataUpdate(){  
        this.$http.secured
        .get(`api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.lotIdMoq}`)
        .then(response => {
          if (response.data) {
            this.lot_details = response.data.liquidation_order
            this.isLoading = false;
            this.loading = false;
            this.setEditLotParams()
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
      setEditLotParams(){
        this.lot_name              = this.lot_details.lot_name
        this.lot_desc              = this.lot_details.lot_desc       
        this.bid_start_date        = this.dateForCalander(this.lot_details.start_date,'date')
        this.bid_end_date          = this.dateForCalander(this.lot_details.end_date, 'date')
        this.time1                 = this.dateForCalander(this.lot_details.start_date,'time')
        this.time2                 = this.dateForCalander(this.lot_details.end_date,'time')
        this.deliveryTimeline      = this.lot_details.delivery_timeline
        this.selected_approval     = this.lot_details.approved_buyer_ids
        this.maxLotPrBuyer         = this.lot_details.maximum_lots_per_buyer
        // this.subLotQuantity        = this.lot_details.price_range
        this.mrpPerLotAmount       = this.lot_details.mrp
        this.sub_lot_quantity      = this.lot_details.sub_lot_quantity
        this.possible_of_sublot    = this.lot_details.possible_sub_lots
            if (this.lot_details.sub_lot_quantity && this.lot_details.sub_lot_quantity.length > 0) {
                this.sub_lot_quantity = this.lot_details.sub_lot_quantity[0];
            } else {
                this.sub_lot_quantity = null;
            }
            if (this.lot_details.price_range && this.lot_details.price_range.length > 0) {
                const maxPriceRange = Math.min(this.lot_details.price_range.length, 3);
                
                this.subLotQuantity = this.lot_details.price_range.slice(0, maxPriceRange).map(priceRange => ({
                    from_lot: String(priceRange.from_lot),
                    to_lot: String(priceRange.to_lot),
                    price_per_lot: String(priceRange.price_per_lot)
                }));
                this.maxToLot = 0;
                this.subLotQuantity.forEach(item => { this.maxToLot = Math.max(this.maxToLot, Number(item.to_lot))})
            } else {
                this.subLotQuantity = [];
            }
            while (this.subLotQuantity.length < 3) {
                this.subLotQuantity.push({ from_lot: '', to_lot: '', price_per_lot: '' });
            }
      },
      editAndSave(){
        this.number++;
        let subLotsQuantity = this.$store.state.subLotQuantity
        let possible_of_sublot = this.$store.state.subLotsPossible
        const validSubLots = this.subLotQuantity.filter(subLot => 
                    subLot.from_lot !== '' && subLot.to_lot !== '' && subLot.price_per_lot !== ''
                  );
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
        if (this.$refs.moqForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0;
          }else{
            const selectedApproval = this.selected_approval;
            let approvedBuyerUsernames = [];
            if (Array.isArray(selectedApproval)) {
              approvedBuyerUsernames = selectedApproval.map(item => (typeof item === 'object' ? item.username : item));
            } else if (typeof selectedApproval === 'object' && selectedApproval !== null) {
              approvedBuyerUsernames = Object.values(selectedApproval).map(item => (typeof item === 'object' ? item.username : item));
            } else {
              approvedBuyerUsernames = [];
            }
          let lotIds = JSON.parse(this.$store.state.lotIds)
          this.isLoading = true;
          this.$http.secured
          .put(`/api/v2/warehouse/liquidation_order/b2b/pending_publish/${lotIds}`, {
            "lot_name":this.lot_name,
            "lot_desc":this.lot_desc,
            "start_date":(this.bid_start_date + " " + this.time1),
            "end_date" : (this.bid_end_date + " " + this.time2),
            "delivery_timeline": this.deliveryTimeline,
            "maximum_lots_per_buyer": this.maxLotPrBuyer,
            'possible_sub_lots': this.possible_of_sublot,
            "sub_lot_quantity": [this.sub_lot_quantity],
            "lot_range": validSubLots,
            "approved_buyer_ids":approvedBuyerUsernames
          }   )
          .then(response => {
            if (response.data) {             
              this.$router.push({ name: "liquidationNew"});
              this.files         = [];
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
              this.$store.commit('setMessage', 
              { 
                responseMessage: response.data.message,
                action: 'edit_lot'
              });
              this.isLoading = false
              this.lotImagesFileFormat = ''
              this.lotImages = ''
              this.lotImageNames = ''
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
              this.number = 0;
              this.isLoading = false
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.isLoading = false
          }); 
        }}else{
          this.number = 0
        }
        },
      mrpPerLot(){ 
        let subLotsQuantity = this.$store.state.subLotQuantity
        this.$http.secured
        .post('api/v2/warehouse/liquidation/moq/mrp_per_lot',{
          "sub_lot_quantity": subLotsQuantity
        })
        .then(response => {
          if (response.data) {
            this.mrpPerLotAmount = response.data.mrp_per_lot
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
      rePublishLot(){
        this.number++;
        let subLotsQuantity = this.$store.state.subLotQuantity
        let possible_of_sublot = this.$store.state.subLotsPossible
        const validSubLots = this.subLotQuantity.filter(subLot => 
                    subLot.from_lot !== '' && subLot.to_lot !== '' && subLot.price_per_lot !== ''
                  );
        var  start_dtime = this.dateformat(this.bid_start_date + " " + this.time1)
        var  end_dtime   = this.dateformat(this.bid_end_date + " " + this.time2)
        if (this.$refs.moqForm.validate()){
          if(end_dtime <= start_dtime){
            this.showAlert("error", "Invalid Date / Time ..!!");
            this.number = 0;
          }else{
          const formData = new FormData();
          // formData.append("lot_name", this.lot_name)
          // formData.append("lot_desc", this.lot_desc)
          // formData.append("start_date", (this.bid_start_date + " " + this.time1))
          // formData.append("end_date", (this.bid_end_date + " " + this.time2))
          // formData.append("delivery_timeline", this.deliveryTimeline)
          // formData.append("maximum_lots_per_buyer", this.maxLotPrBuyer)
          // formData.append('possible_sub_lots', possible_of_sublot)
          // formData.append('lot_range', this.subLotQuantity)
          // for(var i=0; i < this.selected_approval.length; i++){
          //   formData.append("approved_buyer_ids[]", this.selected_approval[i].username)
          // }
          // for(var i=0; i < this.subLotQuantity.length; i++){
          //   formData.append("lot_range[]", this.subLotQuantity[i])
          // }                    
          
          // for (var i = 0; i < subLotsQuantity.length; i++) {
          //   formData.append("sub_lot_quantity[]", subLotsQuantity[i]);
          // }
            const selectedApproval = this.selected_approval;
            let approvedBuyerUsernames = [];
            if (Array.isArray(selectedApproval)) {
              approvedBuyerUsernames = selectedApproval.map(item => (typeof item === 'object' ? item.username : item));
            } else if (typeof selectedApproval === 'object' && selectedApproval !== null) {
              approvedBuyerUsernames = Object.values(selectedApproval).map(item => (typeof item === 'object' ? item.username : item));
            } else {
              approvedBuyerUsernames = [];
            }
          let lotIds = JSON.parse(this.$store.state.lotIds)
          this.isLoading = true;
          this.$http.secured
          .post('/api/v2/warehouse/liquidation_order/pending/decision/republish', {
            "lot_name":this.lot_name,
            "lot_desc":this.lot_desc,
            "start_date":(this.bid_start_date + " " + this.time1),
            "end_date" : (this.bid_end_date + " " + this.time2),
            "delivery_timeline": this.deliveryTimeline,
            "maximum_lots_per_buyer": this.maxLotPrBuyer,
            'possible_sub_lots': possible_of_sublot,
            "sub_lot_quantity": this.sub_lot_quantity,
            "lot_range": validSubLots,
            "approved_buyer_ids":approvedBuyerUsernames,
            "id":lotIds
          }   )
          .then(response => {
            if (response.data) {             
              this.$router.push({ name: "liquidationNew"});
              this.files         = [];
              this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
              this.$store.commit('setMessage', 
              { 
                responseMessage: response.data.message,
                action : 're_publish'
              });
              this.isLoading = false;
              this.lotImagesFileFormat = ''
              this.lotImages = ''
              this.lotImageNames = ''
            } else {
              this.showAlert("error", "Something went Wrong !!");
              this.createBeamLotDialog = false;
              this.number = 0;
              this.isLoading = false
            }                         
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.isLoading = false
          }); 
        }}else{
          this.number = 0
        }
        },
        calculateMaxLotBuyer() {
          this.maxFromLot = Math.max(
            this.subLotQuantity[0].from_lot,
            this.subLotQuantity[1].from_lot,
            this.subLotQuantity[2].from_lot
          );

          this.maxToLot = Math.max(
            this.subLotQuantity[0].to_lot,
            this.subLotQuantity[1].to_lot,
            this.subLotQuantity[2].to_lot
          );
          this.validateBuyNowPrice();
        },
        validateBuyNowPrice() {
            const refs = [this.$refs.toLot, this.$refs.fromLot1, this.$refs.toLot1, this.$refs.toLot2, this.$refs.fromLot2]; // Add your refs here
            refs.forEach(ref => ref && ref.validate());
          },
          scrollToTop() {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          },
    }
}
</script>
<style>
 .leftHeaderName{
  font-weight: bold;
  padding-top: 20px;
 }
</style>
