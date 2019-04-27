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
                <Checkbox label='Electronic' onChange={ this.handleCheck('Electronic') }/>
                <Checkbox label='ID' onChange={ this.handleCheck('ID') }/> 
                <Checkbox label='Books' onChange={ this.handleCheck('Books') }/>
                <Checkbox label='Keys' onChange={ this.handleCheck('Keys') }/>
                <Checkbox label='Stationaries' onChange={ this.handleCheck('Stationaries') }/>
                <Checkbox label='Clothes' onChange={ this.handleCheck('Clothes') }/>
                <Checkbox label='Other' onChange={ this.handleCheck('Other') }/>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </Sidebar>
        )
    }
}


export default HorizontalSidebar;