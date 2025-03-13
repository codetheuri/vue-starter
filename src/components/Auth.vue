<template>
   <div class="auth-container">
    <h2 v-if="authStore.isAuthenticated">
      Welcome, {{ authStore.user.name }}!
    </h2>
    <button v-if="!authStore.isAuthenticated" @click="authStore.login('John Doe')">
      Login
    </button>
    <button v-if="authStore.isAuthenticated" @click="authStore.logout">
      Logout
    </button>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
</script>
<style>
.auth-container {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  background: #1d7fe0;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px;
  margin: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>