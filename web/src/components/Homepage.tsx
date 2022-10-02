import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Branch, Commit, Project, Issue } from "../api/types";
import { getAllCommitsFromApi, getIssuesFromAPI, getProjectFromAPI, getAllBranches } from '../api/apiservice';
import './Homepage.css';

function getFormValues() {
    const storedValues = localStorage.getItem('form');
    if (!storedValues)
        return {
          repo: '',
          token: '',
        };
    return JSON.parse(storedValues);
}

export default function Homepage() {

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getProjectFromAPI().then((res) => {
            if (res === null) {
                return
            }
            if (!res.ok) return console.error(res.status, res.data);
            setProject(res.data);
        });
    });

    //Commit-informasjon
    const [commits, setCommits] = useState<Commit[] | null>(null);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getAllCommitsFromApi().then((res) => {
            if (res === null) {
                return
            }
            setCommits(res);
        });
    }, []);

    //Issue-informasjon
    const [allIssues, setAllIssues] = useState<Issue[] | null>(null);
    const [openIssues, setOpenIssues] = useState<Issue[] | null>(null);
    const [closedIssues, setClosedIssues] = useState<Issue[] | null>(null);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getIssuesFromAPI().then((res) => {
            if (res === null) {
                return
            }
            if (!res.ok) return console.error(res.status, res.data);
            setAllIssues(res.data);
            setClosedIssues(res.data.filter(el => /\d/.test(el.closed_at || ''))); //Issues som er lukket, plasseres i en egen array
            setOpenIssues(res.data.filter(el => !/\d/.test(el.closed_at || ''))); //Issues som er åpne, plasseres i en egen array
        });
    }, []);

    //Branch-informasjon
    const [branches, setBranches] = useState<Branch[] | null>(null);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getAllBranches().then((res) => {
            if (res === null) {
                return
            }
            setBranches(res.data);
        })
    }, []);


    const body : any = []

    if (!(getFormValues().repo === '')) {
        branches?.forEach(el => {
            body.push(
                <div>
                    <li>
                        {el.name}
                    </li>
                </div>
            )     
        })
    }

    return(
        <Container>
            {!(getFormValues().repo === '') &&
                <div>
                    <h1>{project?.name_with_namespace} </h1>
                    <div className="row">
                        <div id="information">
                            <h3>Commits</h3>
                            <p>
                                The main branch in this repository has {commits?.length} commits. If you want to learn more about these 
                                commits, you can read about them under "Commits".
                            </p>
                            <h3>Issues</h3>
                            <p> 
                                There are {allIssues?.length} number of issues associated to this repository. Of these, 
                                {openIssues?.length} are open, and {closedIssues?.length} are closed. Go to "Issues" to learn 
                                more about them. 
                            </p>
                            <h3>Branches</h3>
                            <p>
                                This repository has {branches?.length} branches. To see a chart of commits per day in every branch, go to "Chart".
                            </p>
                            <h5>The branches are:</h5>
                            <ul>{body}</ul>
                        </div>
                        <div id="recentlyViewed">
                            <h2>Recently viewed</h2>
                            <ul className="pb-4">
                                {(JSON.parse(localStorage.getItem("repos") || " []")).map((el : String) => <li> {el}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            }

            {(getFormValues().repo === '') &&
            <div className="row">
                <div className="text" id="information">
                    <h4>Please enter a repo!</h4>
                </div>
                <div id="recentlyViewed">
                    <h2>Recently viewed</h2>
                    <ul className="pb-4">
                        {(JSON.parse(localStorage.getItem("repos") || " []")).map((el : String) => <li> {el}</li>)}
                    </ul>
                </div>
            </div>
            }
        </Container>
    );
}
