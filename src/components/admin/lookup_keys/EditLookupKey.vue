<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Lookup Key</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLookupkeys'}">List Lookup Keys</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateLookupKey">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editLookupKey.name" class="form-control" id="name">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="editLookupKey.code" class="form-control" id="code">
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
      editLookupKey: {
        id: '',
        name: '',
        code: ''
      }
    }
  },

  created () {
    this.$http.secured.get('/admin/lookup_keys/'+this.$route.params.id)
        .then(response => { this.editLookupKey = response.data.lookup_key })
        .catch(error => this.$toast.error('Error in getting lookup key information'))
  },

  methods:{
    updateLookupKey () {      
      this.$http.secured.put('/admin/lookup_keys/'+this.$route.params.id, {lookup_key: { name: this.editLookupKey.name, code: this.editLookupKey.code } })
        .then(response => {
          this.$router.push('/admin/lookup_keys');
          this.$toast.success('Lookup Key successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating lookup key'))
    }
  }

}

</script>