<i18n  >
{
  "en":{
    "OpseAcknowledgements": "Acknowledgements"
  },
  "fr":{
    "OpseAcknowledgements": "Remerciements"
  }
}
</i18n>

<template>
    <v-card v-if="!isVisible" :style="applyTheme" :flat="true">
    <v-card-title>
    <v-icon large left style="color:#F39C12">mdi-handshake</v-icon>
    <span>{{ $t('OpseAcknowledgements') }}</span>
  </v-card-title>
  <v-textarea
          name="Acknowledgements"
          :value="text"
          
        ></v-textarea>
    
  </v-card>
</template>

<script>

import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
    name:"opse-acknowledgements-block",
    data() {
        return{
            text:"We remind you that you are expected to contact the PI(s) of the data in order to propose collaboration."
        }
    },

     props: {
    language: {
      type: String,
      default: "en",
    },
    theme: {
      type: Object,
      default: () => {
        return {
          primaryColor: "#F39C12",
          secondaryColor: "#AAA",
        };
      },
    },
    service: null,
    downloadUrl: null,
    metadata: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  computed: {
    applyTheme() {
      return applyPrimaryAndSecondaryColors(this.theme);
    },

    isVisible() {
      let isVisible = false;
      if (this.links != null && this.links.length > 0) {
        isVisible = true;
      }
      this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("OpseAcknowledgements"),
        isVisible,
      });
      return isVisible;
    },

    
  },
}
</script>
