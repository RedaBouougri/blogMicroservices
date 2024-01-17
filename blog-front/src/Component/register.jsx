import React, { Component, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import Form from "react-validation/build/form";

import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service"

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vfirstName = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vlastName = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        //this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            successful: false,
            message: ""
        };
    }



    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        // Check if there are no validation errors
        if (this.checkBtn.context._errors.length === 0) {
            // Check if the password matches the confirmPassword
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({
                    successful: false,
                    message: "Passwords do not match."
                });
                return; // Stop the registration process if passwords do not match
            }

            // If passwords match, proceed with registration
            AuthService.register(
                this.state.username,
                this.state.firstName,
                this.state.lastName,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }


    render() {
        return (
            <MDBContainer fluid className='p-10'>
                <MDBRow>
                    <MDBCol md='7' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <div className="image-container">
                            <img
                                src={require('../images/login2.jpg')}
                                alt="Image"
                                className="top-image"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    WebkitClipPath: 'polygon(0% 0%, 0% 500%, 50% 0%,50% 0%)',
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                }} 
                            />
                        </div>
                    </MDBCol>
                    <MDBCol md='5'>
                        <MDBCard className='my-5' style={{border: 'none' , marginRight:'25%'}}>
                            <MDBCardBody className='p-5'>
                                <Form
                                    onSubmit={this.handleRegister}
                                    ref={(c) => {
                                        this.form = c;
                                    }}
                                >
                                    <h2>Register</h2>
                                    <div className='mb-4'>
                                        <label htmlFor='form2Example1' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='text'
                                            id='form2Example1'
                                            placeholder='First Name'
                                            value={this.state.firstName}
                                            onChange={this.onChangeFirstName}
                                            required
                                            validations={[required, vfirstName]}
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='form2Example2' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='text'
                                            id='form2Example2'
                                            placeholder='Last Name'
                                            value={this.state.lastName}
                                            onChange={this.onChangeLastName}
                                            required
                                            validations={[required, vlastName]}
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='form2Example3' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='text'
                                            id='form2Example3'
                                            placeholder='Username'
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            required
                                            validations={[required, vusername]}
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>
                                   
                                    <div className='mb-4'>
                                        <label htmlFor='form2Example4' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='password'
                                            id='form2Example4'
                                            placeholder='Enter your password'
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            required
                                            validations={[required, vpassword]}
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='form2Example5' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='password'
                                            id='form2Example5'
                                            placeholder='Confirm your password'
                                            value={this.state.confirmPassword}
                                            onChange={this.onChangeConfirmPassword}
                                            required
                                            validations={[required, vpassword]}
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='mb-4 btn btn-info custom-button '
                                        block
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm "></span>
                                        )}{' '}
                                        Sign up
                                    </button>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div
                                                className={
                                                    this.state.successful
                                                        ? "alert alert-success"
                                                        : "alert alert-danger"
                                                }
                                                role="alert"
                                            >
                                                {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={(c) => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                    <div className='text-center'>
                                        <p>
                                            Login page <a href='/'>Login</a>
                                        </p>
                                    </div>
                                </Form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        );
    }
}

