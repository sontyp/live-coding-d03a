import axios from "axios";
import { useEffect, useState } from "react";


export default function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // TODO use pagination when implemented
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
            withCredentials: true
        })
            .then(resp => {
                setUsers(resp.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    const userRows = users.map(user => {
        return (
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
            </tr>
        );
    });

    return (
        <>
            <h2>All Users</h2>
            {
                (users.length > 0)
                ? (
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Role</th>
                        </thead>
                        <tbody>
                            {userRows}
                        </tbody>
                    </table>
                )
                : <h3>No Users found!</h3>
            }
        </>
    );
}