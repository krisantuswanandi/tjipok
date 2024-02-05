function getJiraData() {
  const raw = localStorage.getItem("jira");

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  return null;
}

async function jiraRequest(url: string) {
  const jira = getJiraData();

  if (!jira) return;

  const res = await fetch(
    `https://api.atlassian.com/ex/jira/${jira.site[0].id}/${url}`,
    {
      headers: {
        Authorization: `Bearer ${jira.auth.access_token}`,
      },
    },
  );

  if (res.ok) return res.json();

  throw new Error(res.statusText);
}

export function fetchProjects(search = "") {
  return jiraRequest(`rest/api/3/project/search?query=${search}`);
}

export function fetchBoards(projectId: string) {
  return jiraRequest(`rest/agile/1.0/board?projectKeyOrId=${projectId}`);
}

export function fetchSprints(boardId: string) {
  return jiraRequest(`rest/agile/1.0/board/${boardId}/sprint?state=future`);
}

export function fetchIssues(sprintId: string) {
  const params = new URLSearchParams({
    fields: "summary",
    jql: "issuetype != Epic AND statusCategory != Done",
  });

  return jiraRequest(
    `rest/agile/1.0/sprint/${sprintId}/issue?${params.toString()}`,
  );
}
