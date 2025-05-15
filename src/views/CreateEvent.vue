<template>
  <div class="background-container">
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn color="white" text @click="snackbar.show = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <div class="page-container">
      <h1 class="create-event-title">Create Event</h1>

      <v-card class="form-card">
        <v-form ref="form" @submit.prevent="submitForm">
          <!-- Poster Upload Section -->
          <div class="form-section">
            <v-card-subtitle class="section-header pb-1 font-weight-bold"
              >Event Poster</v-card-subtitle
            >
            <div class="d-flex flex-column align-center">
              <div class="poster-container">
                <v-img
                  v-if="selectedImage"
                  :src="selectedImage"
                  height="250"
                  cover
                  class="poster-image"
                ></v-img>
                <div v-else class="poster-placeholder">
                  <span>No image selected</span>
                </div>
              </div>
              <v-file-input
                v-model="posterFile"
                accept="image/*"
                label="Upload Poster"
                prepend-icon="mdi-camera"
                @change="onImageChange"
                hide-details
                class="mt-3"
                variant="outlined"
                density="comfortable"
              ></v-file-input>
            </div>
          </div>

          <!-- Basic Information Section -->
          <div class="form-section">
            <v-card class="sections">
              <v-card-subtitle class="section-header pb-4 font-weight-bold"
                >Basic Information</v-card-subtitle
              >
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="event.name"
                    label="Event Name*"
                    placeholder="e.g. Annual Science Fair"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="event.hosts"
                    label="Host Name(s)*"
                    placeholder="e.g. University of Nairobi"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="event.description"
                    label="Description*"
                    placeholder="Detailed description of your event..."
                    variant="outlined"
                    rows="3"
                    auto-grow
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Date & Time Section -->
          <div class="form-section">
            <v-card class="sections">
              <v-card-subtitle class="section-header pb-4 font-weight-bold"
                >Date & Time</v-card-subtitle
              >
              <v-row>
                <v-col cols="12" md="8">
                  <v-dialog
                    ref="startDialog"
                    v-model="startDialog"
                    :close-on-content-click="false"
                    width="auto"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-model="event.startDate"
                        label="Start Date & Time*"
                        readonly
                        v-bind="props"
                        variant="outlined"
                        density="comfortable"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </template>
                    <v-card>
                      <v-date-picker
                        v-model="startDate"
                        @update:model-value="startDialog = false"
                      ></v-date-picker>
                    </v-card>
                  </v-dialog>
                </v-col>
                <v-col cols="12" md="6">
                  <v-dialog
                    ref="endDialog"
                    v-model="endDialog"
                    :close-on-content-click="false"
                    width="auto"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-model="event.endDate"
                        label="End Date & Time*"
                        readonly
                        v-bind="props"
                        variant="outlined"
                        density="comfortable"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </template>
                    <v-card>
                      <v-date-picker
                        v-model="endDate"
                        @update:model-value="endDialog = false"
                      ></v-date-picker>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Event Details Section -->
          <div class="form-section">
            <v-card class="sections">
              <v-card-subtitle class="section-header pb-4 font-weight-bold"
                >Event Details</v-card-subtitle
              >
              <v-row>
                <v-col cols="12" md="8">
                  <v-select
                    v-model="event.participation_mode"
                    :items="platforms"
                    label="Participation Mode*"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="8" v-if="event.participation_mode === 'Physical'">
                  <v-text-field
                    v-model="event.venue"
                    label="Venue*"
                    placeholder="e.g. Main Auditorium"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8" v-if="event.participation_mode === 'Physical'">
                  <v-text-field
                    v-model="event.county"
                    label="County*"
                    placeholder="e.g. Nairobi"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" v-if="event.participation_mode === 'Online'">
                  <v-text-field
                    v-model="event.link"
                    label="Event Link*"
                    type="url"
                    placeholder="https://example.com/event"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Classification Section -->
          <div class="form-section">
            <v-card class="sections">
              <v-card-subtitle class="section-header pb-4 font-weight-bold"
                >Classification</v-card-subtitle
              >
              <v-row>
                <v-col cols="12" md="8">
                  <v-select
                    v-model="event.eventClass"
                    :items="dropDown.eventClass"
                    label="Event Class*"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="8">
                  <v-select
                    v-model="event.level"
                    :items="dropDown.level"
                    label="Level*"
                    variant="outlined"
                    density="comfortable"
                    required
                    @update:model-value="selectedCategory = ''"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="selectedCategory"
                    :items="
                      event.level === 'National'
                        ? dropDown.nationalCategories
                        : dropDown.internationalCategories
                    "
                    label="Category*"
                    variant="outlined"
                    density="comfortable"
                    required
                    @update:model-value="event.subject = ''"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  v-if="selectedCategory === 'Academic' && event.level === 'National'"
                >
                  <v-select
                    v-model="event.subject"
                    :items="dropDown.academicSubjects"
                    label="Subject*"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Capacity & Fees Section -->
          <div class="form-section">
            <v-card class="sections">
              <v-card-subtitle class="section-header pb-4 font-weight-bold"
                >Capacity & Fees</v-card-subtitle
              >
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="event.capacity"
                    type="number"
                    min="1"
                    label="Capacity*"
                    placeholder="Maximum attendees"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="event.registration_fee"
                    type="number"
                    min="0"
                    label="Registration Fee*"
                    placeholder="Amount in selected currency"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8">
                  <v-select
                    v-model="event.currency"
                    :items="dropDown.currency"
                    label="Currency*"
                    variant="outlined"
                    density="comfortable"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <!-- Sponsors Section -->
          <div class="form-section">
            <v-text-field
              v-model="event.sponsors"
              label="Sponsors (comma separated)"
              placeholder="e.g. Company A, Company B, Organization C"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>

          <!-- Form Actions -->
          <div class="d-flex justify-center gap-4 mt-6">
            <v-btn variant="outlined" color="primary" @click="resetForm" :disabled="loading">
              Reset
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              variant="elevated"
              color="primary"
              :loading="loading"
              :disabled="!isFormValid"
            >
              {{ loading ? 'Creating...' : 'Create Event' }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import { useRouter } from 'vue-router'
// import { format } from 'date-fns'

const eventStore = useEventsStore()
const router = useRouter()

// Initialize empty event using store's utility function
const event = ref(eventStore.createEmptyEvent())
const selectedImage = ref(null)
const posterFile = ref(null)
const selectedCategory = ref('')
const loading = ref(false)

// Date picker variables
const startDialog = ref(false)
const endDialog = ref(false)
const startDate = ref(new Date().toISOString().substr(0, 10))
const endDate = ref(new Date().toISOString().substr(0, 10))

// Snackbar state
const snackbar = ref({
  show: false,
  color: 'success',
  message: '',
})

// Form reference
const form = ref(null)

const platforms = ['Online', 'Physical']
const dropDown = {
  eventClass: ['HighSchool', 'University'],
  level: ['National', 'International'],
  nationalCategories: [
    'Academic',
    'Debate',
    'Art',
    'Music and Drama',
    'Research Program',
    'Journalism',
    'Coding',
    'Sports',
    'Workshop and Seminar',
    'Leadership Program',
    'Mentorship Program',
  ],
  internationalCategories: [
    'Olympiad',
    'Debate',
    'STEM Program',
    'Research Program',
    'Summer Program',
    'Coding',
    'Travel Program',
    'Workshop and Seminar',
    'Leadership Program',
    'Mentorship Program',
    'Sports',
    'Art',
  ],
  academicSubjects: [
    'Math',
    'Languages (English, Kiswahili etc)',
    'Science (Biology, Physics, Chemistry)',
    'Technicals (Agriculture, HomeScience etc)',
    'Humanity subject (Geography, History)',
    'Religious Subject (CRE, IRE, Hindu etc)',
  ],
  currency: ['KES', 'USD', 'EUR', 'GBP'],
}

// Format dates for display
// const formattedStartDate = computed(() => {
//   return startDate.value ? format(new Date(startDate.value), 'EEEE, MMMM d, yyyy') : ''
// })

// const formattedEndDate = computed(() => {
//   return endDate.value ? format(new Date(endDate.value), 'EEEE, MMMM d, yyyy') : ''
// })

// Update event dates when datepicker values change

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    event.value.name &&
    event.value.hosts &&
    event.value.description &&
    event.value.startDate &&
    event.value.endDate &&
    event.value.participation_mode &&
    (event.value.participation_mode === 'Online' ? event.value.link : true) &&
    (event.value.participation_mode === 'Physical'
      ? event.value.venue && event.value.county
      : true) &&
    event.value.eventClass &&
    event.value.level &&
    selectedCategory.value &&
    (selectedCategory.value === 'Academic' && event.value.level === 'National'
      ? event.value.subject
      : true) &&
    event.value.capacity > 0 &&
    event.value.registration_fee >= 0 &&
    event.value.currency
  )
})

