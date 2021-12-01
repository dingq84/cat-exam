<template>
  <div class="ending">
    <div class="ending-header"></div>
    <div class="ending-body">
      <div class="ending-body-message">
        {{ i18nValue("{APP0901}") }}
      </div>
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
<script>
import { mapGetters } from "vuex";

export default {
  name: "Ending",
  computed: {
    ...mapGetters({
      i18nValue: "i18n/i18nValue",
    }),
  },
};
</script>
<style lang="scss" scoped>
.ending {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &-header {
    flex-shrink: 0;
    margin-top: 41.7px;
    height: 60px;
    background-image: url("../../assets/backgrounds/line-ending.png");
  }

  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-message {
      max-width: 248px;
      background-image: url("../../assets/backgrounds/message.png");
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      padding: 5px 10px 15px;
    }

    &-picture {
      width: 230px;
      object-fit: contain;
    }

    &-logo {
      margin: 38.5px 0 10px;
    }

    &-content {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 24px;
      letter-spacing: 0.24px;
      color: $gold;
    }
  }

  &-footer {
    flex-shrink: 0;
    height: 75.8px;
    margin-bottom: 36.7px;
    background-image: url("../../assets/backgrounds/line-double.png");
  }
}
</style>
