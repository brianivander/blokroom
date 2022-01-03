import {
  Container,
  Heading,
  Button,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Box,
  useMediaQuery,
  Center,
  Stack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { TopBarRoom } from "./TopBarRoom";
import Moralis from "moralis/dist/moralis.min.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Messages } from "./Messages";
import { JoinRoom } from "./JoinRoom.js";

export const Room = () => {
  const [isLargerThan600] = useMediaQuery(["(min-width: 600px)"]);
  //check if user is signed in
  const currentUser = Moralis.User.current();
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { roomCode } = useParams();
  const [textMessage, setTextMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomDetails, setRoomDetails] = useState("");

  // Query room details
  const getRoomDetails = async () => {
    const Rooms = Moralis.Object.extend("Rooms");
    const rooms = new Moralis.Query(Rooms);
    rooms.equalTo("roomCode", roomCode);
    const roomResults = await rooms.find();
    setRoomId(roomResults[0].id);
    setRoomName(roomResults[0].attributes.roomName);
    setRoomDetails({
      roomId: roomResults[0].id,
      roomChainId: roomResults[0].attributes.chainId,
      roomCollectionName: roomResults[0].attributes.collectionName,
      roomCode: roomResults[0].attributes.roomCode,
      roomDesc: roomResults[0].attributes.roomDesc,
      roomName: roomResults[0].attributes.roomName,
      roomTokenAddress: roomResults[0].attributes.roomTokenAddress,
    });
    console.log(roomResults[0]);

    //check if user has joined the room
    const RoomMembers = Moralis.Object.extend("RoomMembers");
    const roomsjoined = new Moralis.Query(RoomMembers);
    roomsjoined.equalTo("roomIdJoined", roomResults[0].id);
    roomsjoined.equalTo("userId", currentUser.id);
    const rjResults = await roomsjoined.find();
    rjResults.length == 1 && setIsUserJoined(true);
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {currentUser && roomId && (
        <Box
          height={"100%"}
          width={isLargerThan600 ? "500px" : "100%"}
          m={"auto"}
        >
          <TopBarRoom roomName={roomName} isUserJoined={isUserJoined} />
          {/* <Heading>Room {roomCode}</Heading> */}

          {isUserJoined ? (
            <Messages roomId={roomId} userId={currentUser.id} />
          ) : (
            <JoinRoom roomDetails={roomDetails} userId={currentUser.id} />
          )}
        </Box>
      )}
    </div>
  );
};
