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

  return res.json();
}

export async function fetchProjects(search = "") {
  return await jiraRequest(`rest/api/3/project/search?query=${search}`);
}

export async function fetchBoards(projectId: string) {
  return await jiraRequest(`rest/agile/1.0/board?projectKeyOrId=${projectId}`);
}

export async function fetchSprints(boardId: string) {
  return await jiraRequest(
    `rest/agile/1.0/board/${boardId}/sprint?state=future`,
  );
}
