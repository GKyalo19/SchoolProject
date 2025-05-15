<!-- src/views/LikedEventsPage.vue -->
<template>
  <div class="liked-events-page">
    <h1 class="page-title">My Liked Events</h1>

    <div v-if="likesStore.loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else-if="!likesStore.likedEvents.length" class="no-events">
      No liked events found
    </div>

    <div v-else class="events-grid">
      <div
        v-for="event in likesStore.likedEvents"
        :key="event.id"
        class="event-card"
      >
        <div class="event-image">
          <img :src="event.posterUrl || '/placeholder-image.jpg'" alt="Event poster" />
        </div>

        <div class="event-info">
          <div class="event-header">
            <h3>{{ event.name }}</h3>

            <div class="event-actions">
              <button class="share-button" @click.stop="shareEvent(event)">
                <i class="fas fa-share"></i>
              </button>

              <button class="like-button" @click.stop="unlikeEvent(event, $event)">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>

          <div class="event-details">
            <span>{{ event.venue }}</span>
            <span>{{ formatDate(event.startDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLikesStore } from '@/stores/likes'
import { format } from 'date-fns'

const likesStore = useLikesStore()

// Initialize store and fetch liked events
onMounted(() => {
  likesStore.initialize()
})

// Format date
function formatDate(date) {
  return format(new Date(date), 'MMM dd, yyyy')
}

// Share event
function shareEvent(event) {
  if (navigator.share) {
    navigator.share({
      title: event.name,
      text: event.description,
      url: window.location.href
    })
      .then(() => console.log('Content shared successfully!'))
      .catch((error) => console.log('Error sharing:', error))
  } else {
    // Fallback for browsers that don't support the Web Share API
    alert(`Share: ${event.name}\n${event.description}`)
  }
}

// Unlike event with index-based removal
async function unlikeEvent(event, clickEvent) {
  try {
    // Prevent event propagation
    clickEvent.stopPropagation()

    await likesStore.unlikeEvent(event)
    showNotification('Unliked event')
  } catch (error) {
    showNotification(`Error: ${error.message}`)
  }
}

// Show notification/toast
function showNotification(message) {
  // You can replace this with your preferred notification system
  const notification = document.createElement('div')
  notification.className = 'notification'
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add('show')

    setTimeout(() => {
      notification.classList.remove('show')
      setTimeout(() => document.body.removeChild(notification), 300)
    }, 2000)
  }, 10)
}
</script>

<style scoped>
.liked-events-page {
  padding: 1.5rem;
  height: 100%;
  overflow-y: auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-events {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.event-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  transition: transform 0.2s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-image {
  height: 200px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-info {
  padding: 1rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.event-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.event-actions {
  display: flex;
  gap: 0.5rem;
}

.event-actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.event-actions button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.like-button i {
  color: #e74c3c;
}

.event-details {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

/* Notification system */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 1000;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.notification.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
</style>
