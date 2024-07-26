<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClientAttributeMasters'}">List Attribute Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Attr Type:</label> 
            <div class="col-8">
              {{attribute.attr_type}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Reason:</label> 
            <div class="col-8">
              {{attribute.reason}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Attr Label:</label> 
            <div class="col-8">
              {{attribute.attr_label}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Field Type:</label> 
            <div class="col-8">
              {{attribute.field_type}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Options:</label> 
            <div class="col-8">
              {{attribute.options}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Client :</label> 
            <div class="col-8">
              {{client}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
export default {
  data () {
    return {
      attribute: [],
      client: []
    }
  },
  created () {
    this.getAttribute()
  },
  methods: {
    getAttribute () {
      securedAxiosInstance.get('/admin/client_attribute_masters/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.attribute = response.data.attributes
          this.client = response.data.client
        })
        .catch(error => {
          this.setError(error, 'Something went wrong')
        })
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    }
  }
}
</script>
