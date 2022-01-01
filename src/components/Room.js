import {
  Container,
  Heading,
  Button,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { Topbar } from "./Topbar";
import Moralis from "moralis/dist/moralis.min.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Messages } from "./Messages";

export const Room = () => {
  //check if user is signed in
  const currentUser = Moralis.User.current();
  const [roomId, setRoomId] = useState("");
  const { roomCode } = useParams();
  const [textMessage, setTextMessage] = useState("");

  // Query room details
  const getRoomDetails = async () => {
    const Rooms = Moralis.Object.extend("Rooms");
    const rooms = new Moralis.Query(Rooms);
    rooms.equalTo("roomCode", roomCode);
    const roomResults = await rooms.find();
    setRoomId(roomResults[0].id);
    console.log(roomResults[0]);
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <Container>
      {currentUser && roomId && (
        <Container>
          <Topbar />
          {/* <Heading>Room {roomCode}</Heading> */}

          <Messages roomId={roomId} userId={currentUser.id} />

          {/* <form onSubmit={sendMessage}>
            <InputGroup size="md">
              <Input
                value={textMessage}
                onChange={(event) => setTextMessage(event.currentTarget.value)}
                placeholder="Type message ..."
              />
              <InputRightElement>
                <IconButton
                  aria-label="arrow forward"
                  icon={<ArrowForwardIcon />}
                  type="submit"
                  //   disabled={isSaving}
                />
              </InputRightElement>
            </InputGroup>
          </form> */}
        </Container>
      )}
    </Container>
  );
};
