import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import axios from "axios";


export default function LogoutScreen() {
    const { isOnline, clearUserData } = useAuthStore();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
            withCredentials: true
        })
            .then(resp => {
                clearUserData();
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {!isOnline() && <h3>You have been successfully logged out!</h3>}
        </>
    );
}