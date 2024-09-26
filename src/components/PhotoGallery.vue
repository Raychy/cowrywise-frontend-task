<template>
  <div>
    <SearchBar />
    <main class="photo-grid">
      <div
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="photo-item"
        @click="openModal(photo)"
      >
        <SkeletonLoader v-if="loading[index]" :delay="index * 100" />
        <div class="photo-wrapper">
          <div class="overlay">
            <h3>{{ photo.user.name }}</h3>
            <p>{{ photo.user.location || "Unknown" }}</p>
          </div>
          <img
            :src="photo.urls.small"
            :alt="photo.alt_description"
            @load="setImageHeight($event, index)"
            class="photo-image"
          />
        </div>
      </div>
      <Modal
        v-if="modalOpen"
        :photo="selectedImage"
        @close="modalOpen = false"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePhotoStore } from "../stores/photoStore";
import Modal from "./Modal.vue";
import SearchBar from "../components/SearchBar.vue";
import SkeletonLoader from "./SkeletonLoader.vue";

const photoStore = usePhotoStore();
const modalOpen = ref(false);
const selectedImage = ref(null);

const photos = computed(() => photoStore.photos);
const loading = computed(() => photoStore.loadingArray);

/*
 * setImageHeight function accept event and index as parameters to auto set the image heights when loaded
 */
const setImageHeight = (event: any, index: number) => {
  photoStore.loadingArray[index] = false;
  const img = event.target;
  const height = img.naturalHeight;
  const parent = img.closest(".photo-item");
  parent.style.setProperty("--image-height", `${height}px`);
  parent.style.gridRowEnd = `span ${Math.ceil(height / 35)}`;
};

/*
 * openModal function accept imageUrl as parameter to open modal
 */
const openModal = (imageUrl: any) => {
  selectedImage.value = imageUrl;
  modalOpen.value = true;
};

onMounted(() => {
  photoStore.fetchPhotos();
});
</script>
