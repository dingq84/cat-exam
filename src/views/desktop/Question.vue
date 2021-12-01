<template>
  <div class="question">
    <div class="question-header">
      <img src="@/assets/logo-white.png" alt="logo" />
      <div class="d-flex items-end">
        <span class="question-header-text">{{ i18nValue("{APP0301}") }}</span>
        <span class="question-header-time">
          {{ `${this.currentMinute}:${this.currentSecond}` }}
        </span>
      </div>
    </div>

    <div class="question-subheader">
      <span class="question-subheader-hint">{{ i18nValue("{APP0801}") }}</span>

      <div class="question-subheader-progress">
        <div class="question-subheader-progress-bar">
          <div
            class="question-subheader-progress-bar-current"
            :style="{ width: progress }"
          ></div>
        </div>
        <span class="question-subheader-progress-number">
          {{ progress }}
        </span>
      </div>
    </div>

    <div class="question-body">
      <div class="question-body-wrapper">
        <div class="question-body-wrapper-question" v-if="items.length">
          <img src="@/assets/icons/person.png" alt="person icon" />
          <svg
            width="19"
            height="25"
            viewBox="0 0 19 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.695725 11.1278C0.256962 10.8434 0.511594 10.0202 1.03328 9.985C3.14213 9.84251 6.98603 9.30419 13 7.5C23 4.5 24.5 0.499928 24.5 0.499928L24.5 20C24.5 20 15.5 18.5 10.5 16.5C7.08049 15.1322 2.95939 12.5951 0.695725 11.1278Z"
              fill="currentColor"
            />
          </svg>
          <div>{{ items[currentQuestionIndex].Item }}</div>
        </div>

        <div class="question-body-wrapper-answer" v-if="currentAnswerValue">
          <div>
            {{ i18nValue(buttons[Number(currentAnswerValue) - 1].label) }}
          </div>
          <svg
            width="19"
            height="25"
            viewBox="0 0 19 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.695725 11.1278C0.256962 10.8434 0.511594 10.0202 1.03328 9.985C3.14213 9.84251 6.98603 9.30419 13 7.5C23 4.5 24.5 0.499928 24.5 0.499928L24.5 20C24.5 20 15.5 18.5 10.5 16.5C7.08049 15.1322 2.95939 12.5951 0.695725 11.1278Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div class="question-body-answer">
        <span class="question-body-answer-title">
          {{ i18nValue("{APP0302}") }}
        </span>
        <div class="question-body-answer-buttons">
          <BasicButton
            v-for="button in buttons"
            :key="button.value"
            :label="i18nValue(button.label)"
            :data-selected="(button.value === currentAnswerValue).toString()"
            @click.stop="handleAnswerClick(button.value)"
          />
        </div>
      </div>

      <div class="question-body-footer">
        <small class="question-body-footer-copy">
          by MAYO Human Capital Inc.
        </small>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { differenceInMinutes, differenceInSeconds, format } from "date-fns";

import BasicButton from "@/components/basic/Button";

import { getAssessment, updateAssessmentScales } from "@/constants/api";

