"use client";

import { useState } from "react";
import { fetchBoards } from "./services";
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
  boardId: string;
  projectId: string;
  onSelectBoard: (boardId: string) => void;
}

export function JiraBoards({ boardId, projectId, onSelectBoard }: Props) {
  const [open, setOpen] = useState(false);

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["boards", projectId],
    queryFn: async ({ pageParam }) => {
      return await fetchBoards(projectId, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return;
      return lastPage.startAt + lastPage.maxResults;
    },
    enabled: !!projectId,
  });

  if (!isFetching && hasNextPage) fetchNextPage();

  const boards = data ? data.pages.flatMap((page) => page.values) : [];
  const orderedBoards = boards.sort((a: any) => {
    return a.type === "scrum" ? -1 : 1;
  });

  const selectedBoard = boards.find((board: any) => board.id === boardId);

  if (!boardId && orderedBoards.length > 0) {
    onSelectBoard(orderedBoards[0].id);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
          disabled={!projectId}
        >
          {selectedBoard ? (
            <span className="truncate">{selectedBoard.name}</span>
          ) : (
            "Select board..."
          )}
          <LuChevronsUpDown className="ml-1 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search board..." />
          <CommandList>
            <CommandEmpty>No board found.</CommandEmpty>
            <CommandGroup>
              {orderedBoards.map((board: any) => (
                <CommandItem
                  key={board.id}
                  value={`${board.key} ${board.name}`}
                  onSelect={() => {
                    onSelectBoard(board.id);
                    setOpen(false);
                  }}
                >
                  <LuCheck
                    className={`mr-2 h-4 w-4 ${boardId === board.id ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className="truncate">{board.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
