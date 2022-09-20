<i18n  >
{
  "en": {
    "opseVisualisation": "Visualisation",
    "Informations": "Informations",
    "Coordinates": "Coordinates",
    "Properties": "Properties",
    "instructions": "Hover over the areas to get information about them."
  },
  "fr": {
    "opseVisualisation": "Visualisation",
    "Informations": "Informations",
    "Coordinates": "Coordonnées",
    "Properties": "Propriétés",
    "instructions": "Survolez les zones afin d'obtenir l'information les concernant."
  }
}
</i18n>
<template>
    

<v-card v-if="isVisible" :style="applyTheme" :flat="true">
    <v-card-title>
      <v-icon large left>mdi-earth</v-icon>
      <span>{{ $t('opseVisualisation') }}</span>
    </v-card-title> 

    <p>
      <span class="text-caption">{{ $t('instructions') }}</span>
    </p>
  <v-progress-linear indeterminate v-if="loading" class="mt-3"></v-progress-linear>
  <v-card-text v-else class="mt-5">
      <div v-if="yearValue">
      <v-slider
        v-model="yearIndex"
        thumb-label="always"
        :max="years.length - 1"
        step="1"
        ticks="always"
        :tick-size="4"
       
       >
        <template v-slot:thumb-label="{ value }">
            {{ years[value] }}
          </template>
      </v-slider>
      </div>
  <vl-map class="map" ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
        data-projection="EPSG:4326" style="height: 450px" @pointermove="addOverlayOnHoveredFeature">
    <vl-view :min-zoom="1"></vl-view>
    
    <vl-layer-tile>
      <vl-source-xyz :url="mapUrl"></vl-source-xyz>
    </vl-layer-tile>
    
    <vl-layer-vector id="features-panel">
      <vl-source-vector :features.sync="features" ></vl-source-vector>
    </vl-layer-vector>

    <vl-overlay id="overlay" :position="overlayCoordinate" positioning='bottom-center'>
          <template>
            <div class="overlay-content">
              <span v-if="showOverlay" style="font-weight: bold;">{{ overlayMessage }}</span>
            </div>
          </template>
        </vl-overlay>
    
    
    
  </vl-map>
  </v-card-text>  

</v-card>
</template>


<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
import {transformExtent} from 'ol/proj';
import {get} from 'ol/proj';
import {Fill, Stroke, Style, Circle} from 'ol/style';
import geojsonExtent from 'geojson-extent';




