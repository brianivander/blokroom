import { Container, Button, Text } from "@chakra-ui/react";
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";
import { useState, useEffect } from "react";

export const Messages = (roomData) => {
  const [textMessage, setTextMessage] = useState("");
  const myRoomId = roomData.roomId;
  const myUserId = roomData.userId;
  const myUsername = roomData.username;
  const { fetch, data, isLoading } = useMoralisQuery(
    "Messages",
    (query) => query.equalTo("roomId", myRoomId),
    [],
    { live: true }
  );

  // if (data.length > 0) {
  //   console.log("data: ", data);
  //   var messages = [];
  //   var message = {};
  //   console.log(messages);
  //   for (let i in data) {
  //     message.id = data[i].id;
  //     message.userId = data[i].attributes.userId;
  //     messages.push({ ...message });
  //   }
  //   console.log("messages: ", messages);
  // }

  const { isSaving, error, save } = useNewMoralisObject("Messages");

  const sendMessage = () => {
    console.log(textMessage);
    setTextMessage("");
    var roomId = myRoomId;
    var userId = myUserId;
    var username = myUsername;
    save({ roomId, userId, textMessage, username });
    console.log(error);
  };

  return (
    <Container>
      {/* react chat */}
      <MainContainer style={{ border: "0" }}>
        <ChatContainer>
          <MessageList>
            {data.map((d) => {
              return (
                <>
                  <Text
                    align={d.attributes.userId === myUserId ? "right" : "left"}
                    fontSize="xs"
                  >
                    {d.attributes.username}
                  </Text>
                  <Message
                    model={{
                      message: d.attributes.textMessage,
                      direction:
                        d.attributes.userId === myUserId
                          ? "outgoing"
                          : "incoming",
                      sentTime: "just now",
                      sender: "Joe",
                    }}
                    key={d.id}
                  />
                </>
              );
            })}
            {/* <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
              }}
            /> */}
          </MessageList>
          <MessageInput
            value={textMessage}
            placeholder="Type message here"
            attachButton={false}
            onChange={(text) => {
              console.log(text);
              setTextMessage(text);
            }}
            onSend={() => {
              sendMessage();
            }}
          />
        </ChatContainer>
      </MainContainer>
      <Button onClick={() => fetch}>Fetch Data</Button>
    </Container>
  );
};
