import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = (props: { name: string, setName: (name: string) => void }) => {
    const logout = () => {
        fetch('http://localhost:7229/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        props.setName('');
    }

    let menu;
    let count = 0;

    if (props.name === '' ) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } 
    else
    if ( props.name != '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    Hello {props.name}
                </li>
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <div className="body-map">
                    <span className="mappy">Mappy</span>
                    <Link to="/" className="navbar-brand">Home</Link>
                    <Link to="/history" className="navbar-brand">History</Link>
                </div>
                <div className="auth">
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Header;