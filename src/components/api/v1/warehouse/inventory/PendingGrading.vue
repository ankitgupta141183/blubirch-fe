<template>
  <body>
    <div>
      <div class="rigt_navbar" id="content">
        <ul class="breadcrambs display_non">
          <li>Inventory Management</li>
          <li><i class="fa fa-chevron-right"></i></li>
          <li><a href="#">Pending Grade</a></li>
        </ul>
        <h3 class="main_header display_non">Pending Grade</h3>
        <div class="check_table">
          <div class="check_tablw stow_scroll" style="height: 540px;">
            <div class="table_colmw table_bordr">
              <div class="table_cols4"><h4 class="table_head1">Item Description</h4></div>
              <div class="table_cols4"><h4 class="table_head1">SKU</h4></div>
              <div class="table_cols4"><h4 class="table_head1">Tag Number</h4></div>
              <div class="table_cols2"><h4 class="table_head1">Aging Days</h4></div>
              <div class="table_cols2"><h4 class="table_head1">MRP</h4></div>
              <div class="table_cols2"><h4 class="table_head1">City</h4></div>
              <div class="table_cols4"><h4 class="table_head1">Inventory Location Code</h4></div>
            </div>
            
            <div v-for="inventory in inventories" :key="inventory.id" :inentory="inventory" class="table_colmw table_bordr table_poup">
              <div v-if="inventory.details.item_description" class="table_cols4"><h4 class="table_head1"><span>{{inventory.details.item_description}}</span></h4></div>
              <div v-else class="table_cols4"><h4 class="table_head1"><span>NA</span></h4></div>
              <div v-if="inventory.details.product_code_sku" class="table_cols4"><h4 class="table_head1"><span>{{inventory.details.product_code_sku}}</span></h4></div>
              <div v-else class="table_cols4"><h4 class="table_head1"><span>NA</span></h4></div>
              <div v-if="inventory.tag_number" class="table_cols4"><h4 class="table_head1"><span>{{inventory.tag_number}}</span></h4></div>
              <div v-else class="table_cols4"><h4 class="table_head1"><span>NA</span></h4></div>
              <div v-if="inventory.aging" class="table_cols2"><h4 class="table_head1"><span>{{inventory.aging}} day(s)</span></h4></div>
              <div v-else class="table_cols2"><h4 class="table_head1"><span>NA</span></h4></div>
              <div v-if="inventory.details.item_price" class="table_cols2"><h4 class="table_head1"><span>₹ {{inventory.details.item_price}}</span></h4></div>
              <div v-else class="table_cols2"><h4 class="table_head1"><span>NA</span></h4></div>
              <div v-if="inventory.city_name" class="table_cols2"><h4 class="table_head1"><span>{{inventory.city_name}}</span></h4></div>
              <div v-else class="table_cols2"><h4 class="table_head1"><span>NA</span></h4></div>
              <div v-if="inventory.location_code" class="table_cols4"><h4 class="table_head1"><span>{{inventory.location_code}}</span></h4></div>
              <div v-else class="table_cols4"><h4 class="table_head1"><span>NA</span></h4></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {

  data () {
    return {
      inventories: []
    }
  },
  created() {
    this.getInventories()
  },
  methods: {
    getInventories () {
      this.$http.secured.get('/api/v1/warehouse/inventories/pending_grade')
      .then(response => {
        this.inventories = response.data.inventories
      })
      .catch(error => this.$toast.error('Error in fetching inventories'))
    }
  }
  
}
</script>