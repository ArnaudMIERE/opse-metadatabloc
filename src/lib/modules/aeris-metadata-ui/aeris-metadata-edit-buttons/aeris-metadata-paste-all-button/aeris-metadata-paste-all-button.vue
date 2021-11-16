<i18n  >
  {
    "en": {
      "pasteAll": "Paste all contacts"
    },
    "fr": {
      "pasteAll": "Ajouter les contacts copiés"
    }
  }
</i18n>

<template>
  <v-btn
    color="green darken-3"
    :disabled="!enableButton"
    outlined
    @click.stop="pasteAll()"
  >{{ $t("pasteAll") }}</v-btn>
</template>

<script>
export default {
  name: "aeris-metadata-paste-all-button",

  props: {
    enableButton: {
      type: Boolean,
      default: false,
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
    pasteAll() {
      this.$emit("pasteAll");
    },
  },
};
</script>