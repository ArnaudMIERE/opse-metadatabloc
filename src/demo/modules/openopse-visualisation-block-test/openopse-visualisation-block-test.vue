<template>
  <section>
    <div style="width: 300px;"><openopse-visualisation-block :metadata="metadata1" :theme="theme" language="en"></openopse-visualisation-block></div>
  </section>
</template>

<script>
import openopseVisualisationBlock from "@/lib/modules/openopse-visualisation-block/openopse-visualisation-block.vue";

export default {
  name: "openopse-visualisation-block-test",

  components: { openopseVisualisationBlock },

  data() {
    return {
      metadata1: {
        links:[
          {type:"QUICKLOOK_LINK",
           url:"http://localhost:8604/",
           name:"",
           description:{en:"Visualisation of land use data, Houay Pano, Laos"}
          }
          ],
          id: "389bbea0-7279-12c1-63d0-cfc4a77ded87"
          //id: "88427f26-220d-4e2f-b774-3aa6be8afaa6"
        },
      metadata2: {
      },
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#f39c12"
      }
    };
  }
};
</script>

<style scoped>
div {
  width: 700px;
  margin: auto;
}
</style>
