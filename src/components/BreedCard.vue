<template>
  <li
    class="result__list"
    @click="toggleDetails()"
    :class="!isActive ? 'hidden-result__details' : 'result__list'"
  >
    <div class="result__heading-container">
      <span class="result__id">{{ id + 1 }}.</span>
      <h3 class="heading-tertiary">{{ breed.name }}</h3>
    </div>

    <div class="result__details" :class="hiddenClass">
      <div class="result__description">
        <span class="result__temperament result__item--margin"
          ><span class="result__description--title">Temperament: </span>
          {{ breed.temperament }}</span
        >
        <span class="result__life result__item--margin"
          ><span class="result__description--title">Life span: </span>
          {{ breed.lifeSpan }}</span
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
  </li>
</template>

<script>
export default {
  props: {
    breed: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleDetails() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    hiddenClass() {
      return { hidden: !this.isActive };
    },
  },
};
</script>

<style scoped>
.result__list {
  font-size: 1.4rem;
  padding: 3rem 8rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.result__list:nth-child(odd) {
  background-color: var(--background-color3);
}
.result__list:nth-child(even) {
  background-color: var(--background-color4);
}
.result__list:hover {
  transform: scale(1.01);
  box-shadow: 5px 5px 4px 0px #6264728f;
}
.hidden-result__details {
  transition: all 0.3s;
  padding: 1rem 1rem;
}
.hidden-result__details:nth-child(odd) {
  background-color: var(--background-color3);
}
.hidden-result__details:nth-child(even) {
  background-color: var(--background-color4);
}
.hidden-result__details:hover {
  transform: scale(1.01);
  box-shadow: 5px 5px 4px 0px #6264728f;
}
.result__heading-container {
  display: flex;
  align-items: center;
  background-color: #f2e3db60;
  border-radius: 1rem 0.2rem 0.2rem 0;
}

.result__heading-container:hover {
  cursor: pointer;
}
.result__id {
  font-size: 1.5rem;
  font-weight: 500;
  background-color: var(--color-primary);
  padding: 1rem 2rem;
  color: var(--color-secondary);
  border-radius: 1rem 0 1rem 0;
}

.result__details {
  margin-top: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0.8rem;
}
.result__description {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 2rem;
}
.heading-tertiary {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 2rem;
  margin: 0;
  width: 100%;
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
</style>
