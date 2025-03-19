<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title> Welcome User </v-card-title>
            <v-btn :to="RolePage"> </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import RolePage from './RolePage.vue'
</script>
