import React, { Component } from 'react';
import Navbar from '../nav-bar/userNavbar.jsx';
import { Divider, List, Modal } from 'semantic-ui-react';
import SubmissionForm from '../SubmissionForm/SubmissionForm.jsx';
import './admin-history.scss';

let items = [
    {
        name: 'Bose Wireless Earphone',
        lost: true,
        category: 'Electronic'
    },
    {
        name: 'Black Glasses',
        lost: false,
        category: 'Glasses'
    },
    {
        name: 'iPhone XS',
        lost: false,
        category: 'Cell Phone'
    }
]

class AdminActivities extends Component {
    constructor() {
        super();
        this.state = {
            openSubmissionForm: false,
        }
    }

    openSubmissionForm = () => {
        this.setState({
            openSubmissionForm: true,
        })
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
                <Navbar 
                    notifications = { this.props.location.state.notifications }
                    username = { this.props.location.state.user.name }
                    user = { this.props.location.state.user }
                    submitForm = { this.openSubmissionForm }
                />
                <div className="admin-history-content">
                    <p className="admin-history-title admin-history-text"> Recent Activities </p>
                    <Divider/>
                    <List divided verticalAlign='center' animated>
                        {items.map(i => 
                            <List.Item className="admin-history-list-item">
                                <List.Content >
                                    <p className="admin-history-text"> You just posted a <strong> {i.lost === true ? 'Lost' : 'Found'} </strong> item: {i.name} </p>
                                </List.Content>
                            </List.Item>
                        )}
                    </List>
                </div>
                <Modal open = { this.state.openSubmissionForm } onClose = { this.closeSubmissionForm } closeIcon>
                    <Modal.Content scrolling>
                        <SubmissionForm/>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default AdminActivities;