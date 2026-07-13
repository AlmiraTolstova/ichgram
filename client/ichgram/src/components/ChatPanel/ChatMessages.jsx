import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.conversations);

  return (
    <>
      {messages.map((message, index) => {
        const showAvatar =
          index === 0 || messages[index - 1].sender._id !== message.sender._id;

        return (
          <MessageBubble
            key={message._id}
            message={message}
            showAvatar={showAvatar}
          />
        );
      })}
    </>
  );
};

export default ChatMessages;
