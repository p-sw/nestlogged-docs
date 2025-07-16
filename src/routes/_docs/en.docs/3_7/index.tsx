import { createFileRoute } from "@tanstack/react-router";
import Index, { tableOfContents } from "@/documentations/3.7/en/index";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/en/docs/3_7/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={Index} />;
}
