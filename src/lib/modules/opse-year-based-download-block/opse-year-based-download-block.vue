<i18n  >
{
  "en": {
    "opseAccessData": "Data access",
    "opseDownload": "Download",
    "explicationText": "Select the years you want to download.",
    "year": "Year",
    "downloadAll": "Download All years",
    "downloadSelected": "Download selected years",
    "opseAlert":"No data available yet."        

  },
  "fr": {
    "opseAccessData": "Accès aux données",
    "opseDownload": "Téléchargement",
    "explicationText": "Selectionnez les années que vous voulez télécharger (tous les paramètres sont sélectionés par défaut).",
    "year": "Année",
    "downloadAll": "Télécharger",
    "downloadSelected": "Télécharger la sélection",
    "opseAlert":"Aucune donnée n'est encore disponible."
    

  }
}
</i18n>

<template>
    <div>
        <v-card v-if="isVisible" :style="applyTheme" :flat="true">
            <v-card-title>
                <v-icon large left style="color:#F39C12">mdi-database</v-icon>
                <span>{{ $t('opseAccessData') }}</span>
            </v-card-title>
            
            <p>To download the data files, you should agree with the Data Policy.</p>
            <!--p v-if="downloadAllowed"> No data availaible</p-->
            <v-alert v-if="downloadAllowed" dense outlined type="error">{{$t('opseAlert')}}</v-alert>
            <p><v-checkbox v-model="dataPolicy" label="I agree with the Data Policy" hide-details :disabled="downloadAllowed"></v-checkbox></p>
            <span class="explication">{{ $t("explicationText") }}</span>
            <article>
                <v-btn-toggle
                    v-model="selectedYears"
                    color="primary"
                    group
                    multiple
                    class="d-flex align-center flex-row flex-wrap"
                >
                <v-btn v-for="(year, index) in years" 
                         :key="index" :value="year" text :disabled="!dataPolicy">
                    <section  >
                      <div class="label-year font-weight-thin rounded-5">
                        {{ $t("year") }}                        
                      </div>
                       <div class="font-weight-black">
                        {{ year }}
                      </div>
                    </section>
                </v-btn>
                </v-btn-toggle>
              </article>
    <v-btn color="warning" class="ma-4" @click="downloadAll()" :disabled="!url || downloadAllowed || !dataPolicy">{{ $t('downloadAll') }}</v-btn>
    <v-btn color="warning" class="ma-4" @click="downloadSelected()" :disabled="!url || selectedYears.length==0 || downloadAllowed">{{ $t('downloadSelected') }}</v-btn>
        </v-card>
    </div>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
    name: "opse-year-based-download-block",

    data(){
        return{
        dataPolicy: false,
        years: [], 
        selectedYears: [],
        currentStatus: "PREPARING_REQUEST",
        url: null,

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
        if(this.url != null) {
            isVisible = true
        }
        
        this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("opseDownload"),
        isVisible
        });
        return isVisible;
    },

    downloadAllowed() {
      if(this.years && this.years.length > 0) {
        return false
      } else {
        return true
      }

    }


    },

    watch: {

    metadata() {
      this.loadYears();
    },
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
   this.$i18n.locale = this.language;
   this.loadYears()
  },

    methods:{

              
        download(url) {
      this.currentStatus = "PREPARING_REQUEST";
      let self = this;
      this.downloadDialog = true;
       this.axios({
        method: "get",
        url: url,
      }).then(response => {
        
        self.requestId = response.data;
        /*self.checker = setInterval(() => {
            self.checkDownload(self.metadata.id,self.requestId);
           }, 5000);*/
      }).catch((error) => {
        // debugger
         //self.clearChecker();
        self.displayError("An error has occured:" + error)
        console.log(error)
        
        })
      .finally(() => {
          this.loading = false
      });
    },

        downloadAll(){
        //this.download(this.url+"download?collectionId="+this.metadata.id)
        window.open(this.url+"/download?collectionId="+this.metadata.id)
        },

        downloadSelected(){
        window.open(this.url+"/downloadYear?collectionId="+this.metadata.id+"&filter=year_"+this.selectedYears.join("_"));
        },

        loadYears() {
      let url = null
        if(this.metadata && this.metadata.links && this.metadata.links.length > 0) {
            for(let i=0 ; i < this.metadata.links.length ; i++) {
                if(this.metadata.links[i].type == 'OPENSEARCH_LINK') {
                    url = this.metadata.links[i].url
                    break
                }
            }
        }
        this.url = url;
        if (url == null) {
          return
        }

      this.loading = true
      this.axios({
        method: "get",
        url: this.url + "/request?collection="+this.metadata.id,
      }).then(response => {
        this.years = []
        for(let i=0 ; i<response.data.entries.length ; i++) {
            this.years.push(response.data.entries[i].date.substring(0,4))
        }
      }).catch((error) => {
        // this.displayError("An error has occured:" + error)
        console.log(error)
        
        })
      .finally(() => {
          this.loading = false
      });

    }

    },
    
}
</script>
