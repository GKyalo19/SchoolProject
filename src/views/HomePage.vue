<template>
  <div :style="backgroundStyle" class="image">
    <div class="glass">
      <v-main>
        <v-container> </v-container>
      </v-main>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from '../assets/Backgrounds/Dancing.png'

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

<style>
.glass {
  background: rgba(16, 16, 48, 0.452);
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
