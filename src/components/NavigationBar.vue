<template>
  <v-app>
    <!-- Vertical Navigation Drawer -->
    <v-navigation-drawer
      permanent
      location="right"
      width="auto"
      class="nav-drawer"
      color="transparent"
    >
      <!-- User Info Section (if authenticated) -->
      <v-layout column align-center v-if="isAuthenticated || !hideForUnauthenticated">
        <v-flex class="my-2 mx-auto text-center">
          <v-avatar size="60">
            <v-img :src="userAvatar" :alt="userName"></v-img>
          </v-avatar>
          <p class="subheading mt-1 text-center userName">{{ userName }}</p>
        </v-flex>
      </v-layout>

      <!-- Navigation Items -->
      <v-list class="pa-0">
        <!-- Loop through filteredPaths -->
        <v-card
          v-for="path in filteredPaths"
          :key="path.text"
          class="ma-1 nav-card"
          @mouseover="hoveredItem = path.text"
          @mouseleave="hoveredItem = null"
          :elevation="hoveredItem === path.text ? 12 : 2"
        >
          <v-btn block variant="text" :to="path.route" class="text-left pa-5 buttons">
            <v-icon left size="20">{{ path.icon }}</v-icon>
            {{ path.text }}
          </v-btn>
        </v-card>

        <v-btn
          v-if="isAuthenticated"
          block
          text
          @click="handleLogout"
          class="text-left pa-5 logout"
        >
          <v-icon left size="20">mdi-logout</v-icon>
          <span>Logout</span>
        </v-btn>
      </v-list>
    </v-navigation-drawer>

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

// const props = defineProps({
//   hideForUnauthenticated: {
//     type: Boolean,
//     default: true,
//   },
// })

const router = useRouter()
const hoveredItem = ref(null) // Track hovered item for elevation effect
const userStore = useUserStore()

const { isAuthenticated, currentUser, isAdmin, logout, loadUserInfo } = useAuth()

// Load user info on component mount
onMounted(async () => {
  await loadUserInfo()
  if (isAuthenticated.value) {
    await userStore.fetchCurrentUser()
  }
})

// Computed properties for user info
const userName = computed(() => {
  return currentUser.value ? currentUser.value.name || 'User' : 'Guest'
})

const userAvatar = computed(() => {
  return (
    currentUser.value?.user_photo_url ||
    userStore.currentUser?.user_photo_url ||
    'https://picsum.photos/1920/1080?random'
  )
})

// Handle logout
function handleLogout() {
  logout()
  router.push('/')
}

const allPaths = [
  // Public paths
  { icon: 'mdi-home', text: 'Home', route: '/', public: true },
  { icon: 'mdi-magnify', text: 'Events', route: '/events', public: true },
  { icon: 'mdi-pencil', text: 'Create Event', route: '/create', public: true },
  { icon: 'mdi-heart', text: 'About Us', route: '/about', public: true },

  // Authentication paths (show login when not authenticated, profile when authenticated)
  { icon: 'mdi-lock', text: 'Login', route: '/login', showWhenLoggedOut: true },
  { icon: 'mdi-account', text: 'My Profile', route: '/profile', requiresAuth: true },

  // Authenticated user paths
  { icon: 'mdi-calendar', text: 'My Events', route: '/events', requiresAuth: true },

  // Admin/Backend paths
  {
    icon: 'mdi-store',
    text: 'User Roles',
    route: '/roles',
    requiresAdmin: true,
  },

  {
    icon: 'mdi-account-group',
    text: 'User Management',
    route: '/users',
    requiresAdmin: true,
  },
  {
    icon: 'mdi-clipboard-list',
    text: 'Event Management',
    route: '/events',
    requiresAdmin: true,
  },
  { icon: 'mdi-cash-register', text: 'Payments', route: '/admin/payments', requiresAdmin: true },
  { icon: 'mdi-chart-bar', text: 'Reports', route: '/admin/reports', requiresAdmin: true },
]

// Filter paths based on authentication status and user role
const filteredPaths = computed(() => {
  return allPaths.filter((path) => {
    // Public paths are always visible
    if (path.public) return true

    // Paths that should only show when logged out
    if (path.showWhenLoggedOut && !isAuthenticated.value) return true

    // Paths that require authentication
    if (path.requiresAuth && isAuthenticated.value) {
      // Admin-only paths
      if (path.requiresAdmin) {
        return isAdmin.value
      }
      return true
    }

    return false
  })
})
</script>

<style scoped>
/* Navigation Drawer Styling */
.nav-drawer {
  background-color: #f5f5f5; /* Light gray background */
  max-height: 500px;
  margin-right: 20px;
}

/* Navigation Card Styling */
.nav-card {
  transition: all 0.3s ease;
  border-radius: 8px; /* Rounded corners */
}

.nav-card:hover {
  transform: scale(1.05); /* Slightly scale up on hover */
}

/* Reduce button padding and font size */
.nav-card .v-btn {
  font-size: 14px; /* Reduce text size */
  padding: 0 8px; /* Reduce padding */
  justify-content: center;
  align-items: center;
}
.buttons {
  background-image: url(../assets/backgrounds/AfricanPattern2.png);
  color: white;
  height: 10px;
}
.logout {
  background-image: url(../assets/backgrounds/AfricanPattern2.png);
  color: white;
  height: 10px;
  border-radius: 10px;
}
.userName {
  color: white;
}
.v-avatar .v-img {
  object-fit: cover;
}
</style>
