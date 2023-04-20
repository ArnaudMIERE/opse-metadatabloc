<i18n>
{
  "en": {
    "opseDownload": "Download",
    "opseAccessData": "Data access",
    "opseAlert":"No data available yet."
  },
  "fr": {
    "opseDownload": "Télécharger",
    "opseAccessData": "Accès aux données",
    "opseAlert":"Aucune donnée n'est encore disponible."
  }
}
</i18n>

<template>
  <v-card v-if="isVisible" :style="applyTheme" :flat="true">
    <v-card-title>
      <v-icon large left style="color: #f39c12">mdi-database</v-icon>
      <span>{{ $t("opseAccessData") }}</span>
    </v-card-title>
    <p>To download the data files, you should agree with the Data Policy.</p>

    <v-alert v-if="!dataExist" dense outlined type="error">{{
      $t("opseAlert")
    }}</v-alert>
    <div v-if="dataExist">
      <p>
        <v-checkbox
          v-model="dataPolicy"
          label="I agree with the Data Policy"
          hide-details
        ></v-checkbox>
      </p>
      <v-btn
        color="warning"
        class="ma-4"
        @click="downloadAll(folderFile); mailDownload();"
        :disabled="!url || !dataPolicy"
      >
        <v-icon left>mdi-cloud-download</v-icon>{{ $t("opseDownload") }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
  name: "opse-download-block",

  data() {
    return {
      dataPolicy: false,
      folderFile: "/data/shp",
      dataExist: false,
      email:[],
    };
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

    mounted() {
      this.downloadAllowed(this.folderFile);
    },
  },

  computed: {
    applyTheme() {
      return applyPrimaryAndSecondaryColors(this.theme);
    },

    isVisible() {
      let isVisible = false;
      if (this.url != null) {
        isVisible = true;
      }

      this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("opseDownload"),
        isVisible,
      });
      return isVisible;
    },

    url() {
      let url = null;
      if (
        this.metadata &&
        this.metadata.links &&
        this.metadata.links.length > 0
      ) {
        for (let i = 0; i < this.metadata.links.length; i++) {
          if (this.metadata.links[i].type == "OPENSEARCH_LINK") {
            url = this.metadata.links[i].url;
            break;
          }
        }
      }
      return url;
    },
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
    this.downloadAllowed(this.folderFile);
    this.loadEmail();
  },

  methods: {

    mailDownload: function(){
      console.log("service ",this.url)
      
      this.axios({
        method:"post",
        url:this.url+"contact/send?email="+this.email+"&resourceTitle="+ this.metadata.resourceTitle.en, 
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer '},
      }).then(response=>{
         console.log(response.data)
                 
      }).catch(error=>{
        console.log("An error has occured:" + error)
      })
     
    },



    loadEmail(){
     
      var mail= []
      for (let i =0; i < this.metadata.contacts.length; i++){
        
        if (this.metadata.contacts[i].roles == "pointofcontact"){    
       
        mail = this.email.push(this.metadata.contacts[i].email)
         
        }

        if (this.metadata.contacts[i].roles == "principalinvestigator"){
        mail = this.email.push(this.metadata.contacts[i].email)
         
        }
        
      }
      return mail;
    },


    downloadAll(index) {
      window.open(
        this.url +
          "data/v1_0/download?collectionId=" +this.metadata.id +
          "&folder=" +
          index
      );
    },

    downloadButtonTitle(link) {
      let title = this.$t("opseDownload");
      if (link.description) {
        title = link.description[this.language];
      }
      return title;
    },

    downloadAllowed(index) {
      this.axios({
        method: "get",
        url:
          this.url +
          "data/v1_0/request?collection=" +
          this.metadata.id +
          "&folder=" +
          index,
      })
        .then((response) => {
          if (response.data) {
            this.dataExist = true;
          }
          return this.dataExist;
        })
        .catch((error) => {
          // this.displayError("An error has occured:" + error)
          console.log(error);
        })
        .finally(() => {});
    },
  },
};
</script>
