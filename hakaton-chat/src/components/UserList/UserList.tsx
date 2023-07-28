import React from "react";
import styles from './UserList.module.css';

interface UserListProps {
    users: string[];
    onSelect: (user: string) => void;
    selectedUser: string | null;
    currentUser: string | null;
    onLogout: () => void; 
}

const UserList: React.FC<UserListProps> = ({
    users,
    onSelect,
    selectedUser,
    currentUser,
    onLogout,
}) => {
    const filteredUsers = users.filter((user) => user !== currentUser);

    return (
        <div className={styles.list__form}>
            <h2>Пользователи</h2>
            <ul>
                {filteredUsers.map((user) => (
                    <li
                        key={user}
                        className={selectedUser === user ? styles.selected : styles.user}
                        onClick={() => onSelect(user)}
                    >
                        {user}
                    </li>
                ))}
            </ul>
            {currentUser && (
                <button onClick={onLogout} className={styles.logout__button}>Выйти</button>
            )}
        </div>
    );
};

export default UserList;
