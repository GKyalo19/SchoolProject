<template>
  <div class="app">
    <v-app>
      <v-main>
        <SplashScreen v-if="showSplash" />
        <NavigationBar v-if="!showSplash && shouldShowNavBar" />
        <div v-if="!showSplash" class="main-content"></div>

        <div v-if="!showSplash"></div>

        <v-content class="pages">
          <RouterView />
        </v-content>
      </v-main>
      <PageFooter v-if="shouldShowFooter" class="pageFooter"/>
    </v-app>


  </div>
</template>

<script>
import SplashScreen from './components/SplashScreen.vue'
import NavigationBar from './components/NavigationBar.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  name: 'App',
  components: {
    SplashScreen,
    NavigationBar,
    PageFooter,
  },
  data() {
    return {
      showSplash: !localStorage.getItem('splashShown'),
    }
  },
  computed: {
    shouldShowFooter() {
      // Hide footer for these routes
      const hiddenRoutes = ['/login', '/signup', '/forgotpassword', '/resetpassword']
      return !hiddenRoutes.includes(this.$route.path)
    },
    shouldShowNavBar() {
      // Hide navbar for these routes
      const hiddenRoutes = ['/login', '/signup', '/forgotpassword', '/resetpassword']
      return !hiddenRoutes.includes(this.$route.path)
    },
  },
  mounted() {
    if (this.showSplash) {
      setTimeout(() => {
        this.showSplash = false
        localStorage.setItem('splashShown', 'true')
      }, 2000)
    }
  },
}
</script>

<style scoped>
.app {
  background-image: url(../assets/image.png);
  height: 100vh;
  width: 100vw;
}

</style>
