<template>
    <section>
        <myproject-fake-block :metadata="metadata1" :theme="theme" language="en">
        </myproject-fake-block>
    </section>
</template>

<script>
import myprojectFakeBlock from "@/lib/modules/myproject-fake-block/myproject-fake-block";
export default {
    name: "myproject-fake-block-test",

    components: { myprojectFakeBlock },

    data() {
    return {
      metadata1: {
        id: "4ace15fe-509c-40e5-9709-47926b757bd0"
      },
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA"
      }
    };
  }
}
</script>

<style scoped></style>