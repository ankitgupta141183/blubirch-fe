<template>


	<transition name="modal-fade">
	    <div class="modal-backdrop" role="dialog">
	      <div class="modal" ref="modal">
	        <header class="modal-header">
	          <slot name="header">
	            <h2>
	  
	          	</h2>

	            <button type="button" class="btn btn-close btn-right" @click="close" aria-label="Close modal">
	              x
	            </button>
	          </slot>
	        </header>

	        <section class="modal-body">
	          <slot name="body">

	          	<div class="flex-container">
	            	
	        
	            	

	            	<div  class="flex-box" id="captured-image"  >
	            		<img v-if="imageDisplayed != null" id="photo1" :src= 'imageDisplayed.src' style="height: 286px;width: 350px;"  class="annotatable"/>
	          	<button class="btn btn-primary" v-on:click="displayAnno()" style="margin-top: 10px;display: block;margin: auto;">Display Annotations</button>
	            	</div>
	            	
	            </div>

	          	
	              
	          </slot>
	        </section>

	        <footer class="modal-footer">
	          <slot name="footer">
	            <button type="button" class="btn btn-primary" @click="close" aria-label="Close modal">
	              Close
	            </button>
	          </slot>
	        </footer>
	      </div>
	    </div>
	  </transition>
	
		
	
</template>


<script>

export default {
  name: 'ImageView',
  props: ['imageDisplayed'],
  data () {
    return {
      video: {},
      canvas: {},
      captures: [],
      imageUrl: "",
      selectedOrientation: "",
      path: ""
    }
  },
  mounted () {
 
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    close(event) {
          this.$emit('close');
          anno.showSelectionWidget();
    },
    displayAnno(){
    	anno.destroy()
    	var img = document.getElementById("photo1")
    	console.log("we here")
    	console.log(this.imageDisplayed)
    	anno.makeAnnotatable(img)
    	var annotationList = this.imageDisplayed.annotation
    	for(var li = 0 ; li < annotationList.length; li++){
    	  anno.addAnnotation(annotationList[li]);
    	}

    	anno.hideSelectionWidget();
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
