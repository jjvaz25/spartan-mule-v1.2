<template>
  <v-app id="keep">
    <top-nav />
    <v-content class="grey lighten-4 fill-height">
      <router-view></router-view>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
import TopNav from '../src/components/TopNav'
import Footer from '../src/components/Footer'

export default {
  name: 'App',
  components: {
    'top-nav': TopNav,
    'bottom-footer': Footer
  },
  data() {
    return {
    }
  }
};
</script>

<style>
/* #keep .v-navigation-drawer__border {
  display: none
} */
</style>