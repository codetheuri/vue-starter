<template>
  <Default>
    <div class="banners-list">
      <h2> Banners</h2>
      <!-- <button @click="$router.push('/banners/add')" class="add-btn">
      Add Banner
    </button> -->


  
    <BannersModal 
    
    :isOpen="isModalOpen" 
    :isEditing="isEditing"
    :bannerData="selectedBanner"
    @close="closeModal"
     @bannerAdded="fetchBanners" 
     />
     <div class="search-and-add">
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
    
       @input="fetchBanners"
         @update:search="fetchBanners"
      placeholder="Search..."
      class="search-input"
    />
  </div>
  <!-- page selector -->
   <div class="items-per-page">
    <label for="perPage">Show:</label>
     <select id="perPage" v-model="perPage" @change="fetchBanners(currentPage)">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
    <span>entries</span>
   </div>
  <button @click="openModal" class="add-btn">Add Banner</button>
</div>


    <!-- Modal Component -->
    <!-- <BannersModal :isOpen="isModalOpen" @close="closeModal" /> -->

      <BaseTable
        :data="banners"
        :columns="columns"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :searchable="false"
        :pagenation="true"
        :columnwidth="{
          id: '50px',
          title: '300px',
          description: '500px',
          image_url: '200px',
         
        }"
        @update:search="fetchBanners"
        @page-change="fetchBanners"
        @bannerDeleted="fetchBanners"
      >
    
        <!-- Custom column slot for images -->
        <template #image_url="{ row }">
          <!-- <img :src="row.image_url" alt="Banner Image" class="banner-img" /> -->
          <img v-if="row.image_url" :src="getImageUrl(row.image_url)" alt="Banner Image" class="banner-img" />
        </template>

        <!-- Actions column -->
        <template #actions="{ row }" style="width: 100px;">
          <button @click="editBanner(row)" class="action-btn">    <font-awesome-icon icon="pen-to-square" /></button>
          &nbsp;
          &nbsp;
          
          <button @click="deleteBanner(row.id)" class="delete-btn">  
          <font-awesome-icon icon="trash" />
          </button>
        </template>
      </BaseTable>


  
    </div>
  </Default>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import BaseTable from "@/components/BaseTable.vue";
import Default from "@/layouts/Default.vue";
import { useRouter } from "vue-router";
import BannersModal from "@/components/BannersModal.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
// const router  = useRouter();
const banners = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(5);
const isModalOpen = ref(false);
const selectedBanner = ref(null);
const isEditing = ref(false);
const isDeleting= ref(false)
const emit= defineEmits(["bannerDeleted"])
const searchQuery = ref("");
// function editBanner(banner) {
//   console.log("Editing banner:", banner);
//   selectedBanner.value = null;
//   setTimeout(()=>{
//     selectedBanner.value = {...banner};
//     isEditing.value = true;
//     openModal();
//   },0)

// }
function editBanner(banner) {
  isEditing.value = true;
  selectedBanner.value = JSON.parse(JSON.stringify(banner)); // ✅ Ensures deep copy
  openModal();
}

function openModal() {
  if(!isEditing.value){
    selectedBanner.value = null;
  }
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
  selectedBanner.value = null;
  isEditing.value = false;
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "title", label: "Title", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "image_url", label: "Image", sortable: false },
  // { key: "actions", label: "Actions", sortable: false , visible: true},
];

async function fetchBanners(page) {
  // currentPage.value = page;
  if (page instanceof Event) page = currentPage.value; // Fix invalid page
  currentPage.value = page || 1; //
  try {
    const response = await axios.get("v1/library/banners", {
      params: {
        page: currentPage.value,
        'per-page': perPage.value,
        _search: searchQuery.value,
        // _search: searchQuery.value,
      },
    });
    banners.value = response.data.dataPayload.data;
    totalPages.value = response.data.dataPayload.totalPages;
    // closeModal();
  } catch (error) {
    console.error("🚨 Error fetching banners:", error);
  }
}
async function deleteBanner(id){
const confirmDelete= confirm("Are you sure you want to delete this banner?");
if(!confirmDelete) return;
isDeleting.value= true;
try{
  await axios.delete(`/v1/library/banners/${id}`);
  alert("✅ Banner deleted successfully!");
  emit("bannerDeleted");

}catch(error){
  console.log("error deleting banner", error)
  alert("❌ Failed to delete banner. Try again.");
}finally{
  isDeleting.value= false;
}
}
// function deleteBanner(id) {
//   alert(`Deleting banner with ID: ${id} (🗑️ We'll handle deletion later!)`);
// }
watch(perPage,()=>fetchBanners(1));

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
.action-btn {
  margin-right: 10px; /* Adds space to the right */
}

.banners-list {
  padding: 0px;
  font-family: 'Times New Roman', Times, serif;
  color: black;
}
font-awesome-icon {
  font-size: 18px;
  /* padding: 5px; */
  margin-right: 5px;
}
.banner-img {
  width: 25px;
  height: 25px;
  border-radius: 5px;
}
.search-and-add {
  display: flex;
  justify-content: space-between; /* Pushes search to left, button to right */
  align-items: center; /* Align items in the center */
  margin-bottom: 15px;
}
.search-container {
  flex: 1; /* Takes available space */
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
.search-input {
  width: 100%;
  max-width: 300px;
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.add-btn:hover {
  background:#10ac84;
}
.items-per-page {
  display: flex;
  align-items: center;
  gap: 5px;
}

.items-per-page select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}


</style>
