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
import {
  useMoralis,
  useNewMoralisObject,
  useMoralisQuery,
} from "react-moralis";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Messages } from "./Messages";

export const Room = () => {
  const { isAuthenticated, user } = useMoralis();
  const { roomCode } = useParams();
  const [textMessage, setTextMessage] = useState("");

  // getting Room Details
  const { data } = useMoralisQuery("Rooms", (query) =>
    query.equalTo("roomCode", roomCode)
  );

  // storing Messages
  const { isSaving, error, save } = useNewMoralisObject("Messages");

  if (user) {
    console.log("userdata: ", user);
  }

  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    if (data[0]) {
      setRoomId(data[0].id);
      console.log("inside useeffect");
    }
  }, [data]);

  const getRoomId = () => {
    console.log("getroomid. get data: ", data);
  };

  const collectionName = "";
  // data[0].attributes.collectionName;

  const sendMessage = (e) => {
    const userId = user.id;
    const roomId = data[0].id;

    console.log("the userid: ", user.id);

    e.preventDefault();
    console.log("room ID: ", " | user ID: ", userId, " | text: ", textMessage);
    save({ roomId, userId, textMessage });

    console.log("error: ", error);
  };

  return (
    <Container>
      <Button
        onClick={() => {
          getRoomId();
        }}
      >
        Get Room ID
      </Button>
      {isAuthenticated && (
        <Container>
          <Topbar />
          <Heading>Room {roomCode}</Heading>
          <Text>{collectionName}</Text>
          {roomId && (
            <Messages
              roomId={roomId}
              userId={user.id}
              username={user.attributes.username}
            />
          )}
          <form onSubmit={sendMessage}>
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
                  disabled={isSaving}
                />
              </InputRightElement>
            </InputGroup>
          </form>
        </Container>
      )}
    </Container>
  );
};
