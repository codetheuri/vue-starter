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
              v-for="(col, index) in columns"
              :key="index"
              @click="col.sortable ? sortBy(col.key) : null"
              :class="{ sortable: col.sortable }"
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
          <tr v-for="(row, index) in sortedData" :key="index">
            <td v-for="(col, colIndex) in columns" :key="colIndex">
              <slot :name="col.key" :row="row">{{ row[col.key] }}</slot>
            </td>
            <td v-if="$slots.actions">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="table-pagination">
        <button :disabled="currentPage === 1" @click="$emit('page-change', currentPage - 1)">⬅️ Prev</button>
        <p>Page {{ currentPage }} of {{ totalPages }}</p>
        <button :disabled="currentPage === totalPages" @click="$emit('page-change', currentPage + 1)">Next ➡️</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const props = defineProps({
    data: Array,
    columns: Array,
    currentPage: Number,
    totalPages: Number,
    searchable: Boolean,
  });
  
  const searchQuery = ref("");
  const sortKey = ref("");
  const sortOrder = ref("asc");
  
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
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .table-search input {
    width: 20%;
    padding: 10px;
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
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .modern-table th.sortable {
    cursor: pointer;
    user-select: none;
  }
  
  .table-pagination {
    font-size: 1.3rem;
    display: flex;
    justify-content: right;
    margin-top: 10px;
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
  
    border-radius: 20%;
    background: #0e101d;
    color: white;
  }
  
  button:last-of-type {
    border-radius: 20%;
    background: #0c101f;
    color: white;
  }
  </style>
  