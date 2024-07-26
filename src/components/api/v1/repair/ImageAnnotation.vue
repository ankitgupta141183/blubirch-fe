<template>


	<transition name="modal-fade">
	    <div class="modal-backdrop" role="dialog">
	      <div class="modal" ref="modal">
	        <header class="modal-header">
	          <slot name="header">
	            <h2>
	              {{ pageTitle }}
	          	</h2>

	            <button type="button" class="btn btn-close btn-right" @click="close_new" aria-label="Close modal">
	              x
	            </button>
	          </slot>
	        </header>

	        <section class="modal-body">
	          <slot name="body">
	            <div class="flex-container">
	            	
	            	<div  style="border-style: solid" class="flex-box" id ="video-outer-div" >
	            		<video ref="video" id="video" width="350" height="346" autoplay></video><br>
	            		<canvas ref="canvas" id="canvas" width="350" height="346"  style="display: none"></canvas>
	            		<button id="snap" class="btn btn-primary" v-on:click="capture()">Click Photo</button>
	            	</div>
	            	

	            	<div  class="flex-box" id="captured-image" style="display: none" >
	            		<h3 id="img-alt" >Captured Image will appear here</h3>
	            		<img  id="photo" style="height: 286px;width: 350px; visibility: hidden" />
	            		<button class="btn btn-primary" v-on:click="submit(questionType)" style="margin-top: 10px;">Submit</button>
	            	</div>
	            	
	            </div>

	            <div class="flex-container1" v-if='questionType' style="overflow-x: auto;white-space: nowrap;text-align: center;">
	            	<div href="#" class="orientation" @click="makeActive(0,'Front')">
	            		<img src="@/assets/images/Vector_1.png" class="orientation-img" style="display: flex;"><p class="img-label">Front</p>

	            	</div>
	            	<div class="orientation" @click="makeActive(1 , 'Back')">
	            		<img src="@/assets/images/Vector_2.png" class="orientation-img" style="display: flex;"><p class="img-label">Back</p>
	            	</div>
	            	<div class="orientation" @click="makeActive(2 , 'Left')">
	            		<img src="@/assets/images/Vector_3.png" class="orientation-img" style="display: flex;"><p class="img-label">Left</p>
	            	</div>
	            	<div class="orientation" @click="makeActive(3 , 'Right')">
	            		<img src="@/assets/images/Vector_4.png" class="orientation-img" style="display: flex;"><p class="img-label">Right</p>
	            	</div>
	            	<div class="orientation" @click="makeActive(4 , 'Top')">
	            		<img src="@/assets/images/Vector_5.png" class="orientation-img" style="display: flex;"><p class="img-label">Top</p>
	            	</div>
	            	<div class="orientation" @click="makeActive(5 , 'Bottom')">
	            		<img src="@/assets/images/Vector_6.png" class="orientation-img" style="display: flex;"><p class="img-label">Bottom</p>
	            	</div>
	            	
	            </div>
	          </slot>
	        </section>

	        <footer class="modal-footer">
	          <slot name="footer">
	            <button type="button" class="btn btn-primary" @click="close_new" aria-label="Close modal">
	              Close
	            </button>
	          </slot>
	        </footer>
	      </div>
	    </div>
	  </transition>
	
		
	
</template>

