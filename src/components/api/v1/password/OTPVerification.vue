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
      <v-container style="position: relative;" class="text-xs-center">
        <v-card flat>
          <v-card-title primary-title class="justify-center pt-4">
            <img src="@/assets/images/login-logo.png" class="login_logo1" />
          </v-card-title>
          <v-card-title primary-title class="justify-center">
            <img src="@/assets/images/Group 19@3 1.png" height="160" width="180" />
          </v-card-title>
          <v-card-title primary-title class="justify-center pl-0">
            <h4>Can't log in?</h4>
          </v-card-title>
          <v-card-text class="justify-center pl-0">
            <h6 style="text-align: center;color: #666666;">We have sent you an OTP at</h6>
            <h6 style="text-align: center;">{{email_id}}</h6>
          </v-card-text>
          <v-form @submit.prevent="otp_verify">
            <v-text-field
              @keyup.enter="otp"
              dense
              class="pr-14 pl-12"
              solo
              type="number"
              v-model="input_otp"
              label="Enter OTP"
            ></v-text-field>
            <v-card-actions class="pl-12 pr-14">
              <v-btn @keyup.enter="otp_verify" type="submit" color="primary" small block>Verify</v-btn>
            </v-card-actions>
            <div class="pr-14" style="text-align: center;">
              <a href="/" style="text-decoration:none;text-align: left;" class="forgot-pass">Return to Login</a>
              <span style="color: #1976d2;">&nbsp; | &nbsp;</span>
              <a href="javascript:void(0);" @click="resendOtp();" style="text-decoration:none;text-align: right;" class="forgot-pass">Resend OTP</a>
            </div>
          </v-form>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "OTPVerification",
  data() {
    return {
      otp : this.$store.state.otp,
      email_id: this.$store.state.email, 
      input_otp: "",      
    };
  }, 
  methods: {
    otp_verify() {
      this.input_otp = parseInt(this.input_otp);
      if (this.otp === this.input_otp){
        this.$http.plain.post("/api/v1/password_resets/edit", { email: this.email_id })
          .then((response) => {
            this.$store.commit('setPasswordToken', {password_token: response.data})
            this.$store.commit('setOTP', {otp: null})
            this.$router.push({name: "ResetPassword"}) 
            this.$toast.success("Email Verified");
          })
          .catch((error) => {
            this.$toast.error("Error in email verification");
          });
      }
      else{
        this.$toast.error("Entered OTP did not match"); 
      }
    },
    resendOtp(){
      this.$store.commit('setPasswordToken', {password_token: null})
      this.$store.commit('setOTP', {otp: null})
      this.otp = null
      this.input_otp = null
      this.$http.plain.post("/api/v1/password_resets/send_otp", { email: this.email_id })
        .then((response) => {
          this.otp = response.data
          this.$store.commit('setOTP', {otp: response.data})
          this.$store.commit('setVerificationEmail', {email: this.email_id})
          this.$router.push({name: "OTPVerification"}) 
          this.$toast.success("OTP has been sent to your email");
        })
        .catch((error) => {
          this.$toast.error("Error in email verification");
        });
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