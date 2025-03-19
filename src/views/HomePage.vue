<template>
  <div :style="backgroundStyle" class="image">
    <div class="glass">
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" v-for="item in orderItems" :key="item">
              <v-card color="yellow">
                <v-card-item>
                  <v-card-title>{{ item.name }}</v-card-title>

                  <v-card-subtitle>{{ item.description }}</v-card-subtitle>
                </v-card-item>
                <v-img height="200px" :src="item.image" cover></v-img>

                <v-card-text>{{ item.price }}</v-card-text>

                <v-card-actions>
                  <v-btn color="black" variant="tonal" @click="removeFromOrder(item)">
                    Remove</v-btn
                  >
                </v-card-actions>
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
import backgroundImage from '../assets/Backgrounds/Dancers2.png'

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
  background: rgba(16, 16, 48, 0.452);
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
