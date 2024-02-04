"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ConnectToJira } from "./ConnectToJira";
import { useEffect, useState } from "react";
import { JiraProjects } from "./JiraProjects";
import { JiraBoards } from "./JiraBoards";
import { JiraSprints } from "./JiraSprints";

export default function RoomPage(props: { params: { id: string } }) {
  const [token, setToken] = useState("");
  const [cloudId, setCloudId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [boardId, setBoardId] = useState("");

  function setJira(storage: string) {
    try {
      const jira = JSON.parse(storage);
      setToken(jira.auth.access_token);
      setCloudId(jira.site[0].id);
    } catch {
      setToken("");
      setCloudId("");
    }
  }

  useEffect(() => {
    const storage = localStorage.getItem("jira");
    if (storage) setJira(storage);

    function storageListener(e: StorageEvent) {
      const storage = e.storageArea?.getItem("jira");

      if (storage) {
        setJira(storage);
      } else {
        setToken("");
        setCloudId("");
      }
    }

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  return (
    <main className="m-auto mt-4 max-w-screen-sm">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <FaArrowLeftLong className="mr-2" />
            Back to home
          </Link>
        </Button>
      </div>
      <div className="p-3">
        <div>Room ID: {props.params.id}</div>
        {token && cloudId ? (
          <div>
            <Button
              onClick={() => {
                localStorage.removeItem("jira");
                setToken("");
                setCloudId("");
              }}
            >
              Clear storage
            </Button>
            <JiraProjects
              projectId={projectId}
              onSelectProject={(id) => {
                setProjectId(id);
              }}
            />
            <JiraBoards
              boardId={boardId}
              projectId={projectId}
              onSelectBoard={(id) => {
                setBoardId(id);
              }}
            />
            <JiraSprints boardId={boardId} />
          </div>
        ) : (
          <div>
            <ConnectToJira state={props.params.id} />
          </div>
        )}
      </div>
    </main>
  );
}
