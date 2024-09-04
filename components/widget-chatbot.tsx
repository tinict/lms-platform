'use client';

import Chatbot from "react-chatbot-kit";
import config from '@/configs/chat-next-ui';
import MessageParser from "@/components/message-parser";
import ActionProvider from "@/components/action-provider";
import 'react-chatbot-kit/build/main.css';
import { TbMessageChatbot } from "react-icons/tb";
import { useState } from "react";

export const WidgetChatBot = () => {
    const [showBot, setShowBot] = useState(false);

    return (
        <>
            <div className="fixed right-0 bottom-[100px] z-10 right-10">
                {showBot && (
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                )}
            </div>
            <div className="fixed right-0 bottom-10 z-10 right-10">
                <button
                    className="app-chatbot-button"
                    onClick={() => {
                        setShowBot((prev) => !prev);
                    }}
                >
                    <TbMessageChatbot className="w-[36px] h-[36px]" />
                    <span>I am Bot</span>
                </button>
            </div>
        </>
    );
};
