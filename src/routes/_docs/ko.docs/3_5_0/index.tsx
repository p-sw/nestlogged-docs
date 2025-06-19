import { createFileRoute } from "@tanstack/react-router";
import Index, { tableOfContents } from "@/documentations/3.5.0/ko/index";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/ko/docs/3_5_0/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={Index} />;
}
