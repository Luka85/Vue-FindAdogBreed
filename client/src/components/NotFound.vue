<template>
  <h2>
    Page not found! Maybe view our
    <router-link :to="{ name: 'auth' }">Login/SignUp</router-link> page?
  </h2>
</template>

<script>
export default {};
</script>

<style scoped>
h2 {
  font-weight: 500;
  margin: 0 8rem;
  padding: 1rem 0rem;
  text-align: center;
  background-color: #f2e3dbad;
  color: var(--color-primary);
}
</style>
