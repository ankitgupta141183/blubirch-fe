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
                <router-link :to="{ name: 'StoreMasterUploadList'}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/parental-control.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Store Master Data
                    </div>
                  </v-card>
                </router-link>
              </v-col>
              
              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'SkuMasterUploadList'}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/parental-control.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      SKU Master Data
                    </div>
                  </v-card>
                </router-link>
              </v-col>

              <v-col xs3 cols="4" sm="4" md="4">
                <router-link :to="{ name: 'VendorMasterUploadList', params: { type: 'Brand Call-Log' }}">
                  <v-card
                    class="pa-4 box_shadow_class"
                  >
                    <div align="center" justify="center">
                      <img
                        class="mt-3"
                        src="@/assets/images/icons/parental-control.png"
                        width="108"
                        height="108"
                      />
                    </div>
                    <div class="mt-3 text-color" align="center" justify="center">
                      Vendor Master Data
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

<style>
.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)
  > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none;
  visibility: hidden;
}
.text-color {
  color: #0357d0;
}
.header-background {
  background-color: #0357d0;
}
.box_shadow_class {
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 4px;
}

.v-card {
  max-width: 97% !important;
}

.v-card-100 {
  max-width: 100% !important;
}
</style> 

<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { mapState } from "vuex";
export default {
  data() {
    return {
      headerText: "Upload Master Data"
    };
  },
  components: {
    HeaderComponent,
  },
  computed: mapState(["currentUser", "signedIn"]),
  created() {},
  methods: {
    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    },
  },
};
</script>