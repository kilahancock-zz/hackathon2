import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';

class SignUpModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password_reentered: '',
            zipcode: ''
        };
    }


    render() {
        return (
            <Modal show={true} onHide={this.onClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this._createTextInput("Email", this._emailChangeHandler)}
                    {this._createTextInput("User Name", this._usernameChangeHandler)}
                    {this._createTextInput("Password", this._passwordChangeHandler)}
                    {this._createTextInput("Re-enter Password", this._passwordReenterChangeHandler)}
                    {this._createTextInput("Zipcode", this._zipcodeChangeHandler)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onClick}>
                        Close
                </Button>
                    <Button variant="primary" onClick={this._submitClicked}>
                        Create Account
                </Button>
                </Modal.Footer>
            </Modal>
        );

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
    }

    _createTextInput = (label, onChangeHandler) => {
        return (
            <Form inline>
                <Form.Group>
                    <Form.Label >{label}</Form.Label>
                    <Form.Control
                        className="mx-sm-3"
                        onChange={onChangeHandler}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        (Placeholder)
                        </Form.Text>
                </Form.Group>
            </Form>
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



    onClick = () => {
        return;
    }

    
}

export default SignUpModal;