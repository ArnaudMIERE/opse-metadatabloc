<i18n>
  {
    "en": {
      "metadataTab": "Dataset",
      "downloadTab": "Download",
      "interoperabilityTab": "Interoperability",
      "visualisationTab": "Visualisation",
      "statisticsTab": "Statistics",
      "error-service-template-metadata": "Problem retrieving metadata's template",
      "no-title": "This metadata sheet has no title yet",
      "deleteModalAsk": "Are you sure you want to delete this metadata",
      "sheetHasBeenDeleted": "Metadata was successfully deleted",
      "sheetWasntDeleted": "A problem occurred when deleting metadata",
      "delete": "Delete",
      "cancel": "Cancel"
    },

    "fr": {
      "metadataTab": "Métadonnées",
      "downloadTab": "Téléchargement",
      "interoperabilityTab": "Interopérabilité",
      "visualisationTab": "Visualisation",
      "statisticsTab": "Statistiques",
      "error-service-template-metadata": "Problème lors de la récupération du template des metadonnées",
      "no-title": "Cette fiche de métadonnées n'a pas encore de titre",
      "deleteModalAsk": "Êtes-vous sûr de vouloir effacer cette fiche",
      "sheetHasBeenDeleted": "La fiche a bien été effacée",
      "sheetWasntDeleted": "Un problème est survenu lors de la suppression de la fiche",
      "delete": "Effacer",
      "cancel": "Annuler"
    }
  }
</i18n>

