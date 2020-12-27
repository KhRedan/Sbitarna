import React from "react";
import "./NotFound.css";
import pagenotfound from "../../assets/pagenotfound.png";

export default function NotFound() {
  return (
    <div className="notFoundContainer">
      <img src={pagenotfound}></img>
    </div>
  );
}
