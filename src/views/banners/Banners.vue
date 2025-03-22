<template>
  <Default>
    <div class="banners-list">
      <h2> Banners</h2>
      <!-- <button @click="$router.push('/banners/add')" class="add-btn">
      Add Banner
    </button> -->


    <button @click="openModal" class="add-btn">Add Banner</button>
    <BannersModal :isOpen="isModalOpen" @close="closeModal" @bannerAdded="fetchBanners" />


    <!-- Modal Component -->
    <!-- <BannersModal :isOpen="isModalOpen" @close="closeModal" /> -->
  
      <BaseTable
        :data="banners"
        :columns="columns"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :searchable="true"
        @update:search="fetchBanners"
        @page-change="fetchBanners"
      >
        <!-- Custom column slot for images -->
        <template #image_url="{ row }">
          <!-- <img :src="row.image_url" alt="Banner Image" class="banner-img" /> -->
          <img v-if="row.image_url" :src="getImageUrl(row.image_url)" alt="Banner Image" class="banner-img" />
        </template>

        <!-- Actions column -->
        <template #actions="{ row }">
          <button @click="editBanner(row.id)">✏️ Edit</button>
          <button @click="deleteBanner(row.id)">🗑️ Delete</button>
        </template>
      </BaseTable>
    </div>
  </Default>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BaseTable from "@/components/BaseTable.vue";
import Default from "@/layouts/Default.vue";
import { useRouter } from "vue-router";
import BannersModal from "@/components/BannersModal.vue";
const router  = useRouter();
const banners = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isModalOpen = ref(false);
function openModal() {
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "title", label: "Title", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "image_url", label: "Image", sortable: false },
];

async function fetchBanners(page = 1, search = "") {
  currentPage.value = page;
  try {
    const response = await axios.get("v1/library/banners", {
      params: {
        page,
        per_page: 10,
        _search: search,
      },
    });
    banners.value = response.data.dataPayload.data;
    totalPages.value = response.data.dataPayload.totalPages;
    // closeModal();
  } catch (error) {
    console.error("🚨 Error fetching banners:", error);
  }
}

function editBanner(id) {
  alert(`Editing banner with ID: ${id} (🚧 Feature coming soon!)`);
}

function deleteBanner(id) {
  alert(`Deleting banner with ID: ${id} (🗑️ We'll handle deletion later!)`);
}

onMounted(() => {
  fetchBanners();
});
const getImageUrl = (imagePath) => {
  if (imagePath.startsWith("http")) {
    return imagePath; // Already a full URL
  }
  return `http://localhost/${imagePath}`;
};
</script>

<style scoped>
.banners-list {
  padding: 20px;
  font-family: 'Times New Roman', Times, serif;
  color: black;
}

.banner-img {
  width: 100px;
  height: auto;
  border-radius: 5px;
}
.add-btn {
  background: #274bc1;

  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}

.add-btn:hover {
  background:#10ac84;
}
</style>
