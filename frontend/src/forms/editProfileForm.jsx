import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react'
import LocationSearchInput from '../SubmissionForm/LocationSearchInput.jsx'
import '../adminPage/admin-homepage.scss'

class EditProfileForm extends Component {
    submitHandler = () => {
        console.log(document.getElementById("edit-profile-input-name").value);
        console.log(document.getElementById("edit-profile-input-address").value);
        console.log(document.getElementById("edit-profile-input-email").value);
        console.log(document.getElementById("edit-profile-input-phone").value);
    }
    render() {
        return (
            <Modal open={ this.props.open } closeIcon onClose={ this.props.closeModal }>
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
                            <Button color='red' inverted onClick={ this.props.closeModal }> Cancel </Button>
                            <Button color='green' inverted onClick={ this.submitHandler }> Submit </Button>
                        </div>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditProfileForm;