"use client";

import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./ui/Button";

interface ChatInputProps {
    chatPartner: User;
    chatId: string;
    userId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatId, chatPartner, userId }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);
    const sendMessage = async () => {
        if (!input.trim()) return;
        textareaRef.current?.focus();
        setIsLoading(true);
        textareaRef.current?.focus();

        try {
            textareaRef.current?.focus();
            setInput("");
            await axios.post(`/api/message/send`, {
                text: input,
                chatId,
            });
            textareaRef.current?.focus();
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        // Notify the server that the user is typing
        axios.post(`/api/message/typing`, {
            chatId,
            userId,
        });
    };

    return (
        <div className="relative flex items-center px-3 py-2 border-t border-gray-300 bg-white bottom-0 w-full z-10">
            <div className="flex-grow mr-2">
                <TextareaAutosize
                    ref={textareaRef}
                    style={{ verticalAlign: "top", maxWidth: "100%" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    value={input}
                    onChange={handleInputChange}
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
