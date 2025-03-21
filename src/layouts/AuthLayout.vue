<template>
  <div class="auth-container">
    <div class="auth-card">
      <slot></slot> <!-- This is where the login form will go -->
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #010911; /* Dark theme background */
}

.auth-card {
  width: 100%;
  max-width: 365px;
  background: #1a1f2d; /* Slightly lighter than the background */
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}
</style>
