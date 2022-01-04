import React from "react";
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
  Divider,
  SimpleGrid,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Moralis from "moralis/dist/moralis.min.js";

const chainIdNames = [
  {
    name: "Ethereum",
    chainId: "0x1",
  },
  {
    name: "Polygon (Matic)",
    chainId: "0x89",
  },
];

const cardSelect = {
  boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)",
};

export const JoinRoom = ({ roomDetails, userId }) => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentChain, setCurrentChain] = useState("");
  const [currentNFTs, setCurrentNFTs] = useState([]);
  const [readyNFT, setReadyNFT] = useState(false);
  const [selected, setSelected] = useState("");
  const [NFTSelected, setNFTSelected] = useState("");

  console.log(roomDetails);

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      setCurrentAddress(accounts[0]);

      window.ethereum.request({ method: "eth_chainId" }).then((chain) => {
        const chainName = chainIdNames.filter((pair) => pair.chainId == chain);
        chainName.length == 0
          ? setCurrentChain({ name: "Chain not supported", chainId: "00" })
          : setCurrentChain(chainName[0]);

        getNFT(accounts[0], chain);
      });
    });
  }, []);

  const connectMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask is installed!", window.ethereum.isConnected());
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(
        window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
          setCurrentAddress(accounts[0]);
        })
      );
    } else {
      console.log("something is not Metamask");
      alert("Install Metamask");
    }
  };

  const getNFT = async (address, chainId) => {
    //NFTs
    const options = {
      chain: chainId,
      address: address,
    };

    const anyNFTs = await Moralis.Web3API.account.getNFTs(options);
    setReadyNFT(true);

    setCurrentNFTs(anyNFTs.result);
  };

  const updateNFTDetails = (data, key) => {
    setNFTSelected({
      chainId: currentChain.chainId,
      tokenAddress: data.token_address,
      tokenId: data.token_id,
    });
  };

  const sendJoinRoom = async () => {
    // Add to RoomMembers
    const RoomMembers = Moralis.Object.extend("RoomMembers");
    const roomMembers = new RoomMembers();

    roomMembers.set({
      roomId: roomDetails.roomId,
      userId: userId,
      chainId: NFTSelected.chainId,
      tokenAddress: NFTSelected.tokenAddress,
      tokenId: NFTSelected.tokenId,
    });
    roomMembers.save().then(
      (newlyRoomMember) => {
        // Execute any logic that should take place after the object is saved.
        alert("New object created with objectId: " + newlyRoomMember.id);
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
      <Button onClick={() => console.log(currentAddress)}>
        cuurent address
      </Button>
      <Center>
        <Stack>
          <Heading mt={6}>{roomDetails.roomName}</Heading>{" "}
          <Text>{roomDetails.roomDesc}</Text>
        </Stack>
      </Center>
      <hr style={{ border: "1px solid lightgrey", margin: "20px 0" }} />
      <Heading>Join Room</Heading>
      <Text>
        To join the room, select NFT that is in collection:{" "}
        {roomDetails.roomCollectionName}
      </Text>
      <Stack mt={6}>
        {currentAddress ? (
          <Box>
            <Text fontWeight="700">
              You have connected metamask with address:
            </Text>
            <Text>{currentAddress}</Text>

            <Text fontWeight="700">Chain:</Text>
            <Text>{currentChain.name}</Text>

            <SimpleGrid columns={2} spacing={5}>
              {readyNFT &&
                currentNFTs.map((data, key) => {
                  return (
                    <Box
                      key={"0." + key}
                      border="1px"
                      borderColor="green.500"
                      borderRadius={10}
                      p={3}
                      onClick={() => {
                        setSelected(key);
                        updateNFTDetails(data, key);
                      }}
                      style={{
                        cursor: "pointer",
                        ...(selected === key && cardSelect),
                      }}
                    >
                      <Text key={"3." + key}>
                        {data.name}
                        {"#" + data.token_id + " "}
                      </Text>

                      <Image
                        key={"4." + key}
                        src={
                          data.metadata
                            ? "https://ipfs.io/ipfs/" +
                              JSON.parse(data.metadata).image.slice(7)
                            : ""
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://i.imgur.com/mesuICu.png";
                        }}
                      />
                    </Box>
                  );
                })}
            </SimpleGrid>
            <Box
              position="fixed"
              bottom="15px"
              height="auto"
              left="50%"
              transform="translateX(-50%)"
            >
              <Stack>
                <Button
                  width={200}
                  colorScheme="blue"
                  variant="solid"
                  onClick={() => sendJoinRoom()}
                  isDisabled={!NFTSelected}
                >
                  SELECT NFT
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Button colorScheme="blue" onClick={() => connectMetamask()}>
            Connect Metamask
          </Button>
        )}
      </Stack>
    </Container>
  );
};
