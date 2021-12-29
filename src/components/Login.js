import React from "react";
import {
  Button,
  Input,
  Stack,
  Container,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import Moralis from "moralis/dist/moralis.min.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Login = () => {
  const [auth, setAuth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //check if user is signed in
  const currentUser = Moralis.User.current();
  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      await Moralis.User.logIn(email, password);
      setAuth(true);
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Container>
      {auth && <Navigate to="/lounge" />}
      <Box mt={10} borderWidth="1px" borderRadius="2xl" padding={6}>
        <Heading align="center">Login</Heading>
        <form>
          <Stack spacing={3} mt={6}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
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
              colorScheme="blue"
              onClick={() => loginUser(email, password)}
              disabled={email && password ? false : true}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
      <Box borderWidth="1px" borderRadius="2xl" padding={6} mt={6}>
        <Stack align="center" mb={3}>
          <Text>Don't have an account?</Text>
        </Stack>
        <Stack>
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
