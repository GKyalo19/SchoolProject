<template>
  <div v-if="isVisible" class="splash-screen">
    <h1 ref="logo" class="text">Funkies 254</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const logo = ref(null)
const isVisible = ref(true)

onMounted(() => {
  // Animate the text like the Netflix logo
  gsap.fromTo(
    logo.value,
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
  )

  // Wait until the animation is complete before hiding the splash screen
  setTimeout(() => {
    isVisible.value = false
  }, 3000) // Ensure this is longer than the animation duration
})
</script>

<style scoped>
h1 {
  font-size: 8rem;
  font-weight: 700;
  color: black;
}

.splash-screen {
  background-image: url(../assets/backgrounds/AfricanPattern.png);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1000;
}
</style>

<!-- <template>
  <div v-if="isVisible" class="splash-screen">
    <h1 ref="logo" class="text">Funkies 254</h1>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'

const logo = ref(null)

export default {
  data() {
    return {
      isVisible: true, // Controls splash screen visibility
    }
  },
  mounted() {
    // Automatically hide after 3 seconds
    setTimeout(() => {
      this.isVisible = false
    }, 2000)

    onMounted(() => {
      gsap.fromTo(
        logo.value,
        { opacity: 0, scale: 0.5, letterSpacing: '0.2em' },
        { opacity: 1, scale: 1, letterSpacing: '0.5em', duration: 2, ease: 'power2.out' },
      )
    })
  },
}
</script>

<style scoped>
h1 {
  font-size: 8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: black;
  text-transform: black;
}

h1 media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
  animation: fadeIn 1s ease-in-out 2.5s forwards;
}

.splash-screen {
  background-image: url(https://www.pinterest.com/pin/3799980929807511/);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1000;
  animation: fadeOut 1s ease-in-out 2.5s forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style> -->
