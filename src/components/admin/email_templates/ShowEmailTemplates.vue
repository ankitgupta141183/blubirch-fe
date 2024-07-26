<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show EmailTemplates</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminEmailTemplates'}">List EmailTemplates</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="client_id" class="col-4 col-form-label">Name:</label> 
            <div class="col-8">
               {{email_template.name}}
            </div>
          </div>
          <div class="form-group row">
            <label for="user_id" class="col-4 col-form-label">Template:</label> 
            <div class="col-8">
               {{email_template.template}}
            </div>
          </div>
          <div class="form-group row">
            <label for="order_number" class="col-4 col-form-label">Template type:</label> 
            <div class="col-8">
              {{email_template.template_type ? email_template.template_type.original_code : ""}}
            </div>
          </div>  
                   
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{email_template.created_at}}
            </div>
          </div> 
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{email_template.updated_at}}
            </div>
          </div>
          <!-- <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Deleted Time:</label> 
            <div class="col-8">
              {{order.deleted_at}}
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>

</template>



<script>

export default {

  data () {
    return {
      email_template: {
        id: '',
        name: '',
        template: '',
        email_template_types_id: '',
      //	updated_at: ''
      }
    }
  },
  created() {
    this.getEmail_template()
  },
  methods: {
    getEmail_template () {
      this.$http.secured.get('/admin/email_templates/'+this.$route.params.id)
        .then(response => {
        	this.email_template = response.data.email_template;
        })
        .catch(error => {
          this.$toast.success('Error in fetching email_template')
        })
    }
  }

}

</script>