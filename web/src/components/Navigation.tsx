import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {

    interface IFormInputValues {
        repo: string;
        token: string;
    }

    function getFormValues() {
        const storedValues = localStorage.getItem('form');
        if (!storedValues)
            return {
                repo: '',
                token: '',
            };
        return JSON.parse(storedValues);
    }

    function removeFormValues() {
        localStorage.removeItem('form');
    }

    const [values, setValues] = React.useState<IFormInputValues>(getFormValues);

	React.useEffect(() => {
		localStorage.setItem('form', JSON.stringify(values));
	}, [values]);

	function handleRefresh() {
        window.location.reload();
	}

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		alert('An error occurred on the server. Please try again!!!');
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setValues((previousValues) => ({
			...previousValues,
			[event.target.name]: event.target.value,
		}));
	}

    function clearValues() {
        removeFormValues();
        window.location.reload();
    }

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
                <Nav.Link href="/">Homepage</Nav.Link>
                <Nav.Link href="issues">Issues</Nav.Link>
                <Nav.Link href="commits">Commits</Nav.Link>
                <Nav.Link href="chart">Chart</Nav.Link>
            </Nav>
                <Form onSubmit={handleSubmit} className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Repo"
                        className="me-4"
                        aria-label="repo"
                        name="repo"
						id="repo"
                        onChange={handleChange}
						value={values.repo}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Token"
                        className="me-4"
                        aria-label="Token"
                        name="token"
						id="token"
                        onChange={handleChange}
						value={values.token}
                    />
                    <Button className="me-2" onClick={handleRefresh} variant="outline-success">Get repository</Button>
                    <Button onClick={clearValues} variant="outline-success">Clear selection</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}