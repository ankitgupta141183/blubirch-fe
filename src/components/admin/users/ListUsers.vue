<template>
	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Users</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminUser'}">Add New User</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Username</th>
              <th>First name</th>
              <th>Last name</th>
              <th>E-mail</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="userName" v-on:keyup.enter="getUsers">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="firstName" v-on:keyup.enter="getUsers">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="lastName" v-on:keyup.enter="getUsers">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="eMail" v-on:keyup.enter="getUsers">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="mobile" v-on:keyup.enter="getUsers">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getUsers">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="resetSearch">Reset</button>
              </td>
            </tr>
            <tr v-for="(user,key) in sortedUsers" :key="user.id" :user="user">    
              <td scope="row">
                {{ key + 1}}
              </td> 
              <td>
                {{user.username}}
              </td>         
              <td>
                {{user.first_name}}
              </td>
              <td>
                {{user.last_name}}
              </td>
              <td>
                {{user.email}}
              </td>
              <td>
                {{user.contact_no}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminUser', params: { id: user.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminUser', params: { id: user.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(user)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getUsers"
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
      users: [],
      pageOfItems: [],
      userSearch: '',
      page: 1,
      total_pages: 1,
      userName: '',
      firstName: '',
      lastName: '',
      eMail: '',
      mobile: ''
    }
  },
  created () {
    this.getUsers()
  },
  computed: {
    sortedUsers () {
      return this.users.slice().sort((a, b) => {
        return a.id - b.id
      })
    }
  },
  methods: {
    getUsers (page) {
      this.$http.secured.get('/admin/users', { params: { page: page, username: this.userName, first_name: this.firstName, last_name: this.lastName, email: this.eMail, contact_no: this.mobile } })
        .then(response => { this.users = response.data.users, this.total_pages = response.data.meta.total_pages })
        .catch(error => this.$toast.error('Error in fetching users'))
    },
    onDelete (user) {
      this.$http.secured.delete(`/admin/users/${user.id}`)
        .then(response => {
          this.users.splice(this.users.indexOf(user), 1)
          this.$toast.error('user deleted successfully')
        })
        .catch(error => this.$toast.error('Error in deleting user'))
    },
    resetSearch () {
      this.userName = ''
      this.firstName = ''
      this.lastName = ''
      this.eMail = ''
      this.mobile = ''
      this.getUsers()
    }
  }
}
</script>
