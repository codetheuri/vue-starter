

<template>
 <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/food">Food</router-link>
 </nav>
<router-view></router-view>
 

</template>

<script setup>
import FoodItem from './components/FoodItem.vue'
</script>
<style >
nav {
  display: flex;
  gap: 20px;
  background: #f4f4f4;
  padding: 10px;
}
</style>

