<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <span class="mdi mdi-arrow-left-thick"></span>
      <span class="mx-5">GRN Item Inward</span>
    </v-app-bar>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row>
        <v-flex class="ma-0 pa-0" xs12>
          <v-stepper alt-labels value="2">
            <v-stepper-header>
              <v-stepper-step editable step="1">Box Inward</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="2">Item Inward</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="3">Summary</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="2">
                <div class="flex-row">
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" sm="10" md="10">
                      <span style="color: #4F4F4F">Scan Box</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col xs="2" sm="2" md="2">
                      <p class="text-end">
                        <img src= "@/assets/images/remove.png">
                      </p>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" sm="10" md="10">
                      <span style="color: #4F4F4F">Scan Item</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col xs="2" sm="2" md="2">
                      <p class="text-end">
                        <img src= "@/assets/images/remove.png">
                      </p>
                    </v-col>
                  </v-row>
                  <v-divider class="ma-0 pa-0"></v-divider>
                  <div class="flex-column flex-row">
                  <v-row class="ma-0 pa-0"  align="center" justify="center">
                    <v-col xs12 :cols="12"  align="center" justify="center">
                      <h3 style="color: #BDBDBD;">Scan to Add Items</h3>
                    </v-col>
                  </v-row>
                </div>
                  <v-divider></v-divider>
                </div>
              </v-stepper-content>
              <template absolute class="font-weight-medium">
                <div class="d-flex caption" style="background-color: #0357D0;color:white">
                  <v-row class="ma-0 pa-0">
                    <v-col xs8 :cols="8" md="10 " sm="8">
                      <span>
                      0(4) BOXES | 0(7) ITEMS
                      </span>
                    </v-col>
                    <v-col xs4 :cols="4" md="2" sm="4">
                      <a style="color:white;margin-left:28px" @click="itemInward()">CONTINUE</a>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-stepper-items>
          </v-stepper>
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

@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  }
  @media only screen and (max-width: 959px) {
    .v-stepper:not(.v-stepper--vertical) .v-stepper__step__step {
      margin-right: 12px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      e1: 0,
      items: ["BX_4653","BX_4667","BX_4790","BX_4781"],
    };
  },
  methods: {
    itemInward(){
      this.$router.push({name: "GRNItemInwardDetails"})
    }
  }
};
</script>











