<template>
  <div class="auth-container">
    <button class="btn">{{ switchBtnValue }}</button>
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
      if (this.isAuthenticated && this.btnMode === "login") {
        return "Log Out";
      } else if (this.isAuthenticated && this.btnMode === "signUp") {
        return "Sign out ";
      }
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
