<template>
  <nav>
    <v-app-bar
      class="opacity-50 white-text"
      color="black"
      scroll-behavior="hide collapse elevate fade-image"
      scroll-threshold="200"
      image="../assets/backgrounds/AfricanPattern2.png"
    >
      <v-app-bar-title>
        <v-icon icon="mdi-robot" color="lime-darken-4"></v-icon> Funkies254
      </v-app-bar-title>

      <v-text-field icon="mdi-magnify" label="Search" center> </v-text-field>

      <v-btn :to="'/'">Home</v-btn>
      <v-btn :to="'/events'">Events</v-btn>
      <v-btn :to="'/about'">AboutUs</v-btn>
      <v-btn :to="'/login'">Log in</v-btn>
      <v-btn :to="'/signup'">Sign Up</v-btn>

      <v-menu offset-y expand-on-hover>
        <template v-slot:activator="{ props }">
          <v-avatar size="100" text v-bind="props">
            <v-img :src="userAvatar"></v-img>
          </v-avatar>
        </template>

        <v-list class="dark">
          <v-list-item
            v-for="path in allPaths"
            :key="path.text"
            router
            :to="path.route"
            active-class="border"
            prepend-icon="{{ path.icon }}"
          >
            <v-list-item-title>{{ path.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script setup>
const allPaths = [
  // Public paths
  { icon: 'mdi-home', text: 'Home', route: '/', public: true },
  { icon: 'mdi-magnify', text: 'Search', route: '/search', public: true },
  { icon: 'mdi-heart', text: 'About Us', route: '/about-us', public: true },
  { icon: 'mdi-mail', text: 'Contact Us', route: '/contact-us', public: true },
]
</script>
