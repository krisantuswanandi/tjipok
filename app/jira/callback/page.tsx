import { SaveJiraData } from "./SaveJiraData";

async function fetchJiraAuth(code: string) {
  const url = "https://auth.atlassian.com/oauth/token";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_JIRA_CLIENT_ID,
      client_secret: process.env.JIRA_SECRET_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_JIRA_CALLBACK_URL,
      code,
    }),
  });
  return await response.json();
}

async function fetchJiraSite(token: string) {
  const url = "https://api.atlassian.com/oauth/token/accessible-resources";
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
}

async function fetchJiraData(code: string) {
  const auth = await fetchJiraAuth(code);
  const site = await fetchJiraSite(auth.access_token);
  return { auth, site };
}

export default async function JiraCallbackPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const data = await fetchJiraData(searchParams.code);

  return <SaveJiraData data={data} />;
}
