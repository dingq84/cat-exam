<template>
  <div class="d-flex flex-column container" :class="className">
    <label :for="id" v-if="label">
      {{ label }}
    </label>
    <vue-select
      ref="select"
      :id="id"
      :options="processedOptions"
      :clearable="false"
      :searchable="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:open-indicator="{ attributes }">
        <img
          v-if="showIndicator"
          v-bind="attributes"
          src="@/assets/icons/message.svg"
          alt="message icon"
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
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    showIndicator: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$refs.select.open = true;
  },
  computed: {
    processedOptions() {
      return this.options.map((item) => ({
        code: item.Key,
        label: item.Value,
      }));
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

  & label {
    font-size: 0.875rem;
    color: $black;
    margin-bottom: 4px;
  }

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

      & li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        // min-width: 30px;
      }

      // & .vs__actions {
      //   padding-top: 2px;

      //   & img {
      //     filter: invert(0.3);
      //     width: 0.875rem;
      //     height: 0.875rem;
      //   }

      //   & .vs__spinner {
      //     width: 0.8rem;
      //     height: 0.8rem;
      //   }
      // }
    }
  }
}
</style>
