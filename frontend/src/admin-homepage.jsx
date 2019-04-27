import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Sidebar from './sidebar.jsx'
import ItemsGrid from './items-grid.jsx'

class AdminHome extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            visible2: false,
            filter: []
        }
    }

    openSidebar = () => { 
        console.log(this.state.visible);
        console.log(this.state.visible2);
        
        
        if (this.state.visible2 == false && this.state.visible == true) {
            this.setState({
                visible: true,
                visible2: true
            })
        } else {
            this.setState({
                visible: !this.state.visible,
                visible2: !this.state.visible2
            })
        }
        console.log(this.state.visible);  
    }

    handleHide = () => {
        this.setState({
            visible2: !this.state.visible2
        })
    }

    closeSidebar = () => {
        console.log("CLOSE SIDEBAR");
        
        this.setState({
            visible: false
        })
    }

    applyFilter = (filter) => {
        if (this.state.filter.length !== filter.length) {
            console.log('This is in the homepage', filter);
            this.setState({
                filter: filter
            })
        }
    }

    render() {
        return (
            <div className="sections">
                <div className="section headers">
                    <div className="header-icon">
                        <FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
                    </div>
                    <div className="header-logo">
                        <p className="logo"> Lost and Found </p>
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
                
                <Sidebar
                    filter = { this.applyFilter }
                    visible = { this.state.visible }
                    visible2 = { this.state.visible2 }
                    onHide = { this.handleHide }
                />
                

                <div className="section items">
                    <ItemsGrid
                        filter = { this.state.filter }
                    />
                </div>
            </div>
        )
    }
}



export default AdminHome;