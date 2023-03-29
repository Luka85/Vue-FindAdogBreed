<template>
  <section>
    <search-form @search="getResults"></search-form>
    <ul>
      <search-results
        v-for="result in searchResultsArray"
        :key="result.id"
        :result="result"
      >
      </search-results>
    </ul>
  </section>
</template>

<script>
import SearchForm from "./SearchForm.vue";
import SearchResults from "./SearchResults.vue";
import { searchBreed } from "../data";
export default {
  components: {
    SearchForm,
    SearchResults,
    searchBreed,
  },
  data() {
    return {
      searchResultsArray: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    getResults(input) {
      console.log(input);

      this.isLoading = true;
      searchBreed(input)
        .then((results) => {
          this.isLoading = false;
          if (results.length > 0) {
            console.log(results);
            this.searchResultsArray = results;
          } else {
            this.searchResultsArray = results;
            console.log(this.searchResultsArray);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
        });
    },
  },
};
</script>

<style scoped></style>
