<i18n  >
{
  "en": {
    "opseAccessData": "Data vizualisation",
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
    "opseAccessData": "Visualisation des données",
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
          label="RGB"
          value="/thumnails/RGB"
          @click="loadImage(folderFile)"
        ></v-radio>
        <v-radio
          label="MS"
          value="/thumnails/MS"
          @click="loadImage(folderFile)"
        ></v-radio>
        <v-radio
          label="MNE"
          value="/thumnails/MNE"
          @click="loadImage(folderFile)"
        ></v-radio>
      </v-radio-group>
      <div>
        <v-row height="900px">
          <v-col v-for="(item, index) in itemsPages" :key="index" class="d-flex child-flex" cols="3">
            <v-img
              :src=item
              :lazy-src=item
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
        
      </div>
      <div class="text-center">
          <v-pagination class="pagination mb-2" v-model="page" :length="pages" @input="updatePage"></v-pagination>
        </div>

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
        @click="downloadAll(folderFile)"
        :disabled="!url || downloadAllowed || !dataPolicy"
        >{{ $t("downloadAll") }}</v-btn
      >
      <v-btn
        color="warning"
        class="ma-4"
        @click="downloadSelected(folderFile)"
        :disabled="!url || selectedYears.length == 0 || downloadAllowed"
        >{{ $t("downloadSelected") }}</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
  name: "opse-thumbnails-displayed-block",

  data() {
    return {
      prefix: "file:///",
      dataPolicy: false,
      years: [],
      params: [],
      selectedYears: [],
      selectedParams: [],
      currentStatus: "PREPARING_REQUEST",
      url: null,
      page:1,
      itemsPages:[],
      folderFile: "/thumnails/RGB",
      items: [
         
      ],
      listCount: 0,
      pageSize: 6,
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
      if (this.years && this.years.length > 0 || this.items) {
        return false;
      }
      return true;
    },
    pages() {
			let _this = this;
			if (_this.pageSize == null || _this.listCount == null) return 0;
			return Math.ceil(_this.listCount / _this.pageSize);
		}
  },

  watch: {
    metadata() {
      this.loadImage();
    },
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
    //this.loadImage()
    this.file();
    this.initPage();
		this.updatePage(this.page);
  },

  methods: {
    file() {
      this.loadImage(this.folderFile);
    },

    initPage() {
			this.listCount = this.items.length;
			if (this.listCount < this.pageSize) {
				this.itemsPages = this.items;
			} else {
				this.itemsPages = this.items.slice(0, this.pageSize);
			}
		},
    updatePage(pageIndex) {
			let _this = this;
			let _start = (pageIndex - 1) * _this.pageSize;
			let _end = pageIndex * _this.pageSize;
			_this.itemsPages = _this.items.slice(_start, _end);
			_this.page = pageIndex;
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
    loadImage(format) {
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
          "data/v1_0/thumbnails?collection=" +
          this.metadata.id +
          "&folder=" +
          format
      );
      this.axios({
        method: "get",
        url:
          this.url +
          "data/v1_0/thumbnails?collection=" +
          this.metadata.id +
          "&folder=" +
          format,
        //url: this.url + "/request?collection="+this.metadata.id,
      })
        .then((response) => {
          this.years = [];
          this.items = [];
          console.log("Response", response.data);

          for (let i = 0; i < response.data.entries.length; i++) {
            this.years.push(response.data.entries[i].date.substring(0, 4));
          }
          for (let i = 0; i < response.data.urls.length; i++) {
            this.items.push(response.data.urls[i].url);
          }
          this.page=1;
          this.initPage();
          this.updatePage(this.page);
          
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
0