<template>
  <div class="landing">
    <div class="landing-background"></div>

    <div class="landing-wrapper">
      <div class="landing-wrapper-header">
        <div class="d-flex align-items-center">
          <img
            src="@/assets/icons/earth-black.png"
            alt="earth"
            :style="{ 'margin-bottom': '1px' }"
          />
          <CommonSelect
            className="landing-wrapper-header-select"
            :value="selected"
            @input="handleLanguageChange"
            :options="options"
          />
        </div>
      </div>

      <div class="landing-wrapper-body">
        <div class="landing-wrapper-body-logo"></div>
        <div
          class="landing-wrapper-body-content"
          v-html="i18nValue('{APP0101}')"
        ></div>
        <div class="landing-wrapper-body-policy">
          <div
            v-b-toggle.privacy
            class="d-inline-flex align-items-center justify-content-center"
          >
            <small>{{ i18nValue("{APP0103}") }}</small>
            <b-icon-caret-up-fill font-scale="0.5" class="ml-1" />
          </div>
        </div>
        <b-collapse id="privacy" appear>
          <div class="landing-wrapper-body-privacy">
            <div class="d-flex align-items-center justify-content-center">
              <span
                v-b-toggle.privacy
                class="landing-wrapper-body-privacy-title"
              >
                {{ i18nValue("{APP0103}") }}
              </span>

              <b-icon-caret-down-fill font-scale="0.5" />
            </div>
            <div
              class="landing-wrapper-body-privacy-wrapper"
              v-html="privacy"
            ></div>
          </div>
        </b-collapse>
      </div>
    </div>

    <div class="landing-footer">
      <div class="landing-footer-line"></div>
      <CommonCheckbox
        :label="`${i18nValue('{APP0102}')}${i18nValue('{APP0103}')}`"
        :checked="agree"
        @input="(value) => (agree = value)"
      />

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
  name: "MobileLanding",
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
      this.$router.push({ name: "MobileQuestion", query: this.$route.query });
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

  &-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../assets/backgrounds/people.png");
  }

  &-wrapper {
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 1;
    overflow: hidden;

    &-header {
      flex-shrink: 0;
      padding-top: 10px;
      height: 91.2px;
      display: flex;
      justify-content: flex-end;
      background-image: linear-gradient(
        to top,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.9) 64%
      );

      &-select {
        width: 88px;

        /deep/ {
          ul {
            right: 10px;
          }
        }
      }
    }

    &-body {
      overflow: hidden;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-logo {
        flex-shrink: 0;
        margin: 29.8px 0 29px;
        width: 258px;
        height: 65px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        background: url("../../assets/logo-white.png"),
          linear-gradient($gold, $gold);
        background-position: center center, left center;
        background-repeat: no-repeat, repeat;
      }

      &-content {
        margin: 0 56px 0 58px;
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.34px;
        color: $black;
        flex-grow: 1;
        overflow-y: auto;
      }

      &-policy {
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(to bottom, $white 17%, $gray-1);
        height: 53px;
        flex-shrink: 0;

        & small {
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: 0.24px;
        }
      }

      /deep/ .collapse {
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
      }

      &-privacy {
        background-image: linear-gradient(to bottom, $white 17%, $gray-1);
        height: 100%;
        padding: 0 14px 12px;
        display: flex;
        flex-direction: column;

        &-title {
          flex-shrink: 0;
          display: block;
          height: 44px;
          line-height: 44px;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: 0.24px;
          text-align: center;
          color: $black;
          margin-right: 4px;
        }

        &-wrapper {
          flex-grow: 1;
          background-color: $gray-2;
          padding: 12px 20px;
          overflow-y: auto;

          &-prefix {
            overflow-y: auto;
            font-size: 17px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.65;
            letter-spacing: 0.34px;
            color: $white;
          }

          &-subtitle {
            display: inline-block;
            margin: 14px 0 12px;
            color: $gold;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.65;
            letter-spacing: 0.34px;
            font-size: 17px;
          }

          &-list {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.71;
            letter-spacing: 0.28px;
            color: $white;
            padding-left: 16px;
            margin-bottom: 0px;

            & > li + li {
              margin-top: 8px;
            }
          }
        }
      }
    }
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
    background-color: $white;

    &-line {
      position: absolute;
      z-index: -1;
      width: 100%;
      left: 0;
      bottom: 23.2px;
      height: 39px;
      background-image: url("../../assets/backgrounds/line.png");
    }
  }
}
</style>
