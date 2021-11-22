<template>
  <button
    class="button text-nowrap"
    :class="className"
    :type="buttonType"
    :data-disabled="disabled"
    :data-cancel="isCancel"
    v-on="$listeners"
  >
    {{ label }}
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    className: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: "button",
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  border-radius: 31px;
  background-color: $gold;
  color: $white;
  padding: 10px 43px 12px;
  border: none;
  font-size: 21px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 0.42px;

  &[data-disabled="true"] {
    background-color: $white-gray;
    pointer-events: none;
    cursor: not-allowed;
  }

  &[data-cancel="true"] {
    color: $gold;
    background-color: $white;
    padding-left: 32px;
    padding-right: 32px;
    border: solid 1px #e1a236;

    &[data-disabled="true"] {
      color: $light-gray;
      border: solid 1px $light-gray;
    }
  }
}
</style>
