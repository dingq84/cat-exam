import { acceptLanguages, defaultLanguage } from "@/constants/language";

export const resetLocalStorage = () => localStorage.clear();

// locale
export const getLocale = () => {
  const storageLanguage = localStorage.getItem("language");

  if (acceptLanguages.includes(storageLanguage)) {
    return storageLanguage;
  }

  var navigatorLanguage = navigator.language.toLowerCase();

  if (navigatorLanguage == "vi") {
    navigatorLanguage = "vi-vn";
  } else if (navigatorLanguage == "en") {
    navigatorLanguage = "en-us";
  }

  return acceptLanguages.includes(navigatorLanguage)
    ? navigatorLanguage
    : defaultLanguage;
};

export const setLocale = (language) => {
  localStorage.setItem("language", language.toLowerCase());
};

// time zone
export const setTimeZone = (timeZone) => {
  localStorage.setItem("timeZone", String(timeZone));
};

export const getTimeZone = () => {
  const timeZone = localStorage.getItem("timeZone");
  if (timeZone) {
    return timeZone;
  }

  return ((new Date().getTimezoneOffset() / 60) * -1).toString();
};
