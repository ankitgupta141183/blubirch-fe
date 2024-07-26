<template>
  <div>
    <v-card>
      <!-- Details Modal -->
      <v-row justify="center">
        <v-dialog v-model="viewImageDialog" max-width="900px">
          <v-card class="v-card-100" v-if="claim_type == 'Return'">
            <v-card-text>
              <v-container class="v-card-100">
                <v-container class="grey lighten-5">
                  <v-row no-gutters>
                    <v-col :cols="12">
                      <v-card
                        class="v-card-100 pa-5 font-weight-black"
                        outlined
                        tile
                        >Sennheiser RS 120| Electronics and Appliances | Earphone or Headphone</v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>Questions</v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card
                        class="v-card-100 text-md-center pa-5 font-weight-black"
                        outlined
                        tile
                        >Grade:Very Good</v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 py-14 font-weight-black" outlined tile>
                        <ul>
                          <li>Packaging Status</li>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card class="v-card-100 text-md-center pa-4 font-weight-black" outlined tile>
                        <div>Open Box</div>
                        <img
                          justify="center"
                          src="@/assets/images/camera-img.jpg"
                          width="128px"
                          height="83px"
                          />
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                        <ul>
                          <li>Item Condition</li>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card
                        class="v-card-100 text-md-center pa-5 font-weight-black"
                        outlined
                        tile
                        >Grade:Very Good</v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 py-11 font-weight-black" outlined tile>
                        <ul>
                          <li class="py-2">Physical Status</li>
                          <v-row no-gutters>
                            <v-col :cols="2">
                              <img src="@/assets/images/icons/thunmb-1.png" width="24" height="24" />
                              <div>Front</div>
                            </v-col>
                            <v-col :cols="2">
                              <img src="@/assets/images/icons/thunmb-2.png" width="24" height="24" />
                              <div>Back</div>
                            </v-col>
                            <v-col :cols="2">
                              <img src="@/assets/images/icons/thunmb-3.png" width="24" height="24" />
                              <div>Left</div>
                            </v-col>
                            <v-col :cols="2">
                              <img src="@/assets/images/icons/thunmb-4.png" width="24" height="24" />
                              <div>Right</div>
                            </v-col>
                            <v-col :cols="2">
                              <img src="@/assets/images/icons/thunmb-5.png" width="24" height="24" />
                              <div>Top</div>
                            </v-col>
                            <v-col :cols="2">
                              <img src="@/assets/images/icons/thunmb-5.png" width="24" height="24" />
                              <div>Bottom</div>
                            </v-col>
                          </v-row>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card class="v-card-100 text-md-center pa-8 font-weight-black" outlined tile>
                        <div>Minor (Dent/Scratch/Damage)</div>
                        <v-icon color="primary" :hint="item">mdi-chevron-left</v-icon>
                        <img src="@/assets/images/camera-img.jpg" width="128" height="83" />
                        <v-icon color="primary" :hint="item">mdi-chevron-right</v-icon>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters v-for="(item, i) in questions" :key="i">
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                        <ul>
                          <li>{{item.text}}</li>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card
                        class="v-card-100 text-md-center pa-5 font-weight-black"
                        outlined
                        tile
                        >{{item.value}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                        <ul>
                          <li>Functional Test: Powering On ?</li>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card
                        class="v-card-100 text-md-center pa-5 font-weight-black"
                        outlined
                        tile
                        >Yes</v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                        <ul>
                          <li>Functional Test: Display Working ?</li>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card
                        class="v-card-100 text-md-center pa-5 font-weight-black"
                        outlined
                        tile
                        >Yes</v-card>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="8">
                      <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                        <ul>
                          <li>Functional Test: Display Working ?</li>
                        </ul>
                      </v-card>
                    </v-col>
                    <v-col :cols="4">
                      <v-card
                        class="v-card-100 text-md-center pa-5 font-weight-black"
                        outlined
                        tile
                        >NO</v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="viewImageDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>


          <v-card  v-if="claim_type == 'Warranty' || claim_type == 'Service'">
          <v-container>
            <v-card>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <span class="headline" style="padding-left:10px">Ampere</span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn icon  font-weight-black @click="viewImageDialog = false" style="float:right;color:black;">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col> 
              </v-row>
            </v-card>
            <v-card-text>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                  <span class="ma-2 header-color detail_header" style="font-size:18px;" justify="center">Component:</span>
                  <span style="color:#0357D0;;font-size:18px;">Battery</span>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <span class="ma-2 header-color detail_header" style="font-size:18px;" justify="center">Serial Number:</span>
                  <span style="color:#0357D0;font-size:18px;">12132</span>
                </v-col>
                <v-col cols="12">
                  <span class="ma-2 header-color detail_header" justify="center">Defect Reason/s:</span>
                </v-col>
                <v-col cols="12">
                  <li>Battery not Charged</li>
                  <li>Battery Wire Cut</li>
                </v-col>
                <v-col cols="12">
                  <span class="ma-2 header-color detail_header" justify="center">Attached Images:</span>
                </v-col>

                <v-col :cols="3">
                  <img src="@/assets/images/bike.png" />
                </v-col>
                <v-col :cols="3">
                  <img src="@/assets/images/bike.png"/>
                </v-col>
                        
               <v-col cols="12">
                <span class="ma-2 header-color detail_header" justify="center">Attached Remarks:</span>
                <v-textarea solo name="input-7-4" label="Attached Remarks" width="180"></v-textarea>
              </v-col>
               </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
              </v-container>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Details Modal Ends -->

      <v-card-title>
        <div style="color:#1B3A57;font-size: 32px;">Claim Details</div>
      </v-card-title>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card class="smart_font">
              <v-row v-if="claim_type == 'Warranty' ||  claim_type == 'Service'">
                <v-col cols="4" sm="4" >
                  <span class="ma-2 header-color detail_header" justify="center">Claim Type:</span>
                  <span class="text-no-wrap text-example">Warranty</span>
                </v-col>
                <v-col cols="4" sm="4">
                  <span class="ma-2 header-color detail_header" justify="center">Vendor Code:</span>
                  <span>{{sent_claim.vendor_code}}</span>
                </v-col>
                <v-col cols="4" sm="4">
                  <span class="ma-2 header-color detail_header" justify="center">Product Serail Number:</span>
                  <span>AFSP5786</span>
                </v-col>
                <v-col cols="4" sm="4">
                  <span class="ma-2 header-color detail_header" justify="center">Claim Initiation:</span>
                  <span>15/07/2020</span>
                </v-col>
                <v-col cols="4" sm="4">
                  <span class="ma-2 header-color detail_header" justify="center">Purchase Date:</span>
                  <span>14/07/2020</span>
                </v-col>
                <v-col cols="4" sm="4">
                  <span class="ma-2 header-color" justify="center">
                  <a @click="viewhistory" class="text-decoration-underline">Claim History</a>
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="claim_type === 'Return'" style="padding: 1px;">
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Claim id:</span>
                  <span class="text-no-wrap text-example">claim1</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Claim Type:</span>
                  <span>Returns</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Vendor Code:</span>
                  <span>AFSP5786</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Return Reason:</span>
                  <span>Product Damaged</span>
                </v-col>
                
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Invoice Date:</span>
                  <span>14/07/2020</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Return Amount(INR):</span>
                  <span>20,000</span>
                </v-col>
                
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Ship to:</span>
                  <span>c1-Greaves</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Claim Date:</span>
                  <span>14/07/2020</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Customer Contact Name:</span>
                  <span>John</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Product Code:</span>
                  <span>Prod1123</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Customer Code:</span>
                  <span>Cust-1123</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">State:</span>
                  <span>Karnataka</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Customer Pickup Address:</span>
                  <span>Addr-2</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Routing Approver Name:</span>
                  <span>Pankaj</span>
                </v-col>
                <v-col cols="4" sm="3">
                  <span class="ma-2 header-color detail_header" justify="center">Invoice Name:</span>
                  <span>inv-543</span>
                </v-col>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-title>
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Sku" single-line></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn 
            class="ma-2"
            color="normal"
            >Save & Close</v-btn>
          <v-btn @click="rejectConfirmation"
            class="ma-2"
            color="normal"
            >Reject</v-btn>
          <v-btn @click="approveConfirmation"
            class="ma-2"
            color="primary"
            >Approve</v-btn>
        </v-card-actions>
      </v-card-title>


      <v-row justify="center">
        <v-dialog v-model="history_dialog" persistent max-width="700px">
        <v-card  v-if="claim_type == 'Warranty' || claim_type == 'Service'">
          <v-container>
              <v-row>
              <v-col cols="12">
              <v-btn icon  font-weight-black @click="history_dialog = false" style="float:right; padding-right:35px;">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
              </v-col>
                <v-col cols="12" sm="6" md="6">
                    <span class="ma-2 header-color detail_header" justify="center">Purchase Date:</span>
                     <span>12/07/2020</span>               
                   </v-col>
                <v-col cols="12" sm="6" md="6">
                 <span class="ma-2 header-color detail_header" justify="center"> Product Serial Number:</span>
                  <span>12132</span>
                </v-col> 
              </v-row>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-select v-model="claim_type"
                    :items="['Service', 'Warranty']"
                    label="Claim Type"
                    solo                    
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6"></v-col>
                
                <div>
                  <v-data-table v-model="selected" x-small
                    :dense="true"
                    :headers=" claim_type == 'Warranty' ? warranty_headers : service_headers"
                    :items="claim_type == 'Warranty' ? warranty_data : service_data"
                    :search="search"
                    :fixed-header="true"
                    class="elevation-1 smart_font"
                    >
                     <template v-slot:item.job_sheet="{ item }">
                        <a>Job Sheet</a>
                    </template>
                  </v-data-table>
                </div>
               </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
              </v-container>
          </v-card>

          
        </v-dialog>
      </v-row>


      <!-- Approve Reject Modal -->
      <v-row justify="center">
        <v-dialog v-model="confirm_dialog" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card-title>
              <span class="headline">Are you sure you want to approve ?</span>
            </v-card-title>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="confirm_dialog = false">Close</v-btn>
              <v-btn color="primary" @click="confirmApprove">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Approve Reject Modal -->
      <v-row justify="center">
        <v-dialog v-model="confirm_dialog" persistent max-width="700px">
          <v-card class="v-card-100">
            <v-card-title>
              <span class="headline">Are you sure you want to approve ?</span>
            </v-card-title>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="confirm_dialog = false">Close</v-btn>
              <v-btn color="primary" @click="confirmApprove">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <div>
        <v-data-table v-model="selected" x-small
          :dense="true"
          :headers="headers"
          :items="claims"
          :search="search"
          :fixed-header="true"
          show-select
          class="elevation-1 smart_font"
          >
          <template v-slot:item.grading="{ item }">
            <a @click="viewGrade" class="text-decoration-underline">Details</a>
          </template>
          <template v-slot:item.status="{ item }">
            <span>Pending</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <button><v-icon medium color="blue darken-2">mdi-message-text</v-icon></button>             
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
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
  margin-top: 20px;
}
.v-card-100 {
  max-width: 100% !important;
}

