<template>
  <section class="d-flex justify-content-around numbers-content mt-10 mb-10">
    <div v-for="(content, index) in contents" :key="index">
      <aeris-metadata-statistiques-number
        v-if="(content.number != null && content.number != '') || content.number === 0"
        :number="content.number"
        :description="content.description"
      ></aeris-metadata-statistiques-number>
    </div>
  </section>
</template>

<script>
import AerisMetadataStatistiquesNumber from "./aeris-metadata-statistiques-number";

export default {
  name: "aeris-metadata-statistiques-numbers",
  components: { AerisMetadataStatistiquesNumber },
  props: {
    contents: {
      type: Array,
      default: () => {
        return [];
      }
    },
    theme: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.numbers-content {
  width: 100%;
}

.justify-content-around {
  -ms-flex-pack: distribute !important;
  justify-content: space-around !important;
}
</style>
