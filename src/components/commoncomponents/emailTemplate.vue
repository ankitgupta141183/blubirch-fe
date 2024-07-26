<template>
  <v-card class="v-card-100">
    <v-card-title>
      <span class="headline">{{dialog_title}}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h6>To</h6>
            <v-flex>
              <v-text-field solo v-model="to_email" :rules="emailRules" required></v-text-field>
            </v-flex>

            <div v-if="this.$props.isCC">
              <h6>CC</h6>
              <v-flex>
                <v-text-field solo v-model="to_cc" :rules="emailRules"></v-text-field>
              </v-flex>
            </div>

          <div v-if="this.$props.isBCC">
            <h6>Bcc</h6>
            <v-flex>
              <v-text-field solo v-model="to_bcc" :rules="emailRules"></v-text-field>
            </v-flex>
          </div>

            <h6>Subject</h6>
            <v-flex>
              <v-text-field solo v-model="email_subject"></v-text-field>
            </v-flex>
            <editor
              v-model="email_desc"
              api-key="no-api-key"
              :init="{
         height: 180,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
            />
          </v-col>
          <v-col cols="12" sm="12">
        <Attachment :isMultiple="multiple" :files="files" @clicked="getAttachedFiles" 
          :inputLabel="attachmentLabel" /> 
        </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small color="normal" text @click="cancelEscalateDialog">Cancel</v-btn>
      <v-btn small color="primary" @click="sendEscalateEmail">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

import Attachment from "./attachmentTemplate"

export default {
  props: ['isCC','isBCC'],
  data() {
    debugger
    return {
      dialog_title:'',
      escalateDialog:false,
      attachmentLabel:'Attach Documents',
      attachmentLabel: "File Input",
      to_cc: '',
      to_bcc: '',
      to_email:'',
      email_subject:'',
      email_desc:'',
      files:[],
      multiple:false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  components: {
    editor: Editor,
    Attachment:Attachment,
    
  },
  methods: {
    cancelEscalateDialog (event) {
      let escalateDialog = false;
      this.$emit('cancelDialog', escalateDialog)
    },
    sendEscalateEmail (event) {
        let emailObj = {
          recipient_email:this.to_email,
          email_subject: this.email_subject,
          email_description: this.email_desc,
          to_cc: this.to_cc,
          to_bcc: this.to_bcc,
          attachedFiles: this.files
        }
      this.$emit('clicked', emailObj)
    },
    getAttachedFiles (attached_data) {
      this.files = attached_data.attachedfFiles
    }
  }
};
</script>