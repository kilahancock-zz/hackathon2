import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
const NotFound = props => {
    return (
        <div>
            <h1> 404 </h1>
            <p> Oops! Something went wrong! </p>
            <Button variant="outline-primary"size="lg" as={Link} to="/"> Maybe try going back? We have cookies! </Button>
        </div>
    )
}

NotFound.propTypes = {

}

export default NotFound
