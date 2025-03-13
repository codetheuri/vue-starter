import { defineStore } from "pinia";
import { ref } from 'vue';
import { useRouter } from "vue-router";



export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const isAuthenticated = ref(false);
    const errorMessage = ref("");
    const router = useRouter();

    async function login(username, password) {
       try {
               if (username === "admin" && password === "admin") {
                    user.value = { name: username };
                    isAuthenticated.value = true;
                    errorMessage.value = "";
                   localStorage.setItem("user", JSON.stringify(user.value));
                     router.push("/");
                } else {
                    errorMessage.value = "Invalid username or password";
                  
                }
            } catch (error) {
                errorMessage.value = "An error occurred";
              
            }
    }
    
    //     }
    //     user.value = {name:username};
    //     isAuthenticated.value = true;
    // }
    function logout() {
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem("user");
        router.push("/login");
    }
    return { user, isAuthenticated, login, logout, errorMessage };
},
    {
        persist: {
            storage: localStorage,
        }
    }

);