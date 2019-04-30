import React, { Component } from 'react';
import './item-details.scss'
import { Modal, Header, Image } from 'semantic-ui-react'
import { isArray } from 'util';

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
        let output = JSON.parse(JSON.stringify(items[selectedIndex]));
        if (output !== null && typeof(output.imageUrl) !== 'undefined') {
            return (
                <Modal onClose={this.handleClose} open={open}>
                    <Modal.Header className="modal-title"> { output.name } </Modal.Header>
                    <Modal.Content image scrolling className="modal-content">
                        <Modal.Description className="modal-description">
                            <p className="subcategory"> Category: </p>
                            <p className="details"> { output.type } </p>
                            <p className="subcategory"> Brand: </p>
                            <p className="details"> { output.brand } </p> 
                            <p className="subcategory"> Color: </p>
                            <p className="details"> { output.color } </p>
                            <p className="subcategory"> Description: </p>
                            <p className="details"> { output.description } </p>
                            <p className="subcategory"> Images: </p>
                            { output.imageUrl.map(img => <Image size="small" src = {img} style={{ marginBottom: '50px'}} href={img}/>) }
                            <a className="prev-modal" onClick={this.prevItem}> &#10094; </a>
                            <a className="next-modal" onClick={this.nextItem}> &#10095; </a>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        } else if (output !== null) {
            return (
                <Modal onClose={this.handleClose} open={open}>
                    <Modal.Header className="modal-title"> { output.name } </Modal.Header>
                    <Modal.Content image scrolling className="modal-content">
                        <Modal.Description className="modal-description">
                            <p className="subcategory"> Category: </p>
                            <p className="details"> { output.type } </p>
                            <p className="subcategory"> Brand: </p>
                            <p className="details"> { output.brand } </p> 
                            <p className="subcategory"> Color: </p>
                            <p className="details"> { output.color } </p>
                            <p className="subcategory"> Description: </p>
                            <p className="details"> { output.description } </p>
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