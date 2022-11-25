import React from "react";
import { Link } from "react-router-dom";
import './AdminHeader.css';

export default function AdminHeader(props: { name: string, setName: (name: string) => void }){
    const logout = () => {
        fetch('http://localhost:7229/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
    }

    //console.log("the name inside is " + props.name);
    return (
        <nav className="header">
            {/* <div className="container-fluid"> */}
                <div className="body-map">
                    <span className="mappy">Mappy</span>
                    
                    {/* <Link to="" className="navbar-brand">Home {props.name}</Link>
                    <Link to="/history" className="navbar-brand">History</Link> */}
                </div>
                <div className="body-auth">
                    <Link to="" className="nav-link">{props.name}</Link>
                    <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                    {/* <div className="name">
                            <Link to="" className="nav-link">{props.name}</Link>
                    </div>
                    <div className="auth">
                        <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                    </div> */}
                </div>
                
            {/* </div> */}
        </nav>
    );
}