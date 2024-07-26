<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Role</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminRoles'}">List Roles</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addRole">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" class="form-control" id="name" v-model.trim="$v.newRole.name.$model" :class="{'is-invalid': $v.newRole.name.$error, 'is-valid': !$v.newRole.name.$invalid}">
              <div class="invalid-feedback">
                <span v-if="!$v.newRole.name.required">Name is required</span>
                <span v-if="!$v.newRole.name.minLength">Name must have atleast {{$v.newRole.name.$params.minLength.min}} letters.</span>
                <span v-if="!$v.newRole.name.alpha">Name will accept only alphabets and '_'</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newRole.code" class="form-control" id="code">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
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
      newRole: {
        'name': '',
        'code': ''
      }
    }
  },
  validations: {
  newRole: {
    name: {
      required,
      minLength: minLength(2),
      alpha
    }}
  },

  methods:{
  	addRole () { 
    this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }

      this.$http.secured.post('/admin/roles', {role: { name: this.newRole.name, code: this.newRole.code } })
        .then(response => {
          this.$router.push('/admin/roles')
          this.$toast.success('Role successfully created')
        })
        .catch(error => this.$toast.error('Error in creating role'))
    }
  }

}

</script>