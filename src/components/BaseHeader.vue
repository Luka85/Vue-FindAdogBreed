<template>
  <header>
    <h1 class="heading-primary">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.heading-primary {
  font-size: 5rem;
  font-weight: 200;
  text-align: center;
  margin: 1rem 0;
  @media only screen and (max-width: 700px) {
    font-size: 4rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 3.5rem;
  }
}
</style>
