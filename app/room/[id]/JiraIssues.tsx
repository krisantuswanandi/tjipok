"use client";

import { useEffect, useState } from "react";
import { fetchIssues } from "./services";

interface Props {
  sprintId: string;
}

export function JiraIssues({ sprintId }: Props) {
  const [issues, setIssues] = useState<any>([]);

  useEffect(() => {
    if (sprintId) {
      fetchIssues(sprintId)
        .then((issues: any) => {
          setIssues(issues.issues);
        })
        .catch(() => {
          setIssues([]);
        });
    }
  }, [sprintId]);

  if (!sprintId) {
    return null;
  }

  return (
    <ol className="list-decimal">
      {issues.map((issue: any) => (
        <li key={issue.id}>
          <strong>{issue.key}</strong> <span>{issue.fields.summary}</span>
        </li>
      ))}
    </ol>
  );
}
