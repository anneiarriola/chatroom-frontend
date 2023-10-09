<template>
  <v-app>
    <v-main>
      <welcome-chat/>
    </v-main>
  </v-app>
</template>

<script>
import WelcomeChat from './components/WelcomeChat.vue';

export default {
  name: 'App',

  components: {
    WelcomeChat,
  },

  data: () => ({
    //
  }),
   created() {
    console.log(process.env.URL_API);
  },
};
</script>
<style>
.v-application {
  font-family: "Raleway", sans-serif !important;
  line-height: 1.5;
}
</style>