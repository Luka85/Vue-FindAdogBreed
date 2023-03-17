<template>
  <section>
    <div v-for="breed in breedsList">
      <h3>{{ breed.name }}</h3>
      <span>{{ breed.breed_group }}</span>
      <span>{{ breed.life_span }}</span>
      <img
        class="breedsList_image"
        :src="breed.image.url"
        :alt="`Picture of the ${breed.name} dog`"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      breedsList: [],
    };
  },
  methods: {
    fetchAllData() {
      fetch(`https://api.thedogapi.com/v1/breeds/`)
        .then((response) => response.json())
        .then((results) => {
          this.breedsList = results;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.fetchAllData();
  },
};
</script>

<style scoped>
.breedsList_image {
  width: 20rem;
  height: auto;
}
</style>
