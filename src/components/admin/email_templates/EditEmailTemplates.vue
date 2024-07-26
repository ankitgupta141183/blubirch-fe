<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit EmailTemplates</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminEmailTemplates'}">List EmailTemplates</router-link>
        </div>
      </div>
    </div>    
    <div class="card-body">
       <form @submit.prevent="updateEmailTemplate">
          <div class="form-row">

            <div class="form-group col-md-6">
              <label for="client_id" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editEmail_Templates.name" class="form-control" id="name">
            </div>

            <div class="form-group col-md-6">
              <label for="template" class="d-flex">Template</label>
              <input type="text" placeholder="Template" v-model="editEmail_Templates.template" class="form-control" id="template">
            </div>
            <div class="form-group col-md-6">
              <label for="email_template_typeId" class="d-flex">Template Type</label>
              <multiselect id="email_template_types_ids" placeholder="Select template typeId" v-model= "editEmail_Templates.template_type" :options="email_template_types_ids" label="original_code" track-by="id" @input="assignTemplateTypes"></multiselect>
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
    email_template_types:[],
    email_template_types_ids:[],
      editEmail_Templates: {}
    }
  },

  created () {
    this.getEmailTemplateById(this.$route.params.id)
    this.getEmailTemplateType()
  },

  methods:{
    getEmailTemplateType () {
    this.$http.secured.get('/api/v1/lookups/get_email_templates')
        .then(response => {this.email_template_types_ids = response.data.lookup_values })
        .catch(error => this.$toast.error('Error in fetching emailtemplate Type'))
    },
    assignTemplateTypes () {
      this.editEmail_Templates.template_type_id = this.editEmail_Templates.template_type.id
    },
    getEmailTemplateById(id){
    this.$http.secured.get('/admin/email_templates/'+id)
      .then(response => { this.editEmail_Templates = response.data.email_template })
      .catch(error => this.$toast.error('Error in getting email template information'))
    },
    updateEmailTemplate () {
      let edit_email_template_data = { 
          email_template: { name: this.editEmail_Templates.name, 
          template: this.editEmail_Templates.template, 
          template_type_id: this.editEmail_Templates.template_type_id, 
 } 
          }   
      this.$http.secured.put('/admin/email_templates/'+this.$route.params.id, edit_email_template_data)
        .then(response => {
          this.$router.push('/admin/email_templates');
          this.$toast.success('Email templates successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating email templates'))
    }
  }
}
</script>