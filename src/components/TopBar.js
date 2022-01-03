import React from "react";
import { Flex, Box, Text, IconButton, Input, Button } from "@chakra-ui/react";
import {
  HamburgerIcon,
  ExternalLinkIcon,
  SettingsIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

export const TopBar = ({ logout }) => {
  const navigate = useNavigate();

  return (
    <Box
      height="50px"
      width="500px"
      background={"lightgrey"}
      margin="auto"
      borderBottom="1px solid lightgrey"
    >
      <Flex alignItems="center" height="100%">
        <Menu>
          <MenuButton>
            <HamburgerIcon w={8} h={8} marginLeft={2} marginRight={4} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<SettingsIcon />}>Account Settings</MenuItem>
            <MenuItem
              icon={<ExternalLinkIcon />}
              onClick={() =>
                window.open("https://discord.gg/BsGBVyjtAk", "_blank").focus()
              }
            >
              Join Discord
            </MenuItem>
            <MenuItem icon={<CloseIcon />} onClick={() => logout()}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
        <Text fontWeight="700" fontSize="xl">
          Signift
        </Text>
      </Flex>
    </Box>
  );
};
