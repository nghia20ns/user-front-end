import React from "react";

export const setToken = (token) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  document.cookie = `access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};
export const getToken = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === "access_token") {
      return cookie[1];
    }
  }
  return null;
};
const Token = () => {
  return <div></div>;
};

export default Token;
