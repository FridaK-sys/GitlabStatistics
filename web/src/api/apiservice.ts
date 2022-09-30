import { APIRequestMethod, APIResponse, Branch, Commit, Issue } from './types';

function getFormValues() {
  const storedValues = localStorage.getItem('form');
  if (!storedValues)
      return {
        repo: '',
        token: '',
      };
    return JSON.parse(storedValues);
}

export const fromAPI = async ( urlPath: string, method: APIRequestMethod, body?: unknown ): Promise<APIResponse<unknown>> => { 
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

export const getIssuesFromAPI = async (): Promise<APIResponse<Issue[]>> => {
  return fromAPI('/issues', 'GET') as Promise<APIResponse<Issue[]>>;
};

export const getAllCommitsFromApi = async () => {
  return getCommitsRecursive(1);
};

export const getAllCommitsFromBranch = async (branch: string) => {
  return fromAPI('/repository/commits?ref_name=' + branch, 'GET') as Promise<APIResponse<Commit[]>>;
};

export const getProjectFromAPI = async () => {
  return fromAPI('', 'GET') as Promise<APIResponse<Project>>;
};

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

export const getAllBranches = async (): Promise<APIResponse<Branch[]>> => {
  return fromAPI('/repository/branches', 'GET') as Promise<APIResponse<Branch[]>>; 
}