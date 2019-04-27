import React, { Component } from 'react';
import './item-details.scss'
import { Modal, Header } from 'semantic-ui-react'

class ItemDetails extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedItem);
    }

    prevItem = () => {
        console.log(this.props);
        
        console.log(this.props.selectedIndex);
        
        this.props.prevItem(this.props.selectedIndex);
    }

    nextItem = () => {
        this.props.nextItem(this.props.selectedIndex);
    }

    render() {
        const { selectedItem, open, selectedIndex, items } = this.props;
        console.log(this.props.items);
        let output = items[selectedIndex];
        if (output != null) {
            console.log(output.name);
            return (
                <Modal onClose={this.handleClose} open={open}>
                    <Modal.Header className="modal-title"> { output.name } </Modal.Header>
                    <Modal.Content className="modal-content">
                        <Modal.Description className="modal-description">
                            <Header> { output.type } </Header>
                            <p> { output.description } </p>
                            <a className="prev-modal" onClick={this.prevItem}> &#10094; </a>
                            <a className="next-modal" onClick={this.nextItem}> &#10095; </a>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        }
        return (
            <Modal></Modal>
        )
    }
}

export default ItemDetails;