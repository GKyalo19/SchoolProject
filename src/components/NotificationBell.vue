<template>
    <div class="relative">
        <!-- Bell Icon -->
        <button @click="toggleNotifications" class="relative p-2">
            <span class="material-icons text-gray-600">notifications</span>
            <span v-if="unreadCount > 0"
                class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
                {{ unreadCount }}
            </span>
        </button>

        <!-- Dropdown -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
            <h3 class="text-sm font-semibold mb-2">Notifications</h3>
            <ul v-if="notifications.length > 0">
                <li v-for="notification in notifications" :key="notification.id"
                    class="p-2 border-b cursor-pointer hover:bg-gray-100"
                    @click="goToNotificationsPage">
                    {{ notification.data.message }}
                </li>
            </ul>
            <p v-else class="text-sm text-gray-500">No new notifications</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const notifications = ref([]);
const unreadCount = ref(0);
const showDropdown = ref(false);

// Fetch notifications from the backend
const fetchNotifications = async () => {
    try {
        const response = await axios.get("/api/notifications");
        notifications.value = response.data;
        unreadCount.value = notifications.value.filter(n => !n.read_at).length;
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
};

// Mark notifications as read when dropdown opens
const toggleNotifications = async () => {
    showDropdown.value = !showDropdown.value;

    if (showDropdown.value && unreadCount.value > 0) {
        try {
            await axios.post("/api/notifications/mark-as-read");
            notifications.value.forEach(n => (n.read_at = true));
            unreadCount.value = 0;
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    }
};

// Navigate to full notifications page
const goToNotificationsPage = () => {
    router.push("/notifications");
};

// Fetch notifications when the component is mounted
onMounted(fetchNotifications);
</script>

<style scoped>
.material-icons {
    font-size: 24px;
}
</style>
