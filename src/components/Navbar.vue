<template>
  <div>
    <div v-if="currentUser.roles && currentUser.roles.includes('superadmin')">
   <div class="header">
      <nav class="navbar navbar-expand-md navbar-light bg-light overflow-auto">
         <a href="#" class="navbar-brand">
         <img src="../assets/logo.png" height="28" alt="Blubirch Logo" />
         </a>
         <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            >
         <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
               <li class="nav-item dropdown">
                  <a
                     class="nav-link dropdown-toggle"
                     href="#"
                     id="navbarDropdown"
                     role="button"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                     >Manage</a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                     <router-link :to="{ name: 'ListAdminUsers'}" class="dropdown-item">Users</router-link>
                     <router-link :to="{ name: 'ListAdminRoles'}" class="dropdown-item">Roles</router-link>
                     <router-link
                        :to="{ name: 'ListAlertConfigurations'}"
                        class="dropdown-item"
                        >Alert Configurations</router-link>
                     <router-link :to="{ name: 'ListRepairParts'}" class="dropdown-item">Repair Parts</router-link>
                     <router-link
                        :to="{ name: 'ListAdminLookupkeys'}"
                        class="dropdown-item"
                        >Lookup Keys</router-link>
                     <router-link
                        :to="{ name: 'ListAdminLookupValues'}"
                        class="dropdown-item"
                        >Lookup Values</router-link>
                     <router-link :to="{ name: 'ListAdminClients'}" class="dropdown-item">Clients</router-link>
                     <router-link
                        :to="{ name: 'ListAdminDistributionCenters'}"
                        class="dropdown-item"
                        >Distribution Centers</router-link>
                     <router-link
                        :to="{ name: 'ListAdminAttributeMasters'}"
                        class="dropdown-item"
                        >Attribute Master</router-link>
                     <router-link :to="{ name: 'ListAdminCategories'}" class="dropdown-item">Categories</router-link>
                     <router-link
                        :to="{ name: 'ListAdminClientCategories'}"
                        class="dropdown-item"
                        >Client Categories</router-link>
                     <router-link
                        :to="{ name: 'NewAdminClientCategoryMapping'}"
                        class="dropdown-item"
                        >Client Categories Mapping</router-link>
                     <router-link
                        :to="{ name: 'ListAdminClientAttributeMasters'}"
                        class="dropdown-item"
                        >Client Attribute Masters</router-link>
                     <router-link
                        :to="{ name: 'ListAdminClientSkuMasters'}"
                        class="dropdown-item"
                        >Client Sku Masters</router-link>
                     <router-link
                        :to="{ name: 'ListAdminCostValues'}"
                        class="dropdown-item"
                        >Cost Values</router-link>
                     <router-link :to="{ name: 'ListAdminChannels'}" class="dropdown-item">Channels</router-link>
                     <router-link
                        :to="{ name: 'ListAdminCostLabels'}"
                        class="dropdown-item"
                        >Cost Labels</router-link>
                     <router-link :to="{ name: 'ListAdminOrders'}" class="dropdown-item">Orders</router-link>
                     <router-link
                        :to="{ name: 'ListAdminCustomerReturnReasons'}"
                        class="dropdown-item"
                        >Customer Return Reasons</router-link>
                     <router-link
                        :to="{ name: 'ListAdminEmailTemplates'}"
                        class="dropdown-item"
                        >Email Templates</router-link>
                     <router-link :to="{ name: 'ListAdminInvoices'}" class="dropdown-item">Invoices</router-link>
                     <router-link :to="{ name: 'ListAdminReminders'}" class="dropdown-item">Reminders</router-link>
                     <router-link
                        :to="{ name: 'ListAdminInvoiceInventoryDetails'}"
                        class="dropdown-item"
                        >Invoice Inventory Details</router-link>
                     <router-link
                        :to="{ name: 'ListAdminLogisticsPartners'}"
                        class="dropdown-item"
                        >Logistics Partner</router-link>
                     <router-link
                        :to="{ name: 'ListAdminQcConfigurations'}"
                        class="dropdown-item"
                        >Qc Configuration</router-link>
                     <router-link
                        :to="{ name: 'ListVendorMasters'}"
                        class="dropdown-item"
                        >List Vendor Masters</router-link>
                  </div>
               </li>
               <li class="nav-item dropdown">
                  <a
                     class="nav-link dropdown-toggle"
                     href="#"
                     id="navbarDropdown"
                     role="button"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                     >File Upload</a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                     <router-link
                        :to="{ name: 'ListAdminMasterFileUploads'}"
                        class="dropdown-item"
                        >Master File Upload</router-link>
                     <!-- <router-link
                        :to="{ name: 'AlertConfigurationUpload'}"
                        class="dropdown-item"
                        >Alert Configuration Upload</router-link> -->
                     <router-link
                        :to="{ name: 'ListAdminDistributionCenters'}"
                        class="dropdown-item"
                        >Admin Distribution Centers File Upload</router-link>
                     <router-link
                        :to="{ name: 'NewAdminRule'}"
                        class="dropdown-item"
                        >Upload Disposition Rules</router-link>
                     <router-link
                        :to="{ name: 'NewAdminClientRule'}"
                        class="dropdown-item"
                        >Upload Client Disposition Rules</router-link>
                     <router-link
                        :to="{ name: 'NewVendorMaster'}"
                        class="dropdown-item"
                        >Upload Vendor Masters</router-link>
                  </div>
               </li>
               <li class="nav-item dropdown">
                  <a
                     class="nav-link dropdown-toggle"
                     href="#"
                     id="navbarDropdown"
                     role="button"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                     >DMS Admin</a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                     <router-link
                        :to="{ name: 'DMSCustomerDetails'}"
                        class="dropdown-item"
                        >Dealer Registration</router-link>
                     <router-link :to="{ name: 'DMSCatalogue'}" class="dropdown-item">Promotions</router-link>
                  </div>
               </li>
            </ul>
            <div class="navbar-nav ml-auto">
               <a href="/" class="nav-item nav-link" v-if="!signedIn">Login</a>
               <span href="/" class="nav-item nav-link" v-if="signedIn">{{currentUser.username}} |</span>
               <a
                  href="javascript:void(0)"
                  class="nav-item nav-link"
                  v-if="signedIn"
                  @click="signOut"
                  >Logout</a>
            </div>
         </div>
      </nav>
   </div>
