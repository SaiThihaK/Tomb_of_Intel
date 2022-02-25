import React, { Children } from "react";

const Error = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "red",
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        color: "white",
        fontWeight: 500,
        borderRadius: 5,
      }}
    >
      {children}
    </div>
  );
};

export default Error;
