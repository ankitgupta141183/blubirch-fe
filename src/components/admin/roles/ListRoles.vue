<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Roles</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminRole'}">Add New Role</router-link>
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
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getRoles">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getRoles">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getRoles">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="role in sortedRoles" :key="role.id" :role="role">
              <td scope="row">
                {{role.id}}
              </td>
              <td>
                {{role.name}}
              </td>
              <td>
                {{role.code}}
              </td>
              <td>
                <router-link :to="{ name: 'ShowAdminRole', params: { id: role.id }}">
                  <i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminRole', params: { id: role.id }}">
                  <i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(role)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getRoles"
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
      roles: [],
      role_search: '',
      page: 1,
      total_pages: 1,
      name: '',
      code: ''
    }
  },
  created() {
    this.getRoles()
  },
  computed: {
    sortedRoles(){
      return this.roles.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
    getRoles (page) {
      this.$http.secured.get('/admin/roles', {params: {page: page, name: this.name, code: this.code}})
        .then(response => {
                            this.roles = response.data.roles, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching roles'))
    },
    onDelete(role){
      this.$http.secured.delete(`/admin/roles/${role.id}`)
        .then(response => {
          this.roles.splice(this.roles.indexOf(role), 1);
          this.$toast.error('Role deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting role'))
    },
    reset_search () {
      this.name = ''
      this.code = ''
      this.getRoles()
    }
  }
  
}

</script>