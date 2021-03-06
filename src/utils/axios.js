import axios from "axios";

// constants
// import { clearTokenErrorCodes } from "@/constants/errorCode.js";
// import { querySimpleAccount } from "@/constants/api.js";
import router from "@/router";
import store from "@/store";
// import i18n from "@/i18n";
import { getTimeZone, getLocale } from "@/utils";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const notLoadingUrlList = [];

export default new (class {
  constructor() {
    const instance = axios.create();

    instance.interceptors.request.use(
      (config) => {
        if (!config.headers["accept-language"]) {
          config.headers["accept-language"] = getLocale();
        }
        config.headers["time-zone"] = getTimeZone();

        if (!notLoadingUrlList.includes(config.url)) {
          store.dispatch("loading/addCounter");
        }
        return config;
      },
      (error) => {
        store.dispatch("loading/subCounter");
        store.dispatch("error/updateError", {
          code: "9999",
          message: "",
        });
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        store.dispatch("loading/subCounter");
        const statusCode = response.data.StatusCode;
        if (statusCode && statusCode !== 0) {
          router.push({ name: "Error" });
          store.dispatch("error/updateError", {
            code: statusCode,
            message: response.data.ErrorMessage,
          });
          throw Promise.reject(new Error("error"));
        }
        return response;
      },
      (error) => {
        store.dispatch("loading/subCounter");
        store.dispatch("error/updateError", {
          code: "9999",
          message: "",
        });

        return Promise.reject(error);
      }
    );

    this.instance = instance;
  }
})().instance;
