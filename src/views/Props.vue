<template>
    <Default>
    <div>
        <h2>props demo</h2>
        <input type="text" v-model="title" placeholder="Type something....." />
        <!-- <Message title="Hello" content="This is a message" /> -->
        <Message :title="title" content="This is a dynamic message" />
    </div>
    </Default>
</template>

<script setup>
import Default from '@/layouts/Default.vue';
import Message from '../components/Message.vue';
import { ref } from 'vue';
const title = ref('default title');
</script>

<style scoped>
input {
  padding: 8px;
  border: 1px solid #ccc;
  display: block;
  margin-bottom: 10px;
}
</style>
