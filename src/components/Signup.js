import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import {
  Button,
  Input,
  Stack,
  Text,
  Container,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const Signup = () => {
  const user = new Moralis.User();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //check if user is signed in
  const currentUser = Moralis.User.current();
  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);
  }, []);

  const signupUser = async (username, password, email) => {
    try {
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      await user.signUp();
      setAuth(true);
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  };

  const loginMetamask = () => {
    Moralis.authenticate()
      .then(function (user) {
        console.log(user.get("ethAddress"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      {auth && <Navigate to="/lounge" />}
      <Box mt={10} borderWidth="1px" borderRadius="2xl" padding={6}>
        <Heading>Welcome to Signift!</Heading>
        <Stack mt={3}>
          <Text>
            Here, NFT creators can create chat room, polling, redeemable
            vouchers, and more, exclusively for their NFT holders. If an owner
            sells the NFT, they will not be able to continue in the room, the
            new owner will then be able to join.
          </Text>
        </Stack>
      </Box>
      <Box mt={10} borderWidth="1px" borderRadius="2xl" padding={6}>
        <Heading align="center">Sign Up</Heading>
        <form>
          <Stack spacing={3} mt={6}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </Stack>
          <Stack mt={6}>
            <Button
              onClick={() => signupUser(username, password, email)}
              colorScheme="blue"
              disabled={email && username && password ? false : true}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Box>
      <Box borderWidth="1px" borderRadius="2xl" padding={6} mt={6}>
        <Stack align="center" mb={3}>
          <Text>Already have an account?</Text>
        </Stack>
        <Stack>
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>
      </Box>
      <Stack align="center" mt={6}>
        <Text>We'd really love to hear your suggestions</Text>
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() =>
            window.open("https://discord.gg/BsGBVyjtAk", "_blank").focus()
          }
        >
          Join our Discord
        </Button>
      </Stack>
    </Container>
  );
};
