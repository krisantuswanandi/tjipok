"use client";

import { useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa6";

export function SaveJiraData({ data }: { data: any }) {
  useEffect(() => {
    if (data.error) {
      alert(`Error: ${data.error}`);
      window.close();
    } else {
      localStorage.setItem("jira", JSON.stringify(data));
      setTimeout(() => {
        window.close();
      }, 1000);
    }
  }, [data]);

  if (data.error) {
    return (
      <main className="flex min-h-dvh items-center justify-center">
        <h1>Error connecting to Jira. Please try again.</h1>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-dvh items-center justify-center">
        <h1 className="flex items-center gap-3">
          <FaCircleNotch className="animate-spin" size={24} />
          <span>Connecting to Jira...</span>
        </h1>
      </main>
    );
  }
}
