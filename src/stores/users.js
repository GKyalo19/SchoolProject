import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([]);
  const currentUser = ref(null);
  const dialog = ref(false);
  const dialogDelete = ref(false);
  const editedIndex = ref(-1);
  const editedItem = ref({
    id: '',
    name: '',
    email: '',
    password: '',
    user_photo: null,
    role_id: '',
    is_active: true
  });
  const defaultItem = {
    id: '',
    name: '',
    email: '',
    password: '',
    user_photo: null,
    role_id: '',
    is_active: true
  };
  const itemToDelete = ref(null);

  // Actions
  async function fetchUsers() {
    try {
      const response = await api.get('user');
      users.value = response.data.map(user => ({
        ...user,
        key: user.id,
        // Ensure photo URL is properly formatted
        user_photo_url: user.user_photo ? `/storage/${user.user_photo}` : '/images/default-avatar.png'
      }));
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  async function fetchCurrentUser() {
    try {
      const response = await api.get('api/user'); // Adjust endpoint as needed
      currentUser.value = {
        ...response.data,
        user_photo_url: response.data.user_photo ? `/storage/${response.data.user_photo}` : '/images/default-avatar.png'
      };
    } catch (error) {
      console.error('Error fetching current user', error);
    }
  }

  async function createUser(userData) {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (key === 'user_photo' && userData[key]) {
          formData.append('user_photo', userData[key]);
        } else if (key !== 'user_photo') {
          formData.append(key, userData[key]);
        }
      });

      const response = await api.post('user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newUser = {
        ...response.data,
        key: response.data.id,
        user_photo_url: response.data.user_photo ? `/storage/${response.data.user_photo}` : '/images/default-avatar.png'
      };
      users.value.push(newUser);
      return true;
    } catch (error) {
      console.error('Error creating user', error);
      return false;
    }
  }

  async function updateUser(user) {
    try {
      const formData = new FormData();
      Object.keys(user).forEach(key => {
        if (key === 'user_photo' && user[key]) {
          formData.append('user_photo', user[key]);
        } else if (key !== 'user_photo' && user[key] !== null) {
          formData.append(key, user[key]);
        }
      });

      await api.post(`user/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        const key = users.value[index].key;
        users.value[index] = {
          ...user,
          key,
          user_photo_url: user.user_photo ? URL.createObjectURL(user.user_photo) : users.value[index].user_photo_url
        };
      }
      return true;
    } catch (error) {
      console.error('Error updating user', error);
      return false;
    }
  }

  function deleteUser(id) {
    itemToDelete.value = id;
    dialogDelete.value = true;
  }

  async function deleteUserConfirm() {
    try {
      await api.delete(`user/${itemToDelete.value}`);
      users.value = users.value.filter(user => user.id !== itemToDelete.value);
      return true;
    } catch (error) {
      console.error('Error deleting user', error);
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
      const response = await api.get(`user/${id}`);
      editedIndex.value = users.value.findIndex(user => user.id === id);
      editedItem.value = {
        ...response.data,
        user_photo: null // Don't preload the file, just use the URL
      };
      dialog.value = true;
    } catch (error) {
      console.error('Error fetching user for edit', error);
    }
  }

  function close() {
    dialog.value = false;
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
    fetchUsers();
    fetchCurrentUser(); // Load current user data when store initializes
  }

  return {
    // State
    users,
    currentUser,
    dialog,
    dialogDelete,
    editedIndex,
    editedItem,
    itemToDelete,

    // Actions
    fetchUsers,
    fetchCurrentUser,
    createUser,
    updateUser,
    deleteUser,
    deleteUserConfirm,
    openDialog,
    editItem,
    close,
    closeDelete,
    initialize
  };
});
