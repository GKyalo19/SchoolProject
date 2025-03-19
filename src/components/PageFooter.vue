<template>
  <v-footer class="vuefooter">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
  }),
}
</script>

<style scoped>
.vuefooter {
  height: 150px;
  position: absolute;
  bottom: 0;
  justify-self: center;
  width: 100vw;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.541);
  box-shadow: black 10px;
}
</style>