</div>

    <!-- Navbar for Non-Admin Screens -->
    <div
      v-if="currentUser.roles && (currentUser.roles.includes('default_user') || (currentUser.roles.includes('site_admin') || currentUser.roles.includes('central_admin')))"
    >
      <div class="side_navbar">
        <nav id="sidebar" class="active mobilealign overflow-auto">
          <div class="sidebar-header">
            <div class="menu_logos1 sidebarCollapse">
              <router-link :to="{ name: 'WmsDashboard'}">
                <img src="@/assets/logo.png" class="img-fluid" />
              </router-link>
              <h3>
                Blubirch
                <span>Creating Sustainable value</span>
              </h3>
            </div>
          </div>

          <div class="menu_divide">
            <div class="list-unstyled components">
                <router-link :to="{ name: 'dashboardNew' }">
                  <div>
                    <img src="@/assets/images/icons/dashboard_icon.png" width="25" height="25" class="img-fluid" />
                  </div>
                  <div>
                    <span class="navbar-text">Dashboard</span>
                  </div>
                </router-link>
            </div>
            <!-- disposition -->
            <div class="list-unstyled components">
              <router-link :to="{ name: 'rfDisposition'}">
                <div>
                  <img
                    src="@/assets/images/icons/disposition.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Disposition</span>
                </div>
              </router-link>
            </div>
            <!-- Prd module -->
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('PRD') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'PRD'}">
                <div>
                  <img
                    src="@/assets/images/icons/upload.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">PRD</span>
                </div>
              </router-link>
            </div>
            <!-- Dispatch -->
            <div class="list-unstyled components">
              <router-link :to="{ name: 'NewDispatch'}">
                <div>
                  <img
                    src="@/assets/images/icons/dispatch_new.png"
                    width="30"
                    height="30"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Dispatch</span>
                </div>
              </router-link>
            </div>
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Lot File Upload') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'FileUploadList'}">
                <div>
                  <img
                    src="@/assets/images/icons/lot.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">File Upload</span>
                </div>
              </router-link>
            </div>
            <!-- Put away module -->
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Putaway') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'PutAway'}">
                <div>
                  <img
                    src="@/assets/images/icons/pickup.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Putaway/Pick Up</span>
                </div>
              </router-link>
            </div>

            <!-- Inwarding Screens -->

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Issue Resolution') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'IssueResolution'}">
              <div>
                <img src="@/assets/images/icons/issue_resoluation.svg" width="25" height="25" class="img-fluid" />
              </div>
              <div>
                <span class="navbar-text">Issue Resolution</span>
              </div>
              </router-link>
            </div>
            <!-- pending return request screen -->
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('pending retuen request approval') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'pending_Return_Request_Approval'}">
                <div>
                  <img
                    src="@/assets/images/icons/pending_return.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Pending Return Request Approval</span>
                </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Issue Resolution') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'PendingIssues'}">
                <div>
                  <img
                    src="@/assets/images/icons/issues.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Issues</span>
                </div>
              </router-link>
            </div>
            <!-- physical Inspection -->
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Putaway') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'PhysicalInspection' }">
                <div>
                  <img src="@/assets/images/icons/pickup.svg" width="25" height="25" class="img-fluid" />
                </div>
                <div>
                  <span class="navbar-text">Physical Inspection</span>
                </div>
              </router-link>
            </div>
            <!-- physical Inspection -->
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Putaway') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'physicalinspectionApproval' }">
                <div>
                  <img src="@/assets/images/pending_return.svg" width="25" height="25" class="img-fluid" />
                </div>
                <div>
                  <span class="navbar-text">Pending approvals</span>
                </div>
              </router-link>
            </div>
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Reports') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'Report'}">
              <div>
                <img
                  src="@/assets/images/icons/reports.svg"
                  width="25"
                  height="25"
                  class="img-fluid"
                />
              </div>
              <div>
                <span class="navbar-text">Reports</span>
              </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin')">
              <router-link :to="{ name: 'Settings'}">
              <div>
                <img
                  src="@/assets/images/icons/settings.svg"
                  width="25"
                  height="25"
                  class="img-fluid"
                />
              </div>
              <div>
                <span class="navbar-text">Settings</span>
              </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('STN Upload') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'StnDocumentUploadList'}">
                <div>
                  <img
                    src="@/assets/images/icons/upload.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">PRD upload</span>
                </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('WmsChart') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'WmsChart'}">
              <div>
                <img src="@/assets/images/icons/dashboard.svg" width="33" height="33" class="img-fluid" />
              </div>
              <div>
                <span class="navbar-text">Chart</span>
              </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Item Information') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'ItemInfo'}">
              <div>
                <img src="@/assets/images/icons/service-ex-icon5.png" width="33" height="33" class="img-fluid" />
              </div>
              <div>
                <span class="navbar-text">Item Information</span>
              </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Document Search') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'DocumentNumber'}">
              <div>
                <img src="@/assets/images/icons/archive-1.png" width="33" height="33" class="img-fluid" />
              </div>
              <div>
                <span class="navbar-text">Document Number</span>
              </div>
              </router-link>
            </div>

            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Inbound Documents') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'InboundDocumentIndex'}">
              <div>
                <img src="@/assets/images/icons/inbound-document.svg" width="33" height="33" class="img-fluid" />
              </div>
              <div>
                <span class="navbar-text">Documents List</span>
              </div>
              </router-link>
            </div>
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Issue Resolution') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'threePClaim'}">
                <div>
                  <img
                    src="@/assets/images/icons/3p_claim.svg"
                    width="25"
                    height="25"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">3P Claim</span>
                </div>
              </router-link>
            </div>
            <!-- Return Creation -->
            <div class="list-unstyled components" v-if="currentUser.roles.includes('central_admin') || currentUser.roles.includes('site_admin') || currentUser.product_access.includes('Inbound Documents') || currentUser.product_access.includes('All')">
              <router-link :to="{ name: 'RetunrCreation' }">
                <div>
                  <img src="@/assets/images/icons/returns_creation_.svg" width="33" height="33" class="img-fluid" />
                </div>
                <div>
                  <span class="navbar-text">Return Creation</span>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Transfer -->
          <div class="list-unstyled components">
              <router-link :to="{ name: 'Transfer'}">
                <div>
                  <img
                    src="@/assets/images/icons/module-menu-3.png"
                    width="30"
                    height="30"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Transfer</span>
                </div>
              </router-link>
            </div>

            <!-- Inward Tracking -->
            <div class="list-unstyled components">
              <router-link :to="{ name: 'inwardTracking'}">
                <div>
                  <img
                    src="@/assets/images/icons/inward-tracking.png"
                    width="30"
                    height="30"
                    class="img-fluid"
                  />
                </div>
                <div>
                  <span class="navbar-text">Inward Tracking</span>
                </div>
              </router-link>
            </div>


          <!-- <div class="head_profil" v-if="currentUser.username === 'store_user'">
            <div class="menu_profile">
              <img src="@/assets/images/profile-img-1.jpg" />
            </div>
            <div class="user-font" style="display: block !important;">
              Vyom
              <span style="margin-top:10px">
                <a class="logout-text" href="javascript:void(0)" @click="signOut">Logout</a>
              </span>
            </div>
          </div>
          <div class="head_profil" v-else-if="currentUser.username === 'service_executive'">
            <div class="menu_profile">
              <img src="@/assets/images/profile-img-2.svg" />
            </div>
            <div class="user-font" style="display: block !important;">
              Ayush
              <span style="margin-top:10px">
                <a class="logout-text" href="javascript:void(0)" @click="signOut">Logout</a>
              </span>
            </div>
          </div>
          <div class="head_profil" v-else-if="currentUser.username === 'warehouse'">
            <div class="menu_profile">
              <img src="@/assets/images/profile-img-3.svg" />
            </div>
            <div class="user-font" style="display: block !important;">
              Ganesh
              <span style="margin-top:10px">
                <a class="logout-text" href="javascript:void(0)" @click="signOut">Logout</a>
              </span>
            </div>
          </div>
          <div class="head_profil" v-else>
            <div class="menu_profile">
              <img src="@/assets/images/profile-img-1.jpg" />
            </div>
            <div class="user-font" style="display: block !important;">
              Max
              <span style="margin-top:10px">
                <a class="logout-text" href="javascript:void(0)" @click="signOut">Logout</a>
              </span>
            </div>
          </div> -->
        </nav>
      </div>
    </div>
  </div>
