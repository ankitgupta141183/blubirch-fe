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
            <h6 style="text-align: center;color: #666666;">Choose a new Password</h6>
          </v-card-text>
          <v-form @submit.prevent="resetPassword">
            <v-text-field
              @keyup.enter="new_pwd"
              dense
              class="pr-14 pl-12"
              solo
              v-model="new_pwd"
              label="New password"
              type="password"
            ></v-text-field>
            <v-text-field
              @keyup.enter="confirm_new_pwd"
              dense
              class="pr-14 pl-12"
              solo
              v-model="confirm_new_pwd"
              label="Confirm new password"
              type="password"
            ></v-text-field>
            <v-card-actions class="pl-12 pr-14">
              <v-btn @keyup.enter="resetPassword" type="submit" color="primary" small block>Change Password</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      email_id: this.$store.state.email,
      password_token: this.$store.state.password_token,
      new_pwd: "",
      confirm_new_pwd: "",
      email: '',
      new_user: false
    };
  },

  created(){
    if (this.$route.params.new_user){
      this.new_user = true
      this.email = this.$route.params.email
    }
  },
   methods: {
    resetPassword() {
      //this.verifyPassword()
      if (this.new_pwd == this.confirm_new_pwd){
        if (this.new_user){
          var url = "/api/v1/password_resets/change_password"
          var params = { email: this.email, password: this.new_pwd }
        }else{
          var url = "/api/v1/password_resets/reset"
          var params = { email: this.email_id, token: this.password_token, password: this.new_pwd }
        }
      this.$http.plain.post(url, params)
        .then((response) => {
          this.$store.commit('setVerificationEmail', {email: null})
          this.$store.commit('setPasswordToken', {password_token: null})
          this.$store.commit('setVerificationEmail', {email: null})
          this.$router.push({name: "Signin"}) 
          this.$toast.success("Password has been successfully reset");
        })
        .catch((error) => {
          this.$toast.error("Error in resetting password");
        });
      }
      else{
        this.$toast.error("Passwords entered are not matching with each other");
      }
    },
    verifyPassword(){

    },
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