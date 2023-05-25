<template>
  <li ref="activeLi" class="result__list">
    <div class="result__heading-container">
      <span class="result__id">{{ id + 1 }}.</span>
      <h3 class="heading-tertiary">{{ breed.name }}</h3>
      <div @click="toggleDetails" class="result__link-container">
        <router-link
          :to="{ name: 'details', params: { breedName: breed.name } }"
          >{{ toggleText }}</router-link
        >
      </div>
    </div>
    <!-- :class="breed.isActive ? 'router-link-active' : ''" -->

    <slot> </slot>
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

  methods: {
    toggleDetails() {
      console.log("scrolla na klik");
      console.log("toggle BreedCard", this.breed.isActive);

      const refLi = this.$refs.activeLi;
      this.$emit("toggle", this.breed);

      this.$nextTick(() => {
        refLi.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    },
  },

  computed: {
    toggleText() {
      return this.breed.isActive ? `Hide details` : `Show Details`;
    },
  },
};
</script>

<style scoped>
.result__list {
  font-size: 1.4rem;
  padding: 1.5rem 10rem;
  transition: all 0.3s;
  max-height: 50rem;
  transition: all 0.3s ease-in-out;
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

.result__heading-container {
  display: flex;
  align-items: center;
  background-color: #f2e3db60;
  border-radius: 1rem 0 1rem 0;
}

.result__id {
  font-size: 1.5rem;
  font-weight: 500;
  background-color: var(--color-primary);
  padding: 1rem 2rem;
  color: var(--color-secondary);
  border-radius: 1rem 0 1rem 0;
}

.heading-tertiary {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 2rem;
  margin: 0;
  flex: 2;
}

a {
  text-decoration: none;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 300;
  background-color: var(--color-primary);
  padding: 1.1rem 2rem;
  height: 100%;
  color: var(--color-secondary);
  border: 2px solid transparent;
  border-radius: 1rem 0 1rem 0;
}

a.router-link-active {
  background-color: var(--background-color2);
  color: var(--color-primary);
  font-weight: 500;
}

a:hover,
a:active,
.router-link-active:hover {
  transform: scale(2);
  background-color: var(--background-color2);
  /* color: var(--color-secondary); */
  box-shadow: 4px 4px 4px 0px #6264728f;
}
result__link-container:hover {
  transform: scale(2);
}
</style>
