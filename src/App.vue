<template>
  <div id="app">
    <div v-if="isLoading" class="overlay text-light">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      isLoading: "loading/isLoading",
    }),
  },
};
</script>
<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Roboto";
  font-size: 16px;
  height: 100vh;
  width: 100vw;
  color: $black;
}

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $black;
  opacity: 0.5;
  z-index: 9999;
}
</style>
