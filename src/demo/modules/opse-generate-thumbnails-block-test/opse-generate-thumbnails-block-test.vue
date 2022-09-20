<template>
    <section>
        <opse-generate-thumbnails-block :metadata="metadata1" :theme="theme" language="en"></opse-generate-thumbnails-block>
    </section>
</template>

<script>
import OpseGenerateThumbnailsBlock from "@/lib/modules/opse-generate-thumbnails-block/opse-generate-thumbnails-block.vue";
export default {
    name: "opse-generate-thumbnails-block-test",

    components: {OpseGenerateThumbnailsBlock},

    data(){
        return{
        metadata1: {
        id: "389bbea0-7279-12c1-63d0-cfc4a77ded87",
        links:[
          {"type":"OPENSEARCH_LINK","url":"http://localhost:8604/data/v1_0","name":"","description":{"en":"Opensearch data access","fr":""}},
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