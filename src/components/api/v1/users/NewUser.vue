<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <div> <HeaderComponent headerTitle="New User Details" /></div>
    <v-card class="overflow-hidden v-card v-sheet ma-2">
      <v-card-title>
        <span>User Details</span>
      </v-card-title>
      <v-row class="ml-2">
        <v-col cols="6" sm="6">
          <v-text-field v-model="first_name" label="First Name*" outlined type="text" @keypress="isLetter($event)"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field v-model="last_name" label="Last Name*" outlined type="text" @keypress="isLetter($event)"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ml-2">
        <v-col cols="6" sm="6">
          <v-text-field v-model="full_name" label="User Name*" outlined></v-text-field>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field v-model="employee_code" label="Employee Code*" outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row class="ml-2">
        <v-col cols="6" sm="6">
          <v-text-field v-model="email" label="Email Id*" outlined :rules="[rules.required, rules.email]"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6">
          <v-text-field v-model="phone_number" label="Phone Number*" outlined @keypress="onlyNumber" type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength = "10"></v-text-field>
        </v-col>
      </v-row>

      <v-row class="ml-2">
        <v-col cols="6" sm="6">
          <v-select v-model="role" label="Role Access*" :items="roles" item-text="name" item-value="id" outlined @change="setValues"></v-select>
        </v-col>
        <v-col cols="6" sm="6">
          <v-select v-model="user_access" label="Product Access*" :items="products" outlined chips multiple :disabled=field_disabled></v-select>
        </v-col>
      </v-row>

     <!--  <v-row class="ml-2">
        <v-col cols="6" sm="6">
          <v-select multiple v-model="user_types" label="User Types*" :items="user_types_list"  outlined @change="setValues"></v-select>
        </v-col>
        <v-col cols="6" sm="6">
        </v-col>
      </v-row> -->

    </v-card>

    <v-card class="overflow-hidden v-card v-sheet ma-2">
      <v-card-title>
        <span>Module Access</span>
      </v-card-title>
      <v-layout column>
        <v-flex md6 style="overflow: auto"> 
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Module/Disposition*
                  </th>
                  <th class="text-left">
                    Warehouse*
                  </th>
                  <th class="text-left">
                    Brand*
                  </th>
                  <th class="text-left">
                    Class Description*
                  </th>
                  <th class="text-left">
                    Grade*
                  </th>
                  <th class="text-left">
                    Origin Location*
                  </th>
                  <th class="text-left">
                    Brand Type*
                  </th>
                  <th>
                    
                  </th>
                </tr>
              </thead>
              <tbody class="mb-2">
                <tr
                  v-for="(item, index) in product_access"
                >
                  <td><v-select v-model="item.disposition" label="Select Module" outlined dense :items="item.available_module" @change="updateElement(item, index)" :disabled=field_disabled></v-select></td>
                  <td><v-select v-model="item.warehouse" label="Select Warehouse" outlined dense :items="warehouses" item-text="name" item-value="id" multiple chips :disabled=warehouse_disable ></v-select></td>
                  <td><v-autocomplete v-model="item.brands" label="Select Band" outlined dense :items="brands" multiple chips :disabled=field_disabled></v-autocomplete></td>
                  <td> <v-autocomplete v-model="item.class_descriptions" label="Select Description" outlined dense :items="class_descriptions" multiple chips :disabled=field_disabled>
                    
                  </v-autocomplete> </td>
                  <td> <v-select v-model="item.grades" label="Select Grade" outlined dense :items="grades" multiple chips item-text="name" item-value="id" :disabled=field_disabled></v-select> </td>
                  <td> <v-autocomplete v-model="item.origin_fields" label="Select Location" outlined dense :items="locations" item-text="name" item-value="id" multiple chips :disabled=field_disabled></v-autocomplete> </td>
                  <td> <v-select v-model="item.brand_type" label="Select Brand Type" outlined dense :items="brand_types" multiple chips :disabled=field_disabled></v-select> </td>
                  <td>
                   <img @click="deleteRow(item, index)"
                      src="@/assets/images/icons/trash-2.png"
                      :disabled=field_disabled
                      title="Delete"/>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
            <v-btn
              color="blue"
              dark
              class="ma-2"
              @click="addNewRow()"
              :disabled=disable_add_button
            >
              <v-icon>mdi-plus-circle</v-icon>ADD
            </v-btn>
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="overflow-hidden v-card v-sheet ma-2">
      <v-card-title>
        <span>Onboarded By</span>
      </v-card-title>
      <v-row class="ma-2">
        <v-col cols="4" sm="4">
          <v-text-field v-model='onboraded_by_name' label="Name*" outlined disabled></v-text-field>
        </v-col>
        <v-col cols="4" sm="4">
          <v-select v-model='onboraded_by_employee_code' :items="users" item-text="employee_id" item-value="employee_id" label="Employee Code*" outlined @change="setOnboardedBy"></v-select>
        </v-col>
        <v-col cols="4" sm="4">
          <v-text-field v-model='onboraded_by_number' label="Phone Number*" outlined disabled></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn dark color="primary" @click="createUser()">Create User</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  import $ from 'jquery'
  import Editor from "@tinymce/tinymce-vue";
  import { mapState } from "vuex";
  import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  export default {
    data() {
      return {  
        loading: false,
        alert: false,
        alert_type: '',
        alert_message: '',
        email: '',
        phone_number: '',
        full_name: '',
        first_name: '',
        last_name: '',
        employee_code: '',
        locations: [],
        brand_types: [],
        grades: [],
        class_descriptions: [],
        brands: [],
        warehouses: [],
        modules: [],
        roles: ['Central Admin', 'Site Admin', 'Default User'],
        role: '',
        user_access: [],
        users: [],
        products: [],
        onboraded_by_name: '',
        onboraded_by_employee_code: '',
        onboraded_by_number: '',
        product_access: [{warehouse: [], brands: [], grades: [], brand_type: '', class_descriptions: [], origin_location: [], disposition: '', available_module: [] }],
        field_disabled: false,
        warehouse_disable: false,
        disable_add_button: false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
      };
    },
    created() {
      this.getDetails()
    },
    components: {
      editor: Editor,
      HeaderComponent
    },
    computed: mapState(["currentUser", "signedIn"]),
    methods: {
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },

      onlyNumber ($event) {
         //console.log($event.keyCode); //keyCodes value
         let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
         if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
            $event.preventDefault();
         }
      },

      isLetter(e) {
        let char = String.fromCharCode(e.keyCode); // Get the character
        if(/^[A-Za-z]+$/.test(char)) return true; // Match with regex 
        else e.preventDefault(); // If not match, don't add to input text
      },

      getDetails() {
        this.loading = true;

        this.loading = true;
        this.$http.secured
          .get("/api/v1/warehouse/users/fetch_all_info")
          .then(response => {
            if (response.data) {
              this.brands = response.data.brands
              this.modules = response.data.dispositions
              this.class_descriptions = response.data.class_descriptions
              this.warehouses = response.data.warehouses
              this.locations = response.data.locations
              this.brand_types = response.data.brand_types
              this.grades = response.data.grades
              if (!this.currentUser.roles.includes('central_admin')){
                this.roles = response.data.roles.filter(e => e.name !== 'Central Admin')
              }else {
                this.roles = response.data.roles
              }
              this.products = response.data.product_access
              this.users = response.data.users

              this.brands.unshift('All')
              this.modules.unshift('All')
              this.class_descriptions.unshift('All')
              this.warehouses.unshift({name: 'All', id: 0})
              this.locations.unshift({name: 'All', id: 0})
              this.brand_types.unshift('All')
              this.grades.unshift('All')
              this.products.unshift('All')
              this.product_access[0].available_module = this.modules
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });

      },


      addNewRow(){
        var selected_modules = []
        for (var i = 0; i < this.product_access.length; i++) {
          selected_modules.push(this.product_access[i].disposition)
        }

        var remaining_modules = this.modules.filter(n => !selected_modules.includes(n))
        this.product_access.push({warehouse: [], brands: [], grades: [], brand_type: '', class_descriptions: [], origin_location: [], disposition: '', available_module: remaining_modules })
      },

      deleteRow(item, ind){
        this.product_access.splice(ind, 1)
        for (var i = 0; i < this.product_access.length; i++) {
          this.product_access[i].available_module.push(item.disposition)
        }

      },

      createUser(){
        if (this.checkValidation()){
          this.showAlert("error", "Please provide all fields");
          return true
        }
        const formData = new FormData();
        formData.append("user[full_name]", this.full_name);
        formData.append("user[email]", this.email);
        formData.append("user[first_name]", this.first_name);
        formData.append("user[last_name]", this.last_name);
        formData.append("user[contact_no]", this.phone_number);
        formData.append("user[employee_code]", this.employee_code)
        formData.append("user[role_id]", this.role)
        
        for (var i = 0; i < this.user_access.length; i++) {
          formData.append("product_access[]", this.user_access[i])
        }

        for (var i = 0; i < this.product_access.length; i++) {
          let file = this.product_access[i]
          formData.append("module_access[]", JSON.stringify(file));
        }
        formData.append("user[onboraded_by_code]", this.onboraded_by_employee_code)

        this.loading = true;

        this.$http.secured
          .post("/api/v1/warehouse/users", formData)
          .then(response => {
            if (response.data) {
              this.$router.push('/api/v1/user-control')
              this.$toast.success("User Created Successfully");

              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            this.loading = false;
          });
      },

      checkValidation(){
        if (this.first_name == '' || this.last_name == '' || this.full_name == '' || this.email == '' || this.role == '' || this.user_access == [] || this.employee_code == '' || this.phone_number == ''){
          return true
        }else if (this.checkNullValue()) {
          return true
        }else {
          return false
        }

      },

      checkNullValue(){
        var error = false
        for (var i = 0; i < this.product_access.length; i++) {
          if (Object.values(this.product_access[i]).includes('') || Object.values(this.product_access[i]).includes([])){
            var error = true
          }
        }
        return error
    
      },

      updateElement(item, ind){

        if (item.disposition == 'All'){
          this.disable_add_button = true
        }else {
          this.disable_add_button = false
        }

        if (this.product_access.length > 1){
          for (var i = 0; i < this.product_access.length; i++) {
            if (ind != i) {
              var mod_ind = this.product_access[i].available_module.indexOf(item.disposition)
              this.product_access[i].available_module.splice(mod_ind, 1)
            }

          }
        }
      },

      setValues(){
        var role = this.roles.filter(r => r.id == this.role)[0].name
        if (role == 'Site Admin'){
          this.field_disabled = true
          this.disable_add_button = true
          this.warehouse_disable = false
          this.user_access = ['All']
          this.product_access = []
          this.product_access = [{warehouse: [], brands: ['All'], grades: ['All'], brand_type: 'All', class_descriptions: ['All'], origin_fields: [0], disposition: 'All', available_module: this.modules }]
        }else if (role == "Central Admin"){
          this.field_disabled = true
          this.disable_add_button = true
          this.warehouse_disable = true
          this.user_access = ['All']
          this.product_access = []
          this.product_access = [{warehouse: [0], brands: ['All'], grades: ['All'], brand_type: 'All', class_descriptions: ['All'], origin_fields: [0], disposition: 'All', available_module: this.modules }]
        }else{
          this.field_disabled = false
          this.disable_add_button = false
          this.warehouse_disable = false
          this.user_access = []
          this.product_access = [{warehouse: [], brands: [], grades: [], brand_type: '', class_descriptions: [], origin_fields: [], disposition: '', available_module: this.modules }]

        }
      },

      setOnboardedBy(){
        var user = this.users.filter(u => u.employee_id == this.onboraded_by_employee_code)[0]
        this.onboraded_by_name = user.username
        this.onboraded_by_number = user.contact_no
      },

      showAlert(alert_type, alert_message) {
        this.alert = true;
        this.alert_type = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

    },
    filters: {
      truncate: function(text, length, suffix) {
        if (text?text.length:0 > length) {
          return text.substring(0, length) + suffix;
        } else {
          return text;
        }
      }
    }
  };
</script>

<style >
  .theme--light.v-icon {
    color: #1867c0!important;
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 14px !important;
  }
  .v-card {
    max-width: 97% !important;
  }

  .v-card-100 {
    max-width: 100% !important;
  }
  .inc-title{
    color: #172B4D;
    font-size: 20px;
  }
</style>