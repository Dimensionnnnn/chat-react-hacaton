import React, { useState } from "react";
import styles from './MessageInput.module.css';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.message__form}>
            <label className={styles.message__label}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.message__input}
                    placeholder="Введите сообщение"
                />
            </label>
            <button type="submit" className={styles.message__button}>Отправить</button>
        </form>
    );
};

export default MessageInput;
