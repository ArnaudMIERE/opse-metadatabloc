<i18n  >
{
  "en": {
       "opseDataList":"Files List",
       "opseConvert": "Convert NetCDF",
       "opseDelete": "Delete",
       "opseConfirmation": "Confirmation",
       "opseConfirmationDelete": "Do you confirm this deletion ?",
       "opseConfirm": "Confirm",
       "opseCancel": "Cancel"
  },
  "fr": {
      "opseDataList": "Liste de fichiers",
      "opseConvert": "Convertir NetCDF",
      "opseDelete": "Supprimer",
      "opseConfirmation": "Confirmation",
      "opseConfirmationDelete": "Confirmez-vous cette suppression ?",
      "opseConfirm": "Confirmer",
      "opseCancel": "Annuler"
  }
}
</i18n>

<template>

<v-app class="transparent">

  <v-dialog v-model="deletionDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="d-flex justify-space-between blue-grey lighten-5"> <span class="headline">{{ $t('opseConfirmation') }}</span>
        <v-btn fab text @click="deletionDialog = false" > <v-icon>mdi-close</v-icon> </v-btn></v-card-title>
        <v-card-text>{{ $t('opseConfirmationDelete') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outlined color="success"  flat @click="confirmeDelete()">{{$t('opseConfirm')}}</v-btn>
          <v-btn small outlined color="error"  flat @click="deletionDialog = false">{{$t('opseCancel')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<v-snackbar v-model="notifier" top :color="notifierColor" :timeout="timeout"  >
      {{ notifierMessage }}
      <v-btn text @click="notifier = false" > <v-icon>mdi-close</v-icon> </v-btn>
</v-snackbar>

    <v-card v-if="isVisible" :style="applyTheme" max-width="600">
    <v-card-title>
        <v-icon large left style="color:#F39C12">mdi-file</v-icon>Files
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
      class="elevation-1"
    >
    

    <template v-slot:item="{item}">
        <tr>
            <td class="dense text-xs-left">
                {{item.name}}
                <span></span>
            </td>
            <td>
                <v-btn small outlined color="success">{{ $t('opseConvert') }}</v-btn>

                <v-btn icon @click="confirmDeletion(item.name)"><v-icon color="error" title="Delete" >  mdi-trash-can </v-icon></v-btn>
            </td>
        </tr>
    </template>
    
    
    
    </v-data-table>
    <div class="text-center">
     <v-btn icon><v-icon color="error" title="Delete all" >  mdi-trash-can </v-icon></v-btn>
    </div>
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
        fileName:'',
        deletionDialog:false,
        headers: [
        { text: "Files", value: "name"},
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

      /*filerItems(){
          
      },*/

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

    confirmDeletion(file) {
    this.fileName = file,
    this.deletionDialog = true
  },

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
        this.dataFile = response.data
        
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

    confirmeDelete(){
      console.log(this.url + "delete?collection="+this.metadata.id+"&fileName="+this.fileName)
      this.axios({
        method: "delete",
        url: this.url + "delete?collection="+this.metadata.id+"&fileName="+this.fileName,
      }).then(response => {
        if (response)
          this.displaySuccess("File deleted")
          this.loadData();
          this.deletionDialog=false
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
        this.notifierColor = 'success'
        this.timeout=8000
        this.notifier = true
    }

  }
}
</script>
