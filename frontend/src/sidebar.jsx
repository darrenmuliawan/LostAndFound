import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './admin-homepage.scss'
import { Checkbox, Sidebar, Button, Segment, Menu, Icon, Header, Image } from 'semantic-ui-react'

class HorizontalSidebar extends Component {
    constructor() {
        super();

        this.state = {
            filter: [],
            visible: false,
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.visible != this.props.visible)) {
            console.log("COMPONENT DID UPDATE");
            
            this.setState({
                visible: this.props.visible
            })
        } 
    }

    handleCheck = (value) => {
        const f = () => {
            let array = [...this.state.filter];
            let index = array.indexOf(value);

            if (index !== -1) {
                array.splice(index, 1);
                this.setState({
                    filter: array
                });
            } else {
                array.push(value);
                this.setState({
                    filter: array
                });
            }
        }
        this.props.filter(this.state.filter);
        return f;
    }

    handleHide = () => {        
        if (this.state.visible == true) {
            this.setState({
                visible: false,
            })
        }
    }

    render () {
        const { visible } = this.state; 
        return (
            <Sidebar 
            visible= {visible}
            animation='overlay'
            >
                <div className="categories-text">
                    <p> Choose categories: </p>
                </div>
                <Checkbox label='Book' onChange={ this.handleCheck('Book') }/>
                <Checkbox label='Bag/Purse/Wallet' onChange={ this.handleCheck('Bag/Purse/Wallet') }/>
                <Checkbox label='Clothing/Shoes' onChange={ this.handleCheck('Clothing') }/>
                <Checkbox label='Credit/Debit Card' onChange={ this.handleCheck('Card') }/>
                <Checkbox label='Cell Phone' onChange={ this.handleCheck('Cell Phone') }/>
                <Checkbox label="Driver's License/ID" onChange={ this.handleCheck('License') }/>
                <Checkbox label='Electronics' onChange={ this.handleCheck('Electronics') }/>
                <Checkbox label='Glasses' onChange={ this.handleCheck('Glasses') }/>
                <Checkbox label='Jewelry' onChange={ this.handleCheck('Jewelry') }/>
                <Checkbox label='Keys' onChange={ this.handleCheck('Keys') }/>
                <Checkbox label='Laptop' onChange={ this.handleCheck('Laptop') }/>
                <Checkbox label='Other' onChange={ this.handleCheck('Other') }/>
            </Sidebar>
        )
    }
}


export default HorizontalSidebar;