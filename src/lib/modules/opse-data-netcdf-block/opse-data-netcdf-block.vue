<i18n  >
{
  "en": {
       "opseDataList":"Files List"
  },
  "fr": {
      "opseDataList": "Liste de fichiers"
  }
}
</i18n>

<template>
<v-app class="transparent">

<v-snackbar v-model="notifier" top :color="notifierColor" :timeout="timeout"  >
      {{ notifierMessage }}
      <v-btn dark   @click="notifier = false" > Close </v-btn>
</v-snackbar>

    <v-card v-if="isVisible" :style="applyTheme" >
    <v-card-title>
         Files
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataFile"
      :search="search"
    >
    <!--template v-slot:default="props">
        <tr v-for="file in props.items" :key="file" :value="dataFile">
            <td class="dense text-xs-left">
                {{file}}
            </td>
            
        </tr>
    </template-->

    <template v-slot:items="props">
        <tr>
            <td class="dense text-xs-left">
                {{props.item.name}} dcsdd
            </td>
        </tr>
    </template>
    
    
    
    </v-data-table>
  </v-card>
  </v-app>
</template>


<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
    name: "opse-data-netcdf-block",
    data() {
        return{
        search: '',
        dataFile:[],
        headers: [
        { text: "Files", value: "files" },
        { text: "Actions", value: "action", sortable: false }
        ],
        notifier: false,
        notifierMessage: '',
        notifierColor: 'success',
        timeout:2000

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
        programmaticScrollingTitle: this.$t("opseDataList"),
        isVisible
        });
        return isVisible;
    },

    links() {
        let links = []
        if(this.metadata && this.metadata.links && this.metadata.links.length > 0) {
            for(let i=0 ; i < this.metadata.links.length ; i++) {
                if(this.metadata.links[i].type == 'OPENSEARCH_LINK') {
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
    },
    metadata(){
        this.loadData();
    }
  },

  created() {
   this.$i18n.locale = this.language;
   this.loadData();
  },

  methods: {

      loadData() {
      let url = null
        if(this.metadata && this.metadata.links && this.metadata.links.length > 0) {
            for(let i=0 ; i < this.metadata.links.length ; i++) {
                if(this.metadata.links[i].type == 'OPENSEARCH_LINK') {
                    url = this.metadata.links[i].url
                    break
                }
            }
        }
        this.url = url;
        if (url == null) {
          return
        }

      this.loading = true
      this.axios({
        method: "get",
        url: this.url + "dataFiles?collection="+this.metadata.id,
      }).then(response => {
          if (response){
        this.dataFile = response.data;
        console.log("Liste de fichiers",response.data)
        
          }
      }).catch((error) => {
        this.displayError("An error has occured:" + error)
        console.log(error)
        
        })
      .finally(() => {
          this.loading = false
      });

    },

    displayError(message){
        this.notifierMessage = message
        this.notifierColor = 'error'
          this.timeout=8000
          this.notifier = true
    },

    displaySuccess(message){
        this.notifierMessage = message
        this.notifierColor = 'error'
        this.timeout=8000
        this.notifier = true
    }

  }
}
</script>
