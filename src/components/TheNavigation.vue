<template>
  <div class="navigation-container" v-if="this.$route.name !== 'details'">
    <button
      class="btn-back btn btn-nav"
      :disabled="disabledBackBtn"
      @click="goBack"
    >
      <font-awesome-icon
        icon="fa-solid fa-angles-left"
        size="xl"
        class="icon-left"
      />
      Back
    </button>
    <button
      class="btn-forward btn btn-nav"
      :disabled="disabledForwardBtn"
      @click="goForward"
    >
      Forward
      <font-awesome-icon
        icon="fa-solid fa-angles-right"
        class="icon-right"
        size="xl"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    lastState: {
      type: Array,
    },

    id: {
      type: Number,
      default: 0,
    },
    breeds: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      isBackButtonClicked: false,
      isForwardButtonClicked: false,
    };
  },
  methods: {
    goBack() {
      this.isBackButtonClicked = true;
      this.isForwardButtonClicked = false;

      this.breeds.forEach((breed) => {
        breed.isActive = false;
      });
      this.index--;

      this.breeds[this.lastState[this.index]].isActive = true;
      this.$emit("checkingIndex", this.index);
    },
    goForward() {
      this.isForwardButtonClicked = true;
      this.isBackButtonClicked = false;

      this.breeds.forEach((breed) => {
        breed.isActive = false;
      });
      this.index++;
      this.breeds[this.lastState[this.index]].isActive = true;
      this.$emit("checkingIndex", this.index);
    },
  },
  computed: {
    disabledBackBtn() {
      if (this.index === 0) {
        return true;
      } else if (this.lastState.length > 1) {
        return false;
      } else if (this.lastState.length === 0) {
        return true;
      } else return false;
    },
    disabledForwardBtn() {
      if (this.index === this.lastState.length - 1) {
        return true;
      } else if (this.isBackButtonClicked) {
        return false;
      } else if (this.index === 0) {
        return true;
      } else return false;
    },
  },
  watch: {
    id(newIndex, oldIndex) {
      this.index = this.id;

      this.index--;
    },
  },
};
</script>

<style scoped>
.navigation-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn-back {
  margin-right: 1rem;
  padding: 0.8rem 2rem;
  width: 13rem;
}
.btn-forward {
  padding: 0.8rem 2rem;
  width: 13rem;
}

.btn-nav:hover {
  transform: scale(1.02) translateY(-0.1rem);
  box-shadow: 5px 5px 10px 0px #3e3f47;
}
.btn-nav:active {
  transform: scale(1.02) translateY(0.2rem);
  box-shadow: 3px 3px 2px 0px #3e3f47;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  font-weight: 400;
}

.icon-left {
  margin-right: 1rem;
}
.icon-right {
  margin-left: 1rem;
}

.btn:disabled {
  background-color: #0110189a;
  color: #f2f4f396;
}
</style>
