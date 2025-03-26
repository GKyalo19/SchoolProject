import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useEventsStore = defineStore('events', () => {
  // State as refs
  const events = ref([])
  const classifications = ref([])
  const loading = ref(false)
  const error = ref(null)
  const dialog = ref(false)
  const dialogDelete = ref(false)
  const editedIndex = ref(-1)
  const editedItem = ref({
    id: '',
    name: '',
    venue: '',
    description: '',
    startDate: '',
    endDate: '',
    hosts: '',
    sponsors: '',
    capacity: null,
    classification_id: null,
  })

  const defaultItem = {
    id: '',
    name: '',
    venue: '',
    description: '',
    startDate: '',
    endDate: '',
    hosts: '',
    sponsors: '',
    capacity: null,
    classification_id: null,
  }

  const itemToDelete = ref(null)

  // Actions
  async function fetchClassifications() {
    try {
      const response = await api.get('classification')
      classifications.value = response.data.map((item) => ({
        ...item,
        key: item.id,
      }))
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    }
  }

  async function createEvent(eventData) {
    try {
      loading.value = true

      // 1. First try to find existing classification
      const existingClassification = classifications.value.find(c =>
        c.class === eventData.eventClass.join(', ') &&
        c.level === eventData.level &&
        c.category === eventData.category &&
        c.subject === (eventData.subject || null)
      )

      let classificationId
      if (existingClassification) {
        classificationId = existingClassification.id
      } else {
        // 2. Create new classification if needed
        const classificationResponse = await api.post('classification', {
          class: eventData.eventClass.join(', '),
          level: eventData.level,
          category: eventData.category,
          subject: eventData.subject || null
        })
        classificationId = classificationResponse.data.id
        classifications.value.push({
          ...classificationResponse.data,
          key: classificationResponse.data.id
        })
      }

      // 3. Create event with the classification ID
      const payload = {
        classification_id: classificationId,
        name: eventData.name,
        venue: eventData.venue,
        description: eventData.description,
        startDate: formatDate(eventData.startDate),
        endDate: formatDate(eventData.endDate),
        hosts: eventData.hostName || 'Default Host', // Ensure hosts is always provided
        sponsors: eventData.sponsors || '', // Default empty string if not provided
        capacity: Number(eventData.capacity) || 0 // Default to 0 if not provided
      }

      console.log('Final payload:', payload) // Verify before sending

      const eventResponse = await api.post('event', payload)
      const newEvent = { ...eventResponse.data, key: eventResponse.data.id }
      events.value.push(newEvent)
      return true

    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // Helper function to format dates
  function formatDate(date) {
    if (!date) return null
    return new Date(date).toISOString().split('T')[0] // YYYY-MM-DD format
  }

  // Add this helper function outside the actions
  function formatDate(date) {
    if (!date) return null
    // Format as YYYY-MM-DD
    return new Date(date).toISOString().split('T')[0]
  }

  async function fetchEvents() {
    try {
      loading.value = true
      const response = await api.get('event')
      events.value = response.data.map((event) => ({
        ...event,
        key: event.id,
      }))
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateEvent(updatedEvent) {
    try {
      loading.value = true
      await api.put(`event/${updatedEvent.id}`, updatedEvent)

      const index = events.value.findIndex((e) => e.id === updatedEvent.id)
      if (index !== -1) {
        const key = events.value[index].key
        events.value[index] = { ...updatedEvent, key }
      }
      return true
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return false
    } finally {
      loading.value = false
    }
  }

  function deleteEvent(id) {
    itemToDelete.value = id
    dialogDelete.value = true
  }

  async function deleteEventConfirm() {
    try {
      loading.value = true
      await api.delete(`event/${itemToDelete.value}`)
      events.value = events.value.filter((e) => e.id !== itemToDelete.value)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return false
    } finally {
      loading.value = false
      closeDelete()
    }
  }

  function openDialog() {
    editedIndex.value = -1
    editedItem.value = { ...defaultItem }
    dialog.value = true
  }

  async function editItem(id) {
    try {
      const response = await api.get(`event/${id}`)
      editedIndex.value = events.value.findIndex((e) => e.id === id)
      editedItem.value = { ...response.data[0] }
      dialog.value = true
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    }
  }

  function close() {
    dialog.value = false
    setTimeout(() => {
      editedItem.value = { ...defaultItem }
      editedIndex.value = -1
    }, 0)
  }

  function closeDelete() {
    dialogDelete.value = false
    setTimeout(() => {
      itemToDelete.value = null
    }, 0)
  }

  function initialize() {
    fetchEvents()
    fetchClassifications()
  }

  // Getters as computed properties
  const nationalEvents = computed(() => {
    return events.value.filter((e) => {
      const classification = classifications.value.find((c) => c.id === e.classification_id)
      return classification?.level === 'National'
    })
  })

  const internationalEvents = computed(() => {
    return events.value.filter((e) => {
      const classification = classifications.value.find((c) => c.id === e.classification_id)
      return classification?.level === 'International'
    })
  })

  return {
    // State
    events,
    classifications,
    loading,
    error,
    dialog,
    dialogDelete,
    editedIndex,
    editedItem,
    itemToDelete,
    nationalEvents,
    internationalEvents,

    // Actions
    fetchClassifications,
    createEvent,
    fetchEvents,
    updateEvent,
    deleteEvent,
    deleteEventConfirm,
    openDialog,
    editItem,
    close,
    closeDelete,
    initialize,
  }
})
