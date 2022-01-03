import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Navigate, useNavigate } from "react-router-dom";

export const TopBarRoom = ({ roomName, isUserJoined }) => {
  const navigate = useNavigate();

  return (
    <Box
      height={"50px"}
      width={"100%"}
      position={isUserJoined ? "fixed" : "relative"}
      top="0"
      left="0"
      zIndex="2"
    >
      <Box
        width="500px"
        background={"lightgrey"}
        height="100%"
        margin="auto"
        borderBottom="1px solid lightgrey"
      >
        <Flex alignItems="center" height="100%">
          <ArrowBackIcon
            w={8}
            h={8}
            marginLeft={2}
            marginRight={4}
            onClick={() => navigate(-1)}
          />
          <Text fontWeight="700">{roomName} </Text>
        </Flex>
      </Box>
    </Box>
  );
};
