<i18n  >
  {
    "en": {
      "delete": "Delete"
        
    },
    "fr": {
      "delete": "Retirer"
    }
  }
</i18n>

<template>
  <v-btn
    color="red"
    icon
    @click.stop="deleteItem()"
    @mouseenter.stop="mouseEnterIcon()"
    @mouseleave.stop="mouseLeaveIcon()"
  >
    <v-icon v-if="!showHoverText" :small="useSmallIcon" :large="useLargeIcon">mdi-delete-empty</v-icon>
    <span class="caption" v-else>{{ textDeleteTranslated }}</span>
  </v-btn>
</template>

<script>
export default {
  name: "aeris-metadata-delete-button",

  props: {
    useSmallIcon: {
      type: Boolean,
      default: false,
    },
    useLargeIcon: {
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
      isShowingTextDelete: false,
    };
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
  },

  computed: {
    textDeleteTranslated() {
      return this.$t("delete");
    },
    showHoverText() {
      return this.useHoverTest && this.isShowingTextDelete;
    },
  },

  created() {
    this.$i18n.locale = this.language;
    if (this.useSmallIcon && this.useLargeIcon) {
      console.error(
        "In aeris-metadata-delete-button, can't use both small and large props to true"
      );
    }
  },

  methods: {
    deleteItem() {
      this.$emit("delete");
    },
    mouseEnterIcon() {
      this.isShowingTextDelete = true;
    },
    mouseLeaveIcon() {
      this.isShowingTextDelete = false;
    },
  },
};
</script>
