<template>
  <div>
    <div class="header-fixed">
      <span style="float:left;margin-top:8px;margin-left:6px;">
        <img
          src="@/assets/logo.png"
          alt="Blubirch Logo"
        />
      </span>
      <span>
        <HeaderComponent :headerTitle="headerText" />
      </span>
    </div>

    <v-container class="ma-0 pa-0" fluid grid-list-lg>
      <v-layout class="ma-0 pa-0" row wrap>
        <v-flex class xs12 style="background-color:grey lighten-3">
          <v-row>
            <!-- <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget(item)">
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/wms_dashboard.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">Dashboard</div>
              </v-card>
            </v-col> -->


            <!-- Dashboard -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('dashboardNew')" >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/dashboard_icon.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Dashboard
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('rfDisposition')"
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/disposition.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Disposition
                </div>
              </v-card>
            </v-col>

            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('Disposition')"
              v-if="currentUser.roles.includes('forward_user')"
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/disposition.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Test
                </div>
              </v-card>
            </v-col>

            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('PRD')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('PRD') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/upload.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  PRD
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('NewDispatch')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('PRD') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/dispatch_new.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Dispatch
                </div>
              </v-card>
            </v-col>            
            
            <!-- Put Away module -->
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('PutAway')"
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/pickup.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Putaway/Pick Up
                </div>
              </v-card>
            </v-col>

            <!-- Inwarding Module -->

            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('IssueResolution')"
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/issue_resoluation.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Issue Resolution
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('pending_Return_Request_Approval')"
              v-if="
                  currentUser.roles.includes('central_admin') ||
                    currentUser.roles.includes('site_admin') ||
                    currentUser.product_access.includes('Alerts') ||
                    currentUser.product_access.includes('All')
                "
              >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/pending_return.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Pending Return Request Approval
                </div>
              </v-card>
            </v-col> 
            
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('PendingIssues')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('Issue Resolution') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/issues.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Issues
                </div>
              </v-card>
            </v-col>
           
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('threePClaim')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('Issue Resolution') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/3p_claim.svg"
                    width="108"
                    height="108"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  3p Claim
                </div>
              </v-card>
            </v-col>

            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('Report')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('Reports') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/reports.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Reports
                </div>
              </v-card>
            </v-col>

             <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('PhysicalInspection')"
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/pickup.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Physical Inspection
                </div>
              </v-card>
            </v-col>

            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('Settings')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/settings.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Settings
                </div>
              </v-card>
            </v-col>

            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('StnDocumentUploadList')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('STN Upload') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/upload.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  PRD Upload
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('WmsChart')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('WmsChart') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/dashboard.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Chart
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('ItemInfo')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('Item Information') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/service-ex-icon5.png"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Item Information
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('DocumentNumber')"
              v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('Document Search') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/archive-1.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Document Number
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('FileUploadList')"
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/lot_file_upload.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Lot File Upload
                </div>
              </v-card>
            </v-col>
            <v-col
              xs3
              cols="3"
              sm="3"
              md="3"
              @click="navigateTarget('InboundDocumentIndex')"
            v-if="
                currentUser.roles.includes('central_admin') ||
                  currentUser.roles.includes('site_admin') ||
                  currentUser.product_access.includes('Inbound Documents') ||
                  currentUser.product_access.includes('All')
              "
            >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img
                    class="mt-3"
                    src="@/assets/images/icons/inbound_documents_card.svg"
                  />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Documents List
                </div>
              </v-card>
            </v-col>
            <!-- Return Creation -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('RetunrCreation')"
              v-if="currentUser.roles.includes('central_admin') ||
              currentUser.roles.includes('site_admin') ||
              currentUser.product_access.includes('Inbound Documents') ||
              currentUser.product_access.includes('All') " >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/returns_creation_.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Return Creation
                </div>
              </v-card>
            </v-col>

           <!-- Retur Approval -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('ReturnApproval')"
              v-if="currentUser.roles.includes('central_admin') ||
              currentUser.roles.includes('site_admin') ||
              currentUser.product_access.includes('Inbound Documents') ||
              currentUser.product_access.includes('All') " >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/returns_creation_.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Return Approval
                </div>
              </v-card>
            </v-col>

            <!-- Reverse Pickup -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('ReversePickupNew')"
              v-if="currentUser.roles.includes('central_admin') ||
              currentUser.roles.includes('site_admin') ||
              currentUser.product_access.includes('Inbound Documents') ||
              currentUser.product_access.includes('All') " >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/returns_creation_.svg" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Reverse Pickup
                </div>
              </v-card>
            </v-col>

            <!-- Transfer -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('Transfer')"
              v-if="currentUser.roles.includes('central_admin') ||
              currentUser.roles.includes('site_admin') ||
              currentUser.product_access.includes('Inbound Documents') ||
              currentUser.product_access.includes('All') " >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/module-menu-3.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Transfer
                </div>
              </v-card>
            </v-col>
            <!-- Inward Tracking -->
            <v-col xs3 cols="3" sm="3" md="3" @click="navigateTarget('inwardTracking')"
              v-if="currentUser.roles.includes('central_admin') ||
              currentUser.roles.includes('site_admin') ||
              currentUser.product_access.includes('Inbound Documents') ||
              currentUser.product_access.includes('All') " >
              <v-card class="pa-4 box_shadow_class">
                <div align="center" justify="center">
                  <img class="mt-3" src="@/assets/images/icons/inward-tracking.png" />
                </div>
                <div class="mt-3 text-color" align="center" justify="center">
                  Inward Tracking
                </div>
              </v-card>
            </v-col>


          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
.header-fixed { background: #E5E5E5; position: sticky; top: 0; z-index: 9999;}
</style>

<script>
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active_tab: "Billing",
      headerText: "Warehouse Management System"
    };
  },
  components: {
    HeaderComponent
  },
  computed: mapState(["currentUser", "signedIn"]),
  methods: {
    loadData(tab) {
      this.active_tab = tab;
    },

    navigateTarget(routerName) {
      this.$router.push({ name: routerName });
    }
  }
};
</script>
