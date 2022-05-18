<template>
  <table :style="applyTheme" aeris-metadata-ui-table>
    <thead class="primaryTheme">
      <tr>
        <th v-for="title in table.header" :key="title">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in table.content" :key="index">
        <td v-for="(column, index) in row" :key="column.value + '_' + index"><span v-html="column.value" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "aeris-metadata-ui-table",

  props: {
    table: {
      type: Object,
      required: true
    },
    theme: {
      type: Object,
      default: null
    }
  },
  computed: {
    applyTheme() {
      return this.theme && this.theme.primaryColor ? { "--primaryColor": this.theme.primaryColor } : "";
    }
  }
};
</script>

<style scoped>
[aeris-metadata-ui-table] {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

[aeris-metadata-ui-table] th {
  text-align: left;
  font-weight: 300;
  font-size: 1.1rem;
}

[aeris-metadata-ui-table] .primaryTheme {
  background: var(--primaryColor);
}

[aeris-metadata-ui-table] tbody tr:nth-child(odd) {
  background: #eee;
}

[aeris-metadata-ui-table] tr {
  display: flex;
  padding: 10px;
}

[aeris-metadata-ui-table] tr th,
[aeris-metadata-ui-table] tr td {
  width: 33%;
}

[aeris-metadata-ui-table] td {
  word-break: break-all;
}

[aeris-metadata-ui-table] td div {
  display: flex;
}
</style>
