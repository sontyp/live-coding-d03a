import { NavLink, Outlet } from "react-router-dom";
import { AuthStoreProvider, useAuthStore } from "../hooks/useAuthStore";


export default function Layout() {

    return (
        <AuthStoreProvider>
            <div className="app">
                <Header />
                <main>
                    {/* Unteransichten bzw. Kindrouten */}
                    <Outlet />
                </main>
            </div>
        </AuthStoreProvider>
    );
}

function Header() {
    const { userData, isOnline } = useAuthStore();

    return (
        <header>
            <nav className="nav-container">
                <NavLink to="/">Home</NavLink>
                { !isOnline() && <NavLink to="/register">Sign Up</NavLink>}
                { !isOnline() && <NavLink to="/login">Sign In</NavLink> }
                { isOnline() && <NavLink to="/logout">Sign Out</NavLink> }
                <NavLink to='/users'>Users</NavLink>
            </nav>
            { isOnline() && <h3>Hallo, { userData.username }!</h3> }
            { isOnline() && <NavLink to={`/users/${userData.id}`}>My Data</NavLink> }
        </header>
    );
}