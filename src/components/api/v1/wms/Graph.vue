<template>
	<iframe width="100%" height="100%" :src="link" frameborder="0" style="border:0" allowfullscreen></iframe>
</template>

<script>
	import { mapState } from "vuex";
	export default {
	  data() {
	    return {
	    	link: '',
	    	type: ''
	    };
	  },

	  computed: mapState(["currentUser", "signedIn"]),

		created() {
	    if (this.$route.params.link == undefined){
	      this.type = this.$store.state.chart_type
	    }else{
	      this.$store.commit('chartType', {chart_type: this.$route.params.link})
	      this.type = this.$store.state.chart_type
	    }

	    this.getDashboardLink(this.type)
		},
	  methods: {
	    getDashboardLink(type){
	      if (type == 'overall'){
		    	var user_id = {"ds67.rpacode": this.currentUser.distribution_center_ids}
		    	var encoded = encodeURIComponent(JSON.stringify(user_id))
	      	this.link = `https://datastudio.google.com/embed/reporting/f3752d5e-5874-4bfe-b356-2ddedf0af2b8/page/p_ejfz4gryoc?params=${encoded}`
	      }else if (type == 'outward'){
		    	var user_id = {"ds67.rpacode": this.currentUser.distribution_center_ids, "ds45.rpa": this.currentUser.distribution_center_ids}
		    	var encoded = encodeURIComponent(JSON.stringify(user_id))
	      	this.link = `https://datastudio.google.com/embed/reporting/b946e81d-7b03-430f-91f1-024d53ac63cc/page/p_x0lm96zyoc?params=${encoded}`
	      }else if (type == 'inward'){
		    	var user_id = {"ds67.rpacode": this.currentUser.distribution_center_ids}
		    	var encoded = encodeURIComponent(JSON.stringify(user_id))
	      	this.link = `https://datastudio.google.com/embed/reporting/7bcebe22-33a1-430e-8736-cca2841c0c03/page/p_jiamv6uyoc?params=${encoded}`
	      } else if (type == 'onhand'){
		    	var user_id = {"ds67.rpacode": this.currentUser.distribution_center_ids, "ds45.rp": this.currentUser.distribution_center_ids}
		    	var encoded = encodeURIComponent(JSON.stringify(user_id))
	      	this.link = `https://datastudio.google.com/embed/reporting/affa1ca8-95e4-4f25-866c-00503aa7d07f/page/p_7fs0dx2yoc?params=${encoded}`
	      }
	  	}
	  }
	}

</script>