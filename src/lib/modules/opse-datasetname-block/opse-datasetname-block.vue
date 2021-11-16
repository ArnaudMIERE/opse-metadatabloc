<i18n  >
{
  "en": {
    "opseDatasetName": "Dataset name",
    "en": "English",
    "fr": "French"
    
  },
  "fr": {
    "opseDatasetName": "Nom du jeu de données",
    "en": "Anglais",
    "fr": "Français"
    
  }
}
</i18n>
<template>
  <aeris-metadata-layout
    v-if="isVisible"
    :title="$t('opseDatasetName')"
    :theme="theme"
    :canDisplayEditIcon="canShowEditIcon"
    :displayInFlat="true"
    icon="mdi-file"
    @edit="displayEditionForm()"
  >
  <div v-if="metadata.resourceDatasetName" v-html="getResourceDatasetName"></div>
  <aeris-metadata-dialog-layout
    v-if="canDisplayEditionForm"
    max-width="800px"
    :is-displaying-dialog="isDisplayingDialogEditionForm"
    :disable-save-button="!isFormValid"
    :title="$t('opseDatasetName')"
    @cancel="hideForm()"
    @save-modifications="saveModifications()"
  >
  <template v-slot:dialog-contents>
        <v-form ref="form" v-model="isFormValid">
          <v-tabs>
            <v-tab
              v-for="(language, index) in Object.keys(metadata.resourceDatasetName)"
              :key="index"
            >{{ $t(language) }}</v-tab>
            <v-tab-item
              v-for="(language, index) in Object.keys(metadata.resourceDatasetName)"
              :key="index"
            >
              <v-textarea
              class="pt-2"
                v-model="editedDescriptions[language]"
                outlined
                hide-details="auto"
                height="650px"
                :required="language === 'en'"
                :rules="language === 'en' ? textAreaRules : []"
                :label="language === 'en' ? 'mandatory' : 'optional'"
              ></v-textarea>
            </v-tab-item>
          </v-tabs>
        </v-form>
      </template>
  </aeris-metadata-dialog-layout>

  </aeris-metadata-layout>
</template>

<script>
import AerisMetadataLayout from "../aeris-metadata-ui/aeris-metadata-layout/aeris-metadata-layout.vue"
import AerisMetadataDialogLayout from "../aeris-metadata-ui/aeris-metadata-layout/aeris-metadata-dialog-layout.vue";
import { applyPrimaryAndSecondaryColors, formatEditedData, badPatchToRemoveParagraphTag } from "../../utils";
import cloneDeep from "lodash/cloneDeep";
import marked from "marked"
export default {
  name: 'opse-datasetname-block',

  components: {
    AerisMetadataLayout,
    AerisMetadataDialogLayout
  },

  data() {
    return {
      isDisplayingDialogEditionForm: false,
      editedDescriptions:null,
      isFormValid: true,
      dialog:false,
      textAreaRules: [v => !!v || "Content is required"],

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

    markdown:{
      type: Boolean,
      default: true
    },

    isEditionAllowed:{
      type: Boolean,
      default: false
    }
    
  },

  computed: {
    applyTheme() {
      return applyPrimaryAndSecondaryColors(this.theme);
    },

    isVisible() {
      const isVisible = this.isEditionAllowed || !!this.getResourceDatasetNames;
      this.$emit("getVisibility", {
        name: this.$options.name,
        programmaticScrollingTitle: this.$t("opseDatasetName"),
        isVisible
      });
      return isVisible;
    },

   
    canShowEditIcon() {
      return this.isEditionAllowed && !this.isDisplayingDialogEditionForm;
    },
    canDisplayEditionForm() {
      return this.isEditionAllowed && this.isDisplayingDialogEditionForm;
    },

    metadataLanguage(){
      if (this.metadata){
        if (this.metadata.language){
          return this.metadata.language
        }
      }
      return this.language
    },

   
    getResourceDatasetName(){
      let aux = this.getResourceDatasetNames;
      let result = aux[this.language];
      if ((!result) || (result.trim().length ==0)){
        return aux[this.metadataLanguage]
      }
      return result;
    },
    
    getResourceDatasetNames() {
      const resourceDatasetName = cloneDeep(this.metadata.resourceDatasetName);
      if (resourceDatasetName) {
        if (this.markdown) {
          for (let item in resourceDatasetName) {
            if (resourceDatasetName.hasOwnProperty(item)) {
              resourceDatasetName[item] = marked(
                this.addSpaces(resourceDatasetName[item])
              );
            }
          }
        }
      }
      return resourceDatasetName;
    }
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
    
    addSpaces(value) {
      let aux = value.replace(/#/g, "# ");
      aux = aux.replace(/# #/g, "##");
      aux = aux.replace(/# #/g, "##");
      return aux;
    },
  

  displayEditionForm() {
      if (!this.metadata.resourceDatasetName) {
        this.$set(this.metadata, "resourceDatasetName", {en: "", fr: ""})
      }
      this.editedDescriptions = cloneDeep(this.metadata.resourceDatasetName);
      badPatchToRemoveParagraphTag(this.editedDescriptions);
      this.isDisplayingDialogEditionForm = true;
    },

  saveModifications() {
      if (this.$refs.form.validate()) {
        Object.keys(this.editedDescriptions).forEach(key => {
          this.metadata.resourceDatasetName[key] = this.editedDescriptions[key];
        });
        const formatedEditedData = formatEditedData(
          "resourceDatasetName",
          this.metadata.resourceDatasetName
        );
        this.$emit("sendEditedData", formatedEditedData);
        this.hideForm();
      }
    },

    hideForm() {
      this.editedDescriptions = null;
      this.isDisplayingDialogEditionForm = false;
    }
  
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
