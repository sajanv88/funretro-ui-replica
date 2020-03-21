import * as uuid from "uuid";
export const copyLink = async function(customLink: string = "") {
  const link = !customLink
    ? window.location.href
    : `${window.location.protocol}//${window.location.host}/${customLink}`;
  try {
    await navigator.clipboard.writeText(link);
  } catch (e) {
    throw e;
  }
};

export const anonymousUser = function() {
  const annonymousToken = localStorage.getItem("annonymousToken");
  if (!annonymousToken) {
    localStorage.setItem("annonymousToken", uuid.v4());
    return localStorage.getItem("annonymousToken");
  }
  return annonymousToken;
};

export const isEmailValid = function(str: string): boolean {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(str).toLowerCase());
};
