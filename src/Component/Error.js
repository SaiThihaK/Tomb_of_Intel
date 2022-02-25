import React from "react";

const Error = () => {
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
      Please Fill All the Field
    </div>
  );
};

export default Error;
