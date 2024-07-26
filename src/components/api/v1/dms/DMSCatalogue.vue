<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert dense dismissible border="bottom" :value="alert" text type="success" >{{alert_message}}</v-alert>
    </div>
    <div class="main_header" style="margin-left:16px;margin-top:16px">Promotions</div>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn 
          class="ma-2"
          color="primary"
          @click="newPromotion()"
        >ADD PROMOTION</v-btn>
      </v-card-actions>
    </v-card-title>
    
    
    <!-- Promotions Data Table -->
     <v-data-table
      :dense="false"
      :headers="headers"
      :items="promotion_data"
      :search="search"
      :item-key="id"
      class="elevation-1"
    >
    <template v-slot:item.banner ="{ item }"> 
      <img src= "@/assets/images/banner.svg" @click="bannerDialog=true" width="30">
    </template>
    
    <template v-slot:item.more_info ="{ item }">
      <img src= "@/assets/images/job_sheet.png" width="30" height="22" @click="editPromotion(item)"/>
      <img src= "@/assets/images/Delete_Icon.png" @click="deletePromotion(item)" width="30">
    </template>
    </v-data-table>

    <!-- New Promotions Banner -->
    <v-row justify="center">
      <v-dialog v-model="newPromotionDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Promotion Details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select v-model="promotions.promotion_type"
                    :items="['End Customer', 'Dealer']"
                    label="Promotion Type"
                    required
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field outlined v-model="promotions.promotion_name" dense label="Promotion Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="promotions.category"
                    :items="['Electronics', 'Fashion', 'Hardware', 'IT', 'Others']"
                    label="Category"
                    multiple
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field outlined v-model="promotions.sku" dense label="SKU"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="promotions.discount_type"
                    :items="['Fixed Value', 'Percentage']"
                    label="Discount Type"
                    required
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field outlined dense v-model="promotions.discount" label="Discount"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-menu ref="menu" v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="promotions.valid_from"
                        label="Valid From"
                        prepend-icon="event"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="promotions.valid_from" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-menu ref="menu1" v-model="menu1"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="promotions.valid_to"
                        label="Valid To"
                        prepend-icon="event"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="promotions.valid_to" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu1.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field outlined dense v-model="promotions.state" label="State"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6"> </v-col>
                    <v-file-input accept="image/*" label="File input"></v-file-input>

              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="newPromotionDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="savePromotion" v-if="new_promotion == true">Save</v-btn>
            <v-btn color="blue darken-1" text @click="updatePromotions()" v-if="new_promotion == false">Update</v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Promotions Banner -->
    <v-row justify="center">
      <v-dialog v-model="bannerDialog" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">Banner</v-card-title>
            <v-card-text>
              <img src= "@/assets/images/dms_banner.svg" width="500" max-height="400" />
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="bannerDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </v-card>
</template>

<style >
.theme--light.v-icon {
  color: #1867c0;
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
</style>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
      promotion_data: [],
      search:'',
      dialog: false,
      alert_message: '',
      alert: false,
      bannerDialog: false,
      newPromotionDialog: false,
      new_promotion:false,
      menu: false,
      menu1: false,
      
        promotions: {
          'promotion_type': '',
          'promotion_name': '',
          'category': '',
          'sku': '',
          'discount_type': '',
          'discount': '',
          'valid_from': '',
          'valid_to': '',
          'state': ''
        },
      
      headers: [
        
          { text: "Promotional Name", value: "promotion_name" },
            { text: "category", value: "category" },
            { text: "Discount", value: "discount" },
            { text: "Valid From", value: "valid_from" },
            { text: "Valid To", value: "valid_to"},
            { text: "State", value: "state" },
            { text: "Banner", value: "banner" },
            { text: "More Info", value: "more_info" },
      ],
      editedIndex: -1,
      editedItem: {
        sku: '',
        item_name: '',
        category: '',
        mrp: 0,
        state: '',
        base_dealer_price: 0,
        current_dealer_price: '',
      },
      defaultItem: {
        sku: '',
        item_name: '',
        category: '',
        mrp: 0,
        state: '',
        base_dealer_price: '',
        current_dealer_price: '',
      },
    };
  },
  created() {
    this.getPromotions();
  },
  components: {
    editor: Editor
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    
    getPromotions(){
      this.$http.plain.get("https://5f0d499111b7f600160567fd.mockapi.io/dms/promotions")
        .then(response => {
          this.promotion_data = response.data.slice().reverse();
        })
        .catch(error => this.$toast.error('Error in fetching promotions'))
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem (item) {
        this.catalogue = item
        this.dialog = true
      },
    
    savePromotion(){
              this.$http.plain.post("https://5f0d499111b7f600160567fd.mockapi.io/dms/promotions" , {  promotion_type: this.promotions.promotion_type , promotion_name: this.promotions.promotion_name,
        category: this.promotions.category, sku: this.promotions.sku, discount_type: this.promotions.discount_type, discount: this.promotions.discount,
        valid_from: this.promotions.valid_from, valid_to: this.promotions.valid_to, state: this.promotions.state})
        .then(response => {
          this.newPromotionDialog = false
        this.$toast.success('Promotions Created Successfully');

        })
         .catch(error => this.$toast.error('Error in fetching Customers'))

    },
    deletePromotion(promotion) {
      this.$http.plain.delete(`https://5f0d499111b7f600160567fd.mockapi.io/dms/promotions/${Number(promotion.id)}`)
        .then(response => { 
          this.promotion_data.splice(this.promotion_data.indexOf(promotion), 1);
          this.alert_message = "Promotion has been successfully deleted"
          this.alert = true
        })
        .catch(error => {
          this.alert_message = "Error in removing promotion"
          this.alert = true
        })
    },
    updatePromotions(){
      this.$http.plain.put('https://5f0d499111b7f600160567fd.mockapi.io/dms/promotions/'+this.promotions.id , {  promotion_type: this.promotions.promotion_type , promotion_name: this.promotions.promotion_name,
        category: this.promotions.category, sku: this.promotions.sku, discount_type: this.promotions.discount_type, discount: this.promotions.discount,
        valid_from: this.promotions.valid_from, valid_to: this.promotions.valid_to, state: this.promotions.state})
        .then(response => {
          this.newPromotionDialog = false
        this.$toast.success('Promotions Created Successfully');

        })
         .catch(error => this.$toast.error('Error in fetching Promotions'))

    },
    newPromotion(){
      this.newPromotionDialog = true
      this.new_promotion = true
      this.promotions = {}
    },
    editPromotion(item){
      this.newPromotionDialog = true
      this.new_promotion = false
      this.promotions = item
    }
  }
};
</script>
