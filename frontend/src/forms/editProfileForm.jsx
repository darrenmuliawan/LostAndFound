import React, { Component } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react'
import LocationSearchInput from '../SubmissionForm/LocationSearchInput.jsx'
import '../adminPage/admin-homepage.scss';
import axios from 'axios';

class EditProfileForm extends Component {
    constructor() {
        super();

        this.state = {
            success: false,
            error: false,
        }
    }
    submitHandler = () => {
        let name = document.getElementById("edit-profile-input-name").value;
        let address = document.getElementById("edit-profile-input-address").value;
        let email = document.getElementById("edit-profile-input-email").value;
        let phone = document.getElementById("edit-profile-input-phone").value;

        if (name !== '' && address != '' && email !== '' && phone !== '') {
            axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + this.props.user._id, { name, email, address, phone }).then( res => {
                console.log(res);
                if (res.data.message === "OK") {
                    this.setState({success: true, error: false})
                } else {
                    this.setState({success: false, error: true})
                }
                this.props.update();
            })
        }
    }

    closeModal = () => {
        this.setState({success: false, error: false})
        this.props.closeModal();
    }
    render() {
        return (
            <Modal open={ this.props.open } closeIcon onClose={ this.closeModal }>
                <Modal.Header> Edit Profile </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <label> Name </label>
                            <input id="edit-profile-input-name" defaultValue={this.props.user.name}/>
                        </Form.Field>
                        <Form.Field required>
                            <label> Address </label>
                            <input id="edit-profile-input-address" defaultValue={this.props.user.address}/>
                        </Form.Field>
                        <Form.Field required>
                            <label> Email </label>
                            <input id="edit-profile-input-email" defaultValue={this.props.user.email}/>
                        </Form.Field>
                        <Form.Field required>
                            <label> Phone Number </label>
                            <input id="edit-profile-input-phone" defaultValue={this.props.user.phone}/>
                        </Form.Field>
                        <div className="edit-profile-form-button">
                            <Button color='red' inverted onClick={ this.closeModal }> Cancel </Button>
                            <Button color='green' inverted onClick={ this.submitHandler }> Submit </Button>
                        </div>
                        {this.state.error && <Message error visible={this.state.error} header="Failed!" content="Server error" className="error-message"/>}
                        {this.state.success && <Message success visible={this.state.success} header="Success!" content="Successfully updated your profile" className="success-message"/>}
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditProfileForm;