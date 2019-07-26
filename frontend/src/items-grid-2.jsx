import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './adminPage/admin-homepage.scss'
import { Grid, Card, Image, List, Input } from 'semantic-ui-react'
import ItemDetails from './item-details.jsx';

class ItemsGrid extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            selectedItem: {},
            selectedIndex: 0,
            items: [{
                index: 0,
                brand: '',
                category: '',
                dateLostOrFound: '',
                description: '',
                email: '',
                fullName: '',
                location: '',
                lostOrFound: '',
                phoneNumber: '',
                file: null,
            }],
            output: [],
        }
    }

    handleOpenClick = (item) => {
        console.log(item);
        
        this.setState({
            open: true,
            selectedItem: item,
            selectedIndex: item.index + 1,
            items: this.props.items
        })    
    }

    componentDidMount() {
        this.setState({
            items: this.props.items,
            output: this.props.items
        })
    }

    componentDidUpdate(prevProps) {
        //console.log(prevProps, this.props);
        if (prevProps.items.length != this.props.items.length) {
            this.setState({
                items: this.props.items,
                output: this.props.items
            })
        }
    }

    handleClose = item => {
        this.setState({
            selectedItem: item,
            selectedIndex: item.index,
            open: false
        });
    }

    search = () => {
        let s = document.getElementById("search-items-2").value;
        let output = this.state.items.filter(item => item.model.toLowerCase().startsWith(s.toLowerCase()));
        this.setState({
            output: output
        })
    }

    render () {
        //console.log(this.props.items);

        let filter = this.props.filter;
        let output = JSON.parse(JSON.stringify(this.state.output));

        output = output.filter(item => item._id !== "");
        if (filter.length !== 0) {
            let i;
            for (i = 0; i < filter.length; i++) {
                output = output.filter(item => item.category.includes(filter[i]));
            }
        }

        return (
            <div className="containers">
                <div className="containers-header">
                    <p className="list-title"> List of { this.props.title } Items: (Found: { output.length } items) </p>
                    <Input icon="search" placeholder="Search for models..." size='mini' id='search-items-2' iconPosition='left' onChange={ this.search }/>
                </div>

                <div className="containers-list">
                    <List selection divided relaxed className="item-list" style={{maxHeight: 200, overflow: 'auto'}}>
                        {output.map(item =>
                            <List.Item onClick={() => this.handleOpenClick(item)}>
                                <List.Content >
                                    <List.Header>
                                        {item.brand}
                                    </List.Header>
                                    <List.Description>
                                        {item.model}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )}
                    </List>
                </div>
                

                <ItemDetails
                    selectedItem = { this.state.selectedItem }
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    update = { this.props.update }
                    user = { this.props.user }
                />
            </div>
        )
    }
}

export default ItemsGrid;
