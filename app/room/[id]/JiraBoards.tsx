"use client";

import { useEffect, useState } from "react";
import { fetchBoards } from "./services";

interface Props {
  boardId: string;
  projectId: string;
  onSelectBoard: (boardId: string) => void;
}

export function JiraBoards({ boardId, projectId, onSelectBoard }: Props) {
  const [boards, setBoards] = useState<any>([]);

  useEffect(() => {
    if (projectId) {
      fetchBoards(projectId)
        .then((boards: any) => {
          const orderedBoards = boards.values.sort((a: any) => {
            return a.type === "scrum" ? -1 : 1;
          });
          setBoards(orderedBoards);
          onSelectBoard(orderedBoards[0].id);
        })
        .catch(() => {
          setBoards([]);
        });
    } else {
      setBoards([]);
      onSelectBoard("");
    }
  }, [projectId, onSelectBoard]);

  if (!projectId) {
    return null;
  }

  return (
    <div>
      <div className="mt-4 text-lg font-bold">Boards</div>
      <ol className="list-decimal">
        {boards.map((board: any) => (
          <li
            key={board.id}
            onClick={() => {
              onSelectBoard(board.id);
            }}
          >
            {boardId === board.id ? (
              <strong>{board.name}</strong>
            ) : (
              <span>{board.name}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
