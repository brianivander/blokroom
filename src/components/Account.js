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

export const Account = () => {
  const User = Moralis.Object.extend("User");
  const user = new User();
  const [auth, setAuth] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //check if user is signed in
  const currentUser = Moralis.User.current();
  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);

    setEmail(currentUser.attributes.email);
    setUsername(currentUser.attributes.username);
    console.log(currentUser);
    setIsPageReady(true);
  }, []);

  const updateUser = async (username, password, email) => {
    username && user.set("username", username);
    password && user.set("password", password);
    email && user.set("email", email);
    await user.save();
    alert("Account Updated");
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
      {isPageReady && (
        <div>
          {auth ? (
            <div>
              <Box mt={10} borderWidth="1px" borderRadius="2xl" padding={6}>
                <Text align="center">Account Settings</Text>
                <form>
                  <Stack mt={6}>
                    <Text fontSize="sm">Email</Text>
                    <Input
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                  </Stack>
                  <Stack mt={6}>
                    <Text fontSize="sm">Username</Text>
                    <Input
                      placeholder="Username"
                      value={username}
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
                    />
                  </Stack>
                  <Stack mt={6}>
                    <Text fontSize="sm">New Password</Text>
                    <Input
                      placeholder="Input New Password"
                      type="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                  </Stack>
                  <Stack mt={6}>
                    <Button
                      onClick={() => updateUser(username, password, email)}
                      colorScheme="blue"
                    >
                      Update Account
                    </Button>
                  </Stack>
                </form>
              </Box>
            </div>
          ) : (
            <Navigate to="/lounge" />
          )}
        </div>
      )}
    </Container>
  );
};
