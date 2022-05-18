<template>
    <section>
        <opse-galery-images-displayed-block :metadata="metadata1" :theme="theme"></opse-galery-images-displayed-block>
    </section>
</template>

<script>
import opseGaleryImagesDisplayedBlock from "@/lib/modules/opse-galery-images-displayed-block/opse-galery-images-displayed-block.vue"
export default {
    name: "opse-galery-images-displayed-block-test",

    components: {opseGaleryImagesDisplayedBlock},

    data() {
    return {
      metadata1: {
        id: "3d768089-1b12-426e-955f-f276c05f6623",
        links:[
          {"type":"OPENSEARCH_LINK","url":"http://localhost:8604/","name":"","description":{"en":"Opensearch data access","fr":""}},
          ]
        
        },
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA"
      }
    }
  }
    
}
</script>