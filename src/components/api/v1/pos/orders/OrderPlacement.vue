<template>
  <v-card>
    <v-app-bar style="background-color: #0357D0;" dense dark>
      <v-row class>
        <v-col class xs10 :cols="10">
          <span class="mdi mdi-arrow-left-thick"></span>

          <span>
            <span class>Order Placement</span>
          </span>
        </v-col>
        <v-col class xs2 :cols="2">
          <span class="float-right material-icons">list</span>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-carousel 
          cycle
          height="200"
          hide-delimiter-background
          show-arrows-on-hover
          >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>

    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <!-- <v-card> -->
                  <v-text-field
                    prepend-inner-icon="mdi-magnify"
                    v-model="search"
                    label="Search SKU/Item"
                    single-line
                  ></v-text-field>
                  <v-spacer></v-spacer>
                <!-- </v-card> -->
                <v-card row>
                  <!-- <v-card> -->
                    <v-row class="ma-0 pa-0">
                      <v-col xs6 :cols="6">
                        <div
                          class="subheading font-weight-medium"
                          style="color:#0357D0;"
                        >Order Items</div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col xs6 :cols="6">
                        <v-chip class="float-right" close outlined @click:close="chip3 = false">Clear Order</v-chip>
                      </v-col>
                      <v-divider></v-divider>

                      <v-col class="ma-0 pa-0" xs12 :cols="12">
                        <div class="ma-0 pa-0" three-line>
                          <div class="ma-0 pa-0" v-for="(item, index) in listitems">
                            <v-col xs12 :cols="12">
                              <v-divider class="ma-0 pa-0"></v-divider>
                            </v-col>

                            <v-row class="ma-0 pa-0">
                              <v-col class="ma-0 pa-0" xs4 :cols="4" md="1" sm="4">
                                <img
                                  class="float-left"
                                  style="margin-top:15px"
                                  src="@/assets/images/Mobile.png"
                                  @click="proceedGrading(item)"
                                />
                              </v-col>

                              <v-col class="ma-0 pa-0" xs8 :cols="7" md="11" sm="8">
                                <span class="text-color">{{item.title}}</span>
                                <span class="float-right material-icons">
                                delete
                                </span>
                                <div>{{item.subtitle}}</div>

                                <div>
                                  <span class="caption">
                                    <i class="mdi mdi-currency-inr"></i>
                                    {{item.mrp}}
                                  </span>

                                  <span class="caption text-color float-right">Total Amount</span>
                                </div>

                                <div>
                                  <span class="caption">Quantity: 43</span>

                                  <span class="caption float-right">₹43,000</span>
                                </div>
                              </v-col>
                            </v-row>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  <!-- </v-card> -->
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>

    <template absolute class="font-weight-medium">
      <div class="d-flex caption" style="background-color: #0357D0;color:white">
        <v-row class="ma-0 pa-0">
          <v-col xs8 :cols="8" md="10 " sm="8">
            <span>
              36 ITEMS |
              <i class="mdi mdi-currency-inr"></i>9,34,000
            </span>
          </v-col>
          <v-col xs4 :cols="4" md="2" sm="4">
            <a style="color:white;margin-left:28px" @click="continueOrder">CONTINUE</a>
            <!-- <v-btn block class="container" @click="continueOrder" xs12 color="primary" dark>Continue</v-btn> -->
          </v-col>
        </v-row>

        <!-- <span   style="margin-left:40px;width:70%">36 ITEMS | <i class="mdi mdi-currency-inr"></i>9,34,000</span>

        <span> <a class="float-right" style="color:white">Continue</a></span>-->
      </div>
    </template>
  </v-card>
</template>

<style>
/* .v-card {
  max-width: 98% !important;
}

.v-card-100 {
  max-width: 100% !important;
} */

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
</style> 

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://beam-saas.s3.amazonaws.com/Rectangle+1293.png',
        },
        {
          src: 'https://beam-saas.s3.amazonaws.com/dasdasd.png',
        },
        {
          src: 'https://beam-saas.s3.amazonaws.com/banner-image4.png',
        },
        {
          src: 'https://beam-saas.s3.amazonaws.com/banner-image2.png',
        },
      ],
      selected: [2],
      listitems: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000"
        }
      ],
      search: ""
    };
  },
  methods: {
    continueOrder () {
      this.$router.push({name: 'OrderSummary'})
    }
  }
};
</script>