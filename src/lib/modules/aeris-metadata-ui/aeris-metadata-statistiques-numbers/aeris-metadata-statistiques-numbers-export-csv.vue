<template>
  <section>
    <a class="export-button" @click="exportToCSV()"><i class="fas fa-file" /> {{ buttonLabel }}</a>
  </section>
</template>

<script>
export default {
  name: "aeris-metadata-statistiques-numbers-export-csv",

  props: {
    buttonLabel: {
      type: String,
      default: "Export CSV"
    },
    fileName: {
      type: String,
      default: "data.csv"
    },
    statType: {
      type: String,
      required: true
    },
    contents: {
      type: Array,
      required: true
    }
  },
  methods: {
    exportToCSV() {
      let csvContent = '"' + this.statType + '","value"\r\n';

      this.contents.forEach(function(numberStat) {
        if (numberStat.number != null) {
          let row = '"' + numberStat.description + '",' + numberStat.number;
          csvContent += row + "\r\n";
        }
      });

      var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, this.fileName);
      } else {
        var link = document.createElement("a");
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", this.fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
};
</script>

<style scoped>
.export-button {
  cursor: pointer;
  color: #bababa;
}

.export-button:hover {
  cursor: pointer;
  color: #525252;
}
</style>
