<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Invoice</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminInvoices'}">List Invoices</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Id:</label> 
            <div class="col-8">
              {{invoice.id}}
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Distribution Center:</label> 
            <div class="col-8">
              {{invoice.distribution_center ? invoice.distribution_center.name : ""}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Invoice Number:</label> 
            <div class="col-8">
              {{invoice.invoice_number}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Code:</label> 
            <div class="col-8">
              {{invoice.details["code"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Currency:</label> 
            <div class="col-8">
              {{invoice.details["curr"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Net Value:</label> 
            <div class="col-8">
              {{invoice.details["net_value"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Plant:</label> 
            <div class="col-8">
              {{invoice.details["plant"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Material:</label> 
            <div class="col-8">
              {{invoice.details["material"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Quantity:</label> 
            <div class="col-8">
              {{invoice.details["qty"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Status Order:</label> 
            <div class="col-8">
              {{invoice.details["status_order"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">CN No:</label> 
            <div class="col-8">
              {{invoice.details["cn_no"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">CN Date:</label> 
            <div class="col-8">
              {{invoice.details["cn_date"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Remark:</label> 
            <div class="col-8">
              {{invoice.details["remark"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Location:</label> 
            <div class="col-8">
              {{invoice.details["location"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Months:</label> 
            <div class="col-8">
              {{invoice.details["months"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Position No:</label> 
            <div class="col-8">
              {{invoice.details["position_no"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Position Date:</label> 
            <div class="col-8">
              {{invoice.details["position_date"]}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Created At:</label> 
            <div class="col-8">
              {{invoice.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Updated At:</label> 
            <div class="col-8">
              {{invoice.updated_at}}
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
      invoice: {
        id: '',
        distribution_center_id: '',
        invoice_number: '',
        details: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  created() {
    this.getInvoice()
  },
  methods: {
    getInvoice () {
      this.$http.secured.get('/admin/invoices/'+this.$route.params.id)
        .then(response => {
          this.invoice = response.data.invoice;          
        })
        .catch(error => {
          this.$toast.success('Error in fetching value')
        })
    }
  }

}

</script>