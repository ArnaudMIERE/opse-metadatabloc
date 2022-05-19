<template>
  <section>
    <div style="width: 300px;"><opse-sig-visualisation-block :metadata="metadata1" :theme="theme" language="en"></opse-sig-visualisation-block></div>
  </section>
</template>

<script>
import opseSigVisualisationBlock from "@/lib/modules/opse-sig-visualisation-block/opse-sig-visualisation-block.vue";

export default {
  name: "opse-sig-visualisation-block-test",

  components: { opseSigVisualisationBlock },

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

