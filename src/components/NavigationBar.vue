<!-- <template>
  <v-container height="auto">
    <v-app-bar class="vuebar">
      <v-icon icon="mdi-robot" @click="redirect()"></v-icon>Funkies 254
      <v-spacer></v-spacer>

      <v-btn href="../views/HomePage.vue" @mouseover="homepage()">Home</v-btn>

      <v-btn href="../views/AllEvents.vue"
        >Events
        <v-card class="mx-auto" elevation="24" hover>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-card-item>
                  <v-card-title>
                    <v-btn href="../views/InternationalEvents.vue">International Events</v-btn>
                  </v-card-title>
                  <v-col cols="12" md="4" v-for="event in events" :key="event">
                    <v-card-text href="{{ event.href }}">{{ event.name }}</v-card-text>
                  </v-col>
                </v-card-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-btn>
      <v-btn href="../views/AboutUs.vue">AboutUs</v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          name: 'Academic',
          id: '1',
          href: '../views/Events/AcademicEvents.vue',
        },
        {
          name: 'Debate',
          id: '2',
          href: '../views/Events/DebateEvents.vue',
        },
        {
          name: 'Music and Drama',
          id: '3',
          href: '../views/Events/MusicEvents.vue',
        },
        {
          name: 'Coding competitions',
          id: '4',
          href: '../views/Events/CodingEvents.vue',
        },
        {
          name: 'Robotics Fairs',
          id: '5',
          href: '../views/Events/RoboticsFairs.vue',
        },
        {
          name: 'Olympiads',
          id: '6',
          href: '../views/Events/OlympiadEvents.vue',
        },
        {
          name: 'Workshops and Seminars',
          id: '7',
          href: '../views/Events/WorkshopsSeminars.vue',
        },
        {
          name: 'Work-study programs',
          id: '8',
          href: '../views/Events/WorkStudy.vue',
        },
      ],
    }
  },
}
</script>

<style scoped>
.vuebar {
  color: white;
  font-size: 2rem;
  font-family: Helvetica, serif;
  background-color: rgba(0, 0, 0, 0.486);
  padding: 5px;
  padding-left: 20px;
  height: auto;
}
</style> -->

<template>
  <nav>
    <v-app-bar
      class="opacity-50 white-text"
      color="black"
      scroll-behavior="hide collapse elevate fade-image"
      scroll-threshold="200"
      image="../assets/backgrounds/AfricanPattern2.png"
    >
      <v-app-bar-title> <v-icon icon="mdi-robot" light></v-icon> Funkies254 </v-app-bar-title>

      <v-text-field icon="mdi-magnify" label="Search" center> </v-text-field>

      <v-btn href="../views/HomePage.vue">Home</v-btn>
      <v-btn href="../views/AllEvents.vue">Events</v-btn>
      <v-btn href="../views/AboutUs.vue">AboutUs</v-btn>

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
