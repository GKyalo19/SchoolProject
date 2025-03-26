<template>
  <v-footer class="vuefooter">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.route"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
        router
        :to="link.route"
      >
        {{ link.text }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script setup>
const links = [
  { text: 'Home', route: '/' },
  { text: 'About Us', route: '/about' },
  { text: 'Events', route: '/events' },
  { text: 'Contact Us', route: '/contact-us' },
  { text: 'Feedback', route: '/feedback' },
]
</script>

<style scoped>
.vuefooter {
  height: 50px;
  position: relative;
  bottom: 0;
  justify-self: center;
  width: 100vw;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.541);
  box-shadow: black 10px;
}
</style>
