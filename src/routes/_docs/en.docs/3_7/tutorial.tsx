import { createFileRoute } from "@tanstack/react-router";
import Tutorial, { tableOfContents } from "@/documentations/3.7/en/tutorial";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/en/docs/3_7/tutorial")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={Tutorial} />;
}