export default {
  name: "opse-sig-visualisation-block",

  components: {

  },


  data() {
    return {
        //mapUrl: "https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnJhbmNvaXNhbmRyZSIsImEiOiJjaXVlMGE5b3QwMDBoMm9tZGQ1M2xubzVhIn0.FK8gRVJb4ADNnrO6cNlWUw",
        mapUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        yearIndex: 0,
        years: [0],
        loading: false,
        loadingFeatures: false,
        features: [],
        overlayCoordinate: [0,0],
        showOverlay: false,
        overlayMessage: null,
        opacitySlider: 5,
        mapLoaded: false,
        mapLoader: 0,
        zoom: 10,
      center: [-16.5, 14.5],
      geojsonUrl: '',
     
      selectedFeatures: [],
      folderFile : "/data/shp",

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
        programmaticScrollingTitle: this.$t("opseVisualisation"),
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

    opacity() {
      return this.opacitySlider / 10
    }

  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

   created() {
    //debugger
    this.$i18n.locale = this.language;
    
    this.getRangeGeoJson()
   
  },

  mounted() {
    
      this.mapLoader = setInterval(() => {
      this.isMapLoaded();
    }, 1000)
    /* let storedFeatures = localStorage.getItem("features");
      if (storedFeatures) {
         this.features = JSON.parse(storedFeatures)
      }*/
  },

  updated() {
   // this.styleFeatures()
  },

  

  methods: {
    /**
     * Get years range form rest api
     */
    getRangeGeoJson() {
      this.loading = true
      this.axios({
        method: "get",
        url: this.url + "data/v1_0/request?collection="+this.metadata.id+"&folder="+this.folderFile,
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

    

    /**
     * Call Rest Api to get all features for a given year
     * Compute global features extent and zoom on it
     */
    getFeatures(index) {
     
      let link=null
      if (index >= 0){
         link = this.url + "preview/v1_0/geojson?uuid="+this.metadata.id+"&filter="+this.years[index]
      }else{
        link = this.url + "preview/v1_0/geojson?uuid="+this.metadata.id
      }
      this.loadingFeatures = true
      this.axios({
        method: "get",
        url: link,
      }).then(response => {
          if(response.data.features) {
            this.features = response.data.features
            //localStorage.setItem("features", JSON.stringify(this.features));
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
        ext = transformExtent(ext, get('EPSG:4326'), get('EPSG:3857'))
        var view = this.$refs.map.$map.getView()
        view.fit(ext);
      }
    },


    /**
     * Detected pointed feature and add overlay wit feature name
     */
    addOverlayOnHoveredFeature(event) {
      var currentFeature = null
      this.$refs.map.$map.forEachFeatureAtPixel(event.pixel, function(f) {
        currentFeature = f
      })
      if (currentFeature) {
        this.overlayCoordinate = event.coordinate
        this.showOverlay = true
        this.overlayMessage = currentFeature.get("Species")
        if (!currentFeature.get("Species")){
          this.overlayMessage = currentFeature.get("SiteName")+ " - " + currentFeature.get("KeyWords")
        }else{
          this.overlayMessage = currentFeature.get("Species")
        }
        if (currentFeature.get("Type_Sol")){
          this.overlayMessage = currentFeature.get("Type_Sol")
        }
      } else {
        this.showOverlay = false
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

    /**
     * Once the map has been mounted compute the first features extent 
     */
    onMapMounted() {
      this.setExtent()
    },

    
  findPointOnSurface(feature) {
      const point = feature
      return point.geometry.coordinates
    },

    displayError: function(message) {
      this.notifierMessage = message;
      this.notifierColor = "error";
      this.timeout = 8000;
      this.notifier = true;
    },
   
styleFeatures() {
      if(this.$refs.map.$map != null 
            && this.$refs.map.$map.getLayers() != null) {
      let vectorLayer = null
      this.$refs.map.$map.getLayers().forEach(layer => {
        if (layer.get("id") == "features-panel") {
          vectorLayer = layer
        }
      });
      if(vectorLayer != null && vectorLayer.getSource() != null) {
        //vectorLayer.setOpacity(this.opacity)
        let source = vectorLayer.getSource()
        source.forEachFeature(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: '#0e97fa',
              width: 1,
            }),
            fill: new Fill({
              color: 'rgba(0, 153, 255, 0.2)',
            }),
            image: new Circle({
              radius: 4,
              fill: new Fill({
              color: [0, 153, 255, 1],
                          }),
              
            }),
            
          }))
        })
      }
      }
    },

    /*styleFeatures() {
      if(this.$refs.map.$map != null 
            && this.$refs.map.$map.getLayers() != null) {
      let vectorLayer = null
      this.$refs.map.$map.getLayers().forEach(layer => {
        if (layer.get("id") == "features-panel") {
          vectorLayer = layer
        }
      });
      if(vectorLayer != null && vectorLayer.getSource() != null) {
        vectorLayer.setOpacity(this.opacity)
        let source = vectorLayer.getSource()
        source.forEachFeature(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: f.getProperties().stroke,
              width: 1,
            }),
            fill: new Fill({
              color: f.getProperties().fill,
            }),
          }))
        })
      }
      }
    },*/
    

    /*styleFeatures() {
      this.features.getSource().getFeatures().map(feature => {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    feature.setStyle(new Style({
        fill: new Fill({
           color: `rgba(${r}, ${g}, ${b}, .7)`
        }),
        stroke: new Stroke({
           color: `rgb(${r}, ${g}, ${b})`
        })
    }))
});
    },*/

    
  }
};
</script>

<style scoped>
.theme--light.v-icon {
  color: var(--primaryColor);
}
.theme--light.v-btn {
  color: var(--primaryColor);
}
</style>
