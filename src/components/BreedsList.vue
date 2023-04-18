<template>
  <section>
    <search-form
      :noMatches="errorState.class"
      :isDisabled="isInputDisabled"
      @search="getSearchResults"
    ></search-form>

    <div class="result__container">
      <p v-if="errorState" class="result__message">
        {{ errorState.message }}
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
        ></breed-card>
      </ul>
    </div>
    <navigation-button
      @clickToScroll="scrollToTop"
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

  data() {
    return {
      breedsList: [],
      searchList: [],
      isLoading: false,
      error: null,
      isTimeOut: false,
      searchQuery: "",
      isInputDisabled: false,
      isHidden: true,
      inputIsInvalid: false,
    };
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      setTimeout(() => {
        if (this.isLoading) {
          this.isTimeOut = true;
          this.isLoading = false;
        }
      }, 3000);

      fetchBreeds()
        .then((results) => {
          this.isTimeOut = false;
          this.isLoading = false;
          if (results.length > 0) {
            this.breedsList = results;
          } else {
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

      setTimeout(() => {
        if (this.isLoading) {
          this.isTimeOut = true;
          this.isLoading = false;
        }
      }, 1000);
      this.searchQuery = input;

      searchBreed(this.searchQuery)
        .then((results) => {
          this.isTimeOut = false;
          this.isLoading = false;
          this.searchList = results;
          if (results.length > 0) {
            this.searchList = results;
          } else {
            this.searchList = [];
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
        });
    },
    showNavigationBtn() {
      const resultListContainer = this.$refs.resultListContainer;

      if (resultListContainer.scrollTop > 450) {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }
    },
    scrollToTop() {
      this.$refs.resultListContainer.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  computed: {
    displayedBreeds() {
      if (this.searchList.length > 0) {
        this.inputIsInvalid = false;
        return this.searchList;
      } else if (this.searchList.length === 0 && this.searchQuery !== "") {
        this.searchList = [];
        this.inputIsInvalid = true;
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
    errorState() {
      if (this.isLoading) {
        return {
          message: "The Data is Loading ...",
        };
      } else if (!this.isLoading && this.error) {
        return {
          message: this.error,
        };
      } else if (this.isTimeOut && !this.displayedBreeds.length) {
        return {
          message: "The request takes longer than expected...",
        };
      } else if (!this.isLoading && !this.breedsList.length) {
        return {
          message: "No Data Found. Please try again later.",
        };
      } else if (
        !this.isLoading &&
        this.searchQuery !== "" &&
        !this.searchList.length
      ) {
        return {
          message: ` Your searches for "${this.searchQuery}" did not have any matches.
          Try different keywords.`,
          class: "input__no-matches",
        };
      } else {
        return false;
      }
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
