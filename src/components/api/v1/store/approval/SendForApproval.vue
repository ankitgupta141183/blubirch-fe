<template>
  <div>
    <div class="modal fade cutomr_modal" id="myModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                    <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
                <div class="modal-body">
                    <h3 class="barc_mod_hed">Toat number : <span>GP5939</span></h3>
                    <div class="modal_sect1 after_stow">
                        <h3 class="q2_modal_hd"><span>Total Inventories </span> 22</h3>
                    </div>
                    <div class="modal_sect2">
                        <ul class="test_resul2">
                            <li>Item Found: <strong>10</strong></li>
                            <li>Not Found: <strong>0</strong></li>
                        </ul>
                    </div>
                    <div class="info_qc_sc">
                        <div class="custome_tip2"><img src="images/icons/info.svg"> QC Pass for the Box<div class="tooltip_pop2">Documentation and examples</div></div>
                    </div>
                    <button class="barcode_bt2">Complete</button>
                </div>
            </div> 
        </div>
    </div>

    <div class="main_wraper">
        <div class="mobile_head">
            <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
            <h3 class="main_header">INV35643</h3>
        </div>
        <div class="rigt_navbar" id="content">
            <h3 class="main_header display_non">Quality Control <button class="qc_p_button" data-toggle="modal" data-target="#myModal">Complete Quality Control</button></h3>
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="form_groupw sku_search">
                                <div class="row">
                                    <h4 class="categ_head2 qh_smallhd1">Toat Number</h4>
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
                                    <h4 class="categ_head2">Tag Number</h4>
                                    <div class="form_group1">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="row">
                                <button class="qc_search_b">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="qc_test_sec">
                        <ul class="qc_test_uli">
                            <li>Total Inventories : <span>20</span></li>
                            <li>Stowed : <span>20</span></li>
                            <li>Not Found: <span class="failed_qc">20</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="check_table">
                <div class="check_tablw stow_scroll">
                    <div class="table_colmw table_bordr">
                        <div class="table_cols1"><h4 class="table_head1">Sl. no</h4></div>
                        <div class="table_cols2"><h4 class="table_head1">Tag Number</h4></div>
                        <div class="table_cols3"><h4 class="table_head1">Item Description</h4></div>
                        <div class="table_cols4"><h4 class="table_head1">Status</h4></div>
                        <div class="table_cols5"><h4 class="table_head1">Disposition</h4></div>
                        <div class="table_cols6"><h4 class="table_head1">Location</h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>1</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                        <div class="loation_frn">
                            <div class="loation_frm">
                                <div class="loatin_frm1"><h4 class="location_hed">Location</h4></div>
                                <div class="loatin_frm2">
                                    <div class="form_group1">
                                        <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                                    </div>
                                </div>
                                <div class="loatin_frm3"><button class="table_mobt2">Save Location</button></div>
                            </div>
                        </div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>2</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>3</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>4</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>5</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>6</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>7</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>8</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>9</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                    <div class="table_colmw table_bordr table_poup">
                        <div class="table_cols1"><h4 class="table_head1"><span>10</span></h4></div>
                        <div class="table_cols2"><h4 class="table_head1"><span>TAG1221144</span></h4></div>
                        <div class="table_cols3"><h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband  </span></h4></div>
                        <div class="table_cols4"><h4 class="table_head1"><span>Not Found</span></h4></div>
                        <div class="table_cols5"><h4 class="table_head1"><span>Liquidation</span></h4></div>
                        <div class="table_cols6"><h4 class="table_head1"><span></span></h4></div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
  </div>
</template>