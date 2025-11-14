"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import chatbotData from "@/data/chatbot.json";

interface ChatMessage {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      text: chatbotData.welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleQuickReply = (replyText: string, replyMessage: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      text: replyText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        "💼 Business Inquiry": "Great! I'll connect you with our business team on WhatsApp. You can discuss your requirements, project scope, and how we can help grow your business. 🚀",
        "🛠️ Technical Support": "I'll redirect you to our technical support team on WhatsApp. They'll help you resolve any technical issues quickly. Our experts are ready to assist! 💻",
        "💰 Pricing Information": "Perfect! I'll connect you with our team on WhatsApp to discuss our pricing packages and find the best solution for your budget. We offer flexible pricing options! 💎",
        "📞 Schedule a Call": "Excellent! I'll help you schedule a consultation call with our team. On WhatsApp, you can choose your preferred date and time. Our experts are looking forward to speaking with you! 📅",
      };

      const botMessage: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponses[replyText] || "I'll connect you with our team on WhatsApp right away! 🚀",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Open WhatsApp after showing the bot response
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${chatbotData.whatsappNumber}?text=${encodeURIComponent(replyMessage)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 800);
    }, 500);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: messages.length + 1,
        type: "user",
        text: message.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Add bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: messages.length + 2,
          type: "bot",
          text: "Thank you for your message! I'll connect you with our team on WhatsApp for a personalized response. 📱",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);

        // Open WhatsApp
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/${chatbotData.whatsappNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          setMessage("");
        }, 800);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chatbotData.enabled) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-[#0A1A2F] rounded-2xl shadow-[0_0_50px_rgba(0,194,255,0.3)] border-2 border-[#00C2FF]/30 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Bot className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white">TechSonance Support</h3>
                    <p className="text-xs text-white/80">Online now</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-[#00C2FF]/5">
                {/* Messages */}
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.type === "bot" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex gap-2 ${msg.type === "user" ? "justify-end" : ""}`}
                  >
                    {msg.type === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#0A1A2F] flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`${
                        msg.type === "bot"
                          ? "bg-white dark:bg-[#0A1A2F]/50 border border-[#00C2FF]/20 rounded-2xl rounded-tl-none"
                          : "bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] rounded-2xl rounded-tr-none"
                      } p-3 max-w-[80%]`}
                    >
                      <p
                        className={`text-sm whitespace-pre-line ${
                          msg.type === "bot" ? "text-gray-800 dark:text-gray-200" : "text-white"
                        }`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Quick Reply Buttons - Only show if there are 2 or fewer messages */}
                {messages.length <= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2 pt-2"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-2">Quick replies:</p>
                    {chatbotData.quickReplies.map((reply, index) => (
                      <motion.button
                        key={reply.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        onClick={() => handleQuickReply(reply.text, reply.message)}
                        className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-[#00C2FF]/10 to-transparent border border-[#00C2FF]/20 hover:border-[#00C2FF]/50 hover:shadow-[0_0_20px_rgba(0,194,255,0.2)] transition-all duration-300 group"
                      >
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#00C2FF] transition-colors">
                          {reply.text}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#00C2FF]/20 bg-white dark:bg-[#0A1A2F]/80 backdrop-blur-sm">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#0A1A2F] border border-[#00C2FF]/20 focus:border-[#00C2FF] focus:outline-none focus:ring-2 focus:ring-[#00C2FF]/20 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] text-white rounded-xl px-4 hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Powered by WhatsApp
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] shadow-[0_0_30px_rgba(0,194,255,0.5)] hover:shadow-[0_0_40px_rgba(0,194,255,0.7)] transition-all duration-300 flex items-center justify-center group"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-[#00C2FF] opacity-75 animate-ping" />
          
          {/* Icon */}
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white relative z-10" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white relative z-10" />
            )}
          </motion.div>

          {/* Notification Badge */}
          {!isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
            >
              1
            </motion.span>
          )}
        </motion.button>
      </div>
    </>
  );
}