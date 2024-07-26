<template>
  <div>
    <HeaderComponent :headerTitle="headerText" />
    <v-container fluid grid-list-lg pt-0>
      <div class="ifame_container">
        <iframe :src="decodeURL" width="100%" class="ifame-dashboard"></iframe>
      </div>
    </v-container>
  </div>
</template>
<script>
import HeaderComponent from "../../../../commoncomponents/HeaderComponent";
export default {
  data() {
    return {
      headerText: "Master Report Card",
      iframeUrl: '',
      localUrl: '',
      decodeURL
    };
  },
  components: {
    HeaderComponent,
  },
  mounted() {
    this.fetchIframeUrl();
  },
  computed: {
    displayUrl() {
      return this.iframeUrl || this.localUrl;
    },
  },
  methods: {
    fetchIframeUrl() {
      this.$http.secured
        .get('/api/v2/dashboard/dashboard_embed_url?dashboard=7')
        .then(response => {
          if (response.data) {
            this.iframeUrl = response.data.embed_url
            this.decodeURL = decodeURI(this.iframeUrl)
          } else {
            this.showAlert("error", "No Data Found");
            this.loading = false;
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
    },
  },

}
</script>
<style>
.ifame_container {
  width: 99% !important;
}

.ifame-dashboard {
  height: 85vh !important;
  border: none;
  border-radius: 15px;
  --webkit-border-radius: 15px;
}
</style>