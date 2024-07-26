<template>
    <div>
        <div class="modal fade cutom2_modal cutom3_modal" id="myModal2" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
				<button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
			<div class="modal-body">
				<div class="check_table">
					<div class="check_tablw stow_scroll">
						<div class="table_colmw table_poup">
							<h3 class="q2_modal_hd">{{ this.variationreport.details.item_description}}  <span></span></h3>
							<div class="table_modl1"><h4 class="table_head1"><span>Inventory ID :</span> {{ this.variationreport.id}}</h4></div>
							<div class="table_modl2"><h4 class="table_head1"><span>Client SKU: </span> {{ this.variationreport.details.product_code_sku}}</h4></div>
							<div class="table_modl3"><h4 class="table_head1"><span>Product Code SKU:</span> {{ this.variationreport.details.product_code_sku}}</h4></div>
						</div>
						<div class="table_colmw table_poup">
							<div class="table_modl1"><h4 class="table_head1"><span>Description :</span> {{ this.variationreport.details.item_description}}</h4></div>
							<div class="table_modl2"><h4 class="table_head1"><span>Desicion :</span> {{ this.variationreport.details.decision}}</h4></div>
							<div class="table_modl3"><h4 class="table_head1"><span>Quantity :</span> {{ this.variationreport.details.quantity}}</h4></div>
						</div>
						<div class="table_colmw table_poup">
							<div class="table_modl1"><h4 class="table_head1"><span>Toat Number: </span> {{ this.variationreport.details.toat_number}}</h4></div>
							<div class="table_modl2"><h4 class="table_head1"><span>Invoice Number: </span> {{ this.variationreport.details.invoice_number}}</h4></div>
							<div class="table_modl3"><h4 class="table_head1"><span>Category L3: </span> Earphone or Headphone</h4></div>
						</div>
						<div class="table_colmw table_poup">
							<div class="table_modl1"><h4 class="table_head1"><span>Brand: </span> {{ this.variationreport.brand}}</h4></div>
							<div class="table_modl2"><h4 class="table_head1"><span>Model: </span> mnbnb</h4></div>
							<div class="table_modl3"><h4 class="table_head1"><span>Sub-Model/ Variant: </span> 78973</h4></div>
						</div>
						<div class="table_colmw table_poup">
							<div class="table_modl1"><h4 class="table_head1"><span>MRP (in INR): </span> {{ this.variationreport.details.item_price}}</h4></div>
							<div class="table_modl2"><h4 class="table_head1"><span>Selling price (in INR): </span> 1500</h4></div>
							<div class="table_modl3"><h4 class="table_head1"><span>Warranty status: </span> One year warranty</h4></div>
						</div>
						<div class="table_colmw table_poup">
							<div class="table_modl1"><h4 class="table_head1"><span>Serial Number 1: </span> ETE654</h4></div>
							<div class="table_modl2"><h4 class="table_head1"><span>Serial Number 2: </span> N/A</h4></div>
							<div class="table_modl3"><h4 class="table_head1"><span>Color: </span> White</h4></div>
						</div>
						<div class="table_colmw table_poup">
							<div class="table_modl1 full_wdith"><h4 class="table_head1"><span>Item Description as per candidate file :</span> ETE654</h4></div>
						</div>
					</div>
				</div>
			</div>
		</div> 
	</div>
</div>

