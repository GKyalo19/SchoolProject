<template>
  <v-container>
    <div :style="backgroundStyle"></div>
  </v-container>
</template>

<script setup>
import backgroundImage from '../assets/coding/coding1.jpg'

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
