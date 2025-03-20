import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const errorMessage = ref("");
  const router = useRouter();

  // 🟢 Make `isAuthenticated` reactive based on token
  const isAuthenticated = computed(() => !!token.value);

  async function login(username, password) {
    try {
      const response = await axios.post("/v1/auth/login", {
        username,
        password,
      });
    const data = response.data?.dataPayload?.data;
      if (data && data.token) {
        user.value = {username: data.username};
        token.value = data.token;
        errorMessage.value = "";

        // Store token & user data in localStorage
        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(user.value));

        // Set token in axios headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

        console.log("✅ Login Successful! Redirecting...");
        
        // 🔥 Use `$nextTick()` to ensure UI updates first before redirection
        await router.push("/");
      } else {
        errorMessage.value = response.data.message || "Invalid credentials";
      }
    } catch (error) {
      errorMessage.value = "An error occurred while logging in";
      console.error("Login Error:", error);
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    router.push("/login");
  }

  return { user, isAuthenticated, login, logout, errorMessage };
});
