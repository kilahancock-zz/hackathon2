import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import Table from 'react-bootstrap/Table'
import classes from '../css/link.module.css';
import Alert from 'react-bootstrap/Alert'

const errorMessages = {
    email: 'Please enter an email address',
    username: 'Please enter a username',
    password: 'Please enter a password',
    password_reentered: 'Does not match password',
    zipcode: 'Please enter a zipcode (eg. 55110)'
}

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
    }

    render() {
        console.log("Sign up state: ", this.state);
        return (
            <Modal show={this.props.isShown} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center", justifyContent: "center" }}>
                    <Table size="sm" borderless>
                        <tbody>
                            {this._createTextInputRow("Email", this._emailChangeHandler)}
                            {this._createAlertRow(this.state.errors.email, errorMessages["email"])}

                            {this._createTextInputRow("User Name", this._usernameChangeHandler)}
                            {this._createAlertRow(this.state.errors.username, errorMessages["username"])}

                            {this._createTextInputRow("Password", this._passwordChangeHandler)}
                            {this._createAlertRow(this.state.errors.password, errorMessages["password"])}

                            {this._createTextInputRow("Re-enter Password", this._passwordReenterChangeHandler)}
                            {this._createAlertRow(this.state.errors.password_reentered, errorMessages["password_reentered"])}
                            
                            {this._createTextInputRow("Zipcode", this._zipcodeChangeHandler)}
                            {this._createAlertRow(this.state.errors.zipcode, errorMessages["zipcode"])}
                        </tbody>
                    </Table>
                    <small>*Your zipcode is used to identify your community</small>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <p>Existing User? Sign in <a className={classes.modalLink} onClick={this.props.openSignInHandler}>here</a></p>
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
            errors["email"] = true;
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
        if (isNaN(this.state.zipcode) || (this.state.zipcode === '')) {
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

    _createTextInputRow = (label, onChangeHandler) => {
        return (
            <tr>
                <td><Form.Label >{label}</Form.Label></td>
                <td><Form.Control className="mx-sm-3" onChange={onChangeHandler} /></td>
            </tr>
        );
    }

    _createAlertRow = (isShown, errorText) => {
        return (
            <tr>
                <td />
                <td>
                    <Alert show={isShown} variant="light" className={classes.Alert}><p>{errorText}</p></Alert>
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