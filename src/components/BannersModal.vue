<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <!-- Close Button -->
      <button class="close-btn" @click="closeModal">✖</button>

      <h2 class="modal-title">Add Banner</h2>

      <!-- Scrollable Content -->
      <div class="modal-body">
        <form @submit.prevent="submitBanner">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="form.title" placeholder="Enter banner title..." />
            <div v-if="errorMessages.title" class="error">{{ errorMessages.title }}</div>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description" placeholder="Write a short description..."></textarea>
            <div v-if="errorMessages.description" class="error">{{ errorMessages.description }}</div>
          </div>

          <div class="form-group">
            <label for="file">Upload Image</label>
            <input type="file" id="file" @change="handleFileUpload" accept="image/*" hidden />
            <button type="button" class="upload-btn" @click="triggerFileInput">📷 Choose Image</button>
            <span v-if="form.file" class="file-name">{{ form.file.name }}</span>
            <div v-if="errorMessages.file" class="error">{{ errorMessages.file }}</div>
          </div>

          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Preview" />
          </div>
          <p v-if="errorMessages.general" class="error">{{ errorMessages.general }}</p>
          <div class="modal-actions">
          

            <button type="submit" :disabled="isLoading">
              {{ isLoading ? "Uploading..." : "Add Banner" }}
            </button>

          </div>
        </form>
      </div>

      <!-- Sticky Buttons -->

    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits,onMounted } from "vue";
import axios from "axios";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close", "bannerAdded"]);

const form = ref({ title: "", description: "", file: null });
const previewImage = ref(null);
const isLoading = ref(false);
const errorMessages = ref({ title: '', description: '', file: '', general: '' });

function triggerFileInput() {
  document.getElementById("file").click();
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    form.value.file = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function submitBanner() {
  errorMessages.value = { title: '', description: '', file: '', general: '' };
  // if (!form.value.file) {
  // errorMessages.value.file = "please select an image";
  //   return;
  // }

  isLoading.value = true;
  // errorMessages.value.general = "";

  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("description", form.value.description);
  formData.append("file", form.value.file);

  try {
    await axios.post("/v1/library/banners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("🎉 Banner added successfully!");
    emit("bannerAdded");
    closeModal();
    form.value = { title: "", description: "", file: null };
    errorMessages.value = { title: '', description: '', file: '', general: '' };
    previewImage.value = null;
  } catch (error) {
    // console.error("🔴 Error adding banner:", error);
   
    if (error.response && error.response.status === 422 && error.response.data.errorPayload) {
      const errorDetails = error.response.data.errorPayload.errors;
      errorMessages.value.title = errorDetails.title || '';
      errorMessages.value.description = errorDetails.description || '';
      errorMessages.value.file = errorDetails.file || '';
    } else {
      errorMessages.value.general = "An unexpected error occurred";
    }

  } finally {
    isLoading.value = false;
  }
}

function closeModal() {
  emit("close");
}
onMounted(()=>{
  submitBanner();
});

</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  padding-top: 20px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
}

/* Modal Box */
.modal-content {
  position: relative;
  background: rgb(241, 241, 241);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-height: 90vh;
  flex-direction: column;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

.modal-body {
  overflow-y: auto;
  max-height: 60vh;
  /* Adjust based on needs */
  padding-right: 10px;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 5px;

  right: 2px;
  border: none;
  background: transparent;
  font-size: 25px;
  cursor: pointer;
  color: #555;
  transition: 0.2s;
}

.close-btn:hover {
  color: rgb(13, 110, 221);
}

/* Modal Title */
.modal-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
}

/* Form Inputs */
.form-group {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

textarea {
  resize: none;
  height: 80px;
}

/* Custom File Upload Button */
.upload-btn {
  background: #f8f9fa;
  color: rgb(10, 10, 10);
  font-style: italic;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.upload-btn:hover {
  background: #7b7b86;
}

.file-name {
  margin-left: 10px;
  font-size: 14px;
  color: #333;
}

/* Image Preview */
.image-preview img {
  max-width: 40%;
  margin-top: 10px;
  /* margin-bottom: 20px; */
  /* max-height: 50%; */
  border-radius: 5px;
}

/* Buttons */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  border-top: 1px solid #ddd;
  position: sticky;
  bottom: 0;
  background: white;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.2s;
}

button[type="submit"] {
  background: #077fff;
  color: rgb(8, 8, 10);
}

button[type="submit"]:disabled {
  background: gray;
  cursor: not-allowed;
}

.cancel-btn {
  background: red;
  color: white;
}

.cancel-btn:hover {
  background: darkred;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>