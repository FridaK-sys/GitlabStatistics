import { getFormValues } from '../components/utils';
import { requestMethod, Branch, Commit, Issue, Project } from './types';

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" + getFormValues().repo
const numberOfPages = 100

/** 
* Function that gets data from GitLab
*
* @param urlPath 
* @returns data from GitLab
*/
async function getDataFromGitlab( urlPath: String, method: requestMethod ) {
  try {
    const res = await fetch(url + urlPath, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getFormValues().token}`,
      }),
    });
    return res.json();
  } catch {
    console.log("Failed fetching from: ", urlPath);
    return new Error("Failed fetching from: " + urlPath);
  }
}

/** 
* Function that recursively gets all data from GitLab given the response cap of 100
*
* @param urlPath 
* @returns all data from a given urlPath
*/
async function getData( urlPath: String ) {
  let allResponses: any = [];
  let size = numberOfPages;
  let iteration = 1;

  while (size === numberOfPages) {
    const response = await getDataFromGitlab(
      urlPath + "?per_page=" + numberOfPages + "&page=" + iteration, "GET");
    response.map((res: any) => allResponses.push(res));
    size = response.length;
    iteration++;
  }
  return allResponses;
}

/** 
* Function that returns all issues in a project
*
* @returns all issues
*/
export async function getIssues() {
  return getData("/issues") as Promise<Issue[]>
}

/** 
* Function that returns all commits from main
*
* @returns all commits from main
*/
export async function getCommits() {
  return getData("/repository/commits") as Promise<Commit[]>
}

/** 
* Function that returns all commits from a given branch
*
* @returns all commits from a given branch
*/
export async function getCommitsFromBranch( branch: string ) {
  return getDataFromGitlab('/repository/commits?ref_name=' + branch, "GET") as Promise<Commit[]>
}

/** 
* Function that returns all branches in a project
*
* @returns all branches in a project
*/
export async function getBranches() {
  return getDataFromGitlab("/repository/branches", "GET") as Promise<Branch[]>
}

/** 
* Function that returns the project
*
* @returns the project
*/
export async function getProject() {
  return getDataFromGitlab("", "GET") as Promise<Project>
} 