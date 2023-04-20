<i18n  >
{
  "en": {
    "opseAccessData": "Data access",
    "opseDownload": "Download",
    "explicationText": "Select the years you want to download (all years are selected by default).",
    "explicationTextParams": "Select the params you want to download (all params are selected by default).",
    "year": "Year",
    "param": "Parameter",
    "downloadAll": "Download All years",
    "downloadSelected": "Download selected years",
    "opseAlert":"No data available yet."        

  },
  "fr": {
    "opseAccessData": "Accès aux données",
    "opseDownload": "Téléchargement",
    "explicationText": "Selectionnez les années que vous voulez télécharger (toutes les années sont sélectionées par défaut).",
    "explicationTextParams": "Selectionnez les paramètres que vous voulez télécharger (tous les paramètres sont sélectionés par défaut).",
    "year": "Année",
    "param": "Parametre",
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
        <v-icon large left style="color: #f39c12">mdi-database</v-icon>
        <span>{{ $t("opseAccessData") }}</span>
      </v-card-title>
      <p>Select Data format</p>
      <v-radio-group v-model="folderFile" column>
        <v-radio
          label="Netcdf"
          value="/data/netcdf"
          @click="loadYears(folderFile)"
        ></v-radio>
        <v-radio
          label="CSV"
          value="/data/csv"
          @click="loadYears(folderFile)"
        ></v-radio>
        <!--v-radio label="GEOJSON" value="/data/geojson" @click="loadYears(folderFile)"></v-radio>
              <v-radio label="SHAPE" value="/data/shp" @click="loadYears(folderFile)"></v-radio-->
      </v-radio-group>
      <p>To download the data files, you should agree with the Data Policy.</p>
      <!--p v-if="downloadAllowed"> No data availaible</p-->
      <v-alert v-if="downloadAllowed" dense outlined type="error">{{
        $t("opseAlert")
      }}</v-alert>
      <p>
        <v-checkbox
          v-model="dataPolicy"
          label="I agree with the Data Policy"
          hide-details
          :disabled="downloadAllowed"
        ></v-checkbox>
      </p>
      <span class="explication">{{ $t("explicationTextParams") }}</span>
      <article>
        <v-btn-toggle
          v-model="selectedParams"
          color="primary"
          group
          multiple
          class="d-flex align-center flex-row flex-wrap"
        >
          <v-btn
            v-for="(param, index) in params"
            :key="index"
            :value="param"
            text
            :disabled="!dataPolicy"
          >
            <section>
              <div class="label-year font-weight-thin rounded-5">
                {{ $t("param") }}
              </div>
              <div class="font-weight-black text-center d-flex align-center justify-space-around">
                <v-tooltip bottom>
                 <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"
                      >
                {{ param }}</span>
                 </template>
                 <span>{{ loadParamsName(param) }}</span>
                </v-tooltip>
              </div>
              
            </section>
          </v-btn>
        </v-btn-toggle>
      </article>
      <span class="explication">{{ $t("explicationText") }}</span>
      <article>
        <v-btn-toggle
          v-model="selectedYears"
          color="primary"
          group
          multiple
          class="d-flex align-center flex-row flex-wrap"
        >
          <v-btn
            v-for="(year, index) in years"
            :key="index"
            :value="year"
            text
            :disabled="!dataPolicy"
          >
            <section>
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
      <v-btn
        color="warning"
        class="ma-4"
        @click="downloadAll(folderFile); mailDownload();"
        :disabled="!url || downloadAllowed || !dataPolicy"
        >{{ $t("downloadAll") }}</v-btn
      >
      <v-btn
        color="warning"
        class="ma-4"
        @click="downloadSelected(folderFile); mailDownload();"
        :disabled="!url || selectedYears.length == 0 || downloadAllowed"
        >{{ $t("downloadSelected") }}</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
  name: "opse-year-based-download-block",

  data() {
    return {
      dataPolicy: false,
      years: [],
      params: [],
      selectedYears: [],
      selectedParams: [],
      currentStatus: "PREPARING_REQUEST",
      url: null,
      folderFile: "/data/netcdf",
      email:[],
      message:""
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

    downloadAllowed() {
      if (this.years && this.years.length > 0) {
        return false;
      }
      return true;
    },
  },

  watch: {
    metadata() {
      this.loadYears();
    },
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
    //this.loadYears()
    this.file();
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
        console.log("Contacte "+this.metadata.contacts[i].email, i)
        if (this.metadata.contacts[i].roles == "pointofcontact"){
        console.log("Contact "+this.metadata.contacts[i].email)
       
        mail = this.email.push(this.metadata.contacts[i].email)
         
        }

        if (this.metadata.contacts[i].roles == "principalinvestigator"){
        console.log("Contact "+this.metadata.contacts[i].email)
       
        mail = this.email.push(this.metadata.contacts[i].email)
         
        }
        
      }
      return mail;
    },

    file() {
      this.loadYears(this.folderFile);
    },

    loadParamsName(short_name) {
      if (this.metadata.parameterSet == null) return "";
      for (let i = 0; i < this.metadata.parameterSet.length; i++) {
        if (this.metadata.parameterSet[i].shortName == short_name) {
          return this.metadata.parameterSet[i].longName;
        }
      }
      return "";
    },

    download(url) {
      this.currentStatus = "PREPARING_REQUEST";
      let self = this;
      this.downloadDialog = true;
      this.axios({
        method: "get",
        url: url,
      })
        .then((response) => {
          self.requestId = response.data;
          /*self.checker = setInterval(() => {
            self.checkDownload(self.metadata.id,self.requestId);
           }, 5000);*/
        })
        .catch((error) => {
          // debugger
          //self.clearChecker();
          self.displayError("An error has occured:" + error);
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    downloadAll(index) {
      //this.download(this.url+"download?collectionId="+this.metadata.id)
      window.open(
        this.url +
          "data/v1_0/download?collectionId=" +
          this.metadata.id +
          "&folder=" +
          index
      );
    },

    downloadSelected(index) {
      window.open(
        this.url +
          "data/v1_0/downloadYear?collectionId=" +
          this.metadata.id +
          "&folder=" +
          index +
          "&filter=year___" +
          this.selectedYears.join("___") +
          "____parameter___" +
          this.selectedParams.join("___")
      );
    },

    loadYears(index) {
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
      this.url = url;
      if (url == null) {
        return;
      }

      this.loading = true;
      console.log(
        "url ",
        this.url +
          "data/v1_0/request1?collection=" +
          this.metadata.id +
          "&folder=" +
          index
      );
      this.axios({
        method: "get",
        url:
          this.url +
          "data/v1_0/request1?collection=" +
          this.metadata.id +
          "&folder=" +
          index,
        //url: this.url + "/request?collection="+this.metadata.id,
      })
        .then((response) => {
          this.years = [];
          this.params = [];
          this.selectedParams = [];
          console.log("Response", response.data);

          for (let i = 0; i < response.data.entries.length; i++) {
            this.years.push(response.data.entries[i].date.substring(0, 4));
          }
          for (let i = 0; i < response.data.pivots.length; i++) {
            this.selectedParams.push(response.data.pivots[i].name);
          }
          for (let i = 0; i < response.data.parameters.length; i++) {
            if (
              !this.selectedParams.includes(response.data.parameters[i].name)
            ) {
              this.params.push(response.data.parameters[i].name);
            }
          }
        })
        .catch((error) => {
          // this.displayError("An error has occured:" + error)
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
