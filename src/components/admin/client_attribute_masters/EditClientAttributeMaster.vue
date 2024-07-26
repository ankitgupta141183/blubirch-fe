<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClientAttributeMasters'}">List Client Attribute Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateAttributeMster">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Clients</label>
              <multiselect v-model="search.client" :options="clients" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Client">
              </multiselect>
            </div>
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Attr Type</label>
              <input type="text" placeholder="Attr Type" v-model="editAttribute.attr_type" class="form-control" id="attr_type">
            </div>
            <div class="form-group col-md-6">
              <label for="reason" class="d-flex">Reason</label>
              <input type="text" placeholder="Reason" v-model="editAttribute.reason" class="form-control" id="reason">
            </div>
            <div class="form-group col-md-6">
              <label for="attr_label" class="d-flex">Attr Label</label>
              <input type="text" placeholder="Attr Label" v-model="editAttribute.attr_label" class="form-control" id="attr_label">
            </div>
            <div class="form-group col-md-6">
              <label for="field_type" class="d-flex">Field Type</label>
              <input type="text" placeholder="Field Type" v-model="editAttribute.field_type" class="form-control" id="field_type">
            </div>
            <div class="form-group col-md-6">
              <label for="options" class="d-flex">Options</label>
              <input type="text" placeholder="Options" v-model="editAttribute.options" class="form-control" id="options">
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
export default {
  data () {
    return {
      editAttribute: [],
      clients: [],
      search: {},
      client: ''
    }
  },
  created () {
    securedAxiosInstance.get('/admin/client_attribute_masters/' + this.$route.params.id)
      .then(response => { this.editAttribute = response.data })
      .catch(error => this.$toast.error('Error in getting client attribute master information'))

    securedAxiosInstance.get('/admin/clients')
      .then(response => { this.clients = response.data.clients })
      .catch(error => this.$toast.error('Error in fetching clients'))
  },
  methods: {
    updateAttributeMster () {
      securedAxiosInstance.put('/admin/client_attribute_masters/' + this.$route.params.id, { client_attribute_master: { client_id: this.search.client.id, attr_type: this.editAttribute.attr_type, reason: this.editAttribute.reason, attr_label: this.editAttribute.attr_label, field_type: this.editAttribute.field_type, options: this.editAttribute.options } })
        .then(response => {
          this.$router.push('/admin/client_attribute_masters')
          this.$toast.success('Attribute Master successfully updated')
        })
        .catch(error => this.$toast.error('Error in updating attribute master'))
    }
  }
}
</script>
