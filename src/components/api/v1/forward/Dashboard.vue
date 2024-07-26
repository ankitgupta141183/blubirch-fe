<template>
  <div>
    <div>
      <span style="float:left;margin-top:17px;margin-left:6px;">
        <img
          src="@/assets/logo.svg"
          height="48"
          width="48"
          alt="Blubirch Logo"
        />
      </span>
      <span>
        <HeaderComponent :headerTitle="headerText" />
      </span>
    </div>
    <v-card class="mt-2 mx-4 mb-16 mh-w-footer">
      <v-container class="ma-0 pa-0" fluid grid-list-lg>
        <v-layout class="ma-0 pa-0" row wrap>
          <v-flex class="pa-3" xs12 style="background-color: grey lighten-3">
            <v-row class="ma-0 pa-0" align="center" justify="center">
              <v-col xs="12" sm="5" md="4">
                <v-select
                  v-model="selectedProcessType"
                  :items="processTypes"
                  label="-- Select Process Type --"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0" align="center" justify="center">
              <v-col xs="12" sm="5" md="4">
                <v-text-field
                  v-if="selectedProcessType == 'Inbound'"
                  v-model="documentNumber"
                  label="Document Number"
                  type="number"
                  min="0"
                  max="500000"
                  outlined
                  oninput="validity.valid||(value='');"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-bottom-navigation fixed class="primary bottom-nav" >
    </v-bottom-navigation>
  </div> 
</template>

<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { mapState } from "vuex";
export default {
  data() {
    return {
      headerText: "Croma Forward",
      processTypes: ['Inbound', 'Outbound'],
      documentNumber: "",
      selectedProcessType: ""
    };
  },
  components: {
    HeaderComponent
  },
  computed: mapState(["currentUser", "signedIn"]),
  methods: {
  }
};
</script>