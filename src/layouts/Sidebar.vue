<template>
  <div :class="['sidebar', { open: isOpen }]">
    <button class="btn btn-outline-light close-btn" @click="$emit('toggle')">
      <i class="bi bi-x-lg"></i>
    </button>

    <ul class="list-unstyled mt-4">
      <!-- 🔻 Dropdown for Vue Concepts -->
      <li>
        <button class="sidebar-link dropdown-btn" @click="toggleDropdown">
          <i class="bi bi-book"></i> Vue Topics
          <i :class="['bi', isDropdownOpen ? 'bi-caret-down-fill' : 'bi-caret-right-fill']"></i>
        </button>

        <ul v-if="isDropdownOpen" class="dropdown-list">
          <li>
            <router-link class="sidebar-link" to="/props">
              <i class="bi bi-arrow-right-circle"></i> Props
            </router-link>
          </li>
          <li>
            <router-link class="sidebar-link" to="/emit">
              <i class="bi bi-arrow-right-circle"></i> Emit
            </router-link>
          </li>
          <li>
            <router-link class="sidebar-link" to="/computed">
              <i class="bi bi-arrow-right-circle"></i> Computed
            </router-link>
          </li>
          <li>
            <router-link class="sidebar-link" to="/watch">
              <i class="bi bi-arrow-right-circle"></i> Watch
            </router-link>
          </li>
          <li>
            <router-link class="sidebar-link" to="/mount">
              <i class="bi bi-arrow-right-circle"></i> onMounted
            </router-link>
          </li>
          <li>
            <router-link class="sidebar-link" to="/users/2">
              <i class="bi bi-arrow-right-circle"></i> API Fetch (Users)
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link class="sidebar-link" to="/banners">
          <i class="bi bi-arrow-right-book"></i> Banners
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const isDropdownOpen = ref(true);
const props = defineProps({
  isOpen: Boolean,
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 220px;
  height: 100%;
  background: #010911;
  color: white;
  padding: 15px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 999;
}

/* Sidebar Open */
.sidebar.open {
  transform: translateX(0);
}

/* Sidebar Links */
.sidebar-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 16px;
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Dropdown Button */
.dropdown-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.dropdown-list {
  padding-left: 15px;
  margin-top: 5px;
}

/* Sidebar Close Button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Icons */
.bi {
  font-size: 14px;
}
</style>
