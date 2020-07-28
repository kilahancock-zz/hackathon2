import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import Table from 'react-bootstrap/Table'

class SignUpModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password_reentered: '',
            zipcode: '',
            isShown: true,
        };
    }


    render() {
        console.log("State: ", this.state);
        return (
            <Modal show={this.state.isShown} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center", justifyContent: "center" }}>
                    <Table size="sm" borderless>
                        <tbody>
                            {this._createTextInputRow("Email", this._emailChangeHandler)}
                            {this._createTextInputRow("User Name", this._usernameChangeHandler)}
                            {this._createTextInputRow("Password", this._passwordChangeHandler)}
                            {this._createTextInputRow("Re-enter Password", this._passwordReenterChangeHandler)}
                            {this._createTextInputRow("Zipcode", this._zipcodeChangeHandler)} 
                        </tbody>
                    </Table>
                    <small>*Your zipcode is used to identify your community</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    <Button variant="primary" onClick={this._submitClicked}>Create Account</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }

    /**
     * Handles calling a method passed in by props that updates the app state
     * submitClickedHandler needs the entries in the order: username, email, password, zipcode
    */
    _submitClicked = () => {
        this.props.submitClickedHandler(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.zipcode
        );
        this.closeModal();
    }

    _createTextInputRow = (label, onChangeHandler) => {
        return (
            <tr>
                <td>
                    <Form.Label >{label}</Form.Label>
                </td>
                <td>
                    <Form.Control className="mx-sm-3" onChange={onChangeHandler} />
                </td>
            </tr>

        );
    }


    _emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    _usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    _passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    _passwordReenterChangeHandler = (e) => {
        this.setState({
            password_reentered: e.target.value
        })
    }

    _zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }
}

export default SignUpModal;