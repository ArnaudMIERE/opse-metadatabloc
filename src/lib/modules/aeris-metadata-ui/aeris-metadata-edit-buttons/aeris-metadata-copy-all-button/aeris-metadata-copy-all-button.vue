<i18n  >
  {
    "en": {
      "copyAll": "Copy all contacts"
    },
    "fr": {
      "copyAll": "Copier tous les contacts"
    }
  }
</i18n>

<template>
  <v-btn
    color="blue darken-3"
    outlined
    :disabled="!enableButton"
    @click.stop="copyAll()"
  >{{ $t("copyAll") }}</v-btn>
</template>

<script>
export default {
  name: "aeris-metadata-copy-all-button",

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
    copyAll() {
      this.$emit("copyAll");
    },
  },
};
</script>