<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <v-row class>
        <v-col class xs8 :cols="8">
          <span class="mdi mdi-arrow-left-thick"></span>          
          <span class="mx-5">GRN Summary</span>
        </v-col>
        <v-col class xs4 :cols="4">
          <span class="float-right mdi mdi-information-outline"></span>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row>
        <v-flex class="ma-0 pa-0" xs12>
          <v-stepper alt-labels value="3">
            <v-stepper-header>
              <v-stepper-step editable step="1">Box Inward</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="2">Item Inward</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="3">Summary</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="3">
                <div class="flex-row">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <div class="ma-0 pa-0" three-line>
                        <div class="ma-0 pa-0">
                          <v-row class="ma-0 pa-0">
                            <v-col class="ma-0 pa-0" xs2 :cols="2" md="1" sm="2">
                              <img
                                class="float-left"
                                style="margin-top:15px"
                                src="@/assets/images/box_icon.svg"
                                @click=""
                                />
                            </v-col>
                            <v-col class="ma-0 pa-0" xs10 :cols="10" md="11" sm="10">
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs8 :cols="8" md="10" sm="8">
                                  <h5>Box Summary</h5>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs5 :cols="4" md="2" sm="4" align="end">
                                  <a @click="boxSummary()"><span class="material-icons">arrow_forward_ios</span></a>
                                </v-col>
                              </v-row>
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Sent Box: 12 </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Received Box: 12 </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Excess Box: 0 </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Not Received Box: 0 </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-divider></v-divider>
                          <v-row class="ma-0 pa-0">
                            <v-col class="ma-0 pa-0" xs2 :cols="2" md="1" sm="2">
                              <img
                                class="float-left"
                                style="margin-top:15px"
                                src="@/assets/images/to-do-list.svg"
                                @click=""
                                />
                            </v-col>
                            <v-col class="ma-0 pa-0" xs10 :cols="10" md="11" sm="10">
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs8 :cols="8" md="10" sm="8">
                                  <h5>Item Summary</h5>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs5 :cols="4" md="2" sm="4" align="end">
                                  <a @click="itemSummary()"><span class="material-icons">arrow_forward_ios</span></a>
                                </v-col>
                              </v-row>
                              <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Sent Item: 12 </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Received Item: 12 </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Excess Item: 0 </span>
                                </v-col>
                                <v-col class="ma-0 pa-0" xs12 :cols="12" md="12" sm="12">
                                  <span class="boring-color">  Not Received Item: 0 </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
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
                      <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="290">
                          <template v-slot:activator="{ on, attrs }">
                            <a v-bind="attrs" v-on="on" style="color:white;margin-left:28px">
                            CONTINUE
                            </a>
                          </template>
                          <v-card class="pa-2">
                            <v-card-title class="headline">Do you want to finish inwarding ?</v-card-title>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn  text @click="dialog = false">CANCEL</v-btn>
                              <v-btn  style="background-color: #0357D0;color:white" text @click="dialog = false">CONFIRM</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row>
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
.boring-color{
  color: #333333;
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
       dialog: false,
      items: ["BX_4653","BX_4667","BX_4790","BX_4781"],
    };
  },
  methods: {
    itemInward(){
      this.$router.push({name: "GRNItemInwardDetails"})
    },
    itemSummary(){
      this.$router.push({name: "GRNItemSummary"}) 
    },
    boxSummary(){
      this.$router.push({name: "GRNBoxSummary"})
    }
  }
};
</script>