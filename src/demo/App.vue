<template>
  <v-app>
    <div class="py-2">
    <ul>
     
      <!--li>
        <router-link to="/myproject-fake-block">/My project fake block</router-link>
      </li-->
      <li>
        <v-chip class="mx-2"><router-link to="/opse-datasetname-block">/opse-datasetname-block</router-link></v-chip>
      </li>
      
      
    </ul>
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
