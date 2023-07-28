import React from "react";
import Message from '../../utils/types';
import styles from './MessageList.module.css';

interface MessageListProps {
    messages: Message[];
    currentUser: string | null;
    selectedUser: string | null;
}

const MessageList: React.FC<MessageListProps> = ({
    messages,
    currentUser,
    selectedUser,
}) => {
    return (
        <div className={styles.message__form}>
            <h2 className={styles.message__title}>Чат {currentUser} с {selectedUser}</h2>
            {currentUser && selectedUser ? (
                <ul className={styles.message__list}>
                    {messages.map((message, index) => (
                        <li key={index} className={styles.message__elem}>
                            <strong>{message.sender}: </strong>
                            {message.text}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Выберите пользователя для отображения сообщений</p>
            )}
        </div>
    );
};

export default MessageList;
