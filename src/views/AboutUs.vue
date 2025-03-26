<template>
  <div :style="backgroundStyle">
    <v-container>
      <v-card class="mx-auto text-white centered-card" elevation="24">
        <v-card-title class="text-h3">About Us</v-card-title>
        <v-card-text
          >Welcome to Funkies 254, your ultimate guide to the most exciting school events,
          competitions, and festivals across Kenya! <br /><br />
          Whether it's drama festivals, music extravaganzas, sports tournaments, or academic
          contests, we bring you real-time updates, schedules, and exclusive highlights from the
          heart of the action. We created Funkies 254 to bridge the gap between students, fans, and
          event organizers. No more missing out on your favorite school funkies—our app keeps you in
          the loop with event details, results, and trending moments, all in one place. Join us as
          we celebrate talent, culture, and competition in Kenya’s vibrant school scene. Funkies
          254—where every moment counts!
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<style scoped>
.centered-card {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  text-align: left;
  font-size: 12px;
}
</style>

<script setup>
import backgroundImage from '../assets/math/olympiad.png'

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
</script>
