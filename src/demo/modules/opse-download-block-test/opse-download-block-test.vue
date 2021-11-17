<template>
    <section>
        <opse-download-block :metadata="metadata1" :theme="theme" language="en"></opse-download-block>
    </section>
</template>

<script>
import OpseDownloadBlock from "@/lib/modules/opse-download-block/opse-download-block.vue";
export default {
    name: "opse-download-block-test",

    components: {OpseDownloadBlock},

    data(){
        return{
        metadata1: {
        links:[
          {type:"HTTP_DOWNLOAD_LINK",
           //url:"https://services.sedoo.fr/opse/data/v1_0/download?collectionId=",
           url: "http://localhost:8604/data/download?collectionId=389bbea0-7279-12c1-63d0-cfc4a77ded87",
           name:"",
           description: null
          },
          ]
        },
        theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA"
      }
        };
    }
    
}
</script>