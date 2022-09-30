import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Branch, Commit, Project, Issue } from "../api/types";
import { getAllCommitsFromApi, getIssuesFromAPI, getProjectFromAPI, getAllBranches } from '../api/apiservice';


export default function Homepage() {
    
    //Prosjekt-informasjon
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        getProjectFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setProject(res.data);
        });
    });

    const name = project?.name_with_namespace;


    //Commit-informasjon
    const [commits, setCommits] = useState<Commit[] | null>(null);

    useEffect(() => {
        getAllCommitsFromApi().then((res) => {
            setCommits(res);
        });
    }, []);

    const commitNumber = commits?.length;

    //Issue-informasjon
    const [allIssues, setAllIssues] = useState<Issue[] | null>(null);
    const [openIssues, setOpenIssues] = useState<Issue[] | null>(null);
    const [closedIssues, setClosedIssues] = useState<Issue[] | null>(null);

    useEffect(() => {
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setAllIssues(res.data);
            setClosedIssues(res.data.filter(el => /\d/.test(el.closed_at || ''))); //Issues som er lukket, plasseres i en egen array
            setOpenIssues(res.data.filter(el => !/\d/.test(el.closed_at || ''))); //Issues som er åpne, plasseres i en egen array
        });
    }, []);

    const issueNumber = allIssues?.length; //Antall issues totalt
    const openIssueNumber = openIssues?.length; //Antall åpne issues
    const closedIssueNumber = closedIssues?.length; //Antall lukkede issues


    //Branch-informasjon
    const [branches, setBranches] = useState<Branch[] | null>(null);

    useEffect(() => {
        getAllBranches().then((res) => {
            setBranches(res.data);
        })
    }, []);

    const branchNumber = branches?.length;

    //Lager en pen liste for å vise frem alle brancher i repoet
    const body : any = []

    branches?.forEach(el => {
        body.push(
            <div>
                <li>{el.name}
                </li>
            </div>
        )     
    })

    return(
        <Container>
            <div>
                <h1>{name}</h1>
                <h3>
                    Commits
                </h3>
                <p>
                    The main branch in this repository has {commitNumber} commits. If you want to learn more about these commits, you can read about them 
                    under "Commits".
                </p>
                <h3>
                    Issues
                </h3>
                <p>
                    There are {issueNumber} number of issues associated to this repository. Of these, {openIssueNumber} are open, and {closedIssueNumber} are closed. Go to "Issues" to learn more about them.
                </p>
                <h3>
                    Branches
                </h3>
                <p>
                    This repository has {branchNumber} branches. To see a chart of commits per day in every branch, go to "Chart".
                </p>
                <h5>
                    The branches are:
                </h5>
                <p>
                    {body}
                </p>
                <h2>Recently viewed</h2>
                <ul>
                    {(JSON.parse(localStorage.getItem("repos") || " []")).map((el : String) => <li> {el}</li>)}
                </ul>
            </div>
        </Container>
    );
}
