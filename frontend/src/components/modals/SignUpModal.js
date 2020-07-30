import { Component } from 'react';
import { errorMessages, createTextInputRow, createAlertRow } from './util.js';
import Form from 'react-bootstrap/Form';

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import classes from '../../css/link.module.css';




class SignUpModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password_reentered: '',
            zipcode: '',

            errors: {
                email: false,
                username: false,
                password: false,
                password_reentered: false,
                zipcode: false
            }
        };
        console.log("Error messages: ", errorMessages);
    }

    render() {
        return (
            <Modal show={this.props.isShown} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center", justifyContent: "center" }}>
                    <Table size="sm" borderless>
                        <tbody>
                            {createTextInputRow("Email", this._emailChangeHandler)}
                            {createAlertRow(this.state.errors.email, errorMessages["email"])}

                            {createTextInputRow("User Name", this._usernameChangeHandler)}
                            {createAlertRow(this.state.errors.username, errorMessages["username"])}

                            {createTextInputRow("Password", this._passwordChangeHandler)}
                            {createAlertRow(this.state.errors.password, errorMessages["password"])}

                            {createTextInputRow("Re-enter Password", this._passwordReenterChangeHandler)}
                            {createAlertRow(this.state.errors.password_reentered, errorMessages["password_reentered"])}

                            <tr>
                                <td><Form.Label >Zipcode</Form.Label></td>
                                <td><Form.Control className="mx-sm-3" onChange={this._zipcodeChangeHandler} />
                                <Form.Text muted>*Your zipcode is used to identify your community</Form.Text>
                                </td>
                                
                            </tr>
                            {createAlertRow(this.state.errors.zipcode, errorMessages["zipcode"])}
                        </tbody>
                    </Table>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <p>Existing User? Sign in <Button className={classes.modalLink} onClick={this.props.openSignInHandler}>here</Button></p>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                    <Button variant="primary" onClick={this._submitClicked}>Create Account</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    _isValidInputs = () => {
        let isError = false;
        let errors = {
            email: false,
            username: false,
            password: false,
            password_reentered: false,
            zipcode: false
        }
        if (!this.state.email) {
            errors.email = true;
            isError = true;
        }
        if (!this.state.username) {
            errors.username = true;
            isError = true;
        }
        if (!this.state.password) {
            errors.password = true;
            isError = true;
        }
        if (this.state.password !== this.state.password_reentered) {
            errors.password_reentered = true;
            isError = true;
        }

        //Check that length of 5
        if (isNaN(this.state.zipcode) || (this.state.zipcode === '') || (this.state.zipcode.length !== 5)) {
            errors.zipcode = true;
            isError = true;
        }
        this.setState({
            ...this.state,
            errors
        });

        return !isError;
    }

    /**
     * Handles calling a method passed in by props that updates the app state
     * submitClickedHandler needs the entries in the order: username, email, password, zipcode
    */
    _submitClicked = () => {
        if (this._isValidInputs()) {
            this.props.submitModal(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.zipcode
            );
        }
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