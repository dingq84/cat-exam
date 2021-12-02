<template>
  <div class="error">
    <div class="error-title">Error</div>
    <div class="error-code">{{ code }}</div>
    <div class="error-message">
      {{ message || "Please report to Customer Service." }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Error",
  computed: {
    ...mapGetters({
      code: "error/code",
      message: "error/message",
    }),
  },
};
</script>
<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-title {
    font-size: 36px;
    font-weight: 700;
    color: $gold;
    margin-bottom: 12px;
    padding: 10px 14px;
    border: 2px solid $gold;
  }

  &-code {
    font-weight: bold;
    color: $gold;
  }

  &-message {
    color: $black;
    font-size: 14px;
    margin-top: 8 px;
  }
}
</style>
