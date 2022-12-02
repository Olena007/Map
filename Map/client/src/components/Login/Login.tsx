// import { Copyright } from "@mui/icons-material";
// import { Typography, createTheme, Avatar, Box, Checkbox, CssBaseline, FormControlLabel, Grid, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import "react-bootstrap";
// import { Button, Container, ThemeProvider } from "react-bootstrap";
import {  Navigate } from "react-router-dom";
// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';



const theme = createTheme();


const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [role, setRole] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };



    const submit = async (e : SyntheticEvent) => {
        e.preventDefault();
        
        const responce = await fetch ('http://localhost:7229/api/login', {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept' : 'application/json'},
            credentials: 'include',
            body: JSON.stringify( {
                email,
                password
            })
        });

       
            const client = await fetch('http://localhost:7229/api/client', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
  
            const contentclient = await client.json();
  
            setRole(contentclient.clientRole);
     
 
       // console.log(responce);
        const content = await responce.json();

        props.setName(content.name);

        setRedirect(true);


    }

    if(redirect){

        if (role == "Admin"){
            return <Navigate to="/admin"/>;
        }
        else
        if (role == "User"){
            return <Navigate to="/"/>;
        }
        else
        if (role == "Manager"){
            return <Navigate to="/manager"/>
        }
        
    }
    
    return (

        // <div className="form-login">
        //     <form onSubmit={submit}>
        //         <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        //         <input type="email" className="form-control" placeholder="Email address" required 
        //         onChange={e => setEmail(e.target.value)}/>

        //         <input type="password" className="form-control" placeholder="Password" required 
        //         onChange={e => setPassword(e.target.value)}/>

        //         <Button className="w-100 btn btn-lg btn-primary" variant="success" type="submit">Sign in</Button>
                
        //     </form>
        // </div>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar className="lock" sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                    />
                    
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className="btn-signin"
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item>
                        <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
        
    );
}

export default Login; 