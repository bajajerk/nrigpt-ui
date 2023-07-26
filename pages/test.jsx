import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    // Sample messages (replace with your actual messages)
    { id: 1, text: 'Hello!', sender: 'User' },
    { id: 2, text: 'Hi there!', sender: 'Bot' },
  ]);

  const messageListRef = useRef(null);

  // Function to add a new message
  const addNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Function to handle the submission of a new message
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = {
      id: Date.now(),
      text: formData.get('message'),
      sender: 'User',
    };
    addNewMessage(message);
    e.target.reset();
  };

  // Function to scroll to the latest message
  const scrollToLatestMessage = () => {
    const list = messageListRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  };

  // Scroll to the latest message on component update (new message received)
  useEffect(() => {
    scrollToLatestMessage();
  }, [messages]);

  return (
    <div className="chat-interface">
      <div className="message-list" ref={messageListRef}>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className={message.sender}>
              {message.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;
