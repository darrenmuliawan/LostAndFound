import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon, Divider, Container, Header, Button, Modal } from 'semantic-ui-react'
import SubmissionForm from '../SubmissionForm/SubmissionForm.jsx'
import EditProfileForm from '../forms/editProfileForm.jsx'
import PasswordChangeForm from '../forms/changePasswordForm.jsx'
import NavBar from '../nav-bar/userNavbar.jsx'
import 'semantic-ui-css/semantic.min.css';

class AdminDetails extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            openSubmissionForm: false,
            openPasswordChange: false,
            admin: true
        }
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

    render() {
        console.log(this.props);
        
        return(
            <div className="sections">
                <NavBar 
                    notifications = { this.props.location.state.notifications }
                    username = { this.props.location.state.user.name }
                    submitForm = { this.openSubmissionForm }
                    user = { this.props.location.state.user }
                />
                <div className="admin-profile">
                    <div className="admin-profile-top">
                        <Icon name="user circle" className="admin-profile-img"/>
                        <div className="admin-profile-edit">
                            <p className="admin-profile-text">{this.state.admin ? <Icon name="star outline"/> : ''}{this.props.location.state.user.name} </p>
                            <div>
                                <Button className="admin-profile-edit-btn" onClick={ this.openEditProfile }> Edit Profile </Button>
                                <Button className="admin-profile-edit-btn" onClick={ this.openPasswordChange }> Change Password </Button>
                            </div>
                        </div>
                    </div>
                    <p className="admin-profile-text" id="contact-info-text"> Contact Info </p>
                    <Divider/>
                    <p className="admin-profile-text"> Address: {this.props.location.state.user.address} </p> 
                    <p className="admin-profile-text"> Email: {this.props.location.state.user.email} </p>
                    <p className="admin-profile-text"> Phone: {this.props.location.state.user.phone} </p>
                    <p className="admin-profile-text"> Joined: {this.props.location.state.user.joined} </p>
                </div>
                <EditProfileForm
                    open = { this.state.open }
                    closeModal = { this.openEditProfile }
                    user = { this.props.location.state.user }
                />
                <Modal open = { this.state.openSubmissionForm } onClose = { this.closeSubmissionForm } closeIcon>
                    <Modal.Content scrolling>
                        <SubmissionForm/>
                    </Modal.Content>
                </Modal>

                <PasswordChangeForm 
                    open = { this.state.openPasswordChange }
                    closeModal = { this.openPasswordChange }
                    user = { this.props.location.state.user }
                />
            </div>
        )
    }
}

export default AdminDetails;
