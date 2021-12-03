<template>
  <div class="loading">
    <div class="loading-header"></div>
    <div class="loading-body">
      <img src="../../assets/backgrounds/people-ready.png" alt="loading" />
      <img src="../../assets/logo-word.png" alt="logo" />
    </div>
    <div class="loading-footer"></div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: $white;

  &-header {
    flex-shrink: 0;
    margin-top: 0px;
    height: 105px;
    background-image: url("../../assets/backgrounds/line-ending.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }

  &-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & img:first-child {
      margin-bottom: 10px;
    }
  }

  &-footer {
    flex-shrink: 0;
    height: 191px;
    background-image: url("../../assets/backgrounds/line-loading.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
