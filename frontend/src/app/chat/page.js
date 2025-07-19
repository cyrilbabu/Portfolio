"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receivingMessages, setReceivingMessages] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const scrollRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);

      try {
        setReceivingMessages(true);
        setInput("");
        const response = await axios.post(`${baseUrl}/bot/chatbot/`, {
          message: input,
          conversation: messages,
        });

        const botMessage = response.data.reply;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error sending message", error);
      } finally {
        setReceivingMessages(false);
      }
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen px-4 md:px-36 py-4 bg-blue-950 box-border">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/ai-cyril.png"
            alt="Logo"
            className="rounded-full w-12 h-12"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-white">Cyril</h2>
            {receivingMessages && (
              <div className="text-blue-500 text-sm animate-pulse">
                typing...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto max-h-[68vh] space-y-3 p-4 border border-gray-300 rounded-md bg-white/10"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-full flex space-x-2 ${
              message.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            {/* Avatar for bot */}
            {message.sender === "bot" && (
              <div className="w-10 h-10">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <img
                    src="/ai-cyril.png"
                    alt="Bot"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Message bubble */}
            <p
              className={`py-1 px-3 max-w-[70%] text-sm border-2  rounded-lg ${
                message.sender === "bot"
                  ? "text-left border-gray-300 bg-white/20 text-white"
                  : "text-right bg-green-200 border-green-400"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !receivingMessages) {
              handleSend();
            }
          }}
          className="flex-1 px-4 py-2 border border-gray-300 text-white rounded-md bg-white/30 placeholder:text-gray-400 focus:outline-none focus:border-white/80"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          disabled={receivingMessages}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
