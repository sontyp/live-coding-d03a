// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Imports von benoetigten Paketen
import axios from 'axios';

// Import eigener Module
import { useAuthStore } from '../hooks/useAuthStore';



export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Hole Setterfunktion fuer global gespeicherte Userdaten aus Custom Hook fuer AuthStoreContext
    const { setUserData } = useAuthStore();

    // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
    useEffect(() => {
        validateForm();
    }, [username, password]);

    const handleSubmit = async evt => {
        evt.preventDefault();

        const reqBody = {
            username,
            password
        };

        try {
            const resp = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, reqBody, {
                withCredentials: true
            });
            
            // Speichere erhaltene Userdaten im globalen UserStore (Context)
            setUserData({
                id: resp.data.id,
                username: resp.data.username,
                role: resp.data.role
            });

            // Wenn im location State eine Ursprungsroute hinterlegt wurde, navigiere zurueck dahin
            if (location.state?.from) navigate(location.state.from);

        } catch (error) {
            console.error(error);
        }
    };

    const handleUsernameChange = evt => {
        setUsername(evt.target.value);
    };

    const handlePasswordChange = evt => {
        setPassword(evt.target.value);
    };

    // Hilfsfunktion zum Validieren der Felder und Aktivieren des Confirmbuttons
    const validateForm = () => {
        // Pruefe, ob alle Felder befuellt und Passwortfelder gleich
        const isValid = (username.length > 0) && (password.length > 0);
        setConfirmBtnActive(isValid);
    };

    return (
        <form className='login-form' onSubmit={handleSubmit} >
            <h2>Login</h2>

            <label>
                Username
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>

            <label>
                Password
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>

            <button type='submit' disabled={!isConfirmBtnActive}>Sign In!</button>


            {/* {
            confirmedUsername && <h3>Welcome {confirmedUsername}!</h3>
        } */}
        </form>
    );
};