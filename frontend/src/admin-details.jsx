import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Container, Header, Button, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class AdminDetails extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
        }
    }

    openPost = () => {
        this.setState({
            visible: true,
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
                        <Button positive onClick={ this.openPost }> I Found Something! </Button>
                        <Button negative> DELETE from Database </Button>
                    </Container>
                </div>
            </div>
        )
    }
}

export default AdminDetails;