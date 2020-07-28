import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import classes from '../css/link.module.css';

class SignInModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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
                            {this._createTextInputRow("User Name", this._usernameChangeHandler)}
                            {this._createTextInputRow("Password", this._passwordChangeHandler)}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <p>New User? Sign up <a className={classes.modalLink} onClick={this.props.openSignUpHandler}>here</a></p>
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
        this.props.submitModal(
            this.state.username,
            this.state.password,
        );
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