<template>
    <section>
        <opse-parameter-treeview-block :metadata="metadata1" :theme="theme" language="en"></opse-parameter-treeview-block>
    </section>
</template>

<script>
import OpseParameterTreeviewBlock from "@/lib/modules/opse-parameter-treeview-block/opse-parameter-treeview-block.vue";
export default {
    name: "opse-parameter-treeview-block-test",

    components: {OpseParameterTreeviewBlock},

    data(){
        return{
        metadata1: {
        id: "9815b225-e87b-45f5-b478-bec110717a1b",
        links:[
          {"type":"OPENSEARCH_LINK","url":"https://api.sedoo.fr/","name":"","description":{"en":"Opensearch data access","fr":""}},
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