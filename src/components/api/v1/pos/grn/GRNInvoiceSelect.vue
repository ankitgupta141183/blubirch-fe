<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <v-row class>
        <v-col class xs12 :cols="12">
          <span class="mdi mdi-arrow-left-thick"></span>
          <span class="mx-5">GRN</span>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-container class="ma-0 pa-0" fluid grid-list-lg>
            <v-layout class="ma-0 pa-0" row>
              <v-flex class="ma-0 pa-0" xs12>
                <div class="flex-row">
                  <v-row class="ma-2 pa-2" align="center" justify="center">
                    <v-col xs="12" sm="5" md="4">
                      <v-autocomplete v-model="values" :items="invoices" item-text="invoice_no" outlined label="Enter/Select Invoice">
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="ma-2 pa-2" v-if="values">
                    <v-col class="caption text-color" xs6 :cols="6" md="2" sm="6">
                      <div>Purchase Order</div>
                      <div>Order Type</div>
                      <div>No of Boxes</div>
                      <div>No of Items</div>
                    </v-col>
                    <v-col class="caption" xs6 :cols="6" md="10" sm="6">
                      <div>57364278</div>
                      <div>New Order</div>
                      <div>7</div>
                      <div>7</div>
                    </v-col>
                  </v-row>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
    <template absolute class="font-weight-medium">
      <div class="d-flex caption" style="background-color: #0357D0;color:white">
        <v-row class="ma-0 pa-0">
          <v-col cols="12" align="center">
            <a style="color:white;" @click="boxInward()">PROCEED</a>
          </v-col>
        </v-row>
      </div>
    </template>
  </v-card>
</template>

<style scoped>
.text-color {
  color: #0357d0;
}
.header-background {
  background-color: #0357d0;
}
</style> 

<script scoped>
export default {
  data() {
    return {
      items: ['Inv123', 'Inv176', 'Inv212', 'Inv296','Inv303','Inv437'],
      values: null,
      invoices: [],
    };
  },
  created (){
    this.getInvoices()
  },
  methods: {
    getInvoices(){
      this.$http.plain.get('https://5f069affee44800016d38e83.mockapi.io/pos/invoice')
        .then(response => {
          this.invoices = response.data
        })
        .catch(error => this.$toast.error('Error in fetching invoices'))
    },
    boxInward(){
      this.$router.push({ name: 'GRNBoxInward'})
    },
  },
};
</script>
