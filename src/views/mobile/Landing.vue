<template>
  <div class="landing">
    <div class="landing-background"></div>

    <div class="landing-wrapper">
      <div class="landing-wrapper-header">
        <CommonSelect
          className="landing-wrapper-header-select"
          id="language-select"
          v-model="selected"
          :options="options"
        />
      </div>

      <div class="landing-wrapper-body">
        <div class="landing-wrapper-body-logo"></div>
        <div class="landing-wrapper-body-content">
          填答時，請仔細閱讀每項敘述，然後判斷該敘述與您目前實際情況符合程度。並沒有標準答案，請您依照自身真實狀況進行填答。
          測評有特殊設計，會從各方面評估您測評結果的可參考度，請認真專注在每一題的作答即可。
          CAT職能認知測評結果報告會同時提供面談參考題目，讓企業可以進一步深入詢問並了解您的相關經驗與職能等級。
          如果您已經準備就緒，請點選確認按鈕開始作答。
        </div>
        <div class="landing-wrapper-body-policy">
          <div
            v-b-toggle.privacy
            class="d-inline-flex align-items-center justify-content-center"
          >
            <small>隱私權政策</small>
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
                隱私權政策
              </span>

              <b-icon-caret-down-fill font-scale="0.5" />
            </div>
            <div class="landing-wrapper-body-privacy-wrapper">
              <div class="landing-wrapper-body-privacy-wrapper-prefix">
                歡迎您光臨CAT職能認知測評平台(以下稱「本平台」)，本平台是由鼎恒數位科技股份有限公司
                (以下稱「本公司」)所提供，本平台謹依個人資料保護法（以下簡稱個資法）與本《隱私權政策》搜集、處理及利用您的個人資料，並承諾尊重以及保護您個人於本平台的隱私權。特此說明本平台的隱私權政策，以保障您的權益。請您細讀以下有關本政策的內容：
              </div>
              <div class="landing-wrapper-body-privacy-wrapper-subtitle">
                適用範圍
              </div>
              <ol class="landing-wrapper-body-privacy-wrapper-list">
                <li>
                  您使用本平台時，所涉及的個人資料蒐集、處理與相關利用行為，均受到本隱私權政策之保護。基於對個人權益的維護及尊重，本平台對於個人資料之蒐集、處理及利用，將以誠實及信用方法為之，除有法律特別規定外，不會逾越特定目的之必要範圍，並與蒐集之目的具有正當合理之關聯。
                </li>
                <li>
                  您使用本平台時，所涉及的個人資料蒐集、處理與相關利用行為，均受到本隱私權政策之保護。基於對個人權益的維護及尊重，本平台對於個人資料之蒐集、處理及利用，將以誠實及信用方法為之，除有法律特別規定外，不會逾越特定目的之必要範圍，並與蒐集之目的具有正當合理之關聯。
                </li>
              </ol>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>

    <div class="landing-footer">
      <div class="landing-footer-line"></div>
      <CommonCheckbox
        label="我同意隱私權政策"
        :checked="agree"
        @input="(value) => (agree = value)"
      />
      <BasicButton label="START" :disabled="agree === false" />
    </div>
  </div>
</template>

<script>
import BasicButton from "@/components/basic/Button";
import CommonCheckbox from "@/components/common/Checkbox";
import CommonSelect from "@/components/common/Select";

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
      selected: "ENGLISH",
      options: [
        { Key: "a", Value: "ENGLISH" },
        { Key: "b", Value: "繁體中文" },
        { Key: "c", Value: "簡體中文" },
        { Key: "d", Value: "Tiếng Việt" },
      ],
    };
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

    &-header {
      flex-shrink: 0;
      padding-top: 10px;
      height: 91.2px;
      display: flex;
      justify-content: flex-end;

      &-select {
        width: 120px;
        margin-right: 10px;
      }
    }

    &-body {
      overflow-y: auto;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-logo {
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

    &-line {
      position: absolute;
      z-index: -1;
      width: 100%;
      left: 0;
      bottom: 23.2px;
      height: 37.5px;
      background-image: url("../../assets/backgrounds/line.png");
    }
  }
}
</style>
