import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { versionList } from "../-docs-components/versionList";

export const Route = createFileRoute("/_docs/en/docs/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/en/docs" });

  useEffect(() => {
    navigate({ to: versionList.at(-1)!.replaceAll(".", "_") });
  });

  return null;
}
