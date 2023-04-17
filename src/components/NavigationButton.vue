<template>
  <button
    class="btn-nav"
    @click="scrollToTop"
    :class="hidden"
    ref="clickToScroll"
  >
    <a href="#">
      <font-awesome-icon class="nav-icon" icon="fa-solid fa-angles-up" />
    </a>
  </button>
</template>

<script>
export default {
  props: {
    hidden: {
      type: Object,
      required: false,
    },
  },
  methods: {
    scrollToTop() {
      this.$emit("clickToScroll", this.$refs.clickToScroll);
    },
  },
};
</script>

<style scoped>
.btn-nav {
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  width: 5rem;
  height: 5rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 1rem 0 1rem 0;
  transition: all 0.3s;
}

.btn-nav:hover,
.btn-nav:visited {
  cursor: pointer;
  transform: translateY(-3px);
}
.btn-nav:active {
  cursor: pointer;
  transform: translateY(-1px);
}

.nav-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-secondary);
}
</style>
