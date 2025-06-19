import { createFileRoute } from "@tanstack/react-router";
import DeepDive, { tableOfContents } from "@/documentations/3.5.0/ko/deep-dive";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/ko/docs/3_5_0/deep-dive")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={DeepDive} />;
}
