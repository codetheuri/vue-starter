<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="$emit('cancel')" class="close-button">×</button>
      </header>

      <section class="modal-body">
        <slot />
      </section>

      <footer class="modal-footer">
        <slot name="footer" />
        <button v-if="showCancel" @click="$emit('cancel')">{{ cancelLabel }}</button>
          <button v-if="showConfirm" @click="$emit('confirm')">{{ confirmLabel }}</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Modal Title'
  },
  show: Boolean,
  cancelLabel: {
    type: String,
    default: 'Cancel',
  },
  confirmLabel: {
    type: String,
    default: 'Confirm',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['cancel', 'confirm']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  overflow: hidden;
}
.modal-header {
  padding: 1rem;
  background: #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-body {
  padding: 1rem;
}
.modal-footer {
  padding: 1rem;
  background: #f4f4f4;
  text-align: right;
}
.close-button {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
