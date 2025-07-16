import { createFileRoute } from "@tanstack/react-router";
import DeepDive, { tableOfContents } from "@/documentations/3.7.2/ko/deep-dive";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/ko/docs/3_6_1/deep-dive")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={DeepDive} />;
}
