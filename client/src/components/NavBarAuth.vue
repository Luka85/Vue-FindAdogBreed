<template>
  <div class="auth-container">
    <button class="btn" @click="userLogOut">{{ switchBtnValue }}</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/store.js";
export default {
  computed: {
    ...mapState(useStore, ["isAuthenticated", "btnMode"]),
    switchBtnValue() {
      console.log(this.btnMode);
      if (this.btnMode === "login") {
        return "Log Out";
      } else if (this.btnMode === "signUp") {
        return "Sign out ";
      }
    },
  },
  methods: {
    ...mapActions(useStore, ["userUnAuth"]),
    userLogOut() {
      console.log(this.$router);

      this.userUnAuth(this.$router);

      console.log("successfully logged out");
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;
  padding: 0 3rem;
}
</style>
