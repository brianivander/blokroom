import React from "react";
import {
  Stack,
  Input,
  Box,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const CreateRoomDetails = (props) => {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  useEffect(() => {
    var roomDetails = {
      roomName: roomName,
      roomCode: roomCode,
      roomDesc: roomDesc,
    };

    props.func(roomDetails);
  }, [roomName, roomCode, roomDesc]);

  return (
    <div>
      <form>
        <Stack spacing={3} mt={6}>
          <Input
            placeholder="Room Name"
            value={roomName}
            onChange={(event) => setRoomName(event.currentTarget.value)}
          />
          <InputGroup>
            <InputLeftAddon children="blokroom.com/room/" />
            <Input
              value={roomCode}
              placeholder="Room Handle"
              onChange={(event) => setRoomCode(event.currentTarget.value)}
            />
          </InputGroup>
          <Textarea
            placeholder="Room Description"
            value={roomDesc}
            onChange={(event) => setRoomDesc(event.currentTarget.value)}
          />
          <Box background="lightgrey" p={5} borderRadius={10}>
            <Link
              href="https://chakra-ui.com"
              color="blue"
              isExternal
              target="_blank"
            >
              Room exclusive for contract ID
            </Link>
          </Box>
        </Stack>
      </form>
    </div>
  );
};
