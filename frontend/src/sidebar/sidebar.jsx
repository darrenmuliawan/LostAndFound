import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './sidebar.scss'
import { Checkbox, Sidebar, Button, Segment, Menu, Icon, Header, Image } from 'semantic-ui-react'

class HorizontalSidebar extends Component {
    constructor() {
        super();

        this.state = {
            filter: '',
            visible: false,
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            filter: name,
        })
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
        const { visible } = this.props;
        const { filter } = this.state;
        console.log(this.state.filter);
        
        return (
            <Sidebar 
                visible= { this.props.visible }
                animation='overlay'
                onHide = { this.props.handleHide }
                inverted
                vertical
                as = {Menu}
            >
                <div className="categories-text">
                    <p> Choose categories: </p>
                </div>
                <Menu.Item as='a' name="Book" onClick={this.handleItemClick} active={filter === 'Book'}> <Icon name='book'/> Book </Menu.Item>
                <Menu.Item as='a' name="Bag/Purse/Wallet" onClick={this.handleItemClick} active={filter === 'Bag/Purse/Wallet'}> <Icon name='shopping bag'/> Bag/Purse/Wallet </Menu.Item>
                <Menu.Item as='a' name="Clothing/Shoes" onClick={this.handleItemClick} active={filter === 'Clothing/Shoes'}> <Icon name='travel'/> Clothing/Shoes </Menu.Item>
                <Menu.Item as='a' name="Credit/Debit Card" onClick={this.handleItemClick} active={filter === 'Credit/Debit Card'}> <Icon name='credit card'/> Credit/Debit Card </Menu.Item>
                <Menu.Item as='a' name="Cell Phone" onClick={this.handleItemClick} active={filter === 'Cell Phone'}> <Icon name='mobile alternate'/> Cell Phone </Menu.Item>
                <Menu.Item as='a' name="Driver's License/ID" onClick={this.handleItemClick} active={filter === "Driver's License/ID"}> <Icon name='id card'/> Driver's License/ID </Menu.Item>
                <Menu.Item as='a' name="Electronics" onClick={this.handleItemClick} active={filter === 'Electronics'}> <Icon name='lightning'/> Electronics </Menu.Item>
                <Menu.Item as='a' name="Glasses" onClick={this.handleItemClick} active={filter === 'Glasses'}> <Icon name='eye'/> Glasses </Menu.Item>
                <Menu.Item as='a' name="Jewelry" onClick={this.handleItemClick} active={filter === 'Jewelry'}> <Icon name='gift'/> Jewelry </Menu.Item>
                <Menu.Item as='a' name="Keys" onClick={this.handleItemClick} active={filter === 'Keys'}> <Icon name='key'/> Keys </Menu.Item>
                <Menu.Item as='a' name="Laptop" onClick={this.handleItemClick} active={filter === 'Laptop'}> <Icon name='laptop'/> Laptop </Menu.Item>
                <Menu.Item as='a' name="Other" onClick={this.handleItemClick} active={filter === 'Other'}>  Other </Menu.Item>
            </Sidebar>
        )
    }
}


export default HorizontalSidebar;