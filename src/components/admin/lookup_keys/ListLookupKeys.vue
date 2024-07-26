<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Lookup Keys</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminLookupKey'}">Add New Lookup Key</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">

      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getLookupKeys">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getLookupKeys">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getLookupKeys">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="lookup_key in lookup_keys" :key="lookup_key.id" :role="lookup_key">                
              <td scope="row">
                {{lookup_key.id}}
              </td>
              <td>
                {{lookup_key.name}}
              </td>
              <td>
                {{lookup_key.code}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminLookupKey', params: { id: lookup_key.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminLookupkey', params: { id: lookup_key.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(lookup_key)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getLookupKeys"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination_custom'"
            :prev-class="'page-item'"
            :first-last-button=true
            :next-class="'page-item'"
            :page-class="'page-item'">
          </paginate>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  
  data () {
    return {
      lookup_keys: [],
      search: '',
      page: 1,
      total_pages: 1,
      name: '',
      code: ''
    }
  },
  created() {
    this.getLookupKeys(this.page)
  },
  computed:{
  },
  methods: {
    getLookupKeys (page) {
      this.$http.secured.get('/admin/lookup_keys', {params: {page: page, name: this.name, code: this.code}})
        .then(response => {
                            this.lookup_keys = response.data.lookup_keys, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching lookup keys'))
    },
    onDelete(lookup_key){
      this.$http.secured.delete(`/admin/lookup_keys/${lookup_key.id}`)
        .then(response => {
          this.lookup_keys.splice(this.lookup_keys.indexOf(lookup_key), 1);
          this.$toast.error('Lookup Key deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting lookup key'))
    },
    reset_search () {
      this.name = ''
      this.code = ''
      this.getLookupKeys()
    }
  }
  
}

</script>