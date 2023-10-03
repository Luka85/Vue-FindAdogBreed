<template>
  <main class="container" ref="containerMain">
    <base-header :title="title"></base-header>
    <user-login></user-login>
    <router-view></router-view>
  </main>
</template>
<script>
export default {
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
  font-size: 62%;

  @media only screen and (max-width: 1300px) {
    font-size: 60%;
  }
  @media only screen and (max-width: 1000px) {
    font-size: 58%;
  }
  @media only screen and (max-width: 700px) {
    font-size: 53%;
  }
  @media only screen and (max-width: 500px) {
    font-size: 48%;
  }
}

body {
  line-height: 1.6;
  margin: 0;
  background: url(./assets/images/dog_pattern.svg), var(--background-color1);
  color: var(--color-primary);
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.container {
  margin: 0 auto;
  width: 70%;
  background-color: var(--background-color2);
  border-radius: 1rem;
  box-shadow: 0px 0px 30px 0px rgba(37, 89, 124, 0.671);
  margin: 2rem 0 0 0;

  padding-bottom: 2rem;
  @media only screen and (max-width: 1300px) {
    width: 75%;
  }
  @media only screen and (max-width: 1000px) {
    width: 85%;
  }
}

.btn {
  font-family: inherit;
  font-size: 1.2rem;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  padding: 0.8rem 4rem;
}

.btn:hover {
  transform: scale(1.02) translateY(-0.1rem);
  box-shadow: 5px 5px 4px 0px #6264728f;
}

.btn:active {
  transform: scale(1.02) translateY(0.2rem);
  box-shadow: 3px 3px 2px 0px #6264728f;
  background-color: var(--background-color2);
  color: var(--color-primary);
  font-weight: 700;
}
</style>
