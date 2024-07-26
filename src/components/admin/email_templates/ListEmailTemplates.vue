<template>
  <div class="card mt-4">
    <div class="card-header">
        <div class="d-flex">
           <div class="mr-auto p-2">List Email Templates</div>
           <div class="p-2">
             <router-link :to="{name:'NewAdminEmailTemplate'}"> Add New Email Templates </router-link>
           </div>
        </div>    
    </div>

    <div class="card-body">
      <div class="table-responsive-md">
          <table class="table">
              <thead class="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th>Template</th>
                    <th>Template type</th>
                    <th>Action</th>
                  </tr>
              </thead>

              <tbody>
            <tr>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="search.name" v-on:keyup.enter="getEmailTemplates">
              </td>
              <td>                
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Template" aria-label="Search" v-model="search.template" v-on:keyup.enter="getEmailTemplates">
              </td>
              <td>
                <multiselect id="email_template_types_ids" placeholder="Select Template Type" v-model= "search.email_template_types_ids" :options="email_template_types_ids" label="original_code" :multiple="true" track-by="id"  @input="assign_Temlpate_Type"></multiselect>
              </td>                            
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getEmailTemplates">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>                
                  <tr v-for="email_template in email_templates" :key="email_template.id" :email_template="email_template">
                      <td scope="row">
                        {{email_template.name }}
                      </td>                      
                      <td>
                        {{email_template.template}}
                      </td>
                      <td>
                        {{email_template.template_type ? email_template.template_type.original_code : ""}}
                      </td>
                      <td>
                          <router-link :to="{name:'ShowAdminEmailTemplate', params:{id: email_template.id }}">
                            <i class="fa fa-eye"></i>
                          </router-link>
                          <router-link :to="{name:'EditAdminEmailTemplate', params:{id: email_template.id }}">
                            <i class="fa fa-edit"></i>
                          </router-link>
                          <a href="javascript:void(0)" class="icon">
                            <i  v-on:click="onDelete(email_template)" class="fas fa-trash-restore-alt"></i>
                          </a>
                      </td>

                  </tr>
              </tbody>
              
          </table>

          <div class="card-footer pb-0 pt-3">
              <paginate
                :page-count=total_pages
                :click-handler="getEmailTemplates"
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
            email_templates: [],
            search: {},
            name: '',
            template:'',
            template_type_id:'', 
            template_type:'',           
            page: 1,
            meta: '',
            total_pages: 1,
            email_template_types_ids: [],           
        }
    },
    created(){
       this.getEmailTemplateType()
       this.getEmailTemplates()
    },
    methods:{
        getEmailTemplateType () {
        this.$http.secured.get('/api/v1/lookups/get_email_templates')
            .then(response => {this.email_template_types_ids = response.data.lookup_values })
            .catch(error => this.$toast.error('Error in fetching emailtemplate Type'))
        },

        getEmailTemplates(page) {
            let search_param = {
                params:
                {
                  page:page,
                  name: this.search.name,
                  template: this.search.template?this.search.template:"",
                  template_type_id: this.template_type_id?this.template_type_id:"",
                }
            }
            this.$http.secured.get('/admin/email_templates', page? search_param:{ params: { page:page } })
            .then(response => { this.email_templates = response.data.email_templates, this.total_pages = response.data.meta.total_pages })
            .catch(error => this.$toast.error('Error in fetching email templates'))
        },
        onDelete(email_template){
            this.$http.secured.delete(`/admin/email_templates/${email_template.id}`)
            .then(response => {
            this.email_templates.splice(this.email_templates.indexOf(email_template), 1);
            this.$toast.error('Email template deleted successfully');
            })
            .catch(error => this.$toast.error('Error in deleting email template'))
        },
        reset_search () {
            this.search.name = ''
            this.search.template = ''       
            this.template_type_id = []
            this.search.template_type_ids = []
            this.search.email_template_types_ids = []
            this.getEmailTemplates()
        },

       assign_Temlpate_Type() {
        if (this.search.email_template_types_ids != null) {
           this.template_type_id = this.search.email_template_types_ids.map(
          function(TemplateType){
            return Number(TemplateType.id);
          })
        }
      },
                                                        
    }
}
</script>