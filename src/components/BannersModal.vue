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

          <div class="form-group ">
            <label for="file">Upload Image</label>
            <input type="file" id="file" @change="handleFileUpload" accept="image/*" hidden />
            <button type="button" class="upload-btn" @click="triggerFileInput">📷 Choose Image</button>
            <span v-if="form.file" class="file-name">{{ form.file.name }}</span>
            <div v-if="errorMessages.file" class="error">{{ errorMessages.file }}</div>
          </div>

          <div v-if="previewImage" class="image-preview-wrapper">
            <img :src="previewImage" alt="Preview" />
            <button type="button" class="remove-img-btn" @click="removeImage">✖</button>
          </div>

          <div class="modal-actions">


            <button type="submit" :disabled="isLoading">
              {{ isLoading ? "Uploading..." : props.isEditing ? "save changes" : "Add Banner" }}

            </button>

          </div>
          <p v-if="errorMessages.general" class="error">{{ errorMessages.general }}</p>
        </form>
      </div>

      <!-- Sticky Buttons -->

    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, getCurrentInstance, onMounted, watch, watchEffect, toRaw } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const props = defineProps({
  isOpen: Boolean,
  isEditing: Boolean,
  bannerData: Object,
});
const emit = defineEmits(["close", "bannerAdded"]);


const form = ref({
  title: "",
  description: "",
  file: null
});
const toastPayload = ref('')
const { proxy } = getCurrentInstance()
const previewImage = ref(null);
const isLoading = ref(false);
const errorMessages = ref({ title: '', description: '', file: '', general: '' });
const resetForm = () => {
  form.value = { title: "", description: "", file: null };
  errorMessages.value = { title: '', description: '', file: '', general: '' };
  previewImage.value = null;
};

watchEffect(() => {
  if (props.isEditing && props.bannerData) {
    console.log("Received bannerData:", props.bannerData);
    form.value = {
      title: props.bannerData.title || "",
      description: props.bannerData.description || "",
      file: null
    };
    if (props.bannerData.image_url) {
      previewImage.value = props.bannerData.image_url.startsWith("http")
        ? props.bannerData.image_url
        : `http://localhost/${props.bannerData.image_url}`;
    }
  } else {
    // form.value = { title: "", description: "", file: null };
    //   previewImage.value = null;
    resetForm();
  }

}
);

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (!props.isEditing) {
      resetForm();
    }
  }
})


function triggerFileInput() {
  document.getElementById("file").click();
}
function removeImage(){
  form.value.file = null;
  previewImage.value = null;
  document.getElementById("file").value = null;
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
  console.log("Submitting banner:", toRaw(form.value));  // ✅ Debugging
  console.log("isEditing:", props.isEditing);
  console.log("Banner Data:", toRaw(props.bannerData));
  // if (!form.value.file) {
  // errorMessages.value.file = "please select an image";
  //   return;
  // }
  console.log("Submitting banner:", form.value, "isEditing:", props.isEditing);
  if (props.isEditing && (!props.bannerData || !props.bannerData.id)) {
    console.error("🔴 Invalid banner data:", props.bannerData);
    errorMessages.value.general = "Invalid banner data";
    return;
  }

  isLoading.value = true;
  // errorMessages.value.general = "";

  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("description", form.value.description);
  formData.append("file", form.value.file);
  // let response;
  try {
    if (props.isEditing) {
      const response = await axios.post(`/v1/library/banners/${props.bannerData.id}?_method=PUT`, formData);
      // console.log("reponse", response.data.toastPayload.toastTitle);
      // const toastPayload = response.data.toastPayload;
      if (response.data.toastPayload) {
        toastPayload.value = response.data.toastPayload;
        Swal.fire({
          icon: toastPayload.value.toastTheme || 'success',
          title: toastPayload.value.toastMessage || 'Success',
          timer: 4000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: true
        });
      }
    } else {
      const response = await axios.post("/v1/library/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response", response.data);
      if (response.data.toastPayload) {
        toastPayload.value = response.data.toastPayload;
        Swal.fire({
          icon: toastPayload.value.toastTheme || 'success',
          title: toastPayload.value.toastMessage || 'Success',
          timer: 4000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false
        });
      }
    }

    emit("bannerAdded");
    closeModal();
    form.value = { title: "", description: "", file: null };

    previewImage.value = null;
  } catch (error) {
    // console.error("🔴 Error adding banner:", error);
    Swal.fire('Oops!', 'Something went wrong.', 'error');
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
  errorMessages.value = { title: '', description: '', file: '', general: '' };
  emit("close");
}
watch(() => form.value.title, (newVal) => {
  if (newVal.trim() !== "") {
    errorMessages.value.title = "";
  }
});

watch(() => form.value.description, (newVal) => {
  if (newVal.trim() !== "") {
    errorMessages.value.description = "";
  }
});

// onMounted(() => {
//   resetForm();
// })

</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  padding-top: 0px;
  top: 0;
  left: 0;
  z-index: 1000;
  max-width: 100%;
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
  background: rgb(239, 235, 235);
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  max-height: 80vh;
  flex-direction: column;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

.modal-body {
  overflow-y: auto;
  max-height: 100vh;
  /* Adjust based on needs */
  padding-right: 10px;
  padding-left: 10px;
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
  font-size: 20px;
  margin-bottom: 0px;
}

/* Form Inputs */
.form-group {
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 13px;
}

textarea {
  resize: none;
  height: 50px;
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

/*

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
.image-preview-wrapper {
  position: relative;
  width: fit-content;
  margin: 0 auto;
  margin-top: 10px;
}

.image-preview-wrapper img {
  max-width: 40%;
  border-radius: 5px;
  margin-left: 30%;
  align-items: center !important;
}

/* Floating remove button */
.remove-img-btn {
  position: absolute;
  /* top: 5px; */
  /* right: ; */
  /* background: rgba(220, 53, 69, 0.9); soft red */
  color: rgb(243, 7, 7);
  border: none;
  /* padding: -4px 8px; */
  padding-left: -50px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: background 0.2s;
}

.remove-img-btn:hover {
  color: #ddd;
  background: rgba(176, 42, 55, 0.9);
   border-radius: 100%;
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