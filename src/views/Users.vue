<script setup>
import { ref, onMounted } from 'vue'
import Default from '@/layouts/Default.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const users = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchUsers = async () => {
  try {
    loading.value = true;

    if (!route.params.id) {
      throw new Error("User ID not provided!");
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${route.params.id}`);
    if (!response.ok) throw new Error("Failed to fetch data");

    users.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);

const refresh = () => {
  fetchUsers();
};
</script>

<template>
  <Default>
    <h2>👥 User Dashboard</h2>
    <nav>
      <router-link :to="`/users/${route.params.id}/profile`">User Details</router-link> |
      <router-link :to="`/users/${route.params.id}/settings`">User Settings</router-link>
    </nav>
    <RouterView />

    <div>
      <h2> Users</h2>
      <p v-if="loading">Loading.....</p>
      <p v-if="error" class="error"> {{ error }}</p>  
      <ul v-if="users">
        <li>
          {{ users.name }} 
        </li>
      </ul>
    </div>

    <div>
      <button @click="refresh">Refresh</button>
    </div>
  </Default>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
