<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Upload Multiple Distribution Centers</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminDistributionCenters'}">List Distribution Centers</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">

      <form @submit.prevent="createDC">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newDC.name" class="form-control" id="name" :class="{'is-invalid': $v.newDC.name.$error}">
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.name.required">Name is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Address Line 1</label>
              <input type="text" placeholder="Address Line 1" v-model="newDC.address_line1" class="form-control" id="address_line1" :class="{'is-invalid': $v.newDC.address_line1.$error}">
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.address_line1.required">Address Line 1 is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Address Line 2</label>
              <input type="text" placeholder="Address Line 2" v-model="newDC.address_line2" class="form-control" id="address_line2" :class="{'is-invalid': $v.newDC.address_line2.$error}">
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.address_line2.required">Address Line 2 is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Address Line 3</label>
              <input type="text" placeholder="Address Line 3" v-model="newDC.address_line3" class="form-control" id="address_line3" :class="{'is-invalid': $v.newDC.address_line3.$error}">
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.address_line3.required">Address Line 3 is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Address Line 4</label>
              <input type="text" placeholder="Address Line 4" v-model="newDC.address_line4" class="form-control" id="address_line4" :class="{'is-invalid': $v.newDC.address_line4.$error}">
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.address_line4.required">Address Line 4 is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
            <label for="country" class="d-flex">Country</label>
            <multiselect id="country" placeholder="Select Country" v-model= "newDC.selected_country" :options="countries" label="original_code" track-by="id" @input="setCountryId" :class="{'is-invalid': $v.newDC.selected_country.$error}"></multiselect>
            <div class="invalid-feedback">
                <span v-if="!$v.newDC.selected_country.required">Country is required</span>
              </div>
          </div>
          <div class="form-group col-md-6">
            <label for="state" class="d-flex">State</label>
            <multiselect id="state" placeholder="Select State" v-model= "newDC.selected_state" :options="states" label="original_code" track-by="id" @input="setStateId" :class="{'is-invalid': $v.newDC.selected_state.$error}"></multiselect>
            <div class="invalid-feedback">
                <span v-if="!$v.newDC.selected_state.required">State is required</span>
              </div>
          </div>
          <div class="form-group col-md-6">
            <label for="city" class="d-flex">City</label>
            <multiselect id="city" placeholder="Select City" v-model= "newDC.selected_city" :options="cities" label="original_code" track-by="id" @input="setCityId" :class="{'is-invalid': $v.newDC.selected_city.$error}"></multiselect>
            <div class="invalid-feedback">
                <span v-if="!$v.newDC.selected_city.required">City is required</span>
              </div>
          </div>
          <div class="form-group col-md-6">
            <label for="parnet_distribution_center" class="d-flex">Parent</label>
            <multiselect id="parnet_distribution_center" placeholder="Select Parent Distribution Center" v-model= "newDC.parent" :options="distribution_centers" label="name" track-by="id" ></multiselect>
          </div>
          <div class="form-group col-md-6">
            <label for="client_id" class="d-flex">Distribution Center Type</label>
              <multiselect v-model="newDC.dc_type" :options= "distribution_center_types"  label="original_code" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" @select="displayFields($event)" :allow-empty="false"  @input="setDistributionId" placeholder="Select Distribution Center Type"  :class="{'is-invalid': $v.newDC.dc_type.$error}">
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.dc_type.required">Distribution Center Type is required</span>
              </div>
              </multiselect>
          </div>
          
            
            <div class="form-group col-md-6">
              <label for="file" class="d-flex">Code</label>
              <input type="text" id="code" class="form-control" placeholder="Code" v-model="newDC.code" :class="{'is-invalid': $v.newDC.code.$error}"/>
              <div class="invalid-feedback">
                <span v-if="!$v.newDC.code.required">Code is required</span>
              </div>
            </div>
           </div> 
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>


       <form @submit.prevent="createItem">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="client_id" class="d-flex">Distribution Center Type</label>
              <multiselect v-model="search.distribution_center_type_id" :options= "distribution_center_types"  label="original_code" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" @select="displayField($event)" :allow-empty="false"  @input="setDistributionId" placeholder="Select Distribution Center Type"  :class="{'is-invalid': $v.search.distribution_center_type_id.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.search.distribution_center_type_id.required">Distribution Center Type is required</span>
              </div>
            </div>

            
            <div  class="form-group col-md-4">
              <label for="file" class="d-flex">Code</label>
              <input type="text" id="code" class="form-control" placeholder="Code" v-model="search.code"/>
            </div>

            <div class="form-group col-md-4">
              <label for="file" class="d-flex">upload File</label>
              <input type="file" ref="inputFile"  class="form-control" id="file" @change=uploadFile() :class="{ 'is-invalid': $v.getFile.$error , 'is-valid': !$v.getFile.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.getFile.required">Upload File</span>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Upload</button>
        </form>
      
    </div>
  </div>  

</template>


<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Upload',
  data () {
    return {
      search: {},
      getFile: null,
      distribution_center_type_id: '',
      distribution_center_types:[],
      warehouse_code: '',
      vendor_code: '',
      warehouse: false,
      vendor: false,
      warehouse_codes: false,
      vendor_codes: false,
      warehouse_required: false,
      vendor_required: false,
      newDC: {},
      countries: [],
      states: [],
      cities: [],
      distribution_centers: []
    }
  },
  validations: {
      search: {
        distribution_center_type_id: { required }
      },
      getFile: { required },
      newDC: {
        name: { required },
        address_line1: { required},
        address_line2: {required},
        address_line3: {required},
        address_line4: {required},
        selected_country: {required},
        selected_state: {required},
        selected_city: {required},
        dc_type: {required},
        code: {required}


      },
  },
  created() {
    this.$http.secured.get('/admin/distribution_centers')
        .then(response => { 
          this.distribution_centers = response.data.distribution_centers })
        .catch(error => this.$toast.error('Error in fetching distrinbution certer type'))
    
    this.$http.secured.get('/api/v1/lookups/get_distribution_center_types')
        .then(response => {this.distribution_center_types = response.data.lookup_values })
        .catch(error => this.$toast.error('Error in fetching distrinbution certer type'))

        this.$http.secured.get('/api/v1/lookups/country')
      .then(response => { this.countries = response.data.lookup_key.lookup_values })
      .catch(error => this.$toast.error('Error in getting countries'))
      
  },
  methods: {
    createDC(){
       this.$v.newDC.$touch();
      if (this.$v.newDC.$invalid) {
          return;
      }
       

       this.$http.secured.post('/admin/distribution_centers', {distribution_center: 
         { name: this.newDC.name, address_line1: this.newDC.address_line1, address_line2: this.newDC.address_line2 ,
          address_line3: this.newDC.address_line3, address_line4: this.newDC.address_line4, country_id: this.newDC.country_id,
          state_id: this.newDC.state_id, city_id: this.newDC.city_id, parent:this.newDC.parent_id, 
          distribution_center_type_id: this.newDC.dc_type.id, code: this.newDC.code } 
        })
        .then(response => {
          this.$router.push('/admin/distribution_centers');
          this.$toast.success('Client successfully created');
        })
        .catch(error => this.$toast.error('Error in creating client'))

    },
    setParent () {
      if (this.newDC.parent != null) {
        this.newDC.parent_id = this.newDC.parent.id
      }
    },
    setCityId () {
      if (this.newDC.selected_city != null) {
        this.newDC.city_id = this.newDC.selected_city.id
      }
    },
    setStateId () {
      if (this.newDC.selected_state != null) {
        this.newDC.state_id = this.newDC.selected_state.id
        this.$http.secured.get('/api/v1/lookups/get_child_values', {params: {parent_id: this.newDC.state_id}})
          .then(response => { this.cities = response.data.lookup_values })
          .catch(error => this.$toast.error('Error in getting cities'))
      }
    },
    setCountryId () {
      if (this.newDC.selected_country != null) {
        this.newDC.country_id = this.newDC.selected_country.id
        this.$http.secured.get('/api/v1/lookups/get_child_values', {params: {parent_id: this.newDC.country_id}})
          .then(response => { this.states = response.data.lookup_values })
          .catch(error => this.$toast.error('Error in getting states'))
      }
    },

    setDistributionId() {
            if (this.search.distribution_center_type_id != null) {
        this.distribution_center_type_id = this.search.distribution_center_type_id.id
      }


    },
    uploadFile: function() {
      this.getFile = this.$refs.inputFile.files[0]
    },

    displayField: function(event){
      if (event.code == 'distribution_cnt_types_warehouse'){
        this.warehouse = true
        this.vendor = false
      }else if (event.code == 'distribution_cnt_types_store'){
        this.warehouse = false
        this.vendor = true
      }
    },
    displayFields: function(event){
      if (event.code == 'distribution_cnt_types_warehouse'){
        this.warehouse_codes = true
        this.vendor_codes = false
      }else if (event.code == 'distribution_cnt_types_store'){
        this.warehouse_codes = false
        this.vendor_codes = true
      }
    },
    createItem: function() {
      this.$v.search.$touch();
      if (this.$v.search.$invalid) {
          return;
      }
       
      // if (this.warehouse && this.warehouse_code == ''){
      //   this.warehouse_required = true
      //   return
      // }else if (this.vendor && this.vendor_code == ''){
      //   this.vendor_required = true
      //   return
      // }

      const params = {
        'file': this.getFile,
        'distribution_center_type' : this.distribution_center_type_id,
        'code' :  this.search.code
      }
      // if (this.warehouse) {
      //   params.warehouse_code = this.warehouse_code
      // }else if (this.vendor) {
      //   params.vendor_code = this.vendor_code
      // }

      let formData = new FormData()

      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )
      this.$http.secured.post('/admin/distribution_centers/distribution_center_uploads', formData)
        .then(response => {
          this.$router.push('/admin/distribution_centers');
          this.$toast.success('successfully uploaded');
        })
      .catch(error => this.$toast.error('Error in Creating records'))
    }
  }

}
</script>
<style lang="css">

</style>