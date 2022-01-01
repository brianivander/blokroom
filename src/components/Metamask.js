import React from "react";
import { Button, Text, Select, Image, SimpleGrid, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Moralis from "moralis/dist/moralis.min.js";

const cardSelect = {
  boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)",
};

export const Metamask = (props) => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [currentNFTs, setCurrentNFTs] = useState([]);
  const [readyNFT, setReadyNFT] = useState(false);
  const [selected, setSelected] = useState("");
  const [NFTSelected, setNFTSelected] = useState("");

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      setCurrentAddress(accounts[0]);
    });

    window.ethereum.request({ method: "eth_chainId" }).then((chain) => {
      setChainId(chain);
    });

    props.func(NFTSelected);
  }, [NFTSelected]);

  const getNFT = async () => {
    //NFTs
    const options = {
      chain: chainId,
      address: currentAddress,
    };

    console.log(options);
    const anyNFTs = await Moralis.Web3API.account.getNFTs(options);
    await setCurrentNFTs(anyNFTs.result);
    await setReadyNFT(true);
    console.log("anyNFTs: ", anyNFTs);
  };

  const updateNFTDetails = (data, key) => {
    setNFTSelected({
      chainId: chainId,
      tokenAddress: data.token_address,
      createdBy: {
        Address: currentAddress,
        tokenId: data.token_id,
      },
      ownedByAddress: {
        Address: currentAddress,
        tokenId: data.token_id,
      },
      collectionName: data.name,
    });
  };

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

  return (
    <div>
      <Text>Chain</Text>
      <Select
        value={chainId}
        onChange={(e) => {
          setChainId(e.target.value);
        }}
      >
        <option value="0x1">Ethereum</option>
        <option value="0x89">Polygon</option>
      </Select>
      <Button onClick={() => connectMetamask()}>Connect Metamask</Button>
      <Text>Address</Text>
      <Text>{currentAddress}</Text>
      <Button onClick={() => getNFT()}>Get NFT</Button>
      <Button onClick={() => console.log(NFTSelected)}>Get NFTSelected</Button>
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
                    e.target.src =
                      "https://image.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg";
                  }}
                />
              </Box>
            );
          })}
      </SimpleGrid>

      <Text>You don't see your NFT above? Contact us!</Text>
    </div>
  );
};
