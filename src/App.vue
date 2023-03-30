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
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.breed_image {
  width: 20rem;
  height: auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
