import React from "react";
import {
  Container,
  Flex,
  Text,
  Center,
  Heading,
  Button,
  Stack,
  HStack,
  Input,
  Box,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useState } from "react";

const steps = [{ label: "Step 1" }, { label: "Step 2" }];

export const CreateRoom = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [roomName, setRoomName] = useState("");

  return (
    <Container>
      <Steps activeStep={activeStep}>
        <Step label="Select NFT" key="content1">
          Connect to Metamask and select an NFT. You must be the creator of the
          NFT in order to create a room
        </Step>
        <Step label="Room Details" key="content2">
          Room Name, Room Code (from roomname but must be unique, if not unique
          then they must change the roomcode), Room Description
          <form>
            <Stack spacing={3} mt={6}>
              <Input
                placeholder="Room Name"
                value={roomName}
                onChange={(event) => setRoomName(event.currentTarget.value)}
              />
              <InputGroup>
                <InputLeftAddon children="blokroom.com/room/" />
                <Input placeholder="Room URL" />
              </InputGroup>
              <Textarea placeholder="Room Description" />
            </Stack>

            <HStack mt={6}>
              <Button
                width="50%"
                colorScheme="blue"
                mr={4}
                variant="outline"
                onClick={prevStep}
                isDisabled={activeStep === 0}
              >
                Prev
              </Button>
              <Button width="50%" colorScheme="blue" onClick={nextStep}>
                {activeStep === steps.length - 1 ? "Create Room" : "Next"}
              </Button>
            </HStack>
          </form>
        </Step>
      </Steps>
      {activeStep === 2 ? (
        <Center p={4} flexDir="column">
          <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
          <Button mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Center>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            mr={4}
            size="sm"
            variant="outline"
            onClick={prevStep}
            isDisabled={activeStep === 0}
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Container>
  );
};