.detail_header {
  font-size: 14px;
  font-weight: 600;
  color: #25282B;
}
.smart_font {
  font-size: 14px;
  font-weight: normal;
}

@media (min-width: 1264px) {
  .container {
  max-width: 224%;
  padding: 0px;
  margin-left:10px;
  }
}
.col-4, .sm-3 {
  padding: 8px;
}
</style>

<script>
import { mapState } from 'vuex'
import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
      sent_claim: this.$store.state.warranty_claim,
      page: 1,
      claims: [],
      selected: [],
      search: '',
      pageCount: 0,
      itemsPerPage: 10,
      viewImageDialog: false,
      claim_type: 'Warranty',
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Components', value: 'item_description' },
        { text: 'Category', value: 'category' },
        { text: 'Item Serial No', value: 'sku'},
        { text: 'Warranty Validity', value: 'sku' },
        { text: 'Details', value: 'grading'},
        { text: 'Status', value: 'status' },

      ],
      service_headers: [
        { text: 'Service Number', value: 'Service_number' },
        { text: 'Service Date', value: 'service_date' },
        { text: 'Job Sheet', value: 'job_sheet'},
      ],
       warranty_headers: [
        { text: 'Warranty Claim Number', value: 'warranty_claim_no' },
        { text: 'Part List', value: 'part_list'},
        { text: 'Replacement Date', value: 'replacement_date' },
        { text: 'Warranty Status', value: 'warranty_status' },
      ],
      service_data: [
        {
          Service_number: 'service1',
          service_date: '10/07/2020',
        },
        {
          Service_number: 'service2',
          service_date: '12/07/2020',
        }],

        warranty_data: [
        {
          warranty_claim_no: 'warranty1',
          replacement_date: '10/07/2020',
          part_list: 'sku1',
          warranty_status: 'Open',
        },
        {
          warranty_claim_no: 'warranty2',
          replacement_date: '12/07/2020',
          part_list: 'sku2',
          warranty_status: 'Close'
        }],
      questions: [
        {
          text: "Functional Test : Powering On?",
          value: "Yes"
        },
        { text: "Functional Test : Display Working?", value: "Yes" }
      ],
      dialog: false,
      confirm_dialog: false,
      history_dialog:false,

    };
  },
  computed: {
    ...mapState([
      'warranty_claim'
    ])
  },
  created(){
    this.getClaimDetails()
  },
  components: {
    editor: Editor
  },
  methods: {
    rejectConfirmation(){
       this.dialog = true;
    },
    approveConfirmation(){
      this.confirm_dialog = true;
    },
    confirmApprove(){
      this.confirm_dialog = false;
      this.$router.push({name: "DMSWarranty"})
      this.$toast.success('Claim Updated Sucessfully')
    },
    RejectApprove(){
      this.dialog = false;
      this.$router.push({name: "DMSWarranty"})
      this.$toast.success('Claim Updated Sucessfully')

    },
    getClaimDetails(){
      this.$http.plain.get("https://5f0d499111b7f600160567fd.mockapi.io/dms/claims")
        .then(response => {
          this.claims = response.data
        })
        .catch(error => this.$toast.error('Error in fetching Claim Details'))
    },
    viewGrade() {
      this.viewImageDialog = true;
    },
    viewhistory() {
      this.history_dialog = true;
    }
  }

};
</script>
