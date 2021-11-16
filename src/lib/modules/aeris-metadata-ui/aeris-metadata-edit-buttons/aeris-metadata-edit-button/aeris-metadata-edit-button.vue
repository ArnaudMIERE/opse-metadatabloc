<i18n  >
  {
    "en": {
      "edit": "Edit"
    },
    "fr": {
      "edit": "Éditer"
    }
  }
</i18n>

<template>
  <v-btn
    icon
    class="text-end"
    @click.stop="edit()"
    @mouseenter.stop="mouseEnterIcon()"
    @mouseleave.stop="mouseLeaveIcon()"
  >
    <v-icon v-if="!showHoverText" :small="useSmallIcon">mdi-pencil</v-icon>
    <span class="caption" v-else>{{ textDeleteTranslated }}</span>
  </v-btn>
</template>

<script>
export default {
  name: "aeris-metadata-edit-button",

  props: {
    useSmallIcon: {
      type: Boolean,
      default: false,
    },
    useHoverTest: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "en",
    },
  },

  data() {
    return {
      isShowingTextEdit: false,
    };
  },

  computed: {
    textDeleteTranslated() {
      return this.$t("edit");
    },
    showHoverText() {
      return this.useHoverTest && this.isShowingTextEdit;
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
    edit() {
      this.$emit("edit");
    },
    mouseEnterIcon() {
      this.isShowingTextEdit = true;
    },
    mouseLeaveIcon() {
      this.isShowingTextEdit = false;
    },
  },
};
</script>