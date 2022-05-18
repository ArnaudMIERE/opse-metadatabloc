<i18n>
  {
    "en": {
      "loading": "Loading"
    },

    "fr": {
      "loading": "Chargement"
    }
  }
</i18n>

<template>
  <div class="pa-2">
    <div v-if="loading">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
      {{$t('loading')}}
    </div>
    <div>
     <div id="mapMask" class="map-mask" />
    <div ref="map" class="map" tabindex="0" />
    <div id="mapCoordinates" class="map-coordinates" />
    <div id="tooltip" class="tooltip"></div>
    </div>
  </div>
</template>

<script>

//import axios from "axios";
// !IMPORTANT! You must keep OpenLayer (ol module) in version 5.3.0 from package.json
// Work with fontawesome, use it in index.html from "https://use.fontawesome.com/releases/v5.0.7/css/all.css"
import Feature from "ol/Feature.js";
import { defaults as defaultInteractions } from "ol/interaction.js";
import Point from "ol/geom/Point.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import OSM from "ol/source/OSM";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import { transform } from "ol/proj";
import { isEmpty } from "ol/extent.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { Cluster, Vector as VectorSource } from "ol/source.js";
import { Circle as CircleStyle, Fill, Stroke } from "ol/style.js";
import Overlay from "ol/Overlay";

