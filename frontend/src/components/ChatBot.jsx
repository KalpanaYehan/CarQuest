import React, { useState, useEffect } from 'react';
import chatbot from '../assets/chatbot.avif'
const ChatBot = () => {

    const chatbotId = "5vGyC6en-j1dhhyJcVyq1"
    const [chatBubbleVisible, setChatBubbleVisible] = useState(false);

    const handleChatBubbleClick = () => setChatBubbleVisible(!chatBubbleVisible);

    useEffect(() => {
        window.addEventListener('chatbase:chatbubble:click', handleChatBubbleClick);

        return () => window.removeEventListener('chatbase:chatbubble:click', handleChatBubbleClick);
    }, [chatbotId]);

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <button className='text-white bg-primary px-3 py-2 font-semibold rounded-full'
                onClick={handleChatBubbleClick}
            >
                <img src={chatbot} alt='chatbot' className='rounded-full w-14 h-14'></img>
            </button>
            {chatBubbleVisible && (
                <iframe
                    src={`https://www.chatbase.co/chatbot-iframe/${chatbotId}`}
                    style={{  width: '350px', height: '400px', position: 'absolute', bottom: '50px', right: '20px', border: 'none' }}
                    title="Chatbot"
                />
            )}
        </div>
    );
};

export default ChatBot;