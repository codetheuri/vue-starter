<script setup lang="ts">
import Default from '@/layouts/Default.vue';
import {ref, computed , watch,} from 'vue';
const celcius = ref(0);
const fahrenheit = computed (()=> celcius.value * 9/5 + 32);
const isHot = ref(false);
const reset = ()=>{
    celcius.value = 0;
}
const cold = computed (()=> celcius.value < 10);
watch(celcius, (newvalue)=>{
    if (newvalue > 30){
        isHot.value = true;
    }else{
        isHot.value = false;
    }
}
)
watch(celcius, ()=>{
    console.log(celcius, '1 celcius value changed');
}); 



</script>

<template>
    <Default>
        <div>
            <h2> Temperature converter </h2>
            <label> Enter Temperature in celcius:</label>
            <input type="number" v-model="celcius" min="0" />
            <p> Temperature in Fahrenheit: <strong>{{ fahrenheit }}</strong>  °F</p>
            <p v-if="isHot" class="alert">🥵 Too Hot! Drink some water.</p>
            <p v-if="cold" class="alert">🥶 Too Cold! Wear a jacket.</p>
            <button @click="reset"> reset</button>
        </div>
    </Default>   
</template>