import React, { Component } from 'react';
import Navbar from '../nav-bar/userNavbar.jsx';

class AdminActivities extends Component {
    render() {
        console.log(this.props);
        
        return(
            <div>
                <Navbar 
                    notifications = { this.props.location.state.notifications }
                    username = { this.props.location.state.user.name }
                    user = { this.props.location.state.user }
                    submitForm = { this.openSubmissionForm }
                />
            </div>
        )
    }
}

export default AdminActivities;