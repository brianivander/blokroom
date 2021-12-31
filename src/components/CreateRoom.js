import React from "react";
import {
  Container,
  Center,
  Heading,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Metamask } from "./Metamask";
import { RoomCheck } from "./RoomCheck";
import { CreateRoomDetails } from "./CreateRoomDetails";
import Moralis from "moralis/dist/moralis.min.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
  { label: "Step 4" },
];

export const CreateRoom = () => {
  //check if user is signed in
  const [auth, setAuth] = useState("asdf");
  const currentUser = Moralis.User.current();

  useEffect(() => {
    currentUser ? setAuth(true) : setAuth(false);
    console.log(currentUser);
  }, []);

  const navigate = useNavigate();

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [newRoom, setNewRoom] = useState("");
  const updateNFT = (param) => {
    setNewRoom(param);
  };

  const updateRoomDetails = (param) => {
    var merge = { ...newRoom, ...param };
    setNewRoom(merge);
    console.log(merge);
  };

  const createRoom = () => {
    // Add to Rooms table
    const Room = Moralis.Object.extend("Rooms");
    const room = new Room();

    room.set(newRoom);
    room.save().then(
      (room) => {
        // Execute any logic that should take place after the object is saved.
        alert("New object created with objectId: " + room.id);

        // Add to RoomsJoined table
        const RoomsJoined = Moralis.Object.extend("RoomsJoined");
        const roomsJoined = new RoomsJoined();
        roomsJoined.set({
          userId: currentUser.id,
          roomIdJoined: room.id,
        });
        roomsJoined.save();

        // Add to RoomMembers table
        const RoomMembers = Moralis.Object.extend("RoomMembers");
        const roomMembers = new RoomMembers();
        roomMembers.set({
          roomId: room.id,
          roomMemberId: currentUser.id,
        });
        roomMembers.save();
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
      }
    );
  };

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>Close</Button>
      <Steps activeStep={activeStep}>
        <Step label="Intro" key="content0">
          A "Room" in blokroom is an exclusive room for the holders of the same
          NFT Collection. Only NFT holders in the same collection can join the
          room by proving their ownership of NFT
        </Step>
        <Step label="NFT" key="content1">
          Connect to Metamask and select an NFT. You must be the creator of the
          NFT in order to create a room
          <Metamask func={updateNFT} />
        </Step>
        <Step label="Check" key="content2">
          There are 0 NFT Rooms with this collection
          <RoomCheck />
        </Step>
        <Step label="Room" key="content3">
          Room Name, Room Code (from roomname but must be unique, if not unique
          then they must change the roomcode), Room Description
          <CreateRoomDetails func={updateRoomDetails} />
        </Step>
      </Steps>
      {activeStep === 4 ? (
        <Center p={4} flexDir="column">
          <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
          <Button mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Center>
      ) : (
        <Box
          position="fixed"
          bottom="15px"
          height="auto"
          left="50%"
          transform="translateX(-50%)"
        >
          <HStack>
            <Button
              width={200}
              colorScheme="blue"
              variant="outline"
              background="white"
              onClick={prevStep}
              isDisabled={activeStep === 0}
            >
              PREV
            </Button>
            {activeStep == 3 ? (
              <Button
                width={200}
                colorScheme="blue"
                onClick={() => {
                  createRoom();
                }}
              >
                CREATE ROOM
              </Button>
            ) : (
              <Button
                width={200}
                colorScheme="blue"
                onClick={() => {
                  nextStep();
                  console.log(activeStep, steps.length);
                }}
              >
                NEXT
              </Button>
            )}
          </HStack>
        </Box>
      )}
    </Container>
  );
};
