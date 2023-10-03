<template>
  <form @submit.prevent class="userLogin__form">
    <label for="username">Username:</label>
    <input
      type="text"
      name="username"
      placeholder="Type your username"
      class="userLogin__input"
    />
    <label for="password">Password:</label>
    <input
      type="password"
      name="password"
      placeholder="Type your password"
      class="userLogin__input"
    />
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
.userLogin__form {
  color: var(--color-primary);
  margin-bottom: 3rem;
  padding: 0 8rem;
  @media only screen and (max-width: 700px) {
    padding: 0 2rem;
  }
}
.userLogin__input {
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.2rem;
  border: none;
  border-bottom: 3px solid transparent;
  width: 100%;
  padding: 1rem 1.3rem 0.8rem 1rem;

  background-color: #f2e3dbad;
  color: inherit;
}

.userLogin__input:focus {
  outline: none;
  border-bottom: 0.3rem solid var(--color-primary);
}

::placeholder {
  font-size: 1.3rem;
  font-weight: 400;
  color: inherit;
}
</style>
