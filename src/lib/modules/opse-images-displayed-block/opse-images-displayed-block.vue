<i18n  >
{
  "en": {
    "opseAccessData": "Data access",
    "opseDisplayedImg": "Data displayed Image",
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
    "opseDisplayedImg": "Affichage des données",
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
        <!-- <v-icon large left style="color: #f39c12">mdi-database</v-icon> -->
        <span>{{ $t("opseDisplayedImg") }}</span>
      </v-card-title>

      <article>
        <v-card
        class="mx-auto my-auto"
            max-width="500"
        >
          <v-subheader>Tick labels</v-subheader>

          <v-card-text>
            <v-slider
              v-model="image"
              :max="size"
              step="1"
              ticks="always"
              persistent-hint
              thumb-label="always"
            >
              <template v-slot:thumb-label="{ value }">
                {{ years[value] }}
              </template>
            </v-slider>
            <v-img :src="images[image]"> </v-img>
          </v-card-text>
        </v-card>
      </article>
    </v-card>
  </div>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
  name: "opse-images-displayed-block",

  data() {
    return {
      size : 4,
      dataPolicy: false,
      currentStatus: "PREPARING_REQUEST",
      image: 0,
      years: [
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
      ],
      images:['https://d1fq16qvu9tpz9.cloudfront.net/uploads/ckeditor/pictures/110/content_Screen_Shot_2017-08-10_at_2.53.54_PM.png',
             'https://lh3.googleusercontent.com/-sCfzC3XvMJ4nzaGWB0Tt455uhaAn7usvQPrs0GkTf2RGjKpKY3rjeXMi8okbCI-yRE=w454-rwa',
             'https://upload.wikimedia.org/wikipedia/commons/4/43/Grafic_contributii_2008.png',
             'https://upload.wikimedia.org/wikipedia/commons/4/43/Grafic_contributii_2008.png',
             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-6t06HlYgd59JJbdXnP8NWtdtkk835RPdXTeXLLDwp8V0mlDX5IjD1M_TYS2VnquG0_0&usqp=CAU']
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
  },

  watch: {
    metadata() {
      this.loadPhotos();
    },
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
    this.file();
  },

  methods: {
    file() {
      this.loadPhotos(this.folderFile);
    },

    loadPhotos() {
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
          "data/v1_0/photos?collection=" +
          this.metadata.id
      );
      this.axios({
        method: "get",
        url:
          this.url +
          "data/v1_0/photos?collection=" +
          this.metadata.id
        //url: this.url + "/request?collection="+this.metadata.id,
      })
        .then((response) => {
          this.years = [];
          this.images = [];
          this.size=0;
          console.log("Response", response.data);

          for (let i = 0; i < response.data.entries.length; i++) {
            this.size = response.data.entries.length -1;
            this.years.push(response.data.entries[i].date.substring(0, 4));
            this.images.push("data:image/jpg;base64,"+response.data.entries[i].image);
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
