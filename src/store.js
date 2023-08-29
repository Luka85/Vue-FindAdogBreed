import { defineStore } from "pinia";
import { fetchBreeds } from "./data.js";
export const useStore = defineStore("store", {
  state: () => {
    return {
      breedsList: [],
      searchList: [],
      searchQuery: "",
    };
  },
  getters: {
    displayedBreeds(state) {
      if (this.searchQuery) {
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
  },
  actions: {
    fetchData() {
      // this.isLoading = true;
      // this.message = "Data is loading...";

      fetchBreeds()
        .then((results) => {
          // this.isLoading = false;
          if (results.length > 0) {
            this.breedsList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
            console.log(this.breedsList);
            // this.message = "";
          } else {
            // this.message = "No Data Found. Please try again later.";
            this.breedsList = [];
            // this.isInputDisabled = true;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
          this.isInputDisabled = true;
        });
    },
  },
});
