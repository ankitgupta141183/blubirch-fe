<template>
  <v-card  v-scroll.self="onScroll" class="overflow-y-auto" max-height="850" >
    <v-card-title><div style="color:#1B3A57;font-size: 32px;">{{ new_customer == true ? 'New Dealer Details' : 'Edit Dealer Details' }}</div>
        </v-card-title>

     <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline" center>Please Attach Rejection Document</span>
          </v-card-title>
          <v-card-title>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-file-input multiple label="File input"></v-file-input>

            </v-container>
          </v-card-text>
          <v-card-text>
            <v-textarea solo name="input-7-4"  label="Reject Reason"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="primary" @click="editReject">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

     <v-row justify="center">
      <v-dialog v-model="confirm_dialog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline" center>Please Attach Rejection Document</span>
          </v-card-title>
          <v-card-title>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-file-input multiple label="File input"></v-file-input>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirm_dialog = false">Close</v-btn>
            <v-btn color="primary" @click="editApproval">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


   
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
                <v-expansion-panels v-if="new_customer == true" width="600"
        v-model="panel"
        :disabled="disabled"
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Firm Details</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" sm="6" md="6">
             <v-text-field label="Dealer Code" v-model="customer_detail.dealer_code" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="First Name" v-model="customer_detail.first_name" :rules="nameRules"  required ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Last Name" v-model="customer_detail.last_name" :rules="nameRules"  required ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                  <v-select v-model="customer_detail.dealer_type"
                    :items= dealer_types
                    label= "Dealer Type"
                    required
                    :rules="nameRules"

                  ></v-select>
                </v-col>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Email Id" v-model="customer_detail.email" :rules="emailRules"  required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Phone Number" v-model= "customer_detail.phone_number" :rules="contactRules"  @keyup="onlyNumeric"  required></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Gst and Account Details</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>

            <v-col cols="12" sm="6" md="6">
              <v-text-field label="GSTIN" v-model= "customer_detail.gst_number" :rules="nameRules"  required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Account Details" v-model= "customer_detail.account_number" :rules="nameRules"  required ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
            <v-text-field label="Bank Name" v-model= "customer_detail.bank_name"  :rules="nameRules"  required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="IFSC Code" v-model= "customer_detail.ifsc_code" :rules="nameRules"  required></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>


        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Registered Address</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Address Line 1" v-model= "customer_detail.address_1" :rules="nameRules"  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Address Line 2" v-model= "customer_detail.address_2" :rules="nameRules"  required ></v-text-field>
            </v-col>
           
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="City" v-model= "customer_detail.city" :rules="nameRules"  required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="State" v-model= "customer_detail.state" :rules="nameRules"  required ></v-text-field>
            </v-col>
             <v-col cols="12" sm="6" md="4">
            <v-text-field label="Pincode" v-model= "customer_detail.pincode"  @keyup="onlyNumeric" :rules="nameRules" required></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>OnBoarded By</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Name" v-model= "customer_detail.onboarder_by" :rules="nameRules"  required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Employee Code" v-model= "customer_detail.onboarded_employee_code" :rules="nameRules"  required ></v-text-field>
            </v-col>
             <v-col cols="12" sm="6" md="4">
            <v-text-field label="Phone Number" v-model= "customer_detail.onboarded_employee_phone_no"  @keyup="onlyNumeric" :rules="contactRules" required></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Email</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
           <v-col cols="12">
              <v-text-field label="To"  :rules="emailRules"  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="CC" :rules="emailRules"  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Remarks" v-model= "customer_detail.remarks"></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="File input"
              multiple
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
            <template v-slot:selection="{ index, text }">
              <v-chip
                v-if="index < 2"
                color="deep-purple accent-4"
                dark
                label
                small>
                {{ text }}
              </v-chip>
        
              <span
                v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2">
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
            </v-file-input>
          </v-col>

            </v-row>  

            <v-card-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer> 
          <v-actions>
            <v-btn :to="{ name: 'DMSCustomerDetails'}" 
              class="ma-2"
              color="normal"
              >Cancel</v-btn>
            <v-btn @click="approveConfirmation"
              class="ma-2"
              color="primary"
              >Save and Close</v-btn>
            <v-btn 
              class="ma-2"
              color="normal"
              >Submit For Approval</v-btn>
          </v-actions>
        </v-card-title>
                 </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>

              
         <v-expansion-panels v-if="new_customer != true" width="600"
        v-model="panel1"
        :disabled="disabled"
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Firm Details</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" sm="6" md="6">
             <v-text-field label="Dealer Code" v-model="customer_detail.dealer_code" :rules="nameRules"  required ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="First Name" v-model="customer_detail.first_name" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Last Name" v-model="customer_detail.last_name" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select v-model="customer_detail.dealer_type"
                    :items=dealer_types
                    label="Dealer Type"
                    required
                    readonly
                  ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Email Id" v-model="customer_detail.email" :rules="emailRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Phone Number" v-model= "customer_detail.phone_number" :rules="contactRules"  @keyup="onlyNumeric"  required readonly></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Gst and Account Details</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>

            <v-col cols="12" sm="6" md="6">
              <v-text-field label="GSTIN" v-model= "customer_detail.gst_number" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Account Details" v-model= "customer_detail.account_number" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
            <v-text-field label="Bank Name" v-model= "customer_detail.bank_name"  @keyup="onlyNumeric"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="IFSC Code" v-model= "customer_detail.ifsc_code" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>


        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Registered Address</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Address Line 1" v-model= "customer_detail.address_1" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Address Line 2" v-model= "customer_detail.address_2" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
           
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="City" v-model= "customer_detail.city" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="State" v-model= "customer_detail.state" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
             <v-col cols="12" sm="6" md="4">
            <v-text-field label="Pincode" v-model= "customer_detail.pincode"  @keyup="onlyNumeric"  required readonly></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>OnBoarded By</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Name" v-model= "customer_detail.onboarder_by" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Employee Code" v-model= "customer_detail.onboarded_employee_code" :rules="nameRules"  required readonly></v-text-field>
            </v-col>
             <v-col cols="12" sm="6" md="4">
            <v-text-field label="Phone Number" v-model= "customer_detail.onboarded_employee_phone_no"  @keyup="onlyNumeric"  required readonly></v-text-field>
            </v-col>
            </v-row>  
                 </v-expansion-panel-content>
        </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-header style="font-size:24px;" dark>Email</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
           <v-col cols="12">
              <v-text-field label="To"  :rules="emailRules"  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="CC" :rules="emailRules"  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Remarks" v-model= "customer_detail.remarks"></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="File input"
              multiple
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
            <template v-slot:selection="{ index, text }">
              <v-chip
                v-if="index < 2"
                color="deep-purple accent-4"
                dark
                label
                small>
                {{ text }}
              </v-chip>
        
              <span
                v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2">
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
            </v-file-input>
          </v-col>
          </v-row>  
          
         </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>

        <v-card-title v-if="new_customer != true">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer> 
          <v-actions>
            <v-btn :to="{ name: 'DMSCustomerDetails'}" 
              class="ma-2"
              color="normal"
              >Cancel</v-btn>
               <v-btn v-if="new_customer != true && customer_detail.status == 'Pending Submission'"  @click="pendingApproval"
              class="ma-2"
              color="primary"
              >Submit For Approval</v-btn>
            <v-btn v-if="new_customer != true && customer_detail.status != 'Pending Submission'"  @click="dialog = true"
              class="ma-2"
              color="primary"
              >Reject</v-btn>
              <v-btn v-if="new_customer != true && customer_detail.status != 'Pending Submission'" @click="confirm_dialog = true"
              class="ma-2"
              color="primary"
              >Approve</v-btn>
          </v-actions>
        </v-card-title>
      </v-container>
    </v-form>
  </v-card>

  
