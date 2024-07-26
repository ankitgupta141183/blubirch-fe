<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Repair Parts</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewRepairPart'}">Add New Part</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">

      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Name</th>
              <th>Part Number</th>
              <th>Price</th>
              <th>HSN Code</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getParts">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Part Number" aria-label="Search" v-model="part_number" v-on:keyup.enter="getParts">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getParts">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="part in repair_parts" :key="part.id" :part="part">
              <td scope="row">
                {{part.id}}
              </td>
              <td>
                {{part.name}}
              </td>
              <td>
                {{part.part_number}}
              </td>
              <td>
                {{part.price}}
              </td>
              <td>
                {{part.hsn_code}}
              </td>
              <td>
                {{part.is_active}}
              </td>
              <td>                
                <router-link :to="{ name: 'EditRepairPart', params: { id: part.id }}">
                  <i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(part)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getParts"
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
      repair_parts: [],
      page: 1,
      total_pages: 1,
      name: '',
      part_number: ''

    }
  },
  created() {
    this.getParts()
  },
  computed: {
    sortedParts(){
      return this.repair_parts.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
    getParts (page) {
      this.$http.secured.get('/admin/repair_parts', {params: {page: page, name: this.name, part_number: this.part_number}})
        .then(response => {
                            this.repair_parts = response.data.repair_parts, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching Repair Parts'))
    },
    onDelete(part){
      this.$http.secured.delete(`/admin/repair_parts/${part.id}`)
        .then(response => {
          this.repair_parts.splice(this.repair_parts.indexOf(part), 1);
          this.$toast.error('Part deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting part'))
    },
    reset_search () {
      this.code = ''
      this.getParts()
    }
  }
  
}

</script>