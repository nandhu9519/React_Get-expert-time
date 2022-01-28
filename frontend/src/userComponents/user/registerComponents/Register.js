import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../../Header";
import { Card } from "react-bootstrap";
import "./register.css";
import GoogleButton from "react-google-button";
import validation from "./validation";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';


const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [dataCorrect, setDataCorrect] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(values));
    setDataCorrect(true);
  };

  useEffect(async () => {
    if (Object.keys(errors).length === 0 && dataCorrect) {
      let response = await axios.post(
        "http://localhost:5000/users/api/register",
        values
      );
      console.log("response", response);
      if (response.data.status == false) {
        setSignupError(true);
      } else {
        setSignupSuccess(true);
      }
    }
  }, [errors]);

  return (
    <>
      <Header />
      <div className="body">
        <Container component="main" maxWidth="sm">
          <Card body className="">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <br />
              <div className="googleSignup">
                <GoogleButton
                  onClick={() => {
                    console.log("Google button clicked");
                  }}
                />
              </div>
              <br></br>
              <div className="row">
                {/* <div className='col-md-5'>
                                <hr></hr>
                            </div> */}
                <div className="">
                  <p style={{ fontWeight: "bold", fontSize: "large" }}>OR</p>
                </div>
                {/* <div className='col-md-5'>
                                <hr></hr>
                            </div> */}
              </div>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      value={values.firstName}
                      onChange={handleChange}
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                    {errors.firstName && (
                      <p className="errors">{errors.firstName}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      value={values.lastName}
                      onChange={handleChange}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                    {errors.lastName && (
                      <p className="errors">{errors.lastName}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    {errors.email && <p className="errors">{errors.email}</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <p className="errors">{errors.password}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {errors.confirmPassword && (
                      <p className="errors">{errors.confirmPassword}</p>
                    )}
                  </Grid>
                </Grid>
                <br />
                {signupError && (
                  <Alert severity="error">User already exist</Alert>
                )}
                {signupSuccess && (
                  <Alert severity="success">
                    <AlertTitle>Sign up Successful</AlertTitle>
                    Please verify your email — <strong>to login!</strong>
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    Already have an account?
                    <Link href="/" variant="body2" className="logInLink">
                      &nbsp;Sign in
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
