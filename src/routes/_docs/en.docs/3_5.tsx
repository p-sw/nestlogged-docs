import { createFileRoute } from "@tanstack/react-router";
import { VersionLayout } from "../-docs-components/Layout";

export const Route = createFileRoute("/_docs/en/docs/3_5")({
  component: RouteComponent,
});

const navmap = {
  Introduction: ".",
  Tutorial: "tutorial",
  "Deep Dive": "deep-dive",
};

function RouteComponent() {
  return <VersionLayout lang="en" navmap={navmap} version="3_5" />;
}
