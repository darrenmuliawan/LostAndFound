import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Container, Header, Button, Divider, Modal } from 'semantic-ui-react'
import SubmissionForm from './SubmissionForm/SubmissionForm.jsx'
import 'semantic-ui-css/semantic.min.css';

class AdminDetails extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }
    }

    openSubmissionForm = () => {
        this.setState({
            open: true,
        });
    }

    closeSubmissionForm = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        return(
            <div className="sections">
                <div className="section headers">
                    <div className="header-icon">
                        <FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
                    </div>
                    <div className="header-logo">
                        <Link to="/admin">
                            <p className="logo"> Lost and Found </p>
                        </Link>
                    </div>
                    <div className="header-user">
                        <Link to="/admin/adminusername">
                            <FontAwesomeIcon icon= {faUserCircle}/>
                        </Link>
                        <Link to="/admin/adminusername">
                            <p className="username"> Darren Muliawan </p>
                        </Link>
                    </div>
                </div>

                <div className="section post">
                    <Container fluid textAlign='center'>
                        <Header as='h2'> Welcome, Darren Muliawan! </Header>
                        <Divider />
                        <p> What do you want to do today? </p>
                        <Button positive onClick={ this.openSubmissionForm }> I Found Something! </Button>
                    </Container>
                </div>

                <Modal open = { this.state.open } onClose = { this.closeSubmissionForm } closeIcon>
                    <Modal.Content>
                        <SubmissionForm/>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default AdminDetails;