<template>
  <v-app>
    <unidoo-alert/>
    <div class="aeris-landing-page-main-container">
      <!-- **************************       HEADER         ************************** -->
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10">
            <component
              v-if="getTitleComponent.name"
              :is="getTitleComponent"
              class="aeris-title-border-right"
              :resource-title="getSheetTitle"
              :language="language"
              :metadata="metadata"
              :theme="theme"
              :is-edition-allowed="false"
            ></component>
          </v-col>
          <v-col cols="6" lg="2">
            <!-- Component's position is absolute when resolution <= 1265px. See component's style -->
            <aeris-catalogue-authentication-button v-if="isAuthenticationEnabled"></aeris-catalogue-authentication-button>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-chip
      v-for="project in summary.projectList"
      :key="project.projectName"
      :href="projectLandingPage(project.aerisProjectUuid)"
      class="ml-4 white--text"
      target="_blank"
      :color="theme.emphasis"
      >{{ project.projectName }}</v-chip>-->
      <!-- **************************       TABS         ************************** -->
      <v-row v-if="isLoadingTemplate" justify="center" align="center">
        <div class="text-center">
          <v-progress-circular indeterminate size="60" color="grey"></v-progress-circular>
        </div>
      </v-row>
      <div
        v-else-if="template === null"
        class="red--text"
      >{{ $t("error-service-template-metadata") }}</div>
      <div v-else>
        <v-tabs v-model="tabSelected">
          <v-tab v-for="(tab, index) in getTemplateTabsToDisplay" :key="index">{{ $t(tab) }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabSelected">
          <v-tab-item v-for="(tab, index) in getTemplateTabsToDisplay" :key="index">
            <md-tab-generic
              :metadata="metadata"
              :metadata-service="metadataService"
              :theme="theme"
              :language="language"
              :is-editing-sheet="false"
              :custom-off-set="customOffSet"
              :components-to-display="getComponentsForThisTab(tab)"
              :block-name-to-focus="tabNameWhereIsBlockToFocus ? blockNameToFocus : ''"
            ></md-tab-generic>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-app>
</template>

<script>
import landingPageStore from "aeris-catalogue-components/src/lib/modules/aeris-catalog-layouts/aeris-catalogue-landing-page/store/aeris-catalogue-landing-page-store";
import MdTabGeneric from "aeris-catalogue-components/src/lib/modules/aeris-catalog-layouts/aeris-catalogue-landing-page/components/tabs/md-tab-generic";
import AerisCatalogueAuthenticationButton from "aeris-catalogue-components/src/lib/modules/aeris-catalog-buttons/aeris-catalogue-authentication-button/components/aeris-catalogue-authentication-button";

import axios from "axios";

export default {
  name: "aeris-metadata-landing-page",

  components: {
    MdTabGeneric,
    AerisCatalogueAuthenticationButton,
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
          primaryColor: "#f39c12",
          secondaryColor: "#f39c12",
        };
      },
    },
    metadataService: {
      type: String,
      default: "",
    },
    customOffSet: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      isLoadingTemplate: false,
      template: null,
      backupMetadata: null,
      metadata: null,
      tabSelected: null,
      uuid: "",
      fragment: null,
      blockNameToFocus: "",
      tabNameWhereIsBlockToFocus: "",
    };
  },

  computed: {
    getSheetTitle() {
      return this.metadata.resourceTitle
        ? this.metadata.resourceTitle
        : { [this.language]: this.$t("no-title") };
    },
    getTitleComponent() {
      return this.$store.getters.getTitleComponent;
    },
    getTemplateTabsToDisplay() {
      return Object.keys(this.template).filter((tab) => {
        if (this.template[tab] !== null && this.template[tab].length > 0) {
          return tab;
        }
      });
    },
    isAuthenticationEnabled() {
      return this.$store.getters.isAuthenticationEnabled;
    },
    getIsEditingSheet() {
      return this.$store.getters.getIsUserEditingSheet;
    },
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
  },

  created() {
    this.$i18n.locale = this.language;
    this.$store.registerModule("landingPageStore", landingPageStore);
  },

  mounted() {
    this.getArgsFromUrl();
    if (!this.uuid) {
      console.error("Cannot call metadata service without uuid");
    } else {
      // Call metadata service first, then call template service
      this.isLoadingTemplate = true;
      this.getMetadata()
        .then(() => {
          this.getTemplate();
        })
        .finally(() => {
          this.isLoadingTemplate = false;
        });
    }
  },

  methods: {
    getArgsFromUrl() {
      let url = window.location.href
      let args = null
      if(url.includes('#')) {
        let splittedUrl = url.split("#")
        args = splittedUrl[0].split("?")[1].split("&");
      } else {
        args = url.split("?")[1].split("&");
      }
      console.log("args", args)
      let uuid = "";
      let blockNameToFocus = "";
      args.forEach((arg) => {
        // const [argName, argValue] = arg.split("=");
        const argName = arg.split("=")[0]
        const argValue = arg.split("=")[1]
        if (argName === "uuid") {
          uuid = argValue;
        } else if (argName === "block") {
          blockNameToFocus = argValue;
        }
      });
      if (!uuid) {
        console.error(
          "Problem when trying to get uuid from url, result: ",
          uuid
        );
      } else {
        this.uuid = uuid;
      }
      this.blockNameToFocus = blockNameToFocus;
    },
    getMetadata() {
      const promise = new Promise((resolve, reject) => {
        const url = this.generateServiceUrlWithUuid();
        axios
          .get(url)
          .then((response) => {
            this.metadata = response.data;
            resolve();
          })
          .catch((error) => {
            console.error(
              `Problem when trying to get metadata with uuid ${this.uuid} `,
              error
            );
            reject(error);
          });
      });
      return promise;
    },
    generateServiceUrlWithUuid() {
      return this.metadataService.endsWith("/")
        ? this.metadataService + this.uuid
        : this.metadataService + "/" + this.uuid;
    },
    getTemplate() {
      this.metadata.clientTemplateName !== ""
        ? this.checkServiceWithNameToGetTemplateAndFocusTab(
            this.metadata.clientTemplateName
          )
        : this.checkServiceWithNameToGetTemplateAndFocusTab("default");
    },
    checkServiceWithNameToGetTemplateAndFocusTab(templateName) {
      axios
        .get(
          `https://services.sedoo.fr/metadatatemplate/template/v2/byname/${templateName}`
        )
        .then((response) => {
          this.template =
            response.data.templates["landing-page"] !== undefined
              ? response.data.templates["landing-page"]
              : response.data.templates[templateName] !== undefined
              ? response.data.templates[templateName]
              : response.data.templates.default;
          // TODO - PATCH TO IMPROVE: Remove title from metadataTab
          this.template.metadataTab = this.template.metadataTab.filter(
            (component) => {
              if (this.isATitleComponent(component.name)) {
                this.$store.dispatch("importTitleComponent", component.name);
              } else {
                return component.name;
              }
            }
          );
          // Determinate tab name where block to focus is
          if (this.blockNameToFocus) {
            this.focusTab();
          }
        })
        .catch((error) => {
          console.error("Problem when calling templates-API: ", error);
        });
    },
    focusTab() {
      this.findTabNameWhereIsBlockToFocus();
      if (this.tabNameWhereIsBlockToFocus) {
        const index = Object.keys(this.template).indexOf(
          this.tabNameWhereIsBlockToFocus
        );
        this.tabSelected = index ? index : 0;
      }
    },
    findTabNameWhereIsBlockToFocus() {
      // If we find the block in a tab in the template, we return the tab's name
      this.tabNameWhereIsBlockToFocus = Object.keys(this.template).find(
        (key) => {
          if (this.template[key]) {
            return this.template[key].some(
              (component) => component.name === this.blockNameToFocus
            );
          }
        }
      );
    },
    projectLandingPage(projectId) {
      return "https://www.aeris-data.fr/project/" + projectId;
    },
    isATitleComponent(componentName) {
      return componentName.search("-title") !== -1;
    },
    /**
     * We search in template[tabName] components with context === "landing-page"
     */
    getComponentsForThisTab(tabName) {
      if (tabName) {
        return this.template[tabName].filter((component) => {
          // No context specified, component must be displayed
          if (component.props.context === undefined) {
            return true;
            // Context is landing-page, component must be displayed
          } else if (component.props.context === "landing-page") {
            return true;
          } else {
            return false;
          }
        });
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1265px) {
  .aeris-landing-page-main-container {
    margin-left: 20%;
    margin-right: 20%;
  }
}
</style>
