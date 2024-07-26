<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Role</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminRoles'}">List Roles</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateRole">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editRole.name" class="form-control" id="name">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="editRole.code" class="form-control" id="code">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
      
    </div>
  </div>

</template>

<script>

export default {

  data () {
    return {
      editRole: {
        id: '',
        name: '',
        code: ''
      }
    }
  },

  created () {
    this.$http.secured.get('/admin/roles/'+this.$route.params.id)
        .then(response => { this.editRole = response.data.role })
        .catch(error => this.$toast.error('Error in getting role information'))
  },

  methods:{
    updateRole () {      
      this.$http.secured.put('/admin/roles/'+this.$route.params.id, {role: { name: this.editRole.name, code: this.editRole.code } })
        .then(response => {
          this.$router.push('/admin/roles');
          this.$toast.success('Role successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating role'))
    }
  }

}

</script>