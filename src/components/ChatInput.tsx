"use client"

import axios from "axios";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./ui/Button";

interface ChatInputProps {
    chatPartner: User;
    chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    const sendMessage = async () => {
        if (!input.trim()) return; // Prevent sending empty messages
        setIsLoading(true);

        try {
            // Simulate sending message with a delay (remove this in production)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Message sent successfully.");
            setInput(""); // Clear input after sending
            textareaRef.current?.focus();
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center px-3 py-2 border-t border-gray-300 bg-white bottom-0 w-full z-10">
            <div className="flex-grow mr-2">
                <TextareaAutosize
                    ref={textareaRef}
                    style={{ verticalAlign: "top",maxWidth: "100%"}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Type a message`}
                    className="w-full h-10 px-3 py-2 text-sm border border-gray-400 rounded-lg outline-none resize-none"
                />
            </div>
            <div className="flex-shrink-0">
                <Button
                    isLoading={isLoading}
                    onClick={sendMessage}
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {isLoading ? "" : "Send"}
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;