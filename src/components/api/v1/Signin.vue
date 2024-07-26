<template>
  <v-layout row class="text-xs-center">
    <v-flex xs8 class="fullheight">
      <img
        src="@/assets/images/16613 1.png"
        style="height:100%;"
        class="img-fluid"
      />
      <div class="hero_carous">
        <h3>
          Transform Reverse Supply Chain
        </h3>
        <h4>
          Blubirch uses data and automation to improve
          <br />omni-channel returns process for better customer
          <br />experience, profitability and sustainability.
        </h4>
      </div>
    </v-flex>
    <v-flex xs4 class="fullheight">
      <v-container
        style="position: relative;height: 100%;background-color: #ffffff;"
        class="text-xs-center"
      >
        <v-card flat>
          <v-card-title primary-title class="justify-center pt-4">
            <img src="@/assets/images/login-logo.png" class="login_logo1" />
          </v-card-title>
          <v-card-title primary-title class="justify-center">
            <img
              src="@/assets/images/Group 19@3 1.png"
              height="280"
              width="308"
            />
          </v-card-title>
          <v-card-title primary-title class="justify-center pl-0">
            <h4>Log in to your account</h4>
          </v-card-title>
          <v-form @submit.prevent="signin">
            <v-text-field
              dense
              class="pr-14 pl-12"
              solo
              v-model="login"
              placeholder="Enter Email"
            ></v-text-field>
            <v-text-field
              dense
              class="pr-14 pl-12"
              solo
              v-model="password"
              placeholder="Enter Password"
              :append-icon="value ? 'visibility' : 'visibility_off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
            ></v-text-field>

            <div class="pr-14" style="text-align:right; margin-top: 30px;">
              <a
                href="/email_verification"
                style="text-decoration:none;"
                class="forgot-pass"
                >Forgot Password?</a
              >
            </div>
            <v-card-actions class="pl-12 pr-14">
              <v-btn
                class="text-none"
                style="background-color:#0357D0 !important"
                @keyup.enter="signin"
                type="submit"
                color="primary"
                small
                block
                :disabled="loading"
                >{{ loading ? 'Signing in...' : 'Sign in' }}</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
        <div class="text-center mt-9">
          <router-link class="orange--text darken-3" to="/privacy_policy"
            >PRIVACY POLICY</router-link
          >
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      login: "",
      password: "",
      value: String,
      iconcolor: "grey darken-2",
      loading: false,
    };
  },
  created() {
    this.checkSignedIn();
    this.signOut();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signOut() {
      this.$http.secured
        .delete("/api/v1/logout")
        .then(response => {
          this.$store.commit("unsetCurrentUser");
          this.$store.commit("unsetSelectedLot");
          this.$router.replace("/");
        })
        .catch(error => {
          this.$toast.error("Error in logging out");
        });
    },

    signin() {
  if (this.loading) {
    return;
  }  
  this.loading = true;
  const credentials = btoa(`${this.login}:${this.password}`);
  this.$http.plain
    .post("/api/v1/login", {
      user: { credentials }
    })
    .then(response => this.signinSuccessful(response))
    .catch(error => this.signinFailed())
    .finally(() => {
      this.loading = false;
    });
},
    signinSuccessful(response) {
      if (!response.headers.authorization) {
        //  this.signinFailed(response);
        return;
      }

      if (response.data.user.sign_in_count <= 1) {
        this.$router.push({
          name: "ResetPassword",
          params: { email: response.data.user.email, new_user: true }
        });
        this.$toast.success(
          "Signed in successfully Please change your password first"
        );
        return;
      }
      this.$store.commit("setCurrentUser", {
        currentUser: response.data.user,
        authorization: response.headers.authorization
      });

      if (response.data.user.roles.includes("store_user")) {
        // this.$router.push({name: 'SearchInvoiceNumber'})
        this.$router.push({ name: "WmsDashboard" });
      } else if (response.data.user.roles.includes("service_executive")) {
        // this.$router.push({name: 'PendingApproval'})
        this.$router.push({ name: "WmsDashboard" });
      } else if (response.data.user.roles.includes("warehouse")) {
        // this.$router.push({name: 'ReInwardInventry'})
        this.$router.push({ name: "WmsDashboard" });
      } else if (response.data.user.roles.includes("superadmin")) {
        this.$router.push({ name: "ListAdminUsers" });
      } else if (response.data.user.roles.includes("dealer_user")) {
        // this.$router.push({name: 'DMSOrders'})
        this.$router.push({ name: "WmsDashboard" });
      } else if (response.data.user.roles.includes("forward")) {
        this.$router.push({ name: "ForwardDashboard" });
      } else {
        // this.$router.push({name: 'ListAdminRoles'})
        this.$router.push({ name: "WmsDashboard" });
      }
      this.$toast.success("Signed in successfully");
    },
    signinFailed() {
      this.$store.commit("unsetCurrentUser");
      this.$toast.error("Invalid Username & Password", { duration: 1000 });
    },
    checkSignedIn() {
      if (this.$store.state.signedIn) {
        if (this.$store.state.role === "superadmin") {
          this.$router.replace("/admin/roles");
        } else if (this.$store.state.role === "store_user") {
          this.$router.replace("/store/return_request");
        } else if (this.$store.state.role === "dealer_user") {
          this.$router.replace("/dms/orders");
        } else if (this.$store.state.role === "service_executive") {
          this.$router.replace("/management/approveRequest");
        }
      }
    }
  }
};
</script>

<style type="text/css" scoped>
.form-signin {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
}
.signin_left_margin {
  margin-left: -100px;
}
.fullheight {
  height: 100vh;
}
</style>
