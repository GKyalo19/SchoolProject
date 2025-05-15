// src/stores/event.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useEventsStore = defineStore('events', () => {
  // State
  const events = ref([])
  const upcomingPaidEvents = ref([]) // New state for upcoming paid events
  const loading = ref(false)
  const error = ref(null)
  const dialog = ref(false)
  const dialogDelete = ref(false)
  const editedIndex = ref(-1)
  const editedItem = ref(createEmptyEvent())
  const itemToDelete = ref(null)

  // Create an empty event with all fields from Flutter model
  function createEmptyEvent() {
    return {
      id: null,
      posterUrl: null,
      poster: null,
      eventClass: '',
      level: '',
      category: '',
      subject: '',
      name: '',
      participation_mode: '',
      venue: null,
      link: null,
      county: null,
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      hosts: '',
      sponsors: '',
      capacity: 0,
      registration_fee: 0,
      currency: 'USD',
      userId: null,
      isLiked: false,
      isPaid: false // Added to match Flutter model
    }
  }

  // Convert event to FormData for multipart upload (matches Flutter's toMultipartFields)
  function eventToFormData(event) {
    const formData = new FormData()

    // Add all fields except poster
    Object.keys(event).forEach(key => {
      if (key !== 'poster' && event[key] !== null && event[key] !== undefined) {
        if (event[key] instanceof Date) {
          formData.append(key, event[key].toISOString())
        } else {
          formData.append(key, event[key].toString())
        }
      }
    })

    // Add poster file if exists (matches Flutter's multipart file handling)
    if (event.poster instanceof File) {
      formData.append('poster', event.poster)
    }

    return formData
  }

  // Actions

  // Create event (matches Flutter's createEvent)
  async function createEvent(event) {
    try {
      loading.value = true
      error.value = null

      const formData = eventToFormData(event)
      const token = localStorage.getItem('authToken')

      const response = await api.post('event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' // Added to match Flutter
        }
      })

      const newEvent = response.data
      events.value.push(newEvent)
      return newEvent
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error("Error creating event:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch events (matches Flutter's getEvents)
  async function fetchEvents() {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      const response = await api.get('event', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' // Added to match Flutter
        }
      })

      if (response.data?.data) {
        // Transform the response to match our event structure
        events.value = response.data.data.map(eventData => ({
          ...eventData,
          startDate: new Date(eventData.startDate),
          endDate: new Date(eventData.endDate),
          isLiked: eventData.isLiked || false,
          isPaid: eventData.isPaid || false, // Added to match Flutter model
          // Ensure all fields are present
          participation_mode: eventData.participation_mode || '',
          registration_fee: eventData.registration_fee || 0,
          currency: eventData.currency || 'USD'
        }))
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error("Error fetching events:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch upcoming paid events (matches Flutter's getUpcomingPaidEvents)
  async function fetchUpcomingPaidEvents() {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      const response = await api.get('events/upcoming/paid', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.data?.data) {
        // Transform the response to match our event structure
        upcomingPaidEvents.value = response.data.data.map(eventData => ({
          ...eventData,
          startDate: new Date(eventData.startDate),
          endDate: new Date(eventData.endDate),
          isLiked: eventData.isLiked || false,
          isPaid: eventData.isPaid || false,
          // Ensure all fields are present
          participation_mode: eventData.participation_mode || '',
          registration_fee: eventData.registration_fee || 0,
          currency: eventData.currency || 'USD'
        }))
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error("Error fetching upcoming paid events:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Check payment status (matches Flutter's checkPaymentStatus)
  async function checkPaymentStatus(eventId) {
    try {
      error.value = null
      const token = localStorage.getItem('authToken')

      const response = await api.get(`payment/status/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      return response.data?.status === true
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error("Error checking payment status:", err)
      return false // Return false on error, matching Flutter implementation
    }
  }

  // Update event (matches Flutter's editEvent)
  async function updateEvent(updatedEvent) {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      const formData = eventToFormData(updatedEvent)

      // Updated to match Flutter endpoint
      const response = await api.put('editEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      const index = events.value.findIndex(e => e.id === updatedEvent.id)
      if (index !== -1) {
        events.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error("Error updating event:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete event
  async function deleteEvent(id) {
    try {
      loading.value = true
      error.value = null
      const token = localStorage.getItem('authToken')

      await api.delete(`event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      events.value = events.value.filter(e => e.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error("Error deleting event:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // UI Helpers
  function openCreateDialog() {
    editedIndex.value = -1
    editedItem.value = createEmptyEvent()
    dialog.value = true
  }

  function openEditDialog(id) {
    const event = events.value.find(e => e.id === id)
    if (event) {
      editedIndex.value = events.value.findIndex(e => e.id === id)
      editedItem.value = JSON.parse(JSON.stringify(event)) // Deep clone
      dialog.value = true
    }
  }

  function closeDialog() {
    dialog.value = false
    setTimeout(() => {
      editedItem.value = createEmptyEvent()
      editedIndex.value = -1
    }, 300)
  }

  function openDeleteDialog(id) {
    itemToDelete.value = id
    dialogDelete.value = true
  }

  function closeDeleteDialog() {
    dialogDelete.value = false
    setTimeout(() => {
      itemToDelete.value = null
    }, 300)
  }

  // Initialize store
  function initialize() {
    fetchEvents()
    fetchUpcomingPaidEvents() // Added to fetch upcoming paid events on initialization
  }

  return {
    // State
    events,
    upcomingPaidEvents, // Added to expose upcomingPaidEvents
    loading,
    error,
    dialog,
    dialogDelete,
    editedIndex,
    editedItem,
    itemToDelete,

    // Actions
    createEvent,
    fetchEvents,
    fetchUpcomingPaidEvents, // Added to expose fetchUpcomingPaidEvents
    checkPaymentStatus, // Added to expose checkPaymentStatus
    updateEvent,
    deleteEvent,
    initialize,

    // UI Helpers
    openCreateDialog,
    openEditDialog,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,

    // Utility functions (exposed if needed by components)
    createEmptyEvent,
    eventToFormData
  }
})
