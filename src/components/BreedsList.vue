<template>
  <section ref="breedListRef" class="breedsList__container">
    <search-form
      ref="searchRef"
      :isDisabled="isInputDisabled"
      @search="getSearchResults"
    ></search-form>
    <div class="result__container">
      <p class="result__message" v-if="loadingState">{{ loadingState }}</p>
      <p class="result__message" v-else-if="receivedDataState">
        {{ receivedDataState }}
      </p>
      <ul
        v-else
        class="result__list-container"
        ref="resultListContainer"
        @scroll="showNavigationBtn"
      >
        <breed-card
          v-for="(breed, index) in displayedBreeds"
          :breed="breed"
          :key="breed.id"
          :id="index"
          @toggle="toggleCard"
          :class="{ expandble: breed.isActive, result__list: !breed.isActive }"
        >
          <template v-slot:default>
            <router-view :breed="breed"></router-view>
            <!-- <breed-details :breed="breed"></breed-details> -->
          </template>
        </breed-card>
      </ul>
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
export default {
  components: {
    SearchForm,
    BreedCard,
    NavigationButton,
    BreedDetails,
  },

  props: {
    breedName: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      breedsList: [],
      searchList: [],
      isLoading: false,
      error: null,
      searchQuery: "",
      isInputDisabled: false,
      isHidden: true,
      message: "",
      isScrollToTopActive: false,
    };
  },
  methods: {
    fetchData() {
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
          // console.log(this.searchQuery);
          this.isLoading = false;
          if (results.length > 0) {
            this.message = "";
            this.searchList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
            // console.log(this.searchList);
          } else if (results.length === 1) {
            results[0].isActive = true;
            this.searchList = results;
            // console.log(this.searchList);
            // console.log(this.$route);

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
    toggleCard(breed) {
      console.log(breed.isActive, breed.name, this.$route.name);
      breed.isActive = !breed.isActive;

      this.displayedBreeds.forEach((item) => {
        if (item.name !== breed.name) {
          item.isActive = false;
        }
      });
      if (!breed.isActive) {
        console.log("push");
        this.$router.push({
          name: "breeds",
        });
      }
    },
    scrollToBreedCard(breedName) {
      const breedNameParam = breedName.params.breedName;
      console.log("scrollToBreedCard method");
      console.log("breedName:", breedNameParam);

      if (breedNameParam) {
        this.displayedBreeds.filter((breed, id) => {
          if (breedNameParam.toLowerCase() === breed.name.toLowerCase()) {
            this.$nextTick(() => {
              this.$refs.resultListContainer.children[id].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            });
          }
        });
      }
    },
  },
  computed: {
    displayedBreeds() {
      if (this.searchQuery) {
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
    loadingState() {
      if (this.isLoading) {
        return this.message;
      } else if (!this.isLoading && this.error) {
        return this.error;
      }
    },
    receivedDataState() {
      if (!this.displayedBreeds.length && !this.isLoading) {
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
    $route(newRoute, oldRoute) {
      console.log("WATCH ROUTE", "new", newRoute, "old", oldRoute);

      if (this.$route.name === "breedName") {
        this.$router.push({
          name: "details",
        });
      }

      this.scrollToBreedCard(newRoute);
    },
  },

  created() {
    console.log("created");
    this.fetchData();
  },

  updated() {
    console.log("updated hook");

    this.scrollToBreedCard(this.$route);

    if (this.$route.name === "breedName") {
      this.$router.push({
        name: "details",
      });
    }
  },
};
</script>

<style scoped>
.result__list-container {
  list-style-type: none;
  padding: 0;
  max-height: 70vh;
  overflow-y: scroll;
  margin-bottom: 3rem;
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