</template>
<style>
a:link {
  text-decoration: none !important;
  cursor: pointer;
}
.list-unstyled {
    padding-left: 0;
    list-style: none;
    /*height: 68px;*/
}
.sidebar-header {
  position:sticky;
  top: 0px;
}
</style>

<script>
import $ from "jquery";
import { mapState } from "vuex";

$(document).ready(function () {
  $(".sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active_a");
  });
});

export default {
  name: "NavHeader",
  data() {
    return {
      currentComponent: "",
    };
  },
  computed: mapState(["currentUser", "signedIn"]),

  created() {
    if (this.signedIn === false) {
      if (!(this.$route.name === "EmailVerification" || this.$route.name === "OTPVerification" || this.$route.name === "ResetPassword" || this.$route.name === "Quotation" || this.$route.name === "PrivacyPolicy" || this.$route.name === "approveStatus" || this.$route.name === 'ApprovalRequest' || this.$route.name === 'RejectRequest')){
        this.$router.replace("/signin");
      }
    }
    this.currentComponent = this.$route;
  },
  methods: {
    signOut() {
      this.$http.secured
        .delete("/api/v1/logout")
        .then((response) => {
          this.$store.commit("unsetCurrentUser");
          this.$store.commit("unsetSelectedLot");
          this.$router.replace("/");
          this.$toast.success("Logout successful");
        })
        .catch((error) => {
          this.$toast.error("Error in logging out");
        });
    },
    showAdminLink() {
      return this.$store.getters.isAdmin || this.$store.getters.isManager;
    },
    open_side_nav() {
      $("#sidebar").toggleClass("active");
    },
  },
};
</script>

<style type="text/css" scoped>
@media print {
  body * {
    visibility: hidden;
  }
}
</style>
