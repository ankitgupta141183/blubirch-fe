<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show User</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminUsers'}">List Users</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body d-flex justify-content-between w-100">
      <div class="col-md-6">
        <div class="form-group row">
          <label for="name" class="col-4 text-right">First Name:</label> 
          <div class="col-8 text-left">
            {{user.first_name}}
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-4 text-right">Last Name:</label> 
          <div class="col-8 text-left">
            {{user.last_name}}
          </div>
        </div>
       	<div class="form-group row">
          <label for="code" class="col-4 text-right">Email:</label> 
          <div class="col-8 text-left">
            {{user.email}}
          </div>
        </div>
        <div class="form-group row">
          <label for="created_at" class="col-4 text-right">Contact No:</label> 
          <div class="col-8 text-left">
            {{user.contact_no}}
          </div>
        </div>
        <div class="form-group row">
          <label for="roles" class="col-4 text-right">Roles:</label> 
          <div class="col-8 text-left">
            <span v-for="(role, index) in user.roles" :key="role.name">
              <span v-if="index != 0">, </span><span>{{ role.name }}</span>
            </span>
          </div>
        </div>
        <div class="form-group row">
          <label for="distribution_centers" class="col-4 text-right">Distribution Centers:</label> 
          <div class="col-8 text-left">
            <span v-for="(distribution_center, index) in user.distribution_centers" :key="distribution_center.name">
              <span v-if="index != 0">, </span><span>{{ distribution_center.name }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
export default {
  data () {
    return {
      user: [],
      user_selected_roles: []
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$http.secured.get('/admin/users/' + this.$route.params.id)
        .then(response => {
          this.user = response.data.user
        })
        .catch(error => {
          this.$toast.success('Error in fetching user')
        })
    }
  }
}
</script>
