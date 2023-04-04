<template>
  <form @submit.prevent="getInputValue">
    <input
      type="text"
      name="breed"
      id="breed"
      placeholder="Type a dog breed..."
      v-model.trim="searchInput"
      @keypress="validateInput"
      ref="searchInput"
    />

    <button type="submit" @keydown.enter.prevent="getInputValue">Search</button>
    <p v-if="searchValidity === 'invalid'">Please enter a valid breed!</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchValidity: "pending",
      searchInput: "",
    };
  },
  methods: {
    getInputValue() {
      if (this.searchValidity === "invalid") {
        return;
      } else {
        this.$emit("search", this.searchInput);
        this.searchInput = "";
      }
    },
    validateInput() {
      if (this.searchInput === "") {
        this.searchValidity = "invalid";
      } else {
        this.searchValidity = "valid";
      }
    },
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
};
</script>

<style scoped></style>
