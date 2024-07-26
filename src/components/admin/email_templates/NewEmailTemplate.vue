<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Email Templates</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminEmailTemplates'}">List EmailTemplates</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addEmailTempalte">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="cost_formula" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newEmailTemplate.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newEmailTemplate.name.$error, 'is-valid': !$v.newEmailTemplate.name.$invalid }">                
              <div class="invalid-feedback">
                <span v-if="!$v.newEmailTemplate.name.required">Name is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="cost_formula" class="d-flex">Template</label>
              <input type="text" placeholder="Template" v-model="newEmailTemplate.template" class="form-control" id="template" :class="{ 'is-invalid': $v.newEmailTemplate.template.$error, 'is-valid': !$v.newEmailTemplate.template.$invalid }">                
              <div class="invalid-feedback">
                <span v-if="!$v.newEmailTemplate.template.required">Template is required</span>
              </div>
            </div>            
            <div class="form-group col-md-6">
              <label for="client_id" class="d-flex">Template Type</label>
                <multiselect id="template_type_id" placeholder="Select Template Type" v-model= "newEmailTemplate.email_template_types_ids" :options="email_template_types" label="original_code" track-by="id" @input="assignTemplateType" :class="{ 'is-invalid': $v.newEmailTemplate.email_template_types_ids.$error}"></multiselect>              
                <div class="invalid-feedback">
                <span v-if="!$v.newEmailTemplate.email_template_types_ids.required">Template Type is required</span>
              </div>
            </div>            
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>

        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import EmailTemplates File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error , 'is-valid': !$v.file.$invalid}">
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
      template_types:[],
      email_template_types_ids: [],
      email_template_types:[],
      newEmailTemplate: {}
    }
  },
  validations: {
    newEmailTemplate: {
      name: { required },
      template: { required },
      email_template_types_ids: { required}
    },
      file: { required }
  },
  created() {
    this.getEmailTemplateType()
  },
  methods:{
    getEmailTemplateType () {
      this.$http.secured.get('/api/v1/lookups/get_email_templates')
        .then(response => {this.email_template_types = response.data.lookup_values })
        .catch(error => this.$toast.error('Error in fetching emailtemplate Type'))
    },
    assignTemplateType () {      
      this.newEmailTemplate.template_type_id = this.newEmailTemplate.email_template_types_ids.id
    },
  	addEmailTempalte () {

      this.$v.newEmailTemplate.$touch();
      if (this.$v.newEmailTemplate.$invalid) {
          return;
      } 

      let template_data = { 
          email_template: { 
            name: this.newEmailTemplate.name, 
            template: this.newEmailTemplate.template, 
            template_type_id: this.newEmailTemplate.template_type_id, 
             } 
          }   
      this.$http.secured.post('/admin/email_templates', template_data)
        .then(response => { let res = response;
          this.$router.push('/admin/email_templates');
          this.$toast.success('Email Template added successfully!');
        })
        .catch(error => this.$toast.error('Error in adding Email Template'))
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
      this.$http.secured.post('/admin/email_templates/import',formData)
        .then(response => {
          this.$router.push('/admin/emailtemplates');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing Email Template'))
    }     
  }

}
</script>