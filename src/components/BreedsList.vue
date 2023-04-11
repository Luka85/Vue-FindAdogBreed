<template>
  <section>
    <search-form
      :isDisabled="isInputDisabled"
      @search="getSearchResults"
    ></search-form>

    <div class="result__container">
      <p v-if="isLoading">The Data is Loading ...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="isTimeOut && !displayedBreeds.length">
        The request takes longer than expected...
      </p>
      <p v-else-if="!isLoading && !breedsList.length">
        No Data Found. Please try again later.
      </p>

      <ul v-else>
        <li v-if="!isLoading && searchQuery !== '' && !searchList.length">
          Your searches for "{{ this.searchQuery }}" did not have any matches.
          Try different keywords.
        </li>

        <li
          v-for="(breed, index) in displayedBreeds"
          class="result__list"
          :key="breed.id"
        >
          <div class="result__heading-container">
            <span class="result__id">{{ index + 1 }}.</span>
            <h3 class="heading-tertiary">{{ breed.name }}</h3>
          </div>

          <div class="result__details">
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
      searchList: [],
      isLoading: false,
      error: null,
      isTimeOut: false,
      searchQuery: "",
      isInputDisabled: false,
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
          this.isTimeOut = false;
          this.isLoading = false;
          if (results.length > 0) {
            this.breedsList = results;
          } else {
            this.breedsList = [];
            this.isInputDisabled = true;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
          this.isInputDisabled = true;
        });
    },
    getSearchResults(input) {
      this.isLoading = true;
      setTimeout(() => {
        if (this.isLoading) {
          this.isTimeOut = true;
          this.isLoading = false;
        }
      }, 1000);
      this.searchQuery = input;

      searchBreed(this.searchQuery)
        .then((results) => {
          this.isTimeOut = false;
          this.isLoading = false;
          this.searchList = results;
          if (results.length > 0) {
            this.searchList = results;
          } else {
            this.searchList = [];
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
        });
    },
  },
  computed: {
    displayedBreeds() {
      if (this.searchList.length > 0) {
        return this.searchList;
      } else if (this.searchList.length === 0 && this.searchQuery !== "") {
        this.searchList = [];
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.result__list {
  font-size: 1.4rem;
  padding: 3rem 8rem;
  display: flex;
  flex-direction: column;
}
.result__list:hover {
  /* transform: scale(1.05);
  transition: 0.3s all; */
}
.result__heading-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border-left: 4px solid transparent;

  border-bottom: 1px solid transparent;
}

.result__heading-container:hover {
  cursor: pointer;
  border-left: 4px solid #f2f4f3;
  border-bottom: 1px solid #f2f4f3;
}
.result__id {
  font-size: 1.6rem;
  font-weight: 500;
  background-color: #011018;
  padding: 1rem 2rem;
  color: var(--color-secondary);
}

.result__list:nth-child(odd) {
  background-color: #f2e3db41;
}
.result__details {
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
  font-size: 1.7rem;
  font-weight: 500;
  padding: 1rem 2rem;
  margin: 0;
  width: 100%;
  background-color: #f2e3db3b;
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
  border: 0.3rem solid #0110188a;
}

.hidden {
  display: none;
}
</style>
