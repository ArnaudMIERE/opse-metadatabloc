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
           url: "http://localhost:8604/data/download?collectionId=73bbe692-584b-11e3-0015-ce3f5508acd9",
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