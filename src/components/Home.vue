<template>
    <Default>
   
              <h3 class="card-title">Counter App</h3>
              <h1 class="display-5 text-primary">{{ counter.count }}</h1>
              <h5 class="text-muted">Double: {{ counter.doublecount }}</h5>
              <h5 class="text-muted">Square: {{ counter.square }}</h5>
              
              <button class="btn btn-success m-2 hvr-grow" @click="counter.increment">
                <i class="bi bi-plus-circle"></i> Increment
              </button>
              <button class="btn btn-danger m-2 hvr-grow" @click="counter.decrement">
                <i class="bi bi-dash-circle"></i> Decrement
              </button>
  
              <!-- Open Modal Button -->
              <button class="btn btn-info m-2 hvr-bounce-to-right" data-bs-toggle="modal" data-bs-target="#infoModal">
                <i class="bi bi-info-circle"></i> Show Info
              </button>
       
  
      <!-- Bootstrap Modal -->
      <div class="modal fade" id="infoModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Counter Info</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              This is a simple counter app demonstrating Vue 3's Composition API and state management using Pinia.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Default>
  </template>
  
  <script setup>
  import Default from '@/layouts/Default.vue';
  import { useCounter } from '@/store/counter';
  
  const counter = useCounter();
  </script>
  