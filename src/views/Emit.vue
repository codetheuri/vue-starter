<script setup lang="ts">
import Default from '@/layouts/Default.vue';
import { ref } from 'vue';
import Input from '@/components/Input.vue';
const UserMessage = ref('');
function handleMessage(newMessage){
    UserMessage.value = newMessage;
}

</script>

<template>
    <Default>
        <div>
            <h2>child to parent communication </h2>
            <p><strong>Received Message:</strong>{{ UserMessage }}</p>

            <inputBox @updateMessage="handleMessage" />
        </div>
    </Default>
</template>