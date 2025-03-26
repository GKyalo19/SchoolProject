<template>
  <div :style="backgroundStyle" class="image">
    <div class="glass">
      <v-main>
        <v-row justify="center" align="right" class="login-container">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="pa-4 elevation-6 opacity-60" color="white" align="center">
              <v-form @submit.prevent ref="form">
                <v-card-title class="ga-2 text-h5" align="center">
                  <v-icon icon="mdi-robot" size="30px" color="lime-darken-4"></v-icon> Funkies 254
                </v-card-title>
                <v-card-subtitle align="center" class="text-h4"> Welcome !</v-card-subtitle><br />

                <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

                <v-text>
                  Don't have an account yet?
                  <v-btn variant="plain" :to="'/signup'" class="text-h6" text-color="Purple"
                    >SignUp</v-btn
                  > </v-text
                ><br /><br />
                <v-text class="text-center">
                  Already registered? Enter your login credentials </v-text
                ><br /><br />

                <v-card align="left" class="opacity-60" color="black">
                  <v-label>Email</v-label>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="email"
                    prepend-inner-icon="mdi-email"
                    required
                  ></v-text-field>

                  <v-label>Password</v-label>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    label="password"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                    required
                  ></v-text-field>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <v-checkbox
                      v-model="rememberMe"
                      label="Remember me"
                      color="teal darken-2"
                      hide-details
                      dense
                    ></v-checkbox>
                  </div>
                </v-card>

                <v-btn
                  align="center"
                  rounded="lg"
                  width="120px"
                  height="50px"
                  padding="10px"
                  class="text-h4"
                  image="../assets/backgrounds/AfricanPattern.png"
                  type="submit"
                  :loading="loading"
                  @click="handleLogin"
                >
                  Login </v-btn
                ><br />

                <v-text>
                  Forgot Password?
                  <v-btn
                    variant="text"
                    color="teal darken-1"
                    :to="'/forgot-password'"
                    class="text-h6"
                  >
                    Reset
                  </v-btn> </v-text
                ><br />

                <v-card align="center" justify="center" color="black" class="opacity-60">
                  <v-btn variant="plain">
                    <v-icon
                      color="white"
                      class="opacity-100"
                      size="30px"
                      icon="mdi-twitter"
                      href="twitter.com"
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
import backgroundImage from '../assets/backgrounds/Dancers3.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth.service'

const router = useRouter()
const { login, loading, error } = useAuth()

// Form fields
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const form = ref(null)

// Validation rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [(v) => !!v || 'Password is required']

// Login handler with form validation
async function handleLogin() {
  // Validate form before submission
  //const isValid = form.value?.validate()

  //if (!isValid) {
  // return
  //}
  console.log('>>>>>>>Login Function')

  if (!email.value || !password.value) {
    console.error('Email and password are required')
    return
  }

  try {
    const user = await login({
      email: email.value,
      password: password.value,
    })

    //Store user data in localStorage if "Remember Me" is checked
    if (rememberMe.value && user) {
      localStorage.setItem('user', JSON.stringify(user)) //store it as a string
    }

    // Redirect after successful login
    router.push('/')
  } catch (err) {
    // Error is already handled by the auth service
    console.error('Login failed', err)
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

<style scoped>
.glass {
  background: rgba(16, 16, 48, 0.651);
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
