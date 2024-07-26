<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Lookup Values</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminLookupValue'}">Add New Lookup Value</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">

      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Lookup Key</th>
              <th>Parent</th>
              <th>Original Code</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <multiselect placeholder="Select Lookup Key(s)" v-model= "search.lookup_key_ids" :options="lookup_keys" label="name" :multiple=" true" track-by="id"  @input="assignLookupKey"></multiselect>
              </td>
              <td>
                <multiselect placeholder="Select Parent(s)" v-model= "search.parent_ids" :options="lookup_value_parents" label="original_code" :multiple=" true" track-by="id"  @input="assignParent"></multiselect>
                <!-- <multiselect placeholder="Select Parent(s)" v-model= "search.parent_ids" :options="lookup_value_parents" label="code" :multiple=" true" track-by="id"  @input="assignParent"></multiselect> -->
              </td>
              <td>
                <input class="form-control col-lg-5 col-centered" type="text" placeholder="Search Original Code" aria-label="Search" v-on:keyup.enter="getLookupValues" v-model="original_code">
              </td>
              <td>
                <input class="form-control col-lg-6 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getLookupValues">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getLookupValues">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="lookup_value in filteredLookupValue" :key="lookup_value.id" :role="lookup_value">
              <td scope="row">
                {{lookup_value.id}}
              </td>
              <td>
                {{lookup_value.lookup_key.name}}
              </td>
              <td>
                {{lookup_value.parent ? lookup_value.parent : ""}}
              </td>
              <td>
                {{lookup_value.original_code ? lookup_value.original_code : ""}}
              </td>
              <td>
                {{lookup_value.code}}
              </td>
              <td>
                <router-link :to="{ name: 'ShowAdminLookupValue', params: { id: lookup_value.id }}">
                  <i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminLookupValue', params: { id: lookup_value.id }}">
                  <i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(lookup_value)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getLookupValues"
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
  name: "ListLookupValues",
  data () {
    return {
      lookup_values: [],
      total_pages: 1,
      search: {},
      lookup_key_ids: [],
      ancestry: '',
      original_code: '',
      code: '',
      position: '',
      lookup_keys: [],
      lookup_value_parents: [],
      parent_ids: []

    }
  },
  computed:{
    filteredLookupValue(){
      return this.lookup_values.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
  created() {
    this.getLookupValues()
    this.$http.secured.get('/admin/lookup_keys')
        .then(
        response => {this.lookup_keys = response.data.lookup_keys})
        .catch(error => this.$toast.error('Error in fetching lookup keys'))

    this.$http.secured.get('/admin/lookup_values/get_lookup_value_parents')
      .then(response => { this.lookup_value_parents = response.data.lookup_values })
      .catch(error => this.$toast.error('Error in getting parents'))
  },  
  methods: {
    getLookupValues (page) {
      this.$http.secured.get('/admin/lookup_values', {params: {page: page, lookup_key_id: this.lookup_key_ids, ancestry: this.parent_ids, original_code: this.original_code, code: this.code}})
        .then(response => {this.lookup_values = response.data.lookup_values, this.total_pages = response.data.meta.total_pages})
        .catch(error => this.$toast.error('Error in fetching lookup values'))
    },
    onDelete(lookup_value){
      this.$http.secured.delete(`/admin/lookup_values/${lookup_value.id}`)
        .then(response => {
          this.lookup_values.splice(this.lookup_values.indexOf(lookup_value), 1);
          this.$toast.error('Lookup Value deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting lookup value'))
    },
    reset_search () {
      this.lookup_key_id = ''
      this.code = ''
      this.getLookupValues()
    },
      assignLookupKey(){
        if (this.search.lookup_key_ids != null) {
          let lookup_key_ids = this.search.lookup_key_ids.map(
          function(lookup_key){
            return lookup_key.id;
          })
          this.lookup_key_ids = lookup_key_ids
        }
      },
      assignParent() {
        if (this.search.parent_ids != null) {
          let parent_ids = this.search.parent_ids.map(
          function(parent){
            return parent.id;
          })
          this.parent_ids = parent_ids
        }
      }
  }
  
}

</script>