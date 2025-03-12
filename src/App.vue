

<template>
 <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/food">Food</router-link>
 </nav>
<router-view></router-view>
 <div>
    <h1>Counter: {{ counter.count }}</h1>
    <h2>Double Counter: {{ counter.doublecount }}</h2>
    <h2> square :{{ counter.square }}</h2>
<button @click="counter.increment">Increment</button>
<button @click="counter.decrement">Decrement</button>
 </div>

</template>

<script setup>
import { useCounter } from './store/counter';
const counter = useCounter();
</script>
<style >
nav {
  display: flex;
  gap: 20px;
  background: #f4f4f4;
  padding: 10px;
}
button {
  padding: 10px;
  margin: 10px;
  background: #f4f4f4;
  border: 1px solid #ccc;
}
</style>

