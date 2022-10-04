import './Homepage.css';
import { Card, Col, Row } from 'antd';
import { formatDateAndTime, getFormValues } from "./utils";
import { useContext, useEffect, useState } from "react";
import { Commit } from "../api/types";
import Container from 'react-bootstrap/Container';
import { ThemeContext } from "../context/ThemeContext";
import { getCommits } from '../api/apiservice';

/** 
* Functional component that returns commit-component with cards for each commit
*/
export default function Commits() {
    
    const [commits, setCommit] = useState<Commit[] | null>(null); // List of commits that is shown on page
    const { theme } = useContext(ThemeContext); // Theme of page

    useEffect(() => {
        // Does nothing if there is no repo in localStorage
        if (getFormValues().repo === '') {
            return
        }
        // Gets all commits from api
        getCommits().then((res) => {
            setCommit(res)
        })
    }, []);
    
    const body: any = []
    
    // Creates a card for each commit
    if (!(getFormValues().repo === '')) {
        commits?.forEach(el => {
            body.push(
                <Col xs={24} md={12} xl={8} className="mb-4"> 
                    <Card title={el.id}
                    headStyle={{
                        backgroundColor: theme === "dark"? '#212529' : '#f5f5f5', 
                        color: theme === "dark"? '#f8f9fa' : '000000'
                    }}
                    bodyStyle={{ 
                        backgroundColor: theme === "dark"? '#343a40' : '#fafafa',
                        color: theme === "dark"? '#f8f9fa' : '#000000'
                    }}>
                        <p>Author_name: {el.author_name? el.author_name : "Not provided"}</p>
                        <p>Author_email: {el.author_email? el.author_email : "Not provided"}</p>
                        <p>Authored_date: {el.authored_date? formatDateAndTime(el.authored_date) : "Not provided"}</p>
                        <p>Committed_date: {el.committed_date? formatDateAndTime(el.committed_date) : "Not provided"}</p>
                        <p>Message: {el.message? el.message : "Not provided"}</p>
                    </Card>
                </Col>
            )     
        })
    }

    return (
        <Container>
            {!(getFormValues().repo === '') &&
                <>
                    <h3 className="pt-4 pb-4 text-center">All commits to the branch "main"</h3>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            {body}
                        </Row>
                    </div>
                </>
            }
            {(getFormValues().repo === '') &&   
                <div className="text">
                    <h4>Please enter a repository!</h4>
                    <p>In order to view information about a repository, you must type the project code and the token (if needed).</p>
                </div>
            }   
        </Container>
    );
}