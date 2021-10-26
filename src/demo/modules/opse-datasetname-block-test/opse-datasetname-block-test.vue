<template>
    <section>
        <opse-datasetname-block :metadata="metadata1" :theme="theme" language="en"></opse-datasetname-block>
    </section>
</template>

<script>
import opseDatasetnameBlock from "@/lib/modules/opse-datasetname-block/opse-datasetname-block.vue"
export default {
    name: "opse-datasetname-block-test",

    components: {opseDatasetnameBlock},

    data() {
    return {
      metadata1: {
        links:[
          {type:"HTTP_DOWNLOAD_LINK",
           url:"https://services.sedoo.fr/",
           name:"",
           description:{en:"Dataset name"}
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