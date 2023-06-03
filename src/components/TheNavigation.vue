<template>
  <div class="navigation-container">
    <button
      class="btn-back btn btn-nav"
      :disabled="isBackDisabled"
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
      :disabled="isForwardDisabled"
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
    isBackDisabled: {
      type: Boolean,
      default: true,
    },
    isForwardDisabled: {
      type: Boolean,
      default: true,
    },

    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      index: 1,
      isBackButtonClicked: false,
      isForwardButtonClicked: false,
      currentState: null,
    };
  },
  methods: {
    goBack() {
      console.log("back");
      this.isBackButtonClicked = true;
      this.$emit(
        "update",
        this.lastState,
        this.index,
        this.isBackButtonClicked,
        this.isForwardButtonClicked
      );

      if (
        this.lastState.length > 1 &&
        this.lastState.length - 1 >= this.index
      ) {
        this.currentState = this.lastState.length - 1 - this.index;

        this.lastState[this.lastState.length - 1 - this.index].isActive = true;
        this.lastState.forEach((state) => {
          if (
            state.name !==
            this.lastState[this.lastState.length - 1 - this.index].name
          ) {
            state.isActive = false;
          }
        });
        this.index++;
      }
    },
    goForward() {
      console.log("Forward");
      this.isForwardButtonClicked = true;
      // this.$emit(
      //   "update",
      //   this.lastState,
      //   this.index,
      //   this.isBackButtonClicked,
      //   this.isForwardButtonClicked
      // );

      if (
        this.lastState.length > 1 &&
        this.isBackButtonClicked &&
        this.lastState.length - 1 !== this.currentState
      ) {
        console.log(this.lastState.length - 1, this.currentState);
        this.lastState[this.currentState + 1].isActive = true;

        this.lastState.forEach((state) => {
          if (state.name !== this.lastState[this.currentState + 1].name) {
            state.isActive = false;
          }
        });
      }
      this.currentState++;
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
