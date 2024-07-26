<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New user</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminUsers'}">List Users</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form  @submit.prevent="addUser"  novalidate="true" >

        <div class="row">
          <div class="col-4 form-item mb-3" >
            <label for="user_first_name" class="d-flex">First Name</label>
            <input type="text" id="user_first_name" class="form-control" autofocus autocomplete="off" placeholder="First Name" v-model="newUser.first_name"  @keyup="onlyLatter" :class="{'is-invalid': $v.newUser.first_name.$error , 'is-valid': !$v.newUser.first_name.$invalid}"/>
              <div class="invalid-feedback">
                <span v-if="!$v.newUser.first_name.required">First Name is required</span>
              </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="user_last_name" class="d-flex">Last Name</label>
            <input type="text" id="user_last_name" class="form-control" autocomplete="off" placeholder="Last Name" v-model.trim="newUser.last_name"  @keyup="onlyLatter" :class="{'is-invalid': $v.newUser.last_name.$error , 'is-valid': !$v.newUser.last_name.$invalid}" />
              <div class="invalid-feedback">
                <span v-if="!$v.newUser.last_name.required">Last Name is required</span>
              </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="user_email" class="d-flex">Email</label>
            <input type="text" id="user_email" class="form-control" autocomplete="off" placeholder="Email" v-model="newUser.email" :class="{ 'is-invalid': $v.newUser.email.$error , 'is-valid': !$v.newUser.email.$invalid}" />
            <div class="invalid-feedback">
              <span v-if="!$v.newUser.email.required">Email is required</span>
              <span v-else-if="!$v.newUser.email.email">Email is invalid</span>
          </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="user_username" class="d-flex">Username</label>
            <input type="text" id="user_username" class="form-control" autocomplete="false" readonly onfocus="this.removeAttribute('readonly');" style="background-color:#fff" placeholder="Username" v-model="newUser.username"  :class="{ 'is-invalid': $v.newUser.username.$error , 'is-valid': !$v.newUser.username.$invalid}" v-on:change="checkUsername"/>
            <div v-if="username_present">
                <div class="warning_img" style="text-align: center;">
                  <div class="warnig_imgw">
                    User Name Already Exists               
                 </div>
                </div>
              </div>
             <div class="invalid-feedback">
                <span v-if="!$v.newUser.username.required">User Name is required</span>
              </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="user_contact_no" class="d-flex">Contact Number</label>
            <input type="text" id="user_contact_no" class="form-control" autocomplete="off" placeholder="Contact Number" v-model="newUser.contact_no"  @keyup="onlyNumeric" :class="{ 'is-invalid': $v.newUser.contact_no.$error , 'is-valid': !$v.newUser.contact_no.$invalid}"/>
            <div class="invalid-feedback">
            <span v-if="!$v.newUser.contact_no.required">Number is required</span>
              <span v-else-if="!$v.newUser.contact_no.minLength">Number is invalid</span>
              <span v-else-if="!$v.newUser.contact_no.maxLength">Number is invalid</span>
            </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="user_password" class="d-flex">Password</label>
            <input type="password" id="user_password" class="form-control" autocomplete="false" readonly onfocus="this.removeAttribute('readonly');"  style="background-color:#fff"  placeholder="Password" v-model="newUser.password" :class="{'is-invalid': $v.newUser.password.$error}"/>
            <div class="invalid-feedback">
                <span v-if="!$v.newUser.password.required">Password is required</span>
                <span v-else-if="!$v.newUser.password.minLength">Password too short</span>

              </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="user_password_confirmation" class="d-flex">Confirmation Password</label>
            <input type="password" id="user_password_confirmation" class="form-control" autocomplete="false" readonly onfocus="this.removeAttribute('readonly');"  style="background-color:#fff"  placeholder="Passwod Confirmation" v-model="newUser.password_confirmation" :class="{ 'is-invalid': $v.newUser.password_confirmation.$error }"/>
            <div class="invalid-feedback">
                <span v-if="!$v.newUser.password_confirmation.required">Password is required</span>
                <span v-else-if="!$v.newUser.password_confirmation.sameAsPassword">Passwords must match</span>              
              </div>
            </div>
          <div class="col-4 form-item mb-3">
            <label for="roles" class="d-flex">Roles</label>
            <multiselect id="roles" placeholder="Select Role(s)" v-model= "newUser.roles" :options="roles" label="name" :multiple=" true" track-by="id" @input="assignRole" :class="{ 'is-invalid': $v.newUser.role_ids.$error }"></multiselect>
            <div class="invalid-feedback">
                <span v-if="!$v.newUser.role_ids.required">Role is required</span>
              </div>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="roles" class="d-flex">Distribution Centers</label>
            <multiselect id="distribution_centers" placeholder="Select Distribution Center" :options="distribution_centers" :multiple=" true" label="name" track-by="id" @input="assignDistributionCenter" v-model= "newUser.distribution_centers" :class="{ 'is-invalid': $v.newUser.distribution_center_ids.$error }"></multiselect>
            <div class="invalid-feedback">
                <span v-if="!$v.newUser.distribution_center_ids.required">Distribution center is required</span>
              </div>
          </div>
        </div>

        <div class="row">
          <div class="align-self-center mx-auto">
            <input type="submit" value="Add User" class="btn btn-primary my-2" />
          </div>
        </div>

      </form>
      
    </div>
  </div>	

