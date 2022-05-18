<template>
  <v-app>
    <div class="py-2">
      <!--li>
        <router-link to="/myproject-fake-block">/My project fake block</router-link>
      </li-->
      
      <v-chip class="mx-2"><router-link to="/opse-datasetname-block">/opse-datasetname-block</router-link></v-chip>
      <v-chip class="mx-2"><router-link to="/opse-download-block">/opse-download-block</router-link></v-chip>
      <v-chip class="mx-2"><router-link to="/opse-year-based-download-block">/opse-year-based-download-block</router-link></v-chip>
      <v-chip class="mx-2"><router-link to="/opse-data-netcdf-block">/opse-data-netcdf-block</router-link></v-chip>
      <v-chip class="mx-2"><router-link to="/opse-thumbnails-displayed-block">/opse-thumbnails-displayed-block</router-link></v-chip> 
      <v-chip class="mx-2"><router-link to="/opse-images-displayed-block">/opse-images-displayed-block</router-link></v-chip> 
      <v-chip class="mx-2"><router-link to="/opse-visualisation-block">/opse-visualisation-block</router-link></v-chip>
      <v-chip class="mx-2"><router-link to="/opse-galery-images-displayed-block">/opse-galery-images-displayed-block</router-link></v-chip> 

    </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
