<template>
  <form @submit.prevent>
    <input
      type="text"
      name="breed"
      id="breed"
      placeholder="Type a dog breed..."
      ref="searchInput"
      @input="debounceSearch"
      :disabled="isDisabled"
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

<style scoped></style>
