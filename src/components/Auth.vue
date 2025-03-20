<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");

const handleLogin = () => {
  authStore.login(username.value, password.value);
};
</script>

<template>
  <div class="login-form">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
    <p v-if="authStore.errorMessage" class="error">{{ authStore.errorMessage }}</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
