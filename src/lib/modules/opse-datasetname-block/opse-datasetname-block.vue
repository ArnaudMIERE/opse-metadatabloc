<i18n  >
{
  "en": {
    "opseDatasetName": "Dataset name"
    
  },
  "fr": {
    "opseDatasetName": "Nom du jeu de données"
    
  }
}
</i18n>
<template>
<div>
<v-dialog max-width="500px" v-model="dialog"> 
  <v-card >
    <v-card-title class="justify-space-between blue-grey lighten-5"><span >{{ $t('opseDatasetName') }}</span><v-btn icon  @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
      <v-tabs >
        <v-tab>English</v-tab>
        <v-tab>French</v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-textarea outlined label="Mandatory" value="no description yet" v-model="en" ></v-textarea>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-textarea outlined label="Optional" v-model="fr" ></v-textarea>
            </v-card-text>
          </v-card>
        </v-tab-item>       
      </v-tabs>


  <v-card-actions>
    <v-spacer></v-spacer>
      <v-btn text color="error"   @click="dialog=false">Cancel</v-btn>
      <v-btn text color="success" @click="save()">ok</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>

  <v-card v-if="isVisible" :style="applyTheme" :flat="true">
    <v-card-title>
      <v-icon large left >mdi-file</v-icon>
      <span>{{ $t('opseDatasetName') }}</span><v-btn  icon @click="editDisplay()"><v-icon color="rgba(0,0,0,.54)" title="Edit">mdi-pencil</v-icon></v-btn>
    </v-card-title>
    <v-card-text>{{datasetName.en}}</v-card-text>
  </v-card>
  </div>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
  name: 'opse-datasetname-block',

  data() {
    return {
      dialog:false,
      tab: "",
      content:"",
      items: [{tab:"English", content:""}, {tab:"French", content:""}],
      datasetName:{},
      en:"",
      fr:""

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
    service: null,
    downloadUrl: null,
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
        if(this.links != null && this.links.length > 0) {
            isVisible = true
        }
        this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("opseDatasetName"),
        isVisible
        });
        return isVisible;
    },

    links() {
        let links = []
        if(this.metadata && this.metadata.links && this.metadata.links.length > 0) {
            for(let i=0 ; i < this.metadata.links.length ; i++) {
                if(this.metadata.links[i].type == 'HTTP_DOWNLOAD_LINK') {
                    links.push(this.metadata.links[i])
                }
            }
        }
        return links
    },
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
   this.$i18n.locale = this.language;
  },

  

  methods: {
    editDisplay:function(){
      this.dialog=true;
    },
    save:function(){
      this.dialog=false;
      this.datasetName.en=this.en
    },
    /*save: function(){
      console.log("service ",this.url)
      
      this.axios({
        method:"post",
        url: "http://localhost:8604/Metadata/registrationRequest", 
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer '},
        data: this.datasetName
      }).then(response=>{
        if (response.data){
          this.datasetName.en = response.data.en
          
          this.displaySuccess("You have been successfully register")
          this.dialog=false;
        }
         
         
      }).catch(error=>{
        this.displayError("An error has occured:" + error)
      })
     
    },*/




    download(url){
      window.open(url)
    },
    getLabel:function(lang){
      if (lang=='French'){
        return "Optional";
      }else{
        return "Mandatory"
      }
    },

    downloadButtonTitle(link) {
      let title = this.$t("bvetDownload")
      if(link.description) {
        title = link.description[this.language]
      }
      return title
    },

  },

  

  
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--icon{
  color: rgba(0,0,0,.54);
}
.theme--light.v-icon {
    color: var(--primaryColor);
}
theme--light.v-btn {
  color: var(--primaryColor);
}

</style>
