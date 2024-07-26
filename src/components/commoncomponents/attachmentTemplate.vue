<template>
 <v-file-input
    v-model="files"
    accept=".png"
    color="deep-purple accent-4"
    counter
    @change="fileAttachment"
    :label="attachmentLabel"
    :multiple="isMultiple"
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>

</template>

<script>

export default {
  data() {
    return {
      files:[],
      attachmentLabel:'Attachment Documents'

    };
  },
  components: {
  },
  methods: {
    fileAttachment (event) {
        let attachmentObj = {
          attachedfFiles:this.files,
        }
      this.$emit('clicked', attachmentObj)
    }
  }
};
</script>