<template>
  <section>
    <div class="number">
      {{ number }}
    </div>
    <div class="description">
      {{ description }}
    </div>
  </section>
</template>

<script>
export default {
  name: "aeris-metadata-statistiques-number",

  props: {
    number: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ""
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
.number {
  width: 100%;
  font-size: 43px;
  text-align: right;
  font-weight: 500;
}

.description {
  width: 100%;
  font-size: 12px;
  text-align: right;
  font-style: italic;
  margin-top: 8px;
}
</style>
