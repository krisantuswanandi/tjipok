import { Button } from "@/components/ui/button";

export function ConnectToJira({ state }: { state: string }) {
  const jiraClientId = process.env.NEXT_PUBLIC_JIRA_CLIENT_ID!;
  const jiraCallbackUrl = process.env.NEXT_PUBLIC_JIRA_CALLBACK_URL!;
  const jiraScopes = [
    "offline_access",
    "read:jira-work",
    "write:jira-work",
    "read:sprint:jira-software",
    "read:issue-details:jira",
    "read:jql:jira",
  ];
  const jiraAuthUrl = "https://auth.atlassian.com/authorize";
  const jiraAuthParams = new URLSearchParams({
    audience: "api.atlassian.com",
    response_type: "code",
    prompt: "consent",
    scope: jiraScopes.join(" "),
    client_id: jiraClientId,
    redirect_uri: jiraCallbackUrl,
    state,
  }).toString();

  function handleClick() {
    window.open(`${jiraAuthUrl}?${jiraAuthParams}`, "_blank");
  }

  return (
    <Button
      className="bg-blue-600 text-white hover:bg-blue-500"
      onClick={handleClick}
    >
      Connect to Jira
    </Button>
  );
}
