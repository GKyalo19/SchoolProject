// src/stores/likes.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useLikesStore = defineStore('likes', () => {
  // State
  const likedEvents = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Actions
  async function likeEvent(event) {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      const response = await api.post(`like/${event.id}`, {}, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 201) {
        console.log('Event liked successfully')
        // Update the event's isLiked status
        event.isLiked = true

        // Add the event to likedEvents if not already present
        if (!likedEvents.value.some(e => e.id === event.id)) {
          likedEvents.value.push(event)
        }
      } else if (response.status === 409) {
        console.log('Event already liked')
      }

      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error('Error liking event:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function unlikeEvent(event) {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      const response = await api.delete(`unlike/${event.id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        console.log('Event unliked successfully')
        // Update the event's isLiked status
        event.isLiked = false

        // Remove the event from likedEvents
        likedEvents.value = likedEvents.value.filter(e => e.id !== event.id)
      } else if (response.status === 409) {
        console.log('Event already unliked')
      }

      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error('Error unliking event:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchLikedEvents() {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      const response = await api.get('like', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        // Transform the response to match our event structure
        likedEvents.value = response.data.map(eventData => ({
          ...eventData,
          startDate: new Date(eventData.startDate),
          endDate: new Date(eventData.endDate),
          isLiked: true, // These are liked events
          participation_mode: eventData.participation_mode || '',
          registration_fee: eventData.registration_fee || 0,
          currency: eventData.currency || 'USD'
        }))
      }

      return likedEvents.value
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error('Error fetching liked events:', err)
      likedEvents.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  // Initialize store
  function initialize() {
    fetchLikedEvents()
  }

  return {
    // State
    likedEvents,
    loading,
    error,

    // Actions
    likeEvent,
    unlikeEvent,
    fetchLikedEvents,
    initialize
  }
})
