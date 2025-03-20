<template>
    <div class="error-page">
      <h1>Oops! 😵</h1>
      <h2>404 - Page Not Found</h2>
      <p>Looks like you took a wrong turn. Let's get you back on track!</p>
      <img src="@/assets/404.png" alt="Page not found" class="error-image" />
      <router-link to="/" class="btn btn-primary mt-3">Go Home</router-link>
    </div>
  </template>
  
  <style scoped>
  .error-page {
    text-align: center;
    padding: 50px;
    color: white;
    background: linear-gradient(to right, #343a40, #212529);
    min-height: 100vh;
    display: flex;
    /* position: ; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.8s ease-in-out;
  }
  
  h1 {
    font-size: 4rem;
    font-weight: bold;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1.2rem;
  }
  
  .error-image {
    max-width: 400px;
    margin-top: 20px;
  }
  @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  </style>
  