import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Moralis from "moralis/dist/moralis.min.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Lounge } from "./components/Lounge";
import { Room } from "./components/Room";
import { CreateRoomForm } from "./components/CreateRoomForm";
import { Metamask } from "./components/Metamask";
import "./index.css";
import { MoralisProvider } from "react-moralis";

/* Moralis init code */
const serverUrl = "https://nxn8fjencjmj.usemoralis.com:2053/server";
const appId = "XduTGxEyasTBbSV3UM7EWOKUjgShrHIuprU6BgrN";
Moralis.start({ serverUrl, appId });

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  components: {
    Steps,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="lounge" element={<Lounge />} />{" "}
            <Route path="room/:roomCode" element={<Room />} />{" "}
            <Route path="create-room" element={<CreateRoomForm />} />
            <Route path="metamask" element={<Metamask />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
