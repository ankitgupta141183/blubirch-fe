<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Client</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClients'}">List Clients</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addClient">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newClient.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newClient.name.$error, 'is-valid': !$v.newClient.name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newClient.name.required">Name is required</span>
              </div>

            </div>
            <div class="form-group col-md-6">
              <label for="domain_name" class="d-flex">Domain Name</label>
              <input type="text" placeholder="Domain Name" v-model="newClient.domain_name" class="form-control" id="domain_name" :class="{ 'is-invalid': $v.newClient.domain_name.$error, 'is-valid': !$v.newClient.domain_name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newClient.domain_name.required">Domain is required</span>
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
      newClient: {
        'name': '',
        'domain_name':''
      }
    }
  },
validations: {
    newClient: {
      name: { required },
      domain_name: { required }
    }
  },
  methods:{
  	addClient () {
    this.$v.$touch();
    if (this.$v.$invalid) {
        return;
    }      
      this.$http.secured.post('/admin/clients', {
                                                  client: 
                                                    { name: this.newClient.name,
                                                      domain_name: this.newClient.domain_name 
                                                    } 
                                                })
        .then(response => {
          this.$router.push('/admin/clients');
          this.$toast.success('Client successfully created');
        })
        .catch(error => this.$toast.error('Error in creating client'))
    }
  }

}

</script>