</template>

<style>
.col-12, .col-md-4, .col-sm-6 {
  padding: 0px;
  padding-right: 40px;
}
@media (min-width: 1064px) {
  .container {
  max-width: 180%;
}
}

</style>

<script>
  export default {
    data() {
      return {
        files: [],
        scrollInvoked: 0,
        valid:true,
        new_customer : false,
        panel: [0,1,2,3,4],
        panel1: [0],
        dealer_types: [],
        dialog: false,
        confirm_dialog: false,
        customer_detail: {
          'dealer_code': '',
          'first_name': '',
          'last_name': '',
          'email': '',
          'phone_number':'',
          'gst_number':'',
          'account_number':'',
          'ifsc_code': '',
          'dealer_type': '',
          'address_1': '',
          'address_2':'',
          'city' : '',
          'state':'',
          'pincode': '',
          'onboarder_by':'',
          'onboarded_employee_code':'',
          'onboarded_employee_phone_no':'',
          'remarks':''
        },
        nameRules: [
        v => !!v || 'This field is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        contactRules:  [
            v => !!v || 'Contact is required',
            v => v && v.length == 10 || 'Number must be less than 10 characters'
        ]
      };
    },

    created(){
      this.onScroll()
      this.customer_detail = this.$store.state.customer_detail;
      if (this.customer_detail === undefined){
        this.customer_detail = {}
        this.new_customer = true
      }
      
      this.$http.secured.get('/api/v1/lookups/get_dealer_types')
        .then(response => {
            for(var i =0; i < response.data.lookup_values.length; i ++){
            this.dealer_types.push(response.data.lookup_values[i].original_code);
            }
         })
        .catch(error => this.$toast.error('Error in fetching dealer type'))
  
    },
    methods: {
      onScroll() {
        this.scrollInvoked++
      },
      onlyNumeric() {
          this.customer_detail.firm_contact = this.customer_detail.firm_contact.replace(/[^0-9]/g, '');
        },
      approveConfirmation(){
        if (this.$refs.form.validate() == false){
         return;
        }

        this.$http.secured.post("/api/v1/dms/dealers", {  dealer: { dealer_code: this.customer_detail.dealer_code , first_name: this.customer_detail.first_name,
        last_name: this.customer_detail.last_name, email: this.customer_detail.email, phone_number: this.customer_detail.phone_number, gst_number: this.customer_detail.gst_number, account_number: this.customer_detail.account_number,
        ifsc_code: this.customer_detail.ifsc_code, address_1 : this.customer_detail.address_1, address_2: this.customer_detail.address_2,
        city: this.customer_detail.city, state : this.customer_detail.state, pincode: this.customer_detail.pincode,
        onboarder_by: this.customer_detail.onboarder_by, onboarded_employee_code: this.customer_detail.onboarded_employee_code, onboarded_employee_phone_no: this.customer_detail.onboarded_employee_phone_no,
        remarks: this.customer_detail.remarks, dealer_type: this.customer_detail.dealer_type }})
        .then(response => {
          this.$router.push({ name: 'DMSCustomerDetails'})
        this.$toast.success('Successfully Submitted');

        })
         .catch(error => this.$toast.error('Error in fetching dealers'))
      },
      editApproval(){
        this.$http.secured.put('/api/v1/dms/dealers/'+this.customer_detail.id, { dealer: { dealer_code: this.customer_detail.dealer_code , first_name: this.customer_detail.first_name,
        last_name: this.customer_detail.last_name, email: this.customer_detail.email, phone_number: this.customer_detail.phone_number, gst_number: this.customer_detail.gst_number, account_number: this.customer_detail.account_number,
        ifsc_code: this.customer_detail.ifsc_code, address_1 : this.customer_detail.address_1, address_2: this.customer_detail.address_2,
        city: this.customer_detail.city, state : this.customer_detail.state, pincode: this.customer_detail.pincode,
        onboarder_by: this.customer_detail.onboarder_by, onboarded_employee_code: this.customer_detail.onboarded_employee_code, onboarded_employee_phone_no: this.customer_detail.onboarded_employee_phone_no,
        remarks: this.customer_detail.remarks, dealer_type: this.customer_detail.dealer_type,  status:'Approved'} })
          .then(response => {
          this.$router.push({ name: 'DMSCustomerDetails'})
        this.$toast.success('Successfully Updated');

        })
         .catch(error => this.$toast.error('Error in fetching dealers'))
      },
      pendingApproval(){
        this.$http.secured.put('/api/v1/dms/dealers/'+this.customer_detail.id, {
         dealer_code: this.customer_detail.dealer_code, status:'Pending Approval' })
          .then(response => {
          this.$router.push({ name: 'DMSCustomerDetails'})
        this.$toast.success('Dealer Rejected Successfully');

        })
         .catch(error => this.$toast.error('Error in fetching Dealers'))

      },
      editReject(){
        this.$http.secured.put('/api/v1/dms/dealers/'+this.customer_detail.id, {
         dealer_code: this.customer_detail.dealer_code, status:'Rejected' })
          .then(response => {
          this.$router.push({ name: 'DMSCustomerDetails'})
        this.$toast.success('Dealer Rejected Successfully');

        })
         .catch(error => this.$toast.error('Error in fetching Dealers'))


      }

    }
  };


 </script>
