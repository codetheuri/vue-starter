<template>
    <div>
      <h1>Resources</h1>
      <BaseTable :data="resources" @edit="openModal" />
      <button @click="openModal">Add Resource</button>
    </div>
  
    <BaseModal :isOpen="showModal" @close="closeModal">
      <template #header>
        <h2>{{ isEditMode ? 'Edit' : 'Add' }} Resource</h2>
      </template>
  
      <template #body>
        <!-- Your input fields for title, value, etc -->
        <input v-model="resource.title" placeholder="Resource Title" />
        <input v-model="resource.value" placeholder="Resource Value" />
      </template>
  
      <template #actions>
        <button @click="saveResource">{{ isEditMode ? 'Update' : 'Create' }}</button>
      </template>
    </BaseModal>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  import BaseTable from '@/components/BaseTable.vue';
  </script>  