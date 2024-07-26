<template>
  <v-card class="pa-4 box_shadow_class">
    <div>
      <div>
        <span>
          <HeaderComponent :headerTitle="headerText" />
        </span>
      </div>
      <v-container class="ma-0 pa-0" fluid grid-list-lg>
        <v-layout class="ma-0 pa-0" row wrap>
          <v-flex class xs12 style="background-color: grey lighten-3">
            <v-row>
              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'PendingBoxResolution' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/box_res.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Pending Box Resolution
                    </div>
                  </v-card>
                </router-link>
              </v-col>

              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'PendingItemResolution' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/pending_item_res.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Pending Item Resolution
                    </div>
                  </v-card>
                </router-link>
              </v-col>

              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'RejectedBoxResolution' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/rejected _box.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Rejected Boxes & items
                    </div>
                  </v-card>
                </router-link>
              </v-col>

              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'ThreePClaimRequests' }">
                  <v-card class="pa-4 box_shadow_class">
                    <div align="center" justify="center">
                      <img class="mt-3" src="@/assets/images/icons/3p_claim.svg" width="108" height="108" />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      3P Claim Requests
                    </div>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  import { mapState } from "vuex"
  export default {
    data() {
      return {
        headerText: "Issue Resolution",
      };
    },

    components: {
      HeaderComponent,
    },

    computed: mapState(["currentUser", "signedIn"]),

    created() { },

    methods: {
      loadData(tab) {
        this.active_tab = tab;
      },

      navigateTarget(routerName) {
        this.$router.push({ name: routerName });
      },
    },
  };
</script>
