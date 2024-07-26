<template>

  <v-container class="ma-0 pa-0" fluid grid-list-lg>
    <v-layout class="ma-0 pa-0" row wrap>
      <v-flex class xs12 style="background-color: grey lighten-3">
        <v-row>
          <v-col xs3 cols="4" sm="4" md="4">


            <v-card
              id="downlaodcard"
              class="pa-4 box_shadow_class"
            >
              <router-link :to="{ name: 'WmsGraph', params: { link: 'overall' }}">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Overall.svg"
                    width="108"
                    height="108"
                  />
                </div>

                <div class="mt-3 text-color" align="center" justify="center">
                  Overall Inventories
                </div>
              </router-link>
            </v-card>
          </v-col>

          <v-col xs3 cols="4" sm="4" md="4">
            <v-card
              class="pa-4 box_shadow_class"
            >
              <router-link :to="{ name: 'WmsGraph', params: { link: 'outward' }}">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Outward.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                   Outward
                </div>
              </router-link>
            </v-card>
          </v-col>

          <v-col xs3 cols="4" sm="4" md="4">
            <v-card
              class="pa-4 box_shadow_class"
            >
              <router-link :to="{ name: 'WmsGraph', params: { link: 'inward' }}">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/Inward.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                   Inward
                </div>
              </router-link>
            </v-card>
          </v-col>

          <v-col xs3 cols="4" sm="4" md="4">
            <v-card
              class="pa-4 box_shadow_class"
              @click=""
            > <router-link :to="{ name: 'WmsGraph', params: { link: 'onhand' }}">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/OnHandInv.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  On-hand
                </div>
              </router-link>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>

  <!-- <iframe width="100%" height="100%" src="https://datastudio.google.com/embed/reporting/45f20459-e563-4ba6-83ae-fe9c83a4dfbd/page/nb0qB" frameborder="0" style="border:0" allowfullscreen></iframe> -->

  <!-- <iframe width="100%" height="100%" src="https://datastudio.google.com/embed/reporting/3170d421-93ae-42bd-a66a-866b3ae599cb/page/p_xcfe0jk3mc" frameborder="0" style="border:0" allowfullscreen></iframe> -->

</template>

<!-- 
width - 1300
height - 700 -->


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
  export default {
    methods: {
    }
  }
</script>