<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Clients</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminLogisticsPartner' }">Add New Logistics Partner</router-link>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getLogisticsPartners">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getLogisticsPartners">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="logistics_partner in logistics_partners" :key="logistics_partner.id" :role="logistics_partner">                
              <td scope="row">
                {{logistics_partner.id}}
              </td>
              <td>
                {{logistics_partner.name}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminLogisticsPartner', params: { id: logistics_partner.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminLogisticsPartner', params: { id: logistics_partner.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(logistics_partner)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getLogisticsPartners"
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
      logistics_partners: [],
      client_search: '',
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      search: '',
      name: '',
    }
  },
  created() {
    this.getLogisticsPartners()
  },
  computed:{
    sortedLogisticsPartners(){
      return this.logistics_partners.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
  methods: {
    getLogisticsPartners (page) {
      this.$http.secured.get('/admin/logistics_partners',  {params: {page: page, name: this.name}} )
        .then(response => {
                            this.logistics_partners = response.data.logistics_partners, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching logistics partners'))
    },
    onDelete(logistics_partner){
      this.$http.secured.delete(`/admin/logistics_partners/${logistics_partner.id}`)
        .then(response => {
          this.logistics_partners.splice(this.logistics_partners.indexOf(logistics_partner), 1);
          this.$toast.error('Logistics partner deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting logistics partner'))
    },
    reset_search () {
      this.name = ''
      this.getLogisticsPartners()
    }
  }
  
}

</script>
