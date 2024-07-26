<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminAttributeMasters'}">List Attribute Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addAttributeMaster">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Attr Type</label>
              <input type="text" placeholder="Attr Type" v-model="newAttribute.attr_type" class="form-control" id="attr_type" :class="{ 'is-invalid': $v.newAttribute.attr_type.$error, 'is-valid': !$v.newAttribute.attr_type.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newAttribute.attr_type.required">Attr Type is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="reason" class="d-flex">Reason</label>
              <input type="text" placeholder="Reason" v-model="newAttribute.reason" class="form-control" id="reason" :class="{ 'is-invalid': $v.newAttribute.reason.$error, 'is-valid': !$v.newAttribute.reason.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newAttribute.reason.required">Reason is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="atr_label" class="d-flex">Attr Label</label>
              <input type="text" placeholder="Attr Label" v-model="newAttribute.attr_label" class="form-control" id="attr_label" :class="{ 'is-invalid': $v.newAttribute.attr_label.$error, 'is-valid': !$v.newAttribute.attr_label.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newAttribute.attr_label.required">Attr Label is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="filed_type" class="d-flex">Field Type</label>
              <input type="text" placeholder="Field Type" v-model="newAttribute.field_type" class="form-control" id="field_type" :class="{ 'is-invalid': $v.newAttribute.field_type.$error, 'is-valid': !$v.newAttribute.field_type.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newAttribute.field_type.required">Field Type is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="options" class="d-flex">Options</label>
              <input type="text" placeholder="Options" v-model="newAttribute.options" class="form-control" id="options">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>

        <form @submit.prevent="uploadAttributeMasterFile">
          <div class="form-group">
            <div class="form-group col-md-6">
              <label for="file" class="d-flex">Upload Attribute Master CSV</label>
              <input type="file" ref="inputFile"  class="form-control" id="file" @change="setUploadingFile()" :class="{ 'is-invalid': $v.file.$error , 'is-valid': !$v.file.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Import File</button>
        </form>      
      
    </div>
  </div>	

</template>


 
<script>
import { required } from 'vuelidate/lib/validators'

export default {

  data () {
    return {
    file: "",
      newAttribute: {}
    }
  },
  validations: {
    newAttribute: {
      attr_type: { required },
      attr_label: { required },
      field_type: { required },
      reason : {required}
    },
    file: {required}
  },
  methods: {
  	addAttributeMaster () { 
    this.$v.newAttribute.$touch();
    if (this.$v.newAttribute.$invalid) {
        return;
    }     
      this.$http.secured.post('/admin/attribute_masters', { 
                                                            attribute_master: { 
                                                              attr_type: this.newAttribute.attr_type, 
                                                              reason: this.newAttribute.reason, 
                                                              attr_label: this.newAttribute.attr_label, 
                                                              field_type: this.newAttribute.field_type, 
                                                              options: this.newAttribute.options 
                                                            } 
                                                          })
        .then(response => {
          this.$router.push('/admin/attribute_masters');
          this.$toast.success('Attribute Master successfully created');
        })
        .catch(error => this.$toast.error('Error in creating Attribute Master'))
    },

    setUploadingFile() {
      this.file = this.$refs.inputFile.files[0]
    },
    uploadAttributeMasterFile() {
      this.$v.file.$touch();
    if (this.$v.file.$invalid) {
        return;
    }
      const formData = new FormData();
      formData.append('file', this.file);
      this.$http.secured.post('/admin/attribute_masters/import',formData)
        .then(response => {
          this.$router.push('/admin/attribute_masters')
          this.$toast.success('Attribute Master File Imported Successfully')
        })
        .catch(error => this.$toast.error('Error in importing Attribute Master file')) 
    }
  }

}

</script>
