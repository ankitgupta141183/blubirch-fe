<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Invoice</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminInvoices'}">List Invoice</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addInvoice">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="lookup_key" class="d-flex">Distribution Center</label>
              <multiselect v-model="newInvoice.distribution_center_id" :options="select_distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center" :class="{ 'is-invalid': $v.newInvoice.distribution_center_id.$error }">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.distribution_center_id.required">Distribution Center is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Clients</label>
              <multiselect id="clients" placeholder="Select Client" v-model= "newInvoice.client_id" :options="clients" label="name" track-by="id"  :class="{ 'is-invalid': $v.newInvoice.client_id.$error}"></multiselect>
               <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.client_id.required">Client is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Invoice Number</label>
              <input type="text" placeholder="Invoice Number" v-model="newInvoice.invoice_number" class="form-control" id="invoice_number" :class="{ 'is-invalid': $v.newInvoice.invoice_number.$error, 'is-valid': !$v.newInvoice.invoice_number.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.invoice_number.required">Invoice Number is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newInvoice.details.code" class="form-control" id="code" :class="{ 'is-invalid': $v.newInvoice.details.code.$error, 'is-valid': !$v.newInvoice.details.code.$invalid }">
               <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.code.required">Code is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Currency</label>
              <input type="text" placeholder="Currency" v-model="newInvoice.details.curr" class="form-control" id="curr" :class="{ 'is-invalid': $v.newInvoice.details.curr.$error, 'is-valid': !$v.newInvoice.details.curr.$invalid }">
               <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.curr.required">Currency is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Net Value</label>
              <input type="text" placeholder="Net Value" v-model="newInvoice.details.net_value" class="form-control" id="net_value" :class="{ 'is-invalid': $v.newInvoice.details.net_value.$error, 'is-valid': !$v.newInvoice.details.net_value.$invalid }">
               <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.net_value.required">Net Value is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Plant</label>
              <input type="text" placeholder="Plant" v-model="newInvoice.details.plant" class="form-control" id="plant" :class="{ 'is-invalid': $v.newInvoice.details.plant.$error, 'is-valid': !$v.newInvoice.details.plant.$invalid }">
               <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.plant.required">Plant is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Material</label>
              <input type="text" placeholder="Material" v-model="newInvoice.details.material" class="form-control" id="material" :class="{ 'is-invalid': $v.newInvoice.details.material.$error, 'is-valid': !$v.newInvoice.details.material.$invalid }">
               <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.material.required">material is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Quantity</label>
              <input type="text" placeholder="Quantity" v-model="newInvoice.details.qty" class="form-control" id="qty" :class="{ 'is-invalid': $v.newInvoice.details.qty.$error, 'is-valid': !$v.newInvoice.details.qty.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.qty.required">Quantity is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Status Order</label>
              <input type="text" placeholder="Status Order" v-model="newInvoice.details.status_order" class="form-control" id="status_order" :class="{ 'is-invalid': $v.newInvoice.details.status_order.$error, 'is-valid': !$v.newInvoice.details.status_order.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.status_order.required">Status Order is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">CN No</label>
              <input type="text" placeholder="CN No" v-model="newInvoice.details.cn_no" class="form-control" id="cn_no" :class="{ 'is-invalid': $v.newInvoice.details.cn_no.$error, 'is-valid': !$v.newInvoice.details.cn_no.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.cn_no.required">CN No is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">CN Date</label>
              <input type="date" placeholder="CN Date" v-model="newInvoice.details.cn_date" class="form-control" id="cn_date" >
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Remark</label>
              <input type="text" placeholder="Remark" v-model="newInvoice.details.remark" class="form-control" id="remark" :class="{ 'is-invalid': $v.newInvoice.details.remark.$error, 'is-valid': !$v.newInvoice.details.remark.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.remark.required">Remark is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Location</label>
              <input type="text" placeholder="Location" v-model="newInvoice.details.location" class="form-control" id="location" :class="{ 'is-invalid': $v.newInvoice.details.location.$error, 'is-valid': !$v.newInvoice.details.location.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.location.required">Location is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Months</label>
              <input type="text" placeholder="Months" v-model="newInvoice.details.months" class="form-control" id="months" :class="{ 'is-invalid': $v.newInvoice.details.months.$error, 'is-valid': !$v.newInvoice.details.months.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.months.required">Months is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Position No</label>
              <input type="text" placeholder="Position No" v-model="newInvoice.details.position_no" class="form-control" id="position_no" :class="{ 'is-invalid': $v.newInvoice.details.position_no.$error, 'is-valid': !$v.newInvoice.details.position_no.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newInvoice.details.position_no.required">Position No is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Position Date</label>
              <input type="date" placeholder="Position Date" v-model="newInvoice.details.position_date" class="form-control" id="position_date" >
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Invoices File </label>
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
import Multiselect from 'vue-multiselect'
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      file: "",
      select_distribution_center: [],
      select_channel: [],
      clients: [],
      details_hash: {},
      newInvoice: {
        'distribution_center_id': '',
        'invoice_number': '',
        'details': {}
      },

      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_center = response.data.distribution_centers })
      } 
  },

  validations: {
    newInvoice: {
      distribution_center_id : {required} ,
        invoice_number: {required},
        client_id: {required},
        details: {
          code: {required},
          curr: {required},
          plant: {required},
          net_value: {required},
          material: {required},
          qty: {required},
          status_order: {required},
          cn_no: {required},
          remark: {required},
          location: {required},
          months: {required},
          position_no: {required}
        }
    },
    file: {required}
  },

  created() {

    this.$http.secured.get('/admin/clients')
      .then(response => { this.clients = response.data.clients })
      .catch(error => this.$toast.error('Error in fetching clients'))
  },
  methods:{
  	addInvoice () {  
        this.$v.newInvoice.$touch();
        if (this.$v.newInvoice.$invalid) {
            return;
        }
      this.$http.secured.post('/admin/invoices', {invoice: { client_id: this.newInvoice.client_id.id,  distribution_center_id: this.newInvoice.distribution_center_id.id, invoice_number: this.newInvoice.invoice_number, details: this.newInvoice.details}})
        .then(response => {
          this.$router.push('/admin/invoices');
          this.$toast.success('Invoice successfully created');
        })
        .catch(error => this.$toast.error('Error in creating Invoice'))
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
      this.$http.secured.post('/admin/invoices/import',formData)
        .then(response => {
          this.$router.push('/admin/invoices');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing invoices'))
    } 
  }

}

</script>