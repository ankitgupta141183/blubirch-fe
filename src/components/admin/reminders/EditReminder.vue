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
       <form @submit.prevent="updateReminder">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="sku_id" class="d-flex">SKU</label>
              <multiselect id="sku_id" placeholder="Select SKU" v-model= "editReminder.client_sku_master" :options="skus" label="code" track-by="id" @input="assignSku"></multiselect>              
            </div>
            <div class="form-group col-md-6">
              <label for="status_id" class="d-flex">Status</label>
              <multiselect id="status_id" placeholder="Select Status" v-model= "editReminder.status" :options="status" label="original_code" track-by="id" @input="assignStatus"></multiselect>              
            </div>
            <div class="form-group col-md-6">
              <label for="return_reason_id" class="d-flex">Return Reason</label>
              <multiselect id="return_reason_id" placeholder="Select Return Reason" v-model= "editReminder.customer_return_reason" :options="customer_return_reassons" label="name" track-by="id" @input="assignReturnReason"></multiselect>              
            </div>
            
            <div class="form-group col-md-6">
              <label for="approval_required_id" class="d-flex">Approval Required</label>
              <input type="checkbox" :checked="false" class="radio-button" :name="editReminder.approval_required" v-model="editReminder.approval_required" id="grading_required">

            </div>
            <div class="form-group col-md-6">
              <label for="client_category_id" class="d-flex">Client Category</label>
              <multiselect id="client_category_id" placeholder="Select Approval Required" v-model= "editReminder.client_category" :options="client_categories" label="name" track-by="id" @input="assignClientCategory"></multiselect>              
            </div>

            <div class="form-group col-md-6">
              <label for="approval_to" class="d-flex">Approval To</label>
              <input type="text" placeholder="Approval To" v-model="editReminder.details.approval_to" class="form-control" id="approval_to">
            </div>
            <div class="form-group col-md-6">
              <label for="copy_to" class="d-flex">Copy To</label>
              <input type="text" placeholder="Copy To" v-model="editReminder.details.copy_to" class="form-control" id="copy_to">
            </div>

            <div class="form-group col-md-6">
              <label for="reminder_1" class="d-flex">Reminder 1</label>
              <input type="text" placeholder="Reminder 1" v-model="editReminder.details.reminder_1" class="form-control" id="reminder_1">
            </div>
            <div class="form-group col-md-6">
              <label for="reminder_2" class="d-flex">Reminder 2</label>
              <input type="text" placeholder="Reminder 2" v-model="editReminder.details.reminder_2" class="form-control" id="reminder_2">
            </div>
            <div class="form-group col-md-6">
              <label for="return_reason_id" class="d-flex">Email Template</label>
              <multiselect id="email_template_id" placeholder="Select Email Template" v-model= "editReminder.email_template" :options="email_templates" label="name" track-by="id" @input="assignEmailTemplate"></multiselect>              
            </div>
            <div class="form-group col-md-6">
              <label for="return_reason_id" class="d-flex">Service Executive Email Template</label>
              <multiselect id="email_template_id" placeholder="Select Email Template" v-model= "editReminder.service_executive_email_template" :options="email_templates" label="name" track-by="id" @input="assignServiceExecutiveEmailTemplate"></multiselect>              
            </div>
            <div class="form-group col-md-12">
              <button @click="addEscalation" class="btn btn-primary my-2">Add Escalation</button>
            </div>

         
      <br>
        <div class="form-group col-md-12 escalation-box"
        v-for="(escalation, counter) in escalations"
        v-bind:key="counter" style="border: 1px solid #e8e8e8; padding: 10px;">
            <!-- <span @click="deleteEscalation(counter)" class="escalation-remove" title="Remove">X</span> -->
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

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
        <hr/>       
      
    </div>
  </div>  

</template>

<script>
export default {
  data () {
    return {
      escalations:[],
      clients: [],
      customer_return_reassons: [],
      email_templates: [],
      approvals_required: [{name:'true'},{name: 'false'}],
      skus:[],
      status:[],
      client_categories:[],
      // approval_to:'',
      editReminder: {}
    }
  },
  computed:{
  },
  created() {
    this.getRemindersById(this.$route.params.id)
    
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
        .then(response => {this.status = this.maplookupValues(response.data.lookup_keys)})
        .catch(error => this.$toast.error('Error in fetching status'))
    },
    getClientCategories () {
      this.$http.secured.get('/admin/client_categories')
        .then(response => {this.client_categories = response.data.client_categories })
        .catch(error => this.$toast.error('Error in fetching orderTypes'))
    },
    getCustomerReturnReasons () {
        this.$http.secured.get('/api/v1/lookups/get_customer_return_reasons')
          .then(response => { this.customer_return_reassons = response.data.customer_return_reasons })
          .catch(error => this.$toast.error('Error in fetching customer return reasons'))
    },
    getEmailTemplates () {
        this.$http.secured.get('/admin/email_templates')
          .then(response => { this.email_templates = response.data.email_templates })
          .catch(error => this.$toast.error('Error in fetching customer email_templates'))
    },
    assignSku () {      
      this.editReminder.sku_id = this.editReminder.client_sku_master.id
    },
    assignApprovalRequired () {      
      this.editReminder.approvals_required_id = this.editReminder.approvals_required.id
    },
    assignClientCategory () {      
      this.editReminder.client_category_id = this.editReminder.client_category.id
    },
    assignReturnReason () {
      this.editReminder.customer_return_reason_id = this.editReminder.customer_return_reason.id
    },
    assignStatus () {
      this.editReminder.status_id = this.editReminder.status.id
    },
    assignEmailTemplate (){
      this.editReminder.details.email_template_id = this.editReminder.email_template.id
    },
    assignServiceExecutiveEmailTemplate (){
      this.editReminder.details.service_executive_email_template_id = this.editReminder.service_executive_email_template.id
    },
    getRemindersById(id){
      this.$http.secured.get('/admin/reminders/'+id)
        .then(response => { this.editReminder = response.data.reminder,
        this.escalations = response.data.reminder.details.escalation,
        this.getClients(),
        this.getClientCategories(),
        this.getSkus(),
        this.getCustomerReturnReasons(),
        this.getStatus(),
        this.getEmailTemplates() })
        .catch(error => this.$toast.error('Error in getting reminder information'))
    },
    updateReminder () {
     
      let details = {copy_to:this.editReminder.copy_to,
          reminder_1:this.editReminder.details.reminder_1,
          reminder_2: this.editReminder.details.reminder_2,
          approval_to: this.editReminder.details.approval_to,
          copy_to: this.editReminder.details.copy_to,
          email_template_id: this.editReminder.details.email_template_id,
          service_executive_email_template_id: this.editReminder.details.service_executive_email_template_id,
          escalation: this.escalations }     

      let edit_reminder_data = { 
          reminder: { sku_master_id: this.editReminder.sku_id, 
          client_category_id: this.editReminder.client_category_id, 
          status_id: this.editReminder.status_id,
          customer_return_reason_id: this.editReminder.customer_return_reason_id,
          approval_required: this.editReminder.approval_required,
          approval_to: this.editReminder.approval_to?this.editReminder.approval_to:"", 
          details:details
            } 
          }   
      this.$http.secured.put('/admin/reminders/'+this.$route.params.id, edit_reminder_data)
        .then(response => {
          this.$router.push('/admin/reminders');
          this.$toast.success('reminder successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating reminder'))
    }    
  }
}
</script>

<style scoped>
span:hover{
  color: brown;
}
</style>