export default {
  name: "Question",
  components: {
    BasicButton,
  },
  data() {
    return {
      buttons: [
        {
          label: "{APP0802}",
          value: "1",
        },
        {
          label: "{APP0803}",
          value: "2",
        },
        {
          label: "{APP0804}",
          value: "3",
        },
        {
          label: "{APP0805}",
          value: "4",
        },
        {
          label: "{APP0806}",
          value: "5",
        },
        {
          label: "{APP0807}",
          value: "6",
        },
      ],
      invitationKey: "",
      question: {},
      items: [],
      currentQuestionIndex: 0,
      currentAnswerValue: "",
      startTime: new Date(),
      endTime: new Date(),
    };
  },
  mounted() {
    sessionStorage.setItem("leaving", "true");
    const { InvitationKey = "" } = this.$route.query;
    this.invitationKey = decodeURIComponent(encodeURIComponent(InvitationKey));
    this.getQuestions();
    this.clock();
  },
  computed: {
    ...mapGetters({
      i18nValue: "i18n/i18nValue",
    }),
    progress() {
      if (this.items.length === 0) {
        return "0%";
      }

      return `${Math.floor(
        (this.currentQuestionIndex / this.items.length) * 100
      )}%`;
    },
    currentMinute() {
      return `0${differenceInMinutes(this.endTime, this.startTime)}`.slice(-2);
    },
    currentSecond() {
      return `0${
        differenceInSeconds(this.endTime, this.startTime) -
        Number(this.currentMinute) * 60
      }`.slice(-2);
    },
  },
  methods: {
    clock() {
      this.endTime = new Date().getTime();

      setTimeout(() => {
        this.clock();
      }, 1000);
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
          this.question = Results[0];
          this.items = Results[0].Items;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleAnswerClick(value) {
      if (this.currentAnswerValue !== "") {
        return;
      }

      this.currentAnswerValue = value;
      this.items[this.currentQuestionIndex].Scale = Number(value);
      setTimeout(() => {
        this.currentQuestionIndex += 1;
        this.currentAnswerValue = "";

        if (this.currentQuestionIndex === this.items.length) {
          this.submit();
        }
      }, 1000);
    },
    async submit() {
      try {
        await this.axios.post(updateAssessmentScales, {
          Contents: [
            {
              InvitationKey: this.invitationKey,
              AnswerStartTime: format(this.startTime, "yyyy-MM-dd'T'HH:mm:ss"),
              AnswerEndTime: format(this.endTime, "yyyy-MM-dd'T'HH:mm:ss"),
              Items: this.items.map((item) => ({
                ItemId: item.ItemId,
                Scale: item.Scale,
              })),
            },
          ],
        });
        this.$router.push({ name: "Ending" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$progress-width: 15px;

.question {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  min-width: 1320px;

  &-header {
    height: 70px;
    background-color: $gold;
    padding: 0 154px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-text {
      display: inline-block;
      margin-top: 1px;
      font-size: 19px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 30px;
      letter-spacing: -0.01px;
      color: $white;
    }

    &-time {
      display: inline-block;
      margin-top: 1px;
      margin-left: 16px;
      font-size: 19px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 30px;
      letter-spacing: -0.01px;
      color: $white;
    }
  }

  &-subheader {
    height: 64px;
    background-color: $yellow-1;
    padding: 0 154px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-hint {
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 22px;
      letter-spacing: 0.28px;
      color: $gray-3;
    }

    &-progress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 330px;

      &-bar {
        border-radius: 15px;
        background-color: rgba(253, 253, 253, 0.87);
        margin-right: 22px;
        height: 13px;
        flex-grow: 1;
        position: relative;

        &-current {
          position: absolute;
          left: 0;
          top: 0;
          height: 13px;
          border-radius: 15px;
          transition: width 0.5s;
          background: repeating-linear-gradient(
            115deg,
            #ebc274 0 $progress-width,
            rgba(225, 162, 54, 1) $progress-width $progress-width * 2
          );
        }
      }

      &-number {
        flex-shrink: 0;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: -0.01px;
        color: $gold;
      }
    }
  }

  &-body {
    flex-grow: 1;
    overflow: hidden;
    background: url("../../assets/backgrounds/people-walk.png");
    box-shadow: inset 0 0 0 2000px rgba(62, 60, 60, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &-wrapper {
      padding: 54px 154px 0;
      flex-grow: 1;
      overflow-y: auto;

      &-question {
        display: flex;
        align-items: center;
        max-width: 45%;

        & > img {
          margin-right: 12px;
        }

        & > svg {
          width: 15px;
          color: $white;
        }

        & > div {
          padding: 12px 16px;
          background-color: $white;
          border-radius: 10px;
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.29;
          letter-spacing: -0.01px;
          color: $black;
        }
      }

      &-answer {
        display: flex;
        align-items: center;
        margin-top: 90px;
        float: right;
        max-width: 45%;

        & > svg {
          width: 15px;
          color: $white;
          transform: scaleX(-1);
        }

        & > div {
          padding: 12px 16px;
          background-color: $white;
          border-radius: 10px;
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.29;
          letter-spacing: -0.01px;
          color: $gold;
        }
      }
    }

    &-answer {
      flex-shrink: 0;
      background-color: $white-gray;
      width: 588px;
      height: 216px;
      margin: 20px 154px 20px auto;
      border-radius: 10px;
      padding: 14px 20px;

      &-title {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 22px;
        letter-spacing: -0.01px;
        color: $gold;
      }

      &-buttons {
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 14px 10px;

        & > button {
          width: 100%;
          height: 44px;
          padding: 12px 0;
          border-radius: 6px;
          background-color: $white;
          color: $black;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 22px;
          letter-spacing: 0.28px;

          &[data-selected="true"] {
            color: $white;
            background-color: $gold;
          }
        }
      }
    }

    &-footer {
      flex-shrink: 0;
      height: 30px;
      background-color: $gold;
      padding-right: 154px;

      &-copy {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 30px;
        letter-spacing: 0.24px;
        float: right;
        color: $white;
      }
    }
  }
}
</style>
