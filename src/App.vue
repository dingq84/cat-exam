<template>
  <div id="app">
    <div v-if="isLoading" class="loading"></div>

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

.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-position: center center, center right;
  background-size: contain, 100%;
  background-image: url("./assets/backgrounds/loading.png"),
    linear-gradient($white, $white);
  background-repeat: no-repeat, repeat;
  z-index: 10;
}
</style>
