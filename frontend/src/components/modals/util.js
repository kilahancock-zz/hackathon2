//File of shared functions and constants
import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import classes from '../../css/link.module.css';

//Error messages used for sign in/sign up
export const errorMessages = {
    email: 'Please enter an email address',
    username: 'Please enter a username',
    password: 'Please enter a password',
    password_reentered: 'Does not match password',
    zipcode: 'Please enter a five digit zipcode (eg. 55110)'
}

/**
 * Creates a table row where the first column is a label, the second column is a text input that calls
 * onChangeHandler when any of the input changes
 */
export const createTextInputRow = (label, onChangeHandler) => {
    return (
        <tr>
            <td><Form.Label >{label}</Form.Label></td>
            <td><Form.Control className="mx-sm-3" onChange={onChangeHandler} /></td>
        </tr>
    );
}

/**
 * Creates a small alert row to be placed under the above _createTextInputRow
 * The alert will show up in the second row as small, red text.
 * The alert styling comes from the link.module.css
 */
export const createAlertRow = (isShown, errorText) => {
    return (
        <tr>
            <td />
            <td>
                <Alert show={isShown} variant="light" className={classes.Alert}><p>{errorText}</p></Alert>
            </td>
        </tr>
    );
}