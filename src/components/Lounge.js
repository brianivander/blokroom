import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import { Container, Button, Stack, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  MainContainer,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import groupIcon from "../assets/group-icon.svg";

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

  return (
    <Container>
      {!auth && <Navigate to="/Signup" />}
      <Button onClick={() => logout()}>Logout</Button>
      <MainContainer responsive style={{ border: "0" }}>
        <Stack width="100%">
          <Conversation
            name="Lilly"
            lastSenderName="Lilly"
            info="Yes i can do it for you asdf asdf asdf asdf asdf asdf asd fas dfa dfa sdf"
          >
            <Avatar src={groupIcon} name="Lilly" status="available" />
          </Conversation>
          <Conversation
            name="Lilly"
            lastSenderName="Lilly"
            info="Yes i can do it for you asdf asdf asdf asdf asdf asdf asd fas dfa dfa sdf"
          >
            <Avatar src={groupIcon} name="Lilly" status="available" />
          </Conversation>
          <Conversation
            name="Lilly"
            lastSenderName="Lilly"
            info="Yes i can do it for you asdf asdf asdf asdf asdf asdf asd fas dfa dfa sdf"
          >
            <Avatar src={groupIcon} name="Lilly" status="available" />
          </Conversation>
        </Stack>
      </MainContainer>
      <Heading>This is Lounge</Heading>
      <Stack alignItems="center" width="100%" mt={10}>
        <Text>Create your first room</Text>
        <Button onClick={() => navigate(`/create-room`)}>Create Room</Button>
        <Button onClick={() => navigate(`/room/A0001`)}>
          Join Bored Ape Yacht Club Room
        </Button>
      </Stack>
    </Container>
  );
};
