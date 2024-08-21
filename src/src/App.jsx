import { useState } from "react";

import "./App.css";
import Vcard from "./components/Vcard/Vcard";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Vcard />
    </div>
  );
}

export default App;
