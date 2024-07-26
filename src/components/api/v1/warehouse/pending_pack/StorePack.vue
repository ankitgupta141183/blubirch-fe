<template>
  <div class="rigt_navbar" id="content">
    <div style="text-align: left;">
      <h3 class="main_header display_non">Pending Packaging </h3>
    </div>
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
    <div class="row">
      <div class="col-lg-6">
        <div class="form_groupw">
          <div class="row">
            <div class="form_group1">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input class="search_form" type="text" placeholder="Search Tag Number">
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
      </div>
    </div>
    <div class="check_table">
      <div class="check_tablw">
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1">Tag No</h4>
          </div>
          <div class="table_clmw3">
            <div class="dropdown">
              <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h4 class="table_head1">Origin Station<i class="fa fa-angle-down"></i></h4>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                </div>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    B1-Warehouse, Bannerghatta
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div class="table_clmw4">
            <div class="dropdown">
              <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h4 class="table_head1">Destination Station<i class="fa fa-angle-down"></i></h4>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                </div>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    B1-Warehouse, Bannerghatta
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1">Removal ID </h4>
          </div>
          <div class="table_clmw6">
            <div class="dropdown">
              <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h4 class="table_head1">Ageing <i class="fa fa-angle-down"></i></h4>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                </div>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    B1-Warehouse, Bannerghatta
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div class="table_clmw6">
            <div class="dropdown">
              <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h4 class="table_head1">Resolution<i class="fa fa-angle-down"></i></h4>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                </div>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    B1-Warehouse, Bannerghatta
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                    C1-Chroma
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="@/assets/images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="@/assets/images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Exchange</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Refund</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Exchange</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Refund</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Exchange</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Refund</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Exchange</span></h4>
          </div>
        </div>
        <div class="table_colmw table_bordr">
          <div class="table_clmw1">
            <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1"><label class="custom-control-label" for="customCheck1"></label></div>
          </div>
          <div class="table_clmw2">
            <h4 class="table_head1"><span>123456789101</span></h4>
          </div>
          <div class="table_clmw3">
            <h4 class="table_head1">
              <span>
                c1-Chroma 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop">Documentation and examples</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw4">
            <h4 class="table_head1">
              <span>
                B1-Warehouse,Bannerghatta 
                <div class="custome_ttip">
                  <img src="images/icons/info.svg">
                  <div class="tooltips_pop"><span class="popover_hed">B1 - Warehouse, Bannerghatta</span>Bannerghatta-Anekal Road, Malle Nalsandra, Bengaluru, Karnataka 560083</div>
                </div>
              </span>
            </h4>
          </div>
          <div class="table_clmw5">
            <h4 class="table_head1"><span>123456789</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>12 days</span></h4>
          </div>
          <div class="table_clmw6">
            <h4 class="table_head1"><span>Refund</span></h4>
          </div>
        </div>
      </div>
    </div>
    <div class="check_pagnt">
      <nav class="navigation" aria-label="Page navigation example pull-right">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-double-left"></i></a></li>
          <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">..</a></li>
          <li class="page-item"><a class="page-link" href="#">9</a></li>
          <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
          <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-double-right"></i></a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>