import { defineStore } from "pinia";
import {ref, computed} from 'vue' ;
 
export const useCounter = defineStore("counter", () => {
const count = ref(0);
const doublecount = computed(() => count.value * 2);
const square = computed(() => count.value * count.value);
function increment() {
count.value++;    
  }  
  
function decrement() {
count.value--;    
  }
  
  return{count, increment, decrement, doublecount,square};
},{
    persist:{
    storage :localStorage,
    }
}
);