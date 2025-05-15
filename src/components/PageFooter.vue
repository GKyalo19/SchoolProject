<template>

    <v-footer class="myFooter" style="color: black;">
      <v-card flat class="pa-6">
        <v-row>
          <!-- Left: Funkies254 Branding -->
          <v-col cols="12" md="3">
            <div class="d-flex flex-column align-start">
              <v-avatar size="60">
                <img src="../components/icons/FunkiesFavicon1.png" />
              </v-avatar>
              <p class="mt-2 font-weight-bold text-h6">Funkies254</p>
              <p class="text-caption">Your guide to awesome events in Kenya.</p>
            </div>
          </v-col>

          <!-- Middle: Page Links -->
          <v-col cols="12" md="3">
            <p class="font-weight-bold mb-2">Pages</p>
            <v-list>
              <v-list-item v-for="path in funkiesPaths" :key="path.text" class="px-0">
                <v-btn variant="text" :to="path.route" class="text-white px-0">{{ path.text }}</v-btn>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Social Links -->
          <v-col cols="12" md="3">
            <p class="font-weight-bold mb-2">Connect with us</p>
            <v-list>
              <v-list-item v-for="social in socialsPaths" :key="social.text" class="px-0">
                <v-btn
                  variant="text"
                  :href="social.route"
                  target="_blank"
                  rel="noopener"
                  class="text-white px-0"
                >
                  <v-icon left class="mr-2">{{ social.icon }}</v-icon>
                  {{ social.text }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Email Subscription -->
          <v-col cols="12" md="3">
            <p class="font-weight-bold mb-2">Stay Updated</p>
            <p class="text-caption">Subscribe for event notifications</p>
            <v-form @submit.prevent="subscribe">
              <v-text-field
                v-model="email"
                type="email"
                placeholder="Enter your email"
                hide-details
                class="my-2"
                density="compact"
                variant="outlined"
              />
              <v-btn type="submit" color="yellow-darken-2" block class="text-black">
                Subscribe
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card>

      <!-- Bottom Text -->
      <v-row justify="center" class="mt-4">
        <v-col cols="12" class="text-center text-caption text-grey-lighten-1">
          © {{ new Date().getFullYear() }} Funkies254. All rights reserved.
        </v-col>
      </v-row>
    </v-footer>

</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribe = () => {
  if (!email.value) return
  console.log('Subscribed with:', email.value)
  alert(`Thanks for subscribing, ${email.value}!`)
  email.value = ''
}

const funkiesPaths = [
  { text: 'Home', route: '/' },
  { text: 'Events', route: '/events' },
  { text: 'Create Event', route: '/create' },
  { text: 'About Us', route: '/about' }
]

const socialsPaths = [
  {
    icon: 'mdi-instagram',
    text: 'Instagram',
    route: 'https://www.instagram.com/gracie.k_17/'
  },
  {
    icon: 'mdi-twitter',
    text: 'Twitter',
    route: 'https://twitter.com/yourhandle'
  },
  {
    icon: 'mdi-whatsapp',
    text: 'WhatsApp',
    route: 'https://wa.me/254712345678'
  }
]
</script>

<style scoped>
.myFooter {
  background-color: rgba(0, 0, 0, 0.815);
  color: white;
  padding-bottom: 10px;
  width: 100%;
  height: 200px;
}

.v-btn {
  text-transform: none;
}

.v-card {
  background-color: transparent !important;
  color: white;
  margin: 0;
}

.v-list {
  background-color: rgba(0, 0, 0, 0.678);
  margin: 0;
  text-align: center;
  width: 200px;
}

</style>
