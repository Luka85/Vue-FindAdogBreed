<template>
  <form @submit.prevent="submitForm" class="userLogin__form">
    <label for="username">E-mail:</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Type your email"
      class="userLogin__input"
      v-model.trim="email"
    />

    <label for="password">Password:</label>
    <input
      type="password"
      name="password"
      placeholder="Type your password"
      class="userLogin__input password__input"
      v-model.trim="password"
    />
    <p v-if="!formIsValid" class="userLogin__notification">
      Please enter a valid email or password (must be at least 6 characters
      long).
    </p>

    <button class="submit__btn-active">{{ changeSubmitBtnValue }}</button>
    <button
      type="button"
      class="submit__btn"
      mode="submit__btn"
      @click="switchBtnMode"
    >
      {{ changeBtnMode }}
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "../store.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      btnMode: "login",
    };
  },
  methods: {
    ...mapActions(useStore, ["setAuth"]),
    submitForm() {
      this.formIsValid = true;
      if (this.email === "" || this.password.length < 6) {
        this.formIsValid = false;
        return;
      } else {
        this.setAuth(this.email, this.password);
        this.$router.push({
          name: "breeds",
        });

        console.log("successfully logged in");
      }
    },
    switchBtnMode() {
      if (this.btnMode === "login") {
        this.btnMode = "signUp";
      } else {
        this.btnMode = "login";
      }
    },
  },
  computed: {
    ...mapState(useStore, ["loginEmail", "loginPassword"]),
    changeSubmitBtnValue() {
      if (this.btnMode === "login") {
        return "Login";
      } else {
        return "SignUp";
      }
    },
    changeBtnMode() {
      if (this.btnMode === "login") {
        return "SignUp instead";
      } else {
        return "Login instead";
      }
    },
  },
};
</script>

<style scoped>
label {
  font-size: 1.4rem;
}
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
  margin-bottom: 2rem;
  margin-top: 0.3rem;
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

.submit__btn-active {
  font-family: inherit;
  font-size: 1.2rem;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  padding: 0.8rem 4rem;
  margin-right: 1rem;
}

.submit__btn-active:hover {
  transform: scale(1.02) translateY(-0.1rem);
  box-shadow: 5px 5px 4px 0px #6264728f;
}

.submit__btn-active:active {
  transform: scale(1.02) translateY(0.2rem);
  box-shadow: 3px 3px 2px 0px #6264728f;
  background-color: var(--background-color2);
  color: var(--color-primary);
  font-weight: 700;
}
.submit__btn {
  background-color: var(--color-secondary);
  font-weight: 500;
  color: var(--color-primary);
  font-family: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  padding: 0.8rem 4rem;
}

.userLogin__notification {
  font-size: 1.3rem;
  font-weight: 500;
}
</style>
