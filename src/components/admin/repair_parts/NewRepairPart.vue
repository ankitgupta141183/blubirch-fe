<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Repair Part</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListRepairParts'}">List Repair Parts</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addPart">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newPart.name" class="form-control" id="name" required="true">
            </div>
            <div class="form-group col-md-6">
              <label for="part_number" class="d-flex">Part Number</label>
              <input type="text" placeholder="Part Number" v-model="newPart.part_number" class="form-control" id="part_number" required="true">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="price" class="d-flex">Price</label>
              <input type="number" placeholder="Price" v-model="newPart.price" class="form-control" id="price" required="true" step="0.01">
            </div>
            <div class="form-group col-md-6">
              <label for="hsn_code" class="d-flex">HSN Code</label>
              <input type="text" placeholder="HSN Code" v-model="newPart.hsn_code" class="form-control" id="hsn_code" required="true">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="is_active" class="d-flex">Active</label>
              <input type="checkbox" :checked="true" class="radio-button" v-model="newPart.is_active" id="is_active">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Lookup Values File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
            <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
            <button class="btn btn-primary my-2">Import File</button>
          </div>
        </form>
    </div>
  </div>	

</template>

<script>
import { required, minLength, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Z_]*$/)

export default {

  data () {
    return {
      file: "",
      newPart: {
        'name': '',
        'part_number':'',
        'hsn_code':'',
        'price':'',
        'is_active':''
      }
    }
  },
  validations: {
  newPart: {
    name: {
      required,
      minLength: minLength(2),
      alpha
    }},
    file: {required }
  },

  methods:{
  	addPart () { 
      this.$http.secured.post('/admin/repair_parts', {repair_parts: { name: this.newPart.name, part_number: this.newPart.part_number, price: this.newPart.price, hsn_code: this.newPart.hsn_code, is_active: this.newPart.is_active } })
        .then(response => {
          this.$router.push('/admin/repair_parts')
          this.$toast.success('Part successfully created')
        })
        .catch(error => this.$toast.error('Error in creating part'))
    },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () { 
      this.$v.file.$touch();
      if (this.$v.file.$invalid) {
          return;
      } 
      const formData = new FormData();
      formData.append('file', this.file);
      this.$http.secured.post('/admin/repair_parts/import',formData);
      this.$toast.success('Parts successfully created');
    }
  }

}

</script>