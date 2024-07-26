<template>
  <v-card>
          <v-app-bar class="pa-4" style="background-color: #0357D0;height:120px;" dark>
      <v-row class>
        <v-col class xs10 :cols="10">
          <span class="ma-0 mdi mdi-arrow-left-thick"></span>

          <span>
            <span class>Master Item List</span>
          </span>
        </v-col>
        <v-col class xs2 :cols="2">
         <span class="float-right material-icons">filter_list </span>
        </v-col>
        <v-text-field
                   hide-details
                   light
                    prepend-inner-icon="mdi-magnify"
                    solo
                    v-model="search"
                    label="Search SKU/Item"
                    single-line
                  ></v-text-field>
      </v-row>
      <!-- <v-row class>
          <v-col class xs12 :cols="12" :sm="12">
                <v-text-field
                   hide-details
                   light
                    prepend-inner-icon="mdi-magnify"
                    solo
                    v-model="search"
                    label="Search SKU/Item"
                    single-line
                  ></v-text-field>
          </v-col>
      </v-row> -->
    </v-app-bar>
    
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <!-- <v-card row> -->
                  <!-- <v-card> -->
                    <v-row class="ma-0 pa-0">
                         <v-col class="ma-0 pa-0" xs12 :cols="12">
                      <div class="ma-0 pa-0" three-line>
                        <div class="ma-0 pa-0" v-for="(item, index) in listitems">
                          <v-col xs12 :cols="12">
                            <!-- <v-divider class="ma-0 pa-0"></v-divider> -->
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
                              <div>{{item.subtitle}}</div>

                              <div>
                                  MRP:
                                <span class="caption">
                                  <i class="mdi mdi-currency-inr"></i>
                                  {{item.mrp}}
                                </span>
                              </div>

                              <div>
                                <span class="caption">Available: 0 Inv.</span>
                                <v-btn class="float-right" small color="primary">Add</v-btn>
                              </div>
                            </v-col>
                          </v-row>
                          <v-divider class="ma-4 pa-0"></v-divider>
                        </div>
                      </div>
                    </v-col>
                    </v-row>
                  <!-- </v-card> -->
                
                <!-- </v-card> -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
        <template absolute class="font-weight-medium">
      <v-btn block class="container" @click="proceedOrder" xs12 color="primary" dark>Proceed</v-btn>
    </template>
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
</style> 

<script>
export default {
  data() {
    return {
      selected: [2],
      listitems: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "CODE436545",
          subtitle: "Ampere Engine Single Cylinder G 435 A IV",
          mrp: "1,000",
        },
      ],
    search: ""
    };
  },
  methods: {
    proceedOrder () {
      this.$router.push({name:'OrderPlacement'})
    }
  }
};
</script>