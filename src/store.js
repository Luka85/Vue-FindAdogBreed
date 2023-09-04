import { defineStore } from "pinia";
import { fetchBreeds } from "./data.js";
import { searchBreed } from "./data.js";

export const useStore = defineStore("store", {
  state: () => {
    return {
      breedsList: [],
      searchList: [],
      error: null,
      searchQuery: "",
      isLoading: false,
      isInputDisabled: false,
      // isHidden: true,
      message: "",
      // isScrollToTopActive: false,
      // lastBreedState: [],
      // indexClicked: 0,
    };
  },
  getters: {
    displayedList() {
      if (this.searchQuery) {
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
    loadingState() {
      if (this.isLoading) {
        console.log(this.isLoading);
        console.log(this.message);
        return this.message;
      } else if (!this.isLoading && this.error) {
        console.log("error");
        return this.error;
      }
    },
    receivedDataState() {
      if (!this.displayedList.length && !this.isLoading) {
        return this.message;
      }
    },
  },
  actions: {
    fetchBreedData() {
      this.isLoading = true;
      this.message = "Data is loading...";

      fetchBreeds()
        .then((results) => {
          this.isLoading = false;
          if (results.length > 0) {
            this.breedsList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
            this.message = "";
          } else {
            this.message = "No Data Found. Please try again later.";

            this.breedsList = [];
            this.isInputDisabled = true;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
          this.isInputDisabled = true;
        });
    },
    getSearchResults(input) {
      this.isLoading = true;
      this.message = "Data is loading...";
      this.searchQuery = input;

      if (this.searchQuery.length === 0) {
        this.isLoading = false;
      }

      searchBreed(this.searchQuery)
        .then((results) => {
          this.isLoading = false;
          if (results.length > 1) {
            this.message = "";
            this.searchList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
          } else if (results.length === 1) {
            results[0].isActive = true;
            this.searchList = results;

            this.message = "";
            return this.searchList;
          } else {
            this.searchList = [];

            if (this.searchQuery) {
              this.message = `Your searches for "${this.searchQuery}" did not have any matches. Try different keywords.`;
            } else {
              this.message = "No Data Found. Please try again later.";
            }
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
