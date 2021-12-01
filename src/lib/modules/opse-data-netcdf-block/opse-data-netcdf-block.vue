<i18n  >
{
  "en": {
       "opseDataList":"Files List",
       "opseConvert": "Convert NetCDF",
       "opseDelete": "Delete",
       "opseConfirmation": "Confirmation",
       "opseConfirmationDelete": "Do you confirm this deletion ?",
       "opseConfirmationDeleteAll": "Do you confirm deletion of all files ?",
       "opseConfirm": "Confirm",
       "opseCancel": "Cancel",
       "opseSelectFile": "Select files",
       "opseListFile": "List of files",
       "opseUpload": "Upload"
  },
  "fr": {
      "opseDataList": "Liste de fichiers",
      "opseConvert": "Convertir NetCDF",
      "opseDelete": "Supprimer",
      "opseConfirmation": "Confirmation",
      "opseConfirmationDelete": "Confirmez-vous cette suppression ?",
      "opseConfirmationDeleteAll":"Confirmez-vous la suppression de tous les fichiers ?",
      "opseConfirm": "Confirmer",
      "opseCancel": "Annuler",
      "opseSelectFile": "Sélectionnez des fichiers",
      "opseListFile": "Liste de fichiers",
      "opseUpload": "Upload"
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
          <v-btn small outlined color="success"   @click="confirmeDelete()">{{$t('opseConfirm')}}</v-btn>
          <v-btn small outlined color="error"   @click="deletionDialog = false">{{$t('opseCancel')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deletionDialogAll" persistent max-width="290">
      <v-card>
        <v-card-title class="d-flex justify-space-between blue-grey lighten-5"> <span class="headline">{{ $t('opseConfirmation') }}</span>
        <v-btn fab text @click="deletionDialogAll = false" > <v-icon>mdi-close</v-icon> </v-btn></v-card-title>
        <v-card-text>{{ $t('opseConfirmationDeleteAll') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outlined color="success"   @click="deleteAll()">{{$t('opseConfirm')}}</v-btn>
          <v-btn small outlined color="error"   @click="deletionDialogAll = false">{{$t('opseCancel')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card max-width="600">
      <v-card-title><v-icon large left style="color:#F39C12">mdi-hand-pointing-right</v-icon>{{$t('opseSelectFile')}}</v-card-title>
      <v-file-input  show-size outlined counter multiple prepend-icon="mdi-upload"  label="File input" :value="datasetFileInput" v-model="files">
        <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="warning"
      >
        {{ text }}
      </v-chip>
    </template>
      </v-file-input>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="success"  @click="upload()"><v-icon dark left title="Upload">mdi-folder-upload</v-icon>{{$t('opseUpload')}}</v-btn>
      </v-card-actions>
    </v-card>
    <br/>
<v-snackbar v-model="notifier" top :color="notifierColor" :timeout="timeout"  >
      {{ notifierMessage }}
      <v-btn text @click="notifier = false" > <v-icon>mdi-close</v-icon> </v-btn>
</v-snackbar>

    <v-card v-if="isVisible" :style="applyTheme" max-width="600">
    <v-card-title>
        <v-icon large left style="color:#F39C12">mdi-file</v-icon>{{$t('opseListFile')}}
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
    <v-card-actions>
          <v-spacer></v-spacer>
     <v-btn color="error" dark @click="deletionDialogAll=true"> <v-icon dark left title="Delete all" @click="deletionDialogAll=true">  mdi-trash-can </v-icon>{{$t('opseDelete')}}</v-btn>
    </v-card-actions>
  </v-card>
  </v-app>
  
</template>


<script>
import { applyPrimaryAndSecondaryColors } from "../../utils";
export default {
    name: "opse-data-netcdf-block",
    data() {
        return{
        files: [],
        datasetFile: null,
        datasetFileInput: "",
        search: '',
        dataFile:[],
        fileName:'',
        deletionDialog:false,
        deletionDialogAll: false,
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

    disableConfirmUpload() {
      if (this.files){
        console.log("this.files ",this.files)
        return true;
      }
      return false;
      
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

    deleteAll(){
      console.log(this.url + "delete")
      this.axios({
        method: "delete",
        url: this.url + "deleteAll?collection="+this.metadata.id,
      }).then(response => {
        if (response)
          this.displaySuccess("Files deleted")
          this.loadData();
          this.deletionDialogAll=false
      }).catch((error) => {
        this.displayError("An error has occured:" + error)
        console.log(error)
        
        })
      .finally(() => {
          this.loading = false
      });

    },

      
    upload(){
      if (this.files){
        this.datasetFile = new FormData();
        for (var i=0; i<this.files.length; i++){
          this.datasetFile.append("file", this.files[i])
        }
      
    
      this.axios({
        method: "post",
        url: this.url + "upload?collection="+this.metadata.id,
        data:this.datasetFile,
        headers: {'Content-Type': 'multipart/form-data' }
      }).then(response => {
        if (response)
          this.displaySuccess("File uploaded")
          this.loadData();
          this.datasetFileInput = "";
          
      }) 
      
      .catch((error) => {
        this.displayError("An error has occured:" + error)
        console.log(error)
        
        })
      .finally(() => {
          this.loading = false
      });
    }
    },
    

    displayError(message){
        this.notifierMessage = message
        this.notifierColor = 'error'
          this.timeout=2000
          this.notifier = true
    },

    displaySuccess(message){
        this.notifierMessage = message
        this.notifierColor = 'success'
        this.timeout=2000
        this.notifier = true
    }

  }
}
</script>
