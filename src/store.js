import { fetchBreeds } from "./data.js";

const state = {
  breedsList: [],
  searchList: [],
  isLoading: false,
  error: "",
  searchQuery: "",
  message: "",
  isInputDisabled: false,
};
const mutations = {
  startLoading() {
    state.isLoading = true;
    // console.log(state.isLoading);
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
  },
};
const getters = {
  displayedList() {
    if (state.searchQuery) {
      return state.searchList;
    } else {
      console.log(state.breedsList);
      return state.breedsList;
    }
  },
};
const actions = {
  // increment(context) {
  //   setTimeout(() => {
  //     mutations.fetchData(context);
  //     console.log(context);
  //   }, 2000);
  // },
  fetchData() {
    mutations.startLoading();
    mutations.displayMessage("Data is loading...");

    // state.isLoading = true;
    // state.message = "Data is loading...";

    fetchBreeds()
      .then((results) => {
        console.log(results);
        // state.isLoading = false;
        mutations.stopLoading();
        if (results.length > 0) {
          mutations.displayBreedsList(results);
          mutations.displayMessage("");
          // state.breedsList = results.map((breed) => {
          //   breed.isActive = false;

          //   return breed;
          // });

          // state.message = "";
        } else {
          mutations.displayMessage("No Data Found. Please try again later.");
          // state.message = "No Data Found. Please try again later.";
          // state.breedsList = [];
          mutations.clearBreedsList();
          // state.isInputDisabled = true;
          mutations.disabledInput();
        }
      })
      .catch((error) => {
        mutations.stopLoading();
        // state.isLoading = false;
        mutations.displayError(error);
        // state.error = error.name + ": " + error.message;
        // state.isInputDisabled = true;
        mutations.disabledInput();
      });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
