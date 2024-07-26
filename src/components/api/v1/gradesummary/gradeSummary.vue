<template>
  <v-container class="v-card-100 pa-0">
    <!-- Annotations part begins here -------------------------------> 
    <v-row justify="center">
      <v-dialog v-model="annotationsDialog" max-width="700px" max-height="800px">
        <v-card class="v-card-100">
          <v-form ref="dispatchForm">
            <v-card-title>
              <span class="inc-title">View Annotations</span>
              <v-spacer></v-spacer>
              <img @click="closeAnnotationsDialog()" class="pull-right cursor-pointer" src="@/assets/images/icons/cross.svg" title="Close" width="20" height="20"/>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="pa-0">
                    <div  class="flex-box" id="captured-image" >
                      <!-- <img v-if="imageHash != null" id="photo1" :src= 'imageHash.src' style="max-height: 700px;max-width: 700px;" class="annotatable" /> -->
                      <img v-if="imageHash != null && imageHash.annotationImgSrc != null" id="photo1" :src= 'imageHash.annotationImgSrc' :width='imageHash.width' :height='imageHash.height' class="annotatable" />
                      <img v-else-if="!(imageHash != null && imageHash.annotationImgSrc != null)" id="photo1" :src= 'imageHash.src' :width='imageHash.width' :height='imageHash.height' class="annotatable" />
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="pa-0">
                    <div class="flex-box">
                      <v-spacer></v-spacer>
                      <template v-if="(imageHash != null && imageHash.annotationImgSrc != null)">
                        <template v-for="(item,i) in imageHash.annotations">
                        <v-list-item class="ma-0 pa-0">
                          <v-list-item-avatar class="ma-0 pa-0">
                            <v-chip class="ma-2" :color="legend_color[i%8]" label x-small></v-chip>
                          </v-list-item-avatar>
                          <v-list-item-title class="ma-0 pa-0" v-text="item.text"></v-list-item-title>
                        </v-list-item>
                        </template>
                      </template>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-layout align-end>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-2" small color="normal" @click="closeAnnotationsDialog()">CLOSE</v-btn>
                  <div v-if="!(imageHash != null && imageHash.annotationImgSrc != null)">
                    <v-btn small color="primary" @click="displayAnno()">DISPLAY ANNOTATIONS</v-btn>
                  </div>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Annotations part ends here --------------------------------->
    <v-row no-gutters>
      <v-col :cols="12">
        <v-card
          class="v-card-100 pa-5 font-weight-black"
          outlined
          tile
          >
          {{title}}
          <img @click="summaryClose()" class="pull-right cursor-pointer" 
            src="@/assets/images/icons/cross.svg"
            title="Close" width="20" height="20"
            />
        </v-card>
      </v-col>
      <v-col :cols="8">
        <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>Questions</v-card>
      </v-col>
      <v-col :cols="4">
        <v-card
          class="v-card-100 text-md-center pa-5 font-weight-black"
          outlined
          tile
          >Grade: {{ summarydata.grade  }}</v-card>
      </v-col>
      <v-col :cols="8">
        <v-card class="v-card-100 pa-5 py-14 font-weight-black" outlined tile>
          <ul>
            <li>Packaging Status</li>
          </ul>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <div class="v-card-100 text-md-center pa-2 font-weight-black pkgs" color="">
          {{ summarydata.packaging_status  }}  
          <br>
          <div>
            <template>
              <v-card class="box">
                <v-carousel cycle :show-arrows="true" hide-delimiter-background hide-delimiters
                  height="100"
                  >
                  <div v-for="(item,i) in packagingImages">
                    <a :href="item" target="_blank">
                      <v-carousel-item
                        :key="i"
                        :src="item"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        height="100"
                        href="javascript:void(0)"
                        @click.stop="openPackagingAnnotationsDialog(item)"
                        ></v-carousel-item>
                    </a>
                  </div>
                </v-carousel>
              </v-card>
            </template>
            <p v-if="false"> Image not available </p>
          </div>
        </div>
      </v-col>
      <v-col :cols="8">
        <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
          <ul>
            <li>Item Condition</li>
          </ul>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card
          class="v-card-100 text-md-center pa-5 font-weight-black"
          outlined
          tile
          >{{ summarydata.item_condition || 'NA'  }}
        </v-card>
      </v-col>
      <v-col :cols="8">
        <v-card class="v-card-100 pa-5 py-11 font-weight-black" outlined tile>
          <ul>
            <li class="py-2">Physical Status</li>
            <v-row no-gutters>
              <v-col :cols="2">
                <img src="@/assets/images/icons/thunmb-1.png" width="24" height="24" />
                <div>Front</div>
              </v-col>
              <v-col :cols="2">
                <img src="@/assets/images/icons/thunmb-2.png" width="24" height="24" />
                <div>Back</div>
              </v-col>
              <v-col :cols="2">
                <img src="@/assets/images/icons/thunmb-3.png" width="24" height="24" />
                <div>Left</div>
              </v-col>
              <v-col :cols="2">
                <img src="@/assets/images/icons/thunmb-4.png" width="24" height="24" />
                <div>Right</div>
              </v-col>
              <v-col :cols="2">
                <img src="@/assets/images/icons/thunmb-5.png" width="24" height="24" />
                <div>Top</div>
              </v-col>
              <v-col :cols="2">
                <img src="@/assets/images/icons/thunmb-5.png" width="24" height="24" />
                <div>Bottom</div>
              </v-col>
            </v-row>
          </ul>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card class="v-card-100 text-md-center pa-6 font-weight-black" outlined tile>
          <div>{{ summarydata.phyisical_status  || 'NA' }}</div>
          <template>
            <v-card class="box">
              <v-carousel cycle :show-arrows="true" hide-delimiter-background hide-delimiters
                height="100"
                >
                <div v-for="(item,i) in physicalImages">
                  <a :href="item" target="_blank">
                    <v-carousel-item
                      :key="i"
                      :src="item"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                      height="100"
                      href="javascript:void(0)"
                      @click.stop="openFunctionalAnnotationsDialog(item)"
                      ></v-carousel-item>
                  </a>
                </div>
              </v-carousel>
            </v-card>
          </template>
          <!--   <v-icon color="primary">mdi-chevron-left</v-icon>   -->
          <!-- <div v-for="(item, i) in summarydata.physical_image_annotations" :key="i" >
            <div v-if="summarydata.physical_image_annotations">
               <img v-if="summarydata.physical_image_annotations.length"
                  justify="center"
                  src=src
                  width="128"
                  height="80"
              /> 
              <p v-if="summarydata.physical_image_annotations.length == 0"> Image not available </p>
            </div>
            </div>     -->          
          <!-- <v-icon color="primary" >mdi-chevron-right</v-icon> -->
        </v-card>
      </v-col>
    </v-row>
    <div class="v-card-100 pa-2 font-weight-black pkgs" color="">
      Functional
      <br>
    </div>
    <v-row no-gutters v-for="(item, i) in summarydata.functional_qa" :key="i">
      <v-col :cols="8">
        <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
          <ul>
            <li>{{item.test || "N/A"}}</li>
          </ul>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card
          class="v-card-100 text-md-center pa-5 font-weight-black"
          outlined
          tile
          >{{item.value || "N/A"}}</v-card>
      </v-col>
    </v-row>
    <div class="v-card-100 pa-2 font-weight-black pkgs" color="">
      Accessories
      <br>
    </div>
    <v-row no-gutters v-for="(item, i) in summarydata.accessories" :key="i">
      <v-col :cols="8">
        <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
          <ul>
            <li>{{item.test || "N/A"}}</li>
          </ul>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card
          class="v-card-100 text-md-center pa-5 font-weight-black"
          outlined
          tile
          >{{item.value || "N/A"}}</v-card>
      </v-col>
    </v-row>
    <!-- loop end -->
  </v-container>
