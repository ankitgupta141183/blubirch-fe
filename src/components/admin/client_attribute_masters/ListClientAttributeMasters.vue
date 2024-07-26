<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Client Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminClientAttributeMaster'}">Add Attribute Master</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Client</th>
              <th>Attr Type</th>
              <th>Reason</th>
              <th>Attr Label</th>
              <th>Field Type</th>
              <th>Options</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="client_name" v-on:keyup.enter="getClientAttributes">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="attr_type" v-on:keyup.enter="getClientAttributes">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="reason" v-on:keyup.enter="getClientAttributes">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="attr_label" v-on:keyup.enter="getClientAttributes">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="field_type" v-on:keyup.enter="getClientAttributes">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="options" v-on:keyup.enter="getClientAttributes">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getClientAttributes">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="resetSearch">Reset</button>
              </td>
            </tr>
            <tr v-for="attribute in sortedAttributes" :key="attribute.id" :attribute="attribute">                
              <td scope="row">
                {{attribute.id}}
              </td>
              <td>
                {{attribute.client.name}}
              </td>
              <td>
                {{attribute.attr_type}}
              </td>
              <td>
                {{attribute.reason}}
              </td>
              <td>
                {{attribute.attr_label}}
              </td>
              <td>
                {{attribute.field_type}}
              </td>
              <td>
                {{attribute.options}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminClientAttributeMaster', params: { id: attribute.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminClientAttributeMaster', params: { id: attribute.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(attribute)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getAttribute"
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
      attributes: [],
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      client_name: '',
      attr_type: '',
      reason: '',
      attr_label: '',
      field_type: '',
      options: ''
    }
  },
  created () {
    this.getClientAttributes()
  },
  computed: {
    sortedAttributes () {
      return this.attributes.slice().sort((a, b) => {
        return a.id - b.id
      })
    }
  },
  methods: {
    getClientAttributes (page) {
      this.$http.secured.get('/admin/client_attribute_masters', { params: { page: page, client_name: this.client_name, attr_type: this.attr_type, reason: this.reason, attr_label: this.attr_label, field_type: this.field_type, options: this.options } })
        .then(response => { this.attributes = response.data.client_attribute_masters, this.total_pages = response.data.meta.total_pages })
        .catch(error => this.$toast.error('Error in fetching Client Attribute Masters'))
    },
    getAttribute () {
      this.$http.secured.get('/admin/client_attribute_masters')
        .then(response => { this.attributes = response.data.client_attribute_masters })
        .catch(error => this.$toast.error('Error in fetching Client Attribute Master'))
    },
    onDelete (attribute) {
      this.$http.secured.delete(`/admin/client_attribute_masters/${attribute.id}`)
        .then(response => {
          this.attributes.splice(this.attributes.indexOf(attribute), 1)
          this.$toast.error('Client Attribute Master deleted successfully')
        })
        .catch(error => this.$toast.error('Error in deleting Attribute Master'))
    },
    
    resetSearch () {
      this.client_name = ''
      this.attr_type = ''
      this.reason = ''
      this.attr_label = ''
      this.field_type = ''
      this.options = ''
      this.getClientAttributes()
    }
  }
}
</script>
