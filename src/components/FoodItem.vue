<template>
  <Default>
    <ul>
        <input v-model="items.name" placeholder="Add item" />
        <p>this fruit is called a, {{ items.name }}</p>
        <button @click="find">find the length</button>
        <p>the length of the fruit is, {{ item }}</p>
      <!-- <li v-for="(item, index) in items" :key="index">{{ item }}</li> -->
      <!-- <p v-if="items.length === 0">No items found</p> -->
    </ul>
  </Default>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Default from "../layouts/Default.vue";
    import { reactive } from "vue";
  
  const items = reactive({name: "apple"});
  const item= ref(0);
  const find = () => {
    item.value=(items.name.length);
  };
  </script>
  