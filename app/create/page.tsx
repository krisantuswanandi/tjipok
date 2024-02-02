"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState("scrum");
  const [token, setToken] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, points, token });
  }

  return (
    <main className="m-auto max-w-screen-sm p-4">
      <h1 className="py-4 text-4xl font-semibold">Create a room</h1>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="">
          <Label htmlFor="username">Your name</Label>
          <Input
            id="username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mt-3">
          <Label htmlFor="story-points">Story points</Label>
          <Select value={points} onValueChange={(e) => setPoints(e)}>
            <SelectTrigger>
              <SelectValue
                id="story-points"
                placeholder="Select story points"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="scrum">
                  Scrum: 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100 and ?
                </SelectItem>
                <SelectItem value="fibonacci">
                  Fibonacci: 0, ½, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 and ?
                </SelectItem>
                <SelectItem value="sequential">
                  Sequential: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 and ?
                </SelectItem>
                <SelectItem value="hourly">
                  Hourly: 0, 4, 8, 16, 24, 32, 40, 60, 80, and ?
                </SelectItem>
                <SelectItem value="tshirt">
                  T-Shirt: XXS, XS, S, M, L, XL, XXL and ?
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label htmlFor="jira-token">Jira token (optional)</Label>
          <Input
            id="jira-token"
            type="password"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
          <div className="mt-1 text-xs text-neutral-400">
            You can generate a new token{" "}
            <a
              href="https://id.atlassian.com/manage-profile/security/api-tokens"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              here
            </a>
            .
          </div>
        </div>
        <div className="mt-4">
          <Button disabled={!name || !points}>Create room</Button>
          <Button className="ml-2" variant="ghost" asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </main>
  );
}
