import React from "react";
import "./Loading.css";
export default () => (
  <div className="w-full flex flex-col justify-center h-screen bg-gray-200">
    <div className="lds-roller self-center">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
