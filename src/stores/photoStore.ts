import { defineStore } from "pinia";
import axios from "axios";
import { State } from "../interfaces/state";

export const usePhotoStore = defineStore("photoStore", {
  state: (): State => ({
    photos: [],
    loading: false,
    loadingArray: [],
    error: null,
    accessKey: "dqFblhWiXOlITzDpS5pI1-f5d3_NAz3gyCN1nuePNNs",
  }),
  actions: {
    /*
     * fetchPhotos Function return searched photos
     */
    async fetchPhotos() {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos?client_id=${this.accessKey}`
        );
        this.photos = response.data;
        this.loadingArray = Array(this.photos.length).fill(true);
        this.loading = false;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    
    /*
     * searchImages Function accept searchQuery as parameter and return searched photos
     */
    async searchImages(searchQuery: string) {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: searchQuery,
              client_id: this.accessKey,
              per_page: 20,
            },
          }
        );
        this.loading = false;
        this.photos = response.data.results;
        this.loadingArray = Array(this.photos.length).fill(true);
      } catch (error) {
        console.error("Error fetching images:", error);
        this.loading = false;
      }
    },
  },
});
