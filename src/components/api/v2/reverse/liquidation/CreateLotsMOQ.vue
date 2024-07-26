<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <!-- Header component -->
    <div> <HeaderComponent :headerTitle="headerText" :lotIdB2b="lotIdB2b" :action="action"/></div>
    <!-- create form MOQ -->
    <loading 
      :active.sync="isLoading" 
      :can-cancel="true" 
      :is-full-page="fullPage" 
      :color="primary_code"
      >
    </loading>
    
    <template >
        <v-form ref="createForm">
            <v-card class="v-card-100 mt-4">
                <v-row class="sub-lots-count">
                    <v-col cols="1" sm="12" md="12">
                        <span>Number Of Possible Sub-Lots - {{ totalPossibleSubLots }}</span>
                    </v-col>
                </v-row>
                <v-card-text style="height: 80vh;overflow-y: scroll;">
                    <div>
                        <v-row style="margin-bottom: -25px;" v-for="(sub_lot_grid, index) in sub_lot_quantity" :key="sub_lot_grid.id">
                           <v-col cols="1" sm="2" md="2">
                            <v-combobox 
                               v-model="sub_lot_grid.article_id"   
                               :items="article_items" 
                               item-text="id" 
                               item-value="value" 
                               label="Article ID"
                               @change="getGradeAnaQuantity(sub_lot_grid.article_id, index, 'article',sub_lot_grid)"
                               :readonly="action === 'view_moq_items' || action === 'vie_moq_PD'"
                               outlined>
                               <template v-slot:item="{ item }">
                                  {{ item }}
                                </template>
                                <template v-slot:no-data>
                                  Data not available
                                </template>
                            </v-combobox>
                           </v-col>
                           <v-col cols="2" sm="3" md="3">
                            <v-combobox 
                               v-model="sub_lot_grid.article_description" 
                               :items="article_desc_items" 
                               item-text="id" 
                               item-value="value" 
                               label="Article Description"
                               outlined
                               :readonly="action === 'view_moq_items' || action === 'vie_moq_PD'"
                               @change="getGradeAnaQuantity(sub_lot_grid.article_description, index, 'article_description',sub_lot_grid)"
                               >
                               <template v-slot:item="{ item }">
                                  {{ item }}
                                </template>
                                <template v-slot:no-data>
                                  Data not available
                                </template>
                            </v-combobox>
                           </v-col>
                           <v-col cols="3" sm="2" md="2">
                            <v-combobox 
                               v-model="sub_lot_grid.grade" 
                               :items="sub_lot_grid.grade_items" 
                               item-text="grade" 
                               item-value="grade" 
                               label="Grade" 
                               :disabled="isGradeFieldDisabled(index)"
                               :readonly="action === 'view_moq_items' || action === 'vie_moq_PD'"
                               @change="setQuantityByGrade($event,sub_lot_grid)"
                               outlined>
                            </v-combobox>
                           </v-col>
                           <v-col cols="4" sm="2" md="2">
                               <v-text-field disabled v-model="sub_lot_grid.quantity" label="Quantity" outlined type="text" :readonly="action === 'view_moq_items' || action === 'vie_moq_PD'"></v-text-field>
                           </v-col>
                           <v-col cols="5" sm="2" md="2">
                               <v-text-field v-model="sub_lot_grid.lot_quantity" label="Lot Quantity" outlined type="text" :readonly="action === 'view_moq_items' || action === 'vie_moq_PD'" :error-messages="lotQuantityErrors[index]" @input="validateLotQuantity(sub_lot_grid.lot_quantity, sub_lot_grid.quantity, index)"></v-text-field>
                           </v-col>
                           <v-col cols="1" sm="1" md="1">
                               <span class="delete-button" v-if="sub_lot_quantity.length > 1"><img  src="@/assets/images/delete_red.png" title="Delete item" @click="deleteRow(index)" :class="{ 'disabled-link': action === 'view_moq_items' || action === 'vie_moq_PD' }"/></span>
                           </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1" sm="12" md="12">
                                <a style="color: #1976d2;" @click="handleAddAnotherType('addMoreItems')" :class="{ 'disabled-link': action === 'view_moq_items' || action === 'vie_moq_PD' }" :disabled="isAddMoreButtonDisabled">
                                  <u>Add More +</u>
                                </a>
                            </v-col>
                       </v-row>
                    </div>
                </v-card-text>
                <v-actions class="procedFooter">
                    <span>No of items - {{ sub_lot_quantity.filter( item => item.article_id).length }}</span>
                    <v-btn color="primary" v-if="action == 'create_moq'" @click="proccedToNextPage" :disabled="!allFieldsFilled || disabledMode">Proceed</v-btn>
                    <v-btn color="primary" v-if="action == 'edit_moq'" @click="saveAndClose" :disabled="!allFieldsFilled || disabledMode">SAVE & CLOSE</v-btn>
                </v-actions>
            </v-card>
        </v-form>
    </template>
    </v-card>
