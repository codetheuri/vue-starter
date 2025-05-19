<template>
    <Default>
        <div class="add-banner">
      <h2>🖼️ Add a New Banner</h2>

      <form @submit.prevent="submitBanner">
        <!-- Title Input -->
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="form.title" />
        </div>

        <!-- Description Input -->
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="form.description" ></textarea>
        </div>

        <!-- Image Upload -->
        <div class="form-group">
          <label for="image">Upload Image</label>
          <input type="file" id="file" @change="handleFileUpload" accept="image/*" />
        </div>

        <!-- Preview Image -->
        <div v-if="previewImage" class="image-preview">
          <img :src="previewImage" alt="Preview" />
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? "Uploading..." : "Add Banner" }}
        </button>

        <!-- Error Message -->
        <p v-if="errorMessages" class="error">{{ errorMessages }}</p>
      </form>
    </div>
    </Default>

</template>
<script setup>
import{ref} from "vue";
import axios from "axios";
import Default from "@/layouts/Default.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";


const router  = useRouter();

const form = ref({
  title: "",
  description: "",
  file: null,
});
const previewImage = ref(null);
const isLoading = ref(false);
const errorMessages = ref("");
function handleFileUpload(event){
    const file = event.target.files[0];
    if (file){
        form.value.file= file;
        const reader = new FileReader();
        reader.onload= (e)=> {
            previewImage.value =e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

async function submitBanner(){
    console.log("🟢 submitBanner function triggered!");
    if(!form.value.file){
        errorMessages.value= "please upload an image";
        return ;
    }
    isLoading.value = true;
    errorMessages.value ="";
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("description", form.value.description);
    formData.append("file", form.value.file);

    try{
        const response= await axios.post("/v1/library/banners", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        console.log("✅ Banner added successfully:", response.data);
        alert("🎉 Banner added successfully!");
        router.push("/banners");
    }catch(error){
        console.error("🚨 Error adding banner:", error);
        errorMessages.value = "❌ Failed to add banner. Please try again.";
    }finally{
        isLoading.value= false;
    }

}
</script>
<style scoped>
.add-banner {
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 10px;
  background: #1dd1a1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #10ac84;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

.image-preview {
  text-align: center;
  margin-top: 10px;
}

.image-preview img {
  max-width: 100%;
  border-radius: 5px;
}

.error {
  color: red;
  text-align: center;
}
</style>

