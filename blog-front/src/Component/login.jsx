import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBContainer,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { Component } from 'react';
import CheckButton from "react-validation/build/button";
import authService from '../services/auth.service';
import { withRouter } from '../common/with-router';
import Form from "react-validation/build/form";
import AuthService from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/login.css';
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            authService.login(this.state.username, this.state.password).then(
                () => {
                    const user = AuthService.getCurrentUser();
                    if (user.roles.includes("ROLE_ADMIN")) {
                        this.props.router.navigate("/listpost");
                    } else {
                        this.props.router.navigate("/listpost");
                    }

                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        return (
            <MDBContainer fluid style={{marginTop: "10%"}}   >
                <MDBRow>
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
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
                                }} />
                        </div>

                    </MDBCol>
                    <MDBCol md='5'>

                        <MDBCard className='my-6'  style={{border: 'none' , marginRight:'25%'}}>
                            <MDBCardBody className='p-5'>
                                <Form onSubmit={this.handleLogin}
                                    ref={(c) => {
                                        this.form = c;
                                    }}>
                                    <h2 id="login">Login</h2>
                                    <div className='mb-4'>
                                        <label htmlFor='form2Example1' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='text'
                                            id='form2Example1'
                                            placeholder='Enter your username'
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required]}
                                            required
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='form2Example1' className='form-label'>

                                        </label>
                                        <MDBInput
                                            type='password'
                                            id='form2Example1'
                                            placeholder='Enter your password'
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required]}
                                            required
                                            style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                        />
                                    </div>

                                    <MDBRow className='mb-4'>
                                        <MDBCol className='d-flex justify-content-center'>
                                            <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                                        </MDBCol>
                                        <MDBCol>
                                            <a href='#!'>Forgot password?</a>
                                        </MDBCol>
                                    </MDBRow>

                                    <button type='submit' className='mb-4 btn btn-info custom-button ' block disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )} Sign in
                                    </button>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
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
                                            Not a member? <a href='/register'>Register</a>
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
export default withRouter(Login);