<template>
  <v-card>
    <v-card-title>
      <div style="color:#1B3A57;font-size: 32px;">Claims</div>
    </v-card-title>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search Claim Id" single-line></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <div>
      <v-data-table
        :dense="false"
        :headers="headers"
        :items="warranty"
        :item-key="id"
        :search="search"
        class="elevation-1"
        >
        <template v-slot:item.ageing = {item}>
          {{Math.floor(( new Date() - Date.parse(item.createdAt) ) / 86400000)}} Day(s)
        </template>
        <template v-slot:item.details="{item}">
          <img src= "@/assets/images/job_sheet.png" width="30" height="22" @click="sendClaims(item)" >
          <img src= "@/assets/images/Subtract.svg" width="30" height="22" >
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
      search: '',
      warranty: [],

      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Vendor Code', value: 'vendor_code' },
        { text: 'Claim Type', value: 'claim_type' },
        { text: 'Claim Id', value: 'claim_id' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Ageing', value: 'ageing' },
        { text: 'Claim Amount', value: 'claim_amount' },
        { text: 'Details', value: 'details' },
      ],
      
    };
  },
  created (){
  this.getClaims()
  },
  components: {
    editor: Editor
  },
  methods: {
    getClaims(){
      this.$http.plain.get("https://5f0d499111b7f600160567fd.mockapi.io/dms/warranty")
        .then(response => {
          this.warranty = response.data
        })
        .catch(error => this.$toast.error('Error in fetching warranty orders'))
    },
    sendClaims(item){
      this.$store.commit('setClaim',{ warranty_claim: item})
      this.$router.push({ name: 'DMSClaims'})
    }
  }
 };
 </script>
