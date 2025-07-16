import { createFileRoute } from "@tanstack/react-router";
import { VersionLayout } from "../-docs-components/Layout";

export const Route = createFileRoute("/_docs/en/docs/3_6_1")({
  component: RouteComponent,
});

const navmap = {
  "Deep Dive": "deep-dive",
  Index: "",
  Tutorial: "tutorial"
};

function RouteComponent() {
  return <VersionLayout lang="en" navmap={navmap} version="3_6_1" />;
}
