import React from 'react'
import { Container, Row } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container>
            <Row className="justify-content-center my-5 mx-auto">
                <h1 className="text-danger">Not Found</h1>
            </Row>
        </Container>
    )
}

export default NotFound
