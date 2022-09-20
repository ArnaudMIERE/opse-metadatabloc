<i18n  >
{
  "en": {
    "opseParameter": "Parameter"
      
  },
  "fr": {
     "opseParameter": "Paramètre" 
  }
}
</i18n>

<template>
  <v-card v-if="isVisible" :style="applyTheme" :flat="true">
    <div>
      <v-treeview :items="param"></v-treeview>
    </div>
  </v-card>
</template>


<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
  name: "opse-parameter-treeview-block",
  data() {
    return {
      dataFile: [],
      children: [],
      parent: [],
      id: "",
      param: [{
        name: 'Applications :',
        children: [
          { id: 2, name: 'Calendar : app' },
          { id: 3, name: 'Chrome : app' },
          { id: 4, name: 'Webstorm : app' },
        ],
      },],
      name: "name",
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
  },

  computed: {
    applyTheme() {
      return applyPrimaryAndSecondaryColors(this.theme);
    },

    isVisible() {
      let isVisible = false;
      if (this.links != null && this.links.length > 0) {
        isVisible = true;
      }
      this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("opseParameter"),
        isVisible,
      });
      return isVisible;
    },

    links() {
      let links = [];
      if (
        this.metadata &&
        this.metadata.links &&
        this.metadata.links.length > 0
      ) {
        for (let i = 0; i < this.metadata.links.length; i++) {
          if (this.metadata.links[i].type == "OPENSEARCH_LINK") {
            links.push(this.metadata.links[i]);
          }
        }
      }
      return links;
    },

    disableConfirmUpload() {
      if (this.files) {
        console.log("this.files ", this.files);
        return true;
      }
      return false;
    },
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    metadata() {
      this.loadData();
    },
  },

  created() {
    this.$i18n.locale = this.language;
    this.loadData();
  },

  methods: {
    loadData() {
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

      //this.loading = true;
      this.dataFile = this.metadata.parameterSet;
      this.param = this.getParam(this.dataFile);
      console.log("this.param, ", this.param);
      /*this.axios({
        url: this.url + "/opse-catalogue-prod/metadata/" + this.metadata.id,
      })
        .then((response) => {
          if (response) {
            this.dataFile = response.data.parameterSet;

            this.param = this.getParam(this.dataFile);
            console.log("this.param, ", this.param);
          }
        })
        .catch((error) => {
          this.displayError("An error has occured:" + error);
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });*/
    },

    getParam(data) {
      var newArrays = [];
      var indexs= [];
      for (var i = 0; i < data.length; i++) {
        var parent = data[i].thesaurusCode;
        if (!newArrays[parent]) {
          indexs.push(parent);
          newArrays[parent] = {
            name: parent,
            children: [],
          };
        }

        let subItem = { name: data[i].longName, 
        children: [
            {name : 'shortName : ' +data[i].shortName},
            {name : 'longName : ' +data[i].longName},
            {name : 'unit of measure : ' +data[i].uom},
            {name : 'comments en : ' +(data[i].comment.en==null?"":data[i].comment.en)}
        ]
        };

        newArrays[parent].children.push(subItem);
      }
      var results = [];
      for (var j = 0; j < indexs.length; j++) {
          results.push(newArrays[indexs[j]]);
      }
      console.log(results);
      return results;
    },

    displayError: function (message) {
      this.notifierMessage = message;
      this.notifierColor = "error";
      this.timeout = 8000;
      this.notifier = true;
    },
  },
};
</script>
