<template>
  <div id="app">
    <div v-if="isLoading && isMobile" class="loading"></div>
    <div v-if="isLoading && !isMobile" class="loading-desktop">
      <div class="loading-desktop-header"></div>
      <div class="loading-desktop-body">
        <img src="./assets/backgrounds/loading.png" alt="loading" />
        <img src="./assets/logo-word-desktop.png" alt="logo" />
      </div>
      <div class="loading-desktop-footer"></div>
    </div>

    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import isMobile from "./utils/isMobile";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      isLoading: "loading/isLoading",
    }),
  },
  data() {
    return {
      isMobile: isMobile(),
    };
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

.loading-desktop {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  &-header {
    flex-shrink: 0;
    margin-top: 41.7px;
    height: 65px;
    background-image: url("./assets/backgrounds/path-desktop.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }

  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > img:first {
      margin-bottom: 10px;
    }
  }

  &-footer {
    flex-shrink: 0;
    height: 93px;
    margin-bottom: 30px;
    background-image: url("./assets/backgrounds/mask-desktop.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
