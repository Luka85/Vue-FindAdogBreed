<template>
  <section>
    <search-form @search="getSearchResults" @reload="fetchData"></search-form>
    <div>
      <p v-if="isLoading">The Data is Loading ...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="isTimeOut && breedsList.length === 0">
        The request takes longer than expected...
      </p>
      <p v-else-if="!isLoading && breedsList.length === 0">
        No Data Found. Please try again later.
      </p>
      <ul>
        <li v-for="(breed, index) in breedsList" :key="breed.id">
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
      isLoading: false,
      error: null,
      isTimeOut: false,
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
          this.isLoading = false;
          if (results.length > 0) {
            console.log(results);
            this.breedsList = results;
            this.$emit("reload", this.breedsList);
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
      }, 3000);
      searchBreed(input)
        .then((results) => {
          this.isLoading = false;
          if (results.length > 0) {
            console.log(results);
            this.breedsList = results;
          } else {
            this.breedsList = [];
            console.log(this.breedsList);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
