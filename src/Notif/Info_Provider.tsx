import React, { createContext, useContext, useState, useEffect } from 'react';



interface Message {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    icon: string; 
}


interface MessageContextType {
    showMessage: (type: 'success' | 'error' | 'info' | 'warning', icon: string, message: string) => void;
    messageQueue: Message[];
}


const MessageContext = createContext<MessageContextType | undefined>(undefined);


export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messageQueue, setMessageQueue] = useState<Message[]>([]);

    const showMessage = (type: 'success' | 'error' | 'info' | 'warning', icon: string, message: string) => {
   
        const newMessage: Message = { type, message, icon }; 
        setMessageQueue((prev) => [...prev, newMessage]); 
        setTimeout(() => {
            setMessageQueue((prev) => prev.slice(1)); 
        }, 7000);
    };

    return (
        <MessageContext.Provider value={{ showMessage, messageQueue }}>
            {children} 
        </MessageContext.Provider>
    );
};

// Hook untuk menggunakan MessageContext
export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessage must be used within a MessageProvider");
    }
    return context;
};