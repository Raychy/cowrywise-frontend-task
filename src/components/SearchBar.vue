<template>
  <section class="search-container">
    <div class="search-result" v-if="photoStore.loading && keyword">
      <h2>
        Searching Results for <span>"{{ keyword }}" </span>
      </h2>
    </div>
    <div class="search-result" v-else-if="!photoStore.loading && keyword">
      <h2>
        Search Results for <span>"{{ keyword }}" </span>
      </h2>
    </div>
    <div class="search-grid">
      <div class="search-bar-container">
        <button @click="searchPhotos" class="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="search-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
        </button>
        <input
          type="text"
          v-model="keyword"
          @keypress="searchPhotos"
          placeholder="Search for photos"
          class="search-input"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePhotoStore } from "../stores/photoStore";

const photoStore = usePhotoStore();

const keyword = ref<string>("");

const searchPhotos = () => {
  if (keyword.value.trim()) {
    photoStore.searchImages(keyword.value);
  }
};
</script>
