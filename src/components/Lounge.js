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
  const [currentRooms, setCurrentRooms] = useState([]);

  //check if user is signed in
  const currentUser = Moralis.User.current();
  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);
    getRoomsJoined();
  }, []);

  const getRoomsJoined = async () => {
    //Query to DB for list of Rooms user has joined
    const RoomsJoined = Moralis.Object.extend("RoomsJoined");
    const roomsJoined = new Moralis.Query(RoomsJoined);
    roomsJoined.equalTo("userId", currentUser.id);
    const results = await roomsJoined.find();

    var resRooms = [];

    for (let i = 0; i < results.length; i++) {
      // Query room details
      const Rooms = Moralis.Object.extend("Rooms");
      const rooms = new Moralis.Query(Rooms);
      rooms.equalTo("objectId", results[i].attributes.roomIdJoined);
      const roomResults = await rooms.find();
      console.log("rooms: ", roomResults);

      for (let i = 0; i < roomResults.length; i++) {
        // Query room details
        const LastMessages = Moralis.Object.extend("Messages");
        const lastMessages = new Moralis.Query(LastMessages);
        lastMessages.equalTo("roomId", results[i].attributes.roomIdJoined);
        lastMessages.descending("createdAt");
        const lastMessagesResults = await lastMessages.first();
        console.log("lastMessagesResults: ", lastMessagesResults);

        if (typeof lastMessagesResults !== "undefined") {
        } else {
        }

        var resRoom = {
          roomId: roomResults[0].id,
          roomName: roomResults[0].attributes.roomName,
          roomCode: roomResults[0].attributes.roomCode,
          lastMsgUserId:
            typeof lastMessagesResults !== "undefined"
              ? lastMessagesResults.id
              : null,
          lastMsgText:
            typeof lastMessagesResults !== "undefined"
              ? lastMessagesResults.id
              : null,
        };

        resRooms.push(resRoom);
      }
    }
    //alert("Successfully retrieved " + results.length + " monsters.");
    // Do something with the returned Moralis.Object values
    console.log("end of loop resRooms: ", resRooms);
    setCurrentRooms(resRooms);
  };

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
          {currentRooms &&
            currentRooms.map((data, key) => {
              return (
                <div key={"0." + key}>
                  <Conversation
                    key={"1." + key}
                    name={data.roomName}
                    lastSenderName={null}
                    info={data.lastMsgText}
                    onClick={() => navigate(`/room/${data.roomCode}`)}
                  >
                    <Avatar src={groupIcon} />
                  </Conversation>
                </div>
              );
            })}
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
