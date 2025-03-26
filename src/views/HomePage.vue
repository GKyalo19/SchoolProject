<template>
  <div :style="backgroundStyle" class="image">
    <div class="glass">
      <v-main>
        <v-container fill-height class="bigbox" color="transparent">
          <v-row align-self="center">
            <v-col align-self="center">
              <v-card color="transparent" align-self="center">
                <div class="firstCard">
                  <h1>Funkies 254</h1>
                  <v-text-field
                    v-model="searchQuery"
                    placeholder="Search any event..."
                    outlined
                    dense
                    class="ma-2"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    color="white"
                  ></v-text-field>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </div>

  <PageFooter />
</template>

<script setup>
import backgroundImage from '../assets/backgrounds/Dancers2.png'

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
</script>

<style>
.glass {
  background: rgba(0, 0, 0, 0.767);
  padding: 20px;
  width: 100%;
  height: 100%;
}
.bigbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
.firstCard {
  background-color: rgba(0, 0, 0, 0.822);
  height: 250px;
  width: 600px;
  border-radius: 30px;
  padding: 20px;
  padding-bottom: 30px;
  margin-bottom: 100px;
  align-content: center;
  justify-content: center;
  place-items: center;
}
h1 {
  font-family: serif;
  color: white;
  font-size: 5rem;
}
.v-text-field {
  color: white;
  height: 3rem;
  width: 500px;
}
</style>
