import React, { Component } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react'
import './forms.scss';

class PasswordChangeForm extends Component {
    constructor() {
        super();

        this.state = {
            success: false,
            error: false,
            message: '',
        }
    }

    submitHandler = () => {
        let oldPassword = document.getElementById("edit-profile-input-old-password").value;
        let newPassword = document.getElementById("edit-profile-input-new-password").value;

        if (oldPassword === this.props.user.password && oldPassword !== newPassword) {
            this.setState({
                success: true,
                error: false,
            });
        } else if (oldPassword === this.props.user.password && oldPassword === newPassword) {
            this.setState({
                success: false,
                error: true,
                message: 'New password can not be the same as old password!'
            })
        } else if (oldPassword !== this.props.user.password) {
            this.setState({
                success: false,
                error: true,
                message: 'You entered the wrong password!'
            })
        }
    }

    closeModal = () => {
        this.setState({
            success: false,
            error: false,
            message: '',
        });
        this.props.closeModal();
    }

    render() {
        console.log(this.props.user);
        
        return(
            <Modal open={ this.props.open } closeIcon onClose={ this.closeModal }>
                <Modal.Header> Change Password </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label> Username </label>
                            <input defaultValue={this.props.user.username} readOnly/>
                        </Form.Field>
                        <Form.Field required>
                            <label> Enter old password </label>
                            <input id="edit-profile-input-old-password" type="password"/>
                        </Form.Field>
                        <Form.Field required>
                            <label> Enter new password </label>
                            <input id="edit-profile-input-new-password" type="password"/>
                        </Form.Field>
                        <div className="edit-profile-form-button">
                            <Button color='red' inverted onClick={ this.props.closeModal }> Cancel </Button>
                            <Button color='green' inverted onClick={ this.submitHandler }> Submit </Button>
                        </div>
                        {this.state.success && <Message success visible={this.state.success} header="Success!" content="You successfully changed your password!" className="success-message"/>}
                        {this.state.error && <Message error visible={this.state.error} header="Error" content= {this.state.message} className="error-message"/>}
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default PasswordChangeForm;