<template>
    <section>
        <opse-year-based-download-block :metadata="metadata1" :theme="theme"></opse-year-based-download-block>
    </section>
</template>

<script>
import opseYearBasedDownloadBlock from "@/lib/modules/opse-year-based-download-block/opse-year-based-download-block.vue"
export default {
    name: "opse-year-based-download-test",

    components: {opseYearBasedDownloadBlock},

    data() {
    return {
      metadata1: {
        id: "389bbea0-7279-12c1-63d0-cfc4a77ded87",
        links:[
          {"type":"OPENSEARCH_LINK","url":"http://localhost:8604/data/","name":"","description":{"en":"Opensearch data access","fr":""}},
          ],
        
        },
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA"
      }
    };
  }
    
}
</script>