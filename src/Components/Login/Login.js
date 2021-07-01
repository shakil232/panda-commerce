import React, { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
        success: false
    });

    // Google-SignIn-&-SignOut
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    const GoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const SignInUserAbout = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true
                }
                setUser(SignInUserAbout)
                // console.log(displayName, email, photoURL)
            })
            .catch(err => {
                const errorMessage = err.message;
                const email = err.email;
                // console.log(errorMessage, email)
            });
    };

    // Fb-SignIn-Area
    const FbSignIn = () => {
        const FbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(FbProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const SignInUserAbout = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true
                }
                setUser(SignInUserAbout)
                // console.log(displayName, email, photoURL)
            })
            .catch(err => {
                const errorMessage = err.message;
                const email = err.email;
                // console.log(errorMessage, email)
            });

    }


    // const SignOut = () => {
    //     firebase.auth().signOut()
    //         .then(res => {
    //             const SignOutUserAbout = {
    //                 isSignIn: false,
    //                 name: "",
    //                 email: "",
    //                 photo: "",
    //                 success: false
    //             }
    //             setUser(SignOutUserAbout)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });
    // }

    // Email-&-Password-Login-Area
    const EmailPasswordHandler = (e) => {
        // console.log(e.target.value, e.target.name)

        let IsFiledValid = true;

        if (e.target.name === "email") {
            IsFiledValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordNumberValid = /\d{1}/.test(e.target.value);
            IsFiledValid = isPasswordValid && isPasswordNumberValid;
        }
        if (IsFiledValid) {
            const NewUserInfo = { ...user };
            NewUserInfo[e.target.name] = e.target.value;
            setUser(NewUserInfo);
        }
    }
    // Form-Submit-AREA
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const NewUserInfo = { ...user };
                    NewUserInfo.success = true;
                    NewUserInfo.error = '';
                    setUser(NewUserInfo)
                    UpdateUserInfo(user.name)
                    console.log(NewUserInfo)
                })
                .catch(err => {
                    const NewUserInfo = { ...user };
                    NewUserInfo.success = false;
                    NewUserInfo.error = err.message;
                    setUser(NewUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const NewUserInfo = { ...user };
                    NewUserInfo.success = true;
                    NewUserInfo.error = '';
                    setUser(NewUserInfo)
                    console.log('updated', res.user)
                })
                .catch(err => {
                    const NewUserInfo = { ...user };
                    NewUserInfo.success = false;
                    NewUserInfo.error = err.message;
                    setUser(NewUserInfo)
                });
        }
        e.preventDefault()
    };

    const UpdateUserInfo = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,

        })
            .then(() => {
                console.log('successfully')
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <section className="container">

            <div className=" mt-2">
                <Link className="fs-5  text-decoration-none" to="/home">
                    <FontAwesomeIcon icon={faHome} />
                Home</Link>
            </div>

            {/* Display-success-error-AREA */}
            <div className="col-md-6  mt-2 pt-2 error-div text-center">
                <div>
                    <small className="text-danger ">{user.error}</small>
                    {user.success && <small className="text-success  ">User {newUser ? 'Created ' : 'Login'} Successfully...</small>}
                </div>

                {user.isSignIn &&
                    <div>
                        <p className="mt-1 text-primary">Welcome: {user.name}</p>

                        <p className="text-success">Yore Email: {user.email}</p>
                        {/* <img src={user.Photo} alt="" /> */}
                    </div>

                }


            </div>

            {/* Sign-In-Area */}
            {newUser ?
                // Create-Account-area
                <div className="col-md-6  mt-3 pt-3 login-from text-center">

                    <h3 className="text-primary mb-3">Create an account</h3>
                    <form className="login-inputs " onSubmit={handleSubmit}>

                        <div>
                            <input className="input-all form-control" onBlur={EmailPasswordHandler} type="text" name="name" placeholder="Your Name" required />

                        </div>
                        <br />

                        <div>
                            <input className="input-all form-control" onBlur={EmailPasswordHandler} type="email" name="email" placeholder="Your Email" required />

                        </div>
                        <br />

                        <div>
                            <input className="input-all form-control" onBlur={EmailPasswordHandler} type="password" name="password" placeholder="Your Password" required />

                        </div>
                        <br />

                        <div>
                            <input className="Create-btn" type="submit" value=" Create an account" />
                        </div>

                        <div>
                            <p><small id="account"> Already have an account?</small> <small id="login" onClick={() => setNewUser(false)}  >Login</small>  </p>
                        </div>

                        {/* <div>
                <small className="text-danger pb-2 mt-2">{user.error}</small>
                {user.success && <small className="text-success pb-2 mt-1">User Created Successfully...</small>}
                 </div> */}

                    </form>

                </div> :

                <div className="col-md-6  mt-3 pt-3 login-from text-center">

                    <h3 className="text-primary mb-3">Login</h3>
                    <form className="login-inputs " onSubmit={handleSubmit}>

                        <div>
                            <input className="input-all form-control" onBlur={EmailPasswordHandler} type="email" name="email" placeholder="Your Email" required />

                        </div>
                        <br />

                        <div>
                            <input className="input-all form-control" onBlur={EmailPasswordHandler} type="password" name="password" placeholder="Your Password" required />

                        </div>
                        <br />

                        <div className="d-flex justify-content-around pb-1 ">
                            <div>
                                <input type="checkbox" name="remember" id="Remember" />
                                <label className="ml-2 text-primary" htmlFor="checkbox">Remember Me</label>
                            </div>

                            <div>
                                <small><a href="x" className="text-danger "> Forgot Password</a></small>
                            </div>
                        </div>

                        <div>
                            <input className="login-button" type="submit" value="Login" />
                        </div>

                        <div>
                            <p><small id="account"> Don't have an account?</small>
                                <small id="login" onClick={() => setNewUser(true)}  > Create an account </small></p>
                        </div>

                    </form>
                </div>}


            {/* Google Login Area */}
            <div className="container col-md-6 col-sm-2 text-center mt-1 pt-1">
                {/* {user.isSignIn ?
                    <button className="bg-danger text-white shadow-lg " onClick={SignOut} > Goggle sign-out  </button> :

                    <button className="bg-success text-black shadow-lg " onClick={GoogleSignIn} > Goggle sign-in  </button>
                } */}
                <h2>Or</h2>

                <button className="continue  " onClick={GoogleSignIn} > Continue with Goggle  </button>
                <br />
                <button className="continue mt-2  " onClick={FbSignIn} > Continue with Facebook </button>

            </div>

        </section>
    );
};

export default Login;