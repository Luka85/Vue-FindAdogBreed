<template>
  <section ref="breedListRef" class="breedsList__container">
    <keep-alive>
      <search-form
        ref="searchRef"
        :isDisabled="isInputDisabled"
        @search="getSearchResults"
        v-if="this.$route.name === 'breeds' || this.$route.name === 'search'"
      ></search-form>
    </keep-alive>

    <the-navigation
      v-if="displayedList.length !== 0"
      :lastState="lastBreedState"
      :id="indexClicked"
      :breeds="displayedList"
      @countdown="scrollToView"
      @addingUp="scrollToView"
    ></the-navigation>

    <div class="result__container">
      <p class="result__message" v-if="loadingState">
        {{ loadingState }}
      </p>
      <p class="result__message" v-else-if="receivedDataState">
        {{ receivedDataState }}
      </p>

      <ul
        v-else-if="
          this.$route.name === 'breeds' || this.$route.name === 'search'
        "
        class="result__list-container"
        ref="resultListContainer"
        @scroll="showNavigationBtn"
      >
        <breed-card
          @toggle="toggleCard"
          v-for="(breed, index) in displayedList"
          :breed="breed"
          :key="breed.id"
          :id="index"
          :class="{ expandble: breed.isActive, result__list: !breed.isActive }"
        >
        </breed-card>
      </ul>
      <div
        v-else-if="this.$route.name === 'details'"
        v-for="(breed, index) in displayedList"
        :key="breed.id"
        :searchQuery="searchQuery"
      >
        <router-view :breed="breed"></router-view>
        >
      </div>
    </div>
    <navigation-button
      @clickToScroll="scrollListToTop"
      :class="{ hidden: isHidden ? 'hidden' : '' }"
    ></navigation-button>
  </section>
</template>
<script>
import SearchForm from "./SearchForm.vue";
import BreedCard from "./BreedCard.vue";
import NavigationButton from "./NavigationButton.vue";
import BreedDetails from "./BreedDetails.vue";

import TheNavigation from "./TheNavigation.vue";
import { mapState, mapActions } from "pinia";
import { useStore } from "../store.js";

export default {
  components: {
    SearchForm,
    BreedCard,
    NavigationButton,
    BreedDetails,
    TheNavigation,
  },

  props: {
    breedName: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isHidden: true,
      isScrollToTopActive: false,
      lastBreedState: [],
      indexClicked: 0,
    };
  },
  methods: {
    ...mapActions(useStore, ["fetchBreedData", "getSearchResults"]),

    showNavigationBtn() {
      if (this.$refs.resultListContainer.scrollTop > 450) {
        this.isHidden = false;
        this.isScrollToTopActive = true;
      } else {
        this.isHidden = true;
      }
    },
    scrollListToTop() {
      this.isScrollToTopActive = true;
      this.$refs.resultListContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.displayedList.forEach((breed) => {
        breed.isActive = false;
      });
      if (this.$route.name !== "breeds") {
        this.$router.push({
          name: "breeds",
        });
      }
    },

    toggleCard(breed, id) {
      this.currentIndex = id;
      breed.isActive = !breed.isActive;
      if (breed.isActive) {
        this.indexClicked++;
        this.lastBreedState.push(id);
      }
      this.displayedList.forEach((item) => {
        if (item.name !== breed.name) {
          item.isActive = false;
        }
      });
    },

    openDetailsOnRouteParam(breedName) {
      const breedNameParam = breedName.params.breedName;
      if (breedNameParam) {
        this.displayedList.filter((breed) => {
          if (breedNameParam.toLowerCase() === breed.name.toLowerCase()) {
            breed.isActive = true;
          }
        });
      }
    },

    // bredNameParamNotFound(breedName) {
    //   console.log(breedName);
    //   console.log(this.breedName);
    // const breedNameParam = breedName.params.breedName;
    // if (!breedNameParam || this.displayedBreeds.length !== 1) {
    // searchBreed(breedNameParam).then((result) => {
    //   if (result.length === 0) {
    // this.$router.push({
    //   name: "notFound",
    // });
    // }
    // });
    // }
    // },
    scrollToView(index) {
      console.log(index);
      this.displayedList.forEach((breed) => {
        if (breed.isActive) {
          console.log(breed);
          this.$refs.resultListContainer.children[
            this.lastBreedState[index]
          ].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    },
  },
  computed: {
    ...mapState(useStore, [
      "displayedList",
      "loadingState",
      "receivedDataState",
      "isInputDisabled",
      "searchQuery",
    ]),

    expandbleClass() {
      this.displayedList.forEach((breed) =>
        breed.isActive ? "expandble" : "result__list"
      );
    },
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler(newRoute) {
        if (this.$route.name === "search") {
          console.log(newRoute);
          this.getSearchResults(newRoute);
        }
      },
    },
    breedsList(newList, oldList) {
      console.log(newList, oldList);
      newList.forEach((breed) => {
        if (breed.name.toLowerCase() === this.breedName.toLowerCase()) {
          breed.isActive = true;
        }
      });
    },

    $route(newRoute, oldRoute) {
      this.lastBreedState = [];
      this.indexClicked = 0;
      this.displayedList.forEach((breed) => {
        breed.isActive = false;
      });
    },

    openDetailsOnRouteParam(newParam, oldParam) {
      this.openDetailsOnRouteParam(newParam);
    },

    indexClicked(newIndex, oldIndex) {
      this.displayedList.forEach((breed) => {
        if (breed.isActive) {
          this.$refs.resultListContainer.children[
            this.lastBreedState[oldIndex]
          ].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    },
  },
  created() {
    this.fetchBreedData();
  },
};
</script>

<style scoped>
.result__list-container {
  list-style-type: none;
  padding: 0;
  max-height: 67vh;
  overflow-y: scroll;
}

p {
  font-size: 1.4rem;
}
.hidden {
  display: none;
}

ul::-webkit-scrollbar {
  display: none;
}

.result__message {
  font-weight: 500;
  margin: 0 8rem;
  padding: 1rem 0rem;
  text-align: center;
  background-color: #f2e3dbad;
  color: var(--color-primary);
  @media only screen and (max-width: 1300px) {
    margin: 0 7rem;
  }
  @media only screen and (max-width: 1000px) {
    margin: 0 5rem;
  }
  @media only screen and (max-width: 700px) {
    margin: 0 2rem;
    font-size: 1.1rem;
  }
  @media only screen and (max-width: 500px) {
    margin: 0 2rem;
    font-size: 1rem;
  }
  @media only screen and (max-width: 450px) {
    margin: 0 1rem;
    font-size: 0.8rem;
  }
}

.expandble {
  padding: 4rem 3rem;
  box-shadow: 15px 5px 8px 0px #6264728f;
  padding: 1.5rem 4rem;
}
.result__details {
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 4rem;
}
.hidden {
  display: none;
}
</style>