</template>



<script>
import { required, email, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      newUser: {
         'first_name': '',
         'last_name': '',
         'email': '',
         'username': '',
          'password': '',
          'contact_no': '',
          'role_ids': '',
          'distribution_center_ids': '',
          'password_confirmation': '',
      },
      roles: [],
      distribution_centers: [],
      username_present: false
    }
  },
  validations: {
    newUser: {
      first_name: { required },
      last_name: { required },
      username: { required },
      email: { required, email},
      role_ids: { required},
      distribution_center_ids: {required},
      contact_no: {required, minLength: minLength(10) , maxLength: maxLength(10)},
      password: {required,  minLength: minLength(6)},
      password_confirmation: { required, sameAsPassword: sameAs('password') }

    }
  },
  created () {

    

    this.$http.secured.get('/admin/distribution_centers?select=true')
      .then(response => { this.distribution_centers = response.data.distribution_centers })
      .catch(error => this.$toast.error('Error in getting distribution centers'))

    this.$http.secured.get('/admin/roles')
      .then(response => { this.roles = response.data.roles })
      .catch(error => this.$toast.error('Error in getting roles'))
  },
  methods: {
    checkUsername(){
      this.$http.secured.get('/admin/users/get_username',{ params: { username : this.newUser.username}})
      .then(response => { if(response.data  != null){
                        this.username_present = true
                        return;

                } })

    },
    onlyNumeric() {
     this.newUser.contact_no = this.newUser.contact_no.replace(/[^0-9]/g, '');
     },

     onlyLatter() {
        this.newUser.first_name = this.newUser.first_name.replace(/[^A-Za-z]/g, "");
        this.newUser.last_name = this.newUser.last_name.replace(/[^A-Za-z]/g, "");
     },

    addUser () {
      this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }



      this.$http.secured.post('/admin/users',
        { user:
          { first_name: this.newUser.first_name,
            last_name: this.newUser.last_name,
            email: this.newUser.email,
            username: this.newUser.username,
            contact_no: this.newUser.contact_no,
            password: this.newUser.password,
            password_confirmation: this.newUser.password_confirmation,
            role_ids: this.newUser.role_ids,
            distribution_center_ids: this.newUser.distribution_center_ids
          }
        })
        .then(response => {
          this.$router.push('/admin/users')
          this.$toast.success('User successfully created')
        })
        .catch(error => this.$toast.success('Error in creating user'))
    },
    assignDistributionCenter () {
      if (this.newUser.distribution_centers != null) {
        let distributionCenterIds = this.newUser.distribution_centers.map(
          function (distributionCenter) {
            return distributionCenter.id
          })
        this.newUser.distribution_center_ids = distributionCenterIds
      }
    },
    assignRole () {
      if (this.newUser.roles != null) {
        let roleIds = this.newUser.roles.map(
          function (role) {
            return role.id
          })
        this.newUser.role_ids = roleIds
      }
    }
  }
}

</script>
