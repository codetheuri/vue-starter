<template>
  <div class="app-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <button class="btn btn-light me-2" @click="openSidebar">
          <i class="bi bi-list"></i>
        </button>
        <router-link class="navbar-brand fw-bold" to="/">
          <i class="bi bi-lightning-charge"></i> My Vue App
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
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
    <Footer/>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "@/layouts/Sidebar.vue";
import Footer from "./Footer.vue";
import { useAuthStore } from "@/store/authStore";
const sidebarRef = ref(null);
const authStore = useAuthStore();

function openSidebar() {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar();
  }
}
</script>

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
  z-index: 1000;
}

/* Content */
.content {
  margin-top: 56px;
  padding: 20px;
  flex-grow: 1;
}

/* Footer */

</style>
