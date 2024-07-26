<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Client Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClientCategories'}">List Client Categories</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
       <form @submit.prevent="addClientCategory">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newCategory.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newCategory.name.$error, 'is-valid': !$v.newCategory.name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newCategory.name.required">Name is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
             <label for="name" class="d-flex">Clients</label>
              <multiselect v-model="newCategory.client" :options="clients" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Client" :class="{ 'is-invalid': $v.newCategory.client.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newCategory.client.required">Client is required</span>
              </div>
              
             </div> 
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newCategory.code" class="form-control" id="code" :class="{ 'is-invalid': $v.newCategory.code.$error, 'is-valid': !$v.newCategory.code.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newCategory.code.required">Code is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="attrs" class="d-flex">Attrs</label>
              <input type="text" placeholder="Attrs" v-model="newCategory.attrs" class="form-control" id="attrs">
            </div>
              <div class="form-group col-md-6">
              <label for="ancestry" class="d-flex">Parent</label>
              <multiselect v-model="newCategory.ancestry" :options="client_categories" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Parent">
              </multiselect>
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile">
          <div class="form-row">
          <div class="form-group col-md-6">
              <label for="name" class="d-flex">Clients</label>
              <multiselect id="clients" placeholder="Select Client" v-model= "search.client_ids" :options="clients" label="name" track-by="id" @input="setClientId" :class="{ 'is-invalid': $v.search.client_ids.$error}"></multiselect>
               <div class="invalid-feedback">
                <span v-if="!$v.search.client_ids.required">Client is required</span>
              </div>
            </div>
          <div class="form-group col-md-6">
              <label for="file" class="d-flex">Upload Client Category File</label>
              <input type="file" ref="inputFile"  class="form-control" id="file" @change=uploadFile() :class="{ 'is-invalid': $v.file.$error }">
               <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Import File</button>
        </form>
    </div>
  </div>	

</template>

`
<script>
import Multiselect from 'vue-multiselect'
import { required } from 'vuelidate/lib/validators'


export default {

  data () {
    return {
            file: "",
      client_categories: [],
            clients: [],
      client_ids: '',
      search: {},
      newCategory: {
        'name': '',
        'code': '',
        'attrs': '',
        'ancestry': '',
        'client':'',
      }
    }
  },
  components: {
    Multiselect
  },
  validations: {
    newCategory: {
      name: { required },
      code: { required },
      client: {required}
    },
    search: {
      client_ids: { required }},
      file: { required }
  },
  created() {
    this.getclientcategory()

    this.$http.secured.get('/admin/clients')
      .then(response => { this.clients = response.data.clients })
      .catch(error => this.$toast.error('Error in fetching clients'))
  },
  methods:{
    getclientcategory () {
      this.$http.secured.get('/admin/client_categories')
        .then(response => {this.client_categories = response.data.client_categories})
        .catch(error => this.$toast.error('Error in fetching Client Category'))
    },
  	addClientCategory () {
      this.$v.newCategory.$touch();
        if (this.$v.newCategory.$invalid) {
            return;
        }      
      this.$http.secured.post('/admin/client_categories', { client_category: { name: this.newCategory.name , code: this.newCategory.code, attrs: this.newCategory.attrs, ancestry: this.newCategory.ancestry.id , client_id: this.newCategory.client.id  } })
        .then(response => {
          this.$router.push('/admin/client_categories');
          this.$toast.success('Client Category successfully created');
        })
        .catch(error => this.$toast.error('Error in creating Client Category'))
    },
    uploadFile() {
      this.file = this.$refs.inputFile.files[0]
    },
    setClientId () {
      if (this.search.client_ids != null) {
        this.client_ids = this.search.client_ids.id
      }
    },
    getClientId () {
      if (this.newCategory.client_id != null) {
        this.newCategory.client_id = this.newCategory.client_id.id
      }
    },
    importFile() {
      this.$v.search.$touch();
      this.$v.file.$touch();

        if (this.$v.search.$invalid || this.$v.file.$invalid ) {
            return;
        } 
      const params = {
        'client_id': this.client_ids,
        'file': this.file
      }
      let formData = new FormData()
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )
      this.$http.secured.post('/admin/client_categories/import',formData)
        .then(response => {
          this.$router.push('/admin/client_categories')
          this.$toast.success('Client Category File Imported Successfully')
        })
        .catch(error => this.$toast.error('Error in importing Client Category file')) }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>