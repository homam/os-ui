import * as React from "react";
const service = process.env.service || "default";

export const Disclaimer = ({className}) => (
  <div className={`disclaimer-my ${className || ''}`}>
    You will pay us now!
  </div>
);
