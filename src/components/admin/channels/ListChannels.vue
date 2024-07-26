<template>
	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Channels</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminChannel'}">Add Channel</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th>Distribution Center</th>
              <th>Cost Formula</th>
              <th>Revenue Formula</th>
              <th>Revenue Formula</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>
            <input class="form-control" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getchannel">
          </td>
          <td>
              <multiselect id="distribution_center" placeholder="Select Distribution Center" v-model= "search.distribution_center" :options="distribution_centers" label="name" track-by="id" @input="setDistributionId"></multiselect>
          </td>
          <td></td>
          <td></td>
          <td></td>
          
          <td>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getchannel">Search</button>
            <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
          </td>
        </tr>
            <tr v-for="channel in filteredChannels" :key="channel.id" :channel="channel">                
              <td scope="row">
                {{channel.name}}
              </td>
              <td>
                {{channel.distribution_center}}
              </td>
              <td>
                {{channel.cost_formula}}
              </td>
              <td>
                {{channel.revenue_formula}}
              </td>
              <td>
                {{channel.recovery_formula}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminChannel', params: { id: channel.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminChannel', params: { id: channel.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(channel)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getchannel"
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
      channels: [],
      pageOfItems: [],
      name: '',
      distribution_center: '',
      distribution_centers: [],
      page: 1,
      meta: '',
      total_pages: 1,
      search: {}
    }
  },
  created() {
    this.getchannel()
     this.$http.secured.get('/admin/distribution_centers')
        .then(
        response => {this.distribution_centers = response.data.distribution_centers})
        .catch(error => this.$toast.error('Error in fetching distribution center'))
  },
  computed:{
  filteredChannels(){
      return this.channels.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
  methods: {
  setDistributionId () {
      if (this.search.distribution_center != null) {
        this.distribution_center = this.search.distribution_center.id
      }
    },
    getchannel (page) {
      this.$http.secured.get('/admin/channels', {params: {page: page , name: this.name, distribution_center_id: this.distribution_center}})
                        .then(response => {this.channels = response.data.channels, this.total_pages = response.data.meta.total_pages})
        .catch(error => this.$toast.error('Error in fetching channel'))
    },
    onDelete(channel){
      this.$http.secured.delete(`/admin/channels/${channel.id}`)
        .then(response => {
          this.channels.splice(this.channels.indexOf(channel), 1);
          this.$toast.error('channel deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting channel'))
    },
    reset_search () {
      this.name = ''
      this.distribution_center = ''
      this.getchannel()
    }
  }
  
}

</script>