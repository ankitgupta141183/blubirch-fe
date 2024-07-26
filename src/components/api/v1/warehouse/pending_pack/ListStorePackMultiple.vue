<template>
  <div class="rigt_navbar" id="content">
    <h3 class="main_header display_non">Pending Packaging <button class="qc_p_button butn_font13" data-toggle="modal" data-target="#myModal">Print Gate-Pass</button></h3>
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
                <li>Not Found: <strong class="fail_test">0</strong></li>
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
    <div class="row">
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-5">
            <div class="form_groupw sku_search fromhgt_33">
              <div class="row">
                <h4 class="categ_head2 qh_smallhd1">Serial Number</h4>
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" placeholder="Scan Serial Number">
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="form_groupw sku_search fromhgt_33">
              <div class="row">
                <h4 class="categ_head2 qh_smallhd1">Toat number</h4>
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" placeholder="06456">
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="row">
              <button class="qc_search_b bluse_colr">Add Item</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
      <div class="col-lg-5">
        <div class="qc_test_se5">
          <ul class="qc_test_ul3">
            <li>Origin : <span>Banashankari</span></li>
            <li>Destination : <span>Blubirch</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pack_colum1 font_siz_14">
      <button class="qc_searchb3 bluse_colr">Add Box</button>
      <div class="accordion" id="myAccordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <div class="table_colmw table_bordr">
              <div class="tbl_colpic1">
                <h4 class="table_head1">Box No - <strong>BD_1589</strong></h4>
              </div>
              <div class="tbl_colpic2">
                <h4 class="table_head1">
                  <ul class="remove_butn">
                    <li>
                      <a href="#">
                        <i class="fa fa-trash-o"></i></a href="#">
                    </li>
                    <li><a><i class="fa fa-print"></i></a></li>
                  </ul>
                </h4>
              </div>
              <div class="tbl_colpic3">
                <h4 class="table_head1">Items: 00</h4>
                <button type="button" class="btn_Collapse collapsed" data-toggle="collapse" data-target="#collapseOne"><i class="fa fa-caret-down"></i></button>
              </div>
            </div>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#myAccordion">
            <div class="check_table">
              <div class="check_tablw">
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1">Tag Number</h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1">Item Description</h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1">Status</h4>
                  </div>
                </div>
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingOne">
            <div class="table_colmw table_bordr">
              <div class="tbl_colpic1">
                <h4 class="table_head1">Toat No - <strong>BD_1589</strong></h4>
              </div>
              <div class="tbl_colpic2">
                <h4 class="table_head1">
                  <ul class="remove_butn">
                    <li>
                      <a href="#">
                        <i class="fa fa-trash-o"></i></a href="#">
                    </li>
                    <li><a><i class="fa fa-print"></i></a></li>
                  </ul>
                </h4>
              </div>
              <div class="tbl_colpic3">
                <h4 class="table_head1">Items: 00</h4>
                <button type="button" class="btn_Collapse collapsed" data-toggle="collapse" data-target="#collapsetwo"><i class="fa fa-caret-down"></i></button>
              </div>
            </div>
          </div>
          <div id="collapsetwo" class="collapse" aria-labelledby="headingOne" data-parent="#myAccordion">
            <div class="check_table">
              <div class="table_colmw table_bordr table_poup">
                <div class="tbl_colpic1">
                  <h4 class="table_head1">Tag Number</h4>
                </div>
                <div class="tbl_colpic2">
                  <h4 class="table_head1">Item Description</h4>
                </div>
                <div class="tbl_colpic3">
                  <h4 class="table_head1">Status</h4>
                </div>
              </div>
              <div class="check_tablw">
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
                <div class="table_colmw table_bordr table_poup">
                  <div class="tbl_colpic1">
                    <h4 class="table_head1"><span>TAG1221144</span></h4>
                  </div>
                  <div class="tbl_colpic2">
                    <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
                  </div>
                  <div class="tbl_colpic3">
                    <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pack_colum2 newpadin_alg">
      <div class="check_table">
        <div class="check_tablw stow_scroll no_backrnd">
          <div class="table_colmw table_bordr">
            <div class="tbl_pening1">
              <h4 class="table_head1">Tag Number</h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1">Item Description</h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1">Status</h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1">Box number</h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
            <div class="collapse_f">
              <div class="remark_colm">
                <div class="model_drop1">
                  <select class="search_frm1">
                    <option value="volvo">Choose a remark</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div class="remark_colm">
                <div class="group_butons">
                  <button class="button1_fail">Fail</button>
                  <button class="button1_pass">Pass</button>
                </div>
              </div>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup">
            <div class="tbl_pening1">
              <h4 class="table_head1"><span>TAG1221144</span></h4>
            </div>
            <div class="tbl_pening2">
              <h4 class="table_head1"><span>Sony WI-C400 Wireless Bluetooth Neckband</span></h4>
            </div>
            <div class="tbl_pening3">
              <h4 class="table_head1"><span class="fail_test">Not Packed</span></h4>
            </div>
            <div class="tbl_pening4">
              <h4 class="table_head1"><span>DB_1456</span></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>