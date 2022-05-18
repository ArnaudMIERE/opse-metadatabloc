<i18n>
{
  "en": {
    "cancel": "Cancel"
  },
  "fr": {
    "cancel": "Annuler"
  }
}
</i18n>

<template>
  <div>
    <v-btn color="deep-orange darken-3" text @click.stop="cancel()">{{ $t('cancel') }}</v-btn>
    <v-btn color="green darken-1" text @click.stop="save()" :disabled="disableSaveButton">OK</v-btn>
  </div>
</template>

<script>
export default {
  name: "aeris-metadata-edit-box-buttons",
  props: {
    disableSaveButton: {
      type: Boolean,
      required: true,
    },
    language: {
      type: String,
      default: "en",
    },
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
  },

  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
  },
};
</script>