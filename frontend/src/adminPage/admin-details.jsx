import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon, Divider, Container, Header, Button, Modal } from 'semantic-ui-react'
import SubmissionForm from '../forms/submissionForm.jsx';
import EditProfileForm from '../forms/editProfileForm.jsx'
import PasswordChangeForm from '../forms/changePasswordForm.jsx'
import NavBar from '../nav-bar/userNavbar.jsx'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

class AdminDetails extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            openSubmissionForm: false,
            openPasswordChange: false,
            admin: false,
            name: '',
            address: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            id: '',
            dateJoined: '',
            notifications: [],
        }
    }

    componentDidMount() {
        //console.log(this.props.location.state.user);
        console.log(this.props);
        
        axios.get("http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/users/" + this.props.location.state.user._id).then(res => {
            //console.log(res);
            
            this.setState({
                name: res.data.data.name,
                address: res.data.data.address,
                email: res.data.data.email,
                phone: res.data.data.phone,
                username: res.data.data.username,
                password: res.data.data.password,
                id: res.data.data._id,
                admin: res.data.data.admin,
                dateJoined: res.data.data.dateJoined,
                notifications: res.data.data.notifications,
            })
        });    
    }

    openPasswordChange = () => {
        this.setState({
            openPasswordChange: !this.state.openPasswordChange,
        });
    }

    openEditProfile = () => {
        this.setState({
            open: !this.state.open,
        });
    }

    openSubmissionForm = () => {
        this.setState({
            openSubmissionForm: true,
        });
    }

    closeSubmissionForm = () => {
        this.setState({
            openSubmissionForm: false,
        })
    }

    update = () => {
        axios.get("http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/users/" + this.props.location.state.user._id).then(res => {
            console.log(res);
            
            this.setState({
                name: res.data.data.name,
                address: res.data.data.address,
                email: res.data.data.email,
                phone: res.data.data.phone,
                username: res.data.data.username,
                password: res.data.data.password,
                dateJoined: res.data.data.dateJoined,
                id: res.data.data._id
            })
        });
    }

    render() {
        //console.log(this.props);
        let date = new Date(this.state.dateJoined);
        let user = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password,
            dateJoined: this.state.dateJoined,
            admin: this.state.admin,
            _id: this.state.id
        };
        console.log(user);
        
        return(
            <div className="sections">
                <NavBar 
                    notifications = { this.state.notifications }
                    username = { user.name }
                    submitForm = { this.openSubmissionForm }
                    user = { user }
                />
                <div className="admin-profile">
                    <div className="admin-profile-top">
                        <Icon name="user circle" className="admin-profile-img"/>
                        <div className="admin-profile-edit">
                            <p className="admin-profile-text">{this.state.admin ? <Icon name="star outline"/> : ''}{this.state.name} </p>
                            <div>
                                <Button className="admin-profile-edit-btn" onClick={ this.openEditProfile }> Edit Profile </Button>
                                <Button className="admin-profile-edit-btn" onClick={ this.openPasswordChange }> Change Password </Button>
                            </div>
                        </div>
                    </div>
                    <p className="admin-profile-text" id="contact-info-text"> Contact Info </p>
                    <Divider/>
                    <p className="admin-profile-text"> Address: {this.state.address} </p> 
                    <p className="admin-profile-text"> Email: {this.state.email} </p>
                    <p className="admin-profile-text"> Phone: {this.state.phone} </p>
                    <p className="admin-profile-text"> Joined: {date.toLocaleDateString()} </p>
                </div>
                <EditProfileForm
                    open = { this.state.open }
                    closeModal = { this.openEditProfile }
                    user = { user }
                    update = { this.update }
                />
                <Modal open = { this.state.openSubmissionForm } onClose = { this.closeSubmissionForm } closeIcon>
                    <Modal.Content scrolling>
                        <SubmissionForm
                            user = { user }
                        />
                    </Modal.Content>
                </Modal>

                <PasswordChangeForm 
                    open = { this.state.openPasswordChange }
                    closeModal = { this.openPasswordChange }
                    user = { user }
                    update = { this.update }
                />
            </div>
        )
    }
}

export default AdminDetails;
