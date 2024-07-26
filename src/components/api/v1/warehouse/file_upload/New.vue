<template>
  <div>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
      <div>
        <v-alert :type="alert_type" :value="alert" transition="scale-transition"
          >{{ alert_message }}</v-alert
        >
      </div>
      <div><HeaderComponent :headerTitle="headerText"/></div>
      <v-card  class="mx-auto my-12" :width='500'>
        <v-card-title>
          <form @submit.prevent="importFile" enctype="multipart/form-data" ref="inv_file_upload_form">
            <v-card-title style="display: flow-root;"> 
            </v-card-title>
            <v-card-text>
              <v-container>
              <v-radio-group
                  v-model="inward"
                  row>
                  <v-radio
                    label="B2B Email"
                    value="B2B Email"
                  ></v-radio>
                  <v-radio
                    label="B2B Auction"
                    value="B2B Auction"
                  ></v-radio>
                  <v-radio
                    label="B2B Contract"
                    value="B2B Contract"
                  ></v-radio>
                </v-radio-group>
                <div>
                  <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
                  <div v-if="file_required">
                    <div class="warning_img">
                      <div class="warnig_imgw">
                        <img src="@/assets/images/icons/warning.svg">File is required 
                      </div>
                    </div>
                  </div>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions center>
              <div class="w-100">
                <button class="main_button" :disabled="number > 0">Lot File Upload</button>
              </div>
            </v-card-actions>
          </form>
        </v-card-title>
        <v-progress-linear
          :active="show" 
          indeterminate
          color="#219df1"
          height="20">
        </v-progress-linear>
      </v-card>
    </v-card>
  </div>
</template>

<script>
  import $ from "jquery";
  import Editor from "@tinymce/tinymce-vue";
  import HeaderComponent from "../../../../commoncomponents/HeaderComponent";
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        number: 0,
        show: false,
        file: "",
        file_required: false,
        disable: false,
        headerText: "Lot File Upload",
        loading: true,
        alert: false,
        search: "",
        alert_type: "success",
        alert_message: "success",
        table_data: [],
        logs: "",
        inward: "B2B Auction",
      };
    },
    components: {
      HeaderComponent,
    },
    validations: {
      file: {required }
    },
    methods: {  
      uploadFile: function(ind, eve) {
        this.file_required = !this.$refs.file.required
      },
      selectFile(){
        this.file = this.$refs.file.files[0];
        if (this.$v.file.$invalid) {
          this.file_required = true;
          return;
        }else{
          this.file_required = false;
        } 
      },
      importFile () {
        this.number++;
        if (this.$v.file.$invalid) {
          this.file_required = true;
          this.number = 0;
          return;
        }else{
           this.file_required = false;
        }  
        let formData = new FormData()

        if (this.file.name.split(".").pop() != 'csv'){
          this.$toast.error('Only CSV files can be imported');
          this.number = 0;
          return;
        }
        const params = {file: this.file, inward_type: this.inward}
        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )
        this.show  = true
        this.$http.secured.post('/api/v1/warehouse/inventory_file_uploads', formData)
        .then(response => {
          this.show   = false
          this.$toast.success('File uploaded successfully');
          this.$router.push('/api/v1/warehouse/file_upload_list');
          this.number = 0;
        })
        .catch(error =>{ 
          this.number = 0;
          this.show   = false
          this.$toast.error('Please Enter Valid File')}
        )
      },
      alertTimeOut() {
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      },
      showAlert(alert_type, alert_message) {
        this.alert         = true;
        this.alert_type    = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },
    },
  };
</script>


<style scoped>
  .v-card {max-width: 97% !important;}
  .v-card-100 {max-width: 100% !important;}
  
</style>