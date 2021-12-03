<template>
  <div id="app" :style="{ height }">
    <router-view />

    <DesktopLoading v-if="isMobile === false && isLoading" />
    <MobileLoading v-if="isMobile && isLoading" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import DesktopLoading from "./views/desktop/Loading.vue";
import MobileLoading from "./views/mobile/Loading.vue";

import isMobile from "./utils/isMobile";

export default {
  name: "App",
  components: {
    DesktopLoading,
    MobileLoading,
  },
  computed: {
    ...mapGetters({
      isLoading: "loading/isLoading",
    }),
  },
  data() {
    return {
      isMobile: isMobile(),
      height: "100vh",
    };
  },
  mounted() {
    if (this.isMobile) {
      this.height = `${window.innerHeight}px`;
    }
  },
};
</script>
<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Roboto";
  font-size: 16px;
  width: 100vw;
  color: $black;
}
</style>
