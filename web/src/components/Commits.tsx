import React, { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { getAllCommitsFromApi } from '../api/apiservice';
import { Commit } from "../api/types";
import { formatDateAndTime } from "./utils";
import { Card, Col, Row } from 'antd';
import { ThemeContext } from "../context/ThemeContext";

function getFormValues() {
    const storedValues = localStorage.getItem('form');
    if (!storedValues)
        return {
          repo: '',
          token: '',
        };
    return JSON.parse(storedValues);
}

export default function Commits() {
    
    const [commits, setCommit] = useState<Commit[] | null>(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getAllCommitsFromApi().then((res) => {
            setCommit(res);
        });
    }, []);
    
    const body: any = []
    
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
                    <h3 className="pt-4 pb-4 text-center">Alle commits i main</h3>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            {body}
                        </Row>
                    </div>
                </>
            }
            {(getFormValues().repo === '') &&   
                <p>Please enter a repo!</p>
            }   
        </Container>
    );
}