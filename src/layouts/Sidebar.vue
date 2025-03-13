<template>
    <div :class="['sidebar', { open: isSidebarOpen }]">
      <button class="btn btn-outline-light close-btn" @click="toggleSidebar">
        <i class="bi bi-x-lg"></i>
      </button>
      <ul class="list-unstyled mt-4">
        <li>
          <router-link class="sidebar-link" to="/home">
            <i class="bi bi-house-door"></i> Home
          </router-link>
        </li>
        <li>
          <router-link class="sidebar-link" to="/about">
            <i class="bi bi-info-circle"></i> About
          </router-link>
        </li>
        <li>
          <router-link class="sidebar-link" to="/food">
            <i class="bi bi-egg-fried"></i> Food
          </router-link>
        </li>
        <li>
          <router-link class="sidebar-link" to="/props">
            <i class="bi bi-danger=circle"></i> props
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";

  
  const isSidebarOpen = ref(false);
  
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
  
  // Expose the function so the parent can call it
  defineExpose({ toggleSidebar });
  </script>
  
  <style scoped>
  /* Sidebar Styles */
  .sidebar {
    position: fixed;
    left: -250px;
    top: 0;
    width: 250px;
    height: 100%;
    background: #343a40;
    color: white;
    padding: 20px;
    transition: left 0.3s ease-in-out;
    z-index: 999;
  }
  
  .sidebar.open {
    left: 0;
  }
  
  .sidebar-link {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px;
    font-size: 18px;
  }
  
  .sidebar-link:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  /* Sidebar Close Button */
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  </style>
  