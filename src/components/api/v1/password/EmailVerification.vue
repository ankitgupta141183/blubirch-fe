<template>
  <v-layout row class="text-xs-center">
    <v-flex xs8 class="fullheight">
      <img src="@/assets/images/16613 1.png" style="height:100%;" class="img-fluid" />
      <div class="hero_carous">
        <h3>
          Transform Reverse
          Supply Chain
        </h3>
        <h4>
          Blubirch uses data and automation to improve
          <br />omni-channel returns process for better customer
          <br />experience, profitability and sustainability.
        </h4>
      </div>
    </v-flex>
    <v-flex xs4 class="fullheight">
      <v-container style="position: relative;height: 100%;background-color: #ffffff;" class="text-xs-center">
        <v-card flat>
          <v-card-title primary-title class="justify-center pt-4">
            <img src="@/assets/images/login-logo.png" class="login_logo1" />
          </v-card-title>
          <v-card-title primary-title class="justify-center">
            <img src="@/assets/images/Group 19@3 1.png" height="280" width="308" />
          </v-card-title>
          <v-card-title primary-title class="justify-center pl-0">
            <h4>Can't log in?</h4>
          </v-card-title>
          <v-form ref="emailForm" @submit.prevent="email_verify">
            <div class="pr-14 pl-12 mb-3 font-weight-bold">We’ll send a recovery link to</div>
            <v-text-field
              @keyup.enter="email_id"
              dense
              class="pr-14 pl-12"
              solo
              v-model="email_id"
              :rules = "emailRules"
              label="Enter Email"
            ></v-text-field>
            <v-card-actions class="pl-12 pr-14">
              <v-btn @keyup.enter="signin" type="submit" color="primary" small block>Send OTP</v-btn>
            </v-card-actions>
            <div class="pr-14" style="text-align: center;">
              <a href="/" style="text-decoration:none;" class="forgot-pass">Return to Login</a>
            </div>
          </v-form>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "EmailVerification",
  data() {
    return {
      email_id: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
    };
  },
  methods: {
    email_verify() {
      if(this.$refs.emailForm.validate()){
        this.$http.plain.post("/api/v1/password_resets/send_otp", { email: this.email_id })
          .then((response) => {
            if (response.data.status == "unprocessable_entity"){
              this.$toast.error("User not found");
            }
            else{
              this.$store.commit('setOTP', {otp: response.data.otp})
              this.$store.commit('setVerificationEmail', {email: this.email_id})
              this.$router.push({name: "OTPVerification"}) 
              this.$toast.success("Email Verified");
            }
          })
          .catch((error) => {
            this.$toast.error("Error in email verification");
          });
      }
    }
  },  
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