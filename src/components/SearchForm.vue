<template>
  <form @submit.prevent="getInputValue">
    <input
      type="text"
      name="breed"
      id="breed"
      placeholder="Type a dog breed..."
      ref="breedInput"
    />
    <button type="submit" @keydown.enter="getInputValue">Search</button>
    <button><font-awesome-icon icon="fa-solid fa-x" size="xs" /></button>
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getInputValue() {
      const enteredBreed = this.$refs.breedInput.value;

      this.$emit("search", enteredBreed);
    },
  },
};
</script>

<style scoped></style>
