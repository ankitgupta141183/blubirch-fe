<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Part</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListRepairParts'}">List Repair Parts</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form @submit.prevent="updatePart">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name" class="d-flex">Name</label>
            <input type="text" placeholder="Name" v-model="editPart.name" class="form-control" id="name" required="true">
          </div>
          <div class="form-group col-md-6">
            <label for="part_number" class="d-flex">Part Number</label>
            <input type="text" placeholder="Part Number" v-model="editPart.part_number" class="form-control" id="part_number" required="true">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="price" class="d-flex">Price</label>
            <input type="number" placeholder="Price" v-model="editPart.price" class="form-control" id="price" required="true" step="0.01">
          </div>
          <div class="form-group col-md-6">
            <label for="hsn_code" class="d-flex">HSN Code</label>
            <input type="text" placeholder="HSN Code" v-model="editPart.hsn_code" class="form-control" id="hsn_code" required="true">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="is_active" class="d-flex">Active</label>
            <input type="checkbox" :checked="true" class="radio-button" v-model="editPart.is_active" id="is_active">
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
      editPart: {
        'name': '',
        'part_number':'',
        'hsn_code':'',
        'price':'',
        'is_active':''
      }
    }
  },

  created () {
    this.$http.secured.get('/admin/repair_parts/'+this.$route.params.id)
        .then(response => { this.editPart = response.data.repair_part })
        .catch(error => this.$toast.error('Error in getting part information'))
  },

  methods:{
    updatePart () {      
      this.$http.secured.put('/admin/repair_parts/'+this.$route.params.id, {repair_parts: { name: this.editPart.name, part_number: this.editPart.part_number, price: this.editPart.price, hsn_code: this.editPart.hsn_code, is_active: this.editPart.is_active } })
        .then(response => {
          this.$router.push('/admin/repair_parts');
          this.$toast.success('Part successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating part'))
    }
  }

}

</script>