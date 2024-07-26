<template>
  <div>
    <!-- header and icon -->
    <div>
      <span>
        <HeaderComponent :headerTitle="headerText" />
      </span>
    </div>
    <!-- components -->
    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class xs12 style="background-color:grey lighten-3">
          <v-row class="alignment">
            <!-- forward -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('forwardDisposition')" >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3 img-width" src="@/assets/images/icons/forward.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  <span>Forward</span>
                </div>
              </v-card>
            </v-col>
            <!-- reverse -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('reverseDisposition')" >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3 img-width" src="@/assets/images/icons/reverse.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  <span>Reverse</span>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import HeaderComponent from "../../../commoncomponents/HeaderComponent.vue"
import { mapState } from "vuex";
export default {
  data() {
    return {
      active_tab: 'Billing',
      headerText: 'Forward And Reverse'
    }
  },
  components: {
    HeaderComponent
  },
  computed: mapState(['currentUser', 'signedIn']),
  methods: {
    loadData(tab) {
      this.active_tab = tab;
    },
    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    }
  }
}
</script>
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
  .alignment {
    justify-content: center;
    position: relative;
    top: 30vh;
  }
  .img-width{
    width: 110px;
  }
</style>