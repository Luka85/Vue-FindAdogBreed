<template>
  <section>
    <search-form
      :isDisabled="isInputDisabled"
      @search="getSearchResults"
    ></search-form>

    <div class="result__container">
      <p v-if="isLoading">The Data is Loading ...</p>
      <p v-else-if="!isLoading && error" class="result__error">{{ error }}</p>
      <p v-else-if="isTimeOut && !displayedBreeds.length">
        The request takes longer than expected...
      </p>
      <p v-else-if="!isLoading && !breedsList.length">
        No Data Found. Please try again later.
      </p>

      <ul v-else>
        <li v-if="!isLoading && searchQuery !== '' && !searchList.length">
          Your searches for "{{ this.searchQuery }}" did not have any matches.
          Try different keywords.
        </li>

        <breed-card
          v-for="(breed, index) in displayedBreeds"
          :key="breed.id"
          :index="index"
          :name="breed.name"
          :temperament="breed.temperament"
          :lifeSpan="breed.life_span"
          :weight="breed.weight.metric"
          :height="breed.height.metric"
          :imageId="breed.reference_image_id"
        ></breed-card>
      </ul>
    </div>
  </section>
</template>

<script>
import { fetchBreeds } from "../data.js";
import SearchForm from "./SearchForm.vue";
import { searchBreed } from "../data";
import BreedCard from "./BreedCard.vue";
export default {
  components: {
    SearchForm,
    BreedCard,
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
  },
  computed: {
    displayedBreeds() {
      if (this.searchList.length > 0) {
        return this.searchList;
      } else if (this.searchList.length === 0 && this.searchQuery !== "") {
        this.searchList = [];
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

p {
  font-size: 1.4rem;
}
</style>
