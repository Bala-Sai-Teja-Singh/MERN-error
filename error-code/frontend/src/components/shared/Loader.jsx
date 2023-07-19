import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <PropagateLoader color={"#000000"} />
    </div>
  );
};

export default Loader;
