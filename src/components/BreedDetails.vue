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
    <div class="result__go-back">
      <button class="btn" @click="$router.go(-1)">Back</button>
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

    searchQuery: {
      type: String,
      required: false,
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
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.4rem;
  padding: 0 6rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1100px) {
    padding: 0 2rem;
  }
  @media only screen and (max-width: 900px) {
    padding: 0 1rem;
  }
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
}
.result__description--title {
  font-weight: 500;
}

.result__item--margin:not(:last-child) {
  margin-bottom: 1rem;
}
.result__breed-image {
  height: 20rem;
  border-radius: 0.5rem;
  border: 0.3rem solid var(--color-primary);
  @media only screen and (max-width: 1300px) {
    height: 18rem;
  }
  @media only screen and (max-width: 1000px) {
    height: 17rem;
  }
  @media only screen and (max-width: 700px) {
    height: 15rem;
  }
  @media only screen and (max-width: 400px) {
    height: 13rem;
  }
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
  @media only screen and (max-width: 1000px) {
    padding: 3rem 6rem;
  }
  @media only screen and (max-width: 900px) {
    padding: 3rem 5rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 3rem 3rem;
  }
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

.result__go-back {
  margin: 0 auto;
}

.back-btn {
  font-family: inherit;
  font-size: 1.2rem;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  padding: 0.8rem 4rem;
}

.back-btn:hover {
  transform: scale(1.02) translateY(-0.1rem);
  box-shadow: 5px 5px 4px 0px #6264728f;
}

.back-btn:active {
  transform: scale(1.02) translateY(0.2rem);
  box-shadow: 3px 3px 2px 0px #6264728f;
  background-color: var(--background-color2);
  color: var(--color-primary);
  font-weight: 700;
}
</style>
