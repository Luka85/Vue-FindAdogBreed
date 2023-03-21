<template>
  <main>
    <base-header :title="title"></base-header>
    <breeds-list></breeds-list>
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
    };
  },
};
</script>
<style></style>
