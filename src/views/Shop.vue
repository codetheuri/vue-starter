<template>
    <Default>
        <div>
            <h2> 🍽️ Shop</h2>
            <label> how many items</label>
            <input type="number" v-model="quantity" min="0" />
            <p>🧮 Total Cost : <strong>{{ totalcost }}</strong>  Ksh</p>
            <p v-if="quantity >= 5">🎉 Discounted Price: <strong>{{ discount }}</strong> Ksh</p>
            <p v-else> No discount for quantity less than 5</p>
        </div>
    </Default>
  
</template>
<script setup>
import {ref, computed} from 'vue';
import Default from '@/layouts/Default.vue';

const quantity = ref(1);
const totalcost = computed (()=> quantity.value * 100);
// const totalcost = quantity.value * 100;
const discount= computed (()=> quantity.value >= 5 ? totalcost.value * 0.9 : totalcost.value);


</script>