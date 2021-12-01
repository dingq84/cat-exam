<template>
  <div class="landing">
    <div class="landing-header">
      <div class="d-flex align-items-center">
        <img src="@/assets/icons/earth.png" alt="earth icon" />
        <CommonSelect
          className="landing-header-select"
          :value="selected"
          @input="handleLanguageChange"
          :options="options"
          :show-indicator="true"
        />
      </div>
    </div>

    <div class="landing-body">
      <div class="landing-body-teach"></div>

      <div class="landing-body-header">
        <img
          class="landing-body-header-logo"
          src="@/assets/logo-word-desktop.png"
          alt="logo"
        />
        <img
          class="landing-body-header-path"
          src="@/assets/backgrounds/path.png"
          alt="path"
        />
      </div>
      <div class="landing-body-content" v-html="i18nValue('{APP0101}')"></div>
      <div class="landing-body-privacy" v-html="i18nValue('{APP0103}')"></div>
      <div class="landing-body-content" v-html="privacy"></div>

      <CommonCheckbox
        class="landing-body-agree"
        :label="`${i18nValue('{APP0102}')}${i18nValue('{APP0103}')}`"
        :checked="agree"
        @input="(value) => (agree = value)"
      />
    </div>

    <div class="landing-footer">
      <small class="landing-footer-copy">by MAYO Human Capital Inc.</small>
      <BasicButton
        label="START"
        :disabled="agree === false"
        @click="goToQuestion"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import BasicButton from "@/components/basic/Button";
import CommonCheckbox from "@/components/common/Checkbox";
import CommonSelect from "@/components/common/Select";

import { getI18n, getAssessment } from "@/constants/api";

import { getLocale, setLocale } from "@/utils";

export default {
  name: "Landing",
  components: {
    BasicButton,
    CommonCheckbox,
    CommonSelect,
  },
  data() {
    return {
      agree: false,
      selected: getLocale(),
      options: [
        { code: "en-us", label: "ENGLISH" },
        { code: "zh-tw", label: "繁體中文" },
        { code: "zh-cn", label: "簡體中文" },
        { code: "vi-vn", label: "Tiếng Việt" },
      ],
      privacy: "",
    };
  },
  computed: {
    ...mapGetters({
      i18nValue: "i18n/i18nValue",
    }),
  },
  mounted() {
    const { InvitationKey = "" } = this.$route.query;
    if (InvitationKey === "") {
      this.$router.push({ name: "Error" });
      return;
    }

    const locale = getLocale();
    this.selected = this.options.find((option) => option.code === locale);
    this.getI18nEnums();
    this.invitationKey = decodeURIComponent(encodeURIComponent(InvitationKey));
    this.getQuestions();
  },
  methods: {
    ...mapActions({
      setI18nEnums: "i18n/setI18nEnums",
    }),
    getI18nEnums() {
      this.axios
        .post(getI18n, {
          Conditions: [
            {
              TypeCode: "I18N_CLIENT",
            },
          ],
        })
        .then((data) => {
          this.setI18nEnums(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getQuestions() {
      this.axios
        .post(getAssessment, {
          Conditions: [
            {
              InvitationKey: this.invitationKey,
            },
          ],
        })
        .then(({ data }) => {
          const { Results } = data;
          this.privacy = Results[0].PrivacyPolicy;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleLanguageChange(value) {
      this.selected = value;
      setLocale(value.code);
      this.$nextTick(() => {
        this.getI18nEnums();
        this.getQuestions();
      });
    },
    goToQuestion() {
      this.$router.push({ name: "Question", query: this.$route.query });
    },
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
  overflow: auto;
  min-width: 1200px;

  &-header {
    position: relative;
    z-index: 1;
    height: 70px;
    background-color: $gold;
    padding: 0 32px;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-select {
      /deep/ {
        .vs__selected {
          color: $white !important;
        }
      }
    }
  }

  &-body {
    flex-grow: 1;
    position: relative;
    overflow-y: auto;

    &-teach {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 795px;
      background-image: url("../../assets/backgrounds/teach.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center -80px;
    }

    &-header {
      margin-top: 152.6px;
      height: 133px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;
      position: relative;
      z-index: 1;

      &-logo {
        margin-left: 20%;
        width: 314px;
        margin-right: 54.7px;
      }

      &-path {
        flex-grow: 1;
      }
    }

    &-content {
      margin: 42px 20% 0;
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: 0.34px;
      position: relative;
      z-index: 1;
    }

    &-privacy {
      margin: 158px 0 40px 20%;
      color: $gold;
      font-size: 17px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: 0.34px;
      position: relative;
      z-index: 1;
    }

    &-agree {
      margin: 40px 0 90px 20%;
      position: relative;
      z-index: 1;
    }
  }

  &-footer {
    flex-shrink: 0;
    height: 73px;
    background-color: $gold;
    position: relative;
    z-index: 2;

    & button {
      width: 261px;
      height: 50px;
      font-size: 21px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.14;
      letter-spacing: 0.42px;
      position: absolute;
      left: 50%;
      top: -25px;
      transform: translateX(-50%);

      &:not([data-disabled="true"]) {
        border: 2px solid $gold;
        background-color: $white;
        color: $gold;
      }
    }

    &-copy {
      display: block;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.71;
      letter-spacing: 0.28px;
      color: $black;
      margin-top: 40px;
      text-align: center;
    }
  }
}
</style>
