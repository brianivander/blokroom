import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import { Container, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Lounge = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState("asdf");

  //check if user is signed in
  const currentUser = Moralis.User.current();
  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);
  }, []);

  const logout = () => {
    Moralis.User.logOut().then(() => {
      const currentUser = Moralis.User.current(); // this will now be null
      setAuth(false);
    });
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((error) => {
          alert("Error: " + error.code + " " + error.message + error);
        });
      console.log("MetaMask is connected!");
      const ethacc = await window.ethereum.request({ method: "eth_accounts" });
      console.log("etacc: ", ethacc);
    }
  };

  return (
    <Container>
      {" "}
      <Button onClick={() => connectMetamask()}>Connect Metamask</Button>
      {!auth && <Navigate to="/Signup" />}
      <Button onClick={() => logout()}>Logout</Button>
    </Container>
  );
};
