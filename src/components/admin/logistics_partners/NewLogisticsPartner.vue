<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Logistics Partner</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLogisticsPartners'}">List Logistics Partner</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addLogisticsPartner">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newLogisticsPartner.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newLogisticsPartner.name.$error, 'is-valid': !$v.newLogisticsPartner.name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newLogisticsPartner.name.required">Name is required</span>
              </div>

            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
      
    </div>
  </div>	

</template>



<script>
import { required } from 'vuelidate/lib/validators'

export default {

  data () {
    return {
      newLogisticsPartner: {
        'name': ''
      }
    }
  },
validations: {
    newLogisticsPartner: {
      name: { required }
    }
  },
  methods:{
  	addLogisticsPartner () {
    this.$v.$touch();
    if (this.$v.$invalid) {
        return;
    }      
      this.$http.secured.post('/admin/logistics_partners', {
                                                  logistics_partner: 
                                                    { name: this.newLogisticsPartner.name,
                                                    } 
                                                })
        .then(response => {
          this.$router.push('/admin/logistics_partners');
          this.$toast.success('Logistics Partner successfully created');
        })
        .catch(error => this.$toast.error('Error in creating Logistics Partner'))
    }
  }

}

</script>