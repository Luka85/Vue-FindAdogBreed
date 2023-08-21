import Vue from "vue";
import { fetchBreeds } from "./data.js";

const state = Vue.observable({
  breedsList: [],
  searchList: [],
  isLoading: false,
  error: "",
  searchQuery: "",
  message: "",
  isInputDisabled: false,
});
const getters = {
  displayedList() {
    if (this.searchQuery) {
      return state.searchList;
    } else {
      console.log(state.breedsList);
      return state.breedsList;
    }
  },

  loadingState() {
    if (state.isLoading) {
      console.log(state.message);
      return state.message;
    } else if (!state.isLoading && state.error) {
      console.log(state.error);
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
    console.log(state.isLoading);
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
    actions.startLoading();
    actions.displayMessage("Data is loading...");
    fetchBreeds()
      .then((results) => {
        console.log(results);
        actions.stopLoading();
        if (results.length > 0) {
          actions.displayBreedsList(results);
          actions.displayMessage("");
          console.log(this.breedsList);
        } else {
          actions.displayMessage("No Data Found. Please try again later.");
          // state.message = "No Data Found. Please try again later.";
          // state.breedsList = [];
          actions.clearBreedsList();
          // state.isInputDisabled = true;
          actions.disabledInput();
        }
      })
      .catch((error) => {
        actions.stopLoading();
        // state.isLoading = false;
        actions.displayError(error);
        // state.error = error.name + ": " + error.message;
        // state.isInputDisabled = true;
        actions.disabledInput();
      });
  },
};

// const state = {
//   breedsList: [],
//   searchList: [],
//   isLoading: false,
//   error: "",
//   searchQuery: "",
//   message: "",
//   isInputDisabled: false,
// };
// const mutations = {
//   startLoading() {
//     state.isLoading = true;
//   },
//   stopLoading() {
//     state.isLoading = false;
//   },
//   displayMessage(text) {
//     state.message = text;
//   },
//   displayBreedsList(results) {
//     state.breedsList = results.map((breed) => {
//       breed.isActive = false;
//       return breed;
//     });
//     console.log(state.breedsList);
//   },
//   displayError(errorMsg) {
//     state.error = errorMsg.name + errorMsg.message;
//   },
//   clearBreedsList() {
//     state.breedsList = [];
//   },
//   disabledInput() {
//     state.isInputDisabled = true;
//     return state.isInputDisabled;
//   },
//   enabledInput() {
//     state.isInputDisabled = false;
//     return state.isInputDisabled;
//   },
// };
// const getters = {
//   displayedList() {
//     if (state.searchQuery) {
//       return state.searchList;
//     } else {
//       return state.breedsList;
//     }
//   },
//   loadingState() {
//     if (state.isLoading) {
//       console.log(state.message);
//       return state.message;
//     } else if (!state.isLoading && state.error) {
//       console.log(state.error);
//       return state.error;
//     }
//   },
//   receivedDataState() {
//     if (!this.displayedList.length && !state.isLoading) {
//       return state.message;
//     }
//   },
// };
// const actions = {
//   fetchData() {
//     mutations.startLoading();
//     mutations.displayMessage("Data is loading...");
//     fetchBreeds()
//       .then((results) => {
//         console.log(results);
//         mutations.stopLoading();
//         if (results.length > 0) {
//           mutations.displayBreedsList(results);
//           mutations.displayMessage("");
//           console.log(state.breedsList);
//         } else {
//           mutations.displayMessage("No Data Found. Please try again later.");
//           // state.message = "No Data Found. Please try again later.";
//           // state.breedsList = [];
//           mutations.clearBreedsList();
//           // state.isInputDisabled = true;
//           mutations.disabledInput();
//         }
//       })
//       .catch((error) => {
//         mutations.stopLoading();
//         // state.isLoading = false;
//         mutations.displayError(error);
//         // state.error = error.name + ": " + error.message;
//         // state.isInputDisabled = true;
//         mutations.disabledInput();
//       });
//   },
// };

export default {
  state,
  // mutations,
  getters,
  actions,
};
