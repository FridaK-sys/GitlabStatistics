import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {

    const [token, setToken] = useState('');
    const [repo, setRepo] = useState('');
    

    return (
        <Navbar className="p-4 pl-4" bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand>Gitlab Statistics</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-3 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="data">Data</Nav.Link>
                <Nav.Link href="data">Data</Nav.Link>
                <Nav.Link href="data">Data</Nav.Link>
                <Nav.Link href="data">Data</Nav.Link>
            </Nav>
                <Form className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Link"
                        className="me-4"
                        aria-label="Link"
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Token"
                        className="me-4"
                        aria-label="Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <Button variant="outline-success">Get repository</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Navigation;