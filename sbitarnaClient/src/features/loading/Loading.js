import React, { useState } from "react";
import Loader from 'react-loader-spinner';
import "./Loading.css";

export default function Loading({color}) {
  return (
    <div className="loadingContainer">
      <Loader
         type="BallTriangle"
         color={color}
         height={200}
         width={200} 
      />
    </div>
  );
}
