import React from "react";
import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "85vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin style={{ flex: 1 }} />
  </div>
);

export default Loading;
