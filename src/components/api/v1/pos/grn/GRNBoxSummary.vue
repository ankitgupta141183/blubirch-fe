<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <v-row class>
        <v-col class xs10 :cols="10">
          <span class="mdi mdi-arrow-left-thick"></span>
          <span class="mx-5">Box Summary</span>
        </v-col>
        <v-col xs4 :cols="2" align="end">
          <div class="text-center">
            <v-bottom-sheet v-model="sheet">
              <template v-slot:activator="{ on, attrs }">
                <a v-bind="attrs" v-on="on">
                <span class="material-icons" style="color: white;">filter_list</span>
                </a>
              </template>
              <v-list>
                <v-subheader class="text-color">Filter</v-subheader>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-list-item @click="">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-title>Box Match</v-list-item-title>
                </v-list-item>
                <v-list-item @click="">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-title>Excess Box</v-list-item-title>
                </v-list-item>
                <v-list-item @click="">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-title>Not Received</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-row class="ma-0 pa-0">
                    <v-col cols=6 align="end">
                      <v-btn large  @click="sheet = false">CLEAR FILTERS</v-btn>
                    </v-col>
                    <v-col cols=6>
                      <v-btn large  style="background-color: #0357D0;color:white" @click="sheet = false">APPLY</v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
              <v-divider class="ma-0 pa-0"></v-divider>
            </v-bottom-sheet>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class="ma-0 pa-0" xs12>
          <v-row class="ma-0 pa-0">
            <v-col xs="6" md="6" sm="6">
              Sent Box: 07
            </v-col>
            <v-col xs="6" md="6" sm="6">
              Excess Box: 0
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-col xs="6" md="6" sm="6">
              Received Box: 07
            </v-col>
            <v-col xs="6" md="6" sm="6">
              Not Sent Box: 0
            </v-col>
          </v-row>
          <v-divider class="ma-0 pa-0"></v-divider>
          <v-row class="ma-0 pa-0">
            <v-col cols="12">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Sent Box</th>
                      <th class="text-left ma-0 pa-0">Recv Box</th>
                      <th class="text-left ma-0 pa-0">Recv Qty</th>
                      <th class="text-left ma-0 pa-0">
                        <v-menu bottom :offset-x="offset">
                          <template v-slot:activator="{ on, attrs }">
                            <a v-bind="attrs" v-on="on">
                            <span class="material-icons">help_outline</span>
                            </a>
                          </template>
                          <v-list>
                            <v-list-item @click="">
                              <v-list-item-avatar>
                                <span class="material-icons" style="color: #219653;">check_circle</span>
                              </v-list-item-avatar>
                              <v-list-item-title>Boxes Match</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-avatar>
                                <span class="material-icons" style="color: #F2994A;">remove_circle</span>
                              </v-list-item-avatar>
                              <v-list-item-title>Excess Box</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-avatar>
                                <span class="material-icons" style="color:#EB5757">highlight_off</span>
                              </v-list-item-avatar>
                              <v-list-item-title>Box Not Received</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in boxdetails" :key="item.name">
                      <td>{{ item.sent_box_no }}</td>
                      <td class="ma-0 pa-0">{{ item.received_box_no }}</td>
                      <td class="ma-0 pa-0">{{ item.received_quantity }}</td>
                      <td class="ma-0 pa-0"><span class="material-icons" style="color: #219653;">check_circle</span></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
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

<script>
export default {
  data() {
    return { 
      values: null,
      invoices: [],
      active: 'active',
      offset: true,
      sheet: false,
      boxdetails: [
          {
            sent_box_no: 'DB_4623345679',
            received_box_no: 'DB_4623345679',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345578',
            received_box_no: 'DB_4623345578',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345670',
            received_box_no: 'DB_4623345670',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345699',
            received_box_no: 'DB_4623345699',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345663',
            received_box_no: 'DB_4623345663',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345629',
            received_box_no: 'DB_4623345629',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345639',
            received_box_no: 'DB_4623345639',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345672',
            received_box_no: 'DB_4623345672',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345879',
            received_box_no: 'DB_4623345879',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345179',
            received_box_no: 'DB_4623345179',
            received_quantity: 1,
          },
          {
            sent_box_no: 'DB_4623345079',
            received_box_no: 'DB_4623345079',
            received_quantity: 1,
          },
        ],
    };
  },
  created (){
    
  },
  methods: {
  },
};
</script>
