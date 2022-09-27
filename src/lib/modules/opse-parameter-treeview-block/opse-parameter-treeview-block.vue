<i18n  >
{
  "en": {
    "opseParameter": "Parameters",
    "shortName" : "Short name : ",
    "longName": "Long name : ",
    "unitOfMeasure": "Unit of measure : ",
    "comments": "Comments : "
      
  },
  "fr": {
     "opseParameter": "Paramètres",
     "shortName" : "Nom court : ",
     "longName": "Nom long : ",
     "unitOfMeasure": "Unité de mesure : ",
     "comments": "Commentaires : "
  }
}
</i18n>

<template>
  <v-card v-if="isVisible && !isEditing" :style="applyTheme" :flat="true">
    <v-card-title>
    <v-icon large left style="color:#F39C12">mdi-thermometer</v-icon>
    <span>{{ $t('opseParameter') }}</span>
  </v-card-title>
  <v-card-text>
    <div>
      <v-treeview  hoverable dense expand-icon="mdi-chevron-down" :items="param">
        
      </v-treeview>
    </div>
    </v-card-text>
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
      param: [],
      
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

    visibleOnlyOnConsultation:{
      type:String,
      default: "",
    }
  },

  computed: {
    applyTheme() {
      return applyPrimaryAndSecondaryColors(this.theme);
    },

    isVisible() {
      let isVisible = false;
      if (this.links != null && this.links.length > 0 && this.visibleOnlyOnConsultation=== "true") {
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

    isEditing() { 
  return this.$store.getters.getIsUserEditingSheet;
}
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
    console.log("visibleOnlyOnConsultation ", this.visibleOnlyOnConsultation)
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
        var parent = this.getThesaurusLabel(data[i].thesaurusCode);
       //var parent = data[i].thesaurusCode;
        if (!newArrays[parent]) {
          indexs.push(parent);
          newArrays[parent] = {
            name: parent,
            children: [],
          };
        }

        let subItem = { name: data[i].longName, 
        children: [
            {name : this.$t('shortName') +data[i].shortName},
            {name : this.$t('longName') +data[i].longName},
            {name : this.$t('unitOfMeasure') +data[i].uom},
            {name : this.$t('comments') +(data[i].comment.en==null?"":data[i].comment.en)}
        ]
        };

        newArrays[parent].children.push(subItem);
      }
      var results = [];
      for (var j = 0; j < indexs.length; j++) {
          results.push(newArrays[indexs[j]]);
      }
      //console.log(results);
      return results;
    },

    getThesaurusLabel(keyword){
      var split = [];
      split = keyword.split(".")
      var value = []
      for (var i=0; i<split.length; i++){
        value.push(split[i].trim().toUpperCase() )
      }
      
      var result = []
      
     
      if (value[0] != "NULL" && value[1] == "NULL" && value[2] == "NULL" && value[3] == "NULL"){
        result.push(value[0])
      }
      if (value[0] != "NULL" && value[1] != "NULL" && value[2] == "NULL" && value[3] == "NULL"){
        result.push(value[1])
      }
      if (value[0] != "NULL" && value[1] != "NULL" && value[2] != "NULL" && value[3] == "NULL"){
        result.push(value[2])
      }
      if (value[0] != "NULL" && value[1] != "NULL" && value[2] != "NULL" && value[3] != "NULL"){
        result.push(value[3])
      }
      return result
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

<style scoped>
.large {
  font-size: 20px;
  font-weight: 700;
}
</style>
