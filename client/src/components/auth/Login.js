import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBModalFooter
} from "mdbreact";
import { Link } from "react-router-dom";

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }

        if (error === "Invalid Credentials") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if ((email === "") | (password === "")) {
            setAlert("Please fill in all fields", "danger");
        } else {
            login({
                email,
                password
            });
        }
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody className="mx-4">
                            <div className="text-center" onSubmit={onSubmit}>
                                <h3 className="dark-grey-text mb-5 mt-4 font-weight-bold">
                                    <strong>SIGN</strong>
                                    <a
                                        href="#!"
                                        className="blue-text font-weight-bold"
                                    >
                                        <strong> IN</strong>
                                    </a>
                                </h3>
                            </div>
                            <form onSubmit={onSubmit}>
                                <MDBInput
                                    label="Your email"
                                    type="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <MDBInput
                                    label="Your password"
                                    type="password"
                                    value={password}
                                    onChange={onChange}
                                    containerClass="mb-0"
                                    required
                                    minLength="6"
                                />
                                <div className="text-center mb-3">
                                    <MDBBtn
                                        type="submit"
                                        gradient="blue"
                                        value="Login"
                                        rounded
                                        className="btn-block z-depth-1a"
                                    >
                                        Create Account
                                    </MDBBtn>
                                </div>
                                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                                    or Sign in with:
                                </p>
                                <div className="row my-3 d-flex justify-content-center">
                                    <MDBBtn
                                        type="button"
                                        color="white"
                                        rounded
                                        className="z-depth-1a"
                                    >
                                        <MDBIcon
                                            fab
                                            icon="facebook-f"
                                            className="blue-text text-center"
                                        />
                                    </MDBBtn>
                                    <MDBBtn
                                        type="button"
                                        color="white"
                                        rounded
                                        className="mr-md-3 z-depth-1a"
                                    >
                                        <MDBIcon
                                            fab
                                            icon="twitter"
                                            className="blue-text"
                                        />
                                    </MDBBtn>
                                    <MDBBtn
                                        type="button"
                                        color="white"
                                        rounded
                                        className="z-depth-1a"
                                    >
                                        <MDBIcon
                                            fab
                                            icon="google-plus-g"
                                            className="blue-text"
                                        />
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">
                                Dont have an account yet?
                                <Link to="/register" className="blue-text ml-1">
                                    Sign Up
                                </Link>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
