<i18n  >
{
  "en": {
    "openopseVisualisation": "Visualisation",
    "openopseOpacity": "Opacity",
    "instructions": "Hover over the areas to get information about them."
  },
  "fr": {
    "openopseVisualisation": "Visualisation",
    "openopseOpacity": "Opacité",
    "instructions": "Survolez les zones afin d'obtenir l'information les concernant."
  }
}
</i18n>
<template>
<v-card v-if="isVisible" :style="applyTheme" :flat="true">
  <v-card-title>
      <v-icon large left>mdi-earth</v-icon>
      <span>{{ $t('openopseVisualisation') }}</span>
    </v-card-title>
    <v-progress-linear indeterminate v-if="loading" class="mt-3"></v-progress-linear>
    <br/>
    <div v-if="yearValue">
      <v-slider
        v-model="yearIndex"
        thumb-label="always"
        :max="years.length - 1"
        step="1"
        ticks="always"
        :tick-size="4"
         @mouseup="getFeatures(yearIndex)"
      >
        <template v-slot:thumb-label="{ value }">
            {{ years[value] }}
          </template>
      </v-slider>
      </div>
<l-map style="height: 500px" :zoom="zoom" :center="center">
<l-tile-layer :url="mapUrl" :attribution="attribution"></l-tile-layer>
<l-geo-json :geojson="geojson" :options="options"></l-geo-json>
</l-map>
</v-card>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { applyPrimaryAndSecondaryColors } from "../../utils";
import {LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
//import { featureGroup } from "leaflet";

import geojsonExtent from 'geojson-extent';

export default {
  name: "openopse-visualisation-block",
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data () {
    return {
      mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 9,
      center: [14.5, -16.5],
      geojson: null,
      loading: false,
      yearIndex: 0,
      years: [0],
      features: [],
      mapLoader:0
    };
  },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {
        return {        primaryColor: "#0b6bb3",
        secondaryColor: "#f39c12"};
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
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        };
      };
    },
    onEachFeatureFunction() {
      
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>Id: " +
            feature.properties.Id +
            "</div><div>SiteName: " +
            feature.properties.SiteName +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    },

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
        programmaticScrollingTitle: this.$t("openopseVisualisation"),
        isVisible
        });
        return isVisible;
    },

    url() {
        let url = null
        if(this.metadata && this.metadata.links && this.metadata.links.length > 0) {
            for(let i=0 ; i < this.metadata.links.length ; i++) {
                if(this.metadata.links[i].type == 'QUICKLOOK_LINK') {
                    url = this.metadata.links[i].url
                    break
                }
            }
        }
        return url
    },
     yearValue() {
        let requestedYear = 0
        if(this.years != null && this.years.length > 0) {
            requestedYear = this.years[this.yearIndex]
        }
        return requestedYear
    },
  },

   created () {
   /*this.loading = true;
    const response = await fetch(this.url+"preview/v1_0/geojson?uuid="+this.metadata.id+"&filter="+this.years[this.yearIndex]);
    console.log("response ",response)
    this.geojson = await response.json();
    console.log("geojson ",this.geojson)
    this.loading = false;*/
    this.getRangeGeoJson();
    
  },

  mounted() {
    this.mapLoader = setInterval(() => {
      this.isMapLoaded();
    }, 1000)
  },

  methods:{
    getRangeGeoJson() {
      this.loading = true
      this.axios({
        method: "get",
        url: this.url + "preview/v1_0/request?collection="+this.metadata.id,
      }).then(response => {
        this.years = []
        for(let i=0 ; i<response.data.entries.length ; i++) {
            this.years.push(response.data.entries[i].date.substring(0,4))
        }
        this.yearIndex = this.years.length - 1
        this.getFeatures(this.yearIndex)
      }).catch((error) => {this.displayError("An error has occured:" + error)})
      .finally(() => {
          this.loading = false
      });
    },

    async getFeatures(index) {
      let link=null
      //if (index >= 0){
        link = this.url + "preview/v1_0/geojson?uuid="+this.metadata.id+"&filter="+this.years[index]
      /*}else{
        link = this.url + "preview/v1_0/geojson?uuid="+this.metadata.id
      }*/
      this.loadingFeatures = true
      this.axios({
        method: "get",
        url: link,
      }).then(response => {
          if(response.data.features) {
            this.features = response.data.features
            this.geojson = this.features
            console.log("this.geojson ",this.geojson)
            // start creating global extent from extent of all features
            return this.setExtent()
          } else {
            this.features = []
          }
         
            
          
      }).catch((error) => {this.displayError("An error has occured:" + error)})
      .finally(() => {
          this.loadingFeatures = false
      });
    },

    setExtent() {
      if(this.features != null && this.features.length > 0) {
        // start creating global extent from extent of all features
        var ext = geojsonExtent(this.features[0])
        let west = ext[0]
        let east = ext[2]
        let south = ext[1]
        let north = ext[3]
        for(let i=1 ; i<this.features.length ; i++) {
          var feature = this.features[i];
          ext = geojsonExtent(feature)
          if(west > ext[0]) {
            west = ext[0]
          }
          if(east < ext[2]) {
            east = ext[2]
          }
          if(south > ext[1]) {
            south = ext[1]
          }
          if(north < ext[3]) {
            north = ext[3]
          }
        }
        // add a random delta to force a new extent and trigger the event @moveend="styleFeatures"
        //let delta = 1 / ( (Math.floor(Math.random() * 20) + 1) * 10)
        ext = new Array(west, south, east, north)
       // ext = transformExtent(ext, get('EPSG:4326'), get('EPSG:3857'))
        var view = this.$refs.map.$map.getView()
        view.fit(ext);
      }
    },

    /**
     * Wait for the features layer to be loaded
     */
    isMapLoaded() {
      if (this.$refs.map == null || this.$refs.map == undefined) {
        return false;
      }
      var self = this;
      //let source
      this.$refs.map.$createPromise.then(vm => {
        vm.$map.getLayers().forEach(function(layer) {
          if (layer.get("id") == "features-panel") {
            self.vectorLayerSource = layer.getSource();
            self.onMapMounted();
            clearInterval(self.mapLoader);
            self.mapLoaded = true;
          } 
        });
      });
    },

    onMapMounted() {
      this.setExtent()
    },
  }
}
</script>