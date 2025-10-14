"use client";

import { useEffect } from "react";

type Props = {
  surveyId: string;
  mode?: "inline" | "popover";
};

export default function FormbricksSurvey({ surveyId, mode = "inline" }: Props) {
  useEffect(() => {
    const scriptId = "formbricks-sdk";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://cdn.formbricks.com/js/snippet.js";
    script.dataset.apiHost = process.env.NEXT_PUBLIC_FORMBRICKS_URL ?? "https://app.formbricks.com";
    script.dataset.environmentId = process.env.NEXT_PUBLIC_FORMBRICKS_ENV ?? "";
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="rounded-2xl border border-accent/30 bg-accent/5 p-5 text-sm text-white/80"
      data-formbricks-survey={surveyId}
      data-mode={mode}
    >
      <p>Loading survey…</p>
    </div>
  );
}
