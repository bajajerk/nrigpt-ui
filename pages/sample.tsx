import React from 'react';

const ChatGptChat = () => {
  const [messages, setMessages] = React.useState([
    { text: 'Hello!', isUser: false },
    { text: 'Hi there!', isUser: true },
    { text: 'How can I assist you today?', isUser: false },
    // Add more messages here...
  ]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isUser: true }]);
    // Replace the following line with your logic to send the user's message to the bot and get the bot's response
    const botResponse = 'This is a response from the bot.';
    setTimeout(() => {
      setMessages([...messages, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.isUser ? 'justify-end' : 'justify-start'
            } mb-4 flex`}
          >
            <div
              className={`${
                message.isUser
                  ? 'bg-blue-500 text-white rounded-br-lg rounded-tl-lg'
                  : 'bg-white text-gray-800 rounded-bl-lg rounded-tr-lg'
              } p-3 max-w-xs break-words shadow-md`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 py-2">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-2 shadow-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button className="absolute right-0 top-0 mt-2 mr-4">
            {/* Add your send icon here */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatGptChat;
