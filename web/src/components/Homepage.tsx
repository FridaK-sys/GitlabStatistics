import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';

import { getAllCommitsFromApi } from '../api/apiservice';
import { Commit } from "../api/types";

import { getIssuesFromAPI } from '../api/apiservice';
import { Issue } from "../api/types";

export default function Homepage() {

    //Vil vise: prosjekt-navn, contributors, branches (all/active?), antall commits, antall issues totalt og antall 

    const [commits, setCommits] = useState<Commit[] | null>(null);

    useEffect(() => {
        getAllCommitsFromApi().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setCommits(res.data);
        });
    }, []);

    const commitNumber = commits?.length;

    const [issues, setIssues] = useState<Issue[] | null>(null);

    useEffect(() => {
        getIssuesFromAPI().then((res) => {
          if (!res.ok) return console.error(res.status, res.data);
          setIssues(res.data);
        });
    }, []);

    const issueNumber = issues?.length;

    

    return(
        <Container>
            <div>
                <h1>This is the homepage</h1>
                <p>
                    The main branch in this repository has {commitNumber} commits. If you want to learn more about these commits, you can read about them 
                    under "Commits".
                </p>
                <p>
                    There are {issueNumber} number of issues associated to this repository. Of these, 
                </p>
            </div>
        </Container>
    );
}