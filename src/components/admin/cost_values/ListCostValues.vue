<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Cost Values</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminCostValue'}">Add New Cost Value</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Category</th>
              <th>Cost Attribute</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cost_value in pageOfItems" :key="cost_value.id" :role="cost_value">                
              <td scope="row">
                {{cost_value.id}}
              </td>
              <td>
                {{cost_value.category_id}}
              </td>
              <td>
                {{cost_value.cost_attribute_id}}
              </td>
              <td>
                {{cost_value.brand}}
              </td>
              <td>
                {{cost_value.model}}
              </td>
              <td>
                {{cost_value.value}}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <jw-pagination :items="sortedCostValues" @changePage="onChangePage"></jw-pagination>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  
  data () {
    return {
      cost_values: [],
      pageOfItems: []
    }
  },
  created() {
    this.getCostValues()
  },
  computed:{
    sortedCostValues(){
      return this.cost_values.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
    getCostValues () {
      this.$http.secured.get('/admin/cost_values')
        .then(response => {this.cost_values = response.data})
        .catch(error => this.$toast.error('Error in fetching cost values'))
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    }
  }
  
}

</script>