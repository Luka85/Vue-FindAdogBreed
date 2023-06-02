<template>
  <div :class="hiddenClass">
    <h3 class="heading-details">
      {{ breed.name }}
    </h3>
    <div class="result__description">
      <ul>
        <li class="result__temperament result__item--margin">
          <span class="result__description--title">Temperament: </span>
          {{ breed.temperament }}
        </li>
        <li class="result__life result__item--margin">
          <span class="result__description--title">Life span: </span>
          {{ breed.life_span }}
        </li>
        <li class="result__height result__item--margin">
          <span class="result__description--title">Height: </span>
          {{ breed.height.metric }}cm
        </li>
        <li class="result__weight result__item--margin">
          <span class="result__description--title">Weight: </span>
          {{ breed.weight.metric }}kg
        </li>
      </ul>
      <img
        class="result__breed-image"
        :src="`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`"
        :alt="`Picture of the ${breed.name} dog`"
      />
    </div>
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
      return this.breed.isActive ? "result__details-page" : "hidden";
    },
  },
};
</script>

<style scoped>
.result__description {
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;
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

.result__details-page {
  padding: 3rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  background-color: var(--background-color3);
}

.heading-details {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;

  margin: 0;
  width: 100%;
  margin-bottom: 2rem;
}

ul {
  margin-right: 1rem;
}
</style>
