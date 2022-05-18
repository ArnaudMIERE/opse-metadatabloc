<template>
  <section>
    <opse-images-displayed-block
      :metadata="metadata1"
      :theme="theme"
    ></opse-images-displayed-block>
  </section>
</template>

<script>
import opseImagesDisplayedBlock from "@/lib/modules/opse-images-displayed-block/opse-images-displayed-block.vue";
export default {
  name: "opse-images-displayed-block-test",

  components: { opseImagesDisplayedBlock },

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
      },
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA",
      },
    };
  },
};
</script>