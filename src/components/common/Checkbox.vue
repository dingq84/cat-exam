<template>
  <b-form-checkbox
    :class="className"
    class="wrapper"
    :state="state"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span class="wrapper-label" :data-is-require="isRequire">{{ label }}</span>
  </b-form-checkbox>
</template>
<script>
export default {
  name: "CommonCheckbox",
  props: {
    isRequire: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    state: {
      default: null,
      validator: (prop) => typeof prop === "boolean" || prop === null,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  &-label {
    &[data-is-require="true"] {
      &::before {
        content: "*";
        color: $gold;
        display: inline-block;
        width: 4px;
        margin-right: 2px;
        margin-left: -2px;
      }
    }
  }

  /deep/ {
    & .custom-checkbox {
      color: $black;
      font-size: 15px;
    }

    & .custom-control-label {
      color: $black !important;
    }

    & .custom-checkbox + .custom-checkbox {
      margin-top: 1rem;
    }

    & .custom-control-input,
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50%;
      transform: translateY(-50%);
      left: -21px;
    }

    & .custom-control-label::before {
      border-color: $gold;
    }

    & .custom-control-input:checked ~ .custom-control-label::before {
      background-color: $gold;
      border-color: transparent;
    }

    & #checkbox-model {
      position: absolute;
      bottom: 0.2rem;
      left: 7rem;
      width: 225px;
    }
  }

  &[disabled] {
    /deep/ {
      .custom-control-label::after {
        background-color: $light-gray;
        border-radius: 0.25rem;
      }
    }
  }
}
</style>
