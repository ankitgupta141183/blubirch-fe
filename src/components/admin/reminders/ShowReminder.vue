<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Reminder</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminReminders'}">List Reminder</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="sku" class="col-4 col-form-label">Sku:</label> 
            <div class="col-8">
               {{reminder.client_sku_master ? reminder.client_sku_master.code : ""}}
            </div>
          </div>
          <div class="form-group row">
            <label for="Template" class="col-4 col-form-label">Category:</label> 
            <div class="col-8">
               {{reminder.client_category ? reminder.client_category.name : ""}}
            </div>
          </div>
          <div class="form-group row">
            <label for="order_number" class="col-4 col-form-label">Status:</label> 
            <div class="col-8">
              {{reminder.status ? reminder.status.original_code:""}}
            </div>
          </div>  
          <div class="form-group row">
            <label for="order_number" class="col-4 col-form-label">Return reason:</label> 
            <div class="col-8">
               {{reminder.customer_return_reason ? reminder.customer_return_reason.name : ""}}
            </div>
          </div>          
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Email Template:</label> 
            <div class="col-8">
              {{reminder.details ? reminder.details.email_template_id : "" }}
            </div>
          </div>  
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Service Executive Email Template:</label> 
            <div class="col-8">
              {{reminder.details ? reminder.details.service_executive_email_template_id : "" }}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Approval Required:</label> 
            <div class="col-8">
              {{reminder.approval_required}}
            </div>
          </div>           
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Approval To:</label> 
            <div class="col-8">
              {{reminder.details ? reminder.details.approval_to : ""}}
            </div>
          </div> 
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Copy To:</label> 
            <div class="col-8">
              {{reminder.details ? reminder.details.copy_to : "" }}
            </div>
          </div> 
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Reminder 1:</label> 
            <div class="col-8">
              {{reminder.details ? reminder.details.reminder_1 : ""}}
            </div>
          </div>  
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Reminder 2:</label> 
            <div class="col-8">
              {{reminder.details ? reminder.details.reminder_2 : ""}}
            </div>
          </div>                                                
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{reminder.created_at}}
            </div>
          </div> 
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{reminder.updated_at}}
            </div>
          </div>

          <br>
          <!-- Escalations -->
          <div v-if="reminder.details && reminder.details.escalation">
            <div class="form-group col-md-12 escalation-box" v-for="(escalation, counter) in reminder.details.escalation" v-bind:key="counter">
              <div class="form-group row">
                <label for="escalation_duration" class="col-4 col-form-label"> {{counter+1}}. Escalation Duration</label>
                <div class="col-8">
                {{escalation.escalation_duration}}
                </div>
              </div>
              <div class="form-group row">
                <label for="escalation_to" class="col-4 col-form-label">Escalation To</label>
                <div class="col-8">
                {{escalation.escalation_to}}
                </div>        
              </div>
              <div class="form-group row">
                <label for="escalation_copy_to" class="col-4 col-form-label">Escalation CopyTo</label>
                <div class="col-8">
                {{escalation.escalation_copy_to}}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data () {
    return {
      reminder: {
        id: '',
        sku: '',
        category: '',
        status: '',
        return_reason: '',
        approval_required: '',
        approval_to: '',
        copy_to: '',
        reminder1: '',
        reminder2: '',
       // escalations:'',
      //  updated_at: ''
      }
    }
  },
  created() {
    this.getRemainder()
  },
  methods: {
    getRemainder () {
      this.$http.secured.get('/admin/reminders/'+this.$route.params.id)
        .then(response => {
            this.reminder = response.data.reminder
            //this.escalations = response.data.reminder.details.escalation;
        })
        .catch(error => {
          this.$toast.success('Error in fetching reminders')
        })
    }
  }
}
</script>