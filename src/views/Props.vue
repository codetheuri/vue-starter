<template>
    <Default>
    <div>
        <h2>props demo</h2>
        <Message title="Hello" content="This is a message" />
        <Message title="Goodbye" content="This is another message" />
    </div>
    </Default>
</template>

<script setup>
import Default from '@/layouts/Default.vue';
import Message from '../components/Message.vue';
</script>