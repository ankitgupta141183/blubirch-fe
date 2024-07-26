<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Invoice</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminInvoices'}">List Invoices</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form @submit.prevent="updateInvoice">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="distribution_center_id" class="d-flex">Distribution Center</label>
            <multiselect v-model="editInvoice.distribution_center_id" :options="select_distribution_centers" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center">
            </multiselect>
          </div>
          <div class="form-group col-md-6">
            <label for="invoice_number" class="d-flex">Invoice Number</label>
            <input type="text" placeholder="Invoice Number" v-model="editInvoice.invoice_number" class="form-control" id="invoice_number">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="code" class="d-flex">Code</label>
            <input type="text" placeholder="Code" v-model="editInvoice.details.code" class="form-control" id="code">
          </div>
          <div class="form-group col-md-6">
            <label for="code" class="d-flex">Currency</label>
            <input type="text" placeholder="Currency" v-model="editInvoice.details.curr" class="form-control" id="curr">
          </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Net Value</label>
              <input type="text" placeholder="Net Value" v-model="editInvoice.details.net_value" class="form-control" id="net_value">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Plant</label>
              <input type="text" placeholder="Plant" v-model="editInvoice.details.plant" class="form-control" id="plant">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Material</label>
              <input type="text" placeholder="Material" v-model="editInvoice.details.material" class="form-control" id="material">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Quantity</label>
              <input type="text" placeholder="Quantity" v-model="editInvoice.details.qty" class="form-control" id="qty">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Status Order</label>
              <input type="text" placeholder="Status Order" v-model="editInvoice.details.status_order" class="form-control" id="status_order">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">CN No</label>
              <input type="text" placeholder="CN No" v-model="editInvoice.details.cn_no" class="form-control" id="cn_no">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">CN Date</label>
              <input type="date" placeholder="CN Date" v-model="editInvoice.details.cn_date" class="form-control" id="cn_date">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Remark</label>
              <input type="text" placeholder="Remark" v-model="editInvoice.details.remark" class="form-control" id="remark">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Location</label>
              <input type="text" placeholder="Location" v-model="editInvoice.details.location" class="form-control" id="location">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Months</label>
              <input type="text" placeholder="Months" v-model="editInvoice.details.months" class="form-control" id="months">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Position No</label>
              <input type="text" placeholder="Position No" v-model="editInvoice.details.position_no" class="form-control" id="position_no">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Position Date</label>
              <input type="date" placeholder="Position Date" v-model="editInvoice.details.position_date" class="form-control" id="position_date">
            </div>
          </div>
        <button type="submit" class="btn btn-primary my-2">Update</button>
      </form>
      
    </div>
  </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
export default {

  data () {
    return {
      select_distribution_centers: [],
      editInvoice: {
        'id': '',
        'distribution_center_id': '',
        'invoice_number': '',
        'details': {}
      },
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_centers = response.data.distribution_centers })
    }
  },
  components: {
    Multiselect
  },
  created () {
    this.$http.secured.get('/admin/invoices/'+this.$route.params.id)
        .then(response => { this.editInvoice = response.data.invoice })
        .catch(error => this.$toast.error('Error in getting invoice information'))
  },

  methods:{
    updateInvoice () {
      this.$http.secured.put('/admin/invoices/'+this.$route.params.id, {invoice: { distribution_center_id: this.editInvoice.distribution_center.id, invoice_number: this.editInvoice.invoice_number, details: this.editInvoice.details} })
        .then(response => {
          this.$router.push('/admin/invoices');
          this.$toast.success('Invoice successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating Invoice'))
    }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>