<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminAttributeMaster'}">Add Attribute Master</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Attr Type</th>
              <th>Reason</th>
              <th>Attr Label</th>
              <th>Field Type</th>
              <th>Options</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <input class="form-control" type="text" placeholder="Search Attr Type" aria-label="Search" v-model="attr_type" v-on:keyup.enter="getAttribute">
            </td>
            <td>
              <input class="form-control" type="text" placeholder="Search Reason" aria-label="Search" v-model="reason" v-on:keyup.enter="getAttribute">
            </td>
            <td>
              <input class="form-control" type="text" placeholder="Search Attr Label" aria-label="Search" v-model="attr_label" v-on:keyup.enter="getAttribute">
            </td>
            <td>
              <input class="form-control" type="text" placeholder="Search Field Type" aria-label="Search" v-model="field_type" v-on:keyup.enter="getAttribute">
            </td>
            <td>
              <input class="form-control" type="text" placeholder="Search Options" aria-label="Search" v-model="options" v-on:keyup.enter="getAttribute">
            </td>
            <td>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getAttribute">Search</button>
              <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
            </td>
          </tr>
            <tr v-for="attribute_master in filteredAttributes" :key="attribute_master.id" :attribute_master="attribute_master">                
              <td scope="row">
                {{attribute_master.attr_type}}
              </td>
              <td>
                {{attribute_master.reason}}
              </td>
              <td>
                {{attribute_master.attr_label}}
              </td>
              <td>
                {{attribute_master.field_type}}
              </td>
              <td>
                {{attribute_master.options}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminAttributeMaster', params: { id: attribute_master.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminAttributeMaster', params: { id: attribute_master.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(attribute_master)" class="fas fa-trash-restore-alt"></i>
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
      attribute_masters: [],
      attr_type: '',
      attr_label: '',
      reason: '',
      options:'',
      field_type: '',
      page: 1,
      meta: '',
      total_pages: 1
    }
  },
  created() {
    this.getAttribute()
  },
  computed:{

  filteredAttributes(){
     return this.attribute_masters.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }

  },
  methods: {
    getAttribute(page) {
      this.$http.secured.get('/admin/attribute_masters' , {
                                                            params: 
                                                            { 
                                                              page: page ,
                                                              attr_type: this.attr_type, 
                                                              attr_label: this.attr_label, 
                                                              reason: this.reason, 
                                                              field_type: this.field_type , 
                                                              options: this.options
                                                            }
                                                          })
                        .then(response => { this.attribute_masters = response.data.attribute_masters,
                                            this.total_pages = response.data.meta.total_pages
                                          })
                        .catch(error => this.$toast.error('Error in fetching Attribute Master'))
    },

    
    onDelete(attribute){
      this.$http.secured.delete(`/admin/attribute_masters/${attribute.id}`)
        .then(response => {
          this.attribute_masters.splice(this.attribute_masters.indexOf(attribute), 1);  
          this.$toast.error('Attribute Master deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting Attribute Master'))
    },

    reset_search () {
      this.attr_type = ''
      this.attr_label = ''
      this.reason = ''
      this.field_type = ''
      this.options = ''
      this.getAttribute()
    }
   
  }
  
}

</script>