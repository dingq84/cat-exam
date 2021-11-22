<template>
  <div class="ending">
    <div class="ending-header"></div>
    <div class="ending-body">
      <img src="@/assets/backgrounds/people-ending.png" alt="people image" />
      <img
        class="ending-body-logo"
        src="@/assets/logo-word.png"
        alt="logo image"
      />
      <small class="ending-body-content">by MAYO Human Capital Inc.</small>
    </div>
    <div class="ending-footer"></div>
  </div>
</template>
<style lang="scss" scoped>
.ending {
  display: flex;
  flex-direction: column;

  &-header {
    flex-shrink: 0;
    height: 123px;
    background-image: url("../../assets/backgrounds/line.png");
  }

  &-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-logo {
      margin: 38.5px 0 10px;
    }

    &-content {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2;
      letter-spacing: 0.24px;
      color: $gold;
    }
  }

  &-footer {
    flex-shrink: 0;
    height: 129px;
    background-image: url("../../assets/backgrounds/line-double.png");
  }
}
</style>
