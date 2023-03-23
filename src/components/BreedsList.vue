<template>
  <section>
    <p v-if="isLoading">The Data is Loading ...</p>
    <p v-else-if="!isLoading && error">{{ error }}</p>
    <p v-else-if="!isLoading && breedsList.length === 0">
      No Data Found. Please try again later.
    </p>
    <div v-else>
      <div v-for="breed in breedsList">
        <h3>{{ breed.name }}</h3>
        <span>{{ breed.breed_group }}</span>
        <span>{{ breed.life_span }}</span>
        <span>{{ breed.height.metric }}cm</span>
        <span>{{ breed.weight.metric }}kg</span>
        <img
          class="breedsList_image"
          :src="breed.image.url"
          :alt="`Picture of the ${breed.name} dog`"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { fetchBreeds } from "../data.js";
export default {
  data() {
    return {
      breedsList: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    fetchData() {
      this.isLoading = true;

      fetchBreeds()
        .then((results) => {
          this.isLoading = false;

          if (results.length > 0) {
            this.breedsList = results;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.message;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.breedsList_image {
  width: 20rem;
  height: auto;
}
</style>
