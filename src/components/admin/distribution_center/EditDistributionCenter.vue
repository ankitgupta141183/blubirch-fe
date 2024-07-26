<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Distribution Center</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminDistributionCenters'}">List Distribution Centers</router-link>
        </div>
      </div>
    </div>

    <div class="card-body">
      <form @submit.prevent="updateDC">
        <div class="row">
          <div class="col-4 form-item mb-3">
            <label for="name" class="d-flex">Name</label>
            <input type="text" placeholder="Name" v-model="editDC.name" class="form-control" id="name" required />
          </div>
          <div class="col-4 form-item mb-3">
            <label for="address_line1" class="d-flex">Address Line 1</label>
            <input type="text" placeholder="Address Line 1" v-model="editDC.address_line1" class="form-control" id="address_line1" required />
          </div>
          <div class="col-4 form-item mb-3">
            <label for="address_line2" class="d-flex">Address Line 2</label>
            <input type="text" placeholder="Address Line 2" v-model="editDC.address_line2" class="form-control" id="address_line2" required />
          </div>
          <div class="col-4 form-item mb-3">
            <label for="address_line3" class="d-flex">Address Line 3</label>
            <input type="text" placeholder="Address Line 3" v-model="editDC.address_line3" class="form-control" id="address_line3" />
          </div>
          <div class="col-4 form-item mb-3">
            <label for="address_line4" class="d-flex">Address Line 4</label>
            <input type="text" placeholder="Address Line 4" v-model="editDC.address_line4" class="form-control" id="address_line4" />
          </div>
          <div class="col-4 form-item mb-3">
            <label for="country" class="d-flex">Country</label>
            <multiselect id="country" placeholder="Select Country" v-model= "editDC.selected_country" :options="countries" label="original_code" track-by="id" @input="setCountryId"></multiselect>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="state" class="d-flex">State</label>
            <multiselect id="state" placeholder="Select State" v-model= "editDC.selected_state" :options="states" label="original_code" track-by="id" @input="setStateId"></multiselect>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="city" class="d-flex">City</label>
            <multiselect id="city" placeholder="Select City" v-model= "editDC.selected_city" :options="cities" label="original_code" track-by="id" @input="setCityId"></multiselect>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="parnet_distribution_center" class="d-flex">Parent</label>
            <multiselect id="parnet_distribution_center" placeholder="Select Parent Distribution Center" v-model= "editDC.parent" :options="distribution_centers" label="name" track-by="id" @input="setParent"></multiselect>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="clients" class="d-flex">Distribution Center Clients</label>
            <multiselect id="clients" placeholder="Select Client(s)" :options="clients" :multiple=" true" label="name" track-by="id" @input="assignClient" v-model= "editDC.clients"></multiselect>
          </div>
          <div class="col-4 form-item mb-3">
            <label for="client_id" class="d-flex">Distribution Center Type</label>
              <multiselect v-model="editDC.distribution_center_type" :options= "distribution_center_types"  label="original_code" track-by="id"  :searchable="true"  @select="displayFields($event)"   @input="setDistributionId" placeholder="Select Distribution Center Type" >
              </multiselect>
          </div>

            <div class="col-4 form-item mb-3">
              <label for="file" class="d-flex">Code</label>
              <input type="text" id="code" class="form-control" placeholder="Code" v-model="editDC.code" />
            </div>
        </div>

        <div class="row">
          <div class="align-self-center mx-auto">
            <input type="submit" value="Update Distribution Center" class="btn btn-primary my-2" />
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      editDC: {},
      distribution_centers: [],
      clients: [],
      cities: [],
      states: [],
      countries: [],
      distribution_center_types: [],
      distribution_center_type: ''
    }
  },
  created () {
    this.$http.secured.get('/admin/distribution_centers/' + this.$route.params.id)
      .then(response => { this.editDC = response.data.distribution_center, 
                          this.cities = response.data.distribution_center.state_based_cities, 
                          this.states = response.data.distribution_center.country_based_states 

                           })

      .catch(error => this.$toast.error('Error in getting distribution_center information'))

      this.$http.secured.get('/api/v1/lookups/get_distribution_center_types')
        .then(response => {this.distribution_center_types = response.data.lookup_values })
        .catch(error => this.$toast.error('Error in fetching distrinbution certer type'))

    this.$http.secured.get('/admin/distribution_centers')
      .then(response => { this.distribution_centers = response.data.distribution_centers })
      .catch(error => this.$toast.error('Error in getting distribution centers'))
    this.$http.secured.get('/admin/clients')
      .then(response => { this.clients = response.data.clients })
      .catch(error => this.$toast.error('Error in getting clients information'))
    this.$http.secured.get('/api/v1/lookups/country')
      .then(response => { this.countries = response.data.lookup_key.lookup_values })
      .catch(error => this.$toast.error('Error in getting countries'))
  },
  methods: {
    updateDC () {
      this.$http.secured.put('/admin/distribution_centers/' + this.$route.params.id,
        { distribution_center:
          { name: this.editDC.name,
            address_line1: this.editDC.address_line1,
            address_line2: this.editDC.address_line2,
            address_line3: this.editDC.address_line3,
            address_line4: this.editDC.address_line4,
            parent_id: this.editDC.parent_id,
            client_ids: this.editDC.client_ids,
            city_id: this.editDC.city_id,
            state_id: this.editDC.state_id,
            country_id: this.editDC.country_id,
            distribution_center_type_id: this.distribution_center_type,
            code:  this.editDC.code
          }
        })
        .then(response => {
          this.$router.push('/admin/distribution_centers')
          this.$toast.success('Distribution Center updated successfully')
        })
        .catch(error => this.$toast.error('Error in updating distribution center'))
    },
    assignClient () {
      if (this.editDC.clients != null) {
        let clientIds = this.editDC.clients.map(
          function (client) {
            return client.id
          })
        this.editDC.client_ids = clientIds
      }
    },
    setDistributionId() {
            if (this.editDC.distribution_center_type != null) {
        this.distribution_center_type = this.editDC.distribution_center_type.id
      }
    },
    setParent () {
      if (this.editDC.parent != null) {
        this.editDC.parent_id = this.editDC.parent.id
      }
    },
    setCityId () {
      if (this.editDC.selected_city != null) {
        this.editDC.city_id = this.editDC.selected_city.id
      }
    },
    // displayFields: function(event){
    //   if (event.code == 'distribution_cnt_types_warehouse'){
    //     this.warehouse_code = true
    //     this.vendor_code = false
    //   }else if (event.code == 'distribution_cnt_types_store'){
    //     this.warehouse_code = false
    //     this.vendor_code = true
    //   }
    // },
    setStateId () {
      if (this.editDC.selected_state != null) {
        this.editDC.state_id = this.editDC.selected_state.id
        this.$http.secured.get('/api/v1/lookups/get_child_values', {params: {parent_id: this.editDC.state_id}})
          .then(response => { this.cities = response.data.lookup_values })
          .catch(error => this.$toast.error('Error in getting cities'))
      }
    },
    setCountryId () {
      if (this.editDC.selected_country != null) {
        this.editDC.country_id = this.editDC.selected_country.id
        this.$http.secured.get('/api/v1/lookups/get_child_values', {params: {parent_id: this.editDC.country_id}})
          .then(response => { this.states = response.data.lookup_values })
          .catch(error => this.$toast.error('Error in getting states'))
      }
    }
  }
}
</script>