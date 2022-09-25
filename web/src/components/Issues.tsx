import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { getIssuesFromAPI } from '../api/apiservice';
import { Issue } from "../api/types";
import { formatDateAndTime } from "./utils";

export default function Issues() {

    const [issues, setIssues] = useState<Issue[] | null>(null);

    useEffect(() => {
        getIssuesFromAPI().then((res) => {
          if (!res.ok) return console.error(res.status, res.data);
          setIssues(res.data);
        });
    }, []);
    
    let body: any = []
    
    issues?.forEach(el => {
        body.push(
            <div className="pb-4">
                <Card className="me-2">
                    <Card.Header>Id: {el.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Title: {el.title}</Card.Title>
                        <Card.Text>
                            <p>Author: {el.author.name}</p>
                            <p>Created_at: {formatDateAndTime(el.created_at)}</p>
                            <p className="pb-2">Labels: 
                                {el.labels.map((el) => (
                                    <li>{el}</li>
                                ))}
                            </p>
                            <p>Closed_at: {(el.closed_at ? formatDateAndTime(el.closed_at) : "Not closed")}</p>
                            <p>Milestone: {el.milestone.title}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )     
    })

    return (
        <Container>                
            <div>
                <h3 className="pt-4 pb-4 text-center">Alle issues i prosjektet</h3>
                <div className="d-flex flex-wrap justify-content-center">
                    {body}
                </div>
            </div>
        </Container>
    );
}