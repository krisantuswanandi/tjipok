"use client";

import { useState } from "react";
import { JiraIssues } from "./JiraIssues";

interface Props {
  sprint: any;
}

export function JiraSprint({ sprint }: Props) {
  const [showIssues, setShowIssues] = useState(false);

  return (
    <div className="mt-4">
      <div className="mb-2 border border-black">
        <span>{sprint.name}</span>
        <button
          className="ml-2 text-blue-500 underline"
          onClick={() => {
            setShowIssues(!showIssues);
          }}
        >
          {showIssues ? "hide" : "show"}
        </button>
      </div>
      {showIssues && <JiraIssues sprintId={sprint.id} />}
    </div>
  );
}
