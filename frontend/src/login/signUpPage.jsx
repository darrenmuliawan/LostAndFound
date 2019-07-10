import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './signup.scss'
import { Modal, Header, Button} from 'semantic-ui-react'
import googleImg from './googleButton.png';


import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';



class signup extends Component {
    constructor() {
        super();

        this.state = {
        };
    }

    signIn = () => {
        console.log(document.getElementById("username").value);
        console.log(document.getElementById("password").value);
    }
    render() {
        return (
            <Modal open = { this.props.open } closeIcon onClose = { this.props.closeModal }>
                <Header content = "Sign Up"/>
                <Modal.Content scrolling>
                    <div className="signup-div">
                        <p className="signup"> Name: </p>
                        <input id="name" type="text" placeholder = "Enter your name"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Email: </p>
                        <input id="email" type="text" placeholder="Enter your email"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Phone Number: </p>
                        <input id="username" type="text" placeholder = "Enter your phone number"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Address: </p>
                        <input id="password" type="text" placeholder="Enter your address"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Username: </p>
                        <input id="username" type="text" placeholder = "Enter username"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Password: </p>
                        <input id="password" type="password" placeholder="Enter password"/>
                    </div>
                    <div className="signup-button">
                        <Button color="red" onClick={ this.props.closeModal }> Cancel </Button>
                        <Button color="green" onClick={ this.signIn }> Sign Up </Button>
                    </div>
                    <p className="signin-text" onClick={ this.props.openSignIn}> Already have an account? Sign in here! </p>
                </Modal.Content>
            </Modal>
        )
    }
}



export default signup;
