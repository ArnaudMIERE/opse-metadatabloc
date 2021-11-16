<template>
  <v-app>
    <div class="py-2">
      <!--li>
        <router-link to="/myproject-fake-block">/My project fake block</router-link>
      </li-->
      
      <v-chip class="mx-2"><router-link to="/opse-datasetname-block">/opse-datasetname-block</router-link></v-chip>
      <v-chip class="mx-2"><router-link to="/opse-download-block">/opse-download-block</router-link></v-chip>

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
