<template>
  <section ref="breedListRef" class="breedsList__container">
    <keep-alive>
      <search-form
        ref="searchRef"
        :isDisabled="isInputDisabled"
        @search="getSearchResults"
        v-if="this.$route.name === 'breeds' || this.$route.name === 'search'"
      ></search-form>
    </keep-alive>

    <the-navigation
      v-if="displayedBreeds.length !== 0"
      :lastState="lastBreedState"
      :id="indexClicked"
      :breeds="displayedBreeds"
      @countdown="scrollToView"
      @addingUp="scrollToView"
    ></the-navigation>

    <div class="result__container">
      <p class="result__message" v-if="loadingState">{{ loadingState }}</p>
      <p class="result__message" v-else-if="receivedDataState">
        {{ receivedDataState }}
      </p>

      <ul
        v-else-if="
          this.$route.name === 'breeds' || this.$route.name === 'search'
        "
        class="result__list-container"
        ref="resultListContainer"
        @scroll="showNavigationBtn"
      >
        <breed-card
          @toggle="toggleCard"
          v-for="(breed, index) in displayedBreeds"
          :breed="breed"
          :key="breed.id"
          :id="index"
          :class="{ expandble: breed.isActive, result__list: !breed.isActive }"
        >
        </breed-card>
      </ul>
      <div
        v-else-if="this.$route.name === 'details'"
        v-for="(breed, index) in displayedBreeds"
        :key="breed.id"
        :searchQuery="searchQuery"
      >
        <router-view :breed="breed"></router-view>
        >
      </div>
    </div>
    <navigation-button
      @clickToScroll="scrollListToTop"
      :class="{ hidden: isHidden ? 'hidden' : '' }"
    ></navigation-button>
  </section>
</template>
<script>
import { fetchBreeds } from "../data.js";
import SearchForm from "./SearchForm.vue";

import { searchBreed } from "../data";
import BreedCard from "./BreedCard.vue";
import NavigationButton from "./NavigationButton.vue";
import BreedDetails from "./BreedDetails.vue";

import TheNavigation from "./TheNavigation.vue";
import store from "../store";

