<template>
    <div>
        <input type="text" v-model="message" placeholder="Type something....." />
        <button @click="send">Send</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const message = ref('');
const emit = defineEmits(['updateMessage']);
 function send() {
    emit('updateMessage', message.value);
    message.value = '';
 }
</script>
<style scoped>
input {
  padding: 8px;
  border: 1px solid #ccc;
  margin-right: 10px;
}
button {
  padding: 8px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>