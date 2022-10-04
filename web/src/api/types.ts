export type requestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type APIResponse<ResponseType> = {
    status: number;
    ok: boolean;
    data: ResponseType & ErrorResponse;
    headers: Headers;
};

export type ErrorResponse = {
    errorMsg?: string;
};

export type Commit = {
    id: string;
    short_id: string;
    title: string;
    author_name: string;
    author_email: string;
    authored_date: string;
    committer_name: string;
    committer_email: string;
    committed_date: string;
    created_at: string;
    message: string;
    parent_ids: string[];
    web_url: string;
    stats: {
      additions: number;
      deletions: number;
      total: number;
    };
};

export interface commitsByDate {
    date: string,
    commits: number
}

type StateGL = 'active' | 'inactive';

type Milestone = {
    id: number;
    iid: number;
    project_id: string;
    title: string;
    description: string;
    due_date: string | null;
    start_date: string | null;
    state: StateGL;
    updated_at: string;
    created_at: string;
    expired: string | null;
    web_url: string;
};

type IssueAuthor = {
    id: number;
    name: string;
    username: string;
    state: StateGL;
    avatar_url: string;
    web_url: string;
};

type TimeStats = {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: null;
    human_total_time_spent: null;
};

type TaskCompletionStatus = {
    count: number;
    completed_count: number;
};
  
type _Links = {
    self: string;
    notes: string;
    award_emoji: string;
    project: string;
};
  
type References = {
    short: string;
    relative: string;
    full: string;
};

export type Issue = {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: StateGL;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    closed_by: string | null;
    labels: string[];
    milestone: Milestone;
    assignees: [];
    author: IssueAuthor;
    type: 'ISSUE';
    assignee: IssueAuthor[];
    user_notes_count: number;
    merge_requests_count: number;
    upvotes: number;
    downvotes: number;
    due_date: string | null;
    confidential: boolean;
    discussion_locked: null;
    issue_type: 'issue';
    web_url: string;
    time_stats: TimeStats;
    task_completion_status: TaskCompletionStatus;
    has_tasks: boolean;
    _links: _Links;
    references: References;
    moved_to_id: null;
    service_desk_reply_to: null;
};

export type Project = {
    id: number;
    name: string;
    name_with_namespace: string;
}
export type Branch = {
    name: string,
    merged: boolean,
    protected: boolean,
    default: boolean,
    developers_can_push: boolean,
    developers_can_merge: boolean,
    can_push: boolean,
    web_url: string,
    commit: Commit,
}