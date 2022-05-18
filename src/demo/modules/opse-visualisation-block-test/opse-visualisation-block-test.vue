<template>
  <section class="pa-5">
    <div>
      <v-radio-group v-model="selectedMetadata">
        <v-radio
          label="Air temperature, Banizoumbou, Niger"
          :value="1"
          name="selectedMetadata"
        >
        </v-radio>
        <v-radio
          label="Hydrological data, Nyong, Cameroon"
          :value="2"
          name="selectedMetadata"
        >
        </v-radio>
        <v-radio
          label="Trace gases, Banizoumbou, Niger (localhost)"
          :value="3"
          name="selectedMetadata"
        >
        </v-radio>
      </v-radio-group>
    </div>
    <opse-visualisation-block :metadata="metadata" :theme="theme" language="en">
    </opse-visualisation-block>
  </section>
</template>

<script>
import opseVisualisationBlock from "@/lib/modules/opse-visualisation-block/opse-visualisation-block.vue";
export default {
  name: "opse-visualisation-block-test",

  components: { opseVisualisationBlock },

  computed: {
    metadata() {
      if (this.selectedMetadata == 1) {
        return this.metadata1;
      }
      if (this.selectedMetadata == 2) {
        return this.metadata2;
      }
      if (this.selectedMetadata == 3) {
        return this.metadata3;
      }
      return null;
    },
  },

  data() {
    return {
      selectedMetadata: 1,
      metadata1: {
        id: "3d768089-1b12-426e-955f-f276c05f6622",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "http://localhost:8604/",
            name: "",
            description: { en: "Opensearch data access", fr: "" },
          },
        ],
      },

      metadata2: {
        id: "3d768089-1b12-426e-955f-f276c05f6622",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "http://localhost:8604/",
            name: "",
            description: { en: "Opensearch data access", fr: "" },
          },
        ],
      },
      metadata3: {
        id: "3d768089-1b12-426e-955f-f276c05f6622",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "http://localhost:8604/",
            name: "",
            description: { en: "Opensearch data access", fr: "" },
          },
        ],
      },
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA",
      },
    };
  },
};
</script>

<style scoped></style>