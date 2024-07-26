<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Distribution Centers</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminDistributionCenter'}">Add New Distribution Center</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Name</th>
              <th>Parent</th>
              <th>Address 1</th>
              <th>Address 2</th>
              <th>City</th>
              <th>State</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td><input class="form-control col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getDistributionCenters"></td>
              <td>
                <input class="form-control col-centered" type="text" placeholder="Search Parent" aria-label="Search" v-model="parent_name" v-on:keyup.enter="getDistributionCenters">
              </td>
              <td>
                <input class="form-control col-centered" type="text" placeholder="Search Address1" aria-label="Search" v-model="address_line1" v-on:keyup.enter="getDistributionCenters">
              </td>
              <td>
                <input class="form-control col-centered" type="text" placeholder="Search Address2" aria-label="Search" v-model="address_line2" v-on:keyup.enter="getDistributionCenters">
              </td>
              <td>
                <input class="form-control col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="city" v-on:keyup.enter="getDistributionCenters">
              </td>
              <td>
                <input class="form-control col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="state" v-on:keyup.enter="getDistributionCenters">
              </td>
              <td>
                
              </td>

              <td style="width: 12%;">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getDistributionCenters">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="resetSearch">Reset</button>
              </td>
            </tr>
            <tr v-for="distribution_center in sortedDistributionCenters" :key="distribution_center.id" :distribution_center="distribution_center">                
              <td scope="row">
                {{distribution_center.id}}
              </td>
              <td>
                {{distribution_center.name}}
              </td>
              <td>
                {{distribution_center.parent ? distribution_center.parent.name : ""}}
              </td>              
              <td>
                {{distribution_center.address_line1}}
              </td>
              <td>
                {{distribution_center.address_line2}}
              </td>
              <td>
                {{distribution_center.city}}
              </td>
              <td>
                {{distribution_center.state}}
              </td>
              <td>
                {{distribution_center.created_at}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminDistributionCenter', params: { id: distribution_center.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminDistributionCenter', params: { id: distribution_center.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(distribution_center)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getDistributionCenters"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination_custom'"
            :prev-class="'page-item'"
            :first-last-button=true
            :next-class="'page-item'"
            :page-class="'page-item'">
          </paginate>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      distribution_centers: [],
      pageOfItems: [],
      dcSearch: '',
      page: 1,
      total_pages: 1,
      name: '',
      parent_name: '',
      city: '',
      state: '',
      address_line1: '',
      address_line2: ''
    }
  },
  created () {
    this.getDistributionCenters()
  },
  computed: {
    sortedDistributionCenters () {
      return this.distribution_centers.slice().sort((a, b) => {
        return a.id - b.id
      })
    }
  },
  methods: {
    getDistributionCenters (page) {
      this.$http.secured.get('/admin/distribution_centers', { params: { page: page, name: this.name, parent_name: this.parent_name, city: this.city, state: this.state, address_line1: this.mobile, address_line2:this.address_line2 } })
        .then(response => { this.distribution_centers = response.data.distribution_centers, this.total_pages = response.data.meta.total_pages })
        .catch(error => this.$toast.error('Error in fetching roles'))
    },
    onDelete (distributionCenter) {
      this.$http.secured.delete(`/admin/distribution_centers/${distributionCenter.id}`)
        .then(response => {
          this.distribution_centers.splice(this.distribution_centers.indexOf(distributionCenter), 1)
          this.$toast.error('Distribution Center deleted successfully')
        })
        .catch(error => this.$toast.error('Error in deleting distribution Center'))
    },
    search_distribution_centers () {
      this.$http.secured.get(`/admin/distribution_centers/search?search_params=${this.dcSearch}`)
        .then(response => {
          this.distribution_centers = response.data.distribution_centers, this.total_pages = response.data.meta.total_pages
        })
        .catch(error => this.$toast.error('Error in fetching distribution_centers'))
    },
    resetSearch () {
      this.name = ''
      this.parent_name = ''
      this.city = ''
      this.state = ''
      this.address_line1 = ''
      this.address_line2 = ''
      this.getDistributionCenters()
    }
  }
}
</script>
