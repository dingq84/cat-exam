<template>
  <div class="question">
    <div class="question-header">
      <img src="@/assets/logo-word.png" alt="lasso logo" />
      <div class="d-flex items-end">
        <span class="question-header-text">Time</span>
        <span class="question-header-time">10: 02</span>
      </div>
    </div>

    <div class="question-body">
      <div class="question-body-content">
        <div class="question-body-content-question">
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
          <div>發生爭執時，我一定先反省我自己</div>
        </div>

        <div class="question-body-content-answer">
          <div>4.有時如此</div>
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
        <div class="question-body-answer-function">
          <span class="question-body-answer-function-title">
            請在下方選擇最適當的情況：
          </span>
          <div class="question-body-answer-function-buttons">
            <div>
              <BasicButton label="1" data-selected="true" />
              <span>從未如此</span>
            </div>
            <div>
              <BasicButton label="2" />
              <span>偶爾如此</span>
            </div>
            <div>
              <BasicButton label="3" />
              <span>較少如此</span>
            </div>
            <div>
              <BasicButton label="4" />
              <span>有時如此</span>
            </div>
            <div>
              <BasicButton label="5" />
              <span>經常如此</span>
            </div>
            <div>
              <BasicButton label="6" />
              <span>總是如此</span>
            </div>
          </div>
        </div>

        <div class="question-body-answer-progress">
          <div class="question-body-answer-progress-bar">
            <div class="question-body-answer-progress-bar-current"></div>
          </div>
          <span class="question-body-answer-progress-number">96%</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BasicButton from "@/components/basic/Button";

export default {
  name: "MobileQuestion",
  components: {
    BasicButton,
  },
};
</script>
<style lang="scss" scoped>
$progress-width: 15px;

.question {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    flex-shrink: 0;
    height: 55px;
    background-color: $white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 16px 18px 21px;

    &-text {
      display: inline-block;
      margin-top: 1px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.57;
      letter-spacing: -0.01px;
      color: $gray;
    }

    &-time {
      display: inline-block;
      margin-top: 1px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.57;
      letter-spacing: -0.01px;
      color: $gold;
    }
  }

  &-body {
    flex-grow: 1;
    background-image: url("../../assets/backgrounds/people-question.png"),
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(62, 60, 60, 0) 87%,
        #4e4e4e 96%
      );
    background-repeat: no-repeat, no-repeat;
    background-position: top center, bottom center;
    display: flex;
    flex-direction: column;

    &-content {
      flex-grow: 1;
      overflow-y: auto;
      padding: 40px 16px;

      &-question {
        display: flex;
        align-items: center;

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
        margin-top: 143px;
        float: right;

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
      margin: 0 16px 14px;

      &-function {
        margin-bottom: 14px;
        padding: 10px 19px 9px 18px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.85);

        &-title {
          font-size: 17px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.29;
          letter-spacing: -0.01px;
          color: $black;
        }

        &-buttons {
          margin-top: 9px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-gap: 2px 16px;

          & > div {
            display: flex;
            flex-direction: column;
            align-items: center;

            & > button {
              width: 100%;
              height: 43px;
              margin-bottom: 2px;
              padding: 10px 0;
              border-radius: 5px;
              background-color: $white;
              color: $black;
              font-size: 17px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.29;
              letter-spacing: -0.01px;

              &[data-selected="true"] {
                color: $white;
                background-color: $gold;
              }
            }

            & > span {
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.57;
              letter-spacing: -0.01px;
              color: $black;
            }
          }
        }
      }

      &-progress {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-bar {
          border-radius: 15px;
          background-color: rgba(255, 239, 211, 0.3);
          margin-right: 22px;
          height: 13px;
          flex-grow: 1;
          position: relative;

          &-current {
            position: absolute;
            left: 0;
            top: 0;
            height: 13px;
            width: 96%;
            border-radius: 15px;
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
  }
}
</style>
