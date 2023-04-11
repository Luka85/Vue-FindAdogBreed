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
  margin-bottom: 3rem;
}
</style>
