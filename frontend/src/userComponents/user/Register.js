import React from 'react';
import './register.css';
import Header from '../Header';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn
} from 'mdbreact';
import GoogleButton from 'react-google-button'


function Register() {
    return (
        <>
            <Header/>
            <div className='body'>
                <MDBContainer className='container'>

                    <MDBCol md="6">
                        <MDBCard class="card">
                            <MDBCardBody>
                                <p className="h4 text-center py-4 register">REGISTER</p>
                                <div className='googleSignup'>
                                    <GoogleButton onClick={
                                        () => {
                                            console.log('Google button clicked')
                                        }
                                    }/>
                                </div>
                            <br></br>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <hr></hr>
                                </div>
                                <div className='col-md-2 or'>
                                    <p>OR</p>
                                </div>
                                <div className='col-md-5'>
                                    <hr></hr>
                                </div>
                            </div>
                            <form>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <MDBInput label="First Name" group type="text" validate error="wrong" success="right"/>
                                    </div>
                                    <div className='col-md-6'>
                                        <MDBInput label="Last Name" group type="text" validate error="wrong" success="right"/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <MDBInput label="Contact" group type="number" validate error="wrong" success="right"/>
                                    </div>
                                    <div className='col-md-6'>
                                        <MDBInput label="Email" group type="email" validate error="wrong" success="right"/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <MDBInput label="Password" group type="password" validate containerClass="mb-0"/>
                                    </div>
                                    <div className='col-md-6'>
                                        <MDBInput label="Renter password" group type="password" validate containerClass="mb-0"/>
                                    </div>
                                </div>


                                <p className='font-large dark-text d-flex justify-content-center'>
                                    Have an account?
                                    <a className='blue-text  font-weight-bold'>
                                    &nbsp; Log in
                                    </a>
                                </p>
                                <div className="text-center py-4 mt-3">
                                    <MDBBtn color="cyan" type="submit">
                                        Register
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBContainer>
        </div>
    </>
    );
}

export default Register;
