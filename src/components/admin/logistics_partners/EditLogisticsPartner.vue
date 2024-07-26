<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Logistics Partner</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLogisticsPartners'}">List Logistics Partners</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateLogisticsPartner">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editLogisticsPartner.name" class="form-control" id="name">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
      
    </div>
  </div>

</template>

<script>

export default {

  data () {
    return {
      editLogisticsPartner: {}
    }
  },

  created () {
    this.$http.secured.get('/admin/logistics_partners/'+this.$route.params.id)
        .then(response => { this.editLogisticsPartner = response.data.logistics_partner })
        .catch(error => this.$toast.error('Error in getting client information'))
  },

  methods: {
    updateLogisticsPartner () {      
      this.$http.secured.put('/admin/logistics_partners/'+this.$route.params.id, {
                                                                        logistics_partner: 
                                                                          { name: this.editLogisticsPartner.name 
                                                                          }
                                                                      })
        .then(response => {
          this.$router.push('/admin/logistics_partners');
          this.$toast.success('Logistics Partner successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating logistics partner'))
    }
  }

}

</script>