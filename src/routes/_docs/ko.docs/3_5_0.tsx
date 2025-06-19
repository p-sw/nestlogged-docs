import { createFileRoute } from "@tanstack/react-router";
import { VersionLayout } from "../-docs-components/Layout";

export const Route = createFileRoute("/_docs/ko/docs/3_5_0")({
  component: RouteComponent,
});

const navmap = {
  "Deep Dive": "deep-dive",
  Index: "index",
  Tutorial: "tutorial"
};

function RouteComponent() {
  return <VersionLayout lang="ko" navmap={navmap} version="3_5_0" />;
}
