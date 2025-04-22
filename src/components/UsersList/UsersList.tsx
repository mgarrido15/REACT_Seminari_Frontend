import React, { useState } from "react";
import { User } from "../../types";
import styles from "./UsersList.module.css";
import UpdateUser from "../UpdateUser/UpdateUser"; 

interface Props {
    users: User[];
    onUpdateUser: (updatedUser: User) => void; 
}

const UsersList: React.FC<Props> = ({ users, onUpdateUser }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserClick = (user: User) => {
        console.log("User clicked:", user);
        setSelectedUser(user); 
    };

    const handleUpdate = (updatedUser: User) => {
        console.log("Updated user:", updatedUser);
        onUpdateUser(updatedUser); 
        setSelectedUser(null); 
    };

    const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li key={user.name} className={styles.listItem}>
                <div
                    className={styles.userInfo}
                    onClick={() => handleUserClick(user)} 
                >
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                </div>
            </li>
        ));
    };

    return (
        <div>
            <ul className={styles.list}>{renderList()}</ul>
            {selectedUser && (
                <UpdateUser
                    user={{
                        _id: selectedUser._id, 
                        name: selectedUser.name,
                        age: selectedUser.age,
                        email: selectedUser.email,
                        phone: selectedUser.phone
                    }}
                    onUpdate={handleUpdate}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default UsersList;