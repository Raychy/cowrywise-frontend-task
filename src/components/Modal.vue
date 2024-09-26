<template>
  <div class="unsplash-modal-overlay" @click="closeModal">
    <button class="unsplash-close-button" @click="closeModal">X</button>
    <div class="unsplash-modal-card" @click.stop>
      <div class="unsplash-card-image">
        <img
          :src="photo.urls.regular"
          :alt="photo.alt_description"
          class="unsplash-card-image-content"
        />
      </div>

      <div class="card-content">
        <h3 class="card-title">{{ photo.user.name }}</h3>
        <p class="card-location">
          {{ photo.user.location || "Unknown Location" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    photo: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(_, { emit }) {
    /*
    * closeModal function closes the image modal, while close emit is passed
    */
    const closeModal = () => {
      emit("close");
    };

    return {
      closeModal,
    };
  },
});
</script>
