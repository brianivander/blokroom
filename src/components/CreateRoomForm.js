import React from "react";
import {
  Container,
  Center,
  Heading,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CreateRoomForm = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>Close</Button>
      <Stack>
        <Center>
          <Text>
            To create an exclusive Room for your NFT owners, please join our
            Discord and chat in the channel #create-room. We'll be in touch with
            you shortly.
          </Text>
        </Center>
        <Button>Join Discord</Button>
      </Stack>
    </Container>
  );
};
