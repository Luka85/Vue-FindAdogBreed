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
      default: false,
    },
    isForwardDisabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentState: 0,
      index: 0,
    };
  },
  methods: {
    goBack() {
      console.log("back");
    },
    goForward() {},
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
