<template>

  <div class='card mt-4'>
    <div class='card-header'>
      <div class='d-flex'>
        <div class='mr-auto p-2'>Edit User</div>
        <div class='p-2'>
          <router-link :to="{ name: 'ListAdminUsers'}">List Users</router-link>
        </div>
      </div>
    </div>
    <div class='card-body'>
      <form action='' @submit.prevent='updateUser' class='row'>
        <div class='row'>
          <div class='col-4 form-item mb-3' >
            <label for='user_first_name' class='d-flex'>First Name</label>
            <input type='text' id='user_first_name' class='form-control' autofocus autocomplete='off' placeholder='First Name' v-model='editUser.first_name' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='user_last_name' class='d-flex'>Last Name</label>
            <input type='text' id='user_last_name' class='form-control' autocomplete='off' placeholder='Last Name' v-model='editUser.last_name' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='user_email' class='d-flex'>Email</label>
            <input type='text' id='user_email' class='form-control' autocomplete='off' placeholder='Email' v-model='editUser.email' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='user_username' class='d-flex'>Username</label>
            <input type='text' id='user_username' class='form-control' autocomplete='off' placeholder='Username' v-model='editUser.username' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='user_contact_no' class='d-flex'>Contact Number</label>
            <input type='text' id='user_contact_no' class='form-control' autocomplete='off' placeholder='Contact Number' v-model='editUser.contact_no' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='user_password' class='d-flex'>Password</label>
            <input type='password' id='password' class='form-control' autocomplete='off' placeholder='Password' v-model='editUser.password' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='user_password_confirmation' class='d-flex'>Confirmation Password</label>
            <input type='password' id='user_password_confirmation' class='form-control' autocomplete='off' placeholder='Passwod Confirmation' v-model='editUser.password_confirmation' />
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='roles' class='d-flex'>Roles</label>
            <multiselect id='roles' placeholder='Select Role(s)' v-model= 'editUser.roles' :options='roles' label='name' :multiple=' true' track-by='id'  @input='assignRole'></multiselect>
          </div>
          <div class='col-4 form-item mb-3'>
            <label for='distribution_centres' class='d-flex'>Distribution Centers</label>
            <multiselect id='distribution_centers' placeholder='Select Distribution Center' :options='distribution_centers' :multiple=' true' label='name' track-by='id' @input='assignDistributionCenter' v-model= 'editUser.distribution_centers'></multiselect>
          </div>
        </div>

        <div class='row'>
          <div class='align-self-center mx-auto'>
            <input type='submit' value='Add User' class='btn btn-primary my-2' />
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      'editUser': {},
      'roles': [],
      'distribution_centers': []
    }
  },
  created () {
    this.$http.secured.get(`/admin/users/${this.$route.params.id}`).then((response) => {
      this.editUser = response.data.user
    }).catch((error) => this.$toast.error('Error in getting user information'))
    this.$http.secured.get('/admin/distribution_centers', {params: {list: true}}).then((response) => {
      this.distribution_centers = response.data.distribution_centers
    }).catch((error) => this.setError(
      error,
      'Error in fetching distribution_centers'
    ))
    this.$http.secured.get('/admin/roles').then((response) => {
      this.roles = response.data.roles
    }).catch((error) => this.setError(
      error,
      'Error in fetching roles'
    ))
  },
  'methods': {
    updateUser () {
      this.$http.secured.put(
        `/admin/users/${this.$route.params.id}`,
        {'user':
        {'first_name': this.editUser.first_name,
          'last_name': this.editUser.last_name,
          'email': this.editUser.email,
          'username': this.editUser.username,
          'contact_no': this.editUser.contact_no,
          'password': this.editUser.password,
          'password_confirmation': this.editUser.password_confirmation,
          'role_ids': this.editUser.roleIds,
          'distribution_center_ids': this.editUser.distributionCenterIds}}
      ).then((response) => {
        this.$router.push('/admin/users')
        this.$toast.success('User successfully updated')
      }).catch((error) => this.$toast.error('Error in updating user'))
    },
    assignDistributionCenter () {
      if (this.editUser.distribution_centers != null) {
        const distributionCenterIds = this.editUser.distribution_centers.map((distributionCenter) => distributionCenter.id)
        this.editUser.distributionCenterIds = distributionCenterIds
      }
    },
    assignRole () {
      if (this.editUser.roles != null) {
        const roleIds = this.editUser.roles.map((role) => role.id)
        this.editUser.roleIds = roleIds
      }
    }
  }
}
</script>