function onImageChange(files) {
  if (files && files.length > 0) {
    const file = files[0]
    event.value.poster = file
    selectedImage.value = URL.createObjectURL(file)
  } else {
    selectedImage.value = null
  }
}

async function submitForm() {
  if (!isFormValid.value) {
    snackbar.value = {
      show: true,
      color: 'error',
      message: 'Please fill all required fields correctly',
    }
    return
  }

  try {
    loading.value = true

    // Update event dates from datepickers
    event.value.startDate = new Date(startDate.value).toISOString()
    event.value.endDate = new Date(endDate.value).toISOString()

    // Set category from selected category
    event.value.category = selectedCategory.value

    // Create the event using the store
    const createdEvent = await eventStore.createEvent(event.value)

    // Show success message
    snackbar.value = {
      show: true,
      color: 'success',
      message: 'Event created successfully!',
    }

    // Redirect to event details
    setTimeout(() => {
      router.push({ name: 'event-details', params: { id: createdEvent.id } })
    }, 2000)
  } catch (error) {
    console.error('Error creating event:', error)
    snackbar.value = {
      show: true,
      color: 'error',
      message: `Failed to create event: ${error.message || 'Please try again'}`,
    }
  } finally {
    loading.value = false
  }
}

function resetForm() {
  event.value = eventStore.createEmptyEvent()
  selectedImage.value = null
  posterFile.value = null
  selectedCategory.value = ''
  startDate.value = new Date().toISOString().substr(0, 10)
  endDate.value = new Date().toISOString().substr(0, 10)

  // Reset form validation if the form ref exists
  if (form.value) {
    form.value.reset()
  }

  snackbar.value = {
    show: true,
    color: 'info',
    message: 'Form has been reset',
  }
}
</script>

<style scoped>
.background-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-image: url('../assets/math/olympiad.png'), url('../assets/backgrounds/Dancers3.png');
  background-size:
    100% 50%,
    100% 50%;
  background-position: bottom, top;
  background-repeat: no-repeat;
  padding: 40px 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.background-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(
    to right bottom,
    transparent 49%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 51%
  );
  z-index: 1;
  transform: translateY(-50%);
}

.page-container {
  width: 100%;
  max-width: 900px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sections {
  background-color: transparent;
  margin-bottom: 20px;
}

.section-header {
  color: white !important;
  font-size: 1.2rem !important;
}

.create-event-title {
  color: white;
  font-size: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 24px;
  font-weight: bold;
}

.form-card {
  width: 700px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5) !important;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.form-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.form-section:last-child {
  border-bottom: none;
}

.poster-container {
  width: 100%;
  height: 250px;
  border: 2px dashed rgba(255, 255, 255, 0.404);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.03);
  color: rgb(255, 255, 255);
}
</style>
