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
        @bannerAdded="fetchBanners" />
      <div class="search-and-add">
        <div class="search-container">
          <input type="text" v-model="searchQuery" @input="fetchBanners" @update:search="fetchBanners"
            placeholder="Search..." class="search-input" />
        </div>
        <!-- page selector -->
        <div class="items-per-page">
          <label for="perPage">Show:</label>
          <select id="perPage" v-model="perPage" @change="fetchBanners(currentPage)">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
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
          // actions: '100px',

        }"
         @update:search="fetchBanners" 
         @page-change="fetchBanners"
          @bannerDeleted="fetchBanners">

        <!-- Custom column slot for images -->
        <template #image_url="{ row }">
          <div class="image-preview-wrapper">
         
          <img
           v-if="row.image_url"
            :src="getImageUrl(row.image_url)"
             alt="Banner Image" 
             class="banner-img"
              @click="openImageModal(getImageUrl(row.image_url))"
              
              />
              <!-- <div class="preview-tooltip">
                <img
                  
                  :src="getImageUrl(row.image_url)"
                
                  class="preview-large"
                />

              </div> -->
        </div>
        <div v-if="showImageModal" class="overlay" @click="closeImageModal">
  <div class="modal-image-container" @click.stop>
    <img :src="previewImage" alt="Preview" class="modal-image" />
    <button class="close-btn" @click="closeImageModal">×</button>
  </div>
</div>

        </template>

        <!-- Actions column -->
        <template v-if="banners.length < 0">
          <p>No actions available</p>
        </template>
        <template v-if="banners.length > 0" #actions="{ row }">

          <button @click="editBanner(row)" class="action-btn">
             <font-awesome-icon 
             icon="pen-to-square"
             class="edit-icon"
              /></button>
          &nbsp;


          <button @click="toggleDeleteRestore(row)" class="delete-btn"
            :title="row.is_deleted ? 'Restore banner' : 'Delete Banner'">
            <font-awesome-icon 
            :icon="row.is_deleted ? 'rotate-left' : 'trash'"
            :class="row.is_deleted? 'restore-icon' : 'delete-icon'"
            />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Swal from "sweetalert2";
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
// const router  = useRouter();
const banners = ref([]);
// const banner= ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(5);
const isModalOpen = ref(false);
const selectedBanner = ref(null);
const isEditing = ref(false);
const isDeleting = ref(false);
const emit = defineEmits(["resourceDeleted"]);
const searchQuery = ref("");
const showImageModal = ref(false);
const previewImage = ref("");
function openImageModal(url) {
  previewImage.value = url;
  showImageModal.value = true;
}
function closeImageModal() {
  showImageModal.value = false;
  previewImage.value = "";
}
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
  if (!isEditing.value) {
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
  { key: "id", label: "ID", sortable: true, visible: true },
  { key: "title", label: "Title", sortable: true, visible: true },
  { key: "description", label: "Description", sortable: false, visible: true },
  { key: "image_url", label: "Image", sortable: false, visible: true },
  { key: "is_deleted", label: "Status", sortable: false, visible: false },
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
    if (banners.value.length === 0) {
      alert('No banners found for your search.');
    }
    // closeModal();
  } catch (error) {
    console.error("🚨 Error fetching banners:", error);
  }
}

async function toggleDeleteRestore(banner) {
  const action = banner.is_deleted ? "restore" : "delete";
  // const confirmAction = Swal.fire(`Are you sure you want to ${action} this banner?`);
  // if(!confirmAction) return;
  const confirmAction = await Swal.fire({
      title: `Are you sure you want to ${action} this banner?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
    if (!confirmAction.isConfirmed) {
      isDeleting.value = false;
      return;
    }
  isDeleting.value = true;

  try {
   
   let response;
    if (action === "delete") {
       response = await axios.delete(`/v1/library/banners/${banner.id}`);
      
    } else {
      response = await axios.patch(`/v1/library/banners/${banner.id}`);
    }
    const index= banners.value.findIndex(b => b.id === banner.id);
    if (index !== -1) {
      banners.value[index].is_deleted = !banners.value[index].is_deleted;
    }
    if (response.data.toastPayload) {
      const toastPayload = response.data.toastPayload;
      Swal.fire({
        icon: toastPayload.toastTheme || 'success',
        title: toastPayload.toastMessage || 'Success',
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
  } catch (error) {
    console.error("🚨 Error deleting/restoring banner:", error);
    alert("❌ Failed to delete/restore banner. Try again.");
  } finally {
    isDeleting.value = false;
  }
}
// async function deleteBanner(id){
// const confirmDelete= confirm("Are you sure you want to delete this banner?");
// if(!confirmDelete) return;
// isDeleting.value= true;
// try{
//   await axios.delete(`/v1/library/banners/${id}`);
//   alert("✅ Banner deleted successfully!");
//   emit("bannerDeleted");

// }catch(error){
//   console.log("error deleting banner", error)
//   alert("❌ Failed to delete banner. Try again.");
// }finally{
//   isDeleting.value= false;
// }
// }
// function deleteBanner(id) {
//   alert(`Deleting banner with ID: ${id} (🗑️ We'll handle deletion later!)`);
// }
watch(perPage, () => fetchBanners(1));
watch(searchQuery, () => {
  fetchBanners(1)
})

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
/* .action-btn {
  margin-right: 10px; /* Adds space to the right */
/* }  */

.banners-list {
  padding: 0px;
  font-family: 'Times New Roman', Times, serif;
  color: black;
}

font-awesome-icon {
  font-size: 18px;
  color: #df0e4d;
  background: #df0e4d;
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
  justify-content: space-between;
  /* Pushes search to left, button to right */
  align-items: center;
  /* Align items in the center */
  margin-bottom: 15px;
}

.search-container {
  flex: 1;
  /* Takes available space */
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
  background: #10ac84;
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

.delete-btn {
  background: transparent;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}

.action-btn {
  background: transparent;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}
.edit-icon {
  color: #201dd1;
  /* Blue for edit */
}
.restore-icon {
  color: #13d6f0; /* Nice green or teal */
  animation: spin 0.5s ease-in-out;
  animation-fill-mode: forwards
}

.delete-icon {
  color: #df0e4d; /* Red for delete */
  animation: shake 0.3s ease-in-out;
  animation-fill-mode: forwards;
}
.image-preview-wrapper {
  position: relative;
  display: inline-block;
}

.preview-tooltip {
  position: absolute;
  top: 0;
  left: 110%;
  z-index: 9999;
  display: none;
  background: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.image-preview-wrapper:hover .preview-tooltip {
  display: block;
  animation: fadeIn 0.2s ease-in-out;
}

.preview-large {
  width: 400px;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
.modal-image-container {
  position: relative;
}
.modal-image {
  max-width: 50vw;
  max-height: 50vh;
  border-radius: 10px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.5);
}
.close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

</style>
