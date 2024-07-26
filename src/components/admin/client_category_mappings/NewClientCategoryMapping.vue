<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Client Category Mapping File Upload</div>
        <div class="p-2">
          
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <!-- <form @submit.prevent="addCCMapping">
          

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form> -->
        <hr/>
        <form @submit.prevent="importFile1" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Mapping File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error , 'is-valid': !$v.file.$invalid}"/>
            <div class="invalid-feedback">
                <span v-if="!$v.file.required">Upload File</span>
              </div>
            <button class="btn btn-primary my-2">Import File</button>
          </div>
        </form>

    </div>
  </div>	

</template>



<script>
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
import { required } from 'vuelidate/lib/validators'


export default {
  
  data () {
    return {
      file: ""
    }
  },
   validations: {
      file: { required }
  },
  methods:{
  	addCCMapping () {      
      securedAxiosInstance.post('/admin/client_category_mappings', {})
        .then(response => {
          this.$router.push('/admin/client_category_mappings');
          this.$toast.success('Mapped');
        })
        .catch(error => this.$toast.error('Error in mapping'))
    },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile1 () { 
    this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      } 
      const formData = new FormData();
      formData.append('file', this.file);
      securedAxiosInstance.post('/admin/client_category_mappings/import',formData);
      this.$toast.success('Mapping created');
    }
    // importLookupKey(){
    //   securedAxiosInstance.post('/admin/lookup_keys/import', {lookup_key: { name: this.newLookupKey.name, code: this.newLookupKey.code } })
    //     .then(response => {
    //       this.$router.push('/admin/lookup_keys');
    //       this.$toast.success('Lookup Key successfully created');
    //     })
    //     .catch(error => this.$toast.error('Error in creating lookup key'))
    // }
  }

}

</script>