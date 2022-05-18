<template>
  <span v-if="visible" class="aeris-metadata-internatinal-field-host">
    <template v-if="html" v-html="getContent" />
    <template v-else>
      <template v-if="isLink">
        <a :href="getContent" target="_blank">{{ truncate(getContent) }}</a>
      </template>
      <template v-else>{{ getContent }}</template>
    </template>
  </span>
</template>

<script>
export default {
  name: "aeris-metadata-international-field",

  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: "en",
    },
    html: {
      type: Boolean,
      default: false,
    },
    convertlinks: {
      type: Boolean,
      default: true,
    },
    content: {
      type: Object,
      default: null,
    },
  },

  computed: {
    isLink() {
      return this.getContent.startsWith("http") && this.convertlinks;
    },

    getContent() {
      const contentTmp = this.content;
      if (contentTmp) {
        for (let key in contentTmp) {
          if (key.localeCompare("DEFAULT_VALUE_KEY") !== 0 && key.length > 2) {
            const newKey = key.substr(0, 2);
            contentTmp[newKey] = contentTmp[key];
            delete contentTmp[key];
          }
        }
        if (contentTmp[this.language]) {
          return contentTmp[this.language];
        } else if (contentTmp["DEFAULT_VALUE_KEY"]) {
          return contentTmp["DEFAULT_VALUE_KEY"];
        }
      }
      return "";
    },
  },

  methods: {
    truncate(str) {
      return str.length > 50 ? str.substr(0, 47) + "..." : str;
    },
  },
};
</script>
