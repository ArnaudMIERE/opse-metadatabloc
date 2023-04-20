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
        id: "389bbea0-7279-12c1-63d0-cfc4a77ded87",
       links:[
          {type:"OPENSEARCH_LINK",
           url:"http://localhost:8604/",
           name:"",
           description:{en:"Visualisation of land use data, Houay Pano, Laos"}
          }
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