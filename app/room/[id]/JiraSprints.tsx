"use client";

import { useEffect, useState } from "react";
import { fetchSprints } from "./services";
import { JiraSprint } from "./JiraSprint";

interface Props {
  boardId: string;
}

export function JiraSprints({ boardId }: Props) {
  const [sprints, setSprints] = useState<any>([]);

  useEffect(() => {
    if (boardId) {
      fetchSprints(boardId)
        .then((sprints: any) => {
          setSprints(sprints.values);
        })
        .catch(() => {
          setSprints([]);
        });
    }
  }, [boardId]);

  if (!boardId) {
    return null;
  }

  return (
    <div>
      <div className="mt-4 text-lg font-bold">Sprints</div>
      <div>
        {sprints.map((sprint: any) => (
          <JiraSprint key={sprint.id} sprint={sprint} />
        ))}
      </div>
    </div>
  );
}
