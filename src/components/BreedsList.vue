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
          @toggle="toggleCard"
          v-for="(breed, index) in displayedBreeds"
          :breed="breed"
          :key="breed.id"
          :id="index"
        >
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
export default {
  components: {
    SearchForm,
    BreedCard,
    NavigationButton,
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
          this.isLoading = false;
          if (results.length > 0) {
            this.message = "";

            this.searchList = results.map((breed) => {
              breed.isActive = false;

              return breed;
            });

            if (results.length === 1) {
              this.searchList[0].isActive = true;

              return this.searchList[0];
            }
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
    toggleCard(breed, refLi) {
      breed.isActive = !breed.isActive;
      refLi.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      this.displayedBreeds.forEach((item) => {
        if (item.id !== breed.id) {
          item.isActive = false;
        }
      });
    },
    showBreedDetailsOnRouteParam(breedName) {
      if (breedName && this.$refs.resultListContainer) {
        this.displayedBreeds.forEach((breed, id) => {
          if (breed.name.toLowerCase() === breedName.toLowerCase()) {
            breed.isActive = true;
            this.$nextTick(() => {
              this.$refs.resultListContainer.children[
                id
              ].firstChild.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            });
          } else {
            breed.isActive = false;
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
  },
  watch: {
    breedName(newName, oldName) {
      if (newName !== oldName) {
        this.showBreedDetailsOnRouteParam(newName);
      }
    },

    "$route.query.q": {
      immediate: true,
      handler(newName, oldName) {
        if (newName && newName !== oldName) {
          this.searchQuery = newName;
          this.getSearchResults(this.searchQuery);
        }
      },
    },
  },

  created() {
    this.fetchData();
  },
  mounted() {
    if (this.$route.name === "search") {
      this.getSearchResults(this.searchQuery);
    }
  },

  updated() {
    if (!this.isScrollToTopActive && this.$route.name === "breedName") {
      this.showBreedDetailsOnRouteParam(this.breedName);
      this.searchQuery = "";
    }
  },

  beforeRouteLeave(to, from, next) {
    if (from.name === "search") {
      this.searchQuery = "";

      this.$refs.searchRef.$el[0].value = "";
      next();
    }
    if (from.name === "breedName") {
      this.displayedBreeds.forEach((breed) => {
        breed.isActive = false;
      });
      next();
    }

    next();
  },
};
</script>

<style scoped>
.result__list-container {
  list-style-type: none;
  padding: 0;
  max-height: 70vh;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 3rem;
  scrollbar-width: none;
  position: relative;
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
</style>
