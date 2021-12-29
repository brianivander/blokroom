import { Container } from "@chakra-ui/react";
import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import { Navigate, Link } from "react-router-dom";
import { Topbar } from "./components/Topbar";

function App() {
  //check if user is signed in
  const currentUser = Moralis.User.current();
  if (currentUser) {
    // user is authenticated
  } else {
    // user is NOT authenticated
  }

  /* Authentication code */
  async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console(error);
        });
    }
  }

  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  return (
    <Container>
      {currentUser ? <Navigate to="/lounge" /> : <Navigate to="/signup" />}
      <Topbar />
      <button onClick={() => login()}>Login</button>
      <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
    </Container>
  );
}

export default App;
