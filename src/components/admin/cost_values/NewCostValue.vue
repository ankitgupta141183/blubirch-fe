<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Upload Cost Value</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCostValues'}">List Cost Values</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form @submit.prevent="importFile" enctype="multipart/form-data">
        <div class="form-group col-md-6">
          <label for="file" class="label">Import Cost Values File </label>
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
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'

export default {
  data () {
    return {
      file: "",
    }
  },
  validations: {
      file: { required }
  },
  methods:{
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () { 

      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      securedAxiosInstance.post('/admin/cost_values/import',formData);
      this.$toast.success('Cost Values successfully created');
    }
  }

}

</script>