<template>

    <div class="message">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  
  </template>
  
  <script setup>

  defineProps({
    title: String,
    content: String
  });
  </script>
  <style scoped>
  .message {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    background: #f9f9f9;
  }
  </style>
  