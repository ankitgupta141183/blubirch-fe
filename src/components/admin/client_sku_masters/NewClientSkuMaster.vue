<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Client Sku Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClientSkuMasters'}">List Client Sku Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addClientSkuMaster">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="client_catgeory_id" class="d-flex">Client Category</label>
              <multiselect v-model="newClientSkuMaster.client_category_id" :options="client_category" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Client Category" :class="{ 'is-invalid': $v.newClientSkuMaster.client_category_id.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newClientSkuMaster.client_category_id.required">Client Category is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newClientSkuMaster.code" class="form-control" id="code" :class="{ 'is-invalid': $v.newClientSkuMaster.code.$error, 'is-valid': !$v.newClientSkuMaster.code.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newClientSkuMaster.code.required">Code is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="description" class="d-flex">Description</label>
              <input type="text" placeholder="Code" v-model="newClientSkuMaster.description" class="form-control" id="code">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Client SKU Master File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error, 'is-valid': !$v.file.$invalid }">
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
      client_category: [],
      newClientSkuMaster: {
        'client_category_id': '',
        'code': '',
        'description': ''
      }
    }
  },
  validations: {
    newClientSkuMaster: {
      client_category_id: { required },
      code: { required }
    },
      file: { required }
  },
  created () {
    this.$http.secured.get('/admin/client_categories')
      .then(response => { this.client_category = response.data.client_categories })
      .catch(error => this.setError(error, 'Could not retrieve client category'))  
    },
  methods:{
  	addClientSkuMaster () {   
      this.$v.newClientSkuMaster.$touch();
      if (this.$v.newClientSkuMaster.$invalid) {
          return;
      }   

      this.$http.secured.post('/admin/client_sku_masters', { client_sku_master: { client_category_id : this.newClientSkuMaster.client_category_id.id, code: this.newClientSkuMaster.code, description: this.newClientSkuMaster.description } })
        .then(response => {
          this.$router.push('/admin/client_sku_masters');
          this.$toast.success('Client Sku Master successfully created');
        })
        .catch(error => this.$toast.error('Error in creating client sku master'))
    },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () { 
      this.$v.file.$touch();
      if (this.$v.file.$invalid) {
          return;
      }

      const formData = new FormData()
      formData.append('file', this.file)
      this.$http.secured.post('/admin/client_sku_masters/import',formData)
        .then(response => {
          this.$router.push('/admin/client_sku_masters');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing Client SKU Masters'))
    }
  }

}

</script>