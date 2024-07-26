<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Company Stock</div>
        <div class="p-2">
          <router-link :to="{ name: 'InwardSkunumber'}">Back</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form @submit.prevent="importFile" enctype="multipart/form-data">
        <div class="form-group col-md-6">
          <label for="file" class="label">Import Company Stock</label>
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
      this.$v.file.$touch();
      if (this.$v.file.$invalid) {
        return;
      }
      const formData = new FormData()
      formData.append('file', this.file)
      this.$http.secured.post('/api/v1/warehouse/company_stocks/upload_stock',formData)
      .then(response => {
        this.$router.push({ name: 'InwardSkunumber'});
        this.$toast.success('File Imported Successfully');
      })
      .catch(error => this.$toast.error('Error in importing company stock'))
    }    
  }

}

</script>