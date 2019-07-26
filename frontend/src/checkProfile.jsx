import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';

class checkProfile extends Component {
    render() {
        let { user } = this.props;
        return (
            <Modal open={ this.props.open } onClose={ this.props.closeModal } closeIcon>
                <Modal.Header content="Profile"/>
                <Modal.Content> 
                    <p> Name: {user.admin === true ? <Icon name="star outline"/> : ''}{user.name} </p>
                    <p> Address: { user.address } </p>
                    <p> Email: { user.email } </p>
                    <p> Phone: { user.phone } </p> 
                </Modal.Content>
            </Modal>
        )
    }
}

export default checkProfile;