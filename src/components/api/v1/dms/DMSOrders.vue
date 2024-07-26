<template>
  <v-card>
    <v-card-title>
      <div style="color:#1B3A57;font-size: 32px;">Order Approval</div>
    </v-card-title>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search vendor name" single-line ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <div>
      <v-data-table
        :dense="false"
        :headers="headers"
        :items="orders"
        :item-key="id"
        :search="search"
        class="elevation-1"
        >
        <template v-slot:item.ageing = {item}>
          {{Math.floor(( new Date() - Date.parse(item.created_at) ) / 86400000)}} Day(s)
        </template>
        <template v-slot:item.details = {item}>
          <img src= "@/assets/images/job_sheet.png" width="30" height="22" @click="navigateTarget(item)"/>
            <img src= "@/assets/images/Subtract.svg" width="30" height="22" v-if="item.status === 'Edited'">
        </template>
      </v-data-table>
    </div>
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

</style>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
       page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      orders: [],
      search: '',

      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Vendor Code', value: 'dealer_code' },
        { text: 'Order Location', value: 'dealer_city' },
        { text: 'Vendor Name', value: 'dealer_name' },
        { text: 'Order Number', value: 'order_number' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Order Amount', value: 'order_amount' },
        { text: 'Ageing', value: 'ageing' },
        { text: 'Details', value: 'details' },
      ],
      
    };
  },
  created (){
  this.getOrders()
  },
  components: {
    editor: Editor
  },
  methods: {
    getOrders(){
      this.$http.secured.get('/api/v1/dms/dealer_order_approvals/dealer_order_list')
        .then(response => {
          this.orders = response.data.dealer_orders.slice().reverse();
        })
        .catch(error => this.$toast.error('Error in fetching orders'))
    },
    navigateTarget(item){
      this.$store.commit('setOrder',{ order: item})
      this.$router.push({ name: 'DMSOrderDetails'})
    },
  }
};
 </script>
