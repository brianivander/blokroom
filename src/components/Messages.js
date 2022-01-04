import { Container, Button, Text } from "@chakra-ui/react";
import Moralis from "moralis/dist/moralis.min.js";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState, useEffect, useCallback } from "react";

export const Messages = ({ roomId, userId }) => {
  const [textMessage, setTextMessage] = useState("");
  const [textMsgs, setTextMsgs] = useState([]);

  useEffect(() => {
    subscribeMessages();
  }, []);

  const subscribeMessages = async () => {
    const query = new Moralis.Query("Messages");
    query.equalTo("roomId", roomId);
    const subscription = await query.subscribe();

    subscription.on("open", () => {
      getMessages();
    });

    // on subscription object created
    subscription.on("create", async (object) => {
      var msg = {
        msgId: object.id,
        createdAt: object.attributes.createdAt,
        userId: object.attributes.userId,
        textMessage: object.attributes.textMessage,
        username: await getUsername(object.attributes.userId),
      };

      setTextMsgs((oldarr) => [...oldarr, msg]);
    });
  };

  // Get textMsgs in this room
  const getMessages = async () => {
    const Message = Moralis.Object.extend("Messages");
    const message = new Moralis.Query(Message);
    message.equalTo("roomId", roomId);
    const msgResults = await message.find();

    var msgs = [];

    for (let i = 0; i < msgResults.length; i++) {
      var username = await getUsername(msgResults[i].attributes.userId);

      var msg = {
        msgId: msgResults[i].id,
        createdAt: msgResults[i].attributes.createdAt,
        userId: msgResults[i].attributes.userId,
        textMessage: msgResults[i].attributes.textMessage,
        username: username,
      };

      msgs.push(msg);
    }

    setTextMsgs(msgs);
  };

  const getUsername = async (userId) => {
    const params = { userId: userId };
    const user = await Moralis.Cloud.run("getUsername", params);
    return user.attributes.username;
  };

  const sendMessage = (e) => {
    var newMsg = {
      textMessage: textMessage,
      userId: userId,
      roomId: roomId,
    };

    const Message = Moralis.Object.extend("Messages");
    const message = new Message();

    message.set(newMsg);
    message.save().then(
      (msg) => {
        // Execute any logic that should take place after the object is saved.
        //alert("New object created with objectId: " + msg.id);
        setTextMessage("");
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
      }
    );
  };

  return (
    <MainContainer style={{ border: "0" }}>
      <ChatContainer>
        <MessageList>
          <MessageList.Content>
            {textMsgs &&
              textMsgs.map((data, key) => {
                return (
                  <div key={"0." + key}>
                    <Text
                      key={"1." + key}
                      align={data.userId === userId ? "right" : "left"}
                      fontSize="xs"
                    >
                      {data.username}
                    </Text>
                    <Message
                      model={{
                        message: data.textMessage,
                        direction:
                          data.userId === userId ? "outgoing" : "incoming",
                        sentTime: "just now",
                        sender: "Joe",
                      }}
                      key={"2." + key}
                    />
                  </div>
                );
              })}
          </MessageList.Content>
        </MessageList>
        <MessageInput
          value={textMessage}
          placeholder="Type message here"
          attachButton={false}
          onChange={(text) => {
            setTextMessage(text);
          }}
          onSend={sendMessage}
        />
      </ChatContainer>
    </MainContainer>
  );
};
