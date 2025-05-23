import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { versions } from "./-docs-components/VersionSelector";

export const Route = createFileRoute("/_docs/en/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/en/docs" });

  useEffect(() => {
    navigate({ to: versions.at(-1)!.replace(".", "_") });
  });

  return null;
}
