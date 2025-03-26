<template>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
    {{ snackbar.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
    </template>
  </v-snackbar>

  <div class="page-container" :style="backgroundStyle">
    <v-container class="content-container">
      <v-card class="user-card">
        <v-avatar size="300">
          <v-img :src="userAvatar" :alt="userName"></v-img>
        </v-avatar>
        <v-card-title
        class="text-center"
        v-model="eventData.hostName"
        >Event host: {{ userName }}</v-card-title>
      </v-card>

      <v-card class="form-card">
        <v-form v-model="formValid" @submit.prevent="submitForm">
          <v-text-field
            v-model="eventData.name"
            placeholder="Name of event"
            outlined
            dense
            :rules="[(v) => !!v || 'Event name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="eventData.venue"
            placeholder="Event venue"
            outlined
            dense
            :rules="[(v) => !!v || 'Event venue is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="eventData.description"
            placeholder="Event description"
            outlined
            :rules="[(v) => !!v || 'Event description is required']"
            required
            dense
          ></v-text-field>

          <v-select
            v-model="eventData.platform"
            clearable
            chips
            label="Event platform"
            :items="['Physical', 'Online']"
            :rules="[(v) => !!v || 'Event platform is required']"
            required
            multiple
          ></v-select>

          <v-select
            v-model="eventData.eventClass"
            clearable
            chips
            label="Pick event class"
            :items="['High School', 'University']"
            :rules="[(v) => !!v || 'Event class is required']"
            required
            multiple
          ></v-select>

          <v-select
            v-model="eventData.level"
            clearable
            chips
            label="Pick event level"
            :items="['National', 'International']"
            :rules="[(v) => !!v || 'Event level is required']"
            required
            @update:modelValue="eventData.category = ''"
          ></v-select>

          <v-select
            v-if="eventData.level === 'National'"
            v-model="eventData.category"
            clearable
            chips
            label="Select event category"
            :items="nationalCategories"
            :rules="[(v) => !!v || 'Event category is required']"
            required
          ></v-select>

          <v-select
            v-if="eventData.level === 'International'"
            v-model="eventData.category"
            clearable
            chips
            label="Select event category"
            :items="internationalCategories"
            :rules="[(v) => !!v || 'Event category is required']"
            required
          ></v-select>

          <v-select
            v-if="eventData.level === 'National' && eventData.category === 'Academic'"
            v-model="eventData.subject"
            clearable
            chips
            label="Select event subject"
            :items="academicSubjects"
            :rules="[(v) => !!v || 'Event subject is required']"
            required
          ></v-select>

          <div class="date-pickers">
            <v-date-picker
              v-model="eventData.startDate"
              label="Start Date"
              variant="outlined"
              class="ma-2"
              :rules="[(v) => !!v || 'Event start date is required']"
              required
            ></v-date-picker>
            <v-date-picker
              v-model="eventData.endDate"
              label="End Date"
              variant="outlined"
              class="ma-2"
              :rules="[(v) => !!v || 'Event end date is required']"
              reqiured
            ></v-date-picker>
          </div>

          <v-text-field
            v-model="eventData.capacity"
            type="number"
            placeholder="Event Capacity"
            outlined
            dense
          ></v-text-field>

          <v-select
            v-model="eventData.participationMode"
            clearable
            chips
            label="Mode of participation"
            :items="['Individuals', 'Teams']"
            :rules="[(v) => !!v || 'Participation mode is required']"
            required
          ></v-select>

          <v-text-field
            v-if="eventData.participationMode === 'Teams'"
            v-model="eventData.participantsPerTeam"
            type="number"
            placeholder="Participants per team"
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="eventData.sponsors"
            placeholder="Event sponsors (eg. abc, def,...)"
            outlined
            dense
          ></v-text-field>

          <div class="fee-container">
            <v-text-field
              v-model="eventData.registrationFee"
              type="number"
              placeholder="Registration fee"
              outlined
              dense
              :rules="[(v) => !!v || 'Registration fee is required']"
              required
              class="fee-input"
            ></v-text-field>
            <v-select
              v-model="eventData.currency"
              :items="['USD', 'EUR', 'KES', 'GBP']"
              dense
              :rules="[(v) => !!v || 'Currency is required']"
              required
              class="currency-select"
            ></v-select>
          </div>

          <v-btn
            :disabled="!formValid"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
            class="submit-btn"
          >
            Create Event
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { useAuth } from '@/services/auth.service'
import backgroundImage from '../assets/backgrounds/Dancers3.png'
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/users'
import { useEventsStore } from '@/stores/events'

const { currentUser, isAuthenticated, loadUserInfo } = useAuth()
const userStore = useUserStore()
const eventsStore = useEventsStore()

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

// Form data structure
const eventData = ref({
  name: '',
  venue: '',
  description: '',
  platform: [],
  eventClass: [],
  level: '',
  category: '',
  subject: '',
  startDate: null,
  endDate: null,
  capacity: null,
  participationMode: '',
  participantsPerTeam: null,
  sponsors: '',
  registrationFee: null,
  currency: 'USD',
  hostId: null,
  hostName: '',
})

const formValid = ref(false)
const loading = ref(false)

// Constants for select options
const nationalCategories = [
  'Academic',
  'Debate',
  'Music and Drama',
  'Research Program',
  'Journalism',
  'Coding',
  'Sports',
  'Workshop and Seminar',
  'Leadership Program',
  'Mentorship program',
]

const internationalCategories = [
  'Olympiad',
  'Debate',
  'STEM Program',
  'Research Program',
  'Summer Program',
  'Coding',
  'Travel Program',
  'Workshop and Seminar',
  'Leadership Program',
  'Mentorship program',
]

const academicSubjects = [
  'Math',
  'Languages (English, Kiswahili, Foreign Languages etc)',
  'Science (Biology, Physics, Chemistry)',
  'Technicals (Computer Science, HomeScience, Agriculture, Woodwork, MetalWork, Aviation etc)',
  'Humanity subject (Geography, History)',
  'Religious Subject (CRE, IRE, Hindu etc)',
]

// Initialize component
onMounted(async () => {
  await loadUserInfo()
  if (isAuthenticated.value) {
    await userStore.fetchCurrentUser()
    eventData.value.hostId = currentUser.value?.id
    eventData.value.hostName = currentUser.value?.name || 'Default Host' // Ensure this is set
  }
})

const userName = computed(() => {
  return currentUser.value ? currentUser.value.name || 'User' : 'Guest'
})

const userAvatar = computed(() => {
  return currentUser.value?.avatar || 'default-avatar.jpg'
})

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}))

