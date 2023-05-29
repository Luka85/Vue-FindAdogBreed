<template>
  <div :class="hiddenClass">
    <div class="result__description">
      <span class="result__temperament result__item--margin"
        ><span class="result__description--title">Temperament: </span>
        {{ breed.temperament }}</span
      >
      <span class="result__life result__item--margin"
        ><span class="result__description--title">Life span: </span>
        {{ breed.life_span }}</span
      >
      <span class="result__height result__item--margin"
        ><span class="result__description--title">Height: </span>
        {{ breed.height.metric }}cm</span
      >
      <span class="result__weight result__item--margin"
        ><span class="result__description--title">Weight: </span>
        {{ breed.weight.metric }}kg</span
      >
    </div>
    <img
      class="result__breed-image"
      :src="`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`"
      :alt="`Picture of the ${breed.name} dog`"
    />
  </div>
</template>

<script>
export default {
  props: {
    breed: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hiddenClass() {
      return this.breed.isActive ? "result__details" : "hidden";
    },
  },
};
</script>

<style scoped>
.result__description {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 2rem;
}
.result__description--title {
  font-weight: 500;
}

.result__item--margin:not(:last-child) {
  margin-bottom: 0.6rem;
}
.result__breed-image {
  height: 20rem;
  border-radius: 0.5rem;
  border: 0.3rem solid var(--color-primary);
}
.hidden {
  display: none;
}

.result__details {
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 4rem;
}
</style>
