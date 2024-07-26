<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Reminder</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminReminders'}">List Reminders</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addReminder">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="sku_id" class="d-flex">SKU</label>
              <multiselect id="sku_id" placeholder="Select SKU" v-model= "newReminder.skus" :options="skus" label="code" track-by="id" @input="assignSku" :class="{ 'is-invalid': $v.newReminder.skus.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.skus.required">SKU is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="status_id" class="d-flex">Status</label>
              <multiselect id="status_id" placeholder="Select Status" v-model= "newReminder.status" :options="status" label="original_code" track-by="id" @input="assignStatus" :class="{ 'is-invalid': $v.newReminder.status.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.status.required">Status is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="return_reason_id" class="d-flex">Return Reason</label>
              <multiselect id="return_reason_id" placeholder="Select Return Reason" v-model= "newReminder.customer_return_reassons" :options="customer_return_reassons" label="name" track-by="id" @input="assignReturnReason" :class="{ 'is-invalid': $v.newReminder.customer_return_reassons.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.customer_return_reassons.required">Customer Return Reason is required</span>
              </div>
            </div>
            
            <div class="form-group col-md-6">
              <label for="approval_required_id" class="d-flex">Approval Required</label>
              <multiselect id="approval_required_id" placeholder="Select Approval Required" v-model= "newReminder.approval_required" :options="approval_required" label="name" track-by="id" @input="assignApprovalRequired" :class="{ 'is-invalid': $v.newReminder.approval_required.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.approval_required.required">Approval is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="client_category_id" class="d-flex">Client Category</label>
              <multiselect id="client_category_id" placeholder="Select Approval Required" v-model= "newReminder.client_categories" :options="client_categories" label="name" track-by="id" @input="assignClientCategory" :class="{ 'is-invalid': $v.newReminder.client_categories.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.client_categories.required">Client Category is required</span>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="approval_to" class="d-flex">Approval To</label>
              <input type="text" placeholder="Approval To" v-model="newReminder.approval_to" class="form-control" id="approval_to" :class="{ 'is-invalid': $v.newReminder.approval_to.$error , 'is-valid': !$v.newReminder.approval_to.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.approval_to.required">Approval To is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="copy_to" class="d-flex">Copy To</label>
              <input type="text" placeholder="Copy To" v-model="newReminder.copy_to" class="form-control" id="copy_to" :class="{ 'is-invalid': $v.newReminder.copy_to.$error , 'is-valid': !$v.newReminder.copy_to.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.copy_to.required">CopyTo is required</span>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label for="reminder_1" class="d-flex">Reminder 1</label>
              <input type="text" placeholder="Reminder 1" v-model="newReminder.reminder_1" class="form-control" id="reminder_1" >
            </div>
            <div class="form-group col-md-6">
              <label for="reminder_2" class="d-flex">Reminder 2</label>
              <input type="text" placeholder="Reminder 2" v-model="newReminder.reminder_2" class="form-control" id="reminder_2" >
            </div>
            <div class="form-group col-md-6">
              <label for="email_template_id" class="d-flex">Email Template</label>
              <multiselect id="email_template_id" placeholder="Select Email Template" v-model= "newReminder.email_templates" :options="email_templates" label="name" track-by="id" @input="assignEmailTemplate" :class="{ 'is-invalid': $v.newReminder.email_templates.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.email_templates.required">Email Template is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="email_template_id" class="d-flex">Service Executive Email Template</label>
              <multiselect id="email_template_id" placeholder="Select Email Template" v-model= "newReminder.service_executive_email_templates" :options="email_templates" label="name" track-by="id" @input="assignServiceExecutiveEmailTemplate" :class="{ 'is-invalid': $v.newReminder.service_executive_email_templates.$error }"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newReminder.service_executive_email_templates.required">Service Executive Email Template is required</span>
              </div>
            </div>

            <div class="form-group col-md-12">
              <button @click="addEscalation" class="btn btn-primary my-2">Add Escalation</button>
            </div>

         
      <br>
        <div class="form-group col-md-12 escalation-box"
        v-for="(escalation, counter) in escalations"
        v-bind:key="counter" style="border: 1px solid #e8e8e8; padding: 10px;">
            <span @click="deleteEscalation(counter)" class="escalation-remove" title="Remove" style="float: right;">
            <i class="fa fa-trash"></i>
              </span>

            <div class="form-group col-md-4">
              <label for="escalation_duration" class="d-flex"> <span style="font-weight:bold;"> {{counter+1+ ". "}} </span>  Escalation Duration</label>
              <input type="text" placeholder="Escalation Duration" v-model="escalation.escalation_duration" class="form-control" id="escalation_duration">
            </div>
            <div class="form-group col-md-4">
              <label for="escalation_to" class="d-flex">Escalation To</label>
              <input type="text" placeholder="Escalation To" v-model="escalation.escalation_to" class="form-control" id="escalation_to">
            </div>
            <div class="form-group col-md-4">
              <label for="escalation_copy_to" class="d-flex">Escalation CopyTo</label>
              <input type="text" placeholder="Escalation CopyTo" v-model="escalation.escalation_copy_to" class="form-control" id="escalation_copy_to">
            </div>
        </div>


                        
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Reminders File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error , 'is-valid': !$v.file.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
          </div>
            <button class="btn btn-primary my-2">Import File</button>
        </form>        
      
    </div>
  </div>  

