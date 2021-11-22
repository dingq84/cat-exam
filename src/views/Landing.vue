<template>
  <div class="landing">
    <div class="landing-background"></div>

    <div class="lading-header"></div>
    <div class="landing-body"></div>
    <div class="landing-footer">
      <div class="landing-footer-line"></div>
      <CommonCheckbox label="我同意隱私權政策" />
      <BasicButton label="START" />
    </div>
  </div>
</template>

<script>
import BasicButton from "@/components/basic/Button";
import CommonCheckbox from "@/components/common/Checkbox";

export default {
  name: "Landing",
  components: {
    BasicButton,
    CommonCheckbox,
  },
};
</script>
<style lang="scss" scoped>
.landing {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &-background {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../assets/backgrounds/people.png");
  }

  &-header {
    flex-shrink: 0;
    height: 91.2px;
  }

  &-body {
    flex-grow: 1;
    overflow-y: auto;
  }

  &-footer {
    flex-shrink: 0;
    height: 133px;
    padding: 16px 0 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 2;

    &-line {
      position: absolute;
      z-index: -1;
      width: 100%;
      left: 0;
      bottom: 23.2px;
      height: 37.5px;
      background-image: url("../assets/backgrounds/line.png");
    }
  }
}
</style>
