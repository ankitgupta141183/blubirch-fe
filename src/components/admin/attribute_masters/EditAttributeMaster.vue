<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminAttributeMasters'}">List Attribute Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateAttributeMaster">
          <div class="form-row">
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

export default {

  data () {
    return {
      editAttribute: {}
    }
  },

  created () {
    this.$http.secured.get('/admin/attribute_masters/'+this.$route.params.id)
        .then(response => { this.editAttribute = response.data.attribute_master })
        .catch(error => this.$toast.error('Error in getting attribute master information'))
  },

  methods:{
    updateAttributeMaster () {      
      this.$http.secured.put('/admin/attribute_masters/'+this.$route.params.id, {
                                                                                  attribute_master : { 
                                                                                    attr_type: this.editAttribute.attr_type, 
                                                                                    reason: this.editAttribute.reason, 
                                                                                    attr_label: this.editAttribute.attr_label,
                                                                                    field_type: this.editAttribute.field_type,
                                                                                    options: this.editAttribute.options 
                                                                                  } 
                                                                                })
        .then(response => {
          this.$router.push('/admin/attribute_masters');
          this.$toast.success('Attribute Master successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating attribute master'))
    }
  }

}

</script>