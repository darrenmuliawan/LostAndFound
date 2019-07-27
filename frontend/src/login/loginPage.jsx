import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import './login.scss'
import { Modal, Header, Button, Message} from 'semantic-ui-react'
import googleImg from './googleButton.png';
import axios from 'axios';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';



class Login extends Component {
    constructor() {
        super();

        this.state = {
            wrong: false,
        };
    }

    signIn = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        //console.log(document.getElementById("username").value);
        //console.log(document.getElementById("password").value);
        axios.get('http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/users/?where={"username":"' + username + '"}').then(res => {
            //console.log(res);
            let user = {};
            if (res.data.message === "User not found!") {
                return this.setState({ wrong: true })
            } else if (res.data.data[0].password === password) {
                this.setState({
                    wrong: false,
                })
                console.log('Login successful!');
                user = res.data.data[0];
                console.log(user);
            } else {
                return this.setState({ wrong: true })
            }
            if (user.admin === true) {
                this.props.history.push('/' + user._id + '/a', {user: user})
            } else {
                this.props.history.push('/' + user._id + '/u', {user: user})
            }
            //console.log(res.data.data[0]);
        })
    }
    render() {
        return (
            <Modal open = { this.props.open } closeIcon onClose = { this.props.closeModal }>
                <Header content = "Login"/>
                <Modal.Content>
                    <div className="login-username">
                        <p className="login"> Username: </p>
                        <input id="username" type="text" placeholder = "Enter username"/>
                    </div>
                    <div className="login-password">
                        <p className="login"> Password: </p>
                        <input id="password" type="password" placeholder="Enter password"/>
                    </div>
                    <div className="login-button">
                        <Button color="red" onClick={ this.props.closeModal }> Cancel </Button>
                        <Button color="green" onClick={ this.signIn }> Sign In </Button>
                    </div>
                    <p className="signup-text" onClick={ this.props.openSignUp }> Don't have an account yet? Sign up here! </p>
                    {this.state.wrong && <Message error visible={this.state.wrong} header="Failed to sign in" content="Username or password is wrong." className="error-message"/>}
                </Modal.Content>
            </Modal>
        )
    }
}



export default withRouter(Login);