import React from "react";
import { Button, Text, Container, Flex } from "@chakra-ui/react";

export const RoomCheck = () => {
  return (
    <Container>
      <Text>
        Create Group Based on Contract ID / Token Address. Only those with the
        same contract ID but different token ID. For example, the Crypto Punks
        are all in the same contract ID but different on the token ID
      </Text>
      <Flex
        border="1px"
        borderColor="green.500"
        borderRadius={10}
        p={3}
        width="inherit"
      >
        <Text>Group Name</Text>
        <Text>Description</Text>
        <Text>Based on Contract ID</Text>
      </Flex>
    </Container>
  );
};