</template>
<script>
import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
import PriceGridMoq   from '../liquidation/PriceGridMoq.vue'
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    data(){
       return {
        headerText: "Liquidation",
        binaryData:'',
        alert_type:'',
        alert_message:'',
        alert:false,
        article_items:[],
        article_desc_items:[],
        grade_items:[],
        possible_of_sub_lots:'',
        sub_lot_quantity:[
        {
            article_id: '',
            article_description: '',
            grade: '',
            quantity:'',
            lot_quantity:'' ,
            grade_items:[],          

        },
        ],
        action:'',
        moq_index : '',
        lotIdMoq:'',
        lot_details:[],
        lotIdB2b:'',
        quantityValue:'',
        isLoading:false,
        primary_code: "#0275d8",
        fullPage : true,
        lotQuantityErrors: [],
        disabledMode: false,
        inputRules: [
        v => !!v || 'The field is required',
        (v) => /^\d+$/.test(v) || 'Enter a valid number',
        v => {
        const index = this.sub_lot_quantity.findIndex(item => item.id === v.id);
        return (Number(v) <= Number(this.sub_lot_quantity[index].quantity)) || 'Reserve Price Now should be equal or less than Buy Now Price';
      }
        ],
        data_map : null,
       }
    },
    components: {
      HeaderComponent, PriceGridMoq
    },
    async created(){
        this.action = this.$store.state.action;
        this.data_map = new Map();
        this.getArticleIdData();
        if(this.action === 'edit_moq'){
          this.lotIdMoq = this.$store.state.lotIds;
          this.lotIdB2b = this.lotIdMoq
          await this.editLotDataUpdate();          
        }else if(this.action === 'view_moq_items' || this.action === 'vie_moq_PD'){
          this.lotIdMoq = this.$store.state.lotIds;
          this.lotIdB2b = this.lotIdMoq
          this.isLoading = true 
          await this.editLotDataUpdate();          
        }
        else if(this.action === 'create_moq_return'){
          this.action = 'create_moq';
          this.possible_of_sub_lots = this.$store.state.subLotsPossible
          this.sub_lot_quantity = this.$store.state.subLotQuantity
        }
    },
    computed: {
        allFieldsFilled() {
          return this.sub_lot_quantity.every(item => 
            item.article_id && item.article_description && item.grade && item.quantity && item.lot_quantity
          );
        },
        totalPossibleSubLots() {
          let temp = Number.MAX_SAFE_INTEGER
          this.sub_lot_quantity.forEach( x => {
            if(!isNaN(x.quantity) && !isNaN(x.lot_quantity) && x.lot_quantity !==0 && x.lot_quantity && x.quantity)
            temp=Math.min(temp,Math.floor(Number(x.quantity) / Number(x.lot_quantity)));
          })
          return this.possible_of_sub_lots = (temp === Number.MAX_SAFE_INTEGER) ? 0 : temp;
        },
        rowSumQuantity() {
      return this.sub_lot_quantity.map((subLot) => Number(subLot.quantity || 0));
    },
    rowSumLotQuantity() {
      return this.sub_lot_quantity.map((subLot) => Number(subLot.lot_quantity || 0));
    },
    calculatedResults() {
              const ratios = this.rowSumLotQuantity.map((sumLotQuantity, index) => {
                this.quantityValue = this.rowSumQuantity[index]
            if (sumLotQuantity !== 0) {
              return this.rowSumQuantity[index] / sumLotQuantity;
            } else {
              return Infinity; // Assign a high value for division by zero
            }
          });

          const smallestRatio = Math.min(...ratios.filter(ratio => typeof ratio === 'number'));
          this.possible_of_sub_lots = smallestRatio
          return smallestRatio !== Infinity ? smallestRatio : 'N/A';
          },
          inputRulesSub() {
            let qauntityVal = 0
            this.sub_lot_quantity.map((subLot) => 
            qauntityVal = Number(subLot.quantity));
      const rules = [
        v => !!v || 'The field is required',
        v => /^\d+$/.test(v) || 'Enter a valid number',
        v => Number(v) <= Number(qauntityVal) || 'Lot Quantity should be less than or equal to Quantity',
      ];
      return rules;
    },
    isAddMoreButtonDisabled() {
    // Check if any sub_lot_grid in the array has empty or falsy values
    return this.sub_lot_quantity.some(sub_lot_grid => 
      !sub_lot_grid.article_id ||
      !sub_lot_grid.article_description ||
      !sub_lot_grid.grade ||
      !sub_lot_grid.quantity ||
      !sub_lot_grid.lot_quantity
    );
  }
      },
    methods: {
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
    handleAddAnotherType(msg){
      const lastItem = this.sub_lot_quantity[this.sub_lot_quantity.length - 1];
      if (!lastItem.article_id || !lastItem.article_description || !lastItem.grade || !lastItem.lot_quantity || !lastItem.quantity) {
        this.validation.article_id = !lastItem.article_id;
        this.validation.article_description = !lastItem.article_description;
        this.validation.grade = !lastItem.grade;
        this.validation.lot_quantity = !lastItem.lot_quantity;
        this.validation.quantity = !lastItem.quantity;
        return;
      }
      if(this.sub_lot_quantity[this.sub_lot_quantity.length-1].grade_items.length > 1){
        this.sub_lot_quantity.push({article_id: '', article_description: "",grade: '',lot_quantity:'',quantity:''});
        return;
      }
      const selectedIndex = this.article_items.findIndex(item => item === this.sub_lot_quantity[this.sub_lot_quantity.length - 1].article_id);
      if (selectedIndex !== -1) {
        this.article_items.splice(selectedIndex, 1);
      }
      const selectedIndexForDesc = this.article_desc_items.findIndex(item => item === this.sub_lot_quantity[this.sub_lot_quantity.length - 1].article_description);
      if (selectedIndexForDesc !== -1) {
        this.article_desc_items.splice(selectedIndexForDesc, 1);
      }
     this.sub_lot_quantity.push({article_id: '', article_description: "",grade: '',lot_quantity:'',quantity:''});
    },
    proccedToNextPage(){
          this.$store.commit("setSubLotQuantity", {
            action:'price_grid',
            subLotQuantity: this.sub_lot_quantity.map( x => {
              if(typeof x.grade == 'object'){
                x.grade = x.grade.grade;
              }
              return x;
             }),
            subLotsPossible: this.possible_of_sub_lots
          })
        this.$router.push({ name: 'PriceGridMoq' });
    },
    getArticleIdData(){  
        this.$http.secured
        .get('/api/v2/warehouse/liquidation/moq/article_id_list')
        .then(response => {
          if (response.data) {
            this.article_items = response.data.article_ids
            this.loading = false;
            this.getArticleDescriptionData();
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

      getArticleDescriptionData(){
        this.$http.secured
        .get('/api/v2/warehouse/liquidation/moq/article_description_list')
        .then(response => {
          if (response.data) {
            this.article_desc_items = response.data.article_descriptions
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
      checkItemByArticleId(value, index,sub_lot_grid){
        if(this.data_map.has(value)){
          const temp_data = this.data_map.get(value);
          sub_lot_grid.article_id = temp_data.article_id;
          sub_lot_grid.article_description = temp_data.article_description;
          sub_lot_grid.grade_items = temp_data.grade_with_quantity;
          this.sub_lot_quantity.forEach( item => {
            if(item.article_id == temp_data.article_id){
              if(typeof item.grade == 'object'){
                sub_lot_grid.grade_items = sub_lot_grid.grade_items.filter( x=> x.grade != item.grade.grade);
              } else {
                sub_lot_grid.grade_items = sub_lot_grid.grade_items.filter( x=> x.grade != item.grade);
              }
            }
          })
          if(sub_lot_grid.grade_items.length ==1){
            sub_lot_grid.quantity = sub_lot_grid.grade_items[0].quantity;
            sub_lot_grid.grade = sub_lot_grid.grade_items[0].grade;
          } else if(sub_lot_grid.grade_items.length ==0){
            this.$toast.error("Duplicated item not allowed");
            sub_lot_grid.article_id = null;
            sub_lot_grid.article_description = null;
            sub_lot_grid.grade = '';
            sub_lot_grid.quantity = '';
            sub_lot_grid.lot_quantity = '';
          }
          return true;
        } else {
          return false;
        }
      },
      getGradeAnaQuantity(value, index, condition,sub_lot_grid){
          sub_lot_grid.grade = '';
          sub_lot_grid.lot_quantity = '';
          sub_lot_grid.quantity = '';
        if(condition == 'article'){
          this.article_index = this.article_items.findIndex(x => x === value);
          if(this.article_index == -1){
            sub_lot_grid.article_id = null;
            return;
          }
          if(this.checkItemByArticleId(value,index,sub_lot_grid)){
            return;
          }
        } else {
          const article_desp_index = this.article_desc_items.findIndex(x => x === value);
          if(article_desp_index == -1){
            sub_lot_grid.article_description = null;
            return;
          }
        }
        this.$http.secured
          .post('/api/v2/warehouse/liquidation/moq/liquidation_quantity_based_on_grade', {
            "search_value":value
          })
          .then(response => {
                if(condition == 'article'){
                  this.sub_lot_quantity[index].article_description = response.data.article_description;
                }else{
                    this.sub_lot_quantity[index].article_id = response.data.article_id;
                    if(this.checkItemByArticleId(response.data.article_id,index,sub_lot_grid)){
                      return;
                    }
                }
              if (response.data) {
                sub_lot_grid.grade_items = response.data.grade_with_quantity;
                if(response.data.grade_with_quantity.length ==1){
                    this.sub_lot_quantity[index].quantity = response.data.grade_with_quantity[0].quantity;
                    this.sub_lot_quantity[index].grade = response.data.grade_with_quantity[0].grade;
                  }
                
                this.loading = false;
                this.data_map.set(this.sub_lot_quantity[index].article_id, response.data);
              } else {
                this.showAlert("error", "No Data Found");
                this.loading = false;
              }
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
          });
      },
      editLotDataUpdate(){ 
        this.isLoading = true 
        this.$http.secured
        .get(`api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.lotIdMoq}`)
        .then(response => {
          if (response.data) {
            this.sub_lot_quantity = response.data.liquidation_order.sub_lot_quantity
            this.loading = false;
            this.isLoading = false
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
            this.isLoading = false
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
          this.isLoading = false
        });
      },
      saveAndClose(){
        this.isLoading = true
        this.$http.secured
          .post(`/api/v2/warehouse/liquidation_order/b2b/pending_publish/${this.lotIdMoq}/remove_lot_items`, {
            "possible_sub_lots":this.possible_of_sub_lots,
            "sub_lot_quantity" : this.sub_lot_quantity
          })
          .then(response => {
              if (response.data) {
                this.$router.push({ name: "liquidationNew"});
                this.files         = [];
                this.$store.commit("setLotIds", {lotIds:  JSON.stringify([])});
                this.$store.commit('setMessage', 
              { 
                responseMessage: response.data.message,
                action: 'edit_moq'
              });
              this.isLoading = false
              } else {
                this.showAlert("error", "No Data Found");
                // this.loading = false;
                this.isLoading = false
              }
          })
          .catch(error => {
              this.showAlert("error", "Something went wrong from Network" + error);
              this.loading = false;
          });
      },
      isGradeFieldDisabled(index){
        for(var i=index+1;i<this.sub_lot_quantity.length;i++){
          if(this.sub_lot_quantity[i].article_id == this.sub_lot_quantity[index].article_id)
          return true;
        }
        return false;
      },
      // calculateTotalSum() {
      //     const subLotQuantity = this.sub_lot_quantity;
      //     const sumQuantity = subLotQuantity.reduce((total, subLot) => total + Number(subLot.quantity || 0), 0);
      //     const sumSubLotPrice = subLotQuantity.reduce((total, subLot) => total + Number(subLot.lot_quantity || 0), 0);
      //     const result = sumQuantity/sumSubLotPrice
      //   },
      validateLotQuantity(lotQuantity, quantity, index) {
        this.$set(this.lotQuantityErrors, index, []);
        if (!lotQuantity.trim()) {
          this.lotQuantityErrors[index].push('This field is required');
          this.disabledMode = true;
          return;
        }

        if (!/^\d+$/.test(lotQuantity)) {
          this.lotQuantityErrors[index].push('Enter a valid number');
          this.disabledMode = true;
          return;
        }

        if (parseInt(lotQuantity) > parseInt(quantity)) {
          this.lotQuantityErrors[index].push('Lot quantity should be less than or equal to quantity');
          this.disabledMode = true;
          return;
        }
        
        this.disabledMode = false;
      },
      deleteRow(index) {
        if(!this.sub_lot_quantity[index].article_id || !this.sub_lot_quantity[index].article_description){
          this.sub_lot_quantity.splice(index, 1);
          return;
        }
        const temp = this.data_map.get(this.sub_lot_quantity[index].article_id);
        if(this.article_items.findIndex(x => x === this.sub_lot_quantity[index].article_id) == -1){
           this.article_items.push(this.sub_lot_quantity[index].article_id);
           this.article_desc_items.push(this.sub_lot_quantity[index].article_description);
        }
        this.sub_lot_quantity.splice(index, 1);
    },
      setQuantityByGrade(value,row){
        const temp = this.data_map.get(row.article_id);
        temp.grade_with_quantity.forEach( x=> { 
          if(value.grade === x.grade) {
             row.quantity = x.quantity;
            }
          });
          row.lot_quantity = '';
      }
    }
}
</script>
<style>
 .sub-lots-count{
    margin: 0px 15px;
    background-color: #EFEFEF;
 }
 .procedFooter{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
 }
 .delete-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    bottom: 12%;
}

.delete-button img {
    width: 20px;
    height: 20px; /* Adjust this value as needed */
}
.disabled-link {
        pointer-events: none; /* Disable clicking */
        color: gray; /* Change the color to indicate it's disabled */
    }
</style>