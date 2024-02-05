"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "./services";

function debounce(fn: any, delay: number) {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

interface Props {
  projectId: string;
  onSelectProject: (projectId: string) => void;
}

export function JiraProjects({ projectId, onSelectProject }: Props) {
  const [projects, setProjects] = useState<any>([]);
  const [searchProject, setSearchProject] = useState("");

  useEffect(() => {
    fetchProjects(searchProject)
      .then((projects: any) => {
        setProjects(projects.values);
      })
      .catch(() => {
        console.log("error");
        setProjects([]);
      });
  }, [searchProject]);

  const selectedProject = projects.find(
    (project: any) => project.id === projectId,
  );

  return (
    <div>
      <div className="mt-4 text-lg font-bold">Projects</div>
      {selectedProject ? (
        <div>
          <div>
            <span>{selectedProject.name}</span>{" "}
            <strong>({selectedProject.key})</strong>
            <button
              className="ml-4 text-blue-500 underline"
              onClick={() => {
                setSearchProject("");
                onSelectProject("");
              }}
            >
              Change project
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <input
              className="rounded border border-neutral-500"
              onChange={debounce((event: any) => {
                setSearchProject(event.target.value);
              }, 600)}
            />
          </div>
          <ol className="list-decimal">
            {projects.map((project: any) => (
              <li
                key={project.id}
                onClick={() => {
                  onSelectProject(project.id);
                }}
              >
                <span>{project.name}</span> <strong>({project.key})</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
