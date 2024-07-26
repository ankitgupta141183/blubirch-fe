<template>
  <div>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-card style="background-color: white;">
            <div>
              <span style="float:left;margin-top:10px;margin-left:6px;">
                <img src="@/assets/logo.svg" height="48" width="48" alt="Blubirch Logo" />
              </span>
              <span>
                <HeaderComponent :headerTitle="headerText" />
              </span>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-container class="ma-0 pa-0" fluid grid-list-lg>
            <v-layout class="ma-0 pa-0" row>
              <v-flex class="ma-0 pa-0" >
                <div class="flex-row">
                  <v-card class="pa-0 mt-5">
                    <v-row class="ma-0 pa-0">
                      <v-col :cols="6" md="6" sm="6" >
                        <v-row class="ma-0 pa-0">
                          <v-col :cols="12">
                            <v-carousel  cycle v-model="model" height="320">
                              <v-carousel-item
                                v-for="(image, i) in images"
                                :key="image">
                                <v-sheet
                                  height="100%"
                                  tile>
                                  <v-row
                                    class="fill-height"
                                    align="center"
                                    justify="center">
                                    <div class="display-3">
                                      <img :src="image" height="300" width="500" />
                                    </div>
                                  </v-row>
                                </v-sheet>
                              </v-carousel-item>
                              <v-carousel-item v-if="!images || images.length === 0">
                                <v-sheet height="100%" tile>
                              <v-row class="fill-height"
                                align="center"
                                justify="center">
                                <div class="display-3">
                                  <img src="../../../../assets/images/default_product.jpg" height="300" width="500" />
                                </div>
                              </v-row>
                            </v-sheet>
                          </v-carousel-item>
                            </v-carousel>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col :cols="6" md="6" sm="6" >
                        <v-row class="ma-0 pa-0">
                          <v-col :cols= "12">
                            <h3 class="high-alert">{{this.lot_name}}<span class="medium-alert" style="color: #005EC6">( {{this.count}}) </span> </h3>
                          </v-col>
                          <v-col :cols="12">
                            <h3 class="high-alert">{{this.city}}</h3>
                          </v-col>
                          <v-col :cols="6" class="mb-0">
                            <span>Lot Amount(INR)</span>
                          </v-col>
                          <v-col :cols="6" class="mb-0">
                            <span>End Date</span>
                          </v-col>
                          <v-col :cols="6" class="mt-0">
                            <h3 class="high-alert mt-0" style="color: #005EC6;">{{this.lot_amount}}</h3>
                          </v-col>
                          <v-col :cols="6" class="mt-0">
                            <h3 class="medium-alert mt-0">{{this.end_date}}</h3>
                          </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                          <v-col :cols="12" md="12" sm="12" >
                            <span>Enter Bid Amount</span>
                          </v-col>
                          <v-col :cols="6" md="6" sm="6" >
                            <v-text-field
                            v-model = 'amount'
                            label="Amount"
                            outlined
                            type="number"
                            required
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="6" md="6" sm="6" >
                            <a
                              style="display: none"
                              id="manifesto"
                              small
                              tile
                              color="#F3F3F3"
                              href=""
                              target="_blank"
                              download
                            >
                            </a>
                            <v-btn color="primary" @click="createQuotation()" :disabled="disable">Submit</v-btn>
                          </v-col>

                          <v-col :cols="6" md="6" sm="6" >
                            <v-btn color="primary" @click="downloadManifesto()" :disabled="disable">Download Manifest</v-btn>
                          </v-col>

                        </v-row>
                      </v-col>
                    </v-row>
                </v-card>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<style>
.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)
  > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none;
  visibility: hidden;
}
.text-color {
  color: #0357d0;
}
.header-background {
  background-color: #0357d0;
}
.box_shadow_class {
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 4px;
}
</style> 

<script>
import $ from 'jquery'
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      headerText: "Provide Your Quotation",
      token: '',
      lot_name: '',
      lot_id: '',
      count: '',
      city: '',
      lot_amount: '',
      end_date: '',
      validationRules: [],
      amount: '',
      disable: false,
      images: []
    };
  },

  async created() {
    this.token = this.$route.query.token
    this.get_lot_info(this.token);
  },

  components: {
    HeaderComponent,
  },
  methods: {
    get_lot_info(token) {
      securedAxiosInstance.post('/api/v1/quotations/lot_information',{token: token})
        .then(response => {
          if (response.data.status === 200){
                          this.lot_id = response.data.lot_id
                          this.lot_name = response.data.lot_name
                          this.count = response.data.count
                          this.city = response.data.city
                          this.lot_amount = response.data.lot_amount
                          this.end_date = response.data.end_date
                          this.images = response.data.images
          }
          else{
            this.$toast.error("Your Link has been Expired!!")
            this.disable = true
          }

          })
        .catch(error => this.$toast.error('Error in retrieving Lot Info'))
    },

   createQuotation(){
      if (this.amount == ''){
        this.$toast.error('Please Give Amount')        
        return;
      }

      else{
        this.disable = true
        securedAxiosInstance.post('/api/v1/quotations/create_quotation', {amount: this.amount, token: this.token})
          .then(response => {
                             this.$toast.success('Quotation created successfully')
                              if (response.data) {
                                this.disable = false
                                this.amount = ''
                              } 
                              else {
                                this.amount = ''
                                this.disable = false
                                this.showAlert("error", "No Data Found");
                              }
                            })
          .catch(error => {this.$toast.error('Error in create quotation')
                           this.disable = false
                           this.amount = '';
                          })

      }


    },

    downloadManifesto() {
      this.$toast.success("Manifest Will be autodownloaded please wait")
      this.$http.secured
        .post("/api/v1/quotations/download_manifesto", { id: this.lot_id })
        .then((response) => {
          this.file_url = response.data.url;
          document.getElementById("manifesto").href = response.data.url;
          document.getElementById("manifesto").click();
        })
        .catch((error) =>
          this.$toast.error("Error in fetching data")
        );
    },

  },


};
</script>