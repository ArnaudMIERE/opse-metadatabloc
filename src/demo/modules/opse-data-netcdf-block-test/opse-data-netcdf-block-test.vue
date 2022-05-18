<template>
    <section>
        <opse-data-netcdf-block :metadata="metadata1" :theme="theme" language="en"></opse-data-netcdf-block>
    </section>
</template>

<script>
import OpseDataNetcdfBlock from "@/lib/modules/opse-data-netcdf-block/opse-data-netcdf-block.vue";
export default {
    name: "opse-data-netcdf-block-test",

    components: {OpseDataNetcdfBlock},

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