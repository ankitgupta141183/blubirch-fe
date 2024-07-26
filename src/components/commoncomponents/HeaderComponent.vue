<template>
  <div>
    <v-row class="main_header" >
      <v-col class="pl-4 response-font"  xs12 :cols="5" sm="5" md="5" style="color: #1B3A57;margin-top:10px">{{headerTitle}}
        <div
           class="return-class">
               <router-link 
                 style="font-size: 14px; color: #0357D0;" 
                 :to="{ name: 'liquidationNew'}"                 
                 ><span v-if="action == 'create_lot' || action == 'file_upload'" v-on:click="handleCreateLotClick">Create Lot (Competitive Bidding)</span>
                 <span v-if="assignBuyer == true || action == 're_publish'" v-on:click="handleCreateLotClickPending">Pending Decision</span>
                 <span v-if="action == 'create_moq' || action == 'price_grid'" v-on:click="handleCreateLotMOQ">Create Lots (MOQ)</span>
                 <span v-if="action == 'edit_lot' || action == 'edit_moq' || action == 'edit_lot_moq'"  v-on:click="handleEditLot">Pending Publish (B2B)</span>
                 <span v-if="action == 'view_moq_items'"  v-on:click="handleEditLot">In Progress (B2B)</span>
                 <span v-if="action == 're_publish_payment' || action == 'vie_moq_PD'" v-on:click="handleCreateLotClickPending">Pending Decision</span>
               </router-link> 
               <img
                  class="mt-3 image-align"
                   src="@/assets/images/icons/expand_more.svg"
                   width="7"
                   height="10"
                   v-if="createLotComtBidding == true || assignBuyer == true || action=='create_moq' || action == 'price_grid' || action == 'edit_moq' || action == 'edit_lot_moq' || action == 'view_moq_items' || action == 're_publish_payment' || action == 'vie_moq_PD'"
                   /> 
                   <span v-if="action == 'price_grid'">
                    <router-link 
                          style="font-size: 14px; color: #0357D0;" 
                          :to="{ name: 'CreateLotsMOQ'}"                 
                          ><span v-if="action == 'price_grid'" v-on:click="handleCreateLotMOQ2">Create Lot</span>
                        </router-link> 
                        <img
                        class="mt-3 image-align"
                        src="@/assets/images/icons/expand_more.svg"
                        width="7"
                        height="10"
                        v-if="action=='price_grid'"
                        /> 
                        <span>Price Grid</span>
                   </span>
                   <span>
                  <span v-if="action == 'create_lot'">Create Lot</span>
                   <span v-if="action == 'edit_lot'"> Edit Lot {{lotIdB2b}}</span>
                   <span v-if="action == 're_publish' || action == 're_publish_payment'"> Republish Lot {{lotIdB2b}}</span>
                   <span v-if="action == 'file_upload'">Upload Lot File</span>
                   </span>
                   <span>
                    <span v-if="assignBuyer == true"> Assign Lot {{lotIdB2b}} To A Buyer</span>
                    <span v-if="action == 'create_moq'">Create Lot</span>
                    <span v-if="action == 'edit_moq' || action == 'view_moq_items' || action == 'vie_moq_PD'"> Edit Lot {{lotIdB2b}} Inventory</span>
                    <span v-if="action == 'edit_lot_moq'"> Edit Lot {{lotIdB2b}} (Price Grid)</span>
                   </span>
              </div>
              <div class="return-class" v-if="returnCondition">
                <router-link style="font-size: 14px; color: #0357D0;" :to="routerLink">
                  <span v-if="routerLinkText.toLowerCase() === 'back'">
                    <img class="mt-3 image-align" src="@/assets/images/icons/back-arrow.svg" width="25" height="20" />
                    <span style="font-size: 14px; color: #0357D0;">Back</span>
                  </span>
                  <span v-else>
                    {{ routerLinkText }}
                  </span>
                </router-link>
                <span v-if="showImageArrow">
                  <img class="mt-3 image-align" src="@/assets/images/icons/expand_more.svg" width="7" height="10" />
                </span>
                <span>{{ componentName }}</span>
              </div>   
            </v-col>
      <v-col justify="center" xs2 :cols="7" sm="7" md="7" >
        <v-menu :close-on-content-click="false" :nudge-width="100" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <span style="margin-right: 10px;" class="pull-right">
              <img align="center" src="@/assets/images/icons/profile_icon.png" height="24" width="24" v-bind="attrs" v-on="on" />
            </span>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  style="text-align:right;  font-size: 18px;  color: #4f4f4f;"
                >Croma</v-list-item-title>
                <v-list-item-subtitle style="text-align:right">{{ this.user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <a class="logout-text" text @click="signOut" :disabled="logoutInProgress">
              <span v-if="!logoutInProgress">Logout</span>
               <span v-else>Please Wait...</span>
            </a>
          </v-card-actions>
        </v-menu>
        <span style="margin-right: 20px;" class="pull-right">
          <img align="center" src="@/assets/images/icons/bell_icons.png" height="24" width="24" />
        </span>
        <span style="margin-right: 20px;" class="pull-right">
          <img align="center" src="@/assets/images/icons/questions.png" height="24" width="24" />
        </span>
        <span class="pull-right" style="width: 123px; margin-right: 15px; margin-top: 7px;">
          <div class="profile_details">
            <span class="user-name" >{{ this.user.first_name }}</span>
            <span class="user-role">{{ this.user.roles[0] }}</span>
          </div>
        </span>
        <span style="margin-right: 20px; width: 160px;" class="pull-right">
          <v-autocomplete
            v-model="current_warehouse"
            :items="menu_items"
            item-text="code"
            @change="changeWarehouse"
            item-value="id"
            outlined
            dense
            color="primary"
            :label="menu_items[0].code"
          ></v-autocomplete>
        </span>
      </v-col>
    </v-row>
  </div>
</template>
<style >
.client-name {
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #4f4f4f;
}

.v-application a {
  color: #333333;
  font-weight: bold;
  font-size: 12px;
}
.v-application .pl-4 {
    padding-left: 23px!important;
}
.v-menu__content {
    background-color: #ffffff;
}
.user-name {
  font-size: 16px;
  line-height: 19.36px;
  text-align: right;
  font-weight: 400;
  color: #2D2D2D;
  position: relative;
  display: flex;
  justify-content: end;
}
.user-role {
  font-size: 12px;
  line-height: 14.52px;
  text-align: right;
  color: #9C9C9C;
  font-weight: 700;
  display: flex;
  position: relative;
  justify-content: end;
}

</style>

<script>
export default {
  // props: ["headerTitle","createLotComtBidding","lotIdB2b","assignBuyer","action", "returnCondition", "salesReturnCondition"],

  props: {
    headerTitle: {
      type: String,
      required: true,
    },
    createLotComtBidding: {
    },
    lotIdB2b: {
    },
    assignBuyer: {
    },
    action: {
    },
    salesReturnCondition: {
    },
    subLotQuantity:{

    },
    subLotsPossible:{},
    
    routerLink: {
      type: Object,
      default: () => ({ name: '' }),
    },
    routerLinkText: {
      type: String,
      default: '',
    },
    returnCondition: {
      type: Boolean,
      default: true,
    },
    showImage: {
      type: Boolean,
      default: true,
    },
    componentName: {
      type: String,
      default: '',
    },
  },
  computed: {
    showImageArrow() {
      return this.routerLinkText && this.componentName;
    },
  },
  data() {
    return {
      files: [],
      user:"",
      attachmentLabel: "Attachment Documents",
      menu_items: [],
      current_warehouse: '',
      number:0,
      logoutInProgress: false,
      possible_of_sublot:'',
      subLotsQuantity:''
    };
  },
  created() {
    this.user = this.$store.state.currentUser;
    this.menu_items = this.$store.state.currentUser.available_distribution_centers
    this.current_warehouse = this.$store.state.current_warehouse
    this.possible_of_sublot = this.$store.state.subLotsPossible
    this.subLotsQuantity = this.$store.state.subLotQuantity
  },
  components: {
    },
  methods: {
    fileAttachment(event) {
      let attachmentObj = {
        attachedfFiles: this.files,
      };
      this.$emit("clicked", attachmentObj);
    },
    async signOut() {
      if (this.logoutInProgress) {
        return;
      }
      this.logoutInProgress = true;
      try {
        await this.$http.secured.delete("/api/v1/logout");
        this.$store.commit("unsetCurrentUser");
        this.$store.commit("unsetSelectedLot");
        this.$store.commit("setCurrentWarehouse", { distribution_id: "" });
        this.$router.replace("/");
        this.$toast.success("Logout successful");
      } catch (error) {
        this.$toast.error("Error in logging out");
      } finally {
        this.logoutInProgress = false;
      }
    },

    changeWarehouse(){
      if (this.current_warehouse == 0){
        this.$store.commit("setCurrentWarehouse", {distribution_id: ''})
      }else{
        this.$store.commit("setCurrentWarehouse", {distribution_id: this.current_warehouse})
      }
      this.$router.go()
    },
    handleCreateLotClick(){
      this.$store.commit("setMessage", { 
        action:'create_lot'
      });      
    },
    handleCreateLotClickPending(){
      this.$store.commit("setMessage", { 
        action:'re_publish_return'
      }); 
    },
    handleCreateLotMOQ(){
      this.$store.commit("setMessage", { 
        action:'create_moq'
      }); 
    },
    handleCreateLotMOQ2(){
      this.$store.commit("setSubLotQuantity", {
            action:'create_moq_return',
            subLotQuantity: this.subLotsQuantity,
            subLotsPossible: this.possible_of_sublot
          }) 
    },
    handleEditLot(){
      if(this.action == 'view_moq_items'){
        this.$store.commit("setMessage", { 
        action:'edit_lot_view'
      });  
      }else{

        this.$store.commit("setMessage", { 
          action:'edit_lot'
        });  
      }
    },
    handleCreateLotClickPending(){    
        this.$store.commit("setMessage", {
        action:'re_publish_return'
        });     
      },
    handleNavigatePaymentTab(){
      this.$store.commit("setMessage", { 
        action:'re_publish_return_payment'
      }); 
    }
  },
};
</script>
<style>
.return-class{
    font-size: 14px !important;
    /* position: absolute !important;
    bottom: 24px !important;
    left: 24px !important; */
}
.image-align{
    margin-bottom: 10px;
    margin-left: 6px;
    margin-right: 6px;
}
 </style>
