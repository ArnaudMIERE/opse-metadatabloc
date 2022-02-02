<template>
  <section>
    <opse-year-based-download-block
      :metadata="metadata1"
      :theme="theme"
    ></opse-year-based-download-block>
  </section>
</template>

<script>
import opseYearBasedDownloadBlock from "@/lib/modules/opse-year-based-download-block/opse-year-based-download-block.vue";
export default {
  name: "opse-year-based-download-test",

  components: { opseYearBasedDownloadBlock },

  data() {
    return {
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
        parameterSet: [
          {
            thesaurusCode: "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
            shortName: "NEE_micmolm2s_20m",
            longName: "Net Ecosystem Exchange (µmol m-2 s-1), at 20m",
            uom: "degré celcius",
            comment: {
              en: null,
              fr: null,
            },
            type: "",
            cfStandardName: "",
            label: "Land Surface.Soils.Soil Temperature.null",
          },
          {
            thesaurusCode: "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
            shortName: "LE_Wm2__20m",
            longName: "Latent heat flux (W m-2), at 20m",
            uom: "degré celcius",
            comment: {
              en: null,
              fr: null,
            },
            type: "",
            cfStandardName: "",
            label: "Land Surface.Soils.Soil Temperature.null",
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