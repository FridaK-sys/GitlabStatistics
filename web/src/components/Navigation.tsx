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

    const [values, setValues] = React.useState<IFormInputValues>(getFormValues);

	React.useEffect(() => {
		localStorage.setItem('form', JSON.stringify(values));
	}, [values]);

	function handleRefresh() {
        const repos = JSON.parse(localStorage.getItem('repos') || '[]');
        repos.push(values.repo);
        localStorage.setItem('repos', JSON.stringify(repos));
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
                        type="number"
                        placeholder="Token"
                        className="me-4"
                        aria-label="Token"
                        name="token"
						id="token"
                        onChange={handleChange}
						value={values.token}
                    />
                    <Button id = "getRepository" onClick={handleRefresh} variant="outline-success">Get repository</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
