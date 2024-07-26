<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Return Reason</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCustomerReturnReasons'}">List Customer Return Reasons</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addCustomer_Return_Reason">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Reason Name" v-model="newCustomerReturnReason.name" class="form-control" id="reason_name" :class="{ 'is-invalid': $v.newCustomerReturnReason.name.$error, 'is-valid': !$v.newCustomerReturnReason.name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newCustomerReturnReason.name.required">Name is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="grading_required" class="d-flex">Grading Required</label>
              <input type="checkbox" :checked="false" class="radio-button" :name="grading_required" v-model="newCustomerReturnReason.grading_required" id="grading_required">
            </div>                
          </div>
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>

        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Customer Return Reasons File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error , 'is-valid': !$v.file.$invalid}"/>
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
      newCustomerReturnReason: {}
    }
  },
  created() {
  },
  validations: {
    newCustomerReturnReason: {
      name : {required}
    },
    file: {required}
  },
  methods:{
  	addCustomer_Return_Reason () {
      this.$v.newCustomerReturnReason.$touch();
      if (this.$v.newCustomerReturnReason.$invalid) {
          return;
      }
      let customer_return_reason_data = { 
          customer_return_reason: { name: this.newCustomerReturnReason.name, 
          grading_required: this.newCustomerReturnReason.grading_required, 
             } 
          }   
      this.$http.secured.post('/admin/customer_return_reasons', customer_return_reason_data)
        .then(response => { let res = response;
          this.$router.push('/admin/customer_return_reasons');
          this.$toast.success('customer return reasons added successfully!');
        })
        .catch(error => this.$toast.error('Error in adding Customer return reasons'))
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
      this.$http.secured.post('/admin/customer_return_reasons/import',formData)
        .then(response => {
          this.$router.push('/admin/customer_return_reasons');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing customer return reasons'))
    }     
  }

}

</script>