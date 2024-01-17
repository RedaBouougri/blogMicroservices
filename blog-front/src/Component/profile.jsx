import React, { useState, useEffect } from "react";
import '../css/profile.css';
import axios from "axios";
import profileImg from '../images/profile.png';
import { useNavigate } from "react-router-dom";

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBIcon,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import authService from '../services/auth.service';

export default function PersonalProfile() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true); // New state variable

    const user = authService.getCurrentUser();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const user = authService.getCurrentUser();
        console.log(user.username)

        setUsername(user.username);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setOldPassword("");
        setNewPassword("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.error("Passwords do not match");
            setPasswordsMatch(false);
            return;
        }

        const user = authService.getCurrentUser();

        axios
            .put(`http://localhost:8060/api/auth/updateprofile/${user.username}`, {
                username: username,
                firstName: firstName,
                lastName: lastName,
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
            .then((response) => {
                navigate("/");
                authService.logout();
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    const vfirstName = value => {
        if (value.length < 3 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The firstName must be between 3 and 20 characters.
                </div>
            );
        }
    };

    const vnewPassword = value => {
        if (value.length < 6 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The newPassword must be between 6 and 20 characters.
                </div>
            );
        }
    };

    return (
        <section className="vh-100 " style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="" style={{ marginTop: "0%" }}>
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="8" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol
                                    md="4"
                                    className="gradient-custom text-center text-white"
                                    style={{
                                        borderTopLeftRadius: '.5rem',
                                        borderBottomLeftRadius: '.5rem',
                                    }}
                                >
                                    <MDBCardImage src={profileImg}
                                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    <MDBTypography style={{ color: "black" }} tag="h5">{user.firstName + " " + user.lastName}</MDBTypography>
                                    <MDBCardText></MDBCardText>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <form onSubmit={handleSubmit}>
                                            <MDBTypography tag="h6">Update Profile</MDBTypography>
                                            <hr className="mt-0 mb-4" />

                                            <MDBInput
                                                type="text"
                                                placeholder="firstName"
                                                value={firstName}
                                                required
                                                onChange={(event) => setFirstName(event.target.value)}
                                                validations={[vfirstName]}
                                                style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                            />
                                            <br />
                                            <MDBInput
                                                type="text"
                                                placeholder="lastName"
                                                value={lastName}
                                                required
                                                onChange={(event) => setLastName(event.target.value)}
                                                validations={[vfirstName]}
                                                style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                            />
                                            <br />
                                            <MDBInput
                                                type="text"
                                                placeholder="username"
                                                value={username}
                                                required
                                                onChange={(event) => setUsername(event.target.value)}
                                                validations={[vfirstName]}
                                                style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                            />
                                            <br />
                                            <MDBInput
                                                type="password"
                                                placeholder="oldPassword"
                                                value={oldPassword}
                                                required
                                                onChange={(event) => setOldPassword(event.target.value)}
                                                style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                            />
                                            <br />
                                            <MDBInput
                                                type="password"
                                                placeholder="newPassword"
                                                value={newPassword}
                                                onChange={(event) => setNewPassword(event.target.value)}
                                                validations={[vnewPassword]}
                                                style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                            />
                                            <br />
                                            <MDBInput
                                                type="password"
                                                placeholder="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(event) => {
                                                    setConfirmPassword(event.target.value);
                                                    setPasswordsMatch(true); // Reset the error when the user types
                                                }}
                                                validations={[vnewPassword]}
                                                style={{ border: 'none', borderBottom: '4px solid #ad9492', borderRadius: '0' }}
                                            />
                                            {!passwordsMatch && (
                                                <div className="alert alert-danger" role="alert">
                                                    Passwords do not match.
                                                </div>
                                            )}
                                            <br />
                                            <MDBBtn color="primary" type="submit">
                                                Update Profile
                                            </MDBBtn>

                                        </form>

                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
