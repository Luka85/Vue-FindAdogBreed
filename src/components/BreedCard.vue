<template>
  <li
    ref="listItemRef"
    @click="toggleDetails"
    :class="!breed.isActive ? 'hidden-result__details' : 'result__list'"
  >
    <div class="result__heading-container">
      <span class="result__id">{{ id + 1 }}.</span>
      <h3 class="heading-tertiary">{{ breed.name }}</h3>
    </div>
    <div :class="hiddenClass" @click.stop>
      <router-link :to="{ name: 'details', params: { breedName: breed.name } }"
        >Learn more...</router-link
      >
    </div>
    <!-- <slot></slot> -->
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
      this.$emit("toggle", this.breed);
      if (this.breed.isActive) {
        console.log(this.$refs.listItemRef);
        this.$refs.listItemRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
  },

  computed: {
    hiddenClass() {
      return !this.breed.isActive ? "hidden" : "result__details";
    },
  },
};
</script>

<style scoped>
.result__list {
  font-size: 1.4rem;
  padding: 3rem 8rem;

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
  margin-top: 2rem;
  margin-bottom: 1rem;
  transition: all 0.3s;
  display: inline-block;
}

.heading-tertiary {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 2rem;
  margin: 0;
  width: 100%;
}

.hidden {
  display: none;
}

a {
  color: var(--color-secondary);
}
a,
a:hover {
  display: inline-block;
  text-decoration: none;
  background-color: var(--color-primary);

  padding: 0.8rem 4rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0;
  border-radius: 0.3rem;
}

a:hover {
  transform: scale(1.02) translateY(-0.1rem);
  box-shadow: 5px 5px 4px 0px #6264728f;
}

a:active {
  transform: scale(1.02) translateY(0.2rem);
  box-shadow: 3px 3px 2px 0px #6264728f;
}

.router-link-active {
  background-color: var(--background-color2);
  color: var(--color-primary);
  font-weight: 600;

  box-shadow: 5px 5px 4px 0px #6264728f;
}
.router-link-active:hover,
.router-link-active:active {
  background-color: var(--background-color2);
}
.router-link-active:hover,
.router-link-active:active {
  transform: scale(1.02) translateY(-0.1rem);
  box-shadow: 5px 5px 4px 0px #6264728f;
}

.router-link-active:active {
  transform: scale(1.02) translateY(0.1rem);
  box-shadow: 2px 2px 2px 0px #6264728f;
}
</style>
