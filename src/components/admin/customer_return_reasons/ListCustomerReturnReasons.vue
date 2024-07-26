<template>
  <div class="card mt-4">
    <div class="card-header">
        <div class="d-flex">
           <div class="mr-auto p-2">List Customer Return Reason</div>
           <div class="p-2">
             <router-link :to="{name:'NewAdminCustomerReturnReasons'}"> Add New Customer Return Reason </router-link>
           </div>
        </div>
    
    </div>

    <div class="card-body">
      <div class="table-responsive-md">
          <table class="table">
              <thead class="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th>Grading</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody>
            <tr>
              <td>
              <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search By Name" aria-label="Search" v-model="search.name" v-on:keyup.enter="getCustomerReturnReasons">                
              </td>
              <td>                
                <input type="checkbox" :checked="false" class="radio-button" :name="grading_required" v-model="search.grading_required" id="grading_required">            
              </td>                           
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getCustomerReturnReasons">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>                
                  <tr v-for="reason in cutomer_return_reassons" :key="reason.id" :reason="reason">
                      <td scope="row">
                        {{reason.name}}
                      </td>                      
                      <td>
                        {{reason.grading_required}}
                      </td>
                      <td>
                          <router-link :to="{name:'ShowAdminCustomerReturnReason', params:{id: reason.id }}">
                            <i class="fa fa-eye"></i>
                          </router-link>
                          <router-link :to="{name:'EditAdminCustomerReturnReason', params:{id: reason.id }}">
                            <i class="fa fa-edit"></i>
                          </router-link>
                          <a href="javascript:void(0)" class="icon">
                            <i  v-on:click="onDelete(reason)" class="fas fa-trash-restore-alt"></i>
                          </a>
                      </td>

                  </tr>
              </tbody>
              
          </table>

          <div class="card-footer pb-0 pt-3">
              <paginate
                :page-count=total_pages
                :click-handler="getCustomerReturnReasons"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination_custom'"
                :prev-class="'page-item'"
                :first-last-button = true
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
    data(){
        return {
            cutomer_return_reassons: [],
            search: {},
            name: '',
            grading_required:false,            
            page: 1,
            meta: '',
            total_pages: 1,

        }
    },
    created(){
       this.getCustomerReturnReasons()
    },
    methods:{
        getCustomerReturnReasons (page) {
          var page_param
          if (this.search.hasOwnProperty('name') || this.search.hasOwnProperty('grading_required')){
            page_param = {
                params:
                {
                  page:page,
                  name: this.search.name?this.search["name"]:"",
                  grading_required: this.search.grading_required?this.search["grading_required"]:false,
                }
            }
          }else{
            page_param = { params: { page:page } }
          }
          this.$http.secured.get('/admin/customer_return_reasons', page_param )
          .then(response => { this.cutomer_return_reassons = response.data.customer_return_reasons, this.total_pages = response.data.meta.total_pages })
          .catch(error => this.$toast.error('Error in fetching customer return reasons'))
        },
        onDelete(reason){
            this.$http.secured.delete(`/admin/customer_return_reasons/${reason.id}`)
            .then(response => {
            this.cutomer_return_reassons.splice(this.cutomer_return_reassons.indexOf(reason), 1);
            this.$toast.error('Customer return reason deleted successfully');
            })
            .catch(error => this.$toast.error('Customer return reason in deleting order'))
        },
        reset_search () {
            delete this.search.name
            delete this.search.grading_required       
            this.getCustomerReturnReasons()
        },
                                                         
    }
}
</script>