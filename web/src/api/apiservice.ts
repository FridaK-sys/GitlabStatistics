import { getEnv } from "./utils";

import { APIRequestMethod, APIResponse, Commit, Issue } from './types';

const PROJECT_ID = 17521;

/*
interface IFormInputValues {
  repo: string;
  token: string;
}

function getFormValues() {
  const storedValues = localStorage.getItem('form');
  if (!storedValues)
      return {
        repo: '',
        token: '',
      };
    return JSON.parse(storedValues);
}
*/

export const fromAPI = async ( urlPath: string, method: APIRequestMethod, body?: unknown ): Promise<APIResponse<unknown>> => { 
  const response = await fetch( 
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${PROJECT_ID}${urlPath}`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getEnv('REACT_APP_API_ACCESS_TOKEN')}`,
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  return { status: response.status, ok: response.ok, headers: response.headers, data };
};

export const getIssuesFromAPI = async (): Promise<APIResponse<Issue[]>> => {
  return fromAPI('/issues?per_page=100', 'GET') as Promise<APIResponse<Issue[]>>;
};

export const getAllCommitsFromApi = async () => {
  return fromAPI('/repository/commits?per_page=100', 'GET') as Promise<APIResponse<Commit[]>>;
};