export default {
  name: "aeris-metadata-site-map",

  components: {
  },

  props: {
    language: {
      type: String,
      default: "en",
    },
    
    service: {
      type: String,
      default: "",
    },

    catalogue: {
      type: String,
      default: ""
    }
    
  },

  data() {
    return {
       loading: false,
        center: [0, 0],
         tooltipElementRef: null,
      overlayTooltip: null,
        pointSource: null,
        pointStyle: null,
        pointLayer: null,
        map: null,
        layerArray: [],
        fontsize: 30,
        cluster: null,
         styleObject: {
        top: 0,
        left: 0,
        display: "none",
      },
        sites: [
          
        ]
    };
  },

  computed: {
    
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
  },

  mounted() {
    this.loadSites();
    //  this.createMap();
  },

  methods: {

    loadSites: function() {

      this.loading = true
      this.axios.get(this.service).then(
                  response => {
                    // console.log(response.data);
                    this.sites = response.data;
                    this.loading = false;
                    this.createMap();
                  },
                  () => {
                    this.loading = false
                  }
          );

    },

    onElementClick(evt) {
      // debugger
      const pixel = evt.pixel
      this.map.forEachFeatureAtPixel(pixel, (feature) => {
        // console.log(feature)
        if (feature.get("features")) {
          // It's a cluster
          // Select first feature
          let attributes = feature.get("features")[0].attributes;
          let name = attributes.name
          let url=this.catalogue+"?checkBoxCriteria=%7B%22jsonAttributes%22%3A%5B%7B%22key%22%3A%22sites.shortName%22%2C%22values%22%3A%5B%22"+name+"%22%5D%7D%5D%7D"
          console.log("URL: "+url)
          debugger
          window.open(url,'_blank');
        }
      })
    },

    onElementHover(evt) {
      evt.map.getViewport().style.cursor = '';
      const pixel = evt.pixel;
      this.tooltipElementRef.style.display = "none";
       //this.getTargetElement().style.cursor = '';
      this.map.forEachFeatureAtPixel(pixel, (feature) => {
        // Get attributes property to fill overlay content.
        // To get attributes property, we must determinate if feature is point or area.
        // This distinction must be done because points are referenced inside a cluster in feature object
        // so access to 'attributes' is different'.
        let overlayContent = "";
        if (feature.attributes) {
          // It's an area
          overlayContent =
            feature.attributes.name || feature.attributes.description;
        } else if (feature.get("features")) {
          // It's a cluster
          // Select first feature
          const attributes = feature.get("features")[0].attributes;
          overlayContent = attributes.name || attributes.description;
        }
        if (overlayContent) {
          evt.map.getViewport().style.cursor = 'pointer';
          this.tooltipElementRef.style.display = "";
          // TODO: improve with adding a node text, potential breach with innerHtml
          this.tooltipElementRef.innerHTML = "Site: "+overlayContent;
          // Set overlay offset to center element
          this.overlayTooltip.set("offset", [
            -this.tooltipElementRef.offsetWidth / 2,
            0,
          ]);
          this.overlayTooltip.setPosition(evt.coordinate);
        }
      });
    },
    
  initSources() {
    this.pointSource = new VectorSource({ wrapX: false });
  },

  createMap() {
    // debugger
    this.initSources();
    this.styleInit();

    // Here, add geometries to sources
    this.sites.forEach((element, index) => {
          this.addPointFeature(element, index);
    });

    this.layerInit();
    this.map = this.configureNewMap();
    if (this.getSourceExtent()) {
          this.map.getView().fit(this.getSourceExtent().getExtent(), {
            size: this.map.getSize(),
          });
        }
     this.initTooltip();
        this.map.on("pointermove", this.onElementHover);
        this.map.on("click", this.onElementClick)
  },

   initTooltip() {
      this.tooltipElementRef = document.getElementById("tooltip");
      this.overlayTooltip = new Overlay({
        element: this.tooltipElementRef,
        offset: [-20, 0],
        positioning: "bottom-left",
      });
      this.map.addOverlay(this.overlayTooltip);
    },

    getSourceExtent() {
      if (!isEmpty(this.pointSource.getExtent())) {
        return this.pointSource;
      }
    },

  addPointFeature(element, index) {
     if (element.longitude && element.latitude && element.shortName) {
      this.pointSource.addFeature(this.createPointFeature(element, index));
     } 
    },

  fillFeatureAttributesProperty(feature, data) {
      feature.attributes = {
        name: data.name,
        description: data.description,
      };
    },

  createPointFeature(element, index) {
      let feature = new Feature({
        geometry: new Point(
          transform(
            [element.longitude, element.latitude],
            element.hasOwnProperty("projection")
              ? element.projection.split(" ").join(":")
              : "EPSG:4326",
            "EPSG:3857"
          )
        ),
      });
      this.fillFeatureAttributesProperty(feature, {
        name: element.shortName,
        description: element.description,
      });
      feature.setId(this.computeFeatureId("SITE", index));
      return feature;
    },

  computeFeatureId(extent, id) {
      return (
        "Feature_" +
        Math.random().toString(36).substring(7) +
        "_" +
        extent +
        "_" +
        id
      );
    },

  configureNewMap() {
      return new Map({
        layers: this.layerArray,
        target: this.$refs.map,
        view: new View({
          center: this.center,
          minZoom: 1,
          maxZoom: 15,
        }),
        interactions: defaultInteractions({ mouseWheelZoom: false }),
      });
    },

  styleInit() {
      //style point
      this.pointStyle = new Style({
        text: new Text({
          text: "\uf3c5",
          font: `600 ${this.fontsize}px "Font Awesome 5 Free"`,

          offsetY: -(this.fontsize / 2) + 1,
          fill: new Fill({
            color: "#E04006",
          }),
          stroke: new Stroke({
            color: "rgba(255, 255, 255, 1)",
            width: 1,
          }),
        }),
      });
    },

     layerInit() {
      this.layerArray = [];
      this.cluster = new Cluster({
        wrapX: false,
        distance: 50,
        source: this.pointSource,
        minResolution: 2000,
        maxResolution: 2000,
      });
      this.pointLayer = new VectorLayer({
        source: this.cluster,
        style: this.styleFunction,
      });

      this.raster = new TileLayer({
        source: new OSM({
          opaque: false,
        }),
        style: new Style({}),
      });
      this.layerArray.push(this.raster, this.pointLayer);
    },

    calculateClusterInfo() {
      let features = this.pointLayer.getSource().getFeatures();
      let feature, radius;
      for (let i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        radius = 14;
        feature.set("radius", radius);
      }
    },

     styleFunction(feature, resolution) {
      if (resolution != this.currentResolution) {
        this.calculateClusterInfo(resolution);
        this.currentResolution = resolution;
      } else {
        this.calculateClusterInfo(resolution);
      }

      let size = feature.get("features").length;
      if (size > 1) {
        var style = new Style({
          image: new CircleStyle({
            radius: feature.get("radius"),
            fill: new Fill({
              color: "#E04006",
            }),
            stroke: new Stroke({
              color: "rgba(255, 255, 255, 1)",
              width: 0.5,
            }),
          }),
          text: new Text({
            text: size.toString(),
            font: "700 10px Arial",
            fill: new Fill({
              color: "#fff",
            }),
            stroke: new Stroke({
              color: "rgba(128, 128, 128)",
              width: 1,
            }),
          }),
        });
      } else {
        style = this.pointStyle;
      }
      return style;
    },
    
    
    
    
  },
};
</script>
<style scoped>
.tooltip {
  position: relative;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  white-space: nowrap;
  font: 10pt sans-serif;
}
</style>

