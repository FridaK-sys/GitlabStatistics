import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Branch, Commit, Project, Issue } from "../api/types";
import { getProject, getIssues, getBranches, getCommits } from '../api/apiservice';
import './Homepage.css';
import image from "../images/gitlab-logo-100.png";
import { getFormValues } from "./utils";

export default function Homepage() {

    const [project, setProject] = useState<Project | null>(null);
    const [commits, setCommits] = useState<Commit[] | null>(null);
    const [allIssues, setAllIssues] = useState<Issue[] | null>(null);
    const [openIssues, setOpenIssues] = useState<Issue[] | null>(null);
    const [closedIssues, setClosedIssues] = useState<Issue[] | null>(null);
    const [branches, setBranches] = useState<Branch[] | null>(null);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getProject().then((res) => {
            setProject(res);
        });
    }, []);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getCommits().then((res) => {
            setCommits(res);
        });   
    }, []);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        // Get method for retriving issues from the API. 
        getIssues().then((res) => {
            setAllIssues(res);
            setClosedIssues(res.filter(el => /\d/.test(el.closed_at || ''))); //Issues som er lukket, plasseres i en egen array
            setOpenIssues(res.filter(el => !/\d/.test(el.closed_at || ''))); //Issues som er åpne, plasseres i en egen array
        });
    }, []);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getBranches().then((res) => {
            setBranches(res);
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
                    <img className="mb-5 mt-3" src={image} alt="GitLab logo" width="200px"></img>
                    <h2>{project?.name_with_namespace} </h2>
                    <div className="row">
                        <div id="information">
                            <h4>Commits</h4>
                            <p>
                                The main branch in this repository has {commits?.length} commits. If you want to learn more about these 
                                commits, you can read about them under "Commits".
                            </p>
                            <h4>Issues</h4>
                            <p> 
                                There are {allIssues?.length} number of issues associated to this repository. Of these,{ openIssues?.length} are open, and {closedIssues?.length} are closed. Go to "Issues" to learn 
                                more about them. 
                            </p>
                            <h4>Branches</h4>
                            <p>
                                This repository has {branches?.length} branches. To see a chart of commits per day in every branch, go to "Chart".
                            </p>
                            <h5>The branches are:</h5>
                            <ul>{body}</ul>
                        </div>
                        <div id="recentlyViewed">
                            <h4>Recently viewed</h4>
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
                    <h4>Please enter a repository!</h4>
                    <p>In order to view information about a repository, you must type the project code and the token (if needed).</p>
                </div>
                <div id="recentlyViewed">
                    <h4>Recently viewed</h4>
                    <ul className="pb-4">
                        {(JSON.parse(localStorage.getItem("repos") || " []")).map((el : String) => <li> {el}</li>)}
                    </ul>
                </div>
            </div>
            }
        </Container>
    );
}