// plugins/cookies.js
import { defineNuxtPlugin } from "#app";
import Cookies from "universal-cookie";

export default defineNuxtPlugin((nuxtApp) => {
  const cookies = new Cookies();

  nuxtApp.provide("cookies", cookies);
});
