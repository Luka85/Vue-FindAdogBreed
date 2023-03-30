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
    <button @click="reloadData">
      <font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Reload
    </button>
    <p v-if="searchValidity === 'invalid'">Please enter a valid breed!</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchValidity: "pending",
    };
  },
  methods: {
    getInputValue() {
      const enteredBreed = this.$refs.breedInput.value;
      if (enteredBreed.trim() === "") {
        this.searchValidity = "invalid";
        this.$refs.breedInput.value = "";
      } else {
        this.searchValidity = "valid";
        this.$emit("search", enteredBreed);
      }
    },
    reloadData() {
      this.$emit("reload");
    },
  },
};
</script>

<style scoped></style>
