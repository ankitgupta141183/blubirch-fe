<template>
<body>

<div class="modal fade cutomr_modal" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
			<button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
            <div class="modal-body">
                <h3 class="barc_mod_hed">Toat number : <span>GP5939</span></h3>
                <div class="modal_sect1 after_stow">
                    <ul class="test_resul2">
                        <li>Total Invemtories : <strong>20</strong></li>
                        <li>Total Toats : <strong>0</strong></li>
                    </ul>
                </div>
                <div class="modal_sect2">
                    <ul class="test_resul2">
                        <li>Item Found: <strong>10</strong></li>
                        <li>Not Found: <strong>0</strong></li>
                    </ul>
                </div>
                <div class="pick_button">
                    <button class="barcode_bt2 no_bg_butn">Go back</button>
                    <button class="barcode_bt2">Complete</button>
                </div>
            </div>
        </div> 
    </div>
</div>

<div>

    <div class="mobile_head">
        <a href="edit-consignments-box-details.html" class="menu_backbt"><img src="images/icons/arrow.svg" class="img-fluid"></a>
        <h3 class="main_header"><span>AC || Panasonic || Functional || Ban</span></h3>
		<a href="edit-consignments-box-details-empty.html" class="mobile_micon"><img src="images/icons/module-menu-2.png" class="img-responsive"></a>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Pick <button class="qc_p_button" data-toggle="modal" data-target="#myModal">Complete Pickup</button></h3>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="form_groupw sku_search">
                            <div class="row">
                                <h4 class="categ_head2 qh_smallhd1">Tag Number</h4>
                                <div class="form_group1">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                    <input class="search_form" type="text" placeholder="12345678">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="form_groupw sku_search">
                            <div class="row">
                                <h4 class="categ_head2 qh_smallhd1">Box Number</h4>
                                <div class="form_group1">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                    <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="row">
                            <button class="qc_search_b height_34px">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="qc_test_sec dsply_none6">
                    <ul class="qc_test_ul2">
                        <li>Total Lots : <span>10</span></li>
                        <li>Packed : <span>10</span></li>
                        <li>Not Packed : <span>0</span></li>
                        <li>Not Packed : <span class="failed_qc">0</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="pack_colum1">
			<button class="qc_searchb3">Add Toat</button>
            <div class="check_table">
                <div class="check_tablw">
                    <div class="table_colmw table_bordr">
                        <div class="tbl_colpic1"><h4 class="table_head1">Toat No - <strong>BD_1589</strong></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><ul class="remove_butn"><li><a href="#"><i class="fa fa-trash-o"></i></a href="#"></li><li><a><i class="fa fa-print"></i></a></li></ul></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1">Items: <strong>14</strong></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">Packed</span></h4></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pack_colum2">
            <div class="check_table">
                <div class="check_tablw stow_scroll">
                    <div class="table_colmw table_bordr"><h4 class="table_head1"><span>Lot Name: Refrigerator ,whirlpool, functional, chennai, 7, 118328923, 8743322</span></h4></div>
                    <div class="table_colmw table_bordr">
                        <div class="tbl_colpic1"><h4 class="table_head1">Tag Number</h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1">Location</h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1">Status</h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_colpic1"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>
                        <div class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">Not Packed</span></h4></div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</div>
</body>
</template>

<script>

</script> 