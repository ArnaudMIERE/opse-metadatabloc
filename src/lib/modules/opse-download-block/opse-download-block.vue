<i18n  >
{
  "en": {
    "opseDownload": "Download",
    "opseAccessData": "Data access"
  },
  "fr": {
    "opseDownload": "Télécharger",
    "opseAccessData": "Accès aux données"
  }
}
</i18n>

<template>

<v-card v-if="isVisible" :style="applyTheme" :flat="true">
  <v-card-title>
    <v-icon large left style="color:#F39C12">mdi-database</v-icon>
    <span>{{ $t('opseAccessData') }}</span>
  </v-card-title>
  <div v-for="(link, index)  in links" :key="index" >
    <v-btn color="warning" class="ma-4" @click="download(link.url)">
    <v-icon left>mdi-cloud-download</v-icon>{{ downloadButtonTitle(link) }}
  </v-btn>
  </div>

</v-card>
    
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
    name: "opse-download-block",

    data(){
        return{

        }
    },


    props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {
        return {        
        primaryColor: "#F39C12",
        secondaryColor: "#AAA"};
      }
    },
    service: null,
    downloadUrl: null,
    metadata: {
      type: Object,
      default: () => {
        return {};
      }
    },
    
  },

  computed: {
    applyTheme() {
      return applyPrimaryAndSecondaryColors(this.theme);
    },

    isVisible() {
        let isVisible = false
        if(this.links != null && this.links.length > 0) {
            isVisible = true
        }
        this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("opseDownload"),
        isVisible
        });
        return isVisible;
    },

    links() {
        let links = []
        if(this.metadata && this.metadata.links && this.metadata.links.length > 0) {
            for(let i=0 ; i < this.metadata.links.length ; i++) {
                if(this.metadata.links[i].type == 'HTTP_DOWNLOAD_LINK') {
                    links.push(this.metadata.links[i])
                }
            }
        }
        return links
    },
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
   this.$i18n.locale = this.language;
  },

  

  methods: {
    download(url){
      window.open(url)
    },

    downloadButtonTitle(link) {
      let title = this.$t("opseDownload")
      if(link.description) {
        title = link.description[this.language]
      }
      return title
    },

  },
    
}
</script>