async function submitForm() {
  if (!formValid.value) return

  loading.value = true
  try {
    console.log('Submitting form with data:', eventData.value) // Debug log

    const success = await eventsStore.createEvent(eventData.value)

    if (success) {
      showSnackbar('Event created successfully!', 'success')
      resetForm()
    } else {
      const errorMessage = eventsStore.error || 'Failed to create event. Please try again.'
      showSnackbar(errorMessage, 'error')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    const errorMessage =
      error.response?.data?.message || eventsStore.error || 'An unexpected error occurred'
    showSnackbar(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}

function showSnackbar(message, color = 'success') {
  snackbar.value = {
    show: true,
    message,
    color,
  }
}

function resetForm() {
  eventData.value = {
    host:'',
    name: '',
    venue: '',
    description: '',
    platform: [],
    eventClass: [],
    level: '',
    category: '',
    subject: '',
    startDate: null,
    endDate: null,
    capacity: null,
    participationMode: '',
    participantsPerTeam: null,
    sponsors: '',
    registrationFee: null,
    currency: 'USD',
    hostId: eventData.value.hostId,
    hostName: eventData.value.hostName,
  }
}
</script>

<style scoped>
.page-container {
  padding: 20px 0;
  min-height: 100vh;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.user-card {
  width: 100%;
  max-width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
}

:deep(.v-label) {
  color: black !important;
}

:deep(.v-field__input) {
  color: black !important;
}

:deep(.v-select .v-label) {
  color: black !important;
}

:deep(.v-date-picker .v-label) {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep(input),
:deep(textarea) {
  color: black !important;
}

.form-card {
  width: 100%;
  max-width: 700px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.v-text-field,
.v-select {
  margin: 12px 0;
  background-color: rgba(255, 255, 255, 0.8);
}

.date-pickers {
  display: flex;
  gap: 20px;
  margin: 12px 0;
}

.fee-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.fee-input {
  flex: 1;
}

.currency-select {
  width: 120px;
}

.submit-btn {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .content-container {
    padding: 10px;
  }

  .date-pickers {
    flex-direction: column;
    gap: 10px;
  }

  .fee-container {
    flex-direction: column;
    align-items: stretch;
  }

  .currency-select {
    width: 100%;
  }
}
</style>
