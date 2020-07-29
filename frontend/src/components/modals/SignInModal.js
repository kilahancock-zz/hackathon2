import { Component } from 'react';
import { errorMessages, createTextInputRow, createAlertRow } from './util.js';

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import classes from '../../css/link.module.css';


class SignInModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',

            errors: {
                username: false,
                password: false,
            }
        };
    }

    render() {
        return (
            <Modal show={this.props.isShown} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center", justifyContent: "center" }}>
                    <Table size="sm" borderless>
                        <tbody>
                            {createTextInputRow("User Name", this._usernameChangeHandler)}
                            {createAlertRow(this.state.errors.username, errorMessages["username"])}

                            {createTextInputRow("Password", this._passwordChangeHandler)}
                            {createAlertRow(this.state.errors.password, errorMessages["password"])}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <p>New User? Sign up <Button className={classes.modalLink} onClick={this.props.openSignUpHandler}>here</Button></p>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                    <Button variant="primary" onClick={this._submitClicked}>Sign In</Button>
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
        if(this._isValidInputs()){
            this.props.submitModal(
                this.state.username,
                this.state.password,
            );
        }
    }

    //Also check if sign in is successful
    _isValidInputs = () => {
        let isError = false;
        let errors = {
            username: false,
            password: false,
        }
        if (!this.state.username) {
            errors.username = true;
            isError = true;
        }
        if (!this.state.password) {
            errors.password = true;
            isError = true;
        }
        
        this.setState({
            ...this.state,
            errors
        });
        return !isError;
    }

    _usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    _passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
}

export default SignInModal;