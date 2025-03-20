<script setup>
import { ref,onMounted,onUpdated } from 'vue';
import Default from '@/layouts/Default.vue';

const joke= ref('');
const fetchJoke=(async()=>{
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    joke.value = data.value;
});
onMounted(()=>{
    fetchJoke();
})

</script>
<template>
    <Default>
        <div>
            <h2>🤣 Joke of the day</h2>
            <p>{{ joke }}</p>
            <button @click="fetchJoke">New Joke</button>
        </div>
    </Default>
</template>