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
        this.$emit("search", this.searchInput.trim());
      }, 250);
    },
  },
  watch: {
    searchInput(newValue, oldValue) {
      if (newValue !== this.$route.query.q) {
        this.$router.push({
          name: "search",
          params: {
            search: newValue,
          },
          query: { q: newValue },
        });
      }
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
  margin-bottom: 2rem;
  padding: 0 8rem;
}
.search__input {
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.2rem;
  border: none;
  border-bottom: 3px solid transparent;
  width: 100%;
  padding: 1rem 1.3rem 0.8rem 1rem;
  /* background-color: var(--background-color1); */
  background-color: #f2e3dbad;
  color: inherit;
}

.search__input:focus {
  outline: none;
  border-bottom: 0.3rem solid var(--color-primary);
}

::placeholder {
  font-size: 1.3rem;
  font-weight: 400;
  color: inherit;
}
input:disabled {
  background: #626472;
}
.input__no-matches {
  border: 2px solid var(--color-primary);
}
.input__no-matches:focus {
  border: 2px solid var(--color-primary);
}
</style>
