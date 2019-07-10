import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './adminPage/admin-homepage.scss'
import { Grid, Card, Image, List } from 'semantic-ui-react'
import ItemDetails from './item-details.jsx'

class FoundItemsList extends Component {
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
            }]
        }
    }

    handleOpenClick = (item) => {
        const f = () => {
            this.setState({
                open: true,
                selectedItem: item,
                selectedIndex: item.index + 1,
                items: this.props.items
            })
        }
        return f;
    }

    handleClose = item => {
        this.setState({
            selectedItem: item,
            selectedIndex: item.index,
            open: false
        });
    }

    prevItemDetails = () => {
        console.log("BALEK BRO");
        console.log(this.state.selectedIndex);

        if (this.state.selectedIndex != 0) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1
            }));
        }
    }

    nextItemDetails = () => {
        console.log("NEXT BRO");
        console.log(this.state.selectedIndex);

        if (this.state.selectedIndex != 15) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1
            }));
        }
    }

    render () {
        console.log(this.props.items);
        
        let filter = this.props.filter;
        let output = JSON.parse(JSON.stringify(this.props.items));

        if (filter.length !== 0) {
            let i;
            for (i = 0; i < filter.length; i++) {
                output = output.filter(item => item.category.includes(filter[i]));
            }
        }

        return (
            <div className="containers">
                <div>
                    <p className="list-title"> List of Found Items: (Found { output.length } items) </p>
                </div>
                <List selection divided relaxed className="item-list" style={{maxHeight: 200, overflow: 'auto'}}>
                    {output.map(item => 
                        <List.Item onClick={this.handleOpenClick(item)}>
                            <List.Content >
                                <List.Header>
                                    {item.fullName}
                                </List.Header>
                                <List.Description>
                                    {item.brand}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    )}
                </List>

                <ItemDetails
                    selectedItem = { this.state.selectedItem }
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    nextItem = { this.nextItemDetails }
                    prevItem = { this.prevItemDetails }
                    selectedIndex = { this.state.selectedIndex }
                    items = { this.props.allItems }
                />
            </div>
        )
    }
}

export default FoundItemsList;