<div class="modal fade cutom2_modal cutom4_modal" id="myModal3" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
			<div class="modal-body">
                <div class="camera_secw modal_image">
                    <div class="camera_img3">
						<div class="modal_bhead"><h4><span>Previous Grade :</span> {{this.variationreport.grade_send}}</h4></div>
						<div class="camera_sec2">
							<img src="@/assets/images/camera-img.jpg" class="img-fluid">
						</div>
                    </div>
                    <div class="camera_img3">
						<div class="modal_bhead"><h4><span>Current Grade : </span> {{this.variationreport.grade_received}}</h4></div>
						<div class="camera_sec2">
							<img src="@/assets/images/camera-img.jpg" class="img-fluid">
						</div>
                    </div>
                    <ul class="thmubn_list vartn_modal">
                        <li>
                            <label>
                                <input type="radio" name="test" value="small" checked>
                                <img src="@/assets/images/thunmb-1.png" class="img-fluid">
                                <span class="thumbn_head">Front</span>
                            </label>
                        </li>
                        <li>
                            <label>
                              <input type="radio" name="test" value="big">
                              <img src="@/assets/images/thunmb-2.png" class="img-fluid">
                              <span class="thumbn_head">Front</span>
                            </label>
                        </li>
                        <li>
                            <label>
                              <input type="radio" name="test" value="big">
                              <img src="@/assets/images/thunmb-3.png" class="img-fluid">
                              <span class="thumbn_head">Front</span>
                            </label>
                        </li>
                        <li>
                            <label>
                              <input type="radio" name="test" value="big">
                              <img src="@/assets/images/thunmb-4.png" class="img-fluid">
                              <span class="thumbn_head">Front</span>
                            </label>
                        </li>
                        <li>
                            <label>
                              <input type="radio" name="test" value="big">
                              <img src="@/assets/images/thunmb-5.png" class="img-fluid">
                              <span class="thumbn_head">Front</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
		</div> 
	</div>
</div>


