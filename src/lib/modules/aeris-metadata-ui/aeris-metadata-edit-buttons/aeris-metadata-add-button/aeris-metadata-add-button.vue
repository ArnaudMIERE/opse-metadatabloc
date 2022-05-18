<template>
  <v-btn outlined  color="primary" @click.stop="addItem()">
    <v-icon :small="useSmallIcon">mdi-plus</v-icon>
    {{ itemType }}
  </v-btn>
</template>

<script>
export default {
  name: "aeris-metadata-add-button",

  props: {
    /**
     * The message to show in the button
     */
    itemType: {
      type: String,
      default: "",
    },
    useSmallIcon: {
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
    addItem() {
      this.$emit("addItem");
    },
  },
};
</script>
