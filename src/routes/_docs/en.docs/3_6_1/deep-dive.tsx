import { createFileRoute } from "@tanstack/react-router";
import DeepDive, { tableOfContents } from "@/documentations/3.6.1/en/deep-dive";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/en/docs/3_6_1/deep-dive")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={DeepDive} />;
}
