import './App.css';
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import History from './components/History/History';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Manager from './components/Manager/Manager';

function App() {
  const [name, setName] = useState('');
  useEffect(() => {
    (
        async () => {
            const response = await fetch('http://localhost:7229/api/client', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            const content = await response.json();

            setName(content.email);
        }
    )();
});

  return (
    <div className="App">
      {/* <Header name={name} setName={setName}/> */}
         <Routes>
            <Route path="/" element={<Home name = {name} />}></Route>

            <Route path="history" element={<History />}></Route>
            <Route path="login" element={<Login setName={setName}/>}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="admin" element={<Admin />}></Route>
            <Route path="manager" element={<Manager />}></Route>
            <Route path="*" element={<NoMatchComponent />} />
          </Routes>
    </div>
  );
}

const NoMatchComponent = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
