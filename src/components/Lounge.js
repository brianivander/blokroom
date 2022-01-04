import React from "react";
import Moralis from "moralis/dist/moralis.min.js";
import { Container, Button, Stack, Heading, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  MainContainer,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import groupIcon from "../assets/group.png";
import { TopBar } from "./TopBar";

export const Lounge = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState("asdf");
  const [currentRooms, setCurrentRooms] = useState([]);

  //check if user is signed in
  const currentUser = Moralis.User.current();
  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);
    getRoomMembers();
  }, []);

  const getRoomMembers = async () => {
    //Query to DB for list of Rooms user has joined
    const RoomMembers = Moralis.Object.extend("RoomMembers");
    const roomMembers = new Moralis.Query(RoomMembers);
    roomMembers.equalTo("userId", currentUser.id);
    const results = await roomMembers.find();

    console.log("roomsjoined: ", results);
    var resRooms = [];

    for (let i = 0; i < results.length; i++) {
      // Query room details
      const Rooms = Moralis.Object.extend("Rooms");
      const rooms = new Moralis.Query(Rooms);
      rooms.equalTo("objectId", results[i].attributes.roomId);
      const roomResults = await rooms.find();
      console.log("rooms: ", roomResults);

      // Query lastmessage details
      const LastMessages = Moralis.Object.extend("Messages");
      const lastMessages = new Moralis.Query(LastMessages);
      lastMessages.equalTo("roomId", roomResults[0].id);
      lastMessages.descending("createdAt");
      const lastMessagesResults = await lastMessages.first();
      console.log("lastMessagesResults: ", lastMessagesResults);

      var resRoom = {
        roomId: roomResults[0].id,
        roomName: roomResults[0].attributes.roomName,
        roomCode: roomResults[0].attributes.roomCode,
      };

      if (typeof lastMessagesResults !== "undefined") {
        resRoom.lastMsgUsername = await getUsername(
          lastMessagesResults.attributes.userId
        );
        resRoom.lastMsgText = lastMessagesResults.attributes.textMessage;
      } else {
        //there is no message in this room yet
        resRoom.lastMsgUsername = null;
        resRoom.lastMsgText = null;
      }
      resRooms.push(resRoom);
    }
    //alert("Successfully retrieved " + results.length + " monsters.");
    // Do something with the returned Moralis.Object values
    console.log("end of loop resRooms: ", resRooms);
    setCurrentRooms(resRooms);
  };

  const getUsername = async (userId) => {
    const params = { userId: userId };
    const user = await Moralis.Cloud.run("getUsername", params);
    return user.attributes.username;
  };

  const logout = () => {
    Moralis.User.logOut().then(() => {
      const currentUser = Moralis.User.current(); // this will now be null
      setAuth(false);
    });
  };

  return (
    <Box>
      <TopBar logout={() => logout()} />
      <Container>
        <Box m={2}>
          <Text>Welcome, {currentUser.attributes.username}</Text>
        </Box>
        {!auth && <Navigate to="/Signup" />}
        <MainContainer responsive style={{ border: "0" }}>
          <Stack width="100%">
            {currentRooms &&
              currentRooms.map((data, key) => {
                return (
                  <div key={"0." + key}>
                    <Conversation
                      key={"1." + key}
                      name={data.roomName}
                      lastSenderName={data.lastMsgUsername}
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
      </Container>
    </Box>
  );
};
