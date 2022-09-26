import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { getAllCommitsFromApi } from '../api/apiservice';
import { Commit } from "../api/types";
import { formatDateAndTime } from "./utils";

export default function Commits() {
    
    const [commits, setCommit] = useState<Commit[] | null>(null);

    useEffect(() => {
        getAllCommitsFromApi().then((res) => {
          setCommit(res);
        });
    }, []);
    
    const body: any = []
    
    commits?.forEach(el => {
        body.push(
            <div className="pb-4">
                <Card className="me-2">
                    <Card.Header>Id: {el.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Title: {el.title}</Card.Title>
                        <Card.Text>
                            <p>Author_name: {el.author_name}</p>
                            <p>Author_email: {el.author_email}</p>
                            <p>Authored_date: {formatDateAndTime(el.authored_date)}</p>
                            <p>Committed_date: {formatDateAndTime(el.committed_date)}</p>
                            <p>Message: {el.message}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )     
    
    })

    return (
        <Container>
            <div>
                <h3 className="pt-4 pb-4 text-center">Alle commits i prosjektet</h3>
                <div className="d-flex flex-wrap align-items-stretch justify-content-center">
                    {body}
                </div>
            </div>
        </Container>
    );
}