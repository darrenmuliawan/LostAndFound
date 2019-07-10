import React, { Component } from 'react';
import Navbar from '../nav-bar/userNavbar.jsx';
import './admin-analytics.scss'
import LineChart from './lineChart.jsx';
import BarGraph from './barGraph.jsx';
import { Divider, Dropdown, Modal } from 'semantic-ui-react';
import SubmissionForm from '../SubmissionForm/SubmissionForm.jsx';

let options = [
    {
        key: 'all',
        text: 'All Items',
        value: 'All Items'
    },
    {
        key: 'book',
        text: 'Book',
        value: 'Book'
    },
    {
        key: 'bag',
        text: 'Bag/Purse/Wallet',
        value: 'Bag/Purse/Wallet'
    },
    {
        key: 'clothing',
        text: 'Clothing/Shoes',
        value: 'Clothing/Shoes'
    },
    {
        key: 'card',
        text: 'Credit/Debit Card',
        value: 'Credit/Debit Card'
    },
    {
        key: 'phone',
        text: 'Cell Phone',
        value: 'Cell Phone'
    },
    {
        key: 'id',
        text: "Driver's License/ID",
        value: "Driver's License/ID"
    },
    {
        key: 'electronics',
        text: 'Electronics',
        value: 'Electronics'
    },
    {
        key: 'glasses',
        text: 'Glasses',
        value: 'Glasses'
    },
    {
        key: 'jewelry',
        text: 'Jewelry',
        value: 'Jewelry'
    },
    {
        key: 'keys',
        text: 'Keys',
        value: 'Keys'
    },
    {
        key: 'laptop',
        text: 'Laptop',
        value: 'Laptop'
    },
    {
        key: 'other',
        text: 'Other',
        value: 'Other'
    }
]

class AdminAnalytics extends Component {
    constructor() {
        super();

        this.state = {
            selected: 'All Items',
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

    handleChange = (e, { value }) => {
        this.setState({
            selected: value
        })
    }

    render() {
        console.log(this.state.selected);
        
        return(
            <div className="sections">
                <Navbar 
                    notifications = { this.props.location.state.notifications }
                    username = { this.props.location.state.user.name }
                    submitForm = { this.openSubmissionForm }
                    user = { this.props.location.state.user }
                />
                <div className="admin-analytics-content">
                    <p className="admin-analytics-title admin-analytics-text"> Analytics </p>
                    <Divider/>
                    <div className="admin-analytics-category">
                        <p className="admin-analytics-text"> Choose category: </p>
                        <Dropdown
                            onChange={this.handleChange}
                            value = {this.state.selected}
                            fluid
                            selection
                            options = {options}
                            className="admin-analytics-dropdown"
                        />
                    </div>
                    {this.state.selected !== "All Items" ? 
                        <div className="admin-analytics-graph-container">
                            <div className="left-graph">
                                <LineChart x="Months" y="Numbers of items lost" />
                            </div>
                            <div className="right-graph">
                                <LineChart x="Months" y="Numbers of items found"/> 
                            </div>
                        </div> 
                        : 
                        <div className="admin-analytics-graph-container">
                            <div className="left-graph">
                                <BarGraph y="Numbers of items lost" />
                            </div>
                            <div className="right-graph">
                                <BarGraph y="Numbers of items found"/> 
                            </div>
                        </div>
                    }
                    <Modal open = { this.state.openSubmissionForm } onClose = { this.closeSubmissionForm } closeIcon>
                        <Modal.Content scrolling>
                            <SubmissionForm/>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default AdminAnalytics;