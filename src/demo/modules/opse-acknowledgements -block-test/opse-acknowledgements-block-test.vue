<template>
  <section>
    <opse-acknowledgements-block  :theme="theme" language="en"></opse-acknowledgements-block>
  </section>
</template>

<script>
import OpseAcknowledgementsBlock from '@/lib/modules/opse-acknowledgements-block/opse-acknowledgements-block.vue'

export default {
    name: "opse-acknowledgements-block-test",

    components: {OpseAcknowledgementsBlock},
    
     data() {
    return {
      
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA",
      },
    };
  },
}
</script>
