import React, { useState } from "react";
import styles from './LoginForm.module.css';

interface LoginFormProps {
    onLogin: (username: string) => void;
    users: string[];
    onAddUser: (user: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, users, onAddUser }) => {
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handleNewUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewUsername(event.target.value);
    };

    const handleLogin = () => {
        if (users.includes(username)) {
            onLogin(username);
        } else {
            alert("Выберите существующее имя пользователя");
        }
    };

    const handleAddUser = () => {
        if (newUsername.trim() !== "") {
            if (users.includes(newUsername)) {
                alert("Пользователь с таким именем уже существует");
            } else {
                onAddUser(newUsername.trim());
                setNewUsername("");
            }
        }
    };

    return (
        <div>
            <div className={styles.login__form}>
                <h2>Вход</h2>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Введите имя пользователя"
                    className={styles.login__input}
                />
                <button onClick={handleLogin}>Войти</button>
            </div>
            <div className={styles.login__form}>
                <h2>Добавить пользователя</h2>
                <input
                    type="text"
                    value={newUsername}
                    onChange={handleNewUsernameChange}
                    placeholder="Введите новое имя пользователя"
                    className={styles.login__input}
                />
                <button onClick={handleAddUser}>Добавить</button>
            </div>
        </div>
    );
};

export default LoginForm;