</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      file: " ",
      escalations: [{escalation_duration:'', escalation_to:'', escalation_copy_to:''}],
      clients: [],
      customer_return_reassons: [],
      approval_required: [{name:'true'},{name: 'false'}],
      skus:[],
      status:[],
      client_categories:[],
      email_templates: [],
      newReminder: {}
    }
  },
  computed:{
  },
  validations: {
    newReminder: {
      skus: { required },
      status: { required },
      client_categories: { required },
      customer_return_reassons: { required },
      approval_required: { required  },
      approval_to: { required  },
      copy_to: { required  },
      email_templates: { required },
      service_executive_email_templates: { required }
    },
    file: {required}
  },
  created() {
    this.getClients()
    this.getClientCategories()
    this.getSkus()
    this.getCustomerReturnReasons()
    this.getStatus()
    this.getEmailTemplates()
  },
  methods:{
   addEscalation(){
       event.preventDefault()
      this.escalations.push({
        escalation_duration:'',
        escalation_to: '',
        escalation_copy_to: ''
      })
    },
    deleteEscalation(counter){
      this.escalations.splice(counter,1);
    },
    getClients () {
      this.$http.secured.get('/admin/clients')
        .then(response => {this.clients = response.data.clients })
        .catch(error => this.$toast.error('Error in fetching clients'))
    },
    getSkus () {
      this.$http.secured.get('/api/v1/lookups/get_client_sku_masters')
        .then(response => {this.skus = response.data.client_sku_masters })
        .catch(error => this.$toast.error('Error in fetching skus'))
    },
    maplookupValues(list){
      var roots = [], i, j;
      for (i = 0; i < list.length; i ++) {
        let lookup_values = list[i].lookup_values
          for(j=0;j<lookup_values.length;j++){
            roots.push(lookup_values[j]);
          }
      }
      return roots;
    },
    getStatus () {
      this.$http.secured.get('/api/v1/lookups/reminder_status')
        .then(response => {this.status = this.maplookupValues(response.data.lookup_keys)
         })
        .catch(error => this.$toast.error('Error in fetching status'))
    },
    getClientCategories () {
      this.$http.secured.get('/api/v1/lookups/get_client_categories')
        .then(response => {this.client_categories = response.data.client_categories })
        .catch(error => this.$toast.error('Error in fetching Client Categories'))
      // this.$http.secured.get('/admin/client_categories')
      //   .then(response => {this.client_categories = response.data.client_categories })
      //   .catch(error => this.$toast.error('Error in fetching orderTypes'))
    },
    getCustomerReturnReasons () {
        this.$http.secured.get('/api/v1/lookups/get_customer_return_reasons')
          .then(response => { this.customer_return_reassons = response.data.customer_return_reasons })
          .catch(error => this.$toast.error('Error in fetching customer return reasons'))
    },
    getEmailTemplates () {
      this.$http.secured.get('/admin/email_templates')
        .then(response => {this.email_templates = response.data.email_templates })
        .catch(error => this.$toast.error('Error in fetching Email Templates'))
    },
    assignSku () {      
      this.newReminder.sku_id = this.newReminder.skus.id
    },
    assignApprovalRequired () {      
      this.newReminder.approvals_required_id = this.newReminder.approval_required.name
    },
    assignClientCategory () {      
      this.newReminder.client_category_id = this.newReminder.client_categories.id
    },
    assignReturnReason () {
      this.newReminder.customer_return_reasson_id = this.newReminder.customer_return_reassons.id
    },
    assignStatus () {
      this.newReminder.status_id = this.newReminder.status.id
    },
    assignEmailTemplate () {
      this.newReminder.email_template_id = this.newReminder.email_templates.id
    },
    assignServiceExecutiveEmailTemplate () {
      this.newReminder.service_executive_email_template_id = this.newReminder.service_executive_email_templates.id
    },
    addReminder () {
      this.$v.newReminder.$touch();
        if (this.$v.newReminder.$invalid) {
            return;
        }

      let details = {copy_to:this.newReminder.copy_to,
          reminder_1:this.newReminder.reminder_1,
          reminder_2: this.newReminder.reminder_2,
          approval_to: this.newReminder.approval_to,
          email_template_id: this.newReminder.email_template_id,
          service_executive_email_template_id: this.newReminder.service_executive_email_template_id,
          escalation: this.escalations }
      let reminder_data = { 
          reminder: { status_id: this.newReminder.status_id,
          client_category_id: this.newReminder.client_category_id, 
          customer_return_reason_id: this.newReminder.customer_return_reasson_id, 
          sku_master_id: this.newReminder.sku_id,  
          approval_required: this.newReminder.approvals_required_id,
        //   copy_to: this.newReminder.copy_to,
        //   reminder_1: this.newReminder.reminder_1,
        //   reminder_2: this.newReminder.reminder_2,
          details:details } 
          }   
      this.$http.secured.post('/admin/reminders', reminder_data)
        .then(response => { let res = response;
          this.$router.push('/admin/reminders');
          this.$toast.success('Reminder added successfully!');
        })
        .catch(error => this.$toast.error('Error in adding Reminder'))
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
      this.$http.secured.post('/admin/reminders/import',formData)
        .then(response => {
          this.$router.push('/admin/reminders');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing Reminders'))
    }     
  }
}
</script>

<style scoped>
span:hover{
  color: brown;
}
</style>