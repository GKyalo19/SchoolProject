// roles.js (Composition API version)
import { defineStore } from 'pinia';
import { ref} from 'vue';
import api from '../services/api';

export const useRolesStore = defineStore('roles', () => {
  // State as refs
  const roles = ref([]);
  const dialog = ref(false);
  const dialogDelete = ref(false);
  const editedIndex = ref(-1);
  const editedItem = ref({
    id: '',
    name: '',
    slug: '',
    description: '',
  });
  const defaultItem = {
    id: '',
    name: '',
    slug: '',
    description: '',
  };
  const itemToDelete = ref(null);

  // Actions
  async function fetchRoles() {
    try {
      const response = await api.get('role');
      // Transform the data to include a key property for v-data-table actions
      roles.value = response.data.map(role => ({
        ...role,
        key: role.id
      }));
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  }

  async function createRole(role) {
    try {
      const response = await api.post('role', role);
      // Add key property for v-data-table actions
      const newRole = { ...response.data, key: response.data.id };
      roles.value.push(newRole);
      return true;
    } catch (error) {
      console.error('Error creating role', error);
      return false;
    }
  }

  async function updateRole(role) {
    try {
      await api.put(`role/${role.id}`, role);
      const index = roles.value.findIndex((loc) => loc.id === role.id);
      if (index !== -1) {
        // Preserve the key property
        const key = roles.value[index].key;
        roles.value[index] = { ...role, key };
      }
      return true;
    } catch (error) {
      console.error('Error updating role', error);
      return false;
    }
  }

  function deleteRole(id) {
    itemToDelete.value = id;
    dialogDelete.value = true;
  }

  async function deleteRoleConfirm() {
    try {
      await api.delete(`role/${itemToDelete.value}`);
      roles.value = roles.value.filter((loc) => loc.id !== itemToDelete.value);
      return true;
    } catch (error) {
      console.error('Error deleting role', error);
      return false;
    } finally {
      closeDelete();
    }
  }

  function openDialog() {
    editedIndex.value = -1;
    editedItem.value = { ...defaultItem };
    dialog.value = true;
  }

  async function editItem(id) {
    try {
      console.log("Item to edit is ", id);
      const response = await api.get(`role/${id}`);
      editedIndex.value = roles.value.findIndex(loc => loc.id === id);
      editedItem.value = { ...response.data[0] };
      dialog.value = true;
    } catch (error) {
      console.error('Error fetching item for pre-update', error);
    }
  }

  function close() {
    dialog.value = false;
    // Reset the edited item after closing the dialog
    setTimeout(() => {
      editedItem.value = { ...defaultItem };
      editedIndex.value = -1;
    }, 0);
  }

  function closeDelete() {
    dialogDelete.value = false;
    setTimeout(() => {
      itemToDelete.value = null;
    }, 0);
  }

  function initialize() {
    fetchRoles();
  }

  // Return the state and actions
  return {
    // State
    roles,
    dialog,
    dialogDelete,
    editedIndex,
    editedItem,
    itemToDelete,

    // Actions
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    deleteRoleConfirm,
    openDialog,
    editItem,
    close,
    closeDelete,
    initialize
  };
});




