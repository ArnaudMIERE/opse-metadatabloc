<template>
    <section>
        <opse-thumbnails-displayed-block :metadata="metadata1" :theme="theme"></opse-thumbnails-displayed-block>
    </section>
</template>

<script>
import opseThumbnailsDisplayedBlock from "@/lib/modules/opse-thumbnails-displayed-block/opse-thumbnails-displayed-block.vue"
export default {
    name: "opse-thumbnails-displayed-block-test",

    components: {opseThumbnailsDisplayedBlock},

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