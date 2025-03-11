<template>
  <div class="app">
    <v-app>
      <SplashScreen v-if="showSplash" />
      <div v-if="!showSplash" class="main-content"></div>

      <div v-if="showRest">
        <NavigationBar />
        <RouterView />
        <PageFooter />
      </div>
    </v-app>
  </div>
</template>

<script>
import SplashScreen from './components/SplashScreen.vue'
import NavigationBar from './components/NavigationBar.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  components: {
    SplashScreen,
    NavigationBar,
    PageFooter,
  },
  data() {
    return {
      showSplash: true,
      showRest: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSplash = false
    }, 2000)

    // setTimeout(() => {
    //   // Redirect to home page after 3.5 seconds
    //   this.$router.push('/')
    // }, 2000)

    setTimeout(() => {
      this.showRest = true
    }, 2000)
  },
}
</script>

<style>
.app {
  background-image: url(../assets/image.png);
  height: 100vh;
  width: 100vw;
}
</style>
