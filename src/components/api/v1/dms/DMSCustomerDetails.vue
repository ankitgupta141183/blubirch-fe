<template>
  <v-card>
      <v-card-title><div style="color:#1B3A57;font-size: 32px;">Dealers Details</div></v-card-title>

    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line ></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
      <v-actions>
        <v-btn 
          class="ma-2"
          color="primary"
          >Update From File</v-btn>
        <v-btn @click="navigateTarget()"
          class="ma-2"
          color="primary"
          >New Dealer</v-btn>
      </v-actions>
    </v-card-title>

      <div>
        <v-data-table
          :dense="false"
          :headers="headers"
          :items="customers"
          :search="search"

          class="elevation-1"
        >
        <template v-slot:item.more_info = {item}>
      <img src= "@/assets/images/job_sheet.png" width="30" height="22" @click="navigateTarget(item)"/>
      <img src= "@/assets/images/Subtract.svg" width="30" height="22" v-if="item.status == 'Approved'">
      <img src= "@/assets/images/data.png" width="30" height="22" v-if="item.status == 'Rejected'">

      <img src= "@/assets/images/Delete_Icon.png" width="30" @click="deleteConfirm(item)">
      </template>

        </v-data-table>
      </div>

      <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline" center>Are you sure you want to Delete Customer?</span>
          </v-card-title>
          <v-card-text>
            <v-container>
            </v-container>
          </v-card-text>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="primary" @click="deleteConfirm">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    </v-card>
  </v-card>
</template>

<style>
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

@media (min-width: 1264px) {
  .container {
  max-width: 224%;
  margin-left:24px;
}
}

</style>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
       page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      customers: [],
      dialog: false,
      search: '',

      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Name', value: 'first_name' },
        { text: 'Email ID', value: 'email' },
        { text: 'Phone Number', value: 'phone_number' },
        { text: 'Sales Manager', value: '' },
        { text: 'OnBoarded By', value: 'onboarder_by' },
        { text: 'Customer Code', value: 'dealer_code' },
        { text: 'More Info', value: 'more_info' },
      ],
      
    };
  },
  created (){
  this.getCustomers()
  },
   components: {
     editor: Editor
   },
   methods: {
    getCustomers(){
      this.$http.secured.get('/api/v1/dms/dealers')
        .then(response => {
          this.customers = response.data.dealers.slice().reverse();
        })
        .catch(error => this.$toast.error('Error in fetching dealers'))
    },
    deleteConfirm(item){
     if  (confirm("Are you sure you want to Delete Customer?")){
        this.$http.secured.delete(`/api/v1/dms/dealers/${item.id}`)
        .then(response => {
          this.customers.splice(this.customers.indexOf(item), 1)
          this.$toast.success('Dealer deleted successfully')
        })
           .catch(error => this.$toast.error('Error in deleteing dealer'))
        }
     },
   navigateTarget(item){
      debugger
      this.$store.commit('setCustomerDetail',{ customer_detail: item})
      this.$router.push({ name: 'DMSEditCustomerDetail'})
    }
  }
 }
 </script>