</template>
<script>
  export default {
    props: ['summarydata', 'title', 'physicalImages', 'packagingImages'],
    data(){
      return{
        annotationsDialog: false,
        legend_color: ['#191970','#006400','#ff0000','#ffd700','#00ff00','#00ffff','#ff00ff','#ffb6c1'],
        imageHash: { 
          orientation: '',
          src: '',
          annotationImgSrc: '',
          height: '',
          width: '',
          annotations: [],
        }
      }
    },
    // created(){
    //   this.sortDistinctImages()
    // },
    methods: {
      summaryClose() {
        this.$emit('summaryClose'); 
      },
      sortDistinctImages(){
        //alert(JSON.stringify(this.summarydata.physical_image_annotations))
        var functional_images = this.summarydata.physical_image_annotations
        for(var i=0; i < functional_images.length; i++){
          if (!this.physicalImages.includes(functional_images[i]["src"])){
            this.physicalImages.push(functional_images[i]["src"])
          }
        }

        var packaging_images = this.summarydata.packaging_image_annotations
        for(var i=0; i < packaging_images.length; i++){
          if (!this.packagingImages.includes(packaging_images[i]["src"])){
            this.packagingImages.push(packaging_images[i]["src"])
          }
        }
      },
      openFunctionalAnnotationsDialog(img){
        var functional_images = this.summarydata.physical_image_annotations
        for(var i=0; i < functional_images.length; i++){
          if (functional_images[i]["src"] == img){
            this.imageHash["annotations"].push(functional_images[i])
            this.imageHash["orientation"] = functional_images[i]["orientation"]
            this.imageHash["width"] = functional_images[i]["imageWidth"]
            this.imageHash["height"] = functional_images[i]["imageHeight"]
            this.imageHash["annotationImgSrc"] = functional_images[i]["annotationImgSrc"]
          }
        }
        this.imageHash["src"] = img
        this.annotationsDialog = true
        //alert("Annotations Dialog Open"+JSON.stringify(this.imageHash));
        anno.destroy()
      },
      openPackagingAnnotationsDialog(img){
        var packaging_images = this.summarydata.packaging_image_annotations
        for(var i=0; i < packaging_images.length; i++){
          if (packaging_images[i]["src"] == img){
            this.imageHash["annotations"].push(packaging_images[i])
            this.imageHash["orientation"] = packaging_images[i]["orientation"]
            this.imageHash["width"] = packaging_images[i]["imageWidth"]
            this.imageHash["height"] = packaging_images[i]["imageHeight"]
            this.imageHash["annotationImgSrc"] = packaging_images[i]["annotationImgSrc"]
          }
        }
        this.imageHash["src"] = img
        this.annotationsDialog = true
        //alert("Annotations Packaging Dialog Open"+JSON.stringify(this.imageHash));
        anno.destroy()
      },
      closeAnnotationsDialog() {
        anno.showSelectionWidget();
        this.imageHash["orientation"] = null
        this.imageHash["src"] = null
        this.imageHash["width"] = null
        this.imageHash["height"] = null
        this.imageHash["annotationImgSrc"] = null
        this.imageHash["annotations"] = []
        this.annotationsDialog = false
      },
      displayAnno(){
        anno.destroy()
        var annotationList = []
        var img = document.getElementById("photo1")
        anno.makeAnnotatable(img)
        //alert(JSON.stringify(this.imageHash));
        var annotationList = this.imageHash.annotations
        for(var li = 0 ; li < annotationList.length; li++){
          anno.addAnnotation(annotationList[li]);
        }
        anno.hideSelectionWidget();
      }
    },      
  }
</script>
<style>
  .pkgs{color:rgba(0,0,0,.87);}
  .box{width: 166px;margin: 0 auto;}
</style>
