<template>
  <button
    class="btn-nav"
    @click.prevent="scrollListToTop"
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
    scrollListToTop() {
      this.$emit("clickToScroll", this.$refs.clickToScroll);
    },
  },
};
</script>

<style scoped>
.btn-nav {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  width: 5rem;
  height: 5rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 1rem 0 1rem 0;
  transition: all 0.3s;
  @media only screen and (max-width: 700px) {
    width: 4rem;
    height: 4rem;
    bottom: 9rem;
    right: 2rem;
  }
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
