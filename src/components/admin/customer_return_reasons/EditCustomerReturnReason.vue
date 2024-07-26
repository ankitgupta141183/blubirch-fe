<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit EmailTemplates</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCustomerReturnReasons'}">List Customer Reason Reason</router-link>
        </div>
      </div>
    </div>    
    <div class="card-body">
       <form @submit.prevent="updateCustomerReturnReason">
          <div class="form-row">

            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="edit_customer_return_reason.name" class="form-control" id="name">
            </div>
            <div class="form-group col-md-6">
              <label for="template" class="d-flex">Grading</label>
              <input type="checkbox" :checked="false" class="radio-button" :name="grading_required" v-model="edit_customer_return_reason.grading_required" id="grading_required">
            </div>                     
          </div>
          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>      
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
    edit_customer_return_reason: {}
    }
  },
  created () {
    this.getCustomerReturnReason(this.$route.params.id)
  },

  methods:{
    getCustomerReturnReason(id){
    this.$http.secured.get('/admin/customer_return_reasons/'+id)
      .then(response => { this.edit_customer_return_reason = response.data.customer_return_reason })
      .catch(error => this.$toast.error('Error in getting customer return reason information'))
    },
    updateCustomerReturnReason () {
      let edit_customer_return_reason_data = { 
          customer_return_reason: { name: this.edit_customer_return_reason.name, 
          grading_required: this.edit_customer_return_reason.grading_required, 
             } 
          }   
      this.$http.secured.put('/admin/customer_return_reasons/'+this.$route.params.id, edit_customer_return_reason_data)
        .then(response => {
          this.$router.push('/admin/customer_return_reasons');
          this.$toast.success('Customer return reasons successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating customer return reasons'))
    }
  }
}
</script>