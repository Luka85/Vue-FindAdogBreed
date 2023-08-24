import { fetchBreeds } from "./data.js";

export const useState = () => {
  const state = {
    breedsList: [],
    searchList: [],
    isLoading: false,
    error: "",
    searchQuery: "",
    message: "",
    isInputDisabled: false,
  };
  const getters = {
    displayedList() {
      if (state.searchQuery) {
        return state.searchList;
      } else {
        return state.breedsList;
      }
    },
    loadingState() {
      if (state.isLoading) {
        return state.message;
      } else if (!state.isLoading && state.error) {
        return state.error;
      }
    },
    receivedDataState() {
      if (!state.displayedList.length && !state.isLoading) {
        return state.message;
      }
    },
  };
  const actions = {
    startLoading() {
      state.isLoading = true;
    },
    stopLoading() {
      state.isLoading = false;
    },
    displayMessage(text) {
      state.message = text;
      console.log(state.message);
    },
    displayBreedsList(results) {
      state.breedsList = results.map((breed) => {
        breed.isActive = false;
        return breed;
      });
    },
    displayError(errorMsg) {
      state.error = errorMsg.name + errorMsg.message;
    },
    clearBreedsList() {
      state.breedsList = [];
    },
    disabledInput() {
      state.isInputDisabled = true;
      return state.isInputDisabled;
    },
    enabledInput() {
      state.isInputDisabled = false;
      return state.isInputDisabled;
    },
    fetchData() {
      this.startLoading();
      console.log(this);
      this.displayMessage("Data is loading...");
      fetchBreeds()
        .then((results) => {
          console.log(results);
          this.stopLoading();
          if (results.length > 0) {
            this.displayBreedsList(results);
            this.displayMessage("");
            console.log(this.breedsList);
          } else {
            this.displayMessage("No Data Found. Please try again later.");
            this.clearBreedsList(); // state.isInputDisabled = true;
            this.disabledInput();
          }
        })
        .catch((error) => {
          this.stopLoading();
          // state.isLoading = false;
          this.displayError(error);
          // state.error = error.name + ": " + error.message;
          // state.isInputDisabled = true;
          this.disabledInput();
        });
    },
  };
  return {
    state,
    getters,
    actions,
  };
};
