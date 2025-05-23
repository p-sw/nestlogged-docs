import { createFileRoute } from "@tanstack/react-router";
import { VersionLayout } from "../-docs-components/Layout";

export const Route = createFileRoute("/_docs/ko/docs/3_5")({
  component: RouteComponent,
});

const navmap = {
  개요: ".",
  튜토리얼: "tutorial",
  "깊이 알아보기": "deep-dive",
};

function RouteComponent() {
  return <VersionLayout lang="ko" navmap={navmap} version="3_5" />;
}
