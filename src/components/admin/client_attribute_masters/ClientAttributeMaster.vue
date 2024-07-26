<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red-500" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new record</h3>
    
		<form action="" @submit.prevent="addAttributeMaster">

      <div class="mb-6">
        <label for="attribute_master_attr_type" class="label">Attr Type</label>
        <select
          id="roles"
          placeholder="Select roles"
          v-model= "newAttributeMaster.client_id"
          >
            <option disabled value="" selected="">Select a role</option>
            <option :value="client.id" v-for="client in clients" :key="client.id">{{ client.name }}</option>
          </select>
        <input 
          type="text"
          id="attribute_master_attr_type"
          class="input"
          autofocus 
          autocomplete="off"
          placeholder="Enter Attr Type"
          v-model="client_id" />
      </div>
      <div class="mb-6">
      	<label for="attribute_master_attr_type" class="label">Attr Type</label>
        <input 
        	type="text"
        	id="attribute_master_attr_type"
        	class="input"
          autofocus 
          autocomplete="off"
          placeholder="Enter Attr Type"
          v-model="newAttributeMaster.attr_type" />
      </div>
			<div class="mb-6">
      	<label for="attribute_master_reason" class="label">Reason</label>
        <input 
        	type="text"
        	id="attribute_master_reason"
        	class="input"
          autofocus 
          autocomplete="off"
          placeholder="Enter Reason"
          v-model="newAttributeMaster.reason" />
      </div>
      <div class="mb-6">
      	<label for="attribute_master_attr_label" class="label">Attr Label</label>
        <input 
        	type="text"
        	id="attribute_master_attr_label"
        	class="input"
          autofocus 
          autocomplete="off"
          placeholder="Enter Attr Label"
          v-model="newAttributeMaster.attr_label" />
      </div>
      <div class="mb-6">
        <label for="attribute_master_field_type" class="label">Field Type</label>
        <input 
          type="text"
          id="attribute_master_field_type"
          class="input"
          autofocus 
          autocomplete="off"
          placeholder="Field Type"
          v-model="newAttributeMaster.field_type" />
      </div>
      <div class="mb-6">
        <label for="attribute_master_options" class="label">Options</label>
        <input 
          type="text"
          id="attribute_master_options"
          class="input"
          autofocus 
          autocomplete="off"
          placeholder="Options"
          v-model="newAttributeMaster.options" />
      </div>

      <input type="submit" value="Add Attribute Master" class="btn btn-success" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="attribute_master in attribute_masters" :key="attribute_master.id" :attribute_master="attribute_master">

        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
          	{{ attribute_master.attr_label }}
          </p>

          <button class="btn btn-primary"
          @click.prevent="editAttributeMaster(attribute_master)">Edit</button>

          <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
         @click.prevent="removeAttributeMaster(attribute_master)">Delete</button>
        </div>

        <div v-if="attribute_master == editedAttributeMaster">
          <form action="" @submit.prevent="updateAttributeMaster(attribute_master)">

          	<div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
          	 <div class="mb-6">
                <label for="attribute_master_attr_type" class="label">Attr Type</label>
                <input 
                  type="text"
                  id="attribute_master_attr_type"
                  class="input"
                  autofocus 
                  autocomplete="off"
                  placeholder="Enter Attr Type"
                  v-model="newAttributeMaster.attr_type" />
              </div>
              <div class="mb-6">
                <label for="attribute_master_reason" class="label">Reason</label>
                <input 
                  type="text"
                  id="attribute_master_reason"
                  class="input"
                  autofocus 
                  autocomplete="off"
                  placeholder="Enter Reason"
                  v-model="newAttributeMaster.reason" />
              </div>
              <div class="mb-6">
                <label for="attribute_master_attr_label" class="label">Attr Label</label>
                <input 
                  type="text"
                  id="attribute_master_attr_label"
                  class="input"
                  autofocus 
                  autocomplete="off"
                  placeholder="Enter Attr Label"
                  v-model="newAttributeMaster.attr_label" />
              </div>
              <div class="mb-6">
                <label for="attribute_master_field_type" class="label">Field Type</label>
                <input 
                  type="text"
                  id="attribute_master_field_type"
                  class="input"
                  autofocus 
                  autocomplete="off"
                  placeholder="Field Type"
                  v-model="newAttributeMaster.field_type" />
              </div>
              <div class="mb-6">
                <label for="attribute_master_options" class="label">Options</label>
                <input 
                  type="text"
                  id="attribute_master_options"
                  class="input"
                  autofocus 
                  autocomplete="off"
                  placeholder="Options"
                  v-model="newAttributeMaster.options" />
              </div>

            <input type="submit" value="Update" class=" my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
export default {
  name: 'Records',
  data () {
    return {
      newAttributeMaster: [],
      error: '',
      editedAttributeMaster: '',
      attribute_masters: [],
    }
  },
  created () {
        securedAxiosInstance.get('/admin/client_attribute_masters')
        .then(response => { this.attribute_masters = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getAttributeMaster (attribute_master){
    	const recordAttributeMasters = this.attribute_masters.filter(attribute_master => attribute_master.id === record.attribute_master_id)
    	let values
    	recordAttributeMasters.forEach(function (element){
    		values = element.name
    	})
    	return values
    },
    addAttributeMaster () {
      const value = this.newAttributeMaster
      if (!value) {
        return
      }
      securedAxiosInstance.post('/admin/client_attribute_masters', { client_attribute_master: { client_id:2, attr_type: this.newAttributeMaster.attr_type, reason: this.newAttributeMaster.reason, attr_label: this.newAttributeMaster.attr_label, field_type: this.newAttributeMaster.field_type , options: this.newAttributeMaster.options } })

        .then(response => {
          this.attribute_masters.push(response.data)
          this.newAttributeMaster = []
        })
        .catch(error => this.setError(error, 'Cannot create record'))
    },
    removeAttributeMaster (attribute_master) {
      securedAxiosInstance.delete(`/admin/client_attribute_masters/${attribute_master.id}`)
        .then(response => {
          this.attribute_masters.splice(this.attribute_masters.indexOf(attribute_master), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete record'))
    },
    editAttributeMaster (attribute_master) {
      this.editedAttributeMaster = attribute_master
    },
    updateAttributeMaster (attribute_master) {
      this.editedAttributeMaster = ''
      securedAxiosInstance.patch(`/admin/client_attribute_masters/${attribute_master.id}`, { client_attribute_master: { attr_type: attribute_master.attr_type, reason: attribute_master.reason, attr_label: attribute_master.attr_label,field_type: attribute_master.field_type, options: attribute_master.options} })
        .catch(error => this.setError(error, 'Cannot update record'))
    }
  }
}
</script>

<style type="text/css">
  #video {
          background-color: #000000;
      }
  #canvas {
      display: none;
  }
</style>
