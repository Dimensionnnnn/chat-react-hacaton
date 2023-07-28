import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import Message from './utils/types';
import styles from './App.module.css';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string>('');

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', users);
  }, [users]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setSelectedUser(null);
    setMessages([]);

    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(storedMessages);
  };

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (message: string) => {
    if (message === '') return;

    const newMessage: Message = {
      sender: currentUser!,
      receiver: selectedUser!,
      text: message,
    };
    setMessages([...messages, newMessage]);

    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const updatedMessages = [...storedMessages, newMessage];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const handleAddUser = (user: string) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers ? `${prevUsers},${user}` : user;
      localStorage.setItem('users', newUsers);
      return newUsers;
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedUser(null);
  };

  return (
    <div className={styles.main__form}>
      <h1>Web Chat</h1>
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} users={users.split(',')} onAddUser={handleAddUser} />
      ) : (
        <>
          <UserList
            users={users.split(',')}
            onSelect={handleUserSelect}
            selectedUser={selectedUser}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <MessageList
            messages={messages.filter(
              (message) =>
                (message.sender === currentUser && message.receiver === selectedUser) ||
                (message.sender === selectedUser && message.receiver === currentUser)
            )}
            currentUser={currentUser}
            selectedUser={selectedUser}
          />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default App;