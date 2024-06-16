import { SaveJiraData } from "./SaveJiraData";

async function fetchJiraAuth(code: string) {
  const url = "https://auth.atlassian.com/oauth/token";
  try {
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
    if (!response.ok) throw new Error('Failed to fetch Jira authentication');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Jira authentication:', error);
    throw error;
  }
}

async function fetchJiraSite(token: string) {
  const url = "https://api.atlassian.com/oauth/token/accessible-resources";
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch Jira site');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Jira site:', error);
    throw error;
  }
}

async function fetchJiraData(code: string) {
  try {
    const auth = await fetchJiraAuth(code);
    const site = await fetchJiraSite(auth.access_token);
    return { auth, site };
  } catch (error) {
    return { error: 'Failed to fetch Jira data' };
  }
}

export default async function JiraCallbackPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  try {
    const data = await fetchJiraData(searchParams.code);
    if (data.error) {
      return <SaveJiraData data={{ error: data.error }} />;
    }
    return <SaveJiraData data={data} />;
  } catch (error) {
    return <SaveJiraData data={{ error: 'Unexpected error occurred' }} />;
  }
}
