<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import AuthLayout from "@/layouts/AuthLayout.vue";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const errorMessage = ref({username: '', password: '', general: ''});

const login = async ()=> {
  errorMessage.value = {username: '', password: '', general: ''};
  try {
    const response = await  axios.post("v1/auth/login",{
      username: username.value,
      password: password.value,
    });
    const data = response.data?.dataPayload?.data;
    if (data?.token){
      authStore.setUser({username: data.username}, data.token);
      window.location.href = "/";
    }else{
      errorMessage.general.value = "An unexpected error occurred";
    }
  } catch (error) {
    if (error.response && error.response.status === 422 && error.response.data.errorPayload) {
      const errorDetails = error.response.data.errorPayload.errors;
      // console.log("Validation error details:", errorDetails);

      errorMessage.value.username = errorDetails.username || '';
      errorMessage.value.password = errorDetails.password || '';
    }else{
      errorMessage.value.general = "An unexpected error occurred";
    }

  }

}

</script>
<template>
  <AuthLayout>
    <h2>🔐 Welcome Back</h2>
    <p class="subtitle">Enter your credentials to access the dashboard</p>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" placeholder="Enter username" />
        <div v-if="errorMessage.username" class="error">{{ errorMessage.username }}</div>
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Enter password" />
        <div v-if="errorMessage.password" class="error">{{ errorMessage.password }}</div>
      </div>

      <p v-if="errorMessage.general" class="error">{{ errorMessage.general }}</p>

      <button type="submit">Login</button>
    </form>
  </AuthLayout>
</template>

<style scoped>
h2 {
  color: #ffffff;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.subtitle {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.input-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 10px;
  background: #2a2f45;
  color: white;
  transition: 0.3s;
}

input:focus {
  outline: 2px solid #2563eb;
}

button {
  width: 100%;
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
}

button:hover {
  background: #1d4ed8;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>

