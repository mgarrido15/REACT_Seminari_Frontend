import React, { useState } from "react";
import { User } from "../../types";
import { updateUser } from "../../services/usersService"; 
import styles from "./UpdateUser.module.css";

interface Props {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onClose: () => void;
}

const UpdateUser: React.FC<Props> = ({ user, onUpdate, onClose }) => {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || 0);
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {

            const updatedUser = await updateUser(user._id, {name, age, email, phone });
            onUpdate(updatedUser);
            onClose(); 
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2>Update User</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Age:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Phone:
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(Number(e.target.value))}
                            className={styles.input}
                        />
                    </label>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`${styles.button} ${styles.cancelButton}`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;