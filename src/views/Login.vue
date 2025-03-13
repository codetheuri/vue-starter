<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Login</button>
            <p v-if="authStore.errorMessage" class="error">{{ authStore.errorMessage }}</p>

        </form>

    </div>
</template>
<script setup>
import {ref} from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const login = async ()=>{
    const success= await authStore.login(username.value,password.value);
    if(success){
        router.push('/dashboard');
    }
}
</script>
<style>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>