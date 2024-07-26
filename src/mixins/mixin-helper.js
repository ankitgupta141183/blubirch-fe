export const mixinHelper = {

  data() {
    return {
      loading: false,
      alert: false,
      alert_type: "success",
      alert_message: "success",
      page: 1,
      totalPages: 1,
      pageSize: 1,
      pageSizes: [100, 200, 500],
    }
  },

  methods: {
    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },

    getRequestParams(page, pageSize) {
      let params = {};
      if (page) {
        params["page"] = page;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    }
  }
}
