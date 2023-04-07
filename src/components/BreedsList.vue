<template>
  <section>
    <search-form @search="getSearchResults"></search-form>

    <div>
      <p v-if="isLoading">The Data is Loading ...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="isTimeOut && !displayedBreeds.length">
        The request takes longer than expected...
      </p>
      <p v-else-if="!isLoading && !displayedBreeds.length">
        No Data Found. Please try again later.
      </p>

      <ul v-else>
        <li v-if="isTimeOut && searchQuery !== ''">
          The request takes longer than expected...
        </li>
        <li v-else-if="!isLoading && searchQuery !== ''">
          Your searches for "{{ this.searchQuery }}" did not have any matches.
          Try different keywords.
        </li>

        <li v-for="(breed, index) in displayedBreeds" :key="breed.id">
          <h3>{{ index + 1 }} {{ breed.name }}</h3>

          <span>Temperament: {{ breed.temperament }}</span>
          <span>Life span: {{ breed.life_span }}</span>
          <span>Height: {{ breed.height.metric }}cm</span>
          <span>Weight: {{ breed.weight.metric }}kg</span>
          <img
            class="breed_image"
            :src="`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`"
            :alt="`Picture of the ${breed.name} dog`"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { fetchBreeds } from "../data.js";
import SearchForm from "./SearchForm.vue";
import { searchBreed } from "../data";
export default {
  components: {
    SearchForm,
  },

  data() {
    return {
      breedsList: [],
      searchList: [],
      isLoading: false,
      error: null,
      isTimeOut: false,
      searchQuery: "",
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
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
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
      return this.searchList.length > 0 ? this.searchList : this.breedsList;
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
