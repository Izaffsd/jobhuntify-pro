import React from "react";

const NotFound = ({ propName }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // stack children vertically
        justifyContent: "center", // vertical
        alignItems: "center", // horizontal
        height: "100vh", // full viewport height to center vertically
      }}
    >
      <h1>404 - Not Found</h1>
      <p>Hello, {propName}! The page you are looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
