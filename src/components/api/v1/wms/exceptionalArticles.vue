<template>
  <div>


    <!-- ============== Main page ==================== -->
      <v-card class="overflow-hidden v-card v-sheet theme--light">
        <div>
          <v-alert
            :type="alert_type"
            :value="alert"
            transition="scale-transition"
            >{{ alert_message }}</v-alert
          >
        </div>
        <div><HeaderComponent :headerTitle="headerText"/></div>
        <v-card-title>          
          <v-spacer></v-spacer>
            <v-card-actions >
            <v-flex xs12 d-flex>
              <v-btn color="primary" dense class="mr-4 mt-1" to="/api/v1/exceptionalArticlesFileUploadList">Exceptional Article Scan Indicator File Upload List</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card-title>
        <v-layout column>
          <v-flex md6 style="overflow: auto">
            <v-data-table
              :dense="true"
              :headers="headers"
              :items="table_data"
              :search="search"
              item-key="id"
              class="elevation-1"
              :loading="loading"
              loading-text="Loading Data... Please wait">
               <template v-slot:item.inventory_file="{item}">
                <p>{{getFileName(item.inventory_file['url'])}}</p>
              </template>
              <template v-slot:item.created_at="{ item }">{{ dateTimeform(item.created_at) }}</template>
              <template v-slot:item.logs="{item}">
                <img @click="logsDialogOpen(item)"
                  src="@/assets/images/job_sheet.png"
                  title="File Logs"
                />
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card>
  </div>  
</template>

<script>
  import HeaderComponent from "../../../commoncomponents/HeaderComponent";
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        menu: false,
        logDialog: false,
        headerText: "Exceptional Articles List",
        loading: true,
        alert: false,
        search: "",
        alert_type: "success",
        alert_message: "success",
        headers: [
          { text: "Article", value: "sku_code"},
          { text: "Scan Ind", value: "scan_id" }
        ],
        table_data: []
      };
    },
    components: {
      HeaderComponent
    },

    validations: {
      file: {required }
    },
    async created() {
      this.getArticleList();
    },
    methods: {
      getArticleList() {
        this.loading = true;
        this.$http.secured
        .get("/api/v1/list_expectional_articles")
        .then((response) => {
          if (response) {
            this.table_data = response.data
            this.loading    = false;
          } else {
            this.showAlert("error", "No Data Found");
            this.loading    = false;
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },

      
      alertTimeOut() {
        setTimeout(() => { this.alert = false;}, 3000);
      },
      showAlert(alert_type, alert_message) {
        this.alert         = true;
        this.alert_type    = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

     
      dateTimeform(d){
        // 15/02/2021 08:32 AM
        var date    = new Date(d)
        var hours   = date.getHours();
        var minutes = date.getMinutes();
        var ampm    = hours >= 12 ? 'PM' : 'AM';
        hours       = hours % 12;
        hours       = hours ? hours : 12; // the hour '0' should be '12'
        minutes     = minutes < 10 ? '0'+minutes : minutes;
        var strTime = date.toLocaleDateString("en-US") + ' ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
      },
    },
  };
</script>
