import { createFileRoute } from "@tanstack/react-router";
import Index, { tableOfContents } from "@/documentations/3.6.1/en/index";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/en/docs/3_6_1/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={Index} />;
}
