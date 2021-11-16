<template>
  <v-dialog v-model="isDisplayingDialog" :max-width="maxWidth" persistent light scrollable>
    <v-card>
      <v-card-title class="d-flex justify-space-between blue-grey lighten-5">
        <span class="headline">{{ title }}</span>
        <v-btn fab width="35px" elevation="0" text height="35px" @click.stop="hideDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-0 pt-2">
        <!-- SLOT -->
        <slot name="dialog-contents" />
        <!-- /SLOT -->
      </v-card-text>
      <v-card-actions
        class="d-flex"
        :class="{'justify-center': centeredButtons, 'flex-row-reverse': !centeredButtons}"
      >
        <aeris-metadata-edit-box-buttons
          @cancel="hideDialog()"
          @save="saveModifications()"
          :disable-save-button="disableSaveButton"
          :language="language"
        ></aeris-metadata-edit-box-buttons>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AerisMetadataEditBoxButtons from "../aeris-metadata-edit-buttons/aeris-metadata-edit-box-buttons/aeris-metadata-edit-box-buttons.vue";
export default {
  name: "aeris-metadata-dialog-layout",

  components: {
    AerisMetadataEditBoxButtons
  },

  props: {
    isDisplayingDialog: {
      type: Boolean,
      required: true
    },
    maxWidth: {
      type: String,
      default: "400px"
    },
    title: {
      type: String,
      required: true
    },
    disableSaveButton: {
      type: Boolean,
      required: true
    },
    centeredButtons: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: "en",
    },
  },

  methods: {
    hideDialog() {
      this.$emit("cancel");
    },
    saveModifications() {
      this.$emit("save-modifications");
    }
  }
};
</script>