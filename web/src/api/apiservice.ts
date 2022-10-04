import { getFormValues } from '../components/utils';
import { requestMethod, APIResponse, Branch, Commit, Issue, Project } from './types';

/** 
* Function that returns the data from the API
*
* @param urlPath
* @param requestMethod
* @param body
* @returns data from API
*/
export const fromAPI = async (urlPath: string, method: requestMethod, body?: unknown ): Promise<APIResponse<unknown>> => { 
  const response = await fetch( 
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${getFormValues().repo}${urlPath}`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getFormValues().token}`,
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  return { status: response.status, ok: response.ok, headers: response.headers, data };
};

/** 
* Function that returns all issues from a project
* 
* @returns all issues in a project
*/
export const getIssuesFromAPI = async (): Promise<APIResponse<Issue[]>> => {
  return fromAPI('/issues', 'GET') as Promise<APIResponse<Issue[]>>;
};

/** 
* Function that returns all commits from main
*
* @param date 
* @returns all commits from main
*/
export const getAllCommitsFromApi = async () => {
  return getCommitsRecursive(1);
};

/** 
* Function that returns all commits from a branch
*
* @param branch 
* @returns all commits from a given branch
*/
export const getAllCommitsFromBranch = async (branch: string) => {
  return fromAPI('/repository/commits?ref_name=' + branch, 'GET') as Promise<APIResponse<Commit[]>>;
};

/** 
* Function that returns the given project
*
* @returns the given project
*/
export const getProjectFromAPI = async () => {
  return fromAPI('', 'GET') as Promise<APIResponse<Project>>;
};

/** 
* Function that gets all commits recursively as the API has a cap of 100 responses
*
* @param page 
* @returns all commits in a project
*/
const getCommitsRecursive = async (page: number): Promise<Commit[]> => {
  return fromAPI(`/repository/commits?per_page=100&page=${page}&with_stats=true`, 'GET').then(
    async (res) => {
      if (res.ok) {
        if (res.headers.get('x-next-page')) {
          return await getCommitsRecursive(page + 1).then((res_data) => {
            return res_data.concat(res.data as Commit[]);
          });
        } else {
          return res.data as Commit[];
        }
      } else {
        return [];
      }
    },
  );
};

/** 
* Function that returns all branches in a project
*
* @returns all branches in a project
*/
export const getAllBranches = async (): Promise<APIResponse<Branch[]>> => {
  return fromAPI('/repository/branches', 'GET') as Promise<APIResponse<Branch[]>>; 
}