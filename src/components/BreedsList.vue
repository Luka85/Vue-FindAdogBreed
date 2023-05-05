<template>
  <section>
    <search-form
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
      required: false,
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
      index: null,
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
            this.searchList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
            this.message = "";
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
        });
    },

    showNavigationBtn() {
      if (this.$refs.resultListContainer.scrollTop > 450) {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }
    },
    scrollListToTop() {
      this.$refs.resultListContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    toggleCard(breed, id) {
      this.index = id;
      breed.isActive = !breed.isActive;
      this.displayedBreeds.forEach((item) => {
        if (item.id !== this.index + 1) {
          item.isActive = false;
        }
      });
    },
    showBreedDetailsOnRouteParam(breedName) {
      if (breedName) {
        this.displayedBreeds.filter((breed, id) => {
          if (breed.name.toLowerCase() === breedName.toLowerCase()) {
            breed.isActive = true;

            this.$refs.resultListContainer.children[
              id
            ].firstChild.scrollIntoView({
              behavior: "smooth",
              block: "start",
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
        console.log(this.error);
        return this.error;
      }
    },
    receivedDataState() {
      if (!this.displayedBreeds.length) {
        return this.message;
      }
    },
  },

  created() {
    this.fetchData();
  },

  updated() {
    console.log("updated");
    this.showBreedDetailsOnRouteParam(this.breedName);
  },
};
</script>

<style scoped>
.result__list-container {
  list-style-type: none;
  padding: 0;
  max-height: 120vh;
  overflow-x: hidden;
  overflow-y: auto;
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
