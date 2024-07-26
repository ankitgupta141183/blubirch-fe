<template>
<body>
<div>
    <div> <HeaderComponent :headerTitle="headerText" /></div>    
    <div class="rigt_navbar" id="content">
        <!-- <h3 class="main_header display_non">Import Store Master File</h3> -->
         <div class="invoic_srch">
            <div class="invoic_srcw pdong_btm">
                <h3 class="sub_header1">Import Store Master File</h3>
                          
              <form @submit.prevent="importFile" enctype="multipart/form-data">
                <div class="form_group1">
                  <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
                  <div v-if="!$v.file.required">
                    <div class="warning_img">
                      <div class="warnig_imgw">
                        <img src="@/assets/images/icons/warning.svg">File is required 
                      </div>
                    </div>
                  </div>
                </div>
                <button class="main_button" :disabled="disable">Import File</button>
              </form>
            </div>
        </div>
    </div>
</div>    
</body>
</template>

<script>
import HeaderComponent from "../../../commoncomponents/HeaderComponent";
import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"StnDocumentUpload",
  data () {
    return {
      headerText: "Import Store Master File",
      file: "",
      disable: false
    }
  },
    components: {
      HeaderComponent
    },
  validations: {
    file: {required }
  },


  methods: {
    uploadFile: function(ind, eve) {
      this.box_files[ind].consignment_box_file = eve.target.files[0]
    },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () { 
      this.$v.file.$touch();
      if (this.$v.file.$invalid) {
          return;
      } 
      let formData = new FormData()
      if (this.file.name.split(".").pop() != 'csv'){
        this.$toast.error('Only CSV files can be imported');
        return;
      }

      const params = {
                      master_file: this.file,
                      master_file_type: 'Store Master',
                      user_id: this.$store.state.currentUser.id,
                      client_id:  "" ,
                      grading_type: 'warehouse'
                    }

      this.disable = true
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )
      this.$http.secured.post('/admin/master_file_uploads', formData)
        .then(response => {
          this.$router.push('/api/v1/manual_process/store-master-upload-list');
          this.$toast.success('Successfully uploaded');
        })
      .catch(error => this.$toast.error('Please Enter Valid File'))
    }
  }
}
</script>