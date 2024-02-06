"use client";

import { useState } from "react";
import { fetchProjects } from "./services";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  projectId: string;
  onSelectProject: (projectId: string) => void;
}

export function JiraProjects({ projectId, onSelectProject }: Props) {
  const [open, setOpen] = useState(false);

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      return await fetchProjects(pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return;
      return lastPage.startAt + lastPage.maxResults;
    },
  });

  if (!isFetching && hasNextPage) fetchNextPage();

  const projects = data ? data.pages.flatMap((page) => page.values) : [];

  const selectedProject = projects.find(
    (project: any) => project.id === projectId,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
        >
          {selectedProject ? (
            <span className="truncate">
              <strong>{selectedProject.key}</strong>
              {` - ${selectedProject.name}`}
            </span>
          ) : (
            "Select project..."
          )}
          <LuChevronsUpDown className="ml-1 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project: any) => (
                <CommandItem
                  key={project.id}
                  value={`${project.key} ${project.name}`}
                  onSelect={() => {
                    onSelectProject(project.id);
                    setOpen(false);
                  }}
                >
                  <LuCheck
                    className={`mr-2 h-4 w-4 ${projectId === project.id ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className="truncate">
                    <strong>{project.key}</strong>
                    {` - ${project.name}`}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
