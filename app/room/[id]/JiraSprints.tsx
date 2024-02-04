"use client";

import { useEffect, useState } from "react";
import { fetchSprints } from "./services";

interface Props {
  boardId: string;
}

export function JiraSprints({ boardId }: Props) {
  const [sprints, setSprints] = useState<any>([]);

  useEffect(() => {
    if (boardId) {
      fetchSprints(boardId).then((sprints: any) => {
        setSprints(sprints.values);
      });
    }
  }, [boardId]);

  if (!boardId) {
    return null;
  }

  return (
    <div>
      <div className="mt-4 text-lg font-bold">Sprints</div>
      <ol className="list-decimal">
        {sprints.map((sprint: any) => (
          <li key={sprint.id}>
            <span>{sprint.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
