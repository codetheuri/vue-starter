<template>
    <div class="table-container">
      <div v-if="searchable" class="table-search">
        <input
          type="text"
          v-model="searchQuery"
          @input="$emit('update:search', searchQuery)"
          placeholder="Search..."
        />
      </div>
      <table class="modern-table">
     

        <thead>
      
          <tr>
            <th
            
              v-for="(col, index) in visibleColumns"
              :key="index"
              @click="col.sortable ? sortBy(col.key) : null"
              :class="{ sortable: col.sortable }"
              :style="{width: columnwidth?.[col.key] || 'auto'}"
            >
              {{ col.label }}
              <span v-if="col.sortable">
                {{ sortKey === col.key ? (sortOrder === 'asc' ? ' 🔼' : ' 🔽') : '↕' }}
              </span>
            </th>
            <th v-if="$slots.actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="sortedData.length ===0">
            <td :colspan="visibleColumns.length + ($slots.actions ? 1 :0)" class="no-data">
              No data available
            </td>

          </tr>
          <tr  v-for="(row, index) in sortedData" 
          :key="index"
  
          >
            <td 
            v-for="(col, colIndex) in visibleColumns" 
            :key="colIndex"
            :style="{width: columnwidth?.[col.key] || 'auto'}"
            >
              <slot :name="col.key" :row="row">{{ row[col.key] }}</slot>
            </td>
            <td v-if="$slots.actions">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
        </tbody> 
      </table>
  
      <div v-if="pagenation" class="table-pagination">
        <button :disabled="currentPage === 1" @click="$emit('page-change', currentPage - 1)">⬅️ Prev</button>
        <p>Page {{ currentPage }} of {{ totalPages }}</p>
        <button :disabled="currentPage === totalPages" @click="$emit('page-change', currentPage + 1)">Next ➡️</button>
      </div>
    </div>
  </template>
  
  <script setup>
  // import { c } from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
import { ref, computed } from "vue";
  
  const props = defineProps({
    data: Array,
    columns: Array,
    columnwidth: Object,
    currentPage: Number,
    totalPages: Number,
    searchable: Boolean,
    pagenation: Boolean,
    visible: Boolean,

  });
  
  const searchQuery = ref("");
  const sortKey = ref("");
  const sortOrder = ref("asc");
  const visibleColumns= computed(() => {
    return props.columns.filter(col => col.visible !== false);
  });
  const sortBy = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }
  };
  
  const sortedData = computed(() => {
    let sorted = [...props.data];
    if (sortKey.value) {
      sorted.sort((a, b) => {
        if (sortOrder.value === "asc") {
          return a[sortKey.value] > b[sortKey.value] ? 1 : -1;
        } else {
          return a[sortKey.value] < b[sortKey.value] ? 1 : -1;
        }
      });
    }
    return sorted;
  });
  </script>
  
  <style scoped>
  .table-container {
    background: white;
  
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .table-search input {
    width: 100%;
    max-width: 300px;
    padding: 7px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .modern-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .modern-table th,
  .modern-table td {
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .modern-table td{
    max-width: 150px;
  }
  .modern-table th.sortable {
    cursor: pointer;
    user-select: none;
  }
  
  .table-pagination {
    font-size: 1.1rem;
    display: flex;
    justify-content: right;
    margin-top: 10px;
  }
  .table-pagination p {
    margin: 0 10px;
    font-style: bold;
    /* font-size: 1.2rem; */
    color: #000;
    font-weight: 600;
    font-family: 'Times New Roman', Times, serif;
    align-self: center;
  }
  
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background: gray;
    cursor: not-allowed;
  }
  
  button:first-of-type {
  
    /* border-radius: 20%; */
    background: #ffffff;
    color: rgb(0, 0, 0);
  }
  
  button:last-of-type {
    border-radius: 20%;
    background: #ffffff;
    color: rgb(0, 0, 0);
  }
  .no-data {
  text-align: center;
  font-weight: bold;
  color: #999;
  padding: 10px;
}

  </style>
  