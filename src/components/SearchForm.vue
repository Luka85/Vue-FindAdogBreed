<template>
  <form @submit.prevent class="search__form">
    <input
      type="text"
      name="breed"
      id="breed"
      placeholder="Type a dog breed..."
      ref="searchInput"
      @input="debounceSearch"
      :disabled="isDisabled"
      class="search__input"
    />
  </form>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchInput: "",
      debounce: null,
    };
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchInput = event.target.value;
        this.$emit("search", this.searchInput);
      }, 250);
    },
  },

  mounted() {
    this.$refs.searchInput.focus();
  },
};
</script>

<style scoped>
.search__form {
  color: var(--color-primary);
  margin-bottom: 3rem;
  padding: 0 8rem;
}
.search__input {
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.5rem;
  border: none;
  border-bottom: 3px solid #41644ad3;
  width: 100%;
  padding: 1rem 1.3rem 0.8rem 1rem;
  background-color: var(--background-color1);
  color: inherit;
}

.search__input:focus {
  outline: none;
  border-bottom: 0.3rem solid #011018d0;
}

::placeholder {
  font-size: 1.3rem;
  font-weight: 400;
  color: inherit;
}
</style>
