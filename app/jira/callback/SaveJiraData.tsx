"use client";

import { useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa6";

export function SaveJiraData({ data }: { data: any }) {
  useEffect(() => {
    localStorage.setItem("jira", JSON.stringify(data));
    setTimeout(() => {
      window.close();
    }, 1000);
  }, [data]);

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <h1 className="flex items-center gap-3">
        <FaCircleNotch className="animate-spin" size={24} />
        <span>Connecting to Jira...</span>
      </h1>
    </main>
  );
}
