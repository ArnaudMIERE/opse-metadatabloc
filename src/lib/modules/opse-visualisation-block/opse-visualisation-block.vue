<i18n  >
{
  "en": {
    "bvetAccessData": "Data access",
    "explicationText": "Select the years you want to download.",
    "explicationParameters": "Select the parameters you want to donwload (all parameters are selected by default).",
    "selectionError": "Select at least one parameter",
    "year": "Year",
    "parameter": "Parameter",
    "downloadSelected": "Download selected years",
    "downloadAll": "Download All years",
    "blocTitle": "Time series",
    "downloadingData": "Download progression",
    "loadingYears": "Loading year details",
    "PREPARING_REQUEST": "Sending request",
    "COLLECTING_DATA": "Collecting data",
    "PROCESSING_DATA": "Processing data",
    "GENERATING_ARCHIVE_DATA": "Generating data archive",

    "dataAreReady": "Your data are now ready to be retrieved",
    "cancel": "Cancel"
  },
  "fr": {
     "downloadSelected": "Télécharger la sélection",
    "downloadAll": "Télécharger",
    "bvetAccessData": "Accès aux données",
    "explicationText": "Selectionnez les années que vous voulez télécharger (tous les paramètres sont sélectionés par défaut).",
    "explicationParameters": "Selectionnez les paramètres que vous voulez télécharger.",
    "selectionError": "Selectionez au moins un paramètre",
    "year": "Année",
    "parameter": "Paramètre",
    "blocTitle": "Séries temporelles",
    "downloadingData": "Progression du téléchargement",
    "loadingYears": "Chargement des détails des années",
    "PREPARING_REQUEST": "Envoi de la requête",
    "COLLECTING_DATA": "Collecte des données",
    "PROCESSING_DATA": "Traitement des données",
    "GENERATING_ARCHIVE_DATA": "Génération de l'archive",
    "dataAreReady": "Les données sont prêtes à être récupérées",
    "cancel": "Annuler"
  }
}
</i18n>
<template>
  <span>
    <v-card v-if="isVisible" :style="applyTheme" :flat="true">
      <v-card-title>
        <v-icon large left style="color: #f39c12"
          >mdi-chart-timeline-variant</v-icon
        >
        <span>{{ $t("blocTitle") }}</span>
      </v-card-title>
      <v-card-text v-if="years.length > 0">
        <!-- <div v-if="locations.length==0">
    No location
  </div> -->
        <div>
          <section v-if="hasNamedParameters">
            <div class="text-h6">Parameters</div>
            <v-btn
              small
              class="mr-2 mt-2"
              :color="isselectedparams(parameter)? 'primary' : 'default'"
              v-for="parameter in parameters"
              :key="parameter"
              @click="selectParameter(parameter)"
              >{{ parameter }}</v-btn
            >
          </section>
          <section v-if="hasNamedYears">
            <div class="text-h6">Years</div>
            <v-btn
              small
              class="mr-2 mt-2"
              :color="year == selectedYear ? 'primary' : 'default'"
              v-for="year in years"
              :key="year"
              @click="selectYear(year)"
              >{{ year }}</v-btn
            >
          </section>

          <section class="py-2" v-if="loadingData">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
            <div>
              Loading data:

              <span v-if="selectedParameters.length > 0"
                >Parameter {{ selectedParameters }}</span
              >
              <span
                v-if="
                  selectedParameters.length > 0 && ('' + selectedYear).length > 0
                "
              >
                -
              </span>
              <span v-if="('' + selectedYear).length > 0"
                >Year {{ selectedYear }}</span
              >
            </div>
          </section>
          <section class="py-2" v-else>
            <vue-highcharts
              :highcharts="Highcharts"
              :options="chartOptions"
            ></vue-highcharts>
          </section>
        </div>
      </v-card-text>
      <v-card-text v-else>
        Visualisation has not been implemented yet for this dataset.
      </v-card-text>
    </v-card>
  </span>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts/highstock";
