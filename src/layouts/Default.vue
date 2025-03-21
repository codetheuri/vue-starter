<template>
  <div class="app-layout" :class="{ 'sidebar-open': sidebarOpen }">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- Sidebar Toggle Button -->
        <button class="sidebar-toggle-btn" @click="toggleSidebar">
          <i class="bi bi-list"></i>
        </button>

        <router-link class="navbar-brand fw-bold" to="/">
          <i class="bi bi-lightning-charge"></i> My Vue App
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/food">Food</router-link>
            </li>
            <li>
              <button class="btn btn-danger" @click="authStore.logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <Sidebar ref="sidebarRef" :isOpen="sidebarOpen" @toggle="toggleSidebar" />

    <!-- Main Content -->
    <div class="content">
      <slot></slot>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "@/layouts/Sidebar.vue";
import Footer from "./Footer.vue";
import { useAuthStore } from "@/store/authStore";

const sidebarRef = ref(null);
const authStore = useAuthStore();
const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>
/* Layout Container */
.app-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  transition: margin-left 0.3s ease-in-out;
}

/* Fixed Navbar */
.navbar {
  position: fixed;
  width: 100%;
  z-index: 1002;
  background: #010911 !important;
  padding: 5px 15px;
}

/* Sidebar Toggle Button */
.sidebar-toggle-btn {
  /* position: fixed; */
  left: 10px;
  top: 10px;
  right: auto;
  z-index: 1003;
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

/* Main Content */
.content {
  flex-grow: 1;
  padding: 50px;
  transition: margin-left 0.3s ease-in-out;
}

/* When Sidebar is Open, shift the content */
.app-layout.sidebar-open .content {
  margin-left: 220px;
}
</style>
