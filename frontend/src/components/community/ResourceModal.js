import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import Table from 'react-bootstrap/Table';

class ResourceModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceType: 'Request',
            category: 'Produce',
            description: '',
            notes: '',
        };
    }

    render() {
        return (
            <Modal show={this.props.isShown} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Request or Offer Food</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center", justifyContent: "center" }}>
                    <Table size="sm" borderless>
                        <tbody>
                            {this._createSelectTypeInputRow("Choose one", this._resourceTypeChangeHandler)}
                            {this._createSelectCategoryInputRow("Category", this._categoryChangeHandler)}
                            {this._createTextInputRow("Describe items", this._descriptionChangeHandler)}
                            {this._createTextAreaInputRow("Additional notes", this._notesChangeHandler)}
                        </tbody>
                    </Table>
                    <small>Include allergies and dietary restrictions here.</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                    <Button variant="primary" onClick={this._submitClicked}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    /**
     * Handles calling a method passed in by props that updates the app state
     * submitClickedHandler needs the entries in the order: username, email, password, zipcode
    */
    _submitClicked = () => {
        this.props.submitModal(
            this.state.resourceType,
            this.state.category,
            this.state.description,
            this.state.notes
        );
        this._clearState();
    }

    _createTextInputRow = (label, onChangeHandler) => {
        return (
            <tr>
                <td><Form.Label >{label}</Form.Label></td>
                <td><Form.Control className="mx-sm-3" onChange={onChangeHandler} /></td>
            </tr>
        );
    }

    _createSelectTypeInputRow = (label, onChangeHandler) => {
        return (
            <tr>
              <td><Form.Label >{label}</Form.Label></td>
              <Form.Control as="select" onChange={onChangeHandler}>
                <option>Request</option>
                <option>Donate</option>
              </Form.Control>
            </tr>
        );
    }

    _createSelectCategoryInputRow = (label, onChangeHandler) => {
        return (
            <tr>
              <td><Form.Label >{label}</Form.Label></td>
              <Form.Control as="select" onChange={onChangeHandler}>
                <option>Produce</option>
                <option>Meat</option>
                <option>Dairy</option>
                <option>Frozen Goods</option>
                <option>Canned Goods</option>
                <option>Dry goods</option>
              </Form.Control>
            </tr>
        );
    }

    _createTextAreaInputRow = (label, onChangeHandler) => {
        return (
            <tr>
                <td><Form.Label >{label}</Form.Label></td>
                <td><Form.Control as="textarea" className="mx-sm-3" onChange={onChangeHandler} /></td>
            </tr>
        );
    }

    _resourceTypeChangeHandler = (e) => {
        this.setState({
          resourceType: e.target.value
        })
    }

    _categoryChangeHandler = (e) => {
        this.setState({
          category: e.target.value
        })
    }

    _descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    _notesChangeHandler = (e) => {
        this.setState({
            notes: e.target.value
        })
    }

    _clearState = () => {
        this.setState({
            resourceType: 'Request',
            category: 'Produce',
            description: '',
            notes: '',    
        })
    }
}

export default ResourceModal;