<div>

    <div class="rigt_navbar over_scrol" id="content">
        <h3 class="main_header display_non" style="float:left;">Variation Report</h3>
		<div class="pk_test_se4">
			<!-- <div class="col-md-2">Return Request Number :<span style="font-weight:600;"> R-12099</span></div> -->
			<ul class="qc_test_ul7">
				<li>Return Request Number :<span> {{this.variationreport.details.return_request_number}}</span></li>
				<li>Tag Number : <span> {{this.variationreport.tag_number ? this.variationreport.tag_number : "N/A" }}</span></li>
				<li>Logistics Partner : <span> {{this.variationreport.logisticname ? this.variationreport.logisticname : "N/A"}}</span></li>
				<li>Store Executive : <span>{{this.variationreport.user_name}}</span></li>
				<li>Warehouse Executive : <span>{{this.variationreport.user_name}}</span></li>
			</ul>
			<a data-toggle="modal" data-target="#myModal2" class="modal_info3"><img src="@/assets/images/icons/info.svg"></a>
		</div>
		<div class="check_table">
			<div class="check_tablw">
				<div class="table_colmw padding_nn table_bordr">
					<div class="table_rprt1 table_right"><h4 class="table_head7" style="float: left;"><span>Questions</span></h4></div>
					<div class="table_rprt2 table_right"><h4 class="table_head8">Previous Grade :<span>{{this.variationreport.grade_send}}</span></h4></div>
					<div class="table_rprt2"><h4 class="table_head8">Present Grade : <span>{{this.variationreport.grade_received}}</span></h4></div>
				</div>
				<div class="table_colmw padding_nn table_bordr">
					<div id="demo" class="carousel slide" data-ride="carousel">
						<div class="table_rprt1 clm_hieght1 table_right">
							<ul class="ul_reports1" style="float: left;"><li>Packaging Status : <span style="font-weight:bold;"> {{this.variationreport.details.packaging_status}}</span></li></ul>
							<button class="compare_btn"  data-toggle="modal" data-target="#myModal3" >Compare</button>
						</div>
						<div class="table_rprt4 fullwidth">
						
							<div class="carousel-inner" >
								<div class="carousel-item active" v-for="(annotation, key) in this.variationreport.inventory_grading_details[0].details.final_grading_result.Physical[0].annotations" v-bind:id="annotation.id">
									<div class="table_rprt1 clm_hieght1 table_right">
										<h4 class="Rtable_head">{{annotation.packaging}}</h4>
										<img :src="annotation.src" class="slide_cstsz"> 
									</div>
									<div class="table_rprt1 clm_hieght1">
										<h4 class="Rtable_head">{{annotation.packaging}}</h4>
										<img :src="annotation.src" class="slide_cstsz">
									</div>									
								</div>

							</div>
							<a class="carousel-control-prev" href="#demo" data-slide="prev">
								<span class="carousel-control-prev-icon"><img src="@/assets/images/icons/back.svg"></span>
							</a>
							<a class="carousel-control-next" href="#demo" data-slide="next">
								<span class="carousel-control-next-icon"><img src="@/assets/images/icons/next.svg"></span>
							</a>
						</div>
					</div>
				</div>
				<div class="table_colmw padding_nn table_bordr">
					<div class="table_rprt1 table_right"><ul style="float: left;" class="ul_reports1"><li>Item Condition</li></ul></div>
					<div class="table_rprt2 table_right"><h4 class="Rtable_head">{{this.variationreport.inventory_grading_details[0].details.processed_grading_result.item_condition}}</h4></div>
					<div class="table_rprt2"><h4 class="Rtable_head">{{this.variationreport.inventory_grading_details[0].details.final_grading_result.item_condition[0].value}}</h4></div>
				</div>
				<div class="table_colmw padding_nn table_bordr">
					<div id="demo2_slide" class="carousel slide" data-ride="carousel">
						<div class="table_rprt1 clm_hieght1 table_right">
							<ul style="float: left;" class="ul_reports1"><li>Physical Status</li></ul>
							<button class="compare_btn">Compare</button>
							<ul style="text-align: left;" class="carousel-indicators">
								<li data-target="#demo2_slide" data-slide-to="0" class="active"><img src="@/assets/images/icons/thunmb-1.png"><span>Front</span></li>
								<li data-target="#demo2_slide" data-slide-to="1"><img src="@/assets/images/icons/thunmb-2.png"><span>Back</span></li>
								<li data-target="#demo2_slide" data-slide-to="2"><img src="@/assets/images/icons/thunmb-3.png"><span>Left</span></li>
								<li data-target="#demo2_slide" data-slide-to="3"><img src="@/assets/images/icons/thunmb-4.png"><span>Right</span></li>
								<li data-target="#demo2_slide" data-slide-to="4"><img src="@/assets/images/icons/thunmb-5.png"><span>Top</span></li>
								<li data-target="#demo2_slide" data-slide-to="5"><img src="@/assets/images/icons/thunmb-5.png"><span>Bottom</span></li>
							</ul>
						</div>
						<div class="table_rprt4 fullwidth">
						
							<div class="carousel-inner">
								<div class="carousel-item active" v-for="(annotation, key) in this.variationreport.inventory_grading_details[0].details.final_grading_result.Physical[0].annotations" v-bind:id="annotation.id">
									<div class="table_rprt1 clm_hieght1 table_right">
										<h4 class="Rtable_head">{{annotation.packaging}}</h4>
										<img :src="annotation.src" class="slide_cstsz">
									</div>
									<div class="table_rprt1 clm_hieght1">
										<h4 class="Rtable_head">{{annotation.packaging}}</h4>
										<img :src="annotation.src" class="slide_cstsz">
									</div>
								</div>

							</div>
							<a class="carousel-control-prev" href="#demo2_slide" data-slide="prev">
								<span class="carousel-control-prev-icon"><img src="@/assets/images/icons/back.svg"></span>
							</a>
							<a class="carousel-control-next" href="#demo2_slide" data-slide="next">
								<span class="carousel-control-next-icon"><img src="@/assets/images/icons/next.svg"></span>
							</a>
						</div>
					</div>
				</div>
				<div class="table_colmw padding_nn table_bordr" v-for="(questions, key) in this.variationreport.inventory_grading_details[0].details.final_grading_result.Functional" v-bind:id="questions.id">
					<div class="table_rprt1 table_right"><ul style="float: left;" class="ul_reports1"><li>{{questions.test_type}} : {{questions.test}}</li></ul></div>
					<div class="table_rprt2 table_right"><h4 class="Rtable_head">{{questions.value}}</h4></div>
					<div class="table_rprt2"><h4 class="Rtable_head">{{questions.output}}</h4></div>
				</div>

			</div>
		</div>
	</div>
</div>
    </div>
</template>

<script>


export default {
  name: 'VariationReportList',
  data () {
    return {
		variationreport:[],
    }
  },
      created (){		
		this.variationreport = this.$store.state.variationreport
    },

}
</script>