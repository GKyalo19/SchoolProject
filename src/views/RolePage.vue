<template>
  <v-main>
    <v-container fluid>
    <v-toolbar flat :color="toolbarColor">
      <v-toolbar-title>Roles</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="rolesStore.openDialog"> New Role </v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="roles" :items-per-page="10" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.id)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="rolesStore.dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="rolesStore.editedItem.name"
                  label="Role name"
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="rolesStore.editedItem.slug" label="Slug"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="rolesStore.editedItem.description"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="rolesStore.close"> Cancel </v-btn>
          <v-btn color="blue-darken-1" text @click="save" :disabled="isSaveDisabled"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="rolesStore.dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this role?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="rolesStore.closeDelete"> Cancel </v-btn>
          <v-btn color="red-darken-1" text @click="deleteItemConfirm"> OK </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbars -->
    <v-snackbar v-model="snackbarCreate" :timeout="snackbarTimeout" color="success">
      Role was created successfully
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarCreate = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="snackbarUpdate" :timeout="snackbarTimeout" color="warning">
      Role was updated successfully
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarUpdate = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="snackbarDelete" :timeout="snackbarTimeout" color="error">
      Role was deleted successfully
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarDelete = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRolesStore } from '../stores/roles'
import { useColorsStore } from '../stores/colors'

// Store access
const rolesStore = useRolesStore()
const colorsStore = useColorsStore()

// UI state
const snackbarCreate = ref(false)
const snackbarUpdate = ref(false)
const snackbarDelete = ref(false)
const toolbarColor = ref('info')
const snackbarTimeout = 3000

// Table configuration
const headers = [
  { title: 'ID', key: 'id', align: 'start' },
  { title: 'Role Name', align: 'start', sortable: true, key: 'name' },
  { title: 'Slug', align: 'start', sortable: true, key: 'slug' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// Computed properties
const roles = computed(() => rolesStore.roles)
const inputRules = computed(() => [
  (v) => (!!v && v.length >= 3) || 'Minimum length is 3 characters',
])
const formTitle = computed(() => (rolesStore.editedIndex === -1 ? 'New Role' : 'Edit Role'))
const isSaveDisabled = computed(() => {
  return !inputRules.value[0](rolesStore.editedItem.name)
})

// Actions
async function save() {
  if (rolesStore.editedIndex > -1) {
    await rolesStore.updateRole(rolesStore.editedItem)
    snackbarUpdate.value = true
    toolbarColor.value = 'warning'
    colorsStore.setFooterColor('warning')
    setTimeout(() => {
      snackbarUpdate.value = false
      toolbarColor.value = 'info'
      colorsStore.setFooterColor('info')
    }, snackbarTimeout)
  } else {
    await rolesStore.createRole(rolesStore.editedItem)
    snackbarCreate.value = true
    toolbarColor.value = 'success'
    colorsStore.setFooterColor('success')
    setTimeout(() => {
      snackbarCreate.value = false
      toolbarColor.value = 'info'
      colorsStore.setFooterColor('info')
    }, snackbarTimeout)
  }
  rolesStore.close()
}

function editItem(id) {
  rolesStore.editItem(id)
}

function deleteItem(id) {
  rolesStore.deleteRole(id)
}

function deleteItemConfirm() {
  rolesStore.deleteRoleConfirm()
  snackbarDelete.value = true
  toolbarColor.value = 'danger'
  colorsStore.setFooterColor('danger')
  setTimeout(() => {
    snackbarDelete.value = false
    toolbarColor.value = 'info'
    colorsStore.setFooterColor('info')
  }, snackbarTimeout)
}

// Lifecycle hook
onMounted(() => {
  rolesStore.fetchRoles()
})
</script>
