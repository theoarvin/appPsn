import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import Header from "./Header";

const API_KEY = "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";

interface Message {
  message: string;
  sender: string;
}

function ChatBot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "hello, i am ChatGPT !",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = (message: string) => {
    const newMessage = {
      message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);

    processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages: Message[]) => {
    let role = "";
    const apiMessages = chatMessages.map((messageObject) => {
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // role: "user" -> a message from the user, "assistant" -> a response from chatGPT, "system" -> generally one initial message defining how we want chatgpt to talk
    const systemMessage = {
      role: "system",
      content:
        "Nous somme un chatbox pour une application d'aide pour les jeunes placé en foyer, Une solution sur-mesure créée pour les besoins des établissements assurant un accueil et un accompagnement personnalisé. L’objectif est de mettre en relation et de couvrir les besoins de tous les acteurs de l’aide social à l’enfance (Éducateurs, organismes, lieux de vie et les jeunes !). ",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "assistant",
          },
        ]);
        setTyping(false);
      });
  };

  return (
    <>
      <Header />
      <div>
        <div style={{ position: "relative", height: "400px", width: "400px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="ChatBot is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message as MessageModel} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
