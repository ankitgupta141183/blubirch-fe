<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Lookup Key</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLookupkeys'}">List Lookup Keys</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addLookupKey">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newLookupKey.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newLookupKey.name.$error , 'is-valid': !$v.newLookupKey.name.$invalid}">
             <div class="invalid-feedback">
                <span v-if="!$v.newLookupKey.name.required">Name is required</span>
              </div>

            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newLookupKey.code" class="form-control" id="code" :class="{ 'is-invalid': $v.newLookupKey.code.$error, 'is-valid': !$v.newLookupKey.code.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newLookupKey.code.required">Code is required</span>
              </div>

            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Lookup Keys File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }">
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
      newLookupKey: {
        'name': '',
        'code': ''
      },
      file: "",
    }
  },
  validations: {
    newLookupKey: {
      name: { required },
      code: { required }
    },
    file: { required }
  },
  methods:{
  	addLookupKey () {  
    this.$v.newLookupKey.$touch();
    if (this.$v.newLookupKey.$invalid) {
        return;
    }
    
      this.$http.secured.post('/admin/lookup_keys', {
                                                      lookup_key: 
                                                        { name: this.newLookupKey.name,
                                                          code: this.newLookupKey.code 
                                                        } 
                                                    })
        .then(response => {
          this.$router.push('/admin/lookup_keys');
          this.$toast.success('Lookup Key successfully created');
        })
        .catch(error => this.$toast.error('Error in creating lookup key'))
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
      this.$http.secured.post('/admin/lookup_keys/import',formData)
        .then(response => {
          this.$router.push('/admin/lookup_keys');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing lookup key'))
    }    
  }

}

</script>