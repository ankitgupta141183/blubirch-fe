<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Lookup Value</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLookupValues'}">List Lookup Values</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateLookupValue">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="lookup_key_id" class="d-flex">Lookup Key</label>
              <multiselect v-model="editLookupValue.lookup_key_id" :options="select_lookup_keys" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select lookup key value">
              </multiselect>
            </div>
            <div class="form-group col-md-6">
              <label for="ancestry" class="d-flex">Parent</label>
              <multiselect v-model="editLookupValue.ancestry" :options="select_lookup_values" label="original_code" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select lookup key value">
              </multiselect>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="editLookupValue.code" class="form-control" id="code">
            </div>
            <div class="form-group col-md-6">
              <label for="original_code" class="d-flex">Original Code</label>
              <input type="text" placeholder="Original Code" v-model="editLookupValue.original_code" class="form-control" id="original_code">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="position" class="d-flex">Position</label>
              <input type="text" placeholder="Position" v-model="editLookupValue.position" class="form-control" id="position">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
      
    </div>
  </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
export default {

  data () {
    return {
      select_lookup_keys: [],
      select_lookup_values: [],

      editLookupValue: {
        'id': '',
        'lookup_key_id': '',
        'ancestry': '',
        'code': '',
        'original_code': '',
        'position': ''
      },
      all_lookup_keys: this.$http.secured.get('/admin/lookup_keys')
        .then(response => { this.select_lookup_keys = response.data.lookup_keys }),
      all_lookup_values: this.$http.secured.get('/admin/lookup_values/get_lookup_value_parents')
        .then(response => { this.select_lookup_values = response.data.lookup_values })
    }
  },
  components: {
    Multiselect
  },
  created () {
    this.$http.secured.get('/admin/lookup_values/'+this.$route.params.id)
        .then(response => { this.editLookupValue = response.data.lookup_value })
        .catch(error => this.$toast.error('Error in getting lookup value information'))
  },

  methods:{
    updateLookupValue () {
      this.$http.secured.put('/admin/lookup_values/'+this.$route.params.id, {lookup_value: { lookup_key_id: this.editLookupValue.lookup_key_id.id, ancestry: this.editLookupValue.ancestry.id, code: this.editLookupValue.code, original_code: this.editLookupValue.original_code, position: this.editLookupValue.position } })
        .then(response => {
          this.$router.push('/admin/lookup_values');
          this.$toast.success('Lookup Value successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating lookup value'))
    }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>