export default {
  components: {
    SearchForm,
    BreedCard,
    NavigationButton,
    BreedDetails,
    TheNavigation,
    store,
  },

  props: {
    breedName: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      // breedsList: [],
      // searchList: [],
      // isLoading: false,
      // error: null,
      // searchQuery: "",
      isInputDisabled: false,
      isHidden: true,
      message: "",
      isScrollToTopActive: false,
      lastBreedState: [],
      indexClicked: 0,
    };
  },
  methods: {
    fetchData() {
      store.actions.fetchData();

      // store.state.isLoading = true;
      // this.message = "Data is loading...";
      // fetchBreeds()
      //   .then((results) => {
      //     store.state.isLoading = false;
      //     if (results.length > 0) {
      //       console.log(store.state);
      //       console.log(store.state.breedsList);
      //       store.state.breedsList = results.map((breed) => {
      //         breed.isActive = false;
      //         return breed;
      //       });
      //       this.message = "";
      //     } else {
      //       this.message = "No Data Found. Please try again later.";
      //       store.state.breedsList = [];
      //       this.isInputDisabled = true;
      //     }
      //   })
      //   .catch((error) => {
      //     store.state.isLoading = false;
      //     this.error = error.name + ": " + error.message;
      //     this.isInputDisabled = true;
      //   });
    },
    getSearchResults(input) {
      store.state.isLoading = true;
      this.message = "Data is loading...";
      this.searchQuery = input;

      if (this.searchQuery.length === 0) {
        store.state.isLoading = false;
      }

      searchBreed(this.searchQuery)
        .then((results) => {
          store.state.isLoading = false;
          if (results.length > 1) {
            this.message = "";
            store.state.searchList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
          } else if (results.length === 1) {
            results[0].isActive = true;
            store.state.searchList = results;
            this.message = "";
            return store.state.searchList;
          } else {
            store.state.searchList = [];

            if (this.searchQuery) {
              this.message = `Your searches for "${this.searchQuery}" did not have any matches. Try different keywords.`;
            } else {
              this.message = "No Data Found. Please try again later.";
            }
          }
        })
        .catch((error) => {
          store.state.isLoading = false;
          this.error = error.name + ": " + error.message;
          this.isInputDisabled = true;
        });
    },

    showNavigationBtn() {
      if (this.$refs.resultListContainer.scrollTop > 450) {
        this.isHidden = false;
        this.isScrollToTopActive = true;
      } else {
        this.isHidden = true;
      }
    },
    scrollListToTop() {
      this.isScrollToTopActive = true;
      this.$refs.resultListContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.displayedBreeds.forEach((breed) => {
        breed.isActive = false;
      });
      if (this.$route.name !== "breeds") {
        this.$router.push({
          name: "breeds",
        });
      }
    },

    toggleCard(breed, id) {
      this.currentIndex = id;
      breed.isActive = !breed.isActive;
      store.actions.fetchData();

      if (breed.isActive) {
        this.indexClicked++;
        this.lastBreedState.push(id);
      }
      this.displayedBreeds.forEach((item) => {
        if (item.name !== breed.name) {
          item.isActive = false;
        }
      });
    },

    openDetailsOnRouteParam(breedName) {
      const breedNameParam = breedName.params.breedName;

      if (breedNameParam) {
        this.displayedBreeds.filter((breed) => {
          if (breedNameParam.toLowerCase() === breed.name.toLowerCase()) {
            breed.isActive = true;
          }
        });
      }
    },

    // bredNameParamNotFound(breedName) {
    //   console.log(breedName);
    //   console.log(this.breedName);
    // const breedNameParam = breedName.params.breedName;
    // if (!breedNameParam || this.displayedBreeds.length !== 1) {
    // searchBreed(breedNameParam).then((result) => {
    //   if (result.length === 0) {
    // this.$router.push({
    //   name: "notFound",
    // });
    // }
    // });
    // }
    // },
    scrollToView(index) {
      console.log(index);
      this.displayedBreeds.forEach((breed) => {
        if (breed.isActive) {
          console.log(breed);
          this.$refs.resultListContainer.children[
            this.lastBreedState[index]
          ].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    },
  },
  computed: {
    displayedBreeds() {

      // if (this.searchQuery) {
      //   return store.state.searchList;
      // } else {
      //   return store.state.breedsList;
      // }
      // return store.getters.displayedList();

      if (this.$route.name === "search") {
        return this.searchList;
      } else {
        return this.breedsList;
      }

    },

    loadingState() {
      if (store.state.isLoading) {
        return this.message;
      } else if (!store.state.isLoading && this.error) {
        return this.error;
      }
    },
    receivedDataState() {
      if (!this.displayedBreeds.length && !store.state.isLoading) {
        return this.message;
      }
    },
    expandbleClass() {
      this.displayedBreeds.forEach((breed) =>
        breed.isActive ? "expandble" : "result__list"
      );
    },
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler(newRoute) {
        if (this.$route.name === "search") {
          this.getSearchResults(newRoute);
        }
      },
    },
    breedsList(newList, oldList) {
      console.log(newList, oldList);
      newList.forEach((breed) => {
        if (breed.name.toLowerCase() === this.breedName.toLowerCase()) {
          breed.isActive = true;
        }
      });
    },

    $route(newRoute, oldRoute) {
      this.lastBreedState = [];
      this.indexClicked = 0;
      this.displayedBreeds.forEach((breed) => {
        breed.isActive = false;
      });
    },

    openDetailsOnRouteParam(newParam, oldParam) {
      this.openDetailsOnRouteParam(newParam);
    },

    indexClicked(newIndex, oldIndex) {
      this.displayedBreeds.forEach((breed) => {
        if (breed.isActive) {
          this.$refs.resultListContainer.children[
            this.lastBreedState[oldIndex]
          ].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.result__list-container {
  list-style-type: none;
  padding: 0;
  max-height: 67vh;
  overflow-y: scroll;
}

p {
  font-size: 1.4rem;
}
.hidden {
  display: none;
}

ul::-webkit-scrollbar {
  display: none;
}

.result__message {
  font-weight: 500;
  margin: 0 8rem;
  padding: 1rem 0rem;
  text-align: center;
  background-color: #f2e3dbad;
  color: var(--color-primary);
  @media only screen and (max-width: 1300px) {
    margin: 0 7rem;
  }
  @media only screen and (max-width: 1000px) {
    margin: 0 5rem;
  }
  @media only screen and (max-width: 700px) {
    margin: 0 2rem;
    font-size: 1.1rem;
  }
  @media only screen and (max-width: 500px) {
    margin: 0 2rem;
    font-size: 1rem;
  }
  @media only screen and (max-width: 450px) {
    margin: 0 1rem;
    font-size: 0.8rem;
  }
}

.expandble {
  padding: 4rem 3rem;
  box-shadow: 15px 5px 8px 0px #6264728f;
  padding: 1.5rem 4rem;
}
.result__details {
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 4rem;
}
.hidden {
  display: none;
}
</style>
