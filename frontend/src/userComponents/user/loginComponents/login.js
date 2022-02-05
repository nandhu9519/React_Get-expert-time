import React, {useState, useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@mui/material/Alert";
import Header from "../../Header";
import {Card} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

// import GoogleButton from "react-google-button";

import axios from "axios";
import loginValidation from "./loginValidation";
import LoginWithGoogle from "./loginWithGoogle";
const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function Login() {
    const classes = useStyles();
    const initialState = {
        email: "",
        password: ""
    };
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [dataCorrect, setDataCorrect] = useState(false);
    const [loginError, setLoginError] = useState(false);
    // const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
        console.log(values);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(loginValidation(values));
        setDataCorrect(true);
    };

    useEffect(async () => {
        if (Object.keys(errors).length === 0 && dataCorrect) {
            try{
                let response = await axios.post("http://localhost:5000/users/api/login", values); 
                if(response){
                    localStorage.setItem('userInfo', JSON.stringify(response.data))
                    navigate('/')
                }
            }
            catch(error){
                setLoginError(error.response.data.message)
                console.log(error.response.data.message);
            }
            
        }
    }, [errors]);

    return (
        <>
            <Header/>
            <div className="body">
                <Container component="main" maxWidth="sm">
                    <Card body className="">
                        <CssBaseline/>
                        <div className={
                            classes.paper
                        }>
                            <Avatar className={
                                classes.avatar
                            }>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <br/>
                            <div className="googleSignup">
                               <LoginWithGoogle />
                            </div>
                            <br></br>

                            <div className="">
                                <p style={
                                    {
                                        fontWeight: "bold",
                                        fontSize: "large"
                                    }
                                }>OR</p>
                            </div>

                            <form className={
                                    classes.form
                                }
                                onSubmit={handleSubmit}>
                                <Grid container
                                    spacing={2}>
                                    <Grid item
                                        xs={12}
                                        sm={6}></Grid>
                                    <Grid item
                                        xs={12}
                                        sm={6}></Grid>
                                    <Grid item
                                        xs={12}>
                                        <TextField variant="outlined"
                                            value={
                                                values.email
                                            }
                                            onChange={handleChange}
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"/> {
                                        errors.email && <p className="errors">
                                            {
                                            errors.email
                                        }</p>
                                    } </Grid>
                                    <Grid item
                                        xs={12}>
                                        <TextField variant="outlined"
                                            value={
                                                values.password
                                            }
                                            onChange={handleChange}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"/> {
                                        errors.password && (
                                            <p className="errors">
                                                {
                                                errors.password
                                            }</p>
                                        )
                                    } </Grid>
                                    <Grid item
                                        xs={12}></Grid>
                                </Grid>
                                <br/> {
                                loginError && (
                                    <Alert severity="error">{loginError}</Alert>
                                )
                            }

                                <Button type="submit" fullWidth variant="contained" color="primary"
                                    className={
                                        classes.submit
                                }>
                                    Sign In
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        Dont have an account?
                                        <Link href="/" variant="body2" className="logInLink">
                                            &nbsp;Sign up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}></Box>
                    </Card>
                </Container>
            </div>
        </>
    );
}