import Exporting from "highcharts/modules/exporting";
Exporting(Highcharts);
export default {
  name: "opse-visualisation-block",
  components: {
    VueHighcharts,
  },
  data() {
    return {
      loading: false,
      Highcharts: Highcharts,
      loadingData: false,
      locations: [],
      selectedLocation: "",
      parameters: [],
      selectedParameters: null,
      selectedYear: "",
      years: [],
      pivots: [],
      chartOptions: null,
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

    hasNamedParameters() {
      if (this.parameters == null) {
        return false;
      }
      if (this.parameters.length == 0) {
        return false;
      }
      for (let i = 0; i < this.parameters.length; i++) {
        if (this.parameters[i].length > 0) {
          return true;
        }
      }
      return false;
    },

    hasNamedYears() {
      if (this.years == null) {
        return false;
      }
      if (this.years.length == 0) {
        return false;
      }
      return true;
    },

    isVisible() {
      let isVisible = true;
      let url = this.computeUrl();
      if (!url) {
        isVisible == false;
      }
      this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("blocTitle"),
        isVisible,
      });
      console.log('isvisible value',isVisible);
      return isVisible;
    },
  },

  watch: {
    metadata() {
      //this.loadLocations();
      this.loadYears()
    },

    language(value) {
      this.$i18n.locale = value;
    },
  },

  mounted() {
    this.$i18n.locale = this.language;
    //this.loadLocations();
    this.loadYears()
  },

  methods: {

    selectParameter(parameter) {
      if (this.selectedParameters.includes(parameter)) {
        this.selectedParameters = this.selectedParameters.filter(function (
          ele
        ) {
          return ele != parameter;
        });
      } else {
        this.selectedParameters.push(parameter);
      }
      console.log(this.selectedParameters)
      this.loadData();
      /*
      this.years = parameter.years;
      if (this.years && this.years.length > 0) {
        this.selectYear(this.years[0]);
      } else {
        this.loadData();
      }*/
    },

    selectYear(year) {
      this.selectedYear = year;
      this.loadData();
    },

    loadData() {
      this.loadingData = true;
      let url = this.computeUrl();
      if (!url) {
        return;
      }
      if (!url.endsWith("/")) {
        url = url + "/";
      }
      url = url + "data/v1_0/json?uuid=" + this.metadata.id;
      if (("" + this.selectedYear).length > 0) {
        url = url + "&year=" + this.selectedYear;
      }
      if (this.selectedParameters && this.selectedParameters.length > 0) {
        url = url + "&param=" + this.selectedParameters.join("___");
      }
      this.axios({
        method: "get",
        url: url,
      })
      
        .then((response) => {
          //   let timeserie = {
          // x: [],
          // y: [],
          // type:"scatter"
          //   }

          let data = [];
          let keys = [];
          let values = [];

          let series = [];
          let serievalues = {};

          for (let i = 0; i < response.data.length; i++) {
            let aux = [];
            aux.push(Date.parse(response.data[i].ts));
            aux.push(parseFloat(response.data[i].f.value));
            data.push(aux);
          }

          for (let i = 0; i < response.data.entries.length; i++) {
            keys = response.data.entries[i].key
            values = response.data.entries[i].data
            let datas = [];
            for(let j =0; j<keys.length; j++){
              let aux = [];
              aux.push(Date.parse(keys[j]));
              aux.push(parseFloat(values[j]));
              datas.push(aux);
            }
            serievalues.name = response.data.entries[i].name;
            serievalues.data = datas;
            
            series.push({...serievalues});
            
          }
          console.log(series)

          let chartOptions = {
            rangeSelector: {
              inputEnabled: false,
              buttons: [
                {
                  type: "month",
                  count: 3,
                  text: "3m",
                },
                {
                  type: "year",
                  count: 1,
                  text: "1y",
                },
                {
                  type: "all",
                  text: "All",
                },
              ],
            },
            title: {
              text: "",
            },
            xAxis: {
              type: "datetime",
              title: {
                text: null,
              },
            },
            yAxis: {
              title: {
                text: null,
              },
            },
            series: series,
          };
          this.chartOptions = chartOptions;
        })
        .catch((error) => {
          // this.displayError("An error has occured:" + error)

          console.log(error);
        })
        .finally(() => {
          this.loadingData = false;
        });
    },

    computeUrl() {
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
      console.log(url)
      return url;
    },
    loadYears() {
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
          "&folder=/data/csv"
      );
      this.axios({
        method: "get",
        url:
          this.url +
          "data/v1_0/request1?collection=" +
          this.metadata.id +
          "&folder=/data/csv"
        //url: this.url + "/request?collection="+this.metadata.id,
      })
        .then((response) => {
          this.years = [];
          this.parameters = [];
          this.selectedParameters = []
          this.pivots = [];
          console.log("Response", response.data);

          for (let i = 0; i < response.data.entries.length; i++) {
            this.years.push(response.data.entries[i].date.substring(0, 4));
          }
          for (let i = 0; i < response.data.pivots.length; i++) {
            this.pivots.push(response.data.pivots[i].name);
          }
          for (let i = 0; i < response.data.parameters.length; i++) {
            if (
              !this.pivots.includes(response.data.parameters[i].name)
            ) {
              this.parameters.push(response.data.parameters[i].name);
            }
          }

          //console.log(this.years);
          if (this.years.length > 0) {
            this.selectYear(this.years[0]);
          }
          if (this.parameters.length > 0) {
            this.selectParameter(this.parameters[0]);
          }
        }
        
        )
        .catch((error) => {
          // this.displayError("An error has occured:" + error)
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  isselectedparams(param){
    let value = false;
    for (let i = 0; i < this.selectedParameters.length; i++){
      if(param == this.selectedParameters[i])
      value =  true;
    }
    //console.log(this.selectedParameters);
    //console.log("voici la value",value);
    //console.log("voici la parametre",param);
    return value;
  }
  },
};
</script>

<style scoped>
</style>
