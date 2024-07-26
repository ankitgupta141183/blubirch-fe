<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Lookup Value</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLookupValues'}">List Lookup Values</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addLookupValue">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="lookup_key" class="d-flex">Lookup Key</label>
              <multiselect v-model="newLookupValue.lookup_key_id" :options="select_lookup_keys" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select lookup key value" :class="{'is-invalid': $v.newLookupValue.lookup_key_id.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newLookupValue.lookup_key_id.required">Lookup key is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="ancestry" class="d-flex">Parent</label>
              <multiselect v-model="newLookupValue.ancestry" :options="select_lookup_values" label="original_code" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Parent">
              </multiselect>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newLookupValue.code" class="form-control" id="code" :class="{'is-invalid': $v.newLookupValue.code.$error , 'is-valid': !$v.newLookupValue.code.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.newLookupValue.code.required">Code is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="original_code" class="d-flex">Original Code</label>
              <input type="text" placeholder="Original Code" v-model="newLookupValue.original_code" class="form-control" id="original_code" :class="{'is-invalid': $v.newLookupValue.original_code.$error , 'is-valid': !$v.newLookupValue.original_code.$invalid}">
               <div class="invalid-feedback">
                <span v-if="!$v.newLookupValue.original_code.required">Original code is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="position" class="d-flex">Position</label>
              <input type="text" placeholder="Position" v-model="newLookupValue.position" class="form-control" id="position">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Lookup Values File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
            <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
            <button class="btn btn-primary my-2">Import File</button>
          </div>
        </form>
      
    </div>
  </div>  

</template>



<script>
import { required } from 'vuelidate/lib/validators'

export default {

  data () {
    return {
      file: "",
      select_lookup_keys: [],
      select_lookup_values: [],      
      newLookupValue: {},
      all_lookup_keys: this.$http.secured.get('/admin/lookup_keys')
        .then(response => { this.select_lookup_keys = response.data.lookup_keys }),
      all_lookup_values: this.$http.secured.get('/admin/lookup_values/get_lookup_value_parents')
        .then(response => { this.select_lookup_values = response.data.lookup_values })
    }
  },
  validations: {
    newLookupValue: {
      code: { required },
      original_code: { required },
      lookup_key_id: { required }
    },
    file: {required }
  },
  methods:{
    addLookupValue () { 
    this.$v.newLookupValue.$touch();
    if (this.$v.newLookupValue.$invalid) {
        return;
    }
     
      this.$http.secured.post('/admin/lookup_values', {lookup_value: { lookup_key_id: this.newLookupValue.lookup_key_id.id, ancestry: this.newLookupValue.ancestry.id, code: this.newLookupValue.code, original_code: this.newLookupValue.original_code, position: this.newLookupValue.position } })
        .then(response => {
          this.$router.push('/admin/lookup_values');
          this.$toast.success('Lookup Value successfully created');
        })
        .catch(error => this.$toast.error('Error in creating lookup value'))
    },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () { 
      this.$v.file.$touch();
      if (this.$v.file.$invalid) {
          return;
      } 
      const formData = new FormData();
      formData.append('file', this.file);
      this.$http.secured.post('/admin/lookup_values/import',formData);
      this.$toast.success('Lookup Value successfully created');
    }
  }

}

</script>
