<template>
  <main>
    <base-header :title="title"></base-header>
    <breeds-list :name="text"></breeds-list>
  </main>
</template>
<script>
import BreedsList from "./components/BreedsList.vue";
export default {
  components: {
    BreedsList,
  },
  data() {
    return {
      title: "Find A Dog",
      text: "test data",
    };
  },
};
</script>
<style></style>
