import { createFileRoute } from "@tanstack/react-router";
import { VersionLayout } from "../-docs-components/Layout";

export const Route = createFileRoute("/_docs/ko/docs/3_7")({
  component: RouteComponent,
});

const navmap = {
  Index: "",
  Tutorial: "tutorial",
  "Deep Dive": "deep-dive",
};

function RouteComponent() {
  return <VersionLayout lang="ko" navmap={navmap} version="3_7" />;
}
