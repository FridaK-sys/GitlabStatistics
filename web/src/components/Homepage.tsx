import Container from 'react-bootstrap/Container';

export default function Homepage() {
    

    return(
        <Container>
            <div>
                <h1>This is the homepage</h1>
                <h2>Recently viewed</h2>
                <ul>
                    {(JSON.parse(localStorage.getItem("repos") || " []")).map((el : String) => <li> {el}</li>)}
                </ul>

            </div>
        </Container>
    );
}