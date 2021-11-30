<template>
  <div class="d-flex flex-column container" :class="className">
    <vue-select
      :clearable="false"
      :searchable="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:open-indicator="{ attributes }">
        <img
          v-if="showIndicator"
          v-bind="attributes"
          src="@/assets/icons/select.png"
          alt="select icon"
        />
        <span v-else></span>
      </template>
    </vue-select>
  </div>
</template>
<script>
import VueSelect from "vue-select";

export default {
  inheritAttrs: false,
  name: "CommonSelect",
  components: {
    VueSelect,
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    showIndicator: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
$vs-state-active-bg: $gold;
$vs-state-active-color: $white;

@import "vue-select/src/scss/vue-select.scss";

.container {
  padding: 0;

  & .vs--loading {
    & .vs__open-indicator {
      display: none;
    }
  }

  & .v-select {
    font-size: 0.75rem;

    & ul {
      padding: 0;
      min-width: 120px;
      border: none;
      right: 0px;
      left: initial;

      & li {
        white-space: nowrap;
        height: 52px;
        line-height: 50px;
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 0.34px;

        &:hover {
          color: $white;
          background-color: $gold;
        }
      }
    }

    & .vs__selected-options {
      max-width: 100%;
      overflow: auto;
      flex-wrap: nowrap;
    }

    & .vs__dropdown-toggle {
      padding: 0;
      border-color: transparent;

      & .vs__selected {
        margin: 0;
        line-height: 1.6rem;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.57;
        letter-spacing: 0.28px;
        padding: 0;
        color: $black;
        opacity: 1;
        position: static;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .vs__search {
        margin: 0;
      }

      & input {
        border: none;
        height: 1.8rem;
        width: 1px;
        padding: 0;
      }

      & .vs__actions {
        padding-top: 2px;

        & .vs__spinner {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }
  }
}
</style>