<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
<script>
export var tagList ;
export default {
  name: 'ImageAnnotation',
  props: ['questionType' , 'pageTitle' , 'capturedImages' ,'capturedAnnotations','test_annotations' ],
  data () {
    return {
      video: {},
      canvas: {},
      captures: [],
      imageUrl: "",
      selectedOrientation: "",
      currAnno: [],
      path:""
    }
  },
  mounted () {
  	
  	this.video = this.$refs.video;
  	    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  	        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  	             video.srcObject = stream;
  	                video.play();
  	                video.onplay = function () {
  	                };
  	                this.video.play();
  	        });
  	    }
  },
  created(){
  	
  },
  methods: {
  	emitToParent (event) {
  	      this.$emit('childToParent', this.currAnno)
  	    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    close(event) {
          this.$emit('close');
    },
    capture () {
    	tagList = this.test_annotations;
  	 	anno.addPlugin('AutocompleteDropdown');
    	anno.destroy()
        var img = document.getElementById('photo')
        img.style.visibility="visible"
        document.getElementById("img-alt").style.display="none"
        document.getElementById('video-outer-div').style.display = "none"
        
        document.getElementById('captured-image').style.display = "grid"
        this.canvas = this.$refs.canvas;
        var context = this.canvas.getContext('2d')
        context.drawImage(this.video, 0, 0, 350, 346);
        var data = this.canvas.toDataURL('image/png');
        img.setAttribute('src', data);
    },
    makeActive(j , orientationName) {
    	var orientations=document.getElementsByClassName("orientation");
    	for (var i=0; i< orientations.length ; i++){
    		orientations[i].style.border = " 1px solid #C2CFE0"
    	}

    	if (j >= 0) {
    	  orientations[j].style.border = "2px solid #0357D0" 	
    	}

    	
    	console.log(orientationName)
    	this.selectedOrientation = orientationName
    	
    },
    close_new () {
    	this.$emit("update-number", this.currAnno);
    	this.currAnno = []
    	this.close();
    },

    submit (questionType1){
		let repairId = this.$store.state.selectedRepairJobSheetId;
    	var img = document.getElementById('photo')
    	console.log(this)
    	
    	this.$http.secured.post('/api/v1/warehouse/repairs/upload', {image_url: img.src,row_id:repairId })
		  .then(response => {this.path = response.data,
		  					this.$store.commit('setImageurl',{ url: this.path})
    	  					this.originalSubmit(questionType1)
    	  						})
    	  .catch(error => {})
    	
    },
    originalSubmit (questionType1){

    	var img = document.getElementById('photo')
    	var annoFinal =anno.getAnnotations(img.src)
    	//img.src = `http://localhost:3000${this.path.path_name}`
    	var src = `${this.path.path_name}`
    	var annotationText = []
    	for (var i = 0 ; i<annoFinal.length ; i++ ){
    		annoFinal[i].src  = src
    		annotationText.push(annoFinal[i].text)
    	}
    	
    	var a 
    	if (!questionType1) {
    		 a = { orientation: "", src: src , annotation: annoFinal }	
    	}
    	else{
    		if (this.selectedOrientation == ""){
    			this.selectedOrientation = "Not Selected"
    			a = { orientation: "Not Selected", src: src , annotation: annoFinal}
    		}
    		else{
    			 a = { orientation: this.selectedOrientation, src: src  , annotation: annoFinal}
    		}
    	}
    	var annoFinal =anno.getAnnotations(img.src)
    	//a["annotations"] = []
    	for (var i =0 ;i < annoFinal.length ; i++){
    		annoFinal[i]["orientation"] = this.selectedOrientation
    	}
    	
    	if (this.currAnno.length == 0)
    	{
    		
    	 this.currAnno = anno.getAnnotations(img.src)
    	}
    	else{
    		this.currAnno = [...this.currAnno, ...anno.getAnnotations(img.src)  ]
    	}
        

    	
    	this.capturedImages.push(a)
    	
    	console.log("ready here")
    	console.log(this.capturedImages)
    	console.log(this.currAnno)
    	document.getElementById('video-outer-div').style.display = "block"        
      	document.getElementById('captured-image').style.display = "none"

      	this.selectedOrientation = ""
      	this.makeActive(-1 , "")

      	if (!questionType1) {
      		this.$emit("update-number", this.currAnno);
      		this.currAnno = []
      		this.close();
      	}
    }
  }
}
</script>


<style type="text/css" scoped>
	
	.flex-container {
	  display: flex;
	  justify-content: center;
	  
	}

	.flex-container1 {

	  
	}

	.flex-box {
	  border-style: solid;
	  padding: 10px 10px 10px 10px;
	  margin: 10px;
	  text-align: center;
	  border-radius: 15px;
	  border-color: #2d9df2;
	  
	}

	input	{
		font-family: inherit;
		font-size: 100%;
		line-height: 1.15;
		margin: 0;
		padding: 0;
		line-height: inherit;
		color: inherit;
		-webkit-box-sizing: border-box;
	  /* box-sizing: border-box; */
	  border-width: 0;
	  /* border-style: solid; */
	  /* border-color: #e2e8f0; */
	}

	.btn {
	  padding: 8px 16px;
	  border-radius: 3px;
	  font-size: 14px;
	  cursor: pointer;
	}

	.modal-backdrop {
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  background-color: rgba(0, 0, 0, 0.3);
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}

	.modal {
	  background: #ffffff;
	  box-shadow: 2px 2px 20px 1px;
	  overflow-x: auto;
	  display: flex;
	  flex-direction: column;
	}

	.modal-header,
	.modal-footer {
	  padding: 15px;
	  display: flex;
	}

	.modal-header {
	  border-bottom: 1px solid #eeeeee;
	  color: #334D6E;
	  justify-content: space-between;
	}

	.modal-footer {
	  border-top: 1px solid #eeeeee;
	  justify-content: flex-end;
	}

	.modal-body {
	  position: relative;
	  padding: 20px 10px;
	}

	.btn-close {
	  border: none;
	  font-size: 20px;

	  cursor: pointer;
	  font-weight: bold;
	  color: #4aae9b;
	  background: transparent;
	}

	
	.modal-fade-enter,
	.modal-fade-leave-active {
	  opacity: 0;
	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
	  transition: opacity 0.5s ease;
	}

	

	.orientation{
		display: inline-block;
	  
	  border: 1px solid #C2CFE0;
	  border-radius: 10px;
	  margin-left: 8px;
	  padding: 5px 10px 5px 10px;
	}

	.orientation:hover {
	  border: 2px solid #0357D0;
	}

	

	.orientation-img{
		height: 50px;
		
	}


	.img-label{
		
		margin-bottom: 0px !important;
	}

	
</style>