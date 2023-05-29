<template>
  <main class="container" ref="containerMain">
    <base-header :title="title"></base-header>
    <!-- <breeds-list></breeds-list> -->
    <router-view></router-view>
  </main>
</template>
<script>
// import BreedsList from "./components/BreedsList.vue";
export default {
  // components: {
  //   BreedsList,
  // },
  data() {
    return {
      title: "Find A Dog",
    };
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

:root {
  --color-primary: #011018;
  --color-secondary: #f2f4f3;
  --background-color1: #f2e3db;
  --background-color2: #626472e8;
  --background-color3: #b09b90;
  --background-color4: #c0aa9e;
  --color-notification: #e86a33;
}

* {
  box-sizing: border-box;
}

html {
  font-family: "Poppins", sans-serif;
  font-size: 62.5%;
}

body {
  line-height: 1.6;
  margin: 0;
  background: url(./assets/images/dog_pattern.svg), var(--background-color1);
  color: var(--color-primary);
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
}

.container {
  margin: 0 auto;
  width: 70%;
  background-color: var(--background-color2);
  border-radius: 1rem;
  box-shadow: 0px 0px 30px 0px rgba(37, 89, 124, 0.671);
  margin: 3rem 0 0 0;
  padding-bottom: 2rem;
}
</style>
