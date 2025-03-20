<template>
  <div class="app-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- Sidebar Toggle Button -->
        <button class="sidebar-toggle-btn" @click="openSidebar">
          <i class="bi bi-list"></i>
        </button>

        <router-link class="navbar-brand fw-bold" to="/">
          <i class="bi bi-lightning-charge"></i>     My Vue App
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
    <Sidebar ref="sidebarRef" />

    <!-- Main Content -->
    <div class="content">
      <slot></slot>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Sidebar from "@/layouts/Sidebar.vue";
import Footer from "./Footer.vue";
import { useAuthStore } from "@/store/authStore";

const sidebarRef = ref(null);
const authStore = useAuthStore();
const sidebarOpen = ref(false);

function openSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar();
  }
}

/* Ensure Sidebar Button Resets Correctly */
watch(authStore, () => {
  sidebarOpen.value = false; // Reset sidebar state when logging in/out
});
</script>


<!-- <script setup>
import { ref } from "vue";
import Sidebar from "@/layouts/Sidebar.vue";
import Footer from "./Footer.vue";
import { useAuthStore } from "@/store/authStore";

const sidebarRef = ref(null);
const authStore = useAuthStore();

const openSidebar = () => {
  sidebarRef.value.toggleSidebar();
};
</script> -->

<style scoped>
/* Main Layout */
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Fixed Navbar */
.navbar {
  position: fixed;
  width: 100%;
  z-index: 1002;
  background: #010911 !important;
  padding: 5px 15px;
  transition: margin-left 0.3s ease-in-out;
}

/* Content Adjustments */
.content {
  margin-top: 56px;
  padding: 20px;
  flex-grow: 1;
  transition: margin-left 0.3s ease-in-out;
}
.sidebar-toggle-btn {
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 1003; /* Ensure it's above the sidebar */
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
/* When Sidebar is Open */
.sidebar.open + .content {
  margin-left: 200px; /* Shift content when sidebar is open */
}

/* Make Footer Thinner */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #010911;
  color: white;
  text-align: center;
  padding: 4px 0; /* Reduced padding to make it thin */
  font-size: 12px;
}
</style>
