<!-- SignUp -->

<template>
  <div :style="backgroundStyle" class="image">
    <div class="glass">
      <v-main>
        <v-row justify="center" align="right" class="login-container">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="pa-4 elevation-6 opacity-60" color="black" align="center">
              <v-form @submit.prevent="register" ref="form">
                <v-card-title class="ga-2 text-h5" align="center">
                  <v-icon icon="mdi-robot" size="30px" color="lime-darken-4"></v-icon> Funkies 254
                </v-card-title>
                <v-card-subtitle align="center" class="text-h4"> Welcome !</v-card-subtitle><br />

                <v-text class="text-center"> Kindly enter your details below </v-text><br />

                <v-text>
                  Already have an account?
                  <router-link to="/login" variant="text" color="teal darken-1">
                    Login
                  </router-link> </v-text
                ><br />

                <v-alert v-if="errorMessage" type="error" class="mb-4">{{ errorMessage }}</v-alert>

                <v-card align="left" class="opacity-60" color="black">
                  <v-label>Fullname</v-label>
                  <v-text-field
                    v-model="name"
                    label="name"
                    prepend-inner-icon="mdi-account"
                    :rules="[(v) => !!v || 'Name is required']"
                    outlined
                    dense
                    required
                  ></v-text-field>

                  <v-label>Email</v-label>
                  <v-text-field
                    v-model="email"
                    :rules="[
                      (v) => !!v || 'Email is required',
                      (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                    ]"
                    label="email"
                    prepend-inner-icon="mdi-email"
                    outlined
                    dense
                    required
                    autocomplete="off"
                  ></v-text-field>

                  <v-label>Password</v-label>
                  <v-text-field
                    v-model="password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) => v.length >= 8 || 'Password must be at least 8 characters',
                    ]"
                    :type="showPassword ? 'text' : 'password'"
                    label="password"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                    outlined
                    dense
                    required
                    autocomplete="new-password"
                  ></v-text-field>

                  <v-label>Confirm Password</v-label>
                  <v-text-field
                    v-model="password_confirmation"
                    :rules="[
                      (v) => !!v || 'Please confirm your password',
                      (v) => v === password || 'Passwords must match',
                    ]"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="re-type password"
                    prepend-inner-icon="mdi-lock-check"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showConfirmPassword = !showPassword"
                    outlined
                    dense
                    required
                    autocomplete="new-password"
                  ></v-text-field>
                </v-card>

                <div class="mt-4">
                  <v-file-input
                    v-model="userPhoto"
                    :rules="[(v) => !!v || 'Profile picture is required']"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Upload your profile picture"
                    prepend-icon="mdi-camera"
                    label="Profile Picture"
                    show-size
                    counter
                    outlined
                    dense
                  ></v-file-input>
                </div>

                <v-btn
                  align="center"
                  rounded="lg"
                  width="120px"
                  height="50px"
                  padding="10px"
                  class="text-h4"
                  image="../assets/backgrounds/AfricanPattern.png"
                  @click="register"
                  type="submit"
                  :loading="loading"
                >
                  SignUp </v-btn
                ><br /><br />

                <v-card align="center" justify="center" color="black" class="opacity-60">
                  <v-btn variant="plain">
                    <v-icon
                      color="white"
                      class="opacity-100"
                      size="30px"
                      icon="mdi-twitter"
                    ></v-icon>
                  </v-btn>
                  <v-btn variant="plain">
                    <v-icon size="30px" icon="mdi-instagram"></v-icon>
                  </v-btn>
                  <v-btn variant="plain">
                    <v-icon size="30px" icon="mdi-facebook"></v-icon>
                  </v-btn>
                </v-card>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from '../assets/Backgrounds/Dancers3.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = ref(null)
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const userPhoto = ref(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// Define the API base URL - adjust this as needed
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const register = async () => {
  const { valid } = await form.value.validate()

  console.log('Form is valid:', valid)

  if (!valid) {
    errorMessage.value = 'Please fill out all required fields correctly.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('password', password.value)
  formData.append('password_confirmation', password_confirmation.value)

  if (userPhoto.value) {
    formData.append('user_photo', userPhoto.value)
  }

  // Log the form data to check the payload
  console.log([...formData.entries()])

  try {
    // Updated endpoint path - adjust based on your actual Laravel routes
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Response:', response.data)

    // Store token in localStorage
    localStorage.setItem('auth-token', response.data.token)

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Navigate to welcome page
    router.push('/welcome')
  } catch (error) {
    console.error('Registration error:', error)

    if (error.response) {
      if (error.response.data.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)
        errorMessage.value = firstError
      } else {
        errorMessage.value = error.response.data.message || 'Registration failed. Please try again.'
      }
    } else if (error.request) {
      errorMessage.value = 'No response from server. Please check your connection or server status.'
    } else {
      errorMessage.value = 'Network error. Please check your connection.'
    }
  } finally {
    loading.value = false
  }
}

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
  top: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
</script>

<style>
.glass {
  background: rgba(16, 16, 48, 0.452);
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
