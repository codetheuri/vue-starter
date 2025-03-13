<template>
    <Default>
    <div class="dashboard">
      <h2>Welcome to your Dashboard, {{ authStore.user?.name }}</h2>
     
    </div>
    </Default>
  </template>
  
  <script setup>
  import { useAuthStore } from "../store/authStore";
  import Default from "../layouts/Default.vue";
  
  const authStore = useAuthStore();
  </script>
  
  
  