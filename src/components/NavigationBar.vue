<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar color="black" dark app>
      <!-- Logo + Name -->
      <v-btn icon to="/">
        <v-img src="../assets/backgrounds/FunkiesBadge.png" contain max-height="40" max-width="40"></v-img>
      </v-btn>
      <v-btn text to="/" class="ml-2 font-weight-bold text-h6 text-white">
        Funkies254
      </v-btn>

      <!-- Search Bar  -->
      <v-text-field
        v-model="searchQuery"
        placeholder="Search..."
        hide-details
        flat
        solo-inverted
        prepend-inner-icon="mdi-magnify"
        class="mx-5"
        style="max-width: 300px"
      ></v-text-field>

      <!-- Nav Links -->
      <v-btn text to="/" class="text-white">Home</v-btn>
      <v-btn text to="/events" class="text-white">Discover</v-btn>
      <v-btn text to="/likedEvents" class="text-white">Liked Events</v-btn>
      <v-btn text to="/create" class="text-white">Create Event</v-btn>
      <v-btn text to="/about" class="text-white">About Us</v-btn>

      <v-spacer></v-spacer>

      <!-- Notifications -->
      <v-icon size="30">mdi-bell</v-icon>

      <!-- User Dropdown -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on" class="cursor-pointer">
            <v-img :src="userAvatar" alt="Profile" />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item to="/profile">
            <v-list-item-title>Edit Profile</v-list-item-title>
          </v-list-item>
          <v-list-item to="/events">
            <v-list-item-title>Upcoming Events</v-list-item-title>
          </v-list-item>
          <v-list-item to="/saved">
            <v-list-item-title>Saved Events</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="handleLogout">
            <v-list-item-title class="text-red">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth.service'
import { useUserStore } from '@/stores/users'
import NotificationBell from './NotificationBell.vue'

const router = useRouter()
const searchQuery = ref('')
const userStore = useUserStore()

const { isAuthenticated, currentUser, logout, loadUserInfo } = useAuth()

onMounted(async () => {
  await loadUserInfo()
  if (isAuthenticated.value) {
    await userStore.fetchCurrentUser()
  }
})

const userAvatar = computed(() => {
  return (
    currentUser.value?.user_photo_url ||
    userStore.currentUser?.user_photo_url ||
    'https://picsum.photos/1920/1080?random'
  )
})

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<style scoped>
.v-avatar {
  border: 2px solid white;
}
</style>
