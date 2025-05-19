<template>
  <Default>
    <h1>Resources</h1>
    <BaseModal
     :title="modalTitle"
      :show="showModal" 
      @cancel="closeModal" 
      @confirm="submitResource" 
      cancel-label="Nah"
      confirm-label="Do it!"
      >
      <template #default>
        <input v-model="resource.title" placeholder="Title" />
        <input v-model="resource.description" placeholder="Description" />
        <input v-model="resource.link" placeholder="Link" />
        <input v-model="resource.image_url" placeholder="Image URL" />

      </template>
      <template #footer>
        <button @click="saveResource">{{ isEditMode ? 'Update' : 'Create' }}</button>
        <button @click="closeModal">Cancel</button>
      </template>
    </BaseModal>
    <div class="toolbar">
  <button class="primary" @click="openModal()">➕ Add Resource</button>
</div>

    <BaseTable :data="resources" :columns="columns" :search="searchQuery" @page-change="handlePageChange"
      @update:search="handleSearch" :pagenation="true" :columnwidth="columnwidth" :sort-key="sortKey"
      :sort-order="sortOrder" @sort="handleSort" @edit="openModal">
      <template #image_url="{ row }">
        <div class="image-preview-wrapper">

          <img v-if="row.image_url" :src="getImageUrl(row.image_url)" alt="Resource Image" class="resource-img"
            @click="openImageModal(getImageUrl(row.image_url))" />
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
      <template #actions="{ row }">
        <button @click="openModal(row)">Edit</button>
        <button @click="deleteResource(row.id)">Delete</button>
      </template>
    </BaseTable>
  </Default>
</template>
<script setup>
import Default from '@/layouts/Default.vue';
import { ref, computed, watch, onMounted } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseTable from '@/components/BaseTable.vue';

import axios from 'axios';

const resources = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(5);
const showModal = ref(false);
const isEditMode = ref(false);
const resource = ref({ id: null, title: '', description: '', link: '', image_url: '' });
const searchQuery = ref('');
const modalTitle = ref("Add Resource ");
const sortKey = ref('id');
const sortOrder = ref('asc');
const columns = [
  { label: 'ID', key: 'id', sortable: true, visible: true },

  { label: 'Title', key: 'title', visible: true },
  { label: 'Description', key: 'description', visible: true },
  { label: 'Link', key: 'link', visible: true },
  { label: 'Image', key: 'image_url', visible: true },

  { label: 'Actions', key: 'actions', visible: false },
];
const columnwidth = {
  id: '150px',
  title: '300px',
  description: '300px',
  link: '300px',
  image_url: '200px',
  actions: '200px',
};

// const resources = ref([
//   { id: 1, title: 'Resource 1', value: 'Value 1' },
//   { id: 2, title: 'Resource 2', value: 'Value 2' },
// ]);
async function fetchResources(page) {
  // currentPage.value = page;
  if (page instanceof Event) page = currentPage.value; // Fix invalid page
  currentPage.value = page || 1; //
  try {
    const response = await axios.get("v1/library/resources", {
      params: {
        page: currentPage.value,
        'per-page': perPage.value,
        _search: searchQuery.value,
        // _search: searchQuery.value,
      },
    });
    resources.value = response.data.dataPayload.data;
    totalPages.value = response.data.dataPayload.totalPages;
    if (resources.value.length === 0) {
      alert('No resources found for your search.');
    }
    closeModal(); // Uncommenting to close modal if needed
  } catch (error) {
    console.error("🚨 Error fetching resources:", error);
  }
}

const openModal =()=> {
 
  showModal.value = true;
};


const closeModal = () => {
  showModal.value = false;
  isEditMode.value = false;
};
watch(perPage, () => fetchResources(1));
watch(searchQuery, () => {
  fetchResources(1);
});

onMounted(() => {
  fetchResources();
});
const getImageUrl = (imagePath) => {
  if (imagePath.startsWith("http")) {
    return imagePath; // Already a full URL
  }
  return `http://localhost/${imagePath}`;
};
</script>
<style scoped>
.resource-img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.toolbar {
  margin: 1rem 0;
  text-align: right;
}

button.primary {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
